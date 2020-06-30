goog.provide('instaparse.failure');
goog.require('cljs.core');
goog.require('instaparse.print');
/**
 * Takes an index into text, and determines the line and column info
 */
instaparse.failure.index__GT_line_column = (function instaparse$failure$index__GT_line_column(index,text){
var line = (1);
var col = (1);
var counter = (0);
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(index,counter)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"column","column",2078222095),col], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.get.cljs$core$IFn$_invoke$arity$2(text,counter))){
var G__55818 = (line + (1));
var G__55819 = (1);
var G__55820 = (counter + (1));
line = G__55818;
col = G__55819;
counter = G__55820;
continue;
} else {
var G__55821 = line;
var G__55822 = (col + (1));
var G__55823 = (counter + (1));
line = G__55821;
col = G__55822;
counter = G__55823;
continue;

}
}
break;
}
});
instaparse.failure.get_line = (function instaparse$failure$get_line(n,text){
var chars = cljs.core.seq(clojure.string.replace(text,"\r\n","\n"));
var n__$1 = n;
while(true){
if(cljs.core.empty_QMARK_(chars)){
return "";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(n__$1,(1))){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["\n",null], null), null)),chars));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.first(chars))){
var G__55824 = cljs.core.next(chars);
var G__55825 = (n__$1 - (1));
chars = G__55824;
n__$1 = G__55825;
continue;
} else {
var G__55826 = cljs.core.next(chars);
var G__55827 = n__$1;
chars = G__55826;
n__$1 = G__55827;
continue;

}
}
}
break;
}
});
/**
 * Creates string with caret at nth position, 1-based
 */
instaparse.failure.marker = (function instaparse$failure$marker(n){
if(cljs.core.integer_QMARK_(n)){
if((n <= (1))){
return "^";
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((n - (1))," "),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["^"], null)));
}
} else {
return null;
}
});
/**
 * Adds text, line, and column info to failure object.
 */
instaparse.failure.augment_failure = (function instaparse$failure$augment_failure(failure,text){
var lc = instaparse.failure.index__GT_line_column(new cljs.core.Keyword(null,"index","index",-1531685915).cljs$core$IFn$_invoke$arity$1(failure),text);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([failure,lc,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",-1790561697),instaparse.failure.get_line(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(lc),text)], null)], 0));
});
/**
 * Provides special case for printing negative lookahead reasons
 */
instaparse.failure.print_reason = (function instaparse$failure$print_reason(r){
if(cljs.core.truth_(new cljs.core.Keyword(null,"NOT","NOT",-1689245341).cljs$core$IFn$_invoke$arity$1(r))){
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["NOT "], 0));

return cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"NOT","NOT",-1689245341).cljs$core$IFn$_invoke$arity$1(r)], 0));
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"char-range","char-range",1443391389).cljs$core$IFn$_invoke$arity$1(r))){
return cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([instaparse.print.char_range__GT_str(r)], 0));
} else {
if((r instanceof RegExp)){
return cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([instaparse.print.regexp__GT_str(r)], 0));
} else {
return cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([r], 0));

}
}
}
});
/**
 * Takes an augmented failure object and prints the error message
 */
instaparse.failure.pprint_failure = (function instaparse$failure$pprint_failure(p__55806){
var map__55807 = p__55806;
var map__55807__$1 = (((((!((map__55807 == null))))?(((((map__55807.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__55807.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__55807):map__55807);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55807__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55807__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55807__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var reason = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55807__$1,new cljs.core.Keyword(null,"reason","reason",-2070751759));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["Parse error at line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line),", column ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column),":"].join('')], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([text], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([instaparse.failure.marker(column)], 0));

var full_reasons = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expecting","expecting",-57706705),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"full","full",436801220),reason)));
var partial_reasons = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expecting","expecting",-57706705),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(new cljs.core.Keyword(null,"full","full",436801220)),reason)));
var total = (cljs.core.count(full_reasons) + cljs.core.count(partial_reasons));
if((total === (0))){
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),total)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Expected:"], 0));
} else {
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Expected one of:"], 0));

}
}

var seq__55809_55830 = cljs.core.seq(full_reasons);
var chunk__55810_55831 = null;
var count__55811_55832 = (0);
var i__55812_55833 = (0);
while(true){
if((i__55812_55833 < count__55811_55832)){
var r_55834 = chunk__55810_55831.cljs$core$IIndexed$_nth$arity$2(null,i__55812_55833);
instaparse.failure.print_reason(r_55834);

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" (followed by end-of-string)"], 0));


var G__55835 = seq__55809_55830;
var G__55836 = chunk__55810_55831;
var G__55837 = count__55811_55832;
var G__55838 = (i__55812_55833 + (1));
seq__55809_55830 = G__55835;
chunk__55810_55831 = G__55836;
count__55811_55832 = G__55837;
i__55812_55833 = G__55838;
continue;
} else {
var temp__5735__auto___55839 = cljs.core.seq(seq__55809_55830);
if(temp__5735__auto___55839){
var seq__55809_55840__$1 = temp__5735__auto___55839;
if(cljs.core.chunked_seq_QMARK_(seq__55809_55840__$1)){
var c__4609__auto___55841 = cljs.core.chunk_first(seq__55809_55840__$1);
var G__55842 = cljs.core.chunk_rest(seq__55809_55840__$1);
var G__55843 = c__4609__auto___55841;
var G__55844 = cljs.core.count(c__4609__auto___55841);
var G__55845 = (0);
seq__55809_55830 = G__55842;
chunk__55810_55831 = G__55843;
count__55811_55832 = G__55844;
i__55812_55833 = G__55845;
continue;
} else {
var r_55846 = cljs.core.first(seq__55809_55840__$1);
instaparse.failure.print_reason(r_55846);

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" (followed by end-of-string)"], 0));


var G__55847 = cljs.core.next(seq__55809_55840__$1);
var G__55848 = null;
var G__55849 = (0);
var G__55850 = (0);
seq__55809_55830 = G__55847;
chunk__55810_55831 = G__55848;
count__55811_55832 = G__55849;
i__55812_55833 = G__55850;
continue;
}
} else {
}
}
break;
}

var seq__55813 = cljs.core.seq(partial_reasons);
var chunk__55814 = null;
var count__55815 = (0);
var i__55816 = (0);
while(true){
if((i__55816 < count__55815)){
var r = chunk__55814.cljs$core$IIndexed$_nth$arity$2(null,i__55816);
instaparse.failure.print_reason(r);

cljs.core.println();


var G__55851 = seq__55813;
var G__55852 = chunk__55814;
var G__55853 = count__55815;
var G__55854 = (i__55816 + (1));
seq__55813 = G__55851;
chunk__55814 = G__55852;
count__55815 = G__55853;
i__55816 = G__55854;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__55813);
if(temp__5735__auto__){
var seq__55813__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__55813__$1)){
var c__4609__auto__ = cljs.core.chunk_first(seq__55813__$1);
var G__55855 = cljs.core.chunk_rest(seq__55813__$1);
var G__55856 = c__4609__auto__;
var G__55857 = cljs.core.count(c__4609__auto__);
var G__55858 = (0);
seq__55813 = G__55855;
chunk__55814 = G__55856;
count__55815 = G__55857;
i__55816 = G__55858;
continue;
} else {
var r = cljs.core.first(seq__55813__$1);
instaparse.failure.print_reason(r);

cljs.core.println();


var G__55859 = cljs.core.next(seq__55813__$1);
var G__55860 = null;
var G__55861 = (0);
var G__55862 = (0);
seq__55813 = G__55859;
chunk__55814 = G__55860;
count__55815 = G__55861;
i__55816 = G__55862;
continue;
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=instaparse.failure.js.map