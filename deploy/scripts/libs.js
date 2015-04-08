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

  // extend and deep extend from http://youmightnotneedjquery.com/
  extend: function(out) {
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
  },

  deepExtend: function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (!obj) {
        continue;
      }

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            deepExtend(out[key], obj[key]);
          } else {
            out[key] = obj[key];
          }
        }
      }
    }

    return out;
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

};;var DOMUtils = {

  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  // element must be entirely on screen
  isElementEntirelyInViewport: function (el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
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

  position: function(el) {
    return {
      left: el.offsetLeft,
      top: el.offsetTop
    };
  },

  // from http://jsperf.com/jquery-offset-vs-offsetparent-loop
  offset: function(el) {
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
  },

  //http://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
  HTMLStrToNode: function (str) {
    var temp = document.createElement('div');
    temp.innerHTML = str;
    return temp.firstChild;
  },

  wrapElement: function(wrapperStr, el) {
    var wrapperEl = DOMUtils.HTMLStrToNode(wrapperStr),
        elParent = el.parentNode;
    wrapperEl.appendChild(el);
    elParent.appendChild(wrapperEl);
    return wrapperEl;
  },

  // http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
  closest: function(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.bind(el)(selector)) {
        return el;
      } else {
        el = el.parentElement;
      }
    }
    return false;
  },

  // from youmightnotneedjquery.com
  hasClass: function(el, className) {
    if (el.classList) {
      el.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  },

  addClass: function(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  },

  removeClass: function(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  },

  toggleClass: function(el, className) {
    if(this.hasClass(el, className)) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
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
  },

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

};;var NTemplate = (function() {

  var _templateHTMLCache = {},
      _templateCache = {};

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
    return DOMUtils.HTMLStrToNode(asHTML(id, obj));
  }

  /**
   * Cleans template HTML
   */
  function cleanTemplateHTML(str) {
    //replace(/(\r\n|\n|\r|\t)/gm,'').replace(/>\s+</g,'><').
    return str.trim();
  }

  /**
   * Public API
   */
  return {
    getSource: getSource,
    getTemplate: getTemplate,
    asHTML: asHTML,
    asElement: asElement
  };

}());
;var APP = APP || {};

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
        ) !== null;
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
    return ObjectUtils.extend({}, _globals);
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
    return ObjectUtils.extend({}, items[0]);
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
      _headerMenuView,
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
    defineViewElements();

    setCurrentViewPortSize();
    setCurrentViewPortScroll();


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
    var apptitle = _mainHeaderEl.querySelector('h1');
    apptitle.innerHTML = _appGlobals.appConfig.title;

    document.title = StringUtils.removeTags(_appGlobals.appConfig.title);
  }

  function defineViewElements() {
    // ui parts
    _appContainerEl = document.getElementById('app__container');
    _appEl = document.getElementById('app__contents');

    // listen for scroll on the app container not window or body
    _mainScrollEl = _appEl;
    _drawerEl = document.getElementById('drawer');
    _drawerToggleButtonEl = document.querySelector('.header__drawer-toggle > button');

    _mainHeaderEl = document.getElementById('header');
    _mainFooterEl = document.getElementById('footer');

    // item grid header
    _mainSearchInputEl = document.querySelector('.grid__header-search > input');
    _searchHeaderEl = document.querySelector('.grid__header > h1');
    _clearAllButtonEl = document.getElementById('clearall-button');
  }

  function initializeComponents() {
    _toastView = _self.ToastView;
    _toastView.initialize('toast__container');

    _modalCoverView = _self.ModalCoverView;
    _modalCoverView.initialize();

    // init on these called later
    _headerMenuView = ObjectUtils.basicFactory(APP.AppView.DDMenuBarView); //_self.DDMenuBarView;
    _drawerMenuView = ObjectUtils.basicFactory(APP.AppView.DDMenuBarView);
    _itemGridView = _self.ItemGridView;

    _itemDetailView = _self.ItemDetailView;
    _itemDetailView.initialize('details');

    _tagBarView = _self.TagBarView;
    _tagBarView.initialize('tagbar__container');

    TweenLite.to(_drawerEl, 0, {x:_drawerWidth*-1});
  }

  function configureUIEvents() {
    _eventDispatcher.subscribe(APP.Events.MODAL_COVER_HIDE, hideModalContent);
    //_eventDispatcher.subscribe(APP.Events.GRID_VIEW_LAYOUT_COMPLETE, onGridViewLayoutComplete);
  }

  function configureUIStreams() {
    var uiresizestream = Rx.Observable.fromEvent(window, 'resize'),
        uiscrollscream = Rx.Observable.fromEvent(_mainScrollEl, 'scroll');

    _uiUpdateLayoutStream = Rx.Observable.merge(uiresizestream, uiscrollscream)
      .subscribe(function() {
        positionUIElementsOnChange();
      });

    _browserResizeStream = Rx.Observable.fromEvent(window, 'resize')
      .throttle(100)
      .subscribe(function() {
        handleViewPortResize();
      });

    _browserScrollStream = Rx.Observable.fromEvent(_mainScrollEl, 'scroll')
      .throttle(100)
      .subscribe(function() {
        handleViewPortScroll();
      });

    _searchInputStream = Rx.Observable.fromEvent(_mainSearchInputEl, 'keyup')
      .throttle(150)
      .map(function (evt) { return evt.target.value; })
      .subscribe(function (value) {
        _eventDispatcher.publish(APP.Events.SEARCH_INPUT, value);
      });

    _clearAllButtonStream = Rx.Observable.fromEvent(_clearAllButtonEl, _appGlobals.mouseClickEvtStr)
      .subscribe(function() {
        _eventDispatcher.publish(APP.Events.VIEW_ALL_FILTERS_CLEARED);
      });

    _drawerToggleButtonStream = Rx.Observable.fromEvent(_drawerToggleButtonEl, _appGlobals.mouseClickEvtStr)
      .subscribe(function() {
        toggleDrawer();
      });

  }

  function handleViewPortResize() {
    checkForMobile();
    _eventDispatcher.publish(APP.Events.BROWSER_RESIZED, _currentViewPortSize);
  }

  function handleViewPortScroll() {
    //disablePointerEventsOnScroll();
    _eventDispatcher.publish(APP.Events.BROWSER_SCROLLED, _currentViewPortScroll);
  }

  // http://www.thecssninja.com/css/pointer-events-60fps
  //function disablePointerEventsOnScroll() {
  //  if(_disablePointerEventsOnScrollTimerStream) {
  //    _disablePointerEventsOnScrollTimerStream.dispose();
  //  }
  //
  //  DOMUtils.addClass(document.body, 'ignore-pointer-events');
  //
  //  _disablePointerEventsOnScrollTimerStream = Rx.Observable.timer(250)
  //    .pluck('interval')
  //    .take(1)
  //    .subscribe(function() {
  //      DOMUtils.removeClass(document.body, 'ignore-pointer-events');
  //    });
  //}

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
    _currentViewPortSize = {width: window.innerWidth, height: window.innerHeight};
  }

  /**
   * Cache the current view port scroll in a var
   */
  function setCurrentViewPortScroll() {
    var left = _mainScrollEl.scrollLeft,
        top = _mainScrollEl.scrollTop;

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

    positionUIElements();

    //startIsScrollingTimer();
    //hideElementsOnScrollStart();
  }

  /**
   * Position UI elements that are dependant on the view port
   */
  function positionUIElements() {
    //TweenLite.to(_mainHeaderEl, 0, {top: _currentViewPortScroll.top});
    //TweenLite.to(_mainFooterEl, 0, {top: _currentViewPortSize.height + _currentViewPortScroll.top - _mainFooterEl.clientHeight});

    _mainHeaderEl.style.top = _currentViewPortScroll.top+'px';
    _mainFooterEl.style.top = (_currentViewPortSize.height + _currentViewPortScroll.top - _mainFooterEl.clientHeight) + 'px';

  }

  /**
   * Update on filters changed
   */
  function updateUIOnFilterChanges() {
    TweenLite.to(_mainScrollEl, 1, {scrollTop: 0, ease: Quad.easeIn});
  }

  /**
   * Start a timer monitor when scrolling stops
   */
  //function startIsScrollingTimer() {
  //  if(_isScrollingTimerStream) {
  //    _isScrollingTimerStream.dispose();
  //  }
  //
  //  _isScrollingTimerStream = Rx.Observable.timer(500)
  //    .pluck('interval')
  //    .take(1)
  //    .subscribe(showElementsOnScrollEnd);
  //}


  /**
   * Hide UI elements
   */
  //function hideElementsOnScrollStart() {
  //  TweenLite.to(_mainHeaderEl, 0, {autoAlpha: 0, ease:Circ.easeOut});
  //  TweenLite.to(_mainFooterEl, 0, {autoAlpha: 0, ease:Circ.easeOut});
  //}

  /**
   * Show UI elements
   */
  //function showElementsOnScrollEnd() {
  //  positionUIElements();
  //
  //  TweenLite.to(_mainHeaderEl, 0.1, {autoAlpha: 1, ease:Circ.easeOut});
  //  TweenLite.to(_mainFooterEl, 0.1, {autoAlpha: 1, ease:Circ.easeOut});
  //}

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
    TweenLite.to(_drawerEl, 0.5, {x:0, ease:Quad.easeOut});
    TweenLite.to(_appEl, 0.5, {x: _drawerWidth, ease:Quad.easeOut});
  }

  function closeDrawer() {
    _isDrawerOpen = false;
    TweenLite.to(_drawerEl, 0.5, {x:_drawerWidth*-1, ease:Quad.easeOut});
    TweenLite.to(_appEl, 0.5, {x: 0, ease:Quad.easeOut});
  }

  //----------------------------------------------------------------------------
  //  Menus
  //----------------------------------------------------------------------------

  function initializeMenus(data) {
    _headerMenuView.initialize('header__navigation', data);
    _drawerMenuView.initialize('drawer__navigation', data, true);
  }

  function updateMenuSelections(data) {
    updateHeaderMenuSelections(data);
    updateDrawerMenuSelections(data);
  }

  function updateHeaderMenuSelections(data) {
    _headerMenuView.setMenuSelections(data);
  }

  function updateDrawerMenuSelections(data) {
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
    _itemGridView.initialize('grid__item-container', data);
  }

  //function onGridViewLayoutComplete() {
  //  console.log('gridview layout complete');
  //}

  function  updateGridItemVisibility(data) {
    _itemGridView.updateItemVisibility(data);
  }

  /**
   * Set the item grid search header
   * @param message
   */
  function updateSearchHeader(message) {
    _searchHeaderEl.innerHTML = message;
  }

  function clearAllFilters() {
    clearFreeTextFilter();
    _headerMenuView.resetAllSelections();
    _drawerMenuView.resetAllSelections();
    _tagBarView.update([]);
    showAllGridViewItems();
  }

  function clearFreeTextFilter() {
    _mainSearchInputEl.value = '';
  }

  function setFreeTextFilterValue(str) {
    _mainSearchInputEl.value = str;
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
    var cover = document.getElementById('initialization__cover'),
        message = document.getElementsByClassName('initialization__message')[0];

    TweenLite.to(cover, 1, {alpha: 0, ease: Quad.easeOut, onComplete: function() {
      document.body.removeChild(cover);
    }});

    TweenLite.to(message, 2, {top:"+=50px", ease: Quad.easeIn, onComplete: function() {
      cover.removeChild(message);
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
    updateHeaderMenuSelections: updateHeaderMenuSelections,
    updateDrawerMenuSelections: updateDrawerMenuSelections,
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

    _modalCoverEl = document.getElementById('modal__cover');
    _modalBackgroundEl = document.querySelector('.modal__background');
    _modalCloseButtonEl = document.querySelector('.modal__close-button');

    var modalBGClick = Rx.Observable.fromEvent(_modalBackgroundEl, appGlobals.mouseClickEvtStr),
      modalButtonClick = Rx.Observable.fromEvent(_modalCloseButtonEl, appGlobals.mouseClickEvtStr);

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
    TweenLite.to(_modalCoverEl, duration, {autoAlpha: 1, ease:Quad.easeOut});
    TweenLite.to(_modalCloseButtonEl, duration*2, {autoAlpha: 1, top: 22, ease:Back.easeOut, delay: 2});

    _eventDispatcher.publish(APP.Events.MODAL_COVER_SHOW);
  }

  function hide(animate) {
    if(!_isVisible) {
      return;
    }
    _isVisible = false;
    var duration = animate ? 0.25 : 0;
    TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
    TweenLite.to(_modalCoverEl, duration, {autoAlpha: 0, ease:Quad.easeOut});
    TweenLite.to(_modalCloseButtonEl, duration/2, {autoAlpha: 0, top: -50, ease:Quad.easeOut});

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
    _containerEl = document.getElementById(elID);
  }

  function add(title, message, button) {
    button = button || 'OK';
    var newToast = createToastObject(title, message, button);

    _containerEl.insertBefore(newToast.element, _containerEl.firstChild);
    newToast.index = _children.length;
    newToast.height = newToast.element.clientHeight;

    var closeBtn = newToast.element.querySelector('.toast__item-controls > button'),
        closeBtnSteam = Rx.Observable.fromEvent(closeBtn, 'click'),
        expireTimeStream = Rx.Observable.interval(_defaultExpireDuration);

    newToast.lifeTimeStream = Rx.Observable.merge(closeBtnSteam, expireTimeStream).take(1)
      .subscribe(function() {
        remove(newToast.id);
      });

    _children.push(newToast);

    transitionIn(newToast.element);

    return newToast.id;
  }

  function createToastObject(title,message,button) {
    var id = 'toast' + (_counter++).toString(),
        obj = {
          id: id,
          index: -1,
          title: title,
          message: message,
          buttonLabel: button,
          status: 'new',
          html: _templateToast({id: id, title: title, message: message}),
          element: null,
          height: 0,
          lifeTimeStream: null
        };

    obj.element = DOMUtils.HTMLStrToNode(obj.html);
    return obj;
  }

  function transitionIn(el) {
    TweenLite.to(el,0,{alpha: 0});
    TweenLite.to(el,1, {alpha: 1, ease: Quad.easeOut});
    rearrangeToasts();
  }

  function transitionOut(el) {
    TweenLite.to(el, 0.25, {left: '+=300', ease: Quad.easeIn, onComplete: function() {
      onTransitionOutComplete(el);
    }});
  }

  function onTransitionOutComplete(el) {
    var toastIdx = getToastIndexByID(el.getAttribute('id')),
      toast = _children[toastIdx];

    _containerEl.removeChild(el);

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
      TweenLite.to(current.element, 0.75, {y: y, ease: Bounce.easeOut});
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

      this.containerEl = document.getElementById(elID);
      this.data = data;

      this.isKeepOpen = keep ? true : false;

      this.render();
    },

    render: function() {
      var i = 0,
          len = this.data.length;

      this.children = [];

      this.barEl = DOMUtils.HTMLStrToNode('<ul></ul>');
      for(; i<len; i++) {
        var menuobj = ObjectUtils.basicFactory(APP.AppView.DDMenuBarView.DDMenuView);
        menuobj.initialize(this.data[i], this.isKeepOpen);
        this.barEl.appendChild(menuobj.element);
        this.children.push(menuobj);
      }

      this.containerEl.insertBefore(this.barEl, this.containerEl.firstChild);

      // hack to prevent clicking on menuItems from selecting text on ie since CSS isn't supported
      if(APP.globals().isIE) {
        this.containerEl.onselectstart = function() {
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
      this.element = NTemplate.asElement('template__menu-header', this.data);
      this.ddMenuEl = this.element.querySelector('ul');
      this.anchorElement = this.element.querySelector('button');

      this.data.items.forEach(this.buildMenuItems.bind(this));  // ensure proper scope!

      this.fadeOutComplete = true;

      if(this.isKeepOpen) {
        this.visible = true;
      } else {
        this.visible = false;
        this.ddMenuEl.style.height = '0px';
        TweenLite.to(this.ddMenuEl, 0, {autoAlpha: 0});
      }
    },

    buildMenuItems: function(item) {
      var menuitem = ObjectUtils.basicFactory(APP.AppView.BasicMenuItemView);
      menuitem.initialize(item);
      this.ddMenuEl.appendChild(menuitem.element);
      this.items.push(menuitem);
    },

    configureStreams: function() {
      this.menuOverStream = Rx.Observable.fromEvent(this.element, 'mouseover')
        .filter(this.filterForMouseEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(this.handleMenuOver.bind(this));

      this.menuOutStream = Rx.Observable.fromEvent(this.element, 'mouseout')
        .filter(this.filterForMouseEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(this.handleMenuOut.bind(this));

      this.menuClickStream = Rx.Observable.fromEvent(this.element, 'click')
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
      var el = this.getTargetElMatching(target, '.js__menu-item');
      if(el){
        return el.tagName.toLowerCase() === 'button';
      }
      return false;
    },

    getMouseEventTargetValue: function(evt) {
      var target = this.getTargetElMatching(evt.target, '.js__menu-item');
      return target.getAttribute('data-value');
    },

    getTargetElMatching: function(el, cls) {
      return DOMUtils.closest(el, cls);
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
      this.element.addEventListener('touchstart', (function(evt) {
        this.firstTouchPosition = this.lastTouchPosition = TouchUtils.getCoords(evt);
        this.shouldProcessTouchEnd = false;
      }).bind(this), false);

      this.element.addEventListener('touchmove', (function(evt) {
        this.lastTouchPosition = TouchUtils.getCoords(evt);
      }).bind(this), false);

      var touchPressFunction = function(arg) {
        if(this.shouldProcessTouchEnd) {
          this.handleMenuClick(arg);
        }
      };

      this.menuClickStream = Rx.Observable.fromEvent(this.element, 'touchend')
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
        // Toggle visibility on mobile/tablet
        if(this.appGlobals.mobile.any()) {
          this.toggleMenu();
        }
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

    toggleMenu: function() {
      if(this.isKeepOpen) {
        return;
      }

      if(this.visible) {
        this.close();
      } else {
        this.open();
      }
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

      this.ddMenuEl.style.height = 'auto';

      TweenLite.killTweensOf(this.anchorElement);
      TweenLite.killTweensOf(this.ddMenuEl);

      TweenLite.to(this.anchorElement, 0.25, {paddingTop:'5px', ease:Circ.easeOut});
      TweenLite.to(this.ddMenuEl, 0.25, {autoAlpha: 1, top:'0', ease:Circ.easeOut});
    },

    close: function() {
      if(!this.visible || this.element === undefined || this.isKeepOpen) {
        return;
      }
      this.visible = false;

      this.fadeOutComplete = false;

      var closeCompleteFunc = this.closeComplete.bind(this);

      TweenLite.to(this.anchorElement, 0.25, {paddingTop:'0px', ease:Circ.easeIn, delay:0.1});
      TweenLite.to(this.ddMenuEl,0.1, {autoAlpha: 0, ease:Circ.easeIn, onComplete: closeCompleteFunc, delay:0.1});
    },

    closeComplete: function() {
      this.ddMenuEl.style.height = '0px';
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
    element: null,
    iconElement: null,
    anchorElement: null,
    labelOverStream: null,
    labelOutStream: null,
    labelSelectStream: null,
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

      this.render();

      this.selected = false;
    },

    render: function() {
      if(this.toggle) {
        this.element = NTemplate.asElement('template__menu-item-icon', this.data);
      } else {
        this.element = NTemplate.asElement('template__menu-item', this.data);
      }

      this.iconElement = this.element.querySelector('i');
      this.anchorElement = this.element.querySelector('button');
    },

    select: function() {
      if(this.selected || this.element === undefined) {
        return;
      }
      this.selected = true;

      if(this.toggle) {
        DOMUtils.removeClass(this.iconElement, this.iconDeselectedClass);
        DOMUtils.addClass(this.iconElement, this.iconSelectedClass);
      }
    },

    showOverEffect: function() {
      TweenLite.to(this.element, 0.1, {backgroundColor:'rgba(255,255,255,.25)', ease:Circ.easeOut});
    },

    showOutEffect: function() {
      TweenLite.to(this.element, 0.25, {backgroundColor:'rgba(255,255,255,0)', ease:Circ.easeIn});
    },

    showDepressEffect: function() {
      var tl = new TimelineLite();
      tl.to(this.element,0.1, {scale:0.9, ease: Quad.easeOut});
      tl.to(this.element,0.5, {scale:1, ease: Elastic.easeOut});
    },

    deselect: function() {
      if(!this.selected || this.element === undefined) {
        return;
      }
      this.selected = false;

      if(this.toggle) {
        DOMUtils.removeClass(this.iconElement, this.iconSelectedClass);
        DOMUtils.addClass(this.iconElement, this.iconDeselectedClass);
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
    _containerEl = document.getElementById(_containerElID);
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
      _containerEl.appendChild(itemobj.element);
      itemobj.postRender();
      _children.push(itemobj);
    });

    // hack to prevent clicking on menuItems from selecting text on ie since CSS isn't supported
    if(APP.globals().isIE) {
      _containerEl.onselectstart = function() {
        return false;
      };
    }

    initPackery();

    staggerFrom(getItemsInView(), 0.5, {alpha: 0, ease:Quad.easeOut}, 0.15);
  }

  function staggerFrom(elList, dur, props, interval) {
    var i= 0,len=elList.length;
    for(;i<len;i++) {
      props.delay = (i+1) * interval;
      TweenLite.from(elList[i], dur, props);
    }
  }

  /**
   * Images loaded control - not used yet
   * http://imagesloaded.desandro.com/
   */
  //function initImagesLoaded() {
  //  _imagesLoaded = imagesLoaded(_containerElID, function(instance) {
  //    console.log('[ItemGridView] All images loaded');
  //  });
  //
  //  _imagesLoaded.on('fail', function(instance) {
  //    console.log('[ItemGridView] All images loaded, with errors');
  //    _eventDispatcher.publish(APP.Events.GRID_VIEW_IMAGE_LOAD_ERROR);
  //  });
  //}

  /**
   * Init Packery view for the grid
   */
  function initPackery() {
    var packeryGutter = _appGlobals.mobile.any() ? 10 : 33,
        packeryTransDuration = _appGlobals.mobile.any() ? '0.5s' : '0.75s';

    _packery = new Packery('#'+_containerElID, {
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
    return item.element;
    //return item.element[0];
  }

  /**
   * Users RxJS streams rather than typical JS events. Allows for better
   * sorting and readability
   */
  function configureStreams() {

    _itemOverStream = Rx.Observable.fromEvent(_containerEl, 'mouseover')
      .filter(filterForMouseEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function (id) {
        selectItemByID(id);
      });

    _itemOutStream = Rx.Observable.fromEvent(_containerEl, 'mouseout')
      .filter(filterForMouseEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function (id) {
        deselectItemByID(id);
      });

    _itemSelectStream = Rx.Observable.fromEvent(_containerEl, 'click')
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
    return DOMUtils.closest(el, cls);
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
    _containerEl.addEventListener('touchstart', function(evt) {
      _firstTouchPosition = _lastTouchPosition = TouchUtils.getCoords(evt);
      _shouldProcessTouchEnd = false;
    }, false);

    _containerEl.addEventListener('touchmove', function(evt) {
      _lastTouchPosition = TouchUtils.getCoords(evt);
    }, false);

    _itemSelectStream = Rx.Observable.fromEvent(_containerEl, 'touchend')
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
    element.style.zIndex = ++_highestZ;
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
    TweenLite.killDelayedCallsTo(otheritems);
    TweenLite.to(otheritems, 5, {scale:0.9, alpha:0.25, ease:Quad.easeIn, delay: 1});
  }

  // TODO merge this with unfade
  function resetOtherItems(itemel) {
    if(_isLayingOut) {
      return;
    }

    var otheritems = getItemsInViewExcluding(itemel);
    TweenLite.killDelayedCallsTo(otheritems);
    TweenLite.to(otheritems, 0.25, {scale:1, alpha:1, ease:Quad.easeOut, onComplete: fadeOtherItems, onCompleteParams: [itemel]});
  }

  function unfadeOtherItems(itemel) {
    if(_isLayingOut) {
      return;
    }

    var otheritems = getItemsInViewExcluding(itemel);
    TweenLite.killDelayedCallsTo(otheritems);
    TweenLite.to(otheritems, 0.25, {scale:1, alpha:1, ease:Quad.easeOut});
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
      // Cache template
      this.template = NTemplate.getTemplate('template__item-tile');
      this.render();
    },

    render: function() {
      this.element = DOMUtils.HTMLStrToNode(this.template(this.data));
      this.elementContent = this.element.querySelector('.item__content');
      this.dataEl = this.element.querySelector('.item__data');
      this.imageEl = this.element.querySelector('.item__image-wrapper');
    },

    /**
     * Calculations needed after the items is added to the container is on the DOM
     */
    postRender: function() {
      this.imageAlphaTarget = window.getComputedStyle(this.imageEl,null).getPropertyValue('opacity');
    },

    isInViewport: function() {
      return DOMUtils.isElementInViewport(this.element);
    },

    show: function() {
      if(this.visible || this.element === undefined) {
        return;
      }
      this.visible = true;

      if(this.isInViewport()) {
        TweenLite.to(this.element, 0.25, { autoAlpha: 1, scale:1, ease: Circ.easeOut});
      } else {
        TweenLite.to(this.element, 0, { autoAlpha: 1, scale: 1});
      }
    },

    hide: function() {
      if(!this.visible || this.element === undefined) {
        return;
      }
      this.visible = false;

      if(this.isInViewport()) {
        TweenLite.to(this.element, 1, {autoAlpha: 0, scale:0.25, ease: Expo.easeOut, onComplete:this.resetHiddenItemSize.bind(this)});
      } else {
        TweenLite.to(this.element, 0, {autoAlpha: 0, scale:0.25, onComplete:this.resetHiddenItemSize.bind(this)});
      }

    },

    /**
     * Resetting the elements size prevents odd packery behavior as it tries to fit resizing items
     */
    resetHiddenItemSize: function() {
      TweenLite.to(this.element, 0, { scale: 1});
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
      TweenLite.to(this.element,0.25, {scale: 1.05, ease:Back.easeOut});
      TweenLite.to(this.imageEl, 1, {alpha: 1, scale: 1.25, ease:Circ.easeOut});
    },

    /**
     * On item click / tap
     */
    depress: function() {
      if(this.element === undefined || !this.visible) {
        return;
      }

      var tl = new TimelineLite();
      tl.to(this.element,0.1, {scale:0.8, ease: Quad.easeOut});
      tl.to(this.element,0.5, {scale:1, ease: Elastic.easeOut});

      TweenLite.to(this.imageEl,0.5, {alpha:this.imageAlphaTarget, scale: 1, ease:Circ.easeOut});
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
      TweenLite.to(this.element,0.5, {scale: 1, ease:Back.easeOut});
      TweenLite.to(this.imageEl,0.5, {alpha:this.imageAlphaTarget, scale: 1, ease:Circ.easeOut});
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
      _floatImageView,
      _shareButtonEl,
      _currentItem;

  function initialize(elID) {
    _containerEl = document.getElementById(elID);

    _floatImageView = APP.AppView.FloatImageView;
    _floatImageView.initialize();
  }

  function showItem(item) {
    _currentItem = item;

    _containerEl.innerHTML = NTemplate.asHTML('template__detail-item', _currentItem);

    _floatImageView.apply(_containerEl.querySelector('.details__content-preview-images'));

    _shareButtonEl = document.getElementById('js__content-share-button');

    if(!APP.globals().mobile.any()) {
      _shareButtonEl.addEventListener(APP.globals().mouseClickEvtStr, doShareAction, false);
    } else {
      _shareButtonEl.style.display = 'none';
    }

    TweenLite.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
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
    _containerEl.innerHTML = NTemplate.asHTML('template__detail-message', obj);

    TweenLite.to(_containerEl, 0.25, {autoAlpha: 1, ease:Quad.easeOut, delay:0.1});
  }

  function hide() {
    _currentItem = null;

    _floatImageView.remove(_containerEl.querySelector('.details__content-preview-images'));

    if(_shareButtonEl) {
      _shareButtonEl.removeEventListener(APP.globals().mouseClickEvtStr, doShareAction);
    }

    TweenLite.killDelayedCallsTo(_containerEl);
    TweenLite.to(_containerEl, 0.25, {autoAlpha: 0, ease:Quad.easeOut, delay:0.1});
  }

  return {
    initialize: initialize,
    showItem: showItem,
    showMessage: showMessage,
    hide: hide
  };

}());;APP.createNameSpace('APP.AppView.FloatImageView');
APP.AppView.FloatImageView = (function() {

  var _coverDivID = 'floatimage__cover',
      _floatingImageClass = '.floatimage__srcimage',
      _zoomedImageClass = 'floatimage__zoomedimage',
      _viewPortCoverEl,
      _viewPortCoverClickStream,
      _captionEl,
      _currentImageElement;

  /**
   * Entry point, initialize elements and hide cover
   */
  function initialize() {
    _viewPortCoverEl = document.getElementById(_coverDivID);

    _captionEl = _viewPortCoverEl.querySelector('.floatimage__caption');

    hideFloatImageCover();

    _viewPortCoverClickStream = Rx.Observable.fromEvent(_viewPortCoverEl, APP.globals().mouseClickEvtStr)
      .subscribe(function() {
        hideFloatImageCover();
      });
  }

  /**
   * Apply functionality to div/container of div>img 's
   * @param container
   */
  function apply(container) {
    getFloatingElementsInContainerAsArray(container).forEach(function(el) {

      //var elParent = el.parentNode;
      //elParent.
      DOMUtils.wrapElement('<div class="floatimage__wrapper" />', el);

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
        imgPosition = DOMUtils.offset(_currentImageElement),
        imgRatio = imgWidth/imgHeight,
        imgTargetScale = 1,
        vpWidth = window.innerWidth,
        vpHeight = window.innerHeight,
        vpScrollTop = document.body.scrollTop,
        vpScrollLeft = document.body.scrollLeft,
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

    var zoomImage = DOMUtils.HTMLStrToNode('<div class="'+_zoomedImageClass+'"></div>');

    zoomImage.style.backgroundImage = 'url("'+imgSrc+'")';
    zoomImage.style.left = imgOriginX+'px';
    zoomImage.style.top = imgOriginY+'px';
    zoomImage.style.width = imgWidth+'px';
    zoomImage.style.height = imgHeight+'px';

    _viewPortCoverEl.appendChild(zoomImage);

    // Animate
    TweenLite.to(_currentImageElement, 0.25, {alpha:0, ease:Circ.easeOut});
    TweenLite.to(zoomImage, 0.5, {width: imgTargetWidth, height: imgTargetHeight, x: imgTargetX, y: imgTargetY, ease:Circ.easeOut});
    showFloatImageCover();

    // Caption
    if(imgAlt.length >= 1) {
      _captionEl.innerHTML = '<p>'+imgAlt+'</p>';
    } else {
      _captionEl.innerHTML = '';
    }

  }

  /**
   * Remove functionality to div/container of div>img 's
   * @param container
   */
  function remove(container) {
    if(!container) {
      return;
    }

    getFloatingElementsInContainerAsArray(container).forEach(function(el) {
      el.removeEventListener('click', onImageClick);
    });
  }

  /**
   * Get an array of elements in the container returned as Array instead of a Node list
   * @param container
   * @returns {*}
   */
  function getFloatingElementsInContainerAsArray(container) {
    if(!DOMUtils.isDomObj(container)) {
      return [];
    }
    return Array.prototype.slice.call(container.querySelectorAll(_floatingImageClass));
  }

  /**
   * Show the div covering the UI
   */
  function showFloatImageCover() {
    TweenLite.to(_viewPortCoverEl,0.25, {autoAlpha: 1, ease:Circ.easeOut});
  }

  /**
   * Hide the div covering the UI
   */
  function hideFloatImageCover() {
    if(_currentImageElement) {
      TweenLite.to(_currentImageElement, 0.1, {alpha:1, ease:Circ.easeOut});
      _currentImageElement = null;
    }

    TweenLite.to(_viewPortCoverEl,0.25, {autoAlpha: 0, ease:Circ.easeOut, onComplete:hideFloatImageCoverComplete});
  }

  /**
   * The enlarged image is present during the cover fade out, remove it when that's completed
   */
  function hideFloatImageCoverComplete() {
    var zoomedImage = _viewPortCoverEl.querySelector('.'+_zoomedImageClass);
    if(zoomedImage) {
      _viewPortCoverEl.removeChild(zoomedImage);
    }
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
      _currentTags;

  function initialize(elID) {
    _containerEl = document.getElementById(elID);
    _currentTags = [];

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
    TweenLite.to(_containerEl, 0.25, {autoAlpha: 1, ease: Circ.easeIn});
  }

  function hideBar() {
    TweenLite.to(_containerEl, 0.25, {autoAlpha: 0, ease: Circ.easeIn});
  }

  function add(tag) {
    var tagnode = NTemplate.asElement('template__tag', {tag: tag});
    _containerEl.appendChild(tagnode);
    _currentTags.push({label: tag, el: tagnode});
    TweenLite.from(tagnode,0.5,{alpha:0, y:'15px', ease:Quad.easeOut});
  }

  function remove(tag) {
    var rmv = _currentTags.filter(function(tagobj) {
      if(tagobj.label === tag) {
        return true;
      }
      return false;
    })[0];

    if(rmv) {
      _containerEl.removeChild(rmv.el);
      _currentTags.splice(_currentTags.indexOf(rmv),1);
    }
  }

  function removeAll() {
    _currentTags.forEach(function(tag) {
      _containerEl.removeChild(tag.el);
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

    _eventDispatcher.publish(APP.Events.URL_HASH_CHANGED, hash);
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
  var _appGlobals = APP.globals();


  this.appController.postIntialize();


  this.appView.removeLoadingMessage();

  this.appView.initializeMenus(this.appModel.getMenuData());
  this.appView.initializeGridView(this.appModel.getData());

  var initialRoute = APP.AppController.Router.getRoute();

  //console.log('Initial route: '+initialRoute);

  if (initialRoute.length > 0) {
    this.appModel.parseFiltersFromUrl(initialRoute);
  } else {
    if(_appGlobals.appConfig.welcome.enabled === 'true') {
      this.appView.showBigMessage(_appGlobals.appConfig.welcome.title, _appGlobals.appConfig.welcome.text);
    }
  }

  //console.log('Doing Perf ...');
  //var iterations = 10000;
  //var testObj = this.appModel.getData()[0];
  //console.time('Method');
  //for(var i = 0; i < iterations; i++) {
  //  NTemplate.asElement('template__item-tile', testObj);
  //  //NTemplate.getTemplate('template__item-tile');
  //}
  //console.timeEnd('Method')

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
  //DEBUGGER.log('ViewChangedToDesktopCommand: '+data);

  this.appView.updateHeaderMenuSelections(this.appModel.getFiltersForTagBar());
};;APP.createNameSpace('APP.AppController.ViewChangedToMobileCommand');
APP.AppController.ViewChangedToMobileCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ViewChangedToMobileCommand.execute = function(data) {
  //DEBUGGER.log('ViewChangedToMobileCommand: '+data);

  // Searching isn't support in mobile views yet
  this.appModel.setCurrentFreeTextFilter('');
  this.appView.clearFreeTextFilter();

  this.appView.updateDrawerMenuSelections(this.appModel.getFiltersForTagBar());
};;//------------------------------------------------------------------------------
//  Initialization
//------------------------------------------------------------------------------



(function () {

  APP.initialize();

  if(APP.globals().notSupported) {
    alert("Your browser is not supported! Please use Firefox, Chrome or Safari.");
  }

}());