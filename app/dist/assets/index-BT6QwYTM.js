function J1(l,r){for(var o=0;o<r.length;o++){const c=r[o];if(typeof c!="string"&&!Array.isArray(c)){for(const s in c)if(s!=="default"&&!(s in l)){const f=Object.getOwnPropertyDescriptor(c,s);f&&Object.defineProperty(l,s,f.get?f:{enumerable:!0,get:()=>c[s]})}}}return Object.freeze(Object.defineProperty(l,Symbol.toStringTag,{value:"Module"}))}(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const f of s)if(f.type==="childList")for(const m of f.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function o(s){const f={};return s.integrity&&(f.integrity=s.integrity),s.referrerPolicy&&(f.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?f.credentials="include":s.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function c(s){if(s.ep)return;s.ep=!0;const f=o(s);fetch(s.href,f)}})();function Ap(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var wo={exports:{}},pi={};var Mh;function $1(){if(Mh)return pi;Mh=1;var l=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function o(c,s,f){var m=null;if(f!==void 0&&(m=""+f),s.key!==void 0&&(m=""+s.key),"key"in s){f={};for(var p in s)p!=="key"&&(f[p]=s[p])}else f=s;return s=f.ref,{$$typeof:l,type:c,key:m,ref:s!==void 0?s:null,props:f}}return pi.Fragment=r,pi.jsx=o,pi.jsxs=o,pi}var jh;function W1(){return jh||(jh=1,wo.exports=$1()),wo.exports}var y=W1(),Lo={exports:{}},re={};var zh;function I1(){if(zh)return re;zh=1;var l=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),m=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),b=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),_=Symbol.iterator;function U(T){return T===null||typeof T!="object"?null:(T=_&&T[_]||T["@@iterator"],typeof T=="function"?T:null)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,C={};function H(T,q,X){this.props=T,this.context=q,this.refs=C,this.updater=X||D}H.prototype.isReactComponent={},H.prototype.setState=function(T,q){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,q,"setState")},H.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function V(){}V.prototype=H.prototype;function k(T,q,X){this.props=T,this.context=q,this.refs=C,this.updater=X||D}var G=k.prototype=new V;G.constructor=k,R(G,H.prototype),G.isPureReactComponent=!0;var P=Array.isArray;function te(){}var Z={H:null,A:null,T:null,S:null},F=Object.prototype.hasOwnProperty;function pe(T,q,X){var J=X.ref;return{$$typeof:l,type:T,key:q,ref:J!==void 0?J:null,props:X}}function He(T,q){return pe(T.type,q,T.props)}function Le(T){return typeof T=="object"&&T!==null&&T.$$typeof===l}function Oe(T){var q={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(X){return q[X]})}var rt=/\/+/g;function Ie(T,q){return typeof T=="object"&&T!==null&&T.key!=null?Oe(""+T.key):q.toString(36)}function Ee(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(te,te):(T.status="pending",T.then(function(q){T.status==="pending"&&(T.status="fulfilled",T.value=q)},function(q){T.status==="pending"&&(T.status="rejected",T.reason=q)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function z(T,q,X,J,ie){var oe=typeof T;(oe==="undefined"||oe==="boolean")&&(T=null);var le=!1;if(T===null)le=!0;else switch(oe){case"bigint":case"string":case"number":le=!0;break;case"object":switch(T.$$typeof){case l:case r:le=!0;break;case S:return le=T._init,z(le(T._payload),q,X,J,ie)}}if(le)return ie=ie(T),le=J===""?"."+Ie(T,0):J,P(ie)?(X="",le!=null&&(X=le.replace(rt,"$&/")+"/"),z(ie,q,X,"",function(Zt){return Zt})):ie!=null&&(Le(ie)&&(ie=He(ie,X+(ie.key==null||T&&T.key===ie.key?"":(""+ie.key).replace(rt,"$&/")+"/")+le)),q.push(ie)),1;le=0;var Pe=J===""?".":J+":";if(P(T))for(var Me=0;Me<T.length;Me++)J=T[Me],oe=Pe+Ie(J,Me),le+=z(J,q,X,oe,ie);else if(Me=U(T),typeof Me=="function")for(T=Me.call(T),Me=0;!(J=T.next()).done;)J=J.value,oe=Pe+Ie(J,Me++),le+=z(J,q,X,oe,ie);else if(oe==="object"){if(typeof T.then=="function")return z(Ee(T),q,X,J,ie);throw q=String(T),Error("Objects are not valid as a React child (found: "+(q==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":q)+"). If you meant to render a collection of children, use an array instead.")}return le}function K(T,q,X){if(T==null)return T;var J=[],ie=0;return z(T,J,"","",function(oe){return q.call(X,oe,ie++)}),J}function Y(T){if(T._status===-1){var q=T._result;q=q(),q.then(function(X){(T._status===0||T._status===-1)&&(T._status=1,T._result=X)},function(X){(T._status===0||T._status===-1)&&(T._status=2,T._result=X)}),T._status===-1&&(T._status=0,T._result=q)}if(T._status===1)return T._result.default;throw T._result}var be=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},Se={map:K,forEach:function(T,q,X){K(T,function(){q.apply(this,arguments)},X)},count:function(T){var q=0;return K(T,function(){q++}),q},toArray:function(T){return K(T,function(q){return q})||[]},only:function(T){if(!Le(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return re.Activity=x,re.Children=Se,re.Component=H,re.Fragment=o,re.Profiler=s,re.PureComponent=k,re.StrictMode=c,re.Suspense=b,re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Z,re.__COMPILER_RUNTIME={__proto__:null,c:function(T){return Z.H.useMemoCache(T)}},re.cache=function(T){return function(){return T.apply(null,arguments)}},re.cacheSignal=function(){return null},re.cloneElement=function(T,q,X){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var J=R({},T.props),ie=T.key;if(q!=null)for(oe in q.key!==void 0&&(ie=""+q.key),q)!F.call(q,oe)||oe==="key"||oe==="__self"||oe==="__source"||oe==="ref"&&q.ref===void 0||(J[oe]=q[oe]);var oe=arguments.length-2;if(oe===1)J.children=X;else if(1<oe){for(var le=Array(oe),Pe=0;Pe<oe;Pe++)le[Pe]=arguments[Pe+2];J.children=le}return pe(T.type,ie,J)},re.createContext=function(T){return T={$$typeof:m,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:f,_context:T},T},re.createElement=function(T,q,X){var J,ie={},oe=null;if(q!=null)for(J in q.key!==void 0&&(oe=""+q.key),q)F.call(q,J)&&J!=="key"&&J!=="__self"&&J!=="__source"&&(ie[J]=q[J]);var le=arguments.length-2;if(le===1)ie.children=X;else if(1<le){for(var Pe=Array(le),Me=0;Me<le;Me++)Pe[Me]=arguments[Me+2];ie.children=Pe}if(T&&T.defaultProps)for(J in le=T.defaultProps,le)ie[J]===void 0&&(ie[J]=le[J]);return pe(T,oe,ie)},re.createRef=function(){return{current:null}},re.forwardRef=function(T){return{$$typeof:p,render:T}},re.isValidElement=Le,re.lazy=function(T){return{$$typeof:S,_payload:{_status:-1,_result:T},_init:Y}},re.memo=function(T,q){return{$$typeof:h,type:T,compare:q===void 0?null:q}},re.startTransition=function(T){var q=Z.T,X={};Z.T=X;try{var J=T(),ie=Z.S;ie!==null&&ie(X,J),typeof J=="object"&&J!==null&&typeof J.then=="function"&&J.then(te,be)}catch(oe){be(oe)}finally{q!==null&&X.types!==null&&(q.types=X.types),Z.T=q}},re.unstable_useCacheRefresh=function(){return Z.H.useCacheRefresh()},re.use=function(T){return Z.H.use(T)},re.useActionState=function(T,q,X){return Z.H.useActionState(T,q,X)},re.useCallback=function(T,q){return Z.H.useCallback(T,q)},re.useContext=function(T){return Z.H.useContext(T)},re.useDebugValue=function(){},re.useDeferredValue=function(T,q){return Z.H.useDeferredValue(T,q)},re.useEffect=function(T,q){return Z.H.useEffect(T,q)},re.useEffectEvent=function(T){return Z.H.useEffectEvent(T)},re.useId=function(){return Z.H.useId()},re.useImperativeHandle=function(T,q,X){return Z.H.useImperativeHandle(T,q,X)},re.useInsertionEffect=function(T,q){return Z.H.useInsertionEffect(T,q)},re.useLayoutEffect=function(T,q){return Z.H.useLayoutEffect(T,q)},re.useMemo=function(T,q){return Z.H.useMemo(T,q)},re.useOptimistic=function(T,q){return Z.H.useOptimistic(T,q)},re.useReducer=function(T,q,X){return Z.H.useReducer(T,q,X)},re.useRef=function(T){return Z.H.useRef(T)},re.useState=function(T){return Z.H.useState(T)},re.useSyncExternalStore=function(T,q,X){return Z.H.useSyncExternalStore(T,q,X)},re.useTransition=function(){return Z.H.useTransition()},re.version="19.2.3",re}var wh;function ss(){return wh||(wh=1,Lo.exports=I1()),Lo.exports}var g=ss();const Ht=Ap(g),fs=J1({__proto__:null,default:Ht},[g]);var Uo={exports:{}},gi={},Bo={exports:{}},Ho={};var Lh;function ey(){return Lh||(Lh=1,(function(l){function r(z,K){var Y=z.length;z.push(K);e:for(;0<Y;){var be=Y-1>>>1,Se=z[be];if(0<s(Se,K))z[be]=K,z[Y]=Se,Y=be;else break e}}function o(z){return z.length===0?null:z[0]}function c(z){if(z.length===0)return null;var K=z[0],Y=z.pop();if(Y!==K){z[0]=Y;e:for(var be=0,Se=z.length,T=Se>>>1;be<T;){var q=2*(be+1)-1,X=z[q],J=q+1,ie=z[J];if(0>s(X,Y))J<Se&&0>s(ie,X)?(z[be]=ie,z[J]=Y,be=J):(z[be]=X,z[q]=Y,be=q);else if(J<Se&&0>s(ie,Y))z[be]=ie,z[J]=Y,be=J;else break e}}return K}function s(z,K){var Y=z.sortIndex-K.sortIndex;return Y!==0?Y:z.id-K.id}if(l.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;l.unstable_now=function(){return f.now()}}else{var m=Date,p=m.now();l.unstable_now=function(){return m.now()-p}}var b=[],h=[],S=1,x=null,_=3,U=!1,D=!1,R=!1,C=!1,H=typeof setTimeout=="function"?setTimeout:null,V=typeof clearTimeout=="function"?clearTimeout:null,k=typeof setImmediate<"u"?setImmediate:null;function G(z){for(var K=o(h);K!==null;){if(K.callback===null)c(h);else if(K.startTime<=z)c(h),K.sortIndex=K.expirationTime,r(b,K);else break;K=o(h)}}function P(z){if(R=!1,G(z),!D)if(o(b)!==null)D=!0,te||(te=!0,Oe());else{var K=o(h);K!==null&&Ee(P,K.startTime-z)}}var te=!1,Z=-1,F=5,pe=-1;function He(){return C?!0:!(l.unstable_now()-pe<F)}function Le(){if(C=!1,te){var z=l.unstable_now();pe=z;var K=!0;try{e:{D=!1,R&&(R=!1,V(Z),Z=-1),U=!0;var Y=_;try{t:{for(G(z),x=o(b);x!==null&&!(x.expirationTime>z&&He());){var be=x.callback;if(typeof be=="function"){x.callback=null,_=x.priorityLevel;var Se=be(x.expirationTime<=z);if(z=l.unstable_now(),typeof Se=="function"){x.callback=Se,G(z),K=!0;break t}x===o(b)&&c(b),G(z)}else c(b);x=o(b)}if(x!==null)K=!0;else{var T=o(h);T!==null&&Ee(P,T.startTime-z),K=!1}}break e}finally{x=null,_=Y,U=!1}K=void 0}}finally{K?Oe():te=!1}}}var Oe;if(typeof k=="function")Oe=function(){k(Le)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,Ie=rt.port2;rt.port1.onmessage=Le,Oe=function(){Ie.postMessage(null)}}else Oe=function(){H(Le,0)};function Ee(z,K){Z=H(function(){z(l.unstable_now())},K)}l.unstable_IdlePriority=5,l.unstable_ImmediatePriority=1,l.unstable_LowPriority=4,l.unstable_NormalPriority=3,l.unstable_Profiling=null,l.unstable_UserBlockingPriority=2,l.unstable_cancelCallback=function(z){z.callback=null},l.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<z?Math.floor(1e3/z):5},l.unstable_getCurrentPriorityLevel=function(){return _},l.unstable_next=function(z){switch(_){case 1:case 2:case 3:var K=3;break;default:K=_}var Y=_;_=K;try{return z()}finally{_=Y}},l.unstable_requestPaint=function(){C=!0},l.unstable_runWithPriority=function(z,K){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var Y=_;_=z;try{return K()}finally{_=Y}},l.unstable_scheduleCallback=function(z,K,Y){var be=l.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?be+Y:be):Y=be,z){case 1:var Se=-1;break;case 2:Se=250;break;case 5:Se=1073741823;break;case 4:Se=1e4;break;default:Se=5e3}return Se=Y+Se,z={id:S++,callback:K,priorityLevel:z,startTime:Y,expirationTime:Se,sortIndex:-1},Y>be?(z.sortIndex=Y,r(h,z),o(b)===null&&z===o(h)&&(R?(V(Z),Z=-1):R=!0,Ee(P,Y-be))):(z.sortIndex=Se,r(b,z),D||U||(D=!0,te||(te=!0,Oe()))),z},l.unstable_shouldYield=He,l.unstable_wrapCallback=function(z){var K=_;return function(){var Y=_;_=K;try{return z.apply(this,arguments)}finally{_=Y}}}})(Ho)),Ho}var Uh;function ty(){return Uh||(Uh=1,Bo.exports=ey()),Bo.exports}var ko={exports:{}},it={};var Bh;function ay(){if(Bh)return it;Bh=1;var l=ss();function r(b){var h="https://react.dev/errors/"+b;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var S=2;S<arguments.length;S++)h+="&args[]="+encodeURIComponent(arguments[S])}return"Minified React error #"+b+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(){}var c={d:{f:o,r:function(){throw Error(r(522))},D:o,C:o,L:o,m:o,X:o,S:o,M:o},p:0,findDOMNode:null},s=Symbol.for("react.portal");function f(b,h,S){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:s,key:x==null?null:""+x,children:b,containerInfo:h,implementation:S}}var m=l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(b,h){if(b==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,it.createPortal=function(b,h){var S=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(r(299));return f(b,h,null,S)},it.flushSync=function(b){var h=m.T,S=c.p;try{if(m.T=null,c.p=2,b)return b()}finally{m.T=h,c.p=S,c.d.f()}},it.preconnect=function(b,h){typeof b=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,c.d.C(b,h))},it.prefetchDNS=function(b){typeof b=="string"&&c.d.D(b)},it.preinit=function(b,h){if(typeof b=="string"&&h&&typeof h.as=="string"){var S=h.as,x=p(S,h.crossOrigin),_=typeof h.integrity=="string"?h.integrity:void 0,U=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;S==="style"?c.d.S(b,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:x,integrity:_,fetchPriority:U}):S==="script"&&c.d.X(b,{crossOrigin:x,integrity:_,fetchPriority:U,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},it.preinitModule=function(b,h){if(typeof b=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var S=p(h.as,h.crossOrigin);c.d.M(b,{crossOrigin:S,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&c.d.M(b)},it.preload=function(b,h){if(typeof b=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var S=h.as,x=p(S,h.crossOrigin);c.d.L(b,S,{crossOrigin:x,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},it.preloadModule=function(b,h){if(typeof b=="string")if(h){var S=p(h.as,h.crossOrigin);c.d.m(b,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:S,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else c.d.m(b)},it.requestFormReset=function(b){c.d.r(b)},it.unstable_batchedUpdates=function(b,h){return b(h)},it.useFormState=function(b,h,S){return m.H.useFormState(b,h,S)},it.useFormStatus=function(){return m.H.useHostTransitionStatus()},it.version="19.2.3",it}var Hh;function Cp(){if(Hh)return ko.exports;Hh=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(r){console.error(r)}}return l(),ko.exports=ay(),ko.exports}var kh;function ny(){if(kh)return gi;kh=1;var l=ty(),r=ss(),o=Cp();function c(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function f(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function m(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function b(e){if(f(e)!==e)throw Error(c(188))}function h(e){var t=e.alternate;if(!t){if(t=f(e),t===null)throw Error(c(188));return t!==e?null:e}for(var a=e,n=t;;){var i=a.return;if(i===null)break;var u=i.alternate;if(u===null){if(n=i.return,n!==null){a=n;continue}break}if(i.child===u.child){for(u=i.child;u;){if(u===a)return b(i),e;if(u===n)return b(i),t;u=u.sibling}throw Error(c(188))}if(a.return!==n.return)a=i,n=u;else{for(var d=!1,v=i.child;v;){if(v===a){d=!0,a=i,n=u;break}if(v===n){d=!0,n=i,a=u;break}v=v.sibling}if(!d){for(v=u.child;v;){if(v===a){d=!0,a=u,n=i;break}if(v===n){d=!0,n=u,a=i;break}v=v.sibling}if(!d)throw Error(c(189))}}if(a.alternate!==n)throw Error(c(190))}if(a.tag!==3)throw Error(c(188));return a.stateNode.current===a?e:t}function S(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=S(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,_=Symbol.for("react.element"),U=Symbol.for("react.transitional.element"),D=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),C=Symbol.for("react.strict_mode"),H=Symbol.for("react.profiler"),V=Symbol.for("react.consumer"),k=Symbol.for("react.context"),G=Symbol.for("react.forward_ref"),P=Symbol.for("react.suspense"),te=Symbol.for("react.suspense_list"),Z=Symbol.for("react.memo"),F=Symbol.for("react.lazy"),pe=Symbol.for("react.activity"),He=Symbol.for("react.memo_cache_sentinel"),Le=Symbol.iterator;function Oe(e){return e===null||typeof e!="object"?null:(e=Le&&e[Le]||e["@@iterator"],typeof e=="function"?e:null)}var rt=Symbol.for("react.client.reference");function Ie(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===rt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case H:return"Profiler";case C:return"StrictMode";case P:return"Suspense";case te:return"SuspenseList";case pe:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case D:return"Portal";case k:return e.displayName||"Context";case V:return(e._context.displayName||"Context")+".Consumer";case G:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Z:return t=e.displayName||null,t!==null?t:Ie(e.type)||"Memo";case F:t=e._payload,e=e._init;try{return Ie(e(t))}catch{}}return null}var Ee=Array.isArray,z=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Y={pending:!1,data:null,method:null,action:null},be=[],Se=-1;function T(e){return{current:e}}function q(e){0>Se||(e.current=be[Se],be[Se]=null,Se--)}function X(e,t){Se++,be[Se]=e.current,e.current=t}var J=T(null),ie=T(null),oe=T(null),le=T(null);function Pe(e,t){switch(X(oe,t),X(ie,e),X(J,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?eh(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=eh(t),e=th(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}q(J),X(J,e)}function Me(){q(J),q(ie),q(oe)}function Zt(e){e.memoizedState!==null&&X(le,e);var t=J.current,a=th(t,e.type);t!==a&&(X(ie,e),X(J,a))}function Ea(e){ie.current===e&&(q(J),q(ie)),le.current===e&&(q(le),fi._currentValue=Y)}var Aa,_s;function $a(e){if(Aa===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Aa=t&&t[1]||"",_s=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Aa+e+_s}var gu=!1;function vu(e,t){if(!e||gu)return"";gu=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var Q=function(){throw Error()};if(Object.defineProperty(Q.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Q,[])}catch(w){var j=w}Reflect.construct(e,[],Q)}else{try{Q.call()}catch(w){j=w}e.call(Q.prototype)}}else{try{throw Error()}catch(w){j=w}(Q=e())&&typeof Q.catch=="function"&&Q.catch(function(){})}}catch(w){if(w&&j&&typeof w.stack=="string")return[w.stack,j.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=n.DetermineComponentFrameRoot(),d=u[0],v=u[1];if(d&&v){var E=d.split(`
`),M=v.split(`
`);for(i=n=0;n<E.length&&!E[n].includes("DetermineComponentFrameRoot");)n++;for(;i<M.length&&!M[i].includes("DetermineComponentFrameRoot");)i++;if(n===E.length||i===M.length)for(n=E.length-1,i=M.length-1;1<=n&&0<=i&&E[n]!==M[i];)i--;for(;1<=n&&0<=i;n--,i--)if(E[n]!==M[i]){if(n!==1||i!==1)do if(n--,i--,0>i||E[n]!==M[i]){var L=`
`+E[n].replace(" at new "," at ");return e.displayName&&L.includes("<anonymous>")&&(L=L.replace("<anonymous>",e.displayName)),L}while(1<=n&&0<=i);break}}}finally{gu=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?$a(a):""}function N0(e,t){switch(e.tag){case 26:case 27:case 5:return $a(e.type);case 16:return $a("Lazy");case 13:return e.child!==t&&t!==null?$a("Suspense Fallback"):$a("Suspense");case 19:return $a("SuspenseList");case 0:case 15:return vu(e.type,!1);case 11:return vu(e.type.render,!1);case 1:return vu(e.type,!0);case 31:return $a("Activity");default:return""}}function Os(e){try{var t="",a=null;do t+=N0(e,a),a=e,e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}var yu=Object.prototype.hasOwnProperty,bu=l.unstable_scheduleCallback,xu=l.unstable_cancelCallback,D0=l.unstable_shouldYield,_0=l.unstable_requestPaint,gt=l.unstable_now,O0=l.unstable_getCurrentPriorityLevel,Ms=l.unstable_ImmediatePriority,js=l.unstable_UserBlockingPriority,_i=l.unstable_NormalPriority,M0=l.unstable_LowPriority,zs=l.unstable_IdlePriority,j0=l.log,z0=l.unstable_setDisableYieldValue,Al=null,vt=null;function Ca(e){if(typeof j0=="function"&&z0(e),vt&&typeof vt.setStrictMode=="function")try{vt.setStrictMode(Al,e)}catch{}}var yt=Math.clz32?Math.clz32:U0,w0=Math.log,L0=Math.LN2;function U0(e){return e>>>=0,e===0?32:31-(w0(e)/L0|0)|0}var Oi=256,Mi=262144,ji=4194304;function Wa(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function zi(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var i=0,u=e.suspendedLanes,d=e.pingedLanes;e=e.warmLanes;var v=n&134217727;return v!==0?(n=v&~u,n!==0?i=Wa(n):(d&=v,d!==0?i=Wa(d):a||(a=v&~e,a!==0&&(i=Wa(a))))):(v=n&~u,v!==0?i=Wa(v):d!==0?i=Wa(d):a||(a=n&~e,a!==0&&(i=Wa(a)))),i===0?0:t!==0&&t!==i&&(t&u)===0&&(u=i&-i,a=t&-t,u>=a||u===32&&(a&4194048)!==0)?t:i}function Cl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function B0(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ws(){var e=ji;return ji<<=1,(ji&62914560)===0&&(ji=4194304),e}function Su(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Tl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function H0(e,t,a,n,i,u){var d=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var v=e.entanglements,E=e.expirationTimes,M=e.hiddenUpdates;for(a=d&~a;0<a;){var L=31-yt(a),Q=1<<L;v[L]=0,E[L]=-1;var j=M[L];if(j!==null)for(M[L]=null,L=0;L<j.length;L++){var w=j[L];w!==null&&(w.lane&=-536870913)}a&=~Q}n!==0&&Ls(e,n,0),u!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=u&~(d&~t))}function Ls(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-yt(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&261930}function Us(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-yt(a),i=1<<n;i&t|e[n]&t&&(e[n]|=t),a&=~i}}function Bs(e,t){var a=t&-t;return a=(a&42)!==0?1:Eu(a),(a&(e.suspendedLanes|t))!==0?0:a}function Eu(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Au(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Hs(){var e=K.p;return e!==0?e:(e=window.event,e===void 0?32:Ch(e.type))}function ks(e,t){var a=K.p;try{return K.p=e,t()}finally{K.p=a}}var Ta=Math.random().toString(36).slice(2),et="__reactFiber$"+Ta,ot="__reactProps$"+Ta,Cn="__reactContainer$"+Ta,Cu="__reactEvents$"+Ta,k0="__reactListeners$"+Ta,q0="__reactHandles$"+Ta,qs="__reactResources$"+Ta,Rl="__reactMarker$"+Ta;function Tu(e){delete e[et],delete e[ot],delete e[Cu],delete e[k0],delete e[q0]}function Tn(e){var t=e[et];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Cn]||a[et]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=ch(e);e!==null;){if(a=e[et])return a;e=ch(e)}return t}e=a,a=e.parentNode}return null}function Rn(e){if(e=e[et]||e[Cn]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Nl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(c(33))}function Nn(e){var t=e[qs];return t||(t=e[qs]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Je(e){e[Rl]=!0}var Qs=new Set,Gs={};function Ia(e,t){Dn(e,t),Dn(e+"Capture",t)}function Dn(e,t){for(Gs[e]=t,e=0;e<t.length;e++)Qs.add(t[e])}var Q0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ys={},Vs={};function G0(e){return yu.call(Vs,e)?!0:yu.call(Ys,e)?!1:Q0.test(e)?Vs[e]=!0:(Ys[e]=!0,!1)}function wi(e,t,a){if(G0(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Li(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function ea(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+n)}}function Dt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Xs(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Y0(e,t,a){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,u=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(d){a=""+d,u.call(this,d)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(d){a=""+d},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ru(e){if(!e._valueTracker){var t=Xs(e)?"checked":"value";e._valueTracker=Y0(e,t,""+e[t])}}function Fs(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=Xs(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}function Ui(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var V0=/[\n"\\]/g;function _t(e){return e.replace(V0,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Nu(e,t,a,n,i,u,d,v){e.name="",d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?e.type=d:e.removeAttribute("type"),t!=null?d==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Dt(t)):e.value!==""+Dt(t)&&(e.value=""+Dt(t)):d!=="submit"&&d!=="reset"||e.removeAttribute("value"),t!=null?Du(e,d,Dt(t)):a!=null?Du(e,d,Dt(a)):n!=null&&e.removeAttribute("value"),i==null&&u!=null&&(e.defaultChecked=!!u),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?e.name=""+Dt(v):e.removeAttribute("name")}function Zs(e,t,a,n,i,u,d,v){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.type=u),t!=null||a!=null){if(!(u!=="submit"&&u!=="reset"||t!=null)){Ru(e);return}a=a!=null?""+Dt(a):"",t=t!=null?""+Dt(t):a,v||t===e.value||(e.value=t),e.defaultValue=t}n=n??i,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=v?e.checked:!!n,e.defaultChecked=!!n,d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.name=d),Ru(e)}function Du(e,t,a){t==="number"&&Ui(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function _n(e,t,a,n){if(e=e.options,t){t={};for(var i=0;i<a.length;i++)t["$"+a[i]]=!0;for(a=0;a<e.length;a++)i=t.hasOwnProperty("$"+e[a].value),e[a].selected!==i&&(e[a].selected=i),i&&n&&(e[a].defaultSelected=!0)}else{for(a=""+Dt(a),t=null,i=0;i<e.length;i++){if(e[i].value===a){e[i].selected=!0,n&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ks(e,t,a){if(t!=null&&(t=""+Dt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+Dt(a):""}function Ps(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(c(92));if(Ee(n)){if(1<n.length)throw Error(c(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=Dt(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n),Ru(e)}function On(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var X0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Js(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||X0.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function $s(e,t,a){if(t!=null&&typeof t!="object")throw Error(c(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var i in t)n=t[i],t.hasOwnProperty(i)&&a[i]!==n&&Js(e,i,n)}else for(var u in t)t.hasOwnProperty(u)&&Js(e,u,t[u])}function _u(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var F0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Z0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Bi(e){return Z0.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ta(){}var Ou=null;function Mu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Mn=null,jn=null;function Ws(e){var t=Rn(e);if(t&&(e=t.stateNode)){var a=e[ot]||null;e:switch(e=t.stateNode,t.type){case"input":if(Nu(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+_t(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var i=n[ot]||null;if(!i)throw Error(c(90));Nu(n,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&Fs(n)}break e;case"textarea":Ks(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&_n(e,!!a.multiple,t,!1)}}}var ju=!1;function Is(e,t,a){if(ju)return e(t,a);ju=!0;try{var n=e(t);return n}finally{if(ju=!1,(Mn!==null||jn!==null)&&(Cr(),Mn&&(t=Mn,e=jn,jn=Mn=null,Ws(t),e)))for(t=0;t<e.length;t++)Ws(e[t])}}function Dl(e,t){var a=e.stateNode;if(a===null)return null;var n=a[ot]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(c(231,t,typeof a));return a}var aa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zu=!1;if(aa)try{var _l={};Object.defineProperty(_l,"passive",{get:function(){zu=!0}}),window.addEventListener("test",_l,_l),window.removeEventListener("test",_l,_l)}catch{zu=!1}var Ra=null,wu=null,Hi=null;function ef(){if(Hi)return Hi;var e,t=wu,a=t.length,n,i="value"in Ra?Ra.value:Ra.textContent,u=i.length;for(e=0;e<a&&t[e]===i[e];e++);var d=a-e;for(n=1;n<=d&&t[a-n]===i[u-n];n++);return Hi=i.slice(e,1<n?1-n:void 0)}function ki(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function qi(){return!0}function tf(){return!1}function st(e){function t(a,n,i,u,d){this._reactName=a,this._targetInst=i,this.type=n,this.nativeEvent=u,this.target=d,this.currentTarget=null;for(var v in e)e.hasOwnProperty(v)&&(a=e[v],this[v]=a?a(u):u[v]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?qi:tf,this.isPropagationStopped=tf,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=qi)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=qi)},persist:function(){},isPersistent:qi}),t}var en={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Qi=st(en),Ol=x({},en,{view:0,detail:0}),K0=st(Ol),Lu,Uu,Ml,Gi=x({},Ol,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ml&&(Ml&&e.type==="mousemove"?(Lu=e.screenX-Ml.screenX,Uu=e.screenY-Ml.screenY):Uu=Lu=0,Ml=e),Lu)},movementY:function(e){return"movementY"in e?e.movementY:Uu}}),af=st(Gi),P0=x({},Gi,{dataTransfer:0}),J0=st(P0),$0=x({},Ol,{relatedTarget:0}),Bu=st($0),W0=x({},en,{animationName:0,elapsedTime:0,pseudoElement:0}),I0=st(W0),ev=x({},en,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),tv=st(ev),av=x({},en,{data:0}),nf=st(av),nv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},iv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function rv(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=iv[e])?!!t[e]:!1}function Hu(){return rv}var uv=x({},Ol,{key:function(e){if(e.key){var t=nv[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ki(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?lv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hu,charCode:function(e){return e.type==="keypress"?ki(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ki(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),cv=st(uv),ov=x({},Gi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lf=st(ov),sv=x({},Ol,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hu}),fv=st(sv),dv=x({},en,{propertyName:0,elapsedTime:0,pseudoElement:0}),mv=st(dv),hv=x({},Gi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),pv=st(hv),gv=x({},en,{newState:0,oldState:0}),vv=st(gv),yv=[9,13,27,32],ku=aa&&"CompositionEvent"in window,jl=null;aa&&"documentMode"in document&&(jl=document.documentMode);var bv=aa&&"TextEvent"in window&&!jl,rf=aa&&(!ku||jl&&8<jl&&11>=jl),uf=" ",cf=!1;function of(e,t){switch(e){case"keyup":return yv.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var zn=!1;function xv(e,t){switch(e){case"compositionend":return sf(t);case"keypress":return t.which!==32?null:(cf=!0,uf);case"textInput":return e=t.data,e===uf&&cf?null:e;default:return null}}function Sv(e,t){if(zn)return e==="compositionend"||!ku&&of(e,t)?(e=ef(),Hi=wu=Ra=null,zn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return rf&&t.locale!=="ko"?null:t.data;default:return null}}var Ev={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ff(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ev[e.type]:t==="textarea"}function df(e,t,a,n){Mn?jn?jn.push(n):jn=[n]:Mn=n,t=Mr(t,"onChange"),0<t.length&&(a=new Qi("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var zl=null,wl=null;function Av(e){Km(e,0)}function Yi(e){var t=Nl(e);if(Fs(t))return e}function mf(e,t){if(e==="change")return t}var hf=!1;if(aa){var qu;if(aa){var Qu="oninput"in document;if(!Qu){var pf=document.createElement("div");pf.setAttribute("oninput","return;"),Qu=typeof pf.oninput=="function"}qu=Qu}else qu=!1;hf=qu&&(!document.documentMode||9<document.documentMode)}function gf(){zl&&(zl.detachEvent("onpropertychange",vf),wl=zl=null)}function vf(e){if(e.propertyName==="value"&&Yi(wl)){var t=[];df(t,wl,e,Mu(e)),Is(Av,t)}}function Cv(e,t,a){e==="focusin"?(gf(),zl=t,wl=a,zl.attachEvent("onpropertychange",vf)):e==="focusout"&&gf()}function Tv(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Yi(wl)}function Rv(e,t){if(e==="click")return Yi(t)}function Nv(e,t){if(e==="input"||e==="change")return Yi(t)}function Dv(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var bt=typeof Object.is=="function"?Object.is:Dv;function Ll(e,t){if(bt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var i=a[n];if(!yu.call(t,i)||!bt(e[i],t[i]))return!1}return!0}function yf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function bf(e,t){var a=yf(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=yf(a)}}function xf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?xf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Sf(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ui(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Ui(e.document)}return t}function Gu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var _v=aa&&"documentMode"in document&&11>=document.documentMode,wn=null,Yu=null,Ul=null,Vu=!1;function Ef(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Vu||wn==null||wn!==Ui(n)||(n=wn,"selectionStart"in n&&Gu(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Ul&&Ll(Ul,n)||(Ul=n,n=Mr(Yu,"onSelect"),0<n.length&&(t=new Qi("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=wn)))}function tn(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var Ln={animationend:tn("Animation","AnimationEnd"),animationiteration:tn("Animation","AnimationIteration"),animationstart:tn("Animation","AnimationStart"),transitionrun:tn("Transition","TransitionRun"),transitionstart:tn("Transition","TransitionStart"),transitioncancel:tn("Transition","TransitionCancel"),transitionend:tn("Transition","TransitionEnd")},Xu={},Af={};aa&&(Af=document.createElement("div").style,"AnimationEvent"in window||(delete Ln.animationend.animation,delete Ln.animationiteration.animation,delete Ln.animationstart.animation),"TransitionEvent"in window||delete Ln.transitionend.transition);function an(e){if(Xu[e])return Xu[e];if(!Ln[e])return e;var t=Ln[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Af)return Xu[e]=t[a];return e}var Cf=an("animationend"),Tf=an("animationiteration"),Rf=an("animationstart"),Ov=an("transitionrun"),Mv=an("transitionstart"),jv=an("transitioncancel"),Nf=an("transitionend"),Df=new Map,Fu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Fu.push("scrollEnd");function Qt(e,t){Df.set(e,t),Ia(t,[e])}var Vi=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ot=[],Un=0,Zu=0;function Xi(){for(var e=Un,t=Zu=Un=0;t<e;){var a=Ot[t];Ot[t++]=null;var n=Ot[t];Ot[t++]=null;var i=Ot[t];Ot[t++]=null;var u=Ot[t];if(Ot[t++]=null,n!==null&&i!==null){var d=n.pending;d===null?i.next=i:(i.next=d.next,d.next=i),n.pending=i}u!==0&&_f(a,i,u)}}function Fi(e,t,a,n){Ot[Un++]=e,Ot[Un++]=t,Ot[Un++]=a,Ot[Un++]=n,Zu|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function Ku(e,t,a,n){return Fi(e,t,a,n),Zi(e)}function nn(e,t){return Fi(e,null,null,t),Zi(e)}function _f(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var i=!1,u=e.return;u!==null;)u.childLanes|=a,n=u.alternate,n!==null&&(n.childLanes|=a),u.tag===22&&(e=u.stateNode,e===null||e._visibility&1||(i=!0)),e=u,u=u.return;return e.tag===3?(u=e.stateNode,i&&t!==null&&(i=31-yt(a),e=u.hiddenUpdates,n=e[i],n===null?e[i]=[t]:n.push(t),t.lane=a|536870912),u):null}function Zi(e){if(50<li)throw li=0,no=null,Error(c(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Bn={};function zv(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function xt(e,t,a,n){return new zv(e,t,a,n)}function Pu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,t){var a=e.alternate;return a===null?(a=xt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Of(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ki(e,t,a,n,i,u){var d=0;if(n=e,typeof e=="function")Pu(e)&&(d=1);else if(typeof e=="string")d=H1(e,a,J.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case pe:return e=xt(31,a,t,i),e.elementType=pe,e.lanes=u,e;case R:return ln(a.children,i,u,t);case C:d=8,i|=24;break;case H:return e=xt(12,a,t,i|2),e.elementType=H,e.lanes=u,e;case P:return e=xt(13,a,t,i),e.elementType=P,e.lanes=u,e;case te:return e=xt(19,a,t,i),e.elementType=te,e.lanes=u,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case k:d=10;break e;case V:d=9;break e;case G:d=11;break e;case Z:d=14;break e;case F:d=16,n=null;break e}d=29,a=Error(c(130,e===null?"null":typeof e,"")),n=null}return t=xt(d,a,t,i),t.elementType=e,t.type=n,t.lanes=u,t}function ln(e,t,a,n){return e=xt(7,e,n,t),e.lanes=a,e}function Ju(e,t,a){return e=xt(6,e,null,t),e.lanes=a,e}function Mf(e){var t=xt(18,null,null,0);return t.stateNode=e,t}function $u(e,t,a){return t=xt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var jf=new WeakMap;function Mt(e,t){if(typeof e=="object"&&e!==null){var a=jf.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Os(t)},jf.set(e,t),t)}return{value:e,source:t,stack:Os(t)}}var Hn=[],kn=0,Pi=null,Bl=0,jt=[],zt=0,Na=null,Kt=1,Pt="";function la(e,t){Hn[kn++]=Bl,Hn[kn++]=Pi,Pi=e,Bl=t}function zf(e,t,a){jt[zt++]=Kt,jt[zt++]=Pt,jt[zt++]=Na,Na=e;var n=Kt;e=Pt;var i=32-yt(n)-1;n&=~(1<<i),a+=1;var u=32-yt(t)+i;if(30<u){var d=i-i%5;u=(n&(1<<d)-1).toString(32),n>>=d,i-=d,Kt=1<<32-yt(t)+i|a<<i|n,Pt=u+e}else Kt=1<<u|a<<i|n,Pt=e}function Wu(e){e.return!==null&&(la(e,1),zf(e,1,0))}function Iu(e){for(;e===Pi;)Pi=Hn[--kn],Hn[kn]=null,Bl=Hn[--kn],Hn[kn]=null;for(;e===Na;)Na=jt[--zt],jt[zt]=null,Pt=jt[--zt],jt[zt]=null,Kt=jt[--zt],jt[zt]=null}function wf(e,t){jt[zt++]=Kt,jt[zt++]=Pt,jt[zt++]=Na,Kt=t.id,Pt=t.overflow,Na=e}var tt=null,je=null,ge=!1,Da=null,wt=!1,ec=Error(c(519));function _a(e){var t=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Hl(Mt(t,e)),ec}function Lf(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[et]=e,t[ot]=n,a){case"dialog":de("cancel",t),de("close",t);break;case"iframe":case"object":case"embed":de("load",t);break;case"video":case"audio":for(a=0;a<ri.length;a++)de(ri[a],t);break;case"source":de("error",t);break;case"img":case"image":case"link":de("error",t),de("load",t);break;case"details":de("toggle",t);break;case"input":de("invalid",t),Zs(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":de("invalid",t);break;case"textarea":de("invalid",t),Ps(t,n.value,n.defaultValue,n.children)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||Wm(t.textContent,a)?(n.popover!=null&&(de("beforetoggle",t),de("toggle",t)),n.onScroll!=null&&de("scroll",t),n.onScrollEnd!=null&&de("scrollend",t),n.onClick!=null&&(t.onclick=ta),t=!0):t=!1,t||_a(e,!0)}function Uf(e){for(tt=e.return;tt;)switch(tt.tag){case 5:case 31:case 13:wt=!1;return;case 27:case 3:wt=!0;return;default:tt=tt.return}}function qn(e){if(e!==tt)return!1;if(!ge)return Uf(e),ge=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||bo(e.type,e.memoizedProps)),a=!a),a&&je&&_a(e),Uf(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));je=uh(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));je=uh(e)}else t===27?(t=je,Ya(e.type)?(e=Co,Co=null,je=e):je=t):je=tt?Ut(e.stateNode.nextSibling):null;return!0}function rn(){je=tt=null,ge=!1}function tc(){var e=Da;return e!==null&&(ht===null?ht=e:ht.push.apply(ht,e),Da=null),e}function Hl(e){Da===null?Da=[e]:Da.push(e)}var ac=T(null),un=null,ia=null;function Oa(e,t,a){X(ac,t._currentValue),t._currentValue=a}function ra(e){e._currentValue=ac.current,q(ac)}function nc(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function lc(e,t,a,n){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var u=i.dependencies;if(u!==null){var d=i.child;u=u.firstContext;e:for(;u!==null;){var v=u;u=i;for(var E=0;E<t.length;E++)if(v.context===t[E]){u.lanes|=a,v=u.alternate,v!==null&&(v.lanes|=a),nc(u.return,a,e),n||(d=null);break e}u=v.next}}else if(i.tag===18){if(d=i.return,d===null)throw Error(c(341));d.lanes|=a,u=d.alternate,u!==null&&(u.lanes|=a),nc(d,a,e),d=null}else d=i.child;if(d!==null)d.return=i;else for(d=i;d!==null;){if(d===e){d=null;break}if(i=d.sibling,i!==null){i.return=d.return,d=i;break}d=d.return}i=d}}function Qn(e,t,a,n){e=null;for(var i=t,u=!1;i!==null;){if(!u){if((i.flags&524288)!==0)u=!0;else if((i.flags&262144)!==0)break}if(i.tag===10){var d=i.alternate;if(d===null)throw Error(c(387));if(d=d.memoizedProps,d!==null){var v=i.type;bt(i.pendingProps.value,d.value)||(e!==null?e.push(v):e=[v])}}else if(i===le.current){if(d=i.alternate,d===null)throw Error(c(387));d.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(fi):e=[fi])}i=i.return}e!==null&&lc(t,e,a,n),t.flags|=262144}function Ji(e){for(e=e.firstContext;e!==null;){if(!bt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function cn(e){un=e,ia=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function at(e){return Bf(un,e)}function $i(e,t){return un===null&&cn(e),Bf(e,t)}function Bf(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},ia===null){if(e===null)throw Error(c(308));ia=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ia=ia.next=t;return a}var wv=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},Lv=l.unstable_scheduleCallback,Uv=l.unstable_NormalPriority,Ye={$$typeof:k,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ic(){return{controller:new wv,data:new Map,refCount:0}}function kl(e){e.refCount--,e.refCount===0&&Lv(Uv,function(){e.controller.abort()})}var ql=null,rc=0,Gn=0,Yn=null;function Bv(e,t){if(ql===null){var a=ql=[];rc=0,Gn=oo(),Yn={status:"pending",value:void 0,then:function(n){a.push(n)}}}return rc++,t.then(Hf,Hf),t}function Hf(){if(--rc===0&&ql!==null){Yn!==null&&(Yn.status="fulfilled");var e=ql;ql=null,Gn=0,Yn=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Hv(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(i){a.push(i)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var i=0;i<a.length;i++)(0,a[i])(t)},function(i){for(n.status="rejected",n.reason=i,i=0;i<a.length;i++)(0,a[i])(void 0)}),n}var kf=z.S;z.S=function(e,t){Em=gt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Bv(e,t),kf!==null&&kf(e,t)};var on=T(null);function uc(){var e=on.current;return e!==null?e:_e.pooledCache}function Wi(e,t){t===null?X(on,on.current):X(on,t.pool)}function qf(){var e=uc();return e===null?null:{parent:Ye._currentValue,pool:e}}var Vn=Error(c(460)),cc=Error(c(474)),Ii=Error(c(542)),er={then:function(){}};function Qf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Gf(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(ta,ta),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Vf(e),e;default:if(typeof t.status=="string")t.then(ta,ta);else{if(e=_e,e!==null&&100<e.shellSuspendCounter)throw Error(c(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=n}},function(n){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Vf(e),e}throw fn=t,Vn}}function sn(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(fn=a,Vn):a}}var fn=null;function Yf(){if(fn===null)throw Error(c(459));var e=fn;return fn=null,e}function Vf(e){if(e===Vn||e===Ii)throw Error(c(483))}var Xn=null,Ql=0;function tr(e){var t=Ql;return Ql+=1,Xn===null&&(Xn=[]),Gf(Xn,e,t)}function Gl(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ar(e,t){throw t.$$typeof===_?Error(c(525)):(e=Object.prototype.toString.call(t),Error(c(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Xf(e){function t(N,A){if(e){var O=N.deletions;O===null?(N.deletions=[A],N.flags|=16):O.push(A)}}function a(N,A){if(!e)return null;for(;A!==null;)t(N,A),A=A.sibling;return null}function n(N){for(var A=new Map;N!==null;)N.key!==null?A.set(N.key,N):A.set(N.index,N),N=N.sibling;return A}function i(N,A){return N=na(N,A),N.index=0,N.sibling=null,N}function u(N,A,O){return N.index=O,e?(O=N.alternate,O!==null?(O=O.index,O<A?(N.flags|=67108866,A):O):(N.flags|=67108866,A)):(N.flags|=1048576,A)}function d(N){return e&&N.alternate===null&&(N.flags|=67108866),N}function v(N,A,O,B){return A===null||A.tag!==6?(A=Ju(O,N.mode,B),A.return=N,A):(A=i(A,O),A.return=N,A)}function E(N,A,O,B){var ae=O.type;return ae===R?L(N,A,O.props.children,B,O.key):A!==null&&(A.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===F&&sn(ae)===A.type)?(A=i(A,O.props),Gl(A,O),A.return=N,A):(A=Ki(O.type,O.key,O.props,null,N.mode,B),Gl(A,O),A.return=N,A)}function M(N,A,O,B){return A===null||A.tag!==4||A.stateNode.containerInfo!==O.containerInfo||A.stateNode.implementation!==O.implementation?(A=$u(O,N.mode,B),A.return=N,A):(A=i(A,O.children||[]),A.return=N,A)}function L(N,A,O,B,ae){return A===null||A.tag!==7?(A=ln(O,N.mode,B,ae),A.return=N,A):(A=i(A,O),A.return=N,A)}function Q(N,A,O){if(typeof A=="string"&&A!==""||typeof A=="number"||typeof A=="bigint")return A=Ju(""+A,N.mode,O),A.return=N,A;if(typeof A=="object"&&A!==null){switch(A.$$typeof){case U:return O=Ki(A.type,A.key,A.props,null,N.mode,O),Gl(O,A),O.return=N,O;case D:return A=$u(A,N.mode,O),A.return=N,A;case F:return A=sn(A),Q(N,A,O)}if(Ee(A)||Oe(A))return A=ln(A,N.mode,O,null),A.return=N,A;if(typeof A.then=="function")return Q(N,tr(A),O);if(A.$$typeof===k)return Q(N,$i(N,A),O);ar(N,A)}return null}function j(N,A,O,B){var ae=A!==null?A.key:null;if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return ae!==null?null:v(N,A,""+O,B);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case U:return O.key===ae?E(N,A,O,B):null;case D:return O.key===ae?M(N,A,O,B):null;case F:return O=sn(O),j(N,A,O,B)}if(Ee(O)||Oe(O))return ae!==null?null:L(N,A,O,B,null);if(typeof O.then=="function")return j(N,A,tr(O),B);if(O.$$typeof===k)return j(N,A,$i(N,O),B);ar(N,O)}return null}function w(N,A,O,B,ae){if(typeof B=="string"&&B!==""||typeof B=="number"||typeof B=="bigint")return N=N.get(O)||null,v(A,N,""+B,ae);if(typeof B=="object"&&B!==null){switch(B.$$typeof){case U:return N=N.get(B.key===null?O:B.key)||null,E(A,N,B,ae);case D:return N=N.get(B.key===null?O:B.key)||null,M(A,N,B,ae);case F:return B=sn(B),w(N,A,O,B,ae)}if(Ee(B)||Oe(B))return N=N.get(O)||null,L(A,N,B,ae,null);if(typeof B.then=="function")return w(N,A,O,tr(B),ae);if(B.$$typeof===k)return w(N,A,O,$i(A,B),ae);ar(A,B)}return null}function $(N,A,O,B){for(var ae=null,ve=null,ee=A,ce=A=0,he=null;ee!==null&&ce<O.length;ce++){ee.index>ce?(he=ee,ee=null):he=ee.sibling;var ye=j(N,ee,O[ce],B);if(ye===null){ee===null&&(ee=he);break}e&&ee&&ye.alternate===null&&t(N,ee),A=u(ye,A,ce),ve===null?ae=ye:ve.sibling=ye,ve=ye,ee=he}if(ce===O.length)return a(N,ee),ge&&la(N,ce),ae;if(ee===null){for(;ce<O.length;ce++)ee=Q(N,O[ce],B),ee!==null&&(A=u(ee,A,ce),ve===null?ae=ee:ve.sibling=ee,ve=ee);return ge&&la(N,ce),ae}for(ee=n(ee);ce<O.length;ce++)he=w(ee,N,ce,O[ce],B),he!==null&&(e&&he.alternate!==null&&ee.delete(he.key===null?ce:he.key),A=u(he,A,ce),ve===null?ae=he:ve.sibling=he,ve=he);return e&&ee.forEach(function(Ka){return t(N,Ka)}),ge&&la(N,ce),ae}function ne(N,A,O,B){if(O==null)throw Error(c(151));for(var ae=null,ve=null,ee=A,ce=A=0,he=null,ye=O.next();ee!==null&&!ye.done;ce++,ye=O.next()){ee.index>ce?(he=ee,ee=null):he=ee.sibling;var Ka=j(N,ee,ye.value,B);if(Ka===null){ee===null&&(ee=he);break}e&&ee&&Ka.alternate===null&&t(N,ee),A=u(Ka,A,ce),ve===null?ae=Ka:ve.sibling=Ka,ve=Ka,ee=he}if(ye.done)return a(N,ee),ge&&la(N,ce),ae;if(ee===null){for(;!ye.done;ce++,ye=O.next())ye=Q(N,ye.value,B),ye!==null&&(A=u(ye,A,ce),ve===null?ae=ye:ve.sibling=ye,ve=ye);return ge&&la(N,ce),ae}for(ee=n(ee);!ye.done;ce++,ye=O.next())ye=w(ee,N,ce,ye.value,B),ye!==null&&(e&&ye.alternate!==null&&ee.delete(ye.key===null?ce:ye.key),A=u(ye,A,ce),ve===null?ae=ye:ve.sibling=ye,ve=ye);return e&&ee.forEach(function(P1){return t(N,P1)}),ge&&la(N,ce),ae}function De(N,A,O,B){if(typeof O=="object"&&O!==null&&O.type===R&&O.key===null&&(O=O.props.children),typeof O=="object"&&O!==null){switch(O.$$typeof){case U:e:{for(var ae=O.key;A!==null;){if(A.key===ae){if(ae=O.type,ae===R){if(A.tag===7){a(N,A.sibling),B=i(A,O.props.children),B.return=N,N=B;break e}}else if(A.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===F&&sn(ae)===A.type){a(N,A.sibling),B=i(A,O.props),Gl(B,O),B.return=N,N=B;break e}a(N,A);break}else t(N,A);A=A.sibling}O.type===R?(B=ln(O.props.children,N.mode,B,O.key),B.return=N,N=B):(B=Ki(O.type,O.key,O.props,null,N.mode,B),Gl(B,O),B.return=N,N=B)}return d(N);case D:e:{for(ae=O.key;A!==null;){if(A.key===ae)if(A.tag===4&&A.stateNode.containerInfo===O.containerInfo&&A.stateNode.implementation===O.implementation){a(N,A.sibling),B=i(A,O.children||[]),B.return=N,N=B;break e}else{a(N,A);break}else t(N,A);A=A.sibling}B=$u(O,N.mode,B),B.return=N,N=B}return d(N);case F:return O=sn(O),De(N,A,O,B)}if(Ee(O))return $(N,A,O,B);if(Oe(O)){if(ae=Oe(O),typeof ae!="function")throw Error(c(150));return O=ae.call(O),ne(N,A,O,B)}if(typeof O.then=="function")return De(N,A,tr(O),B);if(O.$$typeof===k)return De(N,A,$i(N,O),B);ar(N,O)}return typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint"?(O=""+O,A!==null&&A.tag===6?(a(N,A.sibling),B=i(A,O),B.return=N,N=B):(a(N,A),B=Ju(O,N.mode,B),B.return=N,N=B),d(N)):a(N,A)}return function(N,A,O,B){try{Ql=0;var ae=De(N,A,O,B);return Xn=null,ae}catch(ee){if(ee===Vn||ee===Ii)throw ee;var ve=xt(29,ee,null,N.mode);return ve.lanes=B,ve.return=N,ve}}}var dn=Xf(!0),Ff=Xf(!1),Ma=!1;function oc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function sc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ja(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function za(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(xe&2)!==0){var i=n.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),n.pending=t,t=Zi(e),_f(e,null,a),t}return Fi(e,n,t,a),Zi(e)}function Yl(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Us(e,a)}}function fc(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var i=null,u=null;if(a=a.firstBaseUpdate,a!==null){do{var d={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};u===null?i=u=d:u=u.next=d,a=a.next}while(a!==null);u===null?i=u=t:u=u.next=t}else i=u=t;a={baseState:n.baseState,firstBaseUpdate:i,lastBaseUpdate:u,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var dc=!1;function Vl(){if(dc){var e=Yn;if(e!==null)throw e}}function Xl(e,t,a,n){dc=!1;var i=e.updateQueue;Ma=!1;var u=i.firstBaseUpdate,d=i.lastBaseUpdate,v=i.shared.pending;if(v!==null){i.shared.pending=null;var E=v,M=E.next;E.next=null,d===null?u=M:d.next=M,d=E;var L=e.alternate;L!==null&&(L=L.updateQueue,v=L.lastBaseUpdate,v!==d&&(v===null?L.firstBaseUpdate=M:v.next=M,L.lastBaseUpdate=E))}if(u!==null){var Q=i.baseState;d=0,L=M=E=null,v=u;do{var j=v.lane&-536870913,w=j!==v.lane;if(w?(me&j)===j:(n&j)===j){j!==0&&j===Gn&&(dc=!0),L!==null&&(L=L.next={lane:0,tag:v.tag,payload:v.payload,callback:null,next:null});e:{var $=e,ne=v;j=t;var De=a;switch(ne.tag){case 1:if($=ne.payload,typeof $=="function"){Q=$.call(De,Q,j);break e}Q=$;break e;case 3:$.flags=$.flags&-65537|128;case 0:if($=ne.payload,j=typeof $=="function"?$.call(De,Q,j):$,j==null)break e;Q=x({},Q,j);break e;case 2:Ma=!0}}j=v.callback,j!==null&&(e.flags|=64,w&&(e.flags|=8192),w=i.callbacks,w===null?i.callbacks=[j]:w.push(j))}else w={lane:j,tag:v.tag,payload:v.payload,callback:v.callback,next:null},L===null?(M=L=w,E=Q):L=L.next=w,d|=j;if(v=v.next,v===null){if(v=i.shared.pending,v===null)break;w=v,v=w.next,w.next=null,i.lastBaseUpdate=w,i.shared.pending=null}}while(!0);L===null&&(E=Q),i.baseState=E,i.firstBaseUpdate=M,i.lastBaseUpdate=L,u===null&&(i.shared.lanes=0),Ha|=d,e.lanes=d,e.memoizedState=Q}}function Zf(e,t){if(typeof e!="function")throw Error(c(191,e));e.call(t)}function Kf(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Zf(a[e],t)}var Fn=T(null),nr=T(0);function Pf(e,t){e=pa,X(nr,e),X(Fn,t),pa=e|t.baseLanes}function mc(){X(nr,pa),X(Fn,Fn.current)}function hc(){pa=nr.current,q(Fn),q(nr)}var St=T(null),Lt=null;function wa(e){var t=e.alternate;X(Qe,Qe.current&1),X(St,e),Lt===null&&(t===null||Fn.current!==null||t.memoizedState!==null)&&(Lt=e)}function pc(e){X(Qe,Qe.current),X(St,e),Lt===null&&(Lt=e)}function Jf(e){e.tag===22?(X(Qe,Qe.current),X(St,e),Lt===null&&(Lt=e)):La()}function La(){X(Qe,Qe.current),X(St,St.current)}function Et(e){q(St),Lt===e&&(Lt=null),q(Qe)}var Qe=T(0);function lr(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Eo(a)||Ao(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ua=0,ue=null,Re=null,Ve=null,ir=!1,Zn=!1,mn=!1,rr=0,Fl=0,Kn=null,kv=0;function ke(){throw Error(c(321))}function gc(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!bt(e[a],t[a]))return!1;return!0}function vc(e,t,a,n,i,u){return ua=u,ue=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,z.H=e===null||e.memoizedState===null?zd:jc,mn=!1,u=a(n,i),mn=!1,Zn&&(u=Wf(t,a,n,i)),$f(e),u}function $f(e){z.H=Pl;var t=Re!==null&&Re.next!==null;if(ua=0,Ve=Re=ue=null,ir=!1,Fl=0,Kn=null,t)throw Error(c(300));e===null||Xe||(e=e.dependencies,e!==null&&Ji(e)&&(Xe=!0))}function Wf(e,t,a,n){ue=e;var i=0;do{if(Zn&&(Kn=null),Fl=0,Zn=!1,25<=i)throw Error(c(301));if(i+=1,Ve=Re=null,e.updateQueue!=null){var u=e.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}z.H=wd,u=t(a,n)}while(Zn);return u}function qv(){var e=z.H,t=e.useState()[0];return t=typeof t.then=="function"?Zl(t):t,e=e.useState()[0],(Re!==null?Re.memoizedState:null)!==e&&(ue.flags|=1024),t}function yc(){var e=rr!==0;return rr=0,e}function bc(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function xc(e){if(ir){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ir=!1}ua=0,Ve=Re=ue=null,Zn=!1,Fl=rr=0,Kn=null}function ut(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ve===null?ue.memoizedState=Ve=e:Ve=Ve.next=e,Ve}function Ge(){if(Re===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=Re.next;var t=Ve===null?ue.memoizedState:Ve.next;if(t!==null)Ve=t,Re=e;else{if(e===null)throw ue.alternate===null?Error(c(467)):Error(c(310));Re=e,e={memoizedState:Re.memoizedState,baseState:Re.baseState,baseQueue:Re.baseQueue,queue:Re.queue,next:null},Ve===null?ue.memoizedState=Ve=e:Ve=Ve.next=e}return Ve}function ur(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Zl(e){var t=Fl;return Fl+=1,Kn===null&&(Kn=[]),e=Gf(Kn,e,t),t=ue,(Ve===null?t.memoizedState:Ve.next)===null&&(t=t.alternate,z.H=t===null||t.memoizedState===null?zd:jc),e}function cr(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Zl(e);if(e.$$typeof===k)return at(e)}throw Error(c(438,String(e)))}function Sc(e){var t=null,a=ue.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=ue.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=ur(),ue.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=He;return t.index++,a}function ca(e,t){return typeof t=="function"?t(e):t}function or(e){var t=Ge();return Ec(t,Re,e)}function Ec(e,t,a){var n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=a;var i=e.baseQueue,u=n.pending;if(u!==null){if(i!==null){var d=i.next;i.next=u.next,u.next=d}t.baseQueue=i=u,n.pending=null}if(u=e.baseState,i===null)e.memoizedState=u;else{t=i.next;var v=d=null,E=null,M=t,L=!1;do{var Q=M.lane&-536870913;if(Q!==M.lane?(me&Q)===Q:(ua&Q)===Q){var j=M.revertLane;if(j===0)E!==null&&(E=E.next={lane:0,revertLane:0,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null}),Q===Gn&&(L=!0);else if((ua&j)===j){M=M.next,j===Gn&&(L=!0);continue}else Q={lane:0,revertLane:M.revertLane,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},E===null?(v=E=Q,d=u):E=E.next=Q,ue.lanes|=j,Ha|=j;Q=M.action,mn&&a(u,Q),u=M.hasEagerState?M.eagerState:a(u,Q)}else j={lane:Q,revertLane:M.revertLane,gesture:M.gesture,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},E===null?(v=E=j,d=u):E=E.next=j,ue.lanes|=Q,Ha|=Q;M=M.next}while(M!==null&&M!==t);if(E===null?d=u:E.next=v,!bt(u,e.memoizedState)&&(Xe=!0,L&&(a=Yn,a!==null)))throw a;e.memoizedState=u,e.baseState=d,e.baseQueue=E,n.lastRenderedState=u}return i===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function Ac(e){var t=Ge(),a=t.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=e;var n=a.dispatch,i=a.pending,u=t.memoizedState;if(i!==null){a.pending=null;var d=i=i.next;do u=e(u,d.action),d=d.next;while(d!==i);bt(u,t.memoizedState)||(Xe=!0),t.memoizedState=u,t.baseQueue===null&&(t.baseState=u),a.lastRenderedState=u}return[u,n]}function If(e,t,a){var n=ue,i=Ge(),u=ge;if(u){if(a===void 0)throw Error(c(407));a=a()}else a=t();var d=!bt((Re||i).memoizedState,a);if(d&&(i.memoizedState=a,Xe=!0),i=i.queue,Rc(ad.bind(null,n,i,e),[e]),i.getSnapshot!==t||d||Ve!==null&&Ve.memoizedState.tag&1){if(n.flags|=2048,Pn(9,{destroy:void 0},td.bind(null,n,i,a,t),null),_e===null)throw Error(c(349));u||(ua&127)!==0||ed(n,t,a)}return a}function ed(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=ue.updateQueue,t===null?(t=ur(),ue.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function td(e,t,a,n){t.value=a,t.getSnapshot=n,nd(t)&&ld(e)}function ad(e,t,a){return a(function(){nd(t)&&ld(e)})}function nd(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!bt(e,a)}catch{return!0}}function ld(e){var t=nn(e,2);t!==null&&pt(t,e,2)}function Cc(e){var t=ut();if(typeof e=="function"){var a=e;if(e=a(),mn){Ca(!0);try{a()}finally{Ca(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:e},t}function id(e,t,a,n){return e.baseState=a,Ec(e,Re,typeof n=="function"?n:ca)}function Qv(e,t,a,n,i){if(dr(e))throw Error(c(485));if(e=t.action,e!==null){var u={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(d){u.listeners.push(d)}};z.T!==null?a(!0):u.isTransition=!1,n(u),a=t.pending,a===null?(u.next=t.pending=u,rd(t,u)):(u.next=a.next,t.pending=a.next=u)}}function rd(e,t){var a=t.action,n=t.payload,i=e.state;if(t.isTransition){var u=z.T,d={};z.T=d;try{var v=a(i,n),E=z.S;E!==null&&E(d,v),ud(e,t,v)}catch(M){Tc(e,t,M)}finally{u!==null&&d.types!==null&&(u.types=d.types),z.T=u}}else try{u=a(i,n),ud(e,t,u)}catch(M){Tc(e,t,M)}}function ud(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){cd(e,t,n)},function(n){return Tc(e,t,n)}):cd(e,t,a)}function cd(e,t,a){t.status="fulfilled",t.value=a,od(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,rd(e,a)))}function Tc(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,od(t),t=t.next;while(t!==n)}e.action=null}function od(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function sd(e,t){return t}function fd(e,t){if(ge){var a=_e.formState;if(a!==null){e:{var n=ue;if(ge){if(je){t:{for(var i=je,u=wt;i.nodeType!==8;){if(!u){i=null;break t}if(i=Ut(i.nextSibling),i===null){i=null;break t}}u=i.data,i=u==="F!"||u==="F"?i:null}if(i){je=Ut(i.nextSibling),n=i.data==="F!";break e}}_a(n)}n=!1}n&&(t=a[0])}}return a=ut(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:sd,lastRenderedState:t},a.queue=n,a=Od.bind(null,ue,n),n.dispatch=a,n=Cc(!1),u=Mc.bind(null,ue,!1,n.queue),n=ut(),i={state:t,dispatch:null,action:e,pending:null},n.queue=i,a=Qv.bind(null,ue,i,u,a),i.dispatch=a,n.memoizedState=e,[t,a,!1]}function dd(e){var t=Ge();return md(t,Re,e)}function md(e,t,a){if(t=Ec(e,t,sd)[0],e=or(ca)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=Zl(t)}catch(d){throw d===Vn?Ii:d}else n=t;t=Ge();var i=t.queue,u=i.dispatch;return a!==t.memoizedState&&(ue.flags|=2048,Pn(9,{destroy:void 0},Gv.bind(null,i,a),null)),[n,u,e]}function Gv(e,t){e.action=t}function hd(e){var t=Ge(),a=Re;if(a!==null)return md(t,a,e);Ge(),t=t.memoizedState,a=Ge();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function Pn(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=ue.updateQueue,t===null&&(t=ur(),ue.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function pd(){return Ge().memoizedState}function sr(e,t,a,n){var i=ut();ue.flags|=e,i.memoizedState=Pn(1|t,{destroy:void 0},a,n===void 0?null:n)}function fr(e,t,a,n){var i=Ge();n=n===void 0?null:n;var u=i.memoizedState.inst;Re!==null&&n!==null&&gc(n,Re.memoizedState.deps)?i.memoizedState=Pn(t,u,a,n):(ue.flags|=e,i.memoizedState=Pn(1|t,u,a,n))}function gd(e,t){sr(8390656,8,e,t)}function Rc(e,t){fr(2048,8,e,t)}function Yv(e){ue.flags|=4;var t=ue.updateQueue;if(t===null)t=ur(),ue.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function vd(e){var t=Ge().memoizedState;return Yv({ref:t,nextImpl:e}),function(){if((xe&2)!==0)throw Error(c(440));return t.impl.apply(void 0,arguments)}}function yd(e,t){return fr(4,2,e,t)}function bd(e,t){return fr(4,4,e,t)}function xd(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Sd(e,t,a){a=a!=null?a.concat([e]):null,fr(4,4,xd.bind(null,t,e),a)}function Nc(){}function Ed(e,t){var a=Ge();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&gc(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function Ad(e,t){var a=Ge();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&gc(t,n[1]))return n[0];if(n=e(),mn){Ca(!0);try{e()}finally{Ca(!1)}}return a.memoizedState=[n,t],n}function Dc(e,t,a){return a===void 0||(ua&1073741824)!==0&&(me&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=Cm(),ue.lanes|=e,Ha|=e,a)}function Cd(e,t,a,n){return bt(a,t)?a:Fn.current!==null?(e=Dc(e,a,n),bt(e,t)||(Xe=!0),e):(ua&42)===0||(ua&1073741824)!==0&&(me&261930)===0?(Xe=!0,e.memoizedState=a):(e=Cm(),ue.lanes|=e,Ha|=e,t)}function Td(e,t,a,n,i){var u=K.p;K.p=u!==0&&8>u?u:8;var d=z.T,v={};z.T=v,Mc(e,!1,t,a);try{var E=i(),M=z.S;if(M!==null&&M(v,E),E!==null&&typeof E=="object"&&typeof E.then=="function"){var L=Hv(E,n);Kl(e,t,L,Tt(e))}else Kl(e,t,n,Tt(e))}catch(Q){Kl(e,t,{then:function(){},status:"rejected",reason:Q},Tt())}finally{K.p=u,d!==null&&v.types!==null&&(d.types=v.types),z.T=d}}function Vv(){}function _c(e,t,a,n){if(e.tag!==5)throw Error(c(476));var i=Rd(e).queue;Td(e,i,t,Y,a===null?Vv:function(){return Nd(e),a(n)})}function Rd(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Y,baseState:Y,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:Y},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Nd(e){var t=Rd(e);t.next===null&&(t=e.alternate.memoizedState),Kl(e,t.next.queue,{},Tt())}function Oc(){return at(fi)}function Dd(){return Ge().memoizedState}function _d(){return Ge().memoizedState}function Xv(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=Tt();e=ja(a);var n=za(t,e,a);n!==null&&(pt(n,t,a),Yl(n,t,a)),t={cache:ic()},e.payload=t;return}t=t.return}}function Fv(e,t,a){var n=Tt();a={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},dr(e)?Md(t,a):(a=Ku(e,t,a,n),a!==null&&(pt(a,e,n),jd(a,t,n)))}function Od(e,t,a){var n=Tt();Kl(e,t,a,n)}function Kl(e,t,a,n){var i={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(dr(e))Md(t,i);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=t.lastRenderedReducer,u!==null))try{var d=t.lastRenderedState,v=u(d,a);if(i.hasEagerState=!0,i.eagerState=v,bt(v,d))return Fi(e,t,i,0),_e===null&&Xi(),!1}catch{}if(a=Ku(e,t,i,n),a!==null)return pt(a,e,n),jd(a,t,n),!0}return!1}function Mc(e,t,a,n){if(n={lane:2,revertLane:oo(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},dr(e)){if(t)throw Error(c(479))}else t=Ku(e,a,n,2),t!==null&&pt(t,e,2)}function dr(e){var t=e.alternate;return e===ue||t!==null&&t===ue}function Md(e,t){Zn=ir=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function jd(e,t,a){if((a&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Us(e,a)}}var Pl={readContext:at,use:cr,useCallback:ke,useContext:ke,useEffect:ke,useImperativeHandle:ke,useLayoutEffect:ke,useInsertionEffect:ke,useMemo:ke,useReducer:ke,useRef:ke,useState:ke,useDebugValue:ke,useDeferredValue:ke,useTransition:ke,useSyncExternalStore:ke,useId:ke,useHostTransitionStatus:ke,useFormState:ke,useActionState:ke,useOptimistic:ke,useMemoCache:ke,useCacheRefresh:ke};Pl.useEffectEvent=ke;var zd={readContext:at,use:cr,useCallback:function(e,t){return ut().memoizedState=[e,t===void 0?null:t],e},useContext:at,useEffect:gd,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,sr(4194308,4,xd.bind(null,t,e),a)},useLayoutEffect:function(e,t){return sr(4194308,4,e,t)},useInsertionEffect:function(e,t){sr(4,2,e,t)},useMemo:function(e,t){var a=ut();t=t===void 0?null:t;var n=e();if(mn){Ca(!0);try{e()}finally{Ca(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=ut();if(a!==void 0){var i=a(t);if(mn){Ca(!0);try{a(t)}finally{Ca(!1)}}}else i=t;return n.memoizedState=n.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},n.queue=e,e=e.dispatch=Fv.bind(null,ue,e),[n.memoizedState,e]},useRef:function(e){var t=ut();return e={current:e},t.memoizedState=e},useState:function(e){e=Cc(e);var t=e.queue,a=Od.bind(null,ue,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Nc,useDeferredValue:function(e,t){var a=ut();return Dc(a,e,t)},useTransition:function(){var e=Cc(!1);return e=Td.bind(null,ue,e.queue,!0,!1),ut().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=ue,i=ut();if(ge){if(a===void 0)throw Error(c(407));a=a()}else{if(a=t(),_e===null)throw Error(c(349));(me&127)!==0||ed(n,t,a)}i.memoizedState=a;var u={value:a,getSnapshot:t};return i.queue=u,gd(ad.bind(null,n,u,e),[e]),n.flags|=2048,Pn(9,{destroy:void 0},td.bind(null,n,u,a,t),null),a},useId:function(){var e=ut(),t=_e.identifierPrefix;if(ge){var a=Pt,n=Kt;a=(n&~(1<<32-yt(n)-1)).toString(32)+a,t="_"+t+"R_"+a,a=rr++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=kv++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Oc,useFormState:fd,useActionState:fd,useOptimistic:function(e){var t=ut();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=Mc.bind(null,ue,!0,a),a.dispatch=t,[e,t]},useMemoCache:Sc,useCacheRefresh:function(){return ut().memoizedState=Xv.bind(null,ue)},useEffectEvent:function(e){var t=ut(),a={impl:e};return t.memoizedState=a,function(){if((xe&2)!==0)throw Error(c(440));return a.impl.apply(void 0,arguments)}}},jc={readContext:at,use:cr,useCallback:Ed,useContext:at,useEffect:Rc,useImperativeHandle:Sd,useInsertionEffect:yd,useLayoutEffect:bd,useMemo:Ad,useReducer:or,useRef:pd,useState:function(){return or(ca)},useDebugValue:Nc,useDeferredValue:function(e,t){var a=Ge();return Cd(a,Re.memoizedState,e,t)},useTransition:function(){var e=or(ca)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Zl(e),t]},useSyncExternalStore:If,useId:Dd,useHostTransitionStatus:Oc,useFormState:dd,useActionState:dd,useOptimistic:function(e,t){var a=Ge();return id(a,Re,e,t)},useMemoCache:Sc,useCacheRefresh:_d};jc.useEffectEvent=vd;var wd={readContext:at,use:cr,useCallback:Ed,useContext:at,useEffect:Rc,useImperativeHandle:Sd,useInsertionEffect:yd,useLayoutEffect:bd,useMemo:Ad,useReducer:Ac,useRef:pd,useState:function(){return Ac(ca)},useDebugValue:Nc,useDeferredValue:function(e,t){var a=Ge();return Re===null?Dc(a,e,t):Cd(a,Re.memoizedState,e,t)},useTransition:function(){var e=Ac(ca)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Zl(e),t]},useSyncExternalStore:If,useId:Dd,useHostTransitionStatus:Oc,useFormState:hd,useActionState:hd,useOptimistic:function(e,t){var a=Ge();return Re!==null?id(a,Re,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Sc,useCacheRefresh:_d};wd.useEffectEvent=vd;function zc(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:x({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var wc={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=Tt(),i=ja(n);i.payload=t,a!=null&&(i.callback=a),t=za(e,i,n),t!==null&&(pt(t,e,n),Yl(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=Tt(),i=ja(n);i.tag=1,i.payload=t,a!=null&&(i.callback=a),t=za(e,i,n),t!==null&&(pt(t,e,n),Yl(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=Tt(),n=ja(a);n.tag=2,t!=null&&(n.callback=t),t=za(e,n,a),t!==null&&(pt(t,e,a),Yl(t,e,a))}};function Ld(e,t,a,n,i,u,d){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,u,d):t.prototype&&t.prototype.isPureReactComponent?!Ll(a,n)||!Ll(i,u):!0}function Ud(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&wc.enqueueReplaceState(t,t.state,null)}function hn(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=x({},a));for(var i in e)a[i]===void 0&&(a[i]=e[i])}return a}function Bd(e){Vi(e)}function Hd(e){console.error(e)}function kd(e){Vi(e)}function mr(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function qd(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function Lc(e,t,a){return a=ja(a),a.tag=3,a.payload={element:null},a.callback=function(){mr(e,t)},a}function Qd(e){return e=ja(e),e.tag=3,e}function Gd(e,t,a,n){var i=a.type.getDerivedStateFromError;if(typeof i=="function"){var u=n.value;e.payload=function(){return i(u)},e.callback=function(){qd(t,a,n)}}var d=a.stateNode;d!==null&&typeof d.componentDidCatch=="function"&&(e.callback=function(){qd(t,a,n),typeof i!="function"&&(ka===null?ka=new Set([this]):ka.add(this));var v=n.stack;this.componentDidCatch(n.value,{componentStack:v!==null?v:""})})}function Zv(e,t,a,n,i){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&Qn(t,a,i,!0),a=St.current,a!==null){switch(a.tag){case 31:case 13:return Lt===null?Tr():a.alternate===null&&qe===0&&(qe=3),a.flags&=-257,a.flags|=65536,a.lanes=i,n===er?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),ro(e,n,i)),!1;case 22:return a.flags|=65536,n===er?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),ro(e,n,i)),!1}throw Error(c(435,a.tag))}return ro(e,n,i),Tr(),!1}if(ge)return t=St.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=i,n!==ec&&(e=Error(c(422),{cause:n}),Hl(Mt(e,a)))):(n!==ec&&(t=Error(c(423),{cause:n}),Hl(Mt(t,a))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,n=Mt(n,a),i=Lc(e.stateNode,n,i),fc(e,i),qe!==4&&(qe=2)),!1;var u=Error(c(520),{cause:n});if(u=Mt(u,a),ni===null?ni=[u]:ni.push(u),qe!==4&&(qe=2),t===null)return!0;n=Mt(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=i&-i,a.lanes|=e,e=Lc(a.stateNode,n,e),fc(a,e),!1;case 1:if(t=a.type,u=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(ka===null||!ka.has(u))))return a.flags|=65536,i&=-i,a.lanes|=i,i=Qd(i),Gd(i,e,a,n),fc(a,i),!1}a=a.return}while(a!==null);return!1}var Uc=Error(c(461)),Xe=!1;function nt(e,t,a,n){t.child=e===null?Ff(t,null,a,n):dn(t,e.child,a,n)}function Yd(e,t,a,n,i){a=a.render;var u=t.ref;if("ref"in n){var d={};for(var v in n)v!=="ref"&&(d[v]=n[v])}else d=n;return cn(t),n=vc(e,t,a,d,u,i),v=yc(),e!==null&&!Xe?(bc(e,t,i),oa(e,t,i)):(ge&&v&&Wu(t),t.flags|=1,nt(e,t,n,i),t.child)}function Vd(e,t,a,n,i){if(e===null){var u=a.type;return typeof u=="function"&&!Pu(u)&&u.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=u,Xd(e,t,u,n,i)):(e=Ki(a.type,null,n,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(u=e.child,!Vc(e,i)){var d=u.memoizedProps;if(a=a.compare,a=a!==null?a:Ll,a(d,n)&&e.ref===t.ref)return oa(e,t,i)}return t.flags|=1,e=na(u,n),e.ref=t.ref,e.return=t,t.child=e}function Xd(e,t,a,n,i){if(e!==null){var u=e.memoizedProps;if(Ll(u,n)&&e.ref===t.ref)if(Xe=!1,t.pendingProps=n=u,Vc(e,i))(e.flags&131072)!==0&&(Xe=!0);else return t.lanes=e.lanes,oa(e,t,i)}return Bc(e,t,a,n,i)}function Fd(e,t,a,n){var i=n.children,u=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((t.flags&128)!==0){if(u=u!==null?u.baseLanes|a:a,e!==null){for(n=t.child=e.child,i=0;n!==null;)i=i|n.lanes|n.childLanes,n=n.sibling;n=i&~u}else n=0,t.child=null;return Zd(e,t,u,a,n)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Wi(t,u!==null?u.cachePool:null),u!==null?Pf(t,u):mc(),Jf(t);else return n=t.lanes=536870912,Zd(e,t,u!==null?u.baseLanes|a:a,a,n)}else u!==null?(Wi(t,u.cachePool),Pf(t,u),La(),t.memoizedState=null):(e!==null&&Wi(t,null),mc(),La());return nt(e,t,i,a),t.child}function Jl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Zd(e,t,a,n,i){var u=uc();return u=u===null?null:{parent:Ye._currentValue,pool:u},t.memoizedState={baseLanes:a,cachePool:u},e!==null&&Wi(t,null),mc(),Jf(t),e!==null&&Qn(e,t,n,!0),t.childLanes=i,null}function hr(e,t){return t=gr({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Kd(e,t,a){return dn(t,e.child,null,a),e=hr(t,t.pendingProps),e.flags|=2,Et(t),t.memoizedState=null,e}function Kv(e,t,a){var n=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ge){if(n.mode==="hidden")return e=hr(t,n),t.lanes=536870912,Jl(null,e);if(pc(t),(e=je)?(e=rh(e,wt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Na!==null?{id:Kt,overflow:Pt}:null,retryLane:536870912,hydrationErrors:null},a=Mf(e),a.return=t,t.child=a,tt=t,je=null)):e=null,e===null)throw _a(t);return t.lanes=536870912,null}return hr(t,n)}var u=e.memoizedState;if(u!==null){var d=u.dehydrated;if(pc(t),i)if(t.flags&256)t.flags&=-257,t=Kd(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(c(558));else if(Xe||Qn(e,t,a,!1),i=(a&e.childLanes)!==0,Xe||i){if(n=_e,n!==null&&(d=Bs(n,a),d!==0&&d!==u.retryLane))throw u.retryLane=d,nn(e,d),pt(n,e,d),Uc;Tr(),t=Kd(e,t,a)}else e=u.treeContext,je=Ut(d.nextSibling),tt=t,ge=!0,Da=null,wt=!1,e!==null&&wf(t,e),t=hr(t,n),t.flags|=4096;return t}return e=na(e.child,{mode:n.mode,children:n.children}),e.ref=t.ref,t.child=e,e.return=t,e}function pr(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(c(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Bc(e,t,a,n,i){return cn(t),a=vc(e,t,a,n,void 0,i),n=yc(),e!==null&&!Xe?(bc(e,t,i),oa(e,t,i)):(ge&&n&&Wu(t),t.flags|=1,nt(e,t,a,i),t.child)}function Pd(e,t,a,n,i,u){return cn(t),t.updateQueue=null,a=Wf(t,n,a,i),$f(e),n=yc(),e!==null&&!Xe?(bc(e,t,u),oa(e,t,u)):(ge&&n&&Wu(t),t.flags|=1,nt(e,t,a,u),t.child)}function Jd(e,t,a,n,i){if(cn(t),t.stateNode===null){var u=Bn,d=a.contextType;typeof d=="object"&&d!==null&&(u=at(d)),u=new a(n,u),t.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=wc,t.stateNode=u,u._reactInternals=t,u=t.stateNode,u.props=n,u.state=t.memoizedState,u.refs={},oc(t),d=a.contextType,u.context=typeof d=="object"&&d!==null?at(d):Bn,u.state=t.memoizedState,d=a.getDerivedStateFromProps,typeof d=="function"&&(zc(t,a,d,n),u.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(d=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),d!==u.state&&wc.enqueueReplaceState(u,u.state,null),Xl(t,n,u,i),Vl(),u.state=t.memoizedState),typeof u.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){u=t.stateNode;var v=t.memoizedProps,E=hn(a,v);u.props=E;var M=u.context,L=a.contextType;d=Bn,typeof L=="object"&&L!==null&&(d=at(L));var Q=a.getDerivedStateFromProps;L=typeof Q=="function"||typeof u.getSnapshotBeforeUpdate=="function",v=t.pendingProps!==v,L||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(v||M!==d)&&Ud(t,u,n,d),Ma=!1;var j=t.memoizedState;u.state=j,Xl(t,n,u,i),Vl(),M=t.memoizedState,v||j!==M||Ma?(typeof Q=="function"&&(zc(t,a,Q,n),M=t.memoizedState),(E=Ma||Ld(t,a,E,n,j,M,d))?(L||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=M),u.props=n,u.state=M,u.context=d,n=E):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{u=t.stateNode,sc(e,t),d=t.memoizedProps,L=hn(a,d),u.props=L,Q=t.pendingProps,j=u.context,M=a.contextType,E=Bn,typeof M=="object"&&M!==null&&(E=at(M)),v=a.getDerivedStateFromProps,(M=typeof v=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(d!==Q||j!==E)&&Ud(t,u,n,E),Ma=!1,j=t.memoizedState,u.state=j,Xl(t,n,u,i),Vl();var w=t.memoizedState;d!==Q||j!==w||Ma||e!==null&&e.dependencies!==null&&Ji(e.dependencies)?(typeof v=="function"&&(zc(t,a,v,n),w=t.memoizedState),(L=Ma||Ld(t,a,L,n,j,w,E)||e!==null&&e.dependencies!==null&&Ji(e.dependencies))?(M||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(n,w,E),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(n,w,E)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||d===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||d===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=w),u.props=n,u.state=w,u.context=E,n=L):(typeof u.componentDidUpdate!="function"||d===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||d===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),n=!1)}return u=n,pr(e,t),n=(t.flags&128)!==0,u||n?(u=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:u.render(),t.flags|=1,e!==null&&n?(t.child=dn(t,e.child,null,i),t.child=dn(t,null,a,i)):nt(e,t,a,i),t.memoizedState=u.state,e=t.child):e=oa(e,t,i),e}function $d(e,t,a,n){return rn(),t.flags|=256,nt(e,t,a,n),t.child}var Hc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function kc(e){return{baseLanes:e,cachePool:qf()}}function qc(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=Ct),e}function Wd(e,t,a){var n=t.pendingProps,i=!1,u=(t.flags&128)!==0,d;if((d=u)||(d=e!==null&&e.memoizedState===null?!1:(Qe.current&2)!==0),d&&(i=!0,t.flags&=-129),d=(t.flags&32)!==0,t.flags&=-33,e===null){if(ge){if(i?wa(t):La(),(e=je)?(e=rh(e,wt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Na!==null?{id:Kt,overflow:Pt}:null,retryLane:536870912,hydrationErrors:null},a=Mf(e),a.return=t,t.child=a,tt=t,je=null)):e=null,e===null)throw _a(t);return Ao(e)?t.lanes=32:t.lanes=536870912,null}var v=n.children;return n=n.fallback,i?(La(),i=t.mode,v=gr({mode:"hidden",children:v},i),n=ln(n,i,a,null),v.return=t,n.return=t,v.sibling=n,t.child=v,n=t.child,n.memoizedState=kc(a),n.childLanes=qc(e,d,a),t.memoizedState=Hc,Jl(null,n)):(wa(t),Qc(t,v))}var E=e.memoizedState;if(E!==null&&(v=E.dehydrated,v!==null)){if(u)t.flags&256?(wa(t),t.flags&=-257,t=Gc(e,t,a)):t.memoizedState!==null?(La(),t.child=e.child,t.flags|=128,t=null):(La(),v=n.fallback,i=t.mode,n=gr({mode:"visible",children:n.children},i),v=ln(v,i,a,null),v.flags|=2,n.return=t,v.return=t,n.sibling=v,t.child=n,dn(t,e.child,null,a),n=t.child,n.memoizedState=kc(a),n.childLanes=qc(e,d,a),t.memoizedState=Hc,t=Jl(null,n));else if(wa(t),Ao(v)){if(d=v.nextSibling&&v.nextSibling.dataset,d)var M=d.dgst;d=M,n=Error(c(419)),n.stack="",n.digest=d,Hl({value:n,source:null,stack:null}),t=Gc(e,t,a)}else if(Xe||Qn(e,t,a,!1),d=(a&e.childLanes)!==0,Xe||d){if(d=_e,d!==null&&(n=Bs(d,a),n!==0&&n!==E.retryLane))throw E.retryLane=n,nn(e,n),pt(d,e,n),Uc;Eo(v)||Tr(),t=Gc(e,t,a)}else Eo(v)?(t.flags|=192,t.child=e.child,t=null):(e=E.treeContext,je=Ut(v.nextSibling),tt=t,ge=!0,Da=null,wt=!1,e!==null&&wf(t,e),t=Qc(t,n.children),t.flags|=4096);return t}return i?(La(),v=n.fallback,i=t.mode,E=e.child,M=E.sibling,n=na(E,{mode:"hidden",children:n.children}),n.subtreeFlags=E.subtreeFlags&65011712,M!==null?v=na(M,v):(v=ln(v,i,a,null),v.flags|=2),v.return=t,n.return=t,n.sibling=v,t.child=n,Jl(null,n),n=t.child,v=e.child.memoizedState,v===null?v=kc(a):(i=v.cachePool,i!==null?(E=Ye._currentValue,i=i.parent!==E?{parent:E,pool:E}:i):i=qf(),v={baseLanes:v.baseLanes|a,cachePool:i}),n.memoizedState=v,n.childLanes=qc(e,d,a),t.memoizedState=Hc,Jl(e.child,n)):(wa(t),a=e.child,e=a.sibling,a=na(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(d=t.deletions,d===null?(t.deletions=[e],t.flags|=16):d.push(e)),t.child=a,t.memoizedState=null,a)}function Qc(e,t){return t=gr({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function gr(e,t){return e=xt(22,e,null,t),e.lanes=0,e}function Gc(e,t,a){return dn(t,e.child,null,a),e=Qc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Id(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),nc(e.return,t,a)}function Yc(e,t,a,n,i,u){var d=e.memoizedState;d===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:i,treeForkCount:u}:(d.isBackwards=t,d.rendering=null,d.renderingStartTime=0,d.last=n,d.tail=a,d.tailMode=i,d.treeForkCount=u)}function em(e,t,a){var n=t.pendingProps,i=n.revealOrder,u=n.tail;n=n.children;var d=Qe.current,v=(d&2)!==0;if(v?(d=d&1|2,t.flags|=128):d&=1,X(Qe,d),nt(e,t,n,a),n=ge?Bl:0,!v&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Id(e,a,t);else if(e.tag===19)Id(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(a=t.child,i=null;a!==null;)e=a.alternate,e!==null&&lr(e)===null&&(i=a),a=a.sibling;a=i,a===null?(i=t.child,t.child=null):(i=a.sibling,a.sibling=null),Yc(t,!1,i,a,u,n);break;case"backwards":case"unstable_legacy-backwards":for(a=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&lr(e)===null){t.child=i;break}e=i.sibling,i.sibling=a,a=i,i=e}Yc(t,!0,a,null,u,n);break;case"together":Yc(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function oa(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Ha|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(Qn(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(c(153));if(t.child!==null){for(e=t.child,a=na(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=na(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Vc(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ji(e)))}function Pv(e,t,a){switch(t.tag){case 3:Pe(t,t.stateNode.containerInfo),Oa(t,Ye,e.memoizedState.cache),rn();break;case 27:case 5:Zt(t);break;case 4:Pe(t,t.stateNode.containerInfo);break;case 10:Oa(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,pc(t),null;break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(wa(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Wd(e,t,a):(wa(t),e=oa(e,t,a),e!==null?e.sibling:null);wa(t);break;case 19:var i=(e.flags&128)!==0;if(n=(a&t.childLanes)!==0,n||(Qn(e,t,a,!1),n=(a&t.childLanes)!==0),i){if(n)return em(e,t,a);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),X(Qe,Qe.current),n)break;return null;case 22:return t.lanes=0,Fd(e,t,a,t.pendingProps);case 24:Oa(t,Ye,e.memoizedState.cache)}return oa(e,t,a)}function tm(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Xe=!0;else{if(!Vc(e,a)&&(t.flags&128)===0)return Xe=!1,Pv(e,t,a);Xe=(e.flags&131072)!==0}else Xe=!1,ge&&(t.flags&1048576)!==0&&zf(t,Bl,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=sn(t.elementType),t.type=e,typeof e=="function")Pu(e)?(n=hn(e,n),t.tag=1,t=Jd(null,t,e,n,a)):(t.tag=0,t=Bc(null,t,e,n,a));else{if(e!=null){var i=e.$$typeof;if(i===G){t.tag=11,t=Yd(null,t,e,n,a);break e}else if(i===Z){t.tag=14,t=Vd(null,t,e,n,a);break e}}throw t=Ie(e)||e,Error(c(306,t,""))}}return t;case 0:return Bc(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,i=hn(n,t.pendingProps),Jd(e,t,n,i,a);case 3:e:{if(Pe(t,t.stateNode.containerInfo),e===null)throw Error(c(387));n=t.pendingProps;var u=t.memoizedState;i=u.element,sc(e,t),Xl(t,n,null,a);var d=t.memoizedState;if(n=d.cache,Oa(t,Ye,n),n!==u.cache&&lc(t,[Ye],a,!0),Vl(),n=d.element,u.isDehydrated)if(u={element:n,isDehydrated:!1,cache:d.cache},t.updateQueue.baseState=u,t.memoizedState=u,t.flags&256){t=$d(e,t,n,a);break e}else if(n!==i){i=Mt(Error(c(424)),t),Hl(i),t=$d(e,t,n,a);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,je=Ut(e.firstChild),tt=t,ge=!0,Da=null,wt=!0,a=Ff(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(rn(),n===i){t=oa(e,t,a);break e}nt(e,t,n,a)}t=t.child}return t;case 26:return pr(e,t),e===null?(a=dh(t.type,null,t.pendingProps,null))?t.memoizedState=a:ge||(a=t.type,e=t.pendingProps,n=jr(oe.current).createElement(a),n[et]=t,n[ot]=e,lt(n,a,e),Je(n),t.stateNode=n):t.memoizedState=dh(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Zt(t),e===null&&ge&&(n=t.stateNode=oh(t.type,t.pendingProps,oe.current),tt=t,wt=!0,i=je,Ya(t.type)?(Co=i,je=Ut(n.firstChild)):je=i),nt(e,t,t.pendingProps.children,a),pr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ge&&((i=n=je)&&(n=T1(n,t.type,t.pendingProps,wt),n!==null?(t.stateNode=n,tt=t,je=Ut(n.firstChild),wt=!1,i=!0):i=!1),i||_a(t)),Zt(t),i=t.type,u=t.pendingProps,d=e!==null?e.memoizedProps:null,n=u.children,bo(i,u)?n=null:d!==null&&bo(i,d)&&(t.flags|=32),t.memoizedState!==null&&(i=vc(e,t,qv,null,null,a),fi._currentValue=i),pr(e,t),nt(e,t,n,a),t.child;case 6:return e===null&&ge&&((e=a=je)&&(a=R1(a,t.pendingProps,wt),a!==null?(t.stateNode=a,tt=t,je=null,e=!0):e=!1),e||_a(t)),null;case 13:return Wd(e,t,a);case 4:return Pe(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=dn(t,null,n,a):nt(e,t,n,a),t.child;case 11:return Yd(e,t,t.type,t.pendingProps,a);case 7:return nt(e,t,t.pendingProps,a),t.child;case 8:return nt(e,t,t.pendingProps.children,a),t.child;case 12:return nt(e,t,t.pendingProps.children,a),t.child;case 10:return n=t.pendingProps,Oa(t,t.type,n.value),nt(e,t,n.children,a),t.child;case 9:return i=t.type._context,n=t.pendingProps.children,cn(t),i=at(i),n=n(i),t.flags|=1,nt(e,t,n,a),t.child;case 14:return Vd(e,t,t.type,t.pendingProps,a);case 15:return Xd(e,t,t.type,t.pendingProps,a);case 19:return em(e,t,a);case 31:return Kv(e,t,a);case 22:return Fd(e,t,a,t.pendingProps);case 24:return cn(t),n=at(Ye),e===null?(i=uc(),i===null&&(i=_e,u=ic(),i.pooledCache=u,u.refCount++,u!==null&&(i.pooledCacheLanes|=a),i=u),t.memoizedState={parent:n,cache:i},oc(t),Oa(t,Ye,i)):((e.lanes&a)!==0&&(sc(e,t),Xl(t,null,null,a),Vl()),i=e.memoizedState,u=t.memoizedState,i.parent!==n?(i={parent:n,cache:n},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),Oa(t,Ye,n)):(n=u.cache,Oa(t,Ye,n),n!==i.cache&&lc(t,[Ye],a,!0))),nt(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(c(156,t.tag))}function sa(e){e.flags|=4}function Xc(e,t,a,n,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Dm())e.flags|=8192;else throw fn=er,cc}else e.flags&=-16777217}function am(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!vh(t))if(Dm())e.flags|=8192;else throw fn=er,cc}function vr(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?ws():536870912,e.lanes|=t,In|=t)}function $l(e,t){if(!ge)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function ze(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags&65011712,n|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags,n|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function Jv(e,t,a){var n=t.pendingProps;switch(Iu(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ze(t),null;case 1:return ze(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ra(Ye),Me(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(qn(t)?sa(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,tc())),ze(t),null;case 26:var i=t.type,u=t.memoizedState;return e===null?(sa(t),u!==null?(ze(t),am(t,u)):(ze(t),Xc(t,i,null,n,a))):u?u!==e.memoizedState?(sa(t),ze(t),am(t,u)):(ze(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&sa(t),ze(t),Xc(t,i,e,n,a)),null;case 27:if(Ea(t),a=oe.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&sa(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return ze(t),null}e=J.current,qn(t)?Lf(t):(e=oh(i,n,a),t.stateNode=e,sa(t))}return ze(t),null;case 5:if(Ea(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&sa(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return ze(t),null}if(u=J.current,qn(t))Lf(t);else{var d=jr(oe.current);switch(u){case 1:u=d.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:u=d.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":u=d.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":u=d.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":u=d.createElement("div"),u.innerHTML="<script><\/script>",u=u.removeChild(u.firstChild);break;case"select":u=typeof n.is=="string"?d.createElement("select",{is:n.is}):d.createElement("select"),n.multiple?u.multiple=!0:n.size&&(u.size=n.size);break;default:u=typeof n.is=="string"?d.createElement(i,{is:n.is}):d.createElement(i)}}u[et]=t,u[ot]=n;e:for(d=t.child;d!==null;){if(d.tag===5||d.tag===6)u.appendChild(d.stateNode);else if(d.tag!==4&&d.tag!==27&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;d=d.return}d.sibling.return=d.return,d=d.sibling}t.stateNode=u;e:switch(lt(u,i,n),i){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&sa(t)}}return ze(t),Xc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&sa(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(c(166));if(e=oe.current,qn(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,i=tt,i!==null)switch(i.tag){case 27:case 5:n=i.memoizedProps}e[et]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||Wm(e.nodeValue,a)),e||_a(t,!0)}else e=jr(e).createTextNode(n),e[et]=t,t.stateNode=e}return ze(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(n=qn(t),a!==null){if(e===null){if(!n)throw Error(c(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(557));e[et]=t}else rn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ze(t),e=!1}else a=tc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(Et(t),t):(Et(t),null);if((t.flags&128)!==0)throw Error(c(558))}return ze(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=qn(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(c(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(c(317));i[et]=t}else rn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ze(t),i=!1}else i=tc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(Et(t),t):(Et(t),null)}return Et(t),(t.flags&128)!==0?(t.lanes=a,t):(a=n!==null,e=e!==null&&e.memoizedState!==null,a&&(n=t.child,i=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(i=n.alternate.memoizedState.cachePool.pool),u=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(u=n.memoizedState.cachePool.pool),u!==i&&(n.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),vr(t,t.updateQueue),ze(t),null);case 4:return Me(),e===null&&ho(t.stateNode.containerInfo),ze(t),null;case 10:return ra(t.type),ze(t),null;case 19:if(q(Qe),n=t.memoizedState,n===null)return ze(t),null;if(i=(t.flags&128)!==0,u=n.rendering,u===null)if(i)$l(n,!1);else{if(qe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=lr(e),u!==null){for(t.flags|=128,$l(n,!1),e=u.updateQueue,t.updateQueue=e,vr(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Of(a,e),a=a.sibling;return X(Qe,Qe.current&1|2),ge&&la(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&gt()>Er&&(t.flags|=128,i=!0,$l(n,!1),t.lanes=4194304)}else{if(!i)if(e=lr(u),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,vr(t,e),$l(n,!0),n.tail===null&&n.tailMode==="hidden"&&!u.alternate&&!ge)return ze(t),null}else 2*gt()-n.renderingStartTime>Er&&a!==536870912&&(t.flags|=128,i=!0,$l(n,!1),t.lanes=4194304);n.isBackwards?(u.sibling=t.child,t.child=u):(e=n.last,e!==null?e.sibling=u:t.child=u,n.last=u)}return n.tail!==null?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=gt(),e.sibling=null,a=Qe.current,X(Qe,i?a&1|2:a&1),ge&&la(t,n.treeForkCount),e):(ze(t),null);case 22:case 23:return Et(t),hc(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(a&536870912)!==0&&(t.flags&128)===0&&(ze(t),t.subtreeFlags&6&&(t.flags|=8192)):ze(t),a=t.updateQueue,a!==null&&vr(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&q(on),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),ra(Ye),ze(t),null;case 25:return null;case 30:return null}throw Error(c(156,t.tag))}function $v(e,t){switch(Iu(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ra(Ye),Me(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ea(t),null;case 31:if(t.memoizedState!==null){if(Et(t),t.alternate===null)throw Error(c(340));rn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Et(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(c(340));rn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return q(Qe),null;case 4:return Me(),null;case 10:return ra(t.type),null;case 22:case 23:return Et(t),hc(),e!==null&&q(on),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ra(Ye),null;case 25:return null;default:return null}}function nm(e,t){switch(Iu(t),t.tag){case 3:ra(Ye),Me();break;case 26:case 27:case 5:Ea(t);break;case 4:Me();break;case 31:t.memoizedState!==null&&Et(t);break;case 13:Et(t);break;case 19:q(Qe);break;case 10:ra(t.type);break;case 22:case 23:Et(t),hc(),e!==null&&q(on);break;case 24:ra(Ye)}}function Wl(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var i=n.next;a=i;do{if((a.tag&e)===e){n=void 0;var u=a.create,d=a.inst;n=u(),d.destroy=n}a=a.next}while(a!==i)}}catch(v){Ce(t,t.return,v)}}function Ua(e,t,a){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var u=i.next;n=u;do{if((n.tag&e)===e){var d=n.inst,v=d.destroy;if(v!==void 0){d.destroy=void 0,i=t;var E=a,M=v;try{M()}catch(L){Ce(i,E,L)}}}n=n.next}while(n!==u)}}catch(L){Ce(t,t.return,L)}}function lm(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Kf(t,a)}catch(n){Ce(e,e.return,n)}}}function im(e,t,a){a.props=hn(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){Ce(e,t,n)}}function Il(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(i){Ce(e,t,i)}}function Jt(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(i){Ce(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(i){Ce(e,t,i)}else a.current=null}function rm(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(i){Ce(e,e.return,i)}}function Fc(e,t,a){try{var n=e.stateNode;b1(n,e.type,a,t),n[ot]=t}catch(i){Ce(e,e.return,i)}}function um(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ya(e.type)||e.tag===4}function Zc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||um(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ya(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Kc(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=ta));else if(n!==4&&(n===27&&Ya(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Kc(e,t,a),e=e.sibling;e!==null;)Kc(e,t,a),e=e.sibling}function yr(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(n!==4&&(n===27&&Ya(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(yr(e,t,a),e=e.sibling;e!==null;)yr(e,t,a),e=e.sibling}function cm(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);lt(t,n,a),t[et]=e,t[ot]=a}catch(u){Ce(e,e.return,u)}}var fa=!1,Fe=!1,Pc=!1,om=typeof WeakSet=="function"?WeakSet:Set,$e=null;function Wv(e,t){if(e=e.containerInfo,vo=kr,e=Sf(e),Gu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var n=a.getSelection&&a.getSelection();if(n&&n.rangeCount!==0){a=n.anchorNode;var i=n.anchorOffset,u=n.focusNode;n=n.focusOffset;try{a.nodeType,u.nodeType}catch{a=null;break e}var d=0,v=-1,E=-1,M=0,L=0,Q=e,j=null;t:for(;;){for(var w;Q!==a||i!==0&&Q.nodeType!==3||(v=d+i),Q!==u||n!==0&&Q.nodeType!==3||(E=d+n),Q.nodeType===3&&(d+=Q.nodeValue.length),(w=Q.firstChild)!==null;)j=Q,Q=w;for(;;){if(Q===e)break t;if(j===a&&++M===i&&(v=d),j===u&&++L===n&&(E=d),(w=Q.nextSibling)!==null)break;Q=j,j=Q.parentNode}Q=w}a=v===-1||E===-1?null:{start:v,end:E}}else a=null}a=a||{start:0,end:0}}else a=null;for(yo={focusedElem:e,selectionRange:a},kr=!1,$e=t;$e!==null;)if(t=$e,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,$e=e;else for(;$e!==null;){switch(t=$e,u=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)i=e[a],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&u!==null){e=void 0,a=t,i=u.memoizedProps,u=u.memoizedState,n=a.stateNode;try{var $=hn(a.type,i);e=n.getSnapshotBeforeUpdate($,u),n.__reactInternalSnapshotBeforeUpdate=e}catch(ne){Ce(a,a.return,ne)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)So(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":So(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(c(163))}if(e=t.sibling,e!==null){e.return=t.return,$e=e;break}$e=t.return}}function sm(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:ma(e,a),n&4&&Wl(5,a);break;case 1:if(ma(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(d){Ce(a,a.return,d)}else{var i=hn(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(d){Ce(a,a.return,d)}}n&64&&lm(a),n&512&&Il(a,a.return);break;case 3:if(ma(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Kf(e,t)}catch(d){Ce(a,a.return,d)}}break;case 27:t===null&&n&4&&cm(a);case 26:case 5:ma(e,a),t===null&&n&4&&rm(a),n&512&&Il(a,a.return);break;case 12:ma(e,a);break;case 31:ma(e,a),n&4&&mm(e,a);break;case 13:ma(e,a),n&4&&hm(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=u1.bind(null,a),N1(e,a))));break;case 22:if(n=a.memoizedState!==null||fa,!n){t=t!==null&&t.memoizedState!==null||Fe,i=fa;var u=Fe;fa=n,(Fe=t)&&!u?ha(e,a,(a.subtreeFlags&8772)!==0):ma(e,a),fa=i,Fe=u}break;case 30:break;default:ma(e,a)}}function fm(e){var t=e.alternate;t!==null&&(e.alternate=null,fm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Tu(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ue=null,ft=!1;function da(e,t,a){for(a=a.child;a!==null;)dm(e,t,a),a=a.sibling}function dm(e,t,a){if(vt&&typeof vt.onCommitFiberUnmount=="function")try{vt.onCommitFiberUnmount(Al,a)}catch{}switch(a.tag){case 26:Fe||Jt(a,t),da(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Fe||Jt(a,t);var n=Ue,i=ft;Ya(a.type)&&(Ue=a.stateNode,ft=!1),da(e,t,a),ci(a.stateNode),Ue=n,ft=i;break;case 5:Fe||Jt(a,t);case 6:if(n=Ue,i=ft,Ue=null,da(e,t,a),Ue=n,ft=i,Ue!==null)if(ft)try{(Ue.nodeType===9?Ue.body:Ue.nodeName==="HTML"?Ue.ownerDocument.body:Ue).removeChild(a.stateNode)}catch(u){Ce(a,t,u)}else try{Ue.removeChild(a.stateNode)}catch(u){Ce(a,t,u)}break;case 18:Ue!==null&&(ft?(e=Ue,lh(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),ul(e)):lh(Ue,a.stateNode));break;case 4:n=Ue,i=ft,Ue=a.stateNode.containerInfo,ft=!0,da(e,t,a),Ue=n,ft=i;break;case 0:case 11:case 14:case 15:Ua(2,a,t),Fe||Ua(4,a,t),da(e,t,a);break;case 1:Fe||(Jt(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&im(a,t,n)),da(e,t,a);break;case 21:da(e,t,a);break;case 22:Fe=(n=Fe)||a.memoizedState!==null,da(e,t,a),Fe=n;break;default:da(e,t,a)}}function mm(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ul(e)}catch(a){Ce(t,t.return,a)}}}function hm(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ul(e)}catch(a){Ce(t,t.return,a)}}function Iv(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new om),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new om),t;default:throw Error(c(435,e.tag))}}function br(e,t){var a=Iv(e);t.forEach(function(n){if(!a.has(n)){a.add(n);var i=c1.bind(null,e,n);n.then(i,i)}})}function dt(e,t){var a=t.deletions;if(a!==null)for(var n=0;n<a.length;n++){var i=a[n],u=e,d=t,v=d;e:for(;v!==null;){switch(v.tag){case 27:if(Ya(v.type)){Ue=v.stateNode,ft=!1;break e}break;case 5:Ue=v.stateNode,ft=!1;break e;case 3:case 4:Ue=v.stateNode.containerInfo,ft=!0;break e}v=v.return}if(Ue===null)throw Error(c(160));dm(u,d,i),Ue=null,ft=!1,u=i.alternate,u!==null&&(u.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)pm(t,e),t=t.sibling}var Gt=null;function pm(e,t){var a=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:dt(t,e),mt(e),n&4&&(Ua(3,e,e.return),Wl(3,e),Ua(5,e,e.return));break;case 1:dt(t,e),mt(e),n&512&&(Fe||a===null||Jt(a,a.return)),n&64&&fa&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:var i=Gt;if(dt(t,e),mt(e),n&512&&(Fe||a===null||Jt(a,a.return)),n&4){var u=a!==null?a.memoizedState:null;if(n=e.memoizedState,a===null)if(n===null)if(e.stateNode===null){e:{n=e.type,a=e.memoizedProps,i=i.ownerDocument||i;t:switch(n){case"title":u=i.getElementsByTagName("title")[0],(!u||u[Rl]||u[et]||u.namespaceURI==="http://www.w3.org/2000/svg"||u.hasAttribute("itemprop"))&&(u=i.createElement(n),i.head.insertBefore(u,i.querySelector("head > title"))),lt(u,n,a),u[et]=e,Je(u),n=u;break e;case"link":var d=ph("link","href",i).get(n+(a.href||""));if(d){for(var v=0;v<d.length;v++)if(u=d[v],u.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&u.getAttribute("rel")===(a.rel==null?null:a.rel)&&u.getAttribute("title")===(a.title==null?null:a.title)&&u.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){d.splice(v,1);break t}}u=i.createElement(n),lt(u,n,a),i.head.appendChild(u);break;case"meta":if(d=ph("meta","content",i).get(n+(a.content||""))){for(v=0;v<d.length;v++)if(u=d[v],u.getAttribute("content")===(a.content==null?null:""+a.content)&&u.getAttribute("name")===(a.name==null?null:a.name)&&u.getAttribute("property")===(a.property==null?null:a.property)&&u.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&u.getAttribute("charset")===(a.charSet==null?null:a.charSet)){d.splice(v,1);break t}}u=i.createElement(n),lt(u,n,a),i.head.appendChild(u);break;default:throw Error(c(468,n))}u[et]=e,Je(u),n=u}e.stateNode=n}else gh(i,e.type,e.stateNode);else e.stateNode=hh(i,n,e.memoizedProps);else u!==n?(u===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):u.count--,n===null?gh(i,e.type,e.stateNode):hh(i,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Fc(e,e.memoizedProps,a.memoizedProps)}break;case 27:dt(t,e),mt(e),n&512&&(Fe||a===null||Jt(a,a.return)),a!==null&&n&4&&Fc(e,e.memoizedProps,a.memoizedProps);break;case 5:if(dt(t,e),mt(e),n&512&&(Fe||a===null||Jt(a,a.return)),e.flags&32){i=e.stateNode;try{On(i,"")}catch($){Ce(e,e.return,$)}}n&4&&e.stateNode!=null&&(i=e.memoizedProps,Fc(e,i,a!==null?a.memoizedProps:i)),n&1024&&(Pc=!0);break;case 6:if(dt(t,e),mt(e),n&4){if(e.stateNode===null)throw Error(c(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n}catch($){Ce(e,e.return,$)}}break;case 3:if(Lr=null,i=Gt,Gt=zr(t.containerInfo),dt(t,e),Gt=i,mt(e),n&4&&a!==null&&a.memoizedState.isDehydrated)try{ul(t.containerInfo)}catch($){Ce(e,e.return,$)}Pc&&(Pc=!1,gm(e));break;case 4:n=Gt,Gt=zr(e.stateNode.containerInfo),dt(t,e),mt(e),Gt=n;break;case 12:dt(t,e),mt(e);break;case 31:dt(t,e),mt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,br(e,n)));break;case 13:dt(t,e),mt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Sr=gt()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,br(e,n)));break;case 22:i=e.memoizedState!==null;var E=a!==null&&a.memoizedState!==null,M=fa,L=Fe;if(fa=M||i,Fe=L||E,dt(t,e),Fe=L,fa=M,mt(e),n&8192)e:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(a===null||E||fa||Fe||pn(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){E=a=t;try{if(u=E.stateNode,i)d=u.style,typeof d.setProperty=="function"?d.setProperty("display","none","important"):d.display="none";else{v=E.stateNode;var Q=E.memoizedProps.style,j=Q!=null&&Q.hasOwnProperty("display")?Q.display:null;v.style.display=j==null||typeof j=="boolean"?"":(""+j).trim()}}catch($){Ce(E,E.return,$)}}}else if(t.tag===6){if(a===null){E=t;try{E.stateNode.nodeValue=i?"":E.memoizedProps}catch($){Ce(E,E.return,$)}}}else if(t.tag===18){if(a===null){E=t;try{var w=E.stateNode;i?ih(w,!0):ih(E.stateNode,!1)}catch($){Ce(E,E.return,$)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,br(e,a))));break;case 19:dt(t,e),mt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,br(e,n)));break;case 30:break;case 21:break;default:dt(t,e),mt(e)}}function mt(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if(um(n)){a=n;break}n=n.return}if(a==null)throw Error(c(160));switch(a.tag){case 27:var i=a.stateNode,u=Zc(e);yr(e,u,i);break;case 5:var d=a.stateNode;a.flags&32&&(On(d,""),a.flags&=-33);var v=Zc(e);yr(e,v,d);break;case 3:case 4:var E=a.stateNode.containerInfo,M=Zc(e);Kc(e,M,E);break;default:throw Error(c(161))}}catch(L){Ce(e,e.return,L)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gm(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;gm(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ma(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)sm(e,t.alternate,t),t=t.sibling}function pn(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ua(4,t,t.return),pn(t);break;case 1:Jt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&im(t,t.return,a),pn(t);break;case 27:ci(t.stateNode);case 26:case 5:Jt(t,t.return),pn(t);break;case 22:t.memoizedState===null&&pn(t);break;case 30:pn(t);break;default:pn(t)}e=e.sibling}}function ha(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,i=e,u=t,d=u.flags;switch(u.tag){case 0:case 11:case 15:ha(i,u,a),Wl(4,u);break;case 1:if(ha(i,u,a),n=u,i=n.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(M){Ce(n,n.return,M)}if(n=u,i=n.updateQueue,i!==null){var v=n.stateNode;try{var E=i.shared.hiddenCallbacks;if(E!==null)for(i.shared.hiddenCallbacks=null,i=0;i<E.length;i++)Zf(E[i],v)}catch(M){Ce(n,n.return,M)}}a&&d&64&&lm(u),Il(u,u.return);break;case 27:cm(u);case 26:case 5:ha(i,u,a),a&&n===null&&d&4&&rm(u),Il(u,u.return);break;case 12:ha(i,u,a);break;case 31:ha(i,u,a),a&&d&4&&mm(i,u);break;case 13:ha(i,u,a),a&&d&4&&hm(i,u);break;case 22:u.memoizedState===null&&ha(i,u,a),Il(u,u.return);break;case 30:break;default:ha(i,u,a)}t=t.sibling}}function Jc(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&kl(a))}function $c(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&kl(e))}function Yt(e,t,a,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)vm(e,t,a,n),t=t.sibling}function vm(e,t,a,n){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Yt(e,t,a,n),i&2048&&Wl(9,t);break;case 1:Yt(e,t,a,n);break;case 3:Yt(e,t,a,n),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&kl(e)));break;case 12:if(i&2048){Yt(e,t,a,n),e=t.stateNode;try{var u=t.memoizedProps,d=u.id,v=u.onPostCommit;typeof v=="function"&&v(d,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(E){Ce(t,t.return,E)}}else Yt(e,t,a,n);break;case 31:Yt(e,t,a,n);break;case 13:Yt(e,t,a,n);break;case 23:break;case 22:u=t.stateNode,d=t.alternate,t.memoizedState!==null?u._visibility&2?Yt(e,t,a,n):ei(e,t):u._visibility&2?Yt(e,t,a,n):(u._visibility|=2,Jn(e,t,a,n,(t.subtreeFlags&10256)!==0||!1)),i&2048&&Jc(d,t);break;case 24:Yt(e,t,a,n),i&2048&&$c(t.alternate,t);break;default:Yt(e,t,a,n)}}function Jn(e,t,a,n,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var u=e,d=t,v=a,E=n,M=d.flags;switch(d.tag){case 0:case 11:case 15:Jn(u,d,v,E,i),Wl(8,d);break;case 23:break;case 22:var L=d.stateNode;d.memoizedState!==null?L._visibility&2?Jn(u,d,v,E,i):ei(u,d):(L._visibility|=2,Jn(u,d,v,E,i)),i&&M&2048&&Jc(d.alternate,d);break;case 24:Jn(u,d,v,E,i),i&&M&2048&&$c(d.alternate,d);break;default:Jn(u,d,v,E,i)}t=t.sibling}}function ei(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,i=n.flags;switch(n.tag){case 22:ei(a,n),i&2048&&Jc(n.alternate,n);break;case 24:ei(a,n),i&2048&&$c(n.alternate,n);break;default:ei(a,n)}t=t.sibling}}var ti=8192;function $n(e,t,a){if(e.subtreeFlags&ti)for(e=e.child;e!==null;)ym(e,t,a),e=e.sibling}function ym(e,t,a){switch(e.tag){case 26:$n(e,t,a),e.flags&ti&&e.memoizedState!==null&&k1(a,Gt,e.memoizedState,e.memoizedProps);break;case 5:$n(e,t,a);break;case 3:case 4:var n=Gt;Gt=zr(e.stateNode.containerInfo),$n(e,t,a),Gt=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=ti,ti=16777216,$n(e,t,a),ti=n):$n(e,t,a));break;default:$n(e,t,a)}}function bm(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function ai(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];$e=n,Sm(n,e)}bm(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)xm(e),e=e.sibling}function xm(e){switch(e.tag){case 0:case 11:case 15:ai(e),e.flags&2048&&Ua(9,e,e.return);break;case 3:ai(e);break;case 12:ai(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,xr(e)):ai(e);break;default:ai(e)}}function xr(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];$e=n,Sm(n,e)}bm(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ua(8,t,t.return),xr(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,xr(t));break;default:xr(t)}e=e.sibling}}function Sm(e,t){for(;$e!==null;){var a=$e;switch(a.tag){case 0:case 11:case 15:Ua(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:kl(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,$e=n;else e:for(a=e;$e!==null;){n=$e;var i=n.sibling,u=n.return;if(fm(n),n===a){$e=null;break e}if(i!==null){i.return=u,$e=i;break e}$e=u}}}var e1={getCacheForType:function(e){var t=at(Ye),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return at(Ye).controller.signal}},t1=typeof WeakMap=="function"?WeakMap:Map,xe=0,_e=null,fe=null,me=0,Ae=0,At=null,Ba=!1,Wn=!1,Wc=!1,pa=0,qe=0,Ha=0,gn=0,Ic=0,Ct=0,In=0,ni=null,ht=null,eo=!1,Sr=0,Em=0,Er=1/0,Ar=null,ka=null,Ze=0,qa=null,el=null,ga=0,to=0,ao=null,Am=null,li=0,no=null;function Tt(){return(xe&2)!==0&&me!==0?me&-me:z.T!==null?oo():Hs()}function Cm(){if(Ct===0)if((me&536870912)===0||ge){var e=Mi;Mi<<=1,(Mi&3932160)===0&&(Mi=262144),Ct=e}else Ct=536870912;return e=St.current,e!==null&&(e.flags|=32),Ct}function pt(e,t,a){(e===_e&&(Ae===2||Ae===9)||e.cancelPendingCommit!==null)&&(tl(e,0),Qa(e,me,Ct,!1)),Tl(e,a),((xe&2)===0||e!==_e)&&(e===_e&&((xe&2)===0&&(gn|=a),qe===4&&Qa(e,me,Ct,!1)),$t(e))}function Tm(e,t,a){if((xe&6)!==0)throw Error(c(327));var n=!a&&(t&127)===0&&(t&e.expiredLanes)===0||Cl(e,t),i=n?l1(e,t):io(e,t,!0),u=n;do{if(i===0){Wn&&!n&&Qa(e,t,0,!1);break}else{if(a=e.current.alternate,u&&!a1(a)){i=io(e,t,!1),u=!1;continue}if(i===2){if(u=t,e.errorRecoveryDisabledLanes&u)var d=0;else d=e.pendingLanes&-536870913,d=d!==0?d:d&536870912?536870912:0;if(d!==0){t=d;e:{var v=e;i=ni;var E=v.current.memoizedState.isDehydrated;if(E&&(tl(v,d).flags|=256),d=io(v,d,!1),d!==2){if(Wc&&!E){v.errorRecoveryDisabledLanes|=u,gn|=u,i=4;break e}u=ht,ht=i,u!==null&&(ht===null?ht=u:ht.push.apply(ht,u))}i=d}if(u=!1,i!==2)continue}}if(i===1){tl(e,0),Qa(e,t,0,!0);break}e:{switch(n=e,u=i,u){case 0:case 1:throw Error(c(345));case 4:if((t&4194048)!==t)break;case 6:Qa(n,t,Ct,!Ba);break e;case 2:ht=null;break;case 3:case 5:break;default:throw Error(c(329))}if((t&62914560)===t&&(i=Sr+300-gt(),10<i)){if(Qa(n,t,Ct,!Ba),zi(n,0,!0)!==0)break e;ga=t,n.timeoutHandle=ah(Rm.bind(null,n,a,ht,Ar,eo,t,Ct,gn,In,Ba,u,"Throttled",-0,0),i);break e}Rm(n,a,ht,Ar,eo,t,Ct,gn,In,Ba,u,null,-0,0)}}break}while(!0);$t(e)}function Rm(e,t,a,n,i,u,d,v,E,M,L,Q,j,w){if(e.timeoutHandle=-1,Q=t.subtreeFlags,Q&8192||(Q&16785408)===16785408){Q={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ta},ym(t,u,Q);var $=(u&62914560)===u?Sr-gt():(u&4194048)===u?Em-gt():0;if($=q1(Q,$),$!==null){ga=u,e.cancelPendingCommit=$(wm.bind(null,e,t,u,a,n,i,d,v,E,L,Q,null,j,w)),Qa(e,u,d,!M);return}}wm(e,t,u,a,n,i,d,v,E)}function a1(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var i=a[n],u=i.getSnapshot;i=i.value;try{if(!bt(u(),i))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Qa(e,t,a,n){t&=~Ic,t&=~gn,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var i=t;0<i;){var u=31-yt(i),d=1<<u;n[u]=-1,i&=~d}a!==0&&Ls(e,a,t)}function Cr(){return(xe&6)===0?(ii(0),!1):!0}function lo(){if(fe!==null){if(Ae===0)var e=fe.return;else e=fe,ia=un=null,xc(e),Xn=null,Ql=0,e=fe;for(;e!==null;)nm(e.alternate,e),e=e.return;fe=null}}function tl(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,E1(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ga=0,lo(),_e=e,fe=a=na(e.current,null),me=t,Ae=0,At=null,Ba=!1,Wn=Cl(e,t),Wc=!1,In=Ct=Ic=gn=Ha=qe=0,ht=ni=null,eo=!1,(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-yt(n),u=1<<i;t|=e[i],n&=~u}return pa=t,Xi(),a}function Nm(e,t){ue=null,z.H=Pl,t===Vn||t===Ii?(t=Yf(),Ae=3):t===cc?(t=Yf(),Ae=4):Ae=t===Uc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,At=t,fe===null&&(qe=1,mr(e,Mt(t,e.current)))}function Dm(){var e=St.current;return e===null?!0:(me&4194048)===me?Lt===null:(me&62914560)===me||(me&536870912)!==0?e===Lt:!1}function _m(){var e=z.H;return z.H=Pl,e===null?Pl:e}function Om(){var e=z.A;return z.A=e1,e}function Tr(){qe=4,Ba||(me&4194048)!==me&&St.current!==null||(Wn=!0),(Ha&134217727)===0&&(gn&134217727)===0||_e===null||Qa(_e,me,Ct,!1)}function io(e,t,a){var n=xe;xe|=2;var i=_m(),u=Om();(_e!==e||me!==t)&&(Ar=null,tl(e,t)),t=!1;var d=qe;e:do try{if(Ae!==0&&fe!==null){var v=fe,E=At;switch(Ae){case 8:lo(),d=6;break e;case 3:case 2:case 9:case 6:St.current===null&&(t=!0);var M=Ae;if(Ae=0,At=null,al(e,v,E,M),a&&Wn){d=0;break e}break;default:M=Ae,Ae=0,At=null,al(e,v,E,M)}}n1(),d=qe;break}catch(L){Nm(e,L)}while(!0);return t&&e.shellSuspendCounter++,ia=un=null,xe=n,z.H=i,z.A=u,fe===null&&(_e=null,me=0,Xi()),d}function n1(){for(;fe!==null;)Mm(fe)}function l1(e,t){var a=xe;xe|=2;var n=_m(),i=Om();_e!==e||me!==t?(Ar=null,Er=gt()+500,tl(e,t)):Wn=Cl(e,t);e:do try{if(Ae!==0&&fe!==null){t=fe;var u=At;t:switch(Ae){case 1:Ae=0,At=null,al(e,t,u,1);break;case 2:case 9:if(Qf(u)){Ae=0,At=null,jm(t);break}t=function(){Ae!==2&&Ae!==9||_e!==e||(Ae=7),$t(e)},u.then(t,t);break e;case 3:Ae=7;break e;case 4:Ae=5;break e;case 7:Qf(u)?(Ae=0,At=null,jm(t)):(Ae=0,At=null,al(e,t,u,7));break;case 5:var d=null;switch(fe.tag){case 26:d=fe.memoizedState;case 5:case 27:var v=fe;if(d?vh(d):v.stateNode.complete){Ae=0,At=null;var E=v.sibling;if(E!==null)fe=E;else{var M=v.return;M!==null?(fe=M,Rr(M)):fe=null}break t}}Ae=0,At=null,al(e,t,u,5);break;case 6:Ae=0,At=null,al(e,t,u,6);break;case 8:lo(),qe=6;break e;default:throw Error(c(462))}}i1();break}catch(L){Nm(e,L)}while(!0);return ia=un=null,z.H=n,z.A=i,xe=a,fe!==null?0:(_e=null,me=0,Xi(),qe)}function i1(){for(;fe!==null&&!D0();)Mm(fe)}function Mm(e){var t=tm(e.alternate,e,pa);e.memoizedProps=e.pendingProps,t===null?Rr(e):fe=t}function jm(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Pd(a,t,t.pendingProps,t.type,void 0,me);break;case 11:t=Pd(a,t,t.pendingProps,t.type.render,t.ref,me);break;case 5:xc(t);default:nm(a,t),t=fe=Of(t,pa),t=tm(a,t,pa)}e.memoizedProps=e.pendingProps,t===null?Rr(e):fe=t}function al(e,t,a,n){ia=un=null,xc(t),Xn=null,Ql=0;var i=t.return;try{if(Zv(e,i,t,a,me)){qe=1,mr(e,Mt(a,e.current)),fe=null;return}}catch(u){if(i!==null)throw fe=i,u;qe=1,mr(e,Mt(a,e.current)),fe=null;return}t.flags&32768?(ge||n===1?e=!0:Wn||(me&536870912)!==0?e=!1:(Ba=e=!0,(n===2||n===9||n===3||n===6)&&(n=St.current,n!==null&&n.tag===13&&(n.flags|=16384))),zm(t,e)):Rr(t)}function Rr(e){var t=e;do{if((t.flags&32768)!==0){zm(t,Ba);return}e=t.return;var a=Jv(t.alternate,t,pa);if(a!==null){fe=a;return}if(t=t.sibling,t!==null){fe=t;return}fe=t=e}while(t!==null);qe===0&&(qe=5)}function zm(e,t){do{var a=$v(e.alternate,e);if(a!==null){a.flags&=32767,fe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){fe=e;return}fe=e=a}while(e!==null);qe=6,fe=null}function wm(e,t,a,n,i,u,d,v,E){e.cancelPendingCommit=null;do Nr();while(Ze!==0);if((xe&6)!==0)throw Error(c(327));if(t!==null){if(t===e.current)throw Error(c(177));if(u=t.lanes|t.childLanes,u|=Zu,H0(e,a,u,d,v,E),e===_e&&(fe=_e=null,me=0),el=t,qa=e,ga=a,to=u,ao=i,Am=n,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,o1(_i,function(){return km(),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=z.T,z.T=null,i=K.p,K.p=2,d=xe,xe|=4;try{Wv(e,t,a)}finally{xe=d,K.p=i,z.T=n}}Ze=1,Lm(),Um(),Bm()}}function Lm(){if(Ze===1){Ze=0;var e=qa,t=el,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var n=K.p;K.p=2;var i=xe;xe|=4;try{pm(t,e);var u=yo,d=Sf(e.containerInfo),v=u.focusedElem,E=u.selectionRange;if(d!==v&&v&&v.ownerDocument&&xf(v.ownerDocument.documentElement,v)){if(E!==null&&Gu(v)){var M=E.start,L=E.end;if(L===void 0&&(L=M),"selectionStart"in v)v.selectionStart=M,v.selectionEnd=Math.min(L,v.value.length);else{var Q=v.ownerDocument||document,j=Q&&Q.defaultView||window;if(j.getSelection){var w=j.getSelection(),$=v.textContent.length,ne=Math.min(E.start,$),De=E.end===void 0?ne:Math.min(E.end,$);!w.extend&&ne>De&&(d=De,De=ne,ne=d);var N=bf(v,ne),A=bf(v,De);if(N&&A&&(w.rangeCount!==1||w.anchorNode!==N.node||w.anchorOffset!==N.offset||w.focusNode!==A.node||w.focusOffset!==A.offset)){var O=Q.createRange();O.setStart(N.node,N.offset),w.removeAllRanges(),ne>De?(w.addRange(O),w.extend(A.node,A.offset)):(O.setEnd(A.node,A.offset),w.addRange(O))}}}}for(Q=[],w=v;w=w.parentNode;)w.nodeType===1&&Q.push({element:w,left:w.scrollLeft,top:w.scrollTop});for(typeof v.focus=="function"&&v.focus(),v=0;v<Q.length;v++){var B=Q[v];B.element.scrollLeft=B.left,B.element.scrollTop=B.top}}kr=!!vo,yo=vo=null}finally{xe=i,K.p=n,z.T=a}}e.current=t,Ze=2}}function Um(){if(Ze===2){Ze=0;var e=qa,t=el,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var n=K.p;K.p=2;var i=xe;xe|=4;try{sm(e,t.alternate,t)}finally{xe=i,K.p=n,z.T=a}}Ze=3}}function Bm(){if(Ze===4||Ze===3){Ze=0,_0();var e=qa,t=el,a=ga,n=Am;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ze=5:(Ze=0,el=qa=null,Hm(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ka=null),Au(a),t=t.stateNode,vt&&typeof vt.onCommitFiberRoot=="function")try{vt.onCommitFiberRoot(Al,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=z.T,i=K.p,K.p=2,z.T=null;try{for(var u=e.onRecoverableError,d=0;d<n.length;d++){var v=n[d];u(v.value,{componentStack:v.stack})}}finally{z.T=t,K.p=i}}(ga&3)!==0&&Nr(),$t(e),i=e.pendingLanes,(a&261930)!==0&&(i&42)!==0?e===no?li++:(li=0,no=e):li=0,ii(0)}}function Hm(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,kl(t)))}function Nr(){return Lm(),Um(),Bm(),km()}function km(){if(Ze!==5)return!1;var e=qa,t=to;to=0;var a=Au(ga),n=z.T,i=K.p;try{K.p=32>a?32:a,z.T=null,a=ao,ao=null;var u=qa,d=ga;if(Ze=0,el=qa=null,ga=0,(xe&6)!==0)throw Error(c(331));var v=xe;if(xe|=4,xm(u.current),vm(u,u.current,d,a),xe=v,ii(0,!1),vt&&typeof vt.onPostCommitFiberRoot=="function")try{vt.onPostCommitFiberRoot(Al,u)}catch{}return!0}finally{K.p=i,z.T=n,Hm(e,t)}}function qm(e,t,a){t=Mt(a,t),t=Lc(e.stateNode,t,2),e=za(e,t,2),e!==null&&(Tl(e,2),$t(e))}function Ce(e,t,a){if(e.tag===3)qm(e,e,a);else for(;t!==null;){if(t.tag===3){qm(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(ka===null||!ka.has(n))){e=Mt(a,e),a=Qd(2),n=za(t,a,2),n!==null&&(Gd(a,n,t,e),Tl(n,2),$t(n));break}}t=t.return}}function ro(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new t1;var i=new Set;n.set(t,i)}else i=n.get(t),i===void 0&&(i=new Set,n.set(t,i));i.has(a)||(Wc=!0,i.add(a),e=r1.bind(null,e,t,a),t.then(e,e))}function r1(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,_e===e&&(me&a)===a&&(qe===4||qe===3&&(me&62914560)===me&&300>gt()-Sr?(xe&2)===0&&tl(e,0):Ic|=a,In===me&&(In=0)),$t(e)}function Qm(e,t){t===0&&(t=ws()),e=nn(e,t),e!==null&&(Tl(e,t),$t(e))}function u1(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Qm(e,a)}function c1(e,t){var a=0;switch(e.tag){case 31:case 13:var n=e.stateNode,i=e.memoizedState;i!==null&&(a=i.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(c(314))}n!==null&&n.delete(t),Qm(e,a)}function o1(e,t){return bu(e,t)}var Dr=null,nl=null,uo=!1,_r=!1,co=!1,Ga=0;function $t(e){e!==nl&&e.next===null&&(nl===null?Dr=nl=e:nl=nl.next=e),_r=!0,uo||(uo=!0,f1())}function ii(e,t){if(!co&&_r){co=!0;do for(var a=!1,n=Dr;n!==null;){if(e!==0){var i=n.pendingLanes;if(i===0)var u=0;else{var d=n.suspendedLanes,v=n.pingedLanes;u=(1<<31-yt(42|e)+1)-1,u&=i&~(d&~v),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(a=!0,Xm(n,u))}else u=me,u=zi(n,n===_e?u:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(u&3)===0||Cl(n,u)||(a=!0,Xm(n,u));n=n.next}while(a);co=!1}}function s1(){Gm()}function Gm(){_r=uo=!1;var e=0;Ga!==0&&S1()&&(e=Ga);for(var t=gt(),a=null,n=Dr;n!==null;){var i=n.next,u=Ym(n,t);u===0?(n.next=null,a===null?Dr=i:a.next=i,i===null&&(nl=a)):(a=n,(e!==0||(u&3)!==0)&&(_r=!0)),n=i}Ze!==0&&Ze!==5||ii(e),Ga!==0&&(Ga=0)}function Ym(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,i=e.expirationTimes,u=e.pendingLanes&-62914561;0<u;){var d=31-yt(u),v=1<<d,E=i[d];E===-1?((v&a)===0||(v&n)!==0)&&(i[d]=B0(v,t)):E<=t&&(e.expiredLanes|=v),u&=~v}if(t=_e,a=me,a=zi(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(Ae===2||Ae===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&xu(n),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Cl(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&xu(n),Au(a)){case 2:case 8:a=js;break;case 32:a=_i;break;case 268435456:a=zs;break;default:a=_i}return n=Vm.bind(null,e),a=bu(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&xu(n),e.callbackPriority=2,e.callbackNode=null,2}function Vm(e,t){if(Ze!==0&&Ze!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Nr()&&e.callbackNode!==a)return null;var n=me;return n=zi(e,e===_e?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(Tm(e,n,t),Ym(e,gt()),e.callbackNode!=null&&e.callbackNode===a?Vm.bind(null,e):null)}function Xm(e,t){if(Nr())return null;Tm(e,t,!0)}function f1(){A1(function(){(xe&6)!==0?bu(Ms,s1):Gm()})}function oo(){if(Ga===0){var e=Gn;e===0&&(e=Oi,Oi<<=1,(Oi&261888)===0&&(Oi=256)),Ga=e}return Ga}function Fm(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Bi(""+e)}function Zm(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function d1(e,t,a,n,i){if(t==="submit"&&a&&a.stateNode===i){var u=Fm((i[ot]||null).action),d=n.submitter;d&&(t=(t=d[ot]||null)?Fm(t.formAction):d.getAttribute("formAction"),t!==null&&(u=t,d=null));var v=new Qi("action","action",null,n,i);e.push({event:v,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(Ga!==0){var E=d?Zm(i,d):new FormData(i);_c(a,{pending:!0,data:E,method:i.method,action:u},null,E)}}else typeof u=="function"&&(v.preventDefault(),E=d?Zm(i,d):new FormData(i),_c(a,{pending:!0,data:E,method:i.method,action:u},u,E))},currentTarget:i}]})}}for(var so=0;so<Fu.length;so++){var fo=Fu[so],m1=fo.toLowerCase(),h1=fo[0].toUpperCase()+fo.slice(1);Qt(m1,"on"+h1)}Qt(Cf,"onAnimationEnd"),Qt(Tf,"onAnimationIteration"),Qt(Rf,"onAnimationStart"),Qt("dblclick","onDoubleClick"),Qt("focusin","onFocus"),Qt("focusout","onBlur"),Qt(Ov,"onTransitionRun"),Qt(Mv,"onTransitionStart"),Qt(jv,"onTransitionCancel"),Qt(Nf,"onTransitionEnd"),Dn("onMouseEnter",["mouseout","mouseover"]),Dn("onMouseLeave",["mouseout","mouseover"]),Dn("onPointerEnter",["pointerout","pointerover"]),Dn("onPointerLeave",["pointerout","pointerover"]),Ia("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ia("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ia("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ia("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ia("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ia("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),p1=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ri));function Km(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],i=n.event;n=n.listeners;e:{var u=void 0;if(t)for(var d=n.length-1;0<=d;d--){var v=n[d],E=v.instance,M=v.currentTarget;if(v=v.listener,E!==u&&i.isPropagationStopped())break e;u=v,i.currentTarget=M;try{u(i)}catch(L){Vi(L)}i.currentTarget=null,u=E}else for(d=0;d<n.length;d++){if(v=n[d],E=v.instance,M=v.currentTarget,v=v.listener,E!==u&&i.isPropagationStopped())break e;u=v,i.currentTarget=M;try{u(i)}catch(L){Vi(L)}i.currentTarget=null,u=E}}}}function de(e,t){var a=t[Cu];a===void 0&&(a=t[Cu]=new Set);var n=e+"__bubble";a.has(n)||(Pm(t,e,2,!1),a.add(n))}function mo(e,t,a){var n=0;t&&(n|=4),Pm(a,e,n,t)}var Or="_reactListening"+Math.random().toString(36).slice(2);function ho(e){if(!e[Or]){e[Or]=!0,Qs.forEach(function(a){a!=="selectionchange"&&(p1.has(a)||mo(a,!1,e),mo(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Or]||(t[Or]=!0,mo("selectionchange",!1,t))}}function Pm(e,t,a,n){switch(Ch(t)){case 2:var i=Y1;break;case 8:i=V1;break;default:i=_o}a=i.bind(null,t,a,e),i=void 0,!zu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),n?i!==void 0?e.addEventListener(t,a,{capture:!0,passive:i}):e.addEventListener(t,a,!0):i!==void 0?e.addEventListener(t,a,{passive:i}):e.addEventListener(t,a,!1)}function po(e,t,a,n,i){var u=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var d=n.tag;if(d===3||d===4){var v=n.stateNode.containerInfo;if(v===i)break;if(d===4)for(d=n.return;d!==null;){var E=d.tag;if((E===3||E===4)&&d.stateNode.containerInfo===i)return;d=d.return}for(;v!==null;){if(d=Tn(v),d===null)return;if(E=d.tag,E===5||E===6||E===26||E===27){n=u=d;continue e}v=v.parentNode}}n=n.return}Is(function(){var M=u,L=Mu(a),Q=[];e:{var j=Df.get(e);if(j!==void 0){var w=Qi,$=e;switch(e){case"keypress":if(ki(a)===0)break e;case"keydown":case"keyup":w=cv;break;case"focusin":$="focus",w=Bu;break;case"focusout":$="blur",w=Bu;break;case"beforeblur":case"afterblur":w=Bu;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=af;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=J0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=fv;break;case Cf:case Tf:case Rf:w=I0;break;case Nf:w=mv;break;case"scroll":case"scrollend":w=K0;break;case"wheel":w=pv;break;case"copy":case"cut":case"paste":w=tv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=lf;break;case"toggle":case"beforetoggle":w=vv}var ne=(t&4)!==0,De=!ne&&(e==="scroll"||e==="scrollend"),N=ne?j!==null?j+"Capture":null:j;ne=[];for(var A=M,O;A!==null;){var B=A;if(O=B.stateNode,B=B.tag,B!==5&&B!==26&&B!==27||O===null||N===null||(B=Dl(A,N),B!=null&&ne.push(ui(A,B,O))),De)break;A=A.return}0<ne.length&&(j=new w(j,$,null,a,L),Q.push({event:j,listeners:ne}))}}if((t&7)===0){e:{if(j=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",j&&a!==Ou&&($=a.relatedTarget||a.fromElement)&&(Tn($)||$[Cn]))break e;if((w||j)&&(j=L.window===L?L:(j=L.ownerDocument)?j.defaultView||j.parentWindow:window,w?($=a.relatedTarget||a.toElement,w=M,$=$?Tn($):null,$!==null&&(De=f($),ne=$.tag,$!==De||ne!==5&&ne!==27&&ne!==6)&&($=null)):(w=null,$=M),w!==$)){if(ne=af,B="onMouseLeave",N="onMouseEnter",A="mouse",(e==="pointerout"||e==="pointerover")&&(ne=lf,B="onPointerLeave",N="onPointerEnter",A="pointer"),De=w==null?j:Nl(w),O=$==null?j:Nl($),j=new ne(B,A+"leave",w,a,L),j.target=De,j.relatedTarget=O,B=null,Tn(L)===M&&(ne=new ne(N,A+"enter",$,a,L),ne.target=O,ne.relatedTarget=De,B=ne),De=B,w&&$)t:{for(ne=g1,N=w,A=$,O=0,B=N;B;B=ne(B))O++;B=0;for(var ae=A;ae;ae=ne(ae))B++;for(;0<O-B;)N=ne(N),O--;for(;0<B-O;)A=ne(A),B--;for(;O--;){if(N===A||A!==null&&N===A.alternate){ne=N;break t}N=ne(N),A=ne(A)}ne=null}else ne=null;w!==null&&Jm(Q,j,w,ne,!1),$!==null&&De!==null&&Jm(Q,De,$,ne,!0)}}e:{if(j=M?Nl(M):window,w=j.nodeName&&j.nodeName.toLowerCase(),w==="select"||w==="input"&&j.type==="file")var ve=mf;else if(ff(j))if(hf)ve=Nv;else{ve=Tv;var ee=Cv}else w=j.nodeName,!w||w.toLowerCase()!=="input"||j.type!=="checkbox"&&j.type!=="radio"?M&&_u(M.elementType)&&(ve=mf):ve=Rv;if(ve&&(ve=ve(e,M))){df(Q,ve,a,L);break e}ee&&ee(e,j,M),e==="focusout"&&M&&j.type==="number"&&M.memoizedProps.value!=null&&Du(j,"number",j.value)}switch(ee=M?Nl(M):window,e){case"focusin":(ff(ee)||ee.contentEditable==="true")&&(wn=ee,Yu=M,Ul=null);break;case"focusout":Ul=Yu=wn=null;break;case"mousedown":Vu=!0;break;case"contextmenu":case"mouseup":case"dragend":Vu=!1,Ef(Q,a,L);break;case"selectionchange":if(_v)break;case"keydown":case"keyup":Ef(Q,a,L)}var ce;if(ku)e:{switch(e){case"compositionstart":var he="onCompositionStart";break e;case"compositionend":he="onCompositionEnd";break e;case"compositionupdate":he="onCompositionUpdate";break e}he=void 0}else zn?of(e,a)&&(he="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(he="onCompositionStart");he&&(rf&&a.locale!=="ko"&&(zn||he!=="onCompositionStart"?he==="onCompositionEnd"&&zn&&(ce=ef()):(Ra=L,wu="value"in Ra?Ra.value:Ra.textContent,zn=!0)),ee=Mr(M,he),0<ee.length&&(he=new nf(he,e,null,a,L),Q.push({event:he,listeners:ee}),ce?he.data=ce:(ce=sf(a),ce!==null&&(he.data=ce)))),(ce=bv?xv(e,a):Sv(e,a))&&(he=Mr(M,"onBeforeInput"),0<he.length&&(ee=new nf("onBeforeInput","beforeinput",null,a,L),Q.push({event:ee,listeners:he}),ee.data=ce)),d1(Q,e,M,a,L)}Km(Q,t)})}function ui(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Mr(e,t){for(var a=t+"Capture",n=[];e!==null;){var i=e,u=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||u===null||(i=Dl(e,a),i!=null&&n.unshift(ui(e,i,u)),i=Dl(e,t),i!=null&&n.push(ui(e,i,u))),e.tag===3)return n;e=e.return}return[]}function g1(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Jm(e,t,a,n,i){for(var u=t._reactName,d=[];a!==null&&a!==n;){var v=a,E=v.alternate,M=v.stateNode;if(v=v.tag,E!==null&&E===n)break;v!==5&&v!==26&&v!==27||M===null||(E=M,i?(M=Dl(a,u),M!=null&&d.unshift(ui(a,M,E))):i||(M=Dl(a,u),M!=null&&d.push(ui(a,M,E)))),a=a.return}d.length!==0&&e.push({event:t,listeners:d})}var v1=/\r\n?/g,y1=/\u0000|\uFFFD/g;function $m(e){return(typeof e=="string"?e:""+e).replace(v1,`
`).replace(y1,"")}function Wm(e,t){return t=$m(t),$m(e)===t}function Ne(e,t,a,n,i,u){switch(a){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||On(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&On(e,""+n);break;case"className":Li(e,"class",n);break;case"tabIndex":Li(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":Li(e,a,n);break;case"style":$s(e,n,u);break;case"data":if(t!=="object"){Li(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Bi(""+n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(a==="formAction"?(t!=="input"&&Ne(e,t,"name",i.name,i,null),Ne(e,t,"formEncType",i.formEncType,i,null),Ne(e,t,"formMethod",i.formMethod,i,null),Ne(e,t,"formTarget",i.formTarget,i,null)):(Ne(e,t,"encType",i.encType,i,null),Ne(e,t,"method",i.method,i,null),Ne(e,t,"target",i.target,i,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Bi(""+n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=ta);break;case"onScroll":n!=null&&de("scroll",e);break;case"onScrollEnd":n!=null&&de("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=Bi(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""+n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":de("beforetoggle",e),de("toggle",e),wi(e,"popover",n);break;case"xlinkActuate":ea(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":ea(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":ea(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":ea(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":ea(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":ea(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":ea(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":ea(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":ea(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":wi(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=F0.get(a)||a,wi(e,a,n))}}function go(e,t,a,n,i,u){switch(a){case"style":$s(e,n,u);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"children":typeof n=="string"?On(e,n):(typeof n=="number"||typeof n=="bigint")&&On(e,""+n);break;case"onScroll":n!=null&&de("scroll",e);break;case"onScrollEnd":n!=null&&de("scrollend",e);break;case"onClick":n!=null&&(e.onclick=ta);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Gs.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(i=a.endsWith("Capture"),t=a.slice(2,i?a.length-7:void 0),u=e[ot]||null,u=u!=null?u[a]:null,typeof u=="function"&&e.removeEventListener(t,u,i),typeof n=="function")){typeof u!="function"&&u!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,n,i);break e}a in e?e[a]=n:n===!0?e.setAttribute(a,""):wi(e,a,n)}}}function lt(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":de("error",e),de("load",e);var n=!1,i=!1,u;for(u in a)if(a.hasOwnProperty(u)){var d=a[u];if(d!=null)switch(u){case"src":n=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:Ne(e,t,u,d,a,null)}}i&&Ne(e,t,"srcSet",a.srcSet,a,null),n&&Ne(e,t,"src",a.src,a,null);return;case"input":de("invalid",e);var v=u=d=i=null,E=null,M=null;for(n in a)if(a.hasOwnProperty(n)){var L=a[n];if(L!=null)switch(n){case"name":i=L;break;case"type":d=L;break;case"checked":E=L;break;case"defaultChecked":M=L;break;case"value":u=L;break;case"defaultValue":v=L;break;case"children":case"dangerouslySetInnerHTML":if(L!=null)throw Error(c(137,t));break;default:Ne(e,t,n,L,a,null)}}Zs(e,u,v,E,M,d,i,!1);return;case"select":de("invalid",e),n=d=u=null;for(i in a)if(a.hasOwnProperty(i)&&(v=a[i],v!=null))switch(i){case"value":u=v;break;case"defaultValue":d=v;break;case"multiple":n=v;default:Ne(e,t,i,v,a,null)}t=u,a=d,e.multiple=!!n,t!=null?_n(e,!!n,t,!1):a!=null&&_n(e,!!n,a,!0);return;case"textarea":de("invalid",e),u=i=n=null;for(d in a)if(a.hasOwnProperty(d)&&(v=a[d],v!=null))switch(d){case"value":n=v;break;case"defaultValue":i=v;break;case"children":u=v;break;case"dangerouslySetInnerHTML":if(v!=null)throw Error(c(91));break;default:Ne(e,t,d,v,a,null)}Ps(e,n,i,u);return;case"option":for(E in a)a.hasOwnProperty(E)&&(n=a[E],n!=null)&&(E==="selected"?e.selected=n&&typeof n!="function"&&typeof n!="symbol":Ne(e,t,E,n,a,null));return;case"dialog":de("beforetoggle",e),de("toggle",e),de("cancel",e),de("close",e);break;case"iframe":case"object":de("load",e);break;case"video":case"audio":for(n=0;n<ri.length;n++)de(ri[n],e);break;case"image":de("error",e),de("load",e);break;case"details":de("toggle",e);break;case"embed":case"source":case"link":de("error",e),de("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(M in a)if(a.hasOwnProperty(M)&&(n=a[M],n!=null))switch(M){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:Ne(e,t,M,n,a,null)}return;default:if(_u(t)){for(L in a)a.hasOwnProperty(L)&&(n=a[L],n!==void 0&&go(e,t,L,n,a,void 0));return}}for(v in a)a.hasOwnProperty(v)&&(n=a[v],n!=null&&Ne(e,t,v,n,a,null))}function b1(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,u=null,d=null,v=null,E=null,M=null,L=null;for(w in a){var Q=a[w];if(a.hasOwnProperty(w)&&Q!=null)switch(w){case"checked":break;case"value":break;case"defaultValue":E=Q;default:n.hasOwnProperty(w)||Ne(e,t,w,null,n,Q)}}for(var j in n){var w=n[j];if(Q=a[j],n.hasOwnProperty(j)&&(w!=null||Q!=null))switch(j){case"type":u=w;break;case"name":i=w;break;case"checked":M=w;break;case"defaultChecked":L=w;break;case"value":d=w;break;case"defaultValue":v=w;break;case"children":case"dangerouslySetInnerHTML":if(w!=null)throw Error(c(137,t));break;default:w!==Q&&Ne(e,t,j,w,n,Q)}}Nu(e,d,v,E,M,L,u,i);return;case"select":w=d=v=j=null;for(u in a)if(E=a[u],a.hasOwnProperty(u)&&E!=null)switch(u){case"value":break;case"multiple":w=E;default:n.hasOwnProperty(u)||Ne(e,t,u,null,n,E)}for(i in n)if(u=n[i],E=a[i],n.hasOwnProperty(i)&&(u!=null||E!=null))switch(i){case"value":j=u;break;case"defaultValue":v=u;break;case"multiple":d=u;default:u!==E&&Ne(e,t,i,u,n,E)}t=v,a=d,n=w,j!=null?_n(e,!!a,j,!1):!!n!=!!a&&(t!=null?_n(e,!!a,t,!0):_n(e,!!a,a?[]:"",!1));return;case"textarea":w=j=null;for(v in a)if(i=a[v],a.hasOwnProperty(v)&&i!=null&&!n.hasOwnProperty(v))switch(v){case"value":break;case"children":break;default:Ne(e,t,v,null,n,i)}for(d in n)if(i=n[d],u=a[d],n.hasOwnProperty(d)&&(i!=null||u!=null))switch(d){case"value":j=i;break;case"defaultValue":w=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(c(91));break;default:i!==u&&Ne(e,t,d,i,n,u)}Ks(e,j,w);return;case"option":for(var $ in a)j=a[$],a.hasOwnProperty($)&&j!=null&&!n.hasOwnProperty($)&&($==="selected"?e.selected=!1:Ne(e,t,$,null,n,j));for(E in n)j=n[E],w=a[E],n.hasOwnProperty(E)&&j!==w&&(j!=null||w!=null)&&(E==="selected"?e.selected=j&&typeof j!="function"&&typeof j!="symbol":Ne(e,t,E,j,n,w));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ne in a)j=a[ne],a.hasOwnProperty(ne)&&j!=null&&!n.hasOwnProperty(ne)&&Ne(e,t,ne,null,n,j);for(M in n)if(j=n[M],w=a[M],n.hasOwnProperty(M)&&j!==w&&(j!=null||w!=null))switch(M){case"children":case"dangerouslySetInnerHTML":if(j!=null)throw Error(c(137,t));break;default:Ne(e,t,M,j,n,w)}return;default:if(_u(t)){for(var De in a)j=a[De],a.hasOwnProperty(De)&&j!==void 0&&!n.hasOwnProperty(De)&&go(e,t,De,void 0,n,j);for(L in n)j=n[L],w=a[L],!n.hasOwnProperty(L)||j===w||j===void 0&&w===void 0||go(e,t,L,j,n,w);return}}for(var N in a)j=a[N],a.hasOwnProperty(N)&&j!=null&&!n.hasOwnProperty(N)&&Ne(e,t,N,null,n,j);for(Q in n)j=n[Q],w=a[Q],!n.hasOwnProperty(Q)||j===w||j==null&&w==null||Ne(e,t,Q,j,n,w)}function Im(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function x1(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),n=0;n<a.length;n++){var i=a[n],u=i.transferSize,d=i.initiatorType,v=i.duration;if(u&&v&&Im(d)){for(d=0,v=i.responseEnd,n+=1;n<a.length;n++){var E=a[n],M=E.startTime;if(M>v)break;var L=E.transferSize,Q=E.initiatorType;L&&Im(Q)&&(E=E.responseEnd,d+=L*(E<v?1:(v-M)/(E-M)))}if(--n,t+=8*(u+d)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var vo=null,yo=null;function jr(e){return e.nodeType===9?e:e.ownerDocument}function eh(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function th(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function bo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var xo=null;function S1(){var e=window.event;return e&&e.type==="popstate"?e===xo?!1:(xo=e,!0):(xo=null,!1)}var ah=typeof setTimeout=="function"?setTimeout:void 0,E1=typeof clearTimeout=="function"?clearTimeout:void 0,nh=typeof Promise=="function"?Promise:void 0,A1=typeof queueMicrotask=="function"?queueMicrotask:typeof nh<"u"?function(e){return nh.resolve(null).then(e).catch(C1)}:ah;function C1(e){setTimeout(function(){throw e})}function Ya(e){return e==="head"}function lh(e,t){var a=t,n=0;do{var i=a.nextSibling;if(e.removeChild(a),i&&i.nodeType===8)if(a=i.data,a==="/$"||a==="/&"){if(n===0){e.removeChild(i),ul(t);return}n--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")n++;else if(a==="html")ci(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,ci(a);for(var u=a.firstChild;u;){var d=u.nextSibling,v=u.nodeName;u[Rl]||v==="SCRIPT"||v==="STYLE"||v==="LINK"&&u.rel.toLowerCase()==="stylesheet"||a.removeChild(u),u=d}}else a==="body"&&ci(e.ownerDocument.body);a=i}while(a);ul(t)}function ih(e,t){var a=e;e=0;do{var n=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=n}while(a)}function So(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":So(a),Tu(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function T1(e,t,a,n){for(;e.nodeType===1;){var i=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[Rl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(u=e.getAttribute("rel"),u==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(u!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(u=e.getAttribute("src"),(u!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&u&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var u=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===u)return e}else return e;if(e=Ut(e.nextSibling),e===null)break}return null}function R1(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Ut(e.nextSibling),e===null))return null;return e}function rh(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ut(e.nextSibling),e===null))return null;return e}function Eo(e){return e.data==="$?"||e.data==="$~"}function Ao(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function N1(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function Ut(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Co=null;function uh(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Ut(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function ch(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function oh(e,t,a){switch(t=jr(a),e){case"html":if(e=t.documentElement,!e)throw Error(c(452));return e;case"head":if(e=t.head,!e)throw Error(c(453));return e;case"body":if(e=t.body,!e)throw Error(c(454));return e;default:throw Error(c(451))}}function ci(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Tu(e)}var Bt=new Map,sh=new Set;function zr(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var va=K.d;K.d={f:D1,r:_1,D:O1,C:M1,L:j1,m:z1,X:L1,S:w1,M:U1};function D1(){var e=va.f(),t=Cr();return e||t}function _1(e){var t=Rn(e);t!==null&&t.tag===5&&t.type==="form"?Nd(t):va.r(e)}var ll=typeof document>"u"?null:document;function fh(e,t,a){var n=ll;if(n&&typeof t=="string"&&t){var i=_t(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof a=="string"&&(i+='[crossorigin="'+a+'"]'),sh.has(i)||(sh.add(i),e={rel:e,crossOrigin:a,href:t},n.querySelector(i)===null&&(t=n.createElement("link"),lt(t,"link",e),Je(t),n.head.appendChild(t)))}}function O1(e){va.D(e),fh("dns-prefetch",e,null)}function M1(e,t){va.C(e,t),fh("preconnect",e,t)}function j1(e,t,a){va.L(e,t,a);var n=ll;if(n&&e&&t){var i='link[rel="preload"][as="'+_t(t)+'"]';t==="image"&&a&&a.imageSrcSet?(i+='[imagesrcset="'+_t(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(i+='[imagesizes="'+_t(a.imageSizes)+'"]')):i+='[href="'+_t(e)+'"]';var u=i;switch(t){case"style":u=il(e);break;case"script":u=rl(e)}Bt.has(u)||(e=x({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Bt.set(u,e),n.querySelector(i)!==null||t==="style"&&n.querySelector(oi(u))||t==="script"&&n.querySelector(si(u))||(t=n.createElement("link"),lt(t,"link",e),Je(t),n.head.appendChild(t)))}}function z1(e,t){va.m(e,t);var a=ll;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+_t(n)+'"][href="'+_t(e)+'"]',u=i;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=rl(e)}if(!Bt.has(u)&&(e=x({rel:"modulepreload",href:e},t),Bt.set(u,e),a.querySelector(i)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(si(u)))return}n=a.createElement("link"),lt(n,"link",e),Je(n),a.head.appendChild(n)}}}function w1(e,t,a){va.S(e,t,a);var n=ll;if(n&&e){var i=Nn(n).hoistableStyles,u=il(e);t=t||"default";var d=i.get(u);if(!d){var v={loading:0,preload:null};if(d=n.querySelector(oi(u)))v.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Bt.get(u))&&To(e,a);var E=d=n.createElement("link");Je(E),lt(E,"link",e),E._p=new Promise(function(M,L){E.onload=M,E.onerror=L}),E.addEventListener("load",function(){v.loading|=1}),E.addEventListener("error",function(){v.loading|=2}),v.loading|=4,wr(d,t,n)}d={type:"stylesheet",instance:d,count:1,state:v},i.set(u,d)}}}function L1(e,t){va.X(e,t);var a=ll;if(a&&e){var n=Nn(a).hoistableScripts,i=rl(e),u=n.get(i);u||(u=a.querySelector(si(i)),u||(e=x({src:e,async:!0},t),(t=Bt.get(i))&&Ro(e,t),u=a.createElement("script"),Je(u),lt(u,"link",e),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},n.set(i,u))}}function U1(e,t){va.M(e,t);var a=ll;if(a&&e){var n=Nn(a).hoistableScripts,i=rl(e),u=n.get(i);u||(u=a.querySelector(si(i)),u||(e=x({src:e,async:!0,type:"module"},t),(t=Bt.get(i))&&Ro(e,t),u=a.createElement("script"),Je(u),lt(u,"link",e),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},n.set(i,u))}}function dh(e,t,a,n){var i=(i=oe.current)?zr(i):null;if(!i)throw Error(c(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=il(a.href),a=Nn(i).hoistableStyles,n=a.get(t),n||(n={type:"style",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=il(a.href);var u=Nn(i).hoistableStyles,d=u.get(e);if(d||(i=i.ownerDocument||i,d={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(e,d),(u=i.querySelector(oi(e)))&&!u._p&&(d.instance=u,d.state.loading=5),Bt.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Bt.set(e,a),u||B1(i,e,a,d.state))),t&&n===null)throw Error(c(528,""));return d}if(t&&n!==null)throw Error(c(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=rl(a),a=Nn(i).hoistableScripts,n=a.get(t),n||(n={type:"script",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,e))}}function il(e){return'href="'+_t(e)+'"'}function oi(e){return'link[rel="stylesheet"]['+e+"]"}function mh(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function B1(e,t,a,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),lt(t,"link",a),Je(t),e.head.appendChild(t))}function rl(e){return'[src="'+_t(e)+'"]'}function si(e){return"script[async]"+e}function hh(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+_t(a.href)+'"]');if(n)return t.instance=n,Je(n),n;var i=x({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),Je(n),lt(n,"style",i),wr(n,a.precedence,e),t.instance=n;case"stylesheet":i=il(a.href);var u=e.querySelector(oi(i));if(u)return t.state.loading|=4,t.instance=u,Je(u),u;n=mh(a),(i=Bt.get(i))&&To(n,i),u=(e.ownerDocument||e).createElement("link"),Je(u);var d=u;return d._p=new Promise(function(v,E){d.onload=v,d.onerror=E}),lt(u,"link",n),t.state.loading|=4,wr(u,a.precedence,e),t.instance=u;case"script":return u=rl(a.src),(i=e.querySelector(si(u)))?(t.instance=i,Je(i),i):(n=a,(i=Bt.get(u))&&(n=x({},a),Ro(n,i)),e=e.ownerDocument||e,i=e.createElement("script"),Je(i),lt(i,"link",n),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(c(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,wr(n,a.precedence,e));return t.instance}function wr(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=n.length?n[n.length-1]:null,u=i,d=0;d<n.length;d++){var v=n[d];if(v.dataset.precedence===t)u=v;else if(u!==i)break}u?u.parentNode.insertBefore(e,u.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function To(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Ro(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Lr=null;function ph(e,t,a){if(Lr===null){var n=new Map,i=Lr=new Map;i.set(a,n)}else i=Lr,n=i.get(a),n||(n=new Map,i.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),i=0;i<a.length;i++){var u=a[i];if(!(u[Rl]||u[et]||e==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var d=u.getAttribute(t)||"";d=e+d;var v=n.get(d);v?v.push(u):n.set(d,[u])}}return n}function gh(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function H1(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function vh(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function k1(e,t,a,n){if(a.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var i=il(n.href),u=t.querySelector(oi(i));if(u){t=u._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Ur.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=u,Je(u);return}u=t.ownerDocument||t,n=mh(n),(i=Bt.get(i))&&To(n,i),u=u.createElement("link"),Je(u);var d=u;d._p=new Promise(function(v,E){d.onload=v,d.onerror=E}),lt(u,"link",n),a.instance=u}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=Ur.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var No=0;function q1(e,t){return e.stylesheets&&e.count===0&&Hr(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var n=setTimeout(function(){if(e.stylesheets&&Hr(e,e.stylesheets),e.unsuspend){var u=e.unsuspend;e.unsuspend=null,u()}},6e4+t);0<e.imgBytes&&No===0&&(No=62500*x1());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Hr(e,e.stylesheets),e.unsuspend)){var u=e.unsuspend;e.unsuspend=null,u()}},(e.imgBytes>No?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(i)}}:null}function Ur(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Hr(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Br=null;function Hr(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Br=new Map,t.forEach(Q1,e),Br=null,Ur.call(e))}function Q1(e,t){if(!(t.state.loading&4)){var a=Br.get(e);if(a)var n=a.get(null);else{a=new Map,Br.set(e,a);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<i.length;u++){var d=i[u];(d.nodeName==="LINK"||d.getAttribute("media")!=="not all")&&(a.set(d.dataset.precedence,d),n=d)}n&&a.set(null,n)}i=t.instance,d=i.getAttribute("data-precedence"),u=a.get(d)||n,u===n&&a.set(null,i),a.set(d,i),this.count++,n=Ur.bind(this),i.addEventListener("load",n),i.addEventListener("error",n),u?u.parentNode.insertBefore(i,u.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var fi={$$typeof:k,Provider:null,Consumer:null,_currentValue:Y,_currentValue2:Y,_threadCount:0};function G1(e,t,a,n,i,u,d,v,E){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Su(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Su(0),this.hiddenUpdates=Su(null),this.identifierPrefix=n,this.onUncaughtError=i,this.onCaughtError=u,this.onRecoverableError=d,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=E,this.incompleteTransitions=new Map}function yh(e,t,a,n,i,u,d,v,E,M,L,Q){return e=new G1(e,t,a,d,E,M,L,Q,v),t=1,u===!0&&(t|=24),u=xt(3,null,null,t),e.current=u,u.stateNode=e,t=ic(),t.refCount++,e.pooledCache=t,t.refCount++,u.memoizedState={element:n,isDehydrated:a,cache:t},oc(u),e}function bh(e){return e?(e=Bn,e):Bn}function xh(e,t,a,n,i,u){i=bh(i),n.context===null?n.context=i:n.pendingContext=i,n=ja(t),n.payload={element:a},u=u===void 0?null:u,u!==null&&(n.callback=u),a=za(e,n,t),a!==null&&(pt(a,e,t),Yl(a,e,t))}function Sh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Do(e,t){Sh(e,t),(e=e.alternate)&&Sh(e,t)}function Eh(e){if(e.tag===13||e.tag===31){var t=nn(e,67108864);t!==null&&pt(t,e,67108864),Do(e,67108864)}}function Ah(e){if(e.tag===13||e.tag===31){var t=Tt();t=Eu(t);var a=nn(e,t);a!==null&&pt(a,e,t),Do(e,t)}}var kr=!0;function Y1(e,t,a,n){var i=z.T;z.T=null;var u=K.p;try{K.p=2,_o(e,t,a,n)}finally{K.p=u,z.T=i}}function V1(e,t,a,n){var i=z.T;z.T=null;var u=K.p;try{K.p=8,_o(e,t,a,n)}finally{K.p=u,z.T=i}}function _o(e,t,a,n){if(kr){var i=Oo(n);if(i===null)po(e,t,n,qr,a),Th(e,n);else if(F1(i,e,t,a,n))n.stopPropagation();else if(Th(e,n),t&4&&-1<X1.indexOf(e)){for(;i!==null;){var u=Rn(i);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var d=Wa(u.pendingLanes);if(d!==0){var v=u;for(v.pendingLanes|=2,v.entangledLanes|=2;d;){var E=1<<31-yt(d);v.entanglements[1]|=E,d&=~E}$t(u),(xe&6)===0&&(Er=gt()+500,ii(0))}}break;case 31:case 13:v=nn(u,2),v!==null&&pt(v,u,2),Cr(),Do(u,2)}if(u=Oo(n),u===null&&po(e,t,n,qr,a),u===i)break;i=u}i!==null&&n.stopPropagation()}else po(e,t,n,null,a)}}function Oo(e){return e=Mu(e),Mo(e)}var qr=null;function Mo(e){if(qr=null,e=Tn(e),e!==null){var t=f(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=m(t),e!==null)return e;e=null}else if(a===31){if(e=p(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return qr=e,null}function Ch(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(O0()){case Ms:return 2;case js:return 8;case _i:case M0:return 32;case zs:return 268435456;default:return 32}default:return 32}}var jo=!1,Va=null,Xa=null,Fa=null,di=new Map,mi=new Map,Za=[],X1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Th(e,t){switch(e){case"focusin":case"focusout":Va=null;break;case"dragenter":case"dragleave":Xa=null;break;case"mouseover":case"mouseout":Fa=null;break;case"pointerover":case"pointerout":di.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":mi.delete(t.pointerId)}}function hi(e,t,a,n,i,u){return e===null||e.nativeEvent!==u?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:u,targetContainers:[i]},t!==null&&(t=Rn(t),t!==null&&Eh(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function F1(e,t,a,n,i){switch(t){case"focusin":return Va=hi(Va,e,t,a,n,i),!0;case"dragenter":return Xa=hi(Xa,e,t,a,n,i),!0;case"mouseover":return Fa=hi(Fa,e,t,a,n,i),!0;case"pointerover":var u=i.pointerId;return di.set(u,hi(di.get(u)||null,e,t,a,n,i)),!0;case"gotpointercapture":return u=i.pointerId,mi.set(u,hi(mi.get(u)||null,e,t,a,n,i)),!0}return!1}function Rh(e){var t=Tn(e.target);if(t!==null){var a=f(t);if(a!==null){if(t=a.tag,t===13){if(t=m(a),t!==null){e.blockedOn=t,ks(e.priority,function(){Ah(a)});return}}else if(t===31){if(t=p(a),t!==null){e.blockedOn=t,ks(e.priority,function(){Ah(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Qr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=Oo(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);Ou=n,a.target.dispatchEvent(n),Ou=null}else return t=Rn(a),t!==null&&Eh(t),e.blockedOn=a,!1;t.shift()}return!0}function Nh(e,t,a){Qr(e)&&a.delete(t)}function Z1(){jo=!1,Va!==null&&Qr(Va)&&(Va=null),Xa!==null&&Qr(Xa)&&(Xa=null),Fa!==null&&Qr(Fa)&&(Fa=null),di.forEach(Nh),mi.forEach(Nh)}function Gr(e,t){e.blockedOn===t&&(e.blockedOn=null,jo||(jo=!0,l.unstable_scheduleCallback(l.unstable_NormalPriority,Z1)))}var Yr=null;function Dh(e){Yr!==e&&(Yr=e,l.unstable_scheduleCallback(l.unstable_NormalPriority,function(){Yr===e&&(Yr=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],i=e[t+2];if(typeof n!="function"){if(Mo(n||a)===null)continue;break}var u=Rn(a);u!==null&&(e.splice(t,3),t-=3,_c(u,{pending:!0,data:i,method:a.method,action:n},n,i))}}))}function ul(e){function t(E){return Gr(E,e)}Va!==null&&Gr(Va,e),Xa!==null&&Gr(Xa,e),Fa!==null&&Gr(Fa,e),di.forEach(t),mi.forEach(t);for(var a=0;a<Za.length;a++){var n=Za[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<Za.length&&(a=Za[0],a.blockedOn===null);)Rh(a),a.blockedOn===null&&Za.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var i=a[n],u=a[n+1],d=i[ot]||null;if(typeof u=="function")d||Dh(a);else if(d){var v=null;if(u&&u.hasAttribute("formAction")){if(i=u,d=u[ot]||null)v=d.formAction;else if(Mo(i)!==null)continue}else v=d.action;typeof v=="function"?a[n+1]=v:(a.splice(n,3),n-=3),Dh(a)}}}function _h(){function e(u){u.canIntercept&&u.info==="react-transition"&&u.intercept({handler:function(){return new Promise(function(d){return i=d})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),n||setTimeout(a,20)}function a(){if(!n&&!navigation.transition){var u=navigation.currentEntry;u&&u.url!=null&&navigation.navigate(u.url,{state:u.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function zo(e){this._internalRoot=e}Vr.prototype.render=zo.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(c(409));var a=t.current,n=Tt();xh(a,n,e,t,null,null)},Vr.prototype.unmount=zo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;xh(e.current,2,null,e,null,null),Cr(),t[Cn]=null}};function Vr(e){this._internalRoot=e}Vr.prototype.unstable_scheduleHydration=function(e){if(e){var t=Hs();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Za.length&&t!==0&&t<Za[a].priority;a++);Za.splice(a,0,e),a===0&&Rh(e)}};var Oh=r.version;if(Oh!=="19.2.3")throw Error(c(527,Oh,"19.2.3"));K.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(c(188)):(e=Object.keys(e).join(","),Error(c(268,e)));return e=h(t),e=e!==null?S(e):null,e=e===null?null:e.stateNode,e};var K1={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Xr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xr.isDisabled&&Xr.supportsFiber)try{Al=Xr.inject(K1),vt=Xr}catch{}}return gi.createRoot=function(e,t){if(!s(e))throw Error(c(299));var a=!1,n="",i=Bd,u=Hd,d=kd;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(u=t.onCaughtError),t.onRecoverableError!==void 0&&(d=t.onRecoverableError)),t=yh(e,1,!1,null,null,a,n,null,i,u,d,_h),e[Cn]=t.current,ho(e),new zo(t)},gi.hydrateRoot=function(e,t,a){if(!s(e))throw Error(c(299));var n=!1,i="",u=Bd,d=Hd,v=kd,E=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(i=a.identifierPrefix),a.onUncaughtError!==void 0&&(u=a.onUncaughtError),a.onCaughtError!==void 0&&(d=a.onCaughtError),a.onRecoverableError!==void 0&&(v=a.onRecoverableError),a.formState!==void 0&&(E=a.formState)),t=yh(e,1,!0,t,a??null,n,i,E,u,d,v,_h),t.context=bh(null),a=t.current,n=Tt(),n=Eu(n),i=ja(n),i.callback=null,za(a,i,n),a=n,t.current.lanes=a,Tl(t,a),$t(t),e[Cn]=t.current,ho(e),new Vr(t)},gi.version="19.2.3",gi}var qh;function ly(){if(qh)return Uo.exports;qh=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(r){console.error(r)}}return l(),Uo.exports=ny(),Uo.exports}var iy=ly();var Qh="popstate";function Gh(l){return typeof l=="object"&&l!=null&&"pathname"in l&&"search"in l&&"hash"in l&&"state"in l&&"key"in l}function ry(l={}){function r(c,s){let f=s.state?.masked,{pathname:m,search:p,hash:b}=f||c.location;return ts("",{pathname:m,search:p,hash:b},s.state&&s.state.usr||null,s.state&&s.state.key||"default",f?{pathname:c.location.pathname,search:c.location.search,hash:c.location.hash}:void 0)}function o(c,s){return typeof s=="string"?s:Si(s)}return cy(r,o,null,l)}function Be(l,r){if(l===!1||l===null||typeof l>"u")throw new Error(r)}function Vt(l,r){if(!l){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function uy(){return Math.random().toString(36).substring(2,10)}function Yh(l,r){return{usr:l.state,key:l.key,idx:r,masked:l.unstable_mask?{pathname:l.pathname,search:l.search,hash:l.hash}:void 0}}function ts(l,r,o=null,c,s){return{pathname:typeof l=="string"?l:l.pathname,search:"",hash:"",...typeof r=="string"?vl(r):r,state:o,key:r&&r.key||c||uy(),unstable_mask:s}}function Si({pathname:l="/",search:r="",hash:o=""}){return r&&r!=="?"&&(l+=r.charAt(0)==="?"?r:"?"+r),o&&o!=="#"&&(l+=o.charAt(0)==="#"?o:"#"+o),l}function vl(l){let r={};if(l){let o=l.indexOf("#");o>=0&&(r.hash=l.substring(o),l=l.substring(0,o));let c=l.indexOf("?");c>=0&&(r.search=l.substring(c),l=l.substring(0,c)),l&&(r.pathname=l)}return r}function cy(l,r,o,c={}){let{window:s=document.defaultView,v5Compat:f=!1}=c,m=s.history,p="POP",b=null,h=S();h==null&&(h=0,m.replaceState({...m.state,idx:h},""));function S(){return(m.state||{idx:null}).idx}function x(){p="POP";let C=S(),H=C==null?null:C-h;h=C,b&&b({action:p,location:R.location,delta:H})}function _(C,H){p="PUSH";let V=Gh(C)?C:ts(R.location,C,H);h=S()+1;let k=Yh(V,h),G=R.createHref(V.unstable_mask||V);try{m.pushState(k,"",G)}catch(P){if(P instanceof DOMException&&P.name==="DataCloneError")throw P;s.location.assign(G)}f&&b&&b({action:p,location:R.location,delta:1})}function U(C,H){p="REPLACE";let V=Gh(C)?C:ts(R.location,C,H);h=S();let k=Yh(V,h),G=R.createHref(V.unstable_mask||V);m.replaceState(k,"",G),f&&b&&b({action:p,location:R.location,delta:0})}function D(C){return oy(C)}let R={get action(){return p},get location(){return l(s,m)},listen(C){if(b)throw new Error("A history only accepts one active listener");return s.addEventListener(Qh,x),b=C,()=>{s.removeEventListener(Qh,x),b=null}},createHref(C){return r(s,C)},createURL:D,encodeLocation(C){let H=D(C);return{pathname:H.pathname,search:H.search,hash:H.hash}},push:_,replace:U,go(C){return m.go(C)}};return R}function oy(l,r=!1){let o="http://localhost";typeof window<"u"&&(o=window.location.origin!=="null"?window.location.origin:window.location.href),Be(o,"No window.location.(origin|href) available to create URL");let c=typeof l=="string"?l:Si(l);return c=c.replace(/ $/,"%20"),!r&&c.startsWith("//")&&(c=o+c),new URL(c,o)}function Tp(l,r,o="/"){return sy(l,r,o,!1)}function sy(l,r,o,c){let s=typeof r=="string"?vl(r):r,f=xa(s.pathname||"/",o);if(f==null)return null;let m=Rp(l);fy(m);let p=null;for(let b=0;p==null&&b<m.length;++b){let h=Ey(f);p=xy(m[b],h,c)}return p}function Rp(l,r=[],o=[],c="",s=!1){let f=(m,p,b=s,h)=>{let S={relativePath:h===void 0?m.path||"":h,caseSensitive:m.caseSensitive===!0,childrenIndex:p,route:m};if(S.relativePath.startsWith("/")){if(!S.relativePath.startsWith(c)&&b)return;Be(S.relativePath.startsWith(c),`Absolute route path "${S.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),S.relativePath=S.relativePath.slice(c.length)}let x=It([c,S.relativePath]),_=o.concat(S);m.children&&m.children.length>0&&(Be(m.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${x}".`),Rp(m.children,r,_,x,b)),!(m.path==null&&!m.index)&&r.push({path:x,score:yy(x,m.index),routesMeta:_})};return l.forEach((m,p)=>{if(m.path===""||!m.path?.includes("?"))f(m,p);else for(let b of Np(m.path))f(m,p,!0,b)}),r}function Np(l){let r=l.split("/");if(r.length===0)return[];let[o,...c]=r,s=o.endsWith("?"),f=o.replace(/\?$/,"");if(c.length===0)return s?[f,""]:[f];let m=Np(c.join("/")),p=[];return p.push(...m.map(b=>b===""?f:[f,b].join("/"))),s&&p.push(...m),p.map(b=>l.startsWith("/")&&b===""?"/":b)}function fy(l){l.sort((r,o)=>r.score!==o.score?o.score-r.score:by(r.routesMeta.map(c=>c.childrenIndex),o.routesMeta.map(c=>c.childrenIndex)))}var dy=/^:[\w-]+$/,my=3,hy=2,py=1,gy=10,vy=-2,Vh=l=>l==="*";function yy(l,r){let o=l.split("/"),c=o.length;return o.some(Vh)&&(c+=vy),r&&(c+=hy),o.filter(s=>!Vh(s)).reduce((s,f)=>s+(dy.test(f)?my:f===""?py:gy),c)}function by(l,r){return l.length===r.length&&l.slice(0,-1).every((c,s)=>c===r[s])?l[l.length-1]-r[r.length-1]:0}function xy(l,r,o=!1){let{routesMeta:c}=l,s={},f="/",m=[];for(let p=0;p<c.length;++p){let b=c[p],h=p===c.length-1,S=f==="/"?r:r.slice(f.length)||"/",x=lu({path:b.relativePath,caseSensitive:b.caseSensitive,end:h},S),_=b.route;if(!x&&h&&o&&!c[c.length-1].route.index&&(x=lu({path:b.relativePath,caseSensitive:b.caseSensitive,end:!1},S)),!x)return null;Object.assign(s,x.params),m.push({params:s,pathname:It([f,x.pathname]),pathnameBase:Ry(It([f,x.pathnameBase])),route:_}),x.pathnameBase!=="/"&&(f=It([f,x.pathnameBase]))}return m}function lu(l,r){typeof l=="string"&&(l={path:l,caseSensitive:!1,end:!0});let[o,c]=Sy(l.path,l.caseSensitive,l.end),s=r.match(o);if(!s)return null;let f=s[0],m=f.replace(/(.)\/+$/,"$1"),p=s.slice(1);return{params:c.reduce((h,{paramName:S,isOptional:x},_)=>{if(S==="*"){let D=p[_]||"";m=f.slice(0,f.length-D.length).replace(/(.)\/+$/,"$1")}const U=p[_];return x&&!U?h[S]=void 0:h[S]=(U||"").replace(/%2F/g,"/"),h},{}),pathname:f,pathnameBase:m,pattern:l}}function Sy(l,r=!1,o=!0){Vt(l==="*"||!l.endsWith("*")||l.endsWith("/*"),`Route path "${l}" will be treated as if it were "${l.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(/\*$/,"/*")}".`);let c=[],s="^"+l.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(m,p,b,h,S)=>{if(c.push({paramName:p,isOptional:b!=null}),b){let x=S.charAt(h+m.length);return x&&x!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return l.endsWith("*")?(c.push({paramName:"*"}),s+=l==="*"||l==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):o?s+="\\/*$":l!==""&&l!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,r?void 0:"i"),c]}function Ey(l){try{return l.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return Vt(!1,`The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`),l}}function xa(l,r){if(r==="/")return l;if(!l.toLowerCase().startsWith(r.toLowerCase()))return null;let o=r.endsWith("/")?r.length-1:r.length,c=l.charAt(o);return c&&c!=="/"?null:l.slice(o)||"/"}var Ay=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Cy(l,r="/"){let{pathname:o,search:c="",hash:s=""}=typeof l=="string"?vl(l):l,f;return o?(o=o.replace(/\/\/+/g,"/"),o.startsWith("/")?f=Xh(o.substring(1),"/"):f=Xh(o,r)):f=r,{pathname:f,search:Ny(c),hash:Dy(s)}}function Xh(l,r){let o=r.replace(/\/+$/,"").split("/");return l.split("/").forEach(s=>{s===".."?o.length>1&&o.pop():s!=="."&&o.push(s)}),o.length>1?o.join("/"):"/"}function qo(l,r,o,c){return`Cannot include a '${l}' character in a manually specified \`to.${r}\` field [${JSON.stringify(c)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ty(l){return l.filter((r,o)=>o===0||r.route.path&&r.route.path.length>0)}function ds(l){let r=Ty(l);return r.map((o,c)=>c===r.length-1?o.pathname:o.pathnameBase)}function ou(l,r,o,c=!1){let s;typeof l=="string"?s=vl(l):(s={...l},Be(!s.pathname||!s.pathname.includes("?"),qo("?","pathname","search",s)),Be(!s.pathname||!s.pathname.includes("#"),qo("#","pathname","hash",s)),Be(!s.search||!s.search.includes("#"),qo("#","search","hash",s)));let f=l===""||s.pathname==="",m=f?"/":s.pathname,p;if(m==null)p=o;else{let x=r.length-1;if(!c&&m.startsWith("..")){let _=m.split("/");for(;_[0]==="..";)_.shift(),x-=1;s.pathname=_.join("/")}p=x>=0?r[x]:"/"}let b=Cy(s,p),h=m&&m!=="/"&&m.endsWith("/"),S=(f||m===".")&&o.endsWith("/");return!b.pathname.endsWith("/")&&(h||S)&&(b.pathname+="/"),b}var It=l=>l.join("/").replace(/\/\/+/g,"/"),Ry=l=>l.replace(/\/+$/,"").replace(/^\/*/,"/"),Ny=l=>!l||l==="?"?"":l.startsWith("?")?l:"?"+l,Dy=l=>!l||l==="#"?"":l.startsWith("#")?l:"#"+l,_y=class{constructor(l,r,o,c=!1){this.status=l,this.statusText=r||"",this.internal=c,o instanceof Error?(this.data=o.toString(),this.error=o):this.data=o}};function Oy(l){return l!=null&&typeof l.status=="number"&&typeof l.statusText=="string"&&typeof l.internal=="boolean"&&"data"in l}function My(l){return l.map(r=>r.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Dp=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function _p(l,r){let o=l;if(typeof o!="string"||!Ay.test(o))return{absoluteURL:void 0,isExternal:!1,to:o};let c=o,s=!1;if(Dp)try{let f=new URL(window.location.href),m=o.startsWith("//")?new URL(f.protocol+o):new URL(o),p=xa(m.pathname,r);m.origin===f.origin&&p!=null?o=p+m.search+m.hash:s=!0}catch{Vt(!1,`<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:c,isExternal:s,to:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Op=["POST","PUT","PATCH","DELETE"];new Set(Op);var jy=["GET",...Op];new Set(jy);var yl=g.createContext(null);yl.displayName="DataRouter";var su=g.createContext(null);su.displayName="DataRouterState";var Mp=g.createContext(!1);function zy(){return g.useContext(Mp)}var jp=g.createContext({isTransitioning:!1});jp.displayName="ViewTransition";var wy=g.createContext(new Map);wy.displayName="Fetchers";var Ly=g.createContext(null);Ly.displayName="Await";var Nt=g.createContext(null);Nt.displayName="Navigation";var Ai=g.createContext(null);Ai.displayName="Location";var qt=g.createContext({outlet:null,matches:[],isDataRoute:!1});qt.displayName="Route";var ms=g.createContext(null);ms.displayName="RouteError";var zp="REACT_ROUTER_ERROR",Uy="REDIRECT",By="ROUTE_ERROR_RESPONSE";function Hy(l){if(l.startsWith(`${zp}:${Uy}:{`))try{let r=JSON.parse(l.slice(28));if(typeof r=="object"&&r&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.location=="string"&&typeof r.reloadDocument=="boolean"&&typeof r.replace=="boolean")return r}catch{}}function ky(l){if(l.startsWith(`${zp}:${By}:{`))try{let r=JSON.parse(l.slice(40));if(typeof r=="object"&&r&&typeof r.status=="number"&&typeof r.statusText=="string")return new _y(r.status,r.statusText,r.data)}catch{}}function qy(l,{relative:r}={}){Be(bl(),"useHref() may be used only in the context of a <Router> component.");let{basename:o,navigator:c}=g.useContext(Nt),{hash:s,pathname:f,search:m}=Ci(l,{relative:r}),p=f;return o!=="/"&&(p=f==="/"?o:It([o,f])),c.createHref({pathname:p,search:m,hash:s})}function bl(){return g.useContext(Ai)!=null}function Xt(){return Be(bl(),"useLocation() may be used only in the context of a <Router> component."),g.useContext(Ai).location}var wp="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Lp(l){g.useContext(Nt).static||g.useLayoutEffect(l)}function An(){let{isDataRoute:l}=g.useContext(qt);return l?tb():Qy()}function Qy(){Be(bl(),"useNavigate() may be used only in the context of a <Router> component.");let l=g.useContext(yl),{basename:r,navigator:o}=g.useContext(Nt),{matches:c}=g.useContext(qt),{pathname:s}=Xt(),f=JSON.stringify(ds(c)),m=g.useRef(!1);return Lp(()=>{m.current=!0}),g.useCallback((b,h={})=>{if(Vt(m.current,wp),!m.current)return;if(typeof b=="number"){o.go(b);return}let S=ou(b,JSON.parse(f),s,h.relative==="path");l==null&&r!=="/"&&(S.pathname=S.pathname==="/"?r:It([r,S.pathname])),(h.replace?o.replace:o.push)(S,h.state,h)},[r,o,f,s,l])}var Gy=g.createContext(null);function Yy(l){let r=g.useContext(qt).outlet;return g.useMemo(()=>r&&g.createElement(Gy.Provider,{value:l},r),[r,l])}function Up(){let{matches:l}=g.useContext(qt),r=l[l.length-1];return r?r.params:{}}function Ci(l,{relative:r}={}){let{matches:o}=g.useContext(qt),{pathname:c}=Xt(),s=JSON.stringify(ds(o));return g.useMemo(()=>ou(l,JSON.parse(s),c,r==="path"),[l,s,c,r])}function Vy(l,r){return Bp(l,r)}function Bp(l,r,o){Be(bl(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:c}=g.useContext(Nt),{matches:s}=g.useContext(qt),f=s[s.length-1],m=f?f.params:{},p=f?f.pathname:"/",b=f?f.pathnameBase:"/",h=f&&f.route;{let C=h&&h.path||"";kp(p,!h||C.endsWith("*")||C.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C==="/"?"*":`${C}/*`}">.`)}let S=Xt(),x;if(r){let C=typeof r=="string"?vl(r):r;Be(b==="/"||C.pathname?.startsWith(b),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${b}" but pathname "${C.pathname}" was given in the \`location\` prop.`),x=C}else x=S;let _=x.pathname||"/",U=_;if(b!=="/"){let C=b.replace(/^\//,"").split("/");U="/"+_.replace(/^\//,"").split("/").slice(C.length).join("/")}let D=Tp(l,{pathname:U});Vt(h||D!=null,`No routes matched location "${x.pathname}${x.search}${x.hash}" `),Vt(D==null||D[D.length-1].route.element!==void 0||D[D.length-1].route.Component!==void 0||D[D.length-1].route.lazy!==void 0,`Matched leaf route at location "${x.pathname}${x.search}${x.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let R=Py(D&&D.map(C=>Object.assign({},C,{params:Object.assign({},m,C.params),pathname:It([b,c.encodeLocation?c.encodeLocation(C.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:C.pathname]),pathnameBase:C.pathnameBase==="/"?b:It([b,c.encodeLocation?c.encodeLocation(C.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:C.pathnameBase])})),s,o);return r&&R?g.createElement(Ai.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...x},navigationType:"POP"}},R):R}function Xy(){let l=eb(),r=Oy(l)?`${l.status} ${l.statusText}`:l instanceof Error?l.message:JSON.stringify(l),o=l instanceof Error?l.stack:null,c="rgba(200,200,200, 0.5)",s={padding:"0.5rem",backgroundColor:c},f={padding:"2px 4px",backgroundColor:c},m=null;return console.error("Error handled by React Router default ErrorBoundary:",l),m=g.createElement(g.Fragment,null,g.createElement("p",null,"💿 Hey developer 👋"),g.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",g.createElement("code",{style:f},"ErrorBoundary")," or"," ",g.createElement("code",{style:f},"errorElement")," prop on your route.")),g.createElement(g.Fragment,null,g.createElement("h2",null,"Unexpected Application Error!"),g.createElement("h3",{style:{fontStyle:"italic"}},r),o?g.createElement("pre",{style:s},o):null,m)}var Fy=g.createElement(Xy,null),Hp=class extends g.Component{constructor(l){super(l),this.state={location:l.location,revalidation:l.revalidation,error:l.error}}static getDerivedStateFromError(l){return{error:l}}static getDerivedStateFromProps(l,r){return r.location!==l.location||r.revalidation!=="idle"&&l.revalidation==="idle"?{error:l.error,location:l.location,revalidation:l.revalidation}:{error:l.error!==void 0?l.error:r.error,location:r.location,revalidation:l.revalidation||r.revalidation}}componentDidCatch(l,r){this.props.onError?this.props.onError(l,r):console.error("React Router caught the following error during render",l)}render(){let l=this.state.error;if(this.context&&typeof l=="object"&&l&&"digest"in l&&typeof l.digest=="string"){const o=ky(l.digest);o&&(l=o)}let r=l!==void 0?g.createElement(qt.Provider,{value:this.props.routeContext},g.createElement(ms.Provider,{value:l,children:this.props.component})):this.props.children;return this.context?g.createElement(Zy,{error:l},r):r}};Hp.contextType=Mp;var Qo=new WeakMap;function Zy({children:l,error:r}){let{basename:o}=g.useContext(Nt);if(typeof r=="object"&&r&&"digest"in r&&typeof r.digest=="string"){let c=Hy(r.digest);if(c){let s=Qo.get(r);if(s)throw s;let f=_p(c.location,o);if(Dp&&!Qo.get(r))if(f.isExternal||c.reloadDocument)window.location.href=f.absoluteURL||f.to;else{const m=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(f.to,{replace:c.replace}));throw Qo.set(r,m),m}return g.createElement("meta",{httpEquiv:"refresh",content:`0;url=${f.absoluteURL||f.to}`})}}return l}function Ky({routeContext:l,match:r,children:o}){let c=g.useContext(yl);return c&&c.static&&c.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(c.staticContext._deepestRenderedBoundaryId=r.route.id),g.createElement(qt.Provider,{value:l},o)}function Py(l,r=[],o){let c=o?.state;if(l==null){if(!c)return null;if(c.errors)l=c.matches;else if(r.length===0&&!c.initialized&&c.matches.length>0)l=c.matches;else return null}let s=l,f=c?.errors;if(f!=null){let S=s.findIndex(x=>x.route.id&&f?.[x.route.id]!==void 0);Be(S>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(f).join(",")}`),s=s.slice(0,Math.min(s.length,S+1))}let m=!1,p=-1;if(o&&c){m=c.renderFallback;for(let S=0;S<s.length;S++){let x=s[S];if((x.route.HydrateFallback||x.route.hydrateFallbackElement)&&(p=S),x.route.id){let{loaderData:_,errors:U}=c,D=x.route.loader&&!_.hasOwnProperty(x.route.id)&&(!U||U[x.route.id]===void 0);if(x.route.lazy||D){o.isStatic&&(m=!0),p>=0?s=s.slice(0,p+1):s=[s[0]];break}}}}let b=o?.onError,h=c&&b?(S,x)=>{b(S,{location:c.location,params:c.matches?.[0]?.params??{},unstable_pattern:My(c.matches),errorInfo:x})}:void 0;return s.reduceRight((S,x,_)=>{let U,D=!1,R=null,C=null;c&&(U=f&&x.route.id?f[x.route.id]:void 0,R=x.route.errorElement||Fy,m&&(p<0&&_===0?(kp("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),D=!0,C=null):p===_&&(D=!0,C=x.route.hydrateFallbackElement||null)));let H=r.concat(s.slice(0,_+1)),V=()=>{let k;return U?k=R:D?k=C:x.route.Component?k=g.createElement(x.route.Component,null):x.route.element?k=x.route.element:k=S,g.createElement(Ky,{match:x,routeContext:{outlet:S,matches:H,isDataRoute:c!=null},children:k})};return c&&(x.route.ErrorBoundary||x.route.errorElement||_===0)?g.createElement(Hp,{location:c.location,revalidation:c.revalidation,component:R,error:U,children:V(),routeContext:{outlet:null,matches:H,isDataRoute:!0},onError:h}):V()},null)}function hs(l){return`${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Jy(l){let r=g.useContext(yl);return Be(r,hs(l)),r}function $y(l){let r=g.useContext(su);return Be(r,hs(l)),r}function Wy(l){let r=g.useContext(qt);return Be(r,hs(l)),r}function ps(l){let r=Wy(l),o=r.matches[r.matches.length-1];return Be(o.route.id,`${l} can only be used on routes that contain a unique "id"`),o.route.id}function Iy(){return ps("useRouteId")}function eb(){let l=g.useContext(ms),r=$y("useRouteError"),o=ps("useRouteError");return l!==void 0?l:r.errors?.[o]}function tb(){let{router:l}=Jy("useNavigate"),r=ps("useNavigate"),o=g.useRef(!1);return Lp(()=>{o.current=!0}),g.useCallback(async(s,f={})=>{Vt(o.current,wp),o.current&&(typeof s=="number"?await l.navigate(s):await l.navigate(s,{fromRouteId:r,...f}))},[l,r])}var Fh={};function kp(l,r,o){!r&&!Fh[l]&&(Fh[l]=!0,Vt(!1,o))}g.memo(ab);function ab({routes:l,future:r,state:o,isStatic:c,onError:s}){return Bp(l,void 0,{state:o,isStatic:c,onError:s})}function iu({to:l,replace:r,state:o,relative:c}){Be(bl(),"<Navigate> may be used only in the context of a <Router> component.");let{static:s}=g.useContext(Nt);Vt(!s,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:f}=g.useContext(qt),{pathname:m}=Xt(),p=An(),b=ou(l,ds(f),m,c==="path"),h=JSON.stringify(b);return g.useEffect(()=>{p(JSON.parse(h),{replace:r,state:o,relative:c})},[p,h,c,r,o]),null}function nb(l){return Yy(l.context)}function Rt(l){Be(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function lb({basename:l="/",children:r=null,location:o,navigationType:c="POP",navigator:s,static:f=!1,unstable_useTransitions:m}){Be(!bl(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let p=l.replace(/^\/*/,"/"),b=g.useMemo(()=>({basename:p,navigator:s,static:f,unstable_useTransitions:m,future:{}}),[p,s,f,m]);typeof o=="string"&&(o=vl(o));let{pathname:h="/",search:S="",hash:x="",state:_=null,key:U="default",unstable_mask:D}=o,R=g.useMemo(()=>{let C=xa(h,p);return C==null?null:{location:{pathname:C,search:S,hash:x,state:_,key:U,unstable_mask:D},navigationType:c}},[p,h,S,x,_,U,c,D]);return Vt(R!=null,`<Router basename="${p}"> is not able to match the URL "${h}${S}${x}" because it does not start with the basename, so the <Router> won't render anything.`),R==null?null:g.createElement(Nt.Provider,{value:b},g.createElement(Ai.Provider,{children:r,value:R}))}function ib({children:l,location:r}){return Vy(as(l),r)}function as(l,r=[]){let o=[];return g.Children.forEach(l,(c,s)=>{if(!g.isValidElement(c))return;let f=[...r,s];if(c.type===g.Fragment){o.push.apply(o,as(c.props.children,f));return}Be(c.type===Rt,`[${typeof c.type=="string"?c.type:c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Be(!c.props.index||!c.props.children,"An index route cannot have child routes.");let m={id:c.props.id||f.join("-"),caseSensitive:c.props.caseSensitive,element:c.props.element,Component:c.props.Component,index:c.props.index,path:c.props.path,middleware:c.props.middleware,loader:c.props.loader,action:c.props.action,hydrateFallbackElement:c.props.hydrateFallbackElement,HydrateFallback:c.props.HydrateFallback,errorElement:c.props.errorElement,ErrorBoundary:c.props.ErrorBoundary,hasErrorBoundary:c.props.hasErrorBoundary===!0||c.props.ErrorBoundary!=null||c.props.errorElement!=null,shouldRevalidate:c.props.shouldRevalidate,handle:c.props.handle,lazy:c.props.lazy};c.props.children&&(m.children=as(c.props.children,f)),o.push(m)}),o}var eu="get",tu="application/x-www-form-urlencoded";function fu(l){return typeof HTMLElement<"u"&&l instanceof HTMLElement}function rb(l){return fu(l)&&l.tagName.toLowerCase()==="button"}function ub(l){return fu(l)&&l.tagName.toLowerCase()==="form"}function cb(l){return fu(l)&&l.tagName.toLowerCase()==="input"}function ob(l){return!!(l.metaKey||l.altKey||l.ctrlKey||l.shiftKey)}function sb(l,r){return l.button===0&&(!r||r==="_self")&&!ob(l)}var Fr=null;function fb(){if(Fr===null)try{new FormData(document.createElement("form"),0),Fr=!1}catch{Fr=!0}return Fr}var db=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Go(l){return l!=null&&!db.has(l)?(Vt(!1,`"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${tu}"`),null):l}function mb(l,r){let o,c,s,f,m;if(ub(l)){let p=l.getAttribute("action");c=p?xa(p,r):null,o=l.getAttribute("method")||eu,s=Go(l.getAttribute("enctype"))||tu,f=new FormData(l)}else if(rb(l)||cb(l)&&(l.type==="submit"||l.type==="image")){let p=l.form;if(p==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let b=l.getAttribute("formaction")||p.getAttribute("action");if(c=b?xa(b,r):null,o=l.getAttribute("formmethod")||p.getAttribute("method")||eu,s=Go(l.getAttribute("formenctype"))||Go(p.getAttribute("enctype"))||tu,f=new FormData(p,l),!fb()){let{name:h,type:S,value:x}=l;if(S==="image"){let _=h?`${h}.`:"";f.append(`${_}x`,"0"),f.append(`${_}y`,"0")}else h&&f.append(h,x)}}else{if(fu(l))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');o=eu,c=null,s=tu,m=l}return f&&s==="text/plain"&&(m=f,f=void 0),{action:c,method:o.toLowerCase(),encType:s,formData:f,body:m}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function gs(l,r){if(l===!1||l===null||typeof l>"u")throw new Error(r)}function qp(l,r,o,c){let s=typeof l=="string"?new URL(l,typeof window>"u"?"server://singlefetch/":window.location.origin):l;return o?s.pathname.endsWith("/")?s.pathname=`${s.pathname}_.${c}`:s.pathname=`${s.pathname}.${c}`:s.pathname==="/"?s.pathname=`_root.${c}`:r&&xa(s.pathname,r)==="/"?s.pathname=`${r.replace(/\/$/,"")}/_root.${c}`:s.pathname=`${s.pathname.replace(/\/$/,"")}.${c}`,s}async function hb(l,r){if(l.id in r)return r[l.id];try{let o=await import(l.module);return r[l.id]=o,o}catch(o){return console.error(`Error loading route module \`${l.module}\`, reloading page...`),console.error(o),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function pb(l){return l==null?!1:l.href==null?l.rel==="preload"&&typeof l.imageSrcSet=="string"&&typeof l.imageSizes=="string":typeof l.rel=="string"&&typeof l.href=="string"}async function gb(l,r,o){let c=await Promise.all(l.map(async s=>{let f=r.routes[s.route.id];if(f){let m=await hb(f,o);return m.links?m.links():[]}return[]}));return xb(c.flat(1).filter(pb).filter(s=>s.rel==="stylesheet"||s.rel==="preload").map(s=>s.rel==="stylesheet"?{...s,rel:"prefetch",as:"style"}:{...s,rel:"prefetch"}))}function Zh(l,r,o,c,s,f){let m=(b,h)=>o[h]?b.route.id!==o[h].route.id:!0,p=(b,h)=>o[h].pathname!==b.pathname||o[h].route.path?.endsWith("*")&&o[h].params["*"]!==b.params["*"];return f==="assets"?r.filter((b,h)=>m(b,h)||p(b,h)):f==="data"?r.filter((b,h)=>{let S=c.routes[b.route.id];if(!S||!S.hasLoader)return!1;if(m(b,h)||p(b,h))return!0;if(b.route.shouldRevalidate){let x=b.route.shouldRevalidate({currentUrl:new URL(s.pathname+s.search+s.hash,window.origin),currentParams:o[0]?.params||{},nextUrl:new URL(l,window.origin),nextParams:b.params,defaultShouldRevalidate:!0});if(typeof x=="boolean")return x}return!0}):[]}function vb(l,r,{includeHydrateFallback:o}={}){return yb(l.map(c=>{let s=r.routes[c.route.id];if(!s)return[];let f=[s.module];return s.clientActionModule&&(f=f.concat(s.clientActionModule)),s.clientLoaderModule&&(f=f.concat(s.clientLoaderModule)),o&&s.hydrateFallbackModule&&(f=f.concat(s.hydrateFallbackModule)),s.imports&&(f=f.concat(s.imports)),f}).flat(1))}function yb(l){return[...new Set(l)]}function bb(l){let r={},o=Object.keys(l).sort();for(let c of o)r[c]=l[c];return r}function xb(l,r){let o=new Set;return new Set(r),l.reduce((c,s)=>{let f=JSON.stringify(bb(s));return o.has(f)||(o.add(f),c.push({key:f,link:s})),c},[])}function vs(){let l=g.useContext(yl);return gs(l,"You must render this element inside a <DataRouterContext.Provider> element"),l}function Sb(){let l=g.useContext(su);return gs(l,"You must render this element inside a <DataRouterStateContext.Provider> element"),l}var ys=g.createContext(void 0);ys.displayName="FrameworkContext";function bs(){let l=g.useContext(ys);return gs(l,"You must render this element inside a <HydratedRouter> element"),l}function Eb(l,r){let o=g.useContext(ys),[c,s]=g.useState(!1),[f,m]=g.useState(!1),{onFocus:p,onBlur:b,onMouseEnter:h,onMouseLeave:S,onTouchStart:x}=r,_=g.useRef(null);g.useEffect(()=>{if(l==="render"&&m(!0),l==="viewport"){let R=H=>{H.forEach(V=>{m(V.isIntersecting)})},C=new IntersectionObserver(R,{threshold:.5});return _.current&&C.observe(_.current),()=>{C.disconnect()}}},[l]),g.useEffect(()=>{if(c){let R=setTimeout(()=>{m(!0)},100);return()=>{clearTimeout(R)}}},[c]);let U=()=>{s(!0)},D=()=>{s(!1),m(!1)};return o?l!=="intent"?[f,_,{}]:[f,_,{onFocus:vi(p,U),onBlur:vi(b,D),onMouseEnter:vi(h,U),onMouseLeave:vi(S,D),onTouchStart:vi(x,U)}]:[!1,_,{}]}function vi(l,r){return o=>{l&&l(o),o.defaultPrevented||r(o)}}function Ab({page:l,...r}){let o=zy(),{router:c}=vs(),s=g.useMemo(()=>Tp(c.routes,l,c.basename),[c.routes,l,c.basename]);return s?o?g.createElement(Tb,{page:l,matches:s,...r}):g.createElement(Rb,{page:l,matches:s,...r}):null}function Cb(l){let{manifest:r,routeModules:o}=bs(),[c,s]=g.useState([]);return g.useEffect(()=>{let f=!1;return gb(l,r,o).then(m=>{f||s(m)}),()=>{f=!0}},[l,r,o]),c}function Tb({page:l,matches:r,...o}){let c=Xt(),{future:s}=bs(),{basename:f}=vs(),m=g.useMemo(()=>{if(l===c.pathname+c.search+c.hash)return[];let p=qp(l,f,s.unstable_trailingSlashAwareDataRequests,"rsc"),b=!1,h=[];for(let S of r)typeof S.route.shouldRevalidate=="function"?b=!0:h.push(S.route.id);return b&&h.length>0&&p.searchParams.set("_routes",h.join(",")),[p.pathname+p.search]},[f,s.unstable_trailingSlashAwareDataRequests,l,c,r]);return g.createElement(g.Fragment,null,m.map(p=>g.createElement("link",{key:p,rel:"prefetch",as:"fetch",href:p,...o})))}function Rb({page:l,matches:r,...o}){let c=Xt(),{future:s,manifest:f,routeModules:m}=bs(),{basename:p}=vs(),{loaderData:b,matches:h}=Sb(),S=g.useMemo(()=>Zh(l,r,h,f,c,"data"),[l,r,h,f,c]),x=g.useMemo(()=>Zh(l,r,h,f,c,"assets"),[l,r,h,f,c]),_=g.useMemo(()=>{if(l===c.pathname+c.search+c.hash)return[];let R=new Set,C=!1;if(r.forEach(V=>{let k=f.routes[V.route.id];!k||!k.hasLoader||(!S.some(G=>G.route.id===V.route.id)&&V.route.id in b&&m[V.route.id]?.shouldRevalidate||k.hasClientLoader?C=!0:R.add(V.route.id))}),R.size===0)return[];let H=qp(l,p,s.unstable_trailingSlashAwareDataRequests,"data");return C&&R.size>0&&H.searchParams.set("_routes",r.filter(V=>R.has(V.route.id)).map(V=>V.route.id).join(",")),[H.pathname+H.search]},[p,s.unstable_trailingSlashAwareDataRequests,b,c,f,S,r,l,m]),U=g.useMemo(()=>vb(x,f),[x,f]),D=Cb(x);return g.createElement(g.Fragment,null,_.map(R=>g.createElement("link",{key:R,rel:"prefetch",as:"fetch",href:R,...o})),U.map(R=>g.createElement("link",{key:R,rel:"modulepreload",href:R,...o})),D.map(({key:R,link:C})=>g.createElement("link",{key:R,nonce:o.nonce,...C,crossOrigin:C.crossOrigin??o.crossOrigin})))}function Nb(...l){return r=>{l.forEach(o=>{typeof o=="function"?o(r):o!=null&&(o.current=r)})}}var Db=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Db&&(window.__reactRouterVersion="7.14.0")}catch{}function _b({basename:l,children:r,unstable_useTransitions:o,window:c}){let s=g.useRef();s.current==null&&(s.current=ry({window:c,v5Compat:!0}));let f=s.current,[m,p]=g.useState({action:f.action,location:f.location}),b=g.useCallback(h=>{o===!1?p(h):g.startTransition(()=>p(h))},[o]);return g.useLayoutEffect(()=>f.listen(b),[f,b]),g.createElement(lb,{basename:l,children:r,location:m.location,navigationType:m.action,navigator:f,unstable_useTransitions:o})}var Qp=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Gp=g.forwardRef(function({onClick:r,discover:o="render",prefetch:c="none",relative:s,reloadDocument:f,replace:m,unstable_mask:p,state:b,target:h,to:S,preventScrollReset:x,viewTransition:_,unstable_defaultShouldRevalidate:U,...D},R){let{basename:C,navigator:H,unstable_useTransitions:V}=g.useContext(Nt),k=typeof S=="string"&&Qp.test(S),G=_p(S,C);S=G.to;let P=qy(S,{relative:s}),te=Xt(),Z=null;if(p){let Ee=ou(p,[],te.unstable_mask?te.unstable_mask.pathname:"/",!0);C!=="/"&&(Ee.pathname=Ee.pathname==="/"?C:It([C,Ee.pathname])),Z=H.createHref(Ee)}let[F,pe,He]=Eb(c,D),Le=zb(S,{replace:m,unstable_mask:p,state:b,target:h,preventScrollReset:x,relative:s,viewTransition:_,unstable_defaultShouldRevalidate:U,unstable_useTransitions:V});function Oe(Ee){r&&r(Ee),Ee.defaultPrevented||Le(Ee)}let rt=!(G.isExternal||f),Ie=g.createElement("a",{...D,...He,href:(rt?Z:void 0)||G.absoluteURL||P,onClick:rt?Oe:r,ref:Nb(R,pe),target:h,"data-discover":!k&&o==="render"?"true":void 0});return F&&!k?g.createElement(g.Fragment,null,Ie,g.createElement(Ab,{page:P})):Ie});Gp.displayName="Link";var Ob=g.forwardRef(function({"aria-current":r="page",caseSensitive:o=!1,className:c="",end:s=!1,style:f,to:m,viewTransition:p,children:b,...h},S){let x=Ci(m,{relative:h.relative}),_=Xt(),U=g.useContext(su),{navigator:D,basename:R}=g.useContext(Nt),C=U!=null&&Hb(x)&&p===!0,H=D.encodeLocation?D.encodeLocation(x).pathname:x.pathname,V=_.pathname,k=U&&U.navigation&&U.navigation.location?U.navigation.location.pathname:null;o||(V=V.toLowerCase(),k=k?k.toLowerCase():null,H=H.toLowerCase()),k&&R&&(k=xa(k,R)||k);const G=H!=="/"&&H.endsWith("/")?H.length-1:H.length;let P=V===H||!s&&V.startsWith(H)&&V.charAt(G)==="/",te=k!=null&&(k===H||!s&&k.startsWith(H)&&k.charAt(H.length)==="/"),Z={isActive:P,isPending:te,isTransitioning:C},F=P?r:void 0,pe;typeof c=="function"?pe=c(Z):pe=[c,P?"active":null,te?"pending":null,C?"transitioning":null].filter(Boolean).join(" ");let He=typeof f=="function"?f(Z):f;return g.createElement(Gp,{...h,"aria-current":F,className:pe,ref:S,style:He,to:m,viewTransition:p},typeof b=="function"?b(Z):b)});Ob.displayName="NavLink";var Mb=g.forwardRef(({discover:l="render",fetcherKey:r,navigate:o,reloadDocument:c,replace:s,state:f,method:m=eu,action:p,onSubmit:b,relative:h,preventScrollReset:S,viewTransition:x,unstable_defaultShouldRevalidate:_,...U},D)=>{let{unstable_useTransitions:R}=g.useContext(Nt),C=Ub(),H=Bb(p,{relative:h}),V=m.toLowerCase()==="get"?"get":"post",k=typeof p=="string"&&Qp.test(p),G=P=>{if(b&&b(P),P.defaultPrevented)return;P.preventDefault();let te=P.nativeEvent.submitter,Z=te?.getAttribute("formmethod")||m,F=()=>C(te||P.currentTarget,{fetcherKey:r,method:Z,navigate:o,replace:s,state:f,relative:h,preventScrollReset:S,viewTransition:x,unstable_defaultShouldRevalidate:_});R&&o!==!1?g.startTransition(()=>F()):F()};return g.createElement("form",{ref:D,method:V,action:H,onSubmit:c?b:G,...U,"data-discover":!k&&l==="render"?"true":void 0})});Mb.displayName="Form";function jb(l){return`${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Yp(l){let r=g.useContext(yl);return Be(r,jb(l)),r}function zb(l,{target:r,replace:o,unstable_mask:c,state:s,preventScrollReset:f,relative:m,viewTransition:p,unstable_defaultShouldRevalidate:b,unstable_useTransitions:h}={}){let S=An(),x=Xt(),_=Ci(l,{relative:m});return g.useCallback(U=>{if(sb(U,r)){U.preventDefault();let D=o!==void 0?o:Si(x)===Si(_),R=()=>S(l,{replace:D,unstable_mask:c,state:s,preventScrollReset:f,relative:m,viewTransition:p,unstable_defaultShouldRevalidate:b});h?g.startTransition(()=>R()):R()}},[x,S,_,o,c,s,r,l,f,m,p,b,h])}var wb=0,Lb=()=>`__${String(++wb)}__`;function Ub(){let{router:l}=Yp("useSubmit"),{basename:r}=g.useContext(Nt),o=Iy(),c=l.fetch,s=l.navigate;return g.useCallback(async(f,m={})=>{let{action:p,method:b,encType:h,formData:S,body:x}=mb(f,r);if(m.navigate===!1){let _=m.fetcherKey||Lb();await c(_,o,m.action||p,{unstable_defaultShouldRevalidate:m.unstable_defaultShouldRevalidate,preventScrollReset:m.preventScrollReset,formData:S,body:x,formMethod:m.method||b,formEncType:m.encType||h,flushSync:m.flushSync})}else await s(m.action||p,{unstable_defaultShouldRevalidate:m.unstable_defaultShouldRevalidate,preventScrollReset:m.preventScrollReset,formData:S,body:x,formMethod:m.method||b,formEncType:m.encType||h,replace:m.replace,state:m.state,fromRouteId:o,flushSync:m.flushSync,viewTransition:m.viewTransition})},[c,s,r,o])}function Bb(l,{relative:r}={}){let{basename:o}=g.useContext(Nt),c=g.useContext(qt);Be(c,"useFormAction must be used inside a RouteContext");let[s]=c.matches.slice(-1),f={...Ci(l||".",{relative:r})},m=Xt();if(l==null){f.search=m.search;let p=new URLSearchParams(f.search),b=p.getAll("index");if(b.some(S=>S==="")){p.delete("index"),b.filter(x=>x).forEach(x=>p.append("index",x));let S=p.toString();f.search=S?`?${S}`:""}}return(!l||l===".")&&s.route.index&&(f.search=f.search?f.search.replace(/^\?/,"?index&"):"?index"),o!=="/"&&(f.pathname=f.pathname==="/"?o:It([o,f.pathname])),Si(f)}function Hb(l,{relative:r}={}){let o=g.useContext(jp);Be(o!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:c}=Yp("useViewTransitionState"),s=Ci(l,{relative:r});if(!o.isTransitioning)return!1;let f=xa(o.currentLocation.pathname,c)||o.currentLocation.pathname,m=xa(o.nextLocation.pathname,c)||o.nextLocation.pathname;return lu(s.pathname,m)!=null||lu(s.pathname,f)!=null}var Vp=Cp();const kb=Ap(Vp),Kh=l=>{let r;const o=new Set,c=(h,S)=>{const x=typeof h=="function"?h(r):h;if(!Object.is(x,r)){const _=r;r=S??(typeof x!="object"||x===null)?x:Object.assign({},r,x),o.forEach(U=>U(r,_))}},s=()=>r,p={setState:c,getState:s,getInitialState:()=>b,subscribe:h=>(o.add(h),()=>o.delete(h))},b=r=l(c,s,p);return p},qb=(l=>l?Kh(l):Kh),Qb=l=>l;function Gb(l,r=Qb){const o=Ht.useSyncExternalStore(l.subscribe,Ht.useCallback(()=>r(l.getState()),[l,r]),Ht.useCallback(()=>r(l.getInitialState()),[l,r]));return Ht.useDebugValue(o),o}const Yb=l=>{const r=qb(l),o=c=>Gb(r,c);return Object.assign(o,r),o},Xp=(l=>Yb);function Vb(l,r){let o;try{o=l()}catch{return}return{getItem:s=>{var f;const m=b=>b===null?null:JSON.parse(b,void 0),p=(f=o.getItem(s))!=null?f:null;return p instanceof Promise?p.then(m):m(p)},setItem:(s,f)=>o.setItem(s,JSON.stringify(f,void 0)),removeItem:s=>o.removeItem(s)}}const ns=l=>r=>{try{const o=l(r);return o instanceof Promise?o:{then(c){return ns(c)(o)},catch(c){return this}}}catch(o){return{then(c){return this},catch(c){return ns(c)(o)}}}},Xb=(l,r)=>(o,c,s)=>{let f={storage:Vb(()=>window.localStorage),partialize:C=>C,version:0,merge:(C,H)=>({...H,...C}),...r},m=!1,p=0;const b=new Set,h=new Set;let S=f.storage;if(!S)return l((...C)=>{console.warn(`[zustand persist middleware] Unable to update item '${f.name}', the given storage is currently unavailable.`),o(...C)},c,s);const x=()=>{const C=f.partialize({...c()});return S.setItem(f.name,{state:C,version:f.version})},_=s.setState;s.setState=(C,H)=>(_(C,H),x());const U=l((...C)=>(o(...C),x()),c,s);s.getInitialState=()=>U;let D;const R=()=>{var C,H;if(!S)return;const V=++p;m=!1,b.forEach(G=>{var P;return G((P=c())!=null?P:U)});const k=((H=f.onRehydrateStorage)==null?void 0:H.call(f,(C=c())!=null?C:U))||void 0;return ns(S.getItem.bind(S))(f.name).then(G=>{if(G)if(typeof G.version=="number"&&G.version!==f.version){if(f.migrate){const P=f.migrate(G.state,G.version);return P instanceof Promise?P.then(te=>[!0,te]):[!0,P]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,G.state];return[!1,void 0]}).then(G=>{var P;if(V!==p)return;const[te,Z]=G;if(D=f.merge(Z,(P=c())!=null?P:U),o(D,!0),te)return x()}).then(()=>{V===p&&(k?.(c(),void 0),D=c(),m=!0,h.forEach(G=>G(D)))}).catch(G=>{V===p&&k?.(void 0,G)})};return s.persist={setOptions:C=>{f={...f,...C},C.storage&&(S=C.storage)},clearStorage:()=>{S?.removeItem(f.name)},getOptions:()=>f,rehydrate:()=>R(),hasHydrated:()=>m,onHydrate:C=>(b.add(C),()=>{b.delete(C)}),onFinishHydration:C=>(h.add(C),()=>{h.delete(C)})},f.skipHydration||R(),D||U},Fp=Xb,Fb=[{id:"1",name:"纯棉面料",subtitle:"天然亲肤的呼吸面料，给您婴儿般柔软的舒适体验",description:"纯棉面料是以天然棉花为原料，通过纺纱、织造而成的天然纤维素纤维。棉花纤维具有中空多孔结构，横截面呈腰圆形，纵向有天然转曲。这种独特的结构赋予了纯棉优异的吸湿透气性能。",category:"天然纤维",order:1,modules:{productCognition:`## 一句话记忆
"纯棉——天然亲肤的呼吸面料，给您婴儿般柔软的舒适体验"

## 技术背景
纯棉面料是以天然棉花为原料，通过纺纱、织造而成的天然纤维素纤维。棉花纤维具有中空多孔结构，横截面呈腰圆形，纵向有天然转曲。这种独特的结构赋予了纯棉优异的吸湿透气性能。

## 五大核心特性表

| 特性维度 | 具体表现 | 技术参数/原理 | 客户价值 |
|---------|---------|--------------|---------|
| **吸湿性** | 吸收自重8-10%水分 | 纤维多孔结构，含水率8-10% | 保持皮肤干爽，夏季不黏腻 |
| **透气性** | 良好空气流通 | 纤维间天然孔隙 | 穿着舒适，减少闷热感 |
| **保暖性** | 冬季保暖效果好 | 热传导系数低（0.17W/m·K） | 冬季温暖，夏季凉爽 |
| **卫生性** | 无化学刺激 | 天然纤维素，无有害残留 | 适合敏感肌、婴幼儿 |
| **耐碱性** | 耐碱不耐酸 | 可承受碱液处理（丝光工艺） | 易于清洁，染色性能好 |

## 技术补充
- 棉纤维长度：25-45mm（影响纱线品质）
- 细度：1.5-2.5dtex
- 公定回潮率：8.5%
- 湿强比干强高10-20%（湿态更牢固）`,salesScript:`## 场景一：客户触摸面料时

**错误示范：** "这就是普通的棉，大家都知道的"

**正确话术：** "先生您感受一下，这是我们精选的埃及长绒棉，纤维长度达到38mm以上，所以手感特别细腻柔软。您看这个光泽度和垂感，普通棉是达不到这种品质的。"

## 场景二：客户询问"为什么比其他棉贵"

**错误示范：** "我们这个是品牌货，质量好"

**正确话术：** "您这个问题问得非常好！首先我们采用的是80支高支高密工艺，每平方英寸经纬纱线密度达到200根，普通棉一般只有120-150根。其次我们经过丝光处理，棉纤维截面变圆，光泽更好，缩水率从5%降到2%以内。最重要的是，这种工艺让面料更挺括抗皱，穿着更有型。"

## 场景三：夏季客户担心热

**错误示范：** "棉的都热，没办法"

**正确话术：** "恰恰相反，纯棉是夏季最理想的面料。您看棉纤维的中空结构，就像一个个微型空调管道，能够快速吸收汗液并蒸发。而且棉的导热系数0.17，比羊毛的0.05高很多，散热更快。我们这款还采用了单面磨毛工艺，内层柔软外层清爽，真正做到了透气不闷热。"

## 场景四：客户担心起球

**错误示范：** "棉的都会起球，正常的"

**正确话术：** "高品质纯棉起球概率很低。首先我们采用长绒棉，纤维长、强度高，不易断裂起毛。其次我们纱线捻度经过优化，既保证柔软度又增强抱合力。最重要的是，我们面料经过烧毛工艺处理，表面绒毛被高温烧除，大大减少了起球可能。您看这件样衣已经展示三个月了，依然平整如新。"`,competitorComparison:`## 竞品对比表

| 对比维度 | CASEDI纯棉 | 普通品牌棉 | 化纤仿棉 | 优势分析 |
|---------|-----------|-----------|---------|---------|
| **原料品质** | 埃及/新疆长绒棉，纤维长度≥38mm | 普通细绒棉，纤维长度25-28mm | 聚酯纤维（石油基） | 纤维更长更细，强度高20% |
| **工艺技术** | 80支高支高密，丝光处理 | 40-60支常规工艺 | 仿棉纹理印花 | 光泽度提升30%，缩水率降低60% |
| **舒适体验** | 吸湿率8.5%，透气性优 | 吸湿率8%，透气性一般 | 吸湿率0.4%，易闷热 | 真实吸湿排汗，体感温度低2-3℃ |
| **耐用性能** | 湿强比干强高15%，耐磨性好 | 湿强略高，易磨损 | 强度高但易起球静电 | 湿态更牢固，使用寿命延长50% |
| **环保健康** | 100%可生物降解，无化学残留 | 可能含荧光剂、甲醛 | 不可降解，生产污染大 | 安全环保，通过OEKO-TEX认证 |
| **价格定位** | 高端品质，价值投资 | 中等价位，性价比 | 低价但体验差 | 每穿一次成本更低，长期更划算 |`,objectionHandling:`## Q1：纯棉不是容易皱吗？怎么解决？

**A：** 您观察得很仔细！传统纯棉确实易皱，但我们通过三项技术解决了这个问题：
1. **高支高密织造**：纱线更细更紧密，结构稳定性更好
2. **液氨整理**：让纤维分子重新排列，记忆性增强
3. **抗皱助剂**：环保型整理剂，不影响透气性

经过这些处理，我们的纯棉衬衫悬挂一晚褶皱就能自然平复，日常穿着基本无需熨烫。

## Q2：听说纯棉会缩水，你们怎么保证尺寸稳定？

**A：** 您的担心很有必要！我们通过三重预缩处理确保尺寸稳定：
1. **面料预缩**：出厂前经过机械预缩，缩水率控制在2%以内
2. **成衣预缩**：制成成衣后再次进行蒸汽预缩
3. **洗水工艺**：部分款式采用成衣洗水，提前完成缩水过程

购买后按照我们的洗涤说明操作，尺寸变化可以忽略不计。

## Q3：白色纯棉会不会容易发黄？

**A：** 发黄主要是荧光剂衰减和汗渍氧化造成的。我们的解决方案是：
1. **无荧光剂工艺**：采用天然增白技术，避免后期黄变
2. **抗汗渍处理**：面料经过特殊整理，减少汗渍渗透和氧化
3. **洗涤指导**：提供专业的白色衣物保养方案

正常穿着和保养，我们的白衬衫可以保持洁白如新2-3年。

## Q4：纯棉耐磨吗？领口袖口会不会容易破？

**A：** 我们通过以下方式提升耐磨性：
1. **加强织造**：领口袖口采用双层或加强织法
2. **缝制工艺**：使用高强缝纫线，针距加密
3. **后整理**：耐磨助剂处理，表面形成保护膜

实际测试显示，我们的纯棉衬衫领口袖口耐磨次数比普通产品高3倍以上。`,practicalExercise:`## 实验一：吸水性对比实验

**道具**：CASEDI纯棉面料、化纤面料、滴管、水、计时器

**步骤**：
1. 将两种面料平铺，各滴一滴水
2. 观察水珠形态和渗透速度
3. 记录完全渗透所需时间

**现象**：纯棉面料水珠迅速摊开并渗透（3-5秒），化纤面料水珠保持球状（30秒以上）

**话术**："您看，纯棉就像海绵一样快速吸水，保持皮肤干爽；化纤不吸水，汗液留在表面就会闷热不适。"

## 实验二：透气性火焰实验

**道具**：CASEDI纯棉面料、塑料膜、蜡烛、打火机

**步骤**：
1. 用面料包裹蜡烛火焰
2. 观察火焰变化
3. 对比塑料膜包裹效果

**现象**：纯棉包裹时火焰持续燃烧（有氧气通过），塑料膜包裹火焰迅速熄灭

**话术**："这证明纯棉纤维间有无数微孔，空气自由流通，穿着时体感更舒适。"

## 实验三：抗皱恢复实验

**道具**：CASEDI纯棉衬衫、普通纯棉衬衫、衣架

**步骤**：
1. 将两件衬衫同样揉搓成一团
2. 悬挂15分钟观察褶皱恢复情况
3. 轻轻抖动后对比

**现象**：CASEDI衬衫褶皱基本平复，普通衬衫褶皱明显

**话术**："我们的抗皱处理让纤维有了'记忆'，日常穿着褶皱能自然恢复，节省熨烫时间。"`,afterSales:`## 洗涤指南

- **水温**：冷水或30℃以下温水，避免热水导致缩水
- **洗涤剂**：中性洗衣液，避免碱性洗衣粉损伤纤维
- **机洗设置**：轻柔模式，转速≤800转/分钟
- **脱水**：不要用力拧绞，可滚筒轻柔脱水
- **特殊污渍**：汗渍及时清洗，油渍先用洗洁精预处理

## 干燥方法

- **晾晒**：反面晾晒，避免阳光直射导致泛黄
- **位置**：通风阴凉处，避免潮湿环境滋生霉菌
- **整形**：晾晒前轻轻拉平，保持版型
- **禁忌**：禁止烘干机高温烘干，禁止暴晒

## 熨烫技巧

- **温度**：中温熨烫（150-160℃）
- **状态**：微湿状态熨烫效果最佳
- **垫布**：深色衣物建议垫布熨烫，避免产生镜面
- **方向**：顺着织物纹理熨烫，避免横向拉扯

## 收纳要点

- **折叠**：整齐折叠，避免重压导致永久折痕
- **悬挂**：使用宽肩衣架，保持肩部挺括
- **防潮**：衣柜放置防潮剂，避免梅雨季节发霉
- **防虫**：天然樟木条防虫，避免化学防虫剂损伤面料`,test:`## 单选题

1. 纯棉面料公定回潮率是多少？
   - A. 5%
   - B. 8.5% ✓
   - C. 12%
   - D. 15%
   
   **解析**：棉纤维标准回潮率为8.5%，这是其吸湿性的量化指标。

2. 以下哪种工艺能有效降低纯棉缩水率？
   - A. 烧毛工艺
   - B. 丝光工艺 ✓
   - C. 磨毛工艺
   - D. 印花工艺
   
   **解析**：丝光处理让棉纤维截面变圆，减少遇水膨胀空间，缩水率从5%降至2%以内。

3. 纯棉面料夏季穿着凉爽的主要原理是：
   - A. 反射阳光
   - B. 快速导热
   - C. 吸湿蒸发 ✓
   - D. 轻薄透明
   
   **解析**：棉纤维吸汗后通过蒸发带走热量，体感温度可降低2-3℃。

## 实操题

请为一位担心"纯棉易皱难打理"的商务男士设计一段3分钟的介绍话术，需包含：
1. 问题承认（30秒）
2. 技术解决方案（90秒）
3. 客户利益转化（60秒）

**参考答案**：
"王总，您说得对，传统纯棉确实容易皱，这也是很多商务人士的顾虑。但我们的纯棉衬衫通过三项技术彻底改变了这一点：首先采用80支高支高密织造，纱线更细更紧密，就像建筑用钢筋水泥代替土坯，基础更稳固；其次经过液氨整理，让纤维分子像训练过的士兵一样排列有序，有了'形状记忆'；最后是环保抗皱助剂，在不影响透气的前提下增强回复力。所以您穿着时，坐下站起的日常褶皱悬挂一会儿就能平复，出差放在行李箱里，取出挂一小时就基本平整。这既保持了纯棉的舒适透气，又解决了打理难题，让您从容应对各种场合。"`}},{id:"2",name:"亚麻面料",subtitle:"天然的温度调节器，给您带来北欧般的清凉与高级质感",description:"亚麻面料源自亚麻植物的韧皮纤维，是人类最早使用的天然纤维之一。亚麻纤维横截面呈多边形，纵向有竹节状突起，这种独特的结构使其具有优异的吸湿散热性能。",category:"天然纤维",order:2,modules:{productCognition:`## 一句话记忆
"亚麻——天然的温度调节器，给您带来北欧般的清凉与高级质感"

## 技术背景
亚麻面料源自亚麻植物的韧皮纤维，是人类最早使用的天然纤维之一。亚麻纤维横截面呈多边形，纵向有竹节状突起，这种独特的结构使其具有优异的吸湿散热性能。亚麻纤维强度高，湿强比干强更高，公定回潮率达12%。

## 五大核心特性表

| 特性维度 | 具体表现 | 技术参数/原理 | 客户价值 |
|---------|---------|--------------|---------|
| **散热性** | 快速导热散热 | 导热系数0.17，是羊毛的5倍 | 夏季体感温度低3-4℃ |
| **吸湿性** | 吸收自重20%水分 | 纤维多孔结构，回潮率12% | 保持干爽，减少黏腻感 |
| **抗菌性** | 天然抑制细菌 | 含有亚麻酸等抑菌成分 | 减少异味，适合敏感皮肤 |
| **强度高** | 湿强比干强高 | 纤维结晶度高，结构紧密 | 耐用耐洗，使用寿命长 |
| **低静电** | 几乎不带静电 | 吸湿性好，导电性佳 | 穿着舒适，不吸附灰尘 |

## 技术补充
- 纤维长度：25-30mm（工艺纤维更长）
- 细度：2-3dtex
- 断裂强度：5.5-6.5cN/dtex
- 热传导率：0.17W/m·K（优秀散热性）`,salesScript:`## 场景一：客户觉得亚麻粗糙

**错误示范：** "亚麻就是这样的，习惯就好"

**正确话术：** "您触摸的是未经处理的粗亚麻。我们这款采用了意大利的精细纺纱工艺，纤维经过三次梳理，去除了短绒和粗节，纱线支数达到40支以上。您再感受这个内侧，我们还做了微磨毛处理，贴肤面如丝般顺滑，完全不会有刺痒感。"

## 场景二：夏季客户想要凉爽面料

**错误示范：** "亚麻凉快，买这个吧"

**正确话术：** "亚麻被誉为'天然空调'，它的散热性是羊毛的5倍，丝绸的19倍。科学测试显示，在35℃高温下，穿亚麻比穿棉的体感温度低3-4℃。而且它的吸湿速度是棉的2倍，蒸发速度是棉的3倍，汗液瞬间吸收瞬间蒸发，始终保持干爽清凉。"

## 场景三：客户担心亚麻易皱

**错误示范：** "亚麻皱是特色，随性风格"

**正确话术：** "亚麻的褶皱确实是一种自然美学，但我们通过技术让它'皱得有型'。首先我们采用高捻度纱线，增强回弹性；其次经过树脂整理，让褶皱分布更均匀自然；最重要的是，我们的版型设计考虑了褶皱的动态美感，即使有褶皱也显得随性而不邋遢，这正是高端亚麻的魅力所在。"

## 场景四：客户询问保养难度

**错误示范：** "亚麻不好打理，要小心洗"

**正确话术：** "恰恰相反，亚麻是最好打理的高端面料之一。它耐洗耐穿，湿强比干强还高，机洗完全没问题。而且亚麻越洗越柔软，光泽越自然。我们建议冷水轻柔机洗，平铺晾干，微湿时简单熨烫即可。这种'历久弥新'的特性，让亚麻衣物成为可以陪伴您多年的经典单品。"`,competitorComparison:`## 竞品对比表

| 对比维度 | CASEDI亚麻 | 普通亚麻 | 棉麻混纺 | 优势分析 |
|---------|-----------|---------|---------|---------|
| **原料等级** | 法国诺曼底顶级亚麻，纤维均匀度高 | 普通亚麻，纤维粗细不均 | 亚麻含量30-50% | 纤维更长更细，品质稳定 |
| **工艺处理** | 精细纺纱+微磨毛，40支以上 | 粗纺，20-30支 | 混纺工艺，手感妥协 | 触感细腻，无刺痒感 |
| **散热性能** | 导热系数0.17，降温3-4℃ | 降温效果2-3℃ | 棉影响散热效率 | 最佳夏季降温效果 |
| **抗菌特性** | 天然亚麻酸含量高，抑菌率90% | 抑菌效果一般 | 棉降低抗菌性 | 健康防护，减少异味 |
| **耐用程度** | 湿强比干强高20%，耐洗100次+ | 耐洗50次左右 | 混纺影响强度 | 使用寿命延长一倍 |
| **价格价值** | 高端精品，投资经典 | 中等价位 | 性价比选择 | 每穿成本低，价值感强 |`,objectionHandling:`## Q1：亚麻洗了会不会缩水严重？

**A：** 高品质亚麻缩水率可控在3-5%，我们通过以下方式确保尺寸稳定：
1. **预缩处理**：面料出厂前经过蒸汽预缩
2. **松弛织造**：采用宽松织法，预留收缩空间
3. **洗涤指导**：冷水洗涤，避免高温

正常护理下，第一次洗涤后尺寸基本稳定，后续变化极小。

## Q2：亚麻容易褪色吗？

**A：** 亚麻染色确实有挑战，但我们采用先进技术确保色牢度：
1. **前处理**：充分去除杂质，提高染料吸收
2. **活性染色**：使用多活性基染料，与纤维共价结合
3. **固色处理**：后整理固色，色牢度达到4级以上

正常洗涤颜色保持良好，建议反面晾晒进一步保护色泽。

## Q3：亚麻适合什么场合穿？

**A：** 现代亚麻已突破传统局限：
1. **商务休闲**：挺括版型+精致细节，适合周五便装日
2. **度假旅行**：透气舒适，易打理，旅途最佳伴侣
3. **日常休闲**：自然随性，展现品味与生活态度
4. **创意场合**：艺术气质，适合设计、艺术相关行业

通过搭配不同单品，亚麻可以胜任从休闲到半正式多种场合。

## Q4：亚麻和棉麻混纺哪个更好？

**A：** 各有优势，根据需求选择：

**纯亚麻优势**：最佳透气散热、天然抗菌、独特质感、越洗越软
**棉麻混纺优势**：减少褶皱、降低成本、更易染色、适合初试者

我们建议：追求极致夏季舒适选纯亚麻，想要平衡易打理选高品质棉麻混纺。`,practicalExercise:`## 实验一：降温效果对比

**道具**：CASEDI亚麻面料、纯棉面料、红外测温仪、热水袋

**步骤**：
1. 用两种面料分别包裹相同温度热水袋
2. 5分钟后测量表面温度
3. 观察温度差异

**现象**：亚麻包裹表面温度低2-3℃，散热更快

**话术**："您看，亚麻就像散热片，快速导出热量，夏季穿着体感明显更凉爽。"

## 实验二：吸湿速度竞赛

**道具**：亚麻面料、棉面料、滴管、水、纸巾

**步骤**：
1. 各滴一滴水在面料表面
2. 用纸巾轻压，观察水渍转移
3. 对比吸湿速度

**现象**：亚麻上的水渍转移更少，说明吸收更快

**话术**："亚麻吸湿速度是棉的2倍，汗液瞬间吸收，保持皮肤干爽。"

## 实验三：抗菌演示

**道具**：亚麻面料、棉面料、培养皿（图片）、细菌培养图

**步骤**：
1. 展示实验室细菌培养对比图
2. 解释亚麻酸抑菌原理
3. 让客户闻穿过一段时间的样衣

**现象**：亚麻样衣异味更少

**话术**："亚麻天然抑制细菌繁殖，减少汗味产生，特别适合易出汗体质。"`,afterSales:`## 洗涤指南

- **第一次洗涤**：冷水单独洗涤，可加少许盐固色
- **常规洗涤**：冷水或30℃以下，中性洗涤剂
- **机洗设置**：轻柔模式，避免高速脱水
- **脱水技巧**：可毛巾包裹吸水，避免拧绞
- **染色衣物**：首次可能轻微掉色，属正常现象

## 干燥方法

- **最佳方式**：平铺晾干，保持版型
- **悬挂晾晒**：使用宽肩衣架，避免肩部变形
- **干燥程度**：微湿状态最佳，便于熨烫
- **禁忌**：避免暴晒导致纤维脆化

## 熨烫技巧

- **最佳时机**：微湿状态熨烫效果最佳
- **温度设置**：中高温（180-200℃）
- **垫布使用**：深色建议垫布，避免产生光泽
- **蒸汽熨烫**：蒸汽有助于恢复纤维弹性
- **褶皱处理**：接受自然褶皱，轻微熨烫即可

## 收纳要点

- **折叠存放**：整齐折叠，避免重压
- **悬挂保存**：适合西装、外套等定型衣物
- **防潮防霉**：雨季注意通风，可使用除湿剂
- **防虫措施**：天然防虫剂，避免化学损伤
- **定期整理**：偶尔取出通风，保持纤维活性`,test:`## 单选题

1. 亚麻面料公定回潮率是多少？
   - A. 8.5%
   - B. 12% ✓
   - C. 15%
   - D. 18%
   
   **解析**：亚麻纤维标准回潮率为12%，高于棉的8.5%，吸湿性更优。

2. 亚麻夏季凉爽的主要原因是：
   - A. 反射阳光
   - B. 快速导热 ✓
   - C. 轻薄透明
   - D. 化学涂层
   
   **解析**：亚麻导热系数0.17W/m·K，是羊毛的5倍，能快速导出体热。

3. 亚麻的哪种特性使其适合敏感肌肤？
   - A. 抗菌性 ✓
   - B. 弹性好
   - C. 光泽强
   - D. 重量轻
   
   **解析**：亚麻含亚麻酸等天然抑菌成分，减少皮肤刺激和过敏。

## 实操题

请为一位觉得"亚麻太休闲，不适合商务场合"的金融行业客户设计一段3分钟的说服话术，需包含：
1. 观念更新（60秒）
2. 款式证明（90秒）
3. 搭配建议（30秒）

**参考答案**：
"李经理，您这个观念在三年前可能成立，但现在高端亚麻已经重新定义了商务休闲。首先看面料升级，我们采用法国顶级亚麻配合意大利精纺工艺，纱线支数达到45支，面料挺括度提升50%。其次看设计细节，这件衬衫有法式袖口、英国母贝扣、精准的领座角度，每一个细节都符合商务标准。再看实际穿着，高盛、摩根士丹利等投行的夏季便装日，亚麻是高管们的首选，既保持专业形象又舒适透气。搭配上，亚麻衬衫配藏青西裤、乐福鞋，既有权威感又不失亲和力，正是现代金融精英的聪明选择。"`}},{id:"3",name:"羊毛面料",subtitle:"自然的智能保温层，冬暖夏凉的四季舒适选择",description:"羊毛是来自绵羊的天然蛋白质纤维，表面有鳞片结构，内部有髓质层。这种复杂的结构赋予了羊毛独特的保温性、弹性和回潮率。",category:"天然纤维",order:3,modules:{productCognition:`## 一句话记忆
"羊毛——自然的智能保温层，冬暖夏凉的四季舒适选择"

## 技术背景
羊毛是来自绵羊的天然蛋白质纤维，表面有鳞片结构，内部有髓质层。这种复杂的结构赋予了羊毛独特的保温性、弹性和回潮率。羊毛纤维的卷曲度、细度、长度决定其品质等级，美利奴羊毛是其中的顶级品类。

## 五大核心特性表

| 特性维度 | 具体表现 | 技术参数/原理 | 客户价值 |
|---------|---------|--------------|---------|
| **保温性** | 卓越的保暖效果 | 导热系数0.05，卷曲锁住空气 | 冬季温暖，减少着装厚重 |
| **调温性** | 自动调节温度 | 吸湿放热，纤维卷曲调节 | 四季皆宜，智能舒适 |
| **弹性好** | 优良的回复性能 | 蛋白质分子螺旋结构 | 抗皱保形，穿着有型 |
| **吸湿强** | 吸收自重30%水分 | 亲水基团，高回潮率（15%） | 干爽舒适，减少闷热 |
| **阻燃性** | 不易燃烧 | 高氮含量，离火自熄 | 安全可靠，适合多种场合 |

## 技术补充
- 纤维细度：美利奴羊毛≤18.5μm（超细）
- 卷曲度：每厘米6-8个卷曲（优质指标）
- 断裂伸长率：25-35%（优异弹性）
- 回潮率：15%（标准条件下）`,salesScript:`## 场景一：客户觉得羊毛扎人

**错误示范：** "羊毛都这样，穿穿就好了"

**正确话术：** "扎人的是普通粗羊毛，纤维直径超过28微米。我们采用的是澳大利亚美利奴超细羊毛，直径只有17.5微米，比头发丝还细5倍。您看这个放大图，纤维表面光滑无鳞片感，贴肤穿着就像羊绒一样柔软。我们还做了丝光处理，进一步平滑纤维表面，确保零刺痛感。"

## 场景二：冬季客户想要轻薄又保暖

**错误示范：** "羊毛保暖，但都比较厚"

**正确话术：** "这正是美利奴羊毛的魔法所在！它的导热系数只有0.05，是棉的1/3，意味着保暖效率高三倍。所以我们的羊毛衫虽然只有300克重，保暖效果却相当于800克的棉服。而且羊毛纤维天然卷曲，形成无数微型气室，锁住空气保温，重量却轻如羽毛。"

## 场景三：客户担心羊毛难打理

**错误示范：** "羊毛要干洗，比较麻烦"

**正确话术：** "现代羊毛科技已经解决了这个问题。我们的羊毛面料经过防缩处理，机洗完全没问题。秘诀在于：第一，超细纤维本身抗起球；第二，树脂整理增强尺寸稳定性；第三，我们提供专用羊毛洗涤剂。您看这个洗标，明确写着'可机洗，轻柔模式'，在家就能轻松护理。"

## 场景四：客户问"夏天能穿羊毛吗"

**错误示范：** "羊毛是冬天的，夏天穿不了"

**正确话术：** "这可能是最大的误解！羊毛其实是四季面料。夏季穿着时，它的高吸湿性（吸收自重30%汗液）让皮肤保持干爽；它的调温性在空调房防止过冷，在室外又不会过热。很多高端商务人士夏季选择轻薄羊毛西装，就是因为它的'智能温控'特性，让全天候穿着都舒适得体。"`,competitorComparison:`## 竞品对比表

| 对比维度 | CASEDI美利奴羊毛 | 普通羊毛 | 羊绒 | 化纤仿毛 |
|---------|-----------------|---------|------|---------|
| **纤维细度** | 17.5μm超细美利奴 | 25-30μm普通羊毛 | 14-16μm | 模仿粗细 |
| **柔软程度** | 丝光处理，贴肤柔软 | 有刺痒感，需内搭 | 极致柔软 | 触感生硬 |
| **保温效率** | 导热系数0.05，高效保温 | 保温一般，需厚重 | 优秀保温 | 保温差，需加厚 |
| **调温性能** | 吸湿放热，自动调节 | 基本调温功能 | 良好调温 | 无调温功能 |
| **易打理性** | 防缩处理，可机洗 | 需干洗或手洗 | 必须干洗 | 易打理但质感差 |
| **价格价值** | 高端性价比，性能均衡 | 经济实惠 | 奢侈昂贵 | 低价低质 |`,objectionHandling:`## Q1：羊毛会不会容易起球？

**A：** 起球与纤维细度、长度、捻度密切相关，我们通过以下方式最大限度减少起球：
1. **超细纤维**：17.5μm纤维强度高，不易断裂起毛
2. **长纤维选择**：纤维长度≥65mm，减少短绒
3. **优化捻度**：平衡柔软度与抱合力
4. **后整理**：烧毛+剪毛工艺去除表面绒毛

正常穿着下，我们的羊毛产品起球程度比普通羊毛减少70%以上。

## Q2：羊毛衫洗了会不会缩水成童装？

**A：** 传统羊毛确实有这个问题，但我们采用永久防缩技术：
1. **氯化处理**：鳞片钝化，消除氈缩根源
2. **树脂整理**：纤维交联，固定尺寸
3. **预缩工艺**：成衣预缩，消除潜在收缩

经过这些处理，我们的羊毛衫机洗后尺寸变化小于3%，可放心家庭洗涤。

## Q3：羊毛适合什么体型的人穿？

**A：** 羊毛适合所有体型，关键在于版型设计：
1. **偏瘦体型**：选择细针轻薄款，避免臃肿
2. **标准体型**：大多数款式都适合
3. **健壮体型**：选择宽松版型，舒适不紧绷
4. **偏胖体型**：深色基础款，视觉显瘦

我们的专业顾问可以根据您的体型推荐最适合的版型和织法。

## Q4：羊毛和羊绒哪个更值得买？

**A：** 从实用角度，高品质美利奴羊毛是更明智的选择：

**价格**：羊毛是羊绒的1/3-1/5价格
**耐用性**：羊毛强度比羊绒高30%，更耐穿
**易打理性**：羊毛可机洗，羊绒必须干洗
**保暖性**：同等厚度下，羊毛保暖性不输羊绒

除非追求极致奢华感，否则美利奴羊毛是性价比最高的选择。`,practicalExercise:`## 实验一：保温性对比实验

**道具**：羊毛面料、棉面料、两个玻璃杯、热水、温度计

**步骤**：
1. 两个杯子倒入等量热水
2. 分别用羊毛和棉包裹
3. 10分钟后测量温度

**现象**：羊毛包裹的杯子温度高3-5℃

**话术**："羊毛的保温效果是棉的3倍，冬季一件轻薄羊毛衫就能抵御严寒。"

## 实验二：弹性恢复演示

**道具**：羊毛面料、化纤面料、橡皮筋

**步骤**：
1. 将两种面料同样拉伸
2. 释放后观察恢复情况
3. 对比恢复速度和程度

**现象**：羊毛快速恢复原状，化纤留有变形

**话术**："羊毛的天然弹性让衣物不易变形，长时间穿着依然挺括有型。"

## 实验三：吸湿性体验

**道具**：羊毛面料、棉面料、喷雾瓶、水

**步骤**：
1. 向两种面料喷等量水雾
2. 用手背感受面料湿度
3. 观察水迹扩散情况

**现象**：羊毛表面感觉更干爽，水迹均匀扩散

**话术**："羊毛吸收汗液后均匀扩散蒸发，不会局部潮湿造成不适。"`,afterSales:`## 洗涤指南

- **洗涤剂**：专用羊毛洗涤剂，中性pH值
- **水温**：冷水或30℃以下温水
- **机洗设置**：羊毛程序或轻柔模式，转速≤600转
- **手洗技巧**：轻轻按压，不要揉搓拧绞
- **漂洗**：充分漂洗，避免洗涤剂残留

## 干燥方法

- **最佳方式**：平铺晾干，整理成型
- **避免**：悬挂晾干导致变形拉长
- **干燥环境**：通风阴凉处，避免阳光直射
- **半干整理**：微湿时整理形状，干燥后版型更佳

## 熨烫技巧

- **温度设置**：中温熨烫（140-160℃）
- **蒸汽使用**：蒸汽熨烫效果更好
- **垫布要求**：必须垫布熨烫，避免产生镜面
- **熨烫方向**：顺着织物纹理，避免横向拉伸
- **禁忌**：禁止高温直接接触面料

## 收纳要点

- **季节收纳**：洗净晾干后收纳，避免虫蛀
- **折叠方式**：整齐折叠，避免悬挂变形
- **防虫措施**：樟木条或雪松木块，天然防虫
- **防潮处理**：雨季使用除湿剂，保持干燥
- **定期通风**：偶尔取出通风，保持纤维活性`,test:`## 单选题

1. 美利奴羊毛的顶级细度标准是多少？
   - A. ≤28μm
   - B. ≤22μm
   - C. ≤18.5μm ✓
   - D. ≤15μm
   
   **解析**：超细美利奴羊毛细度≤18.5μm，这是国际顶级标准。

2. 羊毛纤维的标准回潮率是多少？
   - A. 8.5%
   - B. 12%
   - C. 15% ✓
   - D. 18%
   
   **解析**：羊毛公定回潮率为15%，吸湿性优于棉和亚麻。

3. 羊毛的哪种结构特性赋予其优良弹性？
   - A. 鳞片层
   - B. 髓质层
   - C. 蛋白质螺旋 ✓
   - D. 卷曲形态
   
   **解析**：羊毛蛋白质分子的α-螺旋结构使其具有天然弹性。

## 实操题

请为一位南方客户担心"羊毛太热，只适合北方"设计一段3分钟的解释话术，需包含：
1. 原理澄清（90秒）
2. 实际应用（60秒）
3. 产品推荐（30秒）

**参考答案**：
"陈先生，您这个担心很常见，但事实恰恰相反。羊毛不是'加热器'而是'智能温控器'。它的工作原理是：当环境温度高时，纤维卷曲舒展，增加透气孔；当温度低时，卷曲收紧，锁住空气保温。在南方湿热天气，羊毛能吸收自重30%的汗液而不感觉潮湿，因为它在吸收的同时就在蒸发。我们的夏季羊毛系列采用180克超轻薄织法，配合丝光处理，透气性比棉更好。广州、深圳的商务精英夏季首选羊毛西装，就是因为它在空调房不冷、室外不闷，真正实现全天候舒适。我建议您试试这件240支的羊毛衬衫，轻薄如丝却功能强大。"`}},{id:"4",name:"莱赛尔面料（天丝™）",subtitle:"绿色科技的丝绸质感，给您带来奢华体验与环保良心的完美结合",description:"莱赛尔（Lyocell）是以天然木浆为原料，采用N-甲基吗啉-N-氧化物（NMMO）溶剂纺丝技术生产的再生纤维素纤维。生产过程实现99.8%溶剂回收，是真正的绿色环保纤维。",category:"再生纤维",order:4,modules:{productCognition:`## 一句话记忆
"莱赛尔——绿色科技的丝绸质感，给您带来奢华体验与环保良心的完美结合"

## 技术背景
莱赛尔（Lyocell）是以天然木浆为原料，采用N-甲基吗啉-N-氧化物（NMMO）溶剂纺丝技术生产的再生纤维素纤维。生产过程实现99.8%溶剂回收，是真正的绿色环保纤维。莱赛尔纤维干湿强度高，具有独特的光泽和垂感，被誉为"21世纪的绿色纤维"。

## 五大核心特性表

| 特性维度 | 具体表现 | 技术参数/原理 | 客户价值 |
|---------|---------|--------------|---------|
| **强度高** | 干湿强度优异 | 干强5.0cN/dtex，湿强保持85% | 耐用耐洗，使用寿命长 |
| **垂感佳** | 丝绸般悬垂性 | 纤维光滑，比重1.5 | 穿着有型，展现优雅线条 |
| **吸湿好** | 优良的吸湿性 | 回潮率11-13%，高于棉 | 干爽舒适，适合敏感肌 |
| **环保性** | 闭环生产工艺 | 溶剂回收率99.8%，可生物降解 | 绿色选择，负责任消费 |
| **光泽美** | 自然珍珠光泽 | 纤维截面圆形，表面光滑 | 低调奢华，提升气质 |

## 技术补充
- 纤维细度：1.2-1.5dtex（超细选择）
- 干断裂强度：5.0cN/dtex（接近涤纶）
- 湿断裂强度：4.2cN/dtex（保持85%）
- 回潮率：11-13%（标准条件）`,salesScript:`## 场景一：客户第一次接触莱赛尔

**错误示范：** "这是天丝，新型面料"

**正确话术：** "这是莱赛尔，我们称为'有良心的奢华'。它采用奥地利兰精公司的天丝™技术，原料是可持续森林的木材，生产过程99.8%溶剂回收，比传统化纤环保50%。您感受这个质感，它融合了棉的透气、丝的垂坠、涤纶的强度，是科技与自然的完美结晶。"

## 场景二：客户询问与真丝的区别

**错误示范：** "这个比真丝便宜，效果差不多"

**正确话术：** "莱赛尔和真丝各有千秋。真丝是动物蛋白纤维，光泽更华丽但娇贵难打理；莱赛尔是植物纤维素纤维，光泽如珍珠般温润，强度却是真丝的3倍，可机洗易护理。从实用角度，莱赛尔更适合日常穿着，既有高级感又省心省力。很多追求品质又注重实用的客户，都会选择莱赛尔作为真丝的智能替代。"

## 场景三：夏季客户想要凉爽有型

**错误示范：** "这个凉快，穿着舒服"

**正确话术：** "莱赛尔是夏季的'智能空调衣'。它的吸湿率13%比棉高50%，散热速度更快。更重要的是，它的湿强保持85%，出汗后不会像棉那样软塌无形。您看这个垂感，即使湿热天气也能保持利落线条，不会贴在身上。很多商务人士夏季选择莱赛尔衬衫，就是因为它在保持凉爽的同时，依然能维持专业形象。"

## 场景四：客户担心新型面料不可靠

**错误示范：** "这是大品牌，质量没问题"

**正确话术：** "您的谨慎很合理。莱赛尔虽然名字新，但技术已经成熟发展30年，是经过国际认证的绿色纤维。它的强度测试显示：干强接近涤纶，湿强远超市面所有纤维素纤维。我们提供3年品质保证，因为实验室数据显示，正常穿着洗涤200次后，性能保持率仍在90%以上。这不仅是新型面料，更是经过验证的可靠科技。"`,competitorComparison:`## 竞品对比表

| 对比维度 | CASEDI莱赛尔 | 普通粘胶 | 真丝 | 棉 |
|---------|-------------|---------|------|-----|
| **原料工艺** | 可持续木材，NMMO溶剂法 | 木材/竹，碱法污染大 | 蚕丝蛋白 | 天然棉花 |
| **强度性能** | 干强5.0，湿强4.2cN/dtex | 干强2.5，湿强1.2cN/dtex | 干强3.5，湿强2.8cN/dtex | 干强3.0，湿强3.5cN/dtex |
| **环保指数** | 闭环生产，溶剂回收99.8% | 废水排放，污染环境 | 养殖过程环境影响 | 种植耗水，农药使用 |
| **垂感光泽** | 优秀垂感，珍珠光泽 | 一般垂感，普通光泽 | 极致垂感，华丽光泽 | 基本垂感，柔和光泽 |
| **易打理性** | 可机洗，抗皱性好 | 湿态脆弱，易变形 | 必须干洗，娇贵难护 | 可机洗，但易皱 |
| **价格定位** | 高端科技，价值明显 | 经济实惠，性能一般 | 奢侈昂贵，护理成本高 | 亲民价格，普及度高 |`,objectionHandling:`## Q1：莱赛尔会不会容易起毛起球？

**A：** 莱赛尔有原纤化特性，但我们通过技术控制：
1. **纤维选择**：使用交联型莱赛尔（Tencel A100），减少原纤化
2. **织造工艺**：紧密织造，减少摩擦起毛
3. **后整理**：生物抛光处理，去除表面绒毛
4. **洗涤指导**：反面洗涤，减少摩擦

正常穿着下，我们的莱赛尔产品起毛程度比普通型号减少80%。

## Q2：莱赛尔面料适合什么季节？

**A：** 莱赛尔是真正的四季面料：
- **春季**：吸湿透气，应对温差变化
- **夏季**：快速吸湿散热，比棉更凉爽
- **秋季**：适度保温，调节微气候
- **冬季**：内层保暖，外层防风搭配

特别是春秋季，莱赛尔的温控性能让您从容应对多变天气。

## Q3：莱赛尔染色牢固吗？

**A：** 我们采用先进染色技术确保色牢度：
1. **前处理**：充分准备，提高染料吸收
2. **活性染色**：多活性基染料，与纤维共价结合
3. **固色工艺**：高温高压固色，色牢度4-5级
4. **后处理**：皂洗充分，避免浮色

测试显示，洗涤50次后色差ΔE＜1.5，肉眼几乎无法察觉。

## Q4：莱赛尔和莫代尔有什么区别？

**A：** 两者都是再生纤维素纤维，但各有特色：

**莱赛尔**：NMMO溶剂法，干湿强度高，垂感好，光泽美，适合衬衫、西装、裙装
**莫代尔**：改良粘胶法，极致柔软，贴身舒适，弹性好，适合内衣、T恤、家居服

简单说：要挺括有型选莱赛尔，要贴身柔软选莫代尔。`,practicalExercise:`## 实验一：强度对比实验

**道具**：莱赛尔面料、棉面料、粘胶面料、水、砝码

**步骤**：
1. 将三种湿面料同样悬挂
2. 逐渐增加砝码
3. 观察断裂顺序

**现象**：莱赛尔最后断裂，承重最大

**话术**："莱赛尔湿强保持85%，是粘胶的3倍，出汗后依然牢固耐用。"

## 实验二：垂感展示

**道具**：莱赛尔面料、棉面料、支架

**步骤**：
1. 将两种面料同样披在支架上
2. 观察自然下垂形态
3. 轻轻抖动对比动态

**现象**：莱赛尔下垂更流畅，褶皱更优美

**话术**："莱赛尔的丝绸般垂感，让衣物穿着时自然形成优雅线条。"

## 实验三：吸湿速度测试

**道具**：莱赛尔面料、棉面料、滴管、计时器

**步骤**：
1. 各滴一滴水
2. 记录完全吸收时间
3. 触摸表面干爽度

**现象**：莱赛尔吸收更快，表面更干爽

**话术**："莱赛尔吸湿速度比棉快30%，始终保持干爽触感。"`,afterSales:`## 洗涤指南

- **洗涤剂**：中性洗衣液，避免碱性损伤
- **水温**：冷水或30℃以下温水
- **机洗设置**：轻柔模式，转速≤800转
- **脱水方式**：可轻柔脱水，避免长时间浸泡
- **特殊注意**：深色首次洗涤可能轻微掉色，属正常现象

## 干燥方法

- **最佳方式**：平铺晾干，整理形状
- **悬挂技巧**：使用宽肩衣架，避免局部拉伸
- **干燥环境**：通风阴凉处，避免暴晒
- **半干处理**：微湿时整理，干燥后版型更佳

## 熨烫技巧

- **温度设置**：中温熨烫（150-170℃）
- **蒸汽使用**：蒸汽熨烫效果更佳
- **垫布建议**：深色衣物建议垫布熨烫
- **熨烫方向**：顺着纹理，避免横向拉扯
- **禁忌提醒**：禁止高温直接接触

## 收纳要点

- **折叠存放**：整齐折叠，避免重压
- **悬挂保存**：适合需要定型的西装、外套
- **防潮措施**：雨季注意除湿，避免霉变
- **防虫处理**：天然防虫剂，保护纤维
- **定期整理**：偶尔取出通风，保持活性`,test:`## 单选题

1. 莱赛尔纤维生产的关键环保技术是什么？
   - A. 碱法纺丝
   - B. NMMO溶剂回收 ✓
   - C. 高温碳化
   - D. 化学交联
   
   **解析**：NMMO溶剂回收率99.8%是莱赛尔环保的核心。

2. 莱赛尔湿强保持率是多少？
   - A. 50%
   - B. 65%
   - C. 85% ✓
   - D. 95%
   
   **解析**：莱赛尔湿强保持85%，远高于粘胶的50%。

3. 莱赛尔最突出的视觉特征是什么？
   - A. 华丽光泽
   - B. 珍珠光泽 ✓
   - C. 哑光质感
   - D. 金属反光
   
   **解析**：莱赛尔具有独特的珍珠般温润光泽。

## 实操题

请为一位注重环保的年轻设计师推荐莱赛尔面料，设计一段3分钟的价值话术，需包含：
1. 环保故事（90秒）
2. 设计优势（60秒）
3. 市场定位（30秒）

**参考答案**：
"张设计师，莱赛尔是为你这样有环保理念的创作者而生的。它的故事始于奥地利阿尔卑斯山区的可持续森林，木材经过NMMO溶剂纺丝，99.8%的溶剂闭环回收，整个碳足迹只有棉的1/3。这意味着你选择的不仅是面料，更是一种负责任的生产哲学。从设计角度，莱赛尔的光泽度、垂感、染色表现力都极其出色，它既有天然纤维的质感，又有合成纤维的可塑性，非常适合你的创意表达。在市场上，莱赛尔正在成为可持续时尚的代名词，Z世代消费者愿意为这样的绿色科技溢价30%。这不仅是面料选择，更是品牌价值观的宣言。"`}},{id:"5",name:"莫代尔面料",subtitle:"第二层肌肤般的极致柔软，给您带来裸感舒适的贴身体验",description:"莫代尔（Modal）是以榉木浆为原料，采用改良粘胶法生产的再生纤维素纤维。通过优化纺丝工艺，莫代尔纤维比普通粘胶更细、更软、强度更高。",category:"再生纤维",order:5,modules:{productCognition:`## 一句话记忆
"莫代尔——第二层肌肤般的极致柔软，给您带来裸感舒适的贴身体验"

## 技术背景
莫代尔（Modal）是以榉木浆为原料，采用改良粘胶法生产的再生纤维素纤维。通过优化纺丝工艺，莫代尔纤维比普通粘胶更细、更软、强度更高。其横截面呈圆形或腰圆形，表面光滑，具有优异的柔软性和亲肤性，特别适合贴身衣物。

## 五大核心特性表

| 特性维度 | 具体表现 | 技术参数/原理 | 客户价值 |
|---------|---------|--------------|---------|
| **柔软度** | 极致柔软触感 | 纤维细度1.0-1.3dtex，表面光滑 | 贴身舒适，如第二层肌肤 |
| **吸湿性** | 优良的吸湿能力 | 回潮率12-14%，高于棉 | 保持干爽，减少闷热感 |
| **弹性好** | 良好的拉伸回复 | 纤维柔韧，断裂伸长15-20% | 贴合身形，活动自如 |
| **光泽美** | 自然柔和光泽 | 圆形截面，光线均匀反射 | 提升质感，显高级 |
| **环保性** | 改进环保工艺 | 减少化学品使用，可生物降解 | 绿色选择，安心贴身 |

## 技术补充
- 纤维细度：1.0-1.3dtex（超细规格）
- 干断裂强度：3.5-4.0cN/dtex
- 湿断裂强度：2.5-3.0cN/dtex
- 回潮率：12-14%（标准条件）`,salesScript:`## 场景一：客户触摸莫代尔T恤

**错误示范：** "这个很软，穿着舒服"

**正确话术：** "您触摸的是莫代尔面料，我们称为'会呼吸的第二层肌肤'。它采用奥地利兰精公司的专利技术，纤维细度只有1.1dtex，比头发丝细6倍。这种极致细腻让面料触感如婴儿肌肤般柔软，而且越洗越软，不会像棉那样变硬。很多客户说，穿过莫代尔就再也回不去普通棉T了。"

## 场景二：夏季客户想要透气内衣

**错误示范：** "这个透气，适合夏天"

**正确话术：** "莫代尔是夏季内衣的完美选择。它的吸湿率14%比棉高65%，散热速度更快。更重要的是，莫代尔纤维表面光滑，不会像棉纤维那样有毛羽刺激皮肤。您看这个显微镜图，莫代尔纤维圆润光滑，棉纤维有天然转曲和毛羽，这就是为什么莫代尔贴身穿着零摩擦感，特别适合敏感肌肤。"

## 场景三：客户询问与纯棉内衣的区别

**错误示范：** "这个比棉高级，更舒服"

**正确话术：** "莫代尔和纯棉都是优秀的内衣面料，但各有专长：纯棉的优势是天然、安全、性价比；莫代尔的优势是极致柔软、更佳吸湿、越洗越软。如果您追求顶级贴身舒适感，特别是睡眠时几乎感觉不到衣物的存在感，莫代尔是首选。如果更看重天然纯度和经济性，高品质纯棉也很优秀。我们建议您实际试穿体验，身体会告诉您答案。"

## 场景四：客户担心新型面料安全性

**错误示范：** "这是大品牌，肯定安全"

**正确话术：** "您的安全意识值得赞赏。莫代尔的安全性有双重保障：第一，原料是欧洲可持续森林的榉木，通过FSC认证；第二，生产过程采用改进的环保工艺，减少化学品使用，最终产品通过OEKO-TEX Standard 100认证，这是国际最严格的纺织品安全标准，确保无有害物质残留。我们还有第三方检测报告可供查阅，让您买得放心、穿得安心。"`,competitorComparison:`## 竞品对比表

| 对比维度 | CASEDI莫代尔 | 普通粘胶 | 纯棉 | 真丝 |
|---------|-------------|---------|------|------|
| **柔软程度** | 极致柔软，如第二层肌肤 | 柔软但易板结 | 柔软但会变硬 | 柔软但娇贵 |
| **吸湿性能** | 回潮率14%，快速吸湿 | 吸湿好但湿强差 | 回潮率8.5% | 吸湿一般 |
| **弹性贴合** | 良好弹性，贴合身形 | 弹性差，易变形 | 基本无弹性 | 有一定弹性 |
| **易打理性** | 可机洗，越洗越软 | 湿态脆弱，需小心 | 可机洗但易皱 | 必须干洗 |
| **耐用性能** | 强度优于粘胶，耐洗 | 强度低，易损坏 | 耐用但易变硬 | 娇贵，易勾丝 |
| **价格定位** | 高端贴身，价值明显 | 经济实惠 | 亲民普及 | 奢侈昂贵 |`,objectionHandling:`## Q1：莫代尔会不会容易变形？

**A：** 高品质莫代尔变形控制良好：
1. **纤维品质**：选用长纤维规格，增强稳定性
2. **织造工艺**：采用紧密织法，减少拉伸变形
3. **后整理**：树脂整理，增强尺寸记忆
4. **洗涤指导**：冷水轻柔，避免暴力机洗

正常护理下，我们的莫代尔产品洗涤50次后尺寸变化＜5%。

## Q2：莫代尔适合做外衣吗？

**A：** 莫代尔主要定位贴身衣物，但可通过混纺拓展应用：
- **纯莫代尔**：最适合内衣、T恤、家居服、睡衣
- **莫代尔混纺**：与棉混纺适合POLO衫、休闲裤；与涤纶混纺增加挺括度

我们建议：贴身层选纯莫代尔，外衣层选莫代尔混纺。

## Q3：莫代尔染色牢固吗？

**A：** 我们采用专门针对莫代尔的染色技术：
1. **染料选择**：高亲和力活性染料
2. **染色工艺**：低温染色，保护纤维柔软度
3. **固色处理**：专用固色剂，色牢度4级以上
4. **后处理**：充分皂洗，确保色牢度

特别是深色系，我们进行双重固色处理，确保洗涤不褪色。

## Q4：莫代尔和莱赛尔哪个更适合内衣？

**A：** 两者都是优秀内衣面料，侧重不同：

**莫代尔**：极致柔软，贴身舒适，弹性好，适合追求"裸感"的消费者
**莱赛尔**：强度更高，垂感更好，光泽更美，适合需要一定挺括度的内衣

简单选择：要柔软选莫代尔，要强度选莱赛尔。`,practicalExercise:`## 实验一：柔软度盲测

**道具**：莫代尔面料、纯棉面料、丝巾（蒙眼用）

**步骤**：
1. 蒙眼客户
2. 让其触摸两种面料
3. 猜测哪个更柔软

**现象**：90%客户正确识别莫代尔更软

**话术**："莫代尔的柔软是能被触觉直接识别的顶级体验。"

## 实验二：吸湿对比

**道具**：莫代尔面料、纯棉面料、喷雾瓶、纸巾

**步骤**：
1. 向两种面料喷等量水雾
2. 用纸巾轻压
3. 观察纸巾水迹

**现象**：莫代尔上的纸巾水迹更少

**话术**："莫代尔吸湿更快，保持皮肤干爽时间更长。"

## 实验三：弹性展示

**道具**：莫代尔面料、纯棉面料、橡皮筋

**步骤**：
1. 将两种面料同样拉伸
2. 释放观察恢复
3. 反复拉伸对比

**现象**：莫代尔恢复更快更完全

**话术**："莫代尔的良好弹性让衣物更贴合身形，活动更自如。"`,afterSales:`## 洗涤指南

- **洗涤剂**：中性洗衣液，专用内衣洗涤剂更佳
- **水温**：冷水或30℃以下温水
- **机洗设置**：内衣袋+轻柔模式，转速≤600转
- **手洗建议**：轻轻按压，不要揉搓拧绞
- **漂洗**：充分漂洗，避免洗涤剂残留刺激皮肤

## 干燥方法

- **最佳方式**：平铺晾干，整理形状
- **避免**：悬挂导致变形拉长
- **干燥环境**：通风阴凉处，避免暴晒
- **半干整理**：微湿时整理，干燥后版型更佳

## 熨烫技巧

- **温度设置**：低温熨烫（110-130℃）
- **蒸汽使用**：蒸汽熨烫效果更好
- **垫布要求**：必须垫布熨烫，避免损伤纤维
- **熨烫方向**：顺着织物纹理，轻柔熨烫
- **禁忌**：禁止高温，禁止长时间停留

## 收纳要点

- **专用空间**：内衣专用抽屉或分隔盒
- **折叠方式**：整齐折叠，避免挤压变形
- **防潮防霉**：干燥剂保持干爽，定期通风
- **卫生管理**：定期清洁收纳空间，保持卫生
- **更换周期**：建议6-12个月更换，保持最佳状态`,test:`## 单选题

1. 莫代尔纤维的主要原料是什么？
   - A. 棉花
   - B. 榉木浆 ✓
   - C. 石油
   - D. 蚕丝
   
   **解析**：莫代尔以可持续森林的榉木浆为原料。

2. 莫代尔最突出的特性是什么？
   - A. 高强度
   - B. 极致柔软 ✓
   - C. 优良垂感
   - D. 耐磨性
   
   **解析**：莫代尔以"第二层肌肤"般的极致柔软著称。

3. 莫代尔面料最适合哪种用途？
   - A. 西装外套
   - B. 牛仔裤
   - C. 贴身内衣 ✓
   - D. 冬季大衣
   
   **解析**：莫代尔的柔软亲肤特性使其成为顶级内衣面料。

## 实操题

请为一位从未穿过莫代尔的中年男士推荐莫代尔内衣，设计一段3分钟的体验话术，需包含：
1. 观念突破（60秒）
2. 体验对比（90秒）
3. 生活改变（30秒）

**参考答案**：
"王先生，我知道您习惯穿纯棉内衣，觉得天然安全。但让我邀请您体验一次面料科技的进步。请闭上眼睛，触摸这两块面料——左边是您熟悉的纯棉，右边是莫代尔。感受到差别了吗？莫代尔比纯棉柔软60%，因为它的纤维细度只有1.1dtex。更重要的是，它越洗越软，而棉会越洗越硬。夜晚睡眠时，莫代尔几乎零存在感，让您真正放松；白天活动时，它的良好弹性贴合身形不束缚。很多像您这样的客户尝试后都说：'穿回棉内衣就像穿麻袋一样粗糙。'这不是放弃天然，而是升级体验，让每一天的贴身感受都达到顶级标准。"`}}],Zb=[{id:"6",name:"粘纤（Viscose）",subtitle:"会呼吸的再生丝，兼具棉的舒适与丝的垂坠",description:"粘纤是以天然纤维素为原料，通过碱化、老化、黄化等化学工艺制成纤维素黄酸酯，再经湿法纺丝而成。",category:"再生纤维",order:6,modules:{productCognition:`## 一句话记忆
"粘纤——会呼吸的再生丝，以天然纤维素为原料，兼具棉的舒适与丝的垂坠"

## 技术背景
- **原料来源**：棉短绒、木材、竹浆等天然纤维素
- **生产工艺**：通过碱化、老化、黄化等化学工艺制成纤维素黄酸酯，再经湿法纺丝而成
- **历史沿革**：1891年发明，1905年实现工业化生产，中国产量第二大化纤品种

## 五大核心特性表

| 特性维度 | 具体表现 | 导购应用要点 |
|---------|---------|-------------|
| **吸湿透气** | 回潮率12-14%（棉仅7-8%），含湿率最符合人体皮肤生理要求 | 强调夏季穿着不闷热，适合内衣、T恤等贴身衣物 |
| **手感舒适** | 光滑柔软，有丝绸质感，悬垂性好 | 让客户亲手触摸，感受"第二层皮肤"的舒适度 |
| **染色性能** | 染色色谱全，色彩鲜艳，色牢度好 | 展示鲜艳色彩的粘纤产品，说明不易褪色 |
| **抗静电** | 比电阻低，抗静电性能良好 | 秋冬季节推荐，避免静电困扰 |
| **混纺兼容** | 可与棉、毛、合成纤维任意混纺 | 介绍混纺产品的综合优势 |`,salesScript:`## 场景一：客户担心"人造纤维"不天然

**错误示范**："这就是人造的，但质量挺好的"

**正确话术**："粘纤虽然是再生纤维，但它来源于天然植物纤维素，通过环保工艺再生而成。它既保留了天然纤维的舒适透气，又通过科技优化了染色和抗皱性能，是自然与科技的完美结合。"

## 场景二：客户询问与棉的区别

**错误示范**："比棉好，更滑更凉快"

**正确话术**："粘纤在吸湿性上比棉更优秀，能多吸收近一倍的水分，所以夏季出汗后干得更快。同时它的垂坠感更好，做成衬衫、连衣裙更有型。您可以对比感受一下，粘纤更光滑凉爽，棉更质朴温暖。"

## 场景三：客户担心缩水变形

**错误示范**："不会缩的，放心买"

**正确话术**："粘纤确实有一定缩水率，但我们的产品都经过预缩处理，正常洗涤后缩水率控制在3%以内。我建议您选择我们的混纺款式，比如粘纤+聚酯纤维，既保留了舒适感，又增强了尺寸稳定性。"

## 场景四：客户觉得价格偏高

**错误示范**："这个材质就是贵"

**正确话术**："粘纤的生产工艺比普通化纤复杂得多，需要从天然植物中提取纤维素，再通过精细的化学工艺再生。它带来的穿着体验是普通化纤无法比拟的——像真丝一样的光泽，像棉一样的透气，但价格只有真丝的1/3。"`,competitorComparison:`## 竞品对比表

| 对比维度 | 粘纤 | 棉 | 莫代尔 | 真丝 |
|---------|------|-----|--------|------|
| **原料来源** | 天然纤维素再生 | 天然棉花 | 天然木材（高湿模量） | 天然蚕丝 |
| **吸湿性** | ★★★★★（12-14%） | ★★★☆☆（7-8%） | ★★★★★（13-15%） | ★★★★☆（11%） |
| **透气性** | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★★☆ |
| **手感** | 光滑柔软 | 质朴温暖 | 极致柔软 | 奢华顺滑 |
| **垂坠感** | ★★★★☆ | ★★☆☆☆ | ★★★☆☆ | ★★★★★ |
| **抗皱性** | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ |
| **价格区间** | 中档 | 经济 | 中高档 | 高档 |
| **适用场景** | 夏季衬衫、连衣裙、内衣 | 日常基础款、家居服 | 高端内衣、睡衣 | 礼服、高端衬衫 |`,objectionHandling:`## Q1：粘纤洗后会不会变硬？

**A：** 粘纤湿态下确实会暂时变硬，因为纤维吸湿后直径膨胀可达50%。但完全干燥后会恢复柔软。建议悬挂晾干，避免拧绞，干燥后轻轻拍打即可恢复原状。

## Q2：粘纤容易起球吗？

**A：** 普通粘纤确实有一定起球倾向，但我们的产品采用高支数长丝粘纤，纤维强度更高，表面更光滑，大大降低了起球概率。日常穿着避免与粗糙表面频繁摩擦即可。

## Q3：粘纤和莫代尔有什么区别？

**A：** 莫代尔是粘纤的升级版，属于高湿模量粘胶纤维。两者原料相似，但莫代尔生产工艺更精细，湿强更高，缩水率更小，手感更柔软。简单说，莫代尔是"优化版粘纤"，性能更稳定。

## Q4：粘纤环保吗？生产过程有没有污染？

**A：** 现代粘纤生产已大幅改进环保工艺。我们合作的供应商采用闭环生产系统，回收率达98%以上，二硫化碳等有害物质排放远低于国家标准。粘纤原料来自可持续种植的速生林，是环保的再生资源。`,practicalExercise:`## 实验1：吸水性对比实验

**材料**：粘纤面料、棉面料、聚酯纤维面料各一小块，滴管，清水

**步骤**：在三种面料上各滴一滴水，观察水珠扩散速度和渗透深度

**观察要点**：粘纤最快扩散完全渗透，棉次之，聚酯纤维水珠停留表面

**导购应用**：向客户直观展示粘纤的优异吸湿性

## 实验2：手感盲测

**材料**：蒙眼布，粘纤、莫代尔、棉、真丝面料各一块

**步骤**：蒙眼触摸四种面料，凭手感排序舒适度

**观察要点**：多数人会将粘纤和莫代尔排在前两位

**导购应用**：让客户通过触觉体验建立对粘纤的信任

## 实验3：垂坠感展示

**材料**：粘纤衬衫、棉衬衫各一件，衣架

**步骤**：将两件衬衫悬挂在衣架上，观察自然垂坠形态

**观察要点**：粘纤衬衫线条更流畅，褶皱更少

**导购应用**：展示粘纤的优雅垂坠效果`,afterSales:`## 洗涤

- 水温：30℃以下冷水或温水
- 方式：手洗最佳，机洗选择轻柔模式
- 洗涤剂：中性洗涤剂，避免碱性过强
- 注意：单独洗涤，避免染色；不要浸泡过久

## 干燥

- 方式：平铺晾干或悬挂晾干
- 禁忌：避免暴晒，防止褪色；不可烘干机高温烘干
- 技巧：晾至半干时轻轻拉伸，帮助恢复尺寸

## 熨烫

- 温度：中低温熨烫（110-130℃）
- 方式：反面熨烫，垫一层薄布
- 状态：微湿状态熨烫效果最佳

## 收纳

- 方式：悬挂存放，避免折叠压痕
- 环境：干燥通风，避免潮湿发霉
- 防虫：使用天然樟木，避免化学防虫剂`,test:`## 单选题

1. 粘纤的标准回潮率是多少？
   - A. 7-8%
   - B. 9-10%
   - C. 12-14% ✓
   - D. 15-17%

2. 粘纤湿态强度约为干态的多少？
   - A. 30%
   - B. 50% ✓
   - C. 70%
   - D. 90%

3. 粘纤最适合与哪种纤维混纺以增强尺寸稳定性？
   - A. 棉
   - B. 羊毛
   - C. 聚酯纤维 ✓
   - D. 真丝

## 实操题

请设计一个3分钟的现场演示，向客户展示粘纤的吸湿透气特性。要求包含至少两种互动方式。`}},{id:"7",name:"聚酯纤维（涤纶）",subtitle:"全能战士，高强度、易打理、功能多样，现代衣橱的基石面料",description:"聚酯纤维是聚对苯二甲酸乙二醇酯（PET），与塑料瓶同源。采用熔融纺丝，可调整纤维截面形状（圆形、十字形、Y形等）。",category:"合成纤维",order:7,modules:{productCognition:`## 一句话记忆
"聚酯纤维——全能战士，高强度、易打理、功能多样，现代衣橱的基石面料"

## 技术背景
- **化学结构**：聚对苯二甲酸乙二醇酯（PET），与塑料瓶同源
- **生产工艺**：熔融纺丝，可调整纤维截面形状（圆形、十字形、Y形等）
- **发展历程**：1941年发明，1953年工业化，现为全球产量最大的合成纤维

## 五大核心特性表

| 特性维度 | 具体表现 | 导购应用要点 |
|---------|---------|-------------|
| **高强度耐磨** | 干湿强度不变，是棉的2-3倍，羊毛的3-4倍 | 强调耐用性，适合运动服、工装、童装等高频穿着场景 |
| **抗皱免烫** | 分子链紧密，洗涤后快速恢复平整 | "懒人福音"，减少熨烫时间，适合商务衬衫、西装 |
| **尺寸稳定** | 收缩率<3%（棉8-10%），洗后不变形 | 解决客户"缩水"顾虑，适合需要保持版型的服装 |
| **功能多样** | 通过改性实现速干、保暖、抗UV、抗菌等 | 根据客户需求推荐特定功能款 |
| **染色鲜艳** | 着色力强，色彩饱和度高，不易褪色 | 展示亮色、印花产品，强调色彩持久性 |`,salesScript:`## 场景一：客户认为"聚酯纤维=廉价低质"

**错误示范**："这个价格只能买聚酯纤维"

**正确话术**："聚酯纤维确实有经济型产品，但我们的聚酯纤维是经过特殊工艺处理的高品质版本。比如这款速干T恤，采用异形截面纤维，吸湿排汗速度比纯棉快3-5倍，是专业运动品牌同款科技。"

## 场景二：客户担心闷热不透气

**错误示范**："夏天穿都这样"

**正确话术**："传统聚酯纤维确实透气性一般，但我们采用超细旦技术，单丝细度不到头发丝的1/10，织成的面料孔隙更细密均匀。您看这款防晒衣，轻薄透气的同时还能达到UPF50+的防晒效果，是科技与舒适的平衡。"

## 场景三：客户询问与天然纤维的对比

**错误示范**："这个比棉结实"

**正确话术**："聚酯纤维和天然纤维各有优势。聚酯纤维在耐用性、易打理性、功能多样性上更胜一筹；而天然纤维在亲肤感、透气吸湿上更优。我们建议根据使用场景选择：通勤、运动选聚酯纤维，家居休闲选天然纤维，或者选择混纺产品兼顾两者优点。"

## 场景四：客户觉得"化纤"不环保

**错误示范**："现在都这样"

**正确话术**："我们非常重视环保，这款产品采用再生聚酯纤维（rPET），原料来自回收的塑料瓶。每件衣服相当于回收了8个500ml的塑料瓶，既减少了资源消耗，又保持了聚酯纤维的优异性能。这是时尚与可持续的完美结合。"`,competitorComparison:`## 竞品对比表

| 对比维度 | 聚酯纤维 | 棉 | 羊毛 | 锦纶 |
|---------|---------|-----|------|------|
| **强度** | ★★★★★ | ★★☆☆☆ | ★★☆☆☆ | ★★★★☆ |
| **耐磨性** | ★★★★★ | ★★☆☆☆ | ★★☆☆☆ | ★★★★★ |
| **抗皱性** | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★★★★☆ |
| **吸湿性** | ★☆☆☆☆ | ★★★★★ | ★★★★★ | ★★☆☆☆ |
| **透气性** | ★★☆☆☆ | ★★★★★ | ★★★★☆ | ★★☆☆☆ |
| **保暖性** | ★★☆☆☆（普通）★★★★☆（中空） | ★★★☆☆ | ★★★★★ | ★★☆☆☆ |
| **价格** | 经济-中档 | 经济-中档 | 高档 | 中档-高档 |
| **核心优势** | 耐用、易打理、功能多 | 舒适、透气、天然 | 保暖、弹性、高档感 | 高强度、耐磨、弹性 |`,objectionHandling:`## Q1：聚酯纤维起静电怎么办？

**A：** 我们采用抗静电处理技术，在纤维中混入导电丝或涂覆抗静电涂层。日常穿着时，可以使用衣物柔顺剂，增加面料湿度减少静电。对于特别干燥的环境，我们推荐混纺产品，如聚酯纤维+棉，天然纤维能有效导走静电。

## Q2：聚酯纤维会不会不透气，夏天穿闷热？

**A：** 这取决于纤维细度和织造工艺。我们的夏季系列采用超细旦纤维（<0.5dtex），孔隙率比传统聚酯纤维高40%以上，透气性大幅提升。同时通过异形截面设计，形成毛细通道快速导湿，实际穿着体验干爽舒适。

## Q3：听说聚酯纤维高温会融化？

**A：** 聚酯纤维的熔点在250-260℃，远高于日常穿着和正常洗涤温度。熨烫时请使用中低温档（150℃以下），避免接触明火即可。我们的产品标签都有明确熨烫温度指引。

## Q4：聚酯纤维容易起球吗？

**A：** 普通聚酯纤维确实有起球倾向，但我们采用高强丝和紧密纺纱工艺，纤维抱合力强，表面光滑，大大降低了起球概率。日常穿着避免与粗糙表面频繁摩擦，按照洗涤说明护理即可。`,practicalExercise:`## 实验1：速干性能测试

**材料**：聚酯纤维速干T恤、棉T恤各一件，量杯，计时器

**步骤**：各滴10ml水在面料上，记录完全干燥时间

**观察要点**：聚酯纤维15-20分钟干透，棉需40-60分钟

**导购应用**：直观展示运动面料的科技优势

## 实验2：抗皱恢复测试

**材料**：聚酯纤维衬衫、棉衬衫各一件，重物

**步骤**：各折叠压置10分钟，展开观察褶皱恢复情况

**观察要点**：聚酯纤维基本恢复平整，棉仍有明显褶皱

**导购应用**：展示商务着装的高效打理优势

## 实验3：耐磨强度测试

**材料**：聚酯纤维面料、棉面料各一块，砂纸

**步骤**：相同力度摩擦50次，观察表面磨损

**观察要点**：聚酯纤维无明显变化，棉表面起毛

**导购应用**：证明童装、工装的耐用性`,afterSales:`## 洗涤

- 水温：40℃以下，避免高温
- 方式：机洗选择标准或轻柔模式
- 洗涤剂：通用洗衣液即可，避免漂白剂
- 注意：深色浅色分开洗，拉好拉链避免刮伤

## 干燥

- 方式：可悬挂晾干，也可低温烘干
- 禁忌：烘干温度不超过60℃，避免长时间暴晒
- 技巧：烘干后立即取出，避免压痕

## 熨烫

- 温度：中温熨烫（130-150℃）
- 方式：可正面熨烫，垫布保护印花
- 状态：微干或干燥状态均可

## 收纳

- 方式：折叠或悬挂均可
- 环境：干燥即可，防潮要求不高
- 防虫：聚酯纤维本身防虫，无需特殊处理`,test:`## 单选题

1. 聚酯纤维的原料与哪种日常物品相同？
   - A. 玻璃
   - B. 金属
   - C. 塑料瓶 ✓
   - D. 纸张

2. 异形截面聚酯纤维的主要功能是什么？
   - A. 增加重量
   - B. 提高速干性 ✓
   - C. 改变颜色
   - D. 减少成本

3. 聚酯纤维熨烫的最高安全温度是多少？
   - A. 100℃
   - B. 150℃ ✓
   - C. 200℃
   - D. 250℃

## 实操题

请向一位担心聚酯纤维"廉价感"的客户，现场演示如何通过触感和功能测试改变其认知。`}},{id:"8",name:"锦纶（尼龙）",subtitle:"韧性之王，超高强度、卓越耐磨，户外运动与功能服饰的首选",description:"锦纶是聚酰胺纤维，美国称Nylon，中国称锦纶。1935年杜邦公司发明，1938年商业化，是第一种完全合成纤维。",category:"合成纤维",order:8,modules:{productCognition:`## 一句话记忆
"锦纶——韧性之王，超高强度、卓越耐磨，户外运动与功能服饰的首选"

## 技术背景
- **化学名称**：聚酰胺纤维，美国称Nylon，中国称锦纶
- **发明历史**：1935年杜邦公司发明，1938年商业化，第一种完全合成纤维
- **生产工艺**：熔融纺丝，可通过调整分子量控制强度

## 五大核心特性表

| 特性维度 | 具体表现 | 导购应用要点 |
|---------|---------|-------------|
| **超高强度** | 干态强度是棉的4-5倍，湿态强度下降少 | 强调"最结实"的面料，适合背包、帐篷、运动装备 |
| **卓越耐磨** | 耐磨性是棉的10倍，羊毛的20倍 | 推荐高频摩擦部位使用，如裤裆、肘部、背包底部 |
| **良好弹性** | 弹性回复率高，保形性好 | 适合紧身运动服、泳衣，活动自如不变形 |
| **轻质柔软** | 比重1.14，比涤纶轻，手感柔软 | 强调"轻若无物"的穿着体验 |
| **易洗快干** | 疏水性纤维，洗涤后干得快 | 适合旅行、户外场景，减少等待时间 |`,salesScript:`## 场景一：客户分不清锦纶和涤纶

**错误示范**："都差不多，都是化纤"

**正确话术**："锦纶和涤纶虽然都是合成纤维，但特性不同。锦纶更注重强度和弹性，像这款登山裤，膝盖部位特别加了锦纶增强，耐磨性是普通面料的10倍；而涤纶更注重抗皱和尺寸稳定。简单说，要强度选锦纶，要挺括选涤纶。"

## 场景二：客户担心锦纶闷热

**错误示范**："运动面料都这样"

**正确话术**："锦纶本身是疏水纤维，不吸汗，但现代锦纶面料通过特殊织造工艺解决了这个问题。您看这款跑步T恤，采用网眼结构，汗液通过毛细作用快速导出，在表面蒸发，实际穿着比吸汗后黏腻的棉更干爽。"

## 场景三：客户询问锦纶的保暖性

**错误示范**："不保暖，就是结实"

**正确话术**："锦纶本身保暖性一般，但通过后整理技术可以赋予它保暖功能。比如这款冬季软壳衣，内层是细绒锦纶，通过磨毛工艺增加空气层，保暖性提升30%以上。同时外层保持锦纶的耐磨防风特性，是冬季户外活动的理想选择。"

## 场景四：客户觉得锦纶"塑料感"强

**错误示范**："化纤都这样"

**正确话术**："早期锦纶确实有塑料感，但我们采用超细旦技术和特殊后整理。您摸摸这款高端锦纶面料，经过砂洗处理，手感柔软亲肤，甚至有类似棉的质感，但保留了锦纶的强度和弹性，是科技与舒适的融合。"`,competitorComparison:`## 竞品对比表

| 对比维度 | 锦纶 | 涤纶 | 氨纶 | 棉 |
|---------|------|------|------|-----|
| **强度** | ★★★★★ | ★★★★☆ | ★☆☆☆☆ | ★★☆☆☆ |
| **耐磨性** | ★★★★★ | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ |
| **弹性** | ★★★★☆ | ★★☆☆☆ | ★★★★★ | ★☆☆☆☆ |
| **吸湿性** | ★★☆☆☆（4.5%） | ★☆☆☆☆（0.4%） | ★☆☆☆☆ | ★★★★★ |
| **轻质性** | ★★★★★ | ★★★☆☆ | ★★★★★ | ★★☆☆☆ |
| **耐光性** | ★★☆☆☆ | ★★★★★ | ★★★☆☆ | ★★★★☆ |
| **价格** | 中档-高档 | 经济-中档 | 中档-高档 | 经济-中档 |
| **核心应用** | 户外装备、泳衣、袜子 | 日常服装、家纺 | 弹性面料、内衣 | 基础服装、家居服 |`,objectionHandling:`## Q1：锦纶容易产生静电吗？

**A：** 锦纶确实容易产生静电，但我们采用抗静电整理技术。日常穿着时，可以使用衣物柔顺剂，或者在干燥季节适当增加环境湿度。对于特别敏感的人群，我们推荐锦纶+棉混纺产品。

## Q2：锦纶耐不耐晒？会不会变黄？

**A：** 锦纶的耐光性相对较差，长时间暴晒确实可能变黄变脆。我们的户外产品添加了抗紫外线助剂和耐光稳定剂，大大延长了使用寿命。建议避免长时间直接暴晒，收纳时放在阴凉处。

## Q3：锦纶面料起球怎么办？

**A：** 锦纶强度高，起球后小球不易脱落。我们采用高强长丝和紧密织造，减少起球倾向。如果出现起球，可以使用毛球修剪器处理，避免用手拉扯。日常护理时，翻面洗涤、使用洗衣袋都有帮助。

## Q4：锦纶和尼龙有什么区别？

**A：** 锦纶就是尼龙，只是名称不同。国际上通用Nylon（尼龙），中国按命名规则称为"锦纶"。就像涤纶和聚酯纤维是同一种材料，只是中英文名称差异。`,practicalExercise:`## 实验1：强度拉伸测试

**材料**：锦纶线、棉线、涤纶线各一段，弹簧秤

**步骤**：逐步增加拉力至断裂，记录最大承重

**观察要点**：锦纶承重最大，断裂前有明显伸长

**导购应用**：展示锦纶的"韧性"特性

## 实验2：耐磨循环测试

**材料**：锦纶面料、棉面料各一块，摩擦测试仪或手动摩擦

**步骤**：相同条件摩擦100次，观察表面变化

**观察要点**：锦纶几乎无变化，棉表面起毛明显

**导购应用**：证明户外装备的耐用性

## 实验3：弹性恢复测试

**材料**：锦纶紧身裤、普通运动裤各一条

**步骤**：各拉伸至极限，松开观察恢复情况

**观察要点**：锦纶快速恢复原状，普通面料有残留变形

**导购应用**：展示运动服装的保形能力`,afterSales:`## 洗涤

- 水温：30℃以下冷水洗涤
- 方式：手洗为佳，机洗选择轻柔模式
- 洗涤剂：中性洗涤剂，避免碱性过强
- 注意：避免与粗糙衣物同洗，拉好拉链

## 干燥

- 方式：平铺晾干，避免悬挂拉伸变形
- 禁忌：不可烘干机高温烘干，避免暴晒
- 技巧：晾至半干时整理形状

## 熨烫

- 温度：低温熨烫（110℃以下）
- 方式：垫布熨烫，避免直接接触
- 状态：微湿状态熨烫效果较好

## 收纳

- 方式：折叠存放，避免长时间悬挂
- 环境：阴凉干燥，避免日光直射
- 防虫：锦纶本身防虫，无需特殊处理`,test:`## 单选题

1. 锦纶的发明公司是哪家？
   - A. 巴斯夫
   - B. 杜邦 ✓
   - C. 拜耳
   - D. 陶氏

2. 锦纶最突出的特性是什么？
   - A. 吸湿性
   - B. 保暖性
   - C. 强度耐磨 ✓
   - D. 抗皱性

3. 锦纶洗涤时最适合的水温是？
   - A. 冷水 ✓
   - B. 温水
   - C. 热水
   - D. 沸水

## 实操题

请设计一个对比实验，向客户证明锦纶面料比棉面料更适合制作登山背包。`}},{id:"9",name:"氨纶（弹性纤维）",subtitle:"隐形弹力引擎，赋予面料卓越弹性，让服装贴身舒适、活动自如",description:"氨纶是聚氨酯弹性纤维，美国称Spandex，欧洲称Elastane，中国称氨纶。莱卡®（LYCRA®）是英威达公司的氨纶品牌。",category:"合成纤维",order:9,modules:{productCognition:`## 一句话记忆
"氨纶——隐形弹力引擎，赋予面料卓越弹性，让服装贴身舒适、活动自如"

## 技术背景
- **化学名称**：聚氨酯弹性纤维，美国称Spandex，欧洲称Elastane，中国称氨纶
- **品牌代表**：莱卡®（LYCRA®）是英威达公司的氨纶品牌
- **生产工艺**：干法纺丝为主，形成柔性链段与刚性链段交替的分子结构

## 五大核心特性表

| 特性维度 | 具体表现 | 导购应用要点 |
|---------|---------|-------------|
| **超高弹性** | 可拉伸至原长4-7倍，回复率接近100% | 强调"第二层皮肤"的贴合感，适合运动服、内衣 |
| **轻质柔软** | 比重1.0-1.3，比橡胶丝轻，手感柔软 | 强调穿着无负担，不影响面料原有手感 |
| **耐用持久** | 耐疲劳性好，反复拉伸不变形 | 解决客户"穿几次就松"的顾虑 |
| **混纺兼容** | 可与任何纤维混纺，用量通常3-15% | 介绍"少量添加，效果显著"的特点 |
| **舒适贴合** | 束缚力小，压力均匀分布 | 强调科学塑形，不压迫血液循环 |`,salesScript:`## 场景一：客户担心氨纶"勒得慌"

**错误示范**："有弹性都这样"

**正确话术**："优质氨纶的束缚力很小，压力是均匀分布的。您试穿这件含有氨纶的牛仔裤，活动时面料跟着身体伸展，不会在某个部位产生勒痕。它的弹性是科学设计的，既提供适度支撑，又保证舒适度。"

## 场景二：客户询问氨纶含量多少合适

**错误示范**："越多越有弹性"

**正确话术**："氨纶含量要根据服装功能设计。日常牛仔裤3-5%就足够提供舒适弹性；瑜伽裤需要8-12%来保证高拉伸性；泳衣可能需要15-20%来确保贴身防水。我们的每款产品都经过工程师精心配比，达到功能与舒适的最佳平衡。"

## 场景三：客户觉得氨纶容易老化失去弹性

**错误示范**："用久了都会松"

**正确话术**："我们的氨纶采用特殊抗老化配方，耐疲劳性是普通氨纶的3倍以上。经过实验室测试，反复拉伸10000次后弹性保持率仍在95%以上。正常穿着情况下，可以保持弹性长达2-3年。"

## 场景四：客户询问莱卡和普通氨纶的区别

**错误示范**："都差不多，莱卡是牌子"

**正确话术**："莱卡®是经过严格质量认证的氨纶品牌，就像矿泉水中的依云。它采用干法纺丝工艺，纤维更均匀，弹性更持久，回复率更高。普通氨纶可能弹性不均、回复慢。我们高端系列都采用莱卡®，确保最佳穿着体验。"`,competitorComparison:`## 竞品对比表

| 对比维度 | 氨纶 | 橡胶丝 | 涤纶弹性纤维 | 天然乳胶 |
|---------|------|--------|-------------|---------|
| **弹性范围** | 400-700% | 500-800% | 200-300% | 600-800% |
| **回复率** | 95-100% | 90-95% | 85-90% | 85-90% |
| **比重** | 1.0-1.3 | 1.2-1.5 | 1.3-1.4 | 0.95-1.0 |
| **耐老化** | ★★★★☆ | ★★☆☆☆ | ★★★☆☆ | ★☆☆☆☆ |
| **耐化学性** | ★★★☆☆ | ★★☆☆☆ | ★★★★☆ | ★★☆☆☆ |
| **混纺性** | ★★★★★ | ★☆☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| **价格** | 中档-高档 | 经济 | 中档 | 高档 |
| **主要应用** | 服装弹性面料 | 松紧带、内衣 | 弹性工作服 | 高端内衣、医疗 |`,objectionHandling:`## Q1：氨纶面料洗涤后弹性会变差吗？

**A：** 正常洗涤不会影响优质氨纶的弹性。我们建议使用30℃以下温水，中性洗涤剂，避免漂白剂。晾干时避免暴晒和高温烘干，这些都能最大限度保持氨纶的弹性寿命。

## Q2：含氨纶的衣服能不能熨烫？

**A：** 可以低温熨烫，但要注意方法。建议使用蒸汽熨斗，温度设置在110℃以下，或者在面料上垫一层薄布。避免高温直接接触氨纶纤维，否则可能影响弹性。

## Q3：氨纶对皮肤敏感人群安全吗？

**A：** 现代氨纶生产工艺已经非常成熟，我们使用的氨纶符合OEKO-TEX Standard 100认证，不含对人体有害的物质。对于特别敏感的人群，我们建议选择外层为天然纤维、内层含氨纶的产品，减少直接接触。

## Q4：氨纶面料起球吗？

**A：** 氨纶本身不起球，但混纺面料是否起球取决于其他纤维。我们的产品通过优化纱线结构和织造工艺，减少起球倾向。日常穿着避免与粗糙表面摩擦，按照洗涤说明护理即可。`,practicalExercise:`## 实验1：弹性极限测试

**材料**：含氨纶5%的牛仔裤面料、普通牛仔面料各一块

**步骤**：各拉伸至极限，测量伸长率

**观察要点**：氨纶面料伸长率30-50%，普通面料10-15%

**导购应用**：展示适度弹性带来的舒适度提升

## 实验2：回复率对比

**材料**：含氨纶面料、橡胶松紧带各一段

**步骤**：各拉伸至150%长度，保持1分钟，松开测量回复长度

**观察要点**：氨纶几乎完全回复，橡胶有残留变形

**导购应用**：证明氨纶的持久弹性

## 实验3：压力分布测试

**材料**：含氨纶压力袜、普通紧身袜各一双，压力测试纸（可选）

**步骤**：穿着后活动，感受不同部位压力

**观察要点**：氨纶袜压力均匀，普通袜局部压迫感强

**导购应用**：展示科学塑形原理`,afterSales:`## 洗涤

- 水温：30℃以下冷水洗涤
- 方式：建议手洗，机洗选择轻柔模式
- 洗涤剂：中性洗涤剂，避免含氯漂白剂
- 注意：不要浸泡过久，15分钟内为宜

## 干燥

- 方式：平铺晾干，避免悬挂拉伸
- 禁忌：不可烘干机烘干，避免暴晒
- 技巧：晾至半干时整理形状，帮助恢复

## 熨烫

- 温度：低温蒸汽熨烫（110℃以下）
- 方式：垫布熨烫，快速通过
- 状态：微湿状态效果最佳

## 收纳

- 方式：折叠存放，避免长时间悬挂拉伸
- 环境：干燥避光，避免潮湿
- 注意：不要与樟脑丸等化学防虫剂直接接触`,test:`## 单选题

1. 氨纶通常的混纺比例是多少？
   - A. 1-3%
   - B. 3-15% ✓
   - C. 20-30%
   - D. 50%以上

2. 莱卡®是哪个公司的氨纶品牌？
   - A. 杜邦
   - B. 英威达 ✓
   - C. 巴斯夫
   - D. 拜耳

3. 氨纶面料最适合的洗涤温度是？
   - A. 冷水 ✓
   - B. 温水
   - C. 热水
   - D. 沸水

## 实操题

请向一位从未穿过含氨纶裤子的客户，演示如何通过简单的拉伸测试，让其体验弹性面料带来的舒适提升。`}},{id:"10",name:"PU（聚氨酯合成革）",subtitle:"智能仿生皮，以聚氨酯科技模拟皮革质感，兼顾美观、功能与性价比",description:"PU是聚氨酯合成革，以聚氨酯树脂为主要原料。采用涂层工艺或复合工艺，将PU树脂附着在基布上。",category:"合成纤维",order:10,modules:{productCognition:`## 一句话记忆
"PU——智能仿生皮，以聚氨酯科技模拟皮革质感，兼顾美观、功能与性价比"

## 技术背景
- **化学本质**：聚氨酯合成革，以聚氨酯树脂为主要原料
- **生产工艺**：涂层工艺或复合工艺，将PU树脂附着在基布上
- **发展历程**：1960年代开始替代PVC人造革，现为最主流的合成革

## 五大核心特性表

| 特性维度 | 具体表现 | 导购应用要点 |
|---------|---------|-------------|
| **质感仿真** | 可模拟各种真皮质感（牛皮、羊皮、鳄鱼皮等） | 强调"以假乱真"的外观效果，满足审美需求 |
| **防水防污** | 表面致密PU膜，防水性好，易清洁 | 适合雨具、户外鞋包、儿童用品等实用场景 |
| **色彩丰富** | 可染任何颜色，色彩饱和度高 | 展示时尚亮色PU产品，满足个性化需求 |
| **价格亲民** | 成本仅为真皮的1/3-1/5 | 强调"轻奢体验，亲民价格"的定位 |
| **规格统一** | 无天然皮革的疤痕、厚度不均等问题 | 保证产品一致性，适合批量生产 |`,salesScript:`## 场景一：客户认为PU"廉价假皮"

**错误示范**："这个就是人造的"

**正确话术**："PU不是简单的'假皮'，而是通过聚氨酯科技创造的仿生材料。它解决了真皮的多个痛点：更环保（无需屠宰动物）、更一致（无疤痕瑕疵）、更易打理。我们的PU经过特殊处理，手感柔软度接近真皮，但价格只有1/3，是理性消费的聪明选择。"

## 场景二：客户询问PU和真皮的区别

**错误示范**："真皮更好，但贵"

**正确话术**："真皮和PU各有优势。真皮的优势在于天然质感、透气性和'养皮'的乐趣；PU的优势在于防水性、一致性、易打理和价格。如果您追求实用、易护理、预算有限，PU是更明智的选择；如果您追求极致质感、愿意投入保养，真皮更合适。"

## 场景三：客户担心PU不透气

**错误示范**："人造的都这样"

**正确话术**："传统PU确实透气性一般，但我们采用超纤PU技术。基布使用超细纤维，结构类似真皮的胶原纤维，形成了微透气孔。您看这款PU夹克，虽然防水，但穿着不闷热，适合春秋季多变天气。"

## 场景四：客户询问PU耐用性

**错误示范**："用几年没问题"

**正确话术**："我们的PU采用高固含量树脂和加强基布，耐磨测试达到5万次以上（国标要求2万次）。正常使用下，使用寿命可达3-5年。对于高频摩擦部位，我们推荐超纤PU，它的耐用性接近真皮，但价格更优。"`,competitorComparison:`## 竞品对比表

| 对比维度 | PU合成革 | 真皮 | PVC人造革 | 超纤PU |
|---------|---------|------|----------|--------|
| **原料** | 聚氨酯树脂+基布 | 动物皮 | 聚氯乙烯+基布 | 聚氨酯+超细纤维基布 |
| **质感** | ★★★★☆（接近真皮） | ★★★★★ | ★★☆☆☆（塑料感） | ★★★★☆（极近真皮） |
| **透气性** | ★★☆☆☆（普通）★★★☆☆（超纤） | ★★★★★ | ★☆☆☆☆ | ★★★☆☆ |
| **防水性** | ★★★★★ | ★★☆☆☆ | ★★★★★ | ★★★★☆ |
| **耐用性** | ★★★☆☆（2-3年） | ★★★★★（5-10年） | ★★☆☆☆（1-2年） | ★★★★☆（3-5年） |
| **价格** | 经济-中档 | 高档 | 低档 | 中档-高档 |
| **环保性** | ★★★☆☆ | ★★★★★ | ★☆☆☆☆ | ★★★★☆ |
| **主要应用** | 服装、鞋包、家具 | 高端皮具、鞋服 | 低端鞋包、雨具 | 中高端鞋服、汽车内饰 |`,objectionHandling:`## Q1：PU面料时间长了会不会开裂掉皮？

**A：** 劣质PU确实有这个问题，但我们的产品采用高弹性树脂配方，抗老化剂添加，经过加速老化测试，正常使用3年内不会出现开裂。避免长时间暴晒、接触尖锐物品，按照保养说明护理，可以最大限度延长使用寿命。

## Q2：PU有化学气味，对人体有害吗？

**A：** 新PU产品可能有轻微气味，这是树脂固化过程中的正常现象，通风放置几天即可散去。我们的PU符合欧盟REACH法规，不含邻苯二甲酸盐等有害物质，通过SGS检测，对人体安全。

## Q3：PU能不能像真皮一样越用越有光泽？

**A：** PU无法像真皮一样通过油脂渗透产生"包浆"效果，但通过定期使用PU专用护理剂，可以保持光泽度。我们的建议是每季度使用一次护理剂，清洁后均匀涂抹，自然风干即可。

## Q4：PU破损了能修补吗？

**A：** 小面积破损可以使用PU修补膏，颜色匹配后填补，效果较好。大面积破损修补难度大，建议专业皮具护理店处理。日常使用注意避免刮擦，特别是与金属配件接触的部位。`,practicalExercise:`## 实验1：防水性能测试

**材料**：PU面料、真皮面料、棉面料各一块，滴管，清水

**步骤**：各滴一滴水，观察水珠状态和渗透情况

**观察要点**：PU水珠完整不渗透，真皮快速吸收，棉缓慢渗透

**导购应用**：展示PU的实用防水功能

## 实验2：质感盲测对比

**材料**：蒙眼布，PU面料、超纤PU、真皮各一块

**步骤**：蒙眼触摸三种面料，凭手感判断材质

**观察要点**：多数人难以区分超纤PU和真皮

**导购应用**：证明高品质PU的仿真度

## 实验3：清洁便利性演示

**材料**：PU包包、真皮包包各一个，记号笔，湿布

**步骤**：各画一道笔迹，用湿布擦拭

**观察要点**：PU轻松擦净，真皮可能留痕

**导购应用**：展示PU的易打理优势`,afterSales:`## 清洁

- 日常：软布蘸清水擦拭即可
- 去污：中性清洁剂稀释后擦拭
- 禁忌：避免酒精、丙酮等有机溶剂
- 注意：及时清洁，避免污渍渗透

## 保养

- 护理剂：每季度使用PU专用护理剂
- 存放：避免挤压变形，使用填充物支撑
- 环境：避免高温潮湿，防止霉变
- 防晒：避免长时间暴晒，防止老化变色

## 修补

- 小划痕：使用颜色匹配的修补笔
- 开裂：使用PU专用胶水，压平固定
- 专业护理：严重损伤建议送专业店

## 季节性收纳

- 清洁：收纳前彻底清洁并干燥
- 防尘：使用防尘袋存放
- 防压：不要堆叠过重物品
- 防潮：放置干燥剂，避免霉变`,test:`## 单选题

1. PU面料的主要原料是什么？
   - A. 聚氯乙烯
   - B. 聚氨酯 ✓
   - C. 聚乙烯
   - D. 聚丙烯

2. 超纤PU与普通PU的主要区别在于？
   - A. 颜色更多
   - B. 基布更精细 ✓
   - C. 价格更便宜
   - D. 更不透气

3. PU面料最突出的优点是什么？
   - A. 透气性好
   - B. 价格亲民 ✓
   - C. 越用越亮
   - D. 可生物降解

## 实操题

请向一位在真皮和PU之间犹豫的客户，设计一个包含3个对比测试的现场演示，帮助其做出选择。`}}],Kb=[{id:"11",name:"棉+聚酯纤维混纺",subtitle:"棉的舒适+涤的耐用=完美平衡的日常之选",description:"棉+聚酯纤维混纺是纺织行业最经典的组合之一，起源于20世纪60年代。这种混纺结合了天然棉纤维的吸湿透气性和合成聚酯纤维的耐用抗皱性。",category:"混纺面料",order:11,modules:{productCognition:`## 一句话记忆
"棉的舒适+涤的耐用=完美平衡的日常之选"

## 技术背景
棉+聚酯纤维混纺是纺织行业最经典的组合之一，起源于20世纪60年代。这种混纺结合了天然棉纤维的吸湿透气性和合成聚酯纤维的耐用抗皱性，通过不同比例调配（常见65/35、60/40、50/50），实现性能的精准平衡。

## 五大核心特性表

| 特性维度 | 具体表现 | 优势解析 | 适用场景 |
|---------|---------|---------|---------|
| **舒适性** | 保留60-70%棉的柔软触感，聚酯纤维提供顺滑表面 | 亲肤感良好，夏季穿着不粘身，冬季保暖性适中 | 日常T恤、休闲衬衫、睡衣 |
| **耐用性** | 耐磨强度比纯棉提升40-50%，抗撕裂性优异 | 多次洗涤后不易变形，领口袖口不易松垮 | 商务衬衫、工作服、学生校服 |
| **易打理** | 抗皱性显著，洗后晾干基本平整，缩水率<3% | 减少熨烫时间，适合快节奏生活 | 出差旅行服装、日常通勤装 |
| **吸湿速干** | 吸湿速度略慢于纯棉，但干燥速度提高30-40% | 运动后汗液快速蒸发，保持干爽 | 运动休闲装、户外活动服装 |
| **性价比** | 生产成本低于纯棉，使用寿命延长50%以上 | 高品质与合理价格的完美结合 | 大众市场、性价比优先的顾客 |`,salesScript:`## 场景一：顾客询问"为什么不全用纯棉？"

**错误示范**："纯棉太容易皱了，这个混纺的更好"

**正确话术**："先生/女士，您提的很好！纯棉确实非常亲肤，但这款混纺面料巧妙地将棉的舒适和聚酯纤维的耐用结合在一起。您看，它保留了棉60%的柔软触感，同时加入了40%的聚酯纤维来增强抗皱性和耐磨度。这样您日常穿着既舒适，又不用频繁熨烫，特别适合像您这样注重生活品质又追求便捷的顾客。"

## 场景二：顾客担心"化纤成分会不会不透气？"

**错误示范**："不会的，这个很透气的"

**正确话术**："我理解您的顾虑。实际上，这款面料的聚酯纤维经过特殊工艺处理，纤维截面设计成中空结构，大大提升了透气性。您可以用手感受一下面料的织法，它采用的是透气的平纹组织，纱线间的空隙能促进空气流通。很多顾客反馈，夏天穿着比纯棉更干爽，因为汗液蒸发更快。"

## 场景三：顾客比较价格"这个比纯棉的还贵？"

**错误示范**："这个是新技术，所以贵一点"

**正确话术**："从长远价值来看，这款混纺面料其实更划算。让我给您算笔账：纯棉衬衫平均洗20次后容易变形，需要更换；而这款混纺面料可以洗50次以上仍保持版型。它抗皱免烫，每年节省的熨烫时间和电费就很可观。更重要的是，它始终保持挺括有型，让您在任何场合都保持专业形象。"

## 场景四：顾客试穿后觉得"手感没有纯棉柔软"

**错误示范**："穿几次就软了"

**正确话术**："您的手感很敏锐！新面料确实有轻微的挺括感，这是聚酯纤维带来的优点——确保服装长期保持版型。我建议您体验一下它的动态舒适度：请您抬抬手、转转身，感受它的活动自如。而且经过2-3次洗涤后，棉纤维会自然舒展开，手感会越来越接近纯棉的柔软，同时保持原有的骨感。"`,competitorComparison:`## 竞品对比表

| 对比维度 | **棉+聚酯纤维(65/35)** | **纯棉** | **纯聚酯纤维** | **棉+氨纶** |
|---------|----------------------|---------|--------------|------------|
| **舒适度** | ★★★★☆ (平衡舒适) | ★★★★★ (极致亲肤) | ★★☆☆☆ (化纤感强) | ★★★★☆ (弹性舒适) |
| **耐用性** | ★★★★☆ (耐磨抗皱) | ★★☆☆☆ (易皱易变形) | ★★★★★ (超强耐用) | ★★★☆☆ (弹性易损) |
| **易打理** | ★★★★☆ (抗皱免烫) | ★★☆☆☆ (需频繁熨烫) | ★★★★★ (洗可穿) | ★★★☆☆ (需注意洗涤) |
| **透气性** | ★★★☆☆ (良好透气) | ★★★★★ (最佳透气) | ★★☆☆☆ (闷热感) | ★★★★☆ (弹性透气) |
| **价格** | ¥200-400 | ¥300-500 | ¥150-300 | ¥250-450 |
| **适用场景** | 日常通勤、商务休闲 | 家居、婴幼儿服装 | 运动服、户外装备 | 修身版型、运动服 |

**竞争优势总结**：棉+聚酯纤维混纺在舒适性与实用性间取得最佳平衡，是追求品质生活又不愿被衣物打理束缚的都市男士首选。`,objectionHandling:`## Q1：聚酯纤维是不是不环保？

**A：** 这是一个很好的问题。现代聚酯纤维生产技术已经非常环保：首先，许多品牌使用回收PET瓶制成的再生聚酯，实现资源循环；其次，生产过程中的能耗和水耗比棉纤维低40%以上；最后，混纺面料延长了服装寿命，减少了整体消费频次，从生命周期看更环保。

## Q2：听说聚酯纤维容易起静电？

**A：** 您观察得很仔细。纯聚酯确实易产生静电，但我们的混纺面料通过三个技术解决了这个问题：一是在纤维纺丝时加入抗静电剂；二是采用65%棉的高比例，棉纤维天然抗静电；三是面料后整理时进行抗静电处理。您看这件样衣，在干燥环境下摩擦也不会吸附灰尘。

## Q3：混纺面料洗多了会不会发硬？

**A：** 恰恰相反！纯棉洗多次后纤维会断裂变硬，而我们的混纺面料因为聚酯纤维的支撑，棉纤维得到保护。您看这个洗涤测试对比：纯棉洗30次后硬度增加40%，而我们的混纺面料只增加15%。而且我们建议使用柔顺剂，能保持面料长期柔软。

## Q4：过敏体质能穿吗？

**A：** 完全可以。首先，面料经过Oeko-Tex Standard 100认证，不含致敏物质；其次，聚酯纤维本身是惰性材料，极少引起过敏；第三，棉纤维覆盖在皮肤接触面，提供天然保护。我们有很多皮肤敏感的顾客都反馈穿着舒适。`,practicalExercise:`## 实验一：抗皱对比实验

**工具**：纯棉衬衫、混纺衬衫、喷雾瓶、衣架

**步骤**：
1. 将两件衬衫用力揉搓30秒
2. 悬挂晾置10分钟
3. 观察褶皱恢复情况

**观察点**：混纺衬衫褶皱明显更少，恢复更快

## 实验二：透气性体验实验

**工具**：面料样本、热水杯、秒表

**步骤**：
1. 将面料覆盖在热水杯口
2. 另一面放置镜片
3. 计时镜片起雾时间

**观察点**：混纺面料起雾时间比纯聚酯快2-3倍，证明良好透气性

## 实验三：耐磨性测试

**工具**：面料样本、砂纸、电子秤

**步骤**：
1. 称量面料初始重量
2. 用砂纸摩擦50次
3. 再次称重计算磨损率

**观察点**：混纺面料磨损率比纯棉低60%`,afterSales:`## 洗涤指南

- **水温**：30℃以下冷水或温水
- **洗涤剂**：中性洗衣液，避免漂白剂
- **机洗**：轻柔模式，装入洗衣袋
- **手洗**：轻轻揉搓，勿用力拧绞

## 干燥方法

- **晾干**：阴凉通风处平铺或悬挂，避免暴晒
- **烘干**：低温烘干，时间不超过30分钟
- **注意**：聚酯纤维不耐高温，暴晒易导致纤维脆化

## 熨烫技巧

- **温度**：中低温（150℃以下）
- **方式**：蒸汽熨烫，垫布熨烫
- **避免**：高温直接接触，易产生极光

## 收纳存储

- **折叠**：沿缝线整齐折叠
- **悬挂**：使用宽肩衣架，避免变形
- **环境**：干燥通风，避免潮湿霉变
- **防虫**：使用天然樟木，勿用化学防虫剂`,test:`## 单选题

1. 棉+聚酯纤维混纺面料最大的优势是什么？
   - A. 价格最便宜
   - B. 舒适性与耐用性的最佳平衡 ✓
   - C. 100%天然环保
   - D. 弹性最好

2. 推荐棉+聚酯纤维混纺衬衫时，最应强调的卖点是？
   - A. 奢侈品牌合作
   - B. 抗皱免烫，节省打理时间 ✓
   - C. 限量版设计
   - D. 最柔软的手感

3. 顾客担心聚酯纤维不透气，正确的回应是？
   - A. 忽略这个问题
   - B. 承认确实不透气
   - C. 展示面料透气性实验 ✓
   - D. 推荐其他纯棉产品

## 实操题

**场景模拟**：一位商务男士需要购买出差用的衬衫，担心行李中衬衫会皱。
**任务**：运用本课知识，在3分钟内完成推荐话术，并演示抗皱实验。`}},{id:"12",name:"棉+聚酯+氨纶混纺",subtitle:"舒适+塑形+弹力=三位一体的完美战袍",description:"棉+聚酯+氨纶是高端功能性混纺的典范，通常在棉和聚酯纤维基础上添加2-5%的氨纶（莱卡）。氨纶的加入带来了革命性的改变。",category:"混纺面料",order:12,modules:{productCognition:`## 一句话记忆
"舒适+塑形+弹力=三位一体的完美战袍"

## 技术背景
棉+聚酯+氨纶是高端功能性混纺的典范，通常在棉和聚酯纤维基础上添加2-5%的氨纶（莱卡）。氨纶的加入带来了革命性的改变：它不改变面料的基本特性，却赋予了4-8倍的弹性恢复力，实现了"静态有型，动态自如"的穿着体验。

## 五大核心特性表

| 特性维度 | 具体表现 | 优势解析 | 适用场景 |
|---------|---------|---------|---------|
| **弹性舒适** | 经纬向弹性达15-25%，恢复率>95% | 活动时无束缚感，久坐不起皱，贴合身形 | 商务正装、休闲裤、运动休闲服 |
| **塑形保型** | 氨纶提供记忆回弹，保持服装原始版型 | 整天穿着仍挺括，不会膝盖鼓包、肘部变形 | 修身西装、小脚裤、有型衬衫 |
| **运动适配** | 弹性支持大角度动作，不影响活动范围 | 适合轻度运动、通勤骑行、差旅途中的伸展 | 旅行服装、都市运动风、多功能外套 |
| **耐久性能** | 三重纤维互补，耐磨性比纯棉高80% | 长期穿着不易松懈，多次洗涤弹性不减 | 高频穿着服装、职业制服、常旅客服装 |
| **时尚度** | 修身剪裁成为可能，展现身材线条 | 符合现代审美，年轻化、时尚化 | 时尚商务、都市休闲、年轻客群 |`,salesScript:`## 场景一：顾客试穿修身款时担心"会不会太紧？"

**错误示范**："这个就是修身款，都这样的"

**正确话术**："这正是这款面料的精妙之处！请您感受一下：正常站立时它是修身合体的，但当您抬手、弯腰时，面料会自然伸展。这2%的氨纶就像内置的'弹性记忆系统'，确保动作自如的同时，瞬间恢复原有版型。很多顾客反馈，这是他们穿过最'懂身体'的衬衫。"

## 场景二：商务顾客询问"弹性面料会不会显得不正式？"

**错误示范**："现在都流行有弹性的"

**正确话术**："恰恰相反，弹性让正装更显专业！传统正装久坐后容易起皱，影响形象。而这款面料中的氨纶确保您从早到晚都保持挺括。您看这肩线、腰身，始终贴合却不紧绷。很多高管选择它，因为能在重要会议中保持最佳状态，又能在长途飞行中享受舒适。"

## 场景三：顾客比较价格"比普通混纺贵了不少"

**错误示范**："这个是三合一的，成本高"

**正确话术**："这份投资回报率很高！让我为您分析：首先，它一件抵三件——正装的挺括、休闲的舒适、运动服的弹性；其次，寿命延长50%，因为弹性减少了面料受力；最重要的是，它提升您的形象价值。想象一下，一整天的活动后依然保持完美状态，这份自信是无价的。"

## 场景四：年轻顾客说"我不需要这么正式的"

**错误示范**："那您看看其他款式"

**正确话术**："您可能会惊喜地发现，弹性面料最适合休闲时尚！它让oversize版型更有型，让街头风单品更舒适。很多潮牌都在用这种三合一混纺，因为它既保持了棉的质感，又有聚酯的耐用，再加上氨纶的潮范儿。试试这件卫衣，感受一下弹性带来的街头感。"`,competitorComparison:`## 竞品对比表

| 对比维度 | **棉+聚酯+氨纶** | **棉+聚酯纤维** | **棉+氨纶** | **纯棉弹力布** |
|---------|----------------|----------------|------------|--------------|
| **弹性恢复** | ★★★★★ (最佳恢复) | ★★☆☆☆ (基本无弹性) | ★★★★☆ (良好弹性) | ★★★☆☆ (中等弹性) |
| **塑形保持** | ★★★★★ (记忆塑形) | ★★★☆☆ (易变形) | ★★★★☆ (较好保持) | ★★☆☆☆ (易松懈) |
| **舒适度** | ★★★★☆ (动态舒适) | ★★★☆☆ (静态舒适) | ★★★★☆ (弹性舒适) | ★★★☆☆ (基础舒适) |
| **耐用性** | ★★★★☆ (三重加固) | ★★★★☆ (双重耐用) | ★★★☆☆ (弹性易损) | ★★☆☆☆ (纯棉局限) |
| **价格** | ¥300-500 | ¥200-400 | ¥250-450 | ¥200-350 |
| **核心优势** | 全能型选手 | 性价比之王 | 弹性专家 | 自然弹性 |

**竞争优势总结**：棉+聚酯+氨纶混纺是追求"既要又要还要"的完美解决方案，适合对服装有多维度要求的新时代男性。`,objectionHandling:`## Q1：氨纶成分会不会容易坏？

**A：** 您的担心很合理。我们的氨纶是杜邦莱卡®或英威达LYCRA®品牌，这些顶级氨纶的寿命是普通氨纶的3倍以上。更重要的是，我们只添加2-5%的微量氨纶，这个比例经过科学测试：既能提供足够弹性，又不会成为面料的薄弱点。您看这个疲劳测试数据，拉伸10000次后弹性保持率仍有92%。

## Q2：洗涤后弹性会变差吗？

**A：** 正确洗涤下弹性几乎不会衰减。关键在于：一要用冷水，高温会损伤氨纶；二要避免漂白剂；三要自然晾干，烘干会加速老化。我们建议的洗涤方式能确保3年内弹性保持90%以上。很多顾客穿了两年反馈"弹性如新"。

## Q3：氨纶面料贴身穿着舒服吗？

**A：** 比纯棉更舒服！因为氨纶让面料主动适应身体曲线，而不是身体去适应硬挺的面料。您可以用这个实验感受：把面料轻轻拉伸贴在手臂上，它会像第二层皮肤一样贴合，没有任何压迫感。很多内衣品牌都用类似原理。

## Q4：适合胖一点的人穿吗？

**A：** 特别适合！弹性面料的最大优势就是包容性。它不会像硬挺面料那样在腹部、臀部产生紧绷的横纹，而是平滑地覆盖，视觉上更显瘦。我们有大码顾客专门指定这种面料，因为"终于找到既合身又不勒的裤子了"。`,practicalExercise:`## 实验一：弹性记忆实验

**工具**：面料样本、尺子、重物

**步骤**：
1. 标记面料10cm长度
2. 拉伸至15cm，保持1分钟
3. 释放后测量恢复长度

**观察点**：1分钟后恢复至10.2cm，证明优秀记忆性

## 实验二：动态舒适度体验

**工具**：成衣样品

**步骤**：
1. 顾客穿着做深蹲、抬手、弯腰动作
2. 观察面料跟随性
3. 动作后检查褶皱情况

**观察点**：动作时无束缚感，恢复后无残留褶皱

## 实验三：耐久性对比

**工具**：三种面料样本、摩擦测试仪

**步骤**：
1. 同等条件下摩擦1000次
2. 观察表面起球、磨损
3. 测试弹性保持率

**观察点**：三合一混纺磨损最轻，弹性保持最好`,afterSales:`## 洗涤指南

- **水温**：30℃以下冷水，绝对禁止热水
- **洗涤剂**：中性洗衣液，严禁含氯漂白剂
- **方式**：翻面洗涤，装入细网洗衣袋
- **注意**：避免与粗糙衣物同洗，防止勾丝

## 干燥方法

- **最佳**：平铺阴干，保持形状
- **可接受**：悬挂晾干，避免暴晒
- **禁止**：烘干机高温烘干，会破坏氨纶
- **技巧**：晾至八成千时整理形状

## 熨烫技巧

- **温度**：低温（110-130℃）
- **方式**：蒸汽熨烫，勿直接接触
- **状态**：微湿时熨烫效果最佳
- **避免**：高温压烫，会导致氨纶熔融

## 收纳存储

- **折叠**：沿弹性方向顺向折叠
- **悬挂**：使用衬垫衣架，避免肩部变形
- **时间**：长期悬挂需定期更换折叠方式
- **环境**：避光防潮，氨纶对紫外线敏感`,test:`## 单选题

1. 棉+聚酯+氨纶混纺中，氨纶的主要作用是什么？
   - A. 增加重量
   - B. 提供弹性和恢复力 ✓
   - C. 提升保暖性
   - D. 改变颜色

2. 推荐这种面料时，最吸引商务顾客的点是？
   - A. 价格便宜
   - B. 颜色鲜艳
   - C. 全天保持挺括形象 ✓
   - D. 洗涤方便

3. 洗涤含氨纶面料最重要的注意事项是？
   - A. 必须干洗
   - B. 高温消毒
   - C. 使用冷水，避免高温 ✓
   - D. 强力揉搓

## 实操题

**场景模拟**：一位经常出差的商务人士需要一套"飞机上能睡，下机就能见客户"的服装。
**任务**：在5分钟内完成全套推荐，包括面料优势讲解、试穿体验、洗涤指导。`}},{id:"13",name:"棉+氨纶混纺",subtitle:"棉的温柔拥抱+氨纶的灵活陪伴=贴身衣物首选",description:"棉+氨纶混纺是贴身服装领域的黄金标准，通常含棉92-98%，氨纶2-8%。这种组合完美保留了棉纤维的所有优点，同时氨纶的加入解决了纯棉面料缺乏弹性、易变形的核心痛点。",category:"混纺面料",order:13,modules:{productCognition:`## 一句话记忆
"棉的温柔拥抱+氨纶的灵活陪伴=贴身衣物首选"

## 技术背景
棉+氨纶混纺是贴身服装领域的黄金标准，通常含棉92-98%，氨纶2-8%。这种组合完美保留了棉纤维的所有优点——吸湿、透气、亲肤、天然，同时氨纶的加入解决了纯棉面料缺乏弹性、易变形的核心痛点。氨纶像面料的"神经系统"，让原本静态的棉织物拥有了动态适应性。

## 五大核心特性表

| 特性维度 | 具体表现 | 优势解析 | 适用场景 |
|---------|---------|---------|---------|
| **贴身舒适** | 弹性恰到好处，既贴合又不紧绷 | 消除传统内衣的勒痕感，活动时自然伸展 | 内衣、内裤、背心、睡衣 |
| **塑形修饰** | 轻微压力感，平滑身体线条 | 视觉显瘦，避免纯棉的松垮感 | 修身T恤、打底衫、塑身内衣 |
| **耐用性** | 弹性减少局部受力，延长寿命 | 领口、袖口不易变形，多次洗涤保持版型 | 高频换洗衣物、运动内衣 |
| **吸湿透气** | 保留棉95%以上的吸湿性 | 贴身穿着干爽舒适，氨纶不阻碍透气 | 夏季贴身衣物、运动服 |
| **安全感** | 弹性提供适度包裹感 | 运动时减少晃动，日常穿着有安全感 | 运动装备、孕妇装、术后服装 |`,salesScript:`## 场景一：顾客试穿内衣时说"有点紧"

**错误示范**："弹性面料就是这样的"

**正确话术**："这正是它的贴心设计！请您活动一下，感受弹性如何工作。它不是'紧'，而是'贴合'——像第二层皮肤一样跟随身体。您看，抬手时伸展自如，放下后立即恢复。这种适度压力反而更舒适，因为减少了摩擦，很多顾客说'穿了像没穿一样舒服'。"

## 场景二：顾客担心"氨纶贴身会不会过敏？"

**错误示范**："很多人都穿，没事的"

**正确话术**："您的谨慎很值得赞赏。首先，我们的氨纶含量控制在5%以内，皮肤主要接触的还是天然棉；其次，氨纶纤维经过特殊处理，表面光滑无刺激；最重要的是，我们所有面料都通过Oeko-Tex 100认证，确保无害物质。我建议您试穿感受，很多敏感肌顾客都反馈比纯棉更舒适。"

## 场景三：顾客比较"这个比纯棉内衣贵"

**错误示范**："加了氨纶成本高"

**正确话术**："从穿着寿命和体验来看，其实更划算。纯棉内衣洗20次后容易变形松弛，需要更换；而这款可以洗50次以上仍保持弹性。更重要的是，它的舒适度是持续的——不会像纯棉那样越穿越松。您算一下，虽然单价高30%，但寿命延长150%，每天的成本反而更低。"

## 场景四：男性顾客觉得"内衣有点弹性不习惯"

**错误示范**："现在都这样"

**正确话术**："很多男士第一次接触都有这种感觉，但试过后都成了忠实用户。让我为您分析：传统纯棉内衣活动时会移位、卷边，需要不断调整；而弹性内衣始终贴合，让您忘记它的存在。特别是运动时，它提供支撑又不会束缚。您看这件背心，既能单穿有型，又能做内搭舒适。"`,competitorComparison:`## 竞品对比表

| 对比维度 | **棉+氨纶(95/5)** | **纯棉** | **莫代尔+氨纶** | **聚酯纤维+氨纶** |
|---------|-----------------|---------|---------------|------------------|
| **亲肤感** | ★★★★☆ (天然亲肤) | ★★★★★ (极致亲肤) | ★★★★★ (丝滑亲肤) | ★★☆☆☆ (化纤感) |
| **弹性舒适** | ★★★★☆ (适度弹性) | ★☆☆☆☆ (无弹性) | ★★★★★ (卓越弹性) | ★★★★☆ (强力弹性) |
| **吸湿性** | ★★★★☆ (优秀吸湿) | ★★★★★ (最佳吸湿) | ★★★★☆ (良好吸湿) | ★★☆☆☆ (吸湿差) |
| **耐用性** | ★★★☆☆ (中等耐用) | ★★☆☆☆ (易变形) | ★★★☆☆ (易起球) | ★★★★★ (超强耐用) |
| **价格** | ¥100-200 | ¥80-150 | ¥150-250 | ¥120-180 |
| **核心定位** | 平衡之选 | 经典之选 | 奢华之选 | 功能之选 |

**竞争优势总结**：棉+氨纶混纺在亲肤性与功能性间找到甜蜜点，是追求舒适又不愿牺牲实用的明智选择。`,objectionHandling:`## Q1：氨纶洗多了会不会失去弹性？

**A：** 正确护理下弹性寿命很长。关键在于：一用冷水洗，高温是弹性杀手；二避免漂白剂；三自然晾干。我们做过测试，按照建议方式洗涤，100次后弹性保持率仍有85%。而且氨纶含量只有5%，即使有衰减，棉的主体性能依然完好。

## Q2：出汗多会不会有异味？

**A：** 恰恰相反，棉+氨纶混纺比很多面料更防异味。首先，棉纤维吸汗后快速蒸发，减少细菌滋生环境；其次，氨纶纤维本身抗菌；第三，我们面料经过抗菌处理。您看这个测试：同样运动后，棉氨混纺的细菌数量比纯聚酯少70%。

## Q3：适合皮肤敏感的人吗？

**A：** 特别适合！原因有三：第一，主要成分是天然棉，公认最亲肤；第二，氨纶纤维直径极细，表面光滑无毛刺；第三，面料经过多次水洗预处理。我们有很多湿疹、皮炎顾客都专门选择这款面料。

## Q4：弹性内衣会影响血液循环吗？

**A：** 完全不会。我们的弹性是"舒适弹性"，不是"压力弹性"。您可以用这个简单测试：穿上后，手指能轻松插入腰围处，说明压力适中。医学研究表明，这种适度压力反而促进静脉回流，久坐久站更舒适。`,practicalExercise:`## 实验一：弹性包容度测试

**工具**：不同尺码面料样本、拉伸器

**步骤**：
1. 测量面料原始尺寸
2. 拉伸至150%长度
3. 保持1分钟后测量恢复率

**观察点**：恢复率>95%，证明优秀弹性记忆

## 实验二：吸湿速干对比

**工具**：面料样本、滴水器、秒表

**步骤**：
1. 滴等量水在面料表面
2. 计时完全吸收时间
3. 计时完全干燥时间

**观察点**：吸湿速度接近纯棉，干燥速度更快

## 实验三：皮肤接触体验

**工具**：面料样本、皮肤模型

**步骤**：
1. 模拟不同动作下的摩擦
2. 测量摩擦系数
3. 评估舒适度

**观察点**：摩擦系数低，适合敏感皮肤`,afterSales:`## 洗涤指南

- **频率**：建议每天更换，及时洗涤
- **水温**：30℃以下冷水最佳
- **洗涤剂**：内衣专用中性洗涤剂
- **方式**：手洗轻轻揉搓，机洗用内衣袋
- **注意**：避免与深色、粗糙衣物混洗

## 干燥方法

- **最佳**：平铺阴干，保持形状
- **可接受**：悬挂晾干，避免暴晒
- **禁止**：烘干机、暖气片烘干
- **技巧**：晾干前轻轻拉伸恢复形状

## 熨烫技巧

- **温度**：低温（110-130℃）
- **方式**：蒸汽熨烫或垫布熨烫
- **部位**：重点熨烫接缝处
- **避免**：直接高温熨烫氨纶部位

## 收纳存储

- **折叠**：整齐折叠，避免过度挤压
- **分类**：按颜色、功能分类存放
- **环境**：干燥通风，避免潮湿
- **更新**：建议每6-8个月更换新内衣`,test:`## 单选题

1. 棉+氨纶混纺面料最适合哪类产品？
   - A. 外套大衣
   - B. 贴身内衣 ✓
   - C. 西装革履
   - D. 羽绒服

2. 推荐时最应强调的优势是什么？
   - A. 价格便宜
   - B. 颜色鲜艳
   - C. 贴身舒适无束缚 ✓
   - D. 防水功能

3. 洗涤含氨纶内衣最重要的原则是？
   - A. 高温消毒
   - B. 使用漂白剂
   - C. 冷水轻柔洗涤 ✓
   - D. 强力拧干

## 实操题

**场景模拟**：一位运动爱好者需要寻找既吸汗又有弹性的运动内衣。
**任务**：在3分钟内完成推荐，包括面料特性讲解、试穿体验、洗涤保养指导。`}},{id:"14",name:"棉+莱赛尔混纺",subtitle:"棉的温暖+丝的奢华+环保的良心=未来面料",description:'莱赛尔（Lyocell）又称"天丝"，是21世纪绿色纤维革命的代表。以木浆为原料，采用环保的NMMO溶剂纺丝技术，溶剂回收率高达99.7%。',category:"混纺面料",order:14,modules:{productCognition:`## 一句话记忆
"棉的温暖+丝的奢华+环保的良心=未来面料"

## 技术背景
莱赛尔（Lyocell）又称"天丝"，是21世纪绿色纤维革命的代表。以木浆为原料，采用环保的NMMO溶剂纺丝技术，溶剂回收率高达99.7%。棉+莱赛尔混纺结合了棉的天然亲和力与莱赛尔的丝滑垂坠，创造了兼具舒适性、美观度和可持续性的新一代高端面料。

## 五大核心特性表

| 特性维度 | 具体表现 | 优势解析 | 适用场景 |
|---------|---------|---------|---------|
| **奢华触感** | 丝绸般的光泽和垂坠感 | 视觉高级，触感凉爽顺滑，提升服装档次 | 高端衬衫、连衣裙、睡衣 |
| **环保属性** | 原料可再生，生产闭环无污染 | 符合可持续发展理念，吸引环保意识顾客 | 绿色品牌、环保系列、企业制服 |
| **物理性能** | 湿强是干强的85%，远超普通纤维素纤维 | 耐用性好，洗涤不易损坏，尺寸稳定 | 高频穿着服装、易护理正装 |
| **温湿调节** | 吸湿性比棉高50%，透气性极佳 | 冬暖夏凉，适应多种气候条件 | 四季服装、旅行服装、多功能外套 |
| **染色表现** | 色彩鲜艳饱满，色牢度高 | 视觉冲击力强，长期保持鲜艳 | 时尚设计款、印花服装、特色产品 |`,salesScript:`## 场景一：顾客触摸后说"像丝绸一样，但这是棉的吗？"

**错误示范**："这个是化纤的"

**正确话术**："您的触感很准确！这确实是棉，但我们加入了30%的莱赛尔纤维。莱赛尔是从桉树木浆中提取的，经过环保工艺制成，它赋予了面料丝绸般的垂坠和光泽。您看这流动的光泽感，还有这凉爽的触感，都是莱赛尔的魔法。它让棉变得更高贵，却保留了棉的天然亲肤。"

## 场景二：关注环保的顾客询问"这个真的环保吗？"

**错误示范**："应该挺环保的"

**正确话术**："这是市面上最环保的面料之一！让我为您详细解释：莱赛尔原料来自可持续管理的森林，生产采用闭环工艺，99.7%的溶剂回收利用，几乎是零排放。更重要的是，它完全可生物降解，埋入土壤6周就能分解。我们每售出一件，都捐赠给植树项目，真正实现从森林到衣橱再回归自然的循环。"

## 场景三：顾客担心"这么光滑会不会容易勾丝？"

**错误示范**："小心点穿就行"

**正确话术**："恰恰相反，莱赛尔以高强度著称！它的湿强度是干强度的85%，而棉只有70%。这意味着即使潮湿时也很结实。您看这个强度测试：莱赛尔混纺面料的撕裂强度比纯棉高40%。而且它的纤维表面光滑，反而减少了摩擦起球。很多顾客反馈，穿了两年依然如新。"

## 场景四：价格敏感顾客说"比纯棉贵好多"

**错误示范**："这个是高端面料"

**正确话术**："这份溢价带来的是多重价值：首先是穿着价值，丝绸般的体验却只需棉的护理；其次是环保价值，您为可持续发展做出了贡献；最后是耐久价值，它比纯棉耐用50%。更重要的是，这种面料让您在任何场合都散发高级感，很多顾客说'穿上就不想脱下来'。"`,competitorComparison:`## 竞品对比表

| 对比维度 | **棉+莱赛尔** | **纯棉** | **真丝** | **聚酯纤维仿丝** |
|---------|-------------|---------|---------|----------------|
| **触感光泽** | ★★★★☆ (丝滑光泽) | ★★★☆☆ (自然哑光) | ★★★★★ (极致奢华) | ★★★☆☆ (人工光泽) |
| **环保性** | ★★★★★ (绿色环保) | ★★★★☆ (天然环保) | ★★☆☆☆ (养殖影响) | ★☆☆☆☆ (石油基) |
| **耐用性** | ★★★★☆ (高湿强) | ★★☆☆☆ (湿强差) | ★☆☆☆☆ (娇贵易损) | ★★★★★ (超强耐用) |
| **护理难度** | ★★★☆☆ (易护理) | ★★★☆☆ (需熨烫) | ★☆☆☆☆ (专业护理) | ★★★★★ (免烫) |
| **价格** | ¥400-600 | ¥300-500 | ¥800-1500 | ¥200-400 |
| **价值主张** | 可持续奢华 | 经典可靠 | 传统奢华 | 经济仿制 |

**竞争优势总结**：棉+莱赛尔混纺代表了面料发展的未来方向——在追求美的同时承担环保责任，是理性与感性兼备的选择。`,objectionHandling:`## Q1：莱赛尔是不是就是粘胶？有什么区别？

**A：** 这是很好的问题！莱赛尔和粘胶（人造棉）都是再生纤维素纤维，但工艺天差地别：粘胶使用传统碱法，污染大；莱赛尔使用环保的NMMO溶剂法，几乎零污染。性能上，莱赛尔湿强度是粘胶的2倍，更耐用。您可以理解为：粘胶是普通版，莱赛尔是环保升级版。

## Q2：木浆原料会破坏森林吗？

**A：** 完全不会！莱赛尔使用的木材来自FSC认证的可持续森林，这些森林专门用于生产，砍一棵种三棵。而且桉树生长极快，6-8年就能成材。相比棉田需要大量水和农药，木浆生产对环境影响小得多。我们还有追溯系统，您可以查到面料的"森林身份证"。

## Q3：容易起皱吗？

**A：** 抗皱性比纯棉好很多！莱赛尔纤维的高湿模量特性让它不易变形。您看这个对比：同样折叠后，纯棉需要熨烫，而莱赛尔混纺悬挂一会儿就平整了。如果微皱，喷点水雾就会恢复。很多商务人士选择它，就是因为出差时不用带熨斗。

## Q4：适合夏天穿吗？会不会热？

**A：** 夏天穿着比纯棉更凉爽！莱赛尔的吸湿速度比棉快30%，导热性更好，所以触感凉爽。它的中空纤维结构促进空气流通，散热更快。您看这个热成像测试：同样室温下，莱赛尔面料表面温度比纯棉低2-3℃。很多热带地区顾客专门寻找这种面料。`,practicalExercise:`## 实验一：垂坠感展示

**工具**：面料样本、支架、灯光

**步骤**：
1. 将面料悬挂展示自然垂坠
2. 用风扇制造微风观察流动感
3. 对比纯棉的垂坠效果

**观察点**：莱赛尔混纺垂坠如瀑布，纯棉较呆板

## 实验二：吸湿性测试

**工具**：面料样本、有色水、秒表

**步骤**：
1. 滴等量有色水在面料上
2. 计时扩散速度和范围
3. 观察背面渗透情况

**观察点**：莱赛尔混纺吸湿更快更均匀

## 实验三：环保认证展示

**工具**：认证证书、检测报告、原料样本

**步骤**：
1. 展示FSC森林认证
2. 展示Oeko-Tex 100认证
3. 展示碳足迹报告

**观察点**：完整环保链条，增强信任感`,afterSales:`## 洗涤指南

- **水温**：30℃以下冷水
- **洗涤剂**：中性洗衣液，避免碱性
- **方式**：轻柔手洗或机洗轻柔档
- **注意**：首次洗涤可能有轻微缩水（<3%），属正常现象

## 干燥方法

- **最佳**：平铺阴干，保持形状
- **悬挂**：使用宽肩衣架，避免变形
- **禁止**：烘干机、暴晒、暖气烘干
- **技巧**：微湿时整理平整，干后更挺括

## 熨烫技巧

- **温度**：中温（140-160℃）
- **方式**：蒸汽熨烫，垫布更佳
- **状态**：微湿时熨烫效果最好
- **避免**：高温干烫，会产生极光

## 收纳存储

- **折叠**：沿缝线整齐折叠
- **悬挂**：真丝衣架，避免压痕
- **环境**：干燥通风，避免潮湿
- **防虫**：天然樟木，勿用化学剂`,test:`## 单选题

1. 莱赛尔纤维最突出的环保特性是什么？
   - A. 价格便宜
   - B. 生产闭环，溶剂回收率99.7% ✓
   - C. 颜色鲜艳
   - D. 弹性好

2. 棉+莱赛尔混纺面料最大的视觉特点是？
   - A. 颜色暗淡
   - B. 厚重挺括
   - C. 丝绸般的光泽和垂坠感 ✓
   - D. 粗糙质感

3. 推荐给环保意识强的顾客时，应重点强调：
   - A. 价格优惠
   - B. 时尚设计
   - C. 可持续生产和可降解性 ✓
   - D. 洗涤方便

## 实操题

**场景模拟**：一位注重环保的企业高管需要定制可持续的企业制服。
**任务**：在5分钟内完成面料推荐方案，包括环保特性讲解、性能展示、成本效益分析。`}},{id:"15",name:"棉+莫代尔+氨纶混纺",subtitle:"棉的贴心+莫代尔的丝滑+氨纶的灵动=极致舒适体验",description:'莫代尔（Modal）是兰精公司开发的高湿模量再生纤维素纤维，源自榉木浆。棉+莫代尔+氨纶是贴身服装的"黄金三角"组合。',category:"混纺面料",order:15,modules:{productCognition:`## 一句话记忆
"棉的贴心+莫代尔的丝滑+氨纶的灵动=极致舒适体验"

## 技术背景
莫代尔（Modal）是兰精公司开发的高湿模量再生纤维素纤维，源自榉木浆。棉+莫代尔+氨纶是贴身服装的"黄金三角"组合：棉提供基础舒适和吸湿性，莫代尔赋予丝滑触感和垂坠美，氨纶带来必要的弹性支撑。这种组合创造了"越洗越软、越穿越贴"的神奇体验。

## 五大核心特性表

| 特性维度 | 具体表现 | 优势解析 | 适用场景 |
|---------|---------|---------|---------|
| **极致触感** | 莫代尔带来真丝般滑糯手感 | 触感愉悦，提升穿着幸福感，适合贴身穿着 | 高端内衣、睡衣、家居服 |
| **动态舒适** | 氨纶提供8-15%的适度弹性 | 活动自如，无束缚感，久穿不累 | 运动休闲服、孕妇装、康复服装 |
| **耐用亲肤** | 越洗越软，不会像纯棉变硬 | 长期保持柔软，纤维强度高不易破损 | 高频换洗衣物、儿童服装 |
| **温感调节** | 冬暖夏凉，导热系数适中 | 四季皆宜，适应空调环境和温差变化 | 旅行服装、办公室着装、家居服 |
| **美观度** | 优良垂坠，光泽自然柔和 | 即使家居服也显品味，内外皆美 | 高端家居系列、礼品装睡衣 |`,salesScript:`## 场景一：顾客触摸后惊叹"好软好滑！"

**错误示范**："这个是莫代尔的"

**正确话术**："您的触感真敏锐！这是棉、莫代尔和氨纶的完美结合。莫代尔纤维来自奥地利榉木，经过特殊工艺，纤维表面像婴儿皮肤一样光滑。您感受一下，它不仅有丝绸的滑，还有棉的暖，再加上氨纶的弹，三种感觉融为一体。很多顾客说'摸到就不想放手'。"

## 场景二：购买睡衣的顾客问"这个会不会起球？"

**错误示范**："小心点就不起球"

**正确话术**："我们特别优化了这个问题！首先，莫代尔纤维本身强度高，是棉的1.5倍；其次，我们采用精梳长绒棉，纤维长不易起毛；最重要的是织法紧密，减少摩擦。您看这个起球测试：摩擦5000次后，起球等级4级（最高5级），表现优异。而且即使轻微起球，一洗就掉。"

## 场景三：顾客说"家居服不用这么好吧"

**错误示范**："这个是高档的"

**正确话术**："恰恰是家居服最值得投资！您一天中有1/3时间在家，家居服的品质直接影响生活幸福感。这款面料让您在家也能享受奢华触感，而且它越洗越软，陪伴您的时间越长。很多顾客反馈，穿上后'回家的仪式感都变强了'，这是对自己最好的宠爱。"

## 场景四：年轻妈妈问"适合宝宝穿吗？"

**错误示范**："大人小孩都能穿"

**正确话术**："特别适合！首先，所有成分都通过婴幼儿安全认证；其次，莫代尔pH值中性，不刺激皮肤；第三，弹性让宝宝活动自如；最重要的是，它越洗越软，不会像纯棉洗多次变硬。很多妈妈买给自己后，都会再买宝宝款，说'想让宝宝从小感受这种柔软'。"`,competitorComparison:`## 竞品对比表

| 对比维度 | **棉+莫代尔+氨纶** | **纯棉** | **莫代尔** | **棉+氨纶** |
|---------|------------------|---------|-----------|------------|
| **触感柔软度** | ★★★★★ (极致柔软) | ★★★☆☆ (自然柔软) | ★★★★★ (丝滑柔软) | ★★★★☆ (弹性柔软) |
| **弹性舒适** | ★★★★☆ (适度弹性) | ★☆☆☆☆ (无弹性) | ★★☆☆☆ (基本无弹性) | ★★★★☆ (良好弹性) |
| **耐用性** | ★★★★☆ (越洗越软) | ★★☆☆☆ (越洗越硬) | ★★★☆☆ (易起球) | ★★★☆☆ (中等耐用) |
| **垂坠美感** | ★★★★☆ (自然垂坠) | ★★☆☆☆ (较呆板) | ★★★★★ (优雅垂坠) | ★★★☆☆ (一般垂坠) |
| **价格** | ¥250-450 | ¥150-300 | ¥200-400 | ¥200-350 |
| **核心价值** | 全方位舒适体验 | 基础舒适 | 奢华触感 | 弹性实用 |

**竞争优势总结**：棉+莫代尔+氨纶混纺是追求生活品质人士的明智选择，将日常穿着提升到感官享受的层次。`,objectionHandling:`## Q1：莫代尔是不是容易变形？

**A：** 单独莫代尔确实有这个问题，但我们的三重混纺完美解决了！棉提供了骨架，氨纶提供了弹性记忆，莫代尔负责柔软。您看这个测试：拉伸后恢复率95%，悬挂不变形。而且莫代尔的高湿模量特性让它湿态下也不易变形，这是普通面料做不到的。

## Q2：三种成分会不会不好护理？

**A：** 护理比纯棉更简单！因为：一抗皱性好，不用频繁熨烫；二不易缩水，尺寸稳定；三越洗越软，不用柔顺剂。您只需要冷水机洗，平铺晾干即可。很多顾客说"这是我衣柜里最省心的衣服"。

## Q3：敏感皮肤能穿吗？

**A：** 这是敏感皮肤的福音！首先，所有成分天然温和；其次，莫代尔纤维表面光滑无毛刺；第三，面料经过多次水洗预处理。我们有很多皮肤病患者专门选择这款，因为"终于找到不痒的面料了"。医院也用它做术后服装。

## Q4：夏天穿会不会热？

**A：** 比纯棉更凉爽！莫代尔的导热性比棉好，吸湿后快速蒸发。您看这个热成像：同样条件下，这款面料表面温度比纯棉低1-2℃。它的中空纤维结构就像天然空调，很多顾客夏天专门找莫代尔混纺的睡衣。`,practicalExercise:`## 实验一：越洗越软体验

**工具**：新面料、洗过10次面料、手感测试仪

**步骤**：
1. 顾客触摸新旧面料对比
2. 测量摩擦系数
3. 评估柔软度变化

**观察点**：洗后面料更柔软顺滑

## 实验二：弹性恢复测试

**工具**：面料样本、拉伸器、尺子

**步骤**：
1. 拉伸至120%长度
2. 保持不同时间后释放
3. 测量即时恢复和最终恢复

**观察点**：快速恢复且无残留变形

## 实验三：温感体验

**工具**：面料样本、温度传感器

**步骤**：
1. 测量室温下面料温度
2. 与皮肤接触后测量变化
3. 对比其他面料

**观察点**：初始凉爽感，接触后快速适应体温`,afterSales:`## 洗涤指南

- **水温**：30℃以下冷水，首次洗涤可加盐固色
- **洗涤剂**：中性洗衣液，避免荧光剂
- **方式**：翻面洗涤，装入洗衣袋
- **注意**：避免与深色、粗糙衣物同洗

## 干燥方法

- **最佳**：平铺阴干，保持形状
- **悬挂**：使用衬垫衣架，避免肩部变形
- **禁止**：烘干机、暴晒、暖气片
- **技巧**：晾至八成千时轻轻拉伸整理

## 熨烫技巧

- **温度**：中低温（130-150℃）
- **方式**：蒸汽熨烫，勿直接接触
- **部位**：重点熨烫接缝、领口
- **避免**：高温压烫莫代尔部位

## 收纳存储

- **折叠**：整齐折叠，避免重压
- **悬挂**：真丝衣架，保持垂坠
- **环境**：干燥通风，避免潮湿
- **防褪色**：深浅色分开存放`,test:`## 单选题

1. 莫代尔纤维最突出的特性是什么？
   - A. 价格便宜
   - B. 强度极高
   - C. 丝绸般滑糯手感 ✓
   - D. 防水性好

2. 棉+莫代尔+氨纶混纺面料最神奇的特点是？
   - A. 越洗越硬
   - B. 越洗越软 ✓
   - C. 越洗越褪色
   - D. 越洗越缩水

3. 推荐给注重生活品质的顾客时，应强调：
   - A. 价格最低
   - B. 日常穿着的感官享受 ✓
   - C. 洗涤最方便
   - D. 最时尚的设计

## 实操题

**场景模拟**：一对新婚夫妇想要购买高品质的情侣睡衣作为纪念。
**任务**：在4分钟内完成推荐，包括面料特性讲解、情感价值塑造、洗涤保养指导。`}}],Pb=[{id:"16",name:"棉+聚酯+莱赛尔+氨纶",subtitle:"四合一智能混纺，天然舒适+环保科技+耐用抗皱+弹性自如",description:'这是"天然舒适+环保科技+耐用抗皱+弹性自如"的四合一智能面料，完美平衡了舒适度与功能性。',category:"混纺面料",order:16,modules:{productCognition:`## 一句话记忆
"四合一智能混纺——天然舒适+环保科技+耐用抗皱+弹性自如，完美平衡舒适度与功能性"

## 技术背景
- **棉**：天然亲肤，提供基础舒适度（37%）
- **莱赛尔**：环保再生纤维，丝绸般光泽与垂坠感（37%）
- **聚酯**：增强耐磨抗皱性，保持版型稳定（24%）
- **氨纶**：微量添加（3%），提供四向弹性，活动自如

## 五大核心特性表

| 特性维度 | 具体表现 | 技术原理 | 顾客价值 |
|---------|---------|---------|---------|
| **舒适性** | 亲肤柔软，吸湿透气 | 棉+莱赛尔双重天然纤维组合 | 全天候舒适穿着体验 |
| **功能性** | 抗皱免烫，弹性适中 | 聚酯骨架+氨纶微弹 | 商务出行无需熨烫 |
| **环保性** | 可持续原料，可降解 | 莱赛尔来自可再生木浆 | 符合现代环保理念 |
| **美观度** | 垂坠感好，光泽自然 | 莱赛尔纤维特性+提花工艺 | 提升穿着档次感 |
| **耐用性** | 耐磨耐洗，尺寸稳定 | 聚酯增强结构强度 | 长期投资价值高 |`,salesScript:`## 场景一：顾客触摸面料时

❌ **错误示范**："这个面料很舒服的"

✅ **正确话术**："您感受到的这种丝滑触感，来自37%的莱赛尔纤维，它被称为'21世纪绿色纤维'，既有真丝的垂坠感，又有棉的吸湿性，再加上3%的氨纶微弹，活动时完全不会束缚"

## 场景二：顾客询问价格时

❌ **错误示范**："这个价格不贵，性价比很高"

✅ **正确话术**："这款采用了四合一混纺技术，您支付的不仅是面料成本，更是科技价值。比如莱赛尔纤维的生产需要闭环环保工艺，聚酯保证了3年不起皱不变形，算下来每天成本不到1元"

## 场景三：顾客担心易皱时

❌ **错误示范**："这个不太容易皱的"

✅ **正确话术**："您看，我这样用力揉搓（演示），松开后褶皱迅速恢复。这是因为24%的聚酯形成了'记忆骨架'，配合莱赛尔的垂坠特性，商务出差塞行李箱，拿出来抖一抖就能穿"

## 场景四：顾客询问适用场合时

❌ **错误示范**："什么场合都能穿"

✅ **正确话术**："这款面料特别适合'商务休闲'场景。工作日搭配西装裤是专业形象，周末搭配休闲裤又不失舒适感。四合一设计让它既有正装的挺括，又有休闲装的随性"`,competitorComparison:`## 竞品对比表

| 对比维度 | 棉+聚酯+莱赛尔+氨纶 | 纯棉面料 | 纯聚酯面料 | 棉涤混纺（65/35） |
|---------|-------------------|---------|-----------|------------------|
| **舒适度** | ★★★★★（双重天然纤维） | ★★★★★ | ★★☆☆☆ | ★★★☆☆ |
| **抗皱性** | ★★★★☆（聚酯骨架支撑） | ★★☆☆☆ | ★★★★★ | ★★★★☆ |
| **环保性** | ★★★★★（莱赛尔可降解） | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ |
| **弹性** | ★★★★☆（四向微弹） | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ |
| **价格** | 中高端（¥300-500） | 中端（¥200-300） | 低端（¥100-200） | 中低端（¥150-250） |
| **适用场景** | 商务休闲、轻商务 | 日常休闲、家居 | 工装、运动服 | 日常通勤 |`,objectionHandling:`## Q1：这个面料含聚酯，会不会闷热不透气？

**A：** 您提的这个问题很专业。确实，纯聚酯面料吸湿性差。但我们这款采用了"智能混纺"技术：37%的棉负责快速吸汗，37%的莱赛尔负责透气导湿，聚酯只占24%主要起骨架支撑作用。实际测试显示，它的透气性是纯聚酯的3倍，夏季30℃穿着也不会闷热。

## Q2：莱赛尔是不是很容易起皱？

**A：** 单独莱赛尔确实易皱，但这就是混纺的智慧。我们加入了24%的聚酯形成"抗皱网络"，就像建筑中的钢筋结构。同时3%的氨纶提供回复弹性。三者协同作用，让面料既有莱赛尔的垂感，又有聚酯的抗皱性。

## Q3：洗涤后会不会缩水变形？

**A：** 请放心，我们对面料进行了预缩处理，缩水率控制在国家标准以内（经向≤3%，纬向≤5%）。聚酯成分保证了尺寸稳定性，氨纶确保了弹性回复。只要按照洗标护理，穿3年版型依然挺拔。

## Q4：为什么比纯棉贵这么多？

**A：** 这贵在三个地方：一是莱赛尔纤维的生产需要环保闭环工艺，成本是普通纤维的1.5倍；二是四合一混纺需要精密配比和特殊织造技术；三是它解决了纯棉易皱、纯聚酯闷热、纯莱赛尔难打理的问题，是"问题解决型"面料。`,practicalExercise:`## 实验1：抗皱演示

**工具**：面料样品（10×10cm）

**步骤**：用力揉搓面料30秒→松开平铺→计时恢复平整时间

**标准**：优质面料应在10秒内恢复平整，褶皱残留≤20%

**话术**："您看，10秒就恢复了，这就是聚酯'记忆骨架'的作用"

## 实验2：吸湿对比

**工具**：面料样品、纯聚酯样品、滴水瓶

**步骤**：各滴1滴水→观察吸收速度→触摸背面湿度

**标准**：应在3秒内完全吸收，背面无明显潮湿感

**话术**："纯聚酯水珠还在表面，我们的面料已经吸收了，这就是棉+莱赛尔的双重吸湿系统"

## 实验3：弹性测试

**工具**：面料样品、尺子

**步骤**：标记10cm长度→横向拉伸至极限→测量长度→松开测量回复后长度

**标准**：拉伸率应≥30%，回复率应≥95%

**话术**："拉伸了13cm，回复后还是10cm，这就是氨纶的'智能记忆'"`,afterSales:`## 洗涤

- 水温：≤30℃冷水洗涤
- 方式：建议手洗或洗衣机轻柔模式
- 洗涤剂：中性洗涤剂，避免含漂白剂
- 注意：深浅色分开，不要长时间浸泡

## 干燥

- 方式：平铺晾干或悬挂晾干
- 避免：避免暴晒，防止莱赛尔纤维脆化
- 注意：不可烘干，高温会破坏氨纶弹性

## 熨烫

- 温度：中低温熨烫（≤150℃）
- 方式：反面熨烫，垫布保护
- 避免：避免直接熨烫接缝处和装饰部分

## 收纳

- 方式：悬挂存放，保持通风
- 防虫：使用樟木球或防虫剂
- 避免：避免重压，防止永久折痕`,test:`## 单选题

1. 棉+聚酯+莱赛尔+氨纶面料中，莱赛尔的主要作用是？
   - A. 增加弹性
   - B. 提供垂坠感和环保性 ✓
   - C. 增强耐磨性
   - D. 降低成本

2. 该面料最适合的穿着场景是？
   - A. 正式晚宴
   - B. 户外运动
   - C. 商务休闲 ✓
   - D. 居家睡衣

3. 洗涤时应特别注意什么？
   - A. 高温杀菌
   - B. 不可烘干 ✓
   - C. 强力搓洗
   - D. 阳光暴晒

## 实操题

请向模拟顾客完整演示该面料的抗皱实验，并配以专业话术讲解技术原理。`}},{id:"17",name:"TR面料（粘纤+聚酯混纺）",subtitle:"挺括有型+舒适透气+高性价比的工装西装首选",description:'TR是"挺括有型+舒适透气+高性价比"的工装西装首选面料，用三分之一的价钱实现羊毛八成效果。',category:"混纺面料",order:17,modules:{productCognition:`## 一句话记忆
"TR面料——挺括有型+舒适透气+高性价比的工装西装首选，用三分之一的价钱实现羊毛八成效果"

## 技术背景
- **粘纤（Rayon）**：再生纤维素纤维，吸湿性好，手感柔软（30-40%）
- **聚酯（Polyester）**：提供骨架强度，抗皱耐磨（60-70%）
- **黄金比例**：65/35或70/30是最佳平衡点

## 五大核心特性表

| 特性维度 | 具体表现 | 技术原理 | 顾客价值 |
|---------|---------|---------|---------|
| **挺括度** | 毛型感强，平整光洁 | 聚酯高比例提供骨架支撑 | 穿着有型，提升职业形象 |
| **舒适性** | 吸湿透气，不闷热 | 粘纤回潮率13%，改善聚酯缺点 | 全天穿着舒适 |
| **易打理** | 机洗不变形，免熨烫 | 聚酯抗皱性+粘纤尺寸稳定 | 节省时间精力 |
| **性价比** | 价格是羊毛的1/3 | 工业化生产，成本可控 | 高性价比选择 |
| **适用广** | 三季可穿（春夏秋） | 厚度适中，透气性好 | 穿着周期长 |`,salesScript:`## 场景一：顾客试穿西装时

❌ **错误示范**："这个西装很笔挺"

✅ **正确话术**："您感受到的这种挺括感，来自70%的聚酯骨架，它像建筑的钢筋一样支撑版型；而30%的粘纤让面料吸湿透气，8小时办公也不会后背湿透"

## 场景二：顾客对比羊毛西装时

❌ **错误示范**："这个比羊毛便宜"

✅ **正确话术**："TR面料被称为'聪明人的选择'。羊毛西装需要干洗、熨烫、防虫，一套下来每年保养费就要几百元。TR可以机洗、免烫、不怕虫，3年省下的保养费就够再买一套了"

## 场景三：顾客担心夏季闷热时

❌ **错误示范**："夏天穿西装都热"

✅ **正确话术**："这正是TR的优势所在。我们做过实测：30℃环境下，纯羊毛西装内温度32℃，TR西装只有30.5℃。因为粘纤的吸湿排汗能力是聚酯的30倍，汗液能快速导出蒸发"

## 场景四：顾客询问耐用性时

❌ **错误示范**："这个很耐穿的"

✅ **正确话术**："银行、航空公司的制服都选用TR面料，就是因为它的耐磨指数是行业标准。我们测试过，膝盖处摩擦5万次不起球，相当于每天坐办公室8小时，可以穿5年以上"`,competitorComparison:`## 竞品对比表

| 对比维度 | TR面料（65/35） | 纯羊毛西装 | 纯聚酯西装 | 棉质西装 |
|---------|---------------|-----------|-----------|---------|
| **挺括度** | ★★★★☆（毛型感强） | ★★★★★ | ★★★☆☆ | ★★☆☆☆ |
| **舒适度** | ★★★★☆（吸湿透气） | ★★★★☆ | ★★☆☆☆ | ★★★★★ |
| **易打理** | ★★★★★（机洗免烫） | ★★☆☆☆ | ★★★★★ | ★★★☆☆ |
| **价格** | 中端（¥500-800） | 高端（¥2000+） | 低端（¥300-500） | 中端（¥600-900） |
| **适用季节** | 三季（春夏秋） | 两季（春秋冬） | 四季但闷热 | 两季（春秋） |
| **投资回报** | 高（低保养成本） | 低（高保养成本） | 中 | 中 |`,objectionHandling:`## Q1：TR面料会不会有塑料感？

**A：** 您说的塑料感是纯聚酯面料的通病。但TR通过两个设计避免了这个问题：一是65/35的黄金比例，粘纤的加入让手感柔软亲肤；二是我们采用了毛型整理工艺，让纤维表面有自然的绒感。您摸一下，是不是更像羊毛的触感？

## Q2：听说TR容易静电？

**A：** 这个问题我们通过三个技术解决了：一是在纺纱时加入抗静电剂；二是粘纤本身吸湿性好，能自然导走静电；三是面料后整理时做了防静电处理。实际测试显示，静电发生率比纯聚酯降低了80%。

## Q3：深色TR会不会褪色？

**A：** 我们采用了"先染后织"工艺和高温定型技术。色牢度达到国标4级以上（最高5级），相当于洗50次颜色变化肉眼难辨。而且TR面料染色鲜艳度比纯羊毛更好，因为聚酯对染料吸附力强。

## Q4：为什么有的TR西装很便宜？

**A：** TR面料价格差异主要在三个方面：一是配比，劣质品会用80/20甚至90/10，粘纤少就没舒适性；二是纱支，我们用的是32支高支纱，廉价品用21支粗纱；三是工艺，我们有18道后整理工序。您可以通过手感、光泽、厚度来辨别品质。`,practicalExercise:`## 实验1：挺括度测试

**工具**：TR面料样品、纯棉样品

**步骤**：手持样品一角，让其自然下垂→观察下垂角度和褶皱

**标准**：优质TR应保持较小下垂角（≤30°），表面平整

**话术**："您看，TR面料像有'内置骨架'，自然挺立；纯棉就软塌下垂"

## 实验2：吸湿速度对比

**工具**：TR样品、纯聚酯样品、喷雾瓶

**步骤**：各喷一次水雾→计时完全吸收时间

**标准**：TR应在5秒内吸收，聚酯可能形成水珠

**话术**："TR5秒就干了，聚酯还在反光，这就是粘纤的吸湿能力"

## 实验3：抗皱恢复

**工具**：TR样品、手压板

**步骤**：对折用力按压10秒→松开观察恢复情况

**标准**：应在30秒内恢复平整，折痕残留≤10%

**话术**："这就是聚酯的'形状记忆'功能，商务出差不怕行李箱压皱"`,afterSales:`## 洗涤

- 水温：≤40℃温水
- 方式：可机洗，选择轻柔模式
- 注意：翻面洗涤，避免金属配件摩擦
- 洗涤剂：普通洗涤剂即可

## 干燥

- 方式：悬挂晾干，整理平整
- 避免：避免暴晒，防止褪色
- 技巧：半干时整理形状，干后更挺括

## 熨烫

- 温度：中温熨烫（150-160℃）
- 方式：蒸汽熨烫效果更佳
- 注意：深色面料建议反面熨烫

## 收纳

- 方式：西装需用衣架悬挂
- 防尘：使用防尘罩
- 避免：长期折叠存放会产生永久折痕`,test:`## 单选题

1. TR面料中，T和R分别代表什么？
   - A. 棉和麻
   - B. 涤纶和粘胶 ✓
   - C. 天丝和 rayon
   - D. 尼龙和橡胶

2. TR面料最适合的客户群体是？
   - A. 需要频繁干洗的高端客户
   - B. 追求高性价比的商务人士 ✓
   - C. 户外运动爱好者
   - D. 居家休闲用户

3. TR面料的黄金比例是？
   - A. 50/50
   - B. 80/20
   - C. 65/35 ✓
   - D. 40/60

## 实操题

请模拟向企业采购人员推荐TR工装，重点阐述其耐用性和易打理优势。`}},{id:"18",name:"粘纤+聚酯+锦纶混纺",subtitle:"柔软垂坠+超强耐磨+弹性回复的三合一功能面料",description:'这是"柔软垂坠+超强耐磨+弹性回复"的三合一功能面料，专为需要频繁活动的职业场景设计。',category:"混纺面料",order:18,modules:{productCognition:`## 一句话记忆
"三合一功能混纺——柔软垂坠+超强耐磨+弹性回复，专为需要频繁活动的职业场景设计"

## 技术背景
- **粘纤（40-50%）**：提供柔软手感和垂坠感
- **聚酯（30-40%）**：保证挺括度和抗皱性
- **锦纶（15-20%）**：加入超强耐磨性和弹性
- **协同效应**：三种纤维优势互补，1+1+1>3

## 五大核心特性表

| 特性维度 | 具体表现 | 技术原理 | 顾客价值 |
|---------|---------|---------|---------|
| **耐磨性** | 超强耐磨，是棉的10倍 | 锦纶的耐磨冠军特性 | 适合频繁活动职业 |
| **垂坠感** | 自然垂顺，不软塌 | 粘纤的柔滑+锦纶的重量感 | 穿着显瘦有型 |
| **弹性** | 四向弹性，活动自如 | 锦纶的高弹性回复率 | 舒适不束缚 |
| **易打理** | 抗皱快干，免熨烫 | 聚酯抗皱+锦纶快干 | 节省护理时间 |
| **性价比** | 功能全面，价格适中 | 工业化混纺技术 | 多功能高价值 |`,salesScript:`## 场景一：顾客从事服务行业

❌ **错误示范**："这个面料很结实"

✅ **正确话术**："您每天站立走动8小时，需要的是'隐形盔甲'。锦纶的耐磨性是棉的10倍，膝盖、肘部这些易磨部位能承受5万次摩擦；同时粘纤保证透气，聚酯防止起皱，一天工作结束依然整洁"

## 场景二：顾客需要经常出差

❌ **错误示范**："这个不容易皱"

✅ **正确话术**："三合一面料是'差旅神器'。锦纶提供弹性，行李箱挤压后挂1小时恢复原形；聚酯抗皱，拿出来抖一抖就能穿；粘纤垂感好，避免旅途奔波后的邋遢感"

## 场景三：顾客追求时尚感

❌ **错误示范**："这个款式很流行"

✅ **正确话术**："您看这面料的自然光泽和垂坠感，来自粘纤的丝质特性。但不同于真丝的娇贵，锦纶让它耐磨耐穿，聚酯让它保持形状。是'看起来高级，穿起来省心'的聪明选择"

## 场景四：顾客担心夏季闷热

❌ **错误示范**："夏天穿什么都热"

✅ **正确话术**："我们设计了'呼吸通道'：粘纤吸汗，锦纶快干，聚酯支撑结构让空气流通。实测比纯棉面料体感温度低2℃，因为汗液能快速导出蒸发，不会黏在身上"`,competitorComparison:`## 竞品对比表

| 对比维度 | 粘纤+聚酯+锦纶 | 纯粘纤面料 | 纯锦纶面料 | 棉锦混纺 |
|---------|--------------|-----------|-----------|---------|
| **耐磨性** | ★★★★★（三重防护） | ★★☆☆☆ | ★★★★★ | ★★★★☆ |
| **垂坠感** | ★★★★☆（自然流畅） | ★★★★★ | ★★☆☆☆ | ★★★☆☆ |
| **弹性** | ★★★★☆（四向弹性） | ★☆☆☆☆ | ★★★★★ | ★★★☆☆ |
| **抗皱性** | ★★★★☆（聚酯支撑） | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| **价格** | 中端（¥200-400） | 中低端（¥100-250） | 低端（¥80-150） | 中低端（¥120-200） |
| **适用场景** | 职业装、差旅服 | 夏季连衣裙 | 运动服、户外 | 休闲裤 |`,objectionHandling:`## Q1：三种纤维混纺会不会很厚很重？

**A：** 恰恰相反，我们采用了"轻量化设计"。锦纶本身就很轻（比重1.14），粘纤也属于轻质纤维。三合一后克重控制在180-200g/㎡，比纯棉衬衫还轻。但通过织造工艺，保持了良好的垂坠感。

## Q2：锦纶是不是容易起静电？

**A：** 单独锦纶确实易静电，但混纺后这个问题大大改善。粘纤吸湿性好（回潮率13%），能自然导走静电；同时我们在后整理时加入了抗静电剂。实际穿着中，静电发生率比纯锦纶降低了70%。

## Q3：洗涤后会不会变硬？

**A：** 我们采用了"柔软整理"工艺。面料在出厂前经过三次柔软处理，确保手感始终柔软。而且粘纤的特性是越洗越软，锦纶保持形状，聚酯防止变形。正确洗涤下，穿洗50次手感依然柔软。

## Q4：这个面料适合做西装吗？

**A：** 非常适合商务休闲西装。它的垂坠感接近羊毛，但重量更轻；耐磨性适合日常通勤；抗皱性减少护理时间。很多新兴的互联网公司、创意行业都选用这种面料，既有专业感又不失轻松氛围。`,practicalExercise:`## 实验1：耐磨测试

**工具**：面料样品、砂纸（600目）

**步骤**：用砂纸匀速摩擦面料50次→观察表面变化

**标准**：优质面料应无明显起毛起球

**话术**："50次摩擦相当于正常穿着3个月，您看表面依然光滑，这就是锦纶的耐磨保护"

## 实验2：弹性恢复

**工具**：面料样品、标记笔、尺子

**步骤**：标记10cm→横向拉伸至15cm→保持10秒→松开测量

**标准**：回复后长度应在10-10.2cm之间

**话术**："拉伸50%还能完全回复，这就是锦纶的'超强记忆'"

## 实验3：垂坠感展示

**工具**：三合一面料、纯棉面料

**步骤**：同时手持两种面料让其自然下垂→对比褶皱和线条

**标准**：三合一应形成流畅直线，褶皱少

**话术**："您看，三合一像瀑布一样垂顺，纯棉就有很多不规则褶皱"`,afterSales:`## 洗涤

- 水温：≤30℃冷水
- 方式：可机洗，选择标准模式
- 注意：避免与粗糙衣物同洗，防止摩擦起球
- 洗涤剂：中性洗涤剂

## 干燥

- 方式：悬挂晾干或平铺晾干
- 避免：避免高温烘干，锦纶耐热性一般
- 技巧：半干时整理形状，干后更挺括

## 熨烫

- 温度：低温熨烫（≤140℃）
- 方式：蒸汽熨烫，反面操作
- 注意：锦纶不耐高温，避免长时间熨烫同一位置

## 收纳

- 方式：悬挂为佳，保持形状
- 防虫：常规防虫措施即可
- 避免：避免长期挤压，防止永久折痕`,test:`## 单选题

1. 三合一面料中，锦纶的主要作用是？
   - A. 提供柔软手感
   - B. 增加垂坠感
   - C. 增强耐磨性和弹性 ✓
   - D. 提高抗皱性

2. 该面料最突出的优势是？
   - A. 价格便宜
   - B. 功能全面，适合多场景 ✓
   - C. 保暖性好
   - D. 正式感强

3. 熨烫时应特别注意什么？
   - A. 高温定型
   - B. 低温熨烫，避免损伤锦纶 ✓
   - C. 长时间熨烫
   - D. 直接熨烫装饰部分

## 实操题

请设计一个针对办公室职员的销售场景，展示三合一面料如何解决"坐一天裤子膝盖鼓包"的问题。`}},{id:"19",name:"羊毛+聚酯混纺（毛涤混纺）",subtitle:"羊毛质感+聚酯性能的智慧结合，用一半的价格实现90%的羊毛效果",description:'毛涤混纺是"羊毛质感+聚酯性能"的智慧结合，用一半的价格实现90%的羊毛效果，且更易打理。',category:"混纺面料",order:19,modules:{productCognition:`## 一句话记忆
"毛涤混纺——羊毛质感+聚酯性能的智慧结合，用一半的价格实现90%的羊毛效果，且更易打理"

## 技术背景
- **羊毛（50-70%）**：提供保暖性、柔软手感和天然光泽
- **聚酯（30-50%）**：增强抗皱性、耐磨性和尺寸稳定性
- **科学配比**：70/30是最佳平衡，既有羊毛质感又易打理

## 五大核心特性表

| 特性维度 | 具体表现 | 技术原理 | 顾客价值 |
|---------|---------|---------|---------|
| **质感** | 羊毛般柔软，自然光泽 | 羊毛纤维的天然特性 | 提升穿着档次 |
| **保暖性** | 优良保暖，是棉的3倍 | 羊毛的天然卷曲锁住空气 | 冬季御寒佳品 |
| **易打理** | 抗皱免烫，可机洗 | 聚酯的"记忆功能" | 节省护理成本 |
| **耐用性** | 耐磨抗起球，寿命长 | 聚酯增强结构强度 | 长期穿着价值 |
| **性价比** | 羊毛效果，聚酯价格 | 混纺技术降低成本 | 高性价比选择 |`,salesScript:`## 场景一：顾客触摸面料时

❌ **错误示范**："这个含羊毛，很暖和"

✅ **正确话术**："您感受到的这种细腻绒感，来自70%的澳洲美利奴羊毛，纤维直径只有19.5微米，比头发还细；同时30%的聚酯像'隐形骨架'，保证它久穿不起皱、不变形"

## 场景二：顾客担心起球时

❌ **错误示范**："羊毛都会起球，正常的"

✅ **正确话术**："纯羊毛确实易起球，但我们加入了30%的聚酯形成'保护网'。测试显示，摩擦3万次后，毛涤混纺的起球等级比纯羊毛高2级。相当于正常穿着3年，依然保持整洁外观"

## 场景三：顾客询问洗涤方式时

❌ **错误示范**："最好干洗"

✅ **正确话术**："这就是毛涤混纺的聪明之处。纯羊毛必须干洗，一次80元，一年400元。我们的面料可以机洗，选择羊毛模式，用专用洗涤剂。算下来5年省下的干洗费就够再买一件"

## 场景四：顾客对比价格时

❌ **错误示范**："这个比纯羊毛便宜"

✅ **正确话术**："您是在为'易打理性'付费。纯羊毛西装每年保养成本占价格的20%，毛涤混纺只要5%。而且聚酯的加入让西装版型更稳定，穿3年依然笔挺，这才是真正的性价比"`,competitorComparison:`## 竞品对比表

| 对比维度 | 羊毛+聚酯（70/30） | 纯羊毛面料 | 纯聚酯面料 | 羊毛+腈纶 |
|---------|------------------|-----------|-----------|----------|
| **质感手感** | ★★★★☆（接近羊毛） | ★★★★★ | ★★☆☆☆ | ★★★☆☆ |
| **保暖性** | ★★★★☆（优良保暖） | ★★★★★ | ★★☆☆☆ | ★★★★☆ |
| **易打理** | ★★★★☆（可机洗） | ★★☆☆☆ | ★★★★★ | ★★★☆☆ |
| **抗起球** | ★★★★☆（聚酯保护） | ★★☆☆☆ | ★★★★★ | ★★★☆☆ |
| **价格** | 中高端（¥800-1200） | 高端（¥2000+） | 低端（¥300-600） | 中端（¥500-800） |
| **投资回报** | 高（低保养成本） | 低（高保养成本） | 中 | 中 |`,objectionHandling:`## Q1：加了聚酯会不会影响保暖性？

**A：** 保暖性主要来自羊毛的天然卷曲结构锁住空气层。我们测试过，70%羊毛+30%聚酯的保暖系数是纯羊毛的85%，但重量轻了20%。实际上，聚酯的加入让面料更紧密，减少了热量散失的孔隙，保暖效率更高。

## Q2：毛涤混纺会不会有静电？

**A：** 羊毛本身有很好的抗静电性（回潮率15%），能自然调节湿度。聚酯部分我们做了抗静电处理。实际穿着中，静电发生率比纯聚酯面料低90%。冬季干燥环境建议搭配纯棉内衣，基本可以杜绝静电。

## Q3：机洗会不会缩水？

**A：** 我们对面料进行了"预缩处理"和"防缩整理"。预缩处理让面料在出厂前就完成大部分缩水；防缩整理在纤维表面形成保护膜。实测显示，正确机洗（羊毛模式，30℃）50次，缩水率≤3%，在国标允许范围内。

## Q4：为什么有的毛涤很便宜？

**A：** 价格差异主要在四个方面：一是羊毛品质，我们用的是澳洲美利奴羊毛，廉价品用普通羊毛；二是聚酯品质，我们用的是有光涤纶，增加光泽感；三是混纺工艺，我们采用紧密纺技术；四是后整理，我们有12道工序。您可以通过手感、光泽、重量来辨别品质。`,practicalExercise:`## 实验1：保暖性演示

**工具**：毛涤面料、纯棉面料、玻璃杯、热水

**步骤**：各包裹装有热水的玻璃杯→10分钟后测量水温

**标准**：毛涤包裹的杯子水温下降应慢于纯棉

**话术**："10分钟温差2℃，这就是羊毛锁住空气层的保温原理"

## 实验2：抗皱测试

**工具**：毛涤样品、纯羊毛样品

**步骤**：各对折用力按压→松开对比恢复情况

**标准**：毛涤应在20秒内恢复，纯羊毛需要更长时间

**话术**："毛涤20秒就平整了，纯羊毛还有明显折痕，这就是聚酯的'形状记忆'"

## 实验3：起球对比

**工具**：毛涤面料、纯羊毛面料、起球测试仪（或模拟摩擦）

**步骤**：各摩擦1000次→观察表面起球情况

**标准**：毛涤应无明显起球，纯羊毛可能有轻微起球

**话术**："同样摩擦，毛涤依然光滑，纯羊毛开始起毛，这就是聚酯的保护作用"`,afterSales:`## 洗涤

- 水温：≤30℃冷水
- 方式：建议手洗或洗衣机羊毛模式
- 洗涤剂：羊毛专用洗涤剂
- 注意：不要拧绞，平铺挤干水分

## 干燥

- 方式：平铺晾干，整理形状
- 避免：避免悬挂晾干，防止变形
- 注意：避免阳光直射，防止褪色

## 熨烫

- 温度：中温熨烫（160-180℃）
- 方式：垫布熨烫，使用蒸汽
- 注意：避免直接接触面料，防止极光

## 收纳

- 方式：折叠存放，放入防尘袋
- 防虫：必须使用樟脑丸或防虫剂
- 注意：定期通风，防止霉变`,test:`## 单选题

1. 毛涤混纺中，聚酯的主要作用是？
   - A. 增加保暖性
   - B. 改善手感和光泽
   - C. 增强抗皱性和耐用性 ✓
   - D. 提高吸湿性

2. 70/30的毛涤混纺相比纯羊毛最大优势是？
   - A. 更保暖
   - B. 更便宜
   - C. 更易打理 ✓
   - D. 更轻便

3. 毛涤混纺西装最适合的客户是？
   - A. 需要每天干洗的银行高管
   - B. 追求高性价比的商务人士 ✓
   - C. 户外运动爱好者
   - D. 居家办公人员

## 实操题

请向一位担心西装保养麻烦的年轻职场人，完整介绍毛涤混纺的易打理优势，包括洗涤、熨烫、收纳的全流程。`}}],Jb=[...Fb,...Zb,...Kb,...Pb],xl=Xp()(Fp(l=>({user:null,isAuthenticated:!1,login:(r,o)=>r==="admin"&&o==="admin123"?(l({user:{id:"1",username:"admin",role:"admin",name:"管理员"},isAuthenticated:!0}),!0):r==="user"&&o==="user123"?(l({user:{id:"2",username:"user",role:"user",name:"普通用户"},isAuthenticated:!0}),!0):!1,logout:()=>{l({user:null,isAuthenticated:!1})}}),{name:"auth-storage"})),xs=Xp()(Fp((l,r)=>({fabrics:Jb,currentFabric:null,addFabric:o=>{const c={...o,id:Date.now().toString()};l(s=>({fabrics:[...s.fabrics,c]}))},updateFabric:(o,c)=>{l(s=>({fabrics:s.fabrics.map(f=>f.id===o?{...f,...c}:f)}))},deleteFabric:o=>{l(c=>({fabrics:c.fabrics.filter(s=>s.id!==o)}))},setCurrentFabric:o=>{l({currentFabric:o})},getFabricById:o=>r().fabrics.find(c=>c.id===o)}),{name:"fabric-storage"}));function Ph(l,r){if(typeof l=="function")return l(r);l!=null&&(l.current=r)}function Ti(...l){return r=>{let o=!1;const c=l.map(s=>{const f=Ph(s,r);return!o&&typeof f=="function"&&(o=!0),f});if(o)return()=>{for(let s=0;s<c.length;s++){const f=c[s];typeof f=="function"?f():Ph(l[s],null)}}}}function kt(...l){return g.useCallback(Ti(...l),l)}var $b=Symbol.for("react.lazy"),ru=fs[" use ".trim().toString()];function Wb(l){return typeof l=="object"&&l!==null&&"then"in l}function Zp(l){return l!=null&&typeof l=="object"&&"$$typeof"in l&&l.$$typeof===$b&&"_payload"in l&&Wb(l._payload)}function Kp(l){const r=Ib(l),o=g.forwardRef((c,s)=>{let{children:f,...m}=c;Zp(f)&&typeof ru=="function"&&(f=ru(f._payload));const p=g.Children.toArray(f),b=p.find(tx);if(b){const h=b.props.children,S=p.map(x=>x===b?g.Children.count(h)>1?g.Children.only(null):g.isValidElement(h)?h.props.children:null:x);return y.jsx(r,{...m,ref:s,children:g.isValidElement(h)?g.cloneElement(h,void 0,S):null})}return y.jsx(r,{...m,ref:s,children:f})});return o.displayName=`${l}.Slot`,o}var Pp=Kp("Slot");function Ib(l){const r=g.forwardRef((o,c)=>{let{children:s,...f}=o;if(Zp(s)&&typeof ru=="function"&&(s=ru(s._payload)),g.isValidElement(s)){const m=nx(s),p=ax(f,s.props);return s.type!==g.Fragment&&(p.ref=c?Ti(c,m):m),g.cloneElement(s,p)}return g.Children.count(s)>1?g.Children.only(null):null});return r.displayName=`${l}.SlotClone`,r}var ex=Symbol("radix.slottable");function tx(l){return g.isValidElement(l)&&typeof l.type=="function"&&"__radixId"in l.type&&l.type.__radixId===ex}function ax(l,r){const o={...r};for(const c in r){const s=l[c],f=r[c];/^on[A-Z]/.test(c)?s&&f?o[c]=(...p)=>{const b=f(...p);return s(...p),b}:s&&(o[c]=s):c==="style"?o[c]={...s,...f}:c==="className"&&(o[c]=[s,f].filter(Boolean).join(" "))}return{...l,...o}}function nx(l){let r=Object.getOwnPropertyDescriptor(l.props,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?l.ref:(r=Object.getOwnPropertyDescriptor(l,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning,o?l.props.ref:l.props.ref||l.ref)}function Jp(l){var r,o,c="";if(typeof l=="string"||typeof l=="number")c+=l;else if(typeof l=="object")if(Array.isArray(l)){var s=l.length;for(r=0;r<s;r++)l[r]&&(o=Jp(l[r]))&&(c&&(c+=" "),c+=o)}else for(o in l)l[o]&&(c&&(c+=" "),c+=o);return c}function $p(){for(var l,r,o=0,c="",s=arguments.length;o<s;o++)(l=arguments[o])&&(r=Jp(l))&&(c&&(c+=" "),c+=r);return c}const Jh=l=>typeof l=="boolean"?`${l}`:l===0?"0":l,$h=$p,Ss=(l,r)=>o=>{var c;if(r?.variants==null)return $h(l,o?.class,o?.className);const{variants:s,defaultVariants:f}=r,m=Object.keys(s).map(h=>{const S=o?.[h],x=f?.[h];if(S===null)return null;const _=Jh(S)||Jh(x);return s[h][_]}),p=o&&Object.entries(o).reduce((h,S)=>{let[x,_]=S;return _===void 0||(h[x]=_),h},{}),b=r==null||(c=r.compoundVariants)===null||c===void 0?void 0:c.reduce((h,S)=>{let{class:x,className:_,...U}=S;return Object.entries(U).every(D=>{let[R,C]=D;return Array.isArray(C)?C.includes({...f,...p}[R]):{...f,...p}[R]===C})?[...h,x,_]:h},[]);return $h(l,m,b,o?.class,o?.className)},lx=(l,r)=>{const o=new Array(l.length+r.length);for(let c=0;c<l.length;c++)o[c]=l[c];for(let c=0;c<r.length;c++)o[l.length+c]=r[c];return o},ix=(l,r)=>({classGroupId:l,validator:r}),Wp=(l=new Map,r=null,o)=>({nextPart:l,validators:r,classGroupId:o}),uu="-",Wh=[],rx="arbitrary..",ux=l=>{const r=ox(l),{conflictingClassGroups:o,conflictingClassGroupModifiers:c}=l;return{getClassGroupId:m=>{if(m.startsWith("[")&&m.endsWith("]"))return cx(m);const p=m.split(uu),b=p[0]===""&&p.length>1?1:0;return Ip(p,b,r)},getConflictingClassGroupIds:(m,p)=>{if(p){const b=c[m],h=o[m];return b?h?lx(h,b):b:h||Wh}return o[m]||Wh}}},Ip=(l,r,o)=>{if(l.length-r===0)return o.classGroupId;const s=l[r],f=o.nextPart.get(s);if(f){const h=Ip(l,r+1,f);if(h)return h}const m=o.validators;if(m===null)return;const p=r===0?l.join(uu):l.slice(r).join(uu),b=m.length;for(let h=0;h<b;h++){const S=m[h];if(S.validator(p))return S.classGroupId}},cx=l=>l.slice(1,-1).indexOf(":")===-1?void 0:(()=>{const r=l.slice(1,-1),o=r.indexOf(":"),c=r.slice(0,o);return c?rx+c:void 0})(),ox=l=>{const{theme:r,classGroups:o}=l;return sx(o,r)},sx=(l,r)=>{const o=Wp();for(const c in l){const s=l[c];Es(s,o,c,r)}return o},Es=(l,r,o,c)=>{const s=l.length;for(let f=0;f<s;f++){const m=l[f];fx(m,r,o,c)}},fx=(l,r,o,c)=>{if(typeof l=="string"){dx(l,r,o);return}if(typeof l=="function"){mx(l,r,o,c);return}hx(l,r,o,c)},dx=(l,r,o)=>{const c=l===""?r:eg(r,l);c.classGroupId=o},mx=(l,r,o,c)=>{if(px(l)){Es(l(c),r,o,c);return}r.validators===null&&(r.validators=[]),r.validators.push(ix(o,l))},hx=(l,r,o,c)=>{const s=Object.entries(l),f=s.length;for(let m=0;m<f;m++){const[p,b]=s[m];Es(b,eg(r,p),o,c)}},eg=(l,r)=>{let o=l;const c=r.split(uu),s=c.length;for(let f=0;f<s;f++){const m=c[f];let p=o.nextPart.get(m);p||(p=Wp(),o.nextPart.set(m,p)),o=p}return o},px=l=>"isThemeGetter"in l&&l.isThemeGetter===!0,gx=l=>{if(l<1)return{get:()=>{},set:()=>{}};let r=0,o=Object.create(null),c=Object.create(null);const s=(f,m)=>{o[f]=m,r++,r>l&&(r=0,c=o,o=Object.create(null))};return{get(f){let m=o[f];if(m!==void 0)return m;if((m=c[f])!==void 0)return s(f,m),m},set(f,m){f in o?o[f]=m:s(f,m)}}},ls="!",Ih=":",vx=[],ep=(l,r,o,c,s)=>({modifiers:l,hasImportantModifier:r,baseClassName:o,maybePostfixModifierPosition:c,isExternal:s}),yx=l=>{const{prefix:r,experimentalParseClassName:o}=l;let c=s=>{const f=[];let m=0,p=0,b=0,h;const S=s.length;for(let R=0;R<S;R++){const C=s[R];if(m===0&&p===0){if(C===Ih){f.push(s.slice(b,R)),b=R+1;continue}if(C==="/"){h=R;continue}}C==="["?m++:C==="]"?m--:C==="("?p++:C===")"&&p--}const x=f.length===0?s:s.slice(b);let _=x,U=!1;x.endsWith(ls)?(_=x.slice(0,-1),U=!0):x.startsWith(ls)&&(_=x.slice(1),U=!0);const D=h&&h>b?h-b:void 0;return ep(f,U,_,D)};if(r){const s=r+Ih,f=c;c=m=>m.startsWith(s)?f(m.slice(s.length)):ep(vx,!1,m,void 0,!0)}if(o){const s=c;c=f=>o({className:f,parseClassName:s})}return c},bx=l=>{const r=new Map;return l.orderSensitiveModifiers.forEach((o,c)=>{r.set(o,1e6+c)}),o=>{const c=[];let s=[];for(let f=0;f<o.length;f++){const m=o[f],p=m[0]==="[",b=r.has(m);p||b?(s.length>0&&(s.sort(),c.push(...s),s=[]),c.push(m)):s.push(m)}return s.length>0&&(s.sort(),c.push(...s)),c}},xx=l=>({cache:gx(l.cacheSize),parseClassName:yx(l),sortModifiers:bx(l),...ux(l)}),Sx=/\s+/,Ex=(l,r)=>{const{parseClassName:o,getClassGroupId:c,getConflictingClassGroupIds:s,sortModifiers:f}=r,m=[],p=l.trim().split(Sx);let b="";for(let h=p.length-1;h>=0;h-=1){const S=p[h],{isExternal:x,modifiers:_,hasImportantModifier:U,baseClassName:D,maybePostfixModifierPosition:R}=o(S);if(x){b=S+(b.length>0?" "+b:b);continue}let C=!!R,H=c(C?D.substring(0,R):D);if(!H){if(!C){b=S+(b.length>0?" "+b:b);continue}if(H=c(D),!H){b=S+(b.length>0?" "+b:b);continue}C=!1}const V=_.length===0?"":_.length===1?_[0]:f(_).join(":"),k=U?V+ls:V,G=k+H;if(m.indexOf(G)>-1)continue;m.push(G);const P=s(H,C);for(let te=0;te<P.length;++te){const Z=P[te];m.push(k+Z)}b=S+(b.length>0?" "+b:b)}return b},Ax=(...l)=>{let r=0,o,c,s="";for(;r<l.length;)(o=l[r++])&&(c=tg(o))&&(s&&(s+=" "),s+=c);return s},tg=l=>{if(typeof l=="string")return l;let r,o="";for(let c=0;c<l.length;c++)l[c]&&(r=tg(l[c]))&&(o&&(o+=" "),o+=r);return o},Cx=(l,...r)=>{let o,c,s,f;const m=b=>{const h=r.reduce((S,x)=>x(S),l());return o=xx(h),c=o.cache.get,s=o.cache.set,f=p,p(b)},p=b=>{const h=c(b);if(h)return h;const S=Ex(b,o);return s(b,S),S};return f=m,(...b)=>f(Ax(...b))},Tx=[],Ke=l=>{const r=o=>o[l]||Tx;return r.isThemeGetter=!0,r},ag=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,ng=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Rx=/^\d+\/\d+$/,Nx=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Dx=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,_x=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,Ox=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Mx=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,cl=l=>Rx.test(l),se=l=>!!l&&!Number.isNaN(Number(l)),Pa=l=>!!l&&Number.isInteger(Number(l)),Yo=l=>l.endsWith("%")&&se(l.slice(0,-1)),ya=l=>Nx.test(l),jx=()=>!0,zx=l=>Dx.test(l)&&!_x.test(l),lg=()=>!1,wx=l=>Ox.test(l),Lx=l=>Mx.test(l),Ux=l=>!W(l)&&!I(l),Bx=l=>Sl(l,ug,lg),W=l=>ag.test(l),vn=l=>Sl(l,cg,zx),Vo=l=>Sl(l,Gx,se),tp=l=>Sl(l,ig,lg),Hx=l=>Sl(l,rg,Lx),Zr=l=>Sl(l,og,wx),I=l=>ng.test(l),yi=l=>El(l,cg),kx=l=>El(l,Yx),ap=l=>El(l,ig),qx=l=>El(l,ug),Qx=l=>El(l,rg),Kr=l=>El(l,og,!0),Sl=(l,r,o)=>{const c=ag.exec(l);return c?c[1]?r(c[1]):o(c[2]):!1},El=(l,r,o=!1)=>{const c=ng.exec(l);return c?c[1]?r(c[1]):o:!1},ig=l=>l==="position"||l==="percentage",rg=l=>l==="image"||l==="url",ug=l=>l==="length"||l==="size"||l==="bg-size",cg=l=>l==="length",Gx=l=>l==="number",Yx=l=>l==="family-name",og=l=>l==="shadow",Vx=()=>{const l=Ke("color"),r=Ke("font"),o=Ke("text"),c=Ke("font-weight"),s=Ke("tracking"),f=Ke("leading"),m=Ke("breakpoint"),p=Ke("container"),b=Ke("spacing"),h=Ke("radius"),S=Ke("shadow"),x=Ke("inset-shadow"),_=Ke("text-shadow"),U=Ke("drop-shadow"),D=Ke("blur"),R=Ke("perspective"),C=Ke("aspect"),H=Ke("ease"),V=Ke("animate"),k=()=>["auto","avoid","all","avoid-page","page","left","right","column"],G=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],P=()=>[...G(),I,W],te=()=>["auto","hidden","clip","visible","scroll"],Z=()=>["auto","contain","none"],F=()=>[I,W,b],pe=()=>[cl,"full","auto",...F()],He=()=>[Pa,"none","subgrid",I,W],Le=()=>["auto",{span:["full",Pa,I,W]},Pa,I,W],Oe=()=>[Pa,"auto",I,W],rt=()=>["auto","min","max","fr",I,W],Ie=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],Ee=()=>["start","end","center","stretch","center-safe","end-safe"],z=()=>["auto",...F()],K=()=>[cl,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...F()],Y=()=>[l,I,W],be=()=>[...G(),ap,tp,{position:[I,W]}],Se=()=>["no-repeat",{repeat:["","x","y","space","round"]}],T=()=>["auto","cover","contain",qx,Bx,{size:[I,W]}],q=()=>[Yo,yi,vn],X=()=>["","none","full",h,I,W],J=()=>["",se,yi,vn],ie=()=>["solid","dashed","dotted","double"],oe=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],le=()=>[se,Yo,ap,tp],Pe=()=>["","none",D,I,W],Me=()=>["none",se,I,W],Zt=()=>["none",se,I,W],Ea=()=>[se,I,W],Aa=()=>[cl,"full",...F()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[ya],breakpoint:[ya],color:[jx],container:[ya],"drop-shadow":[ya],ease:["in","out","in-out"],font:[Ux],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[ya],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[ya],shadow:[ya],spacing:["px",se],text:[ya],"text-shadow":[ya],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",cl,W,I,C]}],container:["container"],columns:[{columns:[se,W,I,p]}],"break-after":[{"break-after":k()}],"break-before":[{"break-before":k()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:P()}],overflow:[{overflow:te()}],"overflow-x":[{"overflow-x":te()}],"overflow-y":[{"overflow-y":te()}],overscroll:[{overscroll:Z()}],"overscroll-x":[{"overscroll-x":Z()}],"overscroll-y":[{"overscroll-y":Z()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:pe()}],"inset-x":[{"inset-x":pe()}],"inset-y":[{"inset-y":pe()}],start:[{start:pe()}],end:[{end:pe()}],top:[{top:pe()}],right:[{right:pe()}],bottom:[{bottom:pe()}],left:[{left:pe()}],visibility:["visible","invisible","collapse"],z:[{z:[Pa,"auto",I,W]}],basis:[{basis:[cl,"full","auto",p,...F()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[se,cl,"auto","initial","none",W]}],grow:[{grow:["",se,I,W]}],shrink:[{shrink:["",se,I,W]}],order:[{order:[Pa,"first","last","none",I,W]}],"grid-cols":[{"grid-cols":He()}],"col-start-end":[{col:Le()}],"col-start":[{"col-start":Oe()}],"col-end":[{"col-end":Oe()}],"grid-rows":[{"grid-rows":He()}],"row-start-end":[{row:Le()}],"row-start":[{"row-start":Oe()}],"row-end":[{"row-end":Oe()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":rt()}],"auto-rows":[{"auto-rows":rt()}],gap:[{gap:F()}],"gap-x":[{"gap-x":F()}],"gap-y":[{"gap-y":F()}],"justify-content":[{justify:[...Ie(),"normal"]}],"justify-items":[{"justify-items":[...Ee(),"normal"]}],"justify-self":[{"justify-self":["auto",...Ee()]}],"align-content":[{content:["normal",...Ie()]}],"align-items":[{items:[...Ee(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...Ee(),{baseline:["","last"]}]}],"place-content":[{"place-content":Ie()}],"place-items":[{"place-items":[...Ee(),"baseline"]}],"place-self":[{"place-self":["auto",...Ee()]}],p:[{p:F()}],px:[{px:F()}],py:[{py:F()}],ps:[{ps:F()}],pe:[{pe:F()}],pt:[{pt:F()}],pr:[{pr:F()}],pb:[{pb:F()}],pl:[{pl:F()}],m:[{m:z()}],mx:[{mx:z()}],my:[{my:z()}],ms:[{ms:z()}],me:[{me:z()}],mt:[{mt:z()}],mr:[{mr:z()}],mb:[{mb:z()}],ml:[{ml:z()}],"space-x":[{"space-x":F()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":F()}],"space-y-reverse":["space-y-reverse"],size:[{size:K()}],w:[{w:[p,"screen",...K()]}],"min-w":[{"min-w":[p,"screen","none",...K()]}],"max-w":[{"max-w":[p,"screen","none","prose",{screen:[m]},...K()]}],h:[{h:["screen","lh",...K()]}],"min-h":[{"min-h":["screen","lh","none",...K()]}],"max-h":[{"max-h":["screen","lh",...K()]}],"font-size":[{text:["base",o,yi,vn]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[c,I,Vo]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",Yo,W]}],"font-family":[{font:[kx,W,r]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[s,I,W]}],"line-clamp":[{"line-clamp":[se,"none",I,Vo]}],leading:[{leading:[f,...F()]}],"list-image":[{"list-image":["none",I,W]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",I,W]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:Y()}],"text-color":[{text:Y()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...ie(),"wavy"]}],"text-decoration-thickness":[{decoration:[se,"from-font","auto",I,vn]}],"text-decoration-color":[{decoration:Y()}],"underline-offset":[{"underline-offset":[se,"auto",I,W]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:F()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",I,W]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",I,W]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:be()}],"bg-repeat":[{bg:Se()}],"bg-size":[{bg:T()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},Pa,I,W],radial:["",I,W],conic:[Pa,I,W]},Qx,Hx]}],"bg-color":[{bg:Y()}],"gradient-from-pos":[{from:q()}],"gradient-via-pos":[{via:q()}],"gradient-to-pos":[{to:q()}],"gradient-from":[{from:Y()}],"gradient-via":[{via:Y()}],"gradient-to":[{to:Y()}],rounded:[{rounded:X()}],"rounded-s":[{"rounded-s":X()}],"rounded-e":[{"rounded-e":X()}],"rounded-t":[{"rounded-t":X()}],"rounded-r":[{"rounded-r":X()}],"rounded-b":[{"rounded-b":X()}],"rounded-l":[{"rounded-l":X()}],"rounded-ss":[{"rounded-ss":X()}],"rounded-se":[{"rounded-se":X()}],"rounded-ee":[{"rounded-ee":X()}],"rounded-es":[{"rounded-es":X()}],"rounded-tl":[{"rounded-tl":X()}],"rounded-tr":[{"rounded-tr":X()}],"rounded-br":[{"rounded-br":X()}],"rounded-bl":[{"rounded-bl":X()}],"border-w":[{border:J()}],"border-w-x":[{"border-x":J()}],"border-w-y":[{"border-y":J()}],"border-w-s":[{"border-s":J()}],"border-w-e":[{"border-e":J()}],"border-w-t":[{"border-t":J()}],"border-w-r":[{"border-r":J()}],"border-w-b":[{"border-b":J()}],"border-w-l":[{"border-l":J()}],"divide-x":[{"divide-x":J()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":J()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...ie(),"hidden","none"]}],"divide-style":[{divide:[...ie(),"hidden","none"]}],"border-color":[{border:Y()}],"border-color-x":[{"border-x":Y()}],"border-color-y":[{"border-y":Y()}],"border-color-s":[{"border-s":Y()}],"border-color-e":[{"border-e":Y()}],"border-color-t":[{"border-t":Y()}],"border-color-r":[{"border-r":Y()}],"border-color-b":[{"border-b":Y()}],"border-color-l":[{"border-l":Y()}],"divide-color":[{divide:Y()}],"outline-style":[{outline:[...ie(),"none","hidden"]}],"outline-offset":[{"outline-offset":[se,I,W]}],"outline-w":[{outline:["",se,yi,vn]}],"outline-color":[{outline:Y()}],shadow:[{shadow:["","none",S,Kr,Zr]}],"shadow-color":[{shadow:Y()}],"inset-shadow":[{"inset-shadow":["none",x,Kr,Zr]}],"inset-shadow-color":[{"inset-shadow":Y()}],"ring-w":[{ring:J()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:Y()}],"ring-offset-w":[{"ring-offset":[se,vn]}],"ring-offset-color":[{"ring-offset":Y()}],"inset-ring-w":[{"inset-ring":J()}],"inset-ring-color":[{"inset-ring":Y()}],"text-shadow":[{"text-shadow":["none",_,Kr,Zr]}],"text-shadow-color":[{"text-shadow":Y()}],opacity:[{opacity:[se,I,W]}],"mix-blend":[{"mix-blend":[...oe(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":oe()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[se]}],"mask-image-linear-from-pos":[{"mask-linear-from":le()}],"mask-image-linear-to-pos":[{"mask-linear-to":le()}],"mask-image-linear-from-color":[{"mask-linear-from":Y()}],"mask-image-linear-to-color":[{"mask-linear-to":Y()}],"mask-image-t-from-pos":[{"mask-t-from":le()}],"mask-image-t-to-pos":[{"mask-t-to":le()}],"mask-image-t-from-color":[{"mask-t-from":Y()}],"mask-image-t-to-color":[{"mask-t-to":Y()}],"mask-image-r-from-pos":[{"mask-r-from":le()}],"mask-image-r-to-pos":[{"mask-r-to":le()}],"mask-image-r-from-color":[{"mask-r-from":Y()}],"mask-image-r-to-color":[{"mask-r-to":Y()}],"mask-image-b-from-pos":[{"mask-b-from":le()}],"mask-image-b-to-pos":[{"mask-b-to":le()}],"mask-image-b-from-color":[{"mask-b-from":Y()}],"mask-image-b-to-color":[{"mask-b-to":Y()}],"mask-image-l-from-pos":[{"mask-l-from":le()}],"mask-image-l-to-pos":[{"mask-l-to":le()}],"mask-image-l-from-color":[{"mask-l-from":Y()}],"mask-image-l-to-color":[{"mask-l-to":Y()}],"mask-image-x-from-pos":[{"mask-x-from":le()}],"mask-image-x-to-pos":[{"mask-x-to":le()}],"mask-image-x-from-color":[{"mask-x-from":Y()}],"mask-image-x-to-color":[{"mask-x-to":Y()}],"mask-image-y-from-pos":[{"mask-y-from":le()}],"mask-image-y-to-pos":[{"mask-y-to":le()}],"mask-image-y-from-color":[{"mask-y-from":Y()}],"mask-image-y-to-color":[{"mask-y-to":Y()}],"mask-image-radial":[{"mask-radial":[I,W]}],"mask-image-radial-from-pos":[{"mask-radial-from":le()}],"mask-image-radial-to-pos":[{"mask-radial-to":le()}],"mask-image-radial-from-color":[{"mask-radial-from":Y()}],"mask-image-radial-to-color":[{"mask-radial-to":Y()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":G()}],"mask-image-conic-pos":[{"mask-conic":[se]}],"mask-image-conic-from-pos":[{"mask-conic-from":le()}],"mask-image-conic-to-pos":[{"mask-conic-to":le()}],"mask-image-conic-from-color":[{"mask-conic-from":Y()}],"mask-image-conic-to-color":[{"mask-conic-to":Y()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:be()}],"mask-repeat":[{mask:Se()}],"mask-size":[{mask:T()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",I,W]}],filter:[{filter:["","none",I,W]}],blur:[{blur:Pe()}],brightness:[{brightness:[se,I,W]}],contrast:[{contrast:[se,I,W]}],"drop-shadow":[{"drop-shadow":["","none",U,Kr,Zr]}],"drop-shadow-color":[{"drop-shadow":Y()}],grayscale:[{grayscale:["",se,I,W]}],"hue-rotate":[{"hue-rotate":[se,I,W]}],invert:[{invert:["",se,I,W]}],saturate:[{saturate:[se,I,W]}],sepia:[{sepia:["",se,I,W]}],"backdrop-filter":[{"backdrop-filter":["","none",I,W]}],"backdrop-blur":[{"backdrop-blur":Pe()}],"backdrop-brightness":[{"backdrop-brightness":[se,I,W]}],"backdrop-contrast":[{"backdrop-contrast":[se,I,W]}],"backdrop-grayscale":[{"backdrop-grayscale":["",se,I,W]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[se,I,W]}],"backdrop-invert":[{"backdrop-invert":["",se,I,W]}],"backdrop-opacity":[{"backdrop-opacity":[se,I,W]}],"backdrop-saturate":[{"backdrop-saturate":[se,I,W]}],"backdrop-sepia":[{"backdrop-sepia":["",se,I,W]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":F()}],"border-spacing-x":[{"border-spacing-x":F()}],"border-spacing-y":[{"border-spacing-y":F()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",I,W]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[se,"initial",I,W]}],ease:[{ease:["linear","initial",H,I,W]}],delay:[{delay:[se,I,W]}],animate:[{animate:["none",V,I,W]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[R,I,W]}],"perspective-origin":[{"perspective-origin":P()}],rotate:[{rotate:Me()}],"rotate-x":[{"rotate-x":Me()}],"rotate-y":[{"rotate-y":Me()}],"rotate-z":[{"rotate-z":Me()}],scale:[{scale:Zt()}],"scale-x":[{"scale-x":Zt()}],"scale-y":[{"scale-y":Zt()}],"scale-z":[{"scale-z":Zt()}],"scale-3d":["scale-3d"],skew:[{skew:Ea()}],"skew-x":[{"skew-x":Ea()}],"skew-y":[{"skew-y":Ea()}],transform:[{transform:[I,W,"","none","gpu","cpu"]}],"transform-origin":[{origin:P()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:Aa()}],"translate-x":[{"translate-x":Aa()}],"translate-y":[{"translate-y":Aa()}],"translate-z":[{"translate-z":Aa()}],"translate-none":["translate-none"],accent:[{accent:Y()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:Y()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",I,W]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":F()}],"scroll-mx":[{"scroll-mx":F()}],"scroll-my":[{"scroll-my":F()}],"scroll-ms":[{"scroll-ms":F()}],"scroll-me":[{"scroll-me":F()}],"scroll-mt":[{"scroll-mt":F()}],"scroll-mr":[{"scroll-mr":F()}],"scroll-mb":[{"scroll-mb":F()}],"scroll-ml":[{"scroll-ml":F()}],"scroll-p":[{"scroll-p":F()}],"scroll-px":[{"scroll-px":F()}],"scroll-py":[{"scroll-py":F()}],"scroll-ps":[{"scroll-ps":F()}],"scroll-pe":[{"scroll-pe":F()}],"scroll-pt":[{"scroll-pt":F()}],"scroll-pr":[{"scroll-pr":F()}],"scroll-pb":[{"scroll-pb":F()}],"scroll-pl":[{"scroll-pl":F()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",I,W]}],fill:[{fill:["none",...Y()]}],"stroke-w":[{stroke:[se,yi,vn,Vo]}],stroke:[{stroke:["none",...Y()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},Xx=Cx(Vx);function Te(...l){return Xx($p(l))}const du=Ss("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",lg:"h-10 rounded-md px-6 has-[>svg]:px-4",icon:"size-9","icon-sm":"size-8","icon-lg":"size-10"}},defaultVariants:{variant:"default",size:"default"}});function ba({className:l,variant:r="default",size:o="default",asChild:c=!1,...s}){const f=c?Pp:"button";return y.jsx(f,{"code-path":"src/components/ui/button.tsx:52:5","data-slot":"button","data-variant":r,"data-size":o,className:Te(du({variant:r,size:o,className:l})),...s})}const Fx=l=>l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Zx=l=>l.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,o,c)=>c?c.toUpperCase():o.toLowerCase()),np=l=>{const r=Zx(l);return r.charAt(0).toUpperCase()+r.slice(1)},sg=(...l)=>l.filter((r,o,c)=>!!r&&r.trim()!==""&&c.indexOf(r)===o).join(" ").trim(),Kx=l=>{for(const r in l)if(r.startsWith("aria-")||r==="role"||r==="title")return!0};var Px={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Jx=g.forwardRef(({color:l="currentColor",size:r=24,strokeWidth:o=2,absoluteStrokeWidth:c,className:s="",children:f,iconNode:m,...p},b)=>g.createElement("svg",{ref:b,...Px,width:r,height:r,stroke:l,strokeWidth:c?Number(o)*24/Number(r):o,className:sg("lucide",s),...!f&&!Kx(p)&&{"aria-hidden":"true"},...p},[...m.map(([h,S])=>g.createElement(h,S)),...Array.isArray(f)?f:[f]]));const we=(l,r)=>{const o=g.forwardRef(({className:c,...s},f)=>g.createElement(Jx,{ref:f,iconNode:r,className:sg(`lucide-${Fx(np(l))}`,`lucide-${l}`,c),...s}));return o.displayName=np(l),o};const $x=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],fg=we("arrow-left",$x);const Wx=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],dg=we("book-open",Wx);const Ix=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],e2=we("chart-column",Ix);const t2=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],a2=we("chevron-left",t2);const n2=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],mg=we("chevron-right",n2);const l2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],i2=we("circle-alert",l2);const r2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],u2=we("circle-question-mark",r2);const c2=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]],o2=we("clipboard-check",c2);const s2=[["rect",{x:"2",y:"6",width:"20",height:"8",rx:"1",key:"1estib"}],["path",{d:"M17 14v7",key:"7m2elx"}],["path",{d:"M7 14v7",key:"1cm7wv"}],["path",{d:"M17 3v3",key:"1v4jwn"}],["path",{d:"M7 3v3",key:"7o6guu"}],["path",{d:"M10 14 2.3 6.3",key:"1023jk"}],["path",{d:"m14 6 7.7 7.7",key:"1s8pl2"}],["path",{d:"m8 6 8 8",key:"hl96qh"}]],f2=we("construction",s2);const d2=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],lp=we("file-text",d2);const m2=[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",key:"18mbvz"}],["path",{d:"M6.453 15h11.094",key:"3shlmq"}],["path",{d:"M8.5 2h7",key:"csnxdl"}]],h2=we("flask-conical",m2);const p2=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],g2=we("graduation-cap",p2);const v2=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],y2=we("image",v2);const b2=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],x2=we("log-out",b2);const S2=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],E2=we("message-square",S2);const A2=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],C2=we("plus",A2);const T2=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],R2=we("save",T2);const N2=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],D2=we("search",N2);const _2=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],hg=we("square-pen",_2);const O2=[["path",{d:"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5",key:"slp6dd"}],["path",{d:"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",key:"o0xfot"}],["path",{d:"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",key:"wn3emo"}]],M2=we("store",O2);const j2=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],z2=we("trash-2",j2);const w2=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],L2=we("trending-up",w2);const U2=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],B2=we("user",U2);const H2=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],k2=we("users",H2);const q2=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",key:"1ngwbx"}]],Q2=we("wrench",q2),G2=[{id:"fabric-training",label:"面料知识培训",icon:dg,path:"/fabric-training"},{id:"store-manual",label:"店铺运营手册",icon:M2,path:"/store-manual"},{id:"sales-training",label:"销售能力培训",icon:L2,path:"/sales-training"},{id:"manager-manual",label:"店长管理手册",icon:k2,path:"/manager-manual"},{id:"mentor-manual",label:"带教手册",icon:g2,path:"/mentor-manual"},{id:"store-image",label:"店铺形象",icon:y2,path:"/store-image"}];function Y2(){const l=Xt(),r=An(),{user:o,logout:c}=xl(),s=()=>{c(),r("/login")};return y.jsxs("div",{"code-path":"src/components/Layout.tsx:35:5",className:"min-h-screen bg-gray-50",children:[y.jsx("header",{"code-path":"src/components/Layout.tsx:37:7",className:"bg-white border-b border-gray-200 sticky top-0 z-50",children:y.jsx("div",{"code-path":"src/components/Layout.tsx:38:9",className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:y.jsxs("div",{"code-path":"src/components/Layout.tsx:39:11",className:"flex items-center justify-between h-16",children:[y.jsxs("div",{"code-path":"src/components/Layout.tsx:41:13",className:"flex items-center gap-3",children:[y.jsx("div",{"code-path":"src/components/Layout.tsx:42:15",className:"w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center",children:y.jsx("span",{"code-path":"src/components/Layout.tsx:43:17",className:"text-white font-bold text-sm",children:"E"})}),y.jsx("h1",{"code-path":"src/components/Layout.tsx:45:15",className:"text-lg font-semibold text-gray-900",children:"企业信息管理系统"})]}),y.jsx("nav",{"code-path":"src/components/Layout.tsx:49:13",className:"hidden md:flex items-center space-x-1",children:G2.map(f=>{const m=f.icon,p=l.pathname.startsWith(f.path);return y.jsxs("button",{"code-path":"src/components/Layout.tsx:54:19",onClick:()=>r(f.path),className:`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${p?"bg-blue-50 text-blue-600":"text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`,children:[y.jsx(m,{"code-path":"src/components/Layout.tsx:63:21",className:"w-4 h-4"}),f.label]},f.id)})}),y.jsxs("div",{"code-path":"src/components/Layout.tsx:71:13",className:"flex items-center gap-4",children:[y.jsxs("div",{"code-path":"src/components/Layout.tsx:72:15",className:"flex items-center gap-2 text-sm text-gray-600",children:[y.jsx(B2,{"code-path":"src/components/Layout.tsx:73:17",className:"w-4 h-4"}),y.jsx("span",{"code-path":"src/components/Layout.tsx:74:17",children:o?.name}),o?.role==="admin"&&y.jsx("span",{"code-path":"src/components/Layout.tsx:76:19",className:"px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs",children:"管理员"})]}),y.jsxs(ba,{"code-path":"src/components/Layout.tsx:81:15",variant:"ghost",size:"sm",onClick:s,className:"text-gray-600 hover:text-gray-900",children:[y.jsx(x2,{"code-path":"src/components/Layout.tsx:87:17",className:"w-4 h-4 mr-1"}),"退出"]})]})]})})}),y.jsx("main",{"code-path":"src/components/Layout.tsx:96:7",className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",children:y.jsx(nb,{"code-path":"src/components/Layout.tsx:97:9"})})]})}function dl({className:l,type:r,...o}){return y.jsx("input",{"code-path":"src/components/ui/input.tsx:7:5",type:r,"data-slot":"input",className:Te("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",l),...o})}var V2=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],X2=V2.reduce((l,r)=>{const o=Kp(`Primitive.${r}`),c=g.forwardRef((s,f)=>{const{asChild:m,...p}=s,b=m?o:r;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),y.jsx(b,{...p,ref:f})});return c.displayName=`Primitive.${r}`,{...l,[r]:c}},{}),F2="Label",pg=g.forwardRef((l,r)=>y.jsx(X2.label,{...l,ref:r,onMouseDown:o=>{o.target.closest("button, input, select, textarea")||(l.onMouseDown?.(o),!o.defaultPrevented&&o.detail>1&&o.preventDefault())}}));pg.displayName=F2;var Z2=pg;function yn({className:l,...r}){return y.jsx(Z2,{"code-path":"src/components/ui/label.tsx:13:5","data-slot":"label",className:Te("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",l),...r})}function bn({className:l,...r}){return y.jsx("div",{"code-path":"src/components/ui/card.tsx:7:5","data-slot":"card",className:Te("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",l),...r})}function pl({className:l,...r}){return y.jsx("div",{"code-path":"src/components/ui/card.tsx:20:5","data-slot":"card-header",className:Te("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",l),...r})}function xn({className:l,...r}){return y.jsx("div",{"code-path":"src/components/ui/card.tsx:33:5","data-slot":"card-title",className:Te("leading-none font-semibold",l),...r})}function K2({className:l,...r}){return y.jsx("div",{"code-path":"src/components/ui/card.tsx:43:5","data-slot":"card-description",className:Te("text-muted-foreground text-sm",l),...r})}function Sn({className:l,...r}){return y.jsx("div",{"code-path":"src/components/ui/card.tsx:66:5","data-slot":"card-content",className:Te("px-6",l),...r})}const P2=Ss("relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",{variants:{variant:{default:"bg-card text-card-foreground",destructive:"text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"}},defaultVariants:{variant:"default"}});function J2({className:l,variant:r,...o}){return y.jsx("div",{"code-path":"src/components/ui/alert.tsx:28:5","data-slot":"alert",role:"alert",className:Te(P2({variant:r}),l),...o})}function $2({className:l,...r}){return y.jsx("div",{"code-path":"src/components/ui/alert.tsx:55:5","data-slot":"alert-description",className:Te("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",l),...r})}function W2(){const l=An(),{login:r}=xl(),[o,c]=g.useState(""),[s,f]=g.useState(""),[m,p]=g.useState(""),[b,h]=g.useState(!1),S=x=>{x.preventDefault(),p(""),h(!0),setTimeout(()=>{r(o,s)?l("/"):p("用户名或密码错误"),h(!1)},500)};return y.jsx("div",{"code-path":"src/pages/LoginPage.tsx:36:5",className:"min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4",children:y.jsxs("div",{"code-path":"src/pages/LoginPage.tsx:37:7",className:"w-full max-w-md",children:[y.jsx("div",{"code-path":"src/pages/LoginPage.tsx:39:9",className:"flex items-center justify-center mb-8",children:y.jsx("div",{"code-path":"src/pages/LoginPage.tsx:40:11",className:"w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg",children:y.jsx("span",{"code-path":"src/pages/LoginPage.tsx:41:13",className:"text-white font-bold text-2xl",children:"E"})})}),y.jsxs(bn,{"code-path":"src/pages/LoginPage.tsx:45:9",className:"shadow-xl border-0",children:[y.jsxs(pl,{"code-path":"src/pages/LoginPage.tsx:46:11",className:"space-y-1 text-center",children:[y.jsx(xn,{"code-path":"src/pages/LoginPage.tsx:47:13",className:"text-2xl font-bold text-gray-900",children:"企业信息管理系统"}),y.jsx(K2,{"code-path":"src/pages/LoginPage.tsx:50:13",className:"text-gray-500",children:"请输入您的账号和密码"})]}),y.jsxs(Sn,{"code-path":"src/pages/LoginPage.tsx:54:11",children:[y.jsxs("form",{"code-path":"src/pages/LoginPage.tsx:55:13",onSubmit:S,className:"space-y-4",children:[m&&y.jsxs(J2,{"code-path":"src/pages/LoginPage.tsx:57:17",variant:"destructive",children:[y.jsx(i2,{"code-path":"src/pages/LoginPage.tsx:58:19",className:"h-4 w-4"}),y.jsx($2,{"code-path":"src/pages/LoginPage.tsx:59:19",children:m})]}),y.jsxs("div",{"code-path":"src/pages/LoginPage.tsx:63:15",className:"space-y-2",children:[y.jsx(yn,{"code-path":"src/pages/LoginPage.tsx:64:17",htmlFor:"username",children:"用户名"}),y.jsx(dl,{"code-path":"src/pages/LoginPage.tsx:65:17",id:"username",type:"text",placeholder:"请输入用户名",value:o,onChange:x=>c(x.target.value),required:!0,className:"h-11"})]}),y.jsxs("div",{"code-path":"src/pages/LoginPage.tsx:76:15",className:"space-y-2",children:[y.jsx(yn,{"code-path":"src/pages/LoginPage.tsx:77:17",htmlFor:"password",children:"密码"}),y.jsx(dl,{"code-path":"src/pages/LoginPage.tsx:78:17",id:"password",type:"password",placeholder:"请输入密码",value:s,onChange:x=>f(x.target.value),required:!0,className:"h-11"})]}),y.jsx(ba,{"code-path":"src/pages/LoginPage.tsx:89:15",type:"submit",className:"w-full h-11 bg-blue-600 hover:bg-blue-700",disabled:b,children:b?"登录中...":"登录"})]}),y.jsxs("div",{"code-path":"src/pages/LoginPage.tsx:98:13",className:"mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600",children:[y.jsx("p",{"code-path":"src/pages/LoginPage.tsx:99:15",className:"font-medium mb-2",children:"测试账号："}),y.jsxs("div",{"code-path":"src/pages/LoginPage.tsx:100:15",className:"space-y-1",children:[y.jsx("p",{"code-path":"src/pages/LoginPage.tsx:101:17",children:"管理员：admin / admin123"}),y.jsx("p",{"code-path":"src/pages/LoginPage.tsx:102:17",children:"普通用户：user / user123"})]})]})]})]}),y.jsx("p",{"code-path":"src/pages/LoginPage.tsx:108:9",className:"text-center text-sm text-gray-500 mt-6",children:"© 2026 企业信息管理系统 版权所有"})]})})}function I2({className:l,...r}){return y.jsx("nav",{"code-path":"src/components/ui/pagination.tsx:13:5",role:"navigation","aria-label":"pagination","data-slot":"pagination",className:Te("mx-auto flex w-full justify-center",l),...r})}function eS({className:l,...r}){return y.jsx("ul",{"code-path":"src/components/ui/pagination.tsx:28:5","data-slot":"pagination-content",className:Te("flex flex-row items-center gap-1",l),...r})}function Xo({...l}){return y.jsx("li",{"code-path":"src/components/ui/pagination.tsx:37:10","data-slot":"pagination-item",...l})}function As({className:l,isActive:r,size:o="icon",...c}){return y.jsx("a",{"code-path":"src/components/ui/pagination.tsx:52:5","aria-current":r?"page":void 0,"data-slot":"pagination-link","data-active":r,className:Te(du({variant:r?"outline":"ghost",size:o}),l),...c})}function tS({className:l,...r}){return y.jsxs(As,{"code-path":"src/components/ui/pagination.tsx:73:5","aria-label":"Go to previous page",size:"default",className:Te("gap-1 px-2.5 sm:pl-2.5",l),...r,children:[y.jsx(a2,{"code-path":"src/components/ui/pagination.tsx:79:7"}),y.jsx("span",{"code-path":"src/components/ui/pagination.tsx:80:7",className:"hidden sm:block",children:"Previous"})]})}function aS({className:l,...r}){return y.jsxs(As,{"code-path":"src/components/ui/pagination.tsx:90:5","aria-label":"Go to next page",size:"default",className:Te("gap-1 px-2.5 sm:pr-2.5",l),...r,children:[y.jsx("span",{"code-path":"src/components/ui/pagination.tsx:96:7",className:"hidden sm:block",children:"Next"}),y.jsx(mg,{"code-path":"src/components/ui/pagination.tsx:97:7"})]})}function nS(l,r){const o=g.createContext(r),c=f=>{const{children:m,...p}=f,b=g.useMemo(()=>p,Object.values(p));return y.jsx(o.Provider,{value:b,children:m})};c.displayName=l+"Provider";function s(f){const m=g.useContext(o);if(m)return m;if(r!==void 0)return r;throw new Error(`\`${f}\` must be used within \`${l}\``)}return[c,s]}function Ri(l,r=[]){let o=[];function c(f,m){const p=g.createContext(m),b=o.length;o=[...o,m];const h=x=>{const{scope:_,children:U,...D}=x,R=_?.[l]?.[b]||p,C=g.useMemo(()=>D,Object.values(D));return y.jsx(R.Provider,{value:C,children:U})};h.displayName=f+"Provider";function S(x,_){const U=_?.[l]?.[b]||p,D=g.useContext(U);if(D)return D;if(m!==void 0)return m;throw new Error(`\`${x}\` must be used within \`${f}\``)}return[h,S]}const s=()=>{const f=o.map(m=>g.createContext(m));return function(p){const b=p?.[l]||f;return g.useMemo(()=>({[`__scope${l}`]:{...p,[l]:b}}),[p,b])}};return s.scopeName=l,[c,lS(s,...r)]}function lS(...l){const r=l[0];if(l.length===1)return r;const o=()=>{const c=l.map(s=>({useScope:s(),scopeName:s.scopeName}));return function(f){const m=c.reduce((p,{useScope:b,scopeName:h})=>{const x=b(f)[`__scope${h}`];return{...p,...x}},{});return g.useMemo(()=>({[`__scope${r.scopeName}`]:m}),[m])}};return o.scopeName=r.scopeName,o}function We(l,r,{checkForDefaultPrevented:o=!0}={}){return function(s){if(l?.(s),o===!1||!s.defaultPrevented)return r?.(s)}}var Ei=globalThis?.document?g.useLayoutEffect:()=>{},iS=fs[" useId ".trim().toString()]||(()=>{}),rS=0;function xi(l){const[r,o]=g.useState(iS());return Ei(()=>{o(c=>c??String(rS++))},[l]),l||(r?`radix-${r}`:"")}var uS=fs[" useInsertionEffect ".trim().toString()]||Ei;function Cs({prop:l,defaultProp:r,onChange:o=()=>{},caller:c}){const[s,f,m]=cS({defaultProp:r,onChange:o}),p=l!==void 0,b=p?l:s;{const S=g.useRef(l!==void 0);g.useEffect(()=>{const x=S.current;x!==p&&console.warn(`${c} is changing from ${x?"controlled":"uncontrolled"} to ${p?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),S.current=p},[p,c])}const h=g.useCallback(S=>{if(p){const x=oS(S)?S(l):S;x!==l&&m.current?.(x)}else f(S)},[p,l,f,m]);return[b,h]}function cS({defaultProp:l,onChange:r}){const[o,c]=g.useState(l),s=g.useRef(o),f=g.useRef(r);return uS(()=>{f.current=r},[r]),g.useEffect(()=>{s.current!==o&&(f.current?.(o),s.current=o)},[o,s]),[o,c,f]}function oS(l){return typeof l=="function"}function sS(l){const r=fS(l),o=g.forwardRef((c,s)=>{const{children:f,...m}=c,p=g.Children.toArray(f),b=p.find(mS);if(b){const h=b.props.children,S=p.map(x=>x===b?g.Children.count(h)>1?g.Children.only(null):g.isValidElement(h)?h.props.children:null:x);return y.jsx(r,{...m,ref:s,children:g.isValidElement(h)?g.cloneElement(h,void 0,S):null})}return y.jsx(r,{...m,ref:s,children:f})});return o.displayName=`${l}.Slot`,o}function fS(l){const r=g.forwardRef((o,c)=>{const{children:s,...f}=o;if(g.isValidElement(s)){const m=pS(s),p=hS(f,s.props);return s.type!==g.Fragment&&(p.ref=c?Ti(c,m):m),g.cloneElement(s,p)}return g.Children.count(s)>1?g.Children.only(null):null});return r.displayName=`${l}.SlotClone`,r}var dS=Symbol("radix.slottable");function mS(l){return g.isValidElement(l)&&typeof l.type=="function"&&"__radixId"in l.type&&l.type.__radixId===dS}function hS(l,r){const o={...r};for(const c in r){const s=l[c],f=r[c];/^on[A-Z]/.test(c)?s&&f?o[c]=(...p)=>{const b=f(...p);return s(...p),b}:s&&(o[c]=s):c==="style"?o[c]={...s,...f}:c==="className"&&(o[c]=[s,f].filter(Boolean).join(" "))}return{...l,...o}}function pS(l){let r=Object.getOwnPropertyDescriptor(l.props,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?l.ref:(r=Object.getOwnPropertyDescriptor(l,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning,o?l.props.ref:l.props.ref||l.ref)}var gS=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],ct=gS.reduce((l,r)=>{const o=sS(`Primitive.${r}`),c=g.forwardRef((s,f)=>{const{asChild:m,...p}=s,b=m?o:r;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),y.jsx(b,{...p,ref:f})});return c.displayName=`Primitive.${r}`,{...l,[r]:c}},{});function vS(l,r){l&&Vp.flushSync(()=>l.dispatchEvent(r))}function gl(l){const r=g.useRef(l);return g.useEffect(()=>{r.current=l}),g.useMemo(()=>(...o)=>r.current?.(...o),[])}function yS(l,r=globalThis?.document){const o=gl(l);g.useEffect(()=>{const c=s=>{s.key==="Escape"&&o(s)};return r.addEventListener("keydown",c,{capture:!0}),()=>r.removeEventListener("keydown",c,{capture:!0})},[o,r])}var bS="DismissableLayer",is="dismissableLayer.update",xS="dismissableLayer.pointerDownOutside",SS="dismissableLayer.focusOutside",ip,gg=g.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),vg=g.forwardRef((l,r)=>{const{disableOutsidePointerEvents:o=!1,onEscapeKeyDown:c,onPointerDownOutside:s,onFocusOutside:f,onInteractOutside:m,onDismiss:p,...b}=l,h=g.useContext(gg),[S,x]=g.useState(null),_=S?.ownerDocument??globalThis?.document,[,U]=g.useState({}),D=kt(r,Z=>x(Z)),R=Array.from(h.layers),[C]=[...h.layersWithOutsidePointerEventsDisabled].slice(-1),H=R.indexOf(C),V=S?R.indexOf(S):-1,k=h.layersWithOutsidePointerEventsDisabled.size>0,G=V>=H,P=CS(Z=>{const F=Z.target,pe=[...h.branches].some(He=>He.contains(F));!G||pe||(s?.(Z),m?.(Z),Z.defaultPrevented||p?.())},_),te=TS(Z=>{const F=Z.target;[...h.branches].some(He=>He.contains(F))||(f?.(Z),m?.(Z),Z.defaultPrevented||p?.())},_);return yS(Z=>{V===h.layers.size-1&&(c?.(Z),!Z.defaultPrevented&&p&&(Z.preventDefault(),p()))},_),g.useEffect(()=>{if(S)return o&&(h.layersWithOutsidePointerEventsDisabled.size===0&&(ip=_.body.style.pointerEvents,_.body.style.pointerEvents="none"),h.layersWithOutsidePointerEventsDisabled.add(S)),h.layers.add(S),rp(),()=>{o&&h.layersWithOutsidePointerEventsDisabled.size===1&&(_.body.style.pointerEvents=ip)}},[S,_,o,h]),g.useEffect(()=>()=>{S&&(h.layers.delete(S),h.layersWithOutsidePointerEventsDisabled.delete(S),rp())},[S,h]),g.useEffect(()=>{const Z=()=>U({});return document.addEventListener(is,Z),()=>document.removeEventListener(is,Z)},[]),y.jsx(ct.div,{...b,ref:D,style:{pointerEvents:k?G?"auto":"none":void 0,...l.style},onFocusCapture:We(l.onFocusCapture,te.onFocusCapture),onBlurCapture:We(l.onBlurCapture,te.onBlurCapture),onPointerDownCapture:We(l.onPointerDownCapture,P.onPointerDownCapture)})});vg.displayName=bS;var ES="DismissableLayerBranch",AS=g.forwardRef((l,r)=>{const o=g.useContext(gg),c=g.useRef(null),s=kt(r,c);return g.useEffect(()=>{const f=c.current;if(f)return o.branches.add(f),()=>{o.branches.delete(f)}},[o.branches]),y.jsx(ct.div,{...l,ref:s})});AS.displayName=ES;function CS(l,r=globalThis?.document){const o=gl(l),c=g.useRef(!1),s=g.useRef(()=>{});return g.useEffect(()=>{const f=p=>{if(p.target&&!c.current){let b=function(){yg(xS,o,h,{discrete:!0})};const h={originalEvent:p};p.pointerType==="touch"?(r.removeEventListener("click",s.current),s.current=b,r.addEventListener("click",s.current,{once:!0})):b()}else r.removeEventListener("click",s.current);c.current=!1},m=window.setTimeout(()=>{r.addEventListener("pointerdown",f)},0);return()=>{window.clearTimeout(m),r.removeEventListener("pointerdown",f),r.removeEventListener("click",s.current)}},[r,o]),{onPointerDownCapture:()=>c.current=!0}}function TS(l,r=globalThis?.document){const o=gl(l),c=g.useRef(!1);return g.useEffect(()=>{const s=f=>{f.target&&!c.current&&yg(SS,o,{originalEvent:f},{discrete:!1})};return r.addEventListener("focusin",s),()=>r.removeEventListener("focusin",s)},[r,o]),{onFocusCapture:()=>c.current=!0,onBlurCapture:()=>c.current=!1}}function rp(){const l=new CustomEvent(is);document.dispatchEvent(l)}function yg(l,r,o,{discrete:c}){const s=o.originalEvent.target,f=new CustomEvent(l,{bubbles:!1,cancelable:!0,detail:o});r&&s.addEventListener(l,r,{once:!0}),c?vS(s,f):s.dispatchEvent(f)}var Fo="focusScope.autoFocusOnMount",Zo="focusScope.autoFocusOnUnmount",up={bubbles:!1,cancelable:!0},RS="FocusScope",bg=g.forwardRef((l,r)=>{const{loop:o=!1,trapped:c=!1,onMountAutoFocus:s,onUnmountAutoFocus:f,...m}=l,[p,b]=g.useState(null),h=gl(s),S=gl(f),x=g.useRef(null),_=kt(r,R=>b(R)),U=g.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;g.useEffect(()=>{if(c){let R=function(k){if(U.paused||!p)return;const G=k.target;p.contains(G)?x.current=G:Ja(x.current,{select:!0})},C=function(k){if(U.paused||!p)return;const G=k.relatedTarget;G!==null&&(p.contains(G)||Ja(x.current,{select:!0}))},H=function(k){if(document.activeElement===document.body)for(const P of k)P.removedNodes.length>0&&Ja(p)};document.addEventListener("focusin",R),document.addEventListener("focusout",C);const V=new MutationObserver(H);return p&&V.observe(p,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",R),document.removeEventListener("focusout",C),V.disconnect()}}},[c,p,U.paused]),g.useEffect(()=>{if(p){op.add(U);const R=document.activeElement;if(!p.contains(R)){const H=new CustomEvent(Fo,up);p.addEventListener(Fo,h),p.dispatchEvent(H),H.defaultPrevented||(NS(jS(xg(p)),{select:!0}),document.activeElement===R&&Ja(p))}return()=>{p.removeEventListener(Fo,h),setTimeout(()=>{const H=new CustomEvent(Zo,up);p.addEventListener(Zo,S),p.dispatchEvent(H),H.defaultPrevented||Ja(R??document.body,{select:!0}),p.removeEventListener(Zo,S),op.remove(U)},0)}}},[p,h,S,U]);const D=g.useCallback(R=>{if(!o&&!c||U.paused)return;const C=R.key==="Tab"&&!R.altKey&&!R.ctrlKey&&!R.metaKey,H=document.activeElement;if(C&&H){const V=R.currentTarget,[k,G]=DS(V);k&&G?!R.shiftKey&&H===G?(R.preventDefault(),o&&Ja(k,{select:!0})):R.shiftKey&&H===k&&(R.preventDefault(),o&&Ja(G,{select:!0})):H===V&&R.preventDefault()}},[o,c,U.paused]);return y.jsx(ct.div,{tabIndex:-1,...m,ref:_,onKeyDown:D})});bg.displayName=RS;function NS(l,{select:r=!1}={}){const o=document.activeElement;for(const c of l)if(Ja(c,{select:r}),document.activeElement!==o)return}function DS(l){const r=xg(l),o=cp(r,l),c=cp(r.reverse(),l);return[o,c]}function xg(l){const r=[],o=document.createTreeWalker(l,NodeFilter.SHOW_ELEMENT,{acceptNode:c=>{const s=c.tagName==="INPUT"&&c.type==="hidden";return c.disabled||c.hidden||s?NodeFilter.FILTER_SKIP:c.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;o.nextNode();)r.push(o.currentNode);return r}function cp(l,r){for(const o of l)if(!_S(o,{upTo:r}))return o}function _S(l,{upTo:r}){if(getComputedStyle(l).visibility==="hidden")return!0;for(;l;){if(r!==void 0&&l===r)return!1;if(getComputedStyle(l).display==="none")return!0;l=l.parentElement}return!1}function OS(l){return l instanceof HTMLInputElement&&"select"in l}function Ja(l,{select:r=!1}={}){if(l&&l.focus){const o=document.activeElement;l.focus({preventScroll:!0}),l!==o&&OS(l)&&r&&l.select()}}var op=MS();function MS(){let l=[];return{add(r){const o=l[0];r!==o&&o?.pause(),l=sp(l,r),l.unshift(r)},remove(r){l=sp(l,r),l[0]?.resume()}}}function sp(l,r){const o=[...l],c=o.indexOf(r);return c!==-1&&o.splice(c,1),o}function jS(l){return l.filter(r=>r.tagName!=="A")}var zS="Portal",Sg=g.forwardRef((l,r)=>{const{container:o,...c}=l,[s,f]=g.useState(!1);Ei(()=>f(!0),[]);const m=o||s&&globalThis?.document?.body;return m?kb.createPortal(y.jsx(ct.div,{...c,ref:r}),m):null});Sg.displayName=zS;function wS(l,r){return g.useReducer((o,c)=>r[o][c]??o,l)}var Ni=l=>{const{present:r,children:o}=l,c=LS(r),s=typeof o=="function"?o({present:c.isPresent}):g.Children.only(o),f=kt(c.ref,US(s));return typeof o=="function"||c.isPresent?g.cloneElement(s,{ref:f}):null};Ni.displayName="Presence";function LS(l){const[r,o]=g.useState(),c=g.useRef(null),s=g.useRef(l),f=g.useRef("none"),m=l?"mounted":"unmounted",[p,b]=wS(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return g.useEffect(()=>{const h=Pr(c.current);f.current=p==="mounted"?h:"none"},[p]),Ei(()=>{const h=c.current,S=s.current;if(S!==l){const _=f.current,U=Pr(h);l?b("MOUNT"):U==="none"||h?.display==="none"?b("UNMOUNT"):b(S&&_!==U?"ANIMATION_OUT":"UNMOUNT"),s.current=l}},[l,b]),Ei(()=>{if(r){let h;const S=r.ownerDocument.defaultView??window,x=U=>{const R=Pr(c.current).includes(CSS.escape(U.animationName));if(U.target===r&&R&&(b("ANIMATION_END"),!s.current)){const C=r.style.animationFillMode;r.style.animationFillMode="forwards",h=S.setTimeout(()=>{r.style.animationFillMode==="forwards"&&(r.style.animationFillMode=C)})}},_=U=>{U.target===r&&(f.current=Pr(c.current))};return r.addEventListener("animationstart",_),r.addEventListener("animationcancel",x),r.addEventListener("animationend",x),()=>{S.clearTimeout(h),r.removeEventListener("animationstart",_),r.removeEventListener("animationcancel",x),r.removeEventListener("animationend",x)}}else b("ANIMATION_END")},[r,b]),{isPresent:["mounted","unmountSuspended"].includes(p),ref:g.useCallback(h=>{c.current=h?getComputedStyle(h):null,o(h)},[])}}function Pr(l){return l?.animationName||"none"}function US(l){let r=Object.getOwnPropertyDescriptor(l.props,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?l.ref:(r=Object.getOwnPropertyDescriptor(l,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning,o?l.props.ref:l.props.ref||l.ref)}var Ko=0;function BS(){g.useEffect(()=>{const l=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",l[0]??fp()),document.body.insertAdjacentElement("beforeend",l[1]??fp()),Ko++,()=>{Ko===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(r=>r.remove()),Ko--}},[])}function fp(){const l=document.createElement("span");return l.setAttribute("data-radix-focus-guard",""),l.tabIndex=0,l.style.outline="none",l.style.opacity="0",l.style.position="fixed",l.style.pointerEvents="none",l}var Wt=function(){return Wt=Object.assign||function(r){for(var o,c=1,s=arguments.length;c<s;c++){o=arguments[c];for(var f in o)Object.prototype.hasOwnProperty.call(o,f)&&(r[f]=o[f])}return r},Wt.apply(this,arguments)};function Eg(l,r){var o={};for(var c in l)Object.prototype.hasOwnProperty.call(l,c)&&r.indexOf(c)<0&&(o[c]=l[c]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,c=Object.getOwnPropertySymbols(l);s<c.length;s++)r.indexOf(c[s])<0&&Object.prototype.propertyIsEnumerable.call(l,c[s])&&(o[c[s]]=l[c[s]]);return o}function HS(l,r,o){if(o||arguments.length===2)for(var c=0,s=r.length,f;c<s;c++)(f||!(c in r))&&(f||(f=Array.prototype.slice.call(r,0,c)),f[c]=r[c]);return l.concat(f||Array.prototype.slice.call(r))}var au="right-scroll-bar-position",nu="width-before-scroll-bar",kS="with-scroll-bars-hidden",qS="--removed-body-scroll-bar-size";function Po(l,r){return typeof l=="function"?l(r):l&&(l.current=r),l}function QS(l,r){var o=g.useState(function(){return{value:l,callback:r,facade:{get current(){return o.value},set current(c){var s=o.value;s!==c&&(o.value=c,o.callback(c,s))}}}})[0];return o.callback=r,o.facade}var GS=typeof window<"u"?g.useLayoutEffect:g.useEffect,dp=new WeakMap;function YS(l,r){var o=QS(null,function(c){return l.forEach(function(s){return Po(s,c)})});return GS(function(){var c=dp.get(o);if(c){var s=new Set(c),f=new Set(l),m=o.current;s.forEach(function(p){f.has(p)||Po(p,null)}),f.forEach(function(p){s.has(p)||Po(p,m)})}dp.set(o,l)},[l]),o}function VS(l){return l}function XS(l,r){r===void 0&&(r=VS);var o=[],c=!1,s={read:function(){if(c)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return o.length?o[o.length-1]:l},useMedium:function(f){var m=r(f,c);return o.push(m),function(){o=o.filter(function(p){return p!==m})}},assignSyncMedium:function(f){for(c=!0;o.length;){var m=o;o=[],m.forEach(f)}o={push:function(p){return f(p)},filter:function(){return o}}},assignMedium:function(f){c=!0;var m=[];if(o.length){var p=o;o=[],p.forEach(f),m=o}var b=function(){var S=m;m=[],S.forEach(f)},h=function(){return Promise.resolve().then(b)};h(),o={push:function(S){m.push(S),h()},filter:function(S){return m=m.filter(S),o}}}};return s}function FS(l){l===void 0&&(l={});var r=XS(null);return r.options=Wt({async:!0,ssr:!1},l),r}var Ag=function(l){var r=l.sideCar,o=Eg(l,["sideCar"]);if(!r)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var c=r.read();if(!c)throw new Error("Sidecar medium not found");return g.createElement(c,Wt({},o))};Ag.isSideCarExport=!0;function ZS(l,r){return l.useMedium(r),Ag}var Cg=FS(),Jo=function(){},mu=g.forwardRef(function(l,r){var o=g.useRef(null),c=g.useState({onScrollCapture:Jo,onWheelCapture:Jo,onTouchMoveCapture:Jo}),s=c[0],f=c[1],m=l.forwardProps,p=l.children,b=l.className,h=l.removeScrollBar,S=l.enabled,x=l.shards,_=l.sideCar,U=l.noRelative,D=l.noIsolation,R=l.inert,C=l.allowPinchZoom,H=l.as,V=H===void 0?"div":H,k=l.gapMode,G=Eg(l,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),P=_,te=YS([o,r]),Z=Wt(Wt({},G),s);return g.createElement(g.Fragment,null,S&&g.createElement(P,{sideCar:Cg,removeScrollBar:h,shards:x,noRelative:U,noIsolation:D,inert:R,setCallbacks:f,allowPinchZoom:!!C,lockRef:o,gapMode:k}),m?g.cloneElement(g.Children.only(p),Wt(Wt({},Z),{ref:te})):g.createElement(V,Wt({},Z,{className:b,ref:te}),p))});mu.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};mu.classNames={fullWidth:nu,zeroRight:au};var KS=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function PS(){if(!document)return null;var l=document.createElement("style");l.type="text/css";var r=KS();return r&&l.setAttribute("nonce",r),l}function JS(l,r){l.styleSheet?l.styleSheet.cssText=r:l.appendChild(document.createTextNode(r))}function $S(l){var r=document.head||document.getElementsByTagName("head")[0];r.appendChild(l)}var WS=function(){var l=0,r=null;return{add:function(o){l==0&&(r=PS())&&(JS(r,o),$S(r)),l++},remove:function(){l--,!l&&r&&(r.parentNode&&r.parentNode.removeChild(r),r=null)}}},IS=function(){var l=WS();return function(r,o){g.useEffect(function(){return l.add(r),function(){l.remove()}},[r&&o])}},Tg=function(){var l=IS(),r=function(o){var c=o.styles,s=o.dynamic;return l(c,s),null};return r},e3={left:0,top:0,right:0,gap:0},$o=function(l){return parseInt(l||"",10)||0},t3=function(l){var r=window.getComputedStyle(document.body),o=r[l==="padding"?"paddingLeft":"marginLeft"],c=r[l==="padding"?"paddingTop":"marginTop"],s=r[l==="padding"?"paddingRight":"marginRight"];return[$o(o),$o(c),$o(s)]},a3=function(l){if(l===void 0&&(l="margin"),typeof window>"u")return e3;var r=t3(l),o=document.documentElement.clientWidth,c=window.innerWidth;return{left:r[0],top:r[1],right:r[2],gap:Math.max(0,c-o+r[2]-r[0])}},n3=Tg(),ml="data-scroll-locked",l3=function(l,r,o,c){var s=l.left,f=l.top,m=l.right,p=l.gap;return o===void 0&&(o="margin"),`
  .`.concat(kS,` {
   overflow: hidden `).concat(c,`;
   padding-right: `).concat(p,"px ").concat(c,`;
  }
  body[`).concat(ml,`] {
    overflow: hidden `).concat(c,`;
    overscroll-behavior: contain;
    `).concat([r&&"position: relative ".concat(c,";"),o==="margin"&&`
    padding-left: `.concat(s,`px;
    padding-top: `).concat(f,`px;
    padding-right: `).concat(m,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(p,"px ").concat(c,`;
    `),o==="padding"&&"padding-right: ".concat(p,"px ").concat(c,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(au,` {
    right: `).concat(p,"px ").concat(c,`;
  }
  
  .`).concat(nu,` {
    margin-right: `).concat(p,"px ").concat(c,`;
  }
  
  .`).concat(au," .").concat(au,` {
    right: 0 `).concat(c,`;
  }
  
  .`).concat(nu," .").concat(nu,` {
    margin-right: 0 `).concat(c,`;
  }
  
  body[`).concat(ml,`] {
    `).concat(qS,": ").concat(p,`px;
  }
`)},mp=function(){var l=parseInt(document.body.getAttribute(ml)||"0",10);return isFinite(l)?l:0},i3=function(){g.useEffect(function(){return document.body.setAttribute(ml,(mp()+1).toString()),function(){var l=mp()-1;l<=0?document.body.removeAttribute(ml):document.body.setAttribute(ml,l.toString())}},[])},r3=function(l){var r=l.noRelative,o=l.noImportant,c=l.gapMode,s=c===void 0?"margin":c;i3();var f=g.useMemo(function(){return a3(s)},[s]);return g.createElement(n3,{styles:l3(f,!r,s,o?"":"!important")})},rs=!1;if(typeof window<"u")try{var Jr=Object.defineProperty({},"passive",{get:function(){return rs=!0,!0}});window.addEventListener("test",Jr,Jr),window.removeEventListener("test",Jr,Jr)}catch{rs=!1}var ol=rs?{passive:!1}:!1,u3=function(l){return l.tagName==="TEXTAREA"},Rg=function(l,r){if(!(l instanceof Element))return!1;var o=window.getComputedStyle(l);return o[r]!=="hidden"&&!(o.overflowY===o.overflowX&&!u3(l)&&o[r]==="visible")},c3=function(l){return Rg(l,"overflowY")},o3=function(l){return Rg(l,"overflowX")},hp=function(l,r){var o=r.ownerDocument,c=r;do{typeof ShadowRoot<"u"&&c instanceof ShadowRoot&&(c=c.host);var s=Ng(l,c);if(s){var f=Dg(l,c),m=f[1],p=f[2];if(m>p)return!0}c=c.parentNode}while(c&&c!==o.body);return!1},s3=function(l){var r=l.scrollTop,o=l.scrollHeight,c=l.clientHeight;return[r,o,c]},f3=function(l){var r=l.scrollLeft,o=l.scrollWidth,c=l.clientWidth;return[r,o,c]},Ng=function(l,r){return l==="v"?c3(r):o3(r)},Dg=function(l,r){return l==="v"?s3(r):f3(r)},d3=function(l,r){return l==="h"&&r==="rtl"?-1:1},m3=function(l,r,o,c,s){var f=d3(l,window.getComputedStyle(r).direction),m=f*c,p=o.target,b=r.contains(p),h=!1,S=m>0,x=0,_=0;do{if(!p)break;var U=Dg(l,p),D=U[0],R=U[1],C=U[2],H=R-C-f*D;(D||H)&&Ng(l,p)&&(x+=H,_+=D);var V=p.parentNode;p=V&&V.nodeType===Node.DOCUMENT_FRAGMENT_NODE?V.host:V}while(!b&&p!==document.body||b&&(r.contains(p)||r===p));return(S&&Math.abs(x)<1||!S&&Math.abs(_)<1)&&(h=!0),h},$r=function(l){return"changedTouches"in l?[l.changedTouches[0].clientX,l.changedTouches[0].clientY]:[0,0]},pp=function(l){return[l.deltaX,l.deltaY]},gp=function(l){return l&&"current"in l?l.current:l},h3=function(l,r){return l[0]===r[0]&&l[1]===r[1]},p3=function(l){return`
  .block-interactivity-`.concat(l,` {pointer-events: none;}
  .allow-interactivity-`).concat(l,` {pointer-events: all;}
`)},g3=0,sl=[];function v3(l){var r=g.useRef([]),o=g.useRef([0,0]),c=g.useRef(),s=g.useState(g3++)[0],f=g.useState(Tg)[0],m=g.useRef(l);g.useEffect(function(){m.current=l},[l]),g.useEffect(function(){if(l.inert){document.body.classList.add("block-interactivity-".concat(s));var R=HS([l.lockRef.current],(l.shards||[]).map(gp),!0).filter(Boolean);return R.forEach(function(C){return C.classList.add("allow-interactivity-".concat(s))}),function(){document.body.classList.remove("block-interactivity-".concat(s)),R.forEach(function(C){return C.classList.remove("allow-interactivity-".concat(s))})}}},[l.inert,l.lockRef.current,l.shards]);var p=g.useCallback(function(R,C){if("touches"in R&&R.touches.length===2||R.type==="wheel"&&R.ctrlKey)return!m.current.allowPinchZoom;var H=$r(R),V=o.current,k="deltaX"in R?R.deltaX:V[0]-H[0],G="deltaY"in R?R.deltaY:V[1]-H[1],P,te=R.target,Z=Math.abs(k)>Math.abs(G)?"h":"v";if("touches"in R&&Z==="h"&&te.type==="range")return!1;var F=window.getSelection(),pe=F&&F.anchorNode,He=pe?pe===te||pe.contains(te):!1;if(He)return!1;var Le=hp(Z,te);if(!Le)return!0;if(Le?P=Z:(P=Z==="v"?"h":"v",Le=hp(Z,te)),!Le)return!1;if(!c.current&&"changedTouches"in R&&(k||G)&&(c.current=P),!P)return!0;var Oe=c.current||P;return m3(Oe,C,R,Oe==="h"?k:G)},[]),b=g.useCallback(function(R){var C=R;if(!(!sl.length||sl[sl.length-1]!==f)){var H="deltaY"in C?pp(C):$r(C),V=r.current.filter(function(P){return P.name===C.type&&(P.target===C.target||C.target===P.shadowParent)&&h3(P.delta,H)})[0];if(V&&V.should){C.cancelable&&C.preventDefault();return}if(!V){var k=(m.current.shards||[]).map(gp).filter(Boolean).filter(function(P){return P.contains(C.target)}),G=k.length>0?p(C,k[0]):!m.current.noIsolation;G&&C.cancelable&&C.preventDefault()}}},[]),h=g.useCallback(function(R,C,H,V){var k={name:R,delta:C,target:H,should:V,shadowParent:y3(H)};r.current.push(k),setTimeout(function(){r.current=r.current.filter(function(G){return G!==k})},1)},[]),S=g.useCallback(function(R){o.current=$r(R),c.current=void 0},[]),x=g.useCallback(function(R){h(R.type,pp(R),R.target,p(R,l.lockRef.current))},[]),_=g.useCallback(function(R){h(R.type,$r(R),R.target,p(R,l.lockRef.current))},[]);g.useEffect(function(){return sl.push(f),l.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:_}),document.addEventListener("wheel",b,ol),document.addEventListener("touchmove",b,ol),document.addEventListener("touchstart",S,ol),function(){sl=sl.filter(function(R){return R!==f}),document.removeEventListener("wheel",b,ol),document.removeEventListener("touchmove",b,ol),document.removeEventListener("touchstart",S,ol)}},[]);var U=l.removeScrollBar,D=l.inert;return g.createElement(g.Fragment,null,D?g.createElement(f,{styles:p3(s)}):null,U?g.createElement(r3,{noRelative:l.noRelative,gapMode:l.gapMode}):null)}function y3(l){for(var r=null;l!==null;)l instanceof ShadowRoot&&(r=l.host,l=l.host),l=l.parentNode;return r}const b3=ZS(Cg,v3);var _g=g.forwardRef(function(l,r){return g.createElement(mu,Wt({},l,{ref:r,sideCar:b3}))});_g.classNames=mu.classNames;var x3=function(l){if(typeof document>"u")return null;var r=Array.isArray(l)?l[0]:l;return r.ownerDocument.body},fl=new WeakMap,Wr=new WeakMap,Ir={},Wo=0,Og=function(l){return l&&(l.host||Og(l.parentNode))},S3=function(l,r){return r.map(function(o){if(l.contains(o))return o;var c=Og(o);return c&&l.contains(c)?c:(console.error("aria-hidden",o,"in not contained inside",l,". Doing nothing"),null)}).filter(function(o){return!!o})},E3=function(l,r,o,c){var s=S3(r,Array.isArray(l)?l:[l]);Ir[o]||(Ir[o]=new WeakMap);var f=Ir[o],m=[],p=new Set,b=new Set(s),h=function(x){!x||p.has(x)||(p.add(x),h(x.parentNode))};s.forEach(h);var S=function(x){!x||b.has(x)||Array.prototype.forEach.call(x.children,function(_){if(p.has(_))S(_);else try{var U=_.getAttribute(c),D=U!==null&&U!=="false",R=(fl.get(_)||0)+1,C=(f.get(_)||0)+1;fl.set(_,R),f.set(_,C),m.push(_),R===1&&D&&Wr.set(_,!0),C===1&&_.setAttribute(o,"true"),D||_.setAttribute(c,"true")}catch(H){console.error("aria-hidden: cannot operate on ",_,H)}})};return S(r),p.clear(),Wo++,function(){m.forEach(function(x){var _=fl.get(x)-1,U=f.get(x)-1;fl.set(x,_),f.set(x,U),_||(Wr.has(x)||x.removeAttribute(c),Wr.delete(x)),U||x.removeAttribute(o)}),Wo--,Wo||(fl=new WeakMap,fl=new WeakMap,Wr=new WeakMap,Ir={})}},A3=function(l,r,o){o===void 0&&(o="data-aria-hidden");var c=Array.from(Array.isArray(l)?l:[l]),s=x3(l);return s?(c.push.apply(c,Array.from(s.querySelectorAll("[aria-live], script"))),E3(c,s,o,"aria-hidden")):function(){return null}};function C3(l){const r=T3(l),o=g.forwardRef((c,s)=>{const{children:f,...m}=c,p=g.Children.toArray(f),b=p.find(N3);if(b){const h=b.props.children,S=p.map(x=>x===b?g.Children.count(h)>1?g.Children.only(null):g.isValidElement(h)?h.props.children:null:x);return y.jsx(r,{...m,ref:s,children:g.isValidElement(h)?g.cloneElement(h,void 0,S):null})}return y.jsx(r,{...m,ref:s,children:f})});return o.displayName=`${l}.Slot`,o}function T3(l){const r=g.forwardRef((o,c)=>{const{children:s,...f}=o;if(g.isValidElement(s)){const m=_3(s),p=D3(f,s.props);return s.type!==g.Fragment&&(p.ref=c?Ti(c,m):m),g.cloneElement(s,p)}return g.Children.count(s)>1?g.Children.only(null):null});return r.displayName=`${l}.SlotClone`,r}var R3=Symbol("radix.slottable");function N3(l){return g.isValidElement(l)&&typeof l.type=="function"&&"__radixId"in l.type&&l.type.__radixId===R3}function D3(l,r){const o={...r};for(const c in r){const s=l[c],f=r[c];/^on[A-Z]/.test(c)?s&&f?o[c]=(...p)=>{const b=f(...p);return s(...p),b}:s&&(o[c]=s):c==="style"?o[c]={...s,...f}:c==="className"&&(o[c]=[s,f].filter(Boolean).join(" "))}return{...l,...o}}function _3(l){let r=Object.getOwnPropertyDescriptor(l.props,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?l.ref:(r=Object.getOwnPropertyDescriptor(l,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning,o?l.props.ref:l.props.ref||l.ref)}var hu="Dialog",[Mg,jg]=Ri(hu),[O3,Ft]=Mg(hu),zg=l=>{const{__scopeDialog:r,children:o,open:c,defaultOpen:s,onOpenChange:f,modal:m=!0}=l,p=g.useRef(null),b=g.useRef(null),[h,S]=Cs({prop:c,defaultProp:s??!1,onChange:f,caller:hu});return y.jsx(O3,{scope:r,triggerRef:p,contentRef:b,contentId:xi(),titleId:xi(),descriptionId:xi(),open:h,onOpenChange:S,onOpenToggle:g.useCallback(()=>S(x=>!x),[S]),modal:m,children:o})};zg.displayName=hu;var wg="DialogTrigger",Lg=g.forwardRef((l,r)=>{const{__scopeDialog:o,...c}=l,s=Ft(wg,o),f=kt(r,s.triggerRef);return y.jsx(ct.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":Ns(s.open),...c,ref:f,onClick:We(l.onClick,s.onOpenToggle)})});Lg.displayName=wg;var Ts="DialogPortal",[M3,Ug]=Mg(Ts,{forceMount:void 0}),Bg=l=>{const{__scopeDialog:r,forceMount:o,children:c,container:s}=l,f=Ft(Ts,r);return y.jsx(M3,{scope:r,forceMount:o,children:g.Children.map(c,m=>y.jsx(Ni,{present:o||f.open,children:y.jsx(Sg,{asChild:!0,container:s,children:m})}))})};Bg.displayName=Ts;var cu="DialogOverlay",Hg=g.forwardRef((l,r)=>{const o=Ug(cu,l.__scopeDialog),{forceMount:c=o.forceMount,...s}=l,f=Ft(cu,l.__scopeDialog);return f.modal?y.jsx(Ni,{present:c||f.open,children:y.jsx(z3,{...s,ref:r})}):null});Hg.displayName=cu;var j3=C3("DialogOverlay.RemoveScroll"),z3=g.forwardRef((l,r)=>{const{__scopeDialog:o,...c}=l,s=Ft(cu,o);return y.jsx(_g,{as:j3,allowPinchZoom:!0,shards:[s.contentRef],children:y.jsx(ct.div,{"data-state":Ns(s.open),...c,ref:r,style:{pointerEvents:"auto",...c.style}})})}),En="DialogContent",kg=g.forwardRef((l,r)=>{const o=Ug(En,l.__scopeDialog),{forceMount:c=o.forceMount,...s}=l,f=Ft(En,l.__scopeDialog);return y.jsx(Ni,{present:c||f.open,children:f.modal?y.jsx(w3,{...s,ref:r}):y.jsx(L3,{...s,ref:r})})});kg.displayName=En;var w3=g.forwardRef((l,r)=>{const o=Ft(En,l.__scopeDialog),c=g.useRef(null),s=kt(r,o.contentRef,c);return g.useEffect(()=>{const f=c.current;if(f)return A3(f)},[]),y.jsx(qg,{...l,ref:s,trapFocus:o.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:We(l.onCloseAutoFocus,f=>{f.preventDefault(),o.triggerRef.current?.focus()}),onPointerDownOutside:We(l.onPointerDownOutside,f=>{const m=f.detail.originalEvent,p=m.button===0&&m.ctrlKey===!0;(m.button===2||p)&&f.preventDefault()}),onFocusOutside:We(l.onFocusOutside,f=>f.preventDefault())})}),L3=g.forwardRef((l,r)=>{const o=Ft(En,l.__scopeDialog),c=g.useRef(!1),s=g.useRef(!1);return y.jsx(qg,{...l,ref:r,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:f=>{l.onCloseAutoFocus?.(f),f.defaultPrevented||(c.current||o.triggerRef.current?.focus(),f.preventDefault()),c.current=!1,s.current=!1},onInteractOutside:f=>{l.onInteractOutside?.(f),f.defaultPrevented||(c.current=!0,f.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const m=f.target;o.triggerRef.current?.contains(m)&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&s.current&&f.preventDefault()}})}),qg=g.forwardRef((l,r)=>{const{__scopeDialog:o,trapFocus:c,onOpenAutoFocus:s,onCloseAutoFocus:f,...m}=l,p=Ft(En,o),b=g.useRef(null),h=kt(r,b);return BS(),y.jsxs(y.Fragment,{children:[y.jsx(bg,{asChild:!0,loop:!0,trapped:c,onMountAutoFocus:s,onUnmountAutoFocus:f,children:y.jsx(vg,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionId,"aria-labelledby":p.titleId,"data-state":Ns(p.open),...m,ref:h,onDismiss:()=>p.onOpenChange(!1)})}),y.jsxs(y.Fragment,{children:[y.jsx(B3,{titleId:p.titleId}),y.jsx(k3,{contentRef:b,descriptionId:p.descriptionId})]})]})}),Rs="DialogTitle",Qg=g.forwardRef((l,r)=>{const{__scopeDialog:o,...c}=l,s=Ft(Rs,o);return y.jsx(ct.h2,{id:s.titleId,...c,ref:r})});Qg.displayName=Rs;var Gg="DialogDescription",Yg=g.forwardRef((l,r)=>{const{__scopeDialog:o,...c}=l,s=Ft(Gg,o);return y.jsx(ct.p,{id:s.descriptionId,...c,ref:r})});Yg.displayName=Gg;var Vg="DialogClose",Xg=g.forwardRef((l,r)=>{const{__scopeDialog:o,...c}=l,s=Ft(Vg,o);return y.jsx(ct.button,{type:"button",...c,ref:r,onClick:We(l.onClick,()=>s.onOpenChange(!1))})});Xg.displayName=Vg;function Ns(l){return l?"open":"closed"}var Fg="DialogTitleWarning",[U3,Zg]=nS(Fg,{contentName:En,titleName:Rs,docsSlug:"dialog"}),B3=({titleId:l})=>{const r=Zg(Fg),o=`\`${r.contentName}\` requires a \`${r.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${r.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${r.docsSlug}`;return g.useEffect(()=>{l&&(document.getElementById(l)||console.error(o))},[o,l]),null},H3="DialogDescriptionWarning",k3=({contentRef:l,descriptionId:r})=>{const c=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Zg(H3).contentName}}.`;return g.useEffect(()=>{const s=l.current?.getAttribute("aria-describedby");r&&s&&(document.getElementById(r)||console.warn(c))},[c,l,r]),null},q3=zg,Q3=Lg,G3=Bg,Y3=Hg,V3=kg,X3=Qg,F3=Yg,Kg=Xg,Z3=Symbol("radix.slottable");function K3(l){const r=({children:o})=>y.jsx(y.Fragment,{children:o});return r.displayName=`${l}.Slottable`,r.__radixId=Z3,r}var Pg="AlertDialog",[P3]=Ri(Pg,[jg]),Sa=jg(),Jg=l=>{const{__scopeAlertDialog:r,...o}=l,c=Sa(r);return y.jsx(q3,{...c,...o,modal:!0})};Jg.displayName=Pg;var J3="AlertDialogTrigger",$g=g.forwardRef((l,r)=>{const{__scopeAlertDialog:o,...c}=l,s=Sa(o);return y.jsx(Q3,{...s,...c,ref:r})});$g.displayName=J3;var $3="AlertDialogPortal",Wg=l=>{const{__scopeAlertDialog:r,...o}=l,c=Sa(r);return y.jsx(G3,{...c,...o})};Wg.displayName=$3;var W3="AlertDialogOverlay",Ig=g.forwardRef((l,r)=>{const{__scopeAlertDialog:o,...c}=l,s=Sa(o);return y.jsx(Y3,{...s,...c,ref:r})});Ig.displayName=W3;var hl="AlertDialogContent",[I3,eE]=P3(hl),tE=K3("AlertDialogContent"),e0=g.forwardRef((l,r)=>{const{__scopeAlertDialog:o,children:c,...s}=l,f=Sa(o),m=g.useRef(null),p=kt(r,m),b=g.useRef(null);return y.jsx(U3,{contentName:hl,titleName:t0,docsSlug:"alert-dialog",children:y.jsx(I3,{scope:o,cancelRef:b,children:y.jsxs(V3,{role:"alertdialog",...f,...s,ref:p,onOpenAutoFocus:We(s.onOpenAutoFocus,h=>{h.preventDefault(),b.current?.focus({preventScroll:!0})}),onPointerDownOutside:h=>h.preventDefault(),onInteractOutside:h=>h.preventDefault(),children:[y.jsx(tE,{children:c}),y.jsx(nE,{contentRef:m})]})})})});e0.displayName=hl;var t0="AlertDialogTitle",a0=g.forwardRef((l,r)=>{const{__scopeAlertDialog:o,...c}=l,s=Sa(o);return y.jsx(X3,{...s,...c,ref:r})});a0.displayName=t0;var n0="AlertDialogDescription",l0=g.forwardRef((l,r)=>{const{__scopeAlertDialog:o,...c}=l,s=Sa(o);return y.jsx(F3,{...s,...c,ref:r})});l0.displayName=n0;var aE="AlertDialogAction",i0=g.forwardRef((l,r)=>{const{__scopeAlertDialog:o,...c}=l,s=Sa(o);return y.jsx(Kg,{...s,...c,ref:r})});i0.displayName=aE;var r0="AlertDialogCancel",u0=g.forwardRef((l,r)=>{const{__scopeAlertDialog:o,...c}=l,{cancelRef:s}=eE(r0,o),f=Sa(o),m=kt(r,s);return y.jsx(Kg,{...f,...c,ref:m})});u0.displayName=r0;var nE=({contentRef:l})=>{const r=`\`${hl}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${hl}\` by passing a \`${n0}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${hl}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;return g.useEffect(()=>{document.getElementById(l.current?.getAttribute("aria-describedby"))||console.warn(r)},[r,l]),null},lE=Jg,iE=$g,rE=Wg,uE=Ig,cE=e0,oE=i0,sE=u0,fE=a0,dE=l0;function mE({...l}){return y.jsx(lE,{"code-path":"src/components/ui/alert-dialog.tsx:10:10","data-slot":"alert-dialog",...l})}function hE({...l}){return y.jsx(iE,{"code-path":"src/components/ui/alert-dialog.tsx:17:5","data-slot":"alert-dialog-trigger",...l})}function pE({...l}){return y.jsx(rE,{"code-path":"src/components/ui/alert-dialog.tsx:25:5","data-slot":"alert-dialog-portal",...l})}function gE({className:l,...r}){return y.jsx(uE,{"code-path":"src/components/ui/alert-dialog.tsx:34:5","data-slot":"alert-dialog-overlay",className:Te("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",l),...r})}function vE({className:l,...r}){return y.jsxs(pE,{"code-path":"src/components/ui/alert-dialog.tsx:50:5",children:[y.jsx(gE,{"code-path":"src/components/ui/alert-dialog.tsx:51:7"}),y.jsx(cE,{"code-path":"src/components/ui/alert-dialog.tsx:52:7","data-slot":"alert-dialog-content",className:Te("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",l),...r})]})}function yE({className:l,...r}){return y.jsx("div",{"code-path":"src/components/ui/alert-dialog.tsx:69:5","data-slot":"alert-dialog-header",className:Te("flex flex-col gap-2 text-center sm:text-left",l),...r})}function bE({className:l,...r}){return y.jsx("div",{"code-path":"src/components/ui/alert-dialog.tsx:82:5","data-slot":"alert-dialog-footer",className:Te("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",l),...r})}function xE({className:l,...r}){return y.jsx(fE,{"code-path":"src/components/ui/alert-dialog.tsx:98:5","data-slot":"alert-dialog-title",className:Te("text-lg font-semibold",l),...r})}function SE({className:l,...r}){return y.jsx(dE,{"code-path":"src/components/ui/alert-dialog.tsx:111:5","data-slot":"alert-dialog-description",className:Te("text-muted-foreground text-sm",l),...r})}function EE({className:l,...r}){return y.jsx(oE,{"code-path":"src/components/ui/alert-dialog.tsx:124:5",className:Te(du(),l),...r})}function AE({className:l,...r}){return y.jsx(sE,{"code-path":"src/components/ui/alert-dialog.tsx:136:5",className:Te(du({variant:"outline"}),l),...r})}const Io=10;function CE(){const l=An(),{fabrics:r,deleteFabric:o}=xs(),{user:c}=xl(),s=c?.role==="admin",[f,m]=g.useState(""),[p,b]=g.useState(1),h=r.filter(D=>D.name.toLowerCase().includes(f.toLowerCase())||D.subtitle.toLowerCase().includes(f.toLowerCase())||D.category.toLowerCase().includes(f.toLowerCase())),S=Math.ceil(h.length/Io),x=(p-1)*Io,_=h.slice(x,x+Io),U=D=>{o(D)};return y.jsxs("div",{"code-path":"src/pages/FabricListPage.tsx:67:5",className:"space-y-6",children:[y.jsxs("div",{"code-path":"src/pages/FabricListPage.tsx:69:7",className:"flex items-center justify-between",children:[y.jsxs("div",{"code-path":"src/pages/FabricListPage.tsx:70:9",children:[y.jsx("h2",{"code-path":"src/pages/FabricListPage.tsx:71:11",className:"text-2xl font-bold text-gray-900",children:"面料知识培训"}),y.jsxs("p",{"code-path":"src/pages/FabricListPage.tsx:72:11",className:"text-gray-500 mt-1",children:["共 ",r.length," 种面料"]})]}),s&&y.jsxs(ba,{"code-path":"src/pages/FabricListPage.tsx:75:11",onClick:()=>l("/fabric-training/new"),className:"bg-blue-600 hover:bg-blue-700",children:[y.jsx(C2,{"code-path":"src/pages/FabricListPage.tsx:79:13",className:"w-4 h-4 mr-2"}),"新增面料"]})]}),y.jsxs("div",{"code-path":"src/pages/FabricListPage.tsx:86:7",className:"relative",children:[y.jsx(D2,{"code-path":"src/pages/FabricListPage.tsx:87:9",className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),y.jsx(dl,{"code-path":"src/pages/FabricListPage.tsx:88:9",placeholder:"搜索面料名称、描述或分类...",value:f,onChange:D=>{m(D.target.value),b(1)},className:"pl-10 h-11"})]}),y.jsx("div",{"code-path":"src/pages/FabricListPage.tsx:100:7",className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:_.map(D=>y.jsxs(bn,{"code-path":"src/pages/FabricListPage.tsx:102:11",className:"group cursor-pointer hover:shadow-lg transition-shadow border-gray-200",onClick:()=>l(`/fabric-training/${D.id}`),children:[y.jsx(pl,{"code-path":"src/pages/FabricListPage.tsx:107:13",className:"pb-3",children:y.jsxs("div",{"code-path":"src/pages/FabricListPage.tsx:108:15",className:"flex items-start justify-between",children:[y.jsx("div",{"code-path":"src/pages/FabricListPage.tsx:109:17",className:"w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0",children:y.jsx(lp,{"code-path":"src/pages/FabricListPage.tsx:110:19",className:"w-5 h-5 text-blue-600"})}),s&&y.jsxs("div",{"code-path":"src/pages/FabricListPage.tsx:113:19",className:"flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",onClick:R=>R.stopPropagation(),children:[y.jsx(ba,{"code-path":"src/pages/FabricListPage.tsx:117:21",variant:"ghost",size:"icon",className:"h-8 w-8",onClick:()=>l(`/fabric-training/${D.id}/edit`),children:y.jsx(hg,{"code-path":"src/pages/FabricListPage.tsx:125:23",className:"w-4 h-4 text-gray-500"})}),y.jsxs(mE,{"code-path":"src/pages/FabricListPage.tsx:127:21",children:[y.jsx(hE,{"code-path":"src/pages/FabricListPage.tsx:128:23",asChild:!0,children:y.jsx(ba,{"code-path":"src/pages/FabricListPage.tsx:129:25",variant:"ghost",size:"icon",className:"h-8 w-8",children:y.jsx(z2,{"code-path":"src/pages/FabricListPage.tsx:130:27",className:"w-4 h-4 text-red-500"})})}),y.jsxs(vE,{"code-path":"src/pages/FabricListPage.tsx:133:23",children:[y.jsxs(yE,{"code-path":"src/pages/FabricListPage.tsx:134:25",children:[y.jsx(xE,{"code-path":"src/pages/FabricListPage.tsx:135:27",children:"确认删除"}),y.jsxs(SE,{"code-path":"src/pages/FabricListPage.tsx:136:27",children:['您确定要删除"',D.name,'"吗？此操作无法撤销。']})]}),y.jsxs(bE,{"code-path":"src/pages/FabricListPage.tsx:140:25",children:[y.jsx(AE,{"code-path":"src/pages/FabricListPage.tsx:141:27",children:"取消"}),y.jsx(EE,{"code-path":"src/pages/FabricListPage.tsx:142:27",onClick:()=>U(D.id),className:"bg-red-600 hover:bg-red-700",children:"删除"})]})]})]})]})]})}),y.jsxs(Sn,{"code-path":"src/pages/FabricListPage.tsx:155:13",className:"pt-0",children:[y.jsx(xn,{"code-path":"src/pages/FabricListPage.tsx:156:15",className:"text-base font-semibold text-gray-900 line-clamp-1 mb-1",children:D.name}),y.jsxs("p",{"code-path":"src/pages/FabricListPage.tsx:159:15",className:"text-xs text-gray-500 mb-2",children:["序号 ",D.order]}),y.jsx("p",{"code-path":"src/pages/FabricListPage.tsx:160:15",className:"text-sm text-gray-600 line-clamp-2 mb-3",children:D.subtitle}),y.jsxs("div",{"code-path":"src/pages/FabricListPage.tsx:163:15",className:"flex items-center justify-between",children:[y.jsx("span",{"code-path":"src/pages/FabricListPage.tsx:164:17",className:"inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700",children:D.category}),y.jsx(mg,{"code-path":"src/pages/FabricListPage.tsx:167:17",className:"w-4 h-4 text-gray-400"})]})]})]},D.id))}),_.length===0&&y.jsxs("div",{"code-path":"src/pages/FabricListPage.tsx:176:9",className:"text-center py-12",children:[y.jsx(lp,{"code-path":"src/pages/FabricListPage.tsx:177:11",className:"w-12 h-12 text-gray-300 mx-auto mb-4"}),y.jsx("p",{"code-path":"src/pages/FabricListPage.tsx:178:11",className:"text-gray-500",children:"没有找到匹配的面料"})]}),S>1&&y.jsx(I2,{"code-path":"src/pages/FabricListPage.tsx:184:9",children:y.jsxs(eS,{"code-path":"src/pages/FabricListPage.tsx:185:11",children:[y.jsx(Xo,{"code-path":"src/pages/FabricListPage.tsx:186:13",children:y.jsx(tS,{"code-path":"src/pages/FabricListPage.tsx:187:15",onClick:()=>b(D=>Math.max(1,D-1)),className:p===1?"pointer-events-none opacity-50":""})}),Array.from({length:S},(D,R)=>R+1).map(D=>y.jsx(Xo,{"code-path":"src/pages/FabricListPage.tsx:195:15",children:y.jsx(As,{"code-path":"src/pages/FabricListPage.tsx:196:17",onClick:()=>b(D),isActive:p===D,children:D})},D)),y.jsx(Xo,{"code-path":"src/pages/FabricListPage.tsx:204:13",children:y.jsx(aS,{"code-path":"src/pages/FabricListPage.tsx:205:15",onClick:()=>b(D=>Math.min(S,D+1)),className:p===S?"pointer-events-none opacity-50":""})})]})}),y.jsxs("div",{"code-path":"src/pages/FabricListPage.tsx:221:7",className:"text-center text-sm text-gray-500",children:["第 ",p," / ",S||1," 页，共 ",h.length," 条"]})]})}function vp(l){const r=TE(l),o=g.forwardRef((c,s)=>{const{children:f,...m}=c,p=g.Children.toArray(f),b=p.find(NE);if(b){const h=b.props.children,S=p.map(x=>x===b?g.Children.count(h)>1?g.Children.only(null):g.isValidElement(h)?h.props.children:null:x);return y.jsx(r,{...m,ref:s,children:g.isValidElement(h)?g.cloneElement(h,void 0,S):null})}return y.jsx(r,{...m,ref:s,children:f})});return o.displayName=`${l}.Slot`,o}function TE(l){const r=g.forwardRef((o,c)=>{const{children:s,...f}=o;if(g.isValidElement(s)){const m=_E(s),p=DE(f,s.props);return s.type!==g.Fragment&&(p.ref=c?Ti(c,m):m),g.cloneElement(s,p)}return g.Children.count(s)>1?g.Children.only(null):null});return r.displayName=`${l}.SlotClone`,r}var RE=Symbol("radix.slottable");function NE(l){return g.isValidElement(l)&&typeof l.type=="function"&&"__radixId"in l.type&&l.type.__radixId===RE}function DE(l,r){const o={...r};for(const c in r){const s=l[c],f=r[c];/^on[A-Z]/.test(c)?s&&f?o[c]=(...p)=>{const b=f(...p);return s(...p),b}:s&&(o[c]=s):c==="style"?o[c]={...s,...f}:c==="className"&&(o[c]=[s,f].filter(Boolean).join(" "))}return{...l,...o}}function _E(l){let r=Object.getOwnPropertyDescriptor(l.props,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?l.ref:(r=Object.getOwnPropertyDescriptor(l,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning,o?l.props.ref:l.props.ref||l.ref)}function OE(l){const r=l+"CollectionProvider",[o,c]=Ri(r),[s,f]=o(r,{collectionRef:{current:null},itemMap:new Map}),m=R=>{const{scope:C,children:H}=R,V=Ht.useRef(null),k=Ht.useRef(new Map).current;return y.jsx(s,{scope:C,itemMap:k,collectionRef:V,children:H})};m.displayName=r;const p=l+"CollectionSlot",b=vp(p),h=Ht.forwardRef((R,C)=>{const{scope:H,children:V}=R,k=f(p,H),G=kt(C,k.collectionRef);return y.jsx(b,{ref:G,children:V})});h.displayName=p;const S=l+"CollectionItemSlot",x="data-radix-collection-item",_=vp(S),U=Ht.forwardRef((R,C)=>{const{scope:H,children:V,...k}=R,G=Ht.useRef(null),P=kt(C,G),te=f(S,H);return Ht.useEffect(()=>(te.itemMap.set(G,{ref:G,...k}),()=>{te.itemMap.delete(G)})),y.jsx(_,{[x]:"",ref:P,children:V})});U.displayName=S;function D(R){const C=f(l+"CollectionConsumer",R);return Ht.useCallback(()=>{const V=C.collectionRef.current;if(!V)return[];const k=Array.from(V.querySelectorAll(`[${x}]`));return Array.from(C.itemMap.values()).sort((te,Z)=>k.indexOf(te.ref.current)-k.indexOf(Z.ref.current))},[C.collectionRef,C.itemMap])}return[{Provider:m,Slot:h,ItemSlot:U},D,c]}var ME=g.createContext(void 0);function c0(l){const r=g.useContext(ME);return l||r||"ltr"}var es="rovingFocusGroup.onEntryFocus",jE={bubbles:!1,cancelable:!0},Di="RovingFocusGroup",[us,o0,zE]=OE(Di),[wE,s0]=Ri(Di,[zE]),[LE,UE]=wE(Di),f0=g.forwardRef((l,r)=>y.jsx(us.Provider,{scope:l.__scopeRovingFocusGroup,children:y.jsx(us.Slot,{scope:l.__scopeRovingFocusGroup,children:y.jsx(BE,{...l,ref:r})})}));f0.displayName=Di;var BE=g.forwardRef((l,r)=>{const{__scopeRovingFocusGroup:o,orientation:c,loop:s=!1,dir:f,currentTabStopId:m,defaultCurrentTabStopId:p,onCurrentTabStopIdChange:b,onEntryFocus:h,preventScrollOnEntryFocus:S=!1,...x}=l,_=g.useRef(null),U=kt(r,_),D=c0(f),[R,C]=Cs({prop:m,defaultProp:p??null,onChange:b,caller:Di}),[H,V]=g.useState(!1),k=gl(h),G=o0(o),P=g.useRef(!1),[te,Z]=g.useState(0);return g.useEffect(()=>{const F=_.current;if(F)return F.addEventListener(es,k),()=>F.removeEventListener(es,k)},[k]),y.jsx(LE,{scope:o,orientation:c,dir:D,loop:s,currentTabStopId:R,onItemFocus:g.useCallback(F=>C(F),[C]),onItemShiftTab:g.useCallback(()=>V(!0),[]),onFocusableItemAdd:g.useCallback(()=>Z(F=>F+1),[]),onFocusableItemRemove:g.useCallback(()=>Z(F=>F-1),[]),children:y.jsx(ct.div,{tabIndex:H||te===0?-1:0,"data-orientation":c,...x,ref:U,style:{outline:"none",...l.style},onMouseDown:We(l.onMouseDown,()=>{P.current=!0}),onFocus:We(l.onFocus,F=>{const pe=!P.current;if(F.target===F.currentTarget&&pe&&!H){const He=new CustomEvent(es,jE);if(F.currentTarget.dispatchEvent(He),!He.defaultPrevented){const Le=G().filter(z=>z.focusable),Oe=Le.find(z=>z.active),rt=Le.find(z=>z.id===R),Ee=[Oe,rt,...Le].filter(Boolean).map(z=>z.ref.current);h0(Ee,S)}}P.current=!1}),onBlur:We(l.onBlur,()=>V(!1))})})}),d0="RovingFocusGroupItem",m0=g.forwardRef((l,r)=>{const{__scopeRovingFocusGroup:o,focusable:c=!0,active:s=!1,tabStopId:f,children:m,...p}=l,b=xi(),h=f||b,S=UE(d0,o),x=S.currentTabStopId===h,_=o0(o),{onFocusableItemAdd:U,onFocusableItemRemove:D,currentTabStopId:R}=S;return g.useEffect(()=>{if(c)return U(),()=>D()},[c,U,D]),y.jsx(us.ItemSlot,{scope:o,id:h,focusable:c,active:s,children:y.jsx(ct.span,{tabIndex:x?0:-1,"data-orientation":S.orientation,...p,ref:r,onMouseDown:We(l.onMouseDown,C=>{c?S.onItemFocus(h):C.preventDefault()}),onFocus:We(l.onFocus,()=>S.onItemFocus(h)),onKeyDown:We(l.onKeyDown,C=>{if(C.key==="Tab"&&C.shiftKey){S.onItemShiftTab();return}if(C.target!==C.currentTarget)return;const H=qE(C,S.orientation,S.dir);if(H!==void 0){if(C.metaKey||C.ctrlKey||C.altKey||C.shiftKey)return;C.preventDefault();let k=_().filter(G=>G.focusable).map(G=>G.ref.current);if(H==="last")k.reverse();else if(H==="prev"||H==="next"){H==="prev"&&k.reverse();const G=k.indexOf(C.currentTarget);k=S.loop?QE(k,G+1):k.slice(G+1)}setTimeout(()=>h0(k))}}),children:typeof m=="function"?m({isCurrentTabStop:x,hasTabStop:R!=null}):m})})});m0.displayName=d0;var HE={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function kE(l,r){return r!=="rtl"?l:l==="ArrowLeft"?"ArrowRight":l==="ArrowRight"?"ArrowLeft":l}function qE(l,r,o){const c=kE(l.key,o);if(!(r==="vertical"&&["ArrowLeft","ArrowRight"].includes(c))&&!(r==="horizontal"&&["ArrowUp","ArrowDown"].includes(c)))return HE[c]}function h0(l,r=!1){const o=document.activeElement;for(const c of l)if(c===o||(c.focus({preventScroll:r}),document.activeElement!==o))return}function QE(l,r){return l.map((o,c)=>l[(r+c)%l.length])}var GE=f0,YE=m0,pu="Tabs",[VE]=Ri(pu,[s0]),p0=s0(),[XE,Ds]=VE(pu),g0=g.forwardRef((l,r)=>{const{__scopeTabs:o,value:c,onValueChange:s,defaultValue:f,orientation:m="horizontal",dir:p,activationMode:b="automatic",...h}=l,S=c0(p),[x,_]=Cs({prop:c,onChange:s,defaultProp:f??"",caller:pu});return y.jsx(XE,{scope:o,baseId:xi(),value:x,onValueChange:_,orientation:m,dir:S,activationMode:b,children:y.jsx(ct.div,{dir:S,"data-orientation":m,...h,ref:r})})});g0.displayName=pu;var v0="TabsList",y0=g.forwardRef((l,r)=>{const{__scopeTabs:o,loop:c=!0,...s}=l,f=Ds(v0,o),m=p0(o);return y.jsx(GE,{asChild:!0,...m,orientation:f.orientation,dir:f.dir,loop:c,children:y.jsx(ct.div,{role:"tablist","aria-orientation":f.orientation,...s,ref:r})})});y0.displayName=v0;var b0="TabsTrigger",x0=g.forwardRef((l,r)=>{const{__scopeTabs:o,value:c,disabled:s=!1,...f}=l,m=Ds(b0,o),p=p0(o),b=A0(m.baseId,c),h=C0(m.baseId,c),S=c===m.value;return y.jsx(YE,{asChild:!0,...p,focusable:!s,active:S,children:y.jsx(ct.button,{type:"button",role:"tab","aria-selected":S,"aria-controls":h,"data-state":S?"active":"inactive","data-disabled":s?"":void 0,disabled:s,id:b,...f,ref:r,onMouseDown:We(l.onMouseDown,x=>{!s&&x.button===0&&x.ctrlKey===!1?m.onValueChange(c):x.preventDefault()}),onKeyDown:We(l.onKeyDown,x=>{[" ","Enter"].includes(x.key)&&m.onValueChange(c)}),onFocus:We(l.onFocus,()=>{const x=m.activationMode!=="manual";!S&&!s&&x&&m.onValueChange(c)})})})});x0.displayName=b0;var S0="TabsContent",E0=g.forwardRef((l,r)=>{const{__scopeTabs:o,value:c,forceMount:s,children:f,...m}=l,p=Ds(S0,o),b=A0(p.baseId,c),h=C0(p.baseId,c),S=c===p.value,x=g.useRef(S);return g.useEffect(()=>{const _=requestAnimationFrame(()=>x.current=!1);return()=>cancelAnimationFrame(_)},[]),y.jsx(Ni,{present:s||S,children:({present:_})=>y.jsx(ct.div,{"data-state":S?"active":"inactive","data-orientation":p.orientation,role:"tabpanel","aria-labelledby":b,hidden:!_,id:h,tabIndex:0,...m,ref:r,style:{...l.style,animationDuration:x.current?"0s":void 0},children:_&&f})})});E0.displayName=S0;function A0(l,r){return`${l}-trigger-${r}`}function C0(l,r){return`${l}-content-${r}`}var FE=g0,ZE=y0,KE=x0,PE=E0;function T0({className:l,...r}){return y.jsx(FE,{"code-path":"src/components/ui/tabs.tsx:13:5","data-slot":"tabs",className:Te("flex flex-col gap-2",l),...r})}function R0({className:l,...r}){return y.jsx(ZE,{"code-path":"src/components/ui/tabs.tsx:26:5","data-slot":"tabs-list",className:Te("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",l),...r})}function cs({className:l,...r}){return y.jsx(KE,{"code-path":"src/components/ui/tabs.tsx:42:5","data-slot":"tabs-trigger",className:Te("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",l),...r})}function os({className:l,...r}){return y.jsx(PE,{"code-path":"src/components/ui/tabs.tsx:58:5","data-slot":"tabs-content",className:Te("flex-1 outline-none",l),...r})}const JE=Ss("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",secondary:"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",destructive:"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function $E({className:l,variant:r,asChild:o=!1,...c}){const s=o?Pp:"span";return y.jsx(s,{"code-path":"src/components/ui/badge.tsx:38:5","data-slot":"badge",className:Te(JE({variant:r}),l),...c})}const yp=[{id:"productCognition",label:"产品认知",icon:dg},{id:"salesScript",label:"销售话术",icon:E2},{id:"competitorComparison",label:"竞品对比",icon:e2},{id:"objectionHandling",label:"异议处理",icon:u2},{id:"practicalExercise",label:"实操演练",icon:h2},{id:"afterSales",label:"售后知识",icon:Q2},{id:"test",label:"课后测试",icon:o2}];function WE(){const{id:l}=Up(),r=An(),{fabrics:o}=xs(),{user:c}=xl(),s=c?.role==="admin",f=o.find(h=>h.id===l),[m,p]=g.useState("productCognition");if(g.useEffect(()=>{f||r("/fabric-training")},[f,r]),!f)return null;const b=h=>{if(!h)return y.jsx("p",{"code-path":"src/pages/FabricDetailPage.tsx:50:26",className:"text-gray-500",children:"暂无内容"});const S=h.split(`
`),x=[];let _=[],U=!1,D=[],R=!1;const C=()=>{_.length>0&&(x.push(y.jsx("div",{"code-path":"src/pages/FabricDetailPage.tsx:62:11",className:"overflow-x-auto my-4",children:y.jsx("table",{"code-path":"src/pages/FabricDetailPage.tsx:63:13",className:"min-w-full border-collapse border border-gray-200",children:y.jsx("tbody",{"code-path":"src/pages/FabricDetailPage.tsx:64:15",children:_.map((V,k)=>y.jsx("tr",{"code-path":"src/pages/FabricDetailPage.tsx:66:19",className:k===0?"bg-gray-50 font-medium":k%2===0?"bg-gray-50":"bg-white",children:V.map((G,P)=>y.jsx("td",{"code-path":"src/pages/FabricDetailPage.tsx:77:23",className:"border border-gray-200 px-3 py-2 text-sm",children:G},P))},k))})})},`table-${x.length}`)),_=[],U=!1)},H=()=>{D.length>0&&(x.push(y.jsx("ul",{"code-path":"src/pages/FabricDetailPage.tsx:98:11",className:"list-disc pl-5 space-y-1 my-3",children:D.map((V,k)=>y.jsx("li",{"code-path":"src/pages/FabricDetailPage.tsx:100:15",className:"text-gray-700",children:V},k))},`list-${x.length}`)),D=[],R=!1)};return S.forEach((V,k)=>{const G=V.trim();if(G.startsWith("|")&&G.endsWith("|")){H(),U=!0;const P=G.slice(1,-1).split("|").map(te=>te.trim()).filter(te=>te&&!te.match(/^[-:]+$/));P.length>0&&_.push(P);return}else U&&C();if(G.startsWith("## ")){H(),x.push(y.jsx("h3",{"code-path":"src/pages/FabricDetailPage.tsx:133:11",className:"text-lg font-semibold text-gray-900 mt-6 mb-3",children:G.replace("## ","")},`h3-${k}`));return}if(G.startsWith("### ")){H(),x.push(y.jsx("h4",{"code-path":"src/pages/FabricDetailPage.tsx:146:11",className:"text-base font-medium text-gray-800 mt-4 mb-2",children:G.replace("### ","")},`h4-${k}`));return}if(G.startsWith("- ")||G.startsWith("* ")){R=!0,D.push(G.replace(/^[-*] /,""));return}else if(R&&G){D[D.length-1]+=" "+G;return}else if(R&&!G){H();return}if(G.startsWith("**")&&G.endsWith("**")){x.push(y.jsx("p",{"code-path":"src/pages/FabricDetailPage.tsx:173:11",className:"font-semibold text-gray-800 my-2",children:G.replace(/\*\*/g,"")},`p-${k}`));return}G&&x.push(y.jsx("p",{"code-path":"src/pages/FabricDetailPage.tsx:183:11",className:"text-gray-700 my-2 leading-relaxed",children:G.replace(/\*\*/g,"")},`p-${k}`))}),C(),H(),y.jsx("div",{"code-path":"src/pages/FabricDetailPage.tsx:193:12",className:"prose prose-sm max-w-none",children:x})};return y.jsxs("div",{"code-path":"src/pages/FabricDetailPage.tsx:197:5",className:"space-y-6",children:[y.jsxs("div",{"code-path":"src/pages/FabricDetailPage.tsx:199:7",className:"flex items-center justify-between",children:[y.jsxs(ba,{"code-path":"src/pages/FabricDetailPage.tsx:200:9",variant:"ghost",onClick:()=>r("/fabric-training"),className:"text-gray-600",children:[y.jsx(fg,{"code-path":"src/pages/FabricDetailPage.tsx:205:11",className:"w-4 h-4 mr-2"}),"返回列表"]}),s&&y.jsxs(ba,{"code-path":"src/pages/FabricDetailPage.tsx:209:11",onClick:()=>r(`/fabric-training/${f.id}/edit`),variant:"outline",children:[y.jsx(hg,{"code-path":"src/pages/FabricDetailPage.tsx:213:13",className:"w-4 h-4 mr-2"}),"编辑面料"]})]}),y.jsxs(bn,{"code-path":"src/pages/FabricDetailPage.tsx:220:7",children:[y.jsxs(pl,{"code-path":"src/pages/FabricDetailPage.tsx:221:9",children:[y.jsxs("div",{"code-path":"src/pages/FabricDetailPage.tsx:222:11",className:"flex items-center gap-3 mb-2",children:[y.jsx($E,{"code-path":"src/pages/FabricDetailPage.tsx:223:13",variant:"secondary",children:f.category}),y.jsxs("span",{"code-path":"src/pages/FabricDetailPage.tsx:224:13",className:"text-sm text-gray-500",children:["序号 ",f.order]})]}),y.jsx(xn,{"code-path":"src/pages/FabricDetailPage.tsx:226:11",className:"text-2xl",children:f.name}),y.jsx("p",{"code-path":"src/pages/FabricDetailPage.tsx:227:11",className:"text-gray-600 mt-2",children:f.subtitle})]}),y.jsx(Sn,{"code-path":"src/pages/FabricDetailPage.tsx:229:9",children:y.jsx("p",{"code-path":"src/pages/FabricDetailPage.tsx:230:11",className:"text-gray-700 leading-relaxed",children:f.description})})]}),y.jsxs(T0,{"code-path":"src/pages/FabricDetailPage.tsx:235:7",value:m,onValueChange:p,className:"w-full",children:[y.jsx(R0,{"code-path":"src/pages/FabricDetailPage.tsx:236:9",className:"grid grid-cols-7 w-full h-auto",children:yp.map(h=>{const S=h.icon;return y.jsxs(cs,{"code-path":"src/pages/FabricDetailPage.tsx:240:15",value:h.id,className:"flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600",children:[y.jsx(S,{"code-path":"src/pages/FabricDetailPage.tsx:245:17",className:"w-4 h-4"}),y.jsx("span",{"code-path":"src/pages/FabricDetailPage.tsx:246:17",className:"text-xs",children:h.label})]},h.id)})}),yp.map(h=>y.jsx(os,{"code-path":"src/pages/FabricDetailPage.tsx:253:11",value:h.id,className:"mt-4",children:y.jsxs(bn,{"code-path":"src/pages/FabricDetailPage.tsx:254:13",children:[y.jsx(pl,{"code-path":"src/pages/FabricDetailPage.tsx:255:15",children:y.jsxs("div",{"code-path":"src/pages/FabricDetailPage.tsx:256:17",className:"flex items-center gap-3",children:[y.jsx(h.icon,{"code-path":"src/pages/FabricDetailPage.tsx:257:19",className:"w-5 h-5 text-blue-600"}),y.jsx(xn,{"code-path":"src/pages/FabricDetailPage.tsx:258:19",className:"text-lg",children:h.label})]})}),y.jsx(Sn,{"code-path":"src/pages/FabricDetailPage.tsx:261:15",children:b(f.modules[h.id])})]})},h.id))]})]})}function bp({className:l,...r}){return y.jsx("textarea",{"code-path":"src/components/ui/textarea.tsx:7:5","data-slot":"textarea",className:Te("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",l),...r})}const xp=[{id:"productCognition",label:"产品认知"},{id:"salesScript",label:"销售话术转化"},{id:"competitorComparison",label:"竞品对比"},{id:"objectionHandling",label:"异议处理Q&A"},{id:"practicalExercise",label:"实操演练"},{id:"afterSales",label:"售后知识"},{id:"test",label:"课后测试"}],IE=["天然纤维","再生纤维","合成纤维","混纺面料"];function Sp(){const{id:l}=Up(),r=An(),{fabrics:o,addFabric:c,updateFabric:s}=xs(),f=l==="new",m=f?null:o.find(D=>D.id===l),[p,b]=g.useState({name:"",subtitle:"",description:"",category:"天然纤维",order:o.length+1,modules:{productCognition:"",salesScript:"",competitorComparison:"",objectionHandling:"",practicalExercise:"",afterSales:"",test:""}}),[h,S]=g.useState("basic");g.useEffect(()=>{m&&b({name:m.name,subtitle:m.subtitle,description:m.description,category:m.category,order:m.order,modules:{...m.modules}})},[m]);const x=(D,R)=>{b(C=>({...C,[D]:R}))},_=(D,R)=>{b(C=>({...C,modules:{...C.modules,[D]:R}}))},U=()=>{if(!p.name.trim()){alert("请输入面料名称");return}f?c(p):l&&s(l,p),r("/fabric-training")};return y.jsxs("div",{"code-path":"src/pages/FabricEditPage.tsx:96:5",className:"space-y-6",children:[y.jsxs("div",{"code-path":"src/pages/FabricEditPage.tsx:98:7",className:"flex items-center justify-between",children:[y.jsxs(ba,{"code-path":"src/pages/FabricEditPage.tsx:99:9",variant:"ghost",onClick:()=>r("/fabric-training"),className:"text-gray-600",children:[y.jsx(fg,{"code-path":"src/pages/FabricEditPage.tsx:104:11",className:"w-4 h-4 mr-2"}),"返回列表"]}),y.jsxs(ba,{"code-path":"src/pages/FabricEditPage.tsx:107:9",onClick:U,className:"bg-blue-600 hover:bg-blue-700",children:[y.jsx(R2,{"code-path":"src/pages/FabricEditPage.tsx:108:11",className:"w-4 h-4 mr-2"}),f?"创建面料":"保存修改"]})]}),y.jsx("h2",{"code-path":"src/pages/FabricEditPage.tsx:114:7",className:"text-2xl font-bold text-gray-900",children:f?"新增面料":"编辑面料"}),y.jsxs(T0,{"code-path":"src/pages/FabricEditPage.tsx:119:7",value:h,onValueChange:S,className:"w-full",children:[y.jsxs(R0,{"code-path":"src/pages/FabricEditPage.tsx:120:9",className:"w-full",children:[y.jsx(cs,{"code-path":"src/pages/FabricEditPage.tsx:121:11",value:"basic",children:"基本信息"}),xp.map(D=>y.jsx(cs,{"code-path":"src/pages/FabricEditPage.tsx:123:13",value:D.id,children:D.label},D.id))]}),y.jsx(os,{"code-path":"src/pages/FabricEditPage.tsx:130:9",value:"basic",className:"mt-4",children:y.jsxs(bn,{"code-path":"src/pages/FabricEditPage.tsx:131:11",children:[y.jsx(pl,{"code-path":"src/pages/FabricEditPage.tsx:132:13",children:y.jsx(xn,{"code-path":"src/pages/FabricEditPage.tsx:133:15",children:"基本信息"})}),y.jsxs(Sn,{"code-path":"src/pages/FabricEditPage.tsx:135:13",className:"space-y-4",children:[y.jsxs("div",{"code-path":"src/pages/FabricEditPage.tsx:136:15",className:"grid grid-cols-2 gap-4",children:[y.jsxs("div",{"code-path":"src/pages/FabricEditPage.tsx:137:17",className:"space-y-2",children:[y.jsxs(yn,{"code-path":"src/pages/FabricEditPage.tsx:138:19",htmlFor:"name",children:["面料名称 ",y.jsx("span",{"code-path":"src/pages/FabricEditPage.tsx:139:26",className:"text-red-500",children:"*"})]}),y.jsx(dl,{"code-path":"src/pages/FabricEditPage.tsx:141:19",id:"name",value:p.name,onChange:D=>x("name",D.target.value),placeholder:"请输入面料名称"})]}),y.jsxs("div",{"code-path":"src/pages/FabricEditPage.tsx:148:17",className:"space-y-2",children:[y.jsx(yn,{"code-path":"src/pages/FabricEditPage.tsx:149:19",htmlFor:"category",children:"分类"}),y.jsx("select",{"code-path":"src/pages/FabricEditPage.tsx:150:19",id:"category",value:p.category,onChange:D=>x("category",D.target.value),className:"w-full h-10 px-3 rounded-md border border-input bg-background",children:IE.map(D=>y.jsx("option",{"code-path":"src/pages/FabricEditPage.tsx:157:23",value:D,children:D},D))})]})]}),y.jsxs("div",{"code-path":"src/pages/FabricEditPage.tsx:165:15",className:"space-y-2",children:[y.jsx(yn,{"code-path":"src/pages/FabricEditPage.tsx:166:17",htmlFor:"subtitle",children:"副标题"}),y.jsx(dl,{"code-path":"src/pages/FabricEditPage.tsx:167:17",id:"subtitle",value:p.subtitle,onChange:D=>x("subtitle",D.target.value),placeholder:"请输入副标题（一句话记忆）"})]}),y.jsxs("div",{"code-path":"src/pages/FabricEditPage.tsx:175:15",className:"space-y-2",children:[y.jsx(yn,{"code-path":"src/pages/FabricEditPage.tsx:176:17",htmlFor:"description",children:"描述"}),y.jsx(bp,{"code-path":"src/pages/FabricEditPage.tsx:177:17",id:"description",value:p.description,onChange:D=>x("description",D.target.value),placeholder:"请输入面料描述",rows:4})]}),y.jsxs("div",{"code-path":"src/pages/FabricEditPage.tsx:186:15",className:"space-y-2",children:[y.jsx(yn,{"code-path":"src/pages/FabricEditPage.tsx:187:17",htmlFor:"order",children:"排序序号"}),y.jsx(dl,{"code-path":"src/pages/FabricEditPage.tsx:188:17",id:"order",type:"number",value:p.order,onChange:D=>x("order",parseInt(D.target.value)||0),placeholder:"请输入排序序号"})]})]})]})}),xp.map(D=>y.jsx(os,{"code-path":"src/pages/FabricEditPage.tsx:204:11",value:D.id,className:"mt-4",children:y.jsxs(bn,{"code-path":"src/pages/FabricEditPage.tsx:205:13",children:[y.jsx(pl,{"code-path":"src/pages/FabricEditPage.tsx:206:15",children:y.jsx(xn,{"code-path":"src/pages/FabricEditPage.tsx:207:17",children:D.label})}),y.jsxs(Sn,{"code-path":"src/pages/FabricEditPage.tsx:209:15",children:[y.jsx(bp,{"code-path":"src/pages/FabricEditPage.tsx:210:17",value:p.modules[D.id],onChange:R=>_(D.id,R.target.value),placeholder:`请输入${D.label}内容，支持Markdown格式...`,rows:20,className:"font-mono text-sm"}),y.jsx("p",{"code-path":"src/pages/FabricEditPage.tsx:217:17",className:"text-sm text-gray-500 mt-2",children:"提示：使用 ## 表示标题，| 表格 | 表格 | 创建表格，- 表示列表项"})]})]})},D.id))]})]})}function bi({title:l}){return y.jsxs("div",{"code-path":"src/pages/PlaceholderPage.tsx:10:5",className:"space-y-6",children:[y.jsx("h2",{"code-path":"src/pages/PlaceholderPage.tsx:11:7",className:"text-2xl font-bold text-gray-900",children:l}),y.jsx(bn,{"code-path":"src/pages/PlaceholderPage.tsx:13:7",className:"border-dashed border-2",children:y.jsxs(Sn,{"code-path":"src/pages/PlaceholderPage.tsx:14:9",className:"flex flex-col items-center justify-center py-16",children:[y.jsx(f2,{"code-path":"src/pages/PlaceholderPage.tsx:15:11",className:"w-16 h-16 text-gray-300 mb-4"}),y.jsx(xn,{"code-path":"src/pages/PlaceholderPage.tsx:16:11",className:"text-xl text-gray-500 mb-2",children:"功能开发中"}),y.jsxs("p",{"code-path":"src/pages/PlaceholderPage.tsx:17:11",className:"text-gray-400 text-center max-w-md",children:[l,"模块正在开发中，敬请期待..."]})]})})]})}function eA({children:l}){const{isAuthenticated:r}=xl();return r?y.jsx(y.Fragment,{children:l}):y.jsx(iu,{"code-path":"src/App.tsx:14:46",to:"/login"})}function Ep({children:l}){const{isAuthenticated:r,user:o}=xl();return r?o?.role!=="admin"?y.jsx(iu,{"code-path":"src/App.tsx:21:38",to:"/"}):y.jsx(y.Fragment,{children:l}):y.jsx(iu,{"code-path":"src/App.tsx:20:32",to:"/login"})}function tA(){return y.jsx(_b,{"code-path":"src/App.tsx:27:5",children:y.jsxs(ib,{"code-path":"src/App.tsx:28:7",children:[y.jsx(Rt,{"code-path":"src/App.tsx:29:9",path:"/login",element:y.jsx(W2,{"code-path":"src/App.tsx:29:39"})}),y.jsxs(Rt,{"code-path":"src/App.tsx:30:9",path:"/",element:y.jsx(eA,{"code-path":"src/App.tsx:33:13",children:y.jsx(Y2,{"code-path":"src/App.tsx:34:15"})}),children:[y.jsx(Rt,{"code-path":"src/App.tsx:39:11",index:!0,element:y.jsx(iu,{"code-path":"src/App.tsx:39:33",to:"/fabric-training"})}),y.jsx(Rt,{"code-path":"src/App.tsx:40:11",path:"fabric-training",element:y.jsx(CE,{"code-path":"src/App.tsx:40:50"})}),y.jsx(Rt,{"code-path":"src/App.tsx:41:11",path:"fabric-training/:id",element:y.jsx(WE,{"code-path":"src/App.tsx:41:54"})}),y.jsx(Rt,{"code-path":"src/App.tsx:42:11",path:"fabric-training/:id/edit",element:y.jsx(Ep,{"code-path":"src/App.tsx:45:15",children:y.jsx(Sp,{"code-path":"src/App.tsx:46:17"})})}),y.jsx(Rt,{"code-path":"src/App.tsx:50:11",path:"fabric-training/new",element:y.jsx(Ep,{"code-path":"src/App.tsx:53:15",children:y.jsx(Sp,{"code-path":"src/App.tsx:54:17"})})}),y.jsx(Rt,{"code-path":"src/App.tsx:60:11",path:"store-manual",element:y.jsx(bi,{"code-path":"src/App.tsx:60:47",title:"店铺运营手册"})}),y.jsx(Rt,{"code-path":"src/App.tsx:61:11",path:"sales-training",element:y.jsx(bi,{"code-path":"src/App.tsx:61:49",title:"销售能力培训"})}),y.jsx(Rt,{"code-path":"src/App.tsx:62:11",path:"manager-manual",element:y.jsx(bi,{"code-path":"src/App.tsx:62:49",title:"店长管理手册"})}),y.jsx(Rt,{"code-path":"src/App.tsx:63:11",path:"mentor-manual",element:y.jsx(bi,{"code-path":"src/App.tsx:63:48",title:"带教手册"})}),y.jsx(Rt,{"code-path":"src/App.tsx:64:11",path:"store-image",element:y.jsx(bi,{"code-path":"src/App.tsx:64:46",title:"店铺形象"})})]})]})})}iy.createRoot(document.getElementById("root")).render(y.jsx(g.StrictMode,{"code-path":"src/main.tsx:7:3",children:y.jsx(tA,{"code-path":"src/main.tsx:8:5"})}));
