/*! jQuery v2.1.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.1",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"buttonLabel"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"buttonLabel"===a.type||"buttonLabel"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+Math.random()}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)
},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.buttonLabel||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"buttonLabel buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.buttonLabel;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=l.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,n.ajaxSettings),b):tc(n.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Dc)Dc[a]()}),k.cors=!!Fc&&"withCredentials"in Fc,k.ajax=Fc=!!Fc,n.ajaxTransport(function(a){var b;return k.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Ic=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Jc})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Lc=a.jQuery,Mc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Mc),b&&a.jQuery===n&&(a.jQuery=Lc),n},typeof b===U&&(a.jQuery=a.$=n),n});
;/*!
 * VERSION: 1.16.1
 * DATE: 2015-03-13
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},r=function(t,e,s){i.call(this,t,e,s),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=r.prototype.render},n=1e-10,a=i._internals,o=a.isSelector,h=a.isArray,l=r.prototype=i.to({},.1,{}),_=[];r.version="1.16.1",l.constructor=r,l.kill()._gc=!1,r.killTweensOf=r.killDelayedCallsTo=i.killTweensOf,r.getTweensOf=i.getTweensOf,r.lagSmoothing=i.lagSmoothing,r.ticker=i.ticker,r.render=i.render,l.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),i.prototype.invalidate.call(this)},l.updateTo=function(t,e){var s,r=this.ratio,n=this.vars.immediateRender||t.immediateRender;e&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(s in t)this.vars[s]=t[s];if(this._initted||n)if(e)this._initted=!1,n&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&i._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var a=this._time;this.render(0,!0,!1),this._initted=!1,this.render(a,!0,!1)}else if(this._time>0||n){this._initted=!1,this._init();for(var o,h=1/(1-r),l=this._firstPT;l;)o=l.s+l.c,l.c*=h,l.s=o-l.c,l=l._next}return this},l.render=function(t,e,i){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var s,r,o,h,l,u,p,f,c=this._dirty?this.totalDuration():this._totalDuration,m=this._time,d=this._totalTime,g=this._cycle,v=this._duration,y=this._rawPrevTime;if(t>=c?(this._totalTime=c,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=v,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(s=!0,r="onComplete",i=i||this._timeline.autoRemoveChildren),0===v&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>y||y===n)&&y!==t&&(i=!0,y>n&&(r="onReverseComplete")),this._rawPrevTime=f=!e||t||y===t?t:n)):1e-7>t?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==d||0===v&&y>0)&&(r="onReverseComplete",s=this._reversed),0>t&&(this._active=!1,0===v&&(this._initted||!this.vars.lazy||i)&&(y>=0&&(i=!0),this._rawPrevTime=f=!e||t||y===t?t:n)),this._initted||(i=!0)):(this._totalTime=this._time=t,0!==this._repeat&&(h=v+this._repeatDelay,this._cycle=this._totalTime/h>>0,0!==this._cycle&&this._cycle===this._totalTime/h&&this._cycle--,this._time=this._totalTime-this._cycle*h,this._yoyo&&0!==(1&this._cycle)&&(this._time=v-this._time),this._time>v?this._time=v:0>this._time&&(this._time=0)),this._easeType?(l=this._time/v,u=this._easeType,p=this._easePower,(1===u||3===u&&l>=.5)&&(l=1-l),3===u&&(l*=2),1===p?l*=l:2===p?l*=l*l:3===p?l*=l*l*l:4===p&&(l*=l*l*l*l),this.ratio=1===u?1-l:2===u?l:.5>this._time/v?l/2:1-l/2):this.ratio=this._ease.getRatio(this._time/v)),m===this._time&&!i&&g===this._cycle)return d!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||_)),void 0;if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=m,this._totalTime=d,this._rawPrevTime=y,this._cycle=g,a.lazyTweens.push(this),this._lazy=[t,e],void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/v):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==m&&t>=0&&(this._active=!0),0===d&&(2===this._initted&&t>0&&this._init(),this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===v)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||_))),o=this._firstPT;o;)o.f?o.t[o.p](o.c*this.ratio+o.s):o.t[o.p]=o.c*this.ratio+o.s,o=o._next;this._onUpdate&&(0>t&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||(this._totalTime!==d||s)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||_)),this._cycle!==g&&(e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||_)),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||_),0===v&&this._rawPrevTime===n&&f!==n&&(this._rawPrevTime=0))},r.to=function(t,e,i){return new r(t,e,i)},r.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new r(t,e,i)},r.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new r(t,e,s)},r.staggerTo=r.allTo=function(t,e,n,a,l,u,p){a=a||0;var f,c,m,d,g=n.delay||0,v=[],y=function(){n.onComplete&&n.onComplete.apply(n.onCompleteScope||this,arguments),l.apply(p||this,u||_)};for(h(t)||("string"==typeof t&&(t=i.selector(t)||t),o(t)&&(t=s(t))),t=t||[],0>a&&(t=s(t),t.reverse(),a*=-1),f=t.length-1,m=0;f>=m;m++){c={};for(d in n)c[d]=n[d];c.delay=g,m===f&&l&&(c.onComplete=y),v[m]=new r(t[m],e,c),g+=a}return v},r.staggerFrom=r.allFrom=function(t,e,i,s,n,a,o){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,r.staggerTo(t,e,i,s,n,a,o)},r.staggerFromTo=r.allFromTo=function(t,e,i,s,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,r.staggerTo(t,e,s,n,a,o,h)},r.delayedCall=function(t,e,i,s,n){return new r(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,useFrames:n,overwrite:0})},r.set=function(t,e){return new r(t,0,e)},r.isTweening=function(t){return i.getTweensOf(t,!0).length>0};var u=function(t,e){for(var s=[],r=0,n=t._first;n;)n instanceof i?s[r++]=n:(e&&(s[r++]=n),s=s.concat(u(n,e)),r=s.length),n=n._next;return s},p=r.getAllTweens=function(e){return u(t._rootTimeline,e).concat(u(t._rootFramesTimeline,e))};r.killAll=function(t,i,s,r){null==i&&(i=!0),null==s&&(s=!0);var n,a,o,h=p(0!=r),l=h.length,_=i&&s&&r;for(o=0;l>o;o++)a=h[o],(_||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&(t?a.totalTime(a._reversed?0:a.totalDuration()):a._enabled(!1,!1))},r.killChildTweensOf=function(t,e){if(null!=t){var n,l,_,u,p,f=a.tweenLookup;if("string"==typeof t&&(t=i.selector(t)||t),o(t)&&(t=s(t)),h(t))for(u=t.length;--u>-1;)r.killChildTweensOf(t[u],e);else{n=[];for(_ in f)for(l=f[_].target.parentNode;l;)l===t&&(n=n.concat(f[_].tweens)),l=l.parentNode;for(p=n.length,u=0;p>u;u++)e&&n[u].totalTime(n[u].totalDuration()),n[u]._enabled(!1,!1)}}};var f=function(t,i,s,r){i=i!==!1,s=s!==!1,r=r!==!1;for(var n,a,o=p(r),h=i&&s&&r,l=o.length;--l>-1;)a=o[l],(h||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&a.paused(t)};return r.pauseAll=function(t,e,i){f(!0,t,e,i)},r.resumeAll=function(t,e,i){f(!1,t,e,i)},r.globalTimeScale=function(e){var s=t._rootTimeline,r=i.ticker.time;return arguments.length?(e=e||n,s._startTime=r-(r-s._startTime)*s._timeScale/e,s=t._rootFramesTimeline,r=i.ticker.frame,s._startTime=r-(r-s._startTime)*s._timeScale/e,s._timeScale=t._rootTimeline._timeScale=e,e):s._timeScale},l.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},l.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},l.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},l.duration=function(e){return arguments.length?t.prototype.duration.call(this,e):this._duration},l.totalDuration=function(t){return arguments.length?-1===this._repeat?this:this.duration((t-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},l.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},l.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},l.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},r},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],h(i)&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));h(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,n=i._internals,a=s._internals={},o=n.isSelector,h=n.isArray,l=n.lazyTweens,_=n.lazyRender,u=[],p=_gsScope._gsDefine.globals,f=function(t){var e,i={};for(e in t)i[e]=t[e];return i},c=a.pauseCallback=function(t,e,i,s){var n,a=t._timeline,o=a._totalTime,h=t._startTime,l=0>t._rawPrevTime||0===t._rawPrevTime&&a._reversed,_=l?0:r,p=l?r:0;if(e||!this._forcingPlayhead){for(a.pause(h),n=t._prev;n&&n._startTime===h;)n._rawPrevTime=p,n=n._prev;for(n=t._next;n&&n._startTime===h;)n._rawPrevTime=_,n=n._next;e&&e.apply(s||a,i||u),(this._forcingPlayhead||!a._paused)&&a.seek(o)}},m=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},d=s.prototype=new e;return s.version="1.16.1",d.constructor=s,d.kill()._gc=d._forcingPlayhead=!1,d.to=function(t,e,s,r){var n=s.repeat&&p.TweenMax||i;return e?this.add(new n(t,e,s),r):this.set(t,s,r)},d.from=function(t,e,s,r){return this.add((s.repeat&&p.TweenMax||i).from(t,e,s),r)},d.fromTo=function(t,e,s,r,n){var a=r.repeat&&p.TweenMax||i;return e?this.add(a.fromTo(t,e,s,r),n):this.set(t,r,n)},d.staggerTo=function(t,e,r,n,a,h,l,_){var u,p=new s({onComplete:h,onCompleteParams:l,onCompleteScope:_,smoothChildTiming:this.smoothChildTiming});for("string"==typeof t&&(t=i.selector(t)||t),t=t||[],o(t)&&(t=m(t)),n=n||0,0>n&&(t=m(t),t.reverse(),n*=-1),u=0;t.length>u;u++)r.startAt&&(r.startAt=f(r.startAt)),p.to(t[u],e,f(r),u*n);return this.add(p,a)},d.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},d.staggerFromTo=function(t,e,i,s,r,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,h)},d.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},d.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},d.add=function(r,n,a,o){var l,_,u,p,f,c;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&h(r)){for(a=a||"normal",o=o||0,l=n,_=r.length,u=0;_>u;u++)h(p=r[u])&&(p=new s({tweens:p})),this.add(p,l),"string"!=typeof p&&"function"!=typeof p&&("sequence"===a?l=p._startTime+p.totalDuration()/p._timeScale:"start"===a&&(p._startTime-=p.delay())),l+=o;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(f=this,c=f.rawTime()>r._startTime;f._timeline;)c&&f._timeline.smoothChildTiming?f.totalTime(f._totalTime,!0):f._gc&&f._enabled(!0,!1),f=f._timeline;return this},d.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&h(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},d._remove=function(t,i){e.prototype._remove.call(this,t,i);var s=this._last;return s?this._time>s._startTime+s._totalDuration/s._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},d.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},d.insert=d.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},d.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},d.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},d.addPause=function(t,e,s,r){var n=i.delayedCall(0,c,["{self}",e,s,r],this);return n.data="isPause",this.add(n,t)},d.removeLabel=function(t){return delete this._labels[t],this},d.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},d._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&h(r)))for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},d.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},d.stop=function(){return this.paused(!0)},d.gotoAndPlay=function(t,e){return this.play(t,e)},d.gotoAndStop=function(t,e){return this.pause(t,e)},d.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,h,p=this._dirty?this.totalDuration():this._totalDuration,f=this._time,c=this._startTime,m=this._timeScale,d=this._paused;if(t>=p)this._totalTime=this._time=p,this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",h=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(h=!0,this._rawPrevTime>r&&(o="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=p+1e-4;else if(1e-7>t)if(this._totalTime=this._time=0,(0!==f||0===this._duration&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(o="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(h=n=!0,o="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(h=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,0===t&&n)for(s=this._first;s&&0===s._startTime;)s._duration||(n=!1),s=s._next;t=0,this._initted||(h=!0)}else this._totalTime=this._time=this._rawPrevTime=t;if(this._time!==f&&this._first||i||h){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==f&&t>0&&(this._active=!0),0===f&&this.vars.onStart&&0!==this._time&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||u)),this._time>=f)for(s=this._first;s&&(a=s._next,!this._paused||d);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||d);)(s._active||f>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;this._onUpdate&&(e||(l.length&&_(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||u))),o&&(this._gc||(c===this._startTime||m!==this._timeScale)&&(0===this._time||p>=this.totalDuration())&&(n&&(l.length&&_(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this.vars[o].apply(this.vars[o+"Scope"]||this,this.vars[o+"Params"]||u)))}},d._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},d.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},d.getTweensOf=function(t,e){var s,r,n=this._gc,a=[],o=0;for(n&&this._enabled(!0,!0),s=i.getTweensOf(t),r=s.length;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(a[o++]=s[r]);return n&&this._enabled(!1,!0),a},d.recent=function(){return this._recent},d._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},d.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},d._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},d.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},d.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},d._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},d.totalTime=function(){this._forcingPlayhead=!0;var e=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},d.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},d.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},d.paused=function(e){if(!e)for(var i=this._first,s=this._time;i;)i._startTime===s&&"isPause"===i.data&&(i._rawPrevTime=0),i=i._next;return t.prototype.paused.apply(this,arguments)},d.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},d.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0),_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(t,e,i){var s=function(e){t.call(this,e),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},r=1e-10,n=[],a=e._internals,o=a.lazyTweens,h=a.lazyRender,l=new i(null,null,1,0),_=s.prototype=new t;return _.constructor=s,_.kill()._gc=!1,s.version="1.16.1",_.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),t.prototype.invalidate.call(this)},_.addCallback=function(t,i,s,r){return this.add(e.delayedCall(0,t,s,r),i)},_.removeCallback=function(t,e){if(t)if(null==e)this._kill(null,t);else for(var i=this.getTweensOf(t,!1),s=i.length,r=this._parseTimeOrLabel(e);--s>-1;)i[s]._startTime===r&&i[s]._enabled(!1,!1);return this},_.removePause=function(e){return this.removeCallback(t._internals.pauseCallback,e)},_.tweenTo=function(t,i){i=i||{};var s,r,a,o={ease:l,useFrames:this.usesFrames(),immediateRender:!1};for(r in i)o[r]=i[r];return o.time=this._parseTimeOrLabel(t),s=Math.abs(Number(o.time)-this._time)/this._timeScale||.001,a=new e(this,s,o),o.onStart=function(){a.target.paused(!0),a.vars.time!==a.target.time()&&s===a.duration()&&a.duration(Math.abs(a.vars.time-a.target.time())/a.target._timeScale),i.onStart&&i.onStart.apply(i.onStartScope||a,i.onStartParams||n)},a},_.tweenFromTo=function(t,e,i){i=i||{},t=this._parseTimeOrLabel(t),i.startAt={onComplete:this.seek,onCompleteParams:[t],onCompleteScope:this},i.immediateRender=i.immediateRender!==!1;var s=this.tweenTo(e,i);return s.duration(Math.abs(s.vars.time-t)/this._timeScale||.001)},_.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,a,l,_,u,p,f=this._dirty?this.totalDuration():this._totalDuration,c=this._duration,m=this._time,d=this._totalTime,g=this._startTime,v=this._timeScale,y=this._rawPrevTime,T=this._paused,w=this._cycle;if(t>=f)this._locked||(this._totalTime=f,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(a=!0,_="onComplete",u=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>y||y===r)&&y!==t&&this._first&&(u=!0,y>r&&(_="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,this._yoyo&&0!==(1&this._cycle)?this._time=t=0:(this._time=c,t=c+1e-4);else if(1e-7>t)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==m||0===c&&y!==r&&(y>0||0>t&&y>=0)&&!this._locked)&&(_="onReverseComplete",a=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(u=a=!0,_="onReverseComplete"):y>=0&&this._first&&(u=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=c||!e||t||this._rawPrevTime===t?t:r,0===t&&a)for(s=this._first;s&&0===s._startTime;)s._duration||(a=!1),s=s._next;t=0,this._initted||(u=!0)}else 0===c&&0>y&&(u=!0),this._time=this._rawPrevTime=t,this._locked||(this._totalTime=t,0!==this._repeat&&(p=c+this._repeatDelay,this._cycle=this._totalTime/p>>0,0!==this._cycle&&this._cycle===this._totalTime/p&&this._cycle--,this._time=this._totalTime-this._cycle*p,this._yoyo&&0!==(1&this._cycle)&&(this._time=c-this._time),this._time>c?(this._time=c,t=c+1e-4):0>this._time?this._time=t=0:t=this._time));if(this._cycle!==w&&!this._locked){var x=this._yoyo&&0!==(1&w),b=x===(this._yoyo&&0!==(1&this._cycle)),P=this._totalTime,S=this._cycle,k=this._rawPrevTime,R=this._time;if(this._totalTime=w*c,w>this._cycle?x=!x:this._totalTime+=c,this._time=m,this._rawPrevTime=0===c?y-1e-4:y,this._cycle=w,this._locked=!0,m=x?0:c,this.render(m,e,0===c),e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||n),b&&(m=x?c+1e-4:-1e-4,this.render(m,!0,!1)),this._locked=!1,this._paused&&!T)return;this._time=R,this._totalTime=P,this._cycle=S,this._rawPrevTime=k}if(!(this._time!==m&&this._first||i||u))return d!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n)),void 0;if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==d&&t>0&&(this._active=!0),0===d&&this.vars.onStart&&0!==this._totalTime&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||n)),this._time>=m)for(s=this._first;s&&(l=s._next,!this._paused||T);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=l;else for(s=this._last;s&&(l=s._prev,!this._paused||T);)(s._active||m>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=l;this._onUpdate&&(e||(o.length&&h(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n))),_&&(this._locked||this._gc||(g===this._startTime||v!==this._timeScale)&&(0===this._time||f>=this.totalDuration())&&(a&&(o.length&&h(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[_]&&this.vars[_].apply(this.vars[_+"Scope"]||this,this.vars[_+"Params"]||n)))},_.getActive=function(t,e,i){null==t&&(t=!0),null==e&&(e=!0),null==i&&(i=!1);var s,r,n=[],a=this.getChildren(t,e,i),o=0,h=a.length;for(s=0;h>s;s++)r=a[s],r.isActive()&&(n[o++]=r);return n},_.getLabelAfter=function(t){t||0!==t&&(t=this._time);var e,i=this.getLabelsArray(),s=i.length;for(e=0;s>e;e++)if(i[e].time>t)return i[e].name;return null},_.getLabelBefore=function(t){null==t&&(t=this._time);for(var e=this.getLabelsArray(),i=e.length;--i>-1;)if(t>e[i].time)return e[i].name;return null},_.getLabelsArray=function(){var t,e=[],i=0;for(t in this._labels)e[i++]={time:this._labels[t],name:t};return e.sort(function(t,e){return t.time-e.time}),e},_.progress=function(t,e){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),e):this._time/this.duration()},_.totalProgress=function(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this._totalTime/this.totalDuration()},_.totalDuration=function(e){return arguments.length?-1===this._repeat?this:this.duration((e-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(t.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},_.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},_.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},_.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},_.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},_.currentLabel=function(t){return arguments.length?this.seek(t,!0):this.getLabelBefore(this._time+1e-8)},s},!0),function(){var t=180/Math.PI,e=[],i=[],s=[],r={},n=_gsScope._gsDefine.globals,a=function(t,e,i,s){this.a=t,this.b=e,this.c=i,this.d=s,this.da=s-t,this.ca=i-t,this.ba=e-t},o=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",h=function(t,e,i,s){var r={a:t},n={},a={},o={c:s},h=(t+e)/2,l=(e+i)/2,_=(i+s)/2,u=(h+l)/2,p=(l+_)/2,f=(p-u)/8;return r.b=h+(t-h)/4,n.b=u+f,r.c=n.a=(r.b+n.b)/2,n.c=a.a=(u+p)/2,a.b=p-f,o.b=_+(s-_)/4,a.c=o.a=(a.b+o.b)/2,[r,n,a,o]},l=function(t,r,n,a,o){var l,_,u,p,f,c,m,d,g,v,y,T,w,x=t.length-1,b=0,P=t[0].a;for(l=0;x>l;l++)f=t[b],_=f.a,u=f.d,p=t[b+1].d,o?(y=e[l],T=i[l],w=.25*(T+y)*r/(a?.5:s[l]||.5),c=u-(u-_)*(a?.5*r:0!==y?w/y:0),m=u+(p-u)*(a?.5*r:0!==T?w/T:0),d=u-(c+((m-c)*(3*y/(y+T)+.5)/4||0))):(c=u-.5*(u-_)*r,m=u+.5*(p-u)*r,d=u-(c+m)/2),c+=d,m+=d,f.c=g=c,f.b=0!==l?P:P=f.a+.6*(f.c-f.a),f.da=u-_,f.ca=g-_,f.ba=P-_,n?(v=h(_,P,g,u),t.splice(b,1,v[0],v[1],v[2],v[3]),b+=4):b++,P=m;f=t[b],f.b=P,f.c=P+.4*(f.d-P),f.da=f.d-f.a,f.ca=f.c-f.a,f.ba=P-f.a,n&&(v=h(f.a,P,f.c,f.d),t.splice(b,1,v[0],v[1],v[2],v[3]))},_=function(t,s,r,n){var o,h,l,_,u,p,f=[];if(n)for(t=[n].concat(t),h=t.length;--h>-1;)"string"==typeof(p=t[h][s])&&"="===p.charAt(1)&&(t[h][s]=n[s]+Number(p.charAt(0)+p.substr(2)));if(o=t.length-2,0>o)return f[0]=new a(t[0][s],0,0,t[-1>o?0:1][s]),f;for(h=0;o>h;h++)l=t[h][s],_=t[h+1][s],f[h]=new a(l,0,0,_),r&&(u=t[h+2][s],e[h]=(e[h]||0)+(_-l)*(_-l),i[h]=(i[h]||0)+(u-_)*(u-_));return f[h]=new a(t[h][s],0,0,t[h+1][s]),f},u=function(t,n,a,h,u,p){var f,c,m,d,g,v,y,T,w={},x=[],b=p||t[0];u="string"==typeof u?","+u+",":o,null==n&&(n=1);for(c in t[0])x.push(c);if(t.length>1){for(T=t[t.length-1],y=!0,f=x.length;--f>-1;)if(c=x[f],Math.abs(b[c]-T[c])>.05){y=!1;break}y&&(t=t.concat(),p&&t.unshift(p),t.push(t[1]),p=t[t.length-3])}for(e.length=i.length=s.length=0,f=x.length;--f>-1;)c=x[f],r[c]=-1!==u.indexOf(","+c+","),w[c]=_(t,c,r[c],p);for(f=e.length;--f>-1;)e[f]=Math.sqrt(e[f]),i[f]=Math.sqrt(i[f]);if(!h){for(f=x.length;--f>-1;)if(r[c])for(m=w[x[f]],v=m.length-1,d=0;v>d;d++)g=m[d+1].da/i[d]+m[d].da/e[d],s[d]=(s[d]||0)+g*g;for(f=s.length;--f>-1;)s[f]=Math.sqrt(s[f])}for(f=x.length,d=a?4:1;--f>-1;)c=x[f],m=w[c],l(m,n,a,h,r[c]),y&&(m.splice(0,d),m.splice(m.length-d,d));return w},p=function(t,e,i){e=e||"soft";var s,r,n,o,h,l,_,u,p,f,c,m={},d="cubic"===e?3:2,g="soft"===e,v=[];if(g&&i&&(t=[i].concat(t)),null==t||d+1>t.length)throw"invalid Bezier data";for(p in t[0])v.push(p);for(l=v.length;--l>-1;){for(p=v[l],m[p]=h=[],f=0,u=t.length,_=0;u>_;_++)s=null==i?t[_][p]:"string"==typeof(c=t[_][p])&&"="===c.charAt(1)?i[p]+Number(c.charAt(0)+c.substr(2)):Number(c),g&&_>1&&u-1>_&&(h[f++]=(s+h[f-2])/2),h[f++]=s;for(u=f-d+1,f=0,_=0;u>_;_+=d)s=h[_],r=h[_+1],n=h[_+2],o=2===d?0:h[_+3],h[f++]=c=3===d?new a(s,r,n,o):new a(s,(2*r+s)/3,(2*r+n)/3,n);h.length=f}return m},f=function(t,e,i){for(var s,r,n,a,o,h,l,_,u,p,f,c=1/i,m=t.length;--m>-1;)for(p=t[m],n=p.a,a=p.d-n,o=p.c-n,h=p.b-n,s=r=0,_=1;i>=_;_++)l=c*_,u=1-l,s=r-(r=(l*l*a+3*u*(l*o+u*h))*l),f=m*i+_-1,e[f]=(e[f]||0)+s*s},c=function(t,e){e=e>>0||6;var i,s,r,n,a=[],o=[],h=0,l=0,_=e-1,u=[],p=[];for(i in t)f(t[i],a,e);for(r=a.length,s=0;r>s;s++)h+=Math.sqrt(a[s]),n=s%e,p[n]=h,n===_&&(l+=h,n=s/e>>0,u[n]=p,o[n]=l,h=0,p=[]);return{length:l,lengths:o,segments:u}},m=_gsScope._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.4",API:2,global:!0,init:function(t,e,i){this._target=t,e instanceof Array&&(e={values:e}),this._func={},this._round={},this._props=[],this._timeRes=null==e.timeResolution?6:parseInt(e.timeResolution,10);var s,r,n,a,o,h=e.values||[],l={},_=h[0],f=e.autoRotate||i.vars.orientToBezier;this._autoRotate=f?f instanceof Array?f:[["x","y","rotation",f===!0?0:Number(f)||0]]:null;for(s in _)this._props.push(s);for(n=this._props.length;--n>-1;)s=this._props[n],this._overwriteProps.push(s),r=this._func[s]="function"==typeof t[s],l[s]=r?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]():parseFloat(t[s]),o||l[s]!==h[0][s]&&(o=l);if(this._beziers="cubic"!==e.type&&"quadratic"!==e.type&&"soft"!==e.type?u(h,isNaN(e.curviness)?1:e.curviness,!1,"thruBasic"===e.type,e.correlate,o):p(h,e.type,l),this._segCount=this._beziers[s].length,this._timeRes){var m=c(this._beziers,this._timeRes);this._length=m.length,this._lengths=m.lengths,this._segments=m.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(f=this._autoRotate)for(this._initialRotations=[],f[0]instanceof Array||(this._autoRotate=f=[f]),n=f.length;--n>-1;){for(a=0;3>a;a++)s=f[n][a],this._func[s]="function"==typeof t[s]?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]:!1;
s=f[n][2],this._initialRotations[n]=this._func[s]?this._func[s].call(this._target):this._target[s]}return this._startRatio=i.vars.runBackwards?1:0,!0},set:function(e){var i,s,r,n,a,o,h,l,_,u,p=this._segCount,f=this._func,c=this._target,m=e!==this._startRatio;if(this._timeRes){if(_=this._lengths,u=this._curSeg,e*=this._length,r=this._li,e>this._l2&&p-1>r){for(l=p-1;l>r&&e>=(this._l2=_[++r]););this._l1=_[r-1],this._li=r,this._curSeg=u=this._segments[r],this._s2=u[this._s1=this._si=0]}else if(this._l1>e&&r>0){for(;r>0&&(this._l1=_[--r])>=e;);0===r&&this._l1>e?this._l1=0:r++,this._l2=_[r],this._li=r,this._curSeg=u=this._segments[r],this._s1=u[(this._si=u.length-1)-1]||0,this._s2=u[this._si]}if(i=r,e-=this._l1,r=this._si,e>this._s2&&u.length-1>r){for(l=u.length-1;l>r&&e>=(this._s2=u[++r]););this._s1=u[r-1],this._si=r}else if(this._s1>e&&r>0){for(;r>0&&(this._s1=u[--r])>=e;);0===r&&this._s1>e?this._s1=0:r++,this._s2=u[r],this._si=r}o=(r+(e-this._s1)/(this._s2-this._s1))*this._prec}else i=0>e?0:e>=1?p-1:p*e>>0,o=(e-i*(1/p))*p;for(s=1-o,r=this._props.length;--r>-1;)n=this._props[r],a=this._beziers[n][i],h=(o*o*a.da+3*s*(o*a.ca+s*a.ba))*o+a.a,this._round[n]&&(h=Math.round(h)),f[n]?c[n](h):c[n]=h;if(this._autoRotate){var d,g,v,y,T,w,x,b=this._autoRotate;for(r=b.length;--r>-1;)n=b[r][2],w=b[r][3]||0,x=b[r][4]===!0?1:t,a=this._beziers[b[r][0]],d=this._beziers[b[r][1]],a&&d&&(a=a[i],d=d[i],g=a.a+(a.b-a.a)*o,y=a.b+(a.c-a.b)*o,g+=(y-g)*o,y+=(a.c+(a.d-a.c)*o-y)*o,v=d.a+(d.b-d.a)*o,T=d.b+(d.c-d.b)*o,v+=(T-v)*o,T+=(d.c+(d.d-d.c)*o-T)*o,h=m?Math.atan2(T-v,y-g)*x+w:this._initialRotations[r],f[n]?c[n](h):c[n]=h)}}}),d=m.prototype;m.bezierThrough=u,m.cubicToQuadratic=h,m._autoCSS=!0,m.quadraticToCubic=function(t,e,i){return new a(t,(2*e+t)/3,(2*e+i)/3,i)},m._cssRegister=function(){var t=n.CSSPlugin;if(t){var e=t._internals,i=e._parseToProxy,s=e._setPluginRatio,r=e.CSSPropTween;e._registerComplexSpecialProp("bezier",{parser:function(t,e,n,a,o,h){e instanceof Array&&(e={values:e}),h=new m;var l,_,u,p=e.values,f=p.length-1,c=[],d={};if(0>f)return o;for(l=0;f>=l;l++)u=i(t,p[l],a,o,h,f!==l),c[l]=u.end;for(_ in e)d[_]=e[_];return d.values=c,o=new r(t,"bezier",0,0,u.pt,2),o.data=u,o.plugin=h,o.setRatio=s,0===d.autoRotate&&(d.autoRotate=!0),!d.autoRotate||d.autoRotate instanceof Array||(l=d.autoRotate===!0?0:Number(d.autoRotate),d.autoRotate=null!=u.end.left?[["left","top","rotation",l,!1]]:null!=u.end.x?[["x","y","rotation",l,!1]]:!1),d.autoRotate&&(a._transform||a._enableTransforms(!1),u.autoRotate=a._target._gsTransform),h._onInitTween(u.proxy,d,a._tween),o}})}},d._roundProps=function(t,e){for(var i=this._overwriteProps,s=i.length;--s>-1;)(t[i[s]]||t.bezier||t.bezierThrough)&&(this._round[i[s]]=e)},d._kill=function(t){var e,i,s=this._props;for(e in this._beziers)if(e in t)for(delete this._beziers[e],delete this._func[e],i=s.length;--i>-1;)s[i]===e&&s.splice(i,1);return this._super._kill.call(this,t)}}(),_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,s,r,n,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o=_gsScope._gsDefine.globals,h={},l=a.prototype=new t("css");l.constructor=a,a.version="1.16.1",a.API=2,a.defaultTransformPerspective=0,a.defaultSkewType="compensated",l="px",a.suffixMap={top:l,right:l,bottom:l,left:l,width:l,height:l,fontSize:l,padding:l,margin:l,perspective:l,lineHeight:""};var _,u,p,f,c,m,d=/(?:\d|\-\d|\.\d|\-\.\d)+/g,g=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,v=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,y=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,T=/(?:\d|\-|\+|=|#|\.)*/g,w=/opacity *= *([^)]*)/i,x=/opacity:([^;]*)/i,b=/alpha\(opacity *=.+?\)/i,P=/^(rgb|hsl)/,S=/([A-Z])/g,k=/-([a-z])/gi,R=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,A=function(t,e){return e.toUpperCase()},O=/(?:Left|Right|Width)/i,C=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,D=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,M=/,(?=[^\)]*(?:\(|$))/gi,z=Math.PI/180,I=180/Math.PI,F={},E=document,N=function(t){return E.createElementNS?E.createElementNS("http://www.w3.org/1999/xhtml",t):E.createElement(t)},L=N("div"),X=N("img"),U=a._internals={_specialProps:h},Y=navigator.userAgent,j=function(){var t=Y.indexOf("Android"),e=N("a");return p=-1!==Y.indexOf("Safari")&&-1===Y.indexOf("Chrome")&&(-1===t||Number(Y.substr(t+8,1))>3),c=p&&6>Number(Y.substr(Y.indexOf("Version/")+8,1)),f=-1!==Y.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y))&&(m=parseFloat(RegExp.$1)),e?(e.style.cssText="top:1px;opacity:.55;",/^0.55/.test(e.style.opacity)):!1}(),B=function(t){return w.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},q=function(t){window.console&&console.log(t)},V="",G="",W=function(t,e){e=e||L;var i,s,r=e.style;if(void 0!==r[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],s=5;--s>-1&&void 0===r[i[s]+t];);return s>=0?(G=3===s?"ms":i[s],V="-"+G.toLowerCase()+"-",G+t):null},Z=E.defaultView?E.defaultView.getComputedStyle:function(){},Q=a.getStyle=function(t,e,i,s,r){var n;return j||"opacity"!==e?(!s&&t.style[e]?n=t.style[e]:(i=i||Z(t))?n=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(S,"-$1").toLowerCase()):t.currentStyle&&(n=t.currentStyle[e]),null==r||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:r):B(t)},$=U.convertToPixels=function(t,i,s,r,n){if("px"===r||!r)return s;if("auto"===r||!s)return 0;var o,h,l,_=O.test(i),u=t,p=L.style,f=0>s;if(f&&(s=-s),"%"===r&&-1!==i.indexOf("border"))o=s/100*(_?t.clientWidth:t.clientHeight);else{if(p.cssText="border:0 solid red;position:"+Q(t,"position")+";line-height:0;","%"!==r&&u.appendChild)p[_?"borderLeftWidth":"borderTopWidth"]=s+r;else{if(u=t.parentNode||E.body,h=u._gsCache,l=e.ticker.frame,h&&_&&h.time===l)return h.width*s/100;p[_?"width":"height"]=s+r}u.appendChild(L),o=parseFloat(L[_?"offsetWidth":"offsetHeight"]),u.removeChild(L),_&&"%"===r&&a.cacheWidths!==!1&&(h=u._gsCache=u._gsCache||{},h.time=l,h.width=100*(o/s)),0!==o||n||(o=$(t,i,s,r,!0))}return f?-o:o},H=U.calculateOffset=function(t,e,i){if("absolute"!==Q(t,"position",i))return 0;var s="left"===e?"Left":"Top",r=Q(t,"margin"+s,i);return t["offset"+s]-($(t,e,parseFloat(r),r.replace(T,""))||0)},K=function(t,e){var i,s,r,n={};if(e=e||Z(t,null))if(i=e.length)for(;--i>-1;)r=e[i],(-1===r.indexOf("-transform")||be===r)&&(n[r.replace(k,A)]=e.getPropertyValue(r));else for(i in e)(-1===i.indexOf("Transform")||xe===i)&&(n[i]=e[i]);else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===n[i]&&(n[i.replace(k,A)]=e[i]);return j||(n.opacity=B(t)),s=Me(t,e,!1),n.rotation=s.rotation,n.skewX=s.skewX,n.scaleX=s.scaleX,n.scaleY=s.scaleY,n.x=s.x,n.y=s.y,Se&&(n.z=s.z,n.rotationX=s.rotationX,n.rotationY=s.rotationY,n.scaleZ=s.scaleZ),n.filters&&delete n.filters,n},J=function(t,e,i,s,r){var n,a,o,h={},l=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(n=i[a])||r&&r[a])&&-1===a.indexOf("Origin")&&("number"==typeof n||"string"==typeof n)&&(h[a]="auto"!==n||"left"!==a&&"top"!==a?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[a]||""===e[a].replace(y,"")?n:0:H(t,a),void 0!==l[a]&&(o=new fe(l,a,l[a],o)));if(s)for(a in s)"className"!==a&&(h[a]=s[a]);return{difs:h,firstMPT:o}},te={width:["Left","Right"],height:["Top","Bottom"]},ee=["marginLeft","marginRight","marginTop","marginBottom"],ie=function(t,e,i){var s=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),r=te[e],n=r.length;for(i=i||Z(t,null);--n>-1;)s-=parseFloat(Q(t,"padding"+r[n],i,!0))||0,s-=parseFloat(Q(t,"border"+r[n]+"Width",i,!0))||0;return s},se=function(t,e){(null==t||""===t||"auto"===t||"auto auto"===t)&&(t="0 0");var i=t.split(" "),s=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],r=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==r?r="center"===s?"50%":"0":"center"===r&&(r="50%"),("center"===s||isNaN(parseFloat(s))&&-1===(s+"").indexOf("="))&&(s="50%"),t=s+" "+r+(i.length>2?" "+i[2]:""),e&&(e.oxp=-1!==s.indexOf("%"),e.oyp=-1!==r.indexOf("%"),e.oxr="="===s.charAt(1),e.oyr="="===r.charAt(1),e.ox=parseFloat(s.replace(y,"")),e.oy=parseFloat(r.replace(y,"")),e.v=t),e||t},re=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},ne=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2))+e:parseFloat(t)},ae=function(t,e,i,s){var r,n,a,o,h,l=1e-6;return null==t?o=e:"number"==typeof t?o=t:(r=360,n=t.split("_"),h="="===t.charAt(1),a=(h?parseInt(t.charAt(0)+"1",10)*parseFloat(n[0].substr(2)):parseFloat(n[0]))*(-1===t.indexOf("rad")?1:I)-(h?0:e),n.length&&(s&&(s[i]=e+a),-1!==t.indexOf("short")&&(a%=r,a!==a%(r/2)&&(a=0>a?a+r:a-r)),-1!==t.indexOf("_cw")&&0>a?a=(a+9999999999*r)%r-(0|a/r)*r:-1!==t.indexOf("ccw")&&a>0&&(a=(a-9999999999*r)%r-(0|a/r)*r)),o=e+a),l>o&&o>-l&&(o=0),o},oe={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},he=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},le=a.parseColor=function(t){var e,i,s,r,n,a;return t&&""!==t?"number"==typeof t?[t>>16,255&t>>8,255&t]:(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),oe[t]?oe[t]:"#"===t.charAt(0)?(4===t.length&&(e=t.charAt(1),i=t.charAt(2),s=t.charAt(3),t="#"+e+e+i+i+s+s),t=parseInt(t.substr(1),16),[t>>16,255&t>>8,255&t]):"hsl"===t.substr(0,3)?(t=t.match(d),r=Number(t[0])%360/360,n=Number(t[1])/100,a=Number(t[2])/100,i=.5>=a?a*(n+1):a+n-a*n,e=2*a-i,t.length>3&&(t[3]=Number(t[3])),t[0]=he(r+1/3,e,i),t[1]=he(r,e,i),t[2]=he(r-1/3,e,i),t):(t=t.match(d)||oe.transparent,t[0]=Number(t[0]),t[1]=Number(t[1]),t[2]=Number(t[2]),t.length>3&&(t[3]=Number(t[3])),t)):oe.black},_e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(l in oe)_e+="|"+l+"\\b";_e=RegExp(_e+")","gi");var ue=function(t,e,i,s){if(null==t)return function(t){return t};var r,n=e?(t.match(_e)||[""])[0]:"",a=t.split(n).join("").match(v)||[],o=t.substr(0,t.indexOf(a[0])),h=")"===t.charAt(t.length-1)?")":"",l=-1!==t.indexOf(" ")?" ":",",_=a.length,u=_>0?a[0].replace(d,""):"";return _?r=e?function(t){var e,p,f,c;if("number"==typeof t)t+=u;else if(s&&M.test(t)){for(c=t.replace(M,"|").split("|"),f=0;c.length>f;f++)c[f]=r(c[f]);return c.join(",")}if(e=(t.match(_e)||[n])[0],p=t.split(e).join("").match(v)||[],f=p.length,_>f--)for(;_>++f;)p[f]=i?p[0|(f-1)/2]:a[f];return o+p.join(l)+l+e+h+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,n,p;if("number"==typeof t)t+=u;else if(s&&M.test(t)){for(n=t.replace(M,"|").split("|"),p=0;n.length>p;p++)n[p]=r(n[p]);return n.join(",")}if(e=t.match(v)||[],p=e.length,_>p--)for(;_>++p;)e[p]=i?e[0|(p-1)/2]:a[p];return o+e.join(l)+h}:function(t){return t}},pe=function(t){return t=t.split(","),function(e,i,s,r,n,a,o){var h,l=(i+"").split(" ");for(o={},h=0;4>h;h++)o[t[h]]=l[h]=l[h]||l[(h-1)/2>>0];return r.parse(e,o,n,a)}},fe=(U._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,s,r,n=this.data,a=n.proxy,o=n.firstMPT,h=1e-6;o;)e=a[o.v],o.r?e=Math.round(e):h>e&&e>-h&&(e=0),o.t[o.p]=e,o=o._next;if(n.autoRotate&&(n.autoRotate.rotation=a.rotation),1===t)for(o=n.firstMPT;o;){if(i=o.t,i.type){if(1===i.type){for(r=i.xs0+i.s+i.xs1,s=1;i.l>s;s++)r+=i["xn"+s]+i["xs"+(s+1)];i.e=r}}else i.e=i.s+i.xs0;o=o._next}},function(t,e,i,s,r){this.t=t,this.p=e,this.v=i,this.r=r,s&&(s._prev=this,this._next=s)}),ce=(U._parseToProxy=function(t,e,i,s,r,n){var a,o,h,l,_,u=s,p={},f={},c=i._transform,m=F;for(i._transform=null,F=e,s=_=i.parse(t,e,s,r),F=m,n&&(i._transform=c,u&&(u._prev=null,u._prev&&(u._prev._next=null)));s&&s!==u;){if(1>=s.type&&(o=s.p,f[o]=s.s+s.c,p[o]=s.s,n||(l=new fe(s,"s",o,l,s.r),s.c=0),1===s.type))for(a=s.l;--a>0;)h="xn"+a,o=s.p+"_"+h,f[o]=s.data[h],p[o]=s[h],n||(l=new fe(s,h,o,l,s.rxp[h]));s=s._next}return{proxy:p,end:f,firstMPT:l,pt:_}},U.CSSPropTween=function(t,e,s,r,a,o,h,l,_,u,p){this.t=t,this.p=e,this.s=s,this.c=r,this.n=h||e,t instanceof ce||n.push(this.n),this.r=l,this.type=o||0,_&&(this.pr=_,i=!0),this.b=void 0===u?s:u,this.e=void 0===p?s+r:p,a&&(this._next=a,a._prev=this)}),me=a.parseComplex=function(t,e,i,s,r,n,a,o,h,l){i=i||n||"",a=new ce(t,e,0,0,a,l?2:1,null,!1,o,i,s),s+="";var u,p,f,c,m,v,y,T,w,x,b,S,k=i.split(", ").join(",").split(" "),R=s.split(", ").join(",").split(" "),A=k.length,O=_!==!1;for((-1!==s.indexOf(",")||-1!==i.indexOf(","))&&(k=k.join(" ").replace(M,", ").split(" "),R=R.join(" ").replace(M,", ").split(" "),A=k.length),A!==R.length&&(k=(n||"").split(" "),A=k.length),a.plugin=h,a.setRatio=l,u=0;A>u;u++)if(c=k[u],m=R[u],T=parseFloat(c),T||0===T)a.appendXtra("",T,re(m,T),m.replace(g,""),O&&-1!==m.indexOf("px"),!0);else if(r&&("#"===c.charAt(0)||oe[c]||P.test(c)))S=","===m.charAt(m.length-1)?"),":")",c=le(c),m=le(m),w=c.length+m.length>6,w&&!j&&0===m[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(R[u]).join("transparent")):(j||(w=!1),a.appendXtra(w?"rgba(":"rgb(",c[0],m[0]-c[0],",",!0,!0).appendXtra("",c[1],m[1]-c[1],",",!0).appendXtra("",c[2],m[2]-c[2],w?",":S,!0),w&&(c=4>c.length?1:c[3],a.appendXtra("",c,(4>m.length?1:m[3])-c,S,!1)));else if(v=c.match(d)){if(y=m.match(g),!y||y.length!==v.length)return a;for(f=0,p=0;v.length>p;p++)b=v[p],x=c.indexOf(b,f),a.appendXtra(c.substr(f,x-f),Number(b),re(y[p],b),"",O&&"px"===c.substr(x+b.length,2),0===p),f=x+b.length;a["xs"+a.l]+=c.substr(f)}else a["xs"+a.l]+=a.l?" "+c:c;if(-1!==s.indexOf("=")&&a.data){for(S=a.xs0+a.data.s,u=1;a.l>u;u++)S+=a["xs"+u]+a.data["xn"+u];a.e=S+a["xs"+u]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},de=9;for(l=ce.prototype,l.l=l.pr=0;--de>0;)l["xn"+de]=0,l["xs"+de]="";l.xs0="",l._next=l._prev=l.xfirst=l.data=l.plugin=l.setRatio=l.rxp=null,l.appendXtra=function(t,e,i,s,r,n){var a=this,o=a.l;return a["xs"+o]+=n&&o?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=s||"",o>0?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=r,a["xn"+o]=e,a.plugin||(a.xfirst=new ce(a,"xn"+o,e,i,a.xfirst||a,0,a.n,r,a.pr),a.xfirst.xs0=0),a):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=r,a)):(a["xs"+o]+=e+(s||""),a)};var ge=function(t,e){e=e||{},this.p=e.prefix?W(t)||t:t,h[t]=h[this.p]=this,this.format=e.formatter||ue(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},ve=U._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var s,r,n=t.split(","),a=e.defaultValue;for(i=i||[a],s=0;n.length>s;s++)e.prefix=0===s&&e.prefix,e.defaultValue=i[s]||a,r=new ge(n[s],e)},ye=function(t){if(!h[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";ve(t,{parser:function(t,i,s,r,n,a,l){var _=o.com.greensock.plugins[e];return _?(_._cssRegister(),h[s].parse(t,i,s,r,n,a,l)):(q("Error: "+e+" js file not loaded."),n)}})}};l=ge.prototype,l.parseComplex=function(t,e,i,s,r,n){var a,o,h,l,_,u,p=this.keyword;if(this.multi&&(M.test(i)||M.test(e)?(o=e.replace(M,"|").split("|"),h=i.replace(M,"|").split("|")):p&&(o=[e],h=[i])),h){for(l=h.length>o.length?h.length:o.length,a=0;l>a;a++)e=o[a]=o[a]||this.dflt,i=h[a]=h[a]||this.dflt,p&&(_=e.indexOf(p),u=i.indexOf(p),_!==u&&(-1===u?o[a]=o[a].split(p).join(""):-1===_&&(o[a]+=" "+p)));e=o.join(", "),i=h.join(", ")}return me(t,this.p,e,i,this.clrs,this.dflt,s,this.pr,r,n)},l.parse=function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(Q(t,this.p,r,!1,this.dflt)),this.format(e),n,a)},a.registerSpecialProp=function(t,e,i){ve(t,{parser:function(t,s,r,n,a,o){var h=new ce(t,r,0,0,a,2,r,!1,i);return h.plugin=o,h.setRatio=e(t,s,n._tween,r),h},priority:i})},a.useSVGTransformAttr=p;var Te,we="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),xe=W("transform"),be=V+"transform",Pe=W("transformOrigin"),Se=null!==W("perspective"),ke=U.Transform=function(){this.perspective=parseFloat(a.defaultTransformPerspective)||0,this.force3D=a.defaultForce3D!==!1&&Se?a.defaultForce3D||"auto":!1},Re=window.SVGElement,Ae=function(t,e,i){var s,r=E.createElementNS("http://www.w3.org/2000/svg",t),n=/([a-z])([A-Z])/g;for(s in i)r.setAttributeNS(null,s.replace(n,"$1-$2").toLowerCase(),i[s]);return e.appendChild(r),r},Oe=E.documentElement,Ce=function(){var t,e,i,s=m||/Android/i.test(Y)&&!window.chrome;return E.createElementNS&&!s&&(t=Ae("svg",Oe),e=Ae("rect",t,{width:100,height:50,x:100}),i=e.getBoundingClientRect().width,e.style[Pe]="50% 50%",e.style[xe]="scaleX(0.5)",s=i===e.getBoundingClientRect().width&&!(f&&Se),Oe.removeChild(t)),s}(),De=function(t,e,i,s){var r,n;s&&(n=s.split(" ")).length||(r=t.getBBox(),e=se(e).split(" "),n=[(-1!==e[0].indexOf("%")?parseFloat(e[0])/100*r.width:parseFloat(e[0]))+r.x,(-1!==e[1].indexOf("%")?parseFloat(e[1])/100*r.height:parseFloat(e[1]))+r.y]),i.xOrigin=parseFloat(n[0]),i.yOrigin=parseFloat(n[1]),t.setAttribute("data-svg-origin",n.join(" "))},Me=U.getTransform=function(t,e,i,s){if(t._gsTransform&&i&&!s)return t._gsTransform;var n,o,h,l,_,u,p,f,c,m,d=i?t._gsTransform||new ke:new ke,g=0>d.scaleX,v=2e-5,y=1e5,T=Se?parseFloat(Q(t,Pe,e,!1,"0 0 0").split(" ")[2])||d.zOrigin||0:0,w=parseFloat(a.defaultTransformPerspective)||0;if(xe?o=Q(t,be,e,!0):t.currentStyle&&(o=t.currentStyle.filter.match(C),o=o&&4===o.length?[o[0].substr(4),Number(o[2].substr(4)),Number(o[1].substr(4)),o[3].substr(4),d.x||0,d.y||0].join(","):""),n=!o||"none"===o||"matrix(1, 0, 0, 1, 0, 0)"===o,d.svg=!!(Re&&"function"==typeof t.getBBox&&t.getCTM&&(!t.parentNode||t.parentNode.getBBox&&t.parentNode.getCTM)),d.svg&&(n&&-1!==(t.style[xe]+"").indexOf("matrix")&&(o=t.style[xe],n=!1),De(t,Q(t,Pe,r,!1,"50% 50%")+"",d,t.getAttribute("data-svg-origin")),Te=a.useSVGTransformAttr||Ce,h=t.getAttribute("transform"),n&&h&&-1!==h.indexOf("matrix")&&(o=h,n=0)),!n){for(h=(o||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],l=h.length;--l>-1;)_=Number(h[l]),h[l]=(u=_-(_|=0))?(0|u*y+(0>u?-.5:.5))/y+_:_;if(16===h.length){var x,b,P,S,k,R=h[0],A=h[1],O=h[2],D=h[3],M=h[4],z=h[5],F=h[6],E=h[7],N=h[8],L=h[9],X=h[10],U=h[12],Y=h[13],j=h[14],B=h[11],q=Math.atan2(F,X);d.zOrigin&&(j=-d.zOrigin,U=N*j-h[12],Y=L*j-h[13],j=X*j+d.zOrigin-h[14]),d.rotationX=q*I,q&&(S=Math.cos(-q),k=Math.sin(-q),x=M*S+N*k,b=z*S+L*k,P=F*S+X*k,N=M*-k+N*S,L=z*-k+L*S,X=F*-k+X*S,B=E*-k+B*S,M=x,z=b,F=P),q=Math.atan2(N,X),d.rotationY=q*I,q&&(S=Math.cos(-q),k=Math.sin(-q),x=R*S-N*k,b=A*S-L*k,P=O*S-X*k,L=A*k+L*S,X=O*k+X*S,B=D*k+B*S,R=x,A=b,O=P),q=Math.atan2(A,R),d.rotation=q*I,q&&(S=Math.cos(-q),k=Math.sin(-q),R=R*S+M*k,b=A*S+z*k,z=A*-k+z*S,F=O*-k+F*S,A=b),d.rotationX&&Math.abs(d.rotationX)+Math.abs(d.rotation)>359.9&&(d.rotationX=d.rotation=0,d.rotationY+=180),d.scaleX=(0|Math.sqrt(R*R+A*A)*y+.5)/y,d.scaleY=(0|Math.sqrt(z*z+L*L)*y+.5)/y,d.scaleZ=(0|Math.sqrt(F*F+X*X)*y+.5)/y,d.skewX=0,d.perspective=B?1/(0>B?-B:B):0,d.x=U,d.y=Y,d.z=j,d.svg&&(d.x-=d.xOrigin-(d.xOrigin*R-d.yOrigin*M),d.y-=d.yOrigin-(d.yOrigin*A-d.xOrigin*z))}else if(!(Se&&!s&&h.length&&d.x===h[4]&&d.y===h[5]&&(d.rotationX||d.rotationY)||void 0!==d.x&&"none"===Q(t,"display",e))){var V=h.length>=6,G=V?h[0]:1,W=h[1]||0,Z=h[2]||0,$=V?h[3]:1;d.x=h[4]||0,d.y=h[5]||0,p=Math.sqrt(G*G+W*W),f=Math.sqrt($*$+Z*Z),c=G||W?Math.atan2(W,G)*I:d.rotation||0,m=Z||$?Math.atan2(Z,$)*I+c:d.skewX||0,Math.abs(m)>90&&270>Math.abs(m)&&(g?(p*=-1,m+=0>=c?180:-180,c+=0>=c?180:-180):(f*=-1,m+=0>=m?180:-180)),d.scaleX=p,d.scaleY=f,d.rotation=c,d.skewX=m,Se&&(d.rotationX=d.rotationY=d.z=0,d.perspective=w,d.scaleZ=1),d.svg&&(d.x-=d.xOrigin-(d.xOrigin*G-d.yOrigin*W),d.y-=d.yOrigin-(d.yOrigin*$-d.xOrigin*Z))}d.zOrigin=T;for(l in d)v>d[l]&&d[l]>-v&&(d[l]=0)}return i&&(t._gsTransform=d,d.svg&&(Te&&t.style[xe]?Ee(t.style,xe):!Te&&t.getAttribute("transform")&&t.removeAttribute("transform"))),d},ze=function(t){var e,i,s=this.data,r=-s.rotation*z,n=r+s.skewX*z,a=1e5,o=(0|Math.cos(r)*s.scaleX*a)/a,h=(0|Math.sin(r)*s.scaleX*a)/a,l=(0|Math.sin(n)*-s.scaleY*a)/a,_=(0|Math.cos(n)*s.scaleY*a)/a,u=this.t.style,p=this.t.currentStyle;if(p){i=h,h=-l,l=-i,e=p.filter,u.filter="";var f,c,d=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==p.position,y="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+h+", M21="+l+", M22="+_,x=s.x+d*s.xPercent/100,b=s.y+g*s.yPercent/100;if(null!=s.ox&&(f=(s.oxp?.01*d*s.ox:s.ox)-d/2,c=(s.oyp?.01*g*s.oy:s.oy)-g/2,x+=f-(f*o+c*h),b+=c-(f*l+c*_)),v?(f=d/2,c=g/2,y+=", Dx="+(f-(f*o+c*h)+x)+", Dy="+(c-(f*l+c*_)+b)+")"):y+=", sizingMethod='auto expand')",u.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(D,y):y+" "+e,(0===t||1===t)&&1===o&&0===h&&0===l&&1===_&&(v&&-1===y.indexOf("Dx=0, Dy=0")||w.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf("gradient("&&e.indexOf("Alpha"))&&u.removeAttribute("filter")),!v){var P,S,k,R=8>m?1:-1;for(f=s.ieOffsetX||0,c=s.ieOffsetY||0,s.ieOffsetX=Math.round((d-((0>o?-o:o)*d+(0>h?-h:h)*g))/2+x),s.ieOffsetY=Math.round((g-((0>_?-_:_)*g+(0>l?-l:l)*d))/2+b),de=0;4>de;de++)S=ee[de],P=p[S],i=-1!==P.indexOf("px")?parseFloat(P):$(this.t,S,parseFloat(P),P.replace(T,""))||0,k=i!==s[S]?2>de?-s.ieOffsetX:-s.ieOffsetY:2>de?f-s.ieOffsetX:c-s.ieOffsetY,u[S]=(s[S]=Math.round(i-k*(0===de||2===de?1:R)))+"px"}}},Ie=U.set3DTransformRatio=U.setTransformRatio=function(t){var e,i,s,r,n,a,o,h,l,_,u,p,c,m,d,g,v,y,T,w,x,b,P,S=this.data,k=this.t.style,R=S.rotation,A=S.rotationX,O=S.rotationY,C=S.scaleX,D=S.scaleY,M=S.scaleZ,I=S.x,F=S.y,E=S.z,N=S.svg,L=S.perspective,X=S.force3D;if(!(((1!==t&&0!==t||"auto"!==X||this.tween._totalTime!==this.tween._totalDuration&&this.tween._totalTime)&&X||E||L||O||A)&&(!Te||!N)&&Se))return R||S.skewX||N?(R*=z,b=S.skewX*z,P=1e5,e=Math.cos(R)*C,r=Math.sin(R)*C,i=Math.sin(R-b)*-D,n=Math.cos(R-b)*D,b&&"simple"===S.skewType&&(v=Math.tan(b),v=Math.sqrt(1+v*v),i*=v,n*=v,S.skewY&&(e*=v,r*=v)),N&&(I+=S.xOrigin-(S.xOrigin*e+S.yOrigin*i),F+=S.yOrigin-(S.xOrigin*r+S.yOrigin*n),m=1e-6,m>I&&I>-m&&(I=0),m>F&&F>-m&&(F=0)),T=(0|e*P)/P+","+(0|r*P)/P+","+(0|i*P)/P+","+(0|n*P)/P+","+I+","+F+")",N&&Te?this.t.setAttribute("transform","matrix("+T):k[xe]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix(":"matrix(")+T):k[xe]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix(":"matrix(")+C+",0,0,"+D+","+I+","+F+")",void 0;if(f&&(m=1e-4,m>C&&C>-m&&(C=M=2e-5),m>D&&D>-m&&(D=M=2e-5),!L||S.z||S.rotationX||S.rotationY||(L=0)),R||S.skewX)R*=z,d=e=Math.cos(R),g=r=Math.sin(R),S.skewX&&(R-=S.skewX*z,d=Math.cos(R),g=Math.sin(R),"simple"===S.skewType&&(v=Math.tan(S.skewX*z),v=Math.sqrt(1+v*v),d*=v,g*=v,S.skewY&&(e*=v,r*=v))),i=-g,n=d;else{if(!(O||A||1!==M||L||N))return k[xe]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) translate3d(":"translate3d(")+I+"px,"+F+"px,"+E+"px)"+(1!==C||1!==D?" scale("+C+","+D+")":""),void 0;e=n=1,i=r=0}l=1,s=a=o=h=_=u=0,p=L?-1/L:0,c=S.zOrigin,m=1e-6,w=",",x="0",R=O*z,R&&(d=Math.cos(R),g=Math.sin(R),o=-g,_=p*-g,s=e*g,a=r*g,l=d,p*=d,e*=d,r*=d),R=A*z,R&&(d=Math.cos(R),g=Math.sin(R),v=i*d+s*g,y=n*d+a*g,h=l*g,u=p*g,s=i*-g+s*d,a=n*-g+a*d,l*=d,p*=d,i=v,n=y),1!==M&&(s*=M,a*=M,l*=M,p*=M),1!==D&&(i*=D,n*=D,h*=D,u*=D),1!==C&&(e*=C,r*=C,o*=C,_*=C),(c||N)&&(c&&(I+=s*-c,F+=a*-c,E+=l*-c+c),N&&(I+=S.xOrigin-(S.xOrigin*e+S.yOrigin*i),F+=S.yOrigin-(S.xOrigin*r+S.yOrigin*n)),m>I&&I>-m&&(I=x),m>F&&F>-m&&(F=x),m>E&&E>-m&&(E=0)),T=S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix3d(":"matrix3d(",T+=(m>e&&e>-m?x:e)+w+(m>r&&r>-m?x:r)+w+(m>o&&o>-m?x:o),T+=w+(m>_&&_>-m?x:_)+w+(m>i&&i>-m?x:i)+w+(m>n&&n>-m?x:n),A||O?(T+=w+(m>h&&h>-m?x:h)+w+(m>u&&u>-m?x:u)+w+(m>s&&s>-m?x:s),T+=w+(m>a&&a>-m?x:a)+w+(m>l&&l>-m?x:l)+w+(m>p&&p>-m?x:p)+w):T+=",0,0,0,0,1,0,",T+=I+w+F+w+E+w+(L?1+-E/L:1)+")",k[xe]=T};l=ke.prototype,l.x=l.y=l.z=l.skewX=l.skewY=l.rotation=l.rotationX=l.rotationY=l.zOrigin=l.xPercent=l.yPercent=0,l.scaleX=l.scaleY=l.scaleZ=1,ve("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",{parser:function(t,e,i,s,n,o,h){if(s._lastParsedTransform===h)return n;s._lastParsedTransform=h;var l,_,u,p,f,c,m,d=s._transform=Me(t,r,!0,h.parseTransform),g=t.style,v=1e-6,y=we.length,T=h,w={};if("string"==typeof T.transform&&xe)u=L.style,u[xe]=T.transform,u.display="block",u.position="absolute",E.body.appendChild(L),l=Me(L,null,!1),E.body.removeChild(L);else if("object"==typeof T){if(l={scaleX:ne(null!=T.scaleX?T.scaleX:T.scale,d.scaleX),scaleY:ne(null!=T.scaleY?T.scaleY:T.scale,d.scaleY),scaleZ:ne(T.scaleZ,d.scaleZ),x:ne(T.x,d.x),y:ne(T.y,d.y),z:ne(T.z,d.z),xPercent:ne(T.xPercent,d.xPercent),yPercent:ne(T.yPercent,d.yPercent),perspective:ne(T.transformPerspective,d.perspective)},m=T.directionalRotation,null!=m)if("object"==typeof m)for(u in m)T[u]=m[u];else T.rotation=m;"string"==typeof T.x&&-1!==T.x.indexOf("%")&&(l.x=0,l.xPercent=ne(T.x,d.xPercent)),"string"==typeof T.y&&-1!==T.y.indexOf("%")&&(l.y=0,l.yPercent=ne(T.y,d.yPercent)),l.rotation=ae("rotation"in T?T.rotation:"shortRotation"in T?T.shortRotation+"_short":"rotationZ"in T?T.rotationZ:d.rotation,d.rotation,"rotation",w),Se&&(l.rotationX=ae("rotationX"in T?T.rotationX:"shortRotationX"in T?T.shortRotationX+"_short":d.rotationX||0,d.rotationX,"rotationX",w),l.rotationY=ae("rotationY"in T?T.rotationY:"shortRotationY"in T?T.shortRotationY+"_short":d.rotationY||0,d.rotationY,"rotationY",w)),l.skewX=null==T.skewX?d.skewX:ae(T.skewX,d.skewX),l.skewY=null==T.skewY?d.skewY:ae(T.skewY,d.skewY),(_=l.skewY-d.skewY)&&(l.skewX+=_,l.rotation+=_)}for(Se&&null!=T.force3D&&(d.force3D=T.force3D,c=!0),d.skewType=T.skewType||d.skewType||a.defaultSkewType,f=d.force3D||d.z||d.rotationX||d.rotationY||l.z||l.rotationX||l.rotationY||l.perspective,f||null==T.scale||(l.scaleZ=1);--y>-1;)i=we[y],p=l[i]-d[i],(p>v||-v>p||null!=T[i]||null!=F[i])&&(c=!0,n=new ce(d,i,d[i],p,n),i in w&&(n.e=w[i]),n.xs0=0,n.plugin=o,s._overwriteProps.push(n.n));return p=T.transformOrigin,d.svg&&(p||T.svgOrigin)&&(De(t,se(p),l,T.svgOrigin),n=new ce(d,"xOrigin",d.xOrigin,l.xOrigin-d.xOrigin,n,-1,"transformOrigin"),n.b=d.xOrigin,n.e=n.xs0=l.xOrigin,n=new ce(d,"yOrigin",d.yOrigin,l.yOrigin-d.yOrigin,n,-1,"transformOrigin"),n.b=d.yOrigin,n.e=n.xs0=l.yOrigin,p=Te?null:"0px 0px"),(p||Se&&f&&d.zOrigin)&&(xe?(c=!0,i=Pe,p=(p||Q(t,i,r,!1,"50% 50%"))+"",n=new ce(g,i,0,0,n,-1,"transformOrigin"),n.b=g[i],n.plugin=o,Se?(u=d.zOrigin,p=p.split(" "),d.zOrigin=(p.length>2&&(0===u||"0px"!==p[2])?parseFloat(p[2]):u)||0,n.xs0=n.e=p[0]+" "+(p[1]||"50%")+" 0px",n=new ce(d,"zOrigin",0,0,n,-1,n.n),n.b=u,n.xs0=n.e=d.zOrigin):n.xs0=n.e=p):se(p+"",d)),c&&(s._transformType=d.svg&&Te||!f&&3!==this._transformType?2:3),n},prefix:!0}),ve("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),ve("borderRadius",{defaultValue:"0px",parser:function(t,e,i,n,a){e=this.format(e);var o,h,l,_,u,p,f,c,m,d,g,v,y,T,w,x,b=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(m=parseFloat(t.offsetWidth),d=parseFloat(t.offsetHeight),o=e.split(" "),h=0;b.length>h;h++)this.p.indexOf("border")&&(b[h]=W(b[h])),u=_=Q(t,b[h],r,!1,"0px"),-1!==u.indexOf(" ")&&(_=u.split(" "),u=_[0],_=_[1]),p=l=o[h],f=parseFloat(u),v=u.substr((f+"").length),y="="===p.charAt(1),y?(c=parseInt(p.charAt(0)+"1",10),p=p.substr(2),c*=parseFloat(p),g=p.substr((c+"").length-(0>c?1:0))||""):(c=parseFloat(p),g=p.substr((c+"").length)),""===g&&(g=s[i]||v),g!==v&&(T=$(t,"borderLeft",f,v),w=$(t,"borderTop",f,v),"%"===g?(u=100*(T/m)+"%",_=100*(w/d)+"%"):"em"===g?(x=$(t,"borderLeft",1,"em"),u=T/x+"em",_=w/x+"em"):(u=T+"px",_=w+"px"),y&&(p=parseFloat(u)+c+g,l=parseFloat(_)+c+g)),a=me(P,b[h],u+" "+_,p+" "+l,!1,"0px",a);return a},prefix:!0,formatter:ue("0px 0px 0px 0px",!1,!0)}),ve("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,s,n,a){var o,h,l,_,u,p,f="background-position",c=r||Z(t,null),d=this.format((c?m?c.getPropertyValue(f+"-x")+" "+c.getPropertyValue(f+"-y"):c.getPropertyValue(f):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==d.indexOf("%")!=(-1!==g.indexOf("%"))&&(p=Q(t,"backgroundImage").replace(R,""),p&&"none"!==p)){for(o=d.split(" "),h=g.split(" "),X.setAttribute("src",p),l=2;--l>-1;)d=o[l],_=-1!==d.indexOf("%"),_!==(-1!==h[l].indexOf("%"))&&(u=0===l?t.offsetWidth-X.width:t.offsetHeight-X.height,o[l]=_?parseFloat(d)/100*u+"px":100*(parseFloat(d)/u)+"%");d=o.join(" ")}return this.parseComplex(t.style,d,g,n,a)},formatter:se}),ve("backgroundSize",{defaultValue:"0 0",formatter:se}),ve("perspective",{defaultValue:"0px",prefix:!0}),ve("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),ve("transformStyle",{prefix:!0}),ve("backfaceVisibility",{prefix:!0}),ve("userSelect",{prefix:!0}),ve("margin",{parser:pe("marginTop,marginRight,marginBottom,marginLeft")}),ve("padding",{parser:pe("paddingTop,paddingRight,paddingBottom,paddingLeft")}),ve("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,s,n,a){var o,h,l;return 9>m?(h=t.currentStyle,l=8>m?" ":",",o="rect("+h.clipTop+l+h.clipRight+l+h.clipBottom+l+h.clipLeft+")",e=this.format(e).split(",").join(l)):(o=this.format(Q(t,this.p,r,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,o,e,n,a)}}),ve("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),ve("autoRound,strictUnits",{parser:function(t,e,i,s,r){return r}}),ve("border",{defaultValue:"0px solid #000",parser:function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(Q(t,"borderTopWidth",r,!1,"0px")+" "+Q(t,"borderTopStyle",r,!1,"solid")+" "+Q(t,"borderTopColor",r,!1,"#000")),this.format(e),n,a)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(_e)||["#000"])[0]}}),ve("borderWidth",{parser:pe("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),ve("float,cssFloat,styleFloat",{parser:function(t,e,i,s,r){var n=t.style,a="cssFloat"in n?"cssFloat":"styleFloat";return new ce(n,a,0,0,r,-1,i,!1,0,n[a],e)}});var Fe=function(t){var e,i=this.t,s=i.filter||Q(this.data,"filter")||"",r=0|this.s+this.c*t;100===r&&(-1===s.indexOf("atrix(")&&-1===s.indexOf("radient(")&&-1===s.indexOf("oader(")?(i.removeAttribute("filter"),e=!Q(this.data,"filter")):(i.filter=s.replace(b,""),e=!0)),e||(this.xn1&&(i.filter=s=s||"alpha(opacity="+r+")"),-1===s.indexOf("pacity")?0===r&&this.xn1||(i.filter=s+" alpha(opacity="+r+")"):i.filter=s.replace(w,"opacity="+r))};ve("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,s,n,a){var o=parseFloat(Q(t,"opacity",r,!1,"1")),h=t.style,l="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+o),l&&1===o&&"hidden"===Q(t,"visibility",r)&&0!==e&&(o=0),j?n=new ce(h,"opacity",o,e-o,n):(n=new ce(h,"opacity",100*o,100*(e-o),n),n.xn1=l?1:0,h.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=a,n.setRatio=Fe),l&&(n=new ce(h,"visibility",0,0,n,-1,null,!1,0,0!==o?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",s._overwriteProps.push(n.n),s._overwriteProps.push(i)),n}});var Ee=function(t,e){e&&(t.removeProperty?(("ms"===e.substr(0,2)||"webkit"===e.substr(0,6))&&(e="-"+e),t.removeProperty(e.replace(S,"-$1").toLowerCase())):t.removeAttribute(e))},Ne=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:Ee(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)
}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};ve("className",{parser:function(t,e,s,n,a,o,h){var l,_,u,p,f,c=t.getAttribute("class")||"",m=t.style.cssText;if(a=n._classNamePT=new ce(t,s,0,0,a,2),a.setRatio=Ne,a.pr=-11,i=!0,a.b=c,_=K(t,r),u=t._gsClassPT){for(p={},f=u.data;f;)p[f.p]=1,f=f._next;u.setRatio(1)}return t._gsClassPT=a,a.e="="!==e.charAt(1)?e:c.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),t.setAttribute("class",a.e),l=J(t,_,K(t),h,p),t.setAttribute("class",c),a.data=l.firstMPT,t.style.cssText=m,a=a.xfirst=n.parse(t,l.difs,a,o)}});var Le=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,s,r,n,a=this.t.style,o=h.transform.parse;if("all"===this.e)a.cssText="",r=!0;else for(e=this.e.split(" ").join("").split(","),s=e.length;--s>-1;)i=e[s],h[i]&&(h[i].parse===o?r=!0:i="transformOrigin"===i?Pe:h[i].p),Ee(a,i);r&&(Ee(a,xe),n=this.t._gsTransform,n&&(n.svg&&this.t.removeAttribute("data-svg-origin"),delete this.t._gsTransform))}};for(ve("clearProps",{parser:function(t,e,s,r,n){return n=new ce(t,s,0,0,n,2),n.setRatio=Le,n.e=e,n.pr=-10,n.data=r._tween,i=!0,n}}),l="bezier,throwProps,physicsProps,physics2D".split(","),de=l.length;de--;)ye(l[de]);l=a.prototype,l._firstPT=l._lastParsedTransform=l._transform=null,l._onInitTween=function(t,e,o){if(!t.nodeType)return!1;this._target=t,this._tween=o,this._vars=e,_=e.autoRound,i=!1,s=e.suffixMap||a.suffixMap,r=Z(t,""),n=this._overwriteProps;var l,f,m,d,g,v,y,T,w,b=t.style;if(u&&""===b.zIndex&&(l=Q(t,"zIndex",r),("auto"===l||""===l)&&this._addLazySet(b,"zIndex",0)),"string"==typeof e&&(d=b.cssText,l=K(t,r),b.cssText=d+";"+e,l=J(t,l,K(t)).difs,!j&&x.test(e)&&(l.opacity=parseFloat(RegExp.$1)),e=l,b.cssText=d),this._firstPT=f=e.className?h.className.parse(t,e.className,"className",this,null,null,e):this.parse(t,e,null),this._transformType){for(w=3===this._transformType,xe?p&&(u=!0,""===b.zIndex&&(y=Q(t,"zIndex",r),("auto"===y||""===y)&&this._addLazySet(b,"zIndex",0)),c&&this._addLazySet(b,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(w?"visible":"hidden"))):b.zoom=1,m=f;m&&m._next;)m=m._next;T=new ce(t,"transform",0,0,null,2),this._linkCSSP(T,null,m),T.setRatio=xe?Ie:ze,T.data=this._transform||Me(t,r,!0),T.tween=o,T.pr=-1,n.pop()}if(i){for(;f;){for(v=f._next,m=d;m&&m.pr>f.pr;)m=m._next;(f._prev=m?m._prev:g)?f._prev._next=f:d=f,(f._next=m)?m._prev=f:g=f,f=v}this._firstPT=d}return!0},l.parse=function(t,e,i,n){var a,o,l,u,p,f,c,m,d,g,v=t.style;for(a in e)f=e[a],o=h[a],o?i=o.parse(t,f,a,this,i,n,e):(p=Q(t,a,r)+"",d="string"==typeof f,"color"===a||"fill"===a||"stroke"===a||-1!==a.indexOf("Color")||d&&P.test(f)?(d||(f=le(f),f=(f.length>3?"rgba(":"rgb(")+f.join(",")+")"),i=me(v,a,p,f,!0,"transparent",i,0,n)):!d||-1===f.indexOf(" ")&&-1===f.indexOf(",")?(l=parseFloat(p),c=l||0===l?p.substr((l+"").length):"",(""===p||"auto"===p)&&("width"===a||"height"===a?(l=ie(t,a,r),c="px"):"left"===a||"top"===a?(l=H(t,a,r),c="px"):(l="opacity"!==a?0:1,c="")),g=d&&"="===f.charAt(1),g?(u=parseInt(f.charAt(0)+"1",10),f=f.substr(2),u*=parseFloat(f),m=f.replace(T,"")):(u=parseFloat(f),m=d?f.replace(T,""):""),""===m&&(m=a in s?s[a]:c),f=u||0===u?(g?u+l:u)+m:e[a],c!==m&&""!==m&&(u||0===u)&&l&&(l=$(t,a,l,c),"%"===m?(l/=$(t,a,100,"%")/100,e.strictUnits!==!0&&(p=l+"%")):"em"===m?l/=$(t,a,1,"em"):"px"!==m&&(u=$(t,a,u,m),m="px"),g&&(u||0===u)&&(f=u+l+m)),g&&(u+=l),!l&&0!==l||!u&&0!==u?void 0!==v[a]&&(f||"NaN"!=f+""&&null!=f)?(i=new ce(v,a,u||l||0,0,i,-1,a,!1,0,p,f),i.xs0="none"!==f||"display"!==a&&-1===a.indexOf("Style")?f:p):q("invalid "+a+" tween value: "+e[a]):(i=new ce(v,a,l,u-l,i,0,a,_!==!1&&("px"===m||"zIndex"===a),0,p,f),i.xs0=m)):i=me(v,a,p,f,!0,null,i,0,n)),n&&i&&!i.plugin&&(i.plugin=n);return i},l.setRatio=function(t){var e,i,s,r=this._firstPT,n=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;r;){if(e=r.c*t+r.s,r.r?e=Math.round(e):n>e&&e>-n&&(e=0),r.type)if(1===r.type)if(s=r.l,2===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2;else if(3===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3;else if(4===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4;else if(5===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4+r.xn4+r.xs5;else{for(i=r.xs0+e+r.xs1,s=1;r.l>s;s++)i+=r["xn"+s]+r["xs"+(s+1)];r.t[r.p]=i}else-1===r.type?r.t[r.p]=r.xs0:r.setRatio&&r.setRatio(t);else r.t[r.p]=e+r.xs0;r=r._next}else for(;r;)2!==r.type?r.t[r.p]=r.b:r.setRatio(t),r=r._next;else for(;r;)2!==r.type?r.t[r.p]=r.e:r.setRatio(t),r=r._next},l._enableTransforms=function(t){this._transform=this._transform||Me(this._target,r,!0),this._transformType=this._transform.svg&&Te||!t&&3!==this._transformType?2:3};var Xe=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};l._addLazySet=function(t,e,i){var s=this._firstPT=new ce(t,e,0,0,this._firstPT,2);s.e=i,s.setRatio=Xe,s.data=this},l._linkCSSP=function(t,e,i,s){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,s=!0),i?i._next=t:s||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},l._kill=function(e){var i,s,r,n=e;if(e.autoAlpha||e.alpha){n={};for(s in e)n[s]=e[s];n.opacity=1,n.autoAlpha&&(n.visibility=1)}return e.className&&(i=this._classNamePT)&&(r=i.xfirst,r&&r._prev?this._linkCSSP(r._prev,i._next,r._prev._prev):r===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,r._prev),this._classNamePT=null),t.prototype._kill.call(this,n)};var Ue=function(t,e,i){var s,r,n,a;if(t.slice)for(r=t.length;--r>-1;)Ue(t[r],e,i);else for(s=t.childNodes,r=s.length;--r>-1;)n=s[r],a=n.type,n.style&&(e.push(K(n)),i&&i.push(n)),1!==a&&9!==a&&11!==a||!n.childNodes.length||Ue(n,e,i)};return a.cascadeTo=function(t,i,s){var r,n,a,o,h=e.to(t,i,s),l=[h],_=[],u=[],p=[],f=e._internals.reservedProps;for(t=h._targets||h.target,Ue(t,_,p),h.render(i,!0,!0),Ue(t,u),h.render(0,!0,!0),h._enabled(!0),r=p.length;--r>-1;)if(n=J(p[r],_[r],u[r]),n.firstMPT){n=n.difs;for(a in s)f[a]&&(n[a]=s[a]);o={};for(a in n)o[a]=_[r][a];l.push(e.fromTo(p[r],i,o,n))}return l},t.activate([a]),a},!0),function(){var t=_gsScope._gsDefine.plugin({propName:"roundProps",priority:-1,API:2,init:function(t,e,i){return this._tween=i,!0}}),e=t.prototype;e._onInitAllProps=function(){for(var t,e,i,s=this._tween,r=s.vars.roundProps instanceof Array?s.vars.roundProps:s.vars.roundProps.split(","),n=r.length,a={},o=s._propLookup.roundProps;--n>-1;)a[r[n]]=1;for(n=r.length;--n>-1;)for(t=r[n],e=s._firstPT;e;)i=e._next,e.pg?e.t._roundProps(a,!0):e.n===t&&(this._add(e.t,t,e.s,e.c),i&&(i._prev=e._prev),e._prev?e._prev._next=i:s._firstPT===e&&(s._firstPT=i),e._next=e._prev=null,s._propLookup[t]=o),e=i;return!1},e._add=function(t,e,i,s){this._addTween(t,e,i,i+s,e,!0),this._overwriteProps.push(e)}}(),_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.3.3",init:function(t,e){var i,s,r;if("function"!=typeof t.setAttribute)return!1;this._target=t,this._proxy={},this._start={},this._end={};for(i in e)this._start[i]=this._proxy[i]=s=t.getAttribute(i),r=this._addTween(this._proxy,i,parseFloat(s),e[i],i),this._end[i]=r?r.s+r.c:e[i],this._overwriteProps.push(i);return!0},set:function(t){this._super.setRatio.call(this,t);for(var e,i=this._overwriteProps,s=i.length,r=1===t?this._end:t?this._proxy:this._start;--s>-1;)e=i[s],this._target.setAttribute(e,r[e]+"")}}),_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(t,e){"object"!=typeof e&&(e={rotation:e}),this.finals={};var i,s,r,n,a,o,h=e.useRadians===!0?2*Math.PI:360,l=1e-6;for(i in e)"useRadians"!==i&&(o=(e[i]+"").split("_"),s=o[0],r=parseFloat("function"!=typeof t[i]?t[i]:t[i.indexOf("set")||"function"!=typeof t["get"+i.substr(3)]?i:"get"+i.substr(3)]()),n=this.finals[i]="string"==typeof s&&"="===s.charAt(1)?r+parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)):Number(s)||0,a=n-r,o.length&&(s=o.join("_"),-1!==s.indexOf("short")&&(a%=h,a!==a%(h/2)&&(a=0>a?a+h:a-h)),-1!==s.indexOf("_cw")&&0>a?a=(a+9999999999*h)%h-(0|a/h)*h:-1!==s.indexOf("ccw")&&a>0&&(a=(a-9999999999*h)%h-(0|a/h)*h)),(a>l||-l>a)&&(this._addTween(t,i,r,r+a,i),this._overwriteProps.push(i)));return!0},set:function(t){var e;if(1!==t)this._super.setRatio.call(this,t);else for(e=this._firstPT;e;)e.f?e.t[e.p](this.finals[e.p]):e.t[e.p]=this.finals[e.p],e=e._next}})._autoCSS=!0,_gsScope._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,s,r=_gsScope.GreenSockGlobals||_gsScope,n=r.com.greensock,a=2*Math.PI,o=Math.PI/2,h=n._class,l=function(e,i){var s=h("easing."+e,function(){},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,s},_=t.register||function(){},u=function(t,e,i,s){var r=h("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new s},!0);return _(r,t),r},p=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},f=function(e,i){var s=h("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,r.config=function(t){return new s(t)},s},c=u("Back",f("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),f("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),f("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),m=h("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),d=m.prototype=new t;return d.constructor=m,d.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},m.ease=new m(.7,.7),d.config=m.config=function(t,e,i){return new m(t,e,i)},e=h("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),d=e.prototype=new t,d.constructor=e,d.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},d.config=e.config=function(t){return new e(t)},i=h("easing.RoughEase",function(e){e=e||{};for(var i,s,r,n,a,o,h=e.taper||"none",l=[],_=0,u=0|(e.points||20),f=u,c=e.randomize!==!1,m=e.clamp===!0,d=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--f>-1;)i=c?Math.random():1/u*f,s=d?d.getRatio(i):i,"none"===h?r=g:"out"===h?(n=1-i,r=n*n*g):"in"===h?r=i*i*g:.5>i?(n=2*i,r=.5*n*n*g):(n=2*(1-i),r=.5*n*n*g),c?s+=Math.random()*r-.5*r:f%2?s+=.5*r:s-=.5*r,m&&(s>1?s=1:0>s&&(s=0)),l[_++]={x:i,y:s};for(l.sort(function(t,e){return t.x-e.x}),o=new p(1,1,null),f=u;--f>-1;)a=l[f],o=new p(a.x,a.y,o);this._prev=new p(0,0,0!==o.t?o:o.next)},!0),d=i.prototype=new t,d.constructor=i,d.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},d.config=function(t){return new i(t)},i.ease=new i,u("Bounce",l("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),l("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),l("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),u("Circ",l("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),l("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),l("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),s=function(e,i,s){var r=h("easing."+e,function(t,e){this._p1=t>=1?t:1,this._p2=(e||s)/(1>t?t:1),this._p3=this._p2/a*(Math.asin(1/this._p1)||0),this._p2=a/this._p2},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t,e){return new r(t,e)},r},u("Elastic",s("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*this._p2)+1},.3),s("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2))},.3),s("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*this._p2)+1},.45)),u("Expo",l("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),l("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),l("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),u("Sine",l("SineOut",function(t){return Math.sin(t*o)}),l("SineIn",function(t){return-Math.cos(t*o)+1}),l("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),h("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),_(r.SlowMo,"SlowMo","ease,"),_(i,"RoughEase","ease,"),_(e,"SteppedEase","ease,"),c},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t,e){"use strict";var i=t.GreenSockGlobals=t.GreenSockGlobals||t;if(!i.TweenLite){var s,r,n,a,o,h=function(t){var e,s=t.split("."),r=i;for(e=0;s.length>e;e++)r[s[e]]=r=r[s[e]]||{};return r},l=h("com.greensock"),_=1e-10,u=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},p=function(){},f=function(){var t=Object.prototype.toString,e=t.call([]);return function(i){return null!=i&&(i instanceof Array||"object"==typeof i&&!!i.push&&t.call(i)===e)}}(),c={},m=function(s,r,n,a){this.sc=c[s]?c[s].sc:[],c[s]=this,this.gsClass=null,this.func=n;var o=[];this.check=function(l){for(var _,u,p,f,d=r.length,g=d;--d>-1;)(_=c[r[d]]||new m(r[d],[])).gsClass?(o[d]=_.gsClass,g--):l&&_.sc.push(this);if(0===g&&n)for(u=("com.greensock."+s).split("."),p=u.pop(),f=h(u.join("."))[p]=this.gsClass=n.apply(n,o),a&&(i[p]=f,"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+s.split(".").pop(),[],function(){return f}):s===e&&"undefined"!=typeof module&&module.exports&&(module.exports=f)),d=0;this.sc.length>d;d++)this.sc[d].check()},this.check(!0)},d=t._gsDefine=function(t,e,i,s){return new m(t,e,i,s)},g=l._class=function(t,e,i){return e=e||function(){},d(t,[],function(){return e},i),e};d.globals=i;var v=[0,0,1,1],y=[],T=g("easing.Ease",function(t,e,i,s){this._func=t,this._type=i||0,this._power=s||0,this._params=e?v.concat(e):v},!0),w=T.map={},x=T.register=function(t,e,i,s){for(var r,n,a,o,h=e.split(","),_=h.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--_>-1;)for(n=h[_],r=s?g("easing."+n,null,!0):l.easing[n]||{},a=u.length;--a>-1;)o=u[a],w[n+"."+o]=w[o+n]=r[o]=t.getRatio?t:t[o]||new t};for(n=T.prototype,n._calcEnd=!1,n.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,s=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?s*=s:2===i?s*=s*s:3===i?s*=s*s*s:4===i&&(s*=s*s*s*s),1===e?1-s:2===e?s:.5>t?s/2:1-s/2},s=["Linear","Quad","Cubic","Quart","Quint,Strong"],r=s.length;--r>-1;)n=s[r]+",Power"+r,x(new T(null,null,1,r),n,"easeOut",!0),x(new T(null,null,2,r),n,"easeIn"+(0===r?",easeNone":"")),x(new T(null,null,3,r),n,"easeInOut");w.linear=l.easing.Linear.easeIn,w.swing=l.easing.Quad.easeInOut;var b=g("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});n=b.prototype,n.addEventListener=function(t,e,i,s,r){r=r||0;var n,h,l=this._listeners[t],_=0;for(null==l&&(this._listeners[t]=l=[]),h=l.length;--h>-1;)n=l[h],n.c===e&&n.s===i?l.splice(h,1):0===_&&r>n.pr&&(_=h+1);l.splice(_,0,{c:e,s:i,up:s,pr:r}),this!==a||o||a.wake()},n.removeEventListener=function(t,e){var i,s=this._listeners[t];if(s)for(i=s.length;--i>-1;)if(s[i].c===e)return s.splice(i,1),void 0},n.dispatchEvent=function(t){var e,i,s,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)s=r[e],s&&(s.up?s.c.call(s.s||i,{type:t,target:i}):s.c.call(s.s||i))};var P=t.requestAnimationFrame,S=t.cancelAnimationFrame,k=Date.now||function(){return(new Date).getTime()},R=k();for(s=["ms","moz","webkit","o"],r=s.length;--r>-1&&!P;)P=t[s[r]+"RequestAnimationFrame"],S=t[s[r]+"CancelAnimationFrame"]||t[s[r]+"CancelRequestAnimationFrame"];g("Ticker",function(t,e){var i,s,r,n,h,l=this,u=k(),f=e!==!1&&P,c=500,m=33,d="tick",g=function(t){var e,a,o=k()-R;o>c&&(u+=o-m),R+=o,l.time=(R-u)/1e3,e=l.time-h,(!i||e>0||t===!0)&&(l.frame++,h+=e+(e>=n?.004:n-e),a=!0),t!==!0&&(r=s(g)),a&&l.dispatchEvent(d)};b.call(l),l.time=l.frame=0,l.tick=function(){g(!0)},l.lagSmoothing=function(t,e){c=t||1/_,m=Math.min(e,c,0)},l.sleep=function(){null!=r&&(f&&S?S(r):clearTimeout(r),s=p,r=null,l===a&&(o=!1))},l.wake=function(){null!==r?l.sleep():l.frame>10&&(R=k()-c+5),s=0===i?p:f&&P?P:function(t){return setTimeout(t,0|1e3*(h-l.time)+1)},l===a&&(o=!0),g(2)},l.fps=function(t){return arguments.length?(i=t,n=1/(i||60),h=this.time+n,l.wake(),void 0):i},l.useRAF=function(t){return arguments.length?(l.sleep(),f=t,l.fps(i),void 0):f},l.fps(t),setTimeout(function(){f&&5>l.frame&&l.useRAF(!1)},1500)}),n=l.Ticker.prototype=new l.events.EventDispatcher,n.constructor=l.Ticker;var A=g("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=e.immediateRender===!0,this.data=e.data,this._reversed=e.reversed===!0,B){o||a.wake();var i=this.vars.useFrames?j:B;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});a=A.ticker=new l.Ticker,n=A.prototype,n._dirty=n._gc=n._initted=n._paused=!1,n._totalTime=n._time=0,n._rawPrevTime=-1,n._next=n._last=n._onUpdate=n._timeline=n.timeline=null,n._paused=!1;var O=function(){o&&k()-R>2e3&&a.wake(),setTimeout(O,2e3)};O(),n.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},n.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},n.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},n.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},n.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},n.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},n.render=function(){},n.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},n.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&i+this.totalDuration()/this._timeScale>t},n._enabled=function(t,e){return o||a.wake(),this._gc=!t,this._active=this.isActive(),e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},n._kill=function(){return this._enabled(!1,!1)},n.kill=function(t,e){return this._kill(t,e),this},n._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},n._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},n.eventCallback=function(t,e,i,s){if("on"===(t||"").substr(0,2)){var r=this.vars;if(1===arguments.length)return r[t];null==e?delete r[t]:(r[t]=e,r[t+"Params"]=f(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,r[t+"Scope"]=s),"onUpdate"===t&&(this._onUpdate=e)}return this},n.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},n.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},n.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},n.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},n.totalTime=function(t,e,i){if(o||a.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var s=this._totalDuration,r=this._timeline;if(t>s&&!i&&(t=s),this._startTime=(this._paused?this._pauseTime:r._time)-(this._reversed?s-t:t)/this._timeScale,r._dirty||this._uncache(!1),r._timeline)for(;r._timeline;)r._timeline._time!==(r._startTime+r._totalTime)/r._timeScale&&r.totalTime(r._totalTime,!0),r=r._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&(this.render(t,e,!1),I.length&&V())}return this},n.progress=n.totalProgress=function(t,e){return arguments.length?this.totalTime(this.duration()*t,e):this._time/this.duration()},n.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},n.endTime=function(t){return this._startTime+(0!=t?this.totalDuration():this.duration())/this._timeScale},n.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||_,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},n.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},n.paused=function(t){if(!arguments.length)return this._paused;var e,i,s=this._timeline;return t!=this._paused&&s&&(o||t||a.wake(),e=s.rawTime(),i=e-this._pauseTime,!t&&s.smoothChildTiming&&(this._startTime+=i,this._uncache(!1)),this._pauseTime=t?e:null,this._paused=t,this._active=this.isActive(),!t&&0!==i&&this._initted&&this.duration()&&this.render(s.smoothChildTiming?this._totalTime:(e-this._startTime)/this._timeScale,!0,!0)),this._gc&&!t&&this._enabled(!0,!1),this};var C=g("core.SimpleTimeline",function(t){A.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});n=C.prototype=new A,n.constructor=C,n.kill()._gc=!1,n._first=n._last=n._recent=null,n._sortChildren=!1,n.add=n.insert=function(t,e){var i,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(s=t._startTime;i&&i._startTime>s;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._recent=t,this._timeline&&this._uncache(!0),this},n._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,t===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},n.render=function(t,e,i){var s,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)s=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=s},n.rawTime=function(){return o||a.wake(),this._totalTime};var D=g("TweenLite",function(e,i,s){if(A.call(this,i,s),this.render=D.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:D.selector(e)||e;var r,n,a,o=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),h=this.vars.overwrite;if(this._overwrite=h=null==h?Y[D.defaultOverwrite]:"number"==typeof h?h>>0:Y[h],(o||e instanceof Array||e.push&&f(e))&&"number"!=typeof e[0])for(this._targets=a=u(e),this._propLookup=[],this._siblings=[],r=0;a.length>r;r++)n=a[r],n?"string"!=typeof n?n.length&&n!==t&&n[0]&&(n[0]===t||n[0].nodeType&&n[0].style&&!n.nodeType)?(a.splice(r--,1),this._targets=a=a.concat(u(n))):(this._siblings[r]=G(n,this,!1),1===h&&this._siblings[r].length>1&&Z(n,this,null,1,this._siblings[r])):(n=a[r--]=D.selector(n),"string"==typeof n&&a.splice(r+1,1)):a.splice(r--,1);else this._propLookup={},this._siblings=G(e,this,!1),1===h&&this._siblings.length>1&&Z(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-_,this.render(-this._delay))},!0),M=function(e){return e&&e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},z=function(t,e){var i,s={};for(i in t)U[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!N[i]||N[i]&&N[i]._autoCSS)||(s[i]=t[i],delete t[i]);t.css=s};n=D.prototype=new A,n.constructor=D,n.kill()._gc=!1,n.ratio=0,n._firstPT=n._targets=n._overwrittenProps=n._startAt=null,n._notifyPluginsOfEnabled=n._lazy=!1,D.version="1.16.1",D.defaultEase=n._ease=new T(null,null,1,1),D.defaultOverwrite="auto",D.ticker=a,D.autoSleep=120,D.lagSmoothing=function(t,e){a.lagSmoothing(t,e)},D.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(D.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)};var I=[],F={},E=D._internals={isArray:f,isSelector:M,lazyTweens:I},N=D._plugins={},L=E.tweenLookup={},X=0,U=E.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1},Y={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},j=A._rootFramesTimeline=new C,B=A._rootTimeline=new C,q=30,V=E.lazyRender=function(){var t,e=I.length;for(F={};--e>-1;)t=I[e],t&&t._lazy!==!1&&(t.render(t._lazy[0],t._lazy[1],!0),t._lazy=!1);I.length=0};B._startTime=a.time,j._startTime=a.frame,B._active=j._active=!0,setTimeout(V,1),A._updateRoot=D.render=function(){var t,e,i;if(I.length&&V(),B.render((a.time-B._startTime)*B._timeScale,!1,!1),j.render((a.frame-j._startTime)*j._timeScale,!1,!1),I.length&&V(),a.frame>=q){q=a.frame+(parseInt(D.autoSleep,10)||120);for(i in L){for(e=L[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete L[i]}if(i=B._first,(!i||i._paused)&&D.autoSleep&&!j._first&&1===a._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||a.sleep()}}},a.addEventListener("tick",A._updateRoot);var G=function(t,e,i){var s,r,n=t._gsTweenID;if(L[n||(t._gsTweenID=n="t"+X++)]||(L[n]={target:t,tweens:[]}),e&&(s=L[n].tweens,s[r=s.length]=e,i))for(;--r>-1;)s[r]===e&&s.splice(r,1);return L[n].tweens},W=function(t,e,i,s){var r,n,a=t.vars.onOverwrite;return a&&(r=a(t,e,i,s)),a=D.onOverwrite,a&&(n=a(t,e,i,s)),r!==!1&&n!==!1},Z=function(t,e,i,s,r){var n,a,o,h;if(1===s||s>=4){for(h=r.length,n=0;h>n;n++)if((o=r[n])!==e)o._gc||W(o,e)&&o._enabled(!1,!1)&&(a=!0);else if(5===s)break;return a}var l,u=e._startTime+_,p=[],f=0,c=0===e._duration;for(n=r.length;--n>-1;)(o=r[n])===e||o._gc||o._paused||(o._timeline!==e._timeline?(l=l||Q(e,0,c),0===Q(o,l,c)&&(p[f++]=o)):u>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale>u&&((c||!o._initted)&&2e-10>=u-o._startTime||(p[f++]=o)));for(n=f;--n>-1;)if(o=p[n],2===s&&o._kill(i,t,e)&&(a=!0),2!==s||!o._firstPT&&o._initted){if(2!==s&&!W(o,e))continue;o._enabled(!1,!1)&&(a=!0)}return a},Q=function(t,e,i){for(var s=t._timeline,r=s._timeScale,n=t._startTime;s._timeline;){if(n+=s._startTime,r*=s._timeScale,s._paused)return-100;s=s._timeline}return n/=r,n>e?n-e:i&&n===e||!t._initted&&2*_>n-e?_:(n+=t.totalDuration()/t._timeScale/r)>e+_?0:n-e-_};n._init=function(){var t,e,i,s,r,n=this.vars,a=this._overwrittenProps,o=this._duration,h=!!n.immediateRender,l=n.ease;if(n.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),r={};for(s in n.startAt)r[s]=n.startAt[s];if(r.overwrite=!1,r.immediateRender=!0,r.lazy=h&&n.lazy!==!1,r.startAt=r.delay=null,this._startAt=D.to(this.target,0,r),h)if(this._time>0)this._startAt=null;else if(0!==o)return}else if(n.runBackwards&&0!==o)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(h=!1),i={};for(s in n)U[s]&&"autoCSS"!==s||(i[s]=n[s]);if(i.overwrite=0,i.data="isFromStart",i.lazy=h&&n.lazy!==!1,i.immediateRender=h,this._startAt=D.to(this.target,0,i),h){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=l=l?l instanceof T?l:"function"==typeof l?new T(l,n.easeParams):w[l]||D.defaultEase:D.defaultEase,n.easeParams instanceof Array&&l.config&&(this._ease=l.config.apply(l,n.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],a?a[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,a);if(e&&D._onPluginEvent("_onInitAllProps",this),a&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),n.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=n.onUpdate,this._initted=!0},n._initProps=function(e,i,s,r){var n,a,o,h,l,_;if(null==e)return!1;F[e._gsTweenID]&&V(),this.vars.css||e.style&&e!==t&&e.nodeType&&N.css&&this.vars.autoCSS!==!1&&z(this.vars,e);for(n in this.vars){if(_=this.vars[n],U[n])_&&(_ instanceof Array||_.push&&f(_))&&-1!==_.join("").indexOf("{self}")&&(this.vars[n]=_=this._swapSelfInParams(_,this));else if(N[n]&&(h=new N[n])._onInitTween(e,this.vars[n],this)){for(this._firstPT=l={_next:this._firstPT,t:h,p:"setRatio",s:0,c:1,f:!0,n:n,pg:!0,pr:h._priority},a=h._overwriteProps.length;--a>-1;)i[h._overwriteProps[a]]=this._firstPT;(h._priority||h._onInitAllProps)&&(o=!0),(h._onDisable||h._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=i[n]=l={_next:this._firstPT,t:e,p:n,f:"function"==typeof e[n],n:n,pg:!1,pr:0},l.s=l.f?e[n.indexOf("set")||"function"!=typeof e["get"+n.substr(3)]?n:"get"+n.substr(3)]():parseFloat(e[n]),l.c="string"==typeof _&&"="===_.charAt(1)?parseInt(_.charAt(0)+"1",10)*Number(_.substr(2)):Number(_)-l.s||0;l&&l._next&&(l._next._prev=l)}return r&&this._kill(r,e)?this._initProps(e,i,s,r):this._overwrite>1&&this._firstPT&&s.length>1&&Z(e,this,i,this._overwrite,s)?(this._kill(i,e),this._initProps(e,i,s,r)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(F[e._gsTweenID]=!0),o)},n.render=function(t,e,i){var s,r,n,a,o=this._time,h=this._duration,l=this._rawPrevTime;if(t>=h)this._totalTime=this._time=h,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(s=!0,r="onComplete",i=i||this._timeline.autoRemoveChildren),0===h&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>l||l===_&&"isPause"!==this.data)&&l!==t&&(i=!0,l>_&&(r="onReverseComplete")),this._rawPrevTime=a=!e||t||l===t?t:_);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==o||0===h&&l>0)&&(r="onReverseComplete",s=this._reversed),0>t&&(this._active=!1,0===h&&(this._initted||!this.vars.lazy||i)&&(l>=0&&(l!==_||"isPause"!==this.data)&&(i=!0),this._rawPrevTime=a=!e||t||l===t?t:_)),this._initted||(i=!0);
else if(this._totalTime=this._time=t,this._easeType){var u=t/h,p=this._easeType,f=this._easePower;(1===p||3===p&&u>=.5)&&(u=1-u),3===p&&(u*=2),1===f?u*=u:2===f?u*=u*u:3===f?u*=u*u*u:4===f&&(u*=u*u*u*u),this.ratio=1===p?1-u:2===p?u:.5>t/h?u/2:1-u/2}else this.ratio=this._ease.getRatio(t/h);if(this._time!==o||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=o,this._rawPrevTime=l,I.push(this),this._lazy=[t,e],void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/h):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==o&&t>=0&&(this._active=!0),0===o&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===h)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||y))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&t!==-1e-4&&this._startAt.render(t,e,i),e||(this._time!==o||s)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||y)),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&t!==-1e-4&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||y),0===h&&this._rawPrevTime===_&&a!==_&&(this._rawPrevTime=0))}},n._kill=function(t,e,i){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:D.selector(e)||e;var s,r,n,a,o,h,l,_,u;if((f(e)||M(e))&&"number"!=typeof e[0])for(s=e.length;--s>-1;)this._kill(t,e[s])&&(h=!0);else{if(this._targets){for(s=this._targets.length;--s>-1;)if(e===this._targets[s]){o=this._propLookup[s]||{},this._overwrittenProps=this._overwrittenProps||[],r=this._overwrittenProps[s]=t?this._overwrittenProps[s]||{}:"all";break}}else{if(e!==this.target)return!1;o=this._propLookup,r=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(o){if(l=t||o,_=t!==r&&"all"!==r&&t!==o&&("object"!=typeof t||!t._tempKill),i&&(D.onOverwrite||this.vars.onOverwrite)){for(n in l)o[n]&&(u||(u=[]),u.push(n));if(!W(this,i,e,u))return!1}for(n in l)(a=o[n])&&(a.pg&&a.t._kill(l)&&(h=!0),a.pg&&0!==a.t._overwriteProps.length||(a._prev?a._prev._next=a._next:a===this._firstPT&&(this._firstPT=a._next),a._next&&(a._next._prev=a._prev),a._next=a._prev=null),delete o[n]),_&&(r[n]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return h},n.invalidate=function(){return this._notifyPluginsOfEnabled&&D._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],A.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-_,this.render(-this._delay)),this},n._enabled=function(t,e){if(o||a.wake(),t&&this._gc){var i,s=this._targets;if(s)for(i=s.length;--i>-1;)this._siblings[i]=G(s[i],this,!0);else this._siblings=G(this.target,this,!0)}return A.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?D._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},D.to=function(t,e,i){return new D(t,e,i)},D.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new D(t,e,i)},D.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new D(t,e,s)},D.delayedCall=function(t,e,i,s,r){return new D(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,lazy:!1,useFrames:r,overwrite:0})},D.set=function(t,e){return new D(t,0,e)},D.getTweensOf=function(t,e){if(null==t)return[];t="string"!=typeof t?t:D.selector(t)||t;var i,s,r,n;if((f(t)||M(t))&&"number"!=typeof t[0]){for(i=t.length,s=[];--i>-1;)s=s.concat(D.getTweensOf(t[i],e));for(i=s.length;--i>-1;)for(n=s[i],r=i;--r>-1;)n===s[r]&&s.splice(i,1)}else for(s=G(t).concat(),i=s.length;--i>-1;)(s[i]._gc||e&&!s[i].isActive())&&s.splice(i,1);return s},D.killTweensOf=D.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var s=D.getTweensOf(t,e),r=s.length;--r>-1;)s[r]._kill(i,t)};var $=g("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=$.prototype},!0);if(n=$.prototype,$.version="1.10.1",$.API=2,n._firstPT=null,n._addTween=function(t,e,i,s,r,n){var a,o;return null!=s&&(a="number"==typeof s||"="!==s.charAt(1)?Number(s)-i:parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)))?(this._firstPT=o={_next:this._firstPT,t:t,p:e,s:i,c:a,f:"function"==typeof t[e],n:r||e,r:n},o._next&&(o._next._prev=o),o):void 0},n.setRatio=function(t){for(var e,i=this._firstPT,s=1e-6;i;)e=i.c*t+i.s,i.r?e=Math.round(e):s>e&&e>-s&&(e=0),i.f?i.t[i.p](e):i.t[i.p]=e,i=i._next},n._kill=function(t){var e,i=this._overwriteProps,s=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;s;)null!=t[s.n]&&(s._next&&(s._next._prev=s._prev),s._prev?(s._prev._next=s._next,s._prev=null):this._firstPT===s&&(this._firstPT=s._next)),s=s._next;return!1},n._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},D._onPluginEvent=function(t,e){var i,s,r,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,s=r;s&&s.pr>o.pr;)s=s._next;(o._prev=s?s._prev:n)?o._prev._next=o:r=o,(o._next=s)?s._prev=o:n=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},$.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===$.API&&(N[(new t[e])._propName]=t[e]);return!0},d.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,s=t.priority||0,r=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=g("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){$.call(this,i,s),this._overwriteProps=r||[]},t.global===!0),o=a.prototype=new $(i);o.constructor=a,a.API=t.API;for(e in n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,$.activate([a]),a},s=t._gsQueue){for(r=0;s.length>r;r++)s[r]();for(n in c)c[n].func||t.console.log("GSAP encountered missing dependency: com.greensock."+n)}o=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenMax");;//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);;(function(a){function b(){if(this.isDisposed)throw new Error(eb)}function c(a,b){if(fb&&b.stack&&"object"==typeof a&&null!==a&&a.stack&&-1===a.stack.indexOf(jb)){for(var c=[],e=b;e;e=e.source)e.stack&&c.unshift(e.stack);c.unshift(a.stack);var f=c.join("\n"+jb+"\n");a.stack=d(f)}}function d(a){for(var b=a.split("\n"),c=[],d=0,g=b.length;g>d;d++){var h=b[d];e(h)||f(h)||!h||c.push(h)}return c.join("\n")}function e(a){var b=h(a);if(!b)return!1;var c=b[0],d=b[1];return c===hb&&d>=ib&&$c>=d}function f(a){return-1!==a.indexOf("(module.js:")||-1!==a.indexOf("(node.js:")}function g(){if(fb)try{throw new Error}catch(a){var b=a.stack.split("\n"),c=b[0].indexOf("@")>0?b[1]:b[2],d=h(c);if(!d)return;return hb=d[0],d[1]}}function h(a){var b=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if(b)return[b[1],Number(b[2])];var c=/at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if(c)return[c[1],Number(c[2])];var d=/.*@(.+):(\d+)$/.exec(a);return d?[d[1],Number(d[2])]:void 0}function i(a){var b=[];if(!Kb(a))return b;Jb.nonEnumArgs&&a.length&&Lb(a)&&(a=Nb.call(a));var c=Jb.enumPrototypes&&"function"==typeof a,d=Jb.enumErrorProps&&(a===Eb||a instanceof Error);for(var e in a)c&&"prototype"==e||d&&("message"==e||"name"==e)||b.push(e);if(Jb.nonEnumShadows&&a!==Fb){var f=a.constructor,g=-1,h=qb;if(a===(f&&f.prototype))var i=a===Gb?Ab:a===Eb?vb:Bb.call(a),j=Ib[i];for(;++g<h;)e=pb[g],j&&j[e]||!Cb.call(a,e)||b.push(e)}return b}function j(a,b,c){for(var d=-1,e=c(a),f=e.length;++d<f;){var g=e[d];if(b(a[g],g,a)===!1)break}return a}function k(a,b){return j(a,b,i)}function l(a){return"function"!=typeof a.toString&&"string"==typeof(a+"")}function m(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;var e=typeof a,f=typeof b;if(a===a&&(null==a||null==b||"function"!=e&&"object"!=e&&"function"!=f&&"object"!=f))return!1;var g=Bb.call(a),h=Bb.call(b);if(g==rb&&(g=yb),h==rb&&(h=yb),g!=h)return!1;switch(g){case tb:case ub:return+a==+b;case xb:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case zb:case Ab:return a==String(b)}var i=g==sb;if(!i){if(g!=yb||!Jb.nodeClass&&(l(a)||l(b)))return!1;var j=!Jb.argsObject&&Lb(a)?Object:a.constructor,n=!Jb.argsObject&&Lb(b)?Object:b.constructor;if(!(j==n||Cb.call(a,"constructor")&&Cb.call(b,"constructor")||cb(j)&&j instanceof j&&cb(n)&&n instanceof n||!("constructor"in a&&"constructor"in b)))return!1}c||(c=[]),d||(d=[]);for(var o=c.length;o--;)if(c[o]==a)return d[o]==b;var p=0,q=!0;if(c.push(a),d.push(b),i){if(o=a.length,p=b.length,q=p==o)for(;p--;){var r=b[p];if(!(q=m(a[p],r,c,d)))break}}else k(b,function(b,e,f){return Cb.call(f,e)?(p++,q=Cb.call(a,e)&&m(a[e],b,c,d)):void 0}),q&&k(a,function(a,b,c){return Cb.call(c,b)?q=--p>-1:void 0});return c.pop(),d.pop(),q}function n(a,b){return 1===a.length&&Array.isArray(a[b])?a[b]:Nb.call(a)}function o(a,b){for(var c=new Array(a),d=0;a>d;d++)c[d]=b();return c}function p(a,b){this.id=a,this.value=b}function q(){this._s=s}function r(){this._s=s,this._l=s.length,this._i=0}function t(a){this._a=a}function u(a){this._a=a,this._l=y(a),this._i=0}function v(a){return"number"==typeof a&&Q.isFinite(a)}function w(b){var c,d=b[kb];if(!d&&"string"==typeof b)return c=new q(b),c[kb]();if(!d&&b.length!==a)return c=new t(b),c[kb]();if(!d)throw new TypeError("Object is not iterable");return b[kb]()}function x(a){var b=+a;return 0===b?b:isNaN(b)?b:0>b?-1:1}function y(a){var b=+a.length;return isNaN(b)?0:0!==b&&v(b)?(b=x(b)*Math.floor(Math.abs(b)),0>=b?0:b>Bc?Bc:b):b}function z(a,b){return X(a)||(a=ec),new Sc(function(c){var d=0,e=b.length;return a.scheduleRecursive(function(a){e>d?(c.onNext(b[d++]),a()):c.onCompleted()})})}function A(a,b){return new Sc(function(c){var d=new Zb,e=new $b;return e.setDisposable(d),d.setDisposable(a.subscribe(c.onNext.bind(c),function(a){var d,f;try{f=b(a)}catch(g){return void c.onError(g)}bb(f)&&(f=Lc(f)),d=new Zb,e.setDisposable(d),d.setDisposable(f.subscribe(c))},c.onCompleted.bind(c))),e},a)}function B(a,b){var c=this;return new Sc(function(d){var e=0,f=a.length;return c.subscribe(function(c){if(f>e){var g,h=a[e++];try{g=b(c,h)}catch(i){return void d.onError(i)}d.onNext(g)}else d.onCompleted()},d.onError.bind(d),d.onCompleted.bind(d))},c)}function C(a,b,c){return a.map(function(d,e){var f=b.call(c,d,e,a);return bb(f)&&(f=Lc(f)),(nb(f)||mb(f))&&(f=Cc(f)),f}).concatAll()}function D(a,b,c){return a.map(function(d,e){var f=b.call(c,d,e,a);return bb(f)&&(f=Lc(f)),(nb(f)||mb(f))&&(f=Cc(f)),f}).mergeAll()}function E(a){var b=function(){this.cancelBubble=!0},c=function(){if(this.bubbledKeyCode=this.keyCode,this.ctrlKey)try{this.keyCode=0}catch(a){}this.defaultPrevented=!0,this.returnValue=!1,this.modified=!0};if(a||(a=Q.event),!a.target)switch(a.target=a.target||a.srcElement,"mouseover"==a.type&&(a.relatedTarget=a.fromElement),"mouseout"==a.type&&(a.relatedTarget=a.toElement),a.stopPropagation||(a.stopPropagation=b,a.preventDefault=c),a.type){case"keypress":var d="charCode"in a?a.charCode:a.keyCode;10==d?(d=0,a.keyCode=13):13==d||27==d?d=0:3==d&&(d=99),a.charCode=d,a.keyChar=a.charCode?String.fromCharCode(a.charCode):""}return a}function F(a,b,c){if(a.addEventListener)return a.addEventListener(b,c,!1),Xb(function(){a.removeEventListener(b,c,!1)});if(a.attachEvent){var d=function(a){c(E(a))};return a.attachEvent("on"+b,d),Xb(function(){a.detachEvent("on"+b,d)})}return a["on"+b]=c,Xb(function(){a["on"+b]=null})}function G(a,b,c){var d=new Ub;if("[object NodeList]"===Object.prototype.toString.call(a))for(var e=0,f=a.length;f>e;e++)d.add(G(a.item(e),b,c));else a&&d.add(F(a,b,c));return d}function H(a,b){return new Sc(function(c){return b.scheduleWithAbsolute(a,function(){c.onNext(0),c.onCompleted()})})}function I(a,b,c){return new Sc(function(d){var e=0,f=a,g=bc(b);return c.scheduleRecursiveWithAbsolute(f,function(a){if(g>0){var b=c.now();f+=g,b>=f&&(f=b+g)}d.onNext(e++),a(f)})})}function J(a,b){return new Sc(function(c){return b.scheduleWithRelative(bc(a),function(){c.onNext(0),c.onCompleted()})})}function K(a,b,c){return a===b?new Sc(function(a){return c.schedulePeriodicWithState(0,b,function(b){return a.onNext(b),b+1})}):zc(function(){return I(c.now()+a,b,c)})}function L(a,b,c){return new Sc(function(d){var e,f=!1,g=new $b,h=null,i=[],j=!1;return e=a.materialize().timestamp(c).subscribe(function(a){var e,k;"E"===a.value.kind?(i=[],i.push(a),h=a.value.exception,k=!j):(i.push({value:a.value,timestamp:a.timestamp+b}),k=!f,f=!0),k&&(null!==h?d.onError(h):(e=new Zb,g.setDisposable(e),e.setDisposable(c.scheduleRecursiveWithRelative(b,function(a){var b,e,g,k;if(null===h){j=!0;do g=null,i.length>0&&i[0].timestamp-c.now()<=0&&(g=i.shift().value),null!==g&&g.accept(d);while(null!==g);k=!1,e=0,i.length>0?(k=!0,e=Math.max(0,i[0].timestamp-c.now())):f=!1,b=h,j=!1,null!==b?d.onError(b):k&&a(e)}}))))}),new Ub(e,g)},a)}function M(a,b,c){return zc(function(){return L(a,b-c.now(),c)})}function N(a,b){return new Sc(function(c){function d(){g&&(g=!1,c.onNext(f)),e&&c.onCompleted()}var e,f,g;return new Ub(a.subscribe(function(a){g=!0,f=a},c.onError.bind(c),function(){e=!0}),b.subscribe(d,c.onError.bind(c),d))},a)}function O(a,b,c){return new Sc(function(d){function e(a,b){j[b]=a;var e;if(g[b]=!0,h||(h=g.every(Y))){if(f)return void d.onError(f);try{e=c.apply(null,j)}catch(k){return void d.onError(k)}d.onNext(e)}i&&j[1]&&d.onCompleted()}var f,g=[!1,!1],h=!1,i=!1,j=new Array(2);return new Ub(a.subscribe(function(a){e(a,0)},function(a){j[1]?d.onError(a):f=a},function(){i=!0,j[1]&&d.onCompleted()}),b.subscribe(function(a){e(a,1)},d.onError.bind(d),function(){i=!0,e(!0,1)}))},a)}var P={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},Q=P[typeof window]&&window||this,R=P[typeof exports]&&exports&&!exports.nodeType&&exports,S=P[typeof module]&&module&&!module.nodeType&&module,T=S&&S.exports===R&&R,U=P[typeof global]&&global;!U||U.global!==U&&U.window!==U||(Q=U);var V={internals:{},config:{Promise:Q.Promise},helpers:{}},W=V.helpers.noop=function(){},X=(V.helpers.notDefined=function(a){return"undefined"==typeof a},V.helpers.isScheduler=function(a){return a instanceof V.Scheduler}),Y=V.helpers.identity=function(a){return a},Z=(V.helpers.pluck=function(a){return function(b){return b[a]}},V.helpers.just=function(a){return function(){return a}},V.helpers.defaultNow=function(){return Date.now?Date.now:function(){return+new Date}}()),$=V.helpers.defaultComparer=function(a,b){return Mb(a,b)},_=V.helpers.defaultSubComparer=function(a,b){return a>b?1:b>a?-1:0},ab=(V.helpers.defaultKeySerializer=function(a){return a.toString()},V.helpers.defaultError=function(a){throw a}),bb=V.helpers.isPromise=function(a){return!!a&&"function"==typeof a.then},cb=(V.helpers.asArray=function(){return Array.prototype.slice.call(arguments)},V.helpers.not=function(a){return!a},V.helpers.isFunction=function(){var a=function(a){return"function"==typeof a||!1};return a(/x/)&&(a=function(a){return"function"==typeof a&&"[object Function]"==Bb.call(a)}),a}()),db="Argument out of range",eb="Object has been disposed";V.config.longStackSupport=!1;var fb=!1;try{throw new Error}catch(gb){fb=!!gb.stack}var hb,ib=g(),jb="From previous event:",kb="function"==typeof Symbol&&Symbol.iterator||"_es6shim_iterator_";Q.Set&&"function"==typeof(new Q.Set)["@@iterator"]&&(kb="@@iterator");var lb=V.doneEnumerator={done:!0,value:a},mb=V.helpers.isIterable=function(b){return b[kb]!==a},nb=V.helpers.isArrayLike=function(b){return b&&b.length!==a};V.helpers.iterator=kb;var ob,pb=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],qb=pb.length,rb="[object Arguments]",sb="[object Array]",tb="[object Boolean]",ub="[object Date]",vb="[object Error]",wb="[object Function]",xb="[object Number]",yb="[object Object]",zb="[object RegExp]",Ab="[object String]",Bb=Object.prototype.toString,Cb=Object.prototype.hasOwnProperty,Db=Bb.call(arguments)==rb,Eb=Error.prototype,Fb=Object.prototype,Gb=String.prototype,Hb=Fb.propertyIsEnumerable;try{ob=!(Bb.call(document)==yb&&!({toString:0}+""))}catch(gb){ob=!0}var Ib={};Ib[sb]=Ib[ub]=Ib[xb]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},Ib[tb]=Ib[Ab]={constructor:!0,toString:!0,valueOf:!0},Ib[vb]=Ib[wb]=Ib[zb]={constructor:!0,toString:!0},Ib[yb]={constructor:!0};var Jb={};!function(){var a=function(){this.x=1},b=[];a.prototype={valueOf:1,y:1};for(var c in new a)b.push(c);for(c in arguments);Jb.enumErrorProps=Hb.call(Eb,"message")||Hb.call(Eb,"name"),Jb.enumPrototypes=Hb.call(a,"prototype"),Jb.nonEnumArgs=0!=c,Jb.nonEnumShadows=!/valueOf/.test(b)}(1);var Kb=V.internals.isObject=function(a){var b=typeof a;return a&&("function"==b||"object"==b)||!1},Lb=function(a){return a&&"object"==typeof a?Bb.call(a)==rb:!1};Db||(Lb=function(a){return a&&"object"==typeof a?Cb.call(a,"callee"):!1});{var Mb=V.internals.isEqual=function(a,b){return m(a,b,[],[])},Nb=Array.prototype.slice,Ob=({}.hasOwnProperty,this.inherits=V.internals.inherits=function(a,b){function c(){this.constructor=a}c.prototype=b.prototype,a.prototype=new c}),Pb=V.internals.addProperties=function(a){for(var b=Nb.call(arguments,1),c=0,d=b.length;d>c;c++){var e=b[c];for(var f in e)a[f]=e[f]}};V.internals.addRef=function(a,b){return new Sc(function(c){return new Ub(b.getDisposable(),a.subscribe(c))})}}Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,c=Nb.call(arguments,1),d=function(){function e(){}if(this instanceof d){e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(Nb.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(Nb.call(arguments)))};return d}),Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c,d;if(null==this)throw new TypeError(" this is null or not defined");var e=Object(this),f=e.length>>>0;if("function"!=typeof a)throw new TypeError(a+" is not a function");for(arguments.length>1&&(c=b),d=0;f>d;){var g;d in e&&(g=e[d],a.call(c,g,d,e)),d++}});var Qb=Object("a"),Rb="a"!=Qb[0]||!(0 in Qb);Array.prototype.every||(Array.prototype.every=function(a){var b=Object(this),c=Rb&&{}.toString.call(this)==Ab?this.split(""):b,d=c.length>>>0,e=arguments[1];if({}.toString.call(a)!=wb)throw new TypeError(a+" is not a function");for(var f=0;d>f;f++)if(f in c&&!a.call(e,c[f],f,b))return!1;return!0}),Array.prototype.map||(Array.prototype.map=function(a){var b=Object(this),c=Rb&&{}.toString.call(this)==Ab?this.split(""):b,d=c.length>>>0,e=Array(d),f=arguments[1];if({}.toString.call(a)!=wb)throw new TypeError(a+" is not a function");for(var g=0;d>g;g++)g in c&&(e[g]=a.call(f,c[g],g,b));return e}),Array.prototype.filter||(Array.prototype.filter=function(a){for(var b,c=[],d=new Object(this),e=0,f=d.length>>>0;f>e;e++)b=d[e],e in d&&a.call(arguments[1],b,e,d)&&c.push(b);return c}),Array.isArray||(Array.isArray=function(a){return{}.toString.call(a)==sb}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){var b=Object(this),c=b.length>>>0;if(0===c)return-1;var d=0;if(arguments.length>1&&(d=Number(arguments[1]),d!==d?d=0:0!==d&&1/0!=d&&d!==-1/0&&(d=(d>0||-1)*Math.floor(Math.abs(d)))),d>=c)return-1;for(var e=d>=0?d:Math.max(c-Math.abs(d),0);c>e;e++)if(e in b&&b[e]===a)return e;return-1}),Object.prototype.propertyIsEnumerable||(Object.prototype.propertyIsEnumerable=function(a){for(var b in this)if(b===a)return!0;return!1}),Object.keys||(Object.keys=function(){"use strict";var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString");return function(c){if("object"!=typeof c&&("function"!=typeof c||null===c))throw new TypeError("Object.keys called on non-object");var d,e,f=[];for(d in c)a.call(c,d)&&f.push(d);if(b)for(e=0;qb>e;e++)a.call(c,pb[e])&&f.push(pb[e]);return f}}()),p.prototype.compareTo=function(a){var b=this.value.compareTo(a.value);return 0===b&&(b=this.id-a.id),b};var Sb=V.internals.PriorityQueue=function(a){this.items=new Array(a),this.length=0},Tb=Sb.prototype;Tb.isHigherPriority=function(a,b){return this.items[a].compareTo(this.items[b])<0},Tb.percolate=function(a){if(!(a>=this.length||0>a)){var b=a-1>>1;if(!(0>b||b===a)&&this.isHigherPriority(a,b)){var c=this.items[a];this.items[a]=this.items[b],this.items[b]=c,this.percolate(b)}}},Tb.heapify=function(a){if(+a||(a=0),!(a>=this.length||0>a)){var b=2*a+1,c=2*a+2,d=a;if(b<this.length&&this.isHigherPriority(b,d)&&(d=b),c<this.length&&this.isHigherPriority(c,d)&&(d=c),d!==a){var e=this.items[a];this.items[a]=this.items[d],this.items[d]=e,this.heapify(d)}}},Tb.peek=function(){return this.items[0].value},Tb.removeAt=function(a){this.items[a]=this.items[--this.length],delete this.items[this.length],this.heapify()},Tb.dequeue=function(){var a=this.peek();return this.removeAt(0),a},Tb.enqueue=function(a){var b=this.length++;this.items[b]=new p(Sb.count++,a),this.percolate(b)},Tb.remove=function(a){for(var b=0;b<this.length;b++)if(this.items[b].value===a)return this.removeAt(b),!0;return!1},Sb.count=0;var Ub=V.CompositeDisposable=function(){this.disposables=n(arguments,0),this.isDisposed=!1,this.length=this.disposables.length},Vb=Ub.prototype;Vb.add=function(a){this.isDisposed?a.dispose():(this.disposables.push(a),this.length++)},Vb.remove=function(a){var b=!1;if(!this.isDisposed){var c=this.disposables.indexOf(a);-1!==c&&(b=!0,this.disposables.splice(c,1),this.length--,a.dispose())}return b},Vb.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;var a=this.disposables.slice(0);this.disposables=[],this.length=0;for(var b=0,c=a.length;c>b;b++)a[b].dispose()}},Vb.toArray=function(){return this.disposables.slice(0)};var Wb=V.Disposable=function(a){this.isDisposed=!1,this.action=a||W};Wb.prototype.dispose=function(){this.isDisposed||(this.action(),this.isDisposed=!0)};var Xb=Wb.create=function(a){return new Wb(a)},Yb=Wb.empty={dispose:W},Zb=V.SingleAssignmentDisposable=function(){function a(){this.isDisposed=!1,this.current=null}var b=a.prototype;return b.getDisposable=function(){return this.current},b.setDisposable=function(a){var b,c=this.isDisposed;c||(b=this.current,this.current=a),b&&b.dispose(),c&&a&&a.dispose()},b.dispose=function(){var a;this.isDisposed||(this.isDisposed=!0,a=this.current,this.current=null),a&&a.dispose()},a}(),$b=V.SerialDisposable=Zb,_b=(V.RefCountDisposable=function(){function a(a){this.disposable=a,this.disposable.count++,this.isInnerDisposed=!1}function b(a){this.underlyingDisposable=a,this.isDisposed=!1,this.isPrimaryDisposed=!1,this.count=0}return a.prototype.dispose=function(){this.disposable.isDisposed||this.isInnerDisposed||(this.isInnerDisposed=!0,this.disposable.count--,0===this.disposable.count&&this.disposable.isPrimaryDisposed&&(this.disposable.isDisposed=!0,this.disposable.underlyingDisposable.dispose()))},b.prototype.dispose=function(){this.isDisposed||this.isPrimaryDisposed||(this.isPrimaryDisposed=!0,0===this.count&&(this.isDisposed=!0,this.underlyingDisposable.dispose()))},b.prototype.getDisposable=function(){return this.isDisposed?Yb:new a(this)},b}(),V.internals.ScheduledItem=function(a,b,c,d,e){this.scheduler=a,this.state=b,this.action=c,this.dueTime=d,this.comparer=e||_,this.disposable=new Zb});_b.prototype.invoke=function(){this.disposable.setDisposable(this.invokeCore())},_b.prototype.compareTo=function(a){return this.comparer(this.dueTime,a.dueTime)},_b.prototype.isCancelled=function(){return this.disposable.isDisposed},_b.prototype.invokeCore=function(){return this.action(this.scheduler,this.state)};var ac=V.Scheduler=function(){function a(a,b,c,d){this.now=a,this._schedule=b,this._scheduleRelative=c,this._scheduleAbsolute=d}function b(a,b){return b(),Yb}var c=a.prototype;return c.schedule=function(a){return this._schedule(a,b)},c.scheduleWithState=function(a,b){return this._schedule(a,b)},c.scheduleWithRelative=function(a,c){return this._scheduleRelative(c,a,b)},c.scheduleWithRelativeAndState=function(a,b,c){return this._scheduleRelative(a,b,c)},c.scheduleWithAbsolute=function(a,c){return this._scheduleAbsolute(c,a,b)},c.scheduleWithAbsoluteAndState=function(a,b,c){return this._scheduleAbsolute(a,b,c)},a.now=Z,a.normalize=function(a){return 0>a&&(a=0),a},a}(),bc=ac.normalize;!function(a){function b(a,b){var c=b.first,d=b.second,e=new Ub,f=function(b){d(b,function(b){var c=!1,d=!1,g=a.scheduleWithState(b,function(a,b){return c?e.remove(g):d=!0,f(b),Yb});d||(e.add(g),c=!0)})};return f(c),e}function c(a,b,c){var d=b.first,e=b.second,f=new Ub,g=function(b){e(b,function(b,d){var e=!1,h=!1,i=a[c].call(a,b,d,function(a,b){return e?f.remove(i):h=!0,g(b),Yb});h||(f.add(i),e=!0)})};return g(d),f}function d(a,b){a(function(c){b(a,c)})}a.scheduleRecursive=function(a){return this.scheduleRecursiveWithState(a,function(a,b){a(function(){b(a)})})},a.scheduleRecursiveWithState=function(a,c){return this.scheduleWithState({first:a,second:c},b)},a.scheduleRecursiveWithRelative=function(a,b){return this.scheduleRecursiveWithRelativeAndState(b,a,d)},a.scheduleRecursiveWithRelativeAndState=function(a,b,d){return this._scheduleRelative({first:a,second:d},b,function(a,b){return c(a,b,"scheduleWithRelativeAndState")})},a.scheduleRecursiveWithAbsolute=function(a,b){return this.scheduleRecursiveWithAbsoluteAndState(b,a,d)},a.scheduleRecursiveWithAbsoluteAndState=function(a,b,d){return this._scheduleAbsolute({first:a,second:d},b,function(a,b){return c(a,b,"scheduleWithAbsoluteAndState")})}}(ac.prototype),function(){ac.prototype.schedulePeriodic=function(a,b){return this.schedulePeriodicWithState(null,a,b)},ac.prototype.schedulePeriodicWithState=function(a,b,c){if("undefined"==typeof Q.setInterval)throw new Error("Periodic scheduling not supported.");var d=a,e=Q.setInterval(function(){d=c(d)},b);return Xb(function(){Q.clearInterval(e)})}}(ac.prototype);var cc,dc=ac.immediate=function(){function a(a,b){return b(this,a)}function b(a,b,c){for(var d=bc(b);d-this.now()>0;);return c(this,a)}function c(a,b,c){return this.scheduleWithRelativeAndState(a,b-this.now(),c)}return new ac(Z,a,b,c)}(),ec=ac.currentThread=function(){function a(a){for(var b;a.length>0;)if(b=a.dequeue(),!b.isCancelled()){for(;b.dueTime-ac.now()>0;);b.isCancelled()||b.invoke()}}function b(a,b){return this.scheduleWithRelativeAndState(a,0,b)}function c(b,c,d){var f=this.now()+ac.normalize(c),g=new _b(this,b,d,f);if(e)e.enqueue(g);else{e=new Sb(4),e.enqueue(g);try{a(e)}catch(h){throw h}finally{e=null}}return g.disposable}function d(a,b,c){return this.scheduleWithRelativeAndState(a,b-this.now(),c)}var e,f=new ac(Z,b,c,d);return f.scheduleRequired=function(){return!e},f.ensureTrampoline=function(a){e?a():this.schedule(a)},f}(),fc=(V.internals.SchedulePeriodicRecursive=function(){function a(a,b){b(0,this._period);try{this._state=this._action(this._state)}catch(c){throw this._cancel.dispose(),c}}function b(a,b,c,d){this._scheduler=a,this._state=b,this._period=c,this._action=d}return b.prototype.start=function(){var b=new Zb;return this._cancel=b,b.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0,this._period,a.bind(this))),b},b}(),W),gc=function(){var a,b=W;if("WScript"in this)a=function(a,b){WScript.Sleep(b),a()};else{if(!Q.setTimeout)throw new Error("No concurrency detected!");a=Q.setTimeout,b=Q.clearTimeout}return{setTimeout:a,clearTimeout:b}}(),hc=gc.setTimeout,ic=gc.clearTimeout;!function(){function a(){if(!Q.postMessage||Q.importScripts)return!1;var a=!1,b=Q.onmessage;return Q.onmessage=function(){a=!0},Q.postMessage("","*"),Q.onmessage=b,a}var b=RegExp("^"+String(Bb).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),c="function"==typeof(c=U&&T&&U.setImmediate)&&!b.test(c)&&c,d="function"==typeof(d=U&&T&&U.clearImmediate)&&!b.test(d)&&d;if("function"==typeof c)cc=c,fc=d;else if("undefined"!=typeof process&&"[object process]"==={}.toString.call(process))cc=process.nextTick;else if(a()){var e="ms.rx.schedule"+Math.random(),f={},g=0,h=function(a){if("string"==typeof a.data&&a.data.substring(0,e.length)===e){var b=a.data.substring(e.length),c=f[b];c(),delete f[b]}};Q.addEventListener?Q.addEventListener("message",h,!1):Q.attachEvent("onmessage",h,!1),cc=function(a){var b=g++;f[b]=a,Q.postMessage(e+b,"*")}}else if(Q.MessageChannel){var i=new Q.MessageChannel,j={},k=0;i.port1.onmessage=function(a){var b=a.data,c=j[b];c(),delete j[b]},cc=function(a){var b=k++;j[b]=a,i.port2.postMessage(b)}}else"document"in Q&&"onreadystatechange"in Q.document.createElement("script")?cc=function(a){var b=Q.document.createElement("script");b.onreadystatechange=function(){a(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},Q.document.documentElement.appendChild(b)}:(cc=function(a){return hc(a,0)},fc=ic)}();var jc=ac.timeout=function(){function a(a,b){var c=this,d=new Zb,e=cc(function(){d.isDisposed||d.setDisposable(b(c,a))});return new Ub(d,Xb(function(){fc(e)}))}function b(a,b,c){var d=this,e=ac.normalize(b);if(0===e)return d.scheduleWithState(a,c);var f=new Zb,g=hc(function(){f.isDisposed||f.setDisposable(c(d,a))},e);return new Ub(f,Xb(function(){ic(g)}))}function c(a,b,c){return this.scheduleWithRelativeAndState(a,b-this.now(),c)}return new ac(Z,a,b,c)}(),kc=V.Notification=function(){function a(a,b){this.hasValue=null==b?!1:b,this.kind=a}return a.prototype.accept=function(a,b,c){return a&&"object"==typeof a?this._acceptObservable(a):this._accept(a,b,c)},a.prototype.toObservable=function(a){var b=this;return X(a)||(a=dc),new Sc(function(c){return a.schedule(function(){b._acceptObservable(c),"N"===b.kind&&c.onCompleted()})})},a}(),lc=kc.createOnNext=function(){function a(a){return a(this.value)}function b(a){return a.onNext(this.value)}function c(){return"OnNext("+this.value+")"}return function(d){var e=new kc("N",!0);return e.value=d,e._accept=a,e._acceptObservable=b,e.toString=c,e}}(),mc=kc.createOnError=function(){function a(a,b){return b(this.exception)}function b(a){return a.onError(this.exception)}function c(){return"OnError("+this.exception+")"}return function(d){var e=new kc("E");return e.exception=d,e._accept=a,e._acceptObservable=b,e.toString=c,e}}(),nc=kc.createOnCompleted=function(){function a(a,b,c){return c()}function b(a){return a.onCompleted()}function c(){return"OnCompleted()"}return function(){var d=new kc("C");return d._accept=a,d._acceptObservable=b,d.toString=c,d}}(),oc=V.internals.Enumerator=function(a){this._next=a};oc.prototype.next=function(){return this._next()},oc.prototype[kb]=function(){return this};var pc=V.internals.Enumerable=function(a){this._iterator=a};pc.prototype[kb]=function(){return this._iterator()},pc.prototype.concat=function(){var a=this;return new Sc(function(b){var c;try{c=a[kb]()}catch(d){return void b.onError(d)}var e,f=new $b,g=dc.scheduleRecursive(function(a){var d;if(!e){try{d=c.next()}catch(g){return void b.onError(g)}if(d.done)return void b.onCompleted();var h=d.value;bb(h)&&(h=Lc(h));var i=new Zb;f.setDisposable(i),i.setDisposable(h.subscribe(b.onNext.bind(b),b.onError.bind(b),function(){a()}))}});return new Ub(f,g,Xb(function(){e=!0}))})},pc.prototype.catchError=function(){var a=this;return new Sc(function(b){var c;try{c=a[kb]()}catch(d){return void b.onError(d)}var e,f,g=new $b,h=dc.scheduleRecursive(function(a){if(!e){var d;try{d=c.next()}catch(h){return void b.onError(h)}if(d.done)return void(f?b.onError(f):b.onCompleted());var i=d.value;bb(i)&&(i=Lc(i));var j=new Zb;g.setDisposable(j),j.setDisposable(i.subscribe(b.onNext.bind(b),function(b){f=b,a()},b.onCompleted.bind(b)))}});return new Ub(g,h,Xb(function(){e=!0}))})};var qc=pc.repeat=function(a,b){return null==b&&(b=-1),new pc(function(){var c=b;return new oc(function(){return 0===c?lb:(c>0&&c--,{done:!1,value:a})})})},rc=pc.of=function(a,b,c){return b||(b=Y),new pc(function(){var d=-1;return new oc(function(){return++d<a.length?{done:!1,value:b.call(c,a[d],d,a)}:lb})})},sc=V.Observer=function(){};sc.prototype.toNotifier=function(){var a=this;return function(b){return b.accept(a)}},sc.prototype.asObserver=function(){return new wc(this.onNext.bind(this),this.onError.bind(this),this.onCompleted.bind(this))};var tc=sc.create=function(a,b,c){return a||(a=W),b||(b=ab),c||(c=W),new wc(a,b,c)};sc.fromNotifier=function(a,b){return new wc(function(c){return a.call(b,lc(c))},function(c){return a.call(b,mc(c))},function(){return a.call(b,nc())})};var uc,vc=V.internals.AbstractObserver=function(a){function b(){this.isStopped=!1,a.call(this)}return Ob(b,a),b.prototype.onNext=function(a){this.isStopped||this.next(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.error(a))},b.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.completed())},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.error(a),!0)},b}(sc),wc=V.AnonymousObserver=function(a){function b(b,c,d){a.call(this),this._onNext=b,this._onError=c,this._onCompleted=d}return Ob(b,a),b.prototype.next=function(a){this._onNext(a)},b.prototype.error=function(a){this._onError(a)},b.prototype.completed=function(){this._onCompleted()},b}(vc),xc=V.Observable=function(){function a(a){if(V.config.longStackSupport&&fb){try{throw new Error}catch(b){this.stack=b.stack.substring(b.stack.indexOf("\n")+1)}var d=this;this._subscribe=function(b){var e=b.onError.bind(b);return b.onError=function(a){c(a,d),e(a)},a(b)}}else this._subscribe=a}return uc=a.prototype,uc.subscribe=uc.forEach=function(a,b,c){return this._subscribe("object"==typeof a?a:tc(a,b,c))},uc.subscribeOnNext=function(a,b){return this._subscribe(tc(2===arguments.length?function(c){a.call(b,c)}:a))},uc.subscribeOnError=function(a,b){return this._subscribe(tc(null,2===arguments.length?function(c){a.call(b,c)}:a))},uc.subscribeOnCompleted=function(a,b){return this._subscribe(tc(null,null,2===arguments.length?function(){a.call(b)}:a))},a}(),yc=V.internals.ScheduledObserver=function(a){function b(b,c){a.call(this),this.scheduler=b,this.observer=c,this.isAcquired=!1,this.hasFaulted=!1,this.queue=[],this.disposable=new $b}return Ob(b,a),b.prototype.next=function(a){var b=this;this.queue.push(function(){b.observer.onNext(a)})},b.prototype.error=function(a){var b=this;this.queue.push(function(){b.observer.onError(a)})},b.prototype.completed=function(){var a=this;this.queue.push(function(){a.observer.onCompleted()})},b.prototype.ensureActive=function(){var a=!1,b=this;!this.hasFaulted&&this.queue.length>0&&(a=!this.isAcquired,this.isAcquired=!0),a&&this.disposable.setDisposable(this.scheduler.scheduleRecursive(function(a){var c;if(!(b.queue.length>0))return void(b.isAcquired=!1);c=b.queue.shift();try{c()}catch(d){throw b.queue=[],b.hasFaulted=!0,d}a()}))},b.prototype.dispose=function(){a.prototype.dispose.call(this),this.disposable.dispose()},b}(vc);uc.toArray=function(){var a=this;return new Sc(function(b){var c=[];return a.subscribe(c.push.bind(c),b.onError.bind(b),function(){b.onNext(c),b.onCompleted()})},a)},xc.create=xc.createWithDisposable=function(a,b){return new Sc(a,b)};var zc=xc.defer=function(a){return new Sc(function(b){var c;try{c=a()}catch(d){return Fc(d).subscribe(b)}return bb(c)&&(c=Lc(c)),c.subscribe(b)})},Ac=xc.empty=function(a){return X(a)||(a=dc),new Sc(function(b){return a.schedule(function(){b.onCompleted()})})},Bc=Math.pow(2,53)-1;q.prototype[kb]=function(){return new r(this._s)},r.prototype[kb]=function(){return this},r.prototype.next=function(){if(this._i<this._l){var a=this._s.charAt(this._i++);return{done:!1,value:a}}return lb},t.prototype[kb]=function(){return new u(this._a)},u.prototype[kb]=function(){return this},u.prototype.next=function(){if(this._i<this._l){var a=this._a[this._i++];return{done:!1,value:a}}return lb};{var Cc=xc.from=function(a,b,c,d){if(null==a)throw new Error("iterable cannot be null.");if(b&&!cb(b))throw new Error("mapFn when provided must be a function");X(d)||(d=ec);var e=Object(a),f=w(e);return new Sc(function(a){var e=0;return d.scheduleRecursive(function(d){var g;try{g=f.next()}catch(h){return void a.onError(h)}if(g.done)return void a.onCompleted();var i=g.value;if(b&&cb(b))try{i=b.call(c,i,e)}catch(h){return void a.onError(h)}a.onNext(i),e++,d()})})},Dc=xc.fromArray=function(a,b){return X(b)||(b=ec),new Sc(function(c){var d=0,e=a.length;return b.scheduleRecursive(function(b){e>d?(c.onNext(a[d++]),b()):c.onCompleted()})})};xc.never=function(){return new Sc(function(){return Yb})}}xc.of=function(){return z(null,arguments)},xc.ofWithScheduler=function(a){return z(a,Nb.call(arguments,1))},xc.pairs=function(a,b){return b||(b=V.Scheduler.currentThread),new Sc(function(c){var d=0,e=Object.keys(a),f=e.length;return b.scheduleRecursive(function(b){if(f>d){var g=e[d++];c.onNext([g,a[g]]),b()}else c.onCompleted()})})},xc.range=function(a,b,c){return X(c)||(c=ec),new Sc(function(d){return c.scheduleRecursiveWithState(0,function(c,e){b>c?(d.onNext(a+c),e(c+1)):d.onCompleted()})})},xc.repeat=function(a,b,c){return X(c)||(c=ec),Ec(a,c).repeat(null==b?-1:b)};var Ec=xc["return"]=xc.just=function(a,b){return X(b)||(b=dc),new Sc(function(c){return b.schedule(function(){c.onNext(a),c.onCompleted()})})};xc.returnValue=function(){return Ec.apply(null,arguments)};var Fc=xc["throw"]=xc.throwException=xc.throwError=function(a,b){return X(b)||(b=dc),new Sc(function(c){return b.schedule(function(){c.onError(a)})})};uc["catch"]=uc.catchError=function(a){return"function"==typeof a?A(this,a):Gc([this,a])},uc.catchException=function(a){return this.catchError(a)};var Gc=xc.catchError=xc["catch"]=function(){return rc(n(arguments,0)).catchError()};xc.catchException=function(){return Gc.apply(null,arguments)},uc.combineLatest=function(){var a=Nb.call(arguments);return Array.isArray(a[0])?a[0].unshift(this):a.unshift(this),Hc.apply(this,a)};var Hc=xc.combineLatest=function(){var a=Nb.call(arguments),b=a.pop();return Array.isArray(a[0])&&(a=a[0]),new Sc(function(c){function d(a){var d;if(h[a]=!0,i||(i=h.every(Y))){try{d=b.apply(null,k)}catch(e){return void c.onError(e)}c.onNext(d)}else j.filter(function(b,c){return c!==a}).every(Y)&&c.onCompleted()}function e(a){j[a]=!0,j.every(Y)&&c.onCompleted()}for(var f=function(){return!1},g=a.length,h=o(g,f),i=!1,j=o(g,f),k=new Array(g),l=new Array(g),m=0;g>m;m++)!function(b){var f=a[b],g=new Zb;
bb(f)&&(f=Lc(f)),g.setDisposable(f.subscribe(function(a){k[b]=a,d(b)},c.onError.bind(c),function(){e(b)})),l[b]=g}(m);return new Ub(l)},this)};uc.concat=function(){var a=Nb.call(arguments,0);return a.unshift(this),Ic.apply(this,a)};var Ic=xc.concat=function(){return rc(n(arguments,0)).concat()};uc.concatAll=function(){return this.merge(1)},uc.concatObservable=function(){return this.merge(1)},uc.merge=function(a){if("number"!=typeof a)return Jc(this,a);var b=this;return new Sc(function(c){function d(a){var b=new Zb;f.add(b),bb(a)&&(a=Lc(a)),b.setDisposable(a.subscribe(c.onNext.bind(c),c.onError.bind(c),function(){f.remove(b),h.length>0?d(h.shift()):(e--,g&&0===e&&c.onCompleted())}))}var e=0,f=new Ub,g=!1,h=[];return f.add(b.subscribe(function(b){a>e?(e++,d(b)):h.push(b)},c.onError.bind(c),function(){g=!0,0===e&&c.onCompleted()})),f},b)};var Jc=xc.merge=function(){var a,b;return arguments[0]?X(arguments[0])?(a=arguments[0],b=Nb.call(arguments,1)):(a=dc,b=Nb.call(arguments,0)):(a=dc,b=Nb.call(arguments,1)),Array.isArray(b[0])&&(b=b[0]),z(a,b).mergeAll()};uc.mergeAll=function(){var a=this;return new Sc(function(b){var c=new Ub,d=!1,e=new Zb;return c.add(e),e.setDisposable(a.subscribe(function(a){var e=new Zb;c.add(e),bb(a)&&(a=Lc(a)),e.setDisposable(a.subscribe(b.onNext.bind(b),b.onError.bind(b),function(){c.remove(e),d&&1===c.length&&b.onCompleted()}))},b.onError.bind(b),function(){d=!0,1===c.length&&b.onCompleted()})),c},a)},uc.mergeObservable=function(){return this.mergeAll.apply(this,arguments)},uc.skipUntil=function(a){var b=this;return new Sc(function(c){var d=!1,e=new Ub(b.subscribe(function(a){d&&c.onNext(a)},c.onError.bind(c),function(){d&&c.onCompleted()}));bb(a)&&(a=Lc(a));var f=new Zb;return e.add(f),f.setDisposable(a.subscribe(function(){d=!0,f.dispose()},c.onError.bind(c),function(){f.dispose()})),e},b)},uc["switch"]=uc.switchLatest=function(){var a=this;return new Sc(function(b){var c=!1,d=new $b,e=!1,f=0,g=a.subscribe(function(a){var g=new Zb,h=++f;c=!0,d.setDisposable(g),bb(a)&&(a=Lc(a)),g.setDisposable(a.subscribe(function(a){f===h&&b.onNext(a)},function(a){f===h&&b.onError(a)},function(){f===h&&(c=!1,e&&b.onCompleted())}))},b.onError.bind(b),function(){e=!0,!c&&b.onCompleted()});return new Ub(g,d)},a)},uc.takeUntil=function(a){var b=this;return new Sc(function(c){return bb(a)&&(a=Lc(a)),new Ub(b.subscribe(c),a.subscribe(c.onCompleted.bind(c),c.onError.bind(c),W))},b)},uc.withLatestFrom=function(){var a=this,b=Nb.call(arguments),c=b.pop();if("undefined"==typeof a)throw new Error("Source observable not found for withLatestFrom().");if("function"!=typeof c)throw new Error("withLatestFrom() expects a resultSelector function.");return Array.isArray(b[0])&&(b=b[0]),new Sc(function(d){for(var e=function(){return!1},f=b.length,g=o(f,e),h=!1,i=new Array(f),j=new Array(f+1),k=0;f>k;k++)!function(a){var c=b[a],e=new Zb;bb(c)&&(c=Lc(c)),e.setDisposable(c.subscribe(function(b){i[a]=b,g[a]=!0,h=g.every(Y)},d.onError.bind(d),function(){})),j[a]=e}(k);var l=new Zb;return l.setDisposable(a.subscribe(function(a){var b,e=[a].concat(i);if(h){try{b=c.apply(null,e)}catch(f){return void d.onError(f)}d.onNext(b)}},d.onError.bind(d),function(){d.onCompleted()})),j[f]=l,new Ub(j)},this)},uc.zip=function(){if(Array.isArray(arguments[0]))return B.apply(this,arguments);var a=this,b=Nb.call(arguments),c=b.pop();return b.unshift(a),new Sc(function(d){function e(b){var e,f;if(h.every(function(a){return a.length>0})){try{f=h.map(function(a){return a.shift()}),e=c.apply(a,f)}catch(g){return void d.onError(g)}d.onNext(e)}else i.filter(function(a,c){return c!==b}).every(Y)&&d.onCompleted()}function f(a){i[a]=!0,i.every(function(a){return a})&&d.onCompleted()}for(var g=b.length,h=o(g,function(){return[]}),i=o(g,function(){return!1}),j=new Array(g),k=0;g>k;k++)!function(a){var c=b[a],g=new Zb;bb(c)&&(c=Lc(c)),g.setDisposable(c.subscribe(function(b){h[a].push(b),e(a)},d.onError.bind(d),function(){f(a)})),j[a]=g}(k);return new Ub(j)},a)},xc.zip=function(){var a=Nb.call(arguments,0),b=a.shift();return b.zip.apply(b,a)},xc.zipArray=function(){var a=n(arguments,0);return new Sc(function(b){function c(a){if(f.every(function(a){return a.length>0})){var c=f.map(function(a){return a.shift()});b.onNext(c)}else if(g.filter(function(b,c){return c!==a}).every(Y))return void b.onCompleted()}function d(a){return g[a]=!0,g.every(Y)?void b.onCompleted():void 0}for(var e=a.length,f=o(e,function(){return[]}),g=o(e,function(){return!1}),h=new Array(e),i=0;e>i;i++)!function(e){h[e]=new Zb,h[e].setDisposable(a[e].subscribe(function(a){f[e].push(a),c(e)},b.onError.bind(b),function(){d(e)}))}(i);var j=new Ub(h);return j.add(Xb(function(){for(var a=0,b=f.length;b>a;a++)f[a]=[]})),j})},uc.asObservable=function(){return new Sc(this.subscribe.bind(this),this)},uc.dematerialize=function(){var a=this;return new Sc(function(b){return a.subscribe(function(a){return a.accept(b)},b.onError.bind(b),b.onCompleted.bind(b))},this)},uc.distinctUntilChanged=function(a,b){var c=this;return a||(a=Y),b||(b=$),new Sc(function(d){var e,f=!1;return c.subscribe(function(c){var g,h=!1;try{g=a(c)}catch(i){return void d.onError(i)}if(f)try{h=b(e,g)}catch(i){return void d.onError(i)}f&&h||(f=!0,e=g,d.onNext(c))},d.onError.bind(d),d.onCompleted.bind(d))},this)},uc["do"]=uc.tap=function(a,b,c){var d,e=this;return"function"==typeof a?d=a:(d=a.onNext.bind(a),b=a.onError.bind(a),c=a.onCompleted.bind(a)),new Sc(function(a){return e.subscribe(function(b){try{d(b)}catch(c){a.onError(c)}a.onNext(b)},function(c){if(b)try{b(c)}catch(d){a.onError(d)}a.onError(c)},function(){if(c)try{c()}catch(b){a.onError(b)}a.onCompleted()})},this)},uc.doAction=function(){return this.tap.apply(this,arguments)},uc.doOnNext=uc.tapOnNext=function(a,b){return this.tap(2===arguments.length?function(c){a.call(b,c)}:a)},uc.doOnError=uc.tapOnError=function(a,b){return this.tap(W,2===arguments.length?function(c){a.call(b,c)}:a)},uc.doOnCompleted=uc.tapOnCompleted=function(a,b){return this.tap(W,null,2===arguments.length?function(){a.call(b)}:a)},uc["finally"]=uc.ensure=function(a){var b=this;return new Sc(function(c){var d;try{d=b.subscribe(c)}catch(e){throw a(),e}return Xb(function(){try{d.dispose()}catch(b){throw b}finally{a()}})},this)},uc.finallyAction=function(a){return this.ensure(a)},uc.ignoreElements=function(){var a=this;return new Sc(function(b){return a.subscribe(W,b.onError.bind(b),b.onCompleted.bind(b))},a)},uc.materialize=function(){var a=this;return new Sc(function(b){return a.subscribe(function(a){b.onNext(lc(a))},function(a){b.onNext(mc(a)),b.onCompleted()},function(){b.onNext(nc()),b.onCompleted()})},a)},uc.repeat=function(a){return qc(this,a).concat()},uc.retry=function(a){return qc(this,a).catchError()},uc.scan=function(){var a,b,c=!1,d=this;return 2===arguments.length?(c=!0,a=arguments[0],b=arguments[1]):b=arguments[0],new Sc(function(e){var f,g,h;return d.subscribe(function(d){!h&&(h=!0);try{f?g=b(g,d):(g=c?b(a,d):d,f=!0)}catch(i){return void e.onError(i)}e.onNext(g)},e.onError.bind(e),function(){!h&&c&&e.onNext(a),e.onCompleted()})},d)},uc.skipLast=function(a){var b=this;return new Sc(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&c.onNext(d.shift())},c.onError.bind(c),c.onCompleted.bind(c))},b)},uc.startWith=function(){var a,b,c=0;return arguments.length&&X(arguments[0])?(b=arguments[0],c=1):b=dc,a=Nb.call(arguments,c),rc([Dc(a,b),this]).concat()},uc.takeLast=function(a){var b=this;return new Sc(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&d.shift()},c.onError.bind(c),function(){for(;d.length>0;)c.onNext(d.shift());c.onCompleted()})},b)},uc.selectConcat=uc.concatMap=function(a,b,c){return cb(a)&&cb(b)?this.concatMap(function(c,d){var e=a(c,d);return bb(e)&&(e=Lc(e)),(nb(e)||mb(e))&&(e=Cc(e)),e.map(function(a,e){return b(c,a,d,e)})}):cb(a)?C(this,a,c):C(this,function(){return a})},uc.select=uc.map=function(a,b){var c=cb(a)?a:function(){return a},d=this;return new Sc(function(a){var e=0;return d.subscribe(function(f){var g;try{g=c.call(b,f,e++,d)}catch(h){return void a.onError(h)}a.onNext(g)},a.onError.bind(a),a.onCompleted.bind(a))},d)},uc.pluck=function(a){return this.map(function(b){return b[a]})},uc.selectMany=uc.flatMap=function(a,b,c){return cb(a)&&cb(b)?this.flatMap(function(c,d){var e=a(c,d);return bb(e)&&(e=Lc(e)),(nb(e)||mb(e))&&(e=Cc(e)),e.map(function(a,e){return b(c,a,d,e)})},c):cb(a)?D(this,a,c):D(this,function(){return a})},uc.selectSwitch=uc.flatMapLatest=uc.switchMap=function(a,b){return this.select(a,b).switchLatest()},uc.skip=function(a){if(0>a)throw new Error(db);var b=this;return new Sc(function(c){var d=a;return b.subscribe(function(a){0>=d?c.onNext(a):d--},c.onError.bind(c),c.onCompleted.bind(c))},b)},uc.skipWhile=function(a,b){var c=this;return new Sc(function(d){var e=0,f=!1;return c.subscribe(function(g){if(!f)try{f=!a.call(b,g,e++,c)}catch(h){return void d.onError(h)}f&&d.onNext(g)},d.onError.bind(d),d.onCompleted.bind(d))},c)},uc.take=function(a,b){if(0>a)throw new RangeError(db);if(0===a)return Ac(b);var c=this;return new Sc(function(b){var d=a;return c.subscribe(function(a){d-->0&&(b.onNext(a),0===d&&b.onCompleted())},b.onError.bind(b),b.onCompleted.bind(b))},c)},uc.takeWhile=function(a,b){var c=this;return new Sc(function(d){var e=0,f=!0;return c.subscribe(function(g){if(f){try{f=a.call(b,g,e++,c)}catch(h){return void d.onError(h)}f?d.onNext(g):d.onCompleted()}},d.onError.bind(d),d.onCompleted.bind(d))},c)},uc.where=uc.filter=function(a,b){var c=this;return new Sc(function(d){var e=0;return c.subscribe(function(f){var g;try{g=a.call(b,f,e++,c)}catch(h){return void d.onError(h)}g&&d.onNext(f)},d.onError.bind(d),d.onCompleted.bind(d))},c)},xc.fromCallback=function(a,b,c){return function(){var d=Nb.call(arguments,0);return new Sc(function(e){function f(){var a=arguments;if(c){try{a=c(a)}catch(b){return void e.onError(b)}e.onNext(a)}else a.length<=1?e.onNext.apply(e,a):e.onNext(a);e.onCompleted()}d.push(f),a.apply(b,d)}).publishLast().refCount()}},xc.fromNodeCallback=function(a,b,c){return function(){var d=Nb.call(arguments,0);return new Sc(function(e){function f(a){if(a)return void e.onError(a);var b=Nb.call(arguments,1);if(c){try{b=c(b)}catch(d){return void e.onError(d)}e.onNext(b)}else b.length<=1?e.onNext.apply(e,b):e.onNext(b);e.onCompleted()}d.push(f),a.apply(b,d)}).publishLast().refCount()}},V.config.useNativeEvents=!1,xc.fromEvent=function(a,b,c){if(a.subscribe)return Kc(function(c){a.subscribe(b,c)},function(c){a.unsubscribe(b,c)},c);if(!V.config.useNativeEvents){if("function"===a.on&&"function"===a.off)return Kc(function(c){a.on(b,c)},function(c){a.off(b,c)},c);if(Q.Ember&&"function"==typeof Q.Ember.subscribe)return Kc(function(c){Ember.subscribe(a,b,c)},function(c){Ember.unsubscribe(a,b,c)},c)}return new Sc(function(d){return G(a,b,function(a){var b=a;if(c)try{b=c(arguments)}catch(e){return void d.onError(e)}d.onNext(b)})}).publish().refCount()};var Kc=xc.fromEventPattern=function(a,b,c){return new Sc(function(d){function e(a){var b=a;if(c)try{b=c(arguments)}catch(e){return void d.onError(e)}d.onNext(b)}var f=a(e);return Xb(function(){b&&b(e,f)})}).publish().refCount()},Lc=xc.fromPromise=function(a){return zc(function(){var b=new V.AsyncSubject;return a.then(function(a){b.onNext(a),b.onCompleted()},b.onError.bind(b)),b})};uc.toPromise=function(a){if(a||(a=V.config.Promise),!a)throw new TypeError("Promise type not provided nor in Rx.config.Promise");var b=this;return new a(function(a,c){var d,e=!1;b.subscribe(function(a){d=a,e=!0},c,function(){e&&a(d)})})},xc.startAsync=function(a){var b;try{b=a()}catch(c){return Fc(c)}return Lc(b)},uc.multicast=function(a,b){var c=this;return"function"==typeof a?new Sc(function(d){var e=c.multicast(a());return new Ub(b(e).subscribe(d),e.connect())},c):new Mc(c,a)},uc.publish=function(a){return a&&cb(a)?this.multicast(function(){return new Vc},a):this.multicast(new Vc)},uc.share=function(){return this.publish().refCount()},uc.publishLast=function(a){return a&&cb(a)?this.multicast(function(){return new Wc},a):this.multicast(new Wc)},uc.publishValue=function(a,b){return 2===arguments.length?this.multicast(function(){return new Yc(b)},a):this.multicast(new Yc(a))},uc.shareValue=function(a){return this.publishValue(a).refCount()},uc.replay=function(a,b,c,d){return a&&cb(a)?this.multicast(function(){return new Zc(b,c,d)},a):this.multicast(new Zc(b,c,d))},uc.shareReplay=function(a,b,c){return this.replay(null,a,b,c).refCount()};{var Mc=V.ConnectableObservable=function(a){function b(b,c){var d,e=!1,f=b.asObservable();this.connect=function(){return e||(e=!0,d=new Ub(f.subscribe(c),Xb(function(){e=!1}))),d},a.call(this,c.subscribe.bind(c))}return Ob(b,a),b.prototype.refCount=function(){var a,b=0,c=this;return new Sc(function(d){var e=1===++b,f=c.subscribe(d);return e&&(a=c.connect()),function(){f.dispose(),0===--b&&a.dispose()}})},b}(xc),Nc=xc.interval=function(a,b){return K(a,a,X(b)?b:jc)};xc.timer=function(b,c,d){var e;return X(d)||(d=jc),c!==a&&"number"==typeof c?e=c:X(c)&&(d=c),b instanceof Date&&e===a?H(b.getTime(),d):b instanceof Date&&e!==a?(e=c,I(b.getTime(),e,d)):e===a?J(b,d):K(b,e,d)}}uc.delay=function(a,b){return X(b)||(b=jc),a instanceof Date?M(this,a.getTime(),b):L(this,a,b)},uc.debounce=uc.throttleWithTimeout=function(a,b){X(b)||(b=jc);var c=this;return new Sc(function(d){var e,f=new $b,g=!1,h=0,i=c.subscribe(function(c){g=!0,e=c,h++;var i=h,j=new Zb;f.setDisposable(j),j.setDisposable(b.scheduleWithRelative(a,function(){g&&h===i&&d.onNext(e),g=!1}))},function(a){f.dispose(),d.onError(a),g=!1,h++},function(){f.dispose(),g&&d.onNext(e),d.onCompleted(),g=!1,h++});return new Ub(i,f)},this)},uc.throttle=function(a,b){return this.debounce(a,b)},uc.timestamp=function(a){return X(a)||(a=jc),this.map(function(b){return{value:b,timestamp:a.now()}})},uc.sample=uc.throttleLatest=function(a,b){return X(b)||(b=jc),"number"==typeof a?N(this,Nc(a,b)):N(this,a)},uc.timeout=function(a,b,c){(null==b||"string"==typeof b)&&(b=Fc(new Error(b||"Timeout"))),X(c)||(c=jc);var d=this,e=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new Sc(function(f){function g(){var d=h;l.setDisposable(c[e](a,function(){h===d&&(bb(b)&&(b=Lc(b)),j.setDisposable(b.subscribe(f)))}))}var h=0,i=new Zb,j=new $b,k=!1,l=new $b;return j.setDisposable(i),g(),i.setDisposable(d.subscribe(function(a){k||(h++,f.onNext(a),g())},function(a){k||(h++,f.onError(a))},function(){k||(h++,f.onCompleted())})),new Ub(j,l)},d)},uc.throttleFirst=function(a,b){X(b)||(b=jc);var c=+a||0;if(0>=c)throw new RangeError("windowDuration cannot be less or equal zero.");var d=this;return new Sc(function(a){var e=0;return d.subscribe(function(d){var f=b.now();(0===e||f-e>=c)&&(e=f,a.onNext(d))},a.onError.bind(a),a.onCompleted.bind(a))},d)};var Oc=function(a){function b(a){var b=this.source.publish(),c=b.subscribe(a),d=Yb,e=this.pauser.distinctUntilChanged().subscribe(function(a){a?d=b.connect():(d.dispose(),d=Yb)});return new Ub(c,d,e)}function c(c,d){this.source=c,this.controller=new Vc,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,a.call(this,b,c)}return Ob(c,a),c.prototype.pause=function(){this.controller.onNext(!1)},c.prototype.resume=function(){this.controller.onNext(!0)},c}(xc);uc.pausable=function(a){return new Oc(this,a)};var Pc=function(b){function c(b){var c,d=[],e=O(this.source,this.pauser.distinctUntilChanged().startWith(!1),function(a,b){return{data:a,shouldFire:b}}).subscribe(function(e){if(c!==a&&e.shouldFire!=c){if(c=e.shouldFire,e.shouldFire)for(;d.length>0;)b.onNext(d.shift())}else c=e.shouldFire,e.shouldFire?b.onNext(e.data):d.push(e.data)},function(a){for(;d.length>0;)b.onNext(d.shift());b.onError(a)},function(){for(;d.length>0;)b.onNext(d.shift());b.onCompleted()});return e}function d(a,d){this.source=a,this.controller=new Vc,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,b.call(this,c,a)}return Ob(d,b),d.prototype.pause=function(){this.controller.onNext(!1)},d.prototype.resume=function(){this.controller.onNext(!0)},d}(xc);uc.pausableBuffered=function(a){return new Pc(this,a)};var Qc=function(a){function b(a){return this.source.subscribe(a)}function c(c,d){a.call(this,b,c),this.subject=new Rc(d),this.source=c.multicast(this.subject).refCount()}return Ob(c,a),c.prototype.request=function(a){return null==a&&(a=-1),this.subject.request(a)},c}(xc),Rc=function(a){function b(a){return this.subject.subscribe(a)}function c(c){null==c&&(c=!0),a.call(this,b),this.subject=new Vc,this.enableQueue=c,this.queue=c?[]:null,this.requestedCount=0,this.requestedDisposable=Yb,this.error=null,this.hasFailed=!1,this.hasCompleted=!1,this.controlledDisposable=Yb}return Ob(c,a),Pb(c.prototype,sc,{onCompleted:function(){this.hasCompleted=!0,(!this.enableQueue||0===this.queue.length)&&this.subject.onCompleted()},onError:function(a){this.hasFailed=!0,this.error=a,(!this.enableQueue||0===this.queue.length)&&this.subject.onError(a)},onNext:function(a){var b=!1;0===this.requestedCount?this.enableQueue&&this.queue.push(a):(-1!==this.requestedCount&&0===this.requestedCount--&&this.disposeCurrentRequest(),b=!0),b&&this.subject.onNext(a)},_processRequest:function(a){if(this.enableQueue){for(;this.queue.length>=a&&a>0;)this.subject.onNext(this.queue.shift()),a--;return 0!==this.queue.length?{numberOfItems:a,returnValue:!0}:{numberOfItems:a,returnValue:!1}}return this.hasFailed?(this.subject.onError(this.error),this.controlledDisposable.dispose(),this.controlledDisposable=Yb):this.hasCompleted&&(this.subject.onCompleted(),this.controlledDisposable.dispose(),this.controlledDisposable=Yb),{numberOfItems:a,returnValue:!1}},request:function(a){this.disposeCurrentRequest();var b=this,c=this._processRequest(a),a=c.numberOfItems;return c.returnValue?Yb:(this.requestedCount=a,this.requestedDisposable=Xb(function(){b.requestedCount=0}),this.requestedDisposable)},disposeCurrentRequest:function(){this.requestedDisposable.dispose(),this.requestedDisposable=Yb}}),c}(xc);uc.controlled=function(a){return null==a&&(a=!0),new Qc(this,a)},uc.transduce=function(a){function b(a){return{init:function(){return a},step:function(a,b){return a.onNext(b)},result:function(a){return a.onCompleted()}}}var c=this;return new Sc(function(d){var e=a(b(d));return c.subscribe(function(a){try{e.step(d,a)}catch(b){d.onError(b)}},d.onError.bind(d),function(){e.result(d)})},c)};var Sc=V.AnonymousObservable=function(a){function b(a){return a&&"function"==typeof a.dispose?a:"function"==typeof a?Xb(a):Yb}function c(d,e){function f(a){var c=function(){try{e.setDisposable(b(d(e)))}catch(a){if(!e.fail(a))throw a}},e=new Tc(a);return ec.scheduleRequired()?ec.schedule(c):c(),e}return this.source=e,this instanceof c?void a.call(this,f):new c(d)}return Ob(c,a),c}(xc),Tc=function(a){function b(b){a.call(this),this.observer=b,this.m=new Zb}Ob(b,a);var c=b.prototype;return c.next=function(a){var b=!1;try{this.observer.onNext(a),b=!0}catch(c){throw c}finally{!b&&this.dispose()}},c.error=function(a){try{this.observer.onError(a)}catch(b){throw b}finally{this.dispose()}},c.completed=function(){try{this.observer.onCompleted()}catch(a){throw a}finally{this.dispose()}},c.setDisposable=function(a){this.m.setDisposable(a)},c.getDisposable=function(){return this.m.getDisposable()},c.dispose=function(){a.prototype.dispose.call(this),this.m.dispose()},b}(vc),Uc=function(a,b){this.subject=a,this.observer=b};Uc.prototype.dispose=function(){if(!this.subject.isDisposed&&null!==this.observer){var a=this.subject.observers.indexOf(this.observer);this.subject.observers.splice(a,1),this.observer=null}};var Vc=V.Subject=function(a){function c(a){return b.call(this),this.isStopped?this.exception?(a.onError(this.exception),Yb):(a.onCompleted(),Yb):(this.observers.push(a),new Uc(this,a))}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.observers=[]}return Ob(d,a),Pb(d.prototype,sc,{hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(b.call(this),!this.isStopped){var a=this.observers.slice(0);this.isStopped=!0;for(var c=0,d=a.length;d>c;c++)a[c].onCompleted();this.observers=[]}},onError:function(a){if(b.call(this),!this.isStopped){var c=this.observers.slice(0);this.isStopped=!0,this.exception=a;for(var d=0,e=c.length;e>d;d++)c[d].onError(a);this.observers=[]}},onNext:function(a){if(b.call(this),!this.isStopped)for(var c=this.observers.slice(0),d=0,e=c.length;e>d;d++)c[d].onNext(a)},dispose:function(){this.isDisposed=!0,this.observers=null}}),d.create=function(a,b){return new Xc(a,b)},d}(xc),Wc=V.AsyncSubject=function(a){function c(a){if(b.call(this),!this.isStopped)return this.observers.push(a),new Uc(this,a);var c=this.exception,d=this.hasValue,e=this.value;return c?a.onError(c):d?(a.onNext(e),a.onCompleted()):a.onCompleted(),Yb}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.value=null,this.hasValue=!1,this.observers=[],this.exception=null}return Ob(d,a),Pb(d.prototype,sc,{hasObservers:function(){return b.call(this),this.observers.length>0},onCompleted:function(){var a,c,d;if(b.call(this),!this.isStopped){this.isStopped=!0;var e=this.observers.slice(0),f=this.value,g=this.hasValue;if(g)for(c=0,d=e.length;d>c;c++)a=e[c],a.onNext(f),a.onCompleted();else for(c=0,d=e.length;d>c;c++)e[c].onCompleted();this.observers=[]}},onError:function(a){if(b.call(this),!this.isStopped){var c=this.observers.slice(0);this.isStopped=!0,this.exception=a;for(var d=0,e=c.length;e>d;d++)c[d].onError(a);this.observers=[]}},onNext:function(a){b.call(this),this.isStopped||(this.value=a,this.hasValue=!0)},dispose:function(){this.isDisposed=!0,this.observers=null,this.exception=null,this.value=null}}),d}(xc),Xc=V.AnonymousSubject=function(a){function b(b,c){this.observer=b,this.observable=c,a.call(this,this.observable.subscribe.bind(this.observable))}return Ob(b,a),Pb(b.prototype,sc,{onCompleted:function(){this.observer.onCompleted()},onError:function(a){this.observer.onError(a)},onNext:function(a){this.observer.onNext(a)}}),b}(xc),Yc=V.BehaviorSubject=function(a){function c(a){if(b.call(this),!this.isStopped)return this.observers.push(a),a.onNext(this.value),new Uc(this,a);var c=this.exception;return c?a.onError(c):a.onCompleted(),Yb}function d(b){a.call(this,c),this.value=b,this.observers=[],this.isDisposed=!1,this.isStopped=!1,this.exception=null}return Ob(d,a),Pb(d.prototype,sc,{hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(b.call(this),!this.isStopped){this.isStopped=!0;for(var a=0,c=this.observers.slice(0),d=c.length;d>a;a++)c[a].onCompleted();this.observers=[]}},onError:function(a){if(b.call(this),!this.isStopped){this.isStopped=!0,this.exception=a;for(var c=0,d=this.observers.slice(0),e=d.length;e>c;c++)d[c].onError(a);this.observers=[]}},onNext:function(a){if(b.call(this),!this.isStopped){this.value=a;for(var c=0,d=this.observers.slice(0),e=d.length;e>c;c++)d[c].onNext(a)}},dispose:function(){this.isDisposed=!0,this.observers=null,this.value=null,this.exception=null}}),d}(xc),Zc=V.ReplaySubject=function(a){function c(a,b){return Xb(function(){b.dispose(),!a.isDisposed&&a.observers.splice(a.observers.indexOf(b),1)})}function d(a){var d=new yc(this.scheduler,a),e=c(this,d);b.call(this),this._trim(this.scheduler.now()),this.observers.push(d);for(var f=0,g=this.q.length;g>f;f++)d.onNext(this.q[f].value);return this.hasError?d.onError(this.error):this.isStopped&&d.onCompleted(),d.ensureActive(),e}function e(b,c,e){this.bufferSize=null==b?Number.MAX_VALUE:b,this.windowSize=null==c?Number.MAX_VALUE:c,this.scheduler=e||ec,this.q=[],this.observers=[],this.isStopped=!1,this.isDisposed=!1,this.hasError=!1,this.error=null,a.call(this,d)}return Ob(e,a),Pb(e.prototype,sc,{hasObservers:function(){return this.observers.length>0},_trim:function(a){for(;this.q.length>this.bufferSize;)this.q.shift();for(;this.q.length>0&&a-this.q[0].interval>this.windowSize;)this.q.shift()},onNext:function(a){if(b.call(this),!this.isStopped){var c=this.scheduler.now();this.q.push({interval:c,value:a}),this._trim(c);for(var d=this.observers.slice(0),e=0,f=d.length;f>e;e++){var g=d[e];g.onNext(a),g.ensureActive()}}},onError:function(a){if(b.call(this),!this.isStopped){this.isStopped=!0,this.error=a,this.hasError=!0;var c=this.scheduler.now();this._trim(c);for(var d=this.observers.slice(0),e=0,f=d.length;f>e;e++){var g=d[e];g.onError(a),g.ensureActive()}this.observers=[]}},onCompleted:function(){if(b.call(this),!this.isStopped){this.isStopped=!0;var a=this.scheduler.now();this._trim(a);for(var c=this.observers.slice(0),d=0,e=c.length;e>d;d++){var f=c[d];f.onCompleted(),f.ensureActive()}this.observers=[]}},dispose:function(){this.isDisposed=!0,this.observers=null}}),e}(xc);"function"==typeof define&&"object"==typeof define.amd&&define.amd?(Q.Rx=V,define(function(){return V})):R&&S?T?(S.exports=V).Rx=V:R.Rx=V:Q.Rx=V;var $c=g()}).call(this);;/*!
 * Packery PACKAGED v1.3.2
 * bin-packing layout library
 * http://packery.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://packery.metafizzy.co/license.html
 *
 * Non-commercial use is licensed under the GPL v3 License
 *
 * Copyright 2015 Metafizzy
 */

(function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function o(e,i){t.fn[e]=function(o){if("string"==typeof o){for(var s=n.call(arguments,1),a=0,h=this.length;h>a;a++){var p=this[a],u=t.data(p,e);if(u)if(t.isFunction(u[o])&&"_"!==o.charAt(0)){var c=u[o].apply(u,s);if(void 0!==c)return c}else r("no such method '"+o+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+o+"'")}return this}return this.each(function(){var n=t.data(this,e);n?(n.option(o),n._init()):(n=new i(this,o),t.data(this,e,n))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),o(t,e)},t.bridget}}var n=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):"object"==typeof exports?i(require("jquery")):i(t.jQuery)})(window),function(t){function e(t){return RegExp("(^|\\s+)"+t+"(\\s+|$)")}function i(t,e){var i=n(t,e)?r:o;i(t,e)}var n,o,r;"classList"in document.documentElement?(n=function(t,e){return t.classList.contains(e)},o=function(t,e){t.classList.add(e)},r=function(t,e){t.classList.remove(e)}):(n=function(t,i){return e(i).test(t.className)},o=function(t,e){n(t,e)||(t.className=t.className+" "+e)},r=function(t,i){t.className=t.className.replace(e(i)," ")});var s={hasClass:n,addClass:o,removeClass:r,toggleClass:i,has:n,add:o,remove:r,toggle:i};"function"==typeof define&&define.amd?define("classie/classie",s):"object"==typeof exports?module.exports=s:t.classie=s}(window),function(t){function e(t){if(t){if("string"==typeof n[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,o=0,r=i.length;r>o;o++)if(e=i[o]+t,"string"==typeof n[e])return e}}var i="Webkit Moz ms Ms O".split(" "),n=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){}function n(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var n=s[e];t[n]=0}return t}function o(i){function o(){if(!d){d=!0;var n=t.getComputedStyle;if(p=function(){var t=n?function(t){return n(t,null)}:function(t){return t.currentStyle};return function(e){var i=t(e);return i||r("Style returned "+i+". Are you running this code in a hidden iframe on Firefox? "+"See http://bit.ly/getsizebug1"),i}}(),u=i("boxSizing")){var o=document.createElement("div");o.style.width="200px",o.style.padding="1px 2px 3px 4px",o.style.borderStyle="solid",o.style.borderWidth="1px 2px 3px 4px",o.style[u]="border-box";var s=document.body||document.documentElement;s.appendChild(o);var a=p(o);c=200===e(a.width),s.removeChild(o)}}}function a(t){if(o(),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var i=p(t);if("none"===i.display)return n();var r={};r.width=t.offsetWidth,r.height=t.offsetHeight;for(var a=r.isBorderBox=!(!u||!i[u]||"border-box"!==i[u]),d=0,f=s.length;f>d;d++){var l=s[d],y=i[l];y=h(t,y);var m=parseFloat(y);r[l]=isNaN(m)?0:m}var g=r.paddingLeft+r.paddingRight,v=r.paddingTop+r.paddingBottom,x=r.marginLeft+r.marginRight,b=r.marginTop+r.marginBottom,w=r.borderLeftWidth+r.borderRightWidth,_=r.borderTopWidth+r.borderBottomWidth,E=a&&c,L=e(i.width);L!==!1&&(r.width=L+(E?0:g+w));var R=e(i.height);return R!==!1&&(r.height=R+(E?0:v+_)),r.innerWidth=r.width-(g+w),r.innerHeight=r.height-(v+_),r.outerWidth=r.width+x,r.outerHeight=r.height+b,r}}function h(e,i){if(t.getComputedStyle||-1===i.indexOf("%"))return i;var n=e.style,o=n.left,r=e.runtimeStyle,s=r&&r.left;return s&&(r.left=e.currentStyle.left),n.left=i,i=n.pixelLeft,n.left=o,s&&(r.left=s),i}var p,u,c,d=!1;return a}var r="undefined"==typeof console?i:function(t){console.error(t)},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],o):"object"==typeof exports?module.exports=o(require("desandro-get-style-property")):t.getSize=o(t.getStyleProperty)}(window),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,n=function(){};i.addEventListener?n=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(n=function(t,i,n){t[i+n]=n.handleEvent?function(){var i=e(t);n.handleEvent.call(n,i)}:function(){var i=e(t);n.call(t,i)},t.attachEvent("on"+i,t[i+n])});var o=function(){};i.removeEventListener?o=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(o=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(n){t[e+i]=void 0}});var r={bind:n,unbind:o};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(window),function(t){function e(t){"function"==typeof t&&(e.isReady?t():s.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==r.readyState;e.isReady||i||n()}function n(){e.isReady=!0;for(var t=0,i=s.length;i>t;t++){var n=s[t];n()}}function o(o){return"complete"===r.readyState?n():(o.bind(r,"DOMContentLoaded",i),o.bind(r,"readystatechange",i),o.bind(t,"load",i)),e}var r=t.document,s=[];e.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],o):"object"==typeof exports?module.exports=o(require("eventie")):t.docReady=o(t.eventie)}(window),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var n=t.prototype,o=this,r=o.EventEmitter;n.getListeners=function(t){var e,i,n=this._getEvents();if(t instanceof RegExp){e={};for(i in n)n.hasOwnProperty(i)&&t.test(i)&&(e[i]=n[i])}else e=n[t]||(n[t]=[]);return e},n.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},n.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},n.addListener=function(t,i){var n,o=this.getListenersAsObject(t),r="object"==typeof i;for(n in o)o.hasOwnProperty(n)&&-1===e(o[n],i)&&o[n].push(r?i:{listener:i,once:!1});return this},n.on=i("addListener"),n.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},n.once=i("addOnceListener"),n.defineEvent=function(t){return this.getListeners(t),this},n.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},n.removeListener=function(t,i){var n,o,r=this.getListenersAsObject(t);for(o in r)r.hasOwnProperty(o)&&(n=e(r[o],i),-1!==n&&r[o].splice(n,1));return this},n.off=i("removeListener"),n.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},n.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},n.manipulateListeners=function(t,e,i){var n,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(n=i.length;n--;)r.call(this,e,i[n]);else for(n in e)e.hasOwnProperty(n)&&(o=e[n])&&("function"==typeof o?r.call(this,n,o):s.call(this,n,o));return this},n.removeEvent=function(t){var e,i=typeof t,n=this._getEvents();if("string"===i)delete n[t];else if(t instanceof RegExp)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];else delete this._events;return this},n.removeAllListeners=i("removeEvent"),n.emitEvent=function(t,e){var i,n,o,r,s=this.getListenersAsObject(t);for(o in s)if(s.hasOwnProperty(o))for(n=s[o].length;n--;)i=s[o][n],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},n.trigger=i("emitEvent"),n.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},n.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return o.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:o.EventEmitter=t}.call(this),function(t){function e(t,e){return t[s](e)}function i(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function n(t,e){i(t);for(var n=t.parentNode.querySelectorAll(e),o=0,r=n.length;r>o;o++)if(n[o]===t)return!0;return!1}function o(t,n){return i(t),e(t,n)}var r,s=function(){if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0,n=e.length;n>i;i++){var o=e[i],r=o+"MatchesSelector";if(t[r])return r}}();if(s){var a=document.createElement("div"),h=e(a,"div");r=h?e:o}else r=n;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return r}):"object"==typeof exports?module.exports=r:window.matchesSelector=r}(Element.prototype),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){for(var e in t)return!1;return e=null,!0}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function o(t,o,r){function a(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var h=r("transition"),p=r("transform"),u=h&&p,c=!!r("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[h],f=["transform","transition","transitionDuration","transitionProperty"],l=function(){for(var t={},e=0,i=f.length;i>e;e++){var n=f[e],o=r(n);o&&o!==n&&(t[n]=o)}return t}();e(a.prototype,t.prototype),a.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.getSize=function(){this.size=o(this.element)},a.prototype.css=function(t){var e=this.element.style;for(var i in t){var n=l[i]||i;e[n]=t[i]}},a.prototype.getPosition=function(){var t=s(this.element),e=this.layout.options,i=e.isOriginLeft,n=e.isOriginTop,o=parseInt(t[i?"left":"right"],10),r=parseInt(t[n?"top":"bottom"],10);o=isNaN(o)?0:o,r=isNaN(r)?0:r;var a=this.layout.size;o-=i?a.paddingLeft:a.paddingRight,r-=n?a.paddingTop:a.paddingBottom,this.position.x=o,this.position.y=r},a.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var y=c?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};a.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,h=e-n,p={},u=this.layout.options;a=u.isOriginLeft?a:-a,h=u.isOriginTop?h:-h,p.transform=y(a,h),this.transition({to:p,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},a.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},a.prototype.moveTo=u?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},a.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},a.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var m=p&&n(p)+",opacity";a.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:m,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(d,this,!1))},a.prototype.transition=a.prototype[h?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},a.prototype.onotransitionend=function(t){this.ontransitionend(t)};var g={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};a.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=g[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},a.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1},a.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var v={transitionProperty:"",transitionDuration:""};return a.prototype.removeTransitionStyles=function(){this.css(v)},a.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},a.prototype.remove=function(){if(!h||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()},a.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},a.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},a.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},a}var r=t.getComputedStyle,s=r?function(t){return r(t,null)}:function(t){return t.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],o):"object"==typeof exports?module.exports=o(require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property")):(t.Outlayer={},t.Outlayer.Item=o(t.EventEmitter,t.getSize,t.getStyleProperty))}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===c.call(t)}function n(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var n=0,o=t.length;o>n;n++)e.push(t[n]);else e.push(t);return e}function o(t,e){var i=f(e,t);-1!==i&&e.splice(i,1)}function r(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function s(i,s,c,f,l,y){function m(t,i){if("string"==typeof t&&(t=a.querySelector(t)),!t||!d(t))return h&&h.error("Bad "+this.constructor.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.constructor.defaults),this.option(i);var n=++g;this.element.outlayerGUID=n,v[n]=this,this._create(),this.options.isInitLayout&&this.layout()}var g=0,v={};return m.namespace="outlayer",m.Item=y,m.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(m.prototype,c.prototype),m.prototype.option=function(t){e(this.options,t)},m.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},m.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},m.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0,r=e.length;r>o;o++){var s=e[o],a=new i(s,this);n.push(a)}return n},m.prototype._filterFindItemElements=function(t){t=n(t);for(var e=this.options.itemSelector,i=[],o=0,r=t.length;r>o;o++){var s=t[o];if(d(s))if(e){l(s,e)&&i.push(s);for(var a=s.querySelectorAll(e),h=0,p=a.length;p>h;h++)i.push(a[h])}else i.push(s)}return i},m.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},m.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},m.prototype._init=m.prototype.layout,m.prototype._resetLayout=function(){this.getSize()},m.prototype.getSize=function(){this.size=f(this.element)},m.prototype._getMeasurement=function(t,e){var i,n=this.options[t];n?("string"==typeof n?i=this.element.querySelector(n):d(n)&&(i=n),this[t]=i?f(i)[e]:n):this[t]=0},m.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},m.prototype._getItemsForLayout=function(t){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i];o.isIgnored||e.push(o)}return e},m.prototype._layoutItems=function(t,e){function i(){n.emitEvent("layoutComplete",[n,t])}var n=this;if(!t||!t.length)return i(),void 0;this._itemsOn(t,"layout",i);for(var o=[],r=0,s=t.length;s>r;r++){var a=t[r],h=this._getItemLayoutPosition(a);h.item=a,h.isInstant=e||a.isLayoutInstant,o.push(h)}this._processLayoutQueue(o)},m.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},m.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];this._positionItem(n.item,n.x,n.y,n.isInstant)}},m.prototype._positionItem=function(t,e,i,n){n?t.goTo(e,i):t.moveTo(e,i)},m.prototype._postLayout=function(){this.resizeContainer()},m.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},m.prototype._getContainerSize=u,m.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},m.prototype._itemsOn=function(t,e,i){function n(){return o++,o===r&&i.call(s),!0}for(var o=0,r=t.length,s=this,a=0,h=t.length;h>a;a++){var p=t[a];p.on(e,n)}},m.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},m.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},m.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var n=t[e];this.ignore(n)}}},m.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var n=t[e];o(n,this.stamps),this.unignore(n)}},m.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n(t)):void 0},m.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},m.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},m.prototype._manageStamp=u,m.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,n=f(t),o={left:e.left-i.left-n.marginLeft,top:e.top-i.top-n.marginTop,right:i.right-e.right-n.marginRight,bottom:i.bottom-e.bottom-n.marginBottom};return o},m.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},m.prototype.bindResize=function(){this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)},m.prototype.unbindResize=function(){this.isResizeBound&&i.unbind(t,"resize",this),this.isResizeBound=!1},m.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},m.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},m.prototype.needsResizeLayout=function(){var t=f(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},m.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},m.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},m.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},m.prototype.reveal=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var n=t[i];n.reveal()}},m.prototype.hide=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var n=t[i];n.hide()}},m.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];if(n.element===t)return n}},m.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i],r=this.getItem(o);r&&e.push(r)}return e}},m.prototype.remove=function(t){t=n(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,r=e.length;r>i;i++){var s=e[i];s.remove(),o(s,this.items)}}},m.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];n.destroy()}this.unbindResize();var o=this.element.outlayerGUID;delete v[o],delete this.element.outlayerGUID,p&&p.removeData(this.element,this.constructor.namespace)},m.data=function(t){var e=t&&t.outlayerGUID;return e&&v[e]},m.create=function(t,i){function n(){m.apply(this,arguments)}return Object.create?n.prototype=Object.create(m.prototype):e(n.prototype,m.prototype),n.prototype.constructor=n,n.defaults=e({},m.defaults),e(n.defaults,i),n.prototype.settings={},n.namespace=t,n.data=m.data,n.Item=function(){y.apply(this,arguments)},n.Item.prototype=new y,s(function(){for(var e=r(t),i=a.querySelectorAll(".js-"+e),o="data-"+e+"-options",s=0,u=i.length;u>s;s++){var c,d=i[s],f=d.getAttribute(o);try{c=f&&JSON.parse(f)}catch(l){h&&h.error("Error parsing "+o+" on "+d.nodeName.toLowerCase()+(d.id?"#"+d.id:"")+": "+l);continue}var y=new n(d,c);p&&p.data(d,t,y)}}),p&&p.bridget&&p.bridget(t,n),n},m.Item=y,m}var a=t.document,h=t.console,p=t.jQuery,u=function(){},c=Object.prototype.toString,d="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},f=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):"object"==typeof exports?module.exports=s(require("eventie"),require("doc-ready"),require("wolfy87-eventemitter"),require("get-size"),require("desandro-matches-selector"),require("./item")):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window),function(t){function e(){function t(e){for(var i in t.defaults)this[i]=t.defaults[i];for(i in e)this[i]=e[i]}return i.Rect=t,t.defaults={x:0,y:0,width:0,height:0},t.prototype.contains=function(t){var e=t.width||0,i=t.height||0;return this.x<=t.x&&this.y<=t.y&&this.x+this.width>=t.x+e&&this.y+this.height>=t.y+i},t.prototype.overlaps=function(t){var e=this.x+this.width,i=this.y+this.height,n=t.x+t.width,o=t.y+t.height;return n>this.x&&e>t.x&&o>this.y&&i>t.y},t.prototype.getMaximalFreeRects=function(e){if(!this.overlaps(e))return!1;var i,n=[],o=this.x+this.width,r=this.y+this.height,s=e.x+e.width,a=e.y+e.height;return this.y<e.y&&(i=new t({x:this.x,y:this.y,width:this.width,height:e.y-this.y}),n.push(i)),o>s&&(i=new t({x:s,y:this.y,width:o-s,height:this.height}),n.push(i)),r>a&&(i=new t({x:this.x,y:a,width:this.width,height:r-a}),n.push(i)),this.x<e.x&&(i=new t({x:this.x,y:this.y,width:e.x-this.x,height:this.height}),n.push(i)),n},t.prototype.canFit=function(t){return this.width>=t.width&&this.height>=t.height},t}var i=t.Packery=function(){};"function"==typeof define&&define.amd?define("packery/js/rect",e):"object"==typeof exports?module.exports=e():(t.Packery=t.Packery||{},t.Packery.Rect=e())}(window),function(t){function e(t){function e(t,e,i){this.width=t||0,this.height=e||0,this.sortDirection=i||"downwardLeftToRight",this.reset()}e.prototype.reset=function(){this.spaces=[],this.newSpaces=[];var e=new t({x:0,y:0,width:this.width,height:this.height});this.spaces.push(e),this.sorter=i[this.sortDirection]||i.downwardLeftToRight},e.prototype.pack=function(t){for(var e=0,i=this.spaces.length;i>e;e++){var n=this.spaces[e];if(n.canFit(t)){this.placeInSpace(t,n);break}}},e.prototype.placeInSpace=function(t,e){t.x=e.x,t.y=e.y,this.placed(t)},e.prototype.placed=function(t){for(var e=[],i=0,n=this.spaces.length;n>i;i++){var o=this.spaces[i],r=o.getMaximalFreeRects(t);r?e.push.apply(e,r):e.push(o)}this.spaces=e,this.mergeSortSpaces()},e.prototype.mergeSortSpaces=function(){e.mergeRects(this.spaces),this.spaces.sort(this.sorter)},e.prototype.addSpace=function(t){this.spaces.push(t),this.mergeSortSpaces()},e.mergeRects=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];if(n){var o=t.slice(0);o.splice(e,1);for(var r=0,s=0,a=o.length;a>s;s++){var h=o[s],p=e>s?0:1;n.contains(h)&&(t.splice(s+p-r,1),r++)}}}return t};var i={downwardLeftToRight:function(t,e){return t.y-e.y||t.x-e.x},rightwardTopToBottom:function(t,e){return t.x-e.x||t.y-e.y}};return e}if("function"==typeof define&&define.amd)define("packery/js/packer",["./rect"],e);else if("object"==typeof exports)module.exports=e(require("./rect"));else{var i=t.Packery=t.Packery||{};i.Packer=e(i.Rect)}}(window),function(t){function e(t,e,i){var n=t("transform"),o=function(){e.Item.apply(this,arguments)};o.prototype=new e.Item;var r=o.prototype._create;return o.prototype._create=function(){r.call(this),this.rect=new i,this.placeRect=new i},o.prototype.dragStart=function(){this.getPosition(),this.removeTransitionStyles(),this.isTransitioning&&n&&(this.element.style[n]="none"),this.getSize(),this.isPlacing=!0,this.needsPositioning=!1,this.positionPlaceRect(this.position.x,this.position.y),this.isTransitioning=!1,this.didDrag=!1},o.prototype.dragMove=function(t,e){this.didDrag=!0;var i=this.layout.size;t-=i.paddingLeft,e-=i.paddingTop,this.positionPlaceRect(t,e)},o.prototype.dragStop=function(){this.getPosition();var t=this.position.x!==this.placeRect.x,e=this.position.y!==this.placeRect.y;this.needsPositioning=t||e,this.didDrag=!1},o.prototype.positionPlaceRect=function(t,e,i){this.placeRect.x=this.getPlaceRectCoord(t,!0),this.placeRect.y=this.getPlaceRectCoord(e,!1,i)},o.prototype.getPlaceRectCoord=function(t,e,i){var n=e?"Width":"Height",o=this.size["outer"+n],r=this.layout[e?"columnWidth":"rowHeight"],s=this.layout.size["inner"+n];e||(s=Math.max(s,this.layout.maxY),this.layout.rowHeight||(s-=this.layout.gutter));var a;if(r){r+=this.layout.gutter,s+=e?this.layout.gutter:0,t=Math.round(t/r);var h;h=this.layout.options.isHorizontal?e?"ceil":"floor":e?"floor":"ceil";var p=Math[h](s/r);p-=Math.ceil(o/r),a=p}else a=s-o;return t=i?t:Math.min(t,a),t*=r||1,Math.max(0,t)},o.prototype.copyPlaceRectPosition=function(){this.rect.x=this.placeRect.x,this.rect.y=this.placeRect.y},o.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.layout.packer.addSpace(this.rect),this.emitEvent("remove",[this])},o}"function"==typeof define&&define.amd?define("packery/js/item",["get-style-property/get-style-property","outlayer/outlayer","./rect"],e):"object"==typeof exports?module.exports=e(require("desandro-get-style-property"),require("outlayer"),require("./rect")):t.Packery.Item=e(t.getStyleProperty,t.Outlayer,t.Packery.Rect)}(window),function(t){function e(t,e,i,n,o,r){function s(t,e){return t.position.y-e.position.y||t.position.x-e.position.x}function a(t,e){return t.position.x-e.position.x||t.position.y-e.position.y}n.prototype.canFit=function(t){return this.width>=t.width-1&&this.height>=t.height-1};var h=i.create("packery");return h.Item=r,h.prototype._create=function(){i.prototype._create.call(this),this.packer=new o,this.stamp(this.options.stamped);var t=this;this.handleDraggabilly={dragStart:function(e){t.itemDragStart(e.element)},dragMove:function(e){t.itemDragMove(e.element,e.position.x,e.position.y)},dragEnd:function(e){t.itemDragEnd(e.element)}},this.handleUIDraggable={start:function(e){t.itemDragStart(e.currentTarget)},drag:function(e,i){t.itemDragMove(e.currentTarget,i.position.left,i.position.top)},stop:function(e){t.itemDragEnd(e.currentTarget)}}},h.prototype._resetLayout=function(){this.getSize(),this._getMeasurements();var t=this.packer;this.options.isHorizontal?(t.width=Number.POSITIVE_INFINITY,t.height=this.size.innerHeight+this.gutter,t.sortDirection="rightwardTopToBottom"):(t.width=this.size.innerWidth+this.gutter,t.height=Number.POSITIVE_INFINITY,t.sortDirection="downwardLeftToRight"),t.reset(),this.maxY=0,this.maxX=0},h.prototype._getMeasurements=function(){this._getMeasurement("columnWidth","width"),this._getMeasurement("rowHeight","height"),this._getMeasurement("gutter","width")},h.prototype._getItemLayoutPosition=function(t){return this._packItem(t),t.rect},h.prototype._packItem=function(t){this._setRectSize(t.element,t.rect),this.packer.pack(t.rect),this._setMaxXY(t.rect)},h.prototype._setMaxXY=function(t){this.maxX=Math.max(t.x+t.width,this.maxX),this.maxY=Math.max(t.y+t.height,this.maxY)},h.prototype._setRectSize=function(t,i){var n=e(t),o=n.outerWidth,r=n.outerHeight;(o||r)&&(o=this._applyGridGutter(o,this.columnWidth),r=this._applyGridGutter(r,this.rowHeight)),i.width=Math.min(o,this.packer.width),i.height=Math.min(r,this.packer.height)},h.prototype._applyGridGutter=function(t,e){if(!e)return t+this.gutter;e+=this.gutter;var i=t%e,n=i&&1>i?"round":"ceil";return t=Math[n](t/e)*e},h.prototype._getContainerSize=function(){return this.options.isHorizontal?{width:this.maxX-this.gutter}:{height:this.maxY-this.gutter}},h.prototype._manageStamp=function(t){var e,i=this.getItem(t);if(i&&i.isPlacing)e=i.placeRect;else{var o=this._getElementOffset(t);e=new n({x:this.options.isOriginLeft?o.left:o.right,y:this.options.isOriginTop?o.top:o.bottom})}this._setRectSize(t,e),this.packer.placed(e),this._setMaxXY(e)},h.prototype.sortItemsByPosition=function(){var t=this.options.isHorizontal?a:s;this.items.sort(t)},h.prototype.fit=function(t,e,i){var n=this.getItem(t);n&&(this._getMeasurements(),this.stamp(n.element),n.getSize(),n.isPlacing=!0,e=void 0===e?n.rect.x:e,i=void 0===i?n.rect.y:i,n.positionPlaceRect(e,i,!0),this._bindFitEvents(n),n.moveTo(n.placeRect.x,n.placeRect.y),this.layout(),this.unstamp(n.element),this.sortItemsByPosition(),n.isPlacing=!1,n.copyPlaceRectPosition())},h.prototype._bindFitEvents=function(t){function e(){n++,2===n&&i.emitEvent("fitComplete",[i,t])
}var i=this,n=0;t.on("layout",function(){return e(),!0}),this.on("layoutComplete",function(){return e(),!0})},h.prototype.resize=function(){var t=e(this.element),i=this.size&&t,n=this.options.isHorizontal?"innerHeight":"innerWidth";i&&t[n]===this.size[n]||this.layout()},h.prototype.itemDragStart=function(t){this.stamp(t);var e=this.getItem(t);e&&e.dragStart()},h.prototype.itemDragMove=function(t,e,i){function n(){r.layout(),delete r.dragTimeout}var o=this.getItem(t);o&&o.dragMove(e,i);var r=this;this.clearDragTimeout(),this.dragTimeout=setTimeout(n,40)},h.prototype.clearDragTimeout=function(){this.dragTimeout&&clearTimeout(this.dragTimeout)},h.prototype.itemDragEnd=function(e){var i,n=this.getItem(e);if(n&&(i=n.didDrag,n.dragStop()),!n||!i&&!n.needsPositioning)return this.unstamp(e),void 0;t.add(n.element,"is-positioning-post-drag");var o=this._getDragEndLayoutComplete(e,n);n.needsPositioning?(n.on("layout",o),n.moveTo(n.placeRect.x,n.placeRect.y)):n&&n.copyPlaceRectPosition(),this.clearDragTimeout(),this.on("layoutComplete",o),this.layout()},h.prototype._getDragEndLayoutComplete=function(e,i){var n=i&&i.needsPositioning,o=0,r=n?2:1,s=this;return function(){return o++,o!==r?!0:(i&&(t.remove(i.element,"is-positioning-post-drag"),i.isPlacing=!1,i.copyPlaceRectPosition()),s.unstamp(e),s.sortItemsByPosition(),n&&s.emitEvent("dragItemPositioned",[s,i]),!0)}},h.prototype.bindDraggabillyEvents=function(t){t.on("dragStart",this.handleDraggabilly.dragStart),t.on("dragMove",this.handleDraggabilly.dragMove),t.on("dragEnd",this.handleDraggabilly.dragEnd)},h.prototype.bindUIDraggableEvents=function(t){t.on("dragstart",this.handleUIDraggable.start).on("drag",this.handleUIDraggable.drag).on("dragstop",this.handleUIDraggable.stop)},h.Rect=n,h.Packer=o,h}"function"==typeof define&&define.amd?define(["classie/classie","get-size/get-size","outlayer/outlayer","packery/js/rect","packery/js/packer","packery/js/item"],e):"object"==typeof exports?module.exports=e(require("desandro-classie"),require("get-size"),require("outlayer"),require("./rect"),require("./packer"),require("./item")):t.Packery=e(t.classie,t.getSize,t.Outlayer,t.Packery.Rect,t.Packery.Packer,t.Packery.Item)}(window);;String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, "");};
String.prototype.stripHTMLTags = function() {return this.replace(/<[^>]+>/gi,"");};
String.prototype.ellipses = function(len) {return (this.length > len) ? this.substr(0, len) + "..." : this; };

/**
 * Reference: http://jhusain.github.io/learnrx/index.html
 *
 * @return Array
 */
Array.prototype.mergeAll = function() {
  var results = [];

  this.forEach(function(subArr) {
    subArr.forEach(function(elm) {
      results.push(elm);
    });
  });

  return results;
};

// debouncing function from John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
var debounce = function (func, threshold, execAsap) {
  var timeout;

  return function debounced() {
    var obj = this, args = arguments;

    function delayed() {
      if (!execAsap) {
        func.apply(obj, args);
      }
      timeout = null;
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    else if (execAsap){
      func.apply(obj, args);
    }

    timeout = setTimeout(delayed, threshold || 100);
  };
};;// Simple debugger, Matt Perkins
var DEBUGGER = (function() {
  var _messages = [],
    _broadcast = true;

  function log(text, source) {
    _messages.push({
      time: $.now(),
      source: source,
      text: text
    });

    if(_broadcast) {
      console.log(createLogOutputString(_messages[_messages.length-1]));
    }
  }

  function createLogOutputString(entry) {
    return '> '+entry.text;
  }

  return {
    log: log
  };

}());;var ObjectUtils = {
  describeObject: function (obj) {
    $.each(obj, function (index, value) {
      DEBUGGER.log('DESCRIBE: '+index + ': ' + value);
    });
  },

  dynamicSort: function (property) {
    return function (a, b) {
      return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    };
  },

  searchObjects: function(obj, key, val) {
    var objects = [];
    for (var i in obj) {
      if (typeof obj[i] === 'object') {
        objects = objects.concat(searchObjects(obj[i], key, val));
      } else if (i === key && obj[key] === val) {
        objects.push(obj);
      }
    }
    return objects;
  },

  getObjectIndexFromId: function (obj, id) {
    if (typeof obj === "object") {
      for (var i = 0; i < obj.length; i++) {
        if (typeof obj[i] !== "undefined" && typeof obj[i].id !== "undefined" && obj[i].id === id) {
          return i;
        }
      }
    }
    return false;
  },

  // From flightjs
  // returns new object representing multiple objects merged together
  // optional final argument is boolean which specifies if merge is recursive
  // original objects are unmodified
  //
  // usage:
  //   var base = {a:2, b:6};
  //   var extra = {b:3, c:4};
  //   merge(base, extra); //{a:2, b:3, c:4}
  //   base; //{a:2, b:6}
  //
  //   var base = {a:2, b:6};
  //   var extra = {b:3, c:4};
  //   var extraExtra = {a:4, d:9};
  //   merge(base, extra, extraExtra); //{a:4, b:3, c:4. d: 9}
  //   base; //{a:2, b:6}
  //
  //   var base = {a:2, b:{bb:4, cc:5}};
  //   var extra = {a:4, b:{cc:7, dd:1}};
  //   merge(base, extra, true); //{a:4, b:{bb:4, cc:7, dd:1}}
  //   base; //{a:2, b:6}

  merge: function(/*obj1, obj2,....deepCopy*/) {
    // unpacking arguments by hand benchmarked faster
    var l = arguments.length,
      args = new Array(l + 1);

    if (l === 0) {
      return {};
    }

    for (var i = 0; i < l; i++) {
      args[i + 1] = arguments[i];
    }

    //start with empty object so a copy is created
    args[0] = {};

    if (args[args.length - 1] === true) {
      //jquery extend requires deep copy as first arg
      args.pop();
      args.unshift(true);
    }

    return $.extend.apply(undefined, args);
  },

  // Simplified implementation of Stamps - http://ericleads.com/2014/02/prototypal-inheritance-with-stamps/
  // https://www.barkweb.co.uk/blog/object-composition-and-prototypical-inheritance-in-javascript
  basicFactory: function(prototype) {
    var proto = prototype,
      obj = Object.create(proto.methods);

    proto.closures.forEach(function(closure) {
      closure.call(obj);
    });

    for(var key in proto.state) {
      obj[key] = proto.state[key];
    }

    return obj;

  }

};;

var ArrayUtils = {

  // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
  unique: function(arry) {
    var o = {},
        i,
        l = arry.length,
        r = [];
    for(i=0; i<l;i+=1) {
      o[arry[i]] = arry[i];
    }
    for(i in o) {
      r.push(o[i]);
    }
    return r;
  },

  removeIndex: function(arr, idx) {
    return arr.splice(idx,1);
  },

  removeItem: function(arr, item) {
    var idx = arr.indexOf(item);
    if(idx > -1) {
      arr.splice(idx, 1);
    }
  },

  rndElement: function(arry) {
    return arry[NumberUtils.rndNumber(0,arry.length-1)];
  },

  getRandomSetOfElements: function(srcarry, max) {
    var arry = [],
      i = 0,
      len = NumberUtils.rndNumber(1,max);

    for(;i<len;i++) {
      arry.push(ArrayUtils.rndElement(srcarry));
    }

    return arry;
  },

  getDifferences: function(arr1, arr2) {
    var dif = [];

    arr1.forEach(function(value) {
      var present = false,
        i = 0,
        len = arr2.length;

      for(; i<len; i++) {
        if(value === arr2[i]) {
          present = true;
          break;
        }
      }

      if(!present) {
        dif.push(value);
      }

    });

    return dif;
  }

};;// some from http://youmightnotneedjquery.com/
var DOMUtils = {

  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  // element must be entirely on screen
  isElementEntirelyInViewport: function (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  },

  // element may be partialy on screen
  isElementInViewport: function (el) {
    var rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth)  &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight);
  },

  isDomObj: function(obj) {
    return !!(obj.nodeType || (obj === window));
  },

  elementHasClass: function(el, className) {
    //var re = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
    //return re.test(el.className);
    if (el.classList) {
      el.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  },

  addClassToElement: function(className, el) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  },

  removeClassFromElement: function(className, el) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  },

  toggleClassOnElement: function(className, el) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
      }

      el.className = classes.join(' ');
    }
  }
};;var NumberUtils = {

  isInteger: function(str) {
    return (/^-?\d+$/.test(str));
  },

  rndNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

};;var StringUtils = {

  capitalizeFirstLetter: function(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  },

  removeTags: function(str) {
     return str.replace(/(<([^>]+)>)/ig, '');
  }

};;var LOREM = (function(){
  var _currentText = [],
      _textSets = [],
      _maleFirstNames = [],
      _femaleFirstNames = [],
      _lastNames = [],
      _punctuation = [],
      _months,
      _days;

  _textSets = [
    "Lorem ipsum dolor sit amet consectetur adipiscing elit Donec libero urna vehicula in odio quis pharetra pharetra magna Quisque pharetra elit in eros volutpat fringilla Nunc vitae nunc mattis rhoncus augue sit amet tempus magna Suspendisse interdum urna eu consectetur vestibulum lorem ligula scelerisque tortor a tincidunt eros odio et lectus Fusce a quam erat Aliquam quis libero sed orci porta congue Mauris ultricies porttitor sem at lacinia Morbi mattis urna ac sapien vehicula interdum Pellentesque commodo nisi id lacus laoreet maximus Ut eget posuere leo sit amet molestie augue Nullam volutpat nulla sit amet convallis tempus tellus lorem fermentum quam eget vestibulum orci est id ex Sed fermentum justo et augue pulvinar vehicula Nullam malesuada justo euismod molestie justo ut finibus quam Nullam pharetra erat nec hendrerit volutpat",
    "Perhaps a re-engineering of your current world view will re-energize your online nomenclature to enable a new holistic interactive enterprise internet communication solution Upscaling the resurgent networking exchange solutions, achieving a breakaway systemic electronic data interchange system synchronization, thereby exploiting technical environments for mission critical broad based capacity constrained systems Fundamentally transforming well designed actionable information whose semantic content is virtually null To more fully clarify the current exchange, a few aggregate issues will require addressing to facilitate this distributed communication venue In integrating non-aligned structures into existing legacy systems, a holistic gateway blueprint is a backward compatible packaging tangible of immeasurable strategic value in right-sizing conceptual frameworks when thinking outside the box This being said, the ownership issues inherent in dominant thematic implementations cannot be understated vis-a vis document distribution on a real operating system consisting primarily of elements regarded as outdated and therefore impelling as a integrated out sourcing avenue to facilitate multi-level name value pairing in static components In order to properly merge and articulate these core assets, an acquisition statement outlining the information architecture, leading to a ratcheting up of convergence across the organic platform is an opportunity without precedent in current applicability transactional modeling Implementing these goals requires a careful examination to encompass an increasing complex out sourcing disbursement to ensure the extant parameters are not exceeded while focusing on infrastructure cohesion Dynamic demand forecasting indicates that a mainstream approach may establish a basis for leading-edge information processing to insure the diversity of granularity in encompassing expansion of content provided within the multimedia framework under examination Empowerment in information design literacy demands the immediate and complete disregard of the entire contents of this cyberspace communication"

  ];

  _lastNames = 'Smith Johnson Williams Jones Brown Davis Miller Wilson Moore Taylor Anderson Thomas Jackson White Harris Martin Thompson Garcia Martinez Robinson Clark Rodriguez Lewis Lee Walker Hall Allen Young Hernandez King Wright Lopez Hill Scott Green Adams Baker Gonzalez Nelson Carter Mitchell Perez Roberts Turner Phillips Campbell Parker Evans Edwards Collins Stewart Sanchez Morris Rogers Reed Cook Morgan Bell Murphy Bailey Rivera Cooper Richardson Cox Howard Ward Torres Peterson Gray Ramirez James Watson Brooks Kelly Sanders Price Bennett Wood Barnes Ross Henderson Coleman Jenkins Perry Powell Long Patterson Hughes Flores Washington Butler Simmons Foster Gonzales Bryant Alexander Russell Griffin Diaz Hayes'.split(' ');

  _maleFirstNames = 'Thomas Arthur Lewis Clarence Leonard Albert Paul Carl Ralph Roy Earl Samuel Howard Richard Francis Laurence Herbert Elmer Ernest Theodore David Alfred Donald Russell Eugene Andrew Kenneth Herman Jesse Lester Floyd Michael Edwin Clifford Benjamin Clyde Glen Oscar Daniel'.split(' ');

  _femaleFirstNames = 'Elizabeth Ann Helen Margaret Ellen Catherine Lily Florence Ada Lou Ethel Emily Ruth Rose Frances Alice Bertha Clara Mabel Minnie Grace Jane Evelyn Gertrude Edna Pearl Laura Hazel Edith Esther Harriet Sarah May Matilda Martha Myrtle Josephin Maud Agnes Keri Julia Irene Mildred Cora'.split(' ');

  _punctuation = ['.','.','.','.','?','!'];

  _months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  _days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

  function init() {
    if(_currentText.length) {
      return;
    }
    setCurrentTextSet(1);
  }

  function setCurrentTextSet(index) {
    var _current = _textSets[index].toLowerCase();
    _currentText= _current.split(' ');
  }

  function getSentence(min,max) {
    var sentence = getText(min, max);
    return StringUtils.capitalizeFirstLetter(sentence) + getRandomItem(_punctuation);
  }

  function getParagraph(min, max) {
    var str = "",
      delim = " ",
      len = NumberUtils.rndNumber(min, max),
      i= 0;

    for(; i<len; i++) {
      if(i === len-1) {
        delim = "";
      }
      str += getSentence(1,10) + delim;
    }

    return str;
  }

  function getText(min, max) {
    init();

    var str = "",
        delim = " ",
        len = NumberUtils.rndNumber(min, max),
        i= 0;

    for(; i<len; i++) {
      if(i === len-1) {
        delim = "";
      }
      str += getRandomItem(_currentText) + delim;
    }

    return str;
  }

  function getRandomItem(arry) {
    var min = 0;
    var max = arry.length-1;
    return arry[NumberUtils.rndNumber(min, max)];
  }

  function getFirstName() {
    return NumberUtils.rndNumber(0,1) ? getRandomItem(_maleFirstNames) : getRandomItem(_femaleFirstNames);
  }

  function getLastName() {
    return getRandomItem(_lastNames);
  }

  function getFLName() {
    return getFirstName() + " " + getLastName();
  }

  function getLFName() {
    return getLastName() + ", " + getFirstName();
  }

  function getDate() {
    var month = NumberUtils.rndNumber(0,11),
        wkday = NumberUtils.rndNumber(0,4);

    return {
      monthNumber: month + 1,
      monthName: _months[month],
      monthDay: NumberUtils.rndNumber(1,28),
      weekDayNumber: wkday + 1,
      weekDay: _days[wkday],
      year: ArrayUtils.rndElement(['2010','2011','2012','2013','2014'])
    };
  }

  return {
    getText: getText,
    getSentence: getSentence,
    getParagraph: getParagraph,
    getFLName: getFLName,
    getLFName: getLFName,
    getDate: getDate
  };

}());;var TouchUtils = {

  // https://github.com/filamentgroup/tappy/blob/master/tappy.js
  getCoords: function( evt ){
    var ev = evt.originalEvent || evt,
        touches = ev.touches || ev.targetTouches;

    if( touches ){
      return [ touches[ 0 ].pageX, touches[ 0 ].pageY ];
    }
    else {
      return null;
    }
  }

};;var APP = APP || {};

APP = (function(global, rootView) {
  var _globalScope = global,
      _rootView = rootView,
      _self,
      _globals;

  //----------------------------------------------------------------------------
  //  Initialize
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;

    initGlobals();

    this.AppController.initialize(this, _globalScope, _rootView);
  }

  /**
   * Initialize the global vars
   */
  function initGlobals() {
    _globals = {};

    _globals.appConfig = APP_CONFIG_DATA;

    // TODO Move to new browser detect util
    _globals.isIE = -1 < navigator.userAgent.indexOf("MSIE ");
    _globals.appVersion = navigator.appVersion;
    _globals.userAgent = navigator.userAgent;
    _globals.isIE6 = _globals.isIE && -1 < _globals.appVersion.indexOf("MSIE 6");
    _globals.isIE7 = _globals.isIE && -1 < _globals.appVersion.indexOf("MSIE 7");
    _globals.isIE8 = _globals.isIE && -1 < _globals.appVersion.indexOf("MSIE 8");
    _globals.isIE9 = _globals.isIE && -1 < _globals.appVersion.indexOf("MSIE 9");
    _globals.isFF = -1 < navigator.userAgent.indexOf("Firefox/");
    _globals.isChrome = -1 < navigator.userAgent.indexOf("Chrome/");
    _globals.isMac = -1 < navigator.userAgent.indexOf("Macintosh;");
    _globals.isMacSafari = -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome");

    _globals.notSupported = _globals.isIE6 || _globals.isIE7 || _globals.isIE8;

    _globals.hasTouch = 'ontouchstart' in document.documentElement;
    _globals.mobile = {
      Android: function() {
        return _globals.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return _globals.userAgent.match(/BlackBerry/i) || _globals.userAgent.match(/BB10; Touch/);
      },
      iOS: function() {
        return _globals.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return _globals.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return _globals.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (
          _globals.mobile.Android()
          || _globals.mobile.BlackBerry()
          || _globals.mobile.iOS()
          || _globals.mobile.Opera()
          || _globals.mobile.Windows()
          || _globals.hasTouch
        );
      }
    };

    _globals.mouseDownEvtStr = _globals.mobile.any() ? "touchstart" : "mousedown";
    _globals.mouseUpEvtStr = _globals.mobile.any() ? "touchend" : "mouseup";
    _globals.mouseClickEvtStr = _globals.mobile.any() ? "touchend" : "click";
    _globals.mouseMoveEvtStr = _globals.mobile.any() ? "touchmove" : "mousemove";

  }

  /**
   * Return a copy of the globals
   * @returns {void|*}
   */
  function globals() {
    return $.extend({}, _globals);
  }

  //----------------------------------------------------------------------------
  //  Run
  //----------------------------------------------------------------------------

  function run() {
    _self.AppController.run();
  }

  //http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
  function createNameSpace(ns_string) {
    var parts = ns_string.split('.'),
      parent = APP,
      parentStr = "APP",
      len;

    if(parts[0] === parentStr) {
      parts = parts.slice(1);
    }

    len = parts.length;

    for(var i=0 ;i<len; i++) {
      var moduleName = parts[i];
      if(typeof parent[moduleName] === 'undefined') {
        parent[moduleName] = {};
      }
      parent = parent[moduleName];
    }

    return parent;
  }

  return {
    initialize: initialize,
    run: run,
    createNameSpace: createNameSpace,
    globals: globals
  };

}(this, document));;APP.createNameSpace('APP.Events');
APP.Events = {

  CONTROLLER_INITIALIZED: 'CONTROLLER_INITIALIZED',
  URL_HASH_CHANGED: 'URL_HASH_CHANGED',

  MODEL_INITIALIZED: 'MODEL_INITIALIZED',
  MODEL_DATA_LOADED: 'MODEL_DATA_LOADED',

  RESUME_FROM_MODEL_STATE: 'RESUME_FROM_MODEL_STATE',

  VIEW_INITIALIZED: 'VIEW_INITIALIZED',
  VIEW_RENDERED: 'VIEW_RENDERED',
  VIEW_CHANGED: 'VIEW_CHANGED',
  VIEW_ALL_FILTERS_CLEARED: 'VIEW_ALL_FILTERS_CLEARED',

  MODAL_COVER_SHOW: 'MODAL_COVER_SHOW',
  MODAL_COVER_HIDE: 'MODAL_COVER_HIDE',

  BROWSER_RESIZED: 'BROWSER_RESIZED',
  BROWSER_SCROLLED: 'BROWSER_SCROLLED',
  SEARCH_INPUT: 'SEARCH_INPUT',
  ITEM_SELECT: 'ITEM_SELECT',
  MENU_SELECT: 'MENU_SELECT',
  DATA_FILTER_CHANGED: 'DATA_FILTERS_CHANGED',

  VIEW_CHANGE_TO_MOBILE: 'VIEW_CHANGE_TO_MOBILE',
  VIEW_CHANGE_TO_DESKTOP: 'VIEW_CHANGE_TO_DESKTOP',

  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',

  GRID_VIEW_ITEMS_CHANGED: 'GRID_VIEW_ITEMS_CHANGED',
  GRID_VIEW_LAYOUT_COMPLETE: 'GRID_VIEW_LAYOUT_COMPLETE',
  GRID_VIEW_IMAGE_LOAD_ERROR: 'GRID_VIEW_IMAGE_LOAD_ERROR'
};;APP.createNameSpace('APP.EventDispatcher');
APP.EventDispatcher = function () {

  var _eventMap = {};

  function subscribe(evtString, callback, once) {
    if(_eventMap[evtString] === undefined) {
      _eventMap[evtString] = [];
    }

    _eventMap[evtString].push({
      evtstring: evtString,
      callback: callback,
      once: once,
      priority: 0
    });
  }

  function unsubscribe(evtString, callback) {
    if(_eventMap[evtString] === undefined) {
      return;
    }

    var listeners = _eventMap[evtString],
        callbackIdx = -1;

    for(var i= 0, len=listeners.length; i<len; i++) {
      if(listeners[i].callback === callback) {
        callbackIdx = i;
      }
    }

    if(callbackIdx === -1) {
      return;
    }

    listeners.splice(callbackIdx, 1);

    if(listeners.length === 0) {
      delete _eventMap[evtString];
    }
  }

  function publish(evtString, data, context) {
    if(_eventMap[evtString] === undefined) {
      return;
    }

    var listeners = _eventMap[evtString],
        i = listeners.length;

    data = (data instanceof Array) ? data : [data];

    while(i--) {

      var listenerObj = listeners[i];

      var cnxt = context || listenerObj.callback;
      listenerObj.callback.apply(cnxt, data);
      if(listenerObj.once) {
        unsubscribe(listenerObj.evtstring, listenerObj.callback);
      }

    }
  }

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish
  };

}();;APP.createNameSpace('APP.EventCommandMap');
APP.EventCommandMap = (function(){
  var _eventDispatcher = APP.EventDispatcher,
      _commandMap = {};

  function map(evt, command, once) {
    if(hasCommand(evt, command)) {
      return;
    }

    if(_commandMap[evt] === undefined) {
      _commandMap[evt] = {};
    }

    var evtCommandMap = _commandMap[evt];

    var callback = function(args) {
      routeToCommand(evt, command, args, once);
    };

    evtCommandMap[command] = callback;

    _eventDispatcher.subscribe(evt, callback);
  }

  function routeToCommand(evt, command, args, once) {
    var cmd = command;
    cmd.execute.apply(command, [args]);
    cmd = null;
    if(once) {
      unmap(evt, command);
    }
  }

  function unmap(evt, command) {
    if(hasCommand(evt, command)) {
      var callbacksByCommand = _commandMap[evt],
          callback = callbacksByCommand[command];
      _eventDispatcher.unsubscribe(evt, callback);
      delete callbacksByCommand[command];
    }
  }

  function hasCommand(evt, command) {
    var callbacksByCommand = _commandMap[evt];
    if(callbacksByCommand === undefined) {
      return false;
    }
    var callback = callbacksByCommand[command];
    return callback !== undefined;
  }

  return {
    map: map,
    unmap: unmap
  };

}());;function CategoryVO() {}
CategoryVO.prototype = {
  name: '',
  icon: ''
};

function RoleVO() {}
RoleVO.prototype = {
  name: '',
  icon: ''
};

function ContributorVO() {}
ContributorVO.prototype = {
  firstName: '',
  lastName: '',
  name: '',
  title: '',
  email: '',
  picture: '',
  roles: []
};

function ItemVO() {}
ItemVO.prototype = {
  title: '',
  shortTitle: '',
  description: '',
  previewImage: '',
  id: '',
  dateStarted: '',
  dateCompleted: '',
  quarter: '',
  duration: '',
  contributors: [],
  categories: [],
  companyArea: '',
  complexity: '',
  links: [],
  images: [],
  tags: [],
  metadata: []
};;APP.createNameSpace('APP.AppModel');

APP.AppModel = (function() {
  var _eventDispatcher,
      _self,
      _appGlobals,
      _dataProvider,
      _data,
      _currentFreeTextFilter,
      _currentDataFilters,
      _currentItem,
      _filterProperties;

  //----------------------------------------------------------------------------
  //  Accessors
  //  array.slice(0) returns a COPY of the array not the actual array
  //----------------------------------------------------------------------------

  function getModelData() {
    return _data.slice(0);
  }

  function getFilterProperties() {
    return _filterProperties.slice(0);
  }

  function getCurrentDataFilters() {
    return _currentDataFilters.slice(0);
  }

  function setCurrentFreeTextFilter(filter) {
    if(filter === _currentFreeTextFilter) {
      return;
    }
    updateFreeTextFilter(filter);
  }

  function getCurrentFreeTextFilter() {
    return _currentFreeTextFilter;
  }

  function setCurrentItem(id) {
    _currentItem = id;
  }

  function getCurrentItem() {
    return _currentItem;
  }

  function getFiltersForURL() {
    var filters = '',
      //freeText = 'search='+encodeURIComponent(_currentFreeTextFilter),
      //currentItem = 'item='+encodeURIComponent(_currentItem),
      str = '';

    if(_currentDataFilters) {
      filters = _currentDataFilters.map(function(filter) {
        return encodeURIComponent(filter.split(' ').join('_'));
      }).join("/");
    }

    //TODO optimize

    if(filters) {
      str += filters;
    }

    if(_currentFreeTextFilter || _currentItem) {
      str += '?';
    }

    if(_currentFreeTextFilter) {
      str += 'search='+encodeURIComponent(_currentFreeTextFilter);
    }

    if(_currentFreeTextFilter && _currentItem) {
      str += '&';
    }

    if(_currentItem) {
      str += 'item='+encodeURIComponent(_currentItem);
    }

    //return filters + '?'+freeText +'&'+ currentItem;
    return str;
  }

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;

    _appGlobals = APP.globals();

    configureMenuProperties();

    _currentFreeTextFilter = '';
    _currentDataFilters = [];
    _currentItem = '';

    _eventDispatcher = APP.EventDispatcher;

    _eventDispatcher.publish(APP.Events.MODEL_INITIALIZED);
  }

  function configureMenuProperties() {
    // Define the data that will be used to sort/filter the data
    // filter is a property on the itemVO

    _filterProperties = _appGlobals.appConfig.menu.map(function(item) {
      item.data = [];
      item.menuData = [];
      return item;
    });
  }

  function loadModelData() {
    createTestData();
  }

  function createTestData() {
    _dataProvider = APP.AppModel.DummyData;
    _dataProvider.initialize();

    _data = _dataProvider.getItems();

    onModelDataLoaded();
  }

  function onModelDataLoaded() {
    filterProperties();

    _eventDispatcher.publish(APP.Events.MODEL_DATA_LOADED);
  }



  //----------------------------------------------------------------------------
  //  Data
  //----------------------------------------------------------------------------

  /**
   * Based on data in the _filterproperties, builds a list of sortable values for
   * the data
   */
  function filterProperties() {
    _filterProperties.forEach(function(filter) {
      var props = [];
      _data.forEach(function(item) {
        if(item.hasOwnProperty(filter.filter)) {
          var itemPropVal = item[filter.filter];
          if(typeof itemPropVal === 'string') {
            props.push(itemPropVal);
          } else if(itemPropVal instanceof Array) {
            props = props.concat(itemPropVal);
          }
        }
      });
      filter.data = ArrayUtils.unique(props).sort();
      filter.menuData = getDataFormattedForMenu(filter.data);
    });
  }

  /**
   * Format an array of sortable items for the drop down menu component
   * @param data
   * @returns {Array}
   */
  function getDataFormattedForMenu(data) {
    var arry = [];
    data.forEach(function(item) {
      arry.push({label:item, value:item, toggle: true});
    });
    return arry;
  }

  function getMenuData() {
    var data = [];

    _filterProperties.forEach(function(filter) {
      data.push({
        label: filter.label,
        items: filter.menuData
      });
    });

    return data;
  }

  /**
   * Returns an object for the ID specified
   * If more than one ID is found, on the first will be returned.
   * @param itemid
   * @returns {void|*}
   */
  function getItemObjectForID(itemid) {
    var items = _data.filter(function(item) {
      if(item.id === itemid) {
        return true;
      } else {
        return false;
      }
    });

    // Returns a clone of the item
    return $.extend({}, items[0]);
  }

  function handledFiltersUpdated() {
    _eventDispatcher.publish(APP.Events.DATA_FILTER_CHANGED);
  }

  /**
   * Adds a new sorting filter
   * @param filter
   */
  function addFilter(filter) {
    _currentDataFilters.push(filter);
    handledFiltersUpdated();
  }

  /**
   * Replaces current filters with a new set
   * @param filter
   */
  function setMultipleFilters(filters) {
    _currentDataFilters = filters;
    handledFiltersUpdated();
  }

  /**
   * Removes a sorting filter
   * @param filter
   */
  function removeFilter(filter) {
    var idx = _currentDataFilters.indexOf(filter);
    if(idx > -1) {
      _currentDataFilters.splice(idx, 1);

      handledFiltersUpdated();
    }
  }

  /**
   * Add or remove a filter
   * @param filter
   */
  function toggleFilter(filter) {
    if(hasCurrentFilter(filter)) {
      removeFilter(filter);
    } else {
      addFilter(filter);
    }
  }

  /**
   * Is a Filter currently applied
   * @param filter
   * @returns {boolean}
   */
  function hasCurrentFilter(filter) {
    return _currentDataFilters.indexOf(filter) > -1;
  }

  /**
   * Add filter text from the input field
   * @param filter
   */
  function updateFreeTextFilter(filter) {
    if (filter.length < 3) {
      _currentFreeTextFilter = '';
    } else {
      _currentFreeTextFilter = filter.toLowerCase();
    }

    handledFiltersUpdated();
  }

  function getDataMatchingFilters() {
    var data = getDataMatchingFreeText(),
        filteredData = [];

    if(_currentDataFilters.length) {
      filteredData = data.filter(function(item) {
        return doesItemMatchFilters(item);
      });
    } else {
      filteredData = data;
    }

    return filteredData;
  }

  function doesItemMatchFilters(item) {
    var matched = true;

    _currentDataFilters.forEach(function(filter) {
      var propFilter = _filterProperties[getFilterPropIndexForFilter(filter)],
          itemPropVal = item[propFilter.filter];

      matched = matched && (itemPropVal.indexOf(filter) >= 0);
    });

    return matched;
  }

  /**
   * Returns the index of the filterProperties item that contains the matching
   * applied filter
   * @param filter
   * @returns {number}
   */
  function getFilterPropIndexForFilter(filter) {
    var i = 0,
        len = _filterProperties.length;

    for(;i<len;i++) {
      if(_filterProperties[i].data.indexOf(filter) >= 0) {
        return i;
      }
    }

    return -1;
  }

  function doesItemTitleMatchFreeText(item) {
    if(item.title.toLowerCase().indexOf(_currentFreeTextFilter) !== -1) {
      return true;
    }
    return false;
  }

  function doesItemTagMatchFreeText(item) {
    var i = 0,
        len = item.tags.length;

    for(;i<len; i++) {
      if(item.tags[i].toLowerCase().indexOf(_currentFreeTextFilter) !== -1) {
        return true;
      }
    }

    return false;
  }

  function getDataMatchingFreeText() {
    if(_currentFreeTextFilter === '') {
      return _data;
    }

    var titleMatches = _data.filter(doesItemTitleMatchFreeText);
    var tagMatches = _data.filter(doesItemTagMatchFreeText);

    return titleMatches.concat(tagMatches);
  }

  function removeAllFilters() {
    _currentFreeTextFilter = '';
    _currentDataFilters = [];
    handledFiltersUpdated();
  }

  function anyFiltersApplied() {
    if(_currentFreeTextFilter !== '' || _currentDataFilters.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * Parse the list of currently applied filters for the TagBarView
   * @returns {Array}
   */
  function getFiltersForTagBar() {
    return getCurrentDataFilters();
  }

  /*
   var filters = _currentDataFilters.map(function(filter) {
   return encodeURIComponent(filter.split(' ').join('_'));
   }).join("/"),
   freeText = 'search='+encodeURIComponent(_currentFreeTextFilter),
   currentItem = 'item=0';

   return filters + '?'+freeText +'&'+ currentItem;
   */

  function parseFiltersFromURL(urlFilters) {
    var fragments = urlFilters.split('?'),
        filters = fragments[0],
        query = '?'+fragments[1],
        search = getURLSearchParameterByName('search', query),
        item = getURLSearchParameterByName('item',query),
        filterArry = filters
          .split('/')
          .map(function(filter) {
            return decodeURIComponent(filter.split('_').join(' '));
          })
          .filter(function(filter){
            if(isValidFilter(filter)) {
              return true;
            }
            return false;
          });

    //console.log('filters: '+filters);
    //console.log('query: '+query);
    //console.log('search: '+search);
    //console.log('item: '+item);

    //setMultipleFilters(filterArry);
    //setCurrentFreeTextFilter(search);
    //setCurrentItem(item);

    _eventDispatcher.publish(APP.Events.RESUME_FROM_MODEL_STATE,{filters: filterArry, search: search, item: item});
  }

  function getURLSearchParameterByName(name, str) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(str);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  function isValidFilter(filter) {
    var i = 0,
      len = _filterProperties.length;

    for(;i<len;i++) {
      if(_filterProperties[i].data.indexOf(filter) >= 0) {
        return true;
      }
    }

    return false;
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    loadModelData: loadModelData,
    getData: getModelData,
    getFilterProperties: getFilterProperties,
    getMenuData: getMenuData,
    getItemObjectForID: getItemObjectForID,
    getCurrentFreeTextFilter: getCurrentFreeTextFilter,
    setCurrentFreeTextFilter: setCurrentFreeTextFilter,
    getCurrentDataFilters: getCurrentDataFilters,
    setMultipleFilters: setMultipleFilters,
    setCurrentItem: setCurrentItem,
    getCurrentItem: getCurrentItem,
    getFiltersForURL: getFiltersForURL,
    parseFiltersFromUrl: parseFiltersFromURL,
    addFilter: addFilter,
    removeFilter: removeFilter,
    toggleFilter: toggleFilter,
    getDataMatchingFilters: getDataMatchingFilters,
    removeAllFilters: removeAllFilters,
    anyFiltersApplied: anyFiltersApplied,
    getFiltersForTagBar: getFiltersForTagBar
  };

}());;APP.createNameSpace('APP.Model.DummyData');

APP.AppModel.DummyData = (function(){

  var _id = 1,
      _possibleYears = ['2010','2011','2012','2013','2014'],
      _possiblePreviewImages = [
        'screenshots/screenshot1.png',
        'screenshots/screenshot2.png',
        'screenshots/screenshot3.png',
        'screenshots/screenshot4.png',
        'screenshots/screenshot5.jpg',
        'screenshots/screenshot6.jpg',
        'screenshots/screenshot7.jpg',
        'screenshots/screenshot8.png',
        'screenshots/screenshot9.png',
        'screenshots/screenshot11.png',
        'screenshots/screenshot12.png'
      ],
      _possibleContributors = [],
      _possibleLobs = ['Information Technology','Finance','Human Resources','Investment','Legal','Client Services','Risk Management','Marketing'],
      //_possibleCategories = ['Online','Event','Test','Session','Material','Curriculum'],
      _possibleCategories = ['item-category1','item-category2','item-category3','item-category4','item-category5'],
      _possibleTags = ['template','storyline','social','game','mobile','sharepoint','html','system','ilt','paper based','application','show me','simulation'],
      _possibleComplexity = ['High','Medium','Low'],
      _possibleLinks = ['http://google.com', 'http://yahoo.com', 'http://bing.com'];
      _items = [];

  function getItems() {
    return _items;
  }

  function initialize() {
    var i=0;

    for(i=0; i<20; i++) {
      _possibleContributors.push(LOREM.getLFName());
    }

    for(i=0; i<100; i++) {
      _items.push(createItem());
    }

  }

  function createItem() {
    var o = Object.create(ItemVO.prototype),
        additionalImages = [],
        additionalNumImages = NumberUtils.rndNumber(1,10),
        description = '',
        descriptionNumParas = NumberUtils.rndNumber(1,5),
        i = 0;

    for(;i<descriptionNumParas; i++) {
      description += '<p>'+LOREM.getParagraph(3,7)+'</p>';
    }

    for(i=0;i<additionalNumImages; i++) {
      additionalImages.push('img/' + ArrayUtils.rndElement(_possiblePreviewImages));
    }

    o.title = StringUtils.capitalizeFirstLetter(LOREM.getText(3,10));
    o.shortTitle = o.title.substr(0, 10) + '...';
    o.description = description;
    o.images = additionalImages;
    o.previewImage = additionalImages[0];
    o.id = ''+_id++;
    o.dateStarted = 'January 1, 2010';
    o.dateCompleted = 'December 31, 2014';
    o.quarter = 'Q'+NumberUtils.rndNumber(1,4).toString();
    o.duration = NumberUtils.rndNumber(1,5).toString() + ' hour(s)';
    o.contributors = ArrayUtils.getRandomSetOfElements(_possibleContributors, 5);
    o.categories = ArrayUtils.getRandomSetOfElements(_possibleCategories, 2);
    o.companyArea = ArrayUtils.rndElement(_possibleLobs);
    o.complexity = ArrayUtils.rndElement(_possibleComplexity);
    o.type = 'WBT';
    o.links = ArrayUtils.getRandomSetOfElements(_possibleLinks, 5);
    o.tags = ArrayUtils.getRandomSetOfElements(_possibleTags, 3);
    return o;
  }



  return {
    initialize: initialize,
    getItems: getItems
  };

}());;APP.createNameSpace('APP.AppView');

APP.AppView = (function() {
  var _appScope,
      _viewRoot,
      _self,
      _appGlobals,
      _eventDispatcher,
      _currentView,
      _currentViewPortSize,
      _currentViewPortScroll,
      _mainScrollEl,
      _mainSearchInputEl,
      _searchHeaderEl,
      _clearAllButtonEl,
      _appContainerEl,
      _appEl,
      _drawerEl,
      _mainHeaderEl,
      _mainFooterEl,
      _drawerToggleButtonEl,
      _toastView,
      _modalCoverView,
      _ddMenuView,
      _drawerMenuView,
      _itemGridView,
      _itemDetailView,
      _tagBarView,
      _uiUpdateLayoutStream,
      _searchInputStream,
      _clearAllButtonStream,
      _browserScrollStream,
      _browserResizeStream,
      _disablePointerEventsOnScrollTimerStream,
      _isScrollingTimerStream,
      _drawerToggleButtonStream,
      _isMobile,
      _tabletBreakWidth,
      _phoneBreakWidth,
      _drawerWidth,
      _isDrawerOpen;

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getCurrentView() {
    return _currentView;
  }

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize(appScope, viewRoot) {
    _appScope = appScope;
    _viewRoot = viewRoot;

    _self = this;
    _appGlobals = APP.globals();
    _eventDispatcher = APP.EventDispatcher;

    _isMobile = false;
    _tabletBreakWidth = 750;
    _phoneBreakWidth = 475;
    _drawerWidth = 250;
    _isDrawerOpen = false;

    _eventDispatcher.publish(APP.Events.VIEW_INITIALIZED);
  }

  function render() {
    setCurrentViewPortSize();
    setCurrentViewPortScroll();
    defineViewElements();

    initializeComponents();

    configureUIStreams();

    configureUIEvents();

    checkForMobile();
    hideModalCover();
    positionUIElements();

    updateAppTitle();

    _eventDispatcher.publish(APP.Events.VIEW_RENDERED);
  }

  function updateAppTitle() {
    _mainHeaderEl.find('h1').html(_appGlobals.appConfig.title);
    document.title = StringUtils.removeTags(_appGlobals.appConfig.title);
  }

  function defineViewElements() {
    // ui parts
    _appContainerEl = $('#app__container');
    _appEl = $('#app__contents');
    // listen for scroll on the app container not window or body
    _mainScrollEl = _appEl;
    _drawerEl = $('#drawer');
    _drawerToggleButtonEl = $('.header__drawer-toggle button');

    _mainHeaderEl = $('#header');
    _mainFooterEl = $('#footer');

    // item grid header
    _mainSearchInputEl = $('.grid__header .grid__header-search input');
    _searchHeaderEl = $('.grid__header h1');
    _clearAllButtonEl = $('#clearall-button');
  }

  function initializeComponents() {
    _toastView = _self.ToastView;
    _toastView.initialize('#toast__container');

    _modalCoverView = _self.ModalCoverView;
    _modalCoverView.initialize();

    // init on these called later
    _ddMenuView = ObjectUtils.basicFactory(APP.AppView.DDMenuBarView); //_self.DDMenuBarView;
    _drawerMenuView = ObjectUtils.basicFactory(APP.AppView.DDMenuBarView);
    _itemGridView = _self.ItemGridView;

    _itemDetailView = _self.ItemDetailView;
    _itemDetailView.initialize('#details');

    _tagBarView = _self.TagBarView;
    _tagBarView.initialize('#tagbar__container');

    TweenMax.to(_drawerEl, 0, {x:_drawerWidth*-1});
  }

  function configureUIEvents() {
    _eventDispatcher.subscribe(APP.Events.MODAL_COVER_HIDE, hideModalContent);
    _eventDispatcher.subscribe(APP.Events.GRID_VIEW_LAYOUT_COMPLETE, onGridViewLayoutComplete);
  }

  function configureUIStreams() {
    var uiresizestream = Rx.Observable.fromEvent(window, 'resize'),
        uiscrollscream = Rx.Observable.fromEvent(_mainScrollEl[0], 'scroll');

    _uiUpdateLayoutStream = Rx.Observable.merge(uiresizestream, uiscrollscream)
      .throttle(25)
      .subscribe(function() {
        positionUIElementsOnChange();
      });

    _browserResizeStream = Rx.Observable.fromEvent(window, 'resize')
      .throttle(100)
      .subscribe(function() {
        handleViewPortResize();
      });

    _browserScrollStream = Rx.Observable.fromEvent(_mainScrollEl[0], 'scroll')
      .throttle(100)
      .subscribe(function() {
        handleViewPortScroll();
      });

    _searchInputStream = Rx.Observable.fromEvent(_mainSearchInputEl[0], 'keyup')
      .throttle(150)
      .map(function (evt) { return evt.target.value; })
      .subscribe(function (value) {
        _eventDispatcher.publish(APP.Events.SEARCH_INPUT, value);
      });

    _clearAllButtonStream = Rx.Observable.fromEvent(_clearAllButtonEl[0], _appGlobals.mouseClickEvtStr)
      .subscribe(function() {
        _eventDispatcher.publish(APP.Events.VIEW_ALL_FILTERS_CLEARED);
      });

    _drawerToggleButtonStream = Rx.Observable.fromEvent(_drawerToggleButtonEl[0], _appGlobals.mouseClickEvtStr)
      .subscribe(function() {
        toggleDrawer();
      });

  }

  function handleViewPortResize() {
    checkForMobile();
    _eventDispatcher.publish(APP.Events.BROWSER_RESIZED, _currentViewPortSize);
  }

  function handleViewPortScroll() {
    disablePointerEventsOnScroll();
    _eventDispatcher.publish(APP.Events.BROWSER_SCROLLED, _currentViewPortScroll);
  }

  // http://www.thecssninja.com/css/pointer-events-60fps
  function disablePointerEventsOnScroll() {
    if(_disablePointerEventsOnScrollTimerStream) {
      _disablePointerEventsOnScrollTimerStream.dispose();
    }

    $('body').addClass('ignore-pointer-events');

    _disablePointerEventsOnScrollTimerStream = Rx.Observable.timer(250)
      .pluck('interval')
      .take(1)
      .subscribe(function() {
        $('body').removeClass('ignore-pointer-events');
      });
  }

  /**
   * Display a notification "toast"
   * @param title The title
   * @param message The message
   */
  function showNotification(title, message) {
    title = title || "Notification";
    _toastView.add(title, message);
  }

  //----------------------------------------------------------------------------
  //  Views
  //----------------------------------------------------------------------------

  /**
   * Cache the current view port size in a var
   */
  function setCurrentViewPortSize() {
    _currentViewPortSize = {width: $(window).width(), height: $(window).height()};
  }

  /**
   * Cache the current view port scroll in a var
   */
  function setCurrentViewPortScroll() {
    var left = $(_mainScrollEl).scrollLeft(),
        top =  $(_mainScrollEl).scrollTop();

    left = left ? left : 0;
    top = top ? top : 0;

    _currentViewPortScroll = {left:left, top:top};
  }

  /**
   * Reposition the UI elements on a UI change, scroll, resize, etc.
   */
  function positionUIElementsOnChange() {
    setCurrentViewPortScroll();
    setCurrentViewPortSize();

    startIsScrollingTimer();
    hideElementsOnScrollStart();
  }

  /**
   * Position UI elements that are dependant on the view port
   */
  function positionUIElements() {
    TweenMax.to(_mainHeaderEl, 0, {top: _currentViewPortScroll.top});
    TweenMax.to(_mainFooterEl, 0, {top: _currentViewPortSize.height + _currentViewPortScroll.top - _mainFooterEl.height()});
  }

  /**
   * Update on filters changed
   */
  function updateUIOnFilterChanges() {
    TweenMax.to(_mainScrollEl, 1, {scrollTop: 0, ease: Quad.easeIn});
  }

  /**
   * Start a timer monitor when scrolling stops
   */
  function startIsScrollingTimer() {
    if(_isScrollingTimerStream) {
      _isScrollingTimerStream.dispose();
    }

    _isScrollingTimerStream = Rx.Observable.timer(500)
      .pluck('interval')
      .take(1)
      .subscribe(showElementsOnScrollEnd);
  }


  /**
   * Hide UI elements
   */
  function hideElementsOnScrollStart() {
    TweenMax.to(_mainHeaderEl, 0, {autoAlpha: 0, ease:Circ.easeOut});
    TweenMax.to(_mainFooterEl, 0, {autoAlpha: 0, ease:Circ.easeOut});
  }

  /**
   * Show UI elements
   */
  function showElementsOnScrollEnd() {
    positionUIElements();

    TweenMax.to(_mainHeaderEl, 0.1, {autoAlpha: 1, ease:Circ.easeOut});
    TweenMax.to(_mainFooterEl, 0.1, {autoAlpha: 1, ease:Circ.easeOut});
  }

  //----------------------------------------------------------------------------
  //  Mobile
  //----------------------------------------------------------------------------

  /**
   * Usually on resize, check to see if we're in mobile
   */
  function checkForMobile() {
    if(_currentViewPortSize.width <= _tabletBreakWidth || _appGlobals.mobile.any()) {
      switchToMobileView();
    } else if(_currentViewPortSize.width > _tabletBreakWidth) {
      switchToDesktopView();
    }
  }

  function switchToMobileView() {
    if(_isMobile) {
      return;
    }

    _isMobile = true;
    _eventDispatcher.publish(APP.Events.VIEW_CHANGE_TO_MOBILE);
  }

  function switchToDesktopView() {
    if(!_isMobile) {
      return;
    }

    _isMobile = false;
    closeDrawer();
    _eventDispatcher.publish(APP.Events.VIEW_CHANGE_TO_DESKTOP);
  }

  function toggleDrawer() {
    if(_isDrawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  function openDrawer() {
    _isDrawerOpen = true;
    TweenMax.to(_drawerEl, 0.5, {x:0, ease:Quad.easeOut});
    TweenMax.to(_appEl, 0.5, {x: _drawerWidth, ease:Quad.easeOut});
  }

  function closeDrawer() {
    _isDrawerOpen = false;
    TweenMax.to(_drawerEl, 0.5, {x:_drawerWidth*-1, ease:Quad.easeOut});
    TweenMax.to(_appEl, 0.5, {x: 0, ease:Quad.easeOut});
  }

  //----------------------------------------------------------------------------
  //  Menus
  //----------------------------------------------------------------------------

  function initializeMenus(data) {
    _ddMenuView.initialize('#main-navigation', data);
    _drawerMenuView.initialize('#drawer-navigation', data, true);
  }

  function updateMenuSelections(data) {
    _ddMenuView.setMenuSelections(data);
    _drawerMenuView.setMenuSelections(data);
  }

  //----------------------------------------------------------------------------
  //  Tar Bar
  //----------------------------------------------------------------------------

  function updateTagBarDisplay(tags) {
    _tagBarView.update(tags);

    // Updating will change the height of the bar, reposition
    positionUIElements();
  }

  //----------------------------------------------------------------------------
  //  Item Grid
  //----------------------------------------------------------------------------


  function initializeGridView(data) {
    _itemGridView.initialize('#grid__item-container', data);
  }

  function onGridViewLayoutComplete() {
    //console.log('gridview layout complete');
  }

  function  updateGridItemVisibility(data) {
    _itemGridView.updateItemVisibility(data);
  }

  /**
   * Set the item grid search header
   * @param message
   */
  function updateSearchHeader(message) {
    _searchHeaderEl[0].innerHTML = message;
  }

  function clearAllFilters() {
    clearFreeTextFilter();
    _ddMenuView.resetAllSelections();
    _drawerMenuView.resetAllSelections();
    _tagBarView.update([]);
    showAllGridViewItems();
  }

  function clearFreeTextFilter() {
    _mainSearchInputEl[0].value = '';
  }

  function setFreeTextFilterValue(str) {
    _mainSearchInputEl[0].value = str;
    _eventDispatcher.publish(APP.Events.SEARCH_INPUT, str);
  }

  function showAllGridViewItems() {
    _itemGridView.showAllItems();
  }

  function showItemDetailView(item) {
    _itemDetailView.showItem(item);
    showModalCover(true);
  }

  //----------------------------------------------------------------------------
  //  Modal
  //----------------------------------------------------------------------------

  function showBigMessage(title, message) {
    _itemDetailView.showMessage({title: title, description: message});
    showModalCover(true);
  }

  function removeLoadingMessage() {
    TweenMax.to($('#initialization__cover'), 1, {alpha: 0, ease: Quad.easeOut, onComplete: function() {
      $('#initialization__cover').remove();
    }});

    TweenMax.to($('.initialization__message'), 2, {top:"+=50px", ease: Quad.easeIn, onComplete: function() {
      $('.initialization__message').remove();
    }});
  }

  function showModalCover(animate) {
    _modalCoverView.show(animate);
  }

  function hideModalCover(animate) {
    _modalCoverView.hide(animate);
  }

  function hideModalContent() {
    _itemDetailView.hide();
    _eventDispatcher.publish(APP.Events.ITEM_SELECT,'');
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    render: render,
    showNotification: showNotification,
    currentView: getCurrentView,
    removeLoadingMessage: removeLoadingMessage,
    createView: ObjectUtils.basicFactory,
    updateSearchHeader: updateSearchHeader,
    showBigMessage: showBigMessage,
    initializeMenus: initializeMenus,
    initializeGridView: initializeGridView,
    showItemDetailView: showItemDetailView,
    clearAllFilters: clearAllFilters,
    clearFreeTextFilter: clearFreeTextFilter,
    setFreeTextFilterValue: setFreeTextFilterValue,
    showAllGridViewItems: showAllGridViewItems,
    updateGridItemVisibility:  updateGridItemVisibility,
    updateTagBarDisplay: updateTagBarDisplay,
    updateMenuSelections: updateMenuSelections,
    updateUIOnFilterChanges: updateUIOnFilterChanges
  };
}());;APP.createNameSpace('APP.AppView.ModalCoverView');

APP.AppView.ModalCoverView = (function() {
  var _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _eventDispatcher;

  function initialize() {
    var appGlobals = APP.globals();

    _eventDispatcher = APP.EventDispatcher;

    _isVisible = true;

    _modalCoverEl = $('#modal__cover');
    _modalBackgroundEl = $('.modal__background');
    _modalCloseButtonEl = $('.modal__close-button');

    var modalBGClick = Rx.Observable.fromEvent(_modalBackgroundEl[0], appGlobals.mouseClickEvtStr),
      modalButtonClick = Rx.Observable.fromEvent(_modalCloseButtonEl[0], appGlobals.mouseClickEvtStr);

    _modalClickStream = Rx.Observable.merge(modalBGClick, modalButtonClick)
      .subscribe(function() {
        onModalClick();
      });
  }

  function getIsVisible() {
    return _isVisible;
  }

  function onModalClick() {
    hide(true);
  }

  function show(animate) {
    if(_isVisible) {
      return;
    }
    _isVisible = true;
    var duration = animate ? 0.25 : 0;
    TweenMax.to(_modalCoverEl, duration, {autoAlpha: 1, ease:Quad.easeOut});
    TweenMax.to(_modalCloseButtonEl, duration*2, {autoAlpha: 1, top: 22, ease:Back.easeOut, delay: 2});

    _eventDispatcher.publish(APP.Events.MODAL_COVER_SHOW);
  }

  function hide(animate) {
    if(!_isVisible) {
      return;
    }
    _isVisible = false;
    var duration = animate ? 0.25 : 0;
    TweenMax.killDelayedCallsTo(_modalCloseButtonEl);
    TweenMax.to(_modalCoverEl, duration, {autoAlpha: 0, ease:Quad.easeOut});
    TweenMax.to(_modalCloseButtonEl, duration/2, {autoAlpha: 0, top: -50, ease:Quad.easeOut});

    _eventDispatcher.publish(APP.Events.MODAL_COVER_HIDE);
  }

  return {
    initialize: initialize,
    show: show,
    hide: hide,
    visible: getIsVisible
  };

}());;APP.createNameSpace('APP.AppView.ToastView');
APP.AppView.ToastView = (function(){

  var _children = [],
      _counter = 0,
      _defaultExpireDuration = 7000,
      _containerEl,
      _templateToast = _.template('<div class="toast__item" id="<%= id %>">' +
      '<div class="toast__item-content"><h1><%= title %></h1><p><%= message %></p></div>' +
      '<div class="toast__item-controls"><button><i class="fa fa-close"></i></button></div></div>');

  function initialize(elID) {
    _containerEl = $(elID);
  }

  function add(title, message, button) {
    button = button || 'OK';
    var newToast = createToastObject(title, message, button);

    $(_containerEl).prepend(newToast.html);

    newToast.index = _children.length;
    newToast.element = $('#'+newToast.id);
    newToast.height = newToast.element.innerHeight();

    newToast.closeBtnStream = Rx.Observable.fromEvent(newToast.element.find('button')[0], 'click');
    newToast.expireTimeStream = Rx.Observable.interval(_defaultExpireDuration);
    newToast.lifeTimeStream = Rx.Observable.merge(newToast.closeBtnStream, newToast.expireTimeStream).take(1)
      .subscribe(function() {
        remove(newToast.id);
      });

    _children.push(newToast);

    transitionIn(newToast.element);

    return newToast.id;
  }

  function createToastObject(title,message,button) {
    var id = 'toast' + (_counter++).toString();
    return {
      id: id,
      index: -1,
      title: title,
      message: message,
      buttonLabel: button,
      status: 'new',
      html: _templateToast({id: id, title: title, message: message}),
      element: null,
      height: 0,
      closeBtnStream: null,
      expireTimeStream: null,
      lifeTimeStream: null
    };
  }

  function transitionIn(el) {
    TweenMax.to(el,0,{alpha: 0});
    TweenMax.to(el,1, {alpha: 1, ease: Quad.easeOut});
    rearrangeToasts();
  }

  function transitionOut(el) {
    TweenMax.to(el, 0.25, {left: '+=300', ease: Quad.easeIn, onComplete: function() {
      onTransitionOutComplete(el);
    }});
  }

  function onTransitionOutComplete(el) {
    var toastIdx = getToastIndexByID(el.attr('id')),
      toast = _children[toastIdx];

    el.remove();

    _children[toastIdx] = null;

    _children.splice(toast.index, 1);
    reindex();
  }

  function reindex() {
    var i = 0,
      len=_children.length;

    for(; i<len; i++) {
      _children[i].index = i;
    }
  }

  function rearrangeToasts(ignore) {
    var i = _children.length - 1,
      current,
      y = 0;

    for(;i>-1; i--) {
      if(i === ignore) {
        continue;
      }
      current = _children[i];
      TweenMax.to(current.element, 0.75, {y: y, ease: Bounce.easeOut});
      y += 10 + current.height;
    }
  }

  function getToastIndexByID(id) {
    var len = _children.length,
      i = 0;

    for(; i<len; i++) {
      if(_children[i].id === id) {
        return i;
      }
    }

    return -1;
  }

  function remove(id) {
    var toastIndex = getToastIndexByID(id),
      toast;

    if(toastIndex > -1) {
      toast = _children[toastIndex];
      transitionOut(toast.element);
      rearrangeToasts(toast.index);
    }
  }

  return {
    initialize: initialize,
    add: add,
    remove: remove
  };

}());;APP.createNameSpace('APP.AppView.DDMenuBarView');
APP.AppView.DDMenuBarView = {
  state: {},

  methods: {

    eventDispatcher: null,
    containerEl: null,
    barEl: null,
    data: null,
    children: null,
    isKeepOpen: false,

    initialize: function(elID, data, keep) {
      this.eventDispatcher = APP.EventDispatcher;

      this.containerEl = $(elID);
      this.data = data;

      this.isKeepOpen = keep ? true : false;

      this.render();
    },

    render: function() {
      var i = 0,
          len = this.data.length;

      this.children = [];

      this.barEl = $('<ul></ul>');
      for(; i<len; i++) {
        var menuobj = ObjectUtils.basicFactory(APP.AppView.DDMenuBarView.DDMenuView);
        menuobj.initialize(this.data[i], this.isKeepOpen);
        $(this.barEl).append(menuobj.element);
        this.children.push(menuobj);
      }

      this.containerEl.prepend(this.barEl);

      // hack to prevent clicking on menuItems from selecting text on ie since CSS isn't supported
      if(APP.globals().isIE) {
        this.containerEl[0].onselectstart = function() {
          return false;
        };
      }

    },

    resetAllSelections: function() {
      this.children.forEach(function(menu) {
        menu.deselectAllItems();
      });
    },

    setMenuSelections: function(data) {
      this.children.forEach(function(menu) {
        menu.setSelections(data);
      });
    }

  },

  closures: []
};


//APP.createNameSpace('APP.AppView.DDMenuBarView');
//APP.AppView.DDMenuBarView = (function(){
//
//  var _self,
//      _eventDispatcher,
//      _containerEl,
//      _barEl,
//      _data,
//      _children = [];
//
//  function initialize(elID, data) {
//    _self = this;
//    _eventDispatcher = APP.EventDispatcher;
//
//    _containerEl = $(elID);
//    _data = data;
//
//    render();
//  }
//
//  function render() {
//    _barEl = $('<ul></ul>');
//    _data.forEach(function(menu){
//      var menuobj = ObjectUtils.basicFactory(APP.AppView.DDMenuBarView.DDMenuView);
//      menuobj.initialize(menu);
//      $(_barEl).append(menuobj.element);
//      _children.push(menuobj);
//    });
//
//    _containerEl.prepend(_barEl);
//
//    // hack to prevent clicking on menuItems from selecting text on ie since CSS isn't supported
//    if(APP.globals().isIE) {
//      _containerEl[0].onselectstart = function() {
//        return false;
//      };
//    }
//
//  }
//
//  function resetAllSelections() {
//    _children.forEach(function(menu) {
//      menu.deselectAllItems();
//    });
//  }
//
//  return {
//    initialize: initialize,
//    resetAllSelections: resetAllSelections
//  };
//
//}());

;//----------------------------------------------------------------------------
//  A menu
//----------------------------------------------------------------------------

APP.createNameSpace('APP.AppView.DDMenuBarView.DDMenuView');
APP.AppView.DDMenuBarView.DDMenuView = {
  state: {
    visible: false,
    selected: false
  },

  methods: {
    eventDispatcher: APP.EventDispatcher,
    data: null,
    items: null,
    template: '',
    renderedHTML: null,
    element: null,
    anchorElement: null,
    ddMenuEl: null,
    menuOverStream: null,
    menuOutStream: null,
    menuClickStream: null,
    fadeOutComplete: null,
    isKeepOpen: false,
    appGlobals: null,
    firstTouchPosition: [],
    lastTouchPosition: [],
    touchDeltaTolerance: 10,
    shouldProcessTouchEnd: false,

    initialize: function(data, keep) {
      this.appGlobals = APP.globals();

      this.data = data;
      this.data.value = this.data.value || this.data.label.split(' ').join('_').toLowerCase();
      this.items = [];

      // Should the menu ever collapse or remain open always?
      this.isKeepOpen = keep ? true : false;

      this.render();

      if(this.appGlobals.mobile.any()) {
        this.configureMobileStreams();
      } else {
        this.configureStreams();
      }
    },

    render: function() {
      var templateHTML = '<li><button class="dd-menu-item" data-value="<%= value %>"><%= label %></button><ul class="menu"></ul>';

      this.template = _.template(templateHTML);

      this.renderedHTML = this.template(this.data);

      this.element = $(this.renderedHTML);
      this.ddMenuEl = $(this.element).find('ul');
      this.anchorElement = $(this.element).find('button')[0];

      this.data.items.forEach(this.buildMenuItems.bind(this));  // ensure proper scope!

      this.fadeOutComplete = true;

      if(this.isKeepOpen) {
        this.visible = true;
      } else {
        this.visible = false;
        this.ddMenuEl.height('0px');
        TweenMax.to(this.ddMenuEl, 0, {autoAlpha: 0});
      }
    },

    buildMenuItems: function(item) {
      var menuitem = ObjectUtils.basicFactory(APP.AppView.BasicMenuItemView);
      menuitem.initialize(item);
      this.ddMenuEl.append(menuitem.element);
      this.items.push(menuitem);
    },

    configureStreams: function() {
      this.menuOverStream = Rx.Observable.fromEvent(this.element[0], 'mouseover')
        .filter(this.filterForMouseEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(this.handleMenuOver.bind(this));

      this.menuOutStream = Rx.Observable.fromEvent(this.element[0], 'mouseout')
        .filter(this.filterForMouseEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(this.handleMenuOut.bind(this));

      this.menuClickStream = Rx.Observable.fromEvent(this.element[0], 'click')
        .filter(this.filterForMouseEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(this.handleMenuClick.bind(this));
    },

    filterForMouseEventsOnItems: function(evt) {
      var target = evt.target;
      if(target === null) {
        return false;
      }

      // Need to traverse up the DOM for IE9
      var el = this.getTargetElMatching(target, '.dd-menu-item');
      if(el){
        return el.tagName.toLowerCase() === 'button';
      }
      return false;
    },

    getMouseEventTargetValue: function(evt) {
      var target = this.getTargetElMatching(evt.target, '.dd-menu-item');
      return target.getAttribute('data-value');
    },

    getTargetElMatching: function(el, cls) {
      return $(el).closest(cls)[0];
    },

    /**
     * The rationale here
     * 1. on start, register where the finger was on the screen
     * 2. update position on touch move
     * 3. on end, compare that the where the finger was
     * 4. if it's less than the tolerance, show the item
     * 5. if not, then it was probably a drag/scroll and ignore it
     * based on https://github.com/filamentgroup/tappy/blob/master/tappy.js
     */
    configureMobileStreams: function() {
      // Note - had problems getting RxJS to work correctly here, used events
      this.element[0].addEventListener('touchstart', (function(evt) {
        this.firstTouchPosition = this.lastTouchPosition = TouchUtils.getCoords(evt);
        this.shouldProcessTouchEnd = false;
      }).bind(this), false);

      this.element[0].addEventListener('touchmove', (function(evt) {
        this.lastTouchPosition = TouchUtils.getCoords(evt);
      }).bind(this), false);

      var touchPressFunction = function(arg) {
        if(this.shouldProcessTouchEnd) {
          this.handleMenuClick(arg);
        }
      };

      this.menuClickStream = Rx.Observable.fromEvent(this.element[0], 'touchend')
        .filter(this.processTouchEndEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(touchPressFunction.bind(this));
    },

    processTouchEndEventsOnItems: function(evt) {
      var deltaX = Math.abs(this.lastTouchPosition[0] - this.firstTouchPosition[0]),
          deltaY = Math.abs(this.lastTouchPosition[1] - this.firstTouchPosition[1]);

      if(deltaX <= this.touchDeltaTolerance && deltaY <= this.touchDeltaTolerance) {
        this.shouldProcessTouchEnd = true;
      }

      return this.filterForMouseEventsOnItems(evt);
    },

    handleMenuOver: function(data) {
      this.open();
      if(this.isHeaderObject(data)) {
        // nothing on header
      } else {
        var item = this.getItemByValue(data);
        item.showOverEffect();
      }
    },

    handleMenuOut: function(data) {
      this.close();
      if(this.isHeaderObject(data)) {
        // nothing on header
      } else {
        var item = this.getItemByValue(data);
        item.showOutEffect();
      }
    },

    handleMenuClick: function(data) {
      if(this.isHeaderObject(data)) {
        // don't hide it here
      } else {
        this.eventDispatcher.publish(APP.Events.MENU_SELECT, data);
        var item = this.getItemByValue(data);
        item.toggleSelect();
        item.showDepressEffect();
      }
    },

    isHeaderObject: function(data) {
      return data === this.data.value;
    },

    getAllItemElements: function() {
      var itemsarry = [];
      this.items.forEach(function(item) {
        itemsarry.push(item.element);
      });
      return itemsarry;
    },

    getItemByValue: function(value) {
      return this.items.filter(function(item) {
        if(item.data.value === value) {
          return true;
        } else {
          return false;
        }
      })[0];
    },

    deselectAllItems: function() {
      this.items.forEach(function(item) {
        item.deselect();
      });
    },

    setSelections: function(data) {
      this.deselectAllItems();

      this.items.forEach(function(item) {
        data.forEach(function(selection) {
          if(item.label === selection) {
            item.select();
          }
        });
      });
    },

    open: function() {
      if(this.visible || this.element === undefined || this.isKeepOpen) {
        return;
      }

      this.visible = true;

      this.ddMenuEl.height('auto');

      TweenMax.killTweensOf(this.anchorElement);
      TweenMax.killTweensOf(this.ddMenuEl);

      TweenMax.to(this.anchorElement, 0.25, {paddingTop:'5px', ease:Circ.easeOut});
      TweenMax.to(this.ddMenuEl, 0.25, {autoAlpha: 1, top:'0', ease:Circ.easeOut});
    },

    close: function() {
      if(!this.visible || this.element === undefined || this.isKeepOpen) {
        return;
      }
      this.visible = false;

      this.fadeOutComplete = false;

      var closeCompleteFunc = this.closeComplete.bind(this);

      TweenMax.to(this.anchorElement, 0.25, {paddingTop:'0px', ease:Circ.easeIn, delay:0.1});
      TweenMax.to(this.ddMenuEl,0.1, {autoAlpha: 0, ease:Circ.easeIn, onComplete: closeCompleteFunc, delay:0.1});
    },

    closeComplete: function() {
      this.ddMenuEl.height('0px');
      this.fadeOutComplete = true;
    }

  },

  closures: []
};;//----------------------------------------------------------------------------
//  A menu item
//----------------------------------------------------------------------------

APP.createNameSpace('APP.AppView.BasicMenuItemView');
APP.AppView.BasicMenuItemView = {
  state: {
    visible: true,
    selected: false
  },

  methods: {
    eventDispatcher: APP.EventDispatcher,
    data: null,
    label: '',
    template: '',
    renderedHTML: null,
    element: null,
    iconElement: null,
    anchorElement: null,
    labelOverStream: null,
    labelOutStream: null,
    labelSelectStream: null,
    iconTemplate: null,
    iconDeselectedClass: null,
    iconSelectedClass: null,
    toggle: null,

    initialize: function(data) {
      this.data = data;

      if(this.data.toggle) {
        this.toggle = true;
        this.iconSelectedClass = 'fa-check';
        this.iconDeselectedClass = 'fa-circle-thin';
      }

      this.label = data.label;

      this.iconTemplate = '<i class="fa fa-circle-thin"></i>';

      this.render();

      this.selected = false;
    },

    render: function() {
      var noicon = '<li><button class="dd-menu-item" data-value="<%= value %>"><%= label %></button></li>',
        icon = '<li class="dd-menu-item icon-left"><button class="dd-menu-item indent" data-value="<%= value %>">'+this.iconTemplate+'<%= label %></button></li>',
        templatehtml = noicon;

      if(this.toggle) {
        templatehtml = icon;
      }

      this.template = _.template(templatehtml);
      this.renderedHTML = this.template(this.data);
      this.element = $(this.renderedHTML);
      this.iconElement = this.element.find('i');
      this.anchorElement = this.element.find('a');
    },

    select: function() {
      if(this.selected || this.element === undefined) {
        return;
      }
      this.selected = true;

      if(this.toggle) {
        this.iconElement.removeClass(this.iconDeselectedClass);
        this.iconElement.addClass(this.iconSelectedClass);
      }
    },

    showOverEffect: function() {
      TweenMax.to(this.element, 0.25, {backgroundColor:'rgba(255,255,255,.25)', ease:Circ.easeOut});
      TweenMax.to(this.anchorElement, 0.15, {boxShadow: "0px 0px 20px rgba(255,255,255,.25)", ease:Circ.easeOut});
    },

    showOutEffect: function() {
      TweenMax.killTweensOf(this.anchorElement);
      TweenMax.to(this.element, 0.5, {backgroundColor:'rgba(255,255,255,0)', ease:Circ.easeIn});
      TweenMax.to(this.anchorElement, 0.25, {boxShadow: "0px 0px 0px rgba(255,255,255,0)", ease:Circ.easeIn});
    },

    showDepressEffect: function() {
      var tl = new TimelineMax();
      tl.to(this.element,0.1, {scale:0.9, ease: Quad.easeOut});
      tl.to(this.element,0.5, {scale:1, ease: Elastic.easeOut});
    },

    deselect: function() {
      if(!this.selected || this.element === undefined) {
        return;
      }
      this.selected = false;

      if(this.toggle) {
        this.iconElement.removeClass(this.iconSelectedClass);
        this.iconElement.addClass(this.iconDeselectedClass);
      }
    },

    toggleSelect: function() {
      if(this.selected) {
        this.deselect();
      } else {
        this.select();
      }
    }

  },

  closures: []
};;APP.createNameSpace('APP.AppView.ItemGridView');
APP.AppView.ItemGridView = (function(){

  var _self,
      _eventDispatcher,
      _containerEl,
      _appGlobals,
      _containerElID,
      _data,
      _packery,
      _isLayingOut,
      _children = [],
      _numItemsVisible,
      _itemOverStream,
      _itemOutStream,
      _itemSelectStream,
      _highestZ,
      _imagesLoaded,
      _firstTouchPosition = [],
      _lastTouchPosition = [],
      _touchDeltaTolerance = 10,
      _shouldProcessTouchEnd;

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getNumItemsVisible() {
    return _numItemsVisible;
  }

  function setNumItemsVisible(number) {
    if(_numItemsVisible === number) {
      return;
    }
    _numItemsVisible = number;
    _eventDispatcher.publish(APP.Events.GRID_VIEW_ITEMS_CHANGED, _numItemsVisible);
  }

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize(elID, data) {
    _self = this;
    _eventDispatcher = APP.EventDispatcher;
    _appGlobals = APP.globals();
    _containerElID = elID;
    _containerEl = $(_containerElID);
    _data = data;

    _isLayingOut = false;

    render();

    if(_appGlobals.mobile.any()) {
      configureMobileStreams();
    } else {
      configureStreams();
    }

    _highestZ = _children.length;

    setNumItemsVisible(_children.length);
  }

  function render() {

    //initImagesLoaded();

    _data.forEach(function(item){
      var itemobj = ObjectUtils.basicFactory(APP.AppView.ItemGridView.AbstractGridItem);
      itemobj.initialize(item);
      $(_containerEl).append(itemobj.element);
      itemobj.postRender();
      _children.push(itemobj);
    });

    // hack to prevent clicking on menuItems from selecting text on ie since CSS isn't supported
    if(APP.globals().isIE) {
      _containerEl[0].onselectstart = function() {
        return false;
      };
    }

    initPackery();

    TweenMax.staggerFrom(getItemsInView(), 0.5, {alpha: 0, ease:Circ.easeOut}, 0.15);
  }

  /**
   * Images loaded control - not used yet
   * http://imagesloaded.desandro.com/
   */
  function initImagesLoaded() {
    _imagesLoaded = imagesLoaded(_containerElID, function(instance) {
      console.log('[ItemGridView] All images loaded');
    });

    _imagesLoaded.on('fail', function(instance) {
      console.log('[ItemGridView] All images loaded, with errors');
      _eventDispatcher.publish(APP.Events.GRID_VIEW_IMAGE_LOAD_ERROR);
    });
  }

  /**
   * Init Packery view for the grid
   */
  function initPackery() {
    var packeryGutter = _appGlobals.mobile.any() ? 10 : 33,
        packeryTransDuration = _appGlobals.mobile.any() ? '0.5s' : '0.75s';

    _packery = new Packery(_containerElID, {
      itemSelector: '.item',
      gutter: packeryGutter,
      transitionDuration: packeryTransDuration
    });

    _packery.on('layoutComplete', onPackeryLayoutComplete);
  }

  /**
   * If the view is rearranging, we don't want to handle events from the iteme
   * because it would cause display issues. So ignore them with the isLayingOut
   * toggle until the layout has been completed
   * @param packery
   * @param items
   */
  function onPackeryLayoutComplete(packery, items) {
    _isLayingOut = false;

    _eventDispatcher.publish(APP.Events.GRID_VIEW_LAYOUT_COMPLETE);
  }

  /**
   * Gets an ojbect to pass to packery
   * @param item
   * @returns {*}
   */
  function getPackeryItem(item) {
    return item.element[0];
  }

  /**
   * Users RxJS streams rather than typical JS events. Allows for better
   * sorting and readability
   */
  function configureStreams() {

    _itemOverStream = Rx.Observable.fromEvent(_containerEl[0], 'mouseover')
      .filter(filterForMouseEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function (id) {
        selectItemByID(id);
      });

    _itemOutStream = Rx.Observable.fromEvent(_containerEl[0], 'mouseout')
      .filter(filterForMouseEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function (id) {
        deselectItemByID(id);
      });

    _itemSelectStream = Rx.Observable.fromEvent(_containerEl[0], 'click')
      .filter(filterForMouseEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function(id) {
        depressItemByID(id);
        _eventDispatcher.publish(APP.Events.ITEM_SELECT, id);
      });

  }

  function filterForMouseEventsOnItems(evt) {
    evt.preventDefault();

    var target = evt.target;

    if(target === null) {
      return false;
    }

    // Need to traverse up the DOM for IE9
    var el = getTargetElMatching(target, '.item__content');
    if(el){
      return el.tagName.toLowerCase() === 'ul';
    }
    return false;
  }

  function getMouseEventTargetID(evt) {
    var target = getTargetElMatching(evt.target, '.item__content');
    return target.getAttribute('data-value');
  }

  function getTargetElMatching(el, cls) {
    return $(el).closest(cls)[0];
  }

  /**
   * The rationale here
   * 1. on start, register where the finger was on the screen
   * 2. update position on touch move
   * 3. on end, compare that the where the finger was
   * 4. if it's less than the tolerance, show the item
   * 5. if not, then it was probably a drag/scroll and ignore it
   * based on https://github.com/filamentgroup/tappy/blob/master/tappy.js
   */
  function configureMobileStreams() {
    // Note - had problems getting RxJS to work correctly here, used events
    _containerEl[0].addEventListener('touchstart', function(evt) {
      _firstTouchPosition = _lastTouchPosition = TouchUtils.getCoords(evt);
      _shouldProcessTouchEnd = false;
    }, false);

    _containerEl[0].addEventListener('touchmove', function(evt) {
      _lastTouchPosition = TouchUtils.getCoords(evt);
    }, false);

    _itemSelectStream = Rx.Observable.fromEvent(_containerEl[0], 'touchend')
      .filter(processTouchEndEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function(id) {
        if(_shouldProcessTouchEnd) {
          depressItemByID(id);
          _eventDispatcher.publish(APP.Events.ITEM_SELECT, id);
        }
      });

  }

  function processTouchEndEventsOnItems(evt) {
    var deltaX = Math.abs(_lastTouchPosition[0] - _firstTouchPosition[0]),
        deltaY = Math.abs(_lastTouchPosition[1] - _firstTouchPosition[1]);

    if(deltaX <= _touchDeltaTolerance && deltaY <= _touchDeltaTolerance) {
      _shouldProcessTouchEnd = true;
    }

    return filterForMouseEventsOnItems(evt);
  }

  //----------------------------------------------------------------------------
  //  Items
  //----------------------------------------------------------------------------

  function getItemsInView() {
    return _children
      .filter(function(item) {
        return item.isInViewport();
      })
      .filter(function(item) {
        return item.visible;
      })
      .map(function(item) {
        return item.element;
      });
  }

  function getItemByID(id) {
    var i = 0,
        len = _children.length;
    for(; i<len; i++ ) {
      if(_children[i].getID() === id) {
        return _children[i];
      }
    }

    return null;
  }

  function deselectAllItems() {
    var i = 0,
        len = _children.length;
    for(; i<len; i++ ) {
      _children[i].deselect();
    }
  }

  function selectItemByID(id) {
    if(_isLayingOut) {
      return;
    }

    var item = getItemByID(id);
    if(item !== null) {
      deselectAllItems();
      elementToTop(item.element);
      item.select();
      resetOtherItems(item.element);
    }
  }

  function deselectItemByID(id) {
    if(_isLayingOut) {
      return;
    }

    var item = getItemByID(id);
    if(item !== null) {
      item.deselect();
      unfadeOtherItems(item.element);
    }
  }

  function depressItemByID(id) {
    if(_isLayingOut) {
      return;
    }

    var item = getItemByID(id);
    if(item !== null) {
      item.depress();
      unfadeOtherItems(item.element);
    }
  }

  /**
   * Raises an item to the top of the view stack so it appears above other items
   * @param element
   */
  function elementToTop(element) {
    element.css({'z-index':++_highestZ});
  }

  //----------------------------------------------------------------------------
  //  Fade items OTHER than the one your mouse is over
  //----------------------------------------------------------------------------

  /**
   * Gets a list of all items in the viewport excluding a certain one.
   * Used to fade other items on mouse over
   * @param excluded
   * @returns {*}
   */
  function getItemsInViewExcluding(excluded) {
    var items = getItemsInView(),
      idx = items.indexOf(excluded);

    if(idx > -1) {
      items.splice(idx, 1);
    }

    return items;
  }

  function fadeOtherItems(itemel) {
    if(_isLayingOut) {
      return;
    }

    var otheritems = getItemsInViewExcluding(itemel);
    TweenMax.killDelayedCallsTo(otheritems);
    TweenMax.to(otheritems, 5, {scale:0.9, alpha:0.25, ease:Quad.easeIn, delay: 1});
  }

  // TODO merge this with unfade
  function resetOtherItems(itemel) {
    if(_isLayingOut) {
      return;
    }

    var otheritems = getItemsInViewExcluding(itemel);
    TweenMax.killDelayedCallsTo(otheritems);
    TweenMax.to(otheritems, 0.25, {scale:1, alpha:1, ease:Quad.easeOut, onComplete: fadeOtherItems, onCompleteParams: [itemel]});
  }

  function unfadeOtherItems(itemel) {
    if(_isLayingOut) {
      return;
    }

    var otheritems = getItemsInViewExcluding(itemel);
    TweenMax.killDelayedCallsTo(otheritems);
    TweenMax.to(otheritems, 0.25, {scale:1, alpha:1, ease:Quad.easeOut});
  }

  //----------------------------------------------------------------------------
  //  Updates
  //----------------------------------------------------------------------------

  /**
   * Shows or hides an item based on it's presence in the visibleArray.
   * Items NOT in in the array are hidden. This array is generated in the model
   * based on filtering criteria
   * @param visibleArray
   */
  function updateItemVisibility(visibleArray) {
    var len = visibleArray.length;

    _children.forEach(function(item) {
      var i = 0,
          found = false;

      for(; i<len; i++) {
        if(item.getID() === visibleArray[i].id) {
          found = true;
          break;
        }
      }

      if(found) {
        showItem(item);
      } else {
        hideItem(item);
      }
    });

    setNumItemsVisible(visibleArray.length);

    _isLayingOut = true;

    _packery.layout();
  }

  function showItem(item) {
    _packery.unignore(getPackeryItem(item));
    item.show();
  }

  function hideItem(item) {
    // Raised to top so that the fade out animation is visible over shown items
    elementToTop(item.element);
    _packery.ignore(getPackeryItem(item));
    item.hide();
  }

  function showAllItems() {
    _children.forEach(function(item) {
      showItem(item);
    });

    setNumItemsVisible(_children.length);

    _packery.layout();
  }

  return {
    initialize: initialize,
    render: render,
    showAllItems: showAllItems,
    updateItemVisibility: updateItemVisibility,
    getNumItemsVisible: getNumItemsVisible
  };

}());

//----------------------------------------------------------------------------
//  Grid Items
//----------------------------------------------------------------------------

APP.createNameSpace('APP.AppView.ItemGridView.AbstractGridItem');
APP.AppView.ItemGridView.AbstractGridItem = {
  state: {
    visible: true,
    selected: false
  },

  methods: {
    eventDispatcher: APP.EventDispatcher,
    data: null,
    template: '',
    renderedHTML: null,
    element: null,
    elementContent: null,
    dataEl: null,
    imageEl: null,
    imageAlphaTarget: 0.25,

    getID: function() {
      if(this.data) {
        return this.data.id;
      }

      return null;
    },

    initialize: function(data) {
      this.data = data;
      this.render();
    },

    render: function() {
      var templateHTML = '<div class="item"><ul class="item__content <%= categories[0] %>" data-value="<%= id %>">' +
        '<li class="item__image"><div class="item__image-wrapper"><img src="<%= previewImage %>"></div></li>' +
        '<ul class="item__data">' +
        '<li class="item__data-title"><%= title %></li>' +
        '<ul class="item__data-metadata">' +
        '<li class="left">' +
        '<% _.each(categories, function(cat) { %>' +
        '<i class="fa fa-cube"></i><%= cat %>' +
        '<% }); %>' +
        '</li>' +
        '<li class="right"><i class="fa fa-puzzle-piece"></i><%= complexity %></li>' +
        '</ul>' +
        '</ul>' +
        '</li>' +
        '</ul></div>';
      this.template = _.template(templateHTML);

      this.renderedHTML = this.template(this.data);

      this.element = $(this.renderedHTML);
      this.elementContent = this.element.find('.item__content');
      this.dataEl = this.element.find('.item__data');
      this.imageEl = this.element.find('.item__image-wrapper');
    },

    /**
     * Calculations needed after the items is added to the container is on the DOM
     */
    postRender: function() {
      var titleHeight = this.dataEl.find('.title').height();
      var dataHeight = this.dataEl.height();
      this.dataBottomTarget = titleHeight - dataHeight;
      this.dataEl.css({'bottom' : this.dataBottomTarget});

      this.imageAlphaTarget = this.imageEl.css('opacity');
    },

    isInViewport: function() {
      return DOMUtils.isElementInViewport(this.element[0]);
    },

    show: function() {
      if(this.visible || this.element === undefined) {
        return;
      }
      this.visible = true;

      if(this.isInViewport()) {
        TweenMax.to(this.element, 0.25, { autoAlpha: 1, scale:1, ease: Circ.easeOut});
      } else {
        TweenMax.to(this.element, 0, { autoAlpha: 1, scale: 1});
      }
    },

    hide: function() {
      if(!this.visible || this.element === undefined) {
        return;
      }
      this.visible = false;

      if(this.isInViewport()) {
        TweenMax.to(this.element, 1, {autoAlpha: 0, scale:0.25, ease: Expo.easeOut, onComplete:this.resetHiddenItemSize.bind(this)});
      } else {
        TweenMax.to(this.element, 0, {autoAlpha: 0, scale:0.25, onComplete:this.resetHiddenItemSize.bind(this)});
      }

    },

    /**
     * Resetting the elements size prevents odd packery behavior as it tries to fit resizing items
     */
    resetHiddenItemSize: function() {
      TweenMax.to(this.element, 0, { scale: 1});
    },

    toggleVisibility: function() {
      if(this.visible) {
        this.hide();
      } else {
        this.show();
      }
    },

    /**
     * On item mouse over
     */
    select: function() {
      if(this.selected || this.element === undefined || !this.visible) {
        return;
      }
      this.selected = true;

      //boxShadow: "5px 5px 20px rgba(0,0,0,.25)",
      TweenMax.to(this.element,0.25, {scale: 1.05, ease:Back.easeOut});
      TweenMax.to(this.imageEl, 1, {alpha: 1, scale: 1.25, ease:Circ.easeOut});
    },

    /**
     * On item click / tap
     */
    depress: function() {
      if(this.element === undefined || !this.visible) {
        return;
      }

      var tl = new TimelineMax();
      tl.to(this.element,0.1, {scale:0.8, ease: Quad.easeOut});
      tl.to(this.element,0.5, {scale:1, ease: Elastic.easeOut});

      TweenMax.to(this.imageEl,0.5, {alpha:this.imageAlphaTarget, scale: 1, ease:Circ.easeOut});
    },

    /**
     * On item mouse out
     */
    deselect: function() {
      if(!this.selected || this.element === undefined || !this.visible) {
        return;
      }
      this.selected = false;

      //boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      TweenMax.to(this.element,0.5, {scale: 1, ease:Back.easeOut});
      TweenMax.to(this.imageEl,0.5, {alpha:this.imageAlphaTarget, scale: 1, ease:Circ.easeOut});
    },

    toggleSelect: function() {
      if(this.selected) {
        this.deselect();
      } else {
        this.select();
      }
    }

  },

  closures: []
};;APP.createNameSpace('APP.AppView.ItemDetailView');

APP.AppView.ItemDetailView = (function() {
  var _containerEl,
      _itemDTemplate,
      _itemDTemplateSrc,
      _messageTemplate,
      _messageTemplateSrc,
      _floatImageView,
      _shareButtonEl,
      _currentItem;

  function initialize(elID) {
    _containerEl = $(elID);

    _floatImageView = APP.AppView.FloatImageView;
    _floatImageView.initialize();

    _itemDTemplateSrc = ''
    +'<div class="details__content">'

      +'<div class="details__content-title">'
       +'<h1><%= title %></h1>'
      +'</div>'
      +'<div class="details__content-description">'
          +'<div class="details__content-extras">'
            +'<button id="details__content-share-button" class="basic-button share-button"><i class="fa fa-share-alt"></i><em>Share</em></button>'
          +'</div>'
          +'<div class="details__content-description-data">'
            +'<ul>'
              +'<li class="lob icon-left"><i class="fa fa-building"></i>Created for <em><%= companyArea %></em></li>'
              +'<li class="date icon-left"><i class="fa fa-calendar"></i>Completed on <em><%= dateCompleted %></em></li>'
              +'<li class="duration icon-left"><i class="fa fa-clock-o"></i>The solution is <em><%= duration %></em> long</li>'
              +'<li class="complexity icon-left"><i class="fa fa-puzzle-piece"></i><em><%= complexity %></em> complexity</li>'
            +'</ul>'
          +'</div>'

        +'<div class="details__content-preview-images">'
          +'<ul>'
          +'<% _.each(images, function(image) { %>'
          +'<li><div class="floatimage__srcimage"><img src="<%= image %>" alt="<%= title %> preview image"></div></li>'
          +'<% }); %>'
          +'</ul>'
        +'</div>'
        +'<%= description %>'
        +'<div class="details__content-description-metadata">'
          +'<ul>'
          +'<% _.each(categories, function(cat) { %>'
          +'<li class="type icon-left"><i class="fa fa-cube"></i><%= cat %></li>'
          +'<% }); %>'
          +'<% _.each(tags, function(tag) { %>'
          +'<li class="type icon-left"><i class="fa fa-tag"></i><%= tag %></li>'
          +'<% }); %>'
          +'</ul>'
        +'</div>'
        +'<div class="details__content-links">'
          +'<ul>'
          +'<% _.each(links, function(link) { %>'
          +'<li class="icon-left"><a href="<%= link %>" target="_blank"><i class="fa fa-external-link"></i><%= link %></a></li>'
          +'<% }); %>'
          +'</ul>'
        +'</div>'
      +'</div>'
    +'</div>';

    _itemDTemplate = _.template(_itemDTemplateSrc);

    _messageTemplateSrc = ''
      +'<div class="details__content">'
      +'<div class="details__content-title">'
      +'<h1><%= title %></h1>'
      +'</div>'
      +'<div class="details__content-description">'
      +'<%= description %>'
      +'</div>'
      +'</div>';

    _messageTemplate = _.template(_messageTemplateSrc);
  }

  function showItem(item) {
    _currentItem = item;

    _containerEl.html(_itemDTemplate(_currentItem));

    _floatImageView.apply(_containerEl.find('.details__content-preview-images'));

    _shareButtonEl = document.getElementById('details__content-share-button');
    _shareButtonEl.addEventListener(APP.globals().mouseClickEvtStr, doShareAction, false);

    TweenMax.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
  }

  function doShareAction() {
    var shareStr = 'mailto:?subject=I\'m sharing: '
      +_currentItem.title+'&body=I thought you would like this ... <br><br>'
      +'<a href="'+document.location.href+'">'+_currentItem.title+'</a><br><br>'
      +_currentItem.description;
    var shareWin = window.open(shareStr);
    //shareWin.close();
  }

  function showMessage(obj) {
    _containerEl.html(_messageTemplate(obj));

    TweenMax.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
  }

  function hide() {
    _currentItem = null;

    _floatImageView.remove(_containerEl.find('.preview-images'));

    if(_shareButtonEl) {
      _shareButtonEl.removeEventListener(APP.globals().mouseClickEvtStr, doShareAction);
    }

    TweenMax.killDelayedCallsTo(_containerEl);
    TweenMax.to(_containerEl, 0.25, {autoAlpha: 0, ease:Quad.easeOut, delay:0.1});
  }

  return {
    initialize: initialize,
    showItem: showItem,
    showMessage: showMessage,
    hide: hide
  };

}());;APP.createNameSpace('APP.AppView.FloatImageView');
APP.AppView.FloatImageView = (function() {

  var _coverDivID = '#floatimage__cover',
      _floatingImageClass = '.floatimage__srcimage',
      _zoomedImageClass = 'floatimage__zoomedimage',
      _viewPortCoverEl,
      _viewPortCoverClickStream,
      _captionEl,
      _currentImageElement,
      _window = $(window);

  /**
   * Entry point, initialize elements and hide cover
   */
  function initialize() {
    _viewPortCoverEl = $(_coverDivID);

    _captionEl = _viewPortCoverEl.find('.floatimage__caption');

    hideFloatImageCover();

    _viewPortCoverClickStream = Rx.Observable.fromEvent(_viewPortCoverEl[0], APP.globals().mouseClickEvtStr)
      .subscribe(function() {
        hideFloatImageCover();
      });
  }

  /**
   * Apply functionality to div/container of div>img 's
   * @param container
   */
  function apply(container) {
    getFloatingElementsInContainer(container).forEach(function(el) {
      $(el).wrapInner('<div class="floatimage__wrapper" />');
      el.addEventListener(APP.globals().mouseClickEvtStr, onImageClick, false);
    });
  }

  /**
   * Show the image when the image element is clicked
   * @param evt
   */
  function onImageClick(evt) {
    showImage(evt.target);
  }

  /**
   * Present the image that was clicked
   * @param imageEl
   */
  function showImage(imageEl) {
    // Will happen if you click on the icon
    if(imageEl.tagName.toLowerCase() === 'div') {
      _currentImageElement = $(imageEl).find('img');
    } else {
      _currentImageElement = $(imageEl);
    }

    // Calculations
    var vpFill = 0.75,
        imgSrc = _currentImageElement.attr('src'),
        imgAlt = _currentImageElement.attr('alt'),
        imgWidth = _currentImageElement.width(),
        imgHeight = _currentImageElement.height(),
        imgPosition = _currentImageElement.offset(),
        imgRatio = imgWidth/imgHeight,
        imgTargetScale = 1,
        vpWidth = _window.width(),
        vpHeight = _window.height(),
        vpScrollTop = _window.scrollTop(),
        vpScrollLeft = _window.scrollLeft(),
        vpRatio = vpWidth / vpHeight,
        imgOriginX = imgPosition.left - vpScrollLeft,
        imgOriginY = imgPosition.top - vpScrollTop,
        imgTargetX,
        imgTargetY,
        imgTargetWidth,
        imgTargetHeight;

    if(vpRatio > imgRatio) {
      imgTargetScale = vpHeight * vpFill / imgHeight;
    } else {
      imgTargetScale = vpWidth * vpFill / imgWidth;
    }

    imgTargetWidth = imgWidth * imgTargetScale;
    imgTargetHeight = imgHeight * imgTargetScale;

    imgTargetX = (vpWidth / 2) - (imgTargetWidth/2) - imgPosition.left + vpScrollLeft;
    imgTargetY = (vpHeight / 2) - (imgTargetHeight/2) - imgPosition.top + vpScrollTop;

    var zoomImage = $('<div class="'+_zoomedImageClass+'"></div>');
    zoomImage.css({ 'background-image': 'url("'+imgSrc+'")',
      'top': imgOriginY,
      'left': imgOriginX,
      'width': imgWidth,
      'height': imgHeight });

    _viewPortCoverEl.append(zoomImage);

    // Animate
    TweenMax.to(_currentImageElement, 0.25, {alpha:0, ease:Circ.easeOut});
    TweenMax.to(zoomImage, 0.5, {width: imgTargetWidth, height: imgTargetHeight, x: imgTargetX, y: imgTargetY, ease:Circ.easeOut});
    showFloatImageCover();

    // Caption
    if(imgAlt.length >= 1) {
      _captionEl.html('<p>'+imgAlt+'</p>');
    } else {
      _captionEl.html('');
    }

  }

  /**
   * Remove functionality to div/container of div>img 's
   * @param container
   */
  function remove(container) {
    if(!container) {
      console.log('[FloatingImagesView] nothing to remove from');
      return;
    }

    getFloatingElementsInContainer(container).forEach(function(el) {
      $(el).unwrap();
      el.removeEventListener('click', onImageClick);
    });
  }

  /**
   * Validate that the container is a jQuery object
   * @param container
   * @returns {*}
   */
  function validateFloatingContainer(container) {
    if(container instanceof jQuery) {
      return container;
    } else {
      // TODO test for a string? etc?
      console.log('[FloatingImagesView] Container is not a jQuery object');
      return null;
    }
  }

  /**
   * Get array of a's to apply functionality to
   * @param container
   * @returns {*}
   */
  function getFloatingElementsInContainer(container) {
    return validateFloatingContainer(container).find(_floatingImageClass).toArray();
  }

  /**
   * Show the div covering the UI
   */
  function showFloatImageCover() {
    TweenMax.to(_viewPortCoverEl,0.25, {autoAlpha: 1, ease:Circ.easeOut});
  }

  /**
   * Hide the div covering the UI
   */
  function hideFloatImageCover() {
    if(_currentImageElement) {
      TweenMax.to(_currentImageElement, 0.1, {alpha:1, ease:Circ.easeOut});
      _currentImageElement = null;
    }

    TweenMax.to(_viewPortCoverEl,0.25, {autoAlpha: 0, ease:Circ.easeOut, onComplete:hideFloatImageCoverComplete});
  }

  /**
   * The enlarged image is present during the cover fade out, remove it when that's completed
   */
  function hideFloatImageCoverComplete() {
    _viewPortCoverEl.find('.'+_zoomedImageClass).remove();
  }

  /**
   * Public API
   */
  return {
    initialize: initialize,
    apply: apply,
    remove: remove
  };

}());;APP.createNameSpace('APP.AppView.TagBarView');

APP.AppView.TagBarView = (function() {
  var _containerEl,
      _tagTemplate,
      _currentTags;

  function initialize(elID) {
    _containerEl = $(elID);
    _currentTags = [];

    _tagTemplate = _.template('<div class="tag"><%= tag %></div>');

    hideBar();
  }

  /**
   * add or removes as necessary
   * @param newTags
   */
  function update(newTags) {
    if(newTags.length) {

      var currenttags = _currentTags.map(function(tag) { return tag.label; }),
          tagsToAdd = ArrayUtils.getDifferences(newTags, currenttags),
          tagsToRemove = ArrayUtils.getDifferences(currenttags, newTags);

      tagsToRemove.forEach(function (tag) {
        remove(tag);
      });

      tagsToAdd.forEach(function (tag) {
        add(tag);
      });

      showBar();

    } else {
      removeAll();
      hideBar();
    }

  }

  function showBar() {
    TweenMax.to(_containerEl, 0.25, {autoAlpha: 1, ease: Circ.easeIn});
  }

  function hideBar() {
    TweenMax.to(_containerEl, 0.25, {autoAlpha: 0, ease: Circ.easeIn});

  }

  function add(tag) {
    var tagel = $(_tagTemplate({tag: tag}));

    _containerEl.append(tagel);
    _currentTags.push({label: tag, el: tagel});

    TweenMax.from(tagel,0.5,{alpha:0, y:'15px', ease:Quad.easeOut});
  }

  function remove(tag) {
    var rmv = _currentTags.filter(function(tagobj) {
      if(tagobj.label === tag) {
        return true;
      }
      return false;
    })[0];

    if(rmv) {
      rmv.el.remove();
      _currentTags.splice(_currentTags.indexOf(rmv),1);
    }
  }

  function removeAll() {
    _currentTags.forEach(function(tag) {
      tag.el.remove();
    });
    _currentTags = [];
  }

  return {
    initialize: initialize,
    update: update
  };

}());;APP.createNameSpace('APP.AppController');
APP.AppController = function () {
  var _appScope,
      _globalScope,
      _viewParent,
      _model,
      _view,
      _eventDispatcher,
      _router,
      _self;

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize(app, global, viewParent) {
    _appScope = app;
    _globalScope = global;
    _viewParent = viewParent;
    _self = this;
    _eventDispatcher = APP.EventDispatcher;
    _router = APP.AppController.Router;

    _router.initialize();

    mapCommand(APP.Events.CONTROLLER_INITIALIZED, _self.AppInitializedCommand, true);

    initializeView();
  }

  function mapCommand(evt, command, once) {
    once = once || false;
    APP.EventCommandMap.map(evt, command, once);
  }

  function initializeView() {
    _view = APP.AppView;
    _eventDispatcher.subscribe(APP.Events.VIEW_INITIALIZED, onViewInitalized, true);
    _eventDispatcher.subscribe(APP.Events.VIEW_RENDERED, onViewRendered, true);
    _view.initialize(_appScope, _viewParent);
  }

  function onViewInitalized() {
    _view.render();
  }

  function onViewRendered() {
    initializeModel();
  }

  function initializeModel() {
    _model = APP.AppModel;
    _eventDispatcher.subscribe(APP.Events.MODEL_INITIALIZED, onModelInitialized, true);
    _eventDispatcher.subscribe(APP.Events.MODEL_DATA_LOADED, onModelDataLoaded, true);
    _model.initialize();
  }

  function onModelInitialized() {
    _model.loadModelData();
  }

  function onModelDataLoaded() {
    _eventDispatcher.publish(APP.Events.CONTROLLER_INITIALIZED);

    //AppInitializedCommand takes over here
  }

  function postInitialize() {
    mapCommand(APP.Events.URL_HASH_CHANGED, _self.URLHashChangedCommand);
    //mapCommand(APP.Events.VIEW_CHANGED, _self.ViewChangedCommand);
    mapCommand(APP.Events.VIEW_CHANGE_TO_MOBILE, _self.ViewChangedToMobileCommand);
    mapCommand(APP.Events.VIEW_CHANGE_TO_DESKTOP, _self.ViewChangedToDesktopCommand);

    mapCommand(APP.Events.BROWSER_RESIZED, _self.BrowserResizedCommand);
    mapCommand(APP.Events.BROWSER_SCROLLED, _self.BrowserScrolledCommand);

    mapCommand(APP.Events.SEARCH_INPUT, _self.SearchInputCommand);
    mapCommand(APP.Events.GRID_VIEW_ITEMS_CHANGED, _self.GridViewItemsVisibleChangedCommand);
    mapCommand(APP.Events.ITEM_SELECT, _self.ItemSelectCommand);
    mapCommand(APP.Events.MENU_SELECT, _self.MenuSelectionCommand);
    mapCommand(APP.Events.VIEW_ALL_FILTERS_CLEARED, _self.ClearAllFiltersCommand);
    mapCommand(APP.Events.DATA_FILTER_CHANGED, _self.DataFiltersChangedCommand);

    mapCommand(APP.Events.RESUME_FROM_MODEL_STATE, _self.ResumeFromModelStateCommand);
  }

  return {
    initialize: initialize,
    postIntialize: postInitialize,
    createCommand: ObjectUtils.basicFactory
  };

}();;APP.createNameSpace('APP.AppController.Router');
APP.AppController.Router = function () {
  var _eventDispatcher,
      _lastSetPath;

  function initialize() {
    _eventDispatcher = APP.EventDispatcher;
    _lastSetPath = '';

    configureStreams();
  }

  function configureStreams() {
    window.addEventListener('hashchange', onHashChange, false);
  }

  function onHashChange(evt) {
    evt.preventDefault();
    var hash = getURLHash();
    if(hash === _lastSetPath) {
      return;
    }
    if(hash) {
      _eventDispatcher.publish(APP.Events.URL_HASH_CHANGED, hash);
    }
  }

  /**
   * Returns everything after the 'whatever.html#' in the URL
   * Leading and trailing slashes are removed
   * reference- http://lea.verou.me/2011/05/get-your-hash-the-bulletproof-way/
   *
   * @returns {string}
   */
  function getURLHash() {
    var hash = location.hash.slice(1);
    return hash.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  function updateURLHash(path) {
    DEBUGGER.log('Update URL: '+path);

    _lastSetPath = path;

    window.location.hash = path;
  }

  return {
    initialize: initialize,
    getRoute: getURLHash,
    setRoute: updateURLHash
  };

}();;APP.createNameSpace('APP.AppController.AbstractCommand');

/*
Simplified implementation of Stamps
  http://ericleads.com/2014/02/prototypal-inheritance-with-stamps/
From
  https://www.barkweb.co.uk/blog/object-composition-and-prototypical-inheritance-in-javascript
 */

APP.AppController.AbstractCommand = {
  state: {},

  methods: {

    app: APP,
    appController: APP.AppController,
    appModel: APP.AppModel,
    appView: APP.AppView,
    eventDispatcher: APP.EventDispatcher,

    execute: function(data) {
      DEBUGGER.log('Abstract command executing with data: '+data);
    }
  },

  closures: []
};

// Template

APP.createNameSpace('APP.AppController.TestingTestingCommand');
APP.AppController.TestingTestingCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.TestingTestingCommand.execute = function(data) {
  console.log('!!! TestingTestingCommand with data "'+data+'"');
};
;APP.createNameSpace('APP.AppController.AppInitializedCommand');
APP.AppController.AppInitializedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.AppInitializedCommand.execute = function(data) {
  this.appController.postIntialize();


  this.appView.removeLoadingMessage();

  this.appView.initializeMenus(this.appModel.getMenuData());
  this.appView.initializeGridView(this.appModel.getData());

  var initialRoute = APP.AppController.Router.getRoute();

  console.log('Initial route: '+initialRoute);

  //var initialRoute = 'Human_Resources/Information_Technology/item-category2/item-category4/High/1_hour(z)/paper_based';

  // Code also present in URLHashChangeCommand
  if (initialRoute !== undefined) {
    this.appModel.parseFiltersFromUrl(initialRoute);

  } else {
    //this.appView.showBigMessage('Welcome to the ALPHA BR&L Solutions Gallery', '<p>Here you will find a selection of the work produced by the Business Readiness and Learning team.</p><p>To get started, click anywhere in the blue area to the left and browse.</p><p><em>This is still a work in progress. For comments, please email Matt Perkins.</em></p>');
  }

};

;APP.createNameSpace('APP.AppController.BrowserResizedCommand');
APP.AppController.BrowserResizedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.BrowserResizedCommand.execute = function(data) {
  //DEBUGGER.log('BrowserResizedCommand: '+data.width + 'w, ' + data.height + 'h');
};;APP.createNameSpace('APP.AppController.BrowserScrolledCommand');
APP.AppController.BrowserScrolledCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.BrowserScrolledCommand.execute = function(data) {
  //DEBUGGER.log('BrowserScrolledCommand: '+data.left + 'l, ' + data.top + 't');
};;APP.createNameSpace('APP.AppController.ClearAllFiltersCommand');
APP.AppController.ClearAllFiltersCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ClearAllFiltersCommand.execute = function(data) {
  this.appModel.removeAllFilters();
  this.appView.clearAllFilters();
};;APP.createNameSpace('APP.AppController.DataFiltersChangedCommand');
APP.AppController.DataFiltersChangedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.DataFiltersChangedCommand.execute = function(data) {

  //console.log('Filters: '+this.appModel.getFiltersForTagBar());

  var filterList = this.appModel.getFiltersForTagBar();

  this.appView.updateUIOnFilterChanges();
  this.appView.updateTagBarDisplay(filterList);
  this.appView.updateGridItemVisibility(this.appModel.getDataMatchingFilters());

  APP.AppController.Router.setRoute(this.appModel.getFiltersForURL());
};;APP.createNameSpace('APP.AppController.GridViewItemsVisibleChangedCommand');
APP.AppController.GridViewItemsVisibleChangedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.GridViewItemsVisibleChangedCommand.execute = function(data) {
  var message = data ? 'Showing '+data+' matches' : 'No matches found';
  this.appView.updateSearchHeader(message);
};;APP.createNameSpace('APP.AppController.ItemSelectCommand');
APP.AppController.ItemSelectCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ItemSelectCommand.execute = function(data) {
  //DEBUGGER.log('ItemSelectCommand: '+data);

  if(data) {
    var itemObject = this.appModel.getItemObjectForID(data);

    if(itemObject !== null) {
      this.appModel.setCurrentItem(itemObject.id);
      this.appView.showItemDetailView(itemObject);
    } else {
      DEBUGGER.log('[ItemSelectCommand] Cannot show details for item id "'+data+'", not found.');
    }
  } else {
    this.appModel.setCurrentItem('');
  }

  APP.AppController.Router.setRoute(this.appModel.getFiltersForURL());
};;APP.createNameSpace('APP.AppController.MenuSelectionCommand');
APP.AppController.MenuSelectionCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.MenuSelectionCommand.execute = function(data) {
  //DEBUGGER.log('MenuSelectionCommand: '+data);
  this.appModel.toggleFilter(data);
};;APP.createNameSpace('APP.AppController.ResumeFromModelStateCommand');
APP.AppController.ResumeFromModelStateCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ResumeFromModelStateCommand.execute = function(data) {

  var filters = data.filters,
      search = data.search,
      item = data.item;

  console.log('ResumeFromModel State, filters: '+filters+', search: '+search+', item: '+item);

  if(filters) {
    this.appModel.setMultipleFilters(filters);
    this.appView.updateMenuSelections(this.appModel.getFiltersForTagBar());
  }

  if(search) {
    this.appView.setFreeTextFilterValue(search);
  }

  if(item) {
    APP.EventDispatcher.publish(APP.Events.ITEM_SELECT, item);
  }

};

;APP.createNameSpace('APP.AppController.SearchInputCommand');
APP.AppController.SearchInputCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.SearchInputCommand.execute = function(data) {

  this.appModel.setCurrentFreeTextFilter(data);

  //if(data.length > 2) {
  //  var filteredData = this.appModel.getDataMatchingFreeText(data);
  //  this.appView.updateGridItemVisibility(filteredData);
  //} else {
  //  this.appView.removeFreeTextFilter();
  //}

};;APP.createNameSpace('APP.AppController.URLHashChangedCommand');
APP.AppController.URLHashChangedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.URLHashChangedCommand.execute = function(data) {
  DEBUGGER.log('URLHashChangedCommand: '+data);

  // Code also present in AppInitializedCommand
  if (data !== undefined) {
    this.appModel.parseFiltersFromUrl(data);
    this.appView.updateMenuSelections(this.appModel.getFiltersForTagBar());
  }

};;APP.createNameSpace('APP.AppController.ViewChangedCommand');
APP.AppController.ViewChangedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ViewChangedCommand.execute = function(data) {
  DEBUGGER.log('ViewChangedCommand: '+data);
};;APP.createNameSpace('APP.AppController.ViewChangedToDesktopCommand');
APP.AppController.ViewChangedToDesktopCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ViewChangedToDesktopCommand.execute = function(data) {
  DEBUGGER.log('ViewChangedToDesktopCommand: '+data);
};;APP.createNameSpace('APP.AppController.ViewChangedToMobileCommand');
APP.AppController.ViewChangedToMobileCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ViewChangedToMobileCommand.execute = function(data) {
  DEBUGGER.log('ViewChangedToMobileCommand: '+data);

  // Searching isn't support in mobile views yet
  this.appModel.setCurrentFreeTextFilter('');
  this.appView.clearFreeTextFilter();
};;//------------------------------------------------------------------------------
//  Initialization
//------------------------------------------------------------------------------



(function () {

  APP.initialize();

  if(APP.globals().notSupported) {
    alert("Your browser is not supported! Please use Firefox, Chrome or Safari.");
  }

}());