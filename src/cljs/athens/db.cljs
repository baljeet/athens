(ns athens.db
  (:require
    [clojure.edn :as edn]
    [datascript.core :as d]
    [posh.reagent :refer [posh!]]))

;;; JSON Parsing


(def str-kw-mappings
  "Maps attributes from \"Export All as JSON\" to original datascript attributes."
  {"children" :block/children
   "create-email" :create/email
   "create-time" :create/time
   "edit-email" :edit/email
   "edit-time" :edit/time
   "email" :user/email
   "emoji" :ent/emoji
   "emojis" :ent/emojis
   "props" :block/props
   "string" :block/string
   "text-align" :block/text-align
   "time" nil
   "title" :node/title
   "uid" :block/uid
   "users" nil
   "heading" :block/heading})


(defn convert-key
  [k]
  (get str-kw-mappings k k))


(defn parse-hms
  "Parses JSON retrieved from Roam's \"Export all as JSON\". Not fully functional."
  [hms]
  (if (not (coll? hms))
    hms
    (map #(reduce (fn [acc [k v]]
                    (assoc acc (convert-key k) (parse-hms v)))
                  {}
                  %)
         hms)))


(defn parse-tuples
  "Parse tuples exported via method specified in https://roamresearch.com/#/app/ego/page/eJ14YtH2G."
  [tuples]
  (->> tuples
       (partition 3)            ; chunk into 3-tuples
       rest                     ; drop first tuple which is (?e ?a ?v)
       (map #(map edn/read-string %))
       (map #(cons :db/add %))))


(defn json-str-to-edn
  "Convert a JSON str to EDN. May receive JSON through an HTTP request or file upload."
  [json-str]
  (->> json-str
       (js/JSON.parse)
       (js->clj)))


(defn str-to-db-tx
  "Deserializes a JSON string into EDN and then Datoms."
  [json-str]
  (let [edn-data (json-str-to-edn json-str)]
    (if (coll? (first edn-data))
      (parse-hms edn-data)
      (parse-tuples edn-data))))


;;; Example Roam DBs


(def athens-url "https://raw.githubusercontent.com/athensresearch/athens/master/data/athens.datoms")
(def help-url   "https://raw.githubusercontent.com/athensresearch/athens/master/data/help.datoms")
(def ego-url    "https://raw.githubusercontent.com/athensresearch/athens/master/data/ego.datoms")


;;; Datascript and Posh


(def schema
  {:block/uid      {:db/unique :db.unique/identity}
   :node/title     {:db/unique :db.unique/identity}
   :attrs/lookup   {:db/cardinality :db.cardinality/many}
   :block/children {:db/cardinality :db.cardinality/many
                    :db/valueType :db.type/ref}})


(defn sort-block
  [block]
  (if-let [children (seq (:block/children block))]
    (assoc block :block/children
           (sort-by :block/order (map sort-block children)))
    block))


(defn shape-parent-query
  "Find path from nested block to origin node.
  Don't totally understand why query returns {:db/id nil} if no results. Returns nil when making q queries"
  [pull-results]
  (->> (loop [b   pull-results
              res []]
         (if (:node/title b)
           (conj res b)
           (recur (first (:block/_children b))
                  (conj res (dissoc b :block/_children)))))
       (rest)
       (reverse)
       vec))

;; all blocks (except for block refs) want to get all children
(def block-pull-pattern
  '[:db/id :block/uid :block/string :block/open :block/order {:block/children ...}])

;; the main difference between a page and a block is that page has a title attribute
(def node-pull-pattern
  (conj block-pull-pattern :node/title))

;; reverse lookup, all the way up to node/title, is needed to get parent context
(def parents-pull-pattern
  '[:db/id :node/title :block/uid :block/string {:block/_children ...}])


;;; posh


(defonce dsdb (d/create-conn schema))
(posh! dsdb)


(defn e-by-av
  [a v]
  (-> (d/datoms @dsdb :avet a v) first :e))


;;(defn e-by-av [db a v]
;;  (-> (d/datoms db :avet a v) first :e))


;; history

(defonce history (atom []))
(def ^:const history-limit 10)


(defn drop-tail
  [xs pred]
  (loop [acc []
         xs  xs]
    (let [x (first xs)]
      (cond
        (nil? x) acc
        (pred x) (conj acc x)
        :else  (recur (conj acc x) (next xs))))))


(defn trim-head
  [xs n]
  (vec (drop (- (count xs) n) xs)))


(defn find-prev
  [xs pred]
  (last (take-while #(not (pred %)) xs)))


(defn find-next
  [xs pred]
  (fnext (drop-while #(not (pred %)) xs)))


(d/listen! dsdb :history
           (fn [tx-report]
             (let [{:keys [db-before db-after]} tx-report]
               (when (and db-before db-after)
                 (swap! history (fn [h]
                                  (-> h
                                      (drop-tail #(identical? % db-before))
                                      (conj db-after)
                                      (trim-head history-limit))))))))


;;; re-frame


(defonce rfdb {:user                "Jeff"
               :current-route       nil
               :loading             true
               :errors              {}
               :athena              false
               :devtool             false
               :left-sidebar        true
               :right-sidebar/open  false
               :right-sidebar/items {}
               ;;"OaSVyM_nr" {:node/title "Athens FAQ" :open false :index 0}
               ;;"p1Xv2crs3" {:node/title "Hyperlink" :open true :index 1}
               ;;"jbiKpcmIX" {:block/string "Firstly, I wouldn't be surprised if Roam was eventually open-sourced." :open true :index 2}
               :editing-uid         nil
               :drag-bullet         {:uid          nil
                                     :x            nil
                                     :y            nil
                                     :closest/uid  nil
                                     :closest/kind nil}
               :tooltip-uid         nil
               :daily-notes         []})
