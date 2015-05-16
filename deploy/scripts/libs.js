/*!
 * VERSION: 1.16.1
 * DATE: 2015-03-13
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(t,e){"use strict";var i=t.GreenSockGlobals=t.GreenSockGlobals||t;if(!i.TweenLite){var s,r,n,a,o,l=function(t){var e,s=t.split("."),r=i;for(e=0;s.length>e;e++)r[s[e]]=r=r[s[e]]||{};return r},h=l("com.greensock"),_=1e-10,u=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},m=function(){},f=function(){var t=Object.prototype.toString,e=t.call([]);return function(i){return null!=i&&(i instanceof Array||"object"==typeof i&&!!i.push&&t.call(i)===e)}}(),c={},p=function(s,r,n,a){this.sc=c[s]?c[s].sc:[],c[s]=this,this.gsClass=null,this.func=n;var o=[];this.check=function(h){for(var _,u,m,f,d=r.length,v=d;--d>-1;)(_=c[r[d]]||new p(r[d],[])).gsClass?(o[d]=_.gsClass,v--):h&&_.sc.push(this);if(0===v&&n)for(u=("com.greensock."+s).split("."),m=u.pop(),f=l(u.join("."))[m]=this.gsClass=n.apply(n,o),a&&(i[m]=f,"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+s.split(".").pop(),[],function(){return f}):s===e&&"undefined"!=typeof module&&module.exports&&(module.exports=f)),d=0;this.sc.length>d;d++)this.sc[d].check()},this.check(!0)},d=t._gsDefine=function(t,e,i,s){return new p(t,e,i,s)},v=h._class=function(t,e,i){return e=e||function(){},d(t,[],function(){return e},i),e};d.globals=i;var g=[0,0,1,1],T=[],y=v("easing.Ease",function(t,e,i,s){this._func=t,this._type=i||0,this._power=s||0,this._params=e?g.concat(e):g},!0),w=y.map={},P=y.register=function(t,e,i,s){for(var r,n,a,o,l=e.split(","),_=l.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--_>-1;)for(n=l[_],r=s?v("easing."+n,null,!0):h.easing[n]||{},a=u.length;--a>-1;)o=u[a],w[n+"."+o]=w[o+n]=r[o]=t.getRatio?t:t[o]||new t};for(n=y.prototype,n._calcEnd=!1,n.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,s=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?s*=s:2===i?s*=s*s:3===i?s*=s*s*s:4===i&&(s*=s*s*s*s),1===e?1-s:2===e?s:.5>t?s/2:1-s/2},s=["Linear","Quad","Cubic","Quart","Quint,Strong"],r=s.length;--r>-1;)n=s[r]+",Power"+r,P(new y(null,null,1,r),n,"easeOut",!0),P(new y(null,null,2,r),n,"easeIn"+(0===r?",easeNone":"")),P(new y(null,null,3,r),n,"easeInOut");w.linear=h.easing.Linear.easeIn,w.swing=h.easing.Quad.easeInOut;var b=v("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});n=b.prototype,n.addEventListener=function(t,e,i,s,r){r=r||0;var n,l,h=this._listeners[t],_=0;for(null==h&&(this._listeners[t]=h=[]),l=h.length;--l>-1;)n=h[l],n.c===e&&n.s===i?h.splice(l,1):0===_&&r>n.pr&&(_=l+1);h.splice(_,0,{c:e,s:i,up:s,pr:r}),this!==a||o||a.wake()},n.removeEventListener=function(t,e){var i,s=this._listeners[t];if(s)for(i=s.length;--i>-1;)if(s[i].c===e)return s.splice(i,1),void 0},n.dispatchEvent=function(t){var e,i,s,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)s=r[e],s&&(s.up?s.c.call(s.s||i,{type:t,target:i}):s.c.call(s.s||i))};var k=t.requestAnimationFrame,S=t.cancelAnimationFrame,A=Date.now||function(){return(new Date).getTime()},x=A();for(s=["ms","moz","webkit","o"],r=s.length;--r>-1&&!k;)k=t[s[r]+"RequestAnimationFrame"],S=t[s[r]+"CancelAnimationFrame"]||t[s[r]+"CancelRequestAnimationFrame"];v("Ticker",function(t,e){var i,s,r,n,l,h=this,u=A(),f=e!==!1&&k,c=500,p=33,d="tick",v=function(t){var e,a,o=A()-x;o>c&&(u+=o-p),x+=o,h.time=(x-u)/1e3,e=h.time-l,(!i||e>0||t===!0)&&(h.frame++,l+=e+(e>=n?.004:n-e),a=!0),t!==!0&&(r=s(v)),a&&h.dispatchEvent(d)};b.call(h),h.time=h.frame=0,h.tick=function(){v(!0)},h.lagSmoothing=function(t,e){c=t||1/_,p=Math.min(e,c,0)},h.sleep=function(){null!=r&&(f&&S?S(r):clearTimeout(r),s=m,r=null,h===a&&(o=!1))},h.wake=function(){null!==r?h.sleep():h.frame>10&&(x=A()-c+5),s=0===i?m:f&&k?k:function(t){return setTimeout(t,0|1e3*(l-h.time)+1)},h===a&&(o=!0),v(2)},h.fps=function(t){return arguments.length?(i=t,n=1/(i||60),l=this.time+n,h.wake(),void 0):i},h.useRAF=function(t){return arguments.length?(h.sleep(),f=t,h.fps(i),void 0):f},h.fps(t),setTimeout(function(){f&&5>h.frame&&h.useRAF(!1)},1500)}),n=h.Ticker.prototype=new h.events.EventDispatcher,n.constructor=h.Ticker;var R=v("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=e.immediateRender===!0,this.data=e.data,this._reversed=e.reversed===!0,B){o||a.wake();var i=this.vars.useFrames?q:B;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});a=R.ticker=new h.Ticker,n=R.prototype,n._dirty=n._gc=n._initted=n._paused=!1,n._totalTime=n._time=0,n._rawPrevTime=-1,n._next=n._last=n._onUpdate=n._timeline=n.timeline=null,n._paused=!1;var C=function(){o&&A()-x>2e3&&a.wake(),setTimeout(C,2e3)};C(),n.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},n.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},n.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},n.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},n.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},n.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},n.render=function(){},n.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},n.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&i+this.totalDuration()/this._timeScale>t},n._enabled=function(t,e){return o||a.wake(),this._gc=!t,this._active=this.isActive(),e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},n._kill=function(){return this._enabled(!1,!1)},n.kill=function(t,e){return this._kill(t,e),this},n._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},n._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},n.eventCallback=function(t,e,i,s){if("on"===(t||"").substr(0,2)){var r=this.vars;if(1===arguments.length)return r[t];null==e?delete r[t]:(r[t]=e,r[t+"Params"]=f(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,r[t+"Scope"]=s),"onUpdate"===t&&(this._onUpdate=e)}return this},n.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},n.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},n.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},n.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},n.totalTime=function(t,e,i){if(o||a.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var s=this._totalDuration,r=this._timeline;if(t>s&&!i&&(t=s),this._startTime=(this._paused?this._pauseTime:r._time)-(this._reversed?s-t:t)/this._timeScale,r._dirty||this._uncache(!1),r._timeline)for(;r._timeline;)r._timeline._time!==(r._startTime+r._totalTime)/r._timeScale&&r.totalTime(r._totalTime,!0),r=r._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&(this.render(t,e,!1),z.length&&$())}return this},n.progress=n.totalProgress=function(t,e){return arguments.length?this.totalTime(this.duration()*t,e):this._time/this.duration()},n.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},n.endTime=function(t){return this._startTime+(0!=t?this.totalDuration():this.duration())/this._timeScale},n.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||_,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},n.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},n.paused=function(t){if(!arguments.length)return this._paused;var e,i,s=this._timeline;return t!=this._paused&&s&&(o||t||a.wake(),e=s.rawTime(),i=e-this._pauseTime,!t&&s.smoothChildTiming&&(this._startTime+=i,this._uncache(!1)),this._pauseTime=t?e:null,this._paused=t,this._active=this.isActive(),!t&&0!==i&&this._initted&&this.duration()&&this.render(s.smoothChildTiming?this._totalTime:(e-this._startTime)/this._timeScale,!0,!0)),this._gc&&!t&&this._enabled(!0,!1),this};var D=v("core.SimpleTimeline",function(t){R.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});n=D.prototype=new R,n.constructor=D,n.kill()._gc=!1,n._first=n._last=n._recent=null,n._sortChildren=!1,n.add=n.insert=function(t,e){var i,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(s=t._startTime;i&&i._startTime>s;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._recent=t,this._timeline&&this._uncache(!0),this},n._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,t===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},n.render=function(t,e,i){var s,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)s=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=s},n.rawTime=function(){return o||a.wake(),this._totalTime};var I=v("TweenLite",function(e,i,s){if(R.call(this,i,s),this.render=I.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:I.selector(e)||e;var r,n,a,o=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),l=this.vars.overwrite;if(this._overwrite=l=null==l?Q[I.defaultOverwrite]:"number"==typeof l?l>>0:Q[l],(o||e instanceof Array||e.push&&f(e))&&"number"!=typeof e[0])for(this._targets=a=u(e),this._propLookup=[],this._siblings=[],r=0;a.length>r;r++)n=a[r],n?"string"!=typeof n?n.length&&n!==t&&n[0]&&(n[0]===t||n[0].nodeType&&n[0].style&&!n.nodeType)?(a.splice(r--,1),this._targets=a=a.concat(u(n))):(this._siblings[r]=K(n,this,!1),1===l&&this._siblings[r].length>1&&J(n,this,null,1,this._siblings[r])):(n=a[r--]=I.selector(n),"string"==typeof n&&a.splice(r+1,1)):a.splice(r--,1);else this._propLookup={},this._siblings=K(e,this,!1),1===l&&this._siblings.length>1&&J(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-_,this.render(-this._delay))},!0),E=function(e){return e&&e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},O=function(t,e){var i,s={};for(i in t)G[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!U[i]||U[i]&&U[i]._autoCSS)||(s[i]=t[i],delete t[i]);t.css=s};n=I.prototype=new R,n.constructor=I,n.kill()._gc=!1,n.ratio=0,n._firstPT=n._targets=n._overwrittenProps=n._startAt=null,n._notifyPluginsOfEnabled=n._lazy=!1,I.version="1.16.1",I.defaultEase=n._ease=new y(null,null,1,1),I.defaultOverwrite="auto",I.ticker=a,I.autoSleep=120,I.lagSmoothing=function(t,e){a.lagSmoothing(t,e)},I.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(I.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)};var z=[],L={},N=I._internals={isArray:f,isSelector:E,lazyTweens:z},U=I._plugins={},F=N.tweenLookup={},j=0,G=N.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1},Q={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},q=R._rootFramesTimeline=new D,B=R._rootTimeline=new D,M=30,$=N.lazyRender=function(){var t,e=z.length;for(L={};--e>-1;)t=z[e],t&&t._lazy!==!1&&(t.render(t._lazy[0],t._lazy[1],!0),t._lazy=!1);z.length=0};B._startTime=a.time,q._startTime=a.frame,B._active=q._active=!0,setTimeout($,1),R._updateRoot=I.render=function(){var t,e,i;if(z.length&&$(),B.render((a.time-B._startTime)*B._timeScale,!1,!1),q.render((a.frame-q._startTime)*q._timeScale,!1,!1),z.length&&$(),a.frame>=M){M=a.frame+(parseInt(I.autoSleep,10)||120);for(i in F){for(e=F[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete F[i]}if(i=B._first,(!i||i._paused)&&I.autoSleep&&!q._first&&1===a._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||a.sleep()}}},a.addEventListener("tick",R._updateRoot);var K=function(t,e,i){var s,r,n=t._gsTweenID;if(F[n||(t._gsTweenID=n="t"+j++)]||(F[n]={target:t,tweens:[]}),e&&(s=F[n].tweens,s[r=s.length]=e,i))for(;--r>-1;)s[r]===e&&s.splice(r,1);return F[n].tweens},H=function(t,e,i,s){var r,n,a=t.vars.onOverwrite;return a&&(r=a(t,e,i,s)),a=I.onOverwrite,a&&(n=a(t,e,i,s)),r!==!1&&n!==!1},J=function(t,e,i,s,r){var n,a,o,l;if(1===s||s>=4){for(l=r.length,n=0;l>n;n++)if((o=r[n])!==e)o._gc||H(o,e)&&o._enabled(!1,!1)&&(a=!0);else if(5===s)break;return a}var h,u=e._startTime+_,m=[],f=0,c=0===e._duration;for(n=r.length;--n>-1;)(o=r[n])===e||o._gc||o._paused||(o._timeline!==e._timeline?(h=h||V(e,0,c),0===V(o,h,c)&&(m[f++]=o)):u>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale>u&&((c||!o._initted)&&2e-10>=u-o._startTime||(m[f++]=o)));for(n=f;--n>-1;)if(o=m[n],2===s&&o._kill(i,t,e)&&(a=!0),2!==s||!o._firstPT&&o._initted){if(2!==s&&!H(o,e))continue;o._enabled(!1,!1)&&(a=!0)}return a},V=function(t,e,i){for(var s=t._timeline,r=s._timeScale,n=t._startTime;s._timeline;){if(n+=s._startTime,r*=s._timeScale,s._paused)return-100;s=s._timeline}return n/=r,n>e?n-e:i&&n===e||!t._initted&&2*_>n-e?_:(n+=t.totalDuration()/t._timeScale/r)>e+_?0:n-e-_};n._init=function(){var t,e,i,s,r,n=this.vars,a=this._overwrittenProps,o=this._duration,l=!!n.immediateRender,h=n.ease;if(n.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),r={};for(s in n.startAt)r[s]=n.startAt[s];if(r.overwrite=!1,r.immediateRender=!0,r.lazy=l&&n.lazy!==!1,r.startAt=r.delay=null,this._startAt=I.to(this.target,0,r),l)if(this._time>0)this._startAt=null;else if(0!==o)return}else if(n.runBackwards&&0!==o)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(l=!1),i={};for(s in n)G[s]&&"autoCSS"!==s||(i[s]=n[s]);if(i.overwrite=0,i.data="isFromStart",i.lazy=l&&n.lazy!==!1,i.immediateRender=l,this._startAt=I.to(this.target,0,i),l){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=h=h?h instanceof y?h:"function"==typeof h?new y(h,n.easeParams):w[h]||I.defaultEase:I.defaultEase,n.easeParams instanceof Array&&h.config&&(this._ease=h.config.apply(h,n.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],a?a[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,a);if(e&&I._onPluginEvent("_onInitAllProps",this),a&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),n.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=n.onUpdate,this._initted=!0},n._initProps=function(e,i,s,r){var n,a,o,l,h,_;if(null==e)return!1;L[e._gsTweenID]&&$(),this.vars.css||e.style&&e!==t&&e.nodeType&&U.css&&this.vars.autoCSS!==!1&&O(this.vars,e);for(n in this.vars){if(_=this.vars[n],G[n])_&&(_ instanceof Array||_.push&&f(_))&&-1!==_.join("").indexOf("{self}")&&(this.vars[n]=_=this._swapSelfInParams(_,this));else if(U[n]&&(l=new U[n])._onInitTween(e,this.vars[n],this)){for(this._firstPT=h={_next:this._firstPT,t:l,p:"setRatio",s:0,c:1,f:!0,n:n,pg:!0,pr:l._priority},a=l._overwriteProps.length;--a>-1;)i[l._overwriteProps[a]]=this._firstPT;(l._priority||l._onInitAllProps)&&(o=!0),(l._onDisable||l._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=i[n]=h={_next:this._firstPT,t:e,p:n,f:"function"==typeof e[n],n:n,pg:!1,pr:0},h.s=h.f?e[n.indexOf("set")||"function"!=typeof e["get"+n.substr(3)]?n:"get"+n.substr(3)]():parseFloat(e[n]),h.c="string"==typeof _&&"="===_.charAt(1)?parseInt(_.charAt(0)+"1",10)*Number(_.substr(2)):Number(_)-h.s||0;h&&h._next&&(h._next._prev=h)}return r&&this._kill(r,e)?this._initProps(e,i,s,r):this._overwrite>1&&this._firstPT&&s.length>1&&J(e,this,i,this._overwrite,s)?(this._kill(i,e),this._initProps(e,i,s,r)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(L[e._gsTweenID]=!0),o)},n.render=function(t,e,i){var s,r,n,a,o=this._time,l=this._duration,h=this._rawPrevTime;if(t>=l)this._totalTime=this._time=l,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(s=!0,r="onComplete",i=i||this._timeline.autoRemoveChildren),0===l&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>h||h===_&&"isPause"!==this.data)&&h!==t&&(i=!0,h>_&&(r="onReverseComplete")),this._rawPrevTime=a=!e||t||h===t?t:_);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==o||0===l&&h>0)&&(r="onReverseComplete",s=this._reversed),0>t&&(this._active=!1,0===l&&(this._initted||!this.vars.lazy||i)&&(h>=0&&(h!==_||"isPause"!==this.data)&&(i=!0),this._rawPrevTime=a=!e||t||h===t?t:_)),this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var u=t/l,m=this._easeType,f=this._easePower;(1===m||3===m&&u>=.5)&&(u=1-u),3===m&&(u*=2),1===f?u*=u:2===f?u*=u*u:3===f?u*=u*u*u:4===f&&(u*=u*u*u*u),this.ratio=1===m?1-u:2===m?u:.5>t/l?u/2:1-u/2}else this.ratio=this._ease.getRatio(t/l);if(this._time!==o||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=o,this._rawPrevTime=h,z.push(this),this._lazy=[t,e],void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/l):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==o&&t>=0&&(this._active=!0),0===o&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===l)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||T))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&t!==-1e-4&&this._startAt.render(t,e,i),e||(this._time!==o||s)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||T)),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&t!==-1e-4&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||T),0===l&&this._rawPrevTime===_&&a!==_&&(this._rawPrevTime=0))}},n._kill=function(t,e,i){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:I.selector(e)||e;var s,r,n,a,o,l,h,_,u;if((f(e)||E(e))&&"number"!=typeof e[0])for(s=e.length;--s>-1;)this._kill(t,e[s])&&(l=!0);else{if(this._targets){for(s=this._targets.length;--s>-1;)if(e===this._targets[s]){o=this._propLookup[s]||{},this._overwrittenProps=this._overwrittenProps||[],r=this._overwrittenProps[s]=t?this._overwrittenProps[s]||{}:"all";break}}else{if(e!==this.target)return!1;o=this._propLookup,r=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(o){if(h=t||o,_=t!==r&&"all"!==r&&t!==o&&("object"!=typeof t||!t._tempKill),i&&(I.onOverwrite||this.vars.onOverwrite)){for(n in h)o[n]&&(u||(u=[]),u.push(n));if(!H(this,i,e,u))return!1}for(n in h)(a=o[n])&&(a.pg&&a.t._kill(h)&&(l=!0),a.pg&&0!==a.t._overwriteProps.length||(a._prev?a._prev._next=a._next:a===this._firstPT&&(this._firstPT=a._next),a._next&&(a._next._prev=a._prev),a._next=a._prev=null),delete o[n]),_&&(r[n]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return l},n.invalidate=function(){return this._notifyPluginsOfEnabled&&I._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],R.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-_,this.render(-this._delay)),this},n._enabled=function(t,e){if(o||a.wake(),t&&this._gc){var i,s=this._targets;if(s)for(i=s.length;--i>-1;)this._siblings[i]=K(s[i],this,!0);else this._siblings=K(this.target,this,!0)}return R.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?I._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},I.to=function(t,e,i){return new I(t,e,i)},I.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new I(t,e,i)},I.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new I(t,e,s)},I.delayedCall=function(t,e,i,s,r){return new I(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,lazy:!1,useFrames:r,overwrite:0})},I.set=function(t,e){return new I(t,0,e)},I.getTweensOf=function(t,e){if(null==t)return[];t="string"!=typeof t?t:I.selector(t)||t;var i,s,r,n;if((f(t)||E(t))&&"number"!=typeof t[0]){for(i=t.length,s=[];--i>-1;)s=s.concat(I.getTweensOf(t[i],e));for(i=s.length;--i>-1;)for(n=s[i],r=i;--r>-1;)n===s[r]&&s.splice(i,1)}else for(s=K(t).concat(),i=s.length;--i>-1;)(s[i]._gc||e&&!s[i].isActive())&&s.splice(i,1);return s},I.killTweensOf=I.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var s=I.getTweensOf(t,e),r=s.length;--r>-1;)s[r]._kill(i,t)};var W=v("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=W.prototype},!0);if(n=W.prototype,W.version="1.10.1",W.API=2,n._firstPT=null,n._addTween=function(t,e,i,s,r,n){var a,o;return null!=s&&(a="number"==typeof s||"="!==s.charAt(1)?Number(s)-i:parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)))?(this._firstPT=o={_next:this._firstPT,t:t,p:e,s:i,c:a,f:"function"==typeof t[e],n:r||e,r:n},o._next&&(o._next._prev=o),o):void 0},n.setRatio=function(t){for(var e,i=this._firstPT,s=1e-6;i;)e=i.c*t+i.s,i.r?e=Math.round(e):s>e&&e>-s&&(e=0),i.f?i.t[i.p](e):i.t[i.p]=e,i=i._next},n._kill=function(t){var e,i=this._overwriteProps,s=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;s;)null!=t[s.n]&&(s._next&&(s._next._prev=s._prev),s._prev?(s._prev._next=s._next,s._prev=null):this._firstPT===s&&(this._firstPT=s._next)),s=s._next;return!1},n._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},I._onPluginEvent=function(t,e){var i,s,r,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,s=r;s&&s.pr>o.pr;)s=s._next;(o._prev=s?s._prev:n)?o._prev._next=o:r=o,(o._next=s)?s._prev=o:n=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},W.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===W.API&&(U[(new t[e])._propName]=t[e]);return!0},d.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,s=t.priority||0,r=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=v("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){W.call(this,i,s),this._overwriteProps=r||[]},t.global===!0),o=a.prototype=new W(i);o.constructor=a,a.API=t.API;for(e in n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,W.activate([a]),a},s=t._gsQueue){for(r=0;s.length>r;r++)s[r]();for(n in c)c[n].func||t.console.log("GSAP encountered missing dependency: com.greensock."+n)}o=!1}})("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenLite");;/*!
 * VERSION: 0.13.0
 * DATE: 2015-03-13
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Requires TweenLite and CSSPlugin version 1.16.1 or later (TweenMax contains both TweenLite and CSSPlugin). ThrowPropsPlugin is required for momentum-based continuation of movement after the mouse/touch is released (ThrowPropsPlugin is a membership benefit of Club GreenSock - http://greensock.com/club/).
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("utils.Draggable",["events.EventDispatcher","TweenLite"],function(t,e){var i,s,r,n,a,o={css:{}},l={css:{}},h={css:{}},u={css:{}},_=_gsScope._gsDefine.globals,c={},f=document,p=f.documentElement||{},d=[],m=function(){return!1},g=180/Math.PI,v=999999999999999,y=Date.now||function(){return(new Date).getTime()},T=!(f.addEventListener||!f.all),w=f.createElement("div"),x=[],b={},P=0,S=/^(?:a|input|textarea|button|select)$/i,C=0,k=-1!==navigator.userAgent.toLowerCase().indexOf("android"),R=0,A={},O=function(t){if("string"==typeof t&&(t=e.selector(t)),!t||t.nodeType)return[t];var i,s=[],r=t.length;for(i=0;i!==r;s.push(t[i++]));return s},D=function(){for(var t=x.length;--t>-1;)x[t]()},M=function(t){x.push(t),1===x.length&&e.ticker.addEventListener("tick",D,this,!1,1)},L=function(t){for(var i=x.length;--i>-1;)x[i]===t&&x.splice(i,1);e.to(N,0,{overwrite:"all",delay:15,onComplete:N})},N=function(){x.length||e.ticker.removeEventListener("tick",D)},E=function(t,e){var i;for(i in e)void 0===t[i]&&(t[i]=e[i]);return t},I=function(){return null!=window.pageYOffset?window.pageYOffset:null!=f.scrollTop?f.scrollTop:p.scrollTop||f.body.scrollTop||0},z=function(){return null!=window.pageXOffset?window.pageXOffset:null!=f.scrollLeft?f.scrollLeft:p.scrollLeft||f.body.scrollLeft||0},X=function(t,e){be(t,"scroll",e),B(t.parentNode)||X(t.parentNode,e)},F=function(t,e){Pe(t,"scroll",e),B(t.parentNode)||F(t.parentNode,e)},B=function(t){return!(t&&t!==p&&t!==f&&t!==f.body&&t!==window&&t.nodeType&&t.parentNode)},Y=function(t,e){var i="x"===e?"Width":"Height",s="scroll"+i,r="client"+i,n=f.body;return Math.max(0,B(t)?Math.max(p[s],n[s])-(window["inner"+i]||p[r]||n[r]):t[s]-t[r])},U=function(t){var e=B(t),i=Y(t,"x"),s=Y(t,"y");e?t=A:U(t.parentNode),t._gsMaxScrollX=i,t._gsMaxScrollY=s,t._gsScrollX=t.scrollLeft||0,t._gsScrollY=t.scrollTop||0},j=function(t,e){return t=t||window.event,c.pageX=t.clientX+f.body.scrollLeft+p.scrollLeft,c.pageY=t.clientY+f.body.scrollTop+p.scrollTop,e&&(t.returnValue=!1),c},W=function(t){return t?("string"==typeof t&&(t=e.selector(t)),t.length&&t!==window&&t[0]&&t[0].style&&!t.nodeType&&(t=t[0]),t===window||t.nodeType&&t.style?t:null):t},q=function(t,e){var s,r,n,a=t.style;if(void 0===a[e]){for(n=["O","Moz","ms","Ms","Webkit"],r=5,s=e.charAt(0).toUpperCase()+e.substr(1);--r>-1&&void 0===a[n[r]+s];);if(0>r)return"";i=3===r?"ms":n[r],e=i+s}return e},V=function(t,e,i){var s=t.style;s&&(void 0===s[e]&&(e=q(t,e)),null==i?s.removeProperty?s.removeProperty(e.replace(/([A-Z])/g,"-$1").toLowerCase()):s.removeAttribute(e):void 0!==s[e]&&(s[e]=i))},G=f.defaultView?f.defaultView.getComputedStyle:m,H=/(?:Left|Right|Width)/i,Q=/(?:\d|\-|\+|=|#|\.)*/g,Z=function(t,e,i,s,r){if("px"===s||!s)return i;if("auto"===s||!i)return 0;var n,a=H.test(e),o=t,l=ee.style,h=0>i;return h&&(i=-i),"%"===s&&-1!==e.indexOf("border")?n=i/100*(a?t.clientWidth:t.clientHeight):(l.cssText="border:0 solid red;position:"+K(t,"position",!0)+";line-height:0;","%"!==s&&o.appendChild?l[a?"borderLeftWidth":"borderTopWidth"]=i+s:(o=t.parentNode||f.body,l[a?"width":"height"]=i+s),o.appendChild(ee),n=parseFloat(ee[a?"offsetWidth":"offsetHeight"]),o.removeChild(ee),0!==n||r||(n=Z(t,e,i,s,!0))),h?-n:n},$=function(t,e){if("absolute"!==K(t,"position",!0))return 0;var i="left"===e?"Left":"Top",s=K(t,"margin"+i,!0);return t["offset"+i]-(Z(t,e,parseFloat(s),(s+"").replace(Q,""))||0)},K=function(t,e,i){var s,r=(t._gsTransform||{})[e];return r||0===r?r:(t.style[e]?r=t.style[e]:(s=G(t))?(r=s.getPropertyValue(e.replace(/([A-Z])/g,"-$1").toLowerCase()),r=r||s.length?r:s[e]):t.currentStyle&&(r=t.currentStyle[e]),"auto"!==r||"top"!==e&&"left"!==e||(r=$(t,e)),i?r:parseFloat(r)||0)},J=function(t,e,i){var s=t.vars,r=s[i],n=t._listeners[e];"function"==typeof r&&r.apply(s[i+"Scope"]||t,s[i+"Params"]||[t.pointerEvent]),n&&t.dispatchEvent(e)},te=function(t,e){var i,s,r,n=W(t);return n?ve(n,e):void 0!==t.left?(r=fe(e),{left:t.left-r.x,top:t.top-r.y,width:t.width,height:t.height}):(s=t.min||t.minX||t.minRotation||0,i=t.min||t.minY||0,{left:s,top:i,width:(t.max||t.maxX||t.maxRotation||0)-s,height:(t.max||t.maxY||0)-i})},ee=f.createElement("div"),ie=""!==q(ee,"perspective"),se=q(ee,"transformOrigin").replace(/^ms/g,"Ms").replace(/([A-Z])/g,"-$1").toLowerCase(),re=q(ee,"transform"),ne=re.replace(/^ms/g,"Ms").replace(/([A-Z])/g,"-$1").toLowerCase(),ae={},oe={},le=function(){if(!T){var t="http://www.w3.org/2000/svg",e=f.createElementNS(t,"svg"),i=f.createElementNS(t,"rect");return i.setAttributeNS(null,"width","10"),i.setAttributeNS(null,"height","10"),e.appendChild(i),e}}(),he=window.SVGElement,ue=function(t){return!!(he&&"function"==typeof t.getBBox&&t.getCTM&&(!t.parentNode||t.parentNode.getBBox&&t.parentNode.getCTM))},_e=["class","viewBox","width","height","xml:space"],ce=function(t){if(!t.getBoundingClientRect||!t.parentNode)return{offsetTop:0,offsetLeft:0,scaleX:1,scaleY:1,offsetParent:p};if(t._gsSVGData&&t._gsSVGData.lastUpdate===e.ticker.frame)return t._gsSVGData;var i,s,r,n,a,o,l=t,h=t.style.cssText,u=t._gsSVGData=t._gsSVGData||{};if("svg"!==(t.nodeName+"").toLowerCase()&&t.getBBox){for(l=t.parentNode,i=t.getBBox();l&&"svg"!==(l.nodeName+"").toLowerCase();)l=l.parentNode;return u=ce(l),{offsetTop:i.y*u.scaleY,offsetLeft:i.x*u.scaleX,scaleX:u.scaleX,scaleY:u.scaleY,offsetParent:l||p}}for(;!l.offsetParent&&l.parentNode;)l=l.parentNode;for(t.parentNode.insertBefore(le,t),t.parentNode.removeChild(t),le.style.cssText=h,le.style[re]="none",a=_e.length;--a>-1;)o=t.getAttribute(_e[a]),o?le.setAttribute(_e[a],o):le.removeAttribute(_e[a]);return i=le.getBoundingClientRect(),n=le.firstChild.getBoundingClientRect(),r=l.offsetParent,r?(r===f.body&&p&&(r=p),s=r.getBoundingClientRect()):s={top:-I(),left:-z()},le.parentNode.insertBefore(t,le),t.parentNode.removeChild(le),u.scaleX=n.width/10,u.scaleY=n.height/10,u.offsetLeft=i.left-s.left,u.offsetTop=i.top-s.top,u.offsetParent=l.offsetParent||p,u.lastUpdate=e.ticker.frame,u},fe=function(t,i){if(i=i||{},!t||t===p||!t.parentNode)return{x:0,y:0};var s=G(t),r=se&&s?s.getPropertyValue(se):"50% 50%",n=r.split(" "),a=-1!==r.indexOf("left")?"0%":-1!==r.indexOf("right")?"100%":n[0],o=-1!==r.indexOf("top")?"0%":-1!==r.indexOf("bottom")?"100%":n[1];return("center"===o||null==o)&&(o="50%"),("center"===a||isNaN(parseFloat(a)))&&(a="50%"),t.getBBox&&ue(t)?(t._gsTransform||(e.set(t,{x:"+=0",overwrite:!1}),void 0===t._gsTransform.xOrigin&&console.log("Draggable requires at least GSAP 1.16.1")),r=t.getBBox(),n=ce(t),i.x=(t._gsTransform.xOrigin-r.x)*n.scaleX,i.y=(t._gsTransform.yOrigin-r.y)*n.scaleY):(i.x=-1!==a.indexOf("%")?t.offsetWidth*parseFloat(a)/100:parseFloat(a),i.y=-1!==o.indexOf("%")?t.offsetHeight*parseFloat(o)/100:parseFloat(o)),i},pe=function(t,e,i){var s,r,a,o,l,h;return t!==window&&t&&t.parentNode?(s=G(t),r=s?s.getPropertyValue(ne):t.currentStyle?t.currentStyle[re]:"1,0,0,1,0,0",r=(r+"").match(/(?:\-|\b)[\d\-\.e]+\b/g)||[1,0,0,1,0,0],r.length>6&&(r=[r[0],r[1],r[4],r[5],r[12],r[13]]),e&&(a=t.parentNode,h=t.getBBox&&ue(t)||void 0===t.offsetLeft&&"svg"===(t.nodeName+"").toLowerCase()?ce(t):t,o=h.offsetParent,l=a===p||a===f.body,void 0===n&&f.body&&re&&(n=function(){var t,e,i=f.createElement("div"),s=f.createElement("div");return s.style.position="absolute",f.body.appendChild(i),i.appendChild(s),t=s.offsetParent,i.style[re]="rotate(1deg)",e=s.offsetParent===t,f.body.removeChild(i),e}()),r[4]=Number(r[4])+e.x+(h.offsetLeft||0)-i.x-(l?0:a.scrollLeft)+(o?parseInt(K(o,"borderLeftWidth"),10)||0:0),r[5]=Number(r[5])+e.y+(h.offsetTop||0)-i.y-(l?0:a.scrollTop)+(o?parseInt(K(o,"borderTopWidth"),10)||0:0),!a||a.offsetParent!==o||n&&"100100"!==pe(a).join("")||(r[4]-=a.offsetLeft||0,r[5]-=a.offsetTop||0),a&&"fixed"===K(t,"position",!0)&&(r[4]+=z(),r[5]+=I())),r):[1,0,0,1,0,0]},de=function(t,e){if(!t||t===window||!t.parentNode)return[1,0,0,1,0,0];for(var i,s,r,n,a,o,l,h,u=fe(t,ae),_=fe(t.parentNode,oe),c=pe(t,u,_);(t=t.parentNode)&&t.parentNode&&t!==p;)u=_,_=fe(t.parentNode,u===ae?oe:ae),l=pe(t,u,_),i=c[0],s=c[1],r=c[2],n=c[3],a=c[4],o=c[5],c[0]=i*l[0]+s*l[2],c[1]=i*l[1]+s*l[3],c[2]=r*l[0]+n*l[2],c[3]=r*l[1]+n*l[3],c[4]=a*l[0]+o*l[2]+l[4],c[5]=a*l[1]+o*l[3]+l[5];return e&&(i=c[0],s=c[1],r=c[2],n=c[3],a=c[4],o=c[5],h=i*n-s*r,c[0]=n/h,c[1]=-s/h,c[2]=-r/h,c[3]=i/h,c[4]=(r*o-n*a)/h,c[5]=-(i*o-s*a)/h),c},me=function(t,e,i){var s=de(t),r=e.x,n=e.y;return i=i===!0?e:i||{},i.x=r*s[0]+n*s[2]+s[4],i.y=r*s[1]+n*s[3]+s[5],i},ge=function(t,e,i){var s=t.x*e[0]+t.y*e[2]+e[4],r=t.x*e[1]+t.y*e[3]+e[5];return t.x=s*i[0]+r*i[2]+i[4],t.y=s*i[1]+r*i[3]+i[5],t},ve=function(t,e){var i,s,r,n,a,o,l,h,u,_,c;return t===window?(n=I(),s=z(),r=s+(p.clientWidth||t.innerWidth||f.body.clientWidth||0),a=n+((t.innerHeight||0)-20<p.clientHeight?p.clientHeight:t.innerHeight||f.body.clientHeight||0)):(i=fe(t),s=-i.x,r=s+t.offsetWidth,n=-i.y,a=n+t.offsetHeight),t===e?{left:s,top:n,width:r-s,height:a-n}:(o=de(t),l=de(e,!0),h=ge({x:s,y:n},o,l),u=ge({x:r,y:n},o,l),_=ge({x:r,y:a},o,l),c=ge({x:s,y:a},o,l),s=Math.min(h.x,u.x,_.x,c.x),n=Math.min(h.y,u.y,_.y,c.y),{left:s,top:n,width:Math.max(h.x,u.x,_.x,c.x)-s,height:Math.max(h.y,u.y,_.y,c.y)-n})},ye=function(t){return t.length&&t[0]&&(t[0].nodeType&&t[0].style&&!t.nodeType||t[0].length&&t[0][0])?!0:!1},Te=function(t){var e,i,s,r=[],n=t.length;for(e=0;n>e;e++)if(i=t[e],ye(i))for(s=i.length,s=0;i.length>s;s++)r.push(i[s]);else r.push(i);return r},we="ontouchstart"in p&&"orientation"in window,xe=function(t){for(var e=t.split(","),i=(void 0!==ee.onpointerdown?"pointerdown,pointermove,pointerup,pointercancel":void 0!==ee.onmspointerdown?"MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel":t).split(","),s={},r=8;--r>-1;)s[e[r]]=i[r],s[i[r]]=e[r];return s}("touchstart,touchmove,touchend,touchcancel"),be=function(t,e,i,s){t.addEventListener?t.addEventListener(xe[e]||e,i,s):t.attachEvent&&t.attachEvent("on"+e,i)},Pe=function(t,e,i){t.removeEventListener?t.removeEventListener(xe[e]||e,i):t.detachEvent&&t.detachEvent("on"+e,i)},Se=function(t){s=t.touches&&t.touches.length>C,Pe(t.target,"touchend",Se)},Ce=function(t){s=t.touches&&t.touches.length>C,be(t.target,"touchend",Se)},ke=function(t,e,i,s,r,n){var a,o,l,h={};if(e)if(1!==r&&e instanceof Array){for(h.end=a=[],l=e.length,o=0;l>o;o++)a[o]=e[o]*r;i+=1.1,s-=1.1}else h.end="function"==typeof e?function(i){return e.call(t,i)*r}:e;return(i||0===i)&&(h.max=i),(s||0===s)&&(h.min=s),n&&(h.velocity=0),h},Re=function(t){var e;return t&&t.getAttribute&&"BODY"!==t.nodeName?"true"===(e=t.getAttribute("data-clickable"))||"false"!==e&&(t.onclick||S.test(t.nodeName+"")||"true"===t.getAttribute("contentEditable"))?!0:Re(t.parentNode):!1},Ae=function(t,e){for(var i,s=t.length;--s>-1;)i=t[s],i.ondragstart=i.onselectstart=e?null:m,V(i,"userSelect",e?"text":"none")},Oe=function(){var t,e=f.createElement("div"),i=f.createElement("div"),s=i.style,r=f.body||ee;return s.display="inline-block",s.position="relative",e.style.cssText=i.innerHTML="width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden",e.appendChild(i),r.appendChild(e),a=i.offsetHeight+18>e.scrollHeight,s.width="100%",re||(s.paddingRight="500px",t=e.scrollLeft=e.scrollWidth-e.clientWidth,s.left="-90px",t=t!==e.scrollLeft),r.removeChild(e),t}(),De=function(t,i){t=W(t),i=i||{};var s,r,n,o,l,h,u=f.createElement("div"),_=u.style,c=t.firstChild,p=0,d=0,m=t.scrollTop,g=t.scrollLeft,v=t.scrollWidth,y=t.scrollHeight,w=0,x=0,b=0;ie&&i.force3D!==!1?(l="translate3d(",h="px,0px)"):re&&(l="translate(",h="px)"),this.scrollTop=function(t,e){return arguments.length?(this.top(-t,e),void 0):-this.top()},this.scrollLeft=function(t,e){return arguments.length?(this.left(-t,e),void 0):-this.left()},this.left=function(s,r){if(!arguments.length)return-(t.scrollLeft+d);var n=t.scrollLeft-g,a=d;return(n>2||-2>n)&&!r?(g=t.scrollLeft,e.killTweensOf(this,!0,{left:1,scrollLeft:1}),this.left(-g),i.onKill&&i.onKill(),void 0):(s=-s,0>s?(d=0|s-.5,s=0):s>x?(d=0|s-x,s=x):d=0,(d||a)&&(l?this._suspendTransforms||(_[re]=l+-d+"px,"+-p+h):_.left=-d+"px",Oe&&d+w>=0&&(_.paddingRight=d+w+"px")),t.scrollLeft=0|s,g=t.scrollLeft,void 0)},this.top=function(s,r){if(!arguments.length)return-(t.scrollTop+p);var n=t.scrollTop-m,a=p;return(n>2||-2>n)&&!r?(m=t.scrollTop,e.killTweensOf(this,!0,{top:1,scrollTop:1}),this.top(-m),i.onKill&&i.onKill(),void 0):(s=-s,0>s?(p=0|s-.5,s=0):s>b?(p=0|s-b,s=b):p=0,(p||a)&&(l?this._suspendTransforms||(_[re]=l+-d+"px,"+-p+h):_.top=-p+"px"),t.scrollTop=0|s,m=t.scrollTop,void 0)},this.maxScrollTop=function(){return b},this.maxScrollLeft=function(){return x},this.disable=function(){for(c=u.firstChild;c;)o=c.nextSibling,t.appendChild(c),c=o;t===u.parentNode&&t.removeChild(u)},this.enable=function(){if(c=t.firstChild,c!==u){for(;c;)o=c.nextSibling,u.appendChild(c),c=o;t.appendChild(u),this.calibrate()}},this.calibrate=function(e){var i,o,l=t.clientWidth===s;m=t.scrollTop,g=t.scrollLeft,(!l||t.clientHeight!==r||u.offsetHeight!==n||v!==t.scrollWidth||y!==t.scrollHeight||e)&&((p||d)&&(i=this.left(),o=this.top(),this.left(-t.scrollLeft),this.top(-t.scrollTop)),(!l||e)&&(_.display="block",_.width="auto",_.paddingRight="0px",w=Math.max(0,t.scrollWidth-t.clientWidth),w&&(w+=K(t,"paddingLeft")+(a?K(t,"paddingRight"):0))),_.display="inline-block",_.position="relative",_.overflow="visible",_.verticalAlign="top",_.width="100%",_.paddingRight=w+"px",a&&(_.paddingBottom=K(t,"paddingBottom",!0)),T&&(_.zoom="1"),s=t.clientWidth,r=t.clientHeight,v=t.scrollWidth,y=t.scrollHeight,x=t.scrollWidth-s,b=t.scrollHeight-r,n=u.offsetHeight,_.display="block",(i||o)&&(this.left(i),this.top(o)))},this.content=u,this.element=t,this._suspendTransforms=!1,this.enable()},Me=function(i,n){t.call(this,i),i=W(i),r||(r=_.com.greensock.plugins.ThrowPropsPlugin),this.vars=n=n||{},this.target=i,this.x=this.y=this.rotation=0,this.dragResistance=parseFloat(n.dragResistance)||0,this.edgeResistance=isNaN(n.edgeResistance)?1:parseFloat(n.edgeResistance)||0,this.lockAxis=n.lockAxis,this.autoScroll=n.autoScroll||0,this.lockedAxis=null,this.allowEventDefault=!!n.allowEventDefault;var a,c,m,x,S,D,N,I,z,Y,q,G,H,Q,Z,$,ee,ie,se,re,ne,ae,oe,le,he,ue,_e,ce,fe,pe,ge,ve=(n.type||(T?"top,left":"x,y")).toLowerCase(),ye=-1!==ve.indexOf("x")||-1!==ve.indexOf("y"),Te=-1!==ve.indexOf("rotation"),Se=Te?"rotation":ye?"x":"left",Oe=ye?"y":"top",Le=-1!==ve.indexOf("x")||-1!==ve.indexOf("left")||"scroll"===ve,Ee=-1!==ve.indexOf("y")||-1!==ve.indexOf("top")||"scroll"===ve,Ie=n.minimumMovement||2,ze=this,Xe=O(n.trigger||n.handle||i),Fe={},Be=0,Ye=!1,Ue=n.clickableTest||Re,je=function(t){if(ze.autoScroll&&ze.isDragging&&(ie||Ye)){var e,s,r,n,a,o,l,h,u=i,_=15*ze.autoScroll;for(Ye=!1,A.scrollTop=null!=window.pageYOffset?window.pageYOffset:null!=p.scrollTop?p.scrollTop:f.body.scrollTop,A.scrollLeft=null!=window.pageXOffset?window.pageXOffset:null!=p.scrollLeft?p.scrollLeft:f.body.scrollLeft,n=ze.pointerX-A.scrollLeft,a=ze.pointerY-A.scrollTop;u&&!s;)s=B(u.parentNode),e=s?A:u.parentNode,r=s?{bottom:Math.max(p.clientHeight,window.innerHeight||0),right:Math.max(p.clientWidth,window.innerWidth||0),left:0,top:0}:e.getBoundingClientRect(),o=l=0,Ee&&(a>r.bottom-40&&(h=e._gsMaxScrollY-e.scrollTop)?(Ye=!0,l=Math.min(h,0|_*(1-Math.max(0,r.bottom-a)/40))):r.top+40>a&&e.scrollTop&&(Ye=!0,l=-Math.min(e.scrollTop,0|_*(1-Math.max(0,a-r.top)/40))),l&&(e.scrollTop+=l)),Le&&(n>r.right-40&&(h=e._gsMaxScrollX-e.scrollLeft)?(Ye=!0,o=Math.min(h,0|_*(1-Math.max(0,r.right-n)/40))):r.left+40>n&&e.scrollLeft&&(Ye=!0,o=-Math.min(e.scrollLeft,0|_*(1-Math.max(0,n-r.left)/40))),o&&(e.scrollLeft+=o)),s&&(o||l)&&(window.scrollTo(e.scrollLeft,e.scrollTop),Je(ze.pointerX+o,ze.pointerY+l)),u=e}if(ie){var d=ze.x,m=ze.y,g=1e-6;g>d&&d>-g&&(d=0),g>m&&m>-g&&(m=0),Te?(fe.data.rotation=ze.rotation=d,fe.setRatio(1)):c?(Ee&&c.top(m),Le&&c.left(d)):ye?(Ee&&(fe.data.y=m),Le&&(fe.data.x=d),fe.setRatio(1)):(Ee&&(i.style.top=m+"px"),Le&&(i.style.left=d+"px")),I&&!t&&J(ze,"drag","onDrag")}ie=!1},We=function(t,s){var r;i._gsTransform||!ye&&!Te||e.set(i,{x:"+=0",overwrite:!1}),ye?(ze.y=i._gsTransform.y,ze.x=i._gsTransform.x):Te?ze.x=ze.rotation=i._gsTransform.rotation:c?(ze.y=c.top(),ze.x=c.left()):(ze.y=parseInt(i.style.top,10)||0,ze.x=parseInt(i.style.left,10)||0),!re&&!ne||s||(re&&(r=re(ze.x),r!==ze.x&&(ze.x=r,Te&&(ze.rotation=r),ie=!0)),ne&&(r=ne(ze.y),r!==ze.y&&(ze.y=r,ie=!0)),ie&&je(!0)),n.onThrowUpdate&&!t&&n.onThrowUpdate.apply(n.onThrowUpdateScope||ze,n.onThrowUpdateParams||d)},qe=function(){var t,e,s,r;N=!1,c?(c.calibrate(),ze.minX=Y=-c.maxScrollLeft(),ze.minY=G=-c.maxScrollTop(),ze.maxX=z=ze.maxY=q=0,N=!0):n.bounds&&(t=te(n.bounds,i.parentNode),Te?(ze.minX=Y=t.left,ze.maxX=z=t.left+t.width,ze.minY=G=ze.maxY=q=0):void 0!==n.bounds.maxX||void 0!==n.bounds.maxY?(t=n.bounds,ze.minX=Y=t.minX,ze.minY=G=t.minY,ze.maxX=z=t.maxX,ze.maxY=q=t.maxY):(e=te(i,i.parentNode),ze.minX=Y=K(i,Se)+t.left-e.left,ze.minY=G=K(i,Oe)+t.top-e.top,ze.maxX=z=Y+(t.width-e.width),ze.maxY=q=G+(t.height-e.height)),Y>z&&(ze.minX=z,ze.maxX=z=Y,Y=ze.minX),G>q&&(ze.minY=q,ze.maxY=q=G,G=ze.minY),Te&&(ze.minRotation=Y,ze.maxRotation=z),N=!0),n.liveSnap&&(s=n.liveSnap===!0?n.snap||{}:n.liveSnap,r=s instanceof Array||"function"==typeof s,Te?(re=Ze(r?s:s.rotation,Y,z,1),ne=null):(Le&&(re=Ze(r?s:s.x||s.left||s.scrollLeft,Y,z,c?-1:1)),Ee&&(ne=Ze(r?s:s.y||s.top||s.scrollTop,G,q,c?-1:1))))},Ve=function(t,e){var s,a,o;t&&r?(t===!0&&(s=n.snap||{},a=s instanceof Array||"function"==typeof s,t={resistance:(n.throwResistance||n.resistance||1e3)/(Te?10:1)},Te?t.rotation=ke(ze,a?s:s.rotation,z,Y,1,e):(Le&&(t[Se]=ke(ze,a?s:s.x||s.left||s.scrollLeft,z,Y,c?-1:1,e||"x"===ze.lockedAxis)),Ee&&(t[Oe]=ke(ze,a?s:s.y||s.top||s.scrollTop,q,G,c?-1:1,e||"y"===ze.lockedAxis)))),ze.tween=o=r.to(c||i,{throwProps:t,ease:n.ease||_.Power3.easeOut,onComplete:n.onThrowComplete,onCompleteParams:n.onThrowCompleteParams,onCompleteScope:n.onThrowCompleteScope||ze,onUpdate:n.fastMode?n.onThrowUpdate:We,onUpdateParams:n.fastMode?n.onThrowUpdateParams:null,onUpdateScope:n.onThrowUpdateScope||ze},isNaN(n.maxDuration)?2:n.maxDuration,isNaN(n.minDuration)?.5:n.minDuration,isNaN(n.overshootTolerance)?1-ze.edgeResistance+.2:n.overshootTolerance),n.fastMode||(c&&(c._suspendTransforms=!0),o.render(o.duration(),!0,!0),We(!0,!0),ze.endX=ze.x,ze.endY=ze.y,Te&&(ze.endRotation=ze.x),o.play(0),We(!0,!0),c&&(c._suspendTransforms=!1))):N&&ze.applyBounds()},Ge=function(){le=de(i.parentNode,!0),le[1]||le[2]||1!=le[0]||1!=le[3]||0!=le[4]||0!=le[5]||(le=null)},He=function(){var t=1-ze.edgeResistance;Ge(),c?(qe(),D=c.top(),S=c.left()):(Qe()?(We(!0,!0),qe()):ze.applyBounds(),Te?(ee=me(i,{x:0,y:0}),We(!0,!0),S=ze.x,D=ze.y=Math.atan2(ee.y-x,m-ee.x)*g):(_e=i.parentNode?i.parentNode.scrollTop||0:0,ce=i.parentNode?i.parentNode.scrollLeft||0:0,D=K(i,Oe),S=K(i,Se))),N&&t&&(S>z?S=z+(S-z)/t:Y>S&&(S=Y-(Y-S)/t),Te||(D>q?D=q+(D-q)/t:G>D&&(D=G-(G-D)/t)))},Qe=function(){return ze.tween&&ze.tween.isActive()},Ze=function(t,e,i,s){return"function"==typeof t?function(r){var n=ze.isPressed?1-ze.edgeResistance:1;return t.call(ze,r>i?i+(r-i)*n:e>r?e+(r-e)*n:r)*s}:t instanceof Array?function(s){for(var r,n,a=t.length,o=0,l=v;--a>-1;)r=t[a],n=r-s,0>n&&(n=-n),l>n&&r>=e&&i>=r&&(o=a,l=n);return t[o]}:isNaN(t)?function(t){return t}:function(){return t*s}},$e=function(t){var s,r;if(a&&!ze.isPressed&&t&&!("mousedown"===t.type&&30>y()-ue&&xe[ze.pointerEvent.type])){if(he=Qe(),ze.pointerEvent=t,xe[t.type]?(oe=-1!==t.type.indexOf("touch")?t.currentTarget:f,be(oe,"touchend",ti),be(oe,"touchmove",Ke),be(oe,"touchcancel",ti),be(f,"touchstart",Ce)):(oe=null,be(f,"mousemove",Ke)),ge=null,be(f,"mouseup",ti),t&&t.target&&be(t.target,"mouseup",ti),ae=Ue.call(ze,t.target)&&!n.dragClickables)return be(t.target,"change",ti),J(ze,"press","onPress"),Ae(Xe,!0),void 0;if(pe=!oe||Le===Ee||c||ze.vars.allowNativeTouchScrolling===!1?!1:Le?"y":"x",T?t=j(t,!0):pe||ze.allowEventDefault||(t.preventDefault(),t.preventManipulation&&t.preventManipulation()),t.changedTouches?(t=Z=t.changedTouches[0],$=t.identifier):t.pointerId?$=t.pointerId:Z=null,C++,M(je),x=ze.pointerY=t.pageY,m=ze.pointerX=t.pageX,(pe||ze.autoScroll)&&U(i.parentNode),!ze.autoScroll||Te||c||!i.parentNode||i.getBBox||!i.parentNode._gsMaxScrollX||w.parentNode||(w.style.width=i.parentNode.scrollWidth+"px",i.parentNode.appendChild(w)),He(),le&&(s=m*le[0]+x*le[2]+le[4],x=m*le[1]+x*le[3]+le[5],m=s),ze.tween&&ze.tween.kill(),e.killTweensOf(c||i,!0,Fe),c&&e.killTweensOf(i,!0,{scrollTo:1}),ze.tween=ze.lockedAxis=null,(n.zIndexBoost||!Te&&!c&&n.zIndexBoost!==!1)&&(i.style.zIndex=Me.zIndex++),ze.isPressed=!0,I=!(!n.onDrag&&!ze._listeners.drag),!Te)for(r=Xe.length;--r>-1;)V(Xe[r],"cursor",n.cursor||"move");J(ze,"press","onPress")}},Ke=function(t){var e,i,r,n,o=t;if(a&&!s&&ze.isPressed&&t){if(ze.pointerEvent=t,e=t.changedTouches){if(t=e[0],t!==Z&&t.identifier!==$){for(n=e.length;--n>-1&&(t=e[n]).identifier!==$;);if(0>n)return}}else if(t.pointerId&&$&&t.pointerId!==$)return;if(T)t=j(t,!0);else{if(oe&&pe&&!ge&&(i=t.pageX,r=t.pageY,le&&(n=i*le[0]+r*le[2]+le[4],r=i*le[1]+r*le[3]+le[5],i=n),ge=Math.abs(i-m)>Math.abs(r-x)&&Le?"x":"y",ze.vars.lockAxisOnTouchScroll!==!1&&(ze.lockedAxis="x"===ge?"y":"x","function"==typeof ze.vars.onLockAxis&&ze.vars.onLockAxis.call(ze,o)),k&&pe===ge))return ti(o),void 0;ze.allowEventDefault||pe&&(!ge||pe===ge)||o.cancelable===!1||(o.preventDefault(),o.preventManipulation&&o.preventManipulation())}ze.autoScroll&&(Ye=!0),Je(t.pageX,t.pageY)}},Je=function(t,e){var i,s,r,n,a,o,l=1-ze.dragResistance,h=1-ze.edgeResistance;ze.pointerX=t,ze.pointerY=e,Te?(n=Math.atan2(ee.y-e,t-ee.x)*g,a=ze.y-n,ze.y=n,a>180?D-=360:-180>a&&(D+=360),r=S+(D-n)*l):(le&&(o=t*le[0]+e*le[2]+le[4],e=t*le[1]+e*le[3]+le[5],t=o),s=e-x,i=t-m,Ie>s&&s>-Ie&&(s=0),Ie>i&&i>-Ie&&(i=0),(ze.lockAxis||ze.lockedAxis)&&(i||s)&&(o=ze.lockedAxis,o||(ze.lockedAxis=o=Le&&Math.abs(i)>Math.abs(s)?"y":Ee?"x":null,o&&"function"==typeof ze.vars.onLockAxis&&ze.vars.onLockAxis.call(ze,ze.pointerEvent)),"y"===o?s=0:"x"===o&&(i=0)),r=S+i*l,n=D+s*l),re||ne?(re&&(r=re(r)),ne&&(n=ne(n))):N&&(r>z?r=z+(r-z)*h:Y>r&&(r=Y+(r-Y)*h),Te||(n>q?n=q+(n-q)*h:G>n&&(n=G+(n-G)*h))),Te||(r=Math.round(r),n=Math.round(n)),(ze.x!==r||ze.y!==n&&!Te)&&(ze.x=ze.endX=r,Te?ze.endRotation=r:ze.y=ze.endY=n,ie=!0,ze.isDragging||(ze.isDragging=!0,J(ze,"dragstart","onDragStart")))},ti=function(t,e){if(a&&ze.isPressed&&(!t||!$||e||!t.pointerId||t.pointerId===$)){ze.isPressed=!1;var s,r,o,l,h=t,u=ze.isDragging;if(oe?(Pe(oe,"touchend",ti),Pe(oe,"touchmove",Ke),Pe(oe,"touchcancel",ti),Pe(f,"touchstart",Ce)):Pe(f,"mousemove",Ke),Pe(f,"mouseup",ti),t&&t.target&&Pe(t.target,"mouseup",ti),ie=!1,w.parentNode&&w.parentNode.removeChild(w),ae)return t&&Pe(t.target,"change",ti),Ae(Xe,!1),J(ze,"release","onRelease"),J(ze,"click","onClick"),ae=!1,void 0;if(L(je),!Te)for(r=Xe.length;--r>-1;)V(Xe[r],"cursor",n.cursor||"move");if(u&&(Be=R=y(),ze.isDragging=!1),C--,t){if(T&&(t=j(t,!1)),s=t.changedTouches,s&&(t=s[0],t!==Z&&t.identifier!==$)){for(r=s.length;--r>-1&&(t=s[r]).identifier!==$;);if(0>r)return}ze.pointerEvent=h,ze.pointerX=t.pageX,ze.pointerY=t.pageY}return h&&!u?(he&&(n.snap||n.bounds)&&Ve(n.throwProps),J(ze,"release","onRelease"),k&&"touchmove"===h.type||(J(ze,"click","onClick"),l=h.target||h.srcElement||i,l.click?l.click():f.createEvent&&(o=f.createEvent("MouseEvents"),o.initEvent("click",!0,!0),l.dispatchEvent(o)),ue=y())):(Ve(n.throwProps),T||ze.allowEventDefault||!h||!n.dragClickables&&Ue.call(ze,h.target)||!u||pe&&(!ge||pe!==ge)||h.cancelable===!1||(h.preventDefault(),h.preventManipulation&&h.preventManipulation()),J(ze,"release","onRelease")),u&&J(ze,"dragend","onDragEnd"),!0}},ei=function(t){if(t&&ze.isDragging){var e=t.target||t.srcElement||i.parentNode,s=e.scrollLeft-e._gsScrollX,r=e.scrollTop-e._gsScrollY;(s||r)&&(m-=s,x-=r,e._gsScrollX+=s,e._gsScrollY+=r,Je(ze.pointerX,ze.pointerY))}},ii=function(t){var e=y(),i=40>e-ue,s=40>e-Be;(ze.isPressed||s||i)&&(t.preventDefault?(t.preventDefault(),(i||s&&ze.vars.suppressClickOnDrag!==!1)&&t.stopImmediatePropagation()):t.returnValue=!1,t.preventManipulation&&t.preventManipulation())};se=Me.get(this.target),se&&se.kill(),this.startDrag=function(t){$e(t),ze.isDragging||(ze.isDragging=!0,J(ze,"dragstart","onDragStart"))},this.drag=Ke,this.endDrag=function(t){ti(t,!0)},this.timeSinceDrag=function(){return ze.isDragging?0:(y()-Be)/1e3},this.hitTest=function(t,e){return Me.hitTest(ze.target,t,e)},this.getDirection=function(t,e){var i,s,n,a,o,l,h="velocity"===t&&r?t:"object"!=typeof t||Te?"start":"element";return"element"===h&&(o=Ne(ze.target),l=Ne(t)),i="start"===h?ze.x-S:"velocity"===h?r.getVelocity(this.target,Se):o.left+o.width/2-(l.left+l.width/2),Te?0>i?"counter-clockwise":"clockwise":(e=e||2,s="start"===h?ze.y-D:"velocity"===h?r.getVelocity(this.target,Oe):o.top+o.height/2-(l.top+l.height/2),n=Math.abs(i/s),a=1/e>n?"":0>i?"left":"right",e>n&&(""!==a&&(a+="-"),a+=0>s?"up":"down"),a)},this.applyBounds=function(t){var e,i;return t&&n.bounds!==t?(n.bounds=t,ze.update(!0)):(We(!0),qe(),N&&(e=ze.x,i=ze.y,N&&(e>z?e=z:Y>e&&(e=Y),i>q?i=q:G>i&&(i=G)),(ze.x!==e||ze.y!==i)&&(ze.x=ze.endX=e,Te?ze.endRotation=e:ze.y=ze.endY=i,ie=!0,je())),ze)},this.update=function(t){var e=ze.x,i=ze.y;return Ge(),t?ze.applyBounds():(ie&&je(),We(!0)),ze.isPressed&&(Le&&Math.abs(e-ze.x)>.01||Ee&&Math.abs(i-ze.y)>.01&&!Te)&&He(),ze},this.enable=function(t){var s,o,l;if("soft"!==t){for(o=Xe.length;--o>-1;)l=Xe[o],be(l,"mousedown",$e),be(l,"touchstart",$e),be(l,"click",ii,!0),Te||V(l,"cursor",n.cursor||"move"),V(l,"touchCallout","none"),V(l,"touchAction",Le===Ee||c?"none":Le?"pan-y":"pan-x");Ae(Xe,!1)}return X(ze.target,ei),a=!0,r&&"soft"!==t&&r.track(c||i,ye?"x,y":Te?"rotation":"top,left"),c&&c.enable(),i._gsDragID=s="d"+P++,b[s]=this,c&&(c.element._gsDragID=s),e.set(i,{x:"+=0",overwrite:!1}),fe={t:i,data:T?Q:i._gsTransform,tween:{},setRatio:T?function(){e.set(i,H)}:CSSPlugin._internals.setTransformRatio||CSSPlugin._internals.set3DTransformRatio},this.update(!0),ze},this.disable=function(t){var e,s,n=this.isDragging;if(!Te)for(e=Xe.length;--e>-1;)V(Xe[e],"cursor",null);if("soft"!==t){for(e=Xe.length;--e>-1;)s=Xe[e],V(s,"touchCallout",null),V(s,"touchAction",null),Pe(s,"mousedown",$e),Pe(s,"touchstart",$e),Pe(s,"click",ii);Ae(Xe,!0),oe&&(Pe(oe,"touchcancel",ti),Pe(oe,"touchend",ti),Pe(oe,"touchmove",Ke)),Pe(f,"mouseup",ti),Pe(f,"mousemove",Ke)}return F(i,ei),a=!1,r&&"soft"!==t&&r.untrack(c||i,ye?"x,y":Te?"rotation":"top,left"),c&&c.disable(),L(je),this.isDragging=this.isPressed=ae=!1,n&&J(this,"dragend","onDragEnd"),ze},this.enabled=function(t,e){return arguments.length?t?this.enable(e):this.disable(e):a},this.kill=function(){return e.killTweensOf(c||i,!0,Fe),ze.disable(),delete b[i._gsDragID],ze},-1!==ve.indexOf("scroll")&&(c=this.scrollProxy=new De(i,E({onKill:function(){ze.isPressed&&ti(null)}},n)),i.style.overflowY=Ee&&!we?"auto":"hidden",i.style.overflowX=Le&&!we?"auto":"hidden",i=c.content),n.force3D!==!1&&e.set(i,{force3D:!0}),Te?Fe.rotation=1:(Le&&(Fe[Se]=1),Ee&&(Fe[Oe]=1)),Te?(H=u,Q=H.css,H.overwrite=!1):ye&&(H=Le&&Ee?o:Le?l:h,Q=H.css,H.overwrite=!1),this.enable()},Le=Me.prototype=new t;Le.constructor=Me,Le.pointerX=Le.pointerY=0,Le.isDragging=Le.isPressed=!1,Me.version="0.13.0",Me.zIndex=1e3,be(f,"touchcancel",function(){}),be(f,"contextmenu",function(){var t;for(t in b)b[t].isPressed&&b[t].endDrag()}),Me.create=function(t,i){"string"==typeof t&&(t=e.selector(t));for(var s=ye(t)?Te(t):[t],r=s.length;--r>-1;)s[r]=new Me(s[r],i);return s},Me.get=function(t){return b[(W(t)||{})._gsDragID]},Me.timeSinceDrag=function(){return(y()-R)/1e3};var Ne=function(t,e){var i=t.pageX!==e?{left:t.pageX,top:t.pageY,right:t.pageX+1,bottom:t.pageY+1}:t.nodeType||t.left===e||t.top===e?W(t).getBoundingClientRect():t;return i.right===e&&i.width!==e?(i.right=i.left+i.width,i.bottom=i.top+i.height):i.width===e&&(i={width:i.right-i.left,height:i.bottom-i.top,right:i.right,left:i.left,bottom:i.bottom,top:i.top}),i};return Me.hitTest=function(t,e,i){if(t===e)return!1;var s,r,n,a=Ne(t),o=Ne(e),l=o.left>a.right||o.right<a.left||o.top>a.bottom||o.bottom<a.top;return l||!i?!l:(n=-1!==(i+"").indexOf("%"),i=parseFloat(i)||0,s={left:Math.max(a.left,o.left),top:Math.max(a.top,o.top)},s.width=Math.min(a.right,o.right)-s.left,s.height=Math.min(a.bottom,o.bottom)-s.top,0>s.width||0>s.height?!1:n?(i*=.01,r=s.width*s.height,r>=a.width*a.height*i||r>=o.width*o.height*i):s.width>i&&s.height>i)},w.style.cssText="visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;",Me},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),require("../plugins/CSSPlugin.js"),module.exports=e())}("Draggable");;/*!
 * VERSION: 1.16.1
 * DATE: 2015-03-13
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],h(i)&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));h(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,n=i._internals,a=s._internals={},o=n.isSelector,h=n.isArray,l=n.lazyTweens,_=n.lazyRender,u=[],p=_gsScope._gsDefine.globals,f=function(t){var e,i={};for(e in t)i[e]=t[e];return i},c=a.pauseCallback=function(t,e,i,s){var n,a=t._timeline,o=a._totalTime,h=t._startTime,l=0>t._rawPrevTime||0===t._rawPrevTime&&a._reversed,_=l?0:r,p=l?r:0;if(e||!this._forcingPlayhead){for(a.pause(h),n=t._prev;n&&n._startTime===h;)n._rawPrevTime=p,n=n._prev;for(n=t._next;n&&n._startTime===h;)n._rawPrevTime=_,n=n._next;e&&e.apply(s||a,i||u),(this._forcingPlayhead||!a._paused)&&a.seek(o)}},m=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},d=s.prototype=new e;return s.version="1.16.1",d.constructor=s,d.kill()._gc=d._forcingPlayhead=!1,d.to=function(t,e,s,r){var n=s.repeat&&p.TweenMax||i;return e?this.add(new n(t,e,s),r):this.set(t,s,r)},d.from=function(t,e,s,r){return this.add((s.repeat&&p.TweenMax||i).from(t,e,s),r)},d.fromTo=function(t,e,s,r,n){var a=r.repeat&&p.TweenMax||i;return e?this.add(a.fromTo(t,e,s,r),n):this.set(t,r,n)},d.staggerTo=function(t,e,r,n,a,h,l,_){var u,p=new s({onComplete:h,onCompleteParams:l,onCompleteScope:_,smoothChildTiming:this.smoothChildTiming});for("string"==typeof t&&(t=i.selector(t)||t),t=t||[],o(t)&&(t=m(t)),n=n||0,0>n&&(t=m(t),t.reverse(),n*=-1),u=0;t.length>u;u++)r.startAt&&(r.startAt=f(r.startAt)),p.to(t[u],e,f(r),u*n);return this.add(p,a)},d.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},d.staggerFromTo=function(t,e,i,s,r,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,h)},d.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},d.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},d.add=function(r,n,a,o){var l,_,u,p,f,c;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&h(r)){for(a=a||"normal",o=o||0,l=n,_=r.length,u=0;_>u;u++)h(p=r[u])&&(p=new s({tweens:p})),this.add(p,l),"string"!=typeof p&&"function"!=typeof p&&("sequence"===a?l=p._startTime+p.totalDuration()/p._timeScale:"start"===a&&(p._startTime-=p.delay())),l+=o;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(f=this,c=f.rawTime()>r._startTime;f._timeline;)c&&f._timeline.smoothChildTiming?f.totalTime(f._totalTime,!0):f._gc&&f._enabled(!0,!1),f=f._timeline;return this},d.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&h(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},d._remove=function(t,i){e.prototype._remove.call(this,t,i);var s=this._last;return s?this._time>s._startTime+s._totalDuration/s._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},d.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},d.insert=d.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},d.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},d.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},d.addPause=function(t,e,s,r){var n=i.delayedCall(0,c,["{self}",e,s,r],this);return n.data="isPause",this.add(n,t)},d.removeLabel=function(t){return delete this._labels[t],this},d.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},d._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&h(r)))for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},d.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},d.stop=function(){return this.paused(!0)},d.gotoAndPlay=function(t,e){return this.play(t,e)},d.gotoAndStop=function(t,e){return this.pause(t,e)},d.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,h,p=this._dirty?this.totalDuration():this._totalDuration,f=this._time,c=this._startTime,m=this._timeScale,d=this._paused;if(t>=p)this._totalTime=this._time=p,this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",h=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(h=!0,this._rawPrevTime>r&&(o="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=p+1e-4;else if(1e-7>t)if(this._totalTime=this._time=0,(0!==f||0===this._duration&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(o="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(h=n=!0,o="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(h=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,0===t&&n)for(s=this._first;s&&0===s._startTime;)s._duration||(n=!1),s=s._next;t=0,this._initted||(h=!0)}else this._totalTime=this._time=this._rawPrevTime=t;if(this._time!==f&&this._first||i||h){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==f&&t>0&&(this._active=!0),0===f&&this.vars.onStart&&0!==this._time&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||u)),this._time>=f)for(s=this._first;s&&(a=s._next,!this._paused||d);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||d);)(s._active||f>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;this._onUpdate&&(e||(l.length&&_(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||u))),o&&(this._gc||(c===this._startTime||m!==this._timeScale)&&(0===this._time||p>=this.totalDuration())&&(n&&(l.length&&_(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this.vars[o].apply(this.vars[o+"Scope"]||this,this.vars[o+"Params"]||u)))}},d._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},d.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},d.getTweensOf=function(t,e){var s,r,n=this._gc,a=[],o=0;for(n&&this._enabled(!0,!0),s=i.getTweensOf(t),r=s.length;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(a[o++]=s[r]);return n&&this._enabled(!1,!0),a},d.recent=function(){return this._recent},d._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},d.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},d._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},d.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},d.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},d._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},d.totalTime=function(){this._forcingPlayhead=!0;var e=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},d.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},d.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},d.paused=function(e){if(!e)for(var i=this._first,s=this._time;i;)i._startTime===s&&"isPause"===i.data&&(i._rawPrevTime=0),i=i._next;return t.prototype.paused.apply(this,arguments)},d.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},d.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("./TweenLite.js"),module.exports=e())}("TimelineLite");;/*!
 * VERSION: beta 1.15.2
 * DATE: 2015-01-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,s,r=_gsScope.GreenSockGlobals||_gsScope,n=r.com.greensock,a=2*Math.PI,o=Math.PI/2,h=n._class,l=function(e,i){var s=h("easing."+e,function(){},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,s},_=t.register||function(){},u=function(t,e,i,s){var r=h("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new s},!0);return _(r,t),r},c=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},p=function(e,i){var s=h("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,r.config=function(t){return new s(t)},s},f=u("Back",p("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),p("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),p("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),m=h("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),d=m.prototype=new t;return d.constructor=m,d.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},m.ease=new m(.7,.7),d.config=m.config=function(t,e,i){return new m(t,e,i)},e=h("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),d=e.prototype=new t,d.constructor=e,d.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},d.config=e.config=function(t){return new e(t)},i=h("easing.RoughEase",function(e){e=e||{};for(var i,s,r,n,a,o,h=e.taper||"none",l=[],_=0,u=0|(e.points||20),p=u,f=e.randomize!==!1,m=e.clamp===!0,d=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--p>-1;)i=f?Math.random():1/u*p,s=d?d.getRatio(i):i,"none"===h?r=g:"out"===h?(n=1-i,r=n*n*g):"in"===h?r=i*i*g:.5>i?(n=2*i,r=.5*n*n*g):(n=2*(1-i),r=.5*n*n*g),f?s+=Math.random()*r-.5*r:p%2?s+=.5*r:s-=.5*r,m&&(s>1?s=1:0>s&&(s=0)),l[_++]={x:i,y:s};for(l.sort(function(t,e){return t.x-e.x}),o=new c(1,1,null),p=u;--p>-1;)a=l[p],o=new c(a.x,a.y,o);this._prev=new c(0,0,0!==o.t?o:o.next)},!0),d=i.prototype=new t,d.constructor=i,d.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},d.config=function(t){return new i(t)},i.ease=new i,u("Bounce",l("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),l("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),l("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),u("Circ",l("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),l("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),l("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),s=function(e,i,s){var r=h("easing."+e,function(t,e){this._p1=t>=1?t:1,this._p2=(e||s)/(1>t?t:1),this._p3=this._p2/a*(Math.asin(1/this._p1)||0),this._p2=a/this._p2},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t,e){return new r(t,e)},r},u("Elastic",s("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*this._p2)+1},.3),s("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2))},.3),s("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*this._p2)+1},.45)),u("Expo",l("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),l("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),l("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),u("Sine",l("SineOut",function(t){return Math.sin(t*o)}),l("SineIn",function(t){return-Math.cos(t*o)+1}),l("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),h("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),_(r.SlowMo,"SlowMo","ease,"),_(i,"RoughEase","ease,"),_(e,"SteppedEase","ease,"),f},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();;/*!
 * VERSION: 1.16.1
 * DATE: 2015-03-13
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,r,s,n,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o=_gsScope._gsDefine.globals,l={},h=a.prototype=new t("css");h.constructor=a,a.version="1.16.1",a.API=2,a.defaultTransformPerspective=0,a.defaultSkewType="compensated",h="px",a.suffixMap={top:h,right:h,bottom:h,left:h,width:h,height:h,fontSize:h,padding:h,margin:h,perspective:h,lineHeight:""};var u,f,p,c,_,d,m=/(?:\d|\-\d|\.\d|\-\.\d)+/g,g=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,v=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,y=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,x=/(?:\d|\-|\+|=|#|\.)*/g,T=/opacity *= *([^)]*)/i,w=/opacity:([^;]*)/i,b=/alpha\(opacity *=.+?\)/i,P=/^(rgb|hsl)/,S=/([A-Z])/g,C=/-([a-z])/gi,O=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,k=function(t,e){return e.toUpperCase()},R=/(?:Left|Right|Width)/i,A=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,M=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,D=/,(?=[^\)]*(?:\(|$))/gi,N=Math.PI/180,L=180/Math.PI,X={},z=document,E=function(t){return z.createElementNS?z.createElementNS("http://www.w3.org/1999/xhtml",t):z.createElement(t)},F=E("div"),I=E("img"),Y=a._internals={_specialProps:l},B=navigator.userAgent,U=function(){var t=B.indexOf("Android"),e=E("a");return p=-1!==B.indexOf("Safari")&&-1===B.indexOf("Chrome")&&(-1===t||Number(B.substr(t+8,1))>3),_=p&&6>Number(B.substr(B.indexOf("Version/")+8,1)),c=-1!==B.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(B)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(B))&&(d=parseFloat(RegExp.$1)),e?(e.style.cssText="top:1px;opacity:.55;",/^0.55/.test(e.style.opacity)):!1}(),j=function(t){return T.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},V=function(t){window.console&&console.log(t)},W="",q="",G=function(t,e){e=e||F;var i,r,s=e.style;if(void 0!==s[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],r=5;--r>-1&&void 0===s[i[r]+t];);return r>=0?(q=3===r?"ms":i[r],W="-"+q.toLowerCase()+"-",q+t):null},H=z.defaultView?z.defaultView.getComputedStyle:function(){},Q=a.getStyle=function(t,e,i,r,s){var n;return U||"opacity"!==e?(!r&&t.style[e]?n=t.style[e]:(i=i||H(t))?n=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(S,"-$1").toLowerCase()):t.currentStyle&&(n=t.currentStyle[e]),null==s||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:s):j(t)},Z=Y.convertToPixels=function(t,i,r,s,n){if("px"===s||!s)return r;if("auto"===s||!r)return 0;var o,l,h,u=R.test(i),f=t,p=F.style,c=0>r;if(c&&(r=-r),"%"===s&&-1!==i.indexOf("border"))o=r/100*(u?t.clientWidth:t.clientHeight);else{if(p.cssText="border:0 solid red;position:"+Q(t,"position")+";line-height:0;","%"!==s&&f.appendChild)p[u?"borderLeftWidth":"borderTopWidth"]=r+s;else{if(f=t.parentNode||z.body,l=f._gsCache,h=e.ticker.frame,l&&u&&l.time===h)return l.width*r/100;p[u?"width":"height"]=r+s}f.appendChild(F),o=parseFloat(F[u?"offsetWidth":"offsetHeight"]),f.removeChild(F),u&&"%"===s&&a.cacheWidths!==!1&&(l=f._gsCache=f._gsCache||{},l.time=h,l.width=100*(o/r)),0!==o||n||(o=Z(t,i,r,s,!0))}return c?-o:o},$=Y.calculateOffset=function(t,e,i){if("absolute"!==Q(t,"position",i))return 0;var r="left"===e?"Left":"Top",s=Q(t,"margin"+r,i);return t["offset"+r]-(Z(t,e,parseFloat(s),s.replace(x,""))||0)},K=function(t,e){var i,r,s,n={};if(e=e||H(t,null))if(i=e.length)for(;--i>-1;)s=e[i],(-1===s.indexOf("-transform")||be===s)&&(n[s.replace(C,k)]=e.getPropertyValue(s));else for(i in e)(-1===i.indexOf("Transform")||we===i)&&(n[i]=e[i]);else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===n[i]&&(n[i.replace(C,k)]=e[i]);return U||(n.opacity=j(t)),r=De(t,e,!1),n.rotation=r.rotation,n.skewX=r.skewX,n.scaleX=r.scaleX,n.scaleY=r.scaleY,n.x=r.x,n.y=r.y,Se&&(n.z=r.z,n.rotationX=r.rotationX,n.rotationY=r.rotationY,n.scaleZ=r.scaleZ),n.filters&&delete n.filters,n},J=function(t,e,i,r,s){var n,a,o,l={},h=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(n=i[a])||s&&s[a])&&-1===a.indexOf("Origin")&&("number"==typeof n||"string"==typeof n)&&(l[a]="auto"!==n||"left"!==a&&"top"!==a?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[a]||""===e[a].replace(y,"")?n:0:$(t,a),void 0!==h[a]&&(o=new ce(h,a,h[a],o)));if(r)for(a in r)"className"!==a&&(l[a]=r[a]);return{difs:l,firstMPT:o}},te={width:["Left","Right"],height:["Top","Bottom"]},ee=["marginLeft","marginRight","marginTop","marginBottom"],ie=function(t,e,i){var r=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),s=te[e],n=s.length;for(i=i||H(t,null);--n>-1;)r-=parseFloat(Q(t,"padding"+s[n],i,!0))||0,r-=parseFloat(Q(t,"border"+s[n]+"Width",i,!0))||0;return r},re=function(t,e){(null==t||""===t||"auto"===t||"auto auto"===t)&&(t="0 0");var i=t.split(" "),r=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],s=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==s?s="center"===r?"50%":"0":"center"===s&&(s="50%"),("center"===r||isNaN(parseFloat(r))&&-1===(r+"").indexOf("="))&&(r="50%"),t=r+" "+s+(i.length>2?" "+i[2]:""),e&&(e.oxp=-1!==r.indexOf("%"),e.oyp=-1!==s.indexOf("%"),e.oxr="="===r.charAt(1),e.oyr="="===s.charAt(1),e.ox=parseFloat(r.replace(y,"")),e.oy=parseFloat(s.replace(y,"")),e.v=t),e||t},se=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},ne=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2))+e:parseFloat(t)},ae=function(t,e,i,r){var s,n,a,o,l,h=1e-6;return null==t?o=e:"number"==typeof t?o=t:(s=360,n=t.split("_"),l="="===t.charAt(1),a=(l?parseInt(t.charAt(0)+"1",10)*parseFloat(n[0].substr(2)):parseFloat(n[0]))*(-1===t.indexOf("rad")?1:L)-(l?0:e),n.length&&(r&&(r[i]=e+a),-1!==t.indexOf("short")&&(a%=s,a!==a%(s/2)&&(a=0>a?a+s:a-s)),-1!==t.indexOf("_cw")&&0>a?a=(a+9999999999*s)%s-(0|a/s)*s:-1!==t.indexOf("ccw")&&a>0&&(a=(a-9999999999*s)%s-(0|a/s)*s)),o=e+a),h>o&&o>-h&&(o=0),o},oe={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},le=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},he=a.parseColor=function(t){var e,i,r,s,n,a;return t&&""!==t?"number"==typeof t?[t>>16,255&t>>8,255&t]:(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),oe[t]?oe[t]:"#"===t.charAt(0)?(4===t.length&&(e=t.charAt(1),i=t.charAt(2),r=t.charAt(3),t="#"+e+e+i+i+r+r),t=parseInt(t.substr(1),16),[t>>16,255&t>>8,255&t]):"hsl"===t.substr(0,3)?(t=t.match(m),s=Number(t[0])%360/360,n=Number(t[1])/100,a=Number(t[2])/100,i=.5>=a?a*(n+1):a+n-a*n,e=2*a-i,t.length>3&&(t[3]=Number(t[3])),t[0]=le(s+1/3,e,i),t[1]=le(s,e,i),t[2]=le(s-1/3,e,i),t):(t=t.match(m)||oe.transparent,t[0]=Number(t[0]),t[1]=Number(t[1]),t[2]=Number(t[2]),t.length>3&&(t[3]=Number(t[3])),t)):oe.black},ue="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(h in oe)ue+="|"+h+"\\b";ue=RegExp(ue+")","gi");var fe=function(t,e,i,r){if(null==t)return function(t){return t};var s,n=e?(t.match(ue)||[""])[0]:"",a=t.split(n).join("").match(v)||[],o=t.substr(0,t.indexOf(a[0])),l=")"===t.charAt(t.length-1)?")":"",h=-1!==t.indexOf(" ")?" ":",",u=a.length,f=u>0?a[0].replace(m,""):"";return u?s=e?function(t){var e,p,c,_;if("number"==typeof t)t+=f;else if(r&&D.test(t)){for(_=t.replace(D,"|").split("|"),c=0;_.length>c;c++)_[c]=s(_[c]);return _.join(",")}if(e=(t.match(ue)||[n])[0],p=t.split(e).join("").match(v)||[],c=p.length,u>c--)for(;u>++c;)p[c]=i?p[0|(c-1)/2]:a[c];return o+p.join(h)+h+e+l+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,n,p;if("number"==typeof t)t+=f;else if(r&&D.test(t)){for(n=t.replace(D,"|").split("|"),p=0;n.length>p;p++)n[p]=s(n[p]);return n.join(",")}if(e=t.match(v)||[],p=e.length,u>p--)for(;u>++p;)e[p]=i?e[0|(p-1)/2]:a[p];return o+e.join(h)+l}:function(t){return t}},pe=function(t){return t=t.split(","),function(e,i,r,s,n,a,o){var l,h=(i+"").split(" ");for(o={},l=0;4>l;l++)o[t[l]]=h[l]=h[l]||h[(l-1)/2>>0];return s.parse(e,o,n,a)}},ce=(Y._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,r,s,n=this.data,a=n.proxy,o=n.firstMPT,l=1e-6;o;)e=a[o.v],o.r?e=Math.round(e):l>e&&e>-l&&(e=0),o.t[o.p]=e,o=o._next;if(n.autoRotate&&(n.autoRotate.rotation=a.rotation),1===t)for(o=n.firstMPT;o;){if(i=o.t,i.type){if(1===i.type){for(s=i.xs0+i.s+i.xs1,r=1;i.l>r;r++)s+=i["xn"+r]+i["xs"+(r+1)];i.e=s}}else i.e=i.s+i.xs0;o=o._next}},function(t,e,i,r,s){this.t=t,this.p=e,this.v=i,this.r=s,r&&(r._prev=this,this._next=r)}),_e=(Y._parseToProxy=function(t,e,i,r,s,n){var a,o,l,h,u,f=r,p={},c={},_=i._transform,d=X;for(i._transform=null,X=e,r=u=i.parse(t,e,r,s),X=d,n&&(i._transform=_,f&&(f._prev=null,f._prev&&(f._prev._next=null)));r&&r!==f;){if(1>=r.type&&(o=r.p,c[o]=r.s+r.c,p[o]=r.s,n||(h=new ce(r,"s",o,h,r.r),r.c=0),1===r.type))for(a=r.l;--a>0;)l="xn"+a,o=r.p+"_"+l,c[o]=r.data[l],p[o]=r[l],n||(h=new ce(r,l,o,h,r.rxp[l]));r=r._next}return{proxy:p,end:c,firstMPT:h,pt:u}},Y.CSSPropTween=function(t,e,r,s,a,o,l,h,u,f,p){this.t=t,this.p=e,this.s=r,this.c=s,this.n=l||e,t instanceof _e||n.push(this.n),this.r=h,this.type=o||0,u&&(this.pr=u,i=!0),this.b=void 0===f?r:f,this.e=void 0===p?r+s:p,a&&(this._next=a,a._prev=this)}),de=a.parseComplex=function(t,e,i,r,s,n,a,o,l,h){i=i||n||"",a=new _e(t,e,0,0,a,h?2:1,null,!1,o,i,r),r+="";var f,p,c,_,d,v,y,x,T,w,b,S,C=i.split(", ").join(",").split(" "),O=r.split(", ").join(",").split(" "),k=C.length,R=u!==!1;for((-1!==r.indexOf(",")||-1!==i.indexOf(","))&&(C=C.join(" ").replace(D,", ").split(" "),O=O.join(" ").replace(D,", ").split(" "),k=C.length),k!==O.length&&(C=(n||"").split(" "),k=C.length),a.plugin=l,a.setRatio=h,f=0;k>f;f++)if(_=C[f],d=O[f],x=parseFloat(_),x||0===x)a.appendXtra("",x,se(d,x),d.replace(g,""),R&&-1!==d.indexOf("px"),!0);else if(s&&("#"===_.charAt(0)||oe[_]||P.test(_)))S=","===d.charAt(d.length-1)?"),":")",_=he(_),d=he(d),T=_.length+d.length>6,T&&!U&&0===d[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(O[f]).join("transparent")):(U||(T=!1),a.appendXtra(T?"rgba(":"rgb(",_[0],d[0]-_[0],",",!0,!0).appendXtra("",_[1],d[1]-_[1],",",!0).appendXtra("",_[2],d[2]-_[2],T?",":S,!0),T&&(_=4>_.length?1:_[3],a.appendXtra("",_,(4>d.length?1:d[3])-_,S,!1)));else if(v=_.match(m)){if(y=d.match(g),!y||y.length!==v.length)return a;for(c=0,p=0;v.length>p;p++)b=v[p],w=_.indexOf(b,c),a.appendXtra(_.substr(c,w-c),Number(b),se(y[p],b),"",R&&"px"===_.substr(w+b.length,2),0===p),c=w+b.length;a["xs"+a.l]+=_.substr(c)}else a["xs"+a.l]+=a.l?" "+_:_;if(-1!==r.indexOf("=")&&a.data){for(S=a.xs0+a.data.s,f=1;a.l>f;f++)S+=a["xs"+f]+a.data["xn"+f];a.e=S+a["xs"+f]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},me=9;for(h=_e.prototype,h.l=h.pr=0;--me>0;)h["xn"+me]=0,h["xs"+me]="";h.xs0="",h._next=h._prev=h.xfirst=h.data=h.plugin=h.setRatio=h.rxp=null,h.appendXtra=function(t,e,i,r,s,n){var a=this,o=a.l;return a["xs"+o]+=n&&o?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=r||"",o>0?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=s,a["xn"+o]=e,a.plugin||(a.xfirst=new _e(a,"xn"+o,e,i,a.xfirst||a,0,a.n,s,a.pr),a.xfirst.xs0=0),a):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=s,a)):(a["xs"+o]+=e+(r||""),a)};var ge=function(t,e){e=e||{},this.p=e.prefix?G(t)||t:t,l[t]=l[this.p]=this,this.format=e.formatter||fe(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},ve=Y._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var r,s,n=t.split(","),a=e.defaultValue;for(i=i||[a],r=0;n.length>r;r++)e.prefix=0===r&&e.prefix,e.defaultValue=i[r]||a,s=new ge(n[r],e)},ye=function(t){if(!l[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";ve(t,{parser:function(t,i,r,s,n,a,h){var u=o.com.greensock.plugins[e];return u?(u._cssRegister(),l[r].parse(t,i,r,s,n,a,h)):(V("Error: "+e+" js file not loaded."),n)}})}};h=ge.prototype,h.parseComplex=function(t,e,i,r,s,n){var a,o,l,h,u,f,p=this.keyword;if(this.multi&&(D.test(i)||D.test(e)?(o=e.replace(D,"|").split("|"),l=i.replace(D,"|").split("|")):p&&(o=[e],l=[i])),l){for(h=l.length>o.length?l.length:o.length,a=0;h>a;a++)e=o[a]=o[a]||this.dflt,i=l[a]=l[a]||this.dflt,p&&(u=e.indexOf(p),f=i.indexOf(p),u!==f&&(-1===f?o[a]=o[a].split(p).join(""):-1===u&&(o[a]+=" "+p)));e=o.join(", "),i=l.join(", ")}return de(t,this.p,e,i,this.clrs,this.dflt,r,this.pr,s,n)},h.parse=function(t,e,i,r,n,a){return this.parseComplex(t.style,this.format(Q(t,this.p,s,!1,this.dflt)),this.format(e),n,a)},a.registerSpecialProp=function(t,e,i){ve(t,{parser:function(t,r,s,n,a,o){var l=new _e(t,s,0,0,a,2,s,!1,i);return l.plugin=o,l.setRatio=e(t,r,n._tween,s),l},priority:i})},a.useSVGTransformAttr=p;var xe,Te="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),we=G("transform"),be=W+"transform",Pe=G("transformOrigin"),Se=null!==G("perspective"),Ce=Y.Transform=function(){this.perspective=parseFloat(a.defaultTransformPerspective)||0,this.force3D=a.defaultForce3D!==!1&&Se?a.defaultForce3D||"auto":!1},Oe=window.SVGElement,ke=function(t,e,i){var r,s=z.createElementNS("http://www.w3.org/2000/svg",t),n=/([a-z])([A-Z])/g;for(r in i)s.setAttributeNS(null,r.replace(n,"$1-$2").toLowerCase(),i[r]);return e.appendChild(s),s},Re=z.documentElement,Ae=function(){var t,e,i,r=d||/Android/i.test(B)&&!window.chrome;return z.createElementNS&&!r&&(t=ke("svg",Re),e=ke("rect",t,{width:100,height:50,x:100}),i=e.getBoundingClientRect().width,e.style[Pe]="50% 50%",e.style[we]="scaleX(0.5)",r=i===e.getBoundingClientRect().width&&!(c&&Se),Re.removeChild(t)),r}(),Me=function(t,e,i,r){var s,n;r&&(n=r.split(" ")).length||(s=t.getBBox(),e=re(e).split(" "),n=[(-1!==e[0].indexOf("%")?parseFloat(e[0])/100*s.width:parseFloat(e[0]))+s.x,(-1!==e[1].indexOf("%")?parseFloat(e[1])/100*s.height:parseFloat(e[1]))+s.y]),i.xOrigin=parseFloat(n[0]),i.yOrigin=parseFloat(n[1]),t.setAttribute("data-svg-origin",n.join(" "))},De=Y.getTransform=function(t,e,i,r){if(t._gsTransform&&i&&!r)return t._gsTransform;var n,o,l,h,u,f,p,c,_,d,m=i?t._gsTransform||new Ce:new Ce,g=0>m.scaleX,v=2e-5,y=1e5,x=Se?parseFloat(Q(t,Pe,e,!1,"0 0 0").split(" ")[2])||m.zOrigin||0:0,T=parseFloat(a.defaultTransformPerspective)||0;if(we?o=Q(t,be,e,!0):t.currentStyle&&(o=t.currentStyle.filter.match(A),o=o&&4===o.length?[o[0].substr(4),Number(o[2].substr(4)),Number(o[1].substr(4)),o[3].substr(4),m.x||0,m.y||0].join(","):""),n=!o||"none"===o||"matrix(1, 0, 0, 1, 0, 0)"===o,m.svg=!!(Oe&&"function"==typeof t.getBBox&&t.getCTM&&(!t.parentNode||t.parentNode.getBBox&&t.parentNode.getCTM)),m.svg&&(n&&-1!==(t.style[we]+"").indexOf("matrix")&&(o=t.style[we],n=!1),Me(t,Q(t,Pe,s,!1,"50% 50%")+"",m,t.getAttribute("data-svg-origin")),xe=a.useSVGTransformAttr||Ae,l=t.getAttribute("transform"),n&&l&&-1!==l.indexOf("matrix")&&(o=l,n=0)),!n){for(l=(o||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],h=l.length;--h>-1;)u=Number(l[h]),l[h]=(f=u-(u|=0))?(0|f*y+(0>f?-.5:.5))/y+u:u;if(16===l.length){var w,b,P,S,C,O=l[0],k=l[1],R=l[2],M=l[3],D=l[4],N=l[5],X=l[6],z=l[7],E=l[8],F=l[9],I=l[10],Y=l[12],B=l[13],U=l[14],j=l[11],V=Math.atan2(X,I);m.zOrigin&&(U=-m.zOrigin,Y=E*U-l[12],B=F*U-l[13],U=I*U+m.zOrigin-l[14]),m.rotationX=V*L,V&&(S=Math.cos(-V),C=Math.sin(-V),w=D*S+E*C,b=N*S+F*C,P=X*S+I*C,E=D*-C+E*S,F=N*-C+F*S,I=X*-C+I*S,j=z*-C+j*S,D=w,N=b,X=P),V=Math.atan2(E,I),m.rotationY=V*L,V&&(S=Math.cos(-V),C=Math.sin(-V),w=O*S-E*C,b=k*S-F*C,P=R*S-I*C,F=k*C+F*S,I=R*C+I*S,j=M*C+j*S,O=w,k=b,R=P),V=Math.atan2(k,O),m.rotation=V*L,V&&(S=Math.cos(-V),C=Math.sin(-V),O=O*S+D*C,b=k*S+N*C,N=k*-C+N*S,X=R*-C+X*S,k=b),m.rotationX&&Math.abs(m.rotationX)+Math.abs(m.rotation)>359.9&&(m.rotationX=m.rotation=0,m.rotationY+=180),m.scaleX=(0|Math.sqrt(O*O+k*k)*y+.5)/y,m.scaleY=(0|Math.sqrt(N*N+F*F)*y+.5)/y,m.scaleZ=(0|Math.sqrt(X*X+I*I)*y+.5)/y,m.skewX=0,m.perspective=j?1/(0>j?-j:j):0,m.x=Y,m.y=B,m.z=U,m.svg&&(m.x-=m.xOrigin-(m.xOrigin*O-m.yOrigin*D),m.y-=m.yOrigin-(m.yOrigin*k-m.xOrigin*N))}else if(!(Se&&!r&&l.length&&m.x===l[4]&&m.y===l[5]&&(m.rotationX||m.rotationY)||void 0!==m.x&&"none"===Q(t,"display",e))){var W=l.length>=6,q=W?l[0]:1,G=l[1]||0,H=l[2]||0,Z=W?l[3]:1;m.x=l[4]||0,m.y=l[5]||0,p=Math.sqrt(q*q+G*G),c=Math.sqrt(Z*Z+H*H),_=q||G?Math.atan2(G,q)*L:m.rotation||0,d=H||Z?Math.atan2(H,Z)*L+_:m.skewX||0,Math.abs(d)>90&&270>Math.abs(d)&&(g?(p*=-1,d+=0>=_?180:-180,_+=0>=_?180:-180):(c*=-1,d+=0>=d?180:-180)),m.scaleX=p,m.scaleY=c,m.rotation=_,m.skewX=d,Se&&(m.rotationX=m.rotationY=m.z=0,m.perspective=T,m.scaleZ=1),m.svg&&(m.x-=m.xOrigin-(m.xOrigin*q-m.yOrigin*G),m.y-=m.yOrigin-(m.yOrigin*Z-m.xOrigin*H))}m.zOrigin=x;for(h in m)v>m[h]&&m[h]>-v&&(m[h]=0)}return i&&(t._gsTransform=m,m.svg&&(xe&&t.style[we]?ze(t.style,we):!xe&&t.getAttribute("transform")&&t.removeAttribute("transform"))),m},Ne=function(t){var e,i,r=this.data,s=-r.rotation*N,n=s+r.skewX*N,a=1e5,o=(0|Math.cos(s)*r.scaleX*a)/a,l=(0|Math.sin(s)*r.scaleX*a)/a,h=(0|Math.sin(n)*-r.scaleY*a)/a,u=(0|Math.cos(n)*r.scaleY*a)/a,f=this.t.style,p=this.t.currentStyle;if(p){i=l,l=-h,h=-i,e=p.filter,f.filter="";var c,_,m=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==p.position,y="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+l+", M21="+h+", M22="+u,w=r.x+m*r.xPercent/100,b=r.y+g*r.yPercent/100;if(null!=r.ox&&(c=(r.oxp?.01*m*r.ox:r.ox)-m/2,_=(r.oyp?.01*g*r.oy:r.oy)-g/2,w+=c-(c*o+_*l),b+=_-(c*h+_*u)),v?(c=m/2,_=g/2,y+=", Dx="+(c-(c*o+_*l)+w)+", Dy="+(_-(c*h+_*u)+b)+")"):y+=", sizingMethod='auto expand')",f.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(M,y):y+" "+e,(0===t||1===t)&&1===o&&0===l&&0===h&&1===u&&(v&&-1===y.indexOf("Dx=0, Dy=0")||T.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf("gradient("&&e.indexOf("Alpha"))&&f.removeAttribute("filter")),!v){var P,S,C,O=8>d?1:-1;for(c=r.ieOffsetX||0,_=r.ieOffsetY||0,r.ieOffsetX=Math.round((m-((0>o?-o:o)*m+(0>l?-l:l)*g))/2+w),r.ieOffsetY=Math.round((g-((0>u?-u:u)*g+(0>h?-h:h)*m))/2+b),me=0;4>me;me++)S=ee[me],P=p[S],i=-1!==P.indexOf("px")?parseFloat(P):Z(this.t,S,parseFloat(P),P.replace(x,""))||0,C=i!==r[S]?2>me?-r.ieOffsetX:-r.ieOffsetY:2>me?c-r.ieOffsetX:_-r.ieOffsetY,f[S]=(r[S]=Math.round(i-C*(0===me||2===me?1:O)))+"px"}}},Le=Y.set3DTransformRatio=Y.setTransformRatio=function(t){var e,i,r,s,n,a,o,l,h,u,f,p,_,d,m,g,v,y,x,T,w,b,P,S=this.data,C=this.t.style,O=S.rotation,k=S.rotationX,R=S.rotationY,A=S.scaleX,M=S.scaleY,D=S.scaleZ,L=S.x,X=S.y,z=S.z,E=S.svg,F=S.perspective,I=S.force3D;if(!(((1!==t&&0!==t||"auto"!==I||this.tween._totalTime!==this.tween._totalDuration&&this.tween._totalTime)&&I||z||F||R||k)&&(!xe||!E)&&Se))return O||S.skewX||E?(O*=N,b=S.skewX*N,P=1e5,e=Math.cos(O)*A,s=Math.sin(O)*A,i=Math.sin(O-b)*-M,n=Math.cos(O-b)*M,b&&"simple"===S.skewType&&(v=Math.tan(b),v=Math.sqrt(1+v*v),i*=v,n*=v,S.skewY&&(e*=v,s*=v)),E&&(L+=S.xOrigin-(S.xOrigin*e+S.yOrigin*i),X+=S.yOrigin-(S.xOrigin*s+S.yOrigin*n),d=1e-6,d>L&&L>-d&&(L=0),d>X&&X>-d&&(X=0)),x=(0|e*P)/P+","+(0|s*P)/P+","+(0|i*P)/P+","+(0|n*P)/P+","+L+","+X+")",E&&xe?this.t.setAttribute("transform","matrix("+x):C[we]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix(":"matrix(")+x):C[we]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix(":"matrix(")+A+",0,0,"+M+","+L+","+X+")",void 0;if(c&&(d=1e-4,d>A&&A>-d&&(A=D=2e-5),d>M&&M>-d&&(M=D=2e-5),!F||S.z||S.rotationX||S.rotationY||(F=0)),O||S.skewX)O*=N,m=e=Math.cos(O),g=s=Math.sin(O),S.skewX&&(O-=S.skewX*N,m=Math.cos(O),g=Math.sin(O),"simple"===S.skewType&&(v=Math.tan(S.skewX*N),v=Math.sqrt(1+v*v),m*=v,g*=v,S.skewY&&(e*=v,s*=v))),i=-g,n=m;else{if(!(R||k||1!==D||F||E))return C[we]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) translate3d(":"translate3d(")+L+"px,"+X+"px,"+z+"px)"+(1!==A||1!==M?" scale("+A+","+M+")":""),void 0;e=n=1,i=s=0}h=1,r=a=o=l=u=f=0,p=F?-1/F:0,_=S.zOrigin,d=1e-6,T=",",w="0",O=R*N,O&&(m=Math.cos(O),g=Math.sin(O),o=-g,u=p*-g,r=e*g,a=s*g,h=m,p*=m,e*=m,s*=m),O=k*N,O&&(m=Math.cos(O),g=Math.sin(O),v=i*m+r*g,y=n*m+a*g,l=h*g,f=p*g,r=i*-g+r*m,a=n*-g+a*m,h*=m,p*=m,i=v,n=y),1!==D&&(r*=D,a*=D,h*=D,p*=D),1!==M&&(i*=M,n*=M,l*=M,f*=M),1!==A&&(e*=A,s*=A,o*=A,u*=A),(_||E)&&(_&&(L+=r*-_,X+=a*-_,z+=h*-_+_),E&&(L+=S.xOrigin-(S.xOrigin*e+S.yOrigin*i),X+=S.yOrigin-(S.xOrigin*s+S.yOrigin*n)),d>L&&L>-d&&(L=w),d>X&&X>-d&&(X=w),d>z&&z>-d&&(z=0)),x=S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix3d(":"matrix3d(",x+=(d>e&&e>-d?w:e)+T+(d>s&&s>-d?w:s)+T+(d>o&&o>-d?w:o),x+=T+(d>u&&u>-d?w:u)+T+(d>i&&i>-d?w:i)+T+(d>n&&n>-d?w:n),k||R?(x+=T+(d>l&&l>-d?w:l)+T+(d>f&&f>-d?w:f)+T+(d>r&&r>-d?w:r),x+=T+(d>a&&a>-d?w:a)+T+(d>h&&h>-d?w:h)+T+(d>p&&p>-d?w:p)+T):x+=",0,0,0,0,1,0,",x+=L+T+X+T+z+T+(F?1+-z/F:1)+")",C[we]=x};h=Ce.prototype,h.x=h.y=h.z=h.skewX=h.skewY=h.rotation=h.rotationX=h.rotationY=h.zOrigin=h.xPercent=h.yPercent=0,h.scaleX=h.scaleY=h.scaleZ=1,ve("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",{parser:function(t,e,i,r,n,o,l){if(r._lastParsedTransform===l)return n;r._lastParsedTransform=l;var h,u,f,p,c,_,d,m=r._transform=De(t,s,!0,l.parseTransform),g=t.style,v=1e-6,y=Te.length,x=l,T={};if("string"==typeof x.transform&&we)f=F.style,f[we]=x.transform,f.display="block",f.position="absolute",z.body.appendChild(F),h=De(F,null,!1),z.body.removeChild(F);else if("object"==typeof x){if(h={scaleX:ne(null!=x.scaleX?x.scaleX:x.scale,m.scaleX),scaleY:ne(null!=x.scaleY?x.scaleY:x.scale,m.scaleY),scaleZ:ne(x.scaleZ,m.scaleZ),x:ne(x.x,m.x),y:ne(x.y,m.y),z:ne(x.z,m.z),xPercent:ne(x.xPercent,m.xPercent),yPercent:ne(x.yPercent,m.yPercent),perspective:ne(x.transformPerspective,m.perspective)},d=x.directionalRotation,null!=d)if("object"==typeof d)for(f in d)x[f]=d[f];else x.rotation=d;"string"==typeof x.x&&-1!==x.x.indexOf("%")&&(h.x=0,h.xPercent=ne(x.x,m.xPercent)),"string"==typeof x.y&&-1!==x.y.indexOf("%")&&(h.y=0,h.yPercent=ne(x.y,m.yPercent)),h.rotation=ae("rotation"in x?x.rotation:"shortRotation"in x?x.shortRotation+"_short":"rotationZ"in x?x.rotationZ:m.rotation,m.rotation,"rotation",T),Se&&(h.rotationX=ae("rotationX"in x?x.rotationX:"shortRotationX"in x?x.shortRotationX+"_short":m.rotationX||0,m.rotationX,"rotationX",T),h.rotationY=ae("rotationY"in x?x.rotationY:"shortRotationY"in x?x.shortRotationY+"_short":m.rotationY||0,m.rotationY,"rotationY",T)),h.skewX=null==x.skewX?m.skewX:ae(x.skewX,m.skewX),h.skewY=null==x.skewY?m.skewY:ae(x.skewY,m.skewY),(u=h.skewY-m.skewY)&&(h.skewX+=u,h.rotation+=u)}for(Se&&null!=x.force3D&&(m.force3D=x.force3D,_=!0),m.skewType=x.skewType||m.skewType||a.defaultSkewType,c=m.force3D||m.z||m.rotationX||m.rotationY||h.z||h.rotationX||h.rotationY||h.perspective,c||null==x.scale||(h.scaleZ=1);--y>-1;)i=Te[y],p=h[i]-m[i],(p>v||-v>p||null!=x[i]||null!=X[i])&&(_=!0,n=new _e(m,i,m[i],p,n),i in T&&(n.e=T[i]),n.xs0=0,n.plugin=o,r._overwriteProps.push(n.n));return p=x.transformOrigin,m.svg&&(p||x.svgOrigin)&&(Me(t,re(p),h,x.svgOrigin),n=new _e(m,"xOrigin",m.xOrigin,h.xOrigin-m.xOrigin,n,-1,"transformOrigin"),n.b=m.xOrigin,n.e=n.xs0=h.xOrigin,n=new _e(m,"yOrigin",m.yOrigin,h.yOrigin-m.yOrigin,n,-1,"transformOrigin"),n.b=m.yOrigin,n.e=n.xs0=h.yOrigin,p=xe?null:"0px 0px"),(p||Se&&c&&m.zOrigin)&&(we?(_=!0,i=Pe,p=(p||Q(t,i,s,!1,"50% 50%"))+"",n=new _e(g,i,0,0,n,-1,"transformOrigin"),n.b=g[i],n.plugin=o,Se?(f=m.zOrigin,p=p.split(" "),m.zOrigin=(p.length>2&&(0===f||"0px"!==p[2])?parseFloat(p[2]):f)||0,n.xs0=n.e=p[0]+" "+(p[1]||"50%")+" 0px",n=new _e(m,"zOrigin",0,0,n,-1,n.n),n.b=f,n.xs0=n.e=m.zOrigin):n.xs0=n.e=p):re(p+"",m)),_&&(r._transformType=m.svg&&xe||!c&&3!==this._transformType?2:3),n},prefix:!0}),ve("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),ve("borderRadius",{defaultValue:"0px",parser:function(t,e,i,n,a){e=this.format(e);var o,l,h,u,f,p,c,_,d,m,g,v,y,x,T,w,b=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(d=parseFloat(t.offsetWidth),m=parseFloat(t.offsetHeight),o=e.split(" "),l=0;b.length>l;l++)this.p.indexOf("border")&&(b[l]=G(b[l])),f=u=Q(t,b[l],s,!1,"0px"),-1!==f.indexOf(" ")&&(u=f.split(" "),f=u[0],u=u[1]),p=h=o[l],c=parseFloat(f),v=f.substr((c+"").length),y="="===p.charAt(1),y?(_=parseInt(p.charAt(0)+"1",10),p=p.substr(2),_*=parseFloat(p),g=p.substr((_+"").length-(0>_?1:0))||""):(_=parseFloat(p),g=p.substr((_+"").length)),""===g&&(g=r[i]||v),g!==v&&(x=Z(t,"borderLeft",c,v),T=Z(t,"borderTop",c,v),"%"===g?(f=100*(x/d)+"%",u=100*(T/m)+"%"):"em"===g?(w=Z(t,"borderLeft",1,"em"),f=x/w+"em",u=T/w+"em"):(f=x+"px",u=T+"px"),y&&(p=parseFloat(f)+_+g,h=parseFloat(u)+_+g)),a=de(P,b[l],f+" "+u,p+" "+h,!1,"0px",a);return a},prefix:!0,formatter:fe("0px 0px 0px 0px",!1,!0)}),ve("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,r,n,a){var o,l,h,u,f,p,c="background-position",_=s||H(t,null),m=this.format((_?d?_.getPropertyValue(c+"-x")+" "+_.getPropertyValue(c+"-y"):_.getPropertyValue(c):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==m.indexOf("%")!=(-1!==g.indexOf("%"))&&(p=Q(t,"backgroundImage").replace(O,""),p&&"none"!==p)){for(o=m.split(" "),l=g.split(" "),I.setAttribute("src",p),h=2;--h>-1;)m=o[h],u=-1!==m.indexOf("%"),u!==(-1!==l[h].indexOf("%"))&&(f=0===h?t.offsetWidth-I.width:t.offsetHeight-I.height,o[h]=u?parseFloat(m)/100*f+"px":100*(parseFloat(m)/f)+"%");m=o.join(" ")}return this.parseComplex(t.style,m,g,n,a)},formatter:re}),ve("backgroundSize",{defaultValue:"0 0",formatter:re}),ve("perspective",{defaultValue:"0px",prefix:!0}),ve("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),ve("transformStyle",{prefix:!0}),ve("backfaceVisibility",{prefix:!0}),ve("userSelect",{prefix:!0}),ve("margin",{parser:pe("marginTop,marginRight,marginBottom,marginLeft")}),ve("padding",{parser:pe("paddingTop,paddingRight,paddingBottom,paddingLeft")}),ve("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,r,n,a){var o,l,h;return 9>d?(l=t.currentStyle,h=8>d?" ":",",o="rect("+l.clipTop+h+l.clipRight+h+l.clipBottom+h+l.clipLeft+")",e=this.format(e).split(",").join(h)):(o=this.format(Q(t,this.p,s,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,o,e,n,a)}}),ve("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),ve("autoRound,strictUnits",{parser:function(t,e,i,r,s){return s}}),ve("border",{defaultValue:"0px solid #000",parser:function(t,e,i,r,n,a){return this.parseComplex(t.style,this.format(Q(t,"borderTopWidth",s,!1,"0px")+" "+Q(t,"borderTopStyle",s,!1,"solid")+" "+Q(t,"borderTopColor",s,!1,"#000")),this.format(e),n,a)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(ue)||["#000"])[0]}}),ve("borderWidth",{parser:pe("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),ve("float,cssFloat,styleFloat",{parser:function(t,e,i,r,s){var n=t.style,a="cssFloat"in n?"cssFloat":"styleFloat";return new _e(n,a,0,0,s,-1,i,!1,0,n[a],e)}});var Xe=function(t){var e,i=this.t,r=i.filter||Q(this.data,"filter")||"",s=0|this.s+this.c*t;100===s&&(-1===r.indexOf("atrix(")&&-1===r.indexOf("radient(")&&-1===r.indexOf("oader(")?(i.removeAttribute("filter"),e=!Q(this.data,"filter")):(i.filter=r.replace(b,""),e=!0)),e||(this.xn1&&(i.filter=r=r||"alpha(opacity="+s+")"),-1===r.indexOf("pacity")?0===s&&this.xn1||(i.filter=r+" alpha(opacity="+s+")"):i.filter=r.replace(T,"opacity="+s))};ve("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,r,n,a){var o=parseFloat(Q(t,"opacity",s,!1,"1")),l=t.style,h="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+o),h&&1===o&&"hidden"===Q(t,"visibility",s)&&0!==e&&(o=0),U?n=new _e(l,"opacity",o,e-o,n):(n=new _e(l,"opacity",100*o,100*(e-o),n),n.xn1=h?1:0,l.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=a,n.setRatio=Xe),h&&(n=new _e(l,"visibility",0,0,n,-1,null,!1,0,0!==o?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",r._overwriteProps.push(n.n),r._overwriteProps.push(i)),n}});var ze=function(t,e){e&&(t.removeProperty?(("ms"===e.substr(0,2)||"webkit"===e.substr(0,6))&&(e="-"+e),t.removeProperty(e.replace(S,"-$1").toLowerCase())):t.removeAttribute(e))},Ee=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:ze(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};ve("className",{parser:function(t,e,r,n,a,o,l){var h,u,f,p,c,_=t.getAttribute("class")||"",d=t.style.cssText;if(a=n._classNamePT=new _e(t,r,0,0,a,2),a.setRatio=Ee,a.pr=-11,i=!0,a.b=_,u=K(t,s),f=t._gsClassPT){for(p={},c=f.data;c;)p[c.p]=1,c=c._next;f.setRatio(1)}return t._gsClassPT=a,a.e="="!==e.charAt(1)?e:_.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),t.setAttribute("class",a.e),h=J(t,u,K(t),l,p),t.setAttribute("class",_),a.data=h.firstMPT,t.style.cssText=d,a=a.xfirst=n.parse(t,h.difs,a,o)}});var Fe=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,r,s,n,a=this.t.style,o=l.transform.parse;if("all"===this.e)a.cssText="",s=!0;else for(e=this.e.split(" ").join("").split(","),r=e.length;--r>-1;)i=e[r],l[i]&&(l[i].parse===o?s=!0:i="transformOrigin"===i?Pe:l[i].p),ze(a,i);s&&(ze(a,we),n=this.t._gsTransform,n&&(n.svg&&this.t.removeAttribute("data-svg-origin"),delete this.t._gsTransform))}};for(ve("clearProps",{parser:function(t,e,r,s,n){return n=new _e(t,r,0,0,n,2),n.setRatio=Fe,n.e=e,n.pr=-10,n.data=s._tween,i=!0,n}}),h="bezier,throwProps,physicsProps,physics2D".split(","),me=h.length;me--;)ye(h[me]);h=a.prototype,h._firstPT=h._lastParsedTransform=h._transform=null,h._onInitTween=function(t,e,o){if(!t.nodeType)return!1;this._target=t,this._tween=o,this._vars=e,u=e.autoRound,i=!1,r=e.suffixMap||a.suffixMap,s=H(t,""),n=this._overwriteProps;var h,c,d,m,g,v,y,x,T,b=t.style;if(f&&""===b.zIndex&&(h=Q(t,"zIndex",s),("auto"===h||""===h)&&this._addLazySet(b,"zIndex",0)),"string"==typeof e&&(m=b.cssText,h=K(t,s),b.cssText=m+";"+e,h=J(t,h,K(t)).difs,!U&&w.test(e)&&(h.opacity=parseFloat(RegExp.$1)),e=h,b.cssText=m),this._firstPT=c=e.className?l.className.parse(t,e.className,"className",this,null,null,e):this.parse(t,e,null),this._transformType){for(T=3===this._transformType,we?p&&(f=!0,""===b.zIndex&&(y=Q(t,"zIndex",s),("auto"===y||""===y)&&this._addLazySet(b,"zIndex",0)),_&&this._addLazySet(b,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(T?"visible":"hidden"))):b.zoom=1,d=c;d&&d._next;)d=d._next;x=new _e(t,"transform",0,0,null,2),this._linkCSSP(x,null,d),x.setRatio=we?Le:Ne,x.data=this._transform||De(t,s,!0),x.tween=o,x.pr=-1,n.pop()}if(i){for(;c;){for(v=c._next,d=m;d&&d.pr>c.pr;)d=d._next;(c._prev=d?d._prev:g)?c._prev._next=c:m=c,(c._next=d)?d._prev=c:g=c,c=v}this._firstPT=m}return!0},h.parse=function(t,e,i,n){var a,o,h,f,p,c,_,d,m,g,v=t.style;for(a in e)c=e[a],o=l[a],o?i=o.parse(t,c,a,this,i,n,e):(p=Q(t,a,s)+"",m="string"==typeof c,"color"===a||"fill"===a||"stroke"===a||-1!==a.indexOf("Color")||m&&P.test(c)?(m||(c=he(c),c=(c.length>3?"rgba(":"rgb(")+c.join(",")+")"),i=de(v,a,p,c,!0,"transparent",i,0,n)):!m||-1===c.indexOf(" ")&&-1===c.indexOf(",")?(h=parseFloat(p),_=h||0===h?p.substr((h+"").length):"",(""===p||"auto"===p)&&("width"===a||"height"===a?(h=ie(t,a,s),_="px"):"left"===a||"top"===a?(h=$(t,a,s),_="px"):(h="opacity"!==a?0:1,_="")),g=m&&"="===c.charAt(1),g?(f=parseInt(c.charAt(0)+"1",10),c=c.substr(2),f*=parseFloat(c),d=c.replace(x,"")):(f=parseFloat(c),d=m?c.replace(x,""):""),""===d&&(d=a in r?r[a]:_),c=f||0===f?(g?f+h:f)+d:e[a],_!==d&&""!==d&&(f||0===f)&&h&&(h=Z(t,a,h,_),"%"===d?(h/=Z(t,a,100,"%")/100,e.strictUnits!==!0&&(p=h+"%")):"em"===d?h/=Z(t,a,1,"em"):"px"!==d&&(f=Z(t,a,f,d),d="px"),g&&(f||0===f)&&(c=f+h+d)),g&&(f+=h),!h&&0!==h||!f&&0!==f?void 0!==v[a]&&(c||"NaN"!=c+""&&null!=c)?(i=new _e(v,a,f||h||0,0,i,-1,a,!1,0,p,c),i.xs0="none"!==c||"display"!==a&&-1===a.indexOf("Style")?c:p):V("invalid "+a+" tween value: "+e[a]):(i=new _e(v,a,h,f-h,i,0,a,u!==!1&&("px"===d||"zIndex"===a),0,p,c),i.xs0=d)):i=de(v,a,p,c,!0,null,i,0,n)),n&&i&&!i.plugin&&(i.plugin=n);
return i},h.setRatio=function(t){var e,i,r,s=this._firstPT,n=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;s;){if(e=s.c*t+s.s,s.r?e=Math.round(e):n>e&&e>-n&&(e=0),s.type)if(1===s.type)if(r=s.l,2===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2;else if(3===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3;else if(4===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4;else if(5===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4+s.xn4+s.xs5;else{for(i=s.xs0+e+s.xs1,r=1;s.l>r;r++)i+=s["xn"+r]+s["xs"+(r+1)];s.t[s.p]=i}else-1===s.type?s.t[s.p]=s.xs0:s.setRatio&&s.setRatio(t);else s.t[s.p]=e+s.xs0;s=s._next}else for(;s;)2!==s.type?s.t[s.p]=s.b:s.setRatio(t),s=s._next;else for(;s;)2!==s.type?s.t[s.p]=s.e:s.setRatio(t),s=s._next},h._enableTransforms=function(t){this._transform=this._transform||De(this._target,s,!0),this._transformType=this._transform.svg&&xe||!t&&3!==this._transformType?2:3};var Ie=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};h._addLazySet=function(t,e,i){var r=this._firstPT=new _e(t,e,0,0,this._firstPT,2);r.e=i,r.setRatio=Ie,r.data=this},h._linkCSSP=function(t,e,i,r){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,r=!0),i?i._next=t:r||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},h._kill=function(e){var i,r,s,n=e;if(e.autoAlpha||e.alpha){n={};for(r in e)n[r]=e[r];n.opacity=1,n.autoAlpha&&(n.visibility=1)}return e.className&&(i=this._classNamePT)&&(s=i.xfirst,s&&s._prev?this._linkCSSP(s._prev,i._next,s._prev._prev):s===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,s._prev),this._classNamePT=null),t.prototype._kill.call(this,n)};var Ye=function(t,e,i){var r,s,n,a;if(t.slice)for(s=t.length;--s>-1;)Ye(t[s],e,i);else for(r=t.childNodes,s=r.length;--s>-1;)n=r[s],a=n.type,n.style&&(e.push(K(n)),i&&i.push(n)),1!==a&&9!==a&&11!==a||!n.childNodes.length||Ye(n,e,i)};return a.cascadeTo=function(t,i,r){var s,n,a,o,l=e.to(t,i,r),h=[l],u=[],f=[],p=[],c=e._internals.reservedProps;for(t=l._targets||l.target,Ye(t,u,p),l.render(i,!0,!0),Ye(t,f),l.render(0,!0,!0),l._enabled(!0),s=p.length;--s>-1;)if(n=J(p[s],u[s],f[s]),n.firstMPT){n=n.difs;for(a in r)c[a]&&(n[a]=r[a]);o={};for(a in n)o[a]=u[s][a];h.push(e.fromTo(p[s],i,o,n))}return h},t.activate([a]),a},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=e())}("CSSPlugin");;//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);;(function(a){function b(){if(this.isDisposed)throw new Error(eb)}function c(a,b){if(fb&&b.stack&&"object"==typeof a&&null!==a&&a.stack&&-1===a.stack.indexOf(jb)){for(var c=[],e=b;e;e=e.source)e.stack&&c.unshift(e.stack);c.unshift(a.stack);var f=c.join("\n"+jb+"\n");a.stack=d(f)}}function d(a){for(var b=a.split("\n"),c=[],d=0,g=b.length;g>d;d++){var h=b[d];e(h)||f(h)||!h||c.push(h)}return c.join("\n")}function e(a){var b=h(a);if(!b)return!1;var c=b[0],d=b[1];return c===hb&&d>=ib&&$c>=d}function f(a){return-1!==a.indexOf("(module.js:")||-1!==a.indexOf("(node.js:")}function g(){if(fb)try{throw new Error}catch(a){var b=a.stack.split("\n"),c=b[0].indexOf("@")>0?b[1]:b[2],d=h(c);if(!d)return;return hb=d[0],d[1]}}function h(a){var b=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if(b)return[b[1],Number(b[2])];var c=/at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if(c)return[c[1],Number(c[2])];var d=/.*@(.+):(\d+)$/.exec(a);return d?[d[1],Number(d[2])]:void 0}function i(a){var b=[];if(!Kb(a))return b;Jb.nonEnumArgs&&a.length&&Lb(a)&&(a=Nb.call(a));var c=Jb.enumPrototypes&&"function"==typeof a,d=Jb.enumErrorProps&&(a===Eb||a instanceof Error);for(var e in a)c&&"prototype"==e||d&&("message"==e||"name"==e)||b.push(e);if(Jb.nonEnumShadows&&a!==Fb){var f=a.constructor,g=-1,h=qb;if(a===(f&&f.prototype))var i=a===Gb?Ab:a===Eb?vb:Bb.call(a),j=Ib[i];for(;++g<h;)e=pb[g],j&&j[e]||!Cb.call(a,e)||b.push(e)}return b}function j(a,b,c){for(var d=-1,e=c(a),f=e.length;++d<f;){var g=e[d];if(b(a[g],g,a)===!1)break}return a}function k(a,b){return j(a,b,i)}function l(a){return"function"!=typeof a.toString&&"string"==typeof(a+"")}function m(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;var e=typeof a,f=typeof b;if(a===a&&(null==a||null==b||"function"!=e&&"object"!=e&&"function"!=f&&"object"!=f))return!1;var g=Bb.call(a),h=Bb.call(b);if(g==rb&&(g=yb),h==rb&&(h=yb),g!=h)return!1;switch(g){case tb:case ub:return+a==+b;case xb:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case zb:case Ab:return a==String(b)}var i=g==sb;if(!i){if(g!=yb||!Jb.nodeClass&&(l(a)||l(b)))return!1;var j=!Jb.argsObject&&Lb(a)?Object:a.constructor,n=!Jb.argsObject&&Lb(b)?Object:b.constructor;if(!(j==n||Cb.call(a,"constructor")&&Cb.call(b,"constructor")||cb(j)&&j instanceof j&&cb(n)&&n instanceof n||!("constructor"in a&&"constructor"in b)))return!1}c||(c=[]),d||(d=[]);for(var o=c.length;o--;)if(c[o]==a)return d[o]==b;var p=0,q=!0;if(c.push(a),d.push(b),i){if(o=a.length,p=b.length,q=p==o)for(;p--;){var r=b[p];if(!(q=m(a[p],r,c,d)))break}}else k(b,function(b,e,f){return Cb.call(f,e)?(p++,q=Cb.call(a,e)&&m(a[e],b,c,d)):void 0}),q&&k(a,function(a,b,c){return Cb.call(c,b)?q=--p>-1:void 0});return c.pop(),d.pop(),q}function n(a,b){return 1===a.length&&Array.isArray(a[b])?a[b]:Nb.call(a)}function o(a,b){for(var c=new Array(a),d=0;a>d;d++)c[d]=b();return c}function p(a,b){this.id=a,this.value=b}function q(){this._s=s}function r(){this._s=s,this._l=s.length,this._i=0}function t(a){this._a=a}function u(a){this._a=a,this._l=y(a),this._i=0}function v(a){return"number"==typeof a&&Q.isFinite(a)}function w(b){var c,d=b[kb];if(!d&&"string"==typeof b)return c=new q(b),c[kb]();if(!d&&b.length!==a)return c=new t(b),c[kb]();if(!d)throw new TypeError("Object is not iterable");return b[kb]()}function x(a){var b=+a;return 0===b?b:isNaN(b)?b:0>b?-1:1}function y(a){var b=+a.length;return isNaN(b)?0:0!==b&&v(b)?(b=x(b)*Math.floor(Math.abs(b)),0>=b?0:b>Bc?Bc:b):b}function z(a,b){return X(a)||(a=ec),new Sc(function(c){var d=0,e=b.length;return a.scheduleRecursive(function(a){e>d?(c.onNext(b[d++]),a()):c.onCompleted()})})}function A(a,b){return new Sc(function(c){var d=new Zb,e=new $b;return e.setDisposable(d),d.setDisposable(a.subscribe(c.onNext.bind(c),function(a){var d,f;try{f=b(a)}catch(g){return void c.onError(g)}bb(f)&&(f=Lc(f)),d=new Zb,e.setDisposable(d),d.setDisposable(f.subscribe(c))},c.onCompleted.bind(c))),e},a)}function B(a,b){var c=this;return new Sc(function(d){var e=0,f=a.length;return c.subscribe(function(c){if(f>e){var g,h=a[e++];try{g=b(c,h)}catch(i){return void d.onError(i)}d.onNext(g)}else d.onCompleted()},d.onError.bind(d),d.onCompleted.bind(d))},c)}function C(a,b,c){return a.map(function(d,e){var f=b.call(c,d,e,a);return bb(f)&&(f=Lc(f)),(nb(f)||mb(f))&&(f=Cc(f)),f}).concatAll()}function D(a,b,c){return a.map(function(d,e){var f=b.call(c,d,e,a);return bb(f)&&(f=Lc(f)),(nb(f)||mb(f))&&(f=Cc(f)),f}).mergeAll()}function E(a){var b=function(){this.cancelBubble=!0},c=function(){if(this.bubbledKeyCode=this.keyCode,this.ctrlKey)try{this.keyCode=0}catch(a){}this.defaultPrevented=!0,this.returnValue=!1,this.modified=!0};if(a||(a=Q.event),!a.target)switch(a.target=a.target||a.srcElement,"mouseover"==a.type&&(a.relatedTarget=a.fromElement),"mouseout"==a.type&&(a.relatedTarget=a.toElement),a.stopPropagation||(a.stopPropagation=b,a.preventDefault=c),a.type){case"keypress":var d="charCode"in a?a.charCode:a.keyCode;10==d?(d=0,a.keyCode=13):13==d||27==d?d=0:3==d&&(d=99),a.charCode=d,a.keyChar=a.charCode?String.fromCharCode(a.charCode):""}return a}function F(a,b,c){if(a.addEventListener)return a.addEventListener(b,c,!1),Xb(function(){a.removeEventListener(b,c,!1)});if(a.attachEvent){var d=function(a){c(E(a))};return a.attachEvent("on"+b,d),Xb(function(){a.detachEvent("on"+b,d)})}return a["on"+b]=c,Xb(function(){a["on"+b]=null})}function G(a,b,c){var d=new Ub;if("[object NodeList]"===Object.prototype.toString.call(a))for(var e=0,f=a.length;f>e;e++)d.add(G(a.item(e),b,c));else a&&d.add(F(a,b,c));return d}function H(a,b){return new Sc(function(c){return b.scheduleWithAbsolute(a,function(){c.onNext(0),c.onCompleted()})})}function I(a,b,c){return new Sc(function(d){var e=0,f=a,g=bc(b);return c.scheduleRecursiveWithAbsolute(f,function(a){if(g>0){var b=c.now();f+=g,b>=f&&(f=b+g)}d.onNext(e++),a(f)})})}function J(a,b){return new Sc(function(c){return b.scheduleWithRelative(bc(a),function(){c.onNext(0),c.onCompleted()})})}function K(a,b,c){return a===b?new Sc(function(a){return c.schedulePeriodicWithState(0,b,function(b){return a.onNext(b),b+1})}):zc(function(){return I(c.now()+a,b,c)})}function L(a,b,c){return new Sc(function(d){var e,f=!1,g=new $b,h=null,i=[],j=!1;return e=a.materialize().timestamp(c).subscribe(function(a){var e,k;"E"===a.value.kind?(i=[],i.push(a),h=a.value.exception,k=!j):(i.push({value:a.value,timestamp:a.timestamp+b}),k=!f,f=!0),k&&(null!==h?d.onError(h):(e=new Zb,g.setDisposable(e),e.setDisposable(c.scheduleRecursiveWithRelative(b,function(a){var b,e,g,k;if(null===h){j=!0;do g=null,i.length>0&&i[0].timestamp-c.now()<=0&&(g=i.shift().value),null!==g&&g.accept(d);while(null!==g);k=!1,e=0,i.length>0?(k=!0,e=Math.max(0,i[0].timestamp-c.now())):f=!1,b=h,j=!1,null!==b?d.onError(b):k&&a(e)}}))))}),new Ub(e,g)},a)}function M(a,b,c){return zc(function(){return L(a,b-c.now(),c)})}function N(a,b){return new Sc(function(c){function d(){g&&(g=!1,c.onNext(f)),e&&c.onCompleted()}var e,f,g;return new Ub(a.subscribe(function(a){g=!0,f=a},c.onError.bind(c),function(){e=!0}),b.subscribe(d,c.onError.bind(c),d))},a)}function O(a,b,c){return new Sc(function(d){function e(a,b){j[b]=a;var e;if(g[b]=!0,h||(h=g.every(Y))){if(f)return void d.onError(f);try{e=c.apply(null,j)}catch(k){return void d.onError(k)}d.onNext(e)}i&&j[1]&&d.onCompleted()}var f,g=[!1,!1],h=!1,i=!1,j=new Array(2);return new Ub(a.subscribe(function(a){e(a,0)},function(a){j[1]?d.onError(a):f=a},function(){i=!0,j[1]&&d.onCompleted()}),b.subscribe(function(a){e(a,1)},d.onError.bind(d),function(){i=!0,e(!0,1)}))},a)}var P={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},Q=P[typeof window]&&window||this,R=P[typeof exports]&&exports&&!exports.nodeType&&exports,S=P[typeof module]&&module&&!module.nodeType&&module,T=S&&S.exports===R&&R,U=P[typeof global]&&global;!U||U.global!==U&&U.window!==U||(Q=U);var V={internals:{},config:{Promise:Q.Promise},helpers:{}},W=V.helpers.noop=function(){},X=(V.helpers.notDefined=function(a){return"undefined"==typeof a},V.helpers.isScheduler=function(a){return a instanceof V.Scheduler}),Y=V.helpers.identity=function(a){return a},Z=(V.helpers.pluck=function(a){return function(b){return b[a]}},V.helpers.just=function(a){return function(){return a}},V.helpers.defaultNow=function(){return Date.now?Date.now:function(){return+new Date}}()),$=V.helpers.defaultComparer=function(a,b){return Mb(a,b)},_=V.helpers.defaultSubComparer=function(a,b){return a>b?1:b>a?-1:0},ab=(V.helpers.defaultKeySerializer=function(a){return a.toString()},V.helpers.defaultError=function(a){throw a}),bb=V.helpers.isPromise=function(a){return!!a&&"function"==typeof a.then},cb=(V.helpers.asArray=function(){return Array.prototype.slice.call(arguments)},V.helpers.not=function(a){return!a},V.helpers.isFunction=function(){var a=function(a){return"function"==typeof a||!1};return a(/x/)&&(a=function(a){return"function"==typeof a&&"[object Function]"==Bb.call(a)}),a}()),db="Argument out of range",eb="Object has been disposed";V.config.longStackSupport=!1;var fb=!1;try{throw new Error}catch(gb){fb=!!gb.stack}var hb,ib=g(),jb="From previous event:",kb="function"==typeof Symbol&&Symbol.iterator||"_es6shim_iterator_";Q.Set&&"function"==typeof(new Q.Set)["@@iterator"]&&(kb="@@iterator");var lb=V.doneEnumerator={done:!0,value:a},mb=V.helpers.isIterable=function(b){return b[kb]!==a},nb=V.helpers.isArrayLike=function(b){return b&&b.length!==a};V.helpers.iterator=kb;var ob,pb=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],qb=pb.length,rb="[object Arguments]",sb="[object Array]",tb="[object Boolean]",ub="[object Date]",vb="[object Error]",wb="[object Function]",xb="[object Number]",yb="[object Object]",zb="[object RegExp]",Ab="[object String]",Bb=Object.prototype.toString,Cb=Object.prototype.hasOwnProperty,Db=Bb.call(arguments)==rb,Eb=Error.prototype,Fb=Object.prototype,Gb=String.prototype,Hb=Fb.propertyIsEnumerable;try{ob=!(Bb.call(document)==yb&&!({toString:0}+""))}catch(gb){ob=!0}var Ib={};Ib[sb]=Ib[ub]=Ib[xb]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},Ib[tb]=Ib[Ab]={constructor:!0,toString:!0,valueOf:!0},Ib[vb]=Ib[wb]=Ib[zb]={constructor:!0,toString:!0},Ib[yb]={constructor:!0};var Jb={};!function(){var a=function(){this.x=1},b=[];a.prototype={valueOf:1,y:1};for(var c in new a)b.push(c);for(c in arguments);Jb.enumErrorProps=Hb.call(Eb,"message")||Hb.call(Eb,"name"),Jb.enumPrototypes=Hb.call(a,"prototype"),Jb.nonEnumArgs=0!=c,Jb.nonEnumShadows=!/valueOf/.test(b)}(1);var Kb=V.internals.isObject=function(a){var b=typeof a;return a&&("function"==b||"object"==b)||!1},Lb=function(a){return a&&"object"==typeof a?Bb.call(a)==rb:!1};Db||(Lb=function(a){return a&&"object"==typeof a?Cb.call(a,"callee"):!1});{var Mb=V.internals.isEqual=function(a,b){return m(a,b,[],[])},Nb=Array.prototype.slice,Ob=({}.hasOwnProperty,this.inherits=V.internals.inherits=function(a,b){function c(){this.constructor=a}c.prototype=b.prototype,a.prototype=new c}),Pb=V.internals.addProperties=function(a){for(var b=Nb.call(arguments,1),c=0,d=b.length;d>c;c++){var e=b[c];for(var f in e)a[f]=e[f]}};V.internals.addRef=function(a,b){return new Sc(function(c){return new Ub(b.getDisposable(),a.subscribe(c))})}}Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,c=Nb.call(arguments,1),d=function(){function e(){}if(this instanceof d){e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(Nb.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(Nb.call(arguments)))};return d}),Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c,d;if(null==this)throw new TypeError(" this is null or not defined");var e=Object(this),f=e.length>>>0;if("function"!=typeof a)throw new TypeError(a+" is not a function");for(arguments.length>1&&(c=b),d=0;f>d;){var g;d in e&&(g=e[d],a.call(c,g,d,e)),d++}});var Qb=Object("a"),Rb="a"!=Qb[0]||!(0 in Qb);Array.prototype.every||(Array.prototype.every=function(a){var b=Object(this),c=Rb&&{}.toString.call(this)==Ab?this.split(""):b,d=c.length>>>0,e=arguments[1];if({}.toString.call(a)!=wb)throw new TypeError(a+" is not a function");for(var f=0;d>f;f++)if(f in c&&!a.call(e,c[f],f,b))return!1;return!0}),Array.prototype.map||(Array.prototype.map=function(a){var b=Object(this),c=Rb&&{}.toString.call(this)==Ab?this.split(""):b,d=c.length>>>0,e=Array(d),f=arguments[1];if({}.toString.call(a)!=wb)throw new TypeError(a+" is not a function");for(var g=0;d>g;g++)g in c&&(e[g]=a.call(f,c[g],g,b));return e}),Array.prototype.filter||(Array.prototype.filter=function(a){for(var b,c=[],d=new Object(this),e=0,f=d.length>>>0;f>e;e++)b=d[e],e in d&&a.call(arguments[1],b,e,d)&&c.push(b);return c}),Array.isArray||(Array.isArray=function(a){return{}.toString.call(a)==sb}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){var b=Object(this),c=b.length>>>0;if(0===c)return-1;var d=0;if(arguments.length>1&&(d=Number(arguments[1]),d!==d?d=0:0!==d&&1/0!=d&&d!==-1/0&&(d=(d>0||-1)*Math.floor(Math.abs(d)))),d>=c)return-1;for(var e=d>=0?d:Math.max(c-Math.abs(d),0);c>e;e++)if(e in b&&b[e]===a)return e;return-1}),Object.prototype.propertyIsEnumerable||(Object.prototype.propertyIsEnumerable=function(a){for(var b in this)if(b===a)return!0;return!1}),Object.keys||(Object.keys=function(){"use strict";var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString");return function(c){if("object"!=typeof c&&("function"!=typeof c||null===c))throw new TypeError("Object.keys called on non-object");var d,e,f=[];for(d in c)a.call(c,d)&&f.push(d);if(b)for(e=0;qb>e;e++)a.call(c,pb[e])&&f.push(pb[e]);return f}}()),p.prototype.compareTo=function(a){var b=this.value.compareTo(a.value);return 0===b&&(b=this.id-a.id),b};var Sb=V.internals.PriorityQueue=function(a){this.items=new Array(a),this.length=0},Tb=Sb.prototype;Tb.isHigherPriority=function(a,b){return this.items[a].compareTo(this.items[b])<0},Tb.percolate=function(a){if(!(a>=this.length||0>a)){var b=a-1>>1;if(!(0>b||b===a)&&this.isHigherPriority(a,b)){var c=this.items[a];this.items[a]=this.items[b],this.items[b]=c,this.percolate(b)}}},Tb.heapify=function(a){if(+a||(a=0),!(a>=this.length||0>a)){var b=2*a+1,c=2*a+2,d=a;if(b<this.length&&this.isHigherPriority(b,d)&&(d=b),c<this.length&&this.isHigherPriority(c,d)&&(d=c),d!==a){var e=this.items[a];this.items[a]=this.items[d],this.items[d]=e,this.heapify(d)}}},Tb.peek=function(){return this.items[0].value},Tb.removeAt=function(a){this.items[a]=this.items[--this.length],delete this.items[this.length],this.heapify()},Tb.dequeue=function(){var a=this.peek();return this.removeAt(0),a},Tb.enqueue=function(a){var b=this.length++;this.items[b]=new p(Sb.count++,a),this.percolate(b)},Tb.remove=function(a){for(var b=0;b<this.length;b++)if(this.items[b].value===a)return this.removeAt(b),!0;return!1},Sb.count=0;var Ub=V.CompositeDisposable=function(){this.disposables=n(arguments,0),this.isDisposed=!1,this.length=this.disposables.length},Vb=Ub.prototype;Vb.add=function(a){this.isDisposed?a.dispose():(this.disposables.push(a),this.length++)},Vb.remove=function(a){var b=!1;if(!this.isDisposed){var c=this.disposables.indexOf(a);-1!==c&&(b=!0,this.disposables.splice(c,1),this.length--,a.dispose())}return b},Vb.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;var a=this.disposables.slice(0);this.disposables=[],this.length=0;for(var b=0,c=a.length;c>b;b++)a[b].dispose()}},Vb.toArray=function(){return this.disposables.slice(0)};var Wb=V.Disposable=function(a){this.isDisposed=!1,this.action=a||W};Wb.prototype.dispose=function(){this.isDisposed||(this.action(),this.isDisposed=!0)};var Xb=Wb.create=function(a){return new Wb(a)},Yb=Wb.empty={dispose:W},Zb=V.SingleAssignmentDisposable=function(){function a(){this.isDisposed=!1,this.current=null}var b=a.prototype;return b.getDisposable=function(){return this.current},b.setDisposable=function(a){var b,c=this.isDisposed;c||(b=this.current,this.current=a),b&&b.dispose(),c&&a&&a.dispose()},b.dispose=function(){var a;this.isDisposed||(this.isDisposed=!0,a=this.current,this.current=null),a&&a.dispose()},a}(),$b=V.SerialDisposable=Zb,_b=(V.RefCountDisposable=function(){function a(a){this.disposable=a,this.disposable.count++,this.isInnerDisposed=!1}function b(a){this.underlyingDisposable=a,this.isDisposed=!1,this.isPrimaryDisposed=!1,this.count=0}return a.prototype.dispose=function(){this.disposable.isDisposed||this.isInnerDisposed||(this.isInnerDisposed=!0,this.disposable.count--,0===this.disposable.count&&this.disposable.isPrimaryDisposed&&(this.disposable.isDisposed=!0,this.disposable.underlyingDisposable.dispose()))},b.prototype.dispose=function(){this.isDisposed||this.isPrimaryDisposed||(this.isPrimaryDisposed=!0,0===this.count&&(this.isDisposed=!0,this.underlyingDisposable.dispose()))},b.prototype.getDisposable=function(){return this.isDisposed?Yb:new a(this)},b}(),V.internals.ScheduledItem=function(a,b,c,d,e){this.scheduler=a,this.state=b,this.action=c,this.dueTime=d,this.comparer=e||_,this.disposable=new Zb});_b.prototype.invoke=function(){this.disposable.setDisposable(this.invokeCore())},_b.prototype.compareTo=function(a){return this.comparer(this.dueTime,a.dueTime)},_b.prototype.isCancelled=function(){return this.disposable.isDisposed},_b.prototype.invokeCore=function(){return this.action(this.scheduler,this.state)};var ac=V.Scheduler=function(){function a(a,b,c,d){this.now=a,this._schedule=b,this._scheduleRelative=c,this._scheduleAbsolute=d}function b(a,b){return b(),Yb}var c=a.prototype;return c.schedule=function(a){return this._schedule(a,b)},c.scheduleWithState=function(a,b){return this._schedule(a,b)},c.scheduleWithRelative=function(a,c){return this._scheduleRelative(c,a,b)},c.scheduleWithRelativeAndState=function(a,b,c){return this._scheduleRelative(a,b,c)},c.scheduleWithAbsolute=function(a,c){return this._scheduleAbsolute(c,a,b)},c.scheduleWithAbsoluteAndState=function(a,b,c){return this._scheduleAbsolute(a,b,c)},a.now=Z,a.normalize=function(a){return 0>a&&(a=0),a},a}(),bc=ac.normalize;!function(a){function b(a,b){var c=b.first,d=b.second,e=new Ub,f=function(b){d(b,function(b){var c=!1,d=!1,g=a.scheduleWithState(b,function(a,b){return c?e.remove(g):d=!0,f(b),Yb});d||(e.add(g),c=!0)})};return f(c),e}function c(a,b,c){var d=b.first,e=b.second,f=new Ub,g=function(b){e(b,function(b,d){var e=!1,h=!1,i=a[c].call(a,b,d,function(a,b){return e?f.remove(i):h=!0,g(b),Yb});h||(f.add(i),e=!0)})};return g(d),f}function d(a,b){a(function(c){b(a,c)})}a.scheduleRecursive=function(a){return this.scheduleRecursiveWithState(a,function(a,b){a(function(){b(a)})})},a.scheduleRecursiveWithState=function(a,c){return this.scheduleWithState({first:a,second:c},b)},a.scheduleRecursiveWithRelative=function(a,b){return this.scheduleRecursiveWithRelativeAndState(b,a,d)},a.scheduleRecursiveWithRelativeAndState=function(a,b,d){return this._scheduleRelative({first:a,second:d},b,function(a,b){return c(a,b,"scheduleWithRelativeAndState")})},a.scheduleRecursiveWithAbsolute=function(a,b){return this.scheduleRecursiveWithAbsoluteAndState(b,a,d)},a.scheduleRecursiveWithAbsoluteAndState=function(a,b,d){return this._scheduleAbsolute({first:a,second:d},b,function(a,b){return c(a,b,"scheduleWithAbsoluteAndState")})}}(ac.prototype),function(){ac.prototype.schedulePeriodic=function(a,b){return this.schedulePeriodicWithState(null,a,b)},ac.prototype.schedulePeriodicWithState=function(a,b,c){if("undefined"==typeof Q.setInterval)throw new Error("Periodic scheduling not supported.");var d=a,e=Q.setInterval(function(){d=c(d)},b);return Xb(function(){Q.clearInterval(e)})}}(ac.prototype);var cc,dc=ac.immediate=function(){function a(a,b){return b(this,a)}function b(a,b,c){for(var d=bc(b);d-this.now()>0;);return c(this,a)}function c(a,b,c){return this.scheduleWithRelativeAndState(a,b-this.now(),c)}return new ac(Z,a,b,c)}(),ec=ac.currentThread=function(){function a(a){for(var b;a.length>0;)if(b=a.dequeue(),!b.isCancelled()){for(;b.dueTime-ac.now()>0;);b.isCancelled()||b.invoke()}}function b(a,b){return this.scheduleWithRelativeAndState(a,0,b)}function c(b,c,d){var f=this.now()+ac.normalize(c),g=new _b(this,b,d,f);if(e)e.enqueue(g);else{e=new Sb(4),e.enqueue(g);try{a(e)}catch(h){throw h}finally{e=null}}return g.disposable}function d(a,b,c){return this.scheduleWithRelativeAndState(a,b-this.now(),c)}var e,f=new ac(Z,b,c,d);return f.scheduleRequired=function(){return!e},f.ensureTrampoline=function(a){e?a():this.schedule(a)},f}(),fc=(V.internals.SchedulePeriodicRecursive=function(){function a(a,b){b(0,this._period);try{this._state=this._action(this._state)}catch(c){throw this._cancel.dispose(),c}}function b(a,b,c,d){this._scheduler=a,this._state=b,this._period=c,this._action=d}return b.prototype.start=function(){var b=new Zb;return this._cancel=b,b.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0,this._period,a.bind(this))),b},b}(),W),gc=function(){var a,b=W;if("WScript"in this)a=function(a,b){WScript.Sleep(b),a()};else{if(!Q.setTimeout)throw new Error("No concurrency detected!");a=Q.setTimeout,b=Q.clearTimeout}return{setTimeout:a,clearTimeout:b}}(),hc=gc.setTimeout,ic=gc.clearTimeout;!function(){function a(){if(!Q.postMessage||Q.importScripts)return!1;var a=!1,b=Q.onmessage;return Q.onmessage=function(){a=!0},Q.postMessage("","*"),Q.onmessage=b,a}var b=RegExp("^"+String(Bb).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),c="function"==typeof(c=U&&T&&U.setImmediate)&&!b.test(c)&&c,d="function"==typeof(d=U&&T&&U.clearImmediate)&&!b.test(d)&&d;if("function"==typeof c)cc=c,fc=d;else if("undefined"!=typeof process&&"[object process]"==={}.toString.call(process))cc=process.nextTick;else if(a()){var e="ms.rx.schedule"+Math.random(),f={},g=0,h=function(a){if("string"==typeof a.data&&a.data.substring(0,e.length)===e){var b=a.data.substring(e.length),c=f[b];c(),delete f[b]}};Q.addEventListener?Q.addEventListener("message",h,!1):Q.attachEvent("onmessage",h,!1),cc=function(a){var b=g++;f[b]=a,Q.postMessage(e+b,"*")}}else if(Q.MessageChannel){var i=new Q.MessageChannel,j={},k=0;i.port1.onmessage=function(a){var b=a.data,c=j[b];c(),delete j[b]},cc=function(a){var b=k++;j[b]=a,i.port2.postMessage(b)}}else"document"in Q&&"onreadystatechange"in Q.document.createElement("script")?cc=function(a){var b=Q.document.createElement("script");b.onreadystatechange=function(){a(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},Q.document.documentElement.appendChild(b)}:(cc=function(a){return hc(a,0)},fc=ic)}();var jc=ac.timeout=function(){function a(a,b){var c=this,d=new Zb,e=cc(function(){d.isDisposed||d.setDisposable(b(c,a))});return new Ub(d,Xb(function(){fc(e)}))}function b(a,b,c){var d=this,e=ac.normalize(b);if(0===e)return d.scheduleWithState(a,c);var f=new Zb,g=hc(function(){f.isDisposed||f.setDisposable(c(d,a))},e);return new Ub(f,Xb(function(){ic(g)}))}function c(a,b,c){return this.scheduleWithRelativeAndState(a,b-this.now(),c)}return new ac(Z,a,b,c)}(),kc=V.Notification=function(){function a(a,b){this.hasValue=null==b?!1:b,this.kind=a}return a.prototype.accept=function(a,b,c){return a&&"object"==typeof a?this._acceptObservable(a):this._accept(a,b,c)},a.prototype.toObservable=function(a){var b=this;return X(a)||(a=dc),new Sc(function(c){return a.schedule(function(){b._acceptObservable(c),"N"===b.kind&&c.onCompleted()})})},a}(),lc=kc.createOnNext=function(){function a(a){return a(this.value)}function b(a){return a.onNext(this.value)}function c(){return"OnNext("+this.value+")"}return function(d){var e=new kc("N",!0);return e.value=d,e._accept=a,e._acceptObservable=b,e.toString=c,e}}(),mc=kc.createOnError=function(){function a(a,b){return b(this.exception)}function b(a){return a.onError(this.exception)}function c(){return"OnError("+this.exception+")"}return function(d){var e=new kc("E");return e.exception=d,e._accept=a,e._acceptObservable=b,e.toString=c,e}}(),nc=kc.createOnCompleted=function(){function a(a,b,c){return c()}function b(a){return a.onCompleted()}function c(){return"OnCompleted()"}return function(){var d=new kc("C");return d._accept=a,d._acceptObservable=b,d.toString=c,d}}(),oc=V.internals.Enumerator=function(a){this._next=a};oc.prototype.next=function(){return this._next()},oc.prototype[kb]=function(){return this};var pc=V.internals.Enumerable=function(a){this._iterator=a};pc.prototype[kb]=function(){return this._iterator()},pc.prototype.concat=function(){var a=this;return new Sc(function(b){var c;try{c=a[kb]()}catch(d){return void b.onError(d)}var e,f=new $b,g=dc.scheduleRecursive(function(a){var d;if(!e){try{d=c.next()}catch(g){return void b.onError(g)}if(d.done)return void b.onCompleted();var h=d.value;bb(h)&&(h=Lc(h));var i=new Zb;f.setDisposable(i),i.setDisposable(h.subscribe(b.onNext.bind(b),b.onError.bind(b),function(){a()}))}});return new Ub(f,g,Xb(function(){e=!0}))})},pc.prototype.catchError=function(){var a=this;return new Sc(function(b){var c;try{c=a[kb]()}catch(d){return void b.onError(d)}var e,f,g=new $b,h=dc.scheduleRecursive(function(a){if(!e){var d;try{d=c.next()}catch(h){return void b.onError(h)}if(d.done)return void(f?b.onError(f):b.onCompleted());var i=d.value;bb(i)&&(i=Lc(i));var j=new Zb;g.setDisposable(j),j.setDisposable(i.subscribe(b.onNext.bind(b),function(b){f=b,a()},b.onCompleted.bind(b)))}});return new Ub(g,h,Xb(function(){e=!0}))})};var qc=pc.repeat=function(a,b){return null==b&&(b=-1),new pc(function(){var c=b;return new oc(function(){return 0===c?lb:(c>0&&c--,{done:!1,value:a})})})},rc=pc.of=function(a,b,c){return b||(b=Y),new pc(function(){var d=-1;return new oc(function(){return++d<a.length?{done:!1,value:b.call(c,a[d],d,a)}:lb})})},sc=V.Observer=function(){};sc.prototype.toNotifier=function(){var a=this;return function(b){return b.accept(a)}},sc.prototype.asObserver=function(){return new wc(this.onNext.bind(this),this.onError.bind(this),this.onCompleted.bind(this))};var tc=sc.create=function(a,b,c){return a||(a=W),b||(b=ab),c||(c=W),new wc(a,b,c)};sc.fromNotifier=function(a,b){return new wc(function(c){return a.call(b,lc(c))},function(c){return a.call(b,mc(c))},function(){return a.call(b,nc())})};var uc,vc=V.internals.AbstractObserver=function(a){function b(){this.isStopped=!1,a.call(this)}return Ob(b,a),b.prototype.onNext=function(a){this.isStopped||this.next(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.error(a))},b.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.completed())},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.error(a),!0)},b}(sc),wc=V.AnonymousObserver=function(a){function b(b,c,d){a.call(this),this._onNext=b,this._onError=c,this._onCompleted=d}return Ob(b,a),b.prototype.next=function(a){this._onNext(a)},b.prototype.error=function(a){this._onError(a)},b.prototype.completed=function(){this._onCompleted()},b}(vc),xc=V.Observable=function(){function a(a){if(V.config.longStackSupport&&fb){try{throw new Error}catch(b){this.stack=b.stack.substring(b.stack.indexOf("\n")+1)}var d=this;this._subscribe=function(b){var e=b.onError.bind(b);return b.onError=function(a){c(a,d),e(a)},a(b)}}else this._subscribe=a}return uc=a.prototype,uc.subscribe=uc.forEach=function(a,b,c){return this._subscribe("object"==typeof a?a:tc(a,b,c))},uc.subscribeOnNext=function(a,b){return this._subscribe(tc(2===arguments.length?function(c){a.call(b,c)}:a))},uc.subscribeOnError=function(a,b){return this._subscribe(tc(null,2===arguments.length?function(c){a.call(b,c)}:a))},uc.subscribeOnCompleted=function(a,b){return this._subscribe(tc(null,null,2===arguments.length?function(){a.call(b)}:a))},a}(),yc=V.internals.ScheduledObserver=function(a){function b(b,c){a.call(this),this.scheduler=b,this.observer=c,this.isAcquired=!1,this.hasFaulted=!1,this.queue=[],this.disposable=new $b}return Ob(b,a),b.prototype.next=function(a){var b=this;this.queue.push(function(){b.observer.onNext(a)})},b.prototype.error=function(a){var b=this;this.queue.push(function(){b.observer.onError(a)})},b.prototype.completed=function(){var a=this;this.queue.push(function(){a.observer.onCompleted()})},b.prototype.ensureActive=function(){var a=!1,b=this;!this.hasFaulted&&this.queue.length>0&&(a=!this.isAcquired,this.isAcquired=!0),a&&this.disposable.setDisposable(this.scheduler.scheduleRecursive(function(a){var c;if(!(b.queue.length>0))return void(b.isAcquired=!1);c=b.queue.shift();try{c()}catch(d){throw b.queue=[],b.hasFaulted=!0,d}a()}))},b.prototype.dispose=function(){a.prototype.dispose.call(this),this.disposable.dispose()},b}(vc);uc.toArray=function(){var a=this;return new Sc(function(b){var c=[];return a.subscribe(c.push.bind(c),b.onError.bind(b),function(){b.onNext(c),b.onCompleted()})},a)},xc.create=xc.createWithDisposable=function(a,b){return new Sc(a,b)};var zc=xc.defer=function(a){return new Sc(function(b){var c;try{c=a()}catch(d){return Fc(d).subscribe(b)}return bb(c)&&(c=Lc(c)),c.subscribe(b)})},Ac=xc.empty=function(a){return X(a)||(a=dc),new Sc(function(b){return a.schedule(function(){b.onCompleted()})})},Bc=Math.pow(2,53)-1;q.prototype[kb]=function(){return new r(this._s)},r.prototype[kb]=function(){return this},r.prototype.next=function(){if(this._i<this._l){var a=this._s.charAt(this._i++);return{done:!1,value:a}}return lb},t.prototype[kb]=function(){return new u(this._a)},u.prototype[kb]=function(){return this},u.prototype.next=function(){if(this._i<this._l){var a=this._a[this._i++];return{done:!1,value:a}}return lb};{var Cc=xc.from=function(a,b,c,d){if(null==a)throw new Error("iterable cannot be null.");if(b&&!cb(b))throw new Error("mapFn when provided must be a function");X(d)||(d=ec);var e=Object(a),f=w(e);return new Sc(function(a){var e=0;return d.scheduleRecursive(function(d){var g;try{g=f.next()}catch(h){return void a.onError(h)}if(g.done)return void a.onCompleted();var i=g.value;if(b&&cb(b))try{i=b.call(c,i,e)}catch(h){return void a.onError(h)}a.onNext(i),e++,d()})})},Dc=xc.fromArray=function(a,b){return X(b)||(b=ec),new Sc(function(c){var d=0,e=a.length;return b.scheduleRecursive(function(b){e>d?(c.onNext(a[d++]),b()):c.onCompleted()})})};xc.never=function(){return new Sc(function(){return Yb})}}xc.of=function(){return z(null,arguments)},xc.ofWithScheduler=function(a){return z(a,Nb.call(arguments,1))},xc.pairs=function(a,b){return b||(b=V.Scheduler.currentThread),new Sc(function(c){var d=0,e=Object.keys(a),f=e.length;return b.scheduleRecursive(function(b){if(f>d){var g=e[d++];c.onNext([g,a[g]]),b()}else c.onCompleted()})})},xc.range=function(a,b,c){return X(c)||(c=ec),new Sc(function(d){return c.scheduleRecursiveWithState(0,function(c,e){b>c?(d.onNext(a+c),e(c+1)):d.onCompleted()})})},xc.repeat=function(a,b,c){return X(c)||(c=ec),Ec(a,c).repeat(null==b?-1:b)};var Ec=xc["return"]=xc.just=function(a,b){return X(b)||(b=dc),new Sc(function(c){return b.schedule(function(){c.onNext(a),c.onCompleted()})})};xc.returnValue=function(){return Ec.apply(null,arguments)};var Fc=xc["throw"]=xc.throwException=xc.throwError=function(a,b){return X(b)||(b=dc),new Sc(function(c){return b.schedule(function(){c.onError(a)})})};uc["catch"]=uc.catchError=function(a){return"function"==typeof a?A(this,a):Gc([this,a])},uc.catchException=function(a){return this.catchError(a)};var Gc=xc.catchError=xc["catch"]=function(){return rc(n(arguments,0)).catchError()};xc.catchException=function(){return Gc.apply(null,arguments)},uc.combineLatest=function(){var a=Nb.call(arguments);return Array.isArray(a[0])?a[0].unshift(this):a.unshift(this),Hc.apply(this,a)};var Hc=xc.combineLatest=function(){var a=Nb.call(arguments),b=a.pop();return Array.isArray(a[0])&&(a=a[0]),new Sc(function(c){function d(a){var d;if(h[a]=!0,i||(i=h.every(Y))){try{d=b.apply(null,k)}catch(e){return void c.onError(e)}c.onNext(d)}else j.filter(function(b,c){return c!==a}).every(Y)&&c.onCompleted()}function e(a){j[a]=!0,j.every(Y)&&c.onCompleted()}for(var f=function(){return!1},g=a.length,h=o(g,f),i=!1,j=o(g,f),k=new Array(g),l=new Array(g),m=0;g>m;m++)!function(b){var f=a[b],g=new Zb;
bb(f)&&(f=Lc(f)),g.setDisposable(f.subscribe(function(a){k[b]=a,d(b)},c.onError.bind(c),function(){e(b)})),l[b]=g}(m);return new Ub(l)},this)};uc.concat=function(){var a=Nb.call(arguments,0);return a.unshift(this),Ic.apply(this,a)};var Ic=xc.concat=function(){return rc(n(arguments,0)).concat()};uc.concatAll=function(){return this.merge(1)},uc.concatObservable=function(){return this.merge(1)},uc.merge=function(a){if("number"!=typeof a)return Jc(this,a);var b=this;return new Sc(function(c){function d(a){var b=new Zb;f.add(b),bb(a)&&(a=Lc(a)),b.setDisposable(a.subscribe(c.onNext.bind(c),c.onError.bind(c),function(){f.remove(b),h.length>0?d(h.shift()):(e--,g&&0===e&&c.onCompleted())}))}var e=0,f=new Ub,g=!1,h=[];return f.add(b.subscribe(function(b){a>e?(e++,d(b)):h.push(b)},c.onError.bind(c),function(){g=!0,0===e&&c.onCompleted()})),f},b)};var Jc=xc.merge=function(){var a,b;return arguments[0]?X(arguments[0])?(a=arguments[0],b=Nb.call(arguments,1)):(a=dc,b=Nb.call(arguments,0)):(a=dc,b=Nb.call(arguments,1)),Array.isArray(b[0])&&(b=b[0]),z(a,b).mergeAll()};uc.mergeAll=function(){var a=this;return new Sc(function(b){var c=new Ub,d=!1,e=new Zb;return c.add(e),e.setDisposable(a.subscribe(function(a){var e=new Zb;c.add(e),bb(a)&&(a=Lc(a)),e.setDisposable(a.subscribe(b.onNext.bind(b),b.onError.bind(b),function(){c.remove(e),d&&1===c.length&&b.onCompleted()}))},b.onError.bind(b),function(){d=!0,1===c.length&&b.onCompleted()})),c},a)},uc.mergeObservable=function(){return this.mergeAll.apply(this,arguments)},uc.skipUntil=function(a){var b=this;return new Sc(function(c){var d=!1,e=new Ub(b.subscribe(function(a){d&&c.onNext(a)},c.onError.bind(c),function(){d&&c.onCompleted()}));bb(a)&&(a=Lc(a));var f=new Zb;return e.add(f),f.setDisposable(a.subscribe(function(){d=!0,f.dispose()},c.onError.bind(c),function(){f.dispose()})),e},b)},uc["switch"]=uc.switchLatest=function(){var a=this;return new Sc(function(b){var c=!1,d=new $b,e=!1,f=0,g=a.subscribe(function(a){var g=new Zb,h=++f;c=!0,d.setDisposable(g),bb(a)&&(a=Lc(a)),g.setDisposable(a.subscribe(function(a){f===h&&b.onNext(a)},function(a){f===h&&b.onError(a)},function(){f===h&&(c=!1,e&&b.onCompleted())}))},b.onError.bind(b),function(){e=!0,!c&&b.onCompleted()});return new Ub(g,d)},a)},uc.takeUntil=function(a){var b=this;return new Sc(function(c){return bb(a)&&(a=Lc(a)),new Ub(b.subscribe(c),a.subscribe(c.onCompleted.bind(c),c.onError.bind(c),W))},b)},uc.withLatestFrom=function(){var a=this,b=Nb.call(arguments),c=b.pop();if("undefined"==typeof a)throw new Error("Source observable not found for withLatestFrom().");if("function"!=typeof c)throw new Error("withLatestFrom() expects a resultSelector function.");return Array.isArray(b[0])&&(b=b[0]),new Sc(function(d){for(var e=function(){return!1},f=b.length,g=o(f,e),h=!1,i=new Array(f),j=new Array(f+1),k=0;f>k;k++)!function(a){var c=b[a],e=new Zb;bb(c)&&(c=Lc(c)),e.setDisposable(c.subscribe(function(b){i[a]=b,g[a]=!0,h=g.every(Y)},d.onError.bind(d),function(){})),j[a]=e}(k);var l=new Zb;return l.setDisposable(a.subscribe(function(a){var b,e=[a].concat(i);if(h){try{b=c.apply(null,e)}catch(f){return void d.onError(f)}d.onNext(b)}},d.onError.bind(d),function(){d.onCompleted()})),j[f]=l,new Ub(j)},this)},uc.zip=function(){if(Array.isArray(arguments[0]))return B.apply(this,arguments);var a=this,b=Nb.call(arguments),c=b.pop();return b.unshift(a),new Sc(function(d){function e(b){var e,f;if(h.every(function(a){return a.length>0})){try{f=h.map(function(a){return a.shift()}),e=c.apply(a,f)}catch(g){return void d.onError(g)}d.onNext(e)}else i.filter(function(a,c){return c!==b}).every(Y)&&d.onCompleted()}function f(a){i[a]=!0,i.every(function(a){return a})&&d.onCompleted()}for(var g=b.length,h=o(g,function(){return[]}),i=o(g,function(){return!1}),j=new Array(g),k=0;g>k;k++)!function(a){var c=b[a],g=new Zb;bb(c)&&(c=Lc(c)),g.setDisposable(c.subscribe(function(b){h[a].push(b),e(a)},d.onError.bind(d),function(){f(a)})),j[a]=g}(k);return new Ub(j)},a)},xc.zip=function(){var a=Nb.call(arguments,0),b=a.shift();return b.zip.apply(b,a)},xc.zipArray=function(){var a=n(arguments,0);return new Sc(function(b){function c(a){if(f.every(function(a){return a.length>0})){var c=f.map(function(a){return a.shift()});b.onNext(c)}else if(g.filter(function(b,c){return c!==a}).every(Y))return void b.onCompleted()}function d(a){return g[a]=!0,g.every(Y)?void b.onCompleted():void 0}for(var e=a.length,f=o(e,function(){return[]}),g=o(e,function(){return!1}),h=new Array(e),i=0;e>i;i++)!function(e){h[e]=new Zb,h[e].setDisposable(a[e].subscribe(function(a){f[e].push(a),c(e)},b.onError.bind(b),function(){d(e)}))}(i);var j=new Ub(h);return j.add(Xb(function(){for(var a=0,b=f.length;b>a;a++)f[a]=[]})),j})},uc.asObservable=function(){return new Sc(this.subscribe.bind(this),this)},uc.dematerialize=function(){var a=this;return new Sc(function(b){return a.subscribe(function(a){return a.accept(b)},b.onError.bind(b),b.onCompleted.bind(b))},this)},uc.distinctUntilChanged=function(a,b){var c=this;return a||(a=Y),b||(b=$),new Sc(function(d){var e,f=!1;return c.subscribe(function(c){var g,h=!1;try{g=a(c)}catch(i){return void d.onError(i)}if(f)try{h=b(e,g)}catch(i){return void d.onError(i)}f&&h||(f=!0,e=g,d.onNext(c))},d.onError.bind(d),d.onCompleted.bind(d))},this)},uc["do"]=uc.tap=function(a,b,c){var d,e=this;return"function"==typeof a?d=a:(d=a.onNext.bind(a),b=a.onError.bind(a),c=a.onCompleted.bind(a)),new Sc(function(a){return e.subscribe(function(b){try{d(b)}catch(c){a.onError(c)}a.onNext(b)},function(c){if(b)try{b(c)}catch(d){a.onError(d)}a.onError(c)},function(){if(c)try{c()}catch(b){a.onError(b)}a.onCompleted()})},this)},uc.doAction=function(){return this.tap.apply(this,arguments)},uc.doOnNext=uc.tapOnNext=function(a,b){return this.tap(2===arguments.length?function(c){a.call(b,c)}:a)},uc.doOnError=uc.tapOnError=function(a,b){return this.tap(W,2===arguments.length?function(c){a.call(b,c)}:a)},uc.doOnCompleted=uc.tapOnCompleted=function(a,b){return this.tap(W,null,2===arguments.length?function(){a.call(b)}:a)},uc["finally"]=uc.ensure=function(a){var b=this;return new Sc(function(c){var d;try{d=b.subscribe(c)}catch(e){throw a(),e}return Xb(function(){try{d.dispose()}catch(b){throw b}finally{a()}})},this)},uc.finallyAction=function(a){return this.ensure(a)},uc.ignoreElements=function(){var a=this;return new Sc(function(b){return a.subscribe(W,b.onError.bind(b),b.onCompleted.bind(b))},a)},uc.materialize=function(){var a=this;return new Sc(function(b){return a.subscribe(function(a){b.onNext(lc(a))},function(a){b.onNext(mc(a)),b.onCompleted()},function(){b.onNext(nc()),b.onCompleted()})},a)},uc.repeat=function(a){return qc(this,a).concat()},uc.retry=function(a){return qc(this,a).catchError()},uc.scan=function(){var a,b,c=!1,d=this;return 2===arguments.length?(c=!0,a=arguments[0],b=arguments[1]):b=arguments[0],new Sc(function(e){var f,g,h;return d.subscribe(function(d){!h&&(h=!0);try{f?g=b(g,d):(g=c?b(a,d):d,f=!0)}catch(i){return void e.onError(i)}e.onNext(g)},e.onError.bind(e),function(){!h&&c&&e.onNext(a),e.onCompleted()})},d)},uc.skipLast=function(a){var b=this;return new Sc(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&c.onNext(d.shift())},c.onError.bind(c),c.onCompleted.bind(c))},b)},uc.startWith=function(){var a,b,c=0;return arguments.length&&X(arguments[0])?(b=arguments[0],c=1):b=dc,a=Nb.call(arguments,c),rc([Dc(a,b),this]).concat()},uc.takeLast=function(a){var b=this;return new Sc(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&d.shift()},c.onError.bind(c),function(){for(;d.length>0;)c.onNext(d.shift());c.onCompleted()})},b)},uc.selectConcat=uc.concatMap=function(a,b,c){return cb(a)&&cb(b)?this.concatMap(function(c,d){var e=a(c,d);return bb(e)&&(e=Lc(e)),(nb(e)||mb(e))&&(e=Cc(e)),e.map(function(a,e){return b(c,a,d,e)})}):cb(a)?C(this,a,c):C(this,function(){return a})},uc.select=uc.map=function(a,b){var c=cb(a)?a:function(){return a},d=this;return new Sc(function(a){var e=0;return d.subscribe(function(f){var g;try{g=c.call(b,f,e++,d)}catch(h){return void a.onError(h)}a.onNext(g)},a.onError.bind(a),a.onCompleted.bind(a))},d)},uc.pluck=function(a){return this.map(function(b){return b[a]})},uc.selectMany=uc.flatMap=function(a,b,c){return cb(a)&&cb(b)?this.flatMap(function(c,d){var e=a(c,d);return bb(e)&&(e=Lc(e)),(nb(e)||mb(e))&&(e=Cc(e)),e.map(function(a,e){return b(c,a,d,e)})},c):cb(a)?D(this,a,c):D(this,function(){return a})},uc.selectSwitch=uc.flatMapLatest=uc.switchMap=function(a,b){return this.select(a,b).switchLatest()},uc.skip=function(a){if(0>a)throw new Error(db);var b=this;return new Sc(function(c){var d=a;return b.subscribe(function(a){0>=d?c.onNext(a):d--},c.onError.bind(c),c.onCompleted.bind(c))},b)},uc.skipWhile=function(a,b){var c=this;return new Sc(function(d){var e=0,f=!1;return c.subscribe(function(g){if(!f)try{f=!a.call(b,g,e++,c)}catch(h){return void d.onError(h)}f&&d.onNext(g)},d.onError.bind(d),d.onCompleted.bind(d))},c)},uc.take=function(a,b){if(0>a)throw new RangeError(db);if(0===a)return Ac(b);var c=this;return new Sc(function(b){var d=a;return c.subscribe(function(a){d-->0&&(b.onNext(a),0===d&&b.onCompleted())},b.onError.bind(b),b.onCompleted.bind(b))},c)},uc.takeWhile=function(a,b){var c=this;return new Sc(function(d){var e=0,f=!0;return c.subscribe(function(g){if(f){try{f=a.call(b,g,e++,c)}catch(h){return void d.onError(h)}f?d.onNext(g):d.onCompleted()}},d.onError.bind(d),d.onCompleted.bind(d))},c)},uc.where=uc.filter=function(a,b){var c=this;return new Sc(function(d){var e=0;return c.subscribe(function(f){var g;try{g=a.call(b,f,e++,c)}catch(h){return void d.onError(h)}g&&d.onNext(f)},d.onError.bind(d),d.onCompleted.bind(d))},c)},xc.fromCallback=function(a,b,c){return function(){var d=Nb.call(arguments,0);return new Sc(function(e){function f(){var a=arguments;if(c){try{a=c(a)}catch(b){return void e.onError(b)}e.onNext(a)}else a.length<=1?e.onNext.apply(e,a):e.onNext(a);e.onCompleted()}d.push(f),a.apply(b,d)}).publishLast().refCount()}},xc.fromNodeCallback=function(a,b,c){return function(){var d=Nb.call(arguments,0);return new Sc(function(e){function f(a){if(a)return void e.onError(a);var b=Nb.call(arguments,1);if(c){try{b=c(b)}catch(d){return void e.onError(d)}e.onNext(b)}else b.length<=1?e.onNext.apply(e,b):e.onNext(b);e.onCompleted()}d.push(f),a.apply(b,d)}).publishLast().refCount()}},V.config.useNativeEvents=!1,xc.fromEvent=function(a,b,c){if(a.subscribe)return Kc(function(c){a.subscribe(b,c)},function(c){a.unsubscribe(b,c)},c);if(!V.config.useNativeEvents){if("function"===a.on&&"function"===a.off)return Kc(function(c){a.on(b,c)},function(c){a.off(b,c)},c);if(Q.Ember&&"function"==typeof Q.Ember.subscribe)return Kc(function(c){Ember.subscribe(a,b,c)},function(c){Ember.unsubscribe(a,b,c)},c)}return new Sc(function(d){return G(a,b,function(a){var b=a;if(c)try{b=c(arguments)}catch(e){return void d.onError(e)}d.onNext(b)})}).publish().refCount()};var Kc=xc.fromEventPattern=function(a,b,c){return new Sc(function(d){function e(a){var b=a;if(c)try{b=c(arguments)}catch(e){return void d.onError(e)}d.onNext(b)}var f=a(e);return Xb(function(){b&&b(e,f)})}).publish().refCount()},Lc=xc.fromPromise=function(a){return zc(function(){var b=new V.AsyncSubject;return a.then(function(a){b.onNext(a),b.onCompleted()},b.onError.bind(b)),b})};uc.toPromise=function(a){if(a||(a=V.config.Promise),!a)throw new TypeError("Promise type not provided nor in Rx.config.Promise");var b=this;return new a(function(a,c){var d,e=!1;b.subscribe(function(a){d=a,e=!0},c,function(){e&&a(d)})})},xc.startAsync=function(a){var b;try{b=a()}catch(c){return Fc(c)}return Lc(b)},uc.multicast=function(a,b){var c=this;return"function"==typeof a?new Sc(function(d){var e=c.multicast(a());return new Ub(b(e).subscribe(d),e.connect())},c):new Mc(c,a)},uc.publish=function(a){return a&&cb(a)?this.multicast(function(){return new Vc},a):this.multicast(new Vc)},uc.share=function(){return this.publish().refCount()},uc.publishLast=function(a){return a&&cb(a)?this.multicast(function(){return new Wc},a):this.multicast(new Wc)},uc.publishValue=function(a,b){return 2===arguments.length?this.multicast(function(){return new Yc(b)},a):this.multicast(new Yc(a))},uc.shareValue=function(a){return this.publishValue(a).refCount()},uc.replay=function(a,b,c,d){return a&&cb(a)?this.multicast(function(){return new Zc(b,c,d)},a):this.multicast(new Zc(b,c,d))},uc.shareReplay=function(a,b,c){return this.replay(null,a,b,c).refCount()};{var Mc=V.ConnectableObservable=function(a){function b(b,c){var d,e=!1,f=b.asObservable();this.connect=function(){return e||(e=!0,d=new Ub(f.subscribe(c),Xb(function(){e=!1}))),d},a.call(this,c.subscribe.bind(c))}return Ob(b,a),b.prototype.refCount=function(){var a,b=0,c=this;return new Sc(function(d){var e=1===++b,f=c.subscribe(d);return e&&(a=c.connect()),function(){f.dispose(),0===--b&&a.dispose()}})},b}(xc),Nc=xc.interval=function(a,b){return K(a,a,X(b)?b:jc)};xc.timer=function(b,c,d){var e;return X(d)||(d=jc),c!==a&&"number"==typeof c?e=c:X(c)&&(d=c),b instanceof Date&&e===a?H(b.getTime(),d):b instanceof Date&&e!==a?(e=c,I(b.getTime(),e,d)):e===a?J(b,d):K(b,e,d)}}uc.delay=function(a,b){return X(b)||(b=jc),a instanceof Date?M(this,a.getTime(),b):L(this,a,b)},uc.debounce=uc.throttleWithTimeout=function(a,b){X(b)||(b=jc);var c=this;return new Sc(function(d){var e,f=new $b,g=!1,h=0,i=c.subscribe(function(c){g=!0,e=c,h++;var i=h,j=new Zb;f.setDisposable(j),j.setDisposable(b.scheduleWithRelative(a,function(){g&&h===i&&d.onNext(e),g=!1}))},function(a){f.dispose(),d.onError(a),g=!1,h++},function(){f.dispose(),g&&d.onNext(e),d.onCompleted(),g=!1,h++});return new Ub(i,f)},this)},uc.throttle=function(a,b){return this.debounce(a,b)},uc.timestamp=function(a){return X(a)||(a=jc),this.map(function(b){return{value:b,timestamp:a.now()}})},uc.sample=uc.throttleLatest=function(a,b){return X(b)||(b=jc),"number"==typeof a?N(this,Nc(a,b)):N(this,a)},uc.timeout=function(a,b,c){(null==b||"string"==typeof b)&&(b=Fc(new Error(b||"Timeout"))),X(c)||(c=jc);var d=this,e=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new Sc(function(f){function g(){var d=h;l.setDisposable(c[e](a,function(){h===d&&(bb(b)&&(b=Lc(b)),j.setDisposable(b.subscribe(f)))}))}var h=0,i=new Zb,j=new $b,k=!1,l=new $b;return j.setDisposable(i),g(),i.setDisposable(d.subscribe(function(a){k||(h++,f.onNext(a),g())},function(a){k||(h++,f.onError(a))},function(){k||(h++,f.onCompleted())})),new Ub(j,l)},d)},uc.throttleFirst=function(a,b){X(b)||(b=jc);var c=+a||0;if(0>=c)throw new RangeError("windowDuration cannot be less or equal zero.");var d=this;return new Sc(function(a){var e=0;return d.subscribe(function(d){var f=b.now();(0===e||f-e>=c)&&(e=f,a.onNext(d))},a.onError.bind(a),a.onCompleted.bind(a))},d)};var Oc=function(a){function b(a){var b=this.source.publish(),c=b.subscribe(a),d=Yb,e=this.pauser.distinctUntilChanged().subscribe(function(a){a?d=b.connect():(d.dispose(),d=Yb)});return new Ub(c,d,e)}function c(c,d){this.source=c,this.controller=new Vc,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,a.call(this,b,c)}return Ob(c,a),c.prototype.pause=function(){this.controller.onNext(!1)},c.prototype.resume=function(){this.controller.onNext(!0)},c}(xc);uc.pausable=function(a){return new Oc(this,a)};var Pc=function(b){function c(b){var c,d=[],e=O(this.source,this.pauser.distinctUntilChanged().startWith(!1),function(a,b){return{data:a,shouldFire:b}}).subscribe(function(e){if(c!==a&&e.shouldFire!=c){if(c=e.shouldFire,e.shouldFire)for(;d.length>0;)b.onNext(d.shift())}else c=e.shouldFire,e.shouldFire?b.onNext(e.data):d.push(e.data)},function(a){for(;d.length>0;)b.onNext(d.shift());b.onError(a)},function(){for(;d.length>0;)b.onNext(d.shift());b.onCompleted()});return e}function d(a,d){this.source=a,this.controller=new Vc,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,b.call(this,c,a)}return Ob(d,b),d.prototype.pause=function(){this.controller.onNext(!1)},d.prototype.resume=function(){this.controller.onNext(!0)},d}(xc);uc.pausableBuffered=function(a){return new Pc(this,a)};var Qc=function(a){function b(a){return this.source.subscribe(a)}function c(c,d){a.call(this,b,c),this.subject=new Rc(d),this.source=c.multicast(this.subject).refCount()}return Ob(c,a),c.prototype.request=function(a){return null==a&&(a=-1),this.subject.request(a)},c}(xc),Rc=function(a){function b(a){return this.subject.subscribe(a)}function c(c){null==c&&(c=!0),a.call(this,b),this.subject=new Vc,this.enableQueue=c,this.queue=c?[]:null,this.requestedCount=0,this.requestedDisposable=Yb,this.error=null,this.hasFailed=!1,this.hasCompleted=!1,this.controlledDisposable=Yb}return Ob(c,a),Pb(c.prototype,sc,{onCompleted:function(){this.hasCompleted=!0,(!this.enableQueue||0===this.queue.length)&&this.subject.onCompleted()},onError:function(a){this.hasFailed=!0,this.error=a,(!this.enableQueue||0===this.queue.length)&&this.subject.onError(a)},onNext:function(a){var b=!1;0===this.requestedCount?this.enableQueue&&this.queue.push(a):(-1!==this.requestedCount&&0===this.requestedCount--&&this.disposeCurrentRequest(),b=!0),b&&this.subject.onNext(a)},_processRequest:function(a){if(this.enableQueue){for(;this.queue.length>=a&&a>0;)this.subject.onNext(this.queue.shift()),a--;return 0!==this.queue.length?{numberOfItems:a,returnValue:!0}:{numberOfItems:a,returnValue:!1}}return this.hasFailed?(this.subject.onError(this.error),this.controlledDisposable.dispose(),this.controlledDisposable=Yb):this.hasCompleted&&(this.subject.onCompleted(),this.controlledDisposable.dispose(),this.controlledDisposable=Yb),{numberOfItems:a,returnValue:!1}},request:function(a){this.disposeCurrentRequest();var b=this,c=this._processRequest(a),a=c.numberOfItems;return c.returnValue?Yb:(this.requestedCount=a,this.requestedDisposable=Xb(function(){b.requestedCount=0}),this.requestedDisposable)},disposeCurrentRequest:function(){this.requestedDisposable.dispose(),this.requestedDisposable=Yb}}),c}(xc);uc.controlled=function(a){return null==a&&(a=!0),new Qc(this,a)},uc.transduce=function(a){function b(a){return{init:function(){return a},step:function(a,b){return a.onNext(b)},result:function(a){return a.onCompleted()}}}var c=this;return new Sc(function(d){var e=a(b(d));return c.subscribe(function(a){try{e.step(d,a)}catch(b){d.onError(b)}},d.onError.bind(d),function(){e.result(d)})},c)};var Sc=V.AnonymousObservable=function(a){function b(a){return a&&"function"==typeof a.dispose?a:"function"==typeof a?Xb(a):Yb}function c(d,e){function f(a){var c=function(){try{e.setDisposable(b(d(e)))}catch(a){if(!e.fail(a))throw a}},e=new Tc(a);return ec.scheduleRequired()?ec.schedule(c):c(),e}return this.source=e,this instanceof c?void a.call(this,f):new c(d)}return Ob(c,a),c}(xc),Tc=function(a){function b(b){a.call(this),this.observer=b,this.m=new Zb}Ob(b,a);var c=b.prototype;return c.next=function(a){var b=!1;try{this.observer.onNext(a),b=!0}catch(c){throw c}finally{!b&&this.dispose()}},c.error=function(a){try{this.observer.onError(a)}catch(b){throw b}finally{this.dispose()}},c.completed=function(){try{this.observer.onCompleted()}catch(a){throw a}finally{this.dispose()}},c.setDisposable=function(a){this.m.setDisposable(a)},c.getDisposable=function(){return this.m.getDisposable()},c.dispose=function(){a.prototype.dispose.call(this),this.m.dispose()},b}(vc),Uc=function(a,b){this.subject=a,this.observer=b};Uc.prototype.dispose=function(){if(!this.subject.isDisposed&&null!==this.observer){var a=this.subject.observers.indexOf(this.observer);this.subject.observers.splice(a,1),this.observer=null}};var Vc=V.Subject=function(a){function c(a){return b.call(this),this.isStopped?this.exception?(a.onError(this.exception),Yb):(a.onCompleted(),Yb):(this.observers.push(a),new Uc(this,a))}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.observers=[]}return Ob(d,a),Pb(d.prototype,sc,{hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(b.call(this),!this.isStopped){var a=this.observers.slice(0);this.isStopped=!0;for(var c=0,d=a.length;d>c;c++)a[c].onCompleted();this.observers=[]}},onError:function(a){if(b.call(this),!this.isStopped){var c=this.observers.slice(0);this.isStopped=!0,this.exception=a;for(var d=0,e=c.length;e>d;d++)c[d].onError(a);this.observers=[]}},onNext:function(a){if(b.call(this),!this.isStopped)for(var c=this.observers.slice(0),d=0,e=c.length;e>d;d++)c[d].onNext(a)},dispose:function(){this.isDisposed=!0,this.observers=null}}),d.create=function(a,b){return new Xc(a,b)},d}(xc),Wc=V.AsyncSubject=function(a){function c(a){if(b.call(this),!this.isStopped)return this.observers.push(a),new Uc(this,a);var c=this.exception,d=this.hasValue,e=this.value;return c?a.onError(c):d?(a.onNext(e),a.onCompleted()):a.onCompleted(),Yb}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.value=null,this.hasValue=!1,this.observers=[],this.exception=null}return Ob(d,a),Pb(d.prototype,sc,{hasObservers:function(){return b.call(this),this.observers.length>0},onCompleted:function(){var a,c,d;if(b.call(this),!this.isStopped){this.isStopped=!0;var e=this.observers.slice(0),f=this.value,g=this.hasValue;if(g)for(c=0,d=e.length;d>c;c++)a=e[c],a.onNext(f),a.onCompleted();else for(c=0,d=e.length;d>c;c++)e[c].onCompleted();this.observers=[]}},onError:function(a){if(b.call(this),!this.isStopped){var c=this.observers.slice(0);this.isStopped=!0,this.exception=a;for(var d=0,e=c.length;e>d;d++)c[d].onError(a);this.observers=[]}},onNext:function(a){b.call(this),this.isStopped||(this.value=a,this.hasValue=!0)},dispose:function(){this.isDisposed=!0,this.observers=null,this.exception=null,this.value=null}}),d}(xc),Xc=V.AnonymousSubject=function(a){function b(b,c){this.observer=b,this.observable=c,a.call(this,this.observable.subscribe.bind(this.observable))}return Ob(b,a),Pb(b.prototype,sc,{onCompleted:function(){this.observer.onCompleted()},onError:function(a){this.observer.onError(a)},onNext:function(a){this.observer.onNext(a)}}),b}(xc),Yc=V.BehaviorSubject=function(a){function c(a){if(b.call(this),!this.isStopped)return this.observers.push(a),a.onNext(this.value),new Uc(this,a);var c=this.exception;return c?a.onError(c):a.onCompleted(),Yb}function d(b){a.call(this,c),this.value=b,this.observers=[],this.isDisposed=!1,this.isStopped=!1,this.exception=null}return Ob(d,a),Pb(d.prototype,sc,{hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(b.call(this),!this.isStopped){this.isStopped=!0;for(var a=0,c=this.observers.slice(0),d=c.length;d>a;a++)c[a].onCompleted();this.observers=[]}},onError:function(a){if(b.call(this),!this.isStopped){this.isStopped=!0,this.exception=a;for(var c=0,d=this.observers.slice(0),e=d.length;e>c;c++)d[c].onError(a);this.observers=[]}},onNext:function(a){if(b.call(this),!this.isStopped){this.value=a;for(var c=0,d=this.observers.slice(0),e=d.length;e>c;c++)d[c].onNext(a)}},dispose:function(){this.isDisposed=!0,this.observers=null,this.value=null,this.exception=null}}),d}(xc),Zc=V.ReplaySubject=function(a){function c(a,b){return Xb(function(){b.dispose(),!a.isDisposed&&a.observers.splice(a.observers.indexOf(b),1)})}function d(a){var d=new yc(this.scheduler,a),e=c(this,d);b.call(this),this._trim(this.scheduler.now()),this.observers.push(d);for(var f=0,g=this.q.length;g>f;f++)d.onNext(this.q[f].value);return this.hasError?d.onError(this.error):this.isStopped&&d.onCompleted(),d.ensureActive(),e}function e(b,c,e){this.bufferSize=null==b?Number.MAX_VALUE:b,this.windowSize=null==c?Number.MAX_VALUE:c,this.scheduler=e||ec,this.q=[],this.observers=[],this.isStopped=!1,this.isDisposed=!1,this.hasError=!1,this.error=null,a.call(this,d)}return Ob(e,a),Pb(e.prototype,sc,{hasObservers:function(){return this.observers.length>0},_trim:function(a){for(;this.q.length>this.bufferSize;)this.q.shift();for(;this.q.length>0&&a-this.q[0].interval>this.windowSize;)this.q.shift()},onNext:function(a){if(b.call(this),!this.isStopped){var c=this.scheduler.now();this.q.push({interval:c,value:a}),this._trim(c);for(var d=this.observers.slice(0),e=0,f=d.length;f>e;e++){var g=d[e];g.onNext(a),g.ensureActive()}}},onError:function(a){if(b.call(this),!this.isStopped){this.isStopped=!0,this.error=a,this.hasError=!0;var c=this.scheduler.now();this._trim(c);for(var d=this.observers.slice(0),e=0,f=d.length;f>e;e++){var g=d[e];g.onError(a),g.ensureActive()}this.observers=[]}},onCompleted:function(){if(b.call(this),!this.isStopped){this.isStopped=!0;var a=this.scheduler.now();this._trim(a);for(var c=this.observers.slice(0),d=0,e=c.length;e>d;d++){var f=c[d];f.onCompleted(),f.ensureActive()}this.observers=[]}},dispose:function(){this.isDisposed=!0,this.observers=null}}),e}(xc);"function"==typeof define&&"object"==typeof define.amd&&define.amd?(Q.Rx=V,define(function(){return V})):R&&S?T?(S.exports=V).Rx=V:R.Rx=V:Q.Rx=V;var $c=g()}).call(this);;/**
 * Typically modules would be in separate files and smushed together with a build
 * tools like Webpack or Browserify. I'm maintaining my own concat with Grunt so
 * all of the modules will be in a file already.
 * This establishes a object map and look up system.
 *
 * Example:
 *  define('moduleID',
 *    function(require, module, exports){
 *       exports.method = function(str) {
 *         //
 *       };
  *  });
 *
 *
 * @param id
 * @param moduleCode
 */
function define(id, moduleCode) {
  if(id in define.cache) {
    return;
  }
  define.cache[id] = moduleCode;
}
define.cache = Object.create(null);


/**
 * To require, it must have been mapped in the module map
 *
 * Refer to this later
 * https://github.com/substack/browser-pack/blob/d29fddc8a9207d5f967664935073b50971aff708/prelude.js
 *
 * @param id
 * @returns {*}
 */
function require(id) {
  if (id in require.cache) {
    return require.cache[id];
  }

  var moduleCode = define.cache[id],
    exports = {},
    module = {exports: exports};

  if(!moduleCode) {
    throw new Error('Require: module not found: "'+id+'"');
  }

  // TODO set scope to exports instead of moduleCode?
  moduleCode.call(moduleCode, require, module, exports);
  require.cache[id] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);

// Gets a new copy
function requireUnique(id) {
  var moduleCode = define.cache[id],
    exports = {},
    module = {exports: exports};

  if(!moduleCode) {
    throw new Error('requireUnique: module not found: "'+id+'"');
  }

  moduleCode.call(moduleCode, require, module, exports);
  return module.exports;
};define('nudoru.utils.ArrayUtils',
  function (require, module, exports) {

    var _numberUtils = require('nudoru.utils.NumberUtils');

    exports.isArray = function(test) {
      return Object.prototype.toString.call(test) === "[object Array]";
    };

    // Reference: http://jhusain.github.io/learnrx/index.html
    exports.mergeAll = function () {
      var results = [];

      this.forEach(function (subArr) {
        subArr.forEach(function (elm) {
          results.push(elm);
        });
      });

      return results;
    };

    // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
    exports.unique = function (arry) {
      var o = {},
        i,
        l = arry.length,
        r = [];
      for (i = 0; i < l; i += 1) {
        o[arry[i]] = arry[i];
      }
      for (i in o) {
        r.push(o[i]);
      }
      return r;
    };

    exports.removeIndex = function (arr, idx) {
      return arr.splice(idx, 1);
    };

    exports.removeItem = function (arr, item) {
      var idx = arr.indexOf(item);
      if (idx > -1) {
        arr.splice(idx, 1);
      }
    };

    exports.rndElement = function (arry) {
      return arry[_numberUtils.rndNumber(0, arry.length - 1)];
    };

    exports.getRandomSetOfElements = function (srcarry, max) {
      var arry = [],
        i = 0,
        len = _numberUtils.rndNumber(1, max);

      for (; i < len; i++) {
        arry.push(this.rndElement(srcarry));
      }

      return arry;
    };

    exports.getDifferences = function (arr1, arr2) {
      var dif = [];

      arr1.forEach(function (value) {
        var present = false,
          i = 0,
          len = arr2.length;

        for (; i < len; i++) {
          if (value === arr2[i]) {
            present = true;
            break;
          }
        }

        if (!present) {
          dif.push(value);
        }

      });

      return dif;
    };

  });;define('nudoru.utils.BrowserInfo',
  function (require, module, exports) {

    exports.appVersion = navigator.appVersion;
    exports.userAgent = navigator.userAgent;
    exports.isIE = -1 < navigator.userAgent.indexOf("MSIE ");
    exports.isIE6 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 6");
    exports.isIE7 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 7");
    exports.isIE8 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 8");
    exports.isIE9 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 9");
    exports.isFF = -1 < navigator.userAgent.indexOf("Firefox/");
    exports.isChrome = -1 < navigator.userAgent.indexOf("Chrome/");
    exports.isMac = -1 < navigator.userAgent.indexOf("Macintosh;");
    exports.isMacSafari = -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome");

    exports.hasTouch = 'ontouchstart' in document.documentElement;
    exports.notSupported = this.isIE6 || this.isIE7 || this.isIE8;

    exports.mobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          this.Android()
          || this.BlackBerry()
          || this.iOS()
          || this.Opera()
          || this.Windows()
          ) !== null
      }

    };

    // TODO filter for IE > 9
    exports.enhanced = function() {
      return !_browserInfo.isIE && !_browserInfo.mobile.any();
    };

    exports.mouseDownEvtStr = function () {
      return this.mobile.any() ? "touchstart" : "mousedown";
    };

    exports.mouseUpEvtStr = function () {
      return this.mobile.any() ? "touchend" : "mouseup";
    };

    exports.mouseClickEvtStr = function () {
      return this.mobile.any() ? "touchend" : "click";
    };

    exports.mouseMoveEvtStr = function () {
      return this.mobile.any() ? "touchmove" : "mousemove";
    };

  });;define('nudoru.utils.DOMUtils',
  function(require, module, exports) {
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    // element must be entirely on screen
    exports.isElementEntirelyInViewport = function (el) {
      var rect = el.getBoundingClientRect();
      return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // element may be partialy on screen
    exports.isElementInViewport = function (el) {
      var rect = el.getBoundingClientRect();
      return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth)  &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
    };

    exports.isDomObj = function(obj) {
      return !!(obj.nodeType || (obj === window));
    };

    exports.position = function(el) {
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    };

    // from http://jsperf.com/jquery-offset-vs-offsetparent-loop
    exports.offset = function(el) {
      var ol = 0,
        ot = 0;
      if (el.offsetParent) {
        do {
          ol += el.offsetLeft;
          ot += el.offsetTop;
        } while (el = el.offsetParent); // jshint ignore:line
      }
      return {
        left: ol,
        top: ot
      };
    };

    exports.removeAllElements = function(el) {
      while(el.firstChild) {
        el.removeChild(el.firstChild);
      }
    };

    //http://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    exports.HTMLStrToNode = function (str) {
      var temp = document.createElement('div');
      temp.innerHTML = str;
      return temp.firstChild;
    };

    exports.wrapElement = function(wrapperStr, el) {
      var wrapperEl = this.HTMLStrToNode(wrapperStr),
        elParent = el.parentNode;

      wrapperEl.appendChild(el);
      elParent.appendChild(wrapperEl);
      return wrapperEl;
    };

    // http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
    exports.closest = function(el, selector) {
      var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
      while (el) {
        if (matchesSelector.bind(el)(selector)) {
          return el;
        } else {
          el = el.parentElement;
        }
      }
      return false;
    };

    // from youmightnotneedjquery.com
    exports.hasClass = function(el, className) {
      if (el.classList) {
        el.classList.contains(className);
      } else {
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
      }
    };

    exports.addClass = function(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    };

    exports.removeClass = function(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    };

    exports.toggleClass = function(el, className) {
      if(this.hasClass(el, className)) {
        this.removeClass(el, className);
      } else {
        this.addClass(el, className);
      }
    };

    /**
     * Get an array of elements in the container returned as Array instead of a Node list
     */
    exports.getQSElementsAsArray = function(el, cls) {
      return Array.prototype.slice.call(el.querySelectorAll(cls));
    };

    exports.centerElementInViewPort = function(el) {
      var vpH = window.innerHeight,
        vpW = window.innerWidth,
        elR = el.getBoundingClientRect(),
        elH = elR.height,
        elW = elR.width;

      el.style.left = (vpW/2) - (elW/2)+'px';
      el.style.top = (vpH/2) - (elH/2)+'px';
    };

  });;// Simple debugger, Matt Perkins
define('nudoru.utils.NDebugger',
  function(require, module, exports) {

    var _messages = [],
        _broadcast = true;

    exports.log = function(text, source) {
      _messages.push({
        source: source,
        text: text
      });

      if(_broadcast) {
        console.log(createLogOutputString(_messages[_messages.length-1]));
      }
    };

    function createLogOutputString(entry) {
      return '> '+entry.text;
    }

  });;define('nudoru.utils.NLorem',
  function(require, module, exports) {

    var _currentText = [],
      _textSets = [],
      _maleFirstNames = [],
      _femaleFirstNames = [],
      _lastNames = [],
      _punctuation = [],
      _months,
      _days,
      _initialized = false,
      _arrayUtils = require('nudoru.utils.ArrayUtils'),
      _stringUtils = require('nudoru.utils.StringUtils'),
      _numberUtils = require('nudoru.utils.NumberUtils');

    _textSets = [
      "Perhaps a re-engineering of your current world view will re-energize your online nomenclature to enable a new holistic interactive enterprise internet communication solution Upscaling the resurgent networking exchange solutions, achieving a breakaway systemic electronic data interchange system synchronization, thereby exploiting technical environments for mission critical broad based capacity constrained systems Fundamentally transforming well designed actionable information whose semantic content is virtually null To more fully clarify the current exchange, a few aggregate issues will require addressing to facilitate this distributed communication venue In integrating non-aligned structures into existing legacy systems, a holistic gateway blueprint is a backward compatible packaging tangible"
    ];

    _lastNames = 'Smith Johnson Williams Jones Brown Davis Miller Wilson Moore Taylor Anderson Thomas Jackson White Harris Martin Thompson Garcia Martinez Robinson Clark Rodriguez Lewis Lee Walker Hall Allen Young Hernandez King Wright Lopez Hill Scott Green Adams Baker Gonzalez Nelson Carter Mitchell Perez Roberts Turner Phillips Campbell Parker Evans Edwards Collins Stewart Sanchez Morris Rogers Reed Cook Morgan Bell Murphy'.split(' ');

    _maleFirstNames = 'Thomas Arthur Lewis Clarence Leonard Albert Paul Carl Ralph Roy Earl Samuel Howard Richard Francis Laurence Herbert Elmer Ernest Theodore David Alfred Donald Russell Eugene Andrew Kenneth Herman Jesse Lester Floyd Michael Edwin Clifford Benjamin Clyde Glen Oscar Daniel'.split(' ');

    _femaleFirstNames = 'Elizabeth Ann Helen Margaret Ellen Catherine Lily Florence Ada Lou Ethel Emily Ruth Rose Frances Alice Bertha Clara Mabel Minnie Grace Jane Evelyn Gertrude Edna Pearl Laura Hazel Edith Esther Harriet Sarah May Matilda Martha Myrtle Josephin Maud Agnes Keri Julia Irene Mildred Cora'.split(' ');

    _punctuation = ['.','.','.','.','?','!'];

    _months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    _days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

    function initialize() {
      if(_initialized) return;
      setCurrentTextSet(0);
      _initialized = true;
    }

    function setCurrentTextSet(index) {
      var _current = _textSets[index].toLowerCase();
      _currentText= _current.split(' ');
    }

    function getSentence(min,max) {
      var sentence = getText(min, max);

      return _stringUtils.capitalizeFirstLetter(sentence) + getRandomItem(_punctuation);
    }

    function getParagraph(min, max) {
      var str = "",
        delim = " ",
        len = _numberUtils.rndNumber(min, max),
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
      var str = "",
        delim = " ",
        len = _numberUtils.rndNumber(min, max),
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
      return arry[_numberUtils.rndNumber(min, max)];
    }

    function getFirstName() {
      return _numberUtils.rndNumber(0,1) ? getRandomItem(_maleFirstNames) : getRandomItem(_femaleFirstNames);
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
      var month = _numberUtils.rndNumber(0,11),
        wkday = _numberUtils.rndNumber(0,4);

      return {
        monthNumber: month + 1,
        monthName: _months[month],
        monthDay: _numberUtils.rndNumber(1,28),
        weekDayNumber: wkday + 1,
        weekDay: _days[wkday],
        year: _arrayUtils.rndElement(['2010','2011','2012','2013','2014'])
      };
    }

    exports.initialize = initialize;
    exports.getText = getText;
    exports.getSentence = getSentence;
    exports.getParagraph = getParagraph;
    exports.getFLName = getFLName;
    exports.getLFName = getLFName;
    exports.getDate = getDate;

  });;define('nudoru.utils.NTemplate',
  function(require, module, exports) {

    var _templateHTMLCache = Object.create(null),
      _templateCache = Object.create(null),
      _DOMUtils = require('nudoru.utils.DOMUtils');

    /**
     * Get the template html from the script tag with id
     * @param id
     * @returns {*}
     */
    function getSource(id) {
      if(_templateHTMLCache[id]) {
        return _templateHTMLCache[id];
      }

      var src = document.getElementById(id),
        srchtml = '',
        cleanhtml = '';

      if(src) {
        srchtml = src.innerHTML;
      } else {
        console.log('Template not found: "'+id+'"');
        return '';
      }

      cleanhtml = cleanTemplateHTML(srchtml);
      _templateHTMLCache[id] = cleanhtml;
      return cleanhtml;
    }

    /**
     * Returns an underscore template
     * @param id
     * @returns {*}
     */
    function getTemplate(id) {
      if(_templateCache[id]) {
        return _templateCache[id];
      }
      var templ = _.template(getSource(id));
      _templateCache[id] = templ;
      return templ;
    }

    /**
     * Processes the template and returns HTML
     * @param id
     * @param obj
     * @returns {*}
     */
    function asHTML(id, obj) {
      var temp = getTemplate(id);
      return temp(obj);
    }

    /**
     * Processes the template and returns an HTML Element
     * @param id
     * @param obj
     * @returns {*}
     */
    function asElement(id, obj) {
      return _DOMUtils.HTMLStrToNode(asHTML(id, obj));
    }

    /**
     * Cleans template HTML
     */
    function cleanTemplateHTML(str) {
      //replace(/(\r\n|\n|\r|\t)/gm,'').replace(/>\s+</g,'><').
      return str.trim();
    }

    exports.getSource = getSource;
    exports.getTemplate = getTemplate;
    exports.asHTML = asHTML;
    exports.asElement = asElement;

  });
;define('nudoru.utils.NumberUtils',
  function (require, module, exports) {

    exports.isInteger = function (str) {
      return (/^-?\d+$/.test(str));
    };

    exports.rndNumber = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    exports.clamp = function (val, min, max) {
      return Math.max(min, Math.min(max, val));
    };

    exports.inRange = function (val, min, max) {
      return val > min && val < max
    };

    exports.distanceTL = function (point1, point2) {
      var xd = (point2.left - point1.left),
        yd = (point2.top - point1.top);

      return Math.sqrt((xd * xd) + (yd * yd));
    };

  });;define('nudoru.utils.ObjectUtils',
  function(require, module, exports) {

    exports.dynamicSort = function (property) {
      return function (a, b) {
        return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      };
    };

    exports.searchObjects = function(obj, key, val) {
      var objects = [];
      for (var i in obj) {
        if (typeof obj[i] === 'object') {
          objects = objects.concat(searchObjects(obj[i], key, val));
        } else if (i === key && obj[key] === val) {
          objects.push(obj);
        }
      }
      return objects;
    };

    exports.getObjectFromString = function (obj, str) {
      var i = 0,
        path = str.split('.'),
        len = path.length;

      for (; i < len; i++) {
        obj = obj[path[i]];
      }
      return obj;
    };

    exports.getObjectIndexFromId = function (obj, id) {
      if (typeof obj === "object") {
        for (var i = 0; i < obj.length; i++) {
          if (typeof obj[i] !== "undefined" && typeof obj[i].id !== "undefined" && obj[i].id === id) {
            return i;
          }
        }
      }
      return false;
    };

    // extend and deep extend from http://youmightnotneedjquery.com/
    exports.extend = function(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i]) {
          continue;
        }

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            out[key] = arguments[i][key];
          }
        }
      }

      return out;
    };

    exports.deepExtend = function(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if (!obj) {
          continue;
        }

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
              exports.deepExtend(out[key], obj[key]);
            } else {
              out[key] = obj[key];
            }
          }
        }
      }

      return out;
    };

    /**
     * Simplified implementation of Stamps - http://ericleads.com/2014/02/prototypal-inheritance-with-stamps/
     * https://www.barkweb.co.uk/blog/object-composition-and-prototypical-inheritance-in-javascript
     *
     * Prototype object requires a methods object, private closures and state is optional
     *
     * @param prototype
     * @returns New object using prototype.methods as source
     */
    exports.basicFactory = function(prototype) {
      var proto = prototype,
        obj = Object.create(proto.methods);

      if(proto.hasOwnProperty('closure')) {
        proto.closures.forEach(function(closure) {
          closure.call(obj);
        });
      }

      if(proto.hasOwnProperty('state')) {
        for(var key in proto.state) {
          obj[key] = proto.state[key];
        }
      }

      return obj;
    };

  });
;define('nudoru.utils.Router',
  function(require, module, exports) {

    var _routeMap = Object.create(null),
      _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _browserEvents = require('nudoru.events.BrowserEvents');

    function initialize() {
      window.addEventListener('hashchange', onHashChange, false);
    }

    /**
     * Map a route to a given controller function
     * The controller funtion will be passed an object with the route and templateID
     * @param route
     * @param conObj
     */
    function when(route, conObj) {
      _routeMap[route] = {
        templateID: conObj.templateID,
        controller: conObj.controller
      };
    }

    // Should the route or event run first?
    function onHashChange(evt) {
      runCurrentRoute();
      _eventDispatcher.publish(_browserEvents.URL_HASH_CHANGED, getURLFragment());
    }

    /**
     * Runs the route currently on the URL
     * Primarily used window.load
     */
    function runCurrentRoute() {
      var fragment = getURLFragment(),
          parts = fragment.split('?'),
          route = '/' + parts[0],
          queryStr = decodeURIComponent(parts[1]),
          queryStrObj = parseQueryStr(queryStr);
      runRoute(route, queryStrObj);
    }

    /**
     * Parses a query string into key/value pairs
     * @param queryStr
     * @returns {{}}
     */
    function parseQueryStr(queryStr) {
      var obj = {},
          parts = queryStr.split('&');

      parts.forEach(function(pairStr) {
        var pairArr = pairStr.split('=');
        obj[pairArr[0]] = pairArr[1];
      });

      return obj;
    }

    /**
     * Executes the controller function for the given route
     * @param route
     * @param queryStrObj
     */
    function runRoute(route, queryStrObj) {
      var routeObj = _routeMap[route];

      if(routeObj) {
        routeObj.controller.call(window, {route: route, templateID: routeObj.templateID, data:queryStrObj});
      } else {
       console.log('No Route mapped for: "'+route+'"');
      }
    }

    /**
     * Returns everything after the 'whatever.html#' in the URL
     * Leading and trailing slashes are removed
     * reference- http://lea.verou.me/2011/05/get-your-hash-the-bulletproof-way/
     *
     * @returns {string}
     */
    function getURLFragment() {
      var fragment = location.hash.slice(1);
      return fragment.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    function updateURLFragment(path) {
      window.location.hash = path;
    }

    exports.initialize = initialize;
    exports.when = when;
    exports.runCurrentRoute = runCurrentRoute;
    exports.setRoute = updateURLFragment;

  });;define('nudoru.utils.StringUtils',
  function(require, module, exports){

    exports.capitalizeFirstLetter = function(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };

    exports.toTitleCase = function(str) {
      return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      });
    };

    exports.removeTags = function(str) {
      return str.replace(/(<([^>]+)>)/ig, '');
    };

    exports.ellipses = function(len) {
      return (this.length > len) ? this.substr(0, len) + "..." : this;
    };

  });;define('nudoru.utils.TouchUtils',
  function(require, module, exports) {

    // https://github.com/filamentgroup/tappy/blob/master/tappy.js
    exports.getCoords = function( evt ){
      var ev = evt.originalEvent || evt,
        touches = ev.touches || ev.targetTouches;

      if( touches ){
        return [ touches[ 0 ].pageX, touches[ 0 ].pageY ];
      }
      else {
        return null;
      }
    };

  });
;define('nudoru.events.BrowserEvents',
  function(require, module, exports) {
    exports.URL_HASH_CHANGED = 'URL_HASH_CHANGED';
    exports.BROWSER_RESIZED = 'BROWSER_RESIZED';
    exports.BROWSER_SCROLLED = 'BROWSER_SCROLLED';
  });;define('nudoru.events.ComponentEvents',
  function(require, module, exports) {
    exports.MODAL_COVER_SHOW = 'MODAL_COVER_SHOW';
    exports.MODAL_COVER_HIDE = 'MODAL_COVER_HIDE';
    exports.MENU_SELECT = 'MENU_SELECT';
  });;define('nudoru.events.EventCommandMap',
  function (require, module, exports) {

    var _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _commandMap = Object.create(null);

    /**
     * Register the event to a command
     * @param evt Event string
     * @param command Command class
     * @param once  Umap after the first event publish
     */
    function map(evt, command, once) {

      if (hasCommand(evt, command)) {
        return;
      }

      if (_commandMap[evt] === undefined) {
        _commandMap[evt] = {};
      }

      var evtCommandMap = _commandMap[evt];

      var callback = function (args) {
        routeToCommand(evt, command, args, once);
      };

      evtCommandMap[command] = callback;

      _eventDispatcher.subscribe(evt, callback);
    }

    /**
     * Routes the event to the command
     * @param evt
     * @param command
     * @param args
     * @param once
     */
    function routeToCommand(evt, command, args, once) {
      var cmd = command;
      cmd.execute.apply(command, [args]);
      cmd = null;
      if (once) {
        unmap(evt, command);
      }
    }

    /**
     * Unregister a command from an event
     * @param evt
     * @param command
     */
    function unmap(evt, command) {
      if (hasCommand(evt, command)) {
        var callbacksByCommand = _commandMap[evt],
          callback = callbacksByCommand[command];
        _eventDispatcher.unsubscribe(evt, callback);
        delete callbacksByCommand[command];
      }
    }

    /**
     * Determine if a command has been mapped to an event
     * @param evt
     * @param command
     * @returns {boolean}
     */
    function hasCommand(evt, command) {
      var callbacksByCommand = _commandMap[evt];
      if (callbacksByCommand === undefined) {
        return false;
      }
      var callback = callbacksByCommand[command];
      return callback !== undefined;
    }

    exports.map = map;
    exports.unmap = unmap;

  });;define('nudoru.events.EventDispatcher',
  function (require, module, exports) {
    var _eventMap = Object.create(null);

    /**
     * Subscribe a function to an event string
     * @param evtString String for the event
     * @param callback  Callback function
     * @param once  Unsubscript after the first fire
     */
    function subscribe(evtString, callback, once) {
      if (_eventMap[evtString] === undefined) {
        _eventMap[evtString] = [];
      }

      _eventMap[evtString].push({
        evtstring: evtString,
        callback: callback,
        once: once,
        priority: 0
      });
    }

    /**
     * Stop listening to the event
     * @param evtString
     * @param callback
     */
    function unsubscribe(evtString, callback) {
      if (_eventMap[evtString] === undefined) {
        return;
      }

      var listeners = _eventMap[evtString],
        callbackIdx = -1;

      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i].callback === callback) {
          callbackIdx = i;
        }
      }

      if (callbackIdx === -1) {
        return;
      }

      listeners.splice(callbackIdx, 1);

      if (listeners.length === 0) {
        delete _eventMap[evtString];
      }
    }

    /**
     * Fire an event to all registered listeners
     * @param evtString
     * @param data
     * @param context
     */
    function publish(evtString, data, context) {
      if (_eventMap[evtString] === undefined) {
        return;
      }

      var listeners = _eventMap[evtString],
        i = listeners.length;

      data = (data instanceof Array) ? data : [data];

      while (i--) {

        var listenerObj = listeners[i];

        var cnxt = context || listenerObj.callback;
        listenerObj.callback.apply(cnxt, data);
        if (listenerObj.once) {
          unsubscribe(listenerObj.evtstring, listenerObj.callback);
        }

      }
    }

    exports.subscribe = subscribe;
    exports.unsubscribe = unsubscribe;
    exports.publish = publish;

  });;//----------------------------------------------------------------------------
//  A menu item
//----------------------------------------------------------------------------

define('nudoru.components.BasicMenuItemView',
  function(require, module, exports) {

    var _selected = false,
      _data = null,
      _element = null,
      _iconElement = null,
      _anchorElement = null,
      _iconDeselectedClass = null,
      _iconSelectedClass = null,
      _toggle = null,
      _stringUtils = require('nudoru.utils.StringUtils'),
      _DOMUtils = require('nudoru.utils.DOMUtils'),
      _template = require('nudoru.utils.NTemplate');

    function initialize(idata) {
      _data = idata;

      if(_data.toggle) {
        _toggle = true;
        _iconSelectedClass = 'fa-check';
        _iconDeselectedClass = 'fa-circle-thin';
      }

      _data.label = _stringUtils.toTitleCase(_data.label);

      render();

      _selected = false;
    }

    function render() {
      if(_toggle) {
        _element = _template.asElement('template__menu-item-icon', _data);
      } else {
        _element = _template.asElement('template__menu-item', _data);
      }

      _iconElement = _element.querySelector('i');
      _anchorElement = _element.querySelector('button');
    }

    function getElement() {
      return _element;
    }

    function getLabel() {
      return _data.label;
    }

    function getValue() {
      return _data.value;
    }

    function select() {
      if(_selected || _element === undefined) {
        return;
      }
      _selected = true;

      if(_toggle) {
        _DOMUtils.removeClass(_iconElement, _iconDeselectedClass);
        _DOMUtils.addClass(_iconElement, _iconSelectedClass);
      }
    }

    function showOverEffect() {
      TweenLite.to(_element, 0.1, {backgroundColor:'rgba(255,255,255,.25)', ease:Circ.easeOut});
    }

    function showOutEffect() {
      TweenLite.to(_element, 0.25, {backgroundColor:'rgba(255,255,255,0)', ease:Circ.easeIn});
    }

    function showDepressEffect() {
      var tl = new TimelineLite();
      tl.to(_element,0.1, {scale:0.9, ease: Quad.easeOut});
      tl.to(_element,0.5, {scale:1, ease: Elastic.easeOut});
    }

    function deselect() {
      if(!_selected || _element === undefined) {
        return;
      }
      _selected = false;

      if(_toggle) {
        _DOMUtils.removeClass(_iconElement, _iconSelectedClass);
        _DOMUtils.addClass(_iconElement, _iconDeselectedClass);
      }
    }

    function toggleSelect() {
      if(_selected) {
        deselect();
      } else {
        select();
      }
    }

    exports.initialize = initialize;
    exports.getElement = getElement;
    exports.getLabel = getLabel;
    exports.getValue = getValue;
    exports.select = select;
    exports.showOverEffect = showOverEffect;
    exports.showOutEffect = showOutEffect;
    exports.showDepressEffect = showDepressEffect;
    exports.deselect = deselect;
    exports.toggleSelect = toggleSelect;

  });
;define('nudoru.components.DDMenuBarView',
  function (require, module, exports) {

    var _mountPoint = null,
      _barEl = null,
      _data = null,
      _children = [],
      _isKeepOpen = false,
      _DOMUtils = require('nudoru.utils.DOMUtils'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    function initialize(elID, idata, keep) {
      _mountPoint = document.getElementById(elID);
      _data = idata;

      _isKeepOpen = keep ? true : false;

      render();
    }

    function render() {
      var i = 0,
        len = _data.length;

      _barEl = _DOMUtils.HTMLStrToNode('<ul></ul>');
      for (; i < len; i++) {
        var menuobj = requireUnique('nudoru.components.DDMenuView');
        menuobj.initialize(_data[i], _isKeepOpen);

        _barEl.appendChild(menuobj.getElement());
        _children.push(menuobj);
      }

      _mountPoint.insertBefore(_barEl, _mountPoint.firstChild);

      // hack to prevent clicking on menuItems from selecting text on ie since CSS isn't supported
      if (_browserInfo.isIE) {
        _mountPoint.onselectstart = function () {
          return false;
        };
      }

    }

    function resetAllSelections() {
      _children.forEach(function (menu) {
        menu.deselectAllItems();
      });
    }

    function setMenuSelections(data) {
      _children.forEach(function (menu) {
        menu.setSelections(data);
      });
    }

    exports.initialize = initialize;
    exports.resetAllSelections = resetAllSelections;
    exports.setMenuSelections = setMenuSelections;

  });;//----------------------------------------------------------------------------
//  A menu
//----------------------------------------------------------------------------

define('nudoru.components.DDMenuView',
  function(require, module, exports) {

    var _visible = false,
      _data = null,
      _children = [],
      _element = null,
      _anchorElement = null,
      _ddMenuEl = null,
      _menuOpenHeight = 0,
      _menuOverStream = null,
      _menuOutStream = null,
      _menuClickStream = null,
      _fadeOutComplete = null,
      _isKeepOpen = false,
      _firstTouchPosition = [],
      _lastTouchPosition = [],
      _touchDeltaTolerance = 10,
      _shouldProcessTouchEnd = false,
      _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _DOMUtils = require('nudoru.utils.DOMUtils'),
      _touchUtils = require('nudoru.utils.TouchUtils'),
      _componentEvents = require('nudoru.events.ComponentEvents'),
      _template = require('nudoru.utils.NTemplate'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    function initialize(idata, keep) {
      _data = idata;
      _data.value = _data.value || _data.label.split(' ').join('_').toLowerCase();

      // Should the menu ever collapse or remain open always?
      _isKeepOpen = keep ? true : false;

      render();

      if(_browserInfo.mobile.any()) {
        configureMobileStreams();
      } else {
        configureStreams();
      }
    }

    function render() {
      _element = _template.asElement('template__menu-header', _data);
      _ddMenuEl = _element.querySelector('ul');
      _anchorElement = _element.querySelector('button');

      _data.items.forEach(buildMenuItems);

      _fadeOutComplete = true;

      // Need a little delay to get the height of the menu
      setTimeout(setMenuState, 1);
    }

    function buildMenuItems(item) {
      var menuitem = requireUnique('nudoru.components.BasicMenuItemView');
      menuitem.initialize(item);
      _ddMenuEl.appendChild(menuitem.getElement());
      _children.push(menuitem);
    }

    function getElement() {
      return _element;
    }

    function getValue() {
      return _data.value;
    }

    function setMenuState() {
      // not able to get the true height from CSS, 39px is the height of a single line item
      var guessHeight = _data.items.length * 39,
        cssHeight = parseInt(window.getComputedStyle(_ddMenuEl,null).getPropertyValue("height"), 10);

      // use the highest measure
      _menuOpenHeight = Math.max(guessHeight, cssHeight);

      if(_isKeepOpen) {
        _visible = true;
      } else {
        _visible = false;
        _ddMenuEl.style.height = '0px';
        TweenLite.to(_ddMenuEl, 0, {autoAlpha: 0});
      }
    }

    function configureStreams() {
      _menuOverStream = Rx.Observable.fromEvent(_element, 'mouseover')
        .filter(filterForMouseEventsOnItems)
        .map(getMouseEventTargetValue)
        .subscribe(handleMenuOver);

      _menuOutStream = Rx.Observable.fromEvent(_element, 'mouseout')
        .filter(filterForMouseEventsOnItems)
        .map(getMouseEventTargetValue)
        .subscribe(handleMenuOut);

      _menuClickStream = Rx.Observable.fromEvent(_element, 'click')
        .filter(filterForMouseEventsOnItems)
        .map(getMouseEventTargetValue)
        .subscribe(handleMenuClick);
    }

    function filterForMouseEventsOnItems(evt) {
      var target = evt.target;
      if(target === null) {
        return false;
      }
      // Need to traverse up the DOM for IE9
      var el = getTargetElMatching(target, '.js__menu-item');
      if(el){
        return el.tagName.toLowerCase() === 'button';
      }
      return false;
    }

    function getMouseEventTargetValue(evt) {
      var target = getTargetElMatching(evt.target, '.js__menu-item');
      return target.getAttribute('data-value');
    }

    function getTargetElMatching(el, cls) {
      return _DOMUtils.closest(el, cls);
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
      _element.addEventListener('touchstart', (function(evt) {
        _firstTouchPosition = _lastTouchPosition = _touchUtils.getCoords(evt);
        _shouldProcessTouchEnd = false;
      }), false);

      _element.addEventListener('touchmove', (function(evt) {
        _lastTouchPosition = _touchUtils.getCoords(evt);
      }), false);

      var touchPressFunction = function(arg) {
        if(_shouldProcessTouchEnd) {
          handleMenuClick(arg);
        }
      };

      _menuClickStream = Rx.Observable.fromEvent(_element, 'touchend')
        .filter(processTouchEndEventsOnItems)
        .map(getMouseEventTargetValue)
        .subscribe(touchPressFunction);
    }

    function processTouchEndEventsOnItems(evt) {
      var deltaX = Math.abs(_lastTouchPosition[0] - _firstTouchPosition[0]),
        deltaY = Math.abs(_lastTouchPosition[1] - _firstTouchPosition[1]);

      if(deltaX <= _touchDeltaTolerance && deltaY <= _touchDeltaTolerance) {
        _shouldProcessTouchEnd = true;
      }

      return filterForMouseEventsOnItems(evt);
    }

    function handleMenuOver(data) {
      open();
      if(isHeaderObject(data)) {
        // nothing on header
      } else {
        var item = getItemByValue(data);
        item.showOverEffect();
      }
    }

    function handleMenuOut(data) {
      close();
      if(isHeaderObject(data)) {
        // nothing on header
      } else {
        var item = getItemByValue(data);
        item.showOutEffect();
      }
    }

    function handleMenuClick(data) {
      if(isHeaderObject(data)) {
        // Toggle visibility on mobile/tablet
        if(_browserInfo.mobile.any()) {
          toggleMenu();
        }
      } else {
        var item = getItemByValue(data);
        item.toggleSelect();
        item.showDepressEffect();
        _eventDispatcher.publish(_componentEvents.MENU_SELECT, data);
      }
    }

    function isHeaderObject(data) {
      return data === _data.value;
    }

    function toggleMenu() {
      if(_isKeepOpen) {
        return;
      }

      if(_visible) {
        close();
      } else {
        open();
      }
    }

    function getItemByValue(value) {
      return _children.filter(function(item) {
        return (item.getValue() === value);
      })[0];
    }

    function deselectAllItems() {
      _children.forEach(function(item) {
        item.deselect();
      });
    }

    function setSelections(data) {
      deselectAllItems();

      _children.forEach(function(item) {
        data.forEach(function(selection) {
          if(item.getLabel() === selection) {
            item.select();
          }
        });
      });
    }

    function open() {
      if(_visible || _element === undefined || _isKeepOpen) {
        return;
      }

      _visible = true;

      TweenLite.killTweensOf(_anchorElement);
      TweenLite.killTweensOf(_ddMenuEl);

      TweenLite.to(_anchorElement, 0.25, {paddingTop:'10px', ease:Circ.easeOut});
      TweenLite.to(_ddMenuEl, 0.5, {autoAlpha: 1, height:_menuOpenHeight, top:'0', ease:Circ.easeOut});
    }

    function close() {
      if(!_visible || _element === undefined || _isKeepOpen) {
        return;
      }
      _visible = false;

      _fadeOutComplete = false;

      var closeCompleteFunc = closeComplete;

      TweenLite.to(_anchorElement, 0.25, {paddingTop:'0px', ease:Circ.easeIn, delay:0.1});
      TweenLite.to(_ddMenuEl,0.1, {autoAlpha: 0, height: 0, ease:Circ.easeIn, onComplete: closeCompleteFunc, delay:0.1});
    }

    function closeComplete() {
      _fadeOutComplete = true;
    }

    exports.initialize = initialize;
    exports.getElement = getElement;
    exports.getValue = getValue;
    exports.open = open;
    exports.close = close;
    exports.toggleMenu = toggleMenu;
    exports.setSelections = setSelections;
    exports.deselectAllItems = deselectAllItems;

  });
;define('nudoru.components.FloatImageView',
  function (require, module, exports) {

    var _mountPoint = document,
      _coverDivID = 'floatimage__cover',
      _floatingImageClass = '.floatimage__srcimage',
      _zoomedImageClass = 'floatimage__zoomedimage',
      _viewPortCoverEl,
      _viewPortCoverClickStream,
      _captionEl,
      _currentImageElement,
      _scrollingView = _mountPoint.body,
      _fancyEffects = false,
      _DOMUtils = require('nudoru.utils.DOMUtils'),
      _numberUtils = require('nudoru.utils.NumberUtils'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    /**
     * Entry point, initialize elements and hide cover
     */
    function initialize() {
      _viewPortCoverEl = _mountPoint.getElementById(_coverDivID);
      _captionEl = _viewPortCoverEl.querySelector('.floatimage__caption');

      _fancyEffects = !_browserInfo.isIE && !_browserInfo.mobile.any();

      hideFloatImageCover();

      _viewPortCoverClickStream = Rx.Observable.fromEvent(_viewPortCoverEl, _browserInfo.mouseClickEvtStr())
        .subscribe(function () {
          hideFloatImageCover();
        });
    }

    /**
     * Apply functionality to div/container of div>img 's
     * @param container
     */
    function apply(container) {
      getFloatingElementsInContainerAsArray(container).forEach(function (el) {

        _DOMUtils.wrapElement('<div class="floatimage__wrapper" />', el);

        el.addEventListener(_browserInfo.mouseClickEvtStr(), onImageClick, false);

        //TweenLite.set(el.parentNode.parentNode, {css:{transformPerspective:200, transformStyle:"preserve-3d", backfaceVisibility:"hidden"}});

        if (!_browserInfo.mobile.any()) {
          el.addEventListener('mouseover', onImageOver, false);
          el.addEventListener('mouseout', onImageOut, false);
        }

      });
    }

    function setScrollingView(el) {
      _scrollingView = el;
    }

    function onImageOver(evt) {
      if (_fancyEffects) {
        TweenLite.to(evt.target.parentNode.parentNode, 0.25, {
          scale: 1.10,
          ease: Circ.easeOut
        });
      } else {
        TweenLite.to(evt.target.parentNode.parentNode, 0.25, {
          scale: 1.10,
          ease: Circ.easeOut
        });

      }
    }

    function onImageOut(evt) {
      if (_fancyEffects) {
        TweenLite.to(evt.target.parentNode.parentNode, 0.5, {
          scale: 1,
          ease: Circ.easeOut
        });
      } else {
        TweenLite.to(evt.target.parentNode.parentNode, 0.5, {
          scale: 1,
          ease: Circ.easeOut
        });
      }

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
      if (imageEl.tagName.toLowerCase() === 'div') {
        _currentImageElement = imageEl.querySelector('img');
      } else {
        _currentImageElement = imageEl;
      }

      // Calculations
      var vpFill = 0.75,
        imgSrc = _currentImageElement.getAttribute('src'),
        imgAlt = _currentImageElement.getAttribute('alt'),
        imgWidth = _currentImageElement.clientWidth,
        imgHeight = _currentImageElement.clientHeight,
        imgPosition = _DOMUtils.offset(_currentImageElement),
        imgRatio = imgWidth / imgHeight,
        imgTargetScale = 1,
        vpWidth = window.innerWidth,
        vpHeight = window.innerHeight,
        vpScrollTop = _scrollingView.scrollTop,
        vpScrollLeft = _scrollingView.scrollLeft,
        vpRatio = vpWidth / vpHeight,
        imgOriginX = imgPosition.left - vpScrollLeft,
        imgOriginY = imgPosition.top - vpScrollTop,
        imgTargetX,
        imgTargetY,
        imgTargetWidth,
        imgTargetHeight;

      if (vpRatio > imgRatio) {
        imgTargetScale = vpHeight * vpFill / imgHeight;
      } else {
        imgTargetScale = vpWidth * vpFill / imgWidth;
      }

      imgTargetWidth = imgWidth * imgTargetScale;
      imgTargetHeight = imgHeight * imgTargetScale;

      imgTargetX = (vpWidth / 2) - (imgTargetWidth / 2) - imgPosition.left + vpScrollLeft;
      imgTargetY = (vpHeight / 2) - (imgTargetHeight / 2) - imgPosition.top + vpScrollTop;

      var zoomImage = _DOMUtils.HTMLStrToNode('<div class="' + _zoomedImageClass + '"></div>');

      zoomImage.style.backgroundImage = 'url("' + imgSrc + '")';
      zoomImage.style.left = imgOriginX + 'px';
      zoomImage.style.top = imgOriginY + 'px';
      zoomImage.style.width = imgWidth + 'px';
      zoomImage.style.height = imgHeight + 'px';

      _viewPortCoverEl.appendChild(zoomImage);

      // fade source image on screen
      TweenLite.to(_currentImageElement, 0.25, {alpha: 0, ease: Circ.easeOut});

      if (_fancyEffects) {
        // further from the center, the create the effect
        var startingRot = _numberUtils.clamp(((imgPosition.left - (vpWidth / 2)) / 4), -75, 75),
          origin;

        if (startingRot <= 0) {
          startingRot = Math.min(startingRot, -20);
          origin = 'left top';
        } else {
          startingRot = Math.max(startingRot, 20);
          origin = 'right top';
        }

        TweenLite.set(zoomImage, {
          css: {
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }
        });

        // For the 'tear down effect'
        var tl = new TimelineLite();
        tl.to(zoomImage, 0.25, {
          rotationZ: -15,
          rotationY: startingRot,
          transformOrigin: origin,
          y: '+50',
          ease: Back.easeInOut
        });
        tl.to(zoomImage, 0.5, {
          rotationZ: 0,
          rotationY: 0,
          transformOrigin: origin,
          width: imgTargetWidth,
          height: imgTargetHeight,
          x: imgTargetX,
          y: imgTargetY,
          ease: Quad.easeOut
        });

      } else {
        TweenLite.to(zoomImage, 0.5, {
          rotationY: 0,
          width: imgTargetWidth,
          height: imgTargetHeight,
          x: imgTargetX,
          y: imgTargetY,
          ease: Circ.easeOut
        });
      }

      showFloatImageCover();

      // Caption
      if (imgAlt.length >= 1) {
        _captionEl.innerHTML = '<p>' + imgAlt + '</p>';
      } else {
        _captionEl.innerHTML = '';
      }

    }

    /**
     * Remove functionality to div/container of div>img 's
     * @param container
     */
    function remove(container) {
      if (!container) {
        return;
      }

      _scrollingView = _mountPoint.body;

      getFloatingElementsInContainerAsArray(container).forEach(function (el) {
        el.removeEventListener('click', onImageClick);
        if (!_browserInfo.mobile.any()) {
          el.removeEventListener('mouseover', onImageOver);
          el.removeEventListener('mouseout', onImageOut);
        }
      });
    }

    /**
     * Get an array of elements in the container returned as Array instead of a Node list
     * @param container
     * @returns {*}
     */
    function getFloatingElementsInContainerAsArray(container) {
      if (!_DOMUtils.isDomObj(container)) {
        return [];
      }
      return _DOMUtils.getQSElementsAsArray(container, _floatingImageClass);
    }

    /**
     * Show the div covering the UI
     */
    function showFloatImageCover() {
      TweenLite.to(_viewPortCoverEl, 0.25, {autoAlpha: 1, ease: Circ.easeOut});
    }

    /**
     * Hide the div covering the UI
     */
    function hideFloatImageCover() {
      if (_currentImageElement) {
        TweenLite.to(_currentImageElement, 0.1, {alpha: 1, ease: Circ.easeOut});
        _currentImageElement = null;
      }

      TweenLite.to(_viewPortCoverEl, 0.25, {
        autoAlpha: 0,
        ease: Circ.easeOut,
        onComplete: hideFloatImageCoverComplete
      });
    }

    /**
     * The enlarged image is present during the cover fade out, remove it when that's completed
     */
    function hideFloatImageCoverComplete() {
      var zoomedImage = _viewPortCoverEl.querySelector('.' + _zoomedImageClass);
      if (zoomedImage) {
        _viewPortCoverEl.removeChild(zoomedImage);
      }
    }

    /**
     * Public API
     */
    exports.initialize = initialize;
    exports.apply = apply;
    exports.setScrollingView = setScrollingView;
    exports.remove = remove;


  });;define('nudoru.components.MessageBoxView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _highestZ = 1000,
      _defaultWidth = 400,
      _types = {
        DEFAULT: 'default',
        INFORMATION: 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default': '',
        'information': 'messagebox__information',
        'success': 'messagebox__success',
        'warning': 'messagebox__warning',
        'danger': 'messagebox__danger'
      },
      _mountPoint,
      _buttonIconTemplateID = 'template__messagebox--button-icon',
      _buttonNoIconTemplateID = 'template__messagebox--button-noicon',
      _template = require('nudoru.utils.NTemplate'),
      _modal = require('nudoru.components.ModalCoverView'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _domUtils = require('nudoru.utils.DOMUtils');

    /**
     * Initialize and set the mount point / box container
     * @param elID
     */
    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    /**
     * Add a new message box
     * @param initObj
     * @returns {*}
     */
    function add(initObj) {
      var type = initObj.type || _types.DEFAULT,
        boxObj = createBoxObject(initObj);

      // setup
      _children.push(boxObj);
      _mountPoint.appendChild(boxObj.element);
      assignTypeClassToElement(type, boxObj.element);
      configureButtons(boxObj);
      _domUtils.centerElementInViewPort(boxObj.element);

      // Set 3d CSS props for in/out transition
      TweenLite.set(boxObj.element, {
        css: {
          transformPerspective: 800,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          zIndex: _highestZ,
          width: (initObj.width ? initObj.width : _defaultWidth) + 'px'
        }
      });

      // Make it draggable
      Draggable.create('#' + boxObj.id, {
        bounds: window,
        onPress:function() {
          _highestZ = Draggable.zIndex;
        }
      });

      // Show it
      transitionIn(boxObj.element);

      // Show the modal cover
      if (initObj.modal) {
        _modal.showHard(true);
      }

      return boxObj.id;
    }

    /**
     * Assign a type class to it
     * @param type
     * @param element
     */
    function assignTypeClassToElement(type, element) {
      if (type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
    }

    /**
     * Create the object for a box
     * @param initObj
     * @returns {{dataObj: *, id: string, modal: (*|boolean), element: *, streams: Array}}
     */
    function createBoxObject(initObj) {
      var id = 'js__messagebox-' + (_counter++).toString(),
        obj = {
          dataObj: initObj,
          id: id,
          modal: initObj.modal,
          element: _template.asElement('template__messagebox--default', {
            id: id,
            title: initObj.title,
            content: initObj.content
          }),
          streams: []
        };

      return obj;
    }

    /**
     * Set up the buttons
     * @param boxObj
     */
    function configureButtons(boxObj) {
      var buttonData = boxObj.dataObj.buttons;

      // default button if none
      if(!buttonData) {
        buttonData = [{
            label: 'Close',
            type: '',
            icon: 'times',
            id: 'default-close'
          }];
      }

      var buttonContainer = boxObj.element.querySelector('.footer-buttons');

      _domUtils.removeAllElements(buttonContainer);

      buttonData.forEach(function makeButton(buttonObj) {
        buttonObj.id = boxObj.id + '-button-' + buttonObj.id;

        var buttonEl;

        if(buttonObj.hasOwnProperty('icon')) {
          buttonEl = _template.asElement(_buttonIconTemplateID, buttonObj);
        }  else {
          buttonEl = _template.asElement(_buttonNoIconTemplateID, buttonObj);
        }

        buttonContainer.appendChild(buttonEl);

        var btnStream = Rx.Observable.fromEvent(buttonEl, _browserInfo.mouseClickEvtStr())
          .subscribe(function () {
            if(buttonObj.hasOwnProperty('onClick')) {
              buttonObj.onClick.call(this);
            }
            remove(boxObj.id);
          });

        boxObj.streams.push(btnStream);

      });

    }

    /**
     * Remove a box from the screen / container
     * @param id
     */
    function remove(id) {
      var idx = getObjIndexByID(id),
        boxObj;

      if (idx > -1) {
        boxObj = _children[idx];
        transitionOut(boxObj.element);
      }
    }



    /**
     * Show the box
     * @param el
     */
    function transitionIn(el) {
      TweenLite.to(el, 0, {alpha: 0, rotationX: 45});
      TweenLite.to(el, 1, {alpha: 1, rotationX: 0, ease: Circ.easeOut});
    }

    /**
     * Remove the box
     * @param el
     */
    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        alpha: 0,
        rotationX: -45,
        ease: Circ.easeIn, onComplete: function () {
          onTransitionOutComplete(el);
        }
      });
    }

    /**
     * Clean up after the transition out animation
     * @param el
     */
    function onTransitionOutComplete(el) {
      var idx = getObjIndexByID(el.getAttribute('id')),
        boxObj = _children[idx];

      boxObj.streams.forEach(function(stream) {
        stream.dispose();
      });

      Draggable.get('#' + boxObj.id).disable();

      _mountPoint.removeChild(el);

      _children[idx] = null;
      _children.splice(idx, 1);

      checkModalStatus();
    }

    /**
     * Determine if any open boxes have modal true
     */
    function checkModalStatus() {
      var isModal = false;

      _children.forEach(function (boxObj) {
        if (boxObj.modal === true) {
          isModal = true;
        }
      });

      if (!isModal) {
        _modal.hide(true);
      }
    }

    /**
     * Utility to get the box object by ID
     * @param id
     * @returns {number}
     */
    function getObjIndexByID(id) {
      var len = _children.length,
        i = 0;

      for (; i < len; i++) {
        if (_children[i].id === id) {
          return i;
        }
      }

      return -1;
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function () {
      return _types
    };

  });;define('nudoru.components.ModalCoverView',
  function (require, module, exports) {
    var _mountPoint = document,
      _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _isHard,
      _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _componentEvents = require('nudoru.events.ComponentEvents'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    function initialize() {

      _isVisible = true;

      _modalCoverEl = _mountPoint.getElementById('modal__cover');
      _modalBackgroundEl = _mountPoint.querySelector('.modal__background');
      _modalCloseButtonEl = _mountPoint.querySelector('.modal__close-button');

      var modalBGClick = Rx.Observable.fromEvent(_modalBackgroundEl, _browserInfo.mouseClickEvtStr()),
        modalButtonClick = Rx.Observable.fromEvent(_modalCloseButtonEl, _browserInfo.mouseClickEvtStr());

      _modalClickStream = Rx.Observable.merge(modalBGClick, modalButtonClick)
        .subscribe(function () {
          onModalClick();
        });

      hide(false);
    }

    function getIsVisible() {
      return _isVisible;
    }

    function onModalClick() {
      if(_isHard) return;
      hide(true);
    }

    function showModalCover(animate) {
      _isVisible = true;
      var duration = animate ? 0.25 : 0;
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 1, ease: Quad.easeOut});
    }

    function show(animate) {
      if (_isVisible) {
        return;
      }

      _isHard = false;

      showModalCover(animate);
      TweenLite.to(_modalCloseButtonEl, duration * 2, {
        autoAlpha: 1,
        top: 22,
        ease: Back.easeOut,
        delay: 2
      });

      _eventDispatcher.publish(_componentEvents.MODAL_COVER_SHOW);
    }

    /**
     * A 'hard' modal view cannot be dismissed with a click, must be via code
     * @param animate
     */
    function showHard(animate) {
      if (_isVisible) {
        return;
      }

      _isHard = true;

      showModalCover(animate);
      TweenLite.to(_modalCloseButtonEl, 0, {autoAlpha: 0});
    }

    function hide(animate) {
      if (!_isVisible) {
        return;
      }
      _isVisible = false;
      _isHard = false;
      var duration = animate ? 0.25 : 0;
      TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 0, ease: Quad.easeOut});
      TweenLite.to(_modalCloseButtonEl, duration / 2, {
        autoAlpha: 0,
        top: -50,
        ease: Quad.easeOut
      });

      _eventDispatcher.publish(_componentEvents.MODAL_COVER_HIDE);
    }

    exports.initialize = initialize;
    exports.show = show;
    exports.showHard = showHard;
    exports.hide = hide;
    exports.visible = getIsVisible;

  });;define('nudoru.components.ToastView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultExpireDuration = 7000,
      _types = {
        DEFAULT : 'default',
        INFORMATION : 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default' : '',
        'information' : 'toast__information',
        'success' : 'toast__success',
        'warning' : 'toast__warning',
        'danger' : 'toast__danger'
      },
      _mountPoint,
      _template = require('nudoru.utils.NTemplate'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _domUtils = require('nudoru.utils.DOMUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    //obj.title, obj.content, obj.type
    function add(initObj) {
      initObj.type = initObj.type || _types.DEFAULT;

      var toastObj = createToastObject(initObj.title, initObj.content);

      _children.push(toastObj);

      _mountPoint.insertBefore(toastObj.element, _mountPoint.firstChild);

      assignTypeClassToElement(initObj.type, toastObj.element);

      TweenLite.set(toastObj.element, {
        css: {
          transformPerspective: 800,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden"
        }
      });

      var closeBtn = toastObj.element.querySelector('.toast__item-controls > button'),
        closeBtnSteam = Rx.Observable.fromEvent(closeBtn, _browserInfo.mouseClickEvtStr()),
        expireTimeStream = Rx.Observable.interval(_defaultExpireDuration);

      toastObj.defaultButtonStream = Rx.Observable.merge(closeBtnSteam, expireTimeStream).take(1)
        .subscribe(function () {
          remove(toastObj.id);
        });

      transitionIn(toastObj.element);

      return toastObj.id;
    }

    function assignTypeClassToElement(type, element) {
      if(type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
    }

    function createToastObject(title, message) {
      var id = 'js__toast-toastitem-' + (_counter++).toString(),
        obj = {
          id: id,
          element: _template.asElement('template__component--toast', {
            id: id,
            title: title,
            message: message
          }),
          defaultButtonStream: null
        };

      return obj;
    }

    function remove(id) {
      var idx = getObjIndexByID(id),
        toast;

      if (idx > -1) {
        toast = _children[idx];
        rearrange(idx);
        transitionOut(toast.element);
      }
    }

    function transitionIn(el) {
      TweenLite.to(el, 0, {alpha: 0});
      TweenLite.to(el, 1, {alpha: 1, ease: Quad.easeOut});
      rearrange();
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        rotationX: -45,
        alpha: 0,
        ease: Quad.easeIn, onComplete: function () {
          onTransitionOutComplete(el);
        }
      });
    }

    function onTransitionOutComplete(el) {
      var idx = getObjIndexByID(el.getAttribute('id')),
          toastObj = _children[idx];

      toastObj.defaultButtonStream.dispose();

      _mountPoint.removeChild(el);
      _children[idx] = null;
      _children.splice(idx, 1);
    }

    function rearrange(ignore) {
      var i = _children.length - 1,
        current,
        y = 0;

      for (; i > -1; i--) {
        if (i === ignore) {
          continue;
        }
        current = _children[i];
        TweenLite.to(current.element, 0.75, {y: y, ease: Bounce.easeOut});
        y += 10 + current.element.clientHeight;
      }
    }

    function getObjIndexByID(id) {
      var len = _children.length,
        i = 0;

      for (; i < len; i++) {
        if (_children[i].id === id) {
          return i;
        }
      }

      return -1;
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function() { return _types };

  });;define('APP.AppEvents',
  function (require, module, exports) {
    exports.CONTROLLER_INITIALIZED = 'CONTROLLER_INITIALIZED';
    exports.MODEL_DATA_WAITING = 'MODEL_DATA_WAITING';
    exports.MODEL_DATA_READY = 'MODEL_DATA_READY';
    exports.RESUME_FROM_MODEL_STATE = 'RESUME_FROM_MODEL_STATE';
    exports.VIEW_INITIALIZED = 'VIEW_INITIALIZED';
    exports.VIEW_RENDERED = 'VIEW_RENDERED';
    exports.VIEW_CHANGED = 'VIEW_CHANGED';
    exports.VIEW_CHANGE_TO_MOBILE = 'VIEW_CHANGE_TO_MOBILE';
    exports.VIEW_CHANGE_TO_DESKTOP = 'VIEW_CHANGE_TO_DESKTOP';
    exports.CHANGE_ROUTE = 'change_route';
  });;var APP = (function () {
  var _self,
    _config,
    _model,
    _view,
    _appEvents = require('APP.AppEvents'),
    _objectUtils = require('nudoru.utils.ObjectUtils'),
    _eventDispatcher = require('nudoru.events.EventDispatcher'),
    _eventCommandMap = require('nudoru.events.EventCommandMap'),
    _router = require('nudoru.utils.Router');

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getEventDispatcher() {
    return _eventDispatcher;
  }

  function getEventCommandMap() {
    return _eventCommandMap;
  }

  function getRouter() {
    return _router;
  }

  function getView() {
    return _view;
  }

  function getModel() {
    return _model;
  }

  function getConfig() {
    return _objectUtils.extend({}, _config);
  }

  //----------------------------------------------------------------------------
  //  Initialize
  //----------------------------------------------------------------------------

  /**
   * Init the app and inject the model and view
   * @param model
   * @param view
   */
  function initialize(model, view) {
    console.log('APP: Initialize');

    initializeConfig();

    _self = this;
    _model = model;
    _view = view;

    _router.initialize(_eventDispatcher);

    mapEventCommand(_appEvents.MODEL_DATA_WAITING, 'APP.ModelDataWaitingCommand', true);
    mapEventCommand(_appEvents.CONTROLLER_INITIALIZED, 'APP.AppInitializedCommand', true);

    initializeView();
  }

  /**
   * Initialize the global vars
   */
  function initializeConfig() {
    _config = {};
    _config.appConfig = APP_CONFIG_DATA;
  }

  //----------------------------------------------------------------------------
  //  MVC Initialization
  //----------------------------------------------------------------------------

  /**
   * Init step 1
   */
  function initializeView() {
    _view.initialize();
    initializeModel();
  }

  /**
   * Init step 2
   * A MODEL_DATA_WAITING event will dispatch, running the 'APP.ModelDataWaitingCommand'
   * which will inject data and then onModelDataReady() will run
   */
  function initializeModel() {
    _eventDispatcher.subscribe(_appEvents.MODEL_DATA_READY, onModelDataReady, true);
    _model.initialize();
  }

  /**
   * Init step 3
   */
  function onModelDataReady() {
    postInitialize();
  }

  /**
   * Init step 4
   * All APP initialization is complete, pass over to AppInitialzedCommand
   */
  function postInitialize() {
    _eventDispatcher.publish(_appEvents.CONTROLLER_INITIALIZED);
  }

  //----------------------------------------------------------------------------
  //  Wiring Services
  //----------------------------------------------------------------------------

  /**
   * Maps an event to trigger a command when it's published
   * @param evt The event string
   * @param command Module name of a command object, req execute(dataObj) function
   * @param once True if should only execute once, will be unmapped automatically
   */
  function mapEventCommand(evt, cmdModuleName, once) {
    once = once || false;
    var cmdModule = require(cmdModuleName);
    _eventCommandMap.map(evt, cmdModule, once);
  }

  /**
   * Set the router to execute the command when on the route
   * @param route
   * @param templateID
   * @param command
   */
  function mapRouteCommand(route, templateID, command) {
    _router.when(route,{templateID:templateID, controller:function executeRouteCommand(dataObj) {
      command.execute(dataObj);
    }});
  }

  /**
   * Maps a route to a view controller
   * @param route
   * @param templateID
   * @param controller
   * @param unique Should it be a singleton controller (false) or unique instance (true)
   */
  function mapRouteView(route, templateID, controller, unique) {
    _view.mapView(templateID, controller, unique);

    _router.when(route,{templateID:templateID, controller:function routeToViewController(dataObj) {
      _view.showView(dataObj);
    }});
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    config: getConfig,
    eventDispatcher: getEventDispatcher,
    eventCommandMap: getEventCommandMap,
    router: getRouter,
    view: getView,
    model: getModel,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand
  };

}());;define('APP.Model',
  function(require, module, exports) {

  var _self,
    _data,
    _appEvents = require('APP.AppEvents'),
    _eventDispatcher = require('nudoru.events.EventDispatcher');

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;
    _eventDispatcher.publish(_appEvents.MODEL_DATA_WAITING);
  }

  //----------------------------------------------------------------------------
  //  Data
  //----------------------------------------------------------------------------

  /**
   * Set the data for the model
   * @param dataObj
   */
  function setData(dataObj) {
    _data = dataObj;
    _eventDispatcher.publish(_appEvents.MODEL_DATA_READY);
  }

  /**
   * Returns a copy of the data
   * @returns *
   */
  function getData() {
    return _data.slice(0);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------


  exports.initialize = initialize;
  exports.setData = setData;
  exports.getData = getData;

});;define('APP.View.ControlsTestingSubView',
  function (require, module, exports) {

    var _initObj,
      _id,
      _templateObj,
      _html,
      _DOMElement,
      _initialState,
      _currentState,
      _domUtils = require('nudoru.utils.DOMUtils'),
      _lIpsum = require('nudoru.utils.NLorem'),
      _actionOneEl,
      _actionTwoEl,
      _actionThreeEl,
      _actionFourEl;

    function initialize(initObj) {
      console.log(initObj.id + ', subview update');

      if(!_initObj) {
        _initObj = initObj;
        _id = initObj.id;
        _templateObj = initObj.template;
        _initialState = _currentState = initObj.state;

        _lIpsum.initialize();

        render();
      } else {
        console.log(_id + ', subview already init\'d');
        update(initObj.state);
      }
    }

    function update(state) {
      console.log(_id + ', subview update');
      _currentState = state;
      return render();
    }

    function render() {
      console.log(_id + ', subview render');

      _html = _templateObj(_currentState);
      _DOMElement = _domUtils.HTMLStrToNode(_html);

      return _DOMElement;
    }

    function viewDidMount() {
      console.log(_id + ', subview did mount');

      _actionOneEl = document.getElementById('action-one');
      _actionTwoEl = document.getElementById('action-two');
      _actionThreeEl = document.getElementById('action-three');
      _actionFourEl = document.getElementById('action-four');

      _actionOneEl.addEventListener('click', function actOne(e) {
        APP.view().addMessageBox({
          title: _lIpsum.getSentence(2,4),
          content: _lIpsum.getParagraph(2, 4),
          type: 'default',
          modal: true,
          width: 200
        });
      });

      _actionTwoEl.addEventListener('click', function actTwo(e) {
        APP.view().addMessageBox({
          title: _lIpsum.getSentence(10,20),
          content: _lIpsum.getParagraph(2, 4),
          type: 'default',
          modal: false,
          buttons: [
            {
              label: 'Yes',
              id: 'yes',
              type: 'default',
              icon: 'check',
              onClick: function() {
                console.log('yes');
              }
            },
            {
              label: 'Maybe',
              id: 'maybe',
              type: 'positive',
              icon:'cog',
              onClick: function() {
                console.log('maybe');
              }
            },
            {
              label: 'Nope',
              id: 'nope',
              type: 'negative',
              icon: 'times'
            },
            {
              label: 'WTF',
              id: 'neutral',
              type: 'neutral',
              onClick: function() {
                console.log('neutral');
              }
            }
          ]
        });
      });

      _actionThreeEl.addEventListener('click', function actThree(e) {
        APP.view().addNotification({
          title: _lIpsum.getSentence(3,6),
          type: 'default',
          content: _lIpsum.getParagraph(1, 2)
        });
      });

      _actionFourEl.addEventListener('click', function actFour(e) {
        console.log('Four');
      });
      
    }

    function viewWillUnMount() {
      console.log(_id + ', subview will unmount');
    }

    function getID() {
      return _id;
    }

    function getDOMElement() {
      return _DOMElement;
    }

    exports.initialize = initialize;
    exports.update = update;
    exports.render = render;
    exports.getID = getID;
    exports.getDOMElement = getDOMElement;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnMount = viewWillUnMount;

  });;define('APP.View.TemplateSubView',
  function (require, module, exports) {

    var _initObj,
      _id,
      _templateObj,
      _html,
      _DOMElement,
      _initialState,
      _currentState,
      _domUtils = require('nudoru.utils.DOMUtils');

    /**
     * Initialization
     * @param initObj
     */
    function initialize(initObj) {
      console.log(initObj.id + ', subview update');

      console.log('subview state',initObj.state);

      if(!_initObj) {
        _initObj = initObj;
        _id = initObj.id;
        _templateObj = initObj.template;
        _initialState = _currentState = initObj.state;
        render();
      } else {
        console.log(_id + ', subview already init\'d');
        update(initObj.state);
      }
    }

    /**
     * Update state and rerender
     * @param state
     * @returns {*}
     */
    function update(state) {
      console.log(_id + ', subview update');
      _currentState = state;
      return render();
    }

    /**
     * Render it, need to add it to a parent container, handled in higher level view
     * @returns {*}
     */
    function render() {
      console.log(_id + ', subview render');

      _html = _templateObj(_currentState);
      _DOMElement = _domUtils.HTMLStrToNode(_html);
      return _DOMElement;
    }

    /**
     * Call after it's been added to a view
     */
    function viewDidMount() {
      console.log(_id + ', subview did mount');
    }

    /**
     * Call when unloading and switching views
     */
    function viewWillUnMount() {
      console.log(_id + ', subview will unmount');
    }

    /**
     * Accessor for ID prop
     * @returns {*}
     */
    function getID() {
      return _id;
    }

    /**
     * Accessor for the DOM element
     * @returns {*}
     */
    function getDOMElement() {
      return _DOMElement;
    }

    exports.initialize = initialize;
    exports.update = update;
    exports.render = render;
    exports.getID = getID;
    exports.getDOMElement = getDOMElement;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnMount = viewWillUnMount;

  });;define('APP.BasicView',
  function (require, module, exports) {

    var _self,
      _eventDispatcher = APP.eventDispatcher();

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;
      _eventDispatcher.publish(APP.AppEvents.VIEW_INITIALIZED);
      render();
    }

    function render() {
      _eventDispatcher.publish(APP.AppEvents.VIEW_RENDERED);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.render = render;

  });;define('APP.View.MixinBrowserEvents',
  function (require, module, exports) {

    var _currentViewPortSize,
      _currentViewPortScroll,
      _uiUpdateLayoutStream,
      _browserScrollStream,
      _browserResizeStream,
      _positionUIElementsOnChangeCB,
      _eventDispatcher = APP.eventDispatcher(),
      _browserEvents = require('nudoru.events.BrowserEvents');


    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initializeEventStreams() {
      setCurrentViewPortSize();
      setCurrentViewPortScroll();
      configureUIStreams();
    }

    function setPositionUIElementsOnChangeCB(cb) {
      _positionUIElementsOnChangeCB = cb;
    }

    /**
     * Set up RxJS streams for events
     */
    function configureUIStreams() {
      var uiresizestream = Rx.Observable.fromEvent(window, 'resize'),
        uiscrollscream = Rx.Observable.fromEvent(_mainScrollEl, 'scroll');

      // UI layout happens immediately, while resize and scroll is throttled
      _uiUpdateLayoutStream = Rx.Observable.merge(uiresizestream, uiscrollscream)
        .subscribe(function () {
          positionUIElementsOnChange();
        });

      _browserResizeStream = Rx.Observable.fromEvent(window, 'resize')
        .throttle(100)
        .subscribe(function () {
          handleViewPortResize();
        });

      _browserScrollStream = Rx.Observable.fromEvent(_mainScrollEl, 'scroll')
        .throttle(100)
        .subscribe(function () {
          handleViewPortScroll();
        });
    }

    function getMainScrollingView() {
      return _mainScrollEl;
    }

    function setMainScrollingView(elID) {
      _mainScrollEl = document.getElementById(elID);
    }

    //----------------------------------------------------------------------------
    //  Viewport and UI elements
    //----------------------------------------------------------------------------

    function handleViewPortResize() {
      _eventDispatcher.publish(_browserEvents.BROWSER_RESIZED, _currentViewPortSize);
    }

    function handleViewPortScroll() {
      _eventDispatcher.publish(_browserEvents.BROWSER_SCROLLED, _currentViewPortScroll);
    }

    function getCurrentViewPortSize() {
      return _currentViewPortSize;
    }

    /**
     * Cache the current view port size in a var
     */
    function setCurrentViewPortSize() {
      _currentViewPortSize = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }

    function getCurrentViewPortScroll() {
      return _currentViewPortScroll;
    }

    /**
     * Cache the current view port scroll in a var
     */
    function setCurrentViewPortScroll() {
      var scrollEL = _mainScrollEl ? _mainScrollEl : document.body;

      var left = scrollEL.scrollLeft,
        top = scrollEL.scrollTop;

      left = left ? left : 0;
      top = top ? top : 0;

      _currentViewPortScroll = {left: left, top: top};
    }

    /**
     * Reposition the UI elements on a UI change, scroll, resize, etc.
     */
    function positionUIElementsOnChange() {
      setCurrentViewPortScroll();
      setCurrentViewPortSize();

      _positionUIElementsOnChangeCB.call(this, _currentViewPortSize, _currentViewPortScroll);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initializeEventStreams = initializeEventStreams;
    exports.setPositionUIElementsOnChangeCB = setPositionUIElementsOnChangeCB;
    exports.getMainScrollingView = getMainScrollingView;
    exports.setMainScrollingView = setMainScrollingView;
    exports.getCurrentViewPortSize = getCurrentViewPortSize;
    exports.getCurrentViewPortScroll = getCurrentViewPortScroll;

  });;define('APP.View.MixinMultiDeviceView',
  function (require, module, exports) {

    var _drawerEl,
      _drawerToggleButtonEl,
      _drawerToggleButtonStream,
      _appEl,
      _browserResizeStream,
      _isMobile,
      _tabletBreakWidth,
      _phoneBreakWidth,
      _drawerWidth,
      _isDrawerOpen,
      _currentViewPortSize,
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _eventDispatcher = require('nudoru.events.EventDispatcher');

    function initialize(initObj) {
      _isMobile = false;
      _tabletBreakWidth = 750;
      _phoneBreakWidth = 475;
      _drawerWidth = 250;
      _isDrawerOpen = false;

      _appEl = document.getElementById('app__contents');
      _drawerEl = document.getElementById('drawer');
      _drawerToggleButtonEl = document.querySelector('.drawer__menu-spinner-button > input');

      if(_drawerEl) {
        TweenLite.to(_drawerEl, 0, {x: _drawerWidth * -1});
      }

      configureStreams();
      handleViewPortResize();
    }

    function configureStreams() {
      _browserResizeStream = Rx.Observable.fromEvent(window, 'resize')
        .throttle(10)
        .subscribe(function () {
          handleViewPortResize();
        });

      if(_drawerToggleButtonEl) {
        _drawerToggleButtonStream = Rx.Observable.fromEvent(_drawerToggleButtonEl, 'change')
          .subscribe(function () {
            toggleDrawer();
          });
      }
    }

    function handleViewPortResize() {
      setViewPortSize();
      checkForMobile();
    }

    function setViewPortSize() {
      _currentViewPortSize = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }

    /**
     * Usually on resize, check to see if we're in mobile
     */
    function checkForMobile() {
      if (_currentViewPortSize.width <= _tabletBreakWidth || _browserInfo.mobile.any()) {
        switchToMobileView();
      } else if (_currentViewPortSize.width > _tabletBreakWidth) {
        switchToDesktopView();
      }
    }

    function switchToMobileView() {
      if (_isMobile) {
        return;
      }
      _isMobile = true;
      _eventDispatcher.publish(APP.AppEvents.VIEW_CHANGE_TO_MOBILE);
    }

    function switchToDesktopView() {
      if (!_isMobile) {
        return;
      }
      _isMobile = false;
      closeDrawer();
      _eventDispatcher.publish(APP.AppEvents.VIEW_CHANGE_TO_DESKTOP);
    }

    function toggleDrawer() {
      if (_isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }

    function openDrawer() {
      _isDrawerOpen = true;
      TweenLite.to(_drawerEl, 0.5, {x: 0, ease: Quad.easeOut});
      TweenLite.to(_appEl, 0.5, {x: _drawerWidth, ease: Quad.easeOut});
    }

    function closeDrawer() {
      _isDrawerOpen = false;
      TweenLite.to(_drawerEl, 0.5, {x: _drawerWidth * -1, ease: Quad.easeOut});
      TweenLite.to(_appEl, 0.5, {x: 0, ease: Quad.easeOut});
    }

    exports.initialize = initialize;
    exports.openDrawer = openDrawer;
    exports.closeDrawer = closeDrawer;
    exports.checkForMobile = checkForMobile;
});;define('APP.View.MixinRouteViews',
  function (require, module, exports) {

    var _template = require('nudoru.utils.NTemplate'),
      _subViewMountPoint,
      _subViewMapping = Object.create(null),
      _currentSubView,
      _subViewHTMLTemplatePrefix = 'template__',
      _appEvents = require('APP.AppEvents'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _eventDispatcher = APP.eventDispatcher();

    /**
     * Set the location for the view to append, any contents will be removed prior
     * @param elID
     */
    function setSubViewMountPoint(elID) {
      _subViewMountPoint = document.getElementById(elID);
    }

    /**
     * Return the template object
     * @returns {*}
     */
    function getTemplate() {
      return _template;
    }

    /**
     * Map a route to a module view controller
     * @param templateID
     * @param controller
     * @param unique
     */
    function mapView(templateID, controller, unique) {
      _subViewMapping[templateID] = {
        htmlTemplate: _template.getTemplate(_subViewHTMLTemplatePrefix + templateID),
        controller: unique ? requireUnique(controller) : require(controller)
      };
    }

    /**
     * Show a view (in response to a route change)
     * @param viewObj props: templateID, route
     */
    function showView(viewObj) {
      if(!_subViewMountPoint) {
        throw new Error('No subview mount point set');
      }

      var subview = _subViewMapping[viewObj.templateID];

      if (subview) {
        unMountCurrentSubView();
      } else {
        throw new Error('No subview mapped for route: ' + viewObj.route + ' > ' + viewObj.templateID);
      }

      subview.controller.initialize({
        id: viewObj.templateID,
        template: subview.htmlTemplate,
        state: viewObj.data
      });

      _subViewMountPoint.appendChild(subview.controller.getDOMElement());
      _currentSubView = viewObj.templateID;

      if(subview.controller.viewDidMount) {
        subview.controller.viewDidMount();
      }

      _eventDispatcher.publish(_appEvents.VIEW_CHANGED, viewObj.templateID);
    }

    /**
     * Remove the currently displayed view
     */
    function unMountCurrentSubView() {
      if (_currentSubView) {
        var subViewController = _subViewMapping[_currentSubView].controller;
        if (subViewController.viewWillUnMount) {
          subViewController.viewWillUnMount();
        }
      }

      _currentSubView = '';
      _domUtils.removeAllElements(_subViewMountPoint);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.setSubViewMountPoint = setSubViewMountPoint;
    exports.template = getTemplate;
    exports.mapView = mapView;
    exports.showView = showView;

  });;define('APP.View',
  function (require, module, exports) {

    var _self,
      _appContainerEl,
      _appEl,
      _mainHeaderEl,
      _mainFooterEl,
      _eventDispatcher = APP.eventDispatcher(),
      _appEvents = require('APP.AppEvents'),
      _browserEventView = require('APP.View.MixinBrowserEvents'),
      _routeSubViewView = require('APP.View.MixinRouteViews'),
      _multiDeviceView = require('APP.View.MixinMultiDeviceView'),
      _notificationView = require('nudoru.components.ToastView'),
      _messageBoxView = require('nudoru.components.MessageBoxView'),
      _modalCoverView = require('nudoru.components.ModalCoverView');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;

      _eventDispatcher.publish(_appEvents.VIEW_INITIALIZED);

      render();
    }

    function render() {
      _appContainerEl = document.getElementById('app__container');
      _appEl = document.getElementById('app__contents');
      _mainHeaderEl = document.getElementById('header');
      _mainFooterEl = document.getElementById('footer');

      _browserEventView.setMainScrollingView('app__contents');
      _browserEventView.initializeEventStreams();
      _browserEventView.setPositionUIElementsOnChangeCB(layoutUI);
      _routeSubViewView.setSubViewMountPoint('contents');
      // TODO - fix from previous refactors _multiDeviceView.initialize();

      _notificationView.initialize('toast__container');
      _messageBoxView.initialize('messagebox__container');
      _modalCoverView.initialize();

      _eventDispatcher.publish(_appEvents.VIEW_RENDERED);
    }

    /**
     * Alter the UI on resize or scroll
     * @param sizeObj Props: width, height
     * @param scrollObj Props: left, top
     */
    function layoutUI(sizeObj, scrollObj) {
      //
    }

    //----------------------------------------------------------------------------
    //  Messaging
    //----------------------------------------------------------------------------

    function addMessageBox(obj) {
      _messageBoxView.add(obj);
    }

    /**
     * Show a popup message box
     * @param message
     */
    function showAlert(message) {
      addMessageBox({
        title: 'Alert',
        content: message,
        type: _messageBoxView.type().DEFAULT,
        modal: false
      });
    }

    function addNotification(obj) {
      _notificationView.add(obj);
    }

    /**
     * Display a notification "toast"
     * @param title The title
     * @param message The message
     */
    function showNotification(message, title, type) {
      addNotification({
        title: title || "Notification",
        type: type || _notificationView.type().DEFAULT,
        message: message
      });
    }

    function removeLoadingMessage() {
      var cover = document.getElementById('initialization__cover'),
        message = document.getElementsByClassName('initialization__message')[0];

      TweenLite.to(cover, 1, {
        alpha: 0, ease: Quad.easeOut, onComplete: function () {
          document.body.removeChild(cover);
        }
      });

      TweenLite.to(message, 2, {
        top: "+=50px", ease: Quad.easeIn, onComplete: function () {
          cover.removeChild(message);
        }
      });
    }

    //----------------------------------------------------------------------------
    //  Composition
    //----------------------------------------------------------------------------

    function mapView(templateID, controller, unique) {
      _routeSubViewView.mapView(templateID, controller, unique);
    }

    function showView(viewObj) {
      _routeSubViewView.showView(viewObj);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.addMessageBox = addMessageBox;
    exports.addNotification = addNotification;
    exports.alert = showAlert;
    exports.notify = showNotification;
    exports.removeLoadingMessage = removeLoadingMessage;
    exports.mapView = mapView;
    exports.showView = showView;

  });;define('APP.AppInitializedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      var _browserEvents = require('nudoru.events.BrowserEvents'),
          _appEvents = require('APP.AppEvents');

      console.log('AppInitializedCommand');

      // Browser events
      APP.mapEventCommand(_browserEvents.BROWSER_RESIZED, 'APP.BrowserResizedCommand');
      APP.mapEventCommand(_browserEvents.BROWSER_SCROLLED, 'APP.BrowserScrolledCommand');

      // App events
      APP.mapEventCommand(_appEvents.CHANGE_ROUTE, 'APP.ChangeRouteCommand');
      APP.mapEventCommand(_appEvents.VIEW_CHANGED, 'APP.ViewChangedCommand');
      APP.mapEventCommand(_appEvents.VIEW_CHANGE_TO_MOBILE, 'APP.ViewChangedToMobileCommand');
      APP.mapEventCommand(_appEvents.VIEW_CHANGE_TO_DESKTOP, 'APP.ViewChangedToDesktopCommand');

      // Map route args:
      // url fragment for route, ID (template id), module name for controller, use singleton module

      // Default route
      APP.mapRouteView('/', 'ControlsTesting', 'APP.View.ControlsTestingSubView', false);

      // Other routes
      APP.mapRouteView('/1', 'TestSubView', 'APP.View.TemplateSubView', false);

      APP.view().removeLoadingMessage();

      APP.router().runCurrentRoute();
    };

  });;define('APP.BrowserResizedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('BrowserResizedCommand: '+data.width + 'w, ' + data.height + 'h');
    };

  });;define('APP.BrowserScrolledCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('BrowserScrolledCommand: '+data.left + 'l, ' + data.top + 't');
    };

  });;define('APP.ChangeRouteCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ChangeRouteCommand, route: '+data.route);
      APP.router().setRoute(data.route);
    };

  });;define('APP.ModelDataWaitingCommand',
  function (require, module, exports) {

    /**
     * Should inject some real data here
     * @param data
     */
    exports.execute = function(data) {
      console.log('ModelDataWaitingCommand, injecting data');

      APP.model().setData({});
    };

  });;define('APP.RouteChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('RouteChangedCommand, route: '+data.route+', templateID: '+data.templateID);
      APP.view().showView(data);
    };

  });;define('APP.ViewChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedCommand: '+data);
    };

  });;define('APP.ViewChangedToDesktopCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedToDesktopCommand: '+data);
    };

  });;define('APP.ViewChangedToMobileCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedToMobileCommand: '+data);
    };

  });;(function () {

  var _browserInfo = require('nudoru.utils.BrowserInfo'),
      _model = require('APP.Model'),
      _view = require('APP.View');

  window.onload = APP.initialize(_model, _view);

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

}());