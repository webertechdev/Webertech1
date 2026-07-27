function yE(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in t)){const s=Object.getOwnPropertyDescriptor(r,i);s&&Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function vE(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Fv={exports:{}},Ic={},zv={exports:{}},ne={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ea=Symbol.for("react.element"),_E=Symbol.for("react.portal"),xE=Symbol.for("react.fragment"),wE=Symbol.for("react.strict_mode"),EE=Symbol.for("react.profiler"),SE=Symbol.for("react.provider"),bE=Symbol.for("react.context"),TE=Symbol.for("react.forward_ref"),IE=Symbol.for("react.suspense"),kE=Symbol.for("react.memo"),AE=Symbol.for("react.lazy"),$m=Symbol.iterator;function RE(t){return t===null||typeof t!="object"?null:(t=$m&&t[$m]||t["@@iterator"],typeof t=="function"?t:null)}var Uv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Bv=Object.assign,Wv={};function ms(t,e,n){this.props=t,this.context=e,this.refs=Wv,this.updater=n||Uv}ms.prototype.isReactComponent={};ms.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ms.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function $v(){}$v.prototype=ms.prototype;function Hh(t,e,n){this.props=t,this.context=e,this.refs=Wv,this.updater=n||Uv}var Kh=Hh.prototype=new $v;Kh.constructor=Hh;Bv(Kh,ms.prototype);Kh.isPureReactComponent=!0;var Hm=Array.isArray,Hv=Object.prototype.hasOwnProperty,qh={current:null},Kv={key:!0,ref:!0,__self:!0,__source:!0};function qv(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Hv.call(e,r)&&!Kv.hasOwnProperty(r)&&(i[r]=e[r]);var c=arguments.length-2;if(c===1)i.children=n;else if(1<c){for(var u=Array(c),d=0;d<c;d++)u[d]=arguments[d+2];i.children=u}if(t&&t.defaultProps)for(r in c=t.defaultProps,c)i[r]===void 0&&(i[r]=c[r]);return{$$typeof:ea,type:t,key:s,ref:o,props:i,_owner:qh.current}}function CE(t,e){return{$$typeof:ea,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Gh(t){return typeof t=="object"&&t!==null&&t.$$typeof===ea}function PE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Km=/\/+/g;function Lu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?PE(""+t.key):e.toString(36)}function fl(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ea:case _E:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Lu(o,0):r,Hm(i)?(n="",t!=null&&(n=t.replace(Km,"$&/")+"/"),fl(i,e,n,"",function(d){return d})):i!=null&&(Gh(i)&&(i=CE(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Km,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",Hm(t))for(var c=0;c<t.length;c++){s=t[c];var u=r+Lu(s,c);o+=fl(s,e,n,u,i)}else if(u=RE(t),typeof u=="function")for(t=u.call(t),c=0;!(s=t.next()).done;)s=s.value,u=r+Lu(s,c++),o+=fl(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Ma(t,e,n){if(t==null)return t;var r=[],i=0;return fl(t,r,"","",function(s){return e.call(n,s,i++)}),r}function jE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var yt={current:null},pl={transition:null},NE={ReactCurrentDispatcher:yt,ReactCurrentBatchConfig:pl,ReactCurrentOwner:qh};function Gv(){throw Error("act(...) is not supported in production builds of React.")}ne.Children={map:Ma,forEach:function(t,e,n){Ma(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ma(t,function(){e++}),e},toArray:function(t){return Ma(t,function(e){return e})||[]},only:function(t){if(!Gh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ne.Component=ms;ne.Fragment=xE;ne.Profiler=EE;ne.PureComponent=Hh;ne.StrictMode=wE;ne.Suspense=IE;ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=NE;ne.act=Gv;ne.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Bv({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=qh.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var c=t.type.defaultProps;for(u in e)Hv.call(e,u)&&!Kv.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&c!==void 0?c[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){c=Array(u);for(var d=0;d<u;d++)c[d]=arguments[d+2];r.children=c}return{$$typeof:ea,type:t.type,key:i,ref:s,props:r,_owner:o}};ne.createContext=function(t){return t={$$typeof:bE,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:SE,_context:t},t.Consumer=t};ne.createElement=qv;ne.createFactory=function(t){var e=qv.bind(null,t);return e.type=t,e};ne.createRef=function(){return{current:null}};ne.forwardRef=function(t){return{$$typeof:TE,render:t}};ne.isValidElement=Gh;ne.lazy=function(t){return{$$typeof:AE,_payload:{_status:-1,_result:t},_init:jE}};ne.memo=function(t,e){return{$$typeof:kE,type:t,compare:e===void 0?null:e}};ne.startTransition=function(t){var e=pl.transition;pl.transition={};try{t()}finally{pl.transition=e}};ne.unstable_act=Gv;ne.useCallback=function(t,e){return yt.current.useCallback(t,e)};ne.useContext=function(t){return yt.current.useContext(t)};ne.useDebugValue=function(){};ne.useDeferredValue=function(t){return yt.current.useDeferredValue(t)};ne.useEffect=function(t,e){return yt.current.useEffect(t,e)};ne.useId=function(){return yt.current.useId()};ne.useImperativeHandle=function(t,e,n){return yt.current.useImperativeHandle(t,e,n)};ne.useInsertionEffect=function(t,e){return yt.current.useInsertionEffect(t,e)};ne.useLayoutEffect=function(t,e){return yt.current.useLayoutEffect(t,e)};ne.useMemo=function(t,e){return yt.current.useMemo(t,e)};ne.useReducer=function(t,e,n){return yt.current.useReducer(t,e,n)};ne.useRef=function(t){return yt.current.useRef(t)};ne.useState=function(t){return yt.current.useState(t)};ne.useSyncExternalStore=function(t,e,n){return yt.current.useSyncExternalStore(t,e,n)};ne.useTransition=function(){return yt.current.useTransition()};ne.version="18.3.1";zv.exports=ne;var C=zv.exports;const Qv=vE(C),DE=yE({__proto__:null,default:Qv},[C]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var OE=C,LE=Symbol.for("react.element"),VE=Symbol.for("react.fragment"),ME=Object.prototype.hasOwnProperty,FE=OE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,zE={key:!0,ref:!0,__self:!0,__source:!0};function Yv(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)ME.call(e,r)&&!zE.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:LE,type:t,key:s,ref:o,props:i,_owner:FE.current}}Ic.Fragment=VE;Ic.jsx=Yv;Ic.jsxs=Yv;Fv.exports=Ic;var a=Fv.exports,Sd={},Xv={exports:{}},Ct={},Jv={exports:{}},Zv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,W){var Q=z.length;z.push(W);e:for(;0<Q;){var me=Q-1>>>1,te=z[me];if(0<i(te,W))z[me]=W,z[Q]=te,Q=me;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var W=z[0],Q=z.pop();if(Q!==W){z[0]=Q;e:for(var me=0,te=z.length,Ce=te>>>1;me<Ce;){var wn=2*(me+1)-1,En=z[wn],Sn=wn+1,bn=z[Sn];if(0>i(En,Q))Sn<te&&0>i(bn,En)?(z[me]=bn,z[Sn]=Q,me=Sn):(z[me]=En,z[wn]=Q,me=wn);else if(Sn<te&&0>i(bn,Q))z[me]=bn,z[Sn]=Q,me=Sn;else break e}}return W}function i(z,W){var Q=z.sortIndex-W.sortIndex;return Q!==0?Q:z.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,c=o.now();t.unstable_now=function(){return o.now()-c}}var u=[],d=[],f=1,m=null,g=3,b=!1,k=!1,P=!1,j=typeof setTimeout=="function"?setTimeout:null,w=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function T(z){for(var W=n(d);W!==null;){if(W.callback===null)r(d);else if(W.startTime<=z)r(d),W.sortIndex=W.expirationTime,e(u,W);else break;W=n(d)}}function O(z){if(P=!1,T(z),!k)if(n(u)!==null)k=!0,pe(D);else{var W=n(d);W!==null&&de(O,W.startTime-z)}}function D(z,W){k=!1,P&&(P=!1,w(v),v=-1),b=!0;var Q=g;try{for(T(W),m=n(u);m!==null&&(!(m.expirationTime>W)||z&&!A());){var me=m.callback;if(typeof me=="function"){m.callback=null,g=m.priorityLevel;var te=me(m.expirationTime<=W);W=t.unstable_now(),typeof te=="function"?m.callback=te:m===n(u)&&r(u),T(W)}else r(u);m=n(u)}if(m!==null)var Ce=!0;else{var wn=n(d);wn!==null&&de(O,wn.startTime-W),Ce=!1}return Ce}finally{m=null,g=Q,b=!1}}var V=!1,E=null,v=-1,S=5,I=-1;function A(){return!(t.unstable_now()-I<S)}function R(){if(E!==null){var z=t.unstable_now();I=z;var W=!0;try{W=E(!0,z)}finally{W?y():(V=!1,E=null)}}else V=!1}var y;if(typeof x=="function")y=function(){x(R)};else if(typeof MessageChannel<"u"){var q=new MessageChannel,Y=q.port2;q.port1.onmessage=R,y=function(){Y.postMessage(null)}}else y=function(){j(R,0)};function pe(z){E=z,V||(V=!0,y())}function de(z,W){v=j(function(){z(t.unstable_now())},W)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){k||b||(k=!0,pe(D))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(z){switch(g){case 1:case 2:case 3:var W=3;break;default:W=g}var Q=g;g=W;try{return z()}finally{g=Q}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,W){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var Q=g;g=z;try{return W()}finally{g=Q}},t.unstable_scheduleCallback=function(z,W,Q){var me=t.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?me+Q:me):Q=me,z){case 1:var te=-1;break;case 2:te=250;break;case 5:te=1073741823;break;case 4:te=1e4;break;default:te=5e3}return te=Q+te,z={id:f++,callback:W,priorityLevel:z,startTime:Q,expirationTime:te,sortIndex:-1},Q>me?(z.sortIndex=Q,e(d,z),n(u)===null&&z===n(d)&&(P?(w(v),v=-1):P=!0,de(O,Q-me))):(z.sortIndex=te,e(u,z),k||b||(k=!0,pe(D))),z},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(z){var W=g;return function(){var Q=g;g=W;try{return z.apply(this,arguments)}finally{g=Q}}}})(Zv);Jv.exports=Zv;var UE=Jv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var BE=C,Rt=UE;function U(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var e0=new Set,So={};function mi(t,e){es(t,e),es(t+"Capture",e)}function es(t,e){for(So[t]=e,t=0;t<e.length;t++)e0.add(e[t])}var Fn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),bd=Object.prototype.hasOwnProperty,WE=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,qm={},Gm={};function $E(t){return bd.call(Gm,t)?!0:bd.call(qm,t)?!1:WE.test(t)?Gm[t]=!0:(qm[t]=!0,!1)}function HE(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function KE(t,e,n,r){if(e===null||typeof e>"u"||HE(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function vt(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Ze={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ze[t]=new vt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ze[e]=new vt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ze[t]=new vt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ze[t]=new vt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ze[t]=new vt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ze[t]=new vt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ze[t]=new vt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ze[t]=new vt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ze[t]=new vt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Qh=/[\-:]([a-z])/g;function Yh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Qh,Yh);Ze[e]=new vt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Qh,Yh);Ze[e]=new vt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Qh,Yh);Ze[e]=new vt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ze[t]=new vt(t,1,!1,t.toLowerCase(),null,!1,!1)});Ze.xlinkHref=new vt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ze[t]=new vt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Xh(t,e,n,r){var i=Ze.hasOwnProperty(e)?Ze[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(KE(e,n,i,r)&&(n=null),r||i===null?$E(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Gn=BE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Fa=Symbol.for("react.element"),ji=Symbol.for("react.portal"),Ni=Symbol.for("react.fragment"),Jh=Symbol.for("react.strict_mode"),Td=Symbol.for("react.profiler"),t0=Symbol.for("react.provider"),n0=Symbol.for("react.context"),Zh=Symbol.for("react.forward_ref"),Id=Symbol.for("react.suspense"),kd=Symbol.for("react.suspense_list"),ef=Symbol.for("react.memo"),ir=Symbol.for("react.lazy"),r0=Symbol.for("react.offscreen"),Qm=Symbol.iterator;function Fs(t){return t===null||typeof t!="object"?null:(t=Qm&&t[Qm]||t["@@iterator"],typeof t=="function"?t:null)}var Te=Object.assign,Vu;function Js(t){if(Vu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Vu=e&&e[1]||""}return`
`+Vu+t}var Mu=!1;function Fu(t,e){if(!t||Mu)return"";Mu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(d){var r=d}Reflect.construct(t,[],e)}else{try{e.call()}catch(d){r=d}t.call(e.prototype)}else{try{throw Error()}catch(d){r=d}t()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,c=s.length-1;1<=o&&0<=c&&i[o]!==s[c];)c--;for(;1<=o&&0<=c;o--,c--)if(i[o]!==s[c]){if(o!==1||c!==1)do if(o--,c--,0>c||i[o]!==s[c]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=c);break}}}finally{Mu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Js(t):""}function qE(t){switch(t.tag){case 5:return Js(t.type);case 16:return Js("Lazy");case 13:return Js("Suspense");case 19:return Js("SuspenseList");case 0:case 2:case 15:return t=Fu(t.type,!1),t;case 11:return t=Fu(t.type.render,!1),t;case 1:return t=Fu(t.type,!0),t;default:return""}}function Ad(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ni:return"Fragment";case ji:return"Portal";case Td:return"Profiler";case Jh:return"StrictMode";case Id:return"Suspense";case kd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case n0:return(t.displayName||"Context")+".Consumer";case t0:return(t._context.displayName||"Context")+".Provider";case Zh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case ef:return e=t.displayName||null,e!==null?e:Ad(t.type)||"Memo";case ir:e=t._payload,t=t._init;try{return Ad(t(e))}catch{}}return null}function GE(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ad(e);case 8:return e===Jh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ar(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function i0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function QE(t){var e=i0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function za(t){t._valueTracker||(t._valueTracker=QE(t))}function s0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=i0(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Ll(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Rd(t,e){var n=e.checked;return Te({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Ym(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Ar(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function o0(t,e){e=e.checked,e!=null&&Xh(t,"checked",e,!1)}function Cd(t,e){o0(t,e);var n=Ar(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Pd(t,e.type,n):e.hasOwnProperty("defaultValue")&&Pd(t,e.type,Ar(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Xm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Pd(t,e,n){(e!=="number"||Ll(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Zs=Array.isArray;function $i(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Ar(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function jd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(U(91));return Te({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Jm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(U(92));if(Zs(n)){if(1<n.length)throw Error(U(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ar(n)}}function a0(t,e){var n=Ar(e.value),r=Ar(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Zm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function l0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Nd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?l0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ua,c0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ua=Ua||document.createElement("div"),Ua.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ua.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function bo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var lo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},YE=["Webkit","ms","Moz","O"];Object.keys(lo).forEach(function(t){YE.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),lo[e]=lo[t]})});function u0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||lo.hasOwnProperty(t)&&lo[t]?(""+e).trim():e+"px"}function d0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=u0(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var XE=Te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Dd(t,e){if(e){if(XE[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(U(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(U(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(U(61))}if(e.style!=null&&typeof e.style!="object")throw Error(U(62))}}function Od(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ld=null;function tf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Vd=null,Hi=null,Ki=null;function eg(t){if(t=ra(t)){if(typeof Vd!="function")throw Error(U(280));var e=t.stateNode;e&&(e=Pc(e),Vd(t.stateNode,t.type,e))}}function h0(t){Hi?Ki?Ki.push(t):Ki=[t]:Hi=t}function f0(){if(Hi){var t=Hi,e=Ki;if(Ki=Hi=null,eg(t),e)for(t=0;t<e.length;t++)eg(e[t])}}function p0(t,e){return t(e)}function m0(){}var zu=!1;function g0(t,e,n){if(zu)return t(e,n);zu=!0;try{return p0(t,e,n)}finally{zu=!1,(Hi!==null||Ki!==null)&&(m0(),f0())}}function To(t,e){var n=t.stateNode;if(n===null)return null;var r=Pc(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(U(231,e,typeof n));return n}var Md=!1;if(Fn)try{var zs={};Object.defineProperty(zs,"passive",{get:function(){Md=!0}}),window.addEventListener("test",zs,zs),window.removeEventListener("test",zs,zs)}catch{Md=!1}function JE(t,e,n,r,i,s,o,c,u){var d=Array.prototype.slice.call(arguments,3);try{e.apply(n,d)}catch(f){this.onError(f)}}var co=!1,Vl=null,Ml=!1,Fd=null,ZE={onError:function(t){co=!0,Vl=t}};function eS(t,e,n,r,i,s,o,c,u){co=!1,Vl=null,JE.apply(ZE,arguments)}function tS(t,e,n,r,i,s,o,c,u){if(eS.apply(this,arguments),co){if(co){var d=Vl;co=!1,Vl=null}else throw Error(U(198));Ml||(Ml=!0,Fd=d)}}function gi(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function y0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function tg(t){if(gi(t)!==t)throw Error(U(188))}function nS(t){var e=t.alternate;if(!e){if(e=gi(t),e===null)throw Error(U(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return tg(i),t;if(s===r)return tg(i),e;s=s.sibling}throw Error(U(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,c=i.child;c;){if(c===n){o=!0,n=i,r=s;break}if(c===r){o=!0,r=i,n=s;break}c=c.sibling}if(!o){for(c=s.child;c;){if(c===n){o=!0,n=s,r=i;break}if(c===r){o=!0,r=s,n=i;break}c=c.sibling}if(!o)throw Error(U(189))}}if(n.alternate!==r)throw Error(U(190))}if(n.tag!==3)throw Error(U(188));return n.stateNode.current===n?t:e}function v0(t){return t=nS(t),t!==null?_0(t):null}function _0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=_0(t);if(e!==null)return e;t=t.sibling}return null}var x0=Rt.unstable_scheduleCallback,ng=Rt.unstable_cancelCallback,rS=Rt.unstable_shouldYield,iS=Rt.unstable_requestPaint,je=Rt.unstable_now,sS=Rt.unstable_getCurrentPriorityLevel,nf=Rt.unstable_ImmediatePriority,w0=Rt.unstable_UserBlockingPriority,Fl=Rt.unstable_NormalPriority,oS=Rt.unstable_LowPriority,E0=Rt.unstable_IdlePriority,kc=null,cn=null;function aS(t){if(cn&&typeof cn.onCommitFiberRoot=="function")try{cn.onCommitFiberRoot(kc,t,void 0,(t.current.flags&128)===128)}catch{}}var Yt=Math.clz32?Math.clz32:uS,lS=Math.log,cS=Math.LN2;function uS(t){return t>>>=0,t===0?32:31-(lS(t)/cS|0)|0}var Ba=64,Wa=4194304;function eo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function zl(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var c=o&~i;c!==0?r=eo(c):(s&=o,s!==0&&(r=eo(s)))}else o=n&~i,o!==0?r=eo(o):s!==0&&(r=eo(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Yt(e),i=1<<n,r|=t[n],e&=~i;return r}function dS(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function hS(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Yt(s),c=1<<o,u=i[o];u===-1?(!(c&n)||c&r)&&(i[o]=dS(c,e)):u<=e&&(t.expiredLanes|=c),s&=~c}}function zd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function S0(){var t=Ba;return Ba<<=1,!(Ba&4194240)&&(Ba=64),t}function Uu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ta(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Yt(e),t[e]=n}function fS(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Yt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function rf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Yt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var he=0;function b0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var T0,sf,I0,k0,A0,Ud=!1,$a=[],gr=null,yr=null,vr=null,Io=new Map,ko=new Map,or=[],pS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function rg(t,e){switch(t){case"focusin":case"focusout":gr=null;break;case"dragenter":case"dragleave":yr=null;break;case"mouseover":case"mouseout":vr=null;break;case"pointerover":case"pointerout":Io.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ko.delete(e.pointerId)}}function Us(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=ra(e),e!==null&&sf(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function mS(t,e,n,r,i){switch(e){case"focusin":return gr=Us(gr,t,e,n,r,i),!0;case"dragenter":return yr=Us(yr,t,e,n,r,i),!0;case"mouseover":return vr=Us(vr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return Io.set(s,Us(Io.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,ko.set(s,Us(ko.get(s)||null,t,e,n,r,i)),!0}return!1}function R0(t){var e=Qr(t.target);if(e!==null){var n=gi(e);if(n!==null){if(e=n.tag,e===13){if(e=y0(n),e!==null){t.blockedOn=e,A0(t.priority,function(){I0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ml(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Bd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Ld=r,n.target.dispatchEvent(r),Ld=null}else return e=ra(n),e!==null&&sf(e),t.blockedOn=n,!1;e.shift()}return!0}function ig(t,e,n){ml(t)&&n.delete(e)}function gS(){Ud=!1,gr!==null&&ml(gr)&&(gr=null),yr!==null&&ml(yr)&&(yr=null),vr!==null&&ml(vr)&&(vr=null),Io.forEach(ig),ko.forEach(ig)}function Bs(t,e){t.blockedOn===e&&(t.blockedOn=null,Ud||(Ud=!0,Rt.unstable_scheduleCallback(Rt.unstable_NormalPriority,gS)))}function Ao(t){function e(i){return Bs(i,t)}if(0<$a.length){Bs($a[0],t);for(var n=1;n<$a.length;n++){var r=$a[n];r.blockedOn===t&&(r.blockedOn=null)}}for(gr!==null&&Bs(gr,t),yr!==null&&Bs(yr,t),vr!==null&&Bs(vr,t),Io.forEach(e),ko.forEach(e),n=0;n<or.length;n++)r=or[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<or.length&&(n=or[0],n.blockedOn===null);)R0(n),n.blockedOn===null&&or.shift()}var qi=Gn.ReactCurrentBatchConfig,Ul=!0;function yS(t,e,n,r){var i=he,s=qi.transition;qi.transition=null;try{he=1,of(t,e,n,r)}finally{he=i,qi.transition=s}}function vS(t,e,n,r){var i=he,s=qi.transition;qi.transition=null;try{he=4,of(t,e,n,r)}finally{he=i,qi.transition=s}}function of(t,e,n,r){if(Ul){var i=Bd(t,e,n,r);if(i===null)Xu(t,e,r,Bl,n),rg(t,r);else if(mS(i,t,e,n,r))r.stopPropagation();else if(rg(t,r),e&4&&-1<pS.indexOf(t)){for(;i!==null;){var s=ra(i);if(s!==null&&T0(s),s=Bd(t,e,n,r),s===null&&Xu(t,e,r,Bl,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Xu(t,e,r,null,n)}}var Bl=null;function Bd(t,e,n,r){if(Bl=null,t=tf(r),t=Qr(t),t!==null)if(e=gi(t),e===null)t=null;else if(n=e.tag,n===13){if(t=y0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Bl=t,null}function C0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(sS()){case nf:return 1;case w0:return 4;case Fl:case oS:return 16;case E0:return 536870912;default:return 16}default:return 16}}var hr=null,af=null,gl=null;function P0(){if(gl)return gl;var t,e=af,n=e.length,r,i="value"in hr?hr.value:hr.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return gl=i.slice(t,1<r?1-r:void 0)}function yl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ha(){return!0}function sg(){return!1}function Pt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var c in t)t.hasOwnProperty(c)&&(n=t[c],this[c]=n?n(s):s[c]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ha:sg,this.isPropagationStopped=sg,this}return Te(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ha)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ha)},persist:function(){},isPersistent:Ha}),e}var gs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lf=Pt(gs),na=Te({},gs,{view:0,detail:0}),_S=Pt(na),Bu,Wu,Ws,Ac=Te({},na,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ws&&(Ws&&t.type==="mousemove"?(Bu=t.screenX-Ws.screenX,Wu=t.screenY-Ws.screenY):Wu=Bu=0,Ws=t),Bu)},movementY:function(t){return"movementY"in t?t.movementY:Wu}}),og=Pt(Ac),xS=Te({},Ac,{dataTransfer:0}),wS=Pt(xS),ES=Te({},na,{relatedTarget:0}),$u=Pt(ES),SS=Te({},gs,{animationName:0,elapsedTime:0,pseudoElement:0}),bS=Pt(SS),TS=Te({},gs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),IS=Pt(TS),kS=Te({},gs,{data:0}),ag=Pt(kS),AS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},RS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},CS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function PS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=CS[t])?!!e[t]:!1}function cf(){return PS}var jS=Te({},na,{key:function(t){if(t.key){var e=AS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=yl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?RS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cf,charCode:function(t){return t.type==="keypress"?yl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?yl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),NS=Pt(jS),DS=Te({},Ac,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lg=Pt(DS),OS=Te({},na,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cf}),LS=Pt(OS),VS=Te({},gs,{propertyName:0,elapsedTime:0,pseudoElement:0}),MS=Pt(VS),FS=Te({},Ac,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),zS=Pt(FS),US=[9,13,27,32],uf=Fn&&"CompositionEvent"in window,uo=null;Fn&&"documentMode"in document&&(uo=document.documentMode);var BS=Fn&&"TextEvent"in window&&!uo,j0=Fn&&(!uf||uo&&8<uo&&11>=uo),cg=" ",ug=!1;function N0(t,e){switch(t){case"keyup":return US.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function D0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Di=!1;function WS(t,e){switch(t){case"compositionend":return D0(e);case"keypress":return e.which!==32?null:(ug=!0,cg);case"textInput":return t=e.data,t===cg&&ug?null:t;default:return null}}function $S(t,e){if(Di)return t==="compositionend"||!uf&&N0(t,e)?(t=P0(),gl=af=hr=null,Di=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return j0&&e.locale!=="ko"?null:e.data;default:return null}}var HS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!HS[t.type]:e==="textarea"}function O0(t,e,n,r){h0(r),e=Wl(e,"onChange"),0<e.length&&(n=new lf("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var ho=null,Ro=null;function KS(t){K0(t,0)}function Rc(t){var e=Vi(t);if(s0(e))return t}function qS(t,e){if(t==="change")return e}var L0=!1;if(Fn){var Hu;if(Fn){var Ku="oninput"in document;if(!Ku){var hg=document.createElement("div");hg.setAttribute("oninput","return;"),Ku=typeof hg.oninput=="function"}Hu=Ku}else Hu=!1;L0=Hu&&(!document.documentMode||9<document.documentMode)}function fg(){ho&&(ho.detachEvent("onpropertychange",V0),Ro=ho=null)}function V0(t){if(t.propertyName==="value"&&Rc(Ro)){var e=[];O0(e,Ro,t,tf(t)),g0(KS,e)}}function GS(t,e,n){t==="focusin"?(fg(),ho=e,Ro=n,ho.attachEvent("onpropertychange",V0)):t==="focusout"&&fg()}function QS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Rc(Ro)}function YS(t,e){if(t==="click")return Rc(e)}function XS(t,e){if(t==="input"||t==="change")return Rc(e)}function JS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var en=typeof Object.is=="function"?Object.is:JS;function Co(t,e){if(en(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!bd.call(e,i)||!en(t[i],e[i]))return!1}return!0}function pg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function mg(t,e){var n=pg(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=pg(n)}}function M0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?M0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function F0(){for(var t=window,e=Ll();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ll(t.document)}return e}function df(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function ZS(t){var e=F0(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&M0(n.ownerDocument.documentElement,n)){if(r!==null&&df(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=mg(n,s);var o=mg(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var eb=Fn&&"documentMode"in document&&11>=document.documentMode,Oi=null,Wd=null,fo=null,$d=!1;function gg(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$d||Oi==null||Oi!==Ll(r)||(r=Oi,"selectionStart"in r&&df(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),fo&&Co(fo,r)||(fo=r,r=Wl(Wd,"onSelect"),0<r.length&&(e=new lf("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Oi)))}function Ka(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Li={animationend:Ka("Animation","AnimationEnd"),animationiteration:Ka("Animation","AnimationIteration"),animationstart:Ka("Animation","AnimationStart"),transitionend:Ka("Transition","TransitionEnd")},qu={},z0={};Fn&&(z0=document.createElement("div").style,"AnimationEvent"in window||(delete Li.animationend.animation,delete Li.animationiteration.animation,delete Li.animationstart.animation),"TransitionEvent"in window||delete Li.transitionend.transition);function Cc(t){if(qu[t])return qu[t];if(!Li[t])return t;var e=Li[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in z0)return qu[t]=e[n];return t}var U0=Cc("animationend"),B0=Cc("animationiteration"),W0=Cc("animationstart"),$0=Cc("transitionend"),H0=new Map,yg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Dr(t,e){H0.set(t,e),mi(e,[t])}for(var Gu=0;Gu<yg.length;Gu++){var Qu=yg[Gu],tb=Qu.toLowerCase(),nb=Qu[0].toUpperCase()+Qu.slice(1);Dr(tb,"on"+nb)}Dr(U0,"onAnimationEnd");Dr(B0,"onAnimationIteration");Dr(W0,"onAnimationStart");Dr("dblclick","onDoubleClick");Dr("focusin","onFocus");Dr("focusout","onBlur");Dr($0,"onTransitionEnd");es("onMouseEnter",["mouseout","mouseover"]);es("onMouseLeave",["mouseout","mouseover"]);es("onPointerEnter",["pointerout","pointerover"]);es("onPointerLeave",["pointerout","pointerover"]);mi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));mi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mi("onBeforeInput",["compositionend","keypress","textInput","paste"]);mi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var to="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),rb=new Set("cancel close invalid load scroll toggle".split(" ").concat(to));function vg(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,tS(r,e,void 0,t),t.currentTarget=null}function K0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var c=r[o],u=c.instance,d=c.currentTarget;if(c=c.listener,u!==s&&i.isPropagationStopped())break e;vg(i,c,d),s=u}else for(o=0;o<r.length;o++){if(c=r[o],u=c.instance,d=c.currentTarget,c=c.listener,u!==s&&i.isPropagationStopped())break e;vg(i,c,d),s=u}}}if(Ml)throw t=Fd,Ml=!1,Fd=null,t}function _e(t,e){var n=e[Qd];n===void 0&&(n=e[Qd]=new Set);var r=t+"__bubble";n.has(r)||(q0(e,t,2,!1),n.add(r))}function Yu(t,e,n){var r=0;e&&(r|=4),q0(n,t,r,e)}var qa="_reactListening"+Math.random().toString(36).slice(2);function Po(t){if(!t[qa]){t[qa]=!0,e0.forEach(function(n){n!=="selectionchange"&&(rb.has(n)||Yu(n,!1,t),Yu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[qa]||(e[qa]=!0,Yu("selectionchange",!1,e))}}function q0(t,e,n,r){switch(C0(e)){case 1:var i=yS;break;case 4:i=vS;break;default:i=of}n=i.bind(null,e,n,t),i=void 0,!Md||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Xu(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var c=r.stateNode.containerInfo;if(c===i||c.nodeType===8&&c.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;c!==null;){if(o=Qr(c),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}c=c.parentNode}}r=r.return}g0(function(){var d=s,f=tf(n),m=[];e:{var g=H0.get(t);if(g!==void 0){var b=lf,k=t;switch(t){case"keypress":if(yl(n)===0)break e;case"keydown":case"keyup":b=NS;break;case"focusin":k="focus",b=$u;break;case"focusout":k="blur",b=$u;break;case"beforeblur":case"afterblur":b=$u;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=og;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=wS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=LS;break;case U0:case B0:case W0:b=bS;break;case $0:b=MS;break;case"scroll":b=_S;break;case"wheel":b=zS;break;case"copy":case"cut":case"paste":b=IS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=lg}var P=(e&4)!==0,j=!P&&t==="scroll",w=P?g!==null?g+"Capture":null:g;P=[];for(var x=d,T;x!==null;){T=x;var O=T.stateNode;if(T.tag===5&&O!==null&&(T=O,w!==null&&(O=To(x,w),O!=null&&P.push(jo(x,O,T)))),j)break;x=x.return}0<P.length&&(g=new b(g,k,null,n,f),m.push({event:g,listeners:P}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",b=t==="mouseout"||t==="pointerout",g&&n!==Ld&&(k=n.relatedTarget||n.fromElement)&&(Qr(k)||k[zn]))break e;if((b||g)&&(g=f.window===f?f:(g=f.ownerDocument)?g.defaultView||g.parentWindow:window,b?(k=n.relatedTarget||n.toElement,b=d,k=k?Qr(k):null,k!==null&&(j=gi(k),k!==j||k.tag!==5&&k.tag!==6)&&(k=null)):(b=null,k=d),b!==k)){if(P=og,O="onMouseLeave",w="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(P=lg,O="onPointerLeave",w="onPointerEnter",x="pointer"),j=b==null?g:Vi(b),T=k==null?g:Vi(k),g=new P(O,x+"leave",b,n,f),g.target=j,g.relatedTarget=T,O=null,Qr(f)===d&&(P=new P(w,x+"enter",k,n,f),P.target=T,P.relatedTarget=j,O=P),j=O,b&&k)t:{for(P=b,w=k,x=0,T=P;T;T=Ii(T))x++;for(T=0,O=w;O;O=Ii(O))T++;for(;0<x-T;)P=Ii(P),x--;for(;0<T-x;)w=Ii(w),T--;for(;x--;){if(P===w||w!==null&&P===w.alternate)break t;P=Ii(P),w=Ii(w)}P=null}else P=null;b!==null&&_g(m,g,b,P,!1),k!==null&&j!==null&&_g(m,j,k,P,!0)}}e:{if(g=d?Vi(d):window,b=g.nodeName&&g.nodeName.toLowerCase(),b==="select"||b==="input"&&g.type==="file")var D=qS;else if(dg(g))if(L0)D=XS;else{D=QS;var V=GS}else(b=g.nodeName)&&b.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(D=YS);if(D&&(D=D(t,d))){O0(m,D,n,f);break e}V&&V(t,g,d),t==="focusout"&&(V=g._wrapperState)&&V.controlled&&g.type==="number"&&Pd(g,"number",g.value)}switch(V=d?Vi(d):window,t){case"focusin":(dg(V)||V.contentEditable==="true")&&(Oi=V,Wd=d,fo=null);break;case"focusout":fo=Wd=Oi=null;break;case"mousedown":$d=!0;break;case"contextmenu":case"mouseup":case"dragend":$d=!1,gg(m,n,f);break;case"selectionchange":if(eb)break;case"keydown":case"keyup":gg(m,n,f)}var E;if(uf)e:{switch(t){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Di?N0(t,n)&&(v="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(v="onCompositionStart");v&&(j0&&n.locale!=="ko"&&(Di||v!=="onCompositionStart"?v==="onCompositionEnd"&&Di&&(E=P0()):(hr=f,af="value"in hr?hr.value:hr.textContent,Di=!0)),V=Wl(d,v),0<V.length&&(v=new ag(v,t,null,n,f),m.push({event:v,listeners:V}),E?v.data=E:(E=D0(n),E!==null&&(v.data=E)))),(E=BS?WS(t,n):$S(t,n))&&(d=Wl(d,"onBeforeInput"),0<d.length&&(f=new ag("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:d}),f.data=E))}K0(m,e)})}function jo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Wl(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=To(t,n),s!=null&&r.unshift(jo(t,s,i)),s=To(t,e),s!=null&&r.push(jo(t,s,i))),t=t.return}return r}function Ii(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function _g(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var c=n,u=c.alternate,d=c.stateNode;if(u!==null&&u===r)break;c.tag===5&&d!==null&&(c=d,i?(u=To(n,s),u!=null&&o.unshift(jo(n,u,c))):i||(u=To(n,s),u!=null&&o.push(jo(n,u,c)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var ib=/\r\n?/g,sb=/\u0000|\uFFFD/g;function xg(t){return(typeof t=="string"?t:""+t).replace(ib,`
`).replace(sb,"")}function Ga(t,e,n){if(e=xg(e),xg(t)!==e&&n)throw Error(U(425))}function $l(){}var Hd=null,Kd=null;function qd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Gd=typeof setTimeout=="function"?setTimeout:void 0,ob=typeof clearTimeout=="function"?clearTimeout:void 0,wg=typeof Promise=="function"?Promise:void 0,ab=typeof queueMicrotask=="function"?queueMicrotask:typeof wg<"u"?function(t){return wg.resolve(null).then(t).catch(lb)}:Gd;function lb(t){setTimeout(function(){throw t})}function Ju(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),Ao(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Ao(e)}function _r(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Eg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var ys=Math.random().toString(36).slice(2),on="__reactFiber$"+ys,No="__reactProps$"+ys,zn="__reactContainer$"+ys,Qd="__reactEvents$"+ys,cb="__reactListeners$"+ys,ub="__reactHandles$"+ys;function Qr(t){var e=t[on];if(e)return e;for(var n=t.parentNode;n;){if(e=n[zn]||n[on]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Eg(t);t!==null;){if(n=t[on])return n;t=Eg(t)}return e}t=n,n=t.parentNode}return null}function ra(t){return t=t[on]||t[zn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Vi(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(U(33))}function Pc(t){return t[No]||null}var Yd=[],Mi=-1;function Or(t){return{current:t}}function we(t){0>Mi||(t.current=Yd[Mi],Yd[Mi]=null,Mi--)}function ye(t,e){Mi++,Yd[Mi]=t.current,t.current=e}var Rr={},ut=Or(Rr),wt=Or(!1),ri=Rr;function ts(t,e){var n=t.type.contextTypes;if(!n)return Rr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Et(t){return t=t.childContextTypes,t!=null}function Hl(){we(wt),we(ut)}function Sg(t,e,n){if(ut.current!==Rr)throw Error(U(168));ye(ut,e),ye(wt,n)}function G0(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(U(108,GE(t)||"Unknown",i));return Te({},n,r)}function Kl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Rr,ri=ut.current,ye(ut,t),ye(wt,wt.current),!0}function bg(t,e,n){var r=t.stateNode;if(!r)throw Error(U(169));n?(t=G0(t,e,ri),r.__reactInternalMemoizedMergedChildContext=t,we(wt),we(ut),ye(ut,t)):we(wt),ye(wt,n)}var Rn=null,jc=!1,Zu=!1;function Q0(t){Rn===null?Rn=[t]:Rn.push(t)}function db(t){jc=!0,Q0(t)}function Lr(){if(!Zu&&Rn!==null){Zu=!0;var t=0,e=he;try{var n=Rn;for(he=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Rn=null,jc=!1}catch(i){throw Rn!==null&&(Rn=Rn.slice(t+1)),x0(nf,Lr),i}finally{he=e,Zu=!1}}return null}var Fi=[],zi=0,ql=null,Gl=0,jt=[],Nt=0,ii=null,Pn=1,jn="";function Hr(t,e){Fi[zi++]=Gl,Fi[zi++]=ql,ql=t,Gl=e}function Y0(t,e,n){jt[Nt++]=Pn,jt[Nt++]=jn,jt[Nt++]=ii,ii=t;var r=Pn;t=jn;var i=32-Yt(r)-1;r&=~(1<<i),n+=1;var s=32-Yt(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Pn=1<<32-Yt(e)+i|n<<i|r,jn=s+t}else Pn=1<<s|n<<i|r,jn=t}function hf(t){t.return!==null&&(Hr(t,1),Y0(t,1,0))}function ff(t){for(;t===ql;)ql=Fi[--zi],Fi[zi]=null,Gl=Fi[--zi],Fi[zi]=null;for(;t===ii;)ii=jt[--Nt],jt[Nt]=null,jn=jt[--Nt],jt[Nt]=null,Pn=jt[--Nt],jt[Nt]=null}var At=null,kt=null,Ee=!1,$t=null;function X0(t,e){var n=Ot(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Tg(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,At=t,kt=_r(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,At=t,kt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=ii!==null?{id:Pn,overflow:jn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Ot(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,At=t,kt=null,!0):!1;default:return!1}}function Xd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Jd(t){if(Ee){var e=kt;if(e){var n=e;if(!Tg(t,e)){if(Xd(t))throw Error(U(418));e=_r(n.nextSibling);var r=At;e&&Tg(t,e)?X0(r,n):(t.flags=t.flags&-4097|2,Ee=!1,At=t)}}else{if(Xd(t))throw Error(U(418));t.flags=t.flags&-4097|2,Ee=!1,At=t}}}function Ig(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;At=t}function Qa(t){if(t!==At)return!1;if(!Ee)return Ig(t),Ee=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!qd(t.type,t.memoizedProps)),e&&(e=kt)){if(Xd(t))throw J0(),Error(U(418));for(;e;)X0(t,e),e=_r(e.nextSibling)}if(Ig(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(U(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){kt=_r(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}kt=null}}else kt=At?_r(t.stateNode.nextSibling):null;return!0}function J0(){for(var t=kt;t;)t=_r(t.nextSibling)}function ns(){kt=At=null,Ee=!1}function pf(t){$t===null?$t=[t]:$t.push(t)}var hb=Gn.ReactCurrentBatchConfig;function $s(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(U(309));var r=n.stateNode}if(!r)throw Error(U(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var c=i.refs;o===null?delete c[s]:c[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(U(284));if(!n._owner)throw Error(U(290,t))}return t}function Ya(t,e){throw t=Object.prototype.toString.call(e),Error(U(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function kg(t){var e=t._init;return e(t._payload)}function Z0(t){function e(w,x){if(t){var T=w.deletions;T===null?(w.deletions=[x],w.flags|=16):T.push(x)}}function n(w,x){if(!t)return null;for(;x!==null;)e(w,x),x=x.sibling;return null}function r(w,x){for(w=new Map;x!==null;)x.key!==null?w.set(x.key,x):w.set(x.index,x),x=x.sibling;return w}function i(w,x){return w=Sr(w,x),w.index=0,w.sibling=null,w}function s(w,x,T){return w.index=T,t?(T=w.alternate,T!==null?(T=T.index,T<x?(w.flags|=2,x):T):(w.flags|=2,x)):(w.flags|=1048576,x)}function o(w){return t&&w.alternate===null&&(w.flags|=2),w}function c(w,x,T,O){return x===null||x.tag!==6?(x=od(T,w.mode,O),x.return=w,x):(x=i(x,T),x.return=w,x)}function u(w,x,T,O){var D=T.type;return D===Ni?f(w,x,T.props.children,O,T.key):x!==null&&(x.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===ir&&kg(D)===x.type)?(O=i(x,T.props),O.ref=$s(w,x,T),O.return=w,O):(O=bl(T.type,T.key,T.props,null,w.mode,O),O.ref=$s(w,x,T),O.return=w,O)}function d(w,x,T,O){return x===null||x.tag!==4||x.stateNode.containerInfo!==T.containerInfo||x.stateNode.implementation!==T.implementation?(x=ad(T,w.mode,O),x.return=w,x):(x=i(x,T.children||[]),x.return=w,x)}function f(w,x,T,O,D){return x===null||x.tag!==7?(x=ti(T,w.mode,O,D),x.return=w,x):(x=i(x,T),x.return=w,x)}function m(w,x,T){if(typeof x=="string"&&x!==""||typeof x=="number")return x=od(""+x,w.mode,T),x.return=w,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Fa:return T=bl(x.type,x.key,x.props,null,w.mode,T),T.ref=$s(w,null,x),T.return=w,T;case ji:return x=ad(x,w.mode,T),x.return=w,x;case ir:var O=x._init;return m(w,O(x._payload),T)}if(Zs(x)||Fs(x))return x=ti(x,w.mode,T,null),x.return=w,x;Ya(w,x)}return null}function g(w,x,T,O){var D=x!==null?x.key:null;if(typeof T=="string"&&T!==""||typeof T=="number")return D!==null?null:c(w,x,""+T,O);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case Fa:return T.key===D?u(w,x,T,O):null;case ji:return T.key===D?d(w,x,T,O):null;case ir:return D=T._init,g(w,x,D(T._payload),O)}if(Zs(T)||Fs(T))return D!==null?null:f(w,x,T,O,null);Ya(w,T)}return null}function b(w,x,T,O,D){if(typeof O=="string"&&O!==""||typeof O=="number")return w=w.get(T)||null,c(x,w,""+O,D);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case Fa:return w=w.get(O.key===null?T:O.key)||null,u(x,w,O,D);case ji:return w=w.get(O.key===null?T:O.key)||null,d(x,w,O,D);case ir:var V=O._init;return b(w,x,T,V(O._payload),D)}if(Zs(O)||Fs(O))return w=w.get(T)||null,f(x,w,O,D,null);Ya(x,O)}return null}function k(w,x,T,O){for(var D=null,V=null,E=x,v=x=0,S=null;E!==null&&v<T.length;v++){E.index>v?(S=E,E=null):S=E.sibling;var I=g(w,E,T[v],O);if(I===null){E===null&&(E=S);break}t&&E&&I.alternate===null&&e(w,E),x=s(I,x,v),V===null?D=I:V.sibling=I,V=I,E=S}if(v===T.length)return n(w,E),Ee&&Hr(w,v),D;if(E===null){for(;v<T.length;v++)E=m(w,T[v],O),E!==null&&(x=s(E,x,v),V===null?D=E:V.sibling=E,V=E);return Ee&&Hr(w,v),D}for(E=r(w,E);v<T.length;v++)S=b(E,w,v,T[v],O),S!==null&&(t&&S.alternate!==null&&E.delete(S.key===null?v:S.key),x=s(S,x,v),V===null?D=S:V.sibling=S,V=S);return t&&E.forEach(function(A){return e(w,A)}),Ee&&Hr(w,v),D}function P(w,x,T,O){var D=Fs(T);if(typeof D!="function")throw Error(U(150));if(T=D.call(T),T==null)throw Error(U(151));for(var V=D=null,E=x,v=x=0,S=null,I=T.next();E!==null&&!I.done;v++,I=T.next()){E.index>v?(S=E,E=null):S=E.sibling;var A=g(w,E,I.value,O);if(A===null){E===null&&(E=S);break}t&&E&&A.alternate===null&&e(w,E),x=s(A,x,v),V===null?D=A:V.sibling=A,V=A,E=S}if(I.done)return n(w,E),Ee&&Hr(w,v),D;if(E===null){for(;!I.done;v++,I=T.next())I=m(w,I.value,O),I!==null&&(x=s(I,x,v),V===null?D=I:V.sibling=I,V=I);return Ee&&Hr(w,v),D}for(E=r(w,E);!I.done;v++,I=T.next())I=b(E,w,v,I.value,O),I!==null&&(t&&I.alternate!==null&&E.delete(I.key===null?v:I.key),x=s(I,x,v),V===null?D=I:V.sibling=I,V=I);return t&&E.forEach(function(R){return e(w,R)}),Ee&&Hr(w,v),D}function j(w,x,T,O){if(typeof T=="object"&&T!==null&&T.type===Ni&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case Fa:e:{for(var D=T.key,V=x;V!==null;){if(V.key===D){if(D=T.type,D===Ni){if(V.tag===7){n(w,V.sibling),x=i(V,T.props.children),x.return=w,w=x;break e}}else if(V.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===ir&&kg(D)===V.type){n(w,V.sibling),x=i(V,T.props),x.ref=$s(w,V,T),x.return=w,w=x;break e}n(w,V);break}else e(w,V);V=V.sibling}T.type===Ni?(x=ti(T.props.children,w.mode,O,T.key),x.return=w,w=x):(O=bl(T.type,T.key,T.props,null,w.mode,O),O.ref=$s(w,x,T),O.return=w,w=O)}return o(w);case ji:e:{for(V=T.key;x!==null;){if(x.key===V)if(x.tag===4&&x.stateNode.containerInfo===T.containerInfo&&x.stateNode.implementation===T.implementation){n(w,x.sibling),x=i(x,T.children||[]),x.return=w,w=x;break e}else{n(w,x);break}else e(w,x);x=x.sibling}x=ad(T,w.mode,O),x.return=w,w=x}return o(w);case ir:return V=T._init,j(w,x,V(T._payload),O)}if(Zs(T))return k(w,x,T,O);if(Fs(T))return P(w,x,T,O);Ya(w,T)}return typeof T=="string"&&T!==""||typeof T=="number"?(T=""+T,x!==null&&x.tag===6?(n(w,x.sibling),x=i(x,T),x.return=w,w=x):(n(w,x),x=od(T,w.mode,O),x.return=w,w=x),o(w)):n(w,x)}return j}var rs=Z0(!0),e_=Z0(!1),Ql=Or(null),Yl=null,Ui=null,mf=null;function gf(){mf=Ui=Yl=null}function yf(t){var e=Ql.current;we(Ql),t._currentValue=e}function Zd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Gi(t,e){Yl=t,mf=Ui=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(xt=!0),t.firstContext=null)}function Vt(t){var e=t._currentValue;if(mf!==t)if(t={context:t,memoizedValue:e,next:null},Ui===null){if(Yl===null)throw Error(U(308));Ui=t,Yl.dependencies={lanes:0,firstContext:t}}else Ui=Ui.next=t;return e}var Yr=null;function vf(t){Yr===null?Yr=[t]:Yr.push(t)}function t_(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,vf(e)):(n.next=i.next,i.next=n),e.interleaved=n,Un(t,r)}function Un(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var sr=!1;function _f(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function n_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ln(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function xr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,le&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Un(t,n)}return i=r.interleaved,i===null?(e.next=e,vf(r)):(e.next=i.next,i.next=e),r.interleaved=e,Un(t,n)}function vl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,rf(t,n)}}function Ag(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Xl(t,e,n,r){var i=t.updateQueue;sr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,c=i.shared.pending;if(c!==null){i.shared.pending=null;var u=c,d=u.next;u.next=null,o===null?s=d:o.next=d,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,c=f.lastBaseUpdate,c!==o&&(c===null?f.firstBaseUpdate=d:c.next=d,f.lastBaseUpdate=u))}if(s!==null){var m=i.baseState;o=0,f=d=u=null,c=s;do{var g=c.lane,b=c.eventTime;if((r&g)===g){f!==null&&(f=f.next={eventTime:b,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var k=t,P=c;switch(g=e,b=n,P.tag){case 1:if(k=P.payload,typeof k=="function"){m=k.call(b,m,g);break e}m=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=P.payload,g=typeof k=="function"?k.call(b,m,g):k,g==null)break e;m=Te({},m,g);break e;case 2:sr=!0}}c.callback!==null&&c.lane!==0&&(t.flags|=64,g=i.effects,g===null?i.effects=[c]:g.push(c))}else b={eventTime:b,lane:g,tag:c.tag,payload:c.payload,callback:c.callback,next:null},f===null?(d=f=b,u=m):f=f.next=b,o|=g;if(c=c.next,c===null){if(c=i.shared.pending,c===null)break;g=c,c=g.next,g.next=null,i.lastBaseUpdate=g,i.shared.pending=null}}while(!0);if(f===null&&(u=m),i.baseState=u,i.firstBaseUpdate=d,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);oi|=o,t.lanes=o,t.memoizedState=m}}function Rg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(U(191,i));i.call(r)}}}var ia={},un=Or(ia),Do=Or(ia),Oo=Or(ia);function Xr(t){if(t===ia)throw Error(U(174));return t}function xf(t,e){switch(ye(Oo,e),ye(Do,t),ye(un,ia),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Nd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Nd(e,t)}we(un),ye(un,e)}function is(){we(un),we(Do),we(Oo)}function r_(t){Xr(Oo.current);var e=Xr(un.current),n=Nd(e,t.type);e!==n&&(ye(Do,t),ye(un,n))}function wf(t){Do.current===t&&(we(un),we(Do))}var Se=Or(0);function Jl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ed=[];function Ef(){for(var t=0;t<ed.length;t++)ed[t]._workInProgressVersionPrimary=null;ed.length=0}var _l=Gn.ReactCurrentDispatcher,td=Gn.ReactCurrentBatchConfig,si=0,be=null,Me=null,Be=null,Zl=!1,po=!1,Lo=0,fb=0;function it(){throw Error(U(321))}function Sf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!en(t[n],e[n]))return!1;return!0}function bf(t,e,n,r,i,s){if(si=s,be=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,_l.current=t===null||t.memoizedState===null?yb:vb,t=n(r,i),po){s=0;do{if(po=!1,Lo=0,25<=s)throw Error(U(301));s+=1,Be=Me=null,e.updateQueue=null,_l.current=_b,t=n(r,i)}while(po)}if(_l.current=ec,e=Me!==null&&Me.next!==null,si=0,Be=Me=be=null,Zl=!1,e)throw Error(U(300));return t}function Tf(){var t=Lo!==0;return Lo=0,t}function sn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Be===null?be.memoizedState=Be=t:Be=Be.next=t,Be}function Mt(){if(Me===null){var t=be.alternate;t=t!==null?t.memoizedState:null}else t=Me.next;var e=Be===null?be.memoizedState:Be.next;if(e!==null)Be=e,Me=t;else{if(t===null)throw Error(U(310));Me=t,t={memoizedState:Me.memoizedState,baseState:Me.baseState,baseQueue:Me.baseQueue,queue:Me.queue,next:null},Be===null?be.memoizedState=Be=t:Be=Be.next=t}return Be}function Vo(t,e){return typeof e=="function"?e(t):e}function nd(t){var e=Mt(),n=e.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=t;var r=Me,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var c=o=null,u=null,d=s;do{var f=d.lane;if((si&f)===f)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:t(r,d.action);else{var m={lane:f,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(c=u=m,o=r):u=u.next=m,be.lanes|=f,oi|=f}d=d.next}while(d!==null&&d!==s);u===null?o=r:u.next=c,en(r,e.memoizedState)||(xt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,be.lanes|=s,oi|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function rd(t){var e=Mt(),n=e.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);en(s,e.memoizedState)||(xt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function i_(){}function s_(t,e){var n=be,r=Mt(),i=e(),s=!en(r.memoizedState,i);if(s&&(r.memoizedState=i,xt=!0),r=r.queue,If(l_.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Be!==null&&Be.memoizedState.tag&1){if(n.flags|=2048,Mo(9,a_.bind(null,n,r,i,e),void 0,null),We===null)throw Error(U(349));si&30||o_(n,e,i)}return i}function o_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=be.updateQueue,e===null?(e={lastEffect:null,stores:null},be.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function a_(t,e,n,r){e.value=n,e.getSnapshot=r,c_(e)&&u_(t)}function l_(t,e,n){return n(function(){c_(e)&&u_(t)})}function c_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!en(t,n)}catch{return!0}}function u_(t){var e=Un(t,1);e!==null&&Xt(e,t,1,-1)}function Cg(t){var e=sn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vo,lastRenderedState:t},e.queue=t,t=t.dispatch=gb.bind(null,be,t),[e.memoizedState,t]}function Mo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=be.updateQueue,e===null?(e={lastEffect:null,stores:null},be.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function d_(){return Mt().memoizedState}function xl(t,e,n,r){var i=sn();be.flags|=t,i.memoizedState=Mo(1|e,n,void 0,r===void 0?null:r)}function Nc(t,e,n,r){var i=Mt();r=r===void 0?null:r;var s=void 0;if(Me!==null){var o=Me.memoizedState;if(s=o.destroy,r!==null&&Sf(r,o.deps)){i.memoizedState=Mo(e,n,s,r);return}}be.flags|=t,i.memoizedState=Mo(1|e,n,s,r)}function Pg(t,e){return xl(8390656,8,t,e)}function If(t,e){return Nc(2048,8,t,e)}function h_(t,e){return Nc(4,2,t,e)}function f_(t,e){return Nc(4,4,t,e)}function p_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function m_(t,e,n){return n=n!=null?n.concat([t]):null,Nc(4,4,p_.bind(null,e,t),n)}function kf(){}function g_(t,e){var n=Mt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Sf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function y_(t,e){var n=Mt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Sf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function v_(t,e,n){return si&21?(en(n,e)||(n=S0(),be.lanes|=n,oi|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,xt=!0),t.memoizedState=n)}function pb(t,e){var n=he;he=n!==0&&4>n?n:4,t(!0);var r=td.transition;td.transition={};try{t(!1),e()}finally{he=n,td.transition=r}}function __(){return Mt().memoizedState}function mb(t,e,n){var r=Er(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},x_(t))w_(e,n);else if(n=t_(t,e,n,r),n!==null){var i=mt();Xt(n,t,r,i),E_(n,e,r)}}function gb(t,e,n){var r=Er(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(x_(t))w_(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,c=s(o,n);if(i.hasEagerState=!0,i.eagerState=c,en(c,o)){var u=e.interleaved;u===null?(i.next=i,vf(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=t_(t,e,i,r),n!==null&&(i=mt(),Xt(n,t,r,i),E_(n,e,r))}}function x_(t){var e=t.alternate;return t===be||e!==null&&e===be}function w_(t,e){po=Zl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function E_(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,rf(t,n)}}var ec={readContext:Vt,useCallback:it,useContext:it,useEffect:it,useImperativeHandle:it,useInsertionEffect:it,useLayoutEffect:it,useMemo:it,useReducer:it,useRef:it,useState:it,useDebugValue:it,useDeferredValue:it,useTransition:it,useMutableSource:it,useSyncExternalStore:it,useId:it,unstable_isNewReconciler:!1},yb={readContext:Vt,useCallback:function(t,e){return sn().memoizedState=[t,e===void 0?null:e],t},useContext:Vt,useEffect:Pg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,xl(4194308,4,p_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return xl(4194308,4,t,e)},useInsertionEffect:function(t,e){return xl(4,2,t,e)},useMemo:function(t,e){var n=sn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=sn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=mb.bind(null,be,t),[r.memoizedState,t]},useRef:function(t){var e=sn();return t={current:t},e.memoizedState=t},useState:Cg,useDebugValue:kf,useDeferredValue:function(t){return sn().memoizedState=t},useTransition:function(){var t=Cg(!1),e=t[0];return t=pb.bind(null,t[1]),sn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=be,i=sn();if(Ee){if(n===void 0)throw Error(U(407));n=n()}else{if(n=e(),We===null)throw Error(U(349));si&30||o_(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Pg(l_.bind(null,r,s,t),[t]),r.flags|=2048,Mo(9,a_.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=sn(),e=We.identifierPrefix;if(Ee){var n=jn,r=Pn;n=(r&~(1<<32-Yt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Lo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=fb++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},vb={readContext:Vt,useCallback:g_,useContext:Vt,useEffect:If,useImperativeHandle:m_,useInsertionEffect:h_,useLayoutEffect:f_,useMemo:y_,useReducer:nd,useRef:d_,useState:function(){return nd(Vo)},useDebugValue:kf,useDeferredValue:function(t){var e=Mt();return v_(e,Me.memoizedState,t)},useTransition:function(){var t=nd(Vo)[0],e=Mt().memoizedState;return[t,e]},useMutableSource:i_,useSyncExternalStore:s_,useId:__,unstable_isNewReconciler:!1},_b={readContext:Vt,useCallback:g_,useContext:Vt,useEffect:If,useImperativeHandle:m_,useInsertionEffect:h_,useLayoutEffect:f_,useMemo:y_,useReducer:rd,useRef:d_,useState:function(){return rd(Vo)},useDebugValue:kf,useDeferredValue:function(t){var e=Mt();return Me===null?e.memoizedState=t:v_(e,Me.memoizedState,t)},useTransition:function(){var t=rd(Vo)[0],e=Mt().memoizedState;return[t,e]},useMutableSource:i_,useSyncExternalStore:s_,useId:__,unstable_isNewReconciler:!1};function Bt(t,e){if(t&&t.defaultProps){e=Te({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function eh(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Te({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Dc={isMounted:function(t){return(t=t._reactInternals)?gi(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=mt(),i=Er(t),s=Ln(r,i);s.payload=e,n!=null&&(s.callback=n),e=xr(t,s,i),e!==null&&(Xt(e,t,i,r),vl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=mt(),i=Er(t),s=Ln(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=xr(t,s,i),e!==null&&(Xt(e,t,i,r),vl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=mt(),r=Er(t),i=Ln(n,r);i.tag=2,e!=null&&(i.callback=e),e=xr(t,i,r),e!==null&&(Xt(e,t,r,n),vl(e,t,r))}};function jg(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!Co(n,r)||!Co(i,s):!0}function S_(t,e,n){var r=!1,i=Rr,s=e.contextType;return typeof s=="object"&&s!==null?s=Vt(s):(i=Et(e)?ri:ut.current,r=e.contextTypes,s=(r=r!=null)?ts(t,i):Rr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Dc,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Ng(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Dc.enqueueReplaceState(e,e.state,null)}function th(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},_f(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Vt(s):(s=Et(e)?ri:ut.current,i.context=ts(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(eh(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Dc.enqueueReplaceState(i,i.state,null),Xl(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function ss(t,e){try{var n="",r=e;do n+=qE(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function id(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function nh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var xb=typeof WeakMap=="function"?WeakMap:Map;function b_(t,e,n){n=Ln(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){nc||(nc=!0,hh=r),nh(t,e)},n}function T_(t,e,n){n=Ln(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){nh(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){nh(t,e),typeof r!="function"&&(wr===null?wr=new Set([this]):wr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Dg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new xb;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=Db.bind(null,t,e,n),e.then(t,t))}function Og(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Lg(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ln(-1,1),e.tag=2,xr(n,e,1))),n.lanes|=1),t)}var wb=Gn.ReactCurrentOwner,xt=!1;function pt(t,e,n,r){e.child=t===null?e_(e,null,n,r):rs(e,t.child,n,r)}function Vg(t,e,n,r,i){n=n.render;var s=e.ref;return Gi(e,i),r=bf(t,e,n,r,s,i),n=Tf(),t!==null&&!xt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Bn(t,e,i)):(Ee&&n&&hf(e),e.flags|=1,pt(t,e,r,i),e.child)}function Mg(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Of(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,I_(t,e,s,r,i)):(t=bl(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Co,n(o,r)&&t.ref===e.ref)return Bn(t,e,i)}return e.flags|=1,t=Sr(s,r),t.ref=e.ref,t.return=e,e.child=t}function I_(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(Co(s,r)&&t.ref===e.ref)if(xt=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(xt=!0);else return e.lanes=t.lanes,Bn(t,e,i)}return rh(t,e,n,r,i)}function k_(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ye(Wi,Tt),Tt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ye(Wi,Tt),Tt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ye(Wi,Tt),Tt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,ye(Wi,Tt),Tt|=r;return pt(t,e,i,n),e.child}function A_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function rh(t,e,n,r,i){var s=Et(n)?ri:ut.current;return s=ts(e,s),Gi(e,i),n=bf(t,e,n,r,s,i),r=Tf(),t!==null&&!xt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Bn(t,e,i)):(Ee&&r&&hf(e),e.flags|=1,pt(t,e,n,i),e.child)}function Fg(t,e,n,r,i){if(Et(n)){var s=!0;Kl(e)}else s=!1;if(Gi(e,i),e.stateNode===null)wl(t,e),S_(e,n,r),th(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,c=e.memoizedProps;o.props=c;var u=o.context,d=n.contextType;typeof d=="object"&&d!==null?d=Vt(d):(d=Et(n)?ri:ut.current,d=ts(e,d));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==r||u!==d)&&Ng(e,o,r,d),sr=!1;var g=e.memoizedState;o.state=g,Xl(e,r,o,i),u=e.memoizedState,c!==r||g!==u||wt.current||sr?(typeof f=="function"&&(eh(e,n,f,r),u=e.memoizedState),(c=sr||jg(e,n,c,r,g,u,d))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=d,r=c):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,n_(t,e),c=e.memoizedProps,d=e.type===e.elementType?c:Bt(e.type,c),o.props=d,m=e.pendingProps,g=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Vt(u):(u=Et(n)?ri:ut.current,u=ts(e,u));var b=n.getDerivedStateFromProps;(f=typeof b=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==m||g!==u)&&Ng(e,o,r,u),sr=!1,g=e.memoizedState,o.state=g,Xl(e,r,o,i);var k=e.memoizedState;c!==m||g!==k||wt.current||sr?(typeof b=="function"&&(eh(e,n,b,r),k=e.memoizedState),(d=sr||jg(e,n,d,r,g,k,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,k,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,k,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||c===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=k),o.props=r,o.state=k,o.context=u,r=d):(typeof o.componentDidUpdate!="function"||c===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return ih(t,e,n,r,s,i)}function ih(t,e,n,r,i,s){A_(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&bg(e,n,!1),Bn(t,e,s);r=e.stateNode,wb.current=e;var c=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=rs(e,t.child,null,s),e.child=rs(e,null,c,s)):pt(t,e,c,s),e.memoizedState=r.state,i&&bg(e,n,!0),e.child}function R_(t){var e=t.stateNode;e.pendingContext?Sg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Sg(t,e.context,!1),xf(t,e.containerInfo)}function zg(t,e,n,r,i){return ns(),pf(i),e.flags|=256,pt(t,e,n,r),e.child}var sh={dehydrated:null,treeContext:null,retryLane:0};function oh(t){return{baseLanes:t,cachePool:null,transitions:null}}function C_(t,e,n){var r=e.pendingProps,i=Se.current,s=!1,o=(e.flags&128)!==0,c;if((c=o)||(c=t!==null&&t.memoizedState===null?!1:(i&2)!==0),c?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),ye(Se,i&1),t===null)return Jd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Vc(o,r,0,null),t=ti(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=oh(n),e.memoizedState=sh,t):Af(e,o));if(i=t.memoizedState,i!==null&&(c=i.dehydrated,c!==null))return Eb(t,e,o,r,c,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,c=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Sr(i,u),r.subtreeFlags=i.subtreeFlags&14680064),c!==null?s=Sr(c,s):(s=ti(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?oh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=sh,r}return s=t.child,t=s.sibling,r=Sr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Af(t,e){return e=Vc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Xa(t,e,n,r){return r!==null&&pf(r),rs(e,t.child,null,n),t=Af(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Eb(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=id(Error(U(422))),Xa(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Vc({mode:"visible",children:r.children},i,0,null),s=ti(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&rs(e,t.child,null,o),e.child.memoizedState=oh(o),e.memoizedState=sh,s);if(!(e.mode&1))return Xa(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var c=r.dgst;return r=c,s=Error(U(419)),r=id(s,r,void 0),Xa(t,e,o,r)}if(c=(o&t.childLanes)!==0,xt||c){if(r=We,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Un(t,i),Xt(r,t,i,-1))}return Df(),r=id(Error(U(421))),Xa(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=Ob.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,kt=_r(i.nextSibling),At=e,Ee=!0,$t=null,t!==null&&(jt[Nt++]=Pn,jt[Nt++]=jn,jt[Nt++]=ii,Pn=t.id,jn=t.overflow,ii=e),e=Af(e,r.children),e.flags|=4096,e)}function Ug(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Zd(t.return,e,n)}function sd(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function P_(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(pt(t,e,r.children,n),r=Se.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ug(t,n,e);else if(t.tag===19)Ug(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ye(Se,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Jl(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),sd(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Jl(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}sd(e,!0,n,null,s);break;case"together":sd(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function wl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Bn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),oi|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(U(153));if(e.child!==null){for(t=e.child,n=Sr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Sr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Sb(t,e,n){switch(e.tag){case 3:R_(e),ns();break;case 5:r_(e);break;case 1:Et(e.type)&&Kl(e);break;case 4:xf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;ye(Ql,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ye(Se,Se.current&1),e.flags|=128,null):n&e.child.childLanes?C_(t,e,n):(ye(Se,Se.current&1),t=Bn(t,e,n),t!==null?t.sibling:null);ye(Se,Se.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return P_(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ye(Se,Se.current),r)break;return null;case 22:case 23:return e.lanes=0,k_(t,e,n)}return Bn(t,e,n)}var j_,ah,N_,D_;j_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ah=function(){};N_=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,Xr(un.current);var s=null;switch(n){case"input":i=Rd(t,i),r=Rd(t,r),s=[];break;case"select":i=Te({},i,{value:void 0}),r=Te({},r,{value:void 0}),s=[];break;case"textarea":i=jd(t,i),r=jd(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=$l)}Dd(n,r);var o;n=null;for(d in i)if(!r.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var c=i[d];for(o in c)c.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(So.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in r){var u=r[d];if(c=i!=null?i[d]:void 0,r.hasOwnProperty(d)&&u!==c&&(u!=null||c!=null))if(d==="style")if(c){for(o in c)!c.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&c[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(d,n)),n=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,c=c?c.__html:void 0,u!=null&&c!==u&&(s=s||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(So.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&_e("scroll",t),s||c===u||(s=[])):(s=s||[]).push(d,u))}n&&(s=s||[]).push("style",n);var d=s;(e.updateQueue=d)&&(e.flags|=4)}};D_=function(t,e,n,r){n!==r&&(e.flags|=4)};function Hs(t,e){if(!Ee)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function st(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function bb(t,e,n){var r=e.pendingProps;switch(ff(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return st(e),null;case 1:return Et(e.type)&&Hl(),st(e),null;case 3:return r=e.stateNode,is(),we(wt),we(ut),Ef(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Qa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,$t!==null&&(mh($t),$t=null))),ah(t,e),st(e),null;case 5:wf(e);var i=Xr(Oo.current);if(n=e.type,t!==null&&e.stateNode!=null)N_(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(U(166));return st(e),null}if(t=Xr(un.current),Qa(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[on]=e,r[No]=s,t=(e.mode&1)!==0,n){case"dialog":_e("cancel",r),_e("close",r);break;case"iframe":case"object":case"embed":_e("load",r);break;case"video":case"audio":for(i=0;i<to.length;i++)_e(to[i],r);break;case"source":_e("error",r);break;case"img":case"image":case"link":_e("error",r),_e("load",r);break;case"details":_e("toggle",r);break;case"input":Ym(r,s),_e("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},_e("invalid",r);break;case"textarea":Jm(r,s),_e("invalid",r)}Dd(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var c=s[o];o==="children"?typeof c=="string"?r.textContent!==c&&(s.suppressHydrationWarning!==!0&&Ga(r.textContent,c,t),i=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(s.suppressHydrationWarning!==!0&&Ga(r.textContent,c,t),i=["children",""+c]):So.hasOwnProperty(o)&&c!=null&&o==="onScroll"&&_e("scroll",r)}switch(n){case"input":za(r),Xm(r,s,!0);break;case"textarea":za(r),Zm(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=$l)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=l0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[on]=e,t[No]=r,j_(t,e,!1,!1),e.stateNode=t;e:{switch(o=Od(n,r),n){case"dialog":_e("cancel",t),_e("close",t),i=r;break;case"iframe":case"object":case"embed":_e("load",t),i=r;break;case"video":case"audio":for(i=0;i<to.length;i++)_e(to[i],t);i=r;break;case"source":_e("error",t),i=r;break;case"img":case"image":case"link":_e("error",t),_e("load",t),i=r;break;case"details":_e("toggle",t),i=r;break;case"input":Ym(t,r),i=Rd(t,r),_e("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Te({},r,{value:void 0}),_e("invalid",t);break;case"textarea":Jm(t,r),i=jd(t,r),_e("invalid",t);break;default:i=r}Dd(n,i),c=i;for(s in c)if(c.hasOwnProperty(s)){var u=c[s];s==="style"?d0(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&c0(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&bo(t,u):typeof u=="number"&&bo(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(So.hasOwnProperty(s)?u!=null&&s==="onScroll"&&_e("scroll",t):u!=null&&Xh(t,s,u,o))}switch(n){case"input":za(t),Xm(t,r,!1);break;case"textarea":za(t),Zm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Ar(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?$i(t,!!r.multiple,s,!1):r.defaultValue!=null&&$i(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=$l)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return st(e),null;case 6:if(t&&e.stateNode!=null)D_(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(U(166));if(n=Xr(Oo.current),Xr(un.current),Qa(e)){if(r=e.stateNode,n=e.memoizedProps,r[on]=e,(s=r.nodeValue!==n)&&(t=At,t!==null))switch(t.tag){case 3:Ga(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ga(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[on]=e,e.stateNode=r}return st(e),null;case 13:if(we(Se),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ee&&kt!==null&&e.mode&1&&!(e.flags&128))J0(),ns(),e.flags|=98560,s=!1;else if(s=Qa(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(U(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(U(317));s[on]=e}else ns(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;st(e),s=!1}else $t!==null&&(mh($t),$t=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Se.current&1?Fe===0&&(Fe=3):Df())),e.updateQueue!==null&&(e.flags|=4),st(e),null);case 4:return is(),ah(t,e),t===null&&Po(e.stateNode.containerInfo),st(e),null;case 10:return yf(e.type._context),st(e),null;case 17:return Et(e.type)&&Hl(),st(e),null;case 19:if(we(Se),s=e.memoizedState,s===null)return st(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Hs(s,!1);else{if(Fe!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Jl(t),o!==null){for(e.flags|=128,Hs(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ye(Se,Se.current&1|2),e.child}t=t.sibling}s.tail!==null&&je()>os&&(e.flags|=128,r=!0,Hs(s,!1),e.lanes=4194304)}else{if(!r)if(t=Jl(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Hs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Ee)return st(e),null}else 2*je()-s.renderingStartTime>os&&n!==1073741824&&(e.flags|=128,r=!0,Hs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=je(),e.sibling=null,n=Se.current,ye(Se,r?n&1|2:n&1),e):(st(e),null);case 22:case 23:return Nf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Tt&1073741824&&(st(e),e.subtreeFlags&6&&(e.flags|=8192)):st(e),null;case 24:return null;case 25:return null}throw Error(U(156,e.tag))}function Tb(t,e){switch(ff(e),e.tag){case 1:return Et(e.type)&&Hl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return is(),we(wt),we(ut),Ef(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return wf(e),null;case 13:if(we(Se),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(U(340));ns()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return we(Se),null;case 4:return is(),null;case 10:return yf(e.type._context),null;case 22:case 23:return Nf(),null;case 24:return null;default:return null}}var Ja=!1,lt=!1,Ib=typeof WeakSet=="function"?WeakSet:Set,H=null;function Bi(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Re(t,e,r)}else n.current=null}function lh(t,e,n){try{n()}catch(r){Re(t,e,r)}}var Bg=!1;function kb(t,e){if(Hd=Ul,t=F0(),df(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,c=-1,u=-1,d=0,f=0,m=t,g=null;t:for(;;){for(var b;m!==n||i!==0&&m.nodeType!==3||(c=o+i),m!==s||r!==0&&m.nodeType!==3||(u=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(b=m.firstChild)!==null;)g=m,m=b;for(;;){if(m===t)break t;if(g===n&&++d===i&&(c=o),g===s&&++f===r&&(u=o),(b=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=b}n=c===-1||u===-1?null:{start:c,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Kd={focusedElem:t,selectionRange:n},Ul=!1,H=e;H!==null;)if(e=H,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,H=t;else for(;H!==null;){e=H;try{var k=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var P=k.memoizedProps,j=k.memoizedState,w=e.stateNode,x=w.getSnapshotBeforeUpdate(e.elementType===e.type?P:Bt(e.type,P),j);w.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var T=e.stateNode.containerInfo;T.nodeType===1?T.textContent="":T.nodeType===9&&T.documentElement&&T.removeChild(T.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(U(163))}}catch(O){Re(e,e.return,O)}if(t=e.sibling,t!==null){t.return=e.return,H=t;break}H=e.return}return k=Bg,Bg=!1,k}function mo(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&lh(e,n,s)}i=i.next}while(i!==r)}}function Oc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function ch(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function O_(t){var e=t.alternate;e!==null&&(t.alternate=null,O_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[on],delete e[No],delete e[Qd],delete e[cb],delete e[ub])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function L_(t){return t.tag===5||t.tag===3||t.tag===4}function Wg(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||L_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function uh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=$l));else if(r!==4&&(t=t.child,t!==null))for(uh(t,e,n),t=t.sibling;t!==null;)uh(t,e,n),t=t.sibling}function dh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(dh(t,e,n),t=t.sibling;t!==null;)dh(t,e,n),t=t.sibling}var Ge=null,Wt=!1;function tr(t,e,n){for(n=n.child;n!==null;)V_(t,e,n),n=n.sibling}function V_(t,e,n){if(cn&&typeof cn.onCommitFiberUnmount=="function")try{cn.onCommitFiberUnmount(kc,n)}catch{}switch(n.tag){case 5:lt||Bi(n,e);case 6:var r=Ge,i=Wt;Ge=null,tr(t,e,n),Ge=r,Wt=i,Ge!==null&&(Wt?(t=Ge,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ge.removeChild(n.stateNode));break;case 18:Ge!==null&&(Wt?(t=Ge,n=n.stateNode,t.nodeType===8?Ju(t.parentNode,n):t.nodeType===1&&Ju(t,n),Ao(t)):Ju(Ge,n.stateNode));break;case 4:r=Ge,i=Wt,Ge=n.stateNode.containerInfo,Wt=!0,tr(t,e,n),Ge=r,Wt=i;break;case 0:case 11:case 14:case 15:if(!lt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&lh(n,e,o),i=i.next}while(i!==r)}tr(t,e,n);break;case 1:if(!lt&&(Bi(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){Re(n,e,c)}tr(t,e,n);break;case 21:tr(t,e,n);break;case 22:n.mode&1?(lt=(r=lt)||n.memoizedState!==null,tr(t,e,n),lt=r):tr(t,e,n);break;default:tr(t,e,n)}}function $g(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Ib),e.forEach(function(r){var i=Lb.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Ut(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,c=o;e:for(;c!==null;){switch(c.tag){case 5:Ge=c.stateNode,Wt=!1;break e;case 3:Ge=c.stateNode.containerInfo,Wt=!0;break e;case 4:Ge=c.stateNode.containerInfo,Wt=!0;break e}c=c.return}if(Ge===null)throw Error(U(160));V_(s,o,i),Ge=null,Wt=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(d){Re(i,e,d)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)M_(e,t),e=e.sibling}function M_(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Ut(e,t),rn(t),r&4){try{mo(3,t,t.return),Oc(3,t)}catch(P){Re(t,t.return,P)}try{mo(5,t,t.return)}catch(P){Re(t,t.return,P)}}break;case 1:Ut(e,t),rn(t),r&512&&n!==null&&Bi(n,n.return);break;case 5:if(Ut(e,t),rn(t),r&512&&n!==null&&Bi(n,n.return),t.flags&32){var i=t.stateNode;try{bo(i,"")}catch(P){Re(t,t.return,P)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,c=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{c==="input"&&s.type==="radio"&&s.name!=null&&o0(i,s),Od(c,o);var d=Od(c,s);for(o=0;o<u.length;o+=2){var f=u[o],m=u[o+1];f==="style"?d0(i,m):f==="dangerouslySetInnerHTML"?c0(i,m):f==="children"?bo(i,m):Xh(i,f,m,d)}switch(c){case"input":Cd(i,s);break;case"textarea":a0(i,s);break;case"select":var g=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var b=s.value;b!=null?$i(i,!!s.multiple,b,!1):g!==!!s.multiple&&(s.defaultValue!=null?$i(i,!!s.multiple,s.defaultValue,!0):$i(i,!!s.multiple,s.multiple?[]:"",!1))}i[No]=s}catch(P){Re(t,t.return,P)}}break;case 6:if(Ut(e,t),rn(t),r&4){if(t.stateNode===null)throw Error(U(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(P){Re(t,t.return,P)}}break;case 3:if(Ut(e,t),rn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ao(e.containerInfo)}catch(P){Re(t,t.return,P)}break;case 4:Ut(e,t),rn(t);break;case 13:Ut(e,t),rn(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Pf=je())),r&4&&$g(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(lt=(d=lt)||f,Ut(e,t),lt=d):Ut(e,t),rn(t),r&8192){if(d=t.memoizedState!==null,(t.stateNode.isHidden=d)&&!f&&t.mode&1)for(H=t,f=t.child;f!==null;){for(m=H=f;H!==null;){switch(g=H,b=g.child,g.tag){case 0:case 11:case 14:case 15:mo(4,g,g.return);break;case 1:Bi(g,g.return);var k=g.stateNode;if(typeof k.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,k.props=e.memoizedProps,k.state=e.memoizedState,k.componentWillUnmount()}catch(P){Re(r,n,P)}}break;case 5:Bi(g,g.return);break;case 22:if(g.memoizedState!==null){Kg(m);continue}}b!==null?(b.return=g,H=b):Kg(m)}f=f.sibling}e:for(f=null,m=t;;){if(m.tag===5){if(f===null){f=m;try{i=m.stateNode,d?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(c=m.stateNode,u=m.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,c.style.display=u0("display",o))}catch(P){Re(t,t.return,P)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=d?"":m.memoizedProps}catch(P){Re(t,t.return,P)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ut(e,t),rn(t),r&4&&$g(t);break;case 21:break;default:Ut(e,t),rn(t)}}function rn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(L_(n)){var r=n;break e}n=n.return}throw Error(U(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(bo(i,""),r.flags&=-33);var s=Wg(t);dh(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,c=Wg(t);uh(t,c,o);break;default:throw Error(U(161))}}catch(u){Re(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Ab(t,e,n){H=t,F_(t)}function F_(t,e,n){for(var r=(t.mode&1)!==0;H!==null;){var i=H,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Ja;if(!o){var c=i.alternate,u=c!==null&&c.memoizedState!==null||lt;c=Ja;var d=lt;if(Ja=o,(lt=u)&&!d)for(H=i;H!==null;)o=H,u=o.child,o.tag===22&&o.memoizedState!==null?qg(i):u!==null?(u.return=o,H=u):qg(i);for(;s!==null;)H=s,F_(s),s=s.sibling;H=i,Ja=c,lt=d}Hg(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,H=s):Hg(t)}}function Hg(t){for(;H!==null;){var e=H;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:lt||Oc(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!lt)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Bt(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Rg(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Rg(e,o,n)}break;case 5:var c=e.stateNode;if(n===null&&e.flags&4){n=c;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var d=e.alternate;if(d!==null){var f=d.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&Ao(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(U(163))}lt||e.flags&512&&ch(e)}catch(g){Re(e,e.return,g)}}if(e===t){H=null;break}if(n=e.sibling,n!==null){n.return=e.return,H=n;break}H=e.return}}function Kg(t){for(;H!==null;){var e=H;if(e===t){H=null;break}var n=e.sibling;if(n!==null){n.return=e.return,H=n;break}H=e.return}}function qg(t){for(;H!==null;){var e=H;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Oc(4,e)}catch(u){Re(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Re(e,i,u)}}var s=e.return;try{ch(e)}catch(u){Re(e,s,u)}break;case 5:var o=e.return;try{ch(e)}catch(u){Re(e,o,u)}}}catch(u){Re(e,e.return,u)}if(e===t){H=null;break}var c=e.sibling;if(c!==null){c.return=e.return,H=c;break}H=e.return}}var Rb=Math.ceil,tc=Gn.ReactCurrentDispatcher,Rf=Gn.ReactCurrentOwner,Lt=Gn.ReactCurrentBatchConfig,le=0,We=null,Le=null,Xe=0,Tt=0,Wi=Or(0),Fe=0,Fo=null,oi=0,Lc=0,Cf=0,go=null,_t=null,Pf=0,os=1/0,An=null,nc=!1,hh=null,wr=null,Za=!1,fr=null,rc=0,yo=0,fh=null,El=-1,Sl=0;function mt(){return le&6?je():El!==-1?El:El=je()}function Er(t){return t.mode&1?le&2&&Xe!==0?Xe&-Xe:hb.transition!==null?(Sl===0&&(Sl=S0()),Sl):(t=he,t!==0||(t=window.event,t=t===void 0?16:C0(t.type)),t):1}function Xt(t,e,n,r){if(50<yo)throw yo=0,fh=null,Error(U(185));ta(t,n,r),(!(le&2)||t!==We)&&(t===We&&(!(le&2)&&(Lc|=n),Fe===4&&ar(t,Xe)),St(t,r),n===1&&le===0&&!(e.mode&1)&&(os=je()+500,jc&&Lr()))}function St(t,e){var n=t.callbackNode;hS(t,e);var r=zl(t,t===We?Xe:0);if(r===0)n!==null&&ng(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&ng(n),e===1)t.tag===0?db(Gg.bind(null,t)):Q0(Gg.bind(null,t)),ab(function(){!(le&6)&&Lr()}),n=null;else{switch(b0(r)){case 1:n=nf;break;case 4:n=w0;break;case 16:n=Fl;break;case 536870912:n=E0;break;default:n=Fl}n=q_(n,z_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function z_(t,e){if(El=-1,Sl=0,le&6)throw Error(U(327));var n=t.callbackNode;if(Qi()&&t.callbackNode!==n)return null;var r=zl(t,t===We?Xe:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=ic(t,r);else{e=r;var i=le;le|=2;var s=B_();(We!==t||Xe!==e)&&(An=null,os=je()+500,ei(t,e));do try{jb();break}catch(c){U_(t,c)}while(!0);gf(),tc.current=s,le=i,Le!==null?e=0:(We=null,Xe=0,e=Fe)}if(e!==0){if(e===2&&(i=zd(t),i!==0&&(r=i,e=ph(t,i))),e===1)throw n=Fo,ei(t,0),ar(t,r),St(t,je()),n;if(e===6)ar(t,r);else{if(i=t.current.alternate,!(r&30)&&!Cb(i)&&(e=ic(t,r),e===2&&(s=zd(t),s!==0&&(r=s,e=ph(t,s))),e===1))throw n=Fo,ei(t,0),ar(t,r),St(t,je()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(U(345));case 2:Kr(t,_t,An);break;case 3:if(ar(t,r),(r&130023424)===r&&(e=Pf+500-je(),10<e)){if(zl(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){mt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Gd(Kr.bind(null,t,_t,An),e);break}Kr(t,_t,An);break;case 4:if(ar(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Yt(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=je()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Rb(r/1960))-r,10<r){t.timeoutHandle=Gd(Kr.bind(null,t,_t,An),r);break}Kr(t,_t,An);break;case 5:Kr(t,_t,An);break;default:throw Error(U(329))}}}return St(t,je()),t.callbackNode===n?z_.bind(null,t):null}function ph(t,e){var n=go;return t.current.memoizedState.isDehydrated&&(ei(t,e).flags|=256),t=ic(t,e),t!==2&&(e=_t,_t=n,e!==null&&mh(e)),t}function mh(t){_t===null?_t=t:_t.push.apply(_t,t)}function Cb(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!en(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ar(t,e){for(e&=~Cf,e&=~Lc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Yt(e),r=1<<n;t[n]=-1,e&=~r}}function Gg(t){if(le&6)throw Error(U(327));Qi();var e=zl(t,0);if(!(e&1))return St(t,je()),null;var n=ic(t,e);if(t.tag!==0&&n===2){var r=zd(t);r!==0&&(e=r,n=ph(t,r))}if(n===1)throw n=Fo,ei(t,0),ar(t,e),St(t,je()),n;if(n===6)throw Error(U(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Kr(t,_t,An),St(t,je()),null}function jf(t,e){var n=le;le|=1;try{return t(e)}finally{le=n,le===0&&(os=je()+500,jc&&Lr())}}function ai(t){fr!==null&&fr.tag===0&&!(le&6)&&Qi();var e=le;le|=1;var n=Lt.transition,r=he;try{if(Lt.transition=null,he=1,t)return t()}finally{he=r,Lt.transition=n,le=e,!(le&6)&&Lr()}}function Nf(){Tt=Wi.current,we(Wi)}function ei(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,ob(n)),Le!==null)for(n=Le.return;n!==null;){var r=n;switch(ff(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Hl();break;case 3:is(),we(wt),we(ut),Ef();break;case 5:wf(r);break;case 4:is();break;case 13:we(Se);break;case 19:we(Se);break;case 10:yf(r.type._context);break;case 22:case 23:Nf()}n=n.return}if(We=t,Le=t=Sr(t.current,null),Xe=Tt=e,Fe=0,Fo=null,Cf=Lc=oi=0,_t=go=null,Yr!==null){for(e=0;e<Yr.length;e++)if(n=Yr[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}Yr=null}return t}function U_(t,e){do{var n=Le;try{if(gf(),_l.current=ec,Zl){for(var r=be.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Zl=!1}if(si=0,Be=Me=be=null,po=!1,Lo=0,Rf.current=null,n===null||n.return===null){Fe=1,Fo=e,Le=null;break}e:{var s=t,o=n.return,c=n,u=e;if(e=Xe,c.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,f=c,m=f.tag;if(!(f.mode&1)&&(m===0||m===11||m===15)){var g=f.alternate;g?(f.updateQueue=g.updateQueue,f.memoizedState=g.memoizedState,f.lanes=g.lanes):(f.updateQueue=null,f.memoizedState=null)}var b=Og(o);if(b!==null){b.flags&=-257,Lg(b,o,c,s,e),b.mode&1&&Dg(s,d,e),e=b,u=d;var k=e.updateQueue;if(k===null){var P=new Set;P.add(u),e.updateQueue=P}else k.add(u);break e}else{if(!(e&1)){Dg(s,d,e),Df();break e}u=Error(U(426))}}else if(Ee&&c.mode&1){var j=Og(o);if(j!==null){!(j.flags&65536)&&(j.flags|=256),Lg(j,o,c,s,e),pf(ss(u,c));break e}}s=u=ss(u,c),Fe!==4&&(Fe=2),go===null?go=[s]:go.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var w=b_(s,u,e);Ag(s,w);break e;case 1:c=u;var x=s.type,T=s.stateNode;if(!(s.flags&128)&&(typeof x.getDerivedStateFromError=="function"||T!==null&&typeof T.componentDidCatch=="function"&&(wr===null||!wr.has(T)))){s.flags|=65536,e&=-e,s.lanes|=e;var O=T_(s,c,e);Ag(s,O);break e}}s=s.return}while(s!==null)}$_(n)}catch(D){e=D,Le===n&&n!==null&&(Le=n=n.return);continue}break}while(!0)}function B_(){var t=tc.current;return tc.current=ec,t===null?ec:t}function Df(){(Fe===0||Fe===3||Fe===2)&&(Fe=4),We===null||!(oi&268435455)&&!(Lc&268435455)||ar(We,Xe)}function ic(t,e){var n=le;le|=2;var r=B_();(We!==t||Xe!==e)&&(An=null,ei(t,e));do try{Pb();break}catch(i){U_(t,i)}while(!0);if(gf(),le=n,tc.current=r,Le!==null)throw Error(U(261));return We=null,Xe=0,Fe}function Pb(){for(;Le!==null;)W_(Le)}function jb(){for(;Le!==null&&!rS();)W_(Le)}function W_(t){var e=K_(t.alternate,t,Tt);t.memoizedProps=t.pendingProps,e===null?$_(t):Le=e,Rf.current=null}function $_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Tb(n,e),n!==null){n.flags&=32767,Le=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Fe=6,Le=null;return}}else if(n=bb(n,e,Tt),n!==null){Le=n;return}if(e=e.sibling,e!==null){Le=e;return}Le=e=t}while(e!==null);Fe===0&&(Fe=5)}function Kr(t,e,n){var r=he,i=Lt.transition;try{Lt.transition=null,he=1,Nb(t,e,n,r)}finally{Lt.transition=i,he=r}return null}function Nb(t,e,n,r){do Qi();while(fr!==null);if(le&6)throw Error(U(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(U(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(fS(t,s),t===We&&(Le=We=null,Xe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Za||(Za=!0,q_(Fl,function(){return Qi(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Lt.transition,Lt.transition=null;var o=he;he=1;var c=le;le|=4,Rf.current=null,kb(t,n),M_(n,t),ZS(Kd),Ul=!!Hd,Kd=Hd=null,t.current=n,Ab(n),iS(),le=c,he=o,Lt.transition=s}else t.current=n;if(Za&&(Za=!1,fr=t,rc=i),s=t.pendingLanes,s===0&&(wr=null),aS(n.stateNode),St(t,je()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(nc)throw nc=!1,t=hh,hh=null,t;return rc&1&&t.tag!==0&&Qi(),s=t.pendingLanes,s&1?t===fh?yo++:(yo=0,fh=t):yo=0,Lr(),null}function Qi(){if(fr!==null){var t=b0(rc),e=Lt.transition,n=he;try{if(Lt.transition=null,he=16>t?16:t,fr===null)var r=!1;else{if(t=fr,fr=null,rc=0,le&6)throw Error(U(331));var i=le;for(le|=4,H=t.current;H!==null;){var s=H,o=s.child;if(H.flags&16){var c=s.deletions;if(c!==null){for(var u=0;u<c.length;u++){var d=c[u];for(H=d;H!==null;){var f=H;switch(f.tag){case 0:case 11:case 15:mo(8,f,s)}var m=f.child;if(m!==null)m.return=f,H=m;else for(;H!==null;){f=H;var g=f.sibling,b=f.return;if(O_(f),f===d){H=null;break}if(g!==null){g.return=b,H=g;break}H=b}}}var k=s.alternate;if(k!==null){var P=k.child;if(P!==null){k.child=null;do{var j=P.sibling;P.sibling=null,P=j}while(P!==null)}}H=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,H=o;else e:for(;H!==null;){if(s=H,s.flags&2048)switch(s.tag){case 0:case 11:case 15:mo(9,s,s.return)}var w=s.sibling;if(w!==null){w.return=s.return,H=w;break e}H=s.return}}var x=t.current;for(H=x;H!==null;){o=H;var T=o.child;if(o.subtreeFlags&2064&&T!==null)T.return=o,H=T;else e:for(o=x;H!==null;){if(c=H,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Oc(9,c)}}catch(D){Re(c,c.return,D)}if(c===o){H=null;break e}var O=c.sibling;if(O!==null){O.return=c.return,H=O;break e}H=c.return}}if(le=i,Lr(),cn&&typeof cn.onPostCommitFiberRoot=="function")try{cn.onPostCommitFiberRoot(kc,t)}catch{}r=!0}return r}finally{he=n,Lt.transition=e}}return!1}function Qg(t,e,n){e=ss(n,e),e=b_(t,e,1),t=xr(t,e,1),e=mt(),t!==null&&(ta(t,1,e),St(t,e))}function Re(t,e,n){if(t.tag===3)Qg(t,t,n);else for(;e!==null;){if(e.tag===3){Qg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(wr===null||!wr.has(r))){t=ss(n,t),t=T_(e,t,1),e=xr(e,t,1),t=mt(),e!==null&&(ta(e,1,t),St(e,t));break}}e=e.return}}function Db(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=mt(),t.pingedLanes|=t.suspendedLanes&n,We===t&&(Xe&n)===n&&(Fe===4||Fe===3&&(Xe&130023424)===Xe&&500>je()-Pf?ei(t,0):Cf|=n),St(t,e)}function H_(t,e){e===0&&(t.mode&1?(e=Wa,Wa<<=1,!(Wa&130023424)&&(Wa=4194304)):e=1);var n=mt();t=Un(t,e),t!==null&&(ta(t,e,n),St(t,n))}function Ob(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),H_(t,n)}function Lb(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(U(314))}r!==null&&r.delete(e),H_(t,n)}var K_;K_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||wt.current)xt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return xt=!1,Sb(t,e,n);xt=!!(t.flags&131072)}else xt=!1,Ee&&e.flags&1048576&&Y0(e,Gl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;wl(t,e),t=e.pendingProps;var i=ts(e,ut.current);Gi(e,n),i=bf(null,e,r,t,i,n);var s=Tf();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Et(r)?(s=!0,Kl(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,_f(e),i.updater=Dc,e.stateNode=i,i._reactInternals=e,th(e,r,t,n),e=ih(null,e,r,!0,s,n)):(e.tag=0,Ee&&s&&hf(e),pt(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(wl(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=Mb(r),t=Bt(r,t),i){case 0:e=rh(null,e,r,t,n);break e;case 1:e=Fg(null,e,r,t,n);break e;case 11:e=Vg(null,e,r,t,n);break e;case 14:e=Mg(null,e,r,Bt(r.type,t),n);break e}throw Error(U(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Bt(r,i),rh(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Bt(r,i),Fg(t,e,r,i,n);case 3:e:{if(R_(e),t===null)throw Error(U(387));r=e.pendingProps,s=e.memoizedState,i=s.element,n_(t,e),Xl(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=ss(Error(U(423)),e),e=zg(t,e,r,n,i);break e}else if(r!==i){i=ss(Error(U(424)),e),e=zg(t,e,r,n,i);break e}else for(kt=_r(e.stateNode.containerInfo.firstChild),At=e,Ee=!0,$t=null,n=e_(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ns(),r===i){e=Bn(t,e,n);break e}pt(t,e,r,n)}e=e.child}return e;case 5:return r_(e),t===null&&Jd(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,qd(r,i)?o=null:s!==null&&qd(r,s)&&(e.flags|=32),A_(t,e),pt(t,e,o,n),e.child;case 6:return t===null&&Jd(e),null;case 13:return C_(t,e,n);case 4:return xf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=rs(e,null,r,n):pt(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Bt(r,i),Vg(t,e,r,i,n);case 7:return pt(t,e,e.pendingProps,n),e.child;case 8:return pt(t,e,e.pendingProps.children,n),e.child;case 12:return pt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,ye(Ql,r._currentValue),r._currentValue=o,s!==null)if(en(s.value,o)){if(s.children===i.children&&!wt.current){e=Bn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var c=s.dependencies;if(c!==null){o=s.child;for(var u=c.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Ln(-1,n&-n),u.tag=2;var d=s.updateQueue;if(d!==null){d=d.shared;var f=d.pending;f===null?u.next=u:(u.next=f.next,f.next=u),d.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),Zd(s.return,n,e),c.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(U(341));o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Zd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}pt(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Gi(e,n),i=Vt(i),r=r(i),e.flags|=1,pt(t,e,r,n),e.child;case 14:return r=e.type,i=Bt(r,e.pendingProps),i=Bt(r.type,i),Mg(t,e,r,i,n);case 15:return I_(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Bt(r,i),wl(t,e),e.tag=1,Et(r)?(t=!0,Kl(e)):t=!1,Gi(e,n),S_(e,r,i),th(e,r,i,n),ih(null,e,r,!0,t,n);case 19:return P_(t,e,n);case 22:return k_(t,e,n)}throw Error(U(156,e.tag))};function q_(t,e){return x0(t,e)}function Vb(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(t,e,n,r){return new Vb(t,e,n,r)}function Of(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Mb(t){if(typeof t=="function")return Of(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Zh)return 11;if(t===ef)return 14}return 2}function Sr(t,e){var n=t.alternate;return n===null?(n=Ot(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function bl(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Of(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Ni:return ti(n.children,i,s,e);case Jh:o=8,i|=8;break;case Td:return t=Ot(12,n,e,i|2),t.elementType=Td,t.lanes=s,t;case Id:return t=Ot(13,n,e,i),t.elementType=Id,t.lanes=s,t;case kd:return t=Ot(19,n,e,i),t.elementType=kd,t.lanes=s,t;case r0:return Vc(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case t0:o=10;break e;case n0:o=9;break e;case Zh:o=11;break e;case ef:o=14;break e;case ir:o=16,r=null;break e}throw Error(U(130,t==null?t:typeof t,""))}return e=Ot(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function ti(t,e,n,r){return t=Ot(7,t,r,e),t.lanes=n,t}function Vc(t,e,n,r){return t=Ot(22,t,r,e),t.elementType=r0,t.lanes=n,t.stateNode={isHidden:!1},t}function od(t,e,n){return t=Ot(6,t,null,e),t.lanes=n,t}function ad(t,e,n){return e=Ot(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Fb(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Uu(0),this.expirationTimes=Uu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Uu(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Lf(t,e,n,r,i,s,o,c,u){return t=new Fb(t,e,n,c,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Ot(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},_f(s),t}function zb(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ji,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function G_(t){if(!t)return Rr;t=t._reactInternals;e:{if(gi(t)!==t||t.tag!==1)throw Error(U(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Et(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(U(171))}if(t.tag===1){var n=t.type;if(Et(n))return G0(t,n,e)}return e}function Q_(t,e,n,r,i,s,o,c,u){return t=Lf(n,r,!0,t,i,s,o,c,u),t.context=G_(null),n=t.current,r=mt(),i=Er(n),s=Ln(r,i),s.callback=e??null,xr(n,s,i),t.current.lanes=i,ta(t,i,r),St(t,r),t}function Mc(t,e,n,r){var i=e.current,s=mt(),o=Er(i);return n=G_(n),e.context===null?e.context=n:e.pendingContext=n,e=Ln(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=xr(i,e,o),t!==null&&(Xt(t,i,o,s),vl(t,i,o)),o}function sc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Yg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Vf(t,e){Yg(t,e),(t=t.alternate)&&Yg(t,e)}function Ub(){return null}var Y_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Mf(t){this._internalRoot=t}Fc.prototype.render=Mf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(U(409));Mc(t,e,null,null)};Fc.prototype.unmount=Mf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ai(function(){Mc(null,t,null,null)}),e[zn]=null}};function Fc(t){this._internalRoot=t}Fc.prototype.unstable_scheduleHydration=function(t){if(t){var e=k0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<or.length&&e!==0&&e<or[n].priority;n++);or.splice(n,0,t),n===0&&R0(t)}};function Ff(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function zc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Xg(){}function Bb(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var d=sc(o);s.call(d)}}var o=Q_(e,r,t,0,null,!1,!1,"",Xg);return t._reactRootContainer=o,t[zn]=o.current,Po(t.nodeType===8?t.parentNode:t),ai(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var c=r;r=function(){var d=sc(u);c.call(d)}}var u=Lf(t,0,!1,null,null,!1,!1,"",Xg);return t._reactRootContainer=u,t[zn]=u.current,Po(t.nodeType===8?t.parentNode:t),ai(function(){Mc(e,u,n,r)}),u}function Uc(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var c=i;i=function(){var u=sc(o);c.call(u)}}Mc(e,o,t,i)}else o=Bb(n,e,t,i,r);return sc(o)}T0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=eo(e.pendingLanes);n!==0&&(rf(e,n|1),St(e,je()),!(le&6)&&(os=je()+500,Lr()))}break;case 13:ai(function(){var r=Un(t,1);if(r!==null){var i=mt();Xt(r,t,1,i)}}),Vf(t,1)}};sf=function(t){if(t.tag===13){var e=Un(t,134217728);if(e!==null){var n=mt();Xt(e,t,134217728,n)}Vf(t,134217728)}};I0=function(t){if(t.tag===13){var e=Er(t),n=Un(t,e);if(n!==null){var r=mt();Xt(n,t,e,r)}Vf(t,e)}};k0=function(){return he};A0=function(t,e){var n=he;try{return he=t,e()}finally{he=n}};Vd=function(t,e,n){switch(e){case"input":if(Cd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Pc(r);if(!i)throw Error(U(90));s0(r),Cd(r,i)}}}break;case"textarea":a0(t,n);break;case"select":e=n.value,e!=null&&$i(t,!!n.multiple,e,!1)}};p0=jf;m0=ai;var Wb={usingClientEntryPoint:!1,Events:[ra,Vi,Pc,h0,f0,jf]},Ks={findFiberByHostInstance:Qr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},$b={bundleType:Ks.bundleType,version:Ks.version,rendererPackageName:Ks.rendererPackageName,rendererConfig:Ks.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Gn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=v0(t),t===null?null:t.stateNode},findFiberByHostInstance:Ks.findFiberByHostInstance||Ub,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var el=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!el.isDisabled&&el.supportsFiber)try{kc=el.inject($b),cn=el}catch{}}Ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Wb;Ct.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ff(e))throw Error(U(200));return zb(t,e,null,n)};Ct.createRoot=function(t,e){if(!Ff(t))throw Error(U(299));var n=!1,r="",i=Y_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Lf(t,1,!1,null,null,n,!1,r,i),t[zn]=e.current,Po(t.nodeType===8?t.parentNode:t),new Mf(e)};Ct.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(U(188)):(t=Object.keys(t).join(","),Error(U(268,t)));return t=v0(e),t=t===null?null:t.stateNode,t};Ct.flushSync=function(t){return ai(t)};Ct.hydrate=function(t,e,n){if(!zc(e))throw Error(U(200));return Uc(null,t,e,!0,n)};Ct.hydrateRoot=function(t,e,n){if(!Ff(t))throw Error(U(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Y_;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Q_(e,null,t,1,n??null,i,!1,s,o),t[zn]=e.current,Po(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Fc(e)};Ct.render=function(t,e,n){if(!zc(e))throw Error(U(200));return Uc(null,t,e,!1,n)};Ct.unmountComponentAtNode=function(t){if(!zc(t))throw Error(U(40));return t._reactRootContainer?(ai(function(){Uc(null,null,t,!1,function(){t._reactRootContainer=null,t[zn]=null})}),!0):!1};Ct.unstable_batchedUpdates=jf;Ct.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!zc(n))throw Error(U(200));if(t==null||t._reactInternals===void 0)throw Error(U(38));return Uc(t,e,n,!1,r)};Ct.version="18.3.1-next-f1338f8080-20240426";function X_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(X_)}catch(t){console.error(t)}}X_(),Xv.exports=Ct;var Hb=Xv.exports,Jg=Hb;Sd.createRoot=Jg.createRoot,Sd.hydrateRoot=Jg.hydrateRoot;/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function zo(){return zo=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},zo.apply(null,arguments)}var pr;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(pr||(pr={}));const Zg="popstate";function Kb(t){t===void 0&&(t={});function e(r,i){let{pathname:s,search:o,hash:c}=r.location;return gh("",{pathname:s,search:o,hash:c},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:oc(i)}return Gb(e,n,null,t)}function Ne(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function zf(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function qb(){return Math.random().toString(36).substr(2,8)}function ey(t,e){return{usr:t.state,key:t.key,idx:e}}function gh(t,e,n,r){return n===void 0&&(n=null),zo({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?vs(e):e,{state:n,key:e&&e.key||r||qb()})}function oc(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function vs(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function Gb(t,e,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,c=pr.Pop,u=null,d=f();d==null&&(d=0,o.replaceState(zo({},o.state,{idx:d}),""));function f(){return(o.state||{idx:null}).idx}function m(){c=pr.Pop;let j=f(),w=j==null?null:j-d;d=j,u&&u({action:c,location:P.location,delta:w})}function g(j,w){c=pr.Push;let x=gh(P.location,j,w);d=f()+1;let T=ey(x,d),O=P.createHref(x);try{o.pushState(T,"",O)}catch(D){if(D instanceof DOMException&&D.name==="DataCloneError")throw D;i.location.assign(O)}s&&u&&u({action:c,location:P.location,delta:1})}function b(j,w){c=pr.Replace;let x=gh(P.location,j,w);d=f();let T=ey(x,d),O=P.createHref(x);o.replaceState(T,"",O),s&&u&&u({action:c,location:P.location,delta:0})}function k(j){let w=i.location.origin!=="null"?i.location.origin:i.location.href,x=typeof j=="string"?j:oc(j);return x=x.replace(/ $/,"%20"),Ne(w,"No window.location.(origin|href) available to create URL for href: "+x),new URL(x,w)}let P={get action(){return c},get location(){return t(i,o)},listen(j){if(u)throw new Error("A history only accepts one active listener");return i.addEventListener(Zg,m),u=j,()=>{i.removeEventListener(Zg,m),u=null}},createHref(j){return e(i,j)},createURL:k,encodeLocation(j){let w=k(j);return{pathname:w.pathname,search:w.search,hash:w.hash}},push:g,replace:b,go(j){return o.go(j)}};return P}var ty;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(ty||(ty={}));function Qb(t,e,n){return n===void 0&&(n="/"),Yb(t,e,n)}function Yb(t,e,n,r){let i=typeof e=="string"?vs(e):e,s=Uf(i.pathname||"/",n);if(s==null)return null;let o=J_(t);Xb(o);let c=null,u=cT(s);for(let d=0;c==null&&d<o.length;++d)c=oT(o[d],u);return c}function J_(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(s,o,c)=>{let u={relativePath:c===void 0?s.path||"":c,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};u.relativePath.startsWith("/")&&(Ne(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let d=br([r,u.relativePath]),f=n.concat(u);s.children&&s.children.length>0&&(Ne(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),J_(s.children,e,f,d)),!(s.path==null&&!s.index)&&e.push({path:d,score:iT(d,s.index),routesMeta:f})};return t.forEach((s,o)=>{var c;if(s.path===""||!((c=s.path)!=null&&c.includes("?")))i(s,o);else for(let u of Z_(s.path))i(s,o,u)}),e}function Z_(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=Z_(r.join("/")),c=[];return c.push(...o.map(u=>u===""?s:[s,u].join("/"))),i&&c.push(...o),c.map(u=>t.startsWith("/")&&u===""?"/":u)}function Xb(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:sT(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Jb=/^:[\w-]+$/,Zb=3,eT=2,tT=1,nT=10,rT=-2,ny=t=>t==="*";function iT(t,e){let n=t.split("/"),r=n.length;return n.some(ny)&&(r+=rT),e&&(r+=eT),n.filter(i=>!ny(i)).reduce((i,s)=>i+(Jb.test(s)?Zb:s===""?tT:nT),r)}function sT(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function oT(t,e,n){let{routesMeta:r}=t,i={},s="/",o=[];for(let c=0;c<r.length;++c){let u=r[c],d=c===r.length-1,f=s==="/"?e:e.slice(s.length)||"/",m=aT({path:u.relativePath,caseSensitive:u.caseSensitive,end:d},f),g=u.route;if(!m)return null;Object.assign(i,m.params),o.push({params:i,pathname:br([s,m.pathname]),pathnameBase:pT(br([s,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(s=br([s,m.pathnameBase]))}return o}function aT(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=lT(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),c=i.slice(1);return{params:r.reduce((d,f,m)=>{let{paramName:g,isOptional:b}=f;if(g==="*"){let P=c[m]||"";o=s.slice(0,s.length-P.length).replace(/(.)\/+$/,"$1")}const k=c[m];return b&&!k?d[g]=void 0:d[g]=(k||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:o,pattern:t}}function lT(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),zf(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,c,u)=>(r.push({paramName:c,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function cT(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return zf(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Uf(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const uT=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,dT=t=>uT.test(t);function hT(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?vs(t):t,s;if(n)if(dT(n))s=n;else{if(n.includes("//")){let o=n;n=ex(n),zf(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?s=ry(n.substring(1),"/"):s=ry(n,e)}else s=e;return{pathname:s,search:mT(r),hash:gT(i)}}function ry(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function ld(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function fT(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function Bf(t,e){let n=fT(t);return e?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Wf(t,e,n,r){r===void 0&&(r=!1);let i;typeof t=="string"?i=vs(t):(i=zo({},t),Ne(!i.pathname||!i.pathname.includes("?"),ld("?","pathname","search",i)),Ne(!i.pathname||!i.pathname.includes("#"),ld("#","pathname","hash",i)),Ne(!i.search||!i.search.includes("#"),ld("#","search","hash",i)));let s=t===""||i.pathname==="",o=s?"/":i.pathname,c;if(o==null)c=n;else{let m=e.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),m-=1;i.pathname=g.join("/")}c=m>=0?e[m]:"/"}let u=hT(i,c),d=o&&o!=="/"&&o.endsWith("/"),f=(s||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(d||f)&&(u.pathname+="/"),u}const ex=t=>t.replace(/\/\/+/g,"/"),br=t=>ex(t.join("/")),pT=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),mT=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,gT=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function yT(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const tx=["post","put","patch","delete"];new Set(tx);const vT=["get",...tx];new Set(vT);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Uo(){return Uo=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Uo.apply(null,arguments)}const $f=C.createContext(null),_T=C.createContext(null),Vr=C.createContext(null),Bc=C.createContext(null),Qn=C.createContext({outlet:null,matches:[],isDataRoute:!1}),nx=C.createContext(null);function xT(t,e){let{relative:n}=e===void 0?{}:e;_s()||Ne(!1);let{basename:r,navigator:i}=C.useContext(Vr),{hash:s,pathname:o,search:c}=ix(t,{relative:n}),u=o;return r!=="/"&&(u=o==="/"?r:br([r,o])),i.createHref({pathname:u,search:c,hash:s})}function _s(){return C.useContext(Bc)!=null}function yi(){return _s()||Ne(!1),C.useContext(Bc).location}function rx(t){C.useContext(Vr).static||C.useLayoutEffect(t)}function sa(){let{isDataRoute:t}=C.useContext(Qn);return t?DT():wT()}function wT(){_s()||Ne(!1);let t=C.useContext($f),{basename:e,future:n,navigator:r}=C.useContext(Vr),{matches:i}=C.useContext(Qn),{pathname:s}=yi(),o=JSON.stringify(Bf(i,n.v7_relativeSplatPath)),c=C.useRef(!1);return rx(()=>{c.current=!0}),C.useCallback(function(d,f){if(f===void 0&&(f={}),!c.current)return;if(typeof d=="number"){r.go(d);return}let m=Wf(d,JSON.parse(o),s,f.relative==="path");t==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:br([e,m.pathname])),(f.replace?r.replace:r.push)(m,f.state,f)},[e,r,o,s,t])}function ET(){let{matches:t}=C.useContext(Qn),e=t[t.length-1];return e?e.params:{}}function ix(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=C.useContext(Vr),{matches:i}=C.useContext(Qn),{pathname:s}=yi(),o=JSON.stringify(Bf(i,r.v7_relativeSplatPath));return C.useMemo(()=>Wf(t,JSON.parse(o),s,n==="path"),[t,o,s,n])}function ST(t,e){return bT(t,e)}function bT(t,e,n,r){_s()||Ne(!1);let{navigator:i}=C.useContext(Vr),{matches:s}=C.useContext(Qn),o=s[s.length-1],c=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let d=yi(),f;if(e){var m;let j=typeof e=="string"?vs(e):e;u==="/"||(m=j.pathname)!=null&&m.startsWith(u)||Ne(!1),f=j}else f=d;let g=f.pathname||"/",b=g;if(u!=="/"){let j=u.replace(/^\//,"").split("/");b="/"+g.replace(/^\//,"").split("/").slice(j.length).join("/")}let k=Qb(t,{pathname:b}),P=RT(k&&k.map(j=>Object.assign({},j,{params:Object.assign({},c,j.params),pathname:br([u,i.encodeLocation?i.encodeLocation(j.pathname).pathname:j.pathname]),pathnameBase:j.pathnameBase==="/"?u:br([u,i.encodeLocation?i.encodeLocation(j.pathnameBase).pathname:j.pathnameBase])})),s,n,r);return e&&P?C.createElement(Bc.Provider,{value:{location:Uo({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:pr.Pop}},P):P}function TT(){let t=NT(),e=yT(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return C.createElement(C.Fragment,null,C.createElement("h2",null,"Unexpected Application Error!"),C.createElement("h3",{style:{fontStyle:"italic"}},e),n?C.createElement("pre",{style:i},n):null,null)}const IT=C.createElement(TT,null);class kT extends C.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?C.createElement(Qn.Provider,{value:this.props.routeContext},C.createElement(nx.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function AT(t){let{routeContext:e,match:n,children:r}=t,i=C.useContext($f);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),C.createElement(Qn.Provider,{value:e},r)}function RT(t,e,n,r){var i;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,c=(i=n)==null?void 0:i.errors;if(c!=null){let f=o.findIndex(m=>m.route.id&&(c==null?void 0:c[m.route.id])!==void 0);f>=0||Ne(!1),o=o.slice(0,Math.min(o.length,f+1))}let u=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<o.length;f++){let m=o[f];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(d=f),m.route.id){let{loaderData:g,errors:b}=n,k=m.route.loader&&g[m.route.id]===void 0&&(!b||b[m.route.id]===void 0);if(m.route.lazy||k){u=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((f,m,g)=>{let b,k=!1,P=null,j=null;n&&(b=c&&m.route.id?c[m.route.id]:void 0,P=m.route.errorElement||IT,u&&(d<0&&g===0?(OT("route-fallback"),k=!0,j=null):d===g&&(k=!0,j=m.route.hydrateFallbackElement||null)));let w=e.concat(o.slice(0,g+1)),x=()=>{let T;return b?T=P:k?T=j:m.route.Component?T=C.createElement(m.route.Component,null):m.route.element?T=m.route.element:T=f,C.createElement(AT,{match:m,routeContext:{outlet:f,matches:w,isDataRoute:n!=null},children:T})};return n&&(m.route.ErrorBoundary||m.route.errorElement||g===0)?C.createElement(kT,{location:n.location,revalidation:n.revalidation,component:P,error:b,children:x(),routeContext:{outlet:null,matches:w,isDataRoute:!0}}):x()},null)}var sx=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(sx||{}),ox=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(ox||{});function CT(t){let e=C.useContext($f);return e||Ne(!1),e}function PT(t){let e=C.useContext(_T);return e||Ne(!1),e}function jT(t){let e=C.useContext(Qn);return e||Ne(!1),e}function ax(t){let e=jT(),n=e.matches[e.matches.length-1];return n.route.id||Ne(!1),n.route.id}function NT(){var t;let e=C.useContext(nx),n=PT(),r=ax();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function DT(){let{router:t}=CT(sx.UseNavigateStable),e=ax(ox.UseNavigateStable),n=C.useRef(!1);return rx(()=>{n.current=!0}),C.useCallback(function(i,s){s===void 0&&(s={}),n.current&&(typeof i=="number"?t.navigate(i):t.navigate(i,Uo({fromRouteId:e},s)))},[t,e])}const iy={};function OT(t,e,n){iy[t]||(iy[t]=!0)}function LT(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function lx(t){let{to:e,replace:n,state:r,relative:i}=t;_s()||Ne(!1);let{future:s,static:o}=C.useContext(Vr),{matches:c}=C.useContext(Qn),{pathname:u}=yi(),d=sa(),f=Wf(e,Bf(c,s.v7_relativeSplatPath),u,i==="path"),m=JSON.stringify(f);return C.useEffect(()=>d(JSON.parse(m),{replace:n,state:r,relative:i}),[d,m,i,n,r]),null}function Ae(t){Ne(!1)}function VT(t){let{basename:e="/",children:n=null,location:r,navigationType:i=pr.Pop,navigator:s,static:o=!1,future:c}=t;_s()&&Ne(!1);let u=e.replace(/^\/*/,"/"),d=C.useMemo(()=>({basename:u,navigator:s,static:o,future:Uo({v7_relativeSplatPath:!1},c)}),[u,c,s,o]);typeof r=="string"&&(r=vs(r));let{pathname:f="/",search:m="",hash:g="",state:b=null,key:k="default"}=r,P=C.useMemo(()=>{let j=Uf(f,u);return j==null?null:{location:{pathname:j,search:m,hash:g,state:b,key:k},navigationType:i}},[u,f,m,g,b,k,i]);return P==null?null:C.createElement(Vr.Provider,{value:d},C.createElement(Bc.Provider,{children:n,value:P}))}function MT(t){let{children:e,location:n}=t;return ST(yh(e),n)}new Promise(()=>{});function yh(t,e){e===void 0&&(e=[]);let n=[];return C.Children.forEach(t,(r,i)=>{if(!C.isValidElement(r))return;let s=[...e,i];if(r.type===C.Fragment){n.push.apply(n,yh(r.props.children,s));return}r.type!==Ae&&Ne(!1),!r.props.index||!r.props.children||Ne(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=yh(r.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vh(){return vh=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},vh.apply(null,arguments)}function FT(t,e){if(t==null)return{};var n={};for(var r in t)if({}.hasOwnProperty.call(t,r)){if(e.indexOf(r)!==-1)continue;n[r]=t[r]}return n}function zT(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function UT(t,e){return t.button===0&&(!e||e==="_self")&&!zT(t)}function _h(t){return t===void 0&&(t=""),new URLSearchParams(typeof t=="string"||Array.isArray(t)||t instanceof URLSearchParams?t:Object.keys(t).reduce((e,n)=>{let r=t[n];return e.concat(Array.isArray(r)?r.map(i=>[n,i]):[[n,r]])},[]))}function BT(t,e){let n=_h(t);return e&&e.forEach((r,i)=>{n.has(i)||e.getAll(i).forEach(s=>{n.append(i,s)})}),n}const WT=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],$T="6";try{window.__reactRouterVersion=$T}catch{}const HT="startTransition",sy=DE[HT];function KT(t){let{basename:e,children:n,future:r,window:i}=t,s=C.useRef();s.current==null&&(s.current=Kb({window:i,v5Compat:!0}));let o=s.current,[c,u]=C.useState({action:o.action,location:o.location}),{v7_startTransition:d}=r||{},f=C.useCallback(m=>{d&&sy?sy(()=>u(m)):u(m)},[u,d]);return C.useLayoutEffect(()=>o.listen(f),[o,f]),C.useEffect(()=>LT(r),[r]),C.createElement(VT,{basename:e,children:n,location:c.location,navigationType:c.action,navigator:o,future:r})}const qT=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",GT=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,re=C.forwardRef(function(e,n){let{onClick:r,relative:i,reloadDocument:s,replace:o,state:c,target:u,to:d,preventScrollReset:f,viewTransition:m}=e,g=FT(e,WT),{basename:b}=C.useContext(Vr),k,P=!1;if(typeof d=="string"&&GT.test(d)&&(k=d,qT))try{let T=new URL(window.location.href),O=d.startsWith("//")?new URL(T.protocol+d):new URL(d),D=Uf(O.pathname,b);O.origin===T.origin&&D!=null?d=D+O.search+O.hash:P=!0}catch{}let j=xT(d,{relative:i}),w=QT(d,{replace:o,state:c,target:u,preventScrollReset:f,relative:i,viewTransition:m});function x(T){r&&r(T),T.defaultPrevented||w(T)}return C.createElement("a",vh({},g,{href:k||j,onClick:P||s?r:x,ref:n,target:u}))});var oy;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(oy||(oy={}));var ay;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(ay||(ay={}));function QT(t,e){let{target:n,replace:r,state:i,preventScrollReset:s,relative:o,viewTransition:c}=e===void 0?{}:e,u=sa(),d=yi(),f=ix(t,{relative:o});return C.useCallback(m=>{if(UT(m,n)){m.preventDefault();let g=r!==void 0?r:oc(d)===oc(f);u(t,{replace:g,state:i,preventScrollReset:s,relative:o,viewTransition:c})}},[d,u,f,r,i,n,t,s,o,c])}function YT(t){let e=C.useRef(_h(t)),n=C.useRef(!1),r=yi(),i=C.useMemo(()=>BT(r.search,n.current?null:e.current),[r.search]),s=sa(),o=C.useCallback((c,u)=>{const d=_h(typeof c=="function"?c(i):c);n.current=!0,s("?"+d,u)},[s,i]);return[i,o]}var ly={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cx=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},XT=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],c=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ux={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,c=o?t[i+1]:0,u=i+2<t.length,d=u?t[i+2]:0,f=s>>2,m=(s&3)<<4|c>>4;let g=(c&15)<<2|d>>6,b=d&63;u||(b=64,o||(g=64)),r.push(n[f],n[m],n[g],n[b])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(cx(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):XT(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],c=i<t.length?n[t.charAt(i)]:0;++i;const d=i<t.length?n[t.charAt(i)]:64;++i;const m=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||c==null||d==null||m==null)throw new JT;const g=s<<2|c>>4;if(r.push(g),d!==64){const b=c<<4&240|d>>2;if(r.push(b),m!==64){const k=d<<6&192|m;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class JT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ZT=function(t){const e=cx(t);return ux.encodeByteArray(e,!0)},ac=function(t){return ZT(t).replace(/\./g,"")},dx=function(t){try{return ux.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eI(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tI=()=>eI().__FIREBASE_DEFAULTS__,nI=()=>{if(typeof process>"u"||typeof ly>"u")return;const t=ly.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},rI=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&dx(t[1]);return e&&JSON.parse(e)},Wc=()=>{try{return tI()||nI()||rI()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},hx=t=>{var e,n;return(n=(e=Wc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},fx=t=>{const e=hx(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},px=()=>{var t;return(t=Wc())===null||t===void 0?void 0:t.config},mx=t=>{var e;return(e=Wc())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gx(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[ac(JSON.stringify(n)),ac(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function sI(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(dt())}function oI(){var t;const e=(t=Wc())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function aI(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function lI(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function cI(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function uI(){const t=dt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function dI(){return!oI()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function hI(){try{return typeof indexedDB=="object"}catch{return!1}}function fI(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pI="FirebaseError";class vn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=pI,Object.setPrototypeOf(this,vn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,oa.prototype.create)}}class oa{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?mI(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new vn(i,c,r)}}function mI(t,e){return t.replace(gI,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const gI=/\{\$([^}]+)}/g;function yI(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function lc(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(cy(s)&&cy(o)){if(!lc(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function cy(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function no(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function ro(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function vI(t,e){const n=new _I(t,e);return n.subscribe.bind(n)}class _I{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");xI(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=cd),i.error===void 0&&(i.error=cd),i.complete===void 0&&(i.complete=cd);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xI(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function cd(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t){return t&&t._delegate?t._delegate:t}class Cr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wI{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new iI;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(SI(e))try{this.getOrInitializeService({instanceIdentifier:qr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=qr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=qr){return this.instances.has(e)}getOptions(e=qr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:EI(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=qr){return this.component?this.component.multipleInstances?e:qr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function EI(t){return t===qr?void 0:t}function SI(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new wI(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(se||(se={}));const TI={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},II=se.INFO,kI={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},AI=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=kI[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Hf{constructor(e){this.name=e,this._logLevel=II,this._logHandler=AI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?TI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const RI=(t,e)=>e.some(n=>t instanceof n);let uy,dy;function CI(){return uy||(uy=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function PI(){return dy||(dy=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yx=new WeakMap,xh=new WeakMap,vx=new WeakMap,ud=new WeakMap,Kf=new WeakMap;function jI(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Tr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&yx.set(n,t)}).catch(()=>{}),Kf.set(e,t),e}function NI(t){if(xh.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});xh.set(t,e)}let wh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return xh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||vx.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Tr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function DI(t){wh=t(wh)}function OI(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(dd(this),e,...n);return vx.set(r,e.sort?e.sort():[e]),Tr(r)}:PI().includes(t)?function(...e){return t.apply(dd(this),e),Tr(yx.get(this))}:function(...e){return Tr(t.apply(dd(this),e))}}function LI(t){return typeof t=="function"?OI(t):(t instanceof IDBTransaction&&NI(t),RI(t,CI())?new Proxy(t,wh):t)}function Tr(t){if(t instanceof IDBRequest)return jI(t);if(ud.has(t))return ud.get(t);const e=LI(t);return e!==t&&(ud.set(t,e),Kf.set(e,t)),e}const dd=t=>Kf.get(t);function VI(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),c=Tr(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Tr(o.result),u.oldVersion,u.newVersion,Tr(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const MI=["get","getKey","getAll","getAllKeys","count"],FI=["put","add","delete","clear"],hd=new Map;function hy(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(hd.get(e))return hd.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=FI.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||MI.includes(n)))return;const s=async function(o,...c){const u=this.transaction(o,i?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[n](...c),i&&u.done]))[0]};return hd.set(e,s),s}DI(t=>({...t,get:(e,n,r)=>hy(e,n)||t.get(e,n,r),has:(e,n)=>!!hy(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(UI(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function UI(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Eh="@firebase/app",fy="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn=new Hf("@firebase/app"),BI="@firebase/app-compat",WI="@firebase/analytics-compat",$I="@firebase/analytics",HI="@firebase/app-check-compat",KI="@firebase/app-check",qI="@firebase/auth",GI="@firebase/auth-compat",QI="@firebase/database",YI="@firebase/data-connect",XI="@firebase/database-compat",JI="@firebase/functions",ZI="@firebase/functions-compat",e2="@firebase/installations",t2="@firebase/installations-compat",n2="@firebase/messaging",r2="@firebase/messaging-compat",i2="@firebase/performance",s2="@firebase/performance-compat",o2="@firebase/remote-config",a2="@firebase/remote-config-compat",l2="@firebase/storage",c2="@firebase/storage-compat",u2="@firebase/firestore",d2="@firebase/vertexai-preview",h2="@firebase/firestore-compat",f2="firebase",p2="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="[DEFAULT]",m2={[Eh]:"fire-core",[BI]:"fire-core-compat",[$I]:"fire-analytics",[WI]:"fire-analytics-compat",[KI]:"fire-app-check",[HI]:"fire-app-check-compat",[qI]:"fire-auth",[GI]:"fire-auth-compat",[QI]:"fire-rtdb",[YI]:"fire-data-connect",[XI]:"fire-rtdb-compat",[JI]:"fire-fn",[ZI]:"fire-fn-compat",[e2]:"fire-iid",[t2]:"fire-iid-compat",[n2]:"fire-fcm",[r2]:"fire-fcm-compat",[i2]:"fire-perf",[s2]:"fire-perf-compat",[o2]:"fire-rc",[a2]:"fire-rc-compat",[l2]:"fire-gcs",[c2]:"fire-gcs-compat",[u2]:"fire-fst",[h2]:"fire-fst-compat",[d2]:"fire-vertex","fire-js":"fire-js",[f2]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo=new Map,g2=new Map,bh=new Map;function py(t,e){try{t.container.addComponent(e)}catch(n){Wn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function li(t){const e=t.name;if(bh.has(e))return Wn.debug(`There were multiple attempts to register component ${e}.`),!1;bh.set(e,t);for(const n of Bo.values())py(n,t);for(const n of g2.values())py(n,t);return!0}function $c(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function qt(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y2={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ir=new oa("app","Firebase",y2);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v2{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Cr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ir.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi=p2;function _x(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Sh,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Ir.create("bad-app-name",{appName:String(i)});if(n||(n=px()),!n)throw Ir.create("no-options");const s=Bo.get(i);if(s){if(lc(n,s.options)&&lc(r,s.config))return s;throw Ir.create("duplicate-app",{appName:i})}const o=new bI(i);for(const u of bh.values())o.addComponent(u);const c=new v2(n,r,o);return Bo.set(i,c),c}function qf(t=Sh){const e=Bo.get(t);if(!e&&t===Sh&&px())return _x();if(!e)throw Ir.create("no-app",{appName:t});return e}function my(){return Array.from(Bo.values())}function dn(t,e,n){var r;let i=(r=m2[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Wn.warn(c.join(" "));return}li(new Cr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _2="firebase-heartbeat-database",x2=1,Wo="firebase-heartbeat-store";let fd=null;function xx(){return fd||(fd=VI(_2,x2,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Wo)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ir.create("idb-open",{originalErrorMessage:t.message})})),fd}async function w2(t){try{const n=(await xx()).transaction(Wo),r=await n.objectStore(Wo).get(wx(t));return await n.done,r}catch(e){if(e instanceof vn)Wn.warn(e.message);else{const n=Ir.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Wn.warn(n.message)}}}async function gy(t,e){try{const r=(await xx()).transaction(Wo,"readwrite");await r.objectStore(Wo).put(e,wx(t)),await r.done}catch(n){if(n instanceof vn)Wn.warn(n.message);else{const r=Ir.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Wn.warn(r.message)}}}function wx(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E2=1024,S2=30*24*60*60*1e3;class b2{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new I2(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=yy();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=S2}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Wn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=yy(),{heartbeatsToSend:r,unsentEntries:i}=T2(this._heartbeatsCache.heartbeats),s=ac(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Wn.warn(n),""}}}function yy(){return new Date().toISOString().substring(0,10)}function T2(t,e=E2){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),vy(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),vy(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class I2{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return hI()?fI().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await w2(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return gy(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return gy(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function vy(t){return ac(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k2(t){li(new Cr("platform-logger",e=>new zI(e),"PRIVATE")),li(new Cr("heartbeat",e=>new b2(e),"PRIVATE")),dn(Eh,fy,t),dn(Eh,fy,"esm2017"),dn("fire-js","")}k2("");function Gf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function Ex(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const A2=Ex,Sx=new oa("auth","Firebase",Ex());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc=new Hf("@firebase/auth");function R2(t,...e){cc.logLevel<=se.WARN&&cc.warn(`Auth (${vi}): ${t}`,...e)}function Tl(t,...e){cc.logLevel<=se.ERROR&&cc.error(`Auth (${vi}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(t,...e){throw Yf(t,...e)}function Jt(t,...e){return Yf(t,...e)}function Qf(t,e,n){const r=Object.assign(Object.assign({},A2()),{[e]:n});return new oa("auth","Firebase",r).create(e,{appName:t.name})}function Vn(t){return Qf(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function C2(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&Ft(t,"argument-error"),Qf(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Yf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Sx.create(t,...e)}function X(t,e,...n){if(!t)throw Yf(e,...n)}function Nn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Tl(e),new Error(e)}function $n(t,e){t||Nn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Th(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function P2(){return _y()==="http:"||_y()==="https:"}function _y(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j2(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(P2()||lI()||"connection"in navigator)?navigator.onLine:!0}function N2(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(e,n){this.shortDelay=e,this.longDelay=n,$n(n>e,"Short delay should be less than long delay!"),this.isMobile=sI()||cI()}get(){return j2()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(t,e){$n(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bx{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Nn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Nn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Nn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D2={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O2=new la(3e4,6e4);function Yn(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function _n(t,e,n,r,i={}){return Tx(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=aa(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const d=Object.assign({method:e,headers:u},s);return aI()||(d.referrerPolicy="no-referrer"),bx.fetch()(Ix(t,t.config.apiHost,n,c),d)})}async function Tx(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},D2),e);try{const i=new V2(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw tl(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw tl(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw tl(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw tl(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Qf(t,f,d);Ft(t,f)}}catch(i){if(i instanceof vn)throw i;Ft(t,"network-request-failed",{message:String(i)})}}async function ca(t,e,n,r,i={}){const s=await _n(t,e,n,r,i);return"mfaPendingCredential"in s&&Ft(t,"multi-factor-auth-required",{_serverResponse:s}),s}function Ix(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Xf(t.config,i):`${t.config.apiScheme}://${i}`}function L2(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class V2{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Jt(this.auth,"network-request-failed")),O2.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function tl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Jt(t,e,r);return i.customData._tokenResponse=n,i}function xy(t){return t!==void 0&&t.enterprise!==void 0}class M2{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return L2(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function F2(t,e){return _n(t,"GET","/v2/recaptchaConfig",Yn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z2(t,e){return _n(t,"POST","/v1/accounts:delete",e)}async function kx(t,e){return _n(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vo(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function U2(t,e=!1){const n=Ke(t),r=await n.getIdToken(e),i=Jf(r);X(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:vo(pd(i.auth_time)),issuedAtTime:vo(pd(i.iat)),expirationTime:vo(pd(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function pd(t){return Number(t)*1e3}function Jf(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Tl("JWT malformed, contained fewer than 3 sections"),null;try{const i=dx(n);return i?JSON.parse(i):(Tl("Failed to decode base64 JWT payload"),null)}catch(i){return Tl("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function wy(t){const e=Jf(t);return X(e,"internal-error"),X(typeof e.exp<"u","internal-error"),X(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function as(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof vn&&B2(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function B2({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W2{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=vo(this.lastLoginAt),this.creationTime=vo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uc(t){var e;const n=t.auth,r=await t.getIdToken(),i=await as(t,kx(n,{idToken:r}));X(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Ax(s.providerUserInfo):[],c=H2(t.providerData,o),u=t.isAnonymous,d=!(t.email&&s.passwordHash)&&!(c!=null&&c.length),f=u?d:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Ih(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(t,m)}async function $2(t){const e=Ke(t);await uc(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function H2(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Ax(t){return t.map(e=>{var{providerId:n}=e,r=Gf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K2(t,e){const n=await Tx(t,{},async()=>{const r=aa({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=Ix(t,i,"/v1/token",`key=${s}`),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",bx.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function q2(t,e){return _n(t,"POST","/v2/accounts:revokeToken",Yn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error"),X(typeof e.idToken<"u","internal-error"),X(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):wy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){X(e.length!==0,"internal-error");const n=wy(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await K2(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Yi;return r&&(X(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(X(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(X(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Yi,this.toJSON())}_performRefresh(){return Nn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nr(t,e){X(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Dn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=Gf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new W2(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ih(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await as(this,this.stsTokenManager.getToken(this.auth,e));return X(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return U2(this,e)}reload(){return $2(this)}_assign(e){this!==e&&(X(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Dn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await uc(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(qt(this.auth.app))return Promise.reject(Vn(this.auth));const e=await this.getIdToken();return await as(this,z2(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,c,u,d,f;const m=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(i=n.email)!==null&&i!==void 0?i:void 0,b=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,k=(o=n.photoURL)!==null&&o!==void 0?o:void 0,P=(c=n.tenantId)!==null&&c!==void 0?c:void 0,j=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,w=(d=n.createdAt)!==null&&d!==void 0?d:void 0,x=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:T,emailVerified:O,isAnonymous:D,providerData:V,stsTokenManager:E}=n;X(T&&E,e,"internal-error");const v=Yi.fromJSON(this.name,E);X(typeof T=="string",e,"internal-error"),nr(m,e.name),nr(g,e.name),X(typeof O=="boolean",e,"internal-error"),X(typeof D=="boolean",e,"internal-error"),nr(b,e.name),nr(k,e.name),nr(P,e.name),nr(j,e.name),nr(w,e.name),nr(x,e.name);const S=new Dn({uid:T,auth:e,email:g,emailVerified:O,displayName:m,isAnonymous:D,photoURL:k,phoneNumber:b,tenantId:P,stsTokenManager:v,createdAt:w,lastLoginAt:x});return V&&Array.isArray(V)&&(S.providerData=V.map(I=>Object.assign({},I))),j&&(S._redirectEventId=j),S}static async _fromIdTokenResponse(e,n,r=!1){const i=new Yi;i.updateFromServerResponse(n);const s=new Dn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await uc(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];X(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Ax(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Yi;c.updateFromIdToken(r);const u=new Dn({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Ih(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey=new Map;function On(t){$n(t instanceof Function,"Expected a class definition");let e=Ey.get(t);return e?($n(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ey.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rx{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Rx.type="NONE";const Sy=Rx;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(t,e,n){return`firebase:${t}:${e}:${n}`}class Xi{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Il(this.userKey,i.apiKey,s),this.fullPersistenceKey=Il("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Dn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Xi(On(Sy),e,r);const i=(await Promise.all(n.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||On(Sy);const o=Il(r,e.config.apiKey,e.name);let c=null;for(const d of n)try{const f=await d._get(o);if(f){const m=Dn._fromJSON(e,f);d!==s&&(c=m),s=d;break}}catch{}const u=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Xi(s,e,r):(s=u[0],c&&await s._set(o,c.toJSON()),await Promise.all(n.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new Xi(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function by(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Nx(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Cx(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ox(e))return"Blackberry";if(Lx(e))return"Webos";if(Px(e))return"Safari";if((e.includes("chrome/")||jx(e))&&!e.includes("edge/"))return"Chrome";if(Dx(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Cx(t=dt()){return/firefox\//i.test(t)}function Px(t=dt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function jx(t=dt()){return/crios\//i.test(t)}function Nx(t=dt()){return/iemobile/i.test(t)}function Dx(t=dt()){return/android/i.test(t)}function Ox(t=dt()){return/blackberry/i.test(t)}function Lx(t=dt()){return/webos/i.test(t)}function Zf(t=dt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function G2(t=dt()){var e;return Zf(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Q2(){return uI()&&document.documentMode===10}function Vx(t=dt()){return Zf(t)||Dx(t)||Lx(t)||Ox(t)||/windows phone/i.test(t)||Nx(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mx(t,e=[]){let n;switch(t){case"Browser":n=by(dt());break;case"Worker":n=`${by(dt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${vi}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y2{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,c)=>{try{const u=e(s);o(u)}catch(u){c(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X2(t,e={}){return _n(t,"GET","/v2/passwordPolicy",Yn(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J2=6;class Z2{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:J2,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ty(this),this.idTokenSubscription=new Ty(this),this.beforeStateQueue=new Y2(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Sx,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=On(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Xi.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await kx(this,{idToken:e}),r=await Dn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(qt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await uc(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=N2()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(qt(this.app))return Promise.reject(Vn(this));const n=e?Ke(e):null;return n&&X(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&X(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return qt(this.app)?Promise.reject(Vn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return qt(this.app)?Promise.reject(Vn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(On(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await X2(this),n=new Z2(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new oa("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await q2(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&On(e)||this._popupRedirectResolver;X(n,this,"argument-error"),this.redirectPersistenceManager=await Xi.create(this,[On(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Mx(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&R2(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Xn(t){return Ke(t)}class Ty{constructor(e){this.auth=e,this.observer=null,this.addObserver=vI(n=>this.observer=n)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function tk(t){Hc=t}function Fx(t){return Hc.loadJS(t)}function nk(){return Hc.recaptchaEnterpriseScript}function rk(){return Hc.gapiScript}function ik(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const sk="recaptcha-enterprise",ok="NO_RECAPTCHA";class ak{constructor(e){this.type=sk,this.auth=Xn(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{F2(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new M2(u);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,o(d.siteKey)}}).catch(u=>{c(u)})})}function i(s,o,c){const u=window.grecaptcha;xy(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(d=>{o(d)}).catch(()=>{o(ok)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(c=>{if(!n&&xy(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=nk();u.length!==0&&(u+=c),Fx(u).then(()=>{i(c,s,o)}).catch(d=>{o(d)})}}).catch(c=>{o(c)})})}}async function Iy(t,e,n,r=!1){const i=new ak(t);let s;try{s=await i.verify(n)}catch{s=await i.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function dc(t,e,n,r){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await Iy(t,e,n,n==="getOobCode");return r(t,s)}else return r(t,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Iy(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(s)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lk(t,e){const n=$c(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(lc(s,e??{}))return i;Ft(i,"already-initialized")}return n.initialize({options:e})}function ck(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(On);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function uk(t,e,n){const r=Xn(t);X(r._canInitEmulator,r,"emulator-config-failed"),X(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=zx(e),{host:o,port:c}=dk(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),hk()}function zx(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function dk(t){const e=zx(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:ky(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:ky(o)}}}function ky(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function hk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Nn("not implemented")}_getIdTokenResponse(e){return Nn("not implemented")}_linkToIdToken(e,n){return Nn("not implemented")}_getReauthenticationResolver(e){return Nn("not implemented")}}async function fk(t,e){return _n(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pk(t,e){return ca(t,"POST","/v1/accounts:signInWithPassword",Yn(t,e))}async function mk(t,e){return _n(t,"POST","/v1/accounts:sendOobCode",Yn(t,e))}async function gk(t,e){return mk(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yk(t,e){return ca(t,"POST","/v1/accounts:signInWithEmailLink",Yn(t,e))}async function vk(t,e){return ca(t,"POST","/v1/accounts:signInWithEmailLink",Yn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o extends ep{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new $o(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new $o(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return dc(e,n,"signInWithPassword",pk);case"emailLink":return yk(e,{email:this._email,oobCode:this._password});default:Ft(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return dc(e,r,"signUpPassword",fk);case"emailLink":return vk(e,{idToken:n,email:this._email,oobCode:this._password});default:Ft(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ji(t,e){return ca(t,"POST","/v1/accounts:signInWithIdp",Yn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _k="http://localhost";class ci extends ep{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ci(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ft("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=Gf(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new ci(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ji(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ji(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ji(e,n)}buildRequest(){const e={requestUri:_k,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=aa(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xk(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function wk(t){const e=no(ro(t)).link,n=e?no(ro(e)).deep_link_id:null,r=no(ro(t)).deep_link_id;return(r?no(ro(r)).link:null)||r||n||e||t}class tp{constructor(e){var n,r,i,s,o,c;const u=no(ro(e)),d=(n=u.apiKey)!==null&&n!==void 0?n:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,m=xk((i=u.mode)!==null&&i!==void 0?i:null);X(d&&f&&m,"argument-error"),this.apiKey=d,this.operation=m,this.code=f,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const n=wk(e);try{return new tp(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(){this.providerId=xs.PROVIDER_ID}static credential(e,n){return $o._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=tp.parseLink(n);return X(r,"argument-error"),$o._fromEmailAndCode(e,r.code,r.tenantId)}}xs.PROVIDER_ID="password";xs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";xs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua extends np{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr extends ua{constructor(){super("facebook.com")}static credential(e){return ci._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lr.credential(e.oauthAccessToken)}catch{return null}}}lr.FACEBOOK_SIGN_IN_METHOD="facebook.com";lr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn extends ua{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ci._fromParams({providerId:Cn.PROVIDER_ID,signInMethod:Cn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Cn.credentialFromTaggedObject(e)}static credentialFromError(e){return Cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Cn.credential(n,r)}catch{return null}}}Cn.GOOGLE_SIGN_IN_METHOD="google.com";Cn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr extends ua{constructor(){super("github.com")}static credential(e){return ci._fromParams({providerId:cr.PROVIDER_ID,signInMethod:cr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return cr.credentialFromTaggedObject(e)}static credentialFromError(e){return cr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return cr.credential(e.oauthAccessToken)}catch{return null}}}cr.GITHUB_SIGN_IN_METHOD="github.com";cr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur extends ua{constructor(){super("twitter.com")}static credential(e,n){return ci._fromParams({providerId:ur.PROVIDER_ID,signInMethod:ur.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ur.credentialFromTaggedObject(e)}static credentialFromError(e){return ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return ur.credential(n,r)}catch{return null}}}ur.TWITTER_SIGN_IN_METHOD="twitter.com";ur.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ek(t,e){return ca(t,"POST","/v1/accounts:signUp",Yn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Dn._fromIdTokenResponse(e,r,i),o=Ay(r);return new ui({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Ay(r);return new ui({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Ay(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc extends vn{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,hc.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new hc(e,n,r,i)}}function Ux(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?hc._fromErrorAndOperation(t,s,e,r):s})}async function Sk(t,e,n=!1){const r=await as(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ui._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bk(t,e,n=!1){const{auth:r}=t;if(qt(r.app))return Promise.reject(Vn(r));const i="reauthenticate";try{const s=await as(t,Ux(r,i,e,t),n);X(s.idToken,r,"internal-error");const o=Jf(s.idToken);X(o,r,"internal-error");const{sub:c}=o;return X(t.uid===c,r,"user-mismatch"),ui._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Ft(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bx(t,e,n=!1){if(qt(t.app))return Promise.reject(Vn(t));const r="signIn",i=await Ux(t,r,e),s=await ui._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function Tk(t,e){return Bx(Xn(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wx(t){const e=Xn(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Ik(t,e,n){const r=Xn(t);await dc(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",gk)}async function kk(t,e,n){if(qt(t.app))return Promise.reject(Vn(t));const r=Xn(t),o=await dc(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Ek).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Wx(t),u}),c=await ui._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function Ak(t,e,n){return qt(t.app)?Promise.reject(Vn(t)):Tk(Ke(t),xs.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Wx(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rk(t,e){return _n(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ck(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Ke(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await as(r,Rk(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function Pk(t,e,n,r){return Ke(t).onIdTokenChanged(e,n,r)}function jk(t,e,n){return Ke(t).beforeAuthStateChanged(e,n)}function da(t,e,n,r){return Ke(t).onAuthStateChanged(e,n,r)}function $x(t){return Ke(t).signOut()}const fc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hx{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(fc,"1"),this.storage.removeItem(fc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nk=1e3,Dk=10;class Kx extends Hx{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Vx(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Q2()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Dk):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Nk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kx.type="LOCAL";const Ok=Kx;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qx extends Hx{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}qx.type="SESSION";const Gx=qx;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lk(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new Kc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async d=>d(n.origin,s)),u=await Lk(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Kc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rp(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,u)=>{const d=rp("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(m){const g=m;if(g.data.eventId===d)switch(g.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(g.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(){return window}function Mk(t){hn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qx(){return typeof hn().WorkerGlobalScope<"u"&&typeof hn().importScripts=="function"}async function Fk(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function zk(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Uk(){return Qx()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yx="firebaseLocalStorageDb",Bk=1,pc="firebaseLocalStorage",Xx="fbase_key";class ha{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function qc(t,e){return t.transaction([pc],e?"readwrite":"readonly").objectStore(pc)}function Wk(){const t=indexedDB.deleteDatabase(Yx);return new ha(t).toPromise()}function kh(){const t=indexedDB.open(Yx,Bk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(pc,{keyPath:Xx})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(pc)?e(r):(r.close(),await Wk(),e(await kh()))})})}async function Ry(t,e,n){const r=qc(t,!0).put({[Xx]:e,value:n});return new ha(r).toPromise()}async function $k(t,e){const n=qc(t,!1).get(e),r=await new ha(n).toPromise();return r===void 0?null:r.value}function Cy(t,e){const n=qc(t,!0).delete(e);return new ha(n).toPromise()}const Hk=800,Kk=3;class Jx{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await kh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Kk)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qx()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Kc._getInstance(Uk()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Fk(),!this.activeServiceWorker)return;this.sender=new Vk(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||zk()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await kh();return await Ry(e,fc,"1"),await Cy(e,fc),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ry(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>$k(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Cy(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=qc(i,!1).getAll();return new ha(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Hk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Jx.type="LOCAL";const qk=Jx;new la(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zx(t,e){return e?On(e):(X(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip extends ep{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ji(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ji(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ji(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Gk(t){return Bx(t.auth,new ip(t),t.bypassAuthState)}function Qk(t){const{auth:e,user:n}=t;return X(n,e,"internal-error"),bk(n,new ip(t),t.bypassAuthState)}async function Yk(t){const{auth:e,user:n}=t;return X(n,e,"internal-error"),Sk(n,new ip(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Gk;case"linkViaPopup":case"linkViaRedirect":return Yk;case"reauthViaPopup":case"reauthViaRedirect":return Qk;default:Ft(this.auth,"internal-error")}}resolve(e){$n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){$n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xk=new la(2e3,1e4);async function Jk(t,e,n){if(qt(t.app))return Promise.reject(Jt(t,"operation-not-supported-in-this-environment"));const r=Xn(t);C2(t,e,np);const i=Zx(r,n);return new Jr(r,"signInViaPopup",e,i).executeNotNull()}class Jr extends ew{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Jr.currentPopupAction&&Jr.currentPopupAction.cancel(),Jr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return X(e,this.auth,"internal-error"),e}async onExecution(){$n(this.filter.length===1,"Popup operations only handle one event");const e=rp();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Jt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Jt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Jr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Jt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Xk.get())};e()}}Jr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zk="pendingRedirect",kl=new Map;class eA extends ew{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=kl.get(this.auth._key());if(!e){try{const r=await tA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}kl.set(this.auth._key(),e)}return this.bypassAuthState||kl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tA(t,e){const n=iA(e),r=rA(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function nA(t,e){kl.set(t._key(),e)}function rA(t){return On(t._redirectPersistence)}function iA(t){return Il(Zk,t.config.apiKey,t.name)}async function sA(t,e,n=!1){if(qt(t.app))return Promise.reject(Vn(t));const r=Xn(t),i=Zx(r,e),o=await new eA(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oA=10*60*1e3;class aA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!lA(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!tw(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Jt(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=oA&&this.cachedEventUids.clear(),this.cachedEventUids.has(Py(e))}saveEventToCache(e){this.cachedEventUids.add(Py(e)),this.lastProcessedEventTime=Date.now()}}function Py(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function tw({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function lA(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tw(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cA(t,e={}){return _n(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dA=/^https?/;async function hA(t){if(t.config.emulator)return;const{authorizedDomains:e}=await cA(t);for(const n of e)try{if(fA(n))return}catch{}Ft(t,"unauthorized-domain")}function fA(t){const e=Th(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!dA.test(n))return!1;if(uA.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pA=new la(3e4,6e4);function jy(){const t=hn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function mA(t){return new Promise((e,n)=>{var r,i,s;function o(){jy(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jy(),n(Jt(t,"network-request-failed"))},timeout:pA.get()})}if(!((i=(r=hn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=hn().gapi)===null||s===void 0)&&s.load)o();else{const c=ik("iframefcb");return hn()[c]=()=>{gapi.load?o():n(Jt(t,"network-request-failed"))},Fx(`${rk()}?onload=${c}`).catch(u=>n(u))}}).catch(e=>{throw Al=null,e})}let Al=null;function gA(t){return Al=Al||mA(t),Al}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yA=new la(5e3,15e3),vA="__/auth/iframe",_A="emulator/auth/iframe",xA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function EA(t){const e=t.config;X(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Xf(e,_A):`https://${t.config.authDomain}/${vA}`,r={apiKey:e.apiKey,appName:t.name,v:vi},i=wA.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${aa(r).slice(1)}`}async function SA(t){const e=await gA(t),n=hn().gapi;return X(n,t,"internal-error"),e.open({where:document.body,url:EA(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:xA,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Jt(t,"network-request-failed"),c=hn().setTimeout(()=>{s(o)},yA.get());function u(){hn().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},TA=500,IA=600,kA="_blank",AA="http://localhost";class Ny{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function RA(t,e,n,r=TA,i=IA){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},bA),{width:r.toString(),height:i.toString(),top:s,left:o}),d=dt().toLowerCase();n&&(c=jx(d)?kA:n),Cx(d)&&(e=e||AA,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[b,k])=>`${g}${b}=${k},`,"");if(G2(d)&&c!=="_self")return CA(e||"",c),new Ny(null);const m=window.open(e||"",c,f);X(m,t,"popup-blocked");try{m.focus()}catch{}return new Ny(m)}function CA(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PA="__/auth/handler",jA="emulator/auth/handler",NA=encodeURIComponent("fac");async function Dy(t,e,n,r,i,s){X(t.config.authDomain,t,"auth-domain-config-required"),X(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:vi,eventId:i};if(e instanceof np){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",yI(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof ua){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await t._getAppCheckToken(),d=u?`#${NA}=${encodeURIComponent(u)}`:"";return`${DA(t)}?${aa(c).slice(1)}${d}`}function DA({config:t}){return t.emulator?Xf(t,jA):`https://${t.authDomain}/${PA}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md="webStorageSupport";class OA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Gx,this._completeRedirectFn=sA,this._overrideRedirectResult=nA}async _openPopup(e,n,r,i){var s;$n((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Dy(e,n,r,Th(),i);return RA(e,o,rp())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Dy(e,n,r,Th(),i);return Mk(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):($n(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await SA(e),r=new aA(e);return n.register("authEvent",i=>(X(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(md,{type:md},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[md];o!==void 0&&n(!!o),Ft(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=hA(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Vx()||Px()||Zf()}}const LA=OA;var Oy="@firebase/auth",Ly="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MA(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function FA(t){li(new Cr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;X(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Mx(t)},d=new ek(r,i,s,u);return ck(d,n),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),li(new Cr("auth-internal",e=>{const n=Xn(e.getProvider("auth").getImmediate());return(r=>new VA(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),dn(Oy,Ly,MA(t)),dn(Oy,Ly,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zA=5*60,UA=mx("authIdTokenMaxAge")||zA;let Vy=null;const BA=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>UA)return;const i=n==null?void 0:n.token;Vy!==i&&(Vy=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function WA(t=qf()){const e=$c(t,"auth");if(e.isInitialized())return e.getImmediate();const n=lk(t,{popupRedirectResolver:LA,persistence:[qk,Ok,Gx]}),r=mx("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=BA(s.toString());jk(n,o,()=>o(n.currentUser)),Pk(n,c=>o(c))}}const i=hx("auth");return i&&uk(n,`http://${i}`),n}function $A(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}tk({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=Jt("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",$A().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});FA("Browser");var My=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ni,nw;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,v){function S(){}S.prototype=v.prototype,E.D=v.prototype,E.prototype=new S,E.prototype.constructor=E,E.C=function(I,A,R){for(var y=Array(arguments.length-2),q=2;q<arguments.length;q++)y[q-2]=arguments[q];return v.prototype[A].apply(I,y)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,v,S){S||(S=0);var I=Array(16);if(typeof v=="string")for(var A=0;16>A;++A)I[A]=v.charCodeAt(S++)|v.charCodeAt(S++)<<8|v.charCodeAt(S++)<<16|v.charCodeAt(S++)<<24;else for(A=0;16>A;++A)I[A]=v[S++]|v[S++]<<8|v[S++]<<16|v[S++]<<24;v=E.g[0],S=E.g[1],A=E.g[2];var R=E.g[3],y=v+(R^S&(A^R))+I[0]+3614090360&4294967295;v=S+(y<<7&4294967295|y>>>25),y=R+(A^v&(S^A))+I[1]+3905402710&4294967295,R=v+(y<<12&4294967295|y>>>20),y=A+(S^R&(v^S))+I[2]+606105819&4294967295,A=R+(y<<17&4294967295|y>>>15),y=S+(v^A&(R^v))+I[3]+3250441966&4294967295,S=A+(y<<22&4294967295|y>>>10),y=v+(R^S&(A^R))+I[4]+4118548399&4294967295,v=S+(y<<7&4294967295|y>>>25),y=R+(A^v&(S^A))+I[5]+1200080426&4294967295,R=v+(y<<12&4294967295|y>>>20),y=A+(S^R&(v^S))+I[6]+2821735955&4294967295,A=R+(y<<17&4294967295|y>>>15),y=S+(v^A&(R^v))+I[7]+4249261313&4294967295,S=A+(y<<22&4294967295|y>>>10),y=v+(R^S&(A^R))+I[8]+1770035416&4294967295,v=S+(y<<7&4294967295|y>>>25),y=R+(A^v&(S^A))+I[9]+2336552879&4294967295,R=v+(y<<12&4294967295|y>>>20),y=A+(S^R&(v^S))+I[10]+4294925233&4294967295,A=R+(y<<17&4294967295|y>>>15),y=S+(v^A&(R^v))+I[11]+2304563134&4294967295,S=A+(y<<22&4294967295|y>>>10),y=v+(R^S&(A^R))+I[12]+1804603682&4294967295,v=S+(y<<7&4294967295|y>>>25),y=R+(A^v&(S^A))+I[13]+4254626195&4294967295,R=v+(y<<12&4294967295|y>>>20),y=A+(S^R&(v^S))+I[14]+2792965006&4294967295,A=R+(y<<17&4294967295|y>>>15),y=S+(v^A&(R^v))+I[15]+1236535329&4294967295,S=A+(y<<22&4294967295|y>>>10),y=v+(A^R&(S^A))+I[1]+4129170786&4294967295,v=S+(y<<5&4294967295|y>>>27),y=R+(S^A&(v^S))+I[6]+3225465664&4294967295,R=v+(y<<9&4294967295|y>>>23),y=A+(v^S&(R^v))+I[11]+643717713&4294967295,A=R+(y<<14&4294967295|y>>>18),y=S+(R^v&(A^R))+I[0]+3921069994&4294967295,S=A+(y<<20&4294967295|y>>>12),y=v+(A^R&(S^A))+I[5]+3593408605&4294967295,v=S+(y<<5&4294967295|y>>>27),y=R+(S^A&(v^S))+I[10]+38016083&4294967295,R=v+(y<<9&4294967295|y>>>23),y=A+(v^S&(R^v))+I[15]+3634488961&4294967295,A=R+(y<<14&4294967295|y>>>18),y=S+(R^v&(A^R))+I[4]+3889429448&4294967295,S=A+(y<<20&4294967295|y>>>12),y=v+(A^R&(S^A))+I[9]+568446438&4294967295,v=S+(y<<5&4294967295|y>>>27),y=R+(S^A&(v^S))+I[14]+3275163606&4294967295,R=v+(y<<9&4294967295|y>>>23),y=A+(v^S&(R^v))+I[3]+4107603335&4294967295,A=R+(y<<14&4294967295|y>>>18),y=S+(R^v&(A^R))+I[8]+1163531501&4294967295,S=A+(y<<20&4294967295|y>>>12),y=v+(A^R&(S^A))+I[13]+2850285829&4294967295,v=S+(y<<5&4294967295|y>>>27),y=R+(S^A&(v^S))+I[2]+4243563512&4294967295,R=v+(y<<9&4294967295|y>>>23),y=A+(v^S&(R^v))+I[7]+1735328473&4294967295,A=R+(y<<14&4294967295|y>>>18),y=S+(R^v&(A^R))+I[12]+2368359562&4294967295,S=A+(y<<20&4294967295|y>>>12),y=v+(S^A^R)+I[5]+4294588738&4294967295,v=S+(y<<4&4294967295|y>>>28),y=R+(v^S^A)+I[8]+2272392833&4294967295,R=v+(y<<11&4294967295|y>>>21),y=A+(R^v^S)+I[11]+1839030562&4294967295,A=R+(y<<16&4294967295|y>>>16),y=S+(A^R^v)+I[14]+4259657740&4294967295,S=A+(y<<23&4294967295|y>>>9),y=v+(S^A^R)+I[1]+2763975236&4294967295,v=S+(y<<4&4294967295|y>>>28),y=R+(v^S^A)+I[4]+1272893353&4294967295,R=v+(y<<11&4294967295|y>>>21),y=A+(R^v^S)+I[7]+4139469664&4294967295,A=R+(y<<16&4294967295|y>>>16),y=S+(A^R^v)+I[10]+3200236656&4294967295,S=A+(y<<23&4294967295|y>>>9),y=v+(S^A^R)+I[13]+681279174&4294967295,v=S+(y<<4&4294967295|y>>>28),y=R+(v^S^A)+I[0]+3936430074&4294967295,R=v+(y<<11&4294967295|y>>>21),y=A+(R^v^S)+I[3]+3572445317&4294967295,A=R+(y<<16&4294967295|y>>>16),y=S+(A^R^v)+I[6]+76029189&4294967295,S=A+(y<<23&4294967295|y>>>9),y=v+(S^A^R)+I[9]+3654602809&4294967295,v=S+(y<<4&4294967295|y>>>28),y=R+(v^S^A)+I[12]+3873151461&4294967295,R=v+(y<<11&4294967295|y>>>21),y=A+(R^v^S)+I[15]+530742520&4294967295,A=R+(y<<16&4294967295|y>>>16),y=S+(A^R^v)+I[2]+3299628645&4294967295,S=A+(y<<23&4294967295|y>>>9),y=v+(A^(S|~R))+I[0]+4096336452&4294967295,v=S+(y<<6&4294967295|y>>>26),y=R+(S^(v|~A))+I[7]+1126891415&4294967295,R=v+(y<<10&4294967295|y>>>22),y=A+(v^(R|~S))+I[14]+2878612391&4294967295,A=R+(y<<15&4294967295|y>>>17),y=S+(R^(A|~v))+I[5]+4237533241&4294967295,S=A+(y<<21&4294967295|y>>>11),y=v+(A^(S|~R))+I[12]+1700485571&4294967295,v=S+(y<<6&4294967295|y>>>26),y=R+(S^(v|~A))+I[3]+2399980690&4294967295,R=v+(y<<10&4294967295|y>>>22),y=A+(v^(R|~S))+I[10]+4293915773&4294967295,A=R+(y<<15&4294967295|y>>>17),y=S+(R^(A|~v))+I[1]+2240044497&4294967295,S=A+(y<<21&4294967295|y>>>11),y=v+(A^(S|~R))+I[8]+1873313359&4294967295,v=S+(y<<6&4294967295|y>>>26),y=R+(S^(v|~A))+I[15]+4264355552&4294967295,R=v+(y<<10&4294967295|y>>>22),y=A+(v^(R|~S))+I[6]+2734768916&4294967295,A=R+(y<<15&4294967295|y>>>17),y=S+(R^(A|~v))+I[13]+1309151649&4294967295,S=A+(y<<21&4294967295|y>>>11),y=v+(A^(S|~R))+I[4]+4149444226&4294967295,v=S+(y<<6&4294967295|y>>>26),y=R+(S^(v|~A))+I[11]+3174756917&4294967295,R=v+(y<<10&4294967295|y>>>22),y=A+(v^(R|~S))+I[2]+718787259&4294967295,A=R+(y<<15&4294967295|y>>>17),y=S+(R^(A|~v))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+v&4294967295,E.g[1]=E.g[1]+(A+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+A&4294967295,E.g[3]=E.g[3]+R&4294967295}r.prototype.u=function(E,v){v===void 0&&(v=E.length);for(var S=v-this.blockSize,I=this.B,A=this.h,R=0;R<v;){if(A==0)for(;R<=S;)i(this,E,R),R+=this.blockSize;if(typeof E=="string"){for(;R<v;)if(I[A++]=E.charCodeAt(R++),A==this.blockSize){i(this,I),A=0;break}}else for(;R<v;)if(I[A++]=E[R++],A==this.blockSize){i(this,I),A=0;break}}this.h=A,this.o+=v},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var v=1;v<E.length-8;++v)E[v]=0;var S=8*this.o;for(v=E.length-8;v<E.length;++v)E[v]=S&255,S/=256;for(this.u(E),E=Array(16),v=S=0;4>v;++v)for(var I=0;32>I;I+=8)E[S++]=this.g[v]>>>I&255;return E};function s(E,v){var S=c;return Object.prototype.hasOwnProperty.call(S,E)?S[E]:S[E]=v(E)}function o(E,v){this.h=v;for(var S=[],I=!0,A=E.length-1;0<=A;A--){var R=E[A]|0;I&&R==v||(S[A]=R,I=!1)}this.g=S}var c={};function u(E){return-128<=E&&128>E?s(E,function(v){return new o([v|0],0>v?-1:0)}):new o([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return m;if(0>E)return j(d(-E));for(var v=[],S=1,I=0;E>=S;I++)v[I]=E/S|0,S*=4294967296;return new o(v,0)}function f(E,v){if(E.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(E.charAt(0)=="-")return j(f(E.substring(1),v));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var S=d(Math.pow(v,8)),I=m,A=0;A<E.length;A+=8){var R=Math.min(8,E.length-A),y=parseInt(E.substring(A,A+R),v);8>R?(R=d(Math.pow(v,R)),I=I.j(R).add(d(y))):(I=I.j(S),I=I.add(d(y)))}return I}var m=u(0),g=u(1),b=u(16777216);t=o.prototype,t.m=function(){if(P(this))return-j(this).m();for(var E=0,v=1,S=0;S<this.g.length;S++){var I=this.i(S);E+=(0<=I?I:4294967296+I)*v,v*=4294967296}return E},t.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(P(this))return"-"+j(this).toString(E);for(var v=d(Math.pow(E,6)),S=this,I="";;){var A=O(S,v).g;S=w(S,A.j(v));var R=((0<S.g.length?S.g[0]:S.h)>>>0).toString(E);if(S=A,k(S))return R+I;for(;6>R.length;)R="0"+R;I=R+I}},t.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var v=0;v<E.g.length;v++)if(E.g[v]!=0)return!1;return!0}function P(E){return E.h==-1}t.l=function(E){return E=w(this,E),P(E)?-1:k(E)?0:1};function j(E){for(var v=E.g.length,S=[],I=0;I<v;I++)S[I]=~E.g[I];return new o(S,~E.h).add(g)}t.abs=function(){return P(this)?j(this):this},t.add=function(E){for(var v=Math.max(this.g.length,E.g.length),S=[],I=0,A=0;A<=v;A++){var R=I+(this.i(A)&65535)+(E.i(A)&65535),y=(R>>>16)+(this.i(A)>>>16)+(E.i(A)>>>16);I=y>>>16,R&=65535,y&=65535,S[A]=y<<16|R}return new o(S,S[S.length-1]&-2147483648?-1:0)};function w(E,v){return E.add(j(v))}t.j=function(E){if(k(this)||k(E))return m;if(P(this))return P(E)?j(this).j(j(E)):j(j(this).j(E));if(P(E))return j(this.j(j(E)));if(0>this.l(b)&&0>E.l(b))return d(this.m()*E.m());for(var v=this.g.length+E.g.length,S=[],I=0;I<2*v;I++)S[I]=0;for(I=0;I<this.g.length;I++)for(var A=0;A<E.g.length;A++){var R=this.i(I)>>>16,y=this.i(I)&65535,q=E.i(A)>>>16,Y=E.i(A)&65535;S[2*I+2*A]+=y*Y,x(S,2*I+2*A),S[2*I+2*A+1]+=R*Y,x(S,2*I+2*A+1),S[2*I+2*A+1]+=y*q,x(S,2*I+2*A+1),S[2*I+2*A+2]+=R*q,x(S,2*I+2*A+2)}for(I=0;I<v;I++)S[I]=S[2*I+1]<<16|S[2*I];for(I=v;I<2*v;I++)S[I]=0;return new o(S,0)};function x(E,v){for(;(E[v]&65535)!=E[v];)E[v+1]+=E[v]>>>16,E[v]&=65535,v++}function T(E,v){this.g=E,this.h=v}function O(E,v){if(k(v))throw Error("division by zero");if(k(E))return new T(m,m);if(P(E))return v=O(j(E),v),new T(j(v.g),j(v.h));if(P(v))return v=O(E,j(v)),new T(j(v.g),v.h);if(30<E.g.length){if(P(E)||P(v))throw Error("slowDivide_ only works with positive integers.");for(var S=g,I=v;0>=I.l(E);)S=D(S),I=D(I);var A=V(S,1),R=V(I,1);for(I=V(I,2),S=V(S,2);!k(I);){var y=R.add(I);0>=y.l(E)&&(A=A.add(S),R=y),I=V(I,1),S=V(S,1)}return v=w(E,A.j(v)),new T(A,v)}for(A=m;0<=E.l(v);){for(S=Math.max(1,Math.floor(E.m()/v.m())),I=Math.ceil(Math.log(S)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),R=d(S),y=R.j(v);P(y)||0<y.l(E);)S-=I,R=d(S),y=R.j(v);k(R)&&(R=g),A=A.add(R),E=w(E,y)}return new T(A,E)}t.A=function(E){return O(this,E).h},t.and=function(E){for(var v=Math.max(this.g.length,E.g.length),S=[],I=0;I<v;I++)S[I]=this.i(I)&E.i(I);return new o(S,this.h&E.h)},t.or=function(E){for(var v=Math.max(this.g.length,E.g.length),S=[],I=0;I<v;I++)S[I]=this.i(I)|E.i(I);return new o(S,this.h|E.h)},t.xor=function(E){for(var v=Math.max(this.g.length,E.g.length),S=[],I=0;I<v;I++)S[I]=this.i(I)^E.i(I);return new o(S,this.h^E.h)};function D(E){for(var v=E.g.length+1,S=[],I=0;I<v;I++)S[I]=E.i(I)<<1|E.i(I-1)>>>31;return new o(S,E.h)}function V(E,v){var S=v>>5;v%=32;for(var I=E.g.length-S,A=[],R=0;R<I;R++)A[R]=0<v?E.i(R+S)>>>v|E.i(R+S+1)<<32-v:E.i(R+S);return new o(A,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,nw=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=f,ni=o}).apply(typeof My<"u"?My:typeof self<"u"?self:typeof window<"u"?window:{});var nl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var rw,io,iw,Rl,Ah,sw,ow,aw;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(l,h,p){return l==Array.prototype||l==Object.prototype||(l[h]=p.value),l};function n(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof nl=="object"&&nl];for(var h=0;h<l.length;++h){var p=l[h];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=n(this);function i(l,h){if(h)e:{var p=r;l=l.split(".");for(var _=0;_<l.length-1;_++){var N=l[_];if(!(N in p))break e;p=p[N]}l=l[l.length-1],_=p[l],h=h(_),h!=_&&h!=null&&e(p,l,{configurable:!0,writable:!0,value:h})}}function s(l,h){l instanceof String&&(l+="");var p=0,_=!1,N={next:function(){if(!_&&p<l.length){var L=p++;return{value:h(L,l[L]),done:!1}}return _=!0,{done:!0,value:void 0}}};return N[Symbol.iterator]=function(){return N},N}i("Array.prototype.values",function(l){return l||function(){return s(this,function(h,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function u(l){var h=typeof l;return h=h!="object"?h:l?Array.isArray(l)?"array":h:"null",h=="array"||h=="object"&&typeof l.length=="number"}function d(l){var h=typeof l;return h=="object"&&l!=null||h=="function"}function f(l,h,p){return l.call.apply(l.bind,arguments)}function m(l,h,p){if(!l)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var N=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(N,_),l.apply(h,N)}}return function(){return l.apply(h,arguments)}}function g(l,h,p){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,g.apply(null,arguments)}function b(l,h){var p=Array.prototype.slice.call(arguments,1);return function(){var _=p.slice();return _.push.apply(_,arguments),l.apply(this,_)}}function k(l,h){function p(){}p.prototype=h.prototype,l.aa=h.prototype,l.prototype=new p,l.prototype.constructor=l,l.Qb=function(_,N,L){for(var B=Array(arguments.length-2),ge=2;ge<arguments.length;ge++)B[ge-2]=arguments[ge];return h.prototype[N].apply(_,B)}}function P(l){const h=l.length;if(0<h){const p=Array(h);for(let _=0;_<h;_++)p[_]=l[_];return p}return[]}function j(l,h){for(let p=1;p<arguments.length;p++){const _=arguments[p];if(u(_)){const N=l.length||0,L=_.length||0;l.length=N+L;for(let B=0;B<L;B++)l[N+B]=_[B]}else l.push(_)}}class w{constructor(h,p){this.i=h,this.j=p,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function x(l){return/^[\s\xa0]*$/.test(l)}function T(){var l=c.navigator;return l&&(l=l.userAgent)?l:""}function O(l){return O[" "](l),l}O[" "]=function(){};var D=T().indexOf("Gecko")!=-1&&!(T().toLowerCase().indexOf("webkit")!=-1&&T().indexOf("Edge")==-1)&&!(T().indexOf("Trident")!=-1||T().indexOf("MSIE")!=-1)&&T().indexOf("Edge")==-1;function V(l,h,p){for(const _ in l)h.call(p,l[_],_,l)}function E(l,h){for(const p in l)h.call(void 0,l[p],p,l)}function v(l){const h={};for(const p in l)h[p]=l[p];return h}const S="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(l,h){let p,_;for(let N=1;N<arguments.length;N++){_=arguments[N];for(p in _)l[p]=_[p];for(let L=0;L<S.length;L++)p=S[L],Object.prototype.hasOwnProperty.call(_,p)&&(l[p]=_[p])}}function A(l){var h=1;l=l.split(":");const p=[];for(;0<h&&l.length;)p.push(l.shift()),h--;return l.length&&p.push(l.join(":")),p}function R(l){c.setTimeout(()=>{throw l},0)}function y(){var l=W;let h=null;return l.g&&(h=l.g,l.g=l.g.next,l.g||(l.h=null),h.next=null),h}class q{constructor(){this.h=this.g=null}add(h,p){const _=Y.get();_.set(h,p),this.h?this.h.next=_:this.g=_,this.h=_}}var Y=new w(()=>new pe,l=>l.reset());class pe{constructor(){this.next=this.g=this.h=null}set(h,p){this.h=h,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let de,z=!1,W=new q,Q=()=>{const l=c.Promise.resolve(void 0);de=()=>{l.then(me)}};var me=()=>{for(var l;l=y();){try{l.h.call(l.g)}catch(p){R(p)}var h=Y;h.j(l),100>h.h&&(h.h++,l.next=h.g,h.g=l)}z=!1};function te(){this.s=this.s,this.C=this.C}te.prototype.s=!1,te.prototype.ma=function(){this.s||(this.s=!0,this.N())},te.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ce(l,h){this.type=l,this.g=this.target=h,this.defaultPrevented=!1}Ce.prototype.h=function(){this.defaultPrevented=!0};var wn=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var l=!1,h=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const p=()=>{};c.addEventListener("test",p,h),c.removeEventListener("test",p,h)}catch{}return l}();function En(l,h){if(Ce.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l){var p=this.type=l.type,_=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;if(this.target=l.target||l.srcElement,this.g=h,h=l.relatedTarget){if(D){e:{try{O(h.nodeName);var N=!0;break e}catch{}N=!1}N||(h=null)}}else p=="mouseover"?h=l.fromElement:p=="mouseout"&&(h=l.toElement);this.relatedTarget=h,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=typeof l.pointerType=="string"?l.pointerType:Sn[l.pointerType]||"",this.state=l.state,this.i=l,l.defaultPrevented&&En.aa.h.call(this)}}k(En,Ce);var Sn={2:"touch",3:"pen",4:"mouse"};En.prototype.h=function(){En.aa.h.call(this);var l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var bn="closure_listenable_"+(1e6*Math.random()|0),z1=0;function U1(l,h,p,_,N){this.listener=l,this.proxy=null,this.src=h,this.type=p,this.capture=!!_,this.ha=N,this.key=++z1,this.da=this.fa=!1}function xa(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function wa(l){this.src=l,this.g={},this.h=0}wa.prototype.add=function(l,h,p,_,N){var L=l.toString();l=this.g[L],l||(l=this.g[L]=[],this.h++);var B=pu(l,h,_,N);return-1<B?(h=l[B],p||(h.fa=!1)):(h=new U1(h,this.src,L,!!_,N),h.fa=p,l.push(h)),h};function fu(l,h){var p=h.type;if(p in l.g){var _=l.g[p],N=Array.prototype.indexOf.call(_,h,void 0),L;(L=0<=N)&&Array.prototype.splice.call(_,N,1),L&&(xa(h),l.g[p].length==0&&(delete l.g[p],l.h--))}}function pu(l,h,p,_){for(var N=0;N<l.length;++N){var L=l[N];if(!L.da&&L.listener==h&&L.capture==!!p&&L.ha==_)return N}return-1}var mu="closure_lm_"+(1e6*Math.random()|0),gu={};function Hp(l,h,p,_,N){if(Array.isArray(h)){for(var L=0;L<h.length;L++)Hp(l,h[L],p,_,N);return null}return p=Gp(p),l&&l[bn]?l.K(h,p,d(_)?!!_.capture:!1,N):B1(l,h,p,!1,_,N)}function B1(l,h,p,_,N,L){if(!h)throw Error("Invalid event type");var B=d(N)?!!N.capture:!!N,ge=vu(l);if(ge||(l[mu]=ge=new wa(l)),p=ge.add(h,p,_,B,L),p.proxy)return p;if(_=W1(),p.proxy=_,_.src=l,_.listener=p,l.addEventListener)wn||(N=B),N===void 0&&(N=!1),l.addEventListener(h.toString(),_,N);else if(l.attachEvent)l.attachEvent(qp(h.toString()),_);else if(l.addListener&&l.removeListener)l.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return p}function W1(){function l(p){return h.call(l.src,l.listener,p)}const h=$1;return l}function Kp(l,h,p,_,N){if(Array.isArray(h))for(var L=0;L<h.length;L++)Kp(l,h[L],p,_,N);else _=d(_)?!!_.capture:!!_,p=Gp(p),l&&l[bn]?(l=l.i,h=String(h).toString(),h in l.g&&(L=l.g[h],p=pu(L,p,_,N),-1<p&&(xa(L[p]),Array.prototype.splice.call(L,p,1),L.length==0&&(delete l.g[h],l.h--)))):l&&(l=vu(l))&&(h=l.g[h.toString()],l=-1,h&&(l=pu(h,p,_,N)),(p=-1<l?h[l]:null)&&yu(p))}function yu(l){if(typeof l!="number"&&l&&!l.da){var h=l.src;if(h&&h[bn])fu(h.i,l);else{var p=l.type,_=l.proxy;h.removeEventListener?h.removeEventListener(p,_,l.capture):h.detachEvent?h.detachEvent(qp(p),_):h.addListener&&h.removeListener&&h.removeListener(_),(p=vu(h))?(fu(p,l),p.h==0&&(p.src=null,h[mu]=null)):xa(l)}}}function qp(l){return l in gu?gu[l]:gu[l]="on"+l}function $1(l,h){if(l.da)l=!0;else{h=new En(h,this);var p=l.listener,_=l.ha||l.src;l.fa&&yu(l),l=p.call(_,h)}return l}function vu(l){return l=l[mu],l instanceof wa?l:null}var _u="__closure_events_fn_"+(1e9*Math.random()>>>0);function Gp(l){return typeof l=="function"?l:(l[_u]||(l[_u]=function(h){return l.handleEvent(h)}),l[_u])}function tt(){te.call(this),this.i=new wa(this),this.M=this,this.F=null}k(tt,te),tt.prototype[bn]=!0,tt.prototype.removeEventListener=function(l,h,p,_){Kp(this,l,h,p,_)};function ht(l,h){var p,_=l.F;if(_)for(p=[];_;_=_.F)p.push(_);if(l=l.M,_=h.type||h,typeof h=="string")h=new Ce(h,l);else if(h instanceof Ce)h.target=h.target||l;else{var N=h;h=new Ce(_,l),I(h,N)}if(N=!0,p)for(var L=p.length-1;0<=L;L--){var B=h.g=p[L];N=Ea(B,_,!0,h)&&N}if(B=h.g=l,N=Ea(B,_,!0,h)&&N,N=Ea(B,_,!1,h)&&N,p)for(L=0;L<p.length;L++)B=h.g=p[L],N=Ea(B,_,!1,h)&&N}tt.prototype.N=function(){if(tt.aa.N.call(this),this.i){var l=this.i,h;for(h in l.g){for(var p=l.g[h],_=0;_<p.length;_++)xa(p[_]);delete l.g[h],l.h--}}this.F=null},tt.prototype.K=function(l,h,p,_){return this.i.add(String(l),h,!1,p,_)},tt.prototype.L=function(l,h,p,_){return this.i.add(String(l),h,!0,p,_)};function Ea(l,h,p,_){if(h=l.i.g[String(h)],!h)return!0;h=h.concat();for(var N=!0,L=0;L<h.length;++L){var B=h[L];if(B&&!B.da&&B.capture==p){var ge=B.listener,qe=B.ha||B.src;B.fa&&fu(l.i,B),N=ge.call(qe,_)!==!1&&N}}return N&&!_.defaultPrevented}function Qp(l,h,p){if(typeof l=="function")p&&(l=g(l,p));else if(l&&typeof l.handleEvent=="function")l=g(l.handleEvent,l);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(l,h||0)}function Yp(l){l.g=Qp(()=>{l.g=null,l.i&&(l.i=!1,Yp(l))},l.l);const h=l.h;l.h=null,l.m.apply(null,h)}class H1 extends te{constructor(h,p){super(),this.m=h,this.l=p,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Yp(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Is(l){te.call(this),this.h=l,this.g={}}k(Is,te);var Xp=[];function Jp(l){V(l.g,function(h,p){this.g.hasOwnProperty(p)&&yu(h)},l),l.g={}}Is.prototype.N=function(){Is.aa.N.call(this),Jp(this)},Is.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var xu=c.JSON.stringify,K1=c.JSON.parse,q1=class{stringify(l){return c.JSON.stringify(l,void 0)}parse(l){return c.JSON.parse(l,void 0)}};function wu(){}wu.prototype.h=null;function Zp(l){return l.h||(l.h=l.i())}function em(){}var ks={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Eu(){Ce.call(this,"d")}k(Eu,Ce);function Su(){Ce.call(this,"c")}k(Su,Ce);var Ur={},tm=null;function Sa(){return tm=tm||new tt}Ur.La="serverreachability";function nm(l){Ce.call(this,Ur.La,l)}k(nm,Ce);function As(l){const h=Sa();ht(h,new nm(h))}Ur.STAT_EVENT="statevent";function rm(l,h){Ce.call(this,Ur.STAT_EVENT,l),this.stat=h}k(rm,Ce);function ft(l){const h=Sa();ht(h,new rm(h,l))}Ur.Ma="timingevent";function im(l,h){Ce.call(this,Ur.Ma,l),this.size=h}k(im,Ce);function Rs(l,h){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){l()},h)}function Cs(){this.g=!0}Cs.prototype.xa=function(){this.g=!1};function G1(l,h,p,_,N,L){l.info(function(){if(l.g)if(L)for(var B="",ge=L.split("&"),qe=0;qe<ge.length;qe++){var ce=ge[qe].split("=");if(1<ce.length){var nt=ce[0];ce=ce[1];var rt=nt.split("_");B=2<=rt.length&&rt[1]=="type"?B+(nt+"="+ce+"&"):B+(nt+"=redacted&")}}else B=null;else B=L;return"XMLHTTP REQ ("+_+") [attempt "+N+"]: "+h+`
`+p+`
`+B})}function Q1(l,h,p,_,N,L,B){l.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+N+"]: "+h+`
`+p+`
`+L+" "+B})}function Ei(l,h,p,_){l.info(function(){return"XMLHTTP TEXT ("+h+"): "+X1(l,p)+(_?" "+_:"")})}function Y1(l,h){l.info(function(){return"TIMEOUT: "+h})}Cs.prototype.info=function(){};function X1(l,h){if(!l.g)return h;if(!h)return null;try{var p=JSON.parse(h);if(p){for(l=0;l<p.length;l++)if(Array.isArray(p[l])){var _=p[l];if(!(2>_.length)){var N=_[1];if(Array.isArray(N)&&!(1>N.length)){var L=N[0];if(L!="noop"&&L!="stop"&&L!="close")for(var B=1;B<N.length;B++)N[B]=""}}}}return xu(p)}catch{return h}}var ba={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},sm={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},bu;function Ta(){}k(Ta,wu),Ta.prototype.g=function(){return new XMLHttpRequest},Ta.prototype.i=function(){return{}},bu=new Ta;function Jn(l,h,p,_){this.j=l,this.i=h,this.l=p,this.R=_||1,this.U=new Is(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new om}function om(){this.i=null,this.g="",this.h=!1}var am={},Tu={};function Iu(l,h,p){l.L=1,l.v=Ra(Tn(h)),l.m=p,l.P=!0,lm(l,null)}function lm(l,h){l.F=Date.now(),Ia(l),l.A=Tn(l.v);var p=l.A,_=l.R;Array.isArray(_)||(_=[String(_)]),Em(p.i,"t",_),l.C=0,p=l.j.J,l.h=new om,l.g=zm(l.j,p?h:null,!l.m),0<l.O&&(l.M=new H1(g(l.Y,l,l.g),l.O)),h=l.U,p=l.g,_=l.ca;var N="readystatechange";Array.isArray(N)||(N&&(Xp[0]=N.toString()),N=Xp);for(var L=0;L<N.length;L++){var B=Hp(p,N[L],_||h.handleEvent,!1,h.h||h);if(!B)break;h.g[B.key]=B}h=l.H?v(l.H):{},l.m?(l.u||(l.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.A,l.u,l.m,h)):(l.u="GET",l.g.ea(l.A,l.u,null,h)),As(),G1(l.i,l.u,l.A,l.l,l.R,l.m)}Jn.prototype.ca=function(l){l=l.target;const h=this.M;h&&In(l)==3?h.j():this.Y(l)},Jn.prototype.Y=function(l){try{if(l==this.g)e:{const rt=In(this.g);var h=this.g.Ba();const Ti=this.g.Z();if(!(3>rt)&&(rt!=3||this.g&&(this.h.h||this.g.oa()||Rm(this.g)))){this.J||rt!=4||h==7||(h==8||0>=Ti?As(3):As(2)),ku(this);var p=this.g.Z();this.X=p;t:if(cm(this)){var _=Rm(this.g);l="";var N=_.length,L=In(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Br(this),Ps(this);var B="";break t}this.h.i=new c.TextDecoder}for(h=0;h<N;h++)this.h.h=!0,l+=this.h.i.decode(_[h],{stream:!(L&&h==N-1)});_.length=0,this.h.g+=l,this.C=0,B=this.h.g}else B=this.g.oa();if(this.o=p==200,Q1(this.i,this.u,this.A,this.l,this.R,rt,p),this.o){if(this.T&&!this.K){t:{if(this.g){var ge,qe=this.g;if((ge=qe.g?qe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!x(ge)){var ce=ge;break t}}ce=null}if(p=ce)Ei(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Au(this,p);else{this.o=!1,this.s=3,ft(12),Br(this),Ps(this);break e}}if(this.P){p=!0;let zt;for(;!this.J&&this.C<B.length;)if(zt=J1(this,B),zt==Tu){rt==4&&(this.s=4,ft(14),p=!1),Ei(this.i,this.l,null,"[Incomplete Response]");break}else if(zt==am){this.s=4,ft(15),Ei(this.i,this.l,B,"[Invalid Chunk]"),p=!1;break}else Ei(this.i,this.l,zt,null),Au(this,zt);if(cm(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),rt!=4||B.length!=0||this.h.h||(this.s=1,ft(16),p=!1),this.o=this.o&&p,!p)Ei(this.i,this.l,B,"[Invalid Chunked Response]"),Br(this),Ps(this);else if(0<B.length&&!this.W){this.W=!0;var nt=this.j;nt.g==this&&nt.ba&&!nt.M&&(nt.j.info("Great, no buffering proxy detected. Bytes received: "+B.length),Du(nt),nt.M=!0,ft(11))}}else Ei(this.i,this.l,B,null),Au(this,B);rt==4&&Br(this),this.o&&!this.J&&(rt==4?Lm(this.j,this):(this.o=!1,Ia(this)))}else mE(this.g),p==400&&0<B.indexOf("Unknown SID")?(this.s=3,ft(12)):(this.s=0,ft(13)),Br(this),Ps(this)}}}catch{}finally{}};function cm(l){return l.g?l.u=="GET"&&l.L!=2&&l.j.Ca:!1}function J1(l,h){var p=l.C,_=h.indexOf(`
`,p);return _==-1?Tu:(p=Number(h.substring(p,_)),isNaN(p)?am:(_+=1,_+p>h.length?Tu:(h=h.slice(_,_+p),l.C=_+p,h)))}Jn.prototype.cancel=function(){this.J=!0,Br(this)};function Ia(l){l.S=Date.now()+l.I,um(l,l.I)}function um(l,h){if(l.B!=null)throw Error("WatchDog timer not null");l.B=Rs(g(l.ba,l),h)}function ku(l){l.B&&(c.clearTimeout(l.B),l.B=null)}Jn.prototype.ba=function(){this.B=null;const l=Date.now();0<=l-this.S?(Y1(this.i,this.A),this.L!=2&&(As(),ft(17)),Br(this),this.s=2,Ps(this)):um(this,this.S-l)};function Ps(l){l.j.G==0||l.J||Lm(l.j,l)}function Br(l){ku(l);var h=l.M;h&&typeof h.ma=="function"&&h.ma(),l.M=null,Jp(l.U),l.g&&(h=l.g,l.g=null,h.abort(),h.ma())}function Au(l,h){try{var p=l.j;if(p.G!=0&&(p.g==l||Ru(p.h,l))){if(!l.K&&Ru(p.h,l)&&p.G==3){try{var _=p.Da.g.parse(h)}catch{_=null}if(Array.isArray(_)&&_.length==3){var N=_;if(N[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<l.F)Oa(p),Na(p);else break e;Nu(p),ft(18)}}else p.za=N[1],0<p.za-p.T&&37500>N[2]&&p.F&&p.v==0&&!p.C&&(p.C=Rs(g(p.Za,p),6e3));if(1>=fm(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else $r(p,11)}else if((l.K||p.g==l)&&Oa(p),!x(h))for(N=p.Da.g.parse(h),h=0;h<N.length;h++){let ce=N[h];if(p.T=ce[0],ce=ce[1],p.G==2)if(ce[0]=="c"){p.K=ce[1],p.ia=ce[2];const nt=ce[3];nt!=null&&(p.la=nt,p.j.info("VER="+p.la));const rt=ce[4];rt!=null&&(p.Aa=rt,p.j.info("SVER="+p.Aa));const Ti=ce[5];Ti!=null&&typeof Ti=="number"&&0<Ti&&(_=1.5*Ti,p.L=_,p.j.info("backChannelRequestTimeoutMs_="+_)),_=p;const zt=l.g;if(zt){const Va=zt.g?zt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Va){var L=_.h;L.g||Va.indexOf("spdy")==-1&&Va.indexOf("quic")==-1&&Va.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(Cu(L,L.h),L.h=null))}if(_.D){const Ou=zt.g?zt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ou&&(_.ya=Ou,ve(_.I,_.D,Ou))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-l.F,p.j.info("Handshake RTT: "+p.R+"ms")),_=p;var B=l;if(_.qa=Fm(_,_.J?_.ia:null,_.W),B.K){pm(_.h,B);var ge=B,qe=_.L;qe&&(ge.I=qe),ge.B&&(ku(ge),Ia(ge)),_.g=B}else Dm(_);0<p.i.length&&Da(p)}else ce[0]!="stop"&&ce[0]!="close"||$r(p,7);else p.G==3&&(ce[0]=="stop"||ce[0]=="close"?ce[0]=="stop"?$r(p,7):ju(p):ce[0]!="noop"&&p.l&&p.l.ta(ce),p.v=0)}}As(4)}catch{}}var Z1=class{constructor(l,h){this.g=l,this.map=h}};function dm(l){this.l=l||10,c.PerformanceNavigationTiming?(l=c.performance.getEntriesByType("navigation"),l=0<l.length&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function hm(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function fm(l){return l.h?1:l.g?l.g.size:0}function Ru(l,h){return l.h?l.h==h:l.g?l.g.has(h):!1}function Cu(l,h){l.g?l.g.add(h):l.h=h}function pm(l,h){l.h&&l.h==h?l.h=null:l.g&&l.g.has(h)&&l.g.delete(h)}dm.prototype.cancel=function(){if(this.i=mm(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function mm(l){if(l.h!=null)return l.i.concat(l.h.D);if(l.g!=null&&l.g.size!==0){let h=l.i;for(const p of l.g.values())h=h.concat(p.D);return h}return P(l.i)}function eE(l){if(l.V&&typeof l.V=="function")return l.V();if(typeof Map<"u"&&l instanceof Map||typeof Set<"u"&&l instanceof Set)return Array.from(l.values());if(typeof l=="string")return l.split("");if(u(l)){for(var h=[],p=l.length,_=0;_<p;_++)h.push(l[_]);return h}h=[],p=0;for(_ in l)h[p++]=l[_];return h}function tE(l){if(l.na&&typeof l.na=="function")return l.na();if(!l.V||typeof l.V!="function"){if(typeof Map<"u"&&l instanceof Map)return Array.from(l.keys());if(!(typeof Set<"u"&&l instanceof Set)){if(u(l)||typeof l=="string"){var h=[];l=l.length;for(var p=0;p<l;p++)h.push(p);return h}h=[],p=0;for(const _ in l)h[p++]=_;return h}}}function gm(l,h){if(l.forEach&&typeof l.forEach=="function")l.forEach(h,void 0);else if(u(l)||typeof l=="string")Array.prototype.forEach.call(l,h,void 0);else for(var p=tE(l),_=eE(l),N=_.length,L=0;L<N;L++)h.call(void 0,_[L],p&&p[L],l)}var ym=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function nE(l,h){if(l){l=l.split("&");for(var p=0;p<l.length;p++){var _=l[p].indexOf("="),N=null;if(0<=_){var L=l[p].substring(0,_);N=l[p].substring(_+1)}else L=l[p];h(L,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function Wr(l){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,l instanceof Wr){this.h=l.h,ka(this,l.j),this.o=l.o,this.g=l.g,Aa(this,l.s),this.l=l.l;var h=l.i,p=new Ds;p.i=h.i,h.g&&(p.g=new Map(h.g),p.h=h.h),vm(this,p),this.m=l.m}else l&&(h=String(l).match(ym))?(this.h=!1,ka(this,h[1]||"",!0),this.o=js(h[2]||""),this.g=js(h[3]||"",!0),Aa(this,h[4]),this.l=js(h[5]||"",!0),vm(this,h[6]||"",!0),this.m=js(h[7]||"")):(this.h=!1,this.i=new Ds(null,this.h))}Wr.prototype.toString=function(){var l=[],h=this.j;h&&l.push(Ns(h,_m,!0),":");var p=this.g;return(p||h=="file")&&(l.push("//"),(h=this.o)&&l.push(Ns(h,_m,!0),"@"),l.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&l.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&l.push("/"),l.push(Ns(p,p.charAt(0)=="/"?sE:iE,!0))),(p=this.i.toString())&&l.push("?",p),(p=this.m)&&l.push("#",Ns(p,aE)),l.join("")};function Tn(l){return new Wr(l)}function ka(l,h,p){l.j=p?js(h,!0):h,l.j&&(l.j=l.j.replace(/:$/,""))}function Aa(l,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);l.s=h}else l.s=null}function vm(l,h,p){h instanceof Ds?(l.i=h,lE(l.i,l.h)):(p||(h=Ns(h,oE)),l.i=new Ds(h,l.h))}function ve(l,h,p){l.i.set(h,p)}function Ra(l){return ve(l,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),l}function js(l,h){return l?h?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function Ns(l,h,p){return typeof l=="string"?(l=encodeURI(l).replace(h,rE),p&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function rE(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var _m=/[#\/\?@]/g,iE=/[#\?:]/g,sE=/[#\?]/g,oE=/[#\?@]/g,aE=/#/g;function Ds(l,h){this.h=this.g=null,this.i=l||null,this.j=!!h}function Zn(l){l.g||(l.g=new Map,l.h=0,l.i&&nE(l.i,function(h,p){l.add(decodeURIComponent(h.replace(/\+/g," ")),p)}))}t=Ds.prototype,t.add=function(l,h){Zn(this),this.i=null,l=Si(this,l);var p=this.g.get(l);return p||this.g.set(l,p=[]),p.push(h),this.h+=1,this};function xm(l,h){Zn(l),h=Si(l,h),l.g.has(h)&&(l.i=null,l.h-=l.g.get(h).length,l.g.delete(h))}function wm(l,h){return Zn(l),h=Si(l,h),l.g.has(h)}t.forEach=function(l,h){Zn(this),this.g.forEach(function(p,_){p.forEach(function(N){l.call(h,N,_,this)},this)},this)},t.na=function(){Zn(this);const l=Array.from(this.g.values()),h=Array.from(this.g.keys()),p=[];for(let _=0;_<h.length;_++){const N=l[_];for(let L=0;L<N.length;L++)p.push(h[_])}return p},t.V=function(l){Zn(this);let h=[];if(typeof l=="string")wm(this,l)&&(h=h.concat(this.g.get(Si(this,l))));else{l=Array.from(this.g.values());for(let p=0;p<l.length;p++)h=h.concat(l[p])}return h},t.set=function(l,h){return Zn(this),this.i=null,l=Si(this,l),wm(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[h]),this.h+=1,this},t.get=function(l,h){return l?(l=this.V(l),0<l.length?String(l[0]):h):h};function Em(l,h,p){xm(l,h),0<p.length&&(l.i=null,l.g.set(Si(l,h),P(p)),l.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],h=Array.from(this.g.keys());for(var p=0;p<h.length;p++){var _=h[p];const L=encodeURIComponent(String(_)),B=this.V(_);for(_=0;_<B.length;_++){var N=L;B[_]!==""&&(N+="="+encodeURIComponent(String(B[_]))),l.push(N)}}return this.i=l.join("&")};function Si(l,h){return h=String(h),l.j&&(h=h.toLowerCase()),h}function lE(l,h){h&&!l.j&&(Zn(l),l.i=null,l.g.forEach(function(p,_){var N=_.toLowerCase();_!=N&&(xm(this,_),Em(this,N,p))},l)),l.j=h}function cE(l,h){const p=new Cs;if(c.Image){const _=new Image;_.onload=b(er,p,"TestLoadImage: loaded",!0,h,_),_.onerror=b(er,p,"TestLoadImage: error",!1,h,_),_.onabort=b(er,p,"TestLoadImage: abort",!1,h,_),_.ontimeout=b(er,p,"TestLoadImage: timeout",!1,h,_),c.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=l}else h(!1)}function uE(l,h){const p=new Cs,_=new AbortController,N=setTimeout(()=>{_.abort(),er(p,"TestPingServer: timeout",!1,h)},1e4);fetch(l,{signal:_.signal}).then(L=>{clearTimeout(N),L.ok?er(p,"TestPingServer: ok",!0,h):er(p,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(N),er(p,"TestPingServer: error",!1,h)})}function er(l,h,p,_,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),_(p)}catch{}}function dE(){this.g=new q1}function hE(l,h,p){const _=p||"";try{gm(l,function(N,L){let B=N;d(N)&&(B=xu(N)),h.push(_+L+"="+encodeURIComponent(B))})}catch(N){throw h.push(_+"type="+encodeURIComponent("_badmap")),N}}function Ca(l){this.l=l.Ub||null,this.j=l.eb||!1}k(Ca,wu),Ca.prototype.g=function(){return new Pa(this.l,this.j)},Ca.prototype.i=function(l){return function(){return l}}({});function Pa(l,h){tt.call(this),this.D=l,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Pa,tt),t=Pa.prototype,t.open=function(l,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=l,this.A=h,this.readyState=1,Ls(this)},t.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};l&&(h.body=l),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Os(this)),this.readyState=0},t.Sa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,Ls(this)),this.g&&(this.readyState=3,Ls(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Sm(this)}else l.text().then(this.Ra.bind(this),this.ga.bind(this))};function Sm(l){l.j.read().then(l.Pa.bind(l)).catch(l.ga.bind(l))}t.Pa=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var h=l.value?l.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!l.done}))&&(this.response=this.responseText+=h)}l.done?Os(this):Ls(this),this.readyState==3&&Sm(this)}},t.Ra=function(l){this.g&&(this.response=this.responseText=l,Os(this))},t.Qa=function(l){this.g&&(this.response=l,Os(this))},t.ga=function(){this.g&&Os(this)};function Os(l){l.readyState=4,l.l=null,l.j=null,l.v=null,Ls(l)}t.setRequestHeader=function(l,h){this.u.append(l,h)},t.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],h=this.h.entries();for(var p=h.next();!p.done;)p=p.value,l.push(p[0]+": "+p[1]),p=h.next();return l.join(`\r
`)};function Ls(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(Pa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function bm(l){let h="";return V(l,function(p,_){h+=_,h+=":",h+=p,h+=`\r
`}),h}function Pu(l,h,p){e:{for(_ in p){var _=!1;break e}_=!0}_||(p=bm(p),typeof l=="string"?p!=null&&encodeURIComponent(String(p)):ve(l,h,p))}function ke(l){tt.call(this),this.headers=new Map,this.o=l||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(ke,tt);var fE=/^https?$/i,pE=["POST","PUT"];t=ke.prototype,t.Ha=function(l){this.J=l},t.ea=function(l,h,p,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);h=h?h.toUpperCase():"GET",this.D=l,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():bu.g(),this.v=this.o?Zp(this.o):Zp(bu),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(l),!0),this.B=!1}catch(L){Tm(this,L);return}if(l=p||"",p=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var N in _)p.set(N,_[N]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const L of _.keys())p.set(L,_.get(L));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(p.keys()).find(L=>L.toLowerCase()=="content-type"),N=c.FormData&&l instanceof c.FormData,!(0<=Array.prototype.indexOf.call(pE,h,void 0))||_||N||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,B]of p)this.g.setRequestHeader(L,B);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Am(this),this.u=!0,this.g.send(l),this.u=!1}catch(L){Tm(this,L)}};function Tm(l,h){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=h,l.m=5,Im(l),ja(l)}function Im(l){l.A||(l.A=!0,ht(l,"complete"),ht(l,"error"))}t.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=l||7,ht(this,"complete"),ht(this,"abort"),ja(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ja(this,!0)),ke.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?km(this):this.bb())},t.bb=function(){km(this)};function km(l){if(l.h&&typeof o<"u"&&(!l.v[1]||In(l)!=4||l.Z()!=2)){if(l.u&&In(l)==4)Qp(l.Ea,0,l);else if(ht(l,"readystatechange"),In(l)==4){l.h=!1;try{const B=l.Z();e:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var p;if(!(p=h)){var _;if(_=B===0){var N=String(l.D).match(ym)[1]||null;!N&&c.self&&c.self.location&&(N=c.self.location.protocol.slice(0,-1)),_=!fE.test(N?N.toLowerCase():"")}p=_}if(p)ht(l,"complete"),ht(l,"success");else{l.m=6;try{var L=2<In(l)?l.g.statusText:""}catch{L=""}l.l=L+" ["+l.Z()+"]",Im(l)}}finally{ja(l)}}}}function ja(l,h){if(l.g){Am(l);const p=l.g,_=l.v[0]?()=>{}:null;l.g=null,l.v=null,h||ht(l,"ready");try{p.onreadystatechange=_}catch{}}}function Am(l){l.I&&(c.clearTimeout(l.I),l.I=null)}t.isActive=function(){return!!this.g};function In(l){return l.g?l.g.readyState:0}t.Z=function(){try{return 2<In(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(l){if(this.g){var h=this.g.responseText;return l&&h.indexOf(l)==0&&(h=h.substring(l.length)),K1(h)}};function Rm(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.H){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function mE(l){const h={};l=(l.g&&2<=In(l)&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<l.length;_++){if(x(l[_]))continue;var p=A(l[_]);const N=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const L=h[N]||[];h[N]=L,L.push(p)}E(h,function(_){return _.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Vs(l,h,p){return p&&p.internalChannelParams&&p.internalChannelParams[l]||h}function Cm(l){this.Aa=0,this.i=[],this.j=new Cs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Vs("failFast",!1,l),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Vs("baseRetryDelayMs",5e3,l),this.cb=Vs("retryDelaySeedMs",1e4,l),this.Wa=Vs("forwardChannelMaxRetries",2,l),this.wa=Vs("forwardChannelRequestTimeoutMs",2e4,l),this.pa=l&&l.xmlHttpFactory||void 0,this.Xa=l&&l.Tb||void 0,this.Ca=l&&l.useFetchStreams||!1,this.L=void 0,this.J=l&&l.supportsCrossDomainXhr||!1,this.K="",this.h=new dm(l&&l.concurrentRequestLimit),this.Da=new dE,this.P=l&&l.fastHandshake||!1,this.O=l&&l.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=l&&l.Rb||!1,l&&l.xa&&this.j.xa(),l&&l.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&l&&l.detectBufferingProxy||!1,this.ja=void 0,l&&l.longPollingTimeout&&0<l.longPollingTimeout&&(this.ja=l.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Cm.prototype,t.la=8,t.G=1,t.connect=function(l,h,p,_){ft(0),this.W=l,this.H=h||{},p&&_!==void 0&&(this.H.OSID=p,this.H.OAID=_),this.F=this.X,this.I=Fm(this,null,this.W),Da(this)};function ju(l){if(Pm(l),l.G==3){var h=l.U++,p=Tn(l.I);if(ve(p,"SID",l.K),ve(p,"RID",h),ve(p,"TYPE","terminate"),Ms(l,p),h=new Jn(l,l.j,h),h.L=2,h.v=Ra(Tn(p)),p=!1,c.navigator&&c.navigator.sendBeacon)try{p=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!p&&c.Image&&(new Image().src=h.v,p=!0),p||(h.g=zm(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Ia(h)}Mm(l)}function Na(l){l.g&&(Du(l),l.g.cancel(),l.g=null)}function Pm(l){Na(l),l.u&&(c.clearTimeout(l.u),l.u=null),Oa(l),l.h.cancel(),l.s&&(typeof l.s=="number"&&c.clearTimeout(l.s),l.s=null)}function Da(l){if(!hm(l.h)&&!l.s){l.s=!0;var h=l.Ga;de||Q(),z||(de(),z=!0),W.add(h,l),l.B=0}}function gE(l,h){return fm(l.h)>=l.h.j-(l.s?1:0)?!1:l.s?(l.i=h.D.concat(l.i),!0):l.G==1||l.G==2||l.B>=(l.Va?0:l.Wa)?!1:(l.s=Rs(g(l.Ga,l,h),Vm(l,l.B)),l.B++,!0)}t.Ga=function(l){if(this.s)if(this.s=null,this.G==1){if(!l){this.U=Math.floor(1e5*Math.random()),l=this.U++;const N=new Jn(this,this.j,l);let L=this.o;if(this.S&&(L?(L=v(L),I(L,this.S)):L=this.S),this.m!==null||this.O||(N.H=L,L=null),this.P)e:{for(var h=0,p=0;p<this.i.length;p++){t:{var _=this.i[p];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(h+=_,4096<h){h=p;break e}if(h===4096||p===this.i.length-1){h=p+1;break e}}h=1e3}else h=1e3;h=Nm(this,N,h),p=Tn(this.I),ve(p,"RID",l),ve(p,"CVER",22),this.D&&ve(p,"X-HTTP-Session-Id",this.D),Ms(this,p),L&&(this.O?h="headers="+encodeURIComponent(String(bm(L)))+"&"+h:this.m&&Pu(p,this.m,L)),Cu(this.h,N),this.Ua&&ve(p,"TYPE","init"),this.P?(ve(p,"$req",h),ve(p,"SID","null"),N.T=!0,Iu(N,p,null)):Iu(N,p,h),this.G=2}}else this.G==3&&(l?jm(this,l):this.i.length==0||hm(this.h)||jm(this))};function jm(l,h){var p;h?p=h.l:p=l.U++;const _=Tn(l.I);ve(_,"SID",l.K),ve(_,"RID",p),ve(_,"AID",l.T),Ms(l,_),l.m&&l.o&&Pu(_,l.m,l.o),p=new Jn(l,l.j,p,l.B+1),l.m===null&&(p.H=l.o),h&&(l.i=h.D.concat(l.i)),h=Nm(l,p,1e3),p.I=Math.round(.5*l.wa)+Math.round(.5*l.wa*Math.random()),Cu(l.h,p),Iu(p,_,h)}function Ms(l,h){l.H&&V(l.H,function(p,_){ve(h,_,p)}),l.l&&gm({},function(p,_){ve(h,_,p)})}function Nm(l,h,p){p=Math.min(l.i.length,p);var _=l.l?g(l.l.Na,l.l,l):null;e:{var N=l.i;let L=-1;for(;;){const B=["count="+p];L==-1?0<p?(L=N[0].g,B.push("ofs="+L)):L=0:B.push("ofs="+L);let ge=!0;for(let qe=0;qe<p;qe++){let ce=N[qe].g;const nt=N[qe].map;if(ce-=L,0>ce)L=Math.max(0,N[qe].g-100),ge=!1;else try{hE(nt,B,"req"+ce+"_")}catch{_&&_(nt)}}if(ge){_=B.join("&");break e}}}return l=l.i.splice(0,p),h.D=l,_}function Dm(l){if(!l.g&&!l.u){l.Y=1;var h=l.Fa;de||Q(),z||(de(),z=!0),W.add(h,l),l.v=0}}function Nu(l){return l.g||l.u||3<=l.v?!1:(l.Y++,l.u=Rs(g(l.Fa,l),Vm(l,l.v)),l.v++,!0)}t.Fa=function(){if(this.u=null,Om(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var l=2*this.R;this.j.info("BP detection timer enabled: "+l),this.A=Rs(g(this.ab,this),l)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ft(10),Na(this),Om(this))};function Du(l){l.A!=null&&(c.clearTimeout(l.A),l.A=null)}function Om(l){l.g=new Jn(l,l.j,"rpc",l.Y),l.m===null&&(l.g.H=l.o),l.g.O=0;var h=Tn(l.qa);ve(h,"RID","rpc"),ve(h,"SID",l.K),ve(h,"AID",l.T),ve(h,"CI",l.F?"0":"1"),!l.F&&l.ja&&ve(h,"TO",l.ja),ve(h,"TYPE","xmlhttp"),Ms(l,h),l.m&&l.o&&Pu(h,l.m,l.o),l.L&&(l.g.I=l.L);var p=l.g;l=l.ia,p.L=1,p.v=Ra(Tn(h)),p.m=null,p.P=!0,lm(p,l)}t.Za=function(){this.C!=null&&(this.C=null,Na(this),Nu(this),ft(19))};function Oa(l){l.C!=null&&(c.clearTimeout(l.C),l.C=null)}function Lm(l,h){var p=null;if(l.g==h){Oa(l),Du(l),l.g=null;var _=2}else if(Ru(l.h,h))p=h.D,pm(l.h,h),_=1;else return;if(l.G!=0){if(h.o)if(_==1){p=h.m?h.m.length:0,h=Date.now()-h.F;var N=l.B;_=Sa(),ht(_,new im(_,p)),Da(l)}else Dm(l);else if(N=h.s,N==3||N==0&&0<h.X||!(_==1&&gE(l,h)||_==2&&Nu(l)))switch(p&&0<p.length&&(h=l.h,h.i=h.i.concat(p)),N){case 1:$r(l,5);break;case 4:$r(l,10);break;case 3:$r(l,6);break;default:$r(l,2)}}}function Vm(l,h){let p=l.Ta+Math.floor(Math.random()*l.cb);return l.isActive()||(p*=2),p*h}function $r(l,h){if(l.j.info("Error code "+h),h==2){var p=g(l.fb,l),_=l.Xa;const N=!_;_=new Wr(_||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||ka(_,"https"),Ra(_),N?cE(_.toString(),p):uE(_.toString(),p)}else ft(2);l.G=0,l.l&&l.l.sa(h),Mm(l),Pm(l)}t.fb=function(l){l?(this.j.info("Successfully pinged google.com"),ft(2)):(this.j.info("Failed to ping google.com"),ft(1))};function Mm(l){if(l.G=0,l.ka=[],l.l){const h=mm(l.h);(h.length!=0||l.i.length!=0)&&(j(l.ka,h),j(l.ka,l.i),l.h.i.length=0,P(l.i),l.i.length=0),l.l.ra()}}function Fm(l,h,p){var _=p instanceof Wr?Tn(p):new Wr(p);if(_.g!="")h&&(_.g=h+"."+_.g),Aa(_,_.s);else{var N=c.location;_=N.protocol,h=h?h+"."+N.hostname:N.hostname,N=+N.port;var L=new Wr(null);_&&ka(L,_),h&&(L.g=h),N&&Aa(L,N),p&&(L.l=p),_=L}return p=l.D,h=l.ya,p&&h&&ve(_,p,h),ve(_,"VER",l.la),Ms(l,_),_}function zm(l,h,p){if(h&&!l.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=l.Ca&&!l.pa?new ke(new Ca({eb:p})):new ke(l.pa),h.Ha(l.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Um(){}t=Um.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function La(){}La.prototype.g=function(l,h){return new bt(l,h)};function bt(l,h){tt.call(this),this.g=new Cm(h),this.l=l,this.h=h&&h.messageUrlParams||null,l=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(l?l["X-WebChannel-Content-Type"]=h.messageContentType:l={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(l?l["X-WebChannel-Client-Profile"]=h.va:l={"X-WebChannel-Client-Profile":h.va}),this.g.S=l,(l=h&&h.Sb)&&!x(l)&&(this.g.m=l),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!x(h)&&(this.g.D=h,l=this.h,l!==null&&h in l&&(l=this.h,h in l&&delete l[h])),this.j=new bi(this)}k(bt,tt),bt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},bt.prototype.close=function(){ju(this.g)},bt.prototype.o=function(l){var h=this.g;if(typeof l=="string"){var p={};p.__data__=l,l=p}else this.u&&(p={},p.__data__=xu(l),l=p);h.i.push(new Z1(h.Ya++,l)),h.G==3&&Da(h)},bt.prototype.N=function(){this.g.l=null,delete this.j,ju(this.g),delete this.g,bt.aa.N.call(this)};function Bm(l){Eu.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var h=l.__sm__;if(h){e:{for(const p in h){l=p;break e}l=void 0}(this.i=l)&&(l=this.i,h=h!==null&&l in h?h[l]:void 0),this.data=h}else this.data=l}k(Bm,Eu);function Wm(){Su.call(this),this.status=1}k(Wm,Su);function bi(l){this.g=l}k(bi,Um),bi.prototype.ua=function(){ht(this.g,"a")},bi.prototype.ta=function(l){ht(this.g,new Bm(l))},bi.prototype.sa=function(l){ht(this.g,new Wm)},bi.prototype.ra=function(){ht(this.g,"b")},La.prototype.createWebChannel=La.prototype.g,bt.prototype.send=bt.prototype.o,bt.prototype.open=bt.prototype.m,bt.prototype.close=bt.prototype.close,aw=function(){return new La},ow=function(){return Sa()},sw=Ur,Ah={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ba.NO_ERROR=0,ba.TIMEOUT=8,ba.HTTP_ERROR=6,Rl=ba,sm.COMPLETE="complete",iw=sm,em.EventType=ks,ks.OPEN="a",ks.CLOSE="b",ks.ERROR="c",ks.MESSAGE="d",tt.prototype.listen=tt.prototype.K,io=em,ke.prototype.listenOnce=ke.prototype.L,ke.prototype.getLastError=ke.prototype.Ka,ke.prototype.getLastErrorCode=ke.prototype.Ba,ke.prototype.getStatus=ke.prototype.Z,ke.prototype.getResponseJson=ke.prototype.Oa,ke.prototype.getResponseText=ke.prototype.oa,ke.prototype.send=ke.prototype.ea,ke.prototype.setWithCredentials=ke.prototype.Ha,rw=ke}).apply(typeof nl<"u"?nl:typeof self<"u"?self:typeof window<"u"?window:{});const Fy="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}at.UNAUTHENTICATED=new at(null),at.GOOGLE_CREDENTIALS=new at("google-credentials-uid"),at.FIRST_PARTY=new at("first-party-uid"),at.MOCK_USER=new at("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ws="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di=new Hf("@firebase/firestore");function qs(){return di.logLevel}function K(t,...e){if(di.logLevel<=se.DEBUG){const n=e.map(sp);di.debug(`Firestore (${ws}): ${t}`,...n)}}function Hn(t,...e){if(di.logLevel<=se.ERROR){const n=e.map(sp);di.error(`Firestore (${ws}): ${t}`,...n)}}function ls(t,...e){if(di.logLevel<=se.WARN){const n=e.map(sp);di.warn(`Firestore (${ws}): ${t}`,...n)}}function sp(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(t="Unexpected state"){const e=`FIRESTORE (${ws}) INTERNAL ASSERTION FAILED: `+t;throw Hn(e),new Error(e)}function fe(t,e){t||J()}function ee(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class $ extends vn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class HA{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(at.UNAUTHENTICATED))}shutdown(){}}class KA{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class qA{constructor(e){this.t=e,this.currentUser=at.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){fe(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new Mn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Mn,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Mn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(fe(typeof r.accessToken=="string"),new lw(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return fe(e===null||typeof e=="string"),new at(e)}}class GA{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=at.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class QA{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new GA(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(at.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class YA{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class XA{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){fe(this.o===void 0);const r=s=>{s.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,K("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(fe(typeof n.token=="string"),this.R=n.token,new YA(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JA(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cw{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=JA(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function ue(t,e){return t<e?-1:t>e?1:0}function cs(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new $(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new $(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new $(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new $(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ze.fromMillis(Date.now())}static fromDate(e){return ze.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new ze(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Z(e)}static min(){return new Z(new ze(0,0))}static max(){return new Z(new ze(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,n,r){n===void 0?n=0:n>e.length&&J(),r===void 0?r=e.length-n:r>e.length-n&&J(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Ho.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ho?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),o=n.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class xe extends Ho{construct(e,n,r){return new xe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new $(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new xe(n)}static emptyPath(){return new xe([])}}const ZA=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ye extends Ho{construct(e,n,r){return new Ye(e,n,r)}static isValidIdentifier(e){return ZA.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ye.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ye(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new $(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new $(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new $(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new $(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ye(n)}static emptyPath(){return new Ye([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(xe.fromString(e))}static fromName(e){return new G(xe.fromString(e).popFirst(5))}static empty(){return new G(xe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&xe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return xe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new xe(e.slice()))}}function eR(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=Z.fromTimestamp(r===1e9?new ze(n+1,0):new ze(n,r));return new Pr(i,G.empty(),e)}function tR(t){return new Pr(t.readTime,t.key,-1)}class Pr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Pr(Z.min(),G.empty(),-1)}static max(){return new Pr(Z.max(),G.empty(),-1)}}function nR(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=G.comparator(t.documentKey,e.documentKey),n!==0?n:ue(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rR="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class iR{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fa(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==rR)throw t;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&J(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new F((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof F?n:F.resolve(n)}catch(n){return F.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):F.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):F.reject(n)}static resolve(e){return new F((n,r)=>{n(e)})}static reject(e){return new F((n,r)=>{r(e)})}static waitFor(e){return new F((n,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=F.resolve(!1);for(const r of e)n=n.next(i=>i?F.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new F((r,i)=>{const s=e.length,o=new Array(s);let c=0;for(let u=0;u<s;u++){const d=u;n(e[d]).next(f=>{o[d]=f,++c,c===s&&r(o)},f=>i(f))}})}static doWhile(e,n){return new F((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function sR(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function pa(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}op.oe=-1;function Gc(t){return t==null}function mc(t){return t===0&&1/t==-1/0}function oR(t){return typeof t=="number"&&Number.isInteger(t)&&!mc(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Es(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function uw(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e,n){this.comparator=e,this.root=n||Qe.EMPTY}insert(e,n){return new Ie(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Qe.BLACK,null,null))}remove(e){return new Ie(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qe.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new rl(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new rl(this.root,e,this.comparator,!1)}getReverseIterator(){return new rl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new rl(this.root,e,this.comparator,!0)}}class rl{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Qe{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Qe.RED,this.left=i??Qe.EMPTY,this.right=s??Qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Qe(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Qe.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw J();const e=this.left.check();if(e!==this.right.check())throw J();return e+(this.isRed()?0:1)}}Qe.EMPTY=null,Qe.RED=!0,Qe.BLACK=!1;Qe.EMPTY=new class{constructor(){this.size=0}get key(){throw J()}get value(){throw J()}get color(){throw J()}get left(){throw J()}get right(){throw J()}copy(e,n,r,i,s){return this}insert(e,n,r){return new Qe(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.comparator=e,this.data=new Ie(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Uy(this.data.getIterator())}getIteratorFrom(e){return new Uy(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Je)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Je(this.comparator);return n.data=e,n}}class Uy{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e){this.fields=e,e.sort(Ye.comparator)}static empty(){return new Gt([])}unionWith(e){let n=new Je(Ye.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Gt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return cs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dw extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new dw("Invalid base64 string: "+s):s}}(e);return new et(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new et(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}et.EMPTY_BYTE_STRING=new et("");const aR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function jr(t){if(fe(!!t),typeof t=="string"){let e=0;const n=aR.exec(t);if(fe(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Pe(t.seconds),nanos:Pe(t.nanos)}}function Pe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function hi(t){return typeof t=="string"?et.fromBase64String(t):et.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function lp(t){const e=t.mapValue.fields.__previous_value__;return ap(e)?lp(e):e}function Ko(t){const e=jr(t.mapValue.fields.__local_write_time__.timestampValue);return new ze(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lR{constructor(e,n,r,i,s,o,c,u,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}}class qo{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new qo("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof qo&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il={mapValue:{}};function fi(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?ap(t)?4:uR(t)?9007199254740991:cR(t)?10:11:J()}function gn(t,e){if(t===e)return!0;const n=fi(t);if(n!==fi(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ko(t).isEqual(Ko(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=jr(i.timestampValue),c=jr(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return hi(i.bytesValue).isEqual(hi(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return Pe(i.geoPointValue.latitude)===Pe(s.geoPointValue.latitude)&&Pe(i.geoPointValue.longitude)===Pe(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Pe(i.integerValue)===Pe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Pe(i.doubleValue),c=Pe(s.doubleValue);return o===c?mc(o)===mc(c):isNaN(o)&&isNaN(c)}return!1}(t,e);case 9:return cs(t.arrayValue.values||[],e.arrayValue.values||[],gn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(zy(o)!==zy(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!gn(o[u],c[u])))return!1;return!0}(t,e);default:return J()}}function Go(t,e){return(t.values||[]).find(n=>gn(n,e))!==void 0}function us(t,e){if(t===e)return 0;const n=fi(t),r=fi(e);if(n!==r)return ue(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ue(t.booleanValue,e.booleanValue);case 2:return function(s,o){const c=Pe(s.integerValue||s.doubleValue),u=Pe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(t,e);case 3:return By(t.timestampValue,e.timestampValue);case 4:return By(Ko(t),Ko(e));case 5:return ue(t.stringValue,e.stringValue);case 6:return function(s,o){const c=hi(s),u=hi(o);return c.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),u=o.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=ue(c[d],u[d]);if(f!==0)return f}return ue(c.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const c=ue(Pe(s.latitude),Pe(o.latitude));return c!==0?c:ue(Pe(s.longitude),Pe(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Wy(t.arrayValue,e.arrayValue);case 10:return function(s,o){var c,u,d,f;const m=s.fields||{},g=o.fields||{},b=(c=m.value)===null||c===void 0?void 0:c.arrayValue,k=(u=g.value)===null||u===void 0?void 0:u.arrayValue,P=ue(((d=b==null?void 0:b.values)===null||d===void 0?void 0:d.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return P!==0?P:Wy(b,k)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===il.mapValue&&o===il.mapValue)return 0;if(s===il.mapValue)return 1;if(o===il.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),d=o.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const g=ue(u[m],f[m]);if(g!==0)return g;const b=us(c[u[m]],d[f[m]]);if(b!==0)return b}return ue(u.length,f.length)}(t.mapValue,e.mapValue);default:throw J()}}function By(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ue(t,e);const n=jr(t),r=jr(e),i=ue(n.seconds,r.seconds);return i!==0?i:ue(n.nanos,r.nanos)}function Wy(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=us(n[i],r[i]);if(s)return s}return ue(n.length,r.length)}function ds(t){return Rh(t)}function Rh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=jr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return hi(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return G.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=Rh(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Rh(n.fields[o])}`;return i+"}"}(t.mapValue):J()}function $y(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Ch(t){return!!t&&"integerValue"in t}function cp(t){return!!t&&"arrayValue"in t}function Hy(t){return!!t&&"nullValue"in t}function Ky(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Cl(t){return!!t&&"mapValue"in t}function cR(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function _o(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Es(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=_o(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=_o(t.arrayValue.values[n]);return e}return Object.assign({},t)}function uR(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this.value=e}static empty(){return new Dt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Cl(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=_o(n)}setAll(e){let n=Ye.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!n.isImmediateParentOf(c)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=c.popLast()}o?r[c.lastSegment()]=_o(o):i.push(c.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Cl(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return gn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Cl(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Es(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Dt(_o(this.value))}}function hw(t){const e=[];return Es(t.fields,(n,r)=>{const i=new Ye([n]);if(Cl(r)){const s=hw(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Gt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,n,r,i,s,o,c){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new ct(e,0,Z.min(),Z.min(),Z.min(),Dt.empty(),0)}static newFoundDocument(e,n,r,i){return new ct(e,1,n,Z.min(),r,i,0)}static newNoDocument(e,n){return new ct(e,2,n,Z.min(),Z.min(),Dt.empty(),0)}static newUnknownDocument(e,n){return new ct(e,3,n,Z.min(),Z.min(),Dt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Dt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Dt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ct&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ct(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(e,n){this.position=e,this.inclusive=n}}function qy(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),n.key):r=us(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Gy(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!gn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e,n="asc"){this.field=e,this.dir=n}}function dR(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{}class Ve extends fw{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new fR(e,n,r):n==="array-contains"?new gR(e,r):n==="in"?new yR(e,r):n==="not-in"?new vR(e,r):n==="array-contains-any"?new _R(e,r):new Ve(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new pR(e,r):new mR(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(us(n,this.value)):n!==null&&fi(this.value)===fi(n)&&this.matchesComparison(us(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return J()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tn extends fw{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new tn(e,n)}matches(e){return pw(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function pw(t){return t.op==="and"}function mw(t){return hR(t)&&pw(t)}function hR(t){for(const e of t.filters)if(e instanceof tn)return!1;return!0}function Ph(t){if(t instanceof Ve)return t.field.canonicalString()+t.op.toString()+ds(t.value);if(mw(t))return t.filters.map(e=>Ph(e)).join(",");{const e=t.filters.map(n=>Ph(n)).join(",");return`${t.op}(${e})`}}function gw(t,e){return t instanceof Ve?function(r,i){return i instanceof Ve&&r.op===i.op&&r.field.isEqual(i.field)&&gn(r.value,i.value)}(t,e):t instanceof tn?function(r,i){return i instanceof tn&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&gw(o,i.filters[c]),!0):!1}(t,e):void J()}function yw(t){return t instanceof Ve?function(n){return`${n.field.canonicalString()} ${n.op} ${ds(n.value)}`}(t):t instanceof tn?function(n){return n.op.toString()+" {"+n.getFilters().map(yw).join(" ,")+"}"}(t):"Filter"}class fR extends Ve{constructor(e,n,r){super(e,n,r),this.key=G.fromName(r.referenceValue)}matches(e){const n=G.comparator(e.key,this.key);return this.matchesComparison(n)}}class pR extends Ve{constructor(e,n){super(e,"in",n),this.keys=vw("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class mR extends Ve{constructor(e,n){super(e,"not-in",n),this.keys=vw("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function vw(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>G.fromName(r.referenceValue))}class gR extends Ve{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return cp(n)&&Go(n.arrayValue,this.value)}}class yR extends Ve{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Go(this.value.arrayValue,n)}}class vR extends Ve{constructor(e,n){super(e,"not-in",n)}matches(e){if(Go(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Go(this.value.arrayValue,n)}}class _R extends Ve{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!cp(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Go(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xR{constructor(e,n=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.ue=null}}function Qy(t,e=null,n=[],r=[],i=null,s=null,o=null){return new xR(t,e,n,r,i,s,o)}function up(t){const e=ee(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Ph(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Gc(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ds(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ds(r)).join(",")),e.ue=n}return e.ue}function dp(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!dR(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!gw(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Gy(t.startAt,e.startAt)&&Gy(t.endAt,e.endAt)}function jh(t){return G.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e,n=null,r=[],i=[],s=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function wR(t,e,n,r,i,s,o,c){return new Ss(t,e,n,r,i,s,o,c)}function Qc(t){return new Ss(t)}function Yy(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function _w(t){return t.collectionGroup!==null}function xo(t){const e=ee(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Je(Ye.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Qo(s,r))}),n.has(Ye.keyField().canonicalString())||e.ce.push(new Qo(Ye.keyField(),r))}return e.ce}function fn(t){const e=ee(t);return e.le||(e.le=ER(e,xo(t))),e.le}function ER(t,e){if(t.limitType==="F")return Qy(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Qo(i.field,s)});const n=t.endAt?new gc(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new gc(t.startAt.position,t.startAt.inclusive):null;return Qy(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Nh(t,e){const n=t.filters.concat([e]);return new Ss(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Dh(t,e,n){return new Ss(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Yc(t,e){return dp(fn(t),fn(e))&&t.limitType===e.limitType}function xw(t){return`${up(fn(t))}|lt:${t.limitType}`}function Ri(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>yw(i)).join(", ")}]`),Gc(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>ds(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>ds(i)).join(",")),`Target(${r})`}(fn(t))}; limitType=${t.limitType})`}function Xc(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):G.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of xo(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,c,u){const d=qy(o,c,u);return o.inclusive?d<=0:d<0}(r.startAt,xo(r),i)||r.endAt&&!function(o,c,u){const d=qy(o,c,u);return o.inclusive?d>=0:d>0}(r.endAt,xo(r),i))}(t,e)}function SR(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function ww(t){return(e,n)=>{let r=!1;for(const i of xo(t)){const s=bR(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function bR(t,e,n){const r=t.field.isKeyField()?G.comparator(e.key,n.key):function(s,o,c){const u=o.data.field(s),d=c.data.field(s);return u!==null&&d!==null?us(u,d):J()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return J()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Es(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return uw(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TR=new Ie(G.comparator);function Kn(){return TR}const Ew=new Ie(G.comparator);function so(...t){let e=Ew;for(const n of t)e=e.insert(n.key,n);return e}function Sw(t){let e=Ew;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Zr(){return wo()}function bw(){return wo()}function wo(){return new bs(t=>t.toString(),(t,e)=>t.isEqual(e))}const IR=new Ie(G.comparator),kR=new Je(G.comparator);function ie(...t){let e=kR;for(const n of t)e=e.add(n);return e}const AR=new Je(ue);function RR(){return AR}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hp(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:mc(e)?"-0":e}}function Tw(t){return{integerValue:""+t}}function CR(t,e){return oR(e)?Tw(e):hp(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(){this._=void 0}}function PR(t,e,n){return t instanceof Yo?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ap(s)&&(s=lp(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(n,e):t instanceof Xo?kw(t,e):t instanceof Jo?Aw(t,e):function(i,s){const o=Iw(i,s),c=Xy(o)+Xy(i.Pe);return Ch(o)&&Ch(i.Pe)?Tw(c):hp(i.serializer,c)}(t,e)}function jR(t,e,n){return t instanceof Xo?kw(t,e):t instanceof Jo?Aw(t,e):n}function Iw(t,e){return t instanceof yc?function(r){return Ch(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Yo extends Jc{}class Xo extends Jc{constructor(e){super(),this.elements=e}}function kw(t,e){const n=Rw(e);for(const r of t.elements)n.some(i=>gn(i,r))||n.push(r);return{arrayValue:{values:n}}}class Jo extends Jc{constructor(e){super(),this.elements=e}}function Aw(t,e){let n=Rw(e);for(const r of t.elements)n=n.filter(i=>!gn(i,r));return{arrayValue:{values:n}}}class yc extends Jc{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function Xy(t){return Pe(t.integerValue||t.doubleValue)}function Rw(t){return cp(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NR{constructor(e,n){this.field=e,this.transform=n}}function DR(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof Xo&&i instanceof Xo||r instanceof Jo&&i instanceof Jo?cs(r.elements,i.elements,gn):r instanceof yc&&i instanceof yc?gn(r.Pe,i.Pe):r instanceof Yo&&i instanceof Yo}(t.transform,e.transform)}class OR{constructor(e,n){this.version=e,this.transformResults=n}}class pn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new pn}static exists(e){return new pn(void 0,e)}static updateTime(e){return new pn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Pl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Zc{}function Cw(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new jw(t.key,pn.none()):new ma(t.key,t.data,pn.none());{const n=t.data,r=Dt.empty();let i=new Je(Ye.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new _i(t.key,r,new Gt(i.toArray()),pn.none())}}function LR(t,e,n){t instanceof ma?function(i,s,o){const c=i.value.clone(),u=Zy(i.fieldTransforms,s,o.transformResults);c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):t instanceof _i?function(i,s,o){if(!Pl(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=Zy(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(Pw(i)),u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Eo(t,e,n,r){return t instanceof ma?function(s,o,c,u){if(!Pl(s.precondition,o))return c;const d=s.value.clone(),f=ev(s.fieldTransforms,u,o);return d.setAll(f),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(t,e,n,r):t instanceof _i?function(s,o,c,u){if(!Pl(s.precondition,o))return c;const d=ev(s.fieldTransforms,u,o),f=o.data;return f.setAll(Pw(s)),f.setAll(d),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(s,o,c){return Pl(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(t,e,n)}function VR(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=Iw(r.transform,i||null);s!=null&&(n===null&&(n=Dt.empty()),n.set(r.field,s))}return n||null}function Jy(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&cs(r,i,(s,o)=>DR(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class ma extends Zc{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class _i extends Zc{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Pw(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Zy(t,e,n){const r=new Map;fe(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,jR(o,c,n[i]))}return r}function ev(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,PR(s,o,e))}return r}class jw extends Zc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class MR extends Zc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FR{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&LR(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Eo(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Eo(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=bw();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=n.has(i.key)?null:c;const u=Cw(o,c);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(Z.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ie())}isEqual(e){return this.batchId===e.batchId&&cs(this.mutations,e.mutations,(n,r)=>Jy(n,r))&&cs(this.baseMutations,e.baseMutations,(n,r)=>Jy(n,r))}}class fp{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){fe(e.mutations.length===r.length);let i=function(){return IR}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new fp(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zR{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UR{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De,ae;function BR(t){switch(t){default:return J();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function Nw(t){if(t===void 0)return Hn("GRPC error has no .code"),M.UNKNOWN;switch(t){case De.OK:return M.OK;case De.CANCELLED:return M.CANCELLED;case De.UNKNOWN:return M.UNKNOWN;case De.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case De.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case De.INTERNAL:return M.INTERNAL;case De.UNAVAILABLE:return M.UNAVAILABLE;case De.UNAUTHENTICATED:return M.UNAUTHENTICATED;case De.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case De.NOT_FOUND:return M.NOT_FOUND;case De.ALREADY_EXISTS:return M.ALREADY_EXISTS;case De.PERMISSION_DENIED:return M.PERMISSION_DENIED;case De.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case De.ABORTED:return M.ABORTED;case De.OUT_OF_RANGE:return M.OUT_OF_RANGE;case De.UNIMPLEMENTED:return M.UNIMPLEMENTED;case De.DATA_LOSS:return M.DATA_LOSS;default:return J()}}(ae=De||(De={}))[ae.OK=0]="OK",ae[ae.CANCELLED=1]="CANCELLED",ae[ae.UNKNOWN=2]="UNKNOWN",ae[ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ae[ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ae[ae.NOT_FOUND=5]="NOT_FOUND",ae[ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",ae[ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",ae[ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",ae[ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ae[ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ae[ae.ABORTED=10]="ABORTED",ae[ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",ae[ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",ae[ae.INTERNAL=13]="INTERNAL",ae[ae.UNAVAILABLE=14]="UNAVAILABLE",ae[ae.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WR(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $R=new ni([4294967295,4294967295],0);function tv(t){const e=WR().encode(t),n=new nw;return n.update(e),new Uint8Array(n.digest())}function nv(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new ni([n,r],0),new ni([i,s],0)]}class pp{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new oo(`Invalid padding: ${n}`);if(r<0)throw new oo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new oo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new oo(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=ni.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(ni.fromNumber(r)));return i.compare($R)===1&&(i=new ni([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=tv(e),[r,i]=nv(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new pp(s,i,n);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ie===0)return;const n=tv(e),[r,i]=nv(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class oo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,ga.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new eu(Z.min(),i,new Ie(ue),Kn(),ie())}}class ga{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new ga(r,n,ie(),ie(),ie())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class Dw{constructor(e,n){this.targetId=e,this.me=n}}class Ow{constructor(e,n,r=et.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class rv{constructor(){this.fe=0,this.ge=sv(),this.pe=et.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ie(),n=ie(),r=ie();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:J()}}),new ga(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=sv()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,fe(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class HR{constructor(e){this.Le=e,this.Be=new Map,this.ke=Kn(),this.qe=iv(),this.Qe=new Ie(ue)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:J()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(jh(s))if(r===0){const o=new G(s.path);this.Ue(n,o,ct.newNoDocument(o,Z.min()))}else fe(r===1);else{const o=this.Ye(n);if(o!==r){const c=this.Ze(e),u=c?this.Xe(c,e,o):1;if(u!==0){this.je(n);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,d)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,c;try{o=hi(r).toUint8Array()}catch(u){if(u instanceof dw)return ls("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new pp(o,i,s)}catch(u){return ls(u instanceof oo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ie===0?null:c}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,o)=>{const c=this.Je(o);if(c){if(s.current&&jh(c.target)){const u=new G(c.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,ct.newNoDocument(u,e))}s.be&&(n.set(o,s.ve()),s.Ce())}});let r=ie();this.qe.forEach((s,o)=>{let c=!0;o.forEachWhile(u=>{const d=this.Je(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new eu(e,n,this.Qe,this.ke,r);return this.ke=Kn(),this.qe=iv(),this.Qe=new Ie(ue),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new rv,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new Je(ue),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||K("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new rv),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function iv(){return new Ie(G.comparator)}function sv(){return new Ie(G.comparator)}const KR={asc:"ASCENDING",desc:"DESCENDING"},qR={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},GR={and:"AND",or:"OR"};class QR{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Oh(t,e){return t.useProto3Json||Gc(e)?e:{value:e}}function vc(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Lw(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function YR(t,e){return vc(t,e.toTimestamp())}function mn(t){return fe(!!t),Z.fromTimestamp(function(n){const r=jr(n);return new ze(r.seconds,r.nanos)}(t))}function mp(t,e){return Lh(t,e).canonicalString()}function Lh(t,e){const n=function(i){return new xe(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Vw(t){const e=xe.fromString(t);return fe(Bw(e)),e}function Vh(t,e){return mp(t.databaseId,e.path)}function gd(t,e){const n=Vw(e);if(n.get(1)!==t.databaseId.projectId)throw new $(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new $(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new G(Fw(n))}function Mw(t,e){return mp(t.databaseId,e)}function XR(t){const e=Vw(t);return e.length===4?xe.emptyPath():Fw(e)}function Mh(t){return new xe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Fw(t){return fe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function ov(t,e,n){return{name:Vh(t,e),fields:n.value.mapValue.fields}}function JR(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:J()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,f){return d.useProto3Json?(fe(f===void 0||typeof f=="string"),et.fromBase64String(f||"")):(fe(f===void 0||f instanceof Buffer||f instanceof Uint8Array),et.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(d){const f=d.code===void 0?M.UNKNOWN:Nw(d.code);return new $(f,d.message||"")}(o);n=new Ow(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=gd(t,r.document.name),s=mn(r.document.updateTime),o=r.document.createTime?mn(r.document.createTime):Z.min(),c=new Dt({mapValue:{fields:r.document.fields}}),u=ct.newFoundDocument(i,s,o,c),d=r.targetIds||[],f=r.removedTargetIds||[];n=new jl(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=gd(t,r.document),s=r.readTime?mn(r.readTime):Z.min(),o=ct.newNoDocument(i,s),c=r.removedTargetIds||[];n=new jl([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=gd(t,r.document),s=r.removedTargetIds||[];n=new jl([],s,i,null)}else{if(!("filter"in e))return J();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new UR(i,s),c=r.targetId;n=new Dw(c,o)}}return n}function ZR(t,e){let n;if(e instanceof ma)n={update:ov(t,e.key,e.value)};else if(e instanceof jw)n={delete:Vh(t,e.key)};else if(e instanceof _i)n={update:ov(t,e.key,e.data),updateMask:lC(e.fieldMask)};else{if(!(e instanceof MR))return J();n={verify:Vh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof Yo)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Xo)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Jo)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof yc)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw J()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:YR(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:J()}(t,e.precondition)),n}function eC(t,e){return t&&t.length>0?(fe(e!==void 0),t.map(n=>function(i,s){let o=i.updateTime?mn(i.updateTime):mn(s);return o.isEqual(Z.min())&&(o=mn(s)),new OR(o,i.transformResults||[])}(n,e))):[]}function tC(t,e){return{documents:[Mw(t,e.path)]}}function nC(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Mw(t,i);const s=function(d){if(d.length!==0)return Uw(tn.create(d,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(d){if(d.length!==0)return d.map(f=>function(g){return{field:Ci(g.field),direction:sC(g.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const c=Oh(t,e.limit);return c!==null&&(n.structuredQuery.limit=c),e.startAt&&(n.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:n,parent:i}}function rC(t){let e=XR(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){fe(r===1);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(m){const g=zw(m);return g instanceof tn&&mw(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(m){return m.map(g=>function(k){return new Qo(Pi(k.field),function(j){switch(j){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(g))}(n.orderBy));let c=null;n.limit&&(c=function(m){let g;return g=typeof m=="object"?m.value:m,Gc(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(m){const g=!!m.before,b=m.values||[];return new gc(b,g)}(n.startAt));let d=null;return n.endAt&&(d=function(m){const g=!m.before,b=m.values||[];return new gc(b,g)}(n.endAt)),wR(e,i,o,s,c,"F",u,d)}function iC(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return J()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function zw(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Pi(n.unaryFilter.field);return Ve.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Pi(n.unaryFilter.field);return Ve.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Pi(n.unaryFilter.field);return Ve.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Pi(n.unaryFilter.field);return Ve.create(o,"!=",{nullValue:"NULL_VALUE"});default:return J()}}(t):t.fieldFilter!==void 0?function(n){return Ve.create(Pi(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return J()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return tn.create(n.compositeFilter.filters.map(r=>zw(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return J()}}(n.compositeFilter.op))}(t):J()}function sC(t){return KR[t]}function oC(t){return qR[t]}function aC(t){return GR[t]}function Ci(t){return{fieldPath:t.canonicalString()}}function Pi(t){return Ye.fromServerFormat(t.fieldPath)}function Uw(t){return t instanceof Ve?function(n){if(n.op==="=="){if(Ky(n.value))return{unaryFilter:{field:Ci(n.field),op:"IS_NAN"}};if(Hy(n.value))return{unaryFilter:{field:Ci(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Ky(n.value))return{unaryFilter:{field:Ci(n.field),op:"IS_NOT_NAN"}};if(Hy(n.value))return{unaryFilter:{field:Ci(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ci(n.field),op:oC(n.op),value:n.value}}}(t):t instanceof tn?function(n){const r=n.getFilters().map(i=>Uw(i));return r.length===1?r[0]:{compositeFilter:{op:aC(n.op),filters:r}}}(t):J()}function lC(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Bw(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e,n,r,i,s=Z.min(),o=Z.min(),c=et.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new mr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new mr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new mr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new mr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cC{constructor(e){this.ct=e}}function uC(t){const e=rC({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Dh(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dC{constructor(){this.un=new hC}addToCollectionParentIndex(e,n){return this.un.add(n),F.resolve()}getCollectionParents(e,n){return F.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return F.resolve()}deleteFieldIndex(e,n){return F.resolve()}deleteAllFieldIndexes(e){return F.resolve()}createTargetIndexes(e,n){return F.resolve()}getDocumentsMatchingTarget(e,n){return F.resolve(null)}getIndexType(e,n){return F.resolve(0)}getFieldIndexes(e,n){return F.resolve([])}getNextCollectionGroupToUpdate(e){return F.resolve(null)}getMinOffset(e,n){return F.resolve(Pr.min())}getMinOffsetFromCollectionGroup(e,n){return F.resolve(Pr.min())}updateCollectionGroup(e,n,r){return F.resolve()}updateIndexEntries(e,n){return F.resolve()}}class hC{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new Je(xe.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Je(xe.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new hs(0)}static kn(){return new hs(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fC{constructor(){this.changes=new bs(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ct.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?F.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pC{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mC{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&Eo(r.mutation,i,Gt.empty(),ze.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,ie()).next(()=>r))}getLocalViewOfDocuments(e,n,r=ie()){const i=Zr();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=so();return s.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Zr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,ie()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{n.set(o,c)})})}computeViews(e,n,r,i){let s=Kn();const o=wo(),c=function(){return wo()}();return n.forEach((u,d)=>{const f=r.get(d.key);i.has(d.key)&&(f===void 0||f.mutation instanceof _i)?s=s.insert(d.key,d):f!==void 0?(o.set(d.key,f.mutation.getFieldMask()),Eo(f.mutation,d,f.mutation.getFieldMask(),ze.now())):o.set(d.key,Gt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((d,f)=>o.set(d,f)),n.forEach((d,f)=>{var m;return c.set(d,new pC(f,(m=o.get(d))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,n){const r=wo();let i=new Ie((o,c)=>o-c),s=ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const c of o)c.keys().forEach(u=>{const d=n.get(u);if(d===null)return;let f=r.get(u)||Gt.empty();f=c.applyToLocalView(d,f),r.set(u,f);const m=(i.get(c.batchId)||ie()).add(u);i=i.insert(c.batchId,m)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,m=bw();f.forEach(g=>{if(!s.has(g)){const b=Cw(n.get(g),r.get(g));b!==null&&m.set(g,b),s=s.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,m))}return F.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return G.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):_w(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):F.resolve(Zr());let c=-1,u=s;return o.next(d=>F.forEach(d,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(f)?F.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,u,d,ie())).next(f=>({batchId:c,changes:Sw(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new G(n)).next(r=>{let i=so();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=so();return this.indexManager.getCollectionParents(e,s).next(c=>F.forEach(c,u=>{const d=function(m,g){return new Ss(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(f=>{f.forEach((m,g)=>{o=o.insert(m,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,d)=>{const f=d.getKey();o.get(f)===null&&(o=o.insert(f,ct.newInvalidDocument(f)))});let c=so();return o.forEach((u,d)=>{const f=s.get(u);f!==void 0&&Eo(f.mutation,d,Gt.empty(),ze.now()),Xc(n,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gC{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return F.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:mn(i.createTime)}}(n)),F.resolve()}getNamedQuery(e,n){return F.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:uC(i.bundledQuery),readTime:mn(i.readTime)}}(n)),F.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yC{constructor(){this.overlays=new Ie(G.comparator),this.Ir=new Map}getOverlay(e,n){return F.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Zr();return F.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),F.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),F.resolve()}getOverlaysForCollection(e,n,r){const i=Zr(),s=n.length+1,o=new G(n.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!n.isPrefixOf(d.path))break;d.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return F.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new Ie((d,f)=>d-f);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===n&&d.largestBatchId>r){let f=s.get(d.largestBatchId);f===null&&(f=Zr(),s=s.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=Zr(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=i)););return F.resolve(c)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new zR(n,r));let s=this.Ir.get(n);s===void 0&&(s=ie(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vC{constructor(){this.sessionToken=et.EMPTY_BYTE_STRING}getSessionToken(e){return F.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,F.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(){this.Tr=new Je(Ue.Er),this.dr=new Je(Ue.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Ue(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Ue(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new G(new xe([])),r=new Ue(n,e),i=new Ue(n,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new G(new xe([])),r=new Ue(n,e),i=new Ue(n,e+1);let s=ie();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new Ue(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Ue{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return G.comparator(e.key,n.key)||ue(e.wr,n.wr)}static Ar(e,n){return ue(e.wr,n.wr)||G.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _C{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new Je(Ue.Er)}checkEmpty(e){return F.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new FR(s,n,r,i);this.mutationQueue.push(o);for(const c of i)this.br=this.br.add(new Ue(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return F.resolve(o)}lookupMutationBatch(e,n){return F.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return F.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return F.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return F.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Ue(n,0),i=new Ue(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const c=this.Dr(o.wr);s.push(c)}),F.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Je(ue);return n.forEach(i=>{const s=new Ue(i,0),o=new Ue(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],c=>{r=r.add(c.wr)})}),F.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;G.isDocumentKey(s)||(s=s.child(""));const o=new Ue(new G(s),0);let c=new Je(ue);return this.br.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(u.wr)),!0)},o),F.resolve(this.Cr(c))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){fe(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return F.forEach(n.mutations,i=>{const s=new Ue(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Ue(n,0),i=this.br.firstAfterOrEqual(r);return F.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,F.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xC{constructor(e){this.Mr=e,this.docs=function(){return new Ie(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return F.resolve(r?r.document.mutableCopy():ct.newInvalidDocument(n))}getEntries(e,n){let r=Kn();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ct.newInvalidDocument(i))}),F.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=Kn();const o=n.path,c=new G(o.child("")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||nR(tR(f),r)<=0||(i.has(f.key)||Xc(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return F.resolve(s)}getAllFromCollectionGroup(e,n,r,i){J()}Or(e,n){return F.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new wC(this)}getSize(e){return F.resolve(this.size)}}class wC extends fC{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),F.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EC{constructor(e){this.persistence=e,this.Nr=new bs(n=>up(n),dp),this.lastRemoteSnapshotVersion=Z.min(),this.highestTargetId=0,this.Lr=0,this.Br=new gp,this.targetCount=0,this.kr=hs.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),F.resolve()}getLastRemoteSnapshotVersion(e){return F.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return F.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),F.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),F.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new hs(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,F.resolve()}updateTargetData(e,n){return this.Kn(n),F.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,F.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((o,c)=>{c.sequenceNumber<=n&&r.get(c.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),F.waitFor(s).next(()=>i)}getTargetCount(e){return F.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return F.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),F.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),F.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),F.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return F.resolve(r)}containsKey(e,n){return F.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SC{constructor(e,n){this.qr={},this.overlays={},this.Qr=new op(0),this.Kr=!1,this.Kr=!0,this.$r=new vC,this.referenceDelegate=e(this),this.Ur=new EC(this),this.indexManager=new dC,this.remoteDocumentCache=function(i){return new xC(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new cC(n),this.Gr=new gC(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new yC,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new _C(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){K("MemoryPersistence","Starting transaction:",e);const i=new bC(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return F.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class bC extends iR{constructor(e){super(),this.currentSequenceNumber=e}}class yp{constructor(e){this.persistence=e,this.Jr=new gp,this.Yr=null}static Zr(e){return new yp(e)}get Xr(){if(this.Yr)return this.Yr;throw J()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),F.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),F.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),F.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return F.forEach(this.Xr,r=>{const i=G.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,Z.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return F.or([()=>F.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=ie(),i=ie();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new vp(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TC{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IC{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return dI()?8:sR(dt())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new TC;return this.Xi(e,n,o).next(c=>{if(s.result=c,this.zi)return this.es(e,n,o,c.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(qs()<=se.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",Ri(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),F.resolve()):(qs()<=se.DEBUG&&K("QueryEngine","Query:",Ri(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(qs()<=se.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",Ri(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,fn(n))):F.resolve())}Yi(e,n){if(Yy(n))return F.resolve(null);let r=fn(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=Dh(n,null,"F"),r=fn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=ie(...s);return this.Ji.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.ts(n,c);return this.ns(n,d,o,u.readTime)?this.Yi(e,Dh(n,null,"F")):this.rs(e,d,n,u)}))})))}Zi(e,n,r,i){return Yy(n)||i.isEqual(Z.min())?F.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(n,s);return this.ns(n,o,r,i)?F.resolve(null):(qs()<=se.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ri(n)),this.rs(e,o,n,eR(i,-1)).next(c=>c))})}ts(e,n){let r=new Je(ww(e));return n.forEach((i,s)=>{Xc(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return qs()<=se.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",Ri(n)),this.Ji.getDocumentsMatchingQuery(e,n,Pr.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kC{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new Ie(ue),this._s=new bs(s=>up(s),dp),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new mC(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function AC(t,e,n,r){return new kC(t,e,n,r)}async function Ww(t,e){const n=ee(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],c=[];let u=ie();for(const d of i){o.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of s){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(d=>({hs:d,removedBatchIds:o,addedBatchIds:c}))})})}function RC(t,e){const n=ee(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const m=d.batch,g=m.keys();let b=F.resolve();return g.forEach(k=>{b=b.next(()=>f.getEntry(u,k)).next(P=>{const j=d.docVersions.get(k);fe(j!==null),P.version.compareTo(j)<0&&(m.applyToRemoteDocument(P,d),P.isValidDocument()&&(P.setReadTime(d.commitVersion),f.addEntry(P)))})}),b.next(()=>c.mutationQueue.removeMutationBatch(u,m))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=ie();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function $w(t){const e=ee(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function CC(t,e){const n=ee(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const c=[];e.targetChanges.forEach((f,m)=>{const g=i.get(m);if(!g)return;c.push(n.Ur.removeMatchingKeys(s,f.removedDocuments,m).next(()=>n.Ur.addMatchingKeys(s,f.addedDocuments,m)));let b=g.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?b=b.withResumeToken(et.EMPTY_BYTE_STRING,Z.min()).withLastLimboFreeSnapshotVersion(Z.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,r)),i=i.insert(m,b),function(P,j,w){return P.resumeToken.approximateByteSize()===0||j.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=3e8?!0:w.addedDocuments.size+w.modifiedDocuments.size+w.removedDocuments.size>0}(g,b,f)&&c.push(n.Ur.updateTargetData(s,b))});let u=Kn(),d=ie();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),c.push(PC(s,o,e.documentUpdates).next(f=>{u=f.Ps,d=f.Is})),!r.isEqual(Z.min())){const f=n.Ur.getLastRemoteSnapshotVersion(s).next(m=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(f)}return F.waitFor(c).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,d)).next(()=>u)}).then(s=>(n.os=i,s))}function PC(t,e,n){let r=ie(),i=ie();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=Kn();return n.forEach((c,u)=>{const d=s.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(Z.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):K("LocalStore","Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Ps:o,Is:i}})}function jC(t,e){const n=ee(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function NC(t,e){const n=ee(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,F.resolve(i)):n.Ur.allocateTargetId(r).next(o=>(i=new mr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Fh(t,e,n){const r=ee(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!pa(o))throw o;K("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function av(t,e,n){const r=ee(t);let i=Z.min(),s=ie();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,d,f){const m=ee(u),g=m._s.get(f);return g!==void 0?F.resolve(m.os.get(g)):m.Ur.getTargetData(d,f)}(r,o,fn(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,c.targetId).next(u=>{s=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?i:Z.min(),n?s:ie())).next(c=>(DC(r,SR(e),c),{documents:c,Ts:s})))}function DC(t,e,n){let r=t.us.get(e)||Z.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}class lv{constructor(){this.activeTargetIds=RR()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class OC{constructor(){this.so=new lv,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new lv,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LC{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){K("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){K("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sl=null;function yd(){return sl===null?sl=function(){return 268435456+Math.round(2147483648*Math.random())}():sl++,"0x"+sl.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VC={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MC{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot="WebChannelConnection";class FC extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,o){const c=yd(),u=this.xo(n,r.toUriEncodedString());K("RestConnection",`Sending RPC '${n}' ${c}:`,u,i);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,s,o),this.No(n,u,d,i).then(f=>(K("RestConnection",`Received RPC '${n}' ${c}: `,f),f),f=>{throw ls("RestConnection",`RPC '${n}' ${c} failed with error: `,f,"url: ",u,"request:",i),f})}Lo(n,r,i,s,o,c){return this.Mo(n,r,i,s,o)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ws}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>n[o]=s),i&&i.headers.forEach((s,o)=>n[o]=s)}xo(n,r){const i=VC[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=yd();return new Promise((o,c)=>{const u=new rw;u.setWithCredentials(!0),u.listenOnce(iw.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Rl.NO_ERROR:const f=u.getResponseJson();K(ot,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case Rl.TIMEOUT:K(ot,`RPC '${e}' ${s} timed out`),c(new $(M.DEADLINE_EXCEEDED,"Request time out"));break;case Rl.HTTP_ERROR:const m=u.getStatus();if(K(ot,`RPC '${e}' ${s} failed with status:`,m,"response text:",u.getResponseText()),m>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const b=g==null?void 0:g.error;if(b&&b.status&&b.message){const k=function(j){const w=j.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(w)>=0?w:M.UNKNOWN}(b.status);c(new $(k,b.message))}else c(new $(M.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new $(M.UNAVAILABLE,"Connection failed."));break;default:J()}}finally{K(ot,`RPC '${e}' ${s} completed.`)}});const d=JSON.stringify(i);K(ot,`RPC '${e}' ${s} sending request:`,i),u.send(n,"POST",d,r,15)})}Bo(e,n,r){const i=yd(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=aw(),c=ow(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=s.join("");K(ot,`Creating RPC '${e}' stream ${i}: ${f}`,u);const m=o.createWebChannel(f,u);let g=!1,b=!1;const k=new MC({Io:j=>{b?K(ot,`Not sending because RPC '${e}' stream ${i} is closed:`,j):(g||(K(ot,`Opening RPC '${e}' stream ${i} transport.`),m.open(),g=!0),K(ot,`RPC '${e}' stream ${i} sending:`,j),m.send(j))},To:()=>m.close()}),P=(j,w,x)=>{j.listen(w,T=>{try{x(T)}catch(O){setTimeout(()=>{throw O},0)}})};return P(m,io.EventType.OPEN,()=>{b||(K(ot,`RPC '${e}' stream ${i} transport opened.`),k.yo())}),P(m,io.EventType.CLOSE,()=>{b||(b=!0,K(ot,`RPC '${e}' stream ${i} transport closed`),k.So())}),P(m,io.EventType.ERROR,j=>{b||(b=!0,ls(ot,`RPC '${e}' stream ${i} transport errored:`,j),k.So(new $(M.UNAVAILABLE,"The operation could not be completed")))}),P(m,io.EventType.MESSAGE,j=>{var w;if(!b){const x=j.data[0];fe(!!x);const T=x,O=T.error||((w=T[0])===null||w===void 0?void 0:w.error);if(O){K(ot,`RPC '${e}' stream ${i} received error:`,O);const D=O.status;let V=function(S){const I=De[S];if(I!==void 0)return Nw(I)}(D),E=O.message;V===void 0&&(V=M.INTERNAL,E="Unknown error status: "+D+" with message "+O.message),b=!0,k.So(new $(V,E)),m.close()}else K(ot,`RPC '${e}' stream ${i} received:`,x),k.bo(x)}}),P(c,sw.STAT_EVENT,j=>{j.stat===Ah.PROXY?K(ot,`RPC '${e}' stream ${i} detected buffering proxy`):j.stat===Ah.NOPROXY&&K(ot,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.wo()},0),k}}function vd(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(t){return new QR(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&K("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e,n,r,i,s,o,c,u){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Hw(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(Hn(n.toString()),Hn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new $(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return K("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(K("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class zC extends Kw{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=JR(this.serializer,e),r=function(s){if(!("targetChange"in s))return Z.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Z.min():o.readTime?mn(o.readTime):Z.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Mh(this.serializer),n.addTarget=function(s,o){let c;const u=o.target;if(c=jh(u)?{documents:tC(s,u)}:{query:nC(s,u)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Lw(s,o.resumeToken);const d=Oh(s,o.expectedCount);d!==null&&(c.expectedCount=d)}else if(o.snapshotVersion.compareTo(Z.min())>0){c.readTime=vc(s,o.snapshotVersion.toTimestamp());const d=Oh(s,o.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=iC(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Mh(this.serializer),n.removeTarget=e,this.a_(n)}}class UC extends Kw{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return fe(!!e.streamToken),this.lastStreamToken=e.streamToken,fe(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){fe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=eC(e.writeResults,e.commitTime),r=mn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Mh(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>ZR(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BC extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new $(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,Lh(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new $(M.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Lo(e,Lh(n,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new $(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class WC{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Hn(n),this.D_=!1):K("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $C{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{xi(this)&&(K("RemoteStore","Restarting streams for network reachability change."),await async function(u){const d=ee(u);d.L_.add(4),await ya(d),d.q_.set("Unknown"),d.L_.delete(4),await nu(d)}(this))})}),this.q_=new WC(r,i)}}async function nu(t){if(xi(t))for(const e of t.B_)await e(!0)}async function ya(t){for(const e of t.B_)await e(!1)}function qw(t,e){const n=ee(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Ep(n)?wp(n):Ts(n).r_()&&xp(n,e))}function _p(t,e){const n=ee(t),r=Ts(n);n.N_.delete(e),r.r_()&&Gw(n,e),n.N_.size===0&&(r.r_()?r.o_():xi(n)&&n.q_.set("Unknown"))}function xp(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Z.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ts(t).A_(e)}function Gw(t,e){t.Q_.xe(e),Ts(t).R_(e)}function wp(t){t.Q_=new HR({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Ts(t).start(),t.q_.v_()}function Ep(t){return xi(t)&&!Ts(t).n_()&&t.N_.size>0}function xi(t){return ee(t).L_.size===0}function Qw(t){t.Q_=void 0}async function HC(t){t.q_.set("Online")}async function KC(t){t.N_.forEach((e,n)=>{xp(t,e)})}async function qC(t,e){Qw(t),Ep(t)?(t.q_.M_(e),wp(t)):t.q_.set("Unknown")}async function GC(t,e,n){if(t.q_.set("Online"),e instanceof Ow&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.N_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.N_.delete(c),i.Q_.removeTarget(c))}(t,e)}catch(r){K("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await _c(t,r)}else if(e instanceof jl?t.Q_.Ke(e):e instanceof Dw?t.Q_.He(e):t.Q_.We(e),!n.isEqual(Z.min()))try{const r=await $w(t.localStore);n.compareTo(r)>=0&&await function(s,o){const c=s.Q_.rt(o);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.N_.get(d);f&&s.N_.set(d,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,d)=>{const f=s.N_.get(u);if(!f)return;s.N_.set(u,f.withResumeToken(et.EMPTY_BYTE_STRING,f.snapshotVersion)),Gw(s,u);const m=new mr(f.target,u,d,f.sequenceNumber);xp(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(t,n)}catch(r){K("RemoteStore","Failed to raise snapshot:",r),await _c(t,r)}}async function _c(t,e,n){if(!pa(e))throw e;t.L_.add(1),await ya(t),t.q_.set("Offline"),n||(n=()=>$w(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{K("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await nu(t)})}function Yw(t,e){return e().catch(n=>_c(t,n,e))}async function ru(t){const e=ee(t),n=Nr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;QC(e);)try{const i=await jC(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,YC(e,i)}catch(i){await _c(e,i)}Xw(e)&&Jw(e)}function QC(t){return xi(t)&&t.O_.length<10}function YC(t,e){t.O_.push(e);const n=Nr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function Xw(t){return xi(t)&&!Nr(t).n_()&&t.O_.length>0}function Jw(t){Nr(t).start()}async function XC(t){Nr(t).p_()}async function JC(t){const e=Nr(t);for(const n of t.O_)e.m_(n.mutations)}async function ZC(t,e,n){const r=t.O_.shift(),i=fp.from(r,e,n);await Yw(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await ru(t)}async function eP(t,e){e&&Nr(t).V_&&await async function(r,i){if(function(o){return BR(o)&&o!==M.ABORTED}(i.code)){const s=r.O_.shift();Nr(r).s_(),await Yw(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await ru(r)}}(t,e),Xw(t)&&Jw(t)}async function uv(t,e){const n=ee(t);n.asyncQueue.verifyOperationInProgress(),K("RemoteStore","RemoteStore received new credentials");const r=xi(n);n.L_.add(3),await ya(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await nu(n)}async function tP(t,e){const n=ee(t);e?(n.L_.delete(2),await nu(n)):e||(n.L_.add(2),await ya(n),n.q_.set("Unknown"))}function Ts(t){return t.K_||(t.K_=function(n,r,i){const s=ee(n);return s.w_(),new zC(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:HC.bind(null,t),Ro:KC.bind(null,t),mo:qC.bind(null,t),d_:GC.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Ep(t)?wp(t):t.q_.set("Unknown")):(await t.K_.stop(),Qw(t))})),t.K_}function Nr(t){return t.U_||(t.U_=function(n,r,i){const s=ee(n);return s.w_(),new UC(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:XC.bind(null,t),mo:eP.bind(null,t),f_:JC.bind(null,t),g_:ZC.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await ru(t)):(await t.U_.stop(),t.O_.length>0&&(K("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Mn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,c=new Sp(e,n,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new $(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function bp(t,e){if(Hn("AsyncQueue",`${e}: ${t}`),pa(t))return new $(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(e){this.comparator=e?(n,r)=>e(n,r)||G.comparator(n.key,r.key):(n,r)=>G.comparator(n.key,r.key),this.keyedMap=so(),this.sortedSet=new Ie(this.comparator)}static emptySet(e){return new Zi(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Zi)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Zi;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(){this.W_=new Ie(G.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):J():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class fs{constructor(e,n,r,i,s,o,c,u,d){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(c=>{o.push({type:0,doc:c})}),new fs(e,n,Zi.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Yc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nP{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class rP{constructor(){this.queries=hv(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=ee(n),s=i.queries;i.queries=hv(),s.forEach((o,c)=>{for(const u of c.j_)u.onError(r)})})(this,new $(M.ABORTED,"Firestore shutting down"))}}function hv(){return new bs(t=>xw(t),Yc)}async function Tp(t,e){const n=ee(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new nP,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const c=bp(o,`Initialization of query '${Ri(e.query)}' failed`);return void e.onError(c)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&kp(n)}async function Ip(t,e){const n=ee(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function iP(t,e){const n=ee(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const c of o.j_)c.X_(i)&&(r=!0);o.z_=i}}r&&kp(n)}function sP(t,e,n){const r=ee(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function kp(t){t.Y_.forEach(e=>{e.next()})}var zh,fv;(fv=zh||(zh={})).ea="default",fv.Cache="cache";class Ap{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new fs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=fs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==zh.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(e){this.key=e}}class e1{constructor(e){this.key=e}}class oP{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ie(),this.mutatedKeys=ie(),this.Aa=ww(e),this.Ra=new Zi(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new dv,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{const g=i.get(f),b=Xc(this.query,m)?m:null,k=!!g&&this.mutatedKeys.has(g.key),P=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let j=!1;g&&b?g.data.isEqual(b.data)?k!==P&&(r.track({type:3,doc:b}),j=!0):this.ga(g,b)||(r.track({type:2,doc:b}),j=!0,(u&&this.Aa(b,u)>0||d&&this.Aa(b,d)<0)&&(c=!0)):!g&&b?(r.track({type:0,doc:b}),j=!0):g&&!b&&(r.track({type:1,doc:g}),j=!0,(u||d)&&(c=!0)),j&&(b?(o=o.add(b),s=P?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{Ra:o,fa:r,ns:c,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,m)=>function(b,k){const P=j=>{switch(j){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return J()}};return P(b)-P(k)}(f.type,m.type)||this.Aa(f.doc,m.doc)),this.pa(r),i=i!=null&&i;const c=n&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,d=u!==this.Ea;return this.Ea=u,o.length!==0||d?{snapshot:new fs(this.query,e.Ra,s,o,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new dv,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ie(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new e1(r))}),this.da.forEach(r=>{e.has(r)||n.push(new Zw(r))}),n}ba(e){this.Ta=e.Ts,this.da=ie();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return fs.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class aP{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class lP{constructor(e){this.key=e,this.va=!1}}class cP{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new bs(c=>xw(c),Yc),this.Ma=new Map,this.xa=new Set,this.Oa=new Ie(G.comparator),this.Na=new Map,this.La=new gp,this.Ba={},this.ka=new Map,this.qa=hs.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function uP(t,e,n=!0){const r=o1(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await t1(r,e,n,!0),i}async function dP(t,e){const n=o1(t);await t1(n,e,!0,!1)}async function t1(t,e,n,r){const i=await NC(t.localStore,fn(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let c;return r&&(c=await hP(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&qw(t.remoteStore,i),c}async function hP(t,e,n,r,i){t.Ka=(m,g,b)=>async function(P,j,w,x){let T=j.view.ma(w);T.ns&&(T=await av(P.localStore,j.query,!1).then(({documents:E})=>j.view.ma(E,T)));const O=x&&x.targetChanges.get(j.targetId),D=x&&x.targetMismatches.get(j.targetId)!=null,V=j.view.applyChanges(T,P.isPrimaryClient,O,D);return mv(P,j.targetId,V.wa),V.snapshot}(t,m,g,b);const s=await av(t.localStore,e,!0),o=new oP(e,s.Ts),c=o.ma(s.documents),u=ga.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),d=o.applyChanges(c,t.isPrimaryClient,u);mv(t,n,d.wa);const f=new aP(e,n,o);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),d.snapshot}async function fP(t,e,n){const r=ee(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!Yc(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Fh(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&_p(r.remoteStore,i.targetId),Uh(r,i.targetId)}).catch(fa)):(Uh(r,i.targetId),await Fh(r.localStore,i.targetId,!0))}async function pP(t,e){const n=ee(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),_p(n.remoteStore,r.targetId))}async function mP(t,e,n){const r=EP(t);try{const i=await function(o,c){const u=ee(o),d=ze.now(),f=c.reduce((b,k)=>b.add(k.key),ie());let m,g;return u.persistence.runTransaction("Locally write mutations","readwrite",b=>{let k=Kn(),P=ie();return u.cs.getEntries(b,f).next(j=>{k=j,k.forEach((w,x)=>{x.isValidDocument()||(P=P.add(w))})}).next(()=>u.localDocuments.getOverlayedDocuments(b,k)).next(j=>{m=j;const w=[];for(const x of c){const T=VR(x,m.get(x.key).overlayedDocument);T!=null&&w.push(new _i(x.key,T,hw(T.value.mapValue),pn.exists(!0)))}return u.mutationQueue.addMutationBatch(b,d,w,c)}).next(j=>{g=j;const w=j.applyToLocalDocumentSet(m,P);return u.documentOverlayCache.saveOverlays(b,j.batchId,w)})}).then(()=>({batchId:g.batchId,changes:Sw(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,u){let d=o.Ba[o.currentUser.toKey()];d||(d=new Ie(ue)),d=d.insert(c,u),o.Ba[o.currentUser.toKey()]=d}(r,i.batchId,n),await va(r,i.changes),await ru(r.remoteStore)}catch(i){const s=bp(i,"Failed to persist write");n.reject(s)}}async function n1(t,e){const n=ee(t);try{const r=await CC(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Na.get(s);o&&(fe(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?fe(o.va):i.removedDocuments.size>0&&(fe(o.va),o.va=!1))}),await va(n,r,e)}catch(r){await fa(r)}}function pv(t,e,n){const r=ee(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,o)=>{const c=o.view.Z_(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const u=ee(o);u.onlineState=c;let d=!1;u.queries.forEach((f,m)=>{for(const g of m.j_)g.Z_(c)&&(d=!0)}),d&&kp(u)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function gP(t,e,n){const r=ee(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new Ie(G.comparator);o=o.insert(s,ct.newNoDocument(s,Z.min()));const c=ie().add(s),u=new eu(Z.min(),new Map,new Ie(ue),o,c);await n1(r,u),r.Oa=r.Oa.remove(s),r.Na.delete(e),Rp(r)}else await Fh(r.localStore,e,!1).then(()=>Uh(r,e,n)).catch(fa)}async function yP(t,e){const n=ee(t),r=e.batch.batchId;try{const i=await RC(n.localStore,e);i1(n,r,null),r1(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await va(n,i)}catch(i){await fa(i)}}async function vP(t,e,n){const r=ee(t);try{const i=await function(o,c){const u=ee(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(m=>(fe(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(d,m))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(r.localStore,e);i1(r,e,n),r1(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await va(r,i)}catch(i){await fa(i)}}function r1(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function i1(t,e,n){const r=ee(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function Uh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||s1(t,r)})}function s1(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(_p(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Rp(t))}function mv(t,e,n){for(const r of n)r instanceof Zw?(t.La.addReference(r.key,e),_P(t,r)):r instanceof e1?(K("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||s1(t,r.key)):J()}function _P(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(K("SyncEngine","New document in limbo: "+n),t.xa.add(r),Rp(t))}function Rp(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new G(xe.fromString(e)),r=t.qa.next();t.Na.set(r,new lP(n)),t.Oa=t.Oa.insert(n,r),qw(t.remoteStore,new mr(fn(Qc(n.path)),r,"TargetPurposeLimboResolution",op.oe))}}async function va(t,e,n){const r=ee(t),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((c,u)=>{o.push(r.Ka(u,e,n).then(d=>{var f;if((d||n)&&r.isPrimaryClient){const m=d?!d.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(d){i.push(d);const m=vp.Wi(u.targetId,d);s.push(m)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(u,d){const f=ee(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>F.forEach(d,g=>F.forEach(g.$i,b=>f.persistence.referenceDelegate.addReference(m,g.targetId,b)).next(()=>F.forEach(g.Ui,b=>f.persistence.referenceDelegate.removeReference(m,g.targetId,b)))))}catch(m){if(!pa(m))throw m;K("LocalStore","Failed to update sequence numbers: "+m)}for(const m of d){const g=m.targetId;if(!m.fromCache){const b=f.os.get(g),k=b.snapshotVersion,P=b.withLastLimboFreeSnapshotVersion(k);f.os=f.os.insert(g,P)}}}(r.localStore,s))}async function xP(t,e){const n=ee(t);if(!n.currentUser.isEqual(e)){K("SyncEngine","User change. New user:",e.toKey());const r=await Ww(n.localStore,e);n.currentUser=e,function(s,o){s.ka.forEach(c=>{c.forEach(u=>{u.reject(new $(M.CANCELLED,o))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await va(n,r.hs)}}function wP(t,e){const n=ee(t),r=n.Na.get(e);if(r&&r.va)return ie().add(r.key);{let i=ie();const s=n.Ma.get(e);if(!s)return i;for(const o of s){const c=n.Fa.get(o);i=i.unionWith(c.view.Va)}return i}}function o1(t){const e=ee(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=n1.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=wP.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=gP.bind(null,e),e.Ca.d_=iP.bind(null,e.eventManager),e.Ca.$a=sP.bind(null,e.eventManager),e}function EP(t){const e=ee(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=yP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=vP.bind(null,e),e}class xc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=tu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return AC(this.persistence,new IC,e.initialUser,this.serializer)}Ga(e){return new SC(yp.Zr,this.serializer)}Wa(e){return new OC}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}xc.provider={build:()=>new xc};class Bh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>pv(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=xP.bind(null,this.syncEngine),await tP(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new rP}()}createDatastore(e){const n=tu(e.databaseInfo.databaseId),r=function(s){return new FC(s)}(e.databaseInfo);return function(s,o,c,u){return new BC(s,o,c,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,c){return new $C(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,n=>pv(this.syncEngine,n,0),function(){return cv.D()?new cv:new LC}())}createSyncEngine(e,n){return function(i,s,o,c,u,d,f){const m=new cP(i,s,o,c,u,d);return f&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=ee(i);K("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await ya(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Bh.provider={build:()=>new Bh};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Hn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SP{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=at.UNAUTHENTICATED,this.clientId=cw.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{K("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(K("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Mn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=bp(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function _d(t,e){t.asyncQueue.verifyOperationInProgress(),K("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Ww(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function gv(t,e){t.asyncQueue.verifyOperationInProgress();const n=await bP(t);K("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>uv(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>uv(e.remoteStore,i)),t._onlineComponents=e}async function bP(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){K("FirestoreClient","Using user provided OfflineComponentProvider");try{await _d(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===M.FAILED_PRECONDITION||i.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;ls("Error using user provided cache. Falling back to memory cache: "+n),await _d(t,new xc)}}else K("FirestoreClient","Using default OfflineComponentProvider"),await _d(t,new xc);return t._offlineComponents}async function a1(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(K("FirestoreClient","Using user provided OnlineComponentProvider"),await gv(t,t._uninitializedComponentsProvider._online)):(K("FirestoreClient","Using default OnlineComponentProvider"),await gv(t,new Bh))),t._onlineComponents}function TP(t){return a1(t).then(e=>e.syncEngine)}async function wc(t){const e=await a1(t),n=e.eventManager;return n.onListen=uP.bind(null,e.syncEngine),n.onUnlisten=fP.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=dP.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=pP.bind(null,e.syncEngine),n}function IP(t,e,n={}){const r=new Mn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,d){const f=new Cp({next:g=>{f.Za(),o.enqueueAndForget(()=>Ip(s,m));const b=g.docs.has(c);!b&&g.fromCache?d.reject(new $(M.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&g.fromCache&&u&&u.source==="server"?d.reject(new $(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(g)},error:g=>d.reject(g)}),m=new Ap(Qc(c.path),f,{includeMetadataChanges:!0,_a:!0});return Tp(s,m)}(await wc(t),t.asyncQueue,e,n,r)),r.promise}function kP(t,e,n={}){const r=new Mn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,d){const f=new Cp({next:g=>{f.Za(),o.enqueueAndForget(()=>Ip(s,m)),g.fromCache&&u.source==="server"?d.reject(new $(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(g)},error:g=>d.reject(g)}),m=new Ap(c,f,{includeMetadataChanges:!0,_a:!0});return Tp(s,m)}(await wc(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l1(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c1(t,e,n){if(!n)throw new $(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function AP(t,e,n,r){if(e===!0&&r===!0)throw new $(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function vv(t){if(!G.isDocumentKey(t))throw new $(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function _v(t){if(G.isDocumentKey(t))throw new $(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function iu(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":J()}function Zt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new $(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=iu(t);throw new $(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xv{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new $(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new $(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}AP("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=l1((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new $(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new $(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new $(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class su{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new xv({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new $(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new $(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new xv(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new HA;switch(r.type){case"firstParty":return new QA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new $(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=yv.get(n);r&&(K("ComponentProvider","Removing Datastore"),yv.delete(n),r.terminate())}(this),Promise.resolve()}}function RP(t,e,n,r={}){var i;const s=(t=Zt(t,su))._getSettings(),o=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&ls("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let c,u;if(typeof r.mockUserToken=="string")c=r.mockUserToken,u=at.MOCK_USER;else{c=gx(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new $(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new at(d)}t._authCredentials=new KA(new lw(c,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Mr(this.firestore,e,this._query)}}class gt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new kr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new gt(this.firestore,e,this._key)}}class kr extends Mr{constructor(e,n,r){super(e,n,Qc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new gt(this.firestore,null,new G(e))}withConverter(e){return new kr(this.firestore,e,this._path)}}function It(t,e,...n){if(t=Ke(t),c1("collection","path",e),t instanceof su){const r=xe.fromString(e,...n);return _v(r),new kr(t,null,r)}{if(!(t instanceof gt||t instanceof kr))throw new $(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(xe.fromString(e,...n));return _v(r),new kr(t.firestore,null,r)}}function Fr(t,e,...n){if(t=Ke(t),arguments.length===1&&(e=cw.newId()),c1("doc","path",e),t instanceof su){const r=xe.fromString(e,...n);return vv(r),new gt(t,null,new G(r))}{if(!(t instanceof gt||t instanceof kr))throw new $(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(xe.fromString(e,...n));return vv(r),new gt(t.firestore,t instanceof kr?t.converter:null,new G(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Hw(this,"async_queue_retry"),this.Vu=()=>{const r=vd();r&&K("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=vd();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=vd();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Mn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!pa(e))throw e;K("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw Hn("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=Sp.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&J()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function Ev(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class pi extends su{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new wv,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new wv(e),this._firestoreClient=void 0,await e}}}function CP(t,e){const n=typeof t=="object"?t:qf(),r=typeof t=="string"?t:"(default)",i=$c(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=fx("firestore");s&&RP(i,...s)}return i}function ou(t){if(t._terminated)throw new $(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||PP(t),t._firestoreClient}function PP(t){var e,n,r;const i=t._freezeSettings(),s=function(c,u,d,f){return new lR(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,l1(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new SP(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ps(et.fromBase64String(e))}catch(n){throw new $(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new ps(et.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new $(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ye(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new $(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new $(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jP=/^__.*__$/;class NP{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new _i(e,this.data,this.fieldMask,n,this.fieldTransforms):new ma(e,this.data,n,this.fieldTransforms)}}function u1(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw J()}}class Op{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Op(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Ec(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(u1(this.Cu)&&jP.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class DP{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||tu(e)}Qu(e,n,r,i=!1){return new Op({Cu:e,methodName:n,qu:r,path:Ye.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Lp(t){const e=t._freezeSettings(),n=tu(t._databaseId);return new DP(t._databaseId,!!e.ignoreUndefinedProperties,n)}function d1(t,e,n,r,i,s={}){const o=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);p1("Data must be an object, but it was:",o,r);const c=h1(r,o);let u,d;if(s.merge)u=new Gt(o.fieldMask),d=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const g=LP(e,m,n);if(!o.contains(g))throw new $(M.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);MP(f,g)||f.push(g)}u=new Gt(f),d=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,d=o.fieldTransforms;return new NP(new Dt(c),u,d)}class Vp extends jp{_toFieldTransform(e){return new NR(e.path,new Yo)}isEqual(e){return e instanceof Vp}}function OP(t,e,n,r=!1){return Mp(n,t.Qu(r?4:3,e))}function Mp(t,e){if(f1(t=Ke(t)))return p1("Unsupported field value:",e,t),h1(t,e);if(t instanceof jp)return function(r,i){if(!u1(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const c of r){let u=Mp(c,i.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=Ke(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return CR(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ze.fromDate(r);return{timestampValue:vc(i.serializer,s)}}if(r instanceof ze){const s=new ze(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:vc(i.serializer,s)}}if(r instanceof Np)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ps)return{bytesValue:Lw(i.serializer,r._byteString)};if(r instanceof gt){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:mp(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Dp)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw c.Bu("VectorValues must only contain numeric values.");return hp(c.serializer,u)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${iu(r)}`)}(t,e)}function h1(t,e){const n={};return uw(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Es(t,(r,i)=>{const s=Mp(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function f1(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ze||t instanceof Np||t instanceof ps||t instanceof gt||t instanceof jp||t instanceof Dp)}function p1(t,e,n){if(!f1(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=iu(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function LP(t,e,n){if((e=Ke(e))instanceof Pp)return e._internalPath;if(typeof e=="string")return m1(t,e);throw Ec("Field path arguments must be of type string or ",t,!1,void 0,n)}const VP=new RegExp("[~\\*/\\[\\]]");function m1(t,e,n){if(e.search(VP)>=0)throw Ec(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Pp(...e.split("."))._internalPath}catch{throw Ec(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ec(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;n&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new $(M.INVALID_ARGUMENT,c+t+u)}function MP(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g1{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new gt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new FP(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(au("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class FP extends g1{data(){return super.data()}}function au(t,e){return typeof e=="string"?m1(t,e):e instanceof Pp?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y1(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new $(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Fp{}class v1 extends Fp{}function Ht(t,e,...n){let r=[];e instanceof Fp&&r.push(e),r=r.concat(n),function(s){const o=s.filter(u=>u instanceof zp).length,c=s.filter(u=>u instanceof lu).length;if(o>1||o>0&&c>0)throw new $(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class lu extends v1{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new lu(e,n,r)}_apply(e){const n=this._parse(e);return _1(e._query,n),new Mr(e.firestore,e.converter,Nh(e._query,n))}_parse(e){const n=Lp(e.firestore);return function(s,o,c,u,d,f,m){let g;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new $(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){bv(m,f);const b=[];for(const k of m)b.push(Sv(u,s,k));g={arrayValue:{values:b}}}else g=Sv(u,s,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||bv(m,f),g=OP(c,o,m,f==="in"||f==="not-in");return Ve.create(d,f,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function Gr(t,e,n){const r=e,i=au("where",t);return lu._create(i,r,n)}class zp extends Fp{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new zp(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:tn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const u of c)_1(o,u),o=Nh(o,u)}(e._query,n),new Mr(e.firestore,e.converter,Nh(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Up extends v1{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Up(e,n)}_apply(e){const n=function(i,s,o){if(i.startAt!==null)throw new $(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new $(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Qo(s,o)}(e._query,this._field,this._direction);return new Mr(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new Ss(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,n))}}function an(t,e="asc"){const n=e,r=au("orderBy",t);return Up._create(r,n)}function Sv(t,e,n){if(typeof(n=Ke(n))=="string"){if(n==="")throw new $(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!_w(e)&&n.indexOf("/")!==-1)throw new $(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(xe.fromString(n));if(!G.isDocumentKey(r))throw new $(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return $y(t,new G(r))}if(n instanceof gt)return $y(t,n._key);throw new $(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${iu(n)}.`)}function bv(t,e){if(!Array.isArray(t)||t.length===0)throw new $(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function _1(t,e){const n=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new $(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new $(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class zP{convertValue(e,n="none"){switch(fi(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(hi(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw J()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Es(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>Pe(o.doubleValue));return new Dp(s)}convertGeoPoint(e){return new Np(Pe(e.latitude),Pe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=lp(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ko(e));default:return null}}convertTimestamp(e){const n=jr(e);return new ze(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=xe.fromString(e);fe(Bw(r));const i=new qo(r.get(1),r.get(3)),s=new G(r.popFirst(5));return i.isEqual(n)||Hn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x1(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class w1 extends g1{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Nl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(au("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Nl extends w1{data(e={}){return super.data(e)}}class E1{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new ao(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Nl(this._firestore,this._userDataWriter,r.key,r,new ao(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new $(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const u=new Nl(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ao(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const u=new Nl(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ao(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,f=-1;return c.type!==0&&(d=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:UP(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function UP(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return J()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cu(t){t=Zt(t,gt);const e=Zt(t.firestore,pi);return IP(ou(e),t._key).then(n=>I1(e,t,n))}class Bp extends zP{constructor(e){super(),this.firestore=e}convertBytes(e){return new ps(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new gt(this.firestore,null,n)}}function Kt(t){t=Zt(t,Mr);const e=Zt(t.firestore,pi),n=ou(e),r=new Bp(e);return y1(t._query),kP(n,t._query).then(i=>new E1(e,r,t,i))}function S1(t,e,n){t=Zt(t,gt);const r=Zt(t.firestore,pi),i=x1(t.converter,e,n);return T1(r,[d1(Lp(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,pn.none())])}function b1(t,e){const n=Zt(t.firestore,pi),r=Fr(t),i=x1(t.converter,e);return T1(n,[d1(Lp(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,pn.exists(!1))]).then(()=>r)}function BP(t,...e){var n,r,i;t=Ke(t);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Ev(e[o])||(s=e[o],o++);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Ev(e[o])){const m=e[o];e[o]=(n=m.next)===null||n===void 0?void 0:n.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let u,d,f;if(t instanceof gt)d=Zt(t.firestore,pi),f=Qc(t._key.path),u={next:m=>{e[o]&&e[o](I1(d,t,m))},error:e[o+1],complete:e[o+2]};else{const m=Zt(t,Mr);d=Zt(m.firestore,pi),f=m._query;const g=new Bp(d);u={next:b=>{e[o]&&e[o](new E1(d,g,m,b))},error:e[o+1],complete:e[o+2]},y1(t._query)}return function(g,b,k,P){const j=new Cp(P),w=new Ap(b,j,k);return g.asyncQueue.enqueueAndForget(async()=>Tp(await wc(g),w)),()=>{j.Za(),g.asyncQueue.enqueueAndForget(async()=>Ip(await wc(g),w))}}(ou(d),f,c,u)}function T1(t,e){return function(r,i){const s=new Mn;return r.asyncQueue.enqueueAndForget(async()=>mP(await TP(r),i,s)),s.promise}(ou(t),e)}function I1(t,e,n){const r=n.docs.get(e._key),i=new Bp(t);return new w1(t,i,e._key,r,new ao(n.hasPendingWrites,n.fromCache),e.converter)}function Zo(){return new Vp("serverTimestamp")}(function(e,n=!0){(function(i){ws=i})(vi),li(new Cr("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new pi(new qA(r.getProvider("auth-internal")),new XA(r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new $(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new qo(d.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),dn(Fy,"4.7.3",e),dn(Fy,"4.7.3","esm2017")})();var WP="firebase",$P="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */dn(WP,$P,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k1="firebasestorage.googleapis.com",HP="storageBucket",KP=2*60*1e3,qP=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn extends vn{constructor(e,n,r=0){super(xd(e),`Firebase Storage: ${n} (${xd(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,xn.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return xd(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var yn;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(yn||(yn={}));function xd(t){return"storage/"+t}function GP(){const t="An unknown error occurred, please check the error payload for server response.";return new xn(yn.UNKNOWN,t)}function QP(){return new xn(yn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function YP(){return new xn(yn.CANCELED,"User canceled the upload/download.")}function XP(t){return new xn(yn.INVALID_URL,"Invalid URL '"+t+"'.")}function JP(t){return new xn(yn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function Tv(t){return new xn(yn.INVALID_ARGUMENT,t)}function A1(){return new xn(yn.APP_DELETED,"The Firebase app was deleted.")}function ZP(t){return new xn(yn.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=Qt.makeFromUrl(e,n)}catch{return new Qt(e,"")}if(r.path==="")return r;throw JP(e)}static makeFromUrl(e,n){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(O){O.path.charAt(O.path.length-1)==="/"&&(O.path_=O.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+i+o,"i"),u={bucket:1,path:3};function d(O){O.path_=decodeURIComponent(O.path)}const f="v[A-Za-z0-9_]+",m=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",b=new RegExp(`^https?://${m}/${f}/b/${i}/o${g}`,"i"),k={bucket:1,path:3},P=n===k1?"(?:storage.googleapis.com|storage.cloud.google.com)":n,j="([^?#]*)",w=new RegExp(`^https?://${P}/${i}/${j}`,"i"),T=[{regex:c,indices:u,postModify:s},{regex:b,indices:k,postModify:d},{regex:w,indices:{bucket:1,path:2},postModify:d}];for(let O=0;O<T.length;O++){const D=T[O],V=D.regex.exec(e);if(V){const E=V[D.indices.bucket];let v=V[D.indices.path];v||(v=""),r=new Qt(E,v),D.postModify(r);break}}if(r==null)throw XP(e);return r}}class ej{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tj(t,e,n){let r=1,i=null,s=null,o=!1,c=0;function u(){return c===2}let d=!1;function f(...j){d||(d=!0,e.apply(null,j))}function m(j){i=setTimeout(()=>{i=null,t(b,u())},j)}function g(){s&&clearTimeout(s)}function b(j,...w){if(d){g();return}if(j){g(),f.call(null,j,...w);return}if(u()||o){g(),f.call(null,j,...w);return}r<64&&(r*=2);let T;c===1?(c=2,T=0):T=(r+Math.random())*1e3,m(T)}let k=!1;function P(j){k||(k=!0,g(),!d&&(i!==null?(j||(c=2),clearTimeout(i),m(0)):j||(c=1)))}return m(0),s=setTimeout(()=>{o=!0,P(!0)},n),P}function nj(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rj(t){return t!==void 0}function Iv(t,e,n,r){if(r<e)throw Tv(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw Tv(`Invalid value for '${t}'. Expected ${n} or less.`)}function ij(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const i=e(r)+"="+e(t[r]);n=n+i+"&"}return n=n.slice(0,-1),n}var Sc;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Sc||(Sc={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sj(t,e){const n=t>=500&&t<600,i=[408,429].indexOf(t)!==-1,s=e.indexOf(t)!==-1;return n||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oj{constructor(e,n,r,i,s,o,c,u,d,f,m,g=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=m,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,k)=>{this.resolve_=b,this.reject_=k,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new ol(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=c=>{const u=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const c=s.getErrorCode()===Sc.NO_ERROR,u=s.getStatus();if(!c||sj(u,this.additionalRetryCodes_)&&this.retry){const f=s.getErrorCode()===Sc.ABORT;r(!1,new ol(!1,null,f));return}const d=this.successCodes_.indexOf(u)!==-1;r(!0,new ol(d,s))})},n=(r,i)=>{const s=this.resolve_,o=this.reject_,c=i.connection;if(i.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());rj(u)?s(u):s()}catch(u){o(u)}else if(c!==null){const u=GP();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(i.canceled){const u=this.appDelete_?A1():YP();o(u)}else{const u=QP();o(u)}};this.canceled_?n(!1,new ol(!1,null,!0)):this.backoffId_=tj(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&nj(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ol{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function aj(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function lj(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function cj(t,e){e&&(t["X-Firebase-GMPID"]=e)}function uj(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function dj(t,e,n,r,i,s,o=!0){const c=ij(t.urlParams),u=t.url+c,d=Object.assign({},t.headers);return cj(d,e),aj(d,n),lj(d,s),uj(d,r),new oj(u,t.method,d,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hj(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function fj(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(e,n){this._service=e,n instanceof Qt?this._location=n:this._location=Qt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new bc(e,n)}get root(){const e=new Qt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return fj(this._location.path)}get storage(){return this._service}get parent(){const e=hj(this._location.path);if(e===null)return null;const n=new Qt(this._location.bucket,e);return new bc(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw ZP(e)}}function kv(t,e){const n=e==null?void 0:e[HP];return n==null?null:Qt.makeFromBucketSpec(n,t)}function pj(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:i}=r;i&&(t._overrideAuthToken=typeof i=="string"?i:gx(i,t.app.options.projectId))}class mj{constructor(e,n,r,i,s){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=k1,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=KP,this._maxUploadRetryTime=qP,this._requests=new Set,i!=null?this._bucket=Qt.makeFromBucketSpec(i,this._host):this._bucket=kv(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Qt.makeFromBucketSpec(this._url,e):this._bucket=kv(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Iv("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Iv("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new bc(this,e)}_makeRequest(e,n,r,i,s=!0){if(this._deleted)return new ej(A1());{const o=dj(e,this._appId,r,i,n,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,i).getPromise()}}const Av="@firebase/storage",Rv="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R1="storage";function gj(t=qf(),e){t=Ke(t);const r=$c(t,R1).getImmediate({identifier:e}),i=fx("storage");return i&&yj(r,...i),r}function yj(t,e,n,r={}){pj(t,e,n,r)}function vj(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new mj(n,r,i,e,vi)}function _j(){li(new Cr(R1,vj,"PUBLIC").setMultipleInstances(!0)),dn(Av,Rv,""),dn(Av,Rv,"esm2017")}_j();const xj={apiKey:"your_api_key_here",authDomain:"your_project.firebaseapp.com",projectId:"your_project_id",storageBucket:"your_project.appspot.com",messagingSenderId:"your_sender_id",appId:"your_app_id"},Wp=my().length===0?_x(xj):my()[0],nn=WA(Wp),Oe=CP(Wp);gj(Wp);const wj="https://bundles.webertech.co.ke",Cv="https://wa.me/254722508904",Pv=[{label:"Home",to:"/",ext:!1},{label:"Cyber",to:"/cyber",ext:!1},{label:"Hustle KE",to:"/hustle",ext:!1},{label:"Academy",to:"/academy",ext:!1},{label:"Electronics",to:"/electronics",ext:!1},{label:"Bundles",to:wj,ext:!0},{label:"Dev",to:"/dev",ext:!1}];function $e(){const[t,e]=C.useState(!1),[n,r]=C.useState(null),[i,s]=C.useState(!1),[o,c]=C.useState(!1),u=yi();C.useEffect(()=>{const m=da(nn,async g=>{if(g)try{const b=await cu(Fr(Oe,"users",g.uid)),k=b.exists()?b.data():{};r({uid:g.uid,email:g.email,...k}),s(k.isAdmin===!0)}catch{r({uid:g.uid,email:g.email})}else r(null),s(!1)});return()=>m()},[]),C.useEffect(()=>{const m=()=>c(window.scrollY>4);return window.addEventListener("scroll",m),()=>window.removeEventListener("scroll",m)},[]);const d=async()=>{await $x(nn),e(!1)},f=m=>!m.startsWith("http")&&u.pathname===m;return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        :root { --nav-h: 62px; }

        .wtn {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 900; height: var(--nav-h);
          background: ${o?"rgba(15,23,42,0.97)":"rgba(15,23,42,0.92)"};
          backdrop-filter: blur(16px);
          border-bottom: 1px solid ${o?"rgba(255,255,255,0.1)":"transparent"};
          box-shadow: ${o?"0 4px 24px rgba(0,0,0,0.3)":"none"};
          transition: all .22s ease;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .wtn-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 20px; height: 100%;
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px;
        }

        /* Logo */
        .wtn-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .wtn-logo-img {
          height: 44px; width: auto;
          display: block;
          transition: opacity .2s;
        }
        @media (max-width: 640px) {
          .wtn-logo-img { height: 34px; }
        }
        .wtn-logo-img:hover { opacity: .85; }
        .wtn-logo-fallback {
          display: flex; align-items: center; gap: 8px;
        }
        .wtn-logo-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: linear-gradient(135deg,#15803d,#16a34a);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; color: #fff; font-size: 16px; flex-shrink: 0;
        }
        .wtn-logo-text {
          font-weight: 800; font-size: 17px; color: #fff; letter-spacing: -.3px;
        }
        .wtn-logo-text span { color: #4ade80; }

        /* Desktop nav links */
        .wtn-links {
          display: flex; align-items: center; gap: 2px;
          flex: 1; justify-content: center;
        }
        .wtn-link {
          padding: 6px 12px; border-radius: 8px;
          text-decoration: none; font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,0.75);
          transition: all .15s; white-space: nowrap;
          border: 1.5px solid transparent;
        }
        .wtn-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .wtn-link.active {
          color: #4ade80; font-weight: 700;
          background: rgba(74,222,128,0.1);
          border-color: rgba(74,222,128,0.25);
        }
        .wtn-link.bundles {
          background: linear-gradient(135deg,#15803d,#16a34a);
          color: #fff !important; font-weight: 700;
          border-radius: 99px; padding: 6px 16px;
          border-color: transparent;
          box-shadow: 0 3px 12px rgba(22,163,74,0.35);
        }
        .wtn-link.bundles:hover { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(22,163,74,0.45); }

        /* WhatsApp Us pill */
        .wtn-wa {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; background: #25d366; border-radius: 99px;
          color: #fff; font-weight: 700; font-size: 13px;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: transform .15s, box-shadow .15s;
          box-shadow: 0 3px 12px rgba(37,211,102,0.35);
        }
        .wtn-wa:hover { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(37,211,102,0.45); }

        /* Auth area */
        .wtn-auth {
          display: flex; align-items: center; gap: 6px; flex-shrink: 0;
        }
        .wtn-auth-link {
          padding: 6px 12px; border-radius: 8px; text-decoration: none;
          font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.7);
          border: 1.5px solid rgba(255,255,255,0.15); transition: all .15s;
        }
        .wtn-auth-link:hover { color: #fff; border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.07); }
        .wtn-auth-admin {
          padding: 5px 10px; background: rgba(251,191,36,0.15);
          border: 1.5px solid rgba(251,191,36,0.3);
          border-radius: 8px; color: #fbbf24;
          font-size: 12px; font-weight: 700; text-decoration: none;
        }
        .wtn-signout {
          padding: 5px 11px; border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 8px; background: none; color: rgba(255,255,255,0.6);
          font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit;
          transition: all .15s;
        }
        .wtn-signout:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

        /* Hamburger */
        .wtn-ham {
          display: none; background: none; border: none;
          color: #fff; font-size: 22px; cursor: pointer;
          padding: 4px; line-height: 1; flex-shrink: 0;
        }

        /* Mobile menu */
        .wtn-menu {
          position: fixed; top: var(--nav-h); left: 0; right: 0; bottom: 0;
          background: rgba(15,23,42,0.98); backdrop-filter: blur(20px);
          z-index: 899; overflow-y: auto;
          padding: 16px 20px 40px;
          font-family: 'Segoe UI', system-ui, sans-serif;
          animation: wtn-down .2s ease both;
        }
        @keyframes wtn-down {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .wtn-mlink {
          display: block; padding: 13px 16px; border-radius: 12px;
          text-decoration: none; font-size: 16px; font-weight: 600;
          color: rgba(255,255,255,0.8); margin-bottom: 6px;
          border: 1px solid transparent; transition: all .15s;
        }
        .wtn-mlink:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .wtn-mlink.active { background: rgba(74,222,128,0.12); color: #4ade80; border-color: rgba(74,222,128,0.2); }
        .wtn-mlink.bundles {
          background: linear-gradient(135deg,#15803d,#16a34a);
          color: #fff !important; border-color: transparent;
        }

        @media (max-width: 1024px) {
          .wtn-links { display: none !important; }
          .wtn-auth  { display: none !important; }
          .wtn-wa    { display: none !important; }
          .wtn-ham   { display: block !important; }
        }
      `}),a.jsx("nav",{className:"wtn",children:a.jsxs("div",{className:"wtn-inner",children:[a.jsxs(re,{to:"/",className:"wtn-logo","aria-label":"WeberTech Home",children:[a.jsx("img",{src:"/logo-webertech.png",alt:"WeberTech Logo",className:"wtn-logo-img",style:{objectFit:"contain"},onError:m=>{m.target.style.display="none",m.target.nextSibling&&(m.target.nextSibling.style.display="flex")}}),a.jsxs("div",{className:"wtn-logo-fallback",style:{display:"none"},children:[a.jsx("div",{className:"wtn-logo-icon",children:"W"}),a.jsxs("span",{className:"wtn-logo-text",children:["Weber",a.jsx("span",{children:"Tech"})]})]})]}),a.jsx("div",{className:"wtn-links",children:Pv.map(m=>m.ext?a.jsxs("a",{href:m.to,target:"_blank",rel:"noreferrer",className:"wtn-link bundles",children:["⚡ ",m.label]},m.label):a.jsx(re,{to:m.to,className:`wtn-link ${f(m.to)?"active":""}`,children:m.label},m.label))}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexShrink:0},children:[a.jsx("a",{href:Cv,target:"_blank",rel:"noreferrer",className:"wtn-wa",children:"💬 WhatsApp Us"}),a.jsx("div",{className:"wtn-auth",children:n?a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.photoURL?a.jsx("img",{src:n.photoURL,alt:"",style:{width:32,height:32,borderRadius:"50%",border:"2px solid #16a34a"}}):a.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:"#16a34a",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800},children:n.firstName?n.firstName[0]:n.email?n.email[0].toUpperCase():"U"}),a.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[a.jsx("span",{style:{fontSize:12,fontWeight:800,color:"#fff",lineHeight:1},children:n.firstName||"Account"}),i&&a.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#fbbf24"},children:"Admin"})]})]}),a.jsx(re,{to:"/dashboard",className:"wtn-auth-link",children:"Dashboard"}),a.jsx("button",{onClick:d,className:"wtn-signout",children:"Sign Out"})]}):a.jsx(re,{to:"/auth/login",className:"wtn-auth-link",children:"Login"})}),a.jsx("button",{className:"wtn-ham",onClick:()=>e(m=>!m),"aria-label":"Menu",children:t?"✕":"☰"})]})]})}),t&&a.jsxs("div",{className:"wtn-menu",children:[Pv.map(m=>m.ext?a.jsxs("a",{href:m.to,target:"_blank",rel:"noreferrer",className:"wtn-mlink bundles",onClick:()=>e(!1),children:["⚡ ",m.label," →"]},m.label):a.jsx(re,{to:m.to,className:`wtn-mlink ${f(m.to)?"active":""}`,onClick:()=>e(!1),children:m.label},m.label)),a.jsx("a",{href:Cv,target:"_blank",rel:"noreferrer",style:{display:"flex",alignItems:"center",gap:8,padding:"13px 16px",background:"#25d366",borderRadius:12,textDecoration:"none",fontSize:16,fontWeight:700,color:"#fff",marginTop:8,marginBottom:6},onClick:()=>e(!1),children:"💬 WhatsApp Us"}),a.jsx("div",{style:{borderTop:"1px solid rgba(255,255,255,0.1)",marginTop:12,paddingTop:16},children:n?a.jsxs(a.Fragment,{children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",marginBottom:12},children:[n.photoURL?a.jsx("img",{src:n.photoURL,alt:"",style:{width:44,height:44,borderRadius:"50%",border:"2px solid #16a34a"}}):a.jsx("div",{style:{width:44,height:44,borderRadius:"50%",background:"#16a34a",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800},children:n.firstName?n.firstName[0]:n.email?n.email[0].toUpperCase():"U"}),a.jsxs("div",{children:[a.jsxs("div",{style:{color:"#fff",fontWeight:800,fontSize:16},children:[n.firstName," ",n.lastName]}),a.jsx("div",{style:{color:"rgba(255,255,255,0.6)",fontSize:13},children:n.email})]})]}),i&&a.jsx(re,{to:"/admin",className:"wtn-mlink",onClick:()=>e(!1),style:{color:"#fbbf24"},children:"⚙ Admin Panel"}),a.jsx(re,{to:"/dashboard",className:"wtn-mlink",onClick:()=>e(!1),children:"📊 My Dashboard"}),a.jsx("button",{onClick:d,style:{width:"100%",padding:"12px 16px",border:"1.5px solid rgba(255,255,255,0.15)",borderRadius:12,background:"none",color:"#fee2e2",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textAlign:"left"},children:"🚪 Sign Out"})]}):a.jsx(re,{to:"/auth/login",className:"wtn-mlink",onClick:()=>e(!1),children:"🔑 Login / Sign Up"})})]})]})}const Ej="https://bundles.webertech.co.ke",Sj="https://wa.me/254722508904",bj=new Date().getFullYear();function He(){return a.jsx("footer",{style:{background:"#0f172a",color:"rgba(255,255,255,0.55)",padding:"52px 20px 28px",fontFamily:"'Segoe UI',system-ui,sans-serif"},children:a.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:40,marginBottom:48},children:[a.jsxs("div",{children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:14},children:[a.jsx("div",{style:{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#15803d,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center"},children:a.jsx("span",{style:{color:"#fff",fontWeight:900,fontSize:17},children:"W"})}),a.jsxs("span",{style:{fontWeight:800,fontSize:18,color:"#fff"},children:["Weber",a.jsx("span",{style:{color:"#4ade80"},children:"Tech"})]})]}),a.jsx("p",{style:{fontSize:13.5,lineHeight:1.7,maxWidth:220,marginBottom:20},children:"Kenya's digital services platform. Bundles, dev, cyber, academy & more — all in one place."}),a.jsx("a",{href:Sj,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:7,padding:"9px 16px",background:"#25d366",borderRadius:9,color:"#fff",fontWeight:700,fontSize:13,textDecoration:"none"},children:"💬 WhatsApp Us"})]}),a.jsxs("div",{children:[a.jsx("h4",{style:{color:"#fff",fontWeight:700,fontSize:13,marginBottom:16,textTransform:"uppercase",letterSpacing:"0.6px"},children:"Services"}),a.jsx("a",{href:Ej,target:"_blank",rel:"noreferrer",style:{display:"block",color:"rgba(255,255,255,0.6)",textDecoration:"none",fontSize:13.5,marginBottom:10},children:"⚡ Safaricom Bundles"}),[["Dev Services","/dev"],["Cyber Services","/cyber"],["Electronics","/electronics"],["Academy","/academy"],["Hustle","/hustle"]].map(([t,e])=>a.jsx(re,{to:e,style:{display:"block",color:"rgba(255,255,255,0.6)",textDecoration:"none",fontSize:13.5,marginBottom:10},children:t},e))]}),a.jsxs("div",{children:[a.jsx("h4",{style:{color:"#fff",fontWeight:700,fontSize:13,marginBottom:16,textTransform:"uppercase",letterSpacing:"0.6px"},children:"Company"}),[["Home","/"],["Dashboard","/dashboard"]].map(([t,e])=>a.jsx(re,{to:e,style:{display:"block",color:"rgba(255,255,255,0.6)",textDecoration:"none",fontSize:13.5,marginBottom:10},children:t},e))]}),a.jsxs("div",{style:{marginTop:"20px",textAlign:"center"},children:[a.jsx(re,{to:"/about",children:"About Us"})," |"," ",a.jsx(re,{to:"/privacy",children:"Privacy Policy"})," |"," ",a.jsx(re,{to:"/terms",children:"Terms & Conditions"})]}),a.jsxs("div",{children:[a.jsx("h4",{style:{color:"#fff",fontWeight:700,fontSize:13,marginBottom:16,textTransform:"uppercase",letterSpacing:"0.6px"},children:"Contact"}),a.jsx("p",{style:{fontSize:13.5,marginBottom:10},children:"✉ support@webertech.co.ke"}),a.jsx("p",{style:{fontSize:13.5,marginBottom:10},children:"📞 +254 722 508 904"}),a.jsx("p",{style:{fontSize:13.5,marginBottom:10},children:"📍 Mombasa, Kenya"})]})]}),a.jsxs("div",{style:{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:22,display:"flex",flexWrap:"wrap",gap:12,alignItems:"center",justifyContent:"space-between"},children:[a.jsxs("p",{style:{fontSize:12.5},children:["© ",bj," WeberTech. All rights reserved."]}),a.jsx("p",{style:{fontSize:12.5},children:"Made with ❤ in Kenya 🇰🇪"})]})]})})}const Dl="https://bundles.webertech.co.ke",jv="https://wa.me/254722508904",kn=[{id:"bundles",emoji:"📡",label:"Bundles",tagline:"Instant Safaricom Bundles via M-PESA",gradient:"linear-gradient(135deg,#064e3b,#065f46,#059669)",accent:"#34d399",href:Dl,ext:!0,items:["Safaricom Data Bundles — from KES 19","Safaricom Minutes Bundles — from KES 20","Safaricom SMS Bundles — from KES 9","Discounted Safaricom Airtime","Buy for yourself or any Safaricom number","Instant delivery in under 10 seconds"]},{id:"cyber",emoji:"🖥️",label:"Cyber Services",tagline:"Government Services & Printing",gradient:"linear-gradient(135deg,#450a0a,#991b1b,#dc2626)",accent:"#fca5a5",to:"/cyber",ext:!1,items:["KRA, HELB, NTSA, eCitizen Services","Colour & B&W Printing","Document Scanning & PDF Creation","Lamination & Binding","Passport Photo Printing","Fast Internet Access"]},{id:"hustle",emoji:"🔥",label:"Hustle KE",tagline:"Start. Grow. Earn. Repeat.",gradient:"linear-gradient(135deg,#431407,#9a3412,#ea580c)",accent:"#fdba74",to:"/hustle",ext:!1,items:["Bundle Reseller Program","AGPO Registration Assistance","CV Writing & Business Plans","Affiliate Commissions","Digital Product Sales","Weekly M-PESA Payouts"]},{id:"academy",emoji:"🎓",label:"Academy",tagline:"Learn Digital Skills & Earn",gradient:"linear-gradient(135deg,#451a03,#92400e,#d97706)",accent:"#fde68a",to:"/academy",ext:!1,items:["Web Development & App Building","Forex & Crypto Trading Signals","Graphic Design & Branding","Digital Marketing & Social Media","Certificate of Completion","Earn While You Learn"]},{id:"electronics",emoji:"📺",label:"Electronics",tagline:"TVs, Phones, Appliances & More",gradient:"linear-gradient(135deg,#1e1b4b,#3730a3,#6366f1)",accent:"#a5b4fc",to:"/electronics",ext:!1,items:["Smartphones & Tablets","TVs, Fridges & Woofers","Accessories & Cables","Electrical Fittings","Genuine Products Only","Delivery Across Kenya"]},{id:"dev",emoji:"💼",label:"Dev Services",tagline:"Websites, Apps & Custom Systems",gradient:"linear-gradient(135deg,#0c4a6e,#0369a1,#0ea5e9)",accent:"#7dd3fc",to:"/dev",ext:!1,items:["Business Websites & Portfolios","E-commerce & Online Stores","Mobile Apps (Android & iOS)","Custom Management Systems","Branding & UI/UX Design","Affordable Kenyan Pricing"]}],Tj=[{q:"How do I buy Safaricom bundles?",a:"Visit bundles.webertech.co.ke, pick your bundle, enter your number, pay via M-PESA STK Push — bundle delivered in under 10 seconds."},{q:"Can I buy bundles for another number?",a:"Yes! Select 'Buy for other number' on the bundles page and enter any Safaricom number. Perfect for family and friends."},{q:"What services does WeberTech offer?",a:"WeberTech offers Safaricom Bundles, Dev Services, Cyber/eCitizen services, Academy training, Electronics, and Hustle KE opportunities — all from Mombasa, Kenya."},{q:"How do I contact support?",a:"WhatsApp us on +254 722 508 904 or email support@webertech.co.ke. Our AI chat is also available 24/7 — click the green tab on the right side of this page."},{q:"Are bundle payments secure?",a:"100% secure. All payments go through Safaricom's official M-PESA STK Push. We never store your PIN."},{q:"What is Hustle KE?",a:"Hustle KE is our reseller & affiliate program. Earn commissions on bundles, get help with AGPO registration, business plans, and weekly M-PESA payouts."}];function Ij(){const[t,e]=C.useState(0),[n,r]=C.useState(null),[i,s]=C.useState("next"),[o,c]=C.useState(!1),u=C.useRef(null),d=C.useCallback((w,x="next")=>{o||w===t||(c(!0),s(x),r(t),e(w),setTimeout(()=>{r(null),c(!1)},500))},[t,o]),f=C.useCallback(()=>d((t+1)%kn.length,"next"),[t,d]),m=C.useCallback(()=>d((t-1+kn.length)%kn.length,"prev"),[t,d]);C.useEffect(()=>(u.current=setInterval(f,3800),()=>clearInterval(u.current)),[f]);const g=()=>clearInterval(u.current),b=()=>{u.current=setInterval(f,3800)},k=kn[t],P=n!==null?kn[n]:null,j=({children:w,style:x})=>k.ext?a.jsx("a",{href:k.href,target:"_blank",rel:"noreferrer",style:x,children:w}):a.jsx(re,{to:k.to,style:x,children:w});return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        @keyframes slideInNext  { from{opacity:0;transform:translateX(60px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes slideInPrev  { from{opacity:0;transform:translateX(-60px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideOutNext { from{opacity:1;transform:translateX(0)}  to{opacity:0;transform:translateX(-60px)} }
        @keyframes slideOutPrev { from{opacity:1;transform:translateX(0)}  to{opacity:0;transform:translateX(60px)}  }
        @keyframes itemIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }

        .hc-card-in-next  { animation: slideInNext  .5s cubic-bezier(.22,1,.36,1) both; }
        .hc-card-in-prev  { animation: slideInPrev  .5s cubic-bezier(.22,1,.36,1) both; }
        .hc-card-out-next { animation: slideOutNext .4s ease both; }
        .hc-card-out-prev { animation: slideOutPrev .4s ease both; }

        .hc-item { animation: itemIn .4s ease both; }
        .hc-item:nth-child(1){animation-delay:.05s}
        .hc-item:nth-child(2){animation-delay:.1s}
        .hc-item:nth-child(3){animation-delay:.15s}
        .hc-item:nth-child(4){animation-delay:.2s}
        .hc-item:nth-child(5){animation-delay:.25s}
        .hc-item:nth-child(6){animation-delay:.3s}

        .hc-dot { transition: all .3s ease; cursor: pointer; border: none; }
        .hc-dot:hover { transform: scale(1.3); }

        .hc-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.3);
          color: #fff; font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all .2s; z-index: 10;
          backdrop-filter: blur(8px);
        }
        .hc-arrow:hover { background: rgba(255,255,255,0.25); transform: translateY(-50%) scale(1.1); }
        .hc-arrow-left  { left: -20px; }
        .hc-arrow-right { right: -20px; }

        .hc-svc-pill {
          padding: 5px 14px; border-radius: 99px; font-size: 12px; font-weight: 700;
          cursor: pointer; transition: all .2s; border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.65);
          font-family: inherit;
        }
        .hc-svc-pill:hover   { background: rgba(255,255,255,0.15); color: #fff; }
        .hc-svc-pill.active  { background: rgba(255,255,255,0.2);  color: #fff; border-color: rgba(255,255,255,0.4); }

        @media(max-width:640px) {
          .hc-arrow { display: none !important; }
        }
      `}),a.jsxs("div",{style:{position:"relative",width:"100%",maxWidth:580},onMouseEnter:g,onMouseLeave:b,children:[a.jsx("button",{className:"hc-arrow hc-arrow-left",onClick:m,children:"‹"}),a.jsxs("div",{style:{position:"relative",overflow:"hidden",borderRadius:24},children:[P&&a.jsx("div",{className:i==="next"?"hc-card-out-next":"hc-card-out-prev",style:{position:"absolute",inset:0,background:P.gradient,borderRadius:24,padding:"36px 32px",pointerEvents:"none"}},`out-${P.id}`),a.jsx(j,{style:{textDecoration:"none",display:"block"},children:a.jsxs("div",{className:o?i==="next"?"hc-card-in-next":"hc-card-in-prev":"",style:{background:k.gradient,borderRadius:24,padding:"36px 32px",boxShadow:"0 24px 64px rgba(0,0,0,0.4)",cursor:"pointer",minHeight:360},children:[a.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20},children:[a.jsx("div",{style:{fontSize:64,lineHeight:1},children:k.emoji}),a.jsxs("div",{style:{background:"rgba(255,255,255,0.15)",borderRadius:99,padding:"5px 14px",fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.9)"},children:[t+1," / ",kn.length]})]}),a.jsx("h2",{style:{color:"#fff",fontWeight:900,fontSize:"clamp(22px,4vw,32px)",letterSpacing:"-0.5px",marginBottom:6},children:k.label}),a.jsx("p",{style:{color:"rgba(255,255,255,0.75)",fontSize:14,marginBottom:24,fontWeight:500},children:k.tagline}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:9},children:k.items.map((w,x)=>a.jsxs("div",{className:"hc-item",style:{display:"flex",alignItems:"center",gap:10,color:"rgba(255,255,255,0.9)",fontSize:13.5},children:[a.jsx("div",{style:{width:20,height:20,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0,color:k.accent},children:"✓"}),w]},x))}),a.jsxs("div",{style:{marginTop:26,display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.18)",border:`1.5px solid ${k.accent}44`,borderRadius:99,padding:"9px 20px",color:"#fff",fontWeight:700,fontSize:13.5},children:["Explore ",k.label," →"]})]},`in-${k.id}`)})]}),a.jsx("button",{className:"hc-arrow hc-arrow-right",onClick:f,children:"›"}),a.jsx("div",{style:{display:"flex",justifyContent:"center",gap:8,marginTop:20},children:kn.map((w,x)=>a.jsx("button",{className:`hc-dot ${x===t?"active":""}`,onClick:()=>d(x,x>t?"next":"prev"),style:{width:x===t?28:8,height:8,borderRadius:99,background:x===t?w.accent:"rgba(255,255,255,0.25)",padding:0}},x))}),a.jsx("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:6,marginTop:14},children:kn.map((w,x)=>a.jsxs("button",{className:`hc-svc-pill ${x===t?"active":""}`,onClick:()=>d(x,x>t?"next":"prev"),style:{background:x===t?`${w.accent}22`:"rgba(255,255,255,0.08)",borderColor:x===t?`${w.accent}55`:"rgba(255,255,255,0.15)",color:x===t?w.accent:"rgba(255,255,255,0.6)"},children:[w.emoji," ",w.label]},x))})]})]})}function kj(){const[t,e]=C.useState(null);return a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:Tj.map((n,r)=>a.jsxs("div",{style:{background:"#fff",border:`1.5px solid ${t===r?"#86efac":"#e5e7eb"}`,borderRadius:14,overflow:"hidden",transition:"border-color .2s"},children:[a.jsxs("button",{onClick:()=>e(t===r?null:r),style:{width:"100%",padding:"16px 20px",textAlign:"left",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:700,fontSize:15,color:"#111827",fontFamily:"inherit",gap:12},children:[a.jsx("span",{children:n.q}),a.jsx("span",{style:{fontSize:22,color:"#16a34a",transform:t===r?"rotate(45deg)":"none",transition:"transform .22s",flexShrink:0},children:"+"})]}),t===r&&a.jsx("div",{style:{padding:"0 20px 16px",color:"#6b7280",fontSize:14,lineHeight:1.7,borderTop:"1px solid #f3f4f6",paddingTop:12},children:n.a})]},r))})}function Aj(){return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        *  { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Segoe UI',system-ui,sans-serif; background:#f9fafb; }
        @keyframes blob { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.06) rotate(3deg)} }

        .home-hero {
          min-height: calc(100vh - 62px);
          background: linear-gradient(135deg,#020617 0%,#0f172a 30%,#14532d 65%,#166534 85%,#15803d 100%);
          display: flex; align-items: center;
          padding: 40px 20px;
          position: relative; overflow: hidden;
        }

        .hero-inner {
          max-width: 1280px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 56px; align-items: center;
        }

        .section-tag {
          display: inline-flex; align-items: center; gap:6px;
          background:#dcfce7; color:#15803d;
          padding:5px 14px; border-radius:99px;
          font-size:12.5px; font-weight:700;
          text-transform:uppercase; letter-spacing:.5px; margin-bottom:16px;
        }

        .svc-card {
          border:1.5px solid #e5e7eb; border-radius:18px;
          padding:22px 18px; background:#fff; text-decoration:none;
          display:block; transition:all .22s;
        }
        .svc-card:hover {
          transform:translateY(-5px);
          box-shadow:0 16px 48px rgba(0,0,0,0.1);
          border-color:#86efac;
        }

        @media(max-width:900px) {
          .hero-inner { grid-template-columns:1fr !important; }
          .hero-text { order:2; text-align:center; }
          .hero-carousel { order:1; }
          .hero-ctas { justify-content:center !important; }
          .hero-stats { justify-content:center !important; }
        }
        @media(max-width:640px) {
          .svc-grid { grid-template-columns:repeat(2,1fr) !important; }
          .home-hero { padding:28px 16px; }
        }
        @media(max-width:420px) {
          .svc-grid { grid-template-columns:1fr !important; }
        }
      `}),a.jsx($e,{}),a.jsxs("section",{className:"home-hero",style:{paddingTop:82},children:[a.jsx("div",{style:{position:"absolute",top:-140,right:-140,width:520,height:520,borderRadius:"50%",background:"rgba(74,222,128,0.06)",animation:"blob 7s ease-in-out infinite",pointerEvents:"none"}}),a.jsx("div",{style:{position:"absolute",bottom:-100,left:-100,width:400,height:400,borderRadius:"50%",background:"rgba(74,222,128,0.04)",animation:"blob 9s ease-in-out infinite 3s",pointerEvents:"none"}}),a.jsx("div",{style:{position:"absolute",top:"35%",left:"38%",width:220,height:220,borderRadius:"50%",background:"rgba(74,222,128,0.03)",animation:"blob 6s ease-in-out infinite 1s",pointerEvents:"none"}}),a.jsxs("div",{className:"hero-inner",children:[a.jsxs("div",{className:"hero-text",children:[a.jsx("div",{style:{marginBottom:24},children:a.jsx("img",{src:"/logo-webertech.png",alt:"WeberTech",style:{height:52,width:"auto",filter:"brightness(0) invert(1)"},onError:t=>t.target.style.display="none"})}),a.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(74,222,128,0.15)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:99,padding:"6px 16px",fontSize:13,fontWeight:600,color:"#4ade80",marginBottom:22},children:[a.jsx("span",{style:{width:7,height:7,borderRadius:"50%",background:"#4ade80",display:"inline-block",animation:"blob 1.5s ease-in-out infinite"}}),"Kenya's One-Stop Digital Hub"]}),a.jsx("h1",{style:{fontSize:"clamp(30px,4.5vw,52px)",fontWeight:900,color:"#fff",lineHeight:1.1,letterSpacing:"-1.5px",marginBottom:16},children:"WeberTech Solutions KE"}),a.jsx("p",{style:{fontSize:"clamp(15px,1.8vw,18px)",marginBottom:8,fontWeight:700,color:"#4ade80"},children:"Your One-Stop Hub for Digital Services"}),a.jsx("p",{style:{fontSize:"clamp(13px,1.5vw,16px)",color:"rgba(255,255,255,0.65)",lineHeight:1.75,maxWidth:460,marginBottom:32},children:"Bundles · Dev · Cyber · Academy · Electronics · Hustle KE — everything digital in one Kenyan platform."}),a.jsx("div",{className:"hero-ctas",style:{display:"flex",flexWrap:"wrap",gap:10,marginBottom:36},children:[{label:"🔥 Explore Hustle KE",href:"/hustle",ext:!1,primary:!0},{label:"📺 Shop Electronics",href:"/electronics",ext:!1,primary:!1},{label:"⚡ Buy Bundles",href:Dl,ext:!0,primary:!1},{label:"🎓 Join Academy",href:"/academy",ext:!1,primary:!1}].map(t=>{const e={display:"inline-flex",alignItems:"center",gap:7,textDecoration:"none",padding:t.primary?"13px 22px":"10px 18px",background:t.primary?"#16a34a":"rgba(255,255,255,0.1)",border:`1.5px solid ${t.primary?"#16a34a":"rgba(255,255,255,0.25)"}`,borderRadius:10,fontWeight:700,fontSize:t.primary?15:13.5,color:"#fff",boxShadow:t.primary?"0 8px 24px rgba(22,163,74,0.4)":"none"};return t.ext?a.jsx("a",{href:t.href,target:"_blank",rel:"noreferrer",style:e,children:t.label},t.label):a.jsx(re,{to:t.href,style:e,children:t.label},t.label)})}),a.jsx("div",{className:"hero-stats",style:{display:"flex",flexWrap:"wrap",gap:24},children:[["⚡","10s","Bundle Delivery"],["✅","99%","Success Rate"],["🤖","24/7","AI Support"],["🔒","100%","M-PESA Secure"]].map(([t,e,n])=>a.jsxs("div",{children:[a.jsxs("div",{style:{fontSize:20,fontWeight:900,color:"#4ade80",display:"flex",alignItems:"center",gap:5},children:[a.jsx("span",{children:t}),e]}),a.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2},children:n})]},n))})]}),a.jsx("div",{className:"hero-carousel",style:{display:"flex",justifyContent:"center"},children:a.jsx(Ij,{})})]})]}),a.jsx("section",{style:{padding:"72px 20px",background:"#f9fafb"},children:a.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:48},children:[a.jsx("div",{className:"section-tag",children:"🌐 Our Services & Products"}),a.jsx("h2",{style:{fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-0.5px",marginBottom:12},children:"Everything You Need in One Place"}),a.jsx("p",{style:{color:"#6b7280",fontSize:16,maxWidth:520,margin:"0 auto"},children:"Digital services for every Kenyan — affordable, instant, and reliable."})]}),a.jsx("div",{className:"svc-grid",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20},children:kn.map(t=>{const e=a.jsxs("div",{className:"svc-card",children:[a.jsx("div",{style:{width:52,height:52,borderRadius:14,background:t.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:14},children:t.emoji}),a.jsx("h3",{style:{fontWeight:800,fontSize:17,marginBottom:6,color:"#111827"},children:t.label}),a.jsx("p",{style:{color:"#6b7280",fontSize:13,lineHeight:1.5,marginBottom:14},children:t.tagline}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:5,marginBottom:16},children:[t.items.slice(0,3).map((n,r)=>a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,fontSize:12.5,color:"#374151"},children:[a.jsx("span",{style:{fontSize:9,fontWeight:900,color:t.accent||"#16a34a",flexShrink:0},children:"●"})," ",n]},r)),t.items.length>3&&a.jsxs("p",{style:{fontSize:12,color:"#9ca3af",marginTop:2},children:["+",t.items.length-3," more"]})]}),a.jsxs("span",{style:{fontSize:13,fontWeight:700,color:t.accent||"#16a34a",display:"flex",alignItems:"center",gap:5},children:["Explore ",t.label," →"]})]});return t.ext?a.jsx("a",{href:t.href,target:"_blank",rel:"noreferrer",style:{textDecoration:"none",display:"block"},children:e},t.id):a.jsx(re,{to:t.to,style:{textDecoration:"none",display:"block"},children:e},t.id)})})]})}),a.jsx("section",{style:{padding:"72px 20px",background:"#fff"},children:a.jsxs("div",{style:{maxWidth:1100,margin:"0 auto"},children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:48},children:[a.jsx("div",{className:"section-tag",children:"✅ How Bundles Work"}),a.jsx("h2",{style:{fontSize:"clamp(22px,4vw,36px)",fontWeight:800,letterSpacing:"-0.5px"},children:"Buy a Bundle in 4 Simple Steps"})]}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:20},children:[{n:"01",t:"Visit Bundles",d:"Go to bundles.webertech.co.ke and pick your data, minutes or SMS bundle."},{n:"02",t:"Enter Numbers",d:"Enter the receiving Safaricom number and your M-PESA payment number."},{n:"03",t:"M-PESA STK Push",d:"Enter your PIN on the M-PESA prompt that appears on your phone."},{n:"04",t:"Instant Delivery",d:"Bundle delivered in under 10 seconds. Done — no queues, no stress."}].map(t=>a.jsxs("div",{style:{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,padding:"24px 20px",transition:"border-color .2s"},onMouseOver:e=>e.currentTarget.style.borderColor="#86efac",onMouseOut:e=>e.currentTarget.style.borderColor="#e5e7eb",children:[a.jsx("div",{style:{fontSize:36,fontWeight:900,color:"#dcfce7",lineHeight:1,marginBottom:12},children:t.n}),a.jsx("h3",{style:{fontWeight:700,fontSize:15.5,marginBottom:8},children:t.t}),a.jsx("p",{style:{color:"#6b7280",fontSize:13.5,lineHeight:1.6},children:t.d})]},t.n))}),a.jsx("div",{style:{textAlign:"center",marginTop:36},children:a.jsx("a",{href:Dl,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 30px",background:"linear-gradient(135deg,#15803d,#16a34a)",borderRadius:12,fontWeight:700,fontSize:15,color:"#fff",textDecoration:"none",boxShadow:"0 8px 24px rgba(22,163,74,0.3)"},children:"⚡ Buy Bundles Now →"})})]})}),a.jsx("section",{style:{padding:"72px 20px",background:"#f9fafb"},children:a.jsxs("div",{style:{maxWidth:1100,margin:"0 auto"},children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:48},children:[a.jsx("div",{className:"section-tag",children:"⭐ Reviews"}),a.jsx("h2",{style:{fontSize:"clamp(22px,4vw,36px)",fontWeight:800,letterSpacing:"-0.5px"},children:"Trusted by Thousands of Kenyans"})]}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:18},children:[{name:"Amina H.",loc:"Mombasa",text:"WeberTech bundle delivery ni ya haraka sana — chini ya sekunde kumi! Ndiyo bora Kenya."},{name:"Brian M.",loc:"Nairobi",text:"Best digital platform in Kenya. Every service I need is right here — fair prices, always reliable."},{name:"John K.",loc:"Kisumu",text:"WeberTech Dev wamenitengenezea website nzuri sana. Bei nafuu, kazi bora."},{name:"Fatuma A.",loc:"Malindi",text:"Academy courses zimesaidia pakubwa. Sasa naweza kutengeneza websites na kupata pesa."}].map(t=>a.jsxs("div",{style:{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,padding:"20px 18px"},children:[a.jsx("div",{style:{fontSize:15,marginBottom:10},children:"⭐⭐⭐⭐⭐"}),a.jsxs("p",{style:{color:"#374151",fontSize:13.5,lineHeight:1.7,marginBottom:14},children:['"',t.text,'"']}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[a.jsx("div",{style:{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#15803d,#4ade80)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:14},children:t.name[0]}),a.jsxs("div",{children:[a.jsx("p",{style:{fontWeight:700,fontSize:13.5},children:t.name}),a.jsx("p",{style:{fontSize:11.5,color:"#9ca3af"},children:t.loc})]})]})]},t.name))})]})}),a.jsx("section",{style:{padding:"72px 20px",background:"#fff"},children:a.jsxs("div",{style:{maxWidth:780,margin:"0 auto"},children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:48},children:[a.jsx("div",{className:"section-tag",children:"❓ FAQs"}),a.jsx("h2",{style:{fontSize:"clamp(22px,4vw,36px)",fontWeight:800,letterSpacing:"-0.5px",marginBottom:12},children:"Frequently Asked Questions"}),a.jsx("p",{style:{color:"#6b7280",fontSize:15},children:"Can't find your answer? Chat with our AI or WhatsApp us directly."})]}),a.jsx(kj,{}),a.jsx("div",{style:{textAlign:"center",marginTop:30},children:a.jsx("a",{href:jv,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",background:"#25d366",borderRadius:11,fontWeight:700,fontSize:15,color:"#fff",textDecoration:"none"},children:"💬 Still have questions? WhatsApp Us"})})]})}),a.jsx("section",{style:{padding:"72px 20px",background:"linear-gradient(135deg,#020617,#0f172a,#14532d,#15803d)"},children:a.jsxs("div",{style:{maxWidth:680,margin:"0 auto",textAlign:"center"},children:[a.jsx("img",{src:"/logo-webertech.png",alt:"WeberTech",style:{height:56,width:"auto",margin:"0 auto 20px",display:"block",filter:"brightness(0) invert(1)"},onError:t=>t.target.style.display="none"}),a.jsx("h2",{style:{fontSize:"clamp(24px,5vw,42px)",fontWeight:900,color:"#fff",letterSpacing:"-1px",marginBottom:14},children:"Ready to Join the WeberTech Ecosystem?"}),a.jsx("p",{style:{color:"rgba(255,255,255,0.7)",fontSize:15.5,lineHeight:1.75,marginBottom:36},children:"Thousands of Kenyans trust WeberTech for fast, affordable digital services. Start today."}),a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:14,justifyContent:"center"},children:[a.jsx("a",{href:Dl,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"14px 28px",background:"#16a34a",borderRadius:12,fontWeight:700,fontSize:15.5,color:"#fff",textDecoration:"none",boxShadow:"0 8px 24px rgba(22,163,74,0.4)"},children:"⚡ Buy Bundles"}),a.jsx("a",{href:jv,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"14px 24px",background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.2)",borderRadius:12,fontWeight:700,fontSize:15.5,color:"#fff",textDecoration:"none"},children:"💬 WhatsApp Us"})]})]})}),a.jsx(He,{})]})}let Rj={data:""},Cj=t=>{if(typeof window=="object"){let e=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return e.nonce=window.__nonce__,e.parentNode||(t||document.head).appendChild(e),e.firstChild}return t||Rj},Pj=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,jj=/\/\*[^]*?\*\/|  +/g,Nv=/\n+/g,dr=(t,e)=>{let n="",r="",i="";for(let s in t){let o=t[s];s[0]=="@"?s[1]=="i"?n=s+" "+o+";":r+=s[1]=="f"?dr(o,s):s+"{"+dr(o,s[1]=="k"?"":e)+"}":typeof o=="object"?r+=dr(o,e?e.replace(/([^,])+/g,c=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,c):c?c+" "+u:u)):s):o!=null&&(s=s[1]=="-"?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=dr.p?dr.p(s,o):s+":"+o+";")}return n+(e&&i?e+"{"+i+"}":i)+r},rr={},C1=t=>{if(typeof t=="object"){let e="";for(let n in t)e+=n+C1(t[n]);return e}return t},Nj=(t,e,n,r,i)=>{let s=C1(t),o=rr[s]||(rr[s]=(u=>{let d=0,f=11;for(;d<u.length;)f=101*f+u.charCodeAt(d++)>>>0;return"go"+f})(s));if(!rr[o]){let u=s!==t?t:(d=>{let f,m,g=[{}];for(;f=Pj.exec(d.replace(jj,""));)f[4]?g.shift():f[3]?(m=f[3].replace(Nv," ").trim(),g.unshift(g[0][m]=g[0][m]||{})):g[0][f[1]]=f[2].replace(Nv," ").trim();return g[0]})(t);rr[o]=dr(i?{["@keyframes "+o]:u}:u,n?"":"."+o)}let c=n&&rr.g;return n&&(rr.g=rr[o]),((u,d,f,m)=>{m?d.data=d.data.replace(m,u):d.data.indexOf(u)===-1&&(d.data=f?u+d.data:d.data+u)})(rr[o],e,r,c),o},Dj=(t,e,n)=>t.reduce((r,i,s)=>{let o=e[s];if(o&&o.call){let c=o(n),u=c&&c.props&&c.props.className||/^go/.test(c)&&c;o=u?"."+u:c&&typeof c=="object"?c.props?"":dr(c,""):c===!1?"":c}return r+i+(o??"")},"");function uu(t){let e=this||{},n=t.call?t(e.p):t;return Nj(n.unshift?n.raw?Dj(n,[].slice.call(arguments,1),e.p):n.reduce((r,i)=>Object.assign(r,i&&i.call?i(e.p):i),{}):n,Cj(e.target),e.g,e.o,e.k)}let P1,Wh,$h;uu.bind({g:1});let qn=uu.bind({k:1});function Oj(t,e,n,r){dr.p=e,P1=t,Wh=n,$h=r}function zr(t,e){let n=this||{};return function(){let r=arguments;function i(s,o){let c=Object.assign({},s),u=c.className||i.className;n.p=Object.assign({theme:Wh&&Wh()},c),n.o=/go\d/.test(u),c.className=uu.apply(n,r)+(u?" "+u:"");let d=t;return t[0]&&(d=c.as||t,delete c.as),$h&&d[0]&&$h(c),P1(d,c)}return i}}var Lj=t=>typeof t=="function",Tc=(t,e)=>Lj(t)?t(e):t,Vj=(()=>{let t=0;return()=>(++t).toString()})(),j1=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),Mj=20,$p="default",N1=(t,e)=>{let{toastLimit:n}=t.settings;switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,n)};case 1:return{...t,toasts:t.toasts.map(o=>o.id===e.toast.id?{...o,...e.toast}:o)};case 2:let{toast:r}=e;return N1(t,{type:t.toasts.find(o=>o.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=e;return{...t,toasts:t.toasts.map(o=>o.id===i||i===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(o=>o.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let s=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+s}))}}},Ol=[],D1={toasts:[],pausedAt:void 0,settings:{toastLimit:Mj}},ln={},O1=(t,e=$p)=>{ln[e]=N1(ln[e]||D1,t),Ol.forEach(([n,r])=>{n===e&&r(ln[e])})},L1=t=>Object.keys(ln).forEach(e=>O1(t,e)),Fj=t=>Object.keys(ln).find(e=>ln[e].toasts.some(n=>n.id===t)),du=(t=$p)=>e=>{O1(e,t)},zj={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Uj=(t={},e=$p)=>{let[n,r]=C.useState(ln[e]||D1),i=C.useRef(ln[e]);C.useEffect(()=>(i.current!==ln[e]&&r(ln[e]),Ol.push([e,r]),()=>{let o=Ol.findIndex(([c])=>c===e);o>-1&&Ol.splice(o,1)}),[e]);let s=n.toasts.map(o=>{var c,u,d;return{...t,...t[o.type],...o,removeDelay:o.removeDelay||((c=t[o.type])==null?void 0:c.removeDelay)||(t==null?void 0:t.removeDelay),duration:o.duration||((u=t[o.type])==null?void 0:u.duration)||(t==null?void 0:t.duration)||zj[o.type],style:{...t.style,...(d=t[o.type])==null?void 0:d.style,...o.style}}});return{...n,toasts:s}},Bj=(t,e="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...n,id:(n==null?void 0:n.id)||Vj()}),_a=t=>(e,n)=>{let r=Bj(e,t,n);return du(r.toasterId||Fj(r.id))({type:2,toast:r}),r.id},oe=(t,e)=>_a("blank")(t,e);oe.error=_a("error");oe.success=_a("success");oe.loading=_a("loading");oe.custom=_a("custom");oe.dismiss=(t,e)=>{let n={type:3,toastId:t};e?du(e)(n):L1(n)};oe.dismissAll=t=>oe.dismiss(void 0,t);oe.remove=(t,e)=>{let n={type:4,toastId:t};e?du(e)(n):L1(n)};oe.removeAll=t=>oe.remove(void 0,t);oe.promise=(t,e,n)=>{let r=oe.loading(e.loading,{...n,...n==null?void 0:n.loading});return typeof t=="function"&&(t=t()),t.then(i=>{let s=e.success?Tc(e.success,i):void 0;return s?oe.success(s,{id:r,...n,...n==null?void 0:n.success}):oe.dismiss(r),i}).catch(i=>{let s=e.error?Tc(e.error,i):void 0;s?oe.error(s,{id:r,...n,...n==null?void 0:n.error}):oe.dismiss(r)}),t};var Wj=1e3,$j=(t,e="default")=>{let{toasts:n,pausedAt:r}=Uj(t,e),i=C.useRef(new Map).current,s=C.useCallback((m,g=Wj)=>{if(i.has(m))return;let b=setTimeout(()=>{i.delete(m),o({type:4,toastId:m})},g);i.set(m,b)},[]);C.useEffect(()=>{if(r)return;let m=Date.now(),g=n.map(b=>{if(b.duration===1/0)return;let k=(b.duration||0)+b.pauseDuration-(m-b.createdAt);if(k<0){b.visible&&oe.dismiss(b.id);return}return setTimeout(()=>oe.dismiss(b.id,e),k)});return()=>{g.forEach(b=>b&&clearTimeout(b))}},[n,r,e]);let o=C.useCallback(du(e),[e]),c=C.useCallback(()=>{o({type:5,time:Date.now()})},[o]),u=C.useCallback((m,g)=>{o({type:1,toast:{id:m,height:g}})},[o]),d=C.useCallback(()=>{r&&o({type:6,time:Date.now()})},[r,o]),f=C.useCallback((m,g)=>{let{reverseOrder:b=!1,gutter:k=8,defaultPosition:P}=g||{},j=n.filter(T=>(T.position||P)===(m.position||P)&&T.height),w=j.findIndex(T=>T.id===m.id),x=j.filter((T,O)=>O<w&&T.visible).length;return j.filter(T=>T.visible).slice(...b?[x+1]:[0,x]).reduce((T,O)=>T+(O.height||0)+k,0)},[n]);return C.useEffect(()=>{n.forEach(m=>{if(m.dismissed)s(m.id,m.removeDelay);else{let g=i.get(m.id);g&&(clearTimeout(g),i.delete(m.id))}})},[n,s]),{toasts:n,handlers:{updateHeight:u,startPause:c,endPause:d,calculateOffset:f}}},Hj=qn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Kj=qn`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,qj=qn`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Gj=zr("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Hj} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Kj} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${qj} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Qj=qn`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Yj=zr("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${Qj} 1s linear infinite;
`,Xj=qn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Jj=qn`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Zj=zr("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Xj} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Jj} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,e5=zr("div")`
  position: absolute;
`,t5=zr("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,n5=qn`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,r5=zr("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${n5} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,i5=({toast:t})=>{let{icon:e,type:n,iconTheme:r}=t;return e!==void 0?typeof e=="string"?C.createElement(r5,null,e):e:n==="blank"?null:C.createElement(t5,null,C.createElement(Yj,{...r}),n!=="loading"&&C.createElement(e5,null,n==="error"?C.createElement(Gj,{...r}):C.createElement(Zj,{...r})))},s5=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,o5=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,a5="0%{opacity:0;} 100%{opacity:1;}",l5="0%{opacity:1;} 100%{opacity:0;}",c5=zr("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,u5=zr("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,d5=(t,e)=>{let n=t.includes("top")?1:-1,[r,i]=j1()?[a5,l5]:[s5(n),o5(n)];return{animation:e?`${qn(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${qn(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},h5=C.memo(({toast:t,position:e,style:n,children:r})=>{let i=t.height?d5(t.position||e||"top-center",t.visible):{opacity:0},s=C.createElement(i5,{toast:t}),o=C.createElement(u5,{...t.ariaProps},Tc(t.message,t));return C.createElement(c5,{className:t.className,style:{...i,...n,...t.style}},typeof r=="function"?r({icon:s,message:o}):C.createElement(C.Fragment,null,s,o))});Oj(C.createElement);var f5=({id:t,className:e,style:n,onHeightUpdate:r,children:i})=>{let s=C.useCallback(o=>{if(o){let c=()=>{let u=o.getBoundingClientRect().height;r(t,u)};c(),new MutationObserver(c).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[t,r]);return C.createElement("div",{ref:s,className:e,style:n},i)},p5=(t,e)=>{let n=t.includes("top"),r=n?{top:0}:{bottom:0},i=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:j1()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(n?1:-1)}px)`,...r,...i}},m5=uu`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,al=16,wi=({reverseOrder:t,position:e="top-center",toastOptions:n,gutter:r,children:i,toasterId:s,containerStyle:o,containerClassName:c})=>{let{toasts:u,handlers:d}=$j(n,s);return C.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:al,left:al,right:al,bottom:al,pointerEvents:"none",...o},className:c,onMouseEnter:d.startPause,onMouseLeave:d.endPause},u.map(f=>{let m=f.position||e,g=d.calculateOffset(f,{reverseOrder:t,gutter:r,defaultPosition:e}),b=p5(m,g);return C.createElement(f5,{id:f.id,key:f.id,onHeightUpdate:d.updateHeight,className:f.visible?m5:"",style:b},f.type==="custom"?Tc(f.message,f):i?i(f):C.createElement(h5,{toast:f,position:m}))}))};const g5="https://wa.me/254722508904";function hu({emoji:t,title:e,subtitle:n,description:r,firestoreCollection:i,fields:s=["name","email"],buttonLabel:o="Notify Me",accentColor:c="#16a34a",accentBg:u="#dcfce7",gradient:d="linear-gradient(135deg,#0f172a,#14532d,#15803d)",features:f=[]}){const[m,g]=C.useState({name:"",email:"",phone:""}),[b,k]=C.useState(!1),[P,j]=C.useState(!1),w=O=>D=>g(V=>({...V,[O]:D.target.value})),x=async()=>{if(s.includes("email")&&!m.email.includes("@")){oe.error("Enter a valid email");return}if(s.includes("phone")&&!/^(\+254|0)?7\d{8}$/.test(m.phone.replace(/\s/g,""))){oe.error("Enter a valid phone number");return}j(!0);try{await b1(It(Oe,i),{...m,page:e,createdAt:Zo()}),k(!0),oe.success("You're on the list! 🎉")}catch{oe.error("Something went wrong. Try again.")}j(!1)},T={width:"100%",padding:"12px 15px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:15,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        @keyframes csblob{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
        @keyframes csspin{to{transform:rotate(360deg)}}
        @keyframes csfade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .cs-fade{animation:csfade .5s ease both}
        @media(max-width:768px){.cs-grid{grid-template-columns:1fr!important}}
      `}),a.jsx(wi,{position:"top-center"}),a.jsx($e,{}),a.jsx("div",{style:{paddingTop:64,minHeight:"100vh",display:"flex",flexDirection:"column"},children:a.jsxs("div",{style:{background:d,padding:"72px 20px 64px",position:"relative",overflow:"hidden",flex:1,display:"flex",alignItems:"center"},children:[a.jsx("div",{style:{position:"absolute",top:-80,right:-80,width:340,height:340,borderRadius:"50%",background:"rgba(255,255,255,0.05)",animation:"csblob 5s ease-in-out infinite"}}),a.jsx("div",{style:{position:"absolute",bottom:-60,left:-60,width:260,height:260,borderRadius:"50%",background:"rgba(255,255,255,0.04)",animation:"csblob 7s ease-in-out infinite 2s"}}),a.jsx("div",{style:{maxWidth:1e3,margin:"0 auto",width:"100%",position:"relative",zIndex:1},children:a.jsxs("div",{className:"cs-grid",style:{display:"grid",gridTemplateColumns:"1fr 400px",gap:60,alignItems:"center"},children:[a.jsxs("div",{className:"cs-fade",children:[a.jsx(re,{to:"/",style:{display:"inline-flex",alignItems:"center",gap:6,color:"rgba(255,255,255,0.6)",fontSize:13,fontWeight:600,textDecoration:"none",marginBottom:28},children:"← Back to Home"}),a.jsx("div",{style:{fontSize:52,marginBottom:16},children:t}),a.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:99,padding:"5px 14px",fontSize:12.5,fontWeight:700,color:"rgba(255,255,255,0.85)",marginBottom:16},children:"🚀 Coming Soon"}),a.jsx("h1",{style:{fontSize:"clamp(28px,6vw,52px)",fontWeight:900,color:"#fff",lineHeight:1.1,letterSpacing:"-1px",marginBottom:14},children:e}),a.jsx("p",{style:{fontSize:16,color:"rgba(255,255,255,0.7)",lineHeight:1.7,maxWidth:480,marginBottom:24},children:r}),f.length>0&&a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10,marginBottom:28},children:f.map(O=>a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,color:"rgba(255,255,255,0.85)",fontSize:14.5},children:[a.jsx("span",{style:{color:"#4ade80"},children:"✓"})," ",O]},O))}),a.jsx("a",{href:g5,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 22px",background:"rgba(255,255,255,0.12)",border:"1.5px solid rgba(255,255,255,0.2)",borderRadius:11,color:"#fff",fontWeight:700,fontSize:14,textDecoration:"none"},children:"💬 Chat on WhatsApp"})]}),a.jsx("div",{style:{background:"#fff",borderRadius:20,padding:"32px 28px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)"},children:b?a.jsxs("div",{style:{textAlign:"center",padding:"20px 0"},children:[a.jsx("div",{style:{fontSize:52,marginBottom:14},children:"🎉"}),a.jsx("h3",{style:{fontWeight:800,fontSize:20,marginBottom:10},children:"You're on the list!"}),a.jsxs("p",{style:{color:"#6b7280",fontSize:14.5,lineHeight:1.6,marginBottom:24},children:["We'll notify you when ",a.jsx("strong",{children:e})," launches."]}),a.jsx(re,{to:"/",style:{display:"inline-flex",alignItems:"center",gap:6,padding:"11px 20px",background:c,borderRadius:10,color:"#fff",fontWeight:700,fontSize:14,textDecoration:"none"},children:"🏠 Back to Home"})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:22},children:[a.jsx("div",{style:{width:48,height:48,borderRadius:14,background:u,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,margin:"0 auto 12px"},children:"🔔"}),a.jsx("h3",{style:{fontWeight:800,fontSize:18,marginBottom:6},children:o}),a.jsx("p",{style:{color:"#6b7280",fontSize:13.5},children:n})]}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[s.includes("name")&&a.jsx("input",{style:T,type:"text",placeholder:"Your Name",value:m.name,onChange:w("name")}),s.includes("email")&&a.jsx("input",{style:T,type:"email",placeholder:"Email Address",value:m.email,onChange:w("email")}),s.includes("phone")&&a.jsx("input",{style:T,type:"tel",placeholder:"Phone Number (07XX XXX XXX)",value:m.phone,onChange:w("phone")}),a.jsx("button",{onClick:x,disabled:P,style:{padding:"13px 0",background:P?"#9ca3af":c,color:"#fff",border:"none",borderRadius:11,fontWeight:700,fontSize:15,cursor:P?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:4,fontFamily:"inherit"},children:P?a.jsx("span",{style:{display:"inline-block",animation:"csspin .7s linear infinite"},children:"⟳"}):o})]}),a.jsx("p",{style:{textAlign:"center",fontSize:12,color:"#9ca3af",marginTop:14},children:"No spam — only launch updates."})]})})]})})]})}),a.jsx(He,{})]})}function y5(){return a.jsx(hu,{emoji:"🎓",title:"WeberTech Academy",subtitle:"Be first to enroll when we launch.",description:"Master digital skills — web development, graphic design, digital marketing & more. Earn certificates and build your freelance career.",firestoreCollection:"academy_waitlist",fields:["name","email","phone"],buttonLabel:"Join Waitlist",accentColor:"#d97706",accentBg:"#fef3c7",gradient:"linear-gradient(135deg,#0f172a,#451a03,#92400e)",features:["Web development & app building","Graphic design & branding","Digital marketing & social media","Earn while you learn — real projects","Certificate of completion"]})}function v5(){return a.jsx(hu,{emoji:"📱",title:"WeberTech Electronics",subtitle:"Get notified when our store goes live.",description:"Quality smartphones, accessories, gadgets & more — delivered across Kenya. Affordable prices, genuine products, M-PESA payments.",firestoreCollection:"electronics_notify",fields:["name","email","phone"],buttonLabel:"Notify Me",accentColor:"#7c3aed",accentBg:"#ede9fe",gradient:"linear-gradient(135deg,#0f172a,#2e1065,#7c3aed)",features:["Smartphones & tablets","Accessories & cables","Genuine products only","M-PESA payments","Delivery across Kenya"]})}function _5({slide:t}){return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .hs-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .hs-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%);
        }
        .hs-content {
          position: absolute;
          top: 50%;
          left: 40px;
          transform: translateY(-50%);
          max-width: 600px;
          z-index: 3;
          color: #fff;
        }
        @media (max-width: 768px) {
          .hs-content {
            bottom: 40px;
            top: auto;
            left: 20px;
            right: 20px;
            transform: none;
            max-width: 100%;
          }
        }
        .hs-title {
          font-size: 48px;
          font-weight: 900;
          margin-bottom: 12px;
          line-height: 1.1;
          letter-spacing: -1px;
        }
        @media (max-width: 768px) {
          .hs-title { font-size: 32px; }
        }
        .hs-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 24px;
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .hs-subtitle { font-size: 15px; margin-bottom: 16px; }
        }
        .hs-description {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .hs-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .hs-buttons { flex-direction: column; }
        }
        .hs-btn {
          padding: 14px 28px;
          border-radius: 10px;
          border: none;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }
        .hs-btn-primary {
          background: #16a34a;
          color: #fff;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.4);
        }
        .hs-btn-primary:hover {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.6);
        }
        .hs-btn-secondary {
          background: rgba(255,255,255,0.15);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.3);
          backdrop-filter: blur(10px);
        }
        .hs-btn-secondary:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-2px);
        }
      `}),a.jsxs("div",{className:"hs-slide",style:{backgroundImage:`url(${t.image})`,backgroundSize:"cover",backgroundPosition:"center"},children:[a.jsx("div",{className:"hs-overlay"}),a.jsxs("div",{className:"hs-content",children:[a.jsx("h2",{className:"hs-title",children:t.title}),t.subtitle&&a.jsx("p",{className:"hs-subtitle",children:t.subtitle}),t.description&&a.jsx("p",{className:"hs-description",children:t.description}),t.features&&t.features.length>0&&a.jsx("div",{style:{marginBottom:24},children:a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(120px, 1fr))",gap:8},children:t.features.map((e,n)=>a.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.85)",padding:"6px 0"},children:["✓ ",e]},n))})}),t.cta&&a.jsxs("div",{className:"hs-buttons",children:[a.jsx("a",{href:t.cta.primary.href,className:"hs-btn hs-btn-primary",children:t.cta.primary.label}),t.cta.secondary&&a.jsx("a",{href:t.cta.secondary.href,className:"hs-btn hs-btn-secondary",children:t.cta.secondary.label})]})]})]})]})}function x5({current:t,total:e,isHovered:n}){return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .hp-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.1);
          z-index: 4;
        }
        .hp-bar {
          height: 100%;
          background: linear-gradient(90deg, #16a34a, #4ade80);
          transition: width 0.3s ease;
          box-shadow: 0 0 10px rgba(22, 163, 74, 0.5);
        }
      `}),a.jsx("div",{className:"hp-container",children:a.jsx("div",{className:"hp-bar",style:{width:`${(t+1)/e*100}%`}})})]})}function w5({onPrev:t,onNext:e,onDotClick:n,currentSlide:r,totalSlides:i}){return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .hc-controls {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 4;
        }
        @media (max-width: 768px) {
          .hc-controls { bottom: 12px; gap: 12px; }
        }
        .hc-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          border: 1.5px solid rgba(255,255,255,0.3);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.2s;
          backdrop-filter: blur(10px);
        }
        .hc-btn:hover {
          background: rgba(0,0,0,0.7);
          border-color: rgba(255,255,255,0.5);
          transform: scale(1.05);
        }
        .hc-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .hc-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: 1.5px solid rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.2s;
        }
        .hc-dot:hover {
          background: rgba(255,255,255,0.5);
          transform: scale(1.1);
        }
        .hc-dot.active {
          background: #16a34a;
          border-color: #16a34a;
          width: 28px;
          border-radius: 6px;
        }
        @media (max-width: 640px) {
          .hc-btn { width: 36px; height: 36px; font-size: 16px; }
          .hc-dot { width: 8px; height: 8px; }
          .hc-dot.active { width: 24px; }
        }
      `}),a.jsxs("div",{className:"hc-controls",children:[a.jsx("button",{className:"hc-btn",onClick:t,"aria-label":"Previous slide",title:"Previous",children:"‹"}),a.jsx("div",{className:"hc-dots",children:Array.from({length:i}).map((s,o)=>a.jsx("button",{className:`hc-dot ${o===r?"active":""}`,onClick:()=>n(o),"aria-label":`Go to slide ${o+1}`,"aria-current":o===r?"true":"false"},o))}),a.jsx("button",{className:"hc-btn",onClick:e,"aria-label":"Next slide",title:"Next",children:"›"})]})]})}function E5({slides:t,autoPlayInterval:e=7e3}){const[n,r]=C.useState(0),[i,s]=C.useState(!1),[o,c]=C.useState(!1),u=C.useRef(null);C.useEffect(()=>{if(!(i||t.length<=1))return u.current=setInterval(()=>{r(g=>(g+1)%t.length)},e),()=>clearInterval(u.current)},[i,t.length,e]);const d=g=>{o||(c(!0),r(g),setTimeout(()=>c(!1),600))},f=()=>{d((n+1)%t.length)},m=()=>{d((n-1+t.length)%t.length)};return!t||t.length===0?a.jsx("div",{style:{height:400,background:"#f3f4f6"}}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .hc-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #000;
        }
        .hc-slides-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          background: #000;
        }
        .hc-slides {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hc-slide-container {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.6s ease-in-out;
          z-index: 1;
        }
        .hc-slide-container.active {
          opacity: 1;
          z-index: 2;
        }
        .hc-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%);
          z-index: 2;
        }
        .hc-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 20px;
          z-index: 3;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: #fff;
        }
        @media (min-width: 768px) {
          .hc-content {
            padding: 60px 40px;
            bottom: auto;
            top: 50%;
            transform: translateY(-50%);
            left: 40px;
            right: auto;
            width: 50%;
            background: none;
          }
        }
        .hc-counter {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          z-index: 4;
          backdrop-filter: blur(10px);
        }
      `}),a.jsxs("div",{className:"hc-container",onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),children:[a.jsx("div",{className:"hc-slides-wrapper",children:a.jsx("div",{className:"hc-slides",children:t.map((g,b)=>a.jsx("div",{className:`hc-slide-container ${b===n?"active":""}`,children:a.jsx(_5,{slide:g})},b))})}),t.length>1&&a.jsxs("div",{className:"hc-counter",children:[n+1," / ",t.length]}),t.length>1&&a.jsx(x5,{current:n,total:t.length,isHovered:i}),t.length>1&&a.jsx(w5,{onPrev:m,onNext:f,onDotClick:d,currentSlide:n,totalSlides:t.length})]})]})}const S5=[{id:"cyber-main",image:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop",title:"WeberTech Cyber",subtitle:"Documents, Government Services & Printing — All in One Place",description:"Your complete digital services hub. From legal documents to government services, printing, and professional writing.",features:["Legal Documents","Government Services","Printing Services","Professional Writing"],cta:{primary:{label:"Browse Legal Documents",href:"/cyber/legal-documents"},secondary:{label:"Explore Services",href:"/cyber/government"}}},{id:"cyber-government",image:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop",title:"Government Services",subtitle:"Fast-track your applications with expert assistance",description:"We handle KRA, NTSA, HELB, SHA, eCitizen, Passport, and Business Registration services.",features:["KRA PIN","NTSA Transfer","HELB","SHA","eCitizen","Passport"],cta:{primary:{label:"Explore Government Services",href:"/cyber/government"},secondary:{label:"Learn More",href:"/cyber"}}},{id:"cyber-business",image:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop",title:"Business Registration",subtitle:"Register your business with expert guidance",description:"Business Names, Limited Companies, NGOs, CBOs, AGPO, Tax Compliance, and Tender Assistance.",features:["Business Names","Limited Companies","NGOs & CBOs","AGPO","Tax Compliance","Tenders"],cta:{primary:{label:"Register Business",href:"/cyber/business"},secondary:{label:"View Services",href:"/cyber"}}},{id:"cyber-documents",image:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop",title:"Legal Documents Marketplace",subtitle:"Professional templates for every situation",description:"Car Sale Agreements, Rental Agreements, Employment Contracts, Loan Agreements, and more. Instant downloads.",features:["Car Sale Agreements","Rental Agreements","Employment Contracts","Loan Agreements","Business Templates","Instant Download"],cta:{primary:{label:"Browse Documents",href:"/cyber/legal-documents"},secondary:{label:"View Pricing",href:"/cyber/legal-documents"}}},{id:"cyber-printing",image:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop",title:"Printing & Document Centre",subtitle:"Professional printing and document services",description:"Colour Printing, Black & White, Scanning, Binding, Lamination, Passport Photos, and Typing services.",features:["Colour Printing","Black & White","Scanning","Binding","Lamination","Passport Photos"],cta:{primary:{label:"Printing Services",href:"/cyber/printing"},secondary:{label:"Get Quote",href:"/cyber/printing"}}},{id:"cyber-writing",image:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop",title:"Professional Writing",subtitle:"Expert writing for your success",description:"CV Writing, Business Plans, Proposal Writing, Reports, Assignments, and Research Editing.",features:["CV Writing","Business Plans","Proposals","Reports","Assignments","Research Editing"],cta:{primary:{label:"Writing Services",href:"/cyber/writing"},secondary:{label:"View Samples",href:"/cyber/writing"}}},{id:"cyber-ai",image:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop",title:"AI Document Tools",subtitle:"Powered by artificial intelligence",description:"AI CV Builder, Proposal Generator, Contract Generator, Letter Generator, and Business Plan Generator.",features:["AI CV Builder","Proposal Generator","Contract Generator","Letter Generator","Business Plan AI"],cta:{primary:{label:"Explore AI Tools",href:"/cyber"},secondary:{label:"Try Demo",href:"/cyber"}}}],V1=[{id:"vehicle",label:"Vehicle Documents",emoji:"🚗"},{id:"land",label:"Land Documents",emoji:"🏞️"},{id:"employment",label:"Employment Documents",emoji:"💼"},{id:"business",label:"Business Documents",emoji:"🏢"},{id:"finance",label:"Finance Documents",emoji:"💰"},{id:"rental",label:"Rental Documents",emoji:"🏠"},{id:"court",label:"Court Documents",emoji:"⚖️"},{id:"templates",label:"Business Templates",emoji:"📄"}],Dv=[{id:"seed-car-sale-agreement",slug:"car-sale-agreement",title:"Car Sale Agreement",category:"legal-document",subcategory:"vehicle",price:199,type:"document",description:"A legally-structured agreement for the sale of a motor vehicle between two parties in Kenya, covering price, condition, ownership transfer and liability.",features:["Editable Word format","Covers buyer & seller details","Vehicle condition clause","Payment terms section","Ready in minutes"],includes:["1 editable .docx file","Instructions for use"],downloadFile:"",image:"🚗",status:"active"},{id:"seed-motorcycle-sale-agreement",slug:"motorcycle-sale-agreement",title:"Motorcycle Sale Agreement",category:"legal-document",subcategory:"vehicle",price:149,type:"document",description:"Sale agreement template for boda bodas and motorcycles, covering ownership transfer and logbook handover terms.",features:["Editable Word format","Boda boda specific clauses","Logbook transfer terms"],includes:["1 editable .docx file"],downloadFile:"",image:"🏍️",status:"active"},{id:"seed-land-sale-agreement",slug:"land-sale-agreement",title:"Land Sale Agreement",category:"legal-document",subcategory:"land",price:299,type:"document",description:"Comprehensive land sale agreement template covering plot details, purchase price, payment schedule and transfer conditions.",features:["Editable Word format","Payment schedule table","Transfer conditions","Witness section"],includes:["1 editable .docx file"],downloadFile:"",image:"🏞️",status:"active"},{id:"seed-rental-agreement",slug:"rental-agreement",title:"Residential Rental Agreement",category:"legal-document",subcategory:"rental",price:199,type:"document",description:"Standard residential tenancy agreement covering rent, deposit, house rules and termination notice.",features:["Editable Word format","Deposit & rent clauses","House rules section","Notice period terms"],includes:["1 editable .docx file"],downloadFile:"",image:"🏠",status:"active"},{id:"seed-commercial-lease",slug:"commercial-lease-agreement",title:"Commercial Lease Agreement",category:"legal-document",subcategory:"rental",price:349,type:"document",description:"Lease agreement template for commercial premises — shops, offices and business space.",features:["Editable Word format","Business-use clauses","Escalation clause","Maintenance responsibilities"],includes:["1 editable .docx file"],downloadFile:"",image:"🏬",status:"active"},{id:"seed-employment-contract",slug:"employment-contract",title:"Employment Contract",category:"legal-document",subcategory:"employment",price:249,type:"document",description:"Standard Kenyan employment contract covering duties, remuneration, leave and termination, aligned to the Employment Act.",features:["Editable Word format","Employment Act aligned","Probation clause","Termination terms"],includes:["1 editable .docx file"],downloadFile:"",image:"📋",status:"active"},{id:"seed-nda",slug:"non-disclosure-agreement",title:"Non-Disclosure Agreement (NDA)",category:"legal-document",subcategory:"employment",price:199,type:"document",description:"Mutual NDA template to protect confidential business information shared between two parties.",features:["Editable Word format","Mutual confidentiality clause","Duration & remedies section"],includes:["1 editable .docx file"],downloadFile:"",image:"🤝",status:"active"},{id:"seed-partnership-agreement",slug:"partnership-agreement",title:"Partnership Agreement",category:"legal-document",subcategory:"business",price:349,type:"document",description:"Business partnership agreement covering profit sharing, roles, capital contribution and exit terms.",features:["Editable Word format","Profit-sharing table","Roles & responsibilities","Exit clause"],includes:["1 editable .docx file"],downloadFile:"",image:"🏢",status:"active"},{id:"seed-loan-agreement",slug:"loan-agreement",title:"Loan Agreement",category:"legal-document",subcategory:"finance",price:199,type:"document",description:"Personal or business loan agreement covering principal, interest, repayment schedule and default terms.",features:["Editable Word format","Repayment schedule","Interest clause","Default & remedy terms"],includes:["1 editable .docx file"],downloadFile:"",image:"💰",status:"active"},{id:"seed-demand-letter",slug:"demand-letter",title:"Demand Letter",category:"legal-document",subcategory:"court",price:149,type:"document",description:"Formal demand letter template for recovering debts or enforcing an agreement before pursuing court action.",features:["Editable Word format","Formal legal tone","Clear deadline clause"],includes:["1 editable .docx file"],downloadFile:"",image:"✉️",status:"active"},{id:"seed-invoice-template",slug:"invoice-template",title:"Invoice Template",category:"legal-document",subcategory:"templates",price:99,type:"document",description:"Clean, professional invoice template for Kenyan SMEs — editable in Word and Excel.",features:["Editable Word & Excel","Auto total calculation","Business branding area"],includes:["1 .docx + 1 .xlsx file"],downloadFile:"",image:"🧾",status:"active"},{id:"seed-quotation-template",slug:"quotation-template",title:"Quotation Template",category:"legal-document",subcategory:"templates",price:99,type:"document",description:"Professional quotation template for sending price quotes to clients quickly.",features:["Editable Word & Excel","Itemized pricing table","Terms & validity section"],includes:["1 .docx + 1 .xlsx file"],downloadFile:"",image:"📃",status:"active"}],b5="https://wa.me/254722508904",T5=[{emoji:"📄",label:"Legal Documents Hub",desc:"Buy ready-made legal & business documents",to:"/cyber/legal-documents",live:!0},{emoji:"🏛️",label:"Government Services",desc:"KRA, NTSA, HELB, SHA, eCitizen assistance",to:"/cyber/government",live:!0},{emoji:"🏢",label:"Business Services",desc:"Registration, AGPO, compliance, tenders",to:"/cyber/business",live:!0},{emoji:"✍️",label:"Professional Writing",desc:"CVs, cover letters, proposals, reports",to:"/cyber/writing",live:!0},{emoji:"🖨️",label:"Printing Centre",desc:"Colour, B&W, scanning, lamination, binding",to:"/cyber/printing",live:!0},{emoji:"🤖",label:"AI Document Tools",desc:"AI CV builder, proposal & contract generator",to:"/cyber",live:!1}];function I5(){return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        @keyframes cyfade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .cy-fade{animation:cyfade .5s ease both}
        .cy-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
        .cy-card{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;padding:22px;text-decoration:none;color:inherit;transition:transform .15s,box-shadow .15s;display:block}
        .cy-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,0.08)}
        .cy-card.coming-soon{opacity:0.6;cursor:not-allowed}
        .cy-card.coming-soon:hover{transform:none;box-shadow:none}
        .cy-badge{display:inline-flex;align-items:center;gap:4px;background:#16a34a;color:#fff;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700;margin-top:8px}
      `}),a.jsx($e,{}),a.jsx("div",{style:{marginTop:62},children:a.jsx(E5,{slides:S5,autoPlayInterval:7e3})}),a.jsx("div",{style:{paddingTop:60,paddingBottom:80,background:"#f9fafb"},children:a.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:"0 20px"},children:[a.jsxs("div",{style:{marginBottom:60},children:[a.jsxs("div",{className:"cy-fade",style:{marginBottom:32},children:[a.jsx("h2",{style:{fontSize:32,fontWeight:900,color:"#111827",marginBottom:8},children:"Our Services"}),a.jsx("p",{style:{fontSize:16,color:"#6b7280"},children:"Everything you need in one platform"})]}),a.jsx("div",{className:"cy-grid",children:T5.map((t,e)=>a.jsxs(re,{to:t.to,className:`cy-card ${t.live?"":"coming-soon"}`,style:{pointerEvents:t.live?"auto":"none"},children:[a.jsx("div",{style:{fontSize:32,marginBottom:12},children:t.emoji}),a.jsx("h3",{style:{fontSize:16,fontWeight:800,color:"#111827",marginBottom:6},children:t.label}),a.jsx("p",{style:{fontSize:13,color:"#6b7280",lineHeight:1.5},children:t.desc}),!t.live&&a.jsx("div",{className:"cy-badge",children:"Coming Soon"})]},e))})]}),a.jsxs("div",{style:{marginBottom:60},children:[a.jsxs("div",{className:"cy-fade",style:{marginBottom:32},children:[a.jsx("h2",{style:{fontSize:32,fontWeight:900,color:"#111827",marginBottom:8},children:"Popular Documents"}),a.jsx("p",{style:{fontSize:16,color:"#6b7280"},children:"Browse our most popular legal templates"})]}),a.jsx("div",{className:"cy-grid",children:V1.slice(0,6).map((t,e)=>a.jsxs(re,{to:`/cyber/legal-documents?category=${t.slug}`,className:"cy-card",children:[a.jsx("div",{style:{fontSize:32,marginBottom:12},children:t.emoji}),a.jsx("h3",{style:{fontSize:16,fontWeight:800,color:"#111827",marginBottom:6},children:t.name}),a.jsx("p",{style:{fontSize:13,color:"#6b7280",lineHeight:1.5},children:t.description}),a.jsxs("div",{style:{fontSize:12,color:"#16a34a",fontWeight:700,marginTop:12},children:[t.count," documents →"]})]},e))})]}),a.jsxs("div",{style:{background:"linear-gradient(135deg,#16a34a,#15803d)",borderRadius:20,padding:40,textAlign:"center",color:"#fff"},children:[a.jsx("h2",{style:{fontSize:28,fontWeight:900,marginBottom:12},children:"Need Help?"}),a.jsx("p",{style:{fontSize:16,marginBottom:24,opacity:.9},children:"Our support team is ready to assist you with any questions or requests."}),a.jsx("a",{href:b5,target:"_blank",rel:"noreferrer",style:{display:"inline-block",padding:"14px 32px",background:"#fff",color:"#16a34a",borderRadius:12,fontWeight:800,textDecoration:"none",transition:"transform .15s"},onMouseEnter:t=>t.target.style.transform="translateY(-2px)",onMouseLeave:t=>t.target.style.transform="none",children:"💬 WhatsApp Us"})]})]})}),a.jsx(He,{})]})}function M1(){const[t,e]=C.useState(Dv),[n,r]=C.useState(!0),[i,s]=C.useState("seed");return C.useEffect(()=>{let o=!1;return(async()=>{try{const c=Ht(It(Oe,"products"),Gr("category","==","legal-document"),Gr("status","==","active")),u=await Kt(c);if(o)return;if(!u.empty){const d=u.docs.map(m=>({id:m.id,...m.data()})),f=new Map(Dv.map(m=>[m.slug,m]));d.forEach(m=>f.set(m.slug,m)),e([...f.values()]),s("firestore+seed")}}catch(c){console.warn("Falling back to seed legal documents — Firestore fetch failed:",c.message)}finally{o||r(!1)}})(),()=>{o=!0}},[]),{products:t,loading:n,source:i}}function k5(){const{products:t,loading:e}=M1(),[n,r]=YT(),i=n.get("category")||"all",[s,o]=C.useState(""),c=C.useMemo(()=>t.filter(u=>{const d=i==="all"||u.subcategory===i,f=!s||u.title.toLowerCase().includes(s.toLowerCase());return d&&f}),[t,i,s]);return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .ld-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:18px}
        .ld-card{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;display:block;transition:transform .15s,box-shadow .15s}
        .ld-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,0.08)}
        .ld-chip{padding:8px 15px;border-radius:99px;font-size:13px;font-weight:700;border:1.5px solid #e5e7eb;background:#fff;color:#374151;cursor:pointer;white-space:nowrap}
        .ld-chip.active{background:#111827;color:#fff;border-color:#111827}
      `}),a.jsx($e,{}),a.jsxs("div",{style:{paddingTop:64,minHeight:"80vh"},children:[a.jsxs("div",{style:{background:"#0f172a",padding:"44px 20px 32px",textAlign:"center"},children:[a.jsx(re,{to:"/cyber",style:{color:"rgba(255,255,255,0.6)",fontSize:13,fontWeight:600,textDecoration:"none"},children:"← Cyber Home"}),a.jsx("h1",{style:{color:"#fff",fontSize:"clamp(24px,5vw,36px)",fontWeight:900,margin:"10px 0 8px"},children:"Legal Documents Hub"}),a.jsx("p",{style:{color:"rgba(255,255,255,0.65)",fontSize:14.5},children:"Ready-made legal & business documents — pay and download instantly."})]}),a.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",padding:"28px 20px"},children:[a.jsx("input",{type:"text",placeholder:"🔍 Search documents (e.g. car sale, rental...)",value:s,onChange:u=>o(u.target.value),style:{width:"100%",padding:"13px 16px",border:"1.5px solid #e5e7eb",borderRadius:12,fontSize:14.5,marginBottom:18,boxSizing:"border-box",fontFamily:"inherit"}}),a.jsxs("div",{style:{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:22},children:[a.jsx("button",{className:`ld-chip ${i==="all"?"active":""}`,onClick:()=>r({}),children:"All"}),V1.map(u=>a.jsxs("button",{className:`ld-chip ${i===u.id?"active":""}`,onClick:()=>r({category:u.id}),children:[u.emoji," ",u.label]},u.id))]}),e&&a.jsx("p",{style:{color:"#9ca3af",fontSize:13.5},children:"Loading documents…"}),!e&&c.length===0&&a.jsx("p",{style:{color:"#9ca3af",fontSize:13.5},children:"No documents found. Try a different search or category."}),a.jsx("div",{className:"ld-grid",children:c.map(u=>a.jsxs(re,{to:`/cyber/legal-documents/${u.slug}`,className:"ld-card",children:[a.jsx("div",{style:{background:"#f9fafb",padding:"28px 0",textAlign:"center",fontSize:40},children:u.image}),a.jsxs("div",{style:{padding:16},children:[a.jsx("div",{style:{fontWeight:800,fontSize:14.5,color:"#111827",marginBottom:6},children:u.title}),a.jsx("div",{style:{fontSize:12.5,color:"#6b7280",lineHeight:1.5,marginBottom:10,height:36,overflow:"hidden"},children:u.description}),a.jsxs("div",{style:{fontWeight:900,fontSize:16,color:"#16a34a"},children:["KES ",u.price.toLocaleString()]})]})]},u.slug))})]})]}),a.jsx(He,{})]})}const A5=[{id:"nestlink",label:"NestLink",desc:"M-PESA STK push to your phone",emoji:"📲",available:!0},{id:"intasend",label:"IntaSend",desc:"M-PESA or Card — choose on next screen",emoji:"💳",available:!0},{id:"safaricom",label:"Safaricom M-PESA",desc:"Direct Daraja checkout",emoji:"🟢",available:!1}];function R5({selected:t,onSelect:e}){return a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:A5.map(n=>{const r=t===n.id;return a.jsxs("button",{type:"button",disabled:!n.available,onClick:()=>n.available&&e(n.id),style:{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",borderRadius:12,border:r?"2px solid #16a34a":"1.5px solid #e5e7eb",background:r?"#f0fdf4":n.available?"#fff":"#f9fafb",cursor:n.available?"pointer":"not-allowed",opacity:n.available?1:.55,textAlign:"left",fontFamily:"inherit",width:"100%"},children:[a.jsx("span",{style:{fontSize:22},children:n.emoji}),a.jsxs("span",{style:{flex:1},children:[a.jsxs("div",{style:{fontWeight:700,fontSize:14.5,color:"#111827"},children:[n.label," ",!n.available&&a.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",marginLeft:6},children:"COMING SOON"})]}),a.jsx("div",{style:{fontSize:12.5,color:"#6b7280"},children:n.desc})]}),r&&a.jsx("span",{style:{color:"#16a34a",fontWeight:900},children:"✓"})]},n.id)})})}const Gs={width:"100%",padding:"11px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14.5,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};function C5({product:t,onPay:e,submitting:n}){var P,j;const[r,i]=C.useState(null),[s,o]=C.useState(""),[c,u]=C.useState(""),[d,f]=C.useState(""),[m,g]=C.useState(""),b=w=>/^(\+254|254|0)?7\d{8}$/.test(w.replace(/\s+/g,"")),k=()=>{if(!r)return oe.error("Choose a payment method");if(r==="nestlink"&&!b(s))return oe.error("Enter a valid M-PESA number");if(r==="intasend"&&!c.includes("@"))return oe.error("Enter a valid email");e({method:r,phone:s,email:c,firstName:d,lastName:m})};return a.jsxs("div",{children:[a.jsxs("div",{style:{background:"#f9fafb",borderRadius:12,padding:"14px 16px",marginBottom:18,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:13,color:"#6b7280"},children:"You're buying"}),a.jsx("div",{style:{fontWeight:800,fontSize:15.5,color:"#111827"},children:t.title})]}),a.jsxs("div",{style:{fontWeight:900,fontSize:20,color:"#16a34a"},children:["KES ",(P=t.price)==null?void 0:P.toLocaleString()]})]}),a.jsx("div",{style:{fontWeight:700,fontSize:13.5,color:"#374151",marginBottom:10},children:"Choose payment method"}),a.jsx(R5,{selected:r,onSelect:i}),r==="nestlink"&&a.jsxs("div",{style:{marginTop:16},children:[a.jsx("label",{style:{fontSize:12.5,fontWeight:600,color:"#6b7280"},children:"M-PESA Phone Number"}),a.jsx("input",{style:{...Gs,marginTop:6},type:"tel",placeholder:"07XX XXX XXX",value:s,onChange:w=>o(w.target.value)})]}),r==="intasend"&&a.jsxs("div",{style:{marginTop:16,display:"flex",flexDirection:"column",gap:10},children:[a.jsxs("div",{children:[a.jsx("label",{style:{fontSize:12.5,fontWeight:600,color:"#6b7280"},children:"Email Address"}),a.jsx("input",{style:{...Gs,marginTop:6},type:"email",placeholder:"you@example.com",value:c,onChange:w=>u(w.target.value)})]}),a.jsxs("div",{style:{display:"flex",gap:10},children:[a.jsx("input",{style:Gs,type:"text",placeholder:"First Name",value:d,onChange:w=>f(w.target.value)}),a.jsx("input",{style:Gs,type:"text",placeholder:"Last Name",value:m,onChange:w=>g(w.target.value)})]}),a.jsxs("div",{children:[a.jsx("label",{style:{fontSize:12.5,fontWeight:600,color:"#6b7280"},children:"Phone (optional, for M-PESA)"}),a.jsx("input",{style:{...Gs,marginTop:6},type:"tel",placeholder:"07XX XXX XXX",value:s,onChange:w=>o(w.target.value)})]})]}),a.jsx("button",{onClick:k,disabled:n||!r,style:{width:"100%",marginTop:20,padding:"14px 0",background:n||!r?"#9ca3af":"#16a34a",color:"#fff",border:"none",borderRadius:12,fontWeight:800,fontSize:15.5,cursor:n||!r?"not-allowed":"pointer",fontFamily:"inherit"},children:n?"Processing…":`Pay KES ${(j=t.price)==null?void 0:j.toLocaleString()}`}),a.jsx("p",{style:{textAlign:"center",fontSize:11.5,color:"#9ca3af",marginTop:10},children:"Secured checkout · Powered by WeberPay"})]})}function P5({step:t,method:e,message:n,checkoutUrl:r,product:i,onRetry:s,onClose:o}){return t==="starting"?a.jsxs(Ys,{children:[a.jsx(wd,{}),a.jsx("h3",{style:Qs,children:"Starting payment…"}),a.jsx("p",{style:ki,children:"Setting things up, one moment."})]}):t==="awaiting"&&e==="intasend"&&r?a.jsxs(Ys,{children:[a.jsx("div",{style:{fontSize:40,marginBottom:10},children:"💳"}),a.jsx("h3",{style:Qs,children:"Complete your payment"}),a.jsx("p",{style:ki,children:"We'll open IntaSend's secure page where you can pay by M-PESA or card."}),a.jsx("a",{href:r,target:"_blank",rel:"noreferrer",style:{display:"inline-block",marginTop:14,padding:"12px 24px",background:"#16a34a",color:"#fff",borderRadius:10,fontWeight:800,fontSize:14.5,textDecoration:"none"},children:"Open Secure Checkout →"}),a.jsx("p",{style:{...ki,marginTop:16,fontSize:12.5},children:"Waiting for payment confirmation…"}),a.jsx(wd,{small:!0})]}):t==="awaiting"?a.jsxs(Ys,{children:[a.jsx(wd,{}),a.jsx("h3",{style:Qs,children:"Check your phone"}),a.jsxs("p",{style:ki,children:["Enter your M-PESA PIN on the prompt to complete payment for ",a.jsx("strong",{children:i==null?void 0:i.title}),"."]})]}):t==="paid"?a.jsxs(Ys,{children:[a.jsx("div",{style:{fontSize:46,marginBottom:10},children:"🎉"}),a.jsx("h3",{style:Qs,children:"Payment successful!"}),a.jsxs("p",{style:ki,children:[i==null?void 0:i.title," is unlocked. Check your dashboard for the download / order status."]}),a.jsx("button",{onClick:o,style:Ov,children:"Done"})]}):t==="failed"?a.jsxs(Ys,{children:[a.jsx("div",{style:{fontSize:46,marginBottom:10},children:"⚠️"}),a.jsx("h3",{style:Qs,children:"Payment didn't go through"}),a.jsx("p",{style:ki,children:n||"Something went wrong. Please try again."}),a.jsx("button",{onClick:s,style:Ov,children:"Try Again"})]}):null}const Qs={fontWeight:800,fontSize:18,margin:"0 0 8px"},ki={color:"#6b7280",fontSize:13.5,lineHeight:1.6,maxWidth:320,margin:"0 auto"},Ov={marginTop:16,padding:"11px 24px",background:"#16a34a",color:"#fff",border:"none",borderRadius:10,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"};function Ys({children:t}){return a.jsx("div",{style:{textAlign:"center",padding:"20px 10px"},children:t})}function wd({small:t}){const e=t?20:36;return a.jsxs(a.Fragment,{children:[a.jsx("div",{style:{width:e,height:e,border:"3px solid #e5e7eb",borderTopColor:"#16a34a",borderRadius:"50%",margin:t?"10px auto 0":"0 auto 14px",animation:"wtpspin .8s linear infinite"}}),a.jsx("style",{children:"@keyframes wtpspin{to{transform:rotate(360deg)}}"})]})}async function j5({phone:t,amount:e,product:n,customer:r}){const i=await fetch("/api/payments/nestlink-run-prompt",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t,amount:e,productId:n.id,productSlug:n.slug,productTitle:n.title,type:n.type,customerId:(r==null?void 0:r.uid)||null,customerName:(r==null?void 0:r.name)||"",customerEmail:(r==null?void 0:r.email)||""})}),s=await i.json();if(!i.ok)throw new Error(s.error||"NestLink payment failed to start");return s}async function N5({amount:t,email:e,phone:n,firstName:r,lastName:i,product:s,customer:o}){const c=await fetch("/api/payments/intasend-checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({amount:t,email:e,phone:n,firstName:r,lastName:i,productId:s.id,productSlug:s.slug,productTitle:s.title,type:s.type,customerId:(o==null?void 0:o.uid)||null,customerName:(o==null?void 0:o.name)||""})}),u=await c.json();if(!c.ok)throw new Error(u.error||"IntaSend checkout failed to start");return u}function D5(t,e,n){const r=Fr(Oe,"orders",t);return BP(r,i=>{if(!i.exists())return;const s=i.data();e({status:s.status,paymentMethod:s.paymentMethod,amount:s.amount,productTitle:s.productTitle,failReason:s.failReason||null})},i=>{console.warn("orders onSnapshot failed, falling back to polling:",i),n==null||n(i)})}async function O5(t){const e=await fetch(`/api/payments/order-status?orderId=${encodeURIComponent(t)}`);if(!e.ok)throw new Error("Could not fetch order status");return e.json()}function L5(t,e,n=3e3){let r=!1;const i=async()=>{if(!r)try{const s=await O5(t);e(s),s.status==="pending"&&setTimeout(i,n)}catch{setTimeout(i,n)}};return i(),()=>{r=!0}}const Ed={step:"idle",orderId:null,method:null,message:"",checkoutUrl:null};function V5(){const[t,e]=C.useState(Ed),n=C.useRef(null),r=C.useCallback(()=>{n.current&&(n.current(),n.current=null)},[]),i=C.useCallback(c=>{e(u=>({...u,step:"awaiting",orderId:c})),n.current=D5(c,u=>{u.status==="paid"?(e(d=>({...d,step:"paid",message:"Payment confirmed!"})),r()):u.status==="failed"&&(e(d=>({...d,step:"failed",message:u.failReason||"Payment failed"})),r())},()=>{L5(c,u=>{u.status==="paid"?e(d=>({...d,step:"paid",message:"Payment confirmed!"})):u.status==="failed"&&e(d=>({...d,step:"failed",message:u.failReason||"Payment failed"}))})})},[r]),s=C.useCallback(async({method:c,product:u,phone:d,email:f,firstName:m,lastName:g,customer:b})=>{e({...Ed,step:"starting",method:c});try{if(c==="nestlink"){const{orderId:k}=await j5({phone:d,amount:u.price,product:u,customer:b});i(k)}else if(c==="intasend"){const{orderId:k,checkoutUrl:P}=await N5({amount:u.price,email:f,phone:d,firstName:m,lastName:g,product:u,customer:b});e(j=>({...j,orderId:k,checkoutUrl:P})),i(k)}else throw new Error("Unknown or unavailable payment method")}catch(k){e(P=>({...P,step:"failed",message:k.message||"Payment failed to start"}))}},[i]),o=C.useCallback(()=>{r(),e(Ed)},[r]);return{state:t,pay:s,reset:o}}function M5({open:t,onClose:e,product:n,customer:r}){const{state:i,pay:s,reset:o}=V5();if(C.useEffect(()=>{t||o()},[t]),!t)return null;const c=i.step==="starting"||i.step==="awaiting";return a.jsxs("div",{onClick:e,style:{position:"fixed",inset:0,background:"rgba(15,23,42,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:16},children:[a.jsx(wi,{position:"top-center"}),a.jsxs("div",{onClick:u=>u.stopPropagation(),style:{background:"#fff",borderRadius:18,padding:"26px 24px",width:"100%",maxWidth:420,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 30px 70px rgba(0,0,0,0.3)",position:"relative"},children:[a.jsx("button",{onClick:e,style:{position:"absolute",top:14,right:14,width:30,height:30,borderRadius:"50%",border:"none",background:"#f3f4f6",cursor:"pointer",fontSize:16,color:"#6b7280"},children:"✕"}),a.jsx("h2",{style:{fontWeight:900,fontSize:19,marginBottom:18,paddingRight:24},children:i.step==="idle"?"Checkout":"WeberPay"}),i.step==="idle"?a.jsx(C5,{product:n,submitting:c,onPay:u=>s({...u,product:n,customer:r})}):a.jsx(P5,{step:i.step,method:i.method,message:i.message,checkoutUrl:i.checkoutUrl,product:n,onRetry:o,onClose:e})]})]})}function F5(){const{slug:t}=ET(),{products:e,loading:n}=M1(),[r,i]=C.useState(!1),[s,o]=C.useState(null);C.useEffect(()=>{const d=da(nn,async f=>{if(!f)return o(null);try{const m=await cu(Fr(Oe,"users",f.uid)),g=m.exists()?m.data():{};o({uid:f.uid,email:f.email,name:g.name||g.firstName||""})}catch{o({uid:f.uid,email:f.email,name:""})}});return()=>d()},[]);const c=e.find(d=>d.slug===t),u=e.filter(d=>d.slug!==t&&d.subcategory===(c==null?void 0:c.subcategory)).slice(0,3);return n&&!c?a.jsxs(a.Fragment,{children:[a.jsx($e,{}),a.jsx("div",{style:{paddingTop:120,textAlign:"center",color:"#9ca3af"},children:"Loading…"}),a.jsx(He,{})]}):c?a.jsxs(a.Fragment,{children:[a.jsx($e,{}),a.jsxs("div",{style:{paddingTop:64},children:[a.jsx("div",{style:{background:"#0f172a",padding:"36px 20px 30px"},children:a.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[a.jsxs("div",{style:{fontSize:12.5,color:"rgba(255,255,255,0.5)",marginBottom:10},children:[a.jsx(re,{to:"/cyber",style:{color:"inherit",textDecoration:"none"},children:"Cyber"})," "," / ",a.jsx(re,{to:"/cyber/legal-documents",style:{color:"inherit",textDecoration:"none"},children:"Legal Documents"})," "," / ",a.jsx("span",{style:{color:"rgba(255,255,255,0.8)"},children:c.title})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[a.jsx("div",{style:{fontSize:44},children:c.image}),a.jsxs("div",{children:[a.jsx("h1",{style:{color:"#fff",fontSize:"clamp(22px,4.5vw,32px)",fontWeight:900,marginBottom:4},children:c.title}),a.jsx("p",{style:{color:"rgba(255,255,255,0.65)",fontSize:14},children:"Instant download after payment"})]})]})]})}),a.jsxs("div",{style:{maxWidth:900,margin:"0 auto",padding:"32px 20px",display:"grid",gridTemplateColumns:"1fr 300px",gap:32},children:[a.jsxs("div",{children:[a.jsx("h2",{style:ll,children:"Description"}),a.jsx("p",{style:{color:"#374151",fontSize:14.5,lineHeight:1.8,marginBottom:26},children:c.description}),a.jsx("h2",{style:ll,children:"Features"}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginBottom:26},children:(c.features||[]).map(d=>a.jsxs("div",{style:{display:"flex",gap:8,fontSize:13.5,color:"#374151"},children:[a.jsx("span",{style:{color:"#16a34a"},children:"✓"})," ",d]},d))}),a.jsx("h2",{style:ll,children:"What's Included"}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginBottom:26},children:(c.includes||[]).map(d=>a.jsxs("div",{style:{display:"flex",gap:8,fontSize:13.5,color:"#374151"},children:[a.jsx("span",{style:{color:"#16a34a"},children:"📎"})," ",d]},d))}),u.length>0&&a.jsxs(a.Fragment,{children:[a.jsx("h2",{style:ll,children:"Related Documents"}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:u.map(d=>a.jsxs(re,{to:`/cyber/legal-documents/${d.slug}`,style:{fontSize:13.5,color:"#16a34a",fontWeight:600,textDecoration:"none"},children:[d.image," ",d.title," — KES ",d.price.toLocaleString()]},d.slug))})]})]}),a.jsx("div",{children:a.jsxs("div",{style:{position:"sticky",top:80,background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,padding:22,boxShadow:"0 10px 30px rgba(0,0,0,0.06)"},children:[a.jsxs("div",{style:{fontWeight:900,fontSize:26,color:"#16a34a",marginBottom:4},children:["KES ",c.price.toLocaleString()]}),a.jsx("div",{style:{fontSize:12.5,color:"#9ca3af",marginBottom:16},children:"One-time payment"}),a.jsx("button",{onClick:()=>i(!0),style:{width:"100%",padding:"14px 0",background:"#16a34a",color:"#fff",border:"none",borderRadius:12,fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"inherit"},children:"Buy & Download"}),a.jsx("p",{style:{fontSize:11.5,color:"#9ca3af",textAlign:"center",marginTop:10},children:"Secured by WeberPay · NestLink or IntaSend"})]})})]})]}),a.jsx(He,{}),a.jsx(M5,{open:r,onClose:()=>i(!1),product:{id:c.id,slug:c.slug,title:c.title,price:c.price,type:c.type},customer:s})]}):a.jsxs(a.Fragment,{children:[a.jsx($e,{}),a.jsxs("div",{style:{paddingTop:120,textAlign:"center"},children:[a.jsx("h2",{style:{fontWeight:900,fontSize:22,marginBottom:10},children:"Document not found"}),a.jsx(re,{to:"/cyber/legal-documents",style:{color:"#16a34a",fontWeight:700,textDecoration:"none"},children:"← Back to Legal Documents"})]}),a.jsx(He,{})]})}const ll={fontWeight:800,fontSize:16,color:"#111827",marginBottom:12},z5=[{id:"kra",emoji:"🏛️",name:"KRA Services",desc:"PIN registration, tax returns, VAT, iTax assistance",items:["KRA PIN Registration","PIN Retrieval","Tax Returns","Nil Returns","VAT Registration","Tax Compliance Certificate"],price:"From KES 500"},{id:"ntsa",emoji:"🚗",name:"NTSA Services",desc:"Driving license, logbook, vehicle inspection",items:["Smart DL Renewal","Driving License Application","Logbook Transfer","Vehicle Search","Vehicle Inspection Booking"],price:"From KES 300"},{id:"helb",emoji:"🎓",name:"HELB Services",desc:"Loan applications, status checks, appeals",items:["First Time Application","Subsequent Application","Loan Appeal","Loan Status","Compliance Certificate"],price:"From KES 400"},{id:"sha",emoji:"🏥",name:"SHA Services",desc:"Registration, employer setup, contributions",items:["Registration","Employer Registration","Dependants Update","Contributions","Benefit Verification"],price:"From KES 350"},{id:"nssf",emoji:"💼",name:"NSSF Services",desc:"Registration, contributions, employer services",items:["Registration","Contributions","Employer Services","Statements"],price:"From KES 300"},{id:"ecitizen",emoji:"📋",name:"eCitizen Services",desc:"Passport, birth certificate, business registration",items:["Passport","Good Conduct","Birth Certificate","Marriage Certificate","Business Registration"],price:"From KES 500"},{id:"immigration",emoji:"✈️",name:"Immigration Services",desc:"Passport, visa, work permit, travel documents",items:["Passport","Visa","Work Permit","Alien Card","Travel Documents"],price:"From KES 1000"},{id:"crb",emoji:"📊",name:"CRB Services",desc:"Credit clearance, credit report, credit status",items:["Clearance","Credit Report","Credit Status"],price:"From KES 200"}];function U5(){return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        @keyframes cyfade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .cy-fade { animation: cyfade .5s ease both; }
        .cy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
        .cy-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; text-decoration: none; color: inherit; transition: transform .15s, box-shadow .15s; display: block; }
        .cy-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(0,0,0,0.08); }
      `}),a.jsx($e,{}),a.jsxs("div",{style:{paddingTop:64},children:[a.jsx("div",{style:{background:"linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",padding:"68px 20px 56px",textAlign:"center"},children:a.jsxs("div",{className:"cy-fade",style:{maxWidth:720,margin:"0 auto"},children:[a.jsx("h1",{style:{fontSize:"clamp(28px,6vw,46px)",fontWeight:900,color:"#fff",marginBottom:14,letterSpacing:"-1px"},children:"Government Services"}),a.jsx("p",{style:{fontSize:16,color:"rgba(255,255,255,0.75)",lineHeight:1.7,marginBottom:26},children:"Get help with KRA, NTSA, HELB, SHA, NSSF, eCitizen, Immigration, and CRB services. Professional assistance from start to finish."}),a.jsx(re,{to:"/cyber",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 26px",background:"#fff",color:"#1e40af",borderRadius:12,fontWeight:800,fontSize:14.5,textDecoration:"none"},children:"← Back to Cyber"})]})}),a.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",padding:"48px 20px"},children:[a.jsx("h2",{style:{fontWeight:900,fontSize:24,marginBottom:20,color:"#111827"},children:"All Government Services"}),a.jsx("div",{className:"cy-grid",children:z5.map(t=>a.jsxs("div",{className:"cy-card",children:[a.jsx("div",{style:{fontSize:40,marginBottom:12},children:t.emoji}),a.jsx("div",{style:{fontWeight:800,fontSize:16.5,color:"#111827",marginBottom:6},children:t.name}),a.jsx("div",{style:{fontSize:13,color:"#6b7280",lineHeight:1.6,marginBottom:12},children:t.desc}),a.jsxs("div",{style:{fontSize:12.5,color:"#9ca3af",marginBottom:12},children:[t.items.slice(0,3).map((e,n)=>a.jsxs("div",{children:["• ",e]},n)),t.items.length>3&&a.jsxs("div",{style:{marginTop:4,color:"#6b7280"},children:["+ ",t.items.length-3," more"]})]}),a.jsx("div",{style:{fontWeight:800,fontSize:14,color:"#16a34a",marginTop:12},children:t.price})]},t.id))})]}),a.jsxs("div",{style:{padding:"48px 20px",textAlign:"center",background:"#f9fafb"},children:[a.jsx("h3",{style:{fontWeight:900,fontSize:22,marginBottom:10,color:"#111827"},children:"Need help with a government service?"}),a.jsx("p",{style:{color:"#6b7280",fontSize:14.5,marginBottom:20},children:"Chat with our team on WhatsApp to discuss your specific needs."}),a.jsx("a",{href:"https://wa.me/254722508904",target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",background:"#25d366",color:"#fff",borderRadius:11,fontWeight:700,fontSize:14,textDecoration:"none"},children:"💬 Chat with us on WhatsApp"})]})]}),a.jsx(He,{})]})}const B5=[{id:"registration",emoji:"📝",name:"Company Registration",desc:"Business name, limited company, NGO, CBO, society",items:["Business Name Search & Registration","Limited Company Registration","NGO Registration","CBO Registration","Society Registration"],price:"From KES 1000"},{id:"agpo",emoji:"🏆",name:"AGPO Registration",desc:"Affirmative Action Group membership & compliance",items:["AGPO Registration","Membership Renewal","Compliance Certification","Directory Listing"],price:"From KES 800"},{id:"tax",emoji:"📊",name:"Tax Compliance",desc:"KRA compliance, tax planning, returns filing",items:["Tax Compliance Certificate","Business Tax Planning","Annual Returns Filing","Tax Audit Preparation"],price:"From KES 1500"},{id:"tenders",emoji:"🎯",name:"Tender Assistance",desc:"Bid preparation, documentation, submission",items:["Tender Search & Identification","Bid Preparation","Documentation","Submission Support"],price:"From KES 2000"},{id:"plans",emoji:"📋",name:"Business Plans",desc:"Professional business plan writing & strategy",items:["Business Plan Writing","Financial Projections","Market Analysis","Executive Summary"],price:"From KES 3000"},{id:"profiles",emoji:"🏢",name:"Company Profiles",desc:"Professional company profile & branding documents",items:["Company Profile Design","Branding Guidelines","Letterhead & Stationery","Presentation Deck"],price:"From KES 2500"},{id:"kebs",emoji:"✓",name:"KEBS Registration",desc:"Kenya Bureau of Standards certification",items:["KEBS Registration","Quality Certification","Compliance Audit","Renewal Support"],price:"From KES 2000"},{id:"nca",emoji:"📡",name:"NCA Registration",desc:"Communications Authority licensing & compliance",items:["NCA License Application","Compliance Reporting","Renewal Support"],price:"From KES 1500"}];function W5(){return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        @keyframes cyfade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .cy-fade { animation: cyfade .5s ease both; }
        .cy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
        .cy-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; text-decoration: none; color: inherit; transition: transform .15s, box-shadow .15s; display: block; }
        .cy-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(0,0,0,0.08); }
      `}),a.jsx($e,{}),a.jsxs("div",{style:{paddingTop:64},children:[a.jsx("div",{style:{background:"linear-gradient(135deg,#0f172a,#7c2d12,#ea580c)",padding:"68px 20px 56px",textAlign:"center"},children:a.jsxs("div",{className:"cy-fade",style:{maxWidth:720,margin:"0 auto"},children:[a.jsx("h1",{style:{fontSize:"clamp(28px,6vw,46px)",fontWeight:900,color:"#fff",marginBottom:14,letterSpacing:"-1px"},children:"Business Services"}),a.jsx("p",{style:{fontSize:16,color:"rgba(255,255,255,0.75)",lineHeight:1.7,marginBottom:26},children:"Company registration, AGPO membership, tax compliance, tender assistance, and professional business documents."}),a.jsx(re,{to:"/cyber",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 26px",background:"#fff",color:"#7c2d12",borderRadius:12,fontWeight:800,fontSize:14.5,textDecoration:"none"},children:"← Back to Cyber"})]})}),a.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",padding:"48px 20px"},children:[a.jsx("h2",{style:{fontWeight:900,fontSize:24,marginBottom:20,color:"#111827"},children:"All Business Services"}),a.jsx("div",{className:"cy-grid",children:B5.map(t=>a.jsxs("div",{className:"cy-card",children:[a.jsx("div",{style:{fontSize:40,marginBottom:12},children:t.emoji}),a.jsx("div",{style:{fontWeight:800,fontSize:16.5,color:"#111827",marginBottom:6},children:t.name}),a.jsx("div",{style:{fontSize:13,color:"#6b7280",lineHeight:1.6,marginBottom:12},children:t.desc}),a.jsxs("div",{style:{fontSize:12.5,color:"#9ca3af",marginBottom:12},children:[t.items.slice(0,3).map((e,n)=>a.jsxs("div",{children:["• ",e]},n)),t.items.length>3&&a.jsxs("div",{style:{marginTop:4,color:"#6b7280"},children:["+ ",t.items.length-3," more"]})]}),a.jsx("div",{style:{fontWeight:800,fontSize:14,color:"#ea580c",marginTop:12},children:t.price})]},t.id))})]}),a.jsxs("div",{style:{padding:"48px 20px",textAlign:"center",background:"#f9fafb"},children:[a.jsx("h3",{style:{fontWeight:900,fontSize:22,marginBottom:10,color:"#111827"},children:"Ready to grow your business?"}),a.jsx("p",{style:{color:"#6b7280",fontSize:14.5,marginBottom:20},children:"Our team can help you navigate business registration, compliance, and growth."}),a.jsx("a",{href:"https://wa.me/254722508904",target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",background:"#25d366",color:"#fff",borderRadius:11,fontWeight:700,fontSize:14,textDecoration:"none"},children:"💬 Chat with us on WhatsApp"})]})]}),a.jsx(He,{})]})}const $5=[{id:"colour",emoji:"🎨",name:"Colour Printing",desc:"High-quality colour printing for documents, photos, posters",items:["A4 Colour Printing","A3 Colour Printing","Poster Printing","Photo Printing","Flyer Printing"],price:"From KES 10/page"},{id:"bw",emoji:"⬛",name:"Black & White",desc:"Fast, affordable B&W printing for documents",items:["A4 B&W Printing","A3 B&W Printing","Document Printing","Bulk Printing"],price:"From KES 3/page"},{id:"scanning",emoji:"📸",name:"Scanning & PDF",desc:"Professional document scanning and PDF conversion",items:["Document Scanning","PDF Conversion","Batch Scanning","High-Resolution Scan"],price:"From KES 5/page"},{id:"passport",emoji:"📷",name:"Passport Photos",desc:"Professional passport photo printing",items:["Passport Photos (4x6)","Visa Photos","ID Photos","Professional Headshots"],price:"From KES 100"},{id:"lamination",emoji:"💎",name:"Lamination",desc:"Protect documents with professional lamination",items:["A4 Lamination","A3 Lamination","ID Card Lamination","Photo Lamination"],price:"From KES 50"},{id:"binding",emoji:"📚",name:"Binding & Finishing",desc:"Professional binding, spiral binding, comb binding",items:["Spiral Binding","Comb Binding","Thermal Binding","Stapling & Punching"],price:"From KES 100"},{id:"copying",emoji:"📋",name:"Photocopying",desc:"Fast, accurate photocopying services",items:["A4 Photocopying","A3 Photocopying","Colour Copying","Bulk Copying"],price:"From KES 2/copy"},{id:"design",emoji:"✏️",name:"Design & Editing",desc:"Document editing, design, and layout services",items:["Document Editing","Layout Design","Poster Design","Flyer Design"],price:"From KES 500"}];function H5(){return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        @keyframes cyfade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .cy-fade { animation: cyfade .5s ease both; }
        .cy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
        .cy-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; text-decoration: none; color: inherit; transition: transform .15s, box-shadow .15s; display: block; }
        .cy-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(0,0,0,0.08); }
      `}),a.jsx($e,{}),a.jsxs("div",{style:{paddingTop:64},children:[a.jsx("div",{style:{background:"linear-gradient(135deg,#0f172a,#4c0519,#be185d)",padding:"68px 20px 56px",textAlign:"center"},children:a.jsxs("div",{className:"cy-fade",style:{maxWidth:720,margin:"0 auto"},children:[a.jsx("h1",{style:{fontSize:"clamp(28px,6vw,46px)",fontWeight:900,color:"#fff",marginBottom:14,letterSpacing:"-1px"},children:"Printing Centre"}),a.jsx("p",{style:{fontSize:16,color:"rgba(255,255,255,0.75)",lineHeight:1.7,marginBottom:26},children:"Professional printing, scanning, lamination, binding, and design services. Fast turnaround, quality guaranteed."}),a.jsx(re,{to:"/cyber",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 26px",background:"#fff",color:"#4c0519",borderRadius:12,fontWeight:800,fontSize:14.5,textDecoration:"none"},children:"← Back to Cyber"})]})}),a.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",padding:"48px 20px"},children:[a.jsx("h2",{style:{fontWeight:900,fontSize:24,marginBottom:20,color:"#111827"},children:"Our Printing Services"}),a.jsx("div",{className:"cy-grid",children:$5.map(t=>a.jsxs("div",{className:"cy-card",children:[a.jsx("div",{style:{fontSize:40,marginBottom:12},children:t.emoji}),a.jsx("div",{style:{fontWeight:800,fontSize:16.5,color:"#111827",marginBottom:6},children:t.name}),a.jsx("div",{style:{fontSize:13,color:"#6b7280",lineHeight:1.6,marginBottom:12},children:t.desc}),a.jsxs("div",{style:{fontSize:12.5,color:"#9ca3af",marginBottom:12},children:[t.items.slice(0,3).map((e,n)=>a.jsxs("div",{children:["• ",e]},n)),t.items.length>3&&a.jsxs("div",{style:{marginTop:4,color:"#6b7280"},children:["+ ",t.items.length-3," more"]})]}),a.jsx("div",{style:{fontWeight:800,fontSize:14,color:"#be185d",marginTop:12},children:t.price})]},t.id))})]}),a.jsxs("div",{style:{padding:"48px 20px",textAlign:"center",background:"#f9fafb"},children:[a.jsx("h3",{style:{fontWeight:900,fontSize:22,marginBottom:10,color:"#111827"},children:"Need printing done today?"}),a.jsx("p",{style:{color:"#6b7280",fontSize:14.5,marginBottom:20},children:"Visit us at WeberTech Cyber or order online with fast delivery."}),a.jsx("a",{href:"https://wa.me/254722508904",target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",background:"#25d366",color:"#fff",borderRadius:11,fontWeight:700,fontSize:14,textDecoration:"none"},children:"💬 Chat with us on WhatsApp"})]})]}),a.jsx(He,{})]})}const K5=[{id:"cv",emoji:"📄",name:"CV Writing",desc:"Professional, ATS-optimized CV that gets interviews",items:["CV Writing from Scratch","CV Rewrite & Optimization","ATS Optimization","LinkedIn Profile Optimization"],price:"From KES 1500"},{id:"cover",emoji:"✉️",name:"Cover Letters",desc:"Compelling cover letters tailored to job descriptions",items:["Cover Letter Writing","Job-Specific Tailoring","Multiple Versions","Email Cover Letter"],price:"From KES 800"},{id:"proposals",emoji:"📋",name:"Business Proposals",desc:"Professional proposals for clients and projects",items:["Proposal Writing","Project Proposal","Bid Proposal","Service Proposal"],price:"From KES 2500"},{id:"reports",emoji:"📊",name:"Report Writing",desc:"Professional reports, research papers, white papers",items:["Business Report","Research Report","White Paper","Technical Report"],price:"From KES 3000"},{id:"editing",emoji:"✏️",name:"Editing & Proofreading",desc:"Professional editing, proofreading, and formatting",items:["Proofreading","Copy Editing","Content Editing","Formatting & Layout"],price:"From KES 1000"},{id:"grant",emoji:"🎯",name:"Grant Writing",desc:"Compelling grant proposals for funding",items:["Grant Proposal Writing","Funding Application","Project Narrative","Budget Justification"],price:"From KES 4000"},{id:"business-plan",emoji:"📈",name:"Business Plans",desc:"Comprehensive business plans for startups and growth",items:["Business Plan Writing","Financial Projections","Market Analysis","Executive Summary"],price:"From KES 3500"},{id:"assignments",emoji:"🎓",name:"Academic Writing",desc:"Essays, assignments, thesis support, research editing",items:["Essay Writing","Assignment Help","Thesis Support","Research Editing"],price:"From KES 1500"}];function q5(){return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        @keyframes cyfade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .cy-fade { animation: cyfade .5s ease both; }
        .cy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
        .cy-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; text-decoration: none; color: inherit; transition: transform .15s, box-shadow .15s; display: block; }
        .cy-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(0,0,0,0.08); }
      `}),a.jsx($e,{}),a.jsxs("div",{style:{paddingTop:64},children:[a.jsx("div",{style:{background:"linear-gradient(135deg,#0f172a,#1e3a8a,#3b82f6)",padding:"68px 20px 56px",textAlign:"center"},children:a.jsxs("div",{className:"cy-fade",style:{maxWidth:720,margin:"0 auto"},children:[a.jsx("h1",{style:{fontSize:"clamp(28px,6vw,46px)",fontWeight:900,color:"#fff",marginBottom:14,letterSpacing:"-1px"},children:"Professional Writing Services"}),a.jsx("p",{style:{fontSize:16,color:"rgba(255,255,255,0.75)",lineHeight:1.7,marginBottom:26},children:"Expert writers for CVs, cover letters, proposals, reports, and more. Get noticed with professional writing."}),a.jsx(re,{to:"/cyber",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 26px",background:"#fff",color:"#1e3a8a",borderRadius:12,fontWeight:800,fontSize:14.5,textDecoration:"none"},children:"← Back to Cyber"})]})}),a.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",padding:"48px 20px"},children:[a.jsx("h2",{style:{fontWeight:900,fontSize:24,marginBottom:20,color:"#111827"},children:"Writing Services"}),a.jsx("div",{className:"cy-grid",children:K5.map(t=>a.jsxs("div",{className:"cy-card",children:[a.jsx("div",{style:{fontSize:40,marginBottom:12},children:t.emoji}),a.jsx("div",{style:{fontWeight:800,fontSize:16.5,color:"#111827",marginBottom:6},children:t.name}),a.jsx("div",{style:{fontSize:13,color:"#6b7280",lineHeight:1.6,marginBottom:12},children:t.desc}),a.jsxs("div",{style:{fontSize:12.5,color:"#9ca3af",marginBottom:12},children:[t.items.slice(0,3).map((e,n)=>a.jsxs("div",{children:["• ",e]},n)),t.items.length>3&&a.jsxs("div",{style:{marginTop:4,color:"#6b7280"},children:["+ ",t.items.length-3," more"]})]}),a.jsx("div",{style:{fontWeight:800,fontSize:14,color:"#3b82f6",marginTop:12},children:t.price})]},t.id))})]}),a.jsxs("div",{style:{padding:"48px 20px",textAlign:"center",background:"#f9fafb"},children:[a.jsx("h3",{style:{fontWeight:900,fontSize:22,marginBottom:10,color:"#111827"},children:"Ready to make an impact with your writing?"}),a.jsx("p",{style:{color:"#6b7280",fontSize:14.5,marginBottom:20},children:"Our professional writers are ready to help you succeed."}),a.jsx("a",{href:"https://wa.me/254722508904",target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",background:"#25d366",color:"#fff",borderRadius:11,fontWeight:700,fontSize:14,textDecoration:"none"},children:"💬 Chat with us on WhatsApp"})]})]}),a.jsx(He,{})]})}function G5(){const[t,e]=C.useState(""),[n,r]=C.useState(""),[i,s]=C.useState(!1),o=sa(),c=async d=>{d.preventDefault(),s(!0);try{await Ak(nn,t,n),oe.success("Welcome back!"),o("/dashboard")}catch(f){oe.error(f.message||"Login failed")}s(!1)},u=async()=>{const d=new Cn;try{await Jk(nn,d),oe.success("Welcome back!"),o("/dashboard")}catch(f){oe.error(f.message||"Google login failed")}};return a.jsxs(a.Fragment,{children:[a.jsx($e,{}),a.jsx(wi,{}),a.jsx("div",{style:Q5,children:a.jsxs("div",{style:Y5,children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[a.jsx("h1",{style:X5,children:"Welcome Back"}),a.jsx("p",{style:J5,children:"Log in to your WeberTech account"})]}),a.jsxs("form",{onSubmit:c,style:Z5,children:[a.jsxs("div",{style:Lv,children:[a.jsx("label",{style:Vv,children:"Email Address"}),a.jsx("input",{type:"email",required:!0,value:t,onChange:d=>e(d.target.value),style:Mv,placeholder:"you@example.com"})]}),a.jsxs("div",{style:Lv,children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsx("label",{style:Vv,children:"Password"}),a.jsx(re,{to:"/auth/forgot-password",style:eN,children:"Forgot password?"})]}),a.jsx("input",{type:"password",required:!0,value:n,onChange:d=>r(d.target.value),style:Mv,placeholder:"••••••••"})]}),a.jsx("button",{type:"submit",disabled:i,style:tN,children:i?"Logging in...":"Log In"})]}),a.jsx("div",{style:nN,children:a.jsx("span",{style:rN,children:"or continue with"})}),a.jsxs("button",{onClick:u,style:iN,children:[a.jsx("img",{src:"https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",alt:"Google",style:{width:18}}),"Google"]}),a.jsxs("p",{style:sN,children:["Don't have an account? ",a.jsx(re,{to:"/auth/register",style:oN,children:"Sign up"})]})]})}),a.jsx(He,{})]})}const Q5={paddingTop:120,paddingBottom:80,background:"#f9fafb",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},Y5={background:"#fff",padding:40,borderRadius:20,boxShadow:"0 10px 25px rgba(0,0,0,0.05)",width:"100%",maxWidth:420},X5={fontWeight:900,fontSize:28,color:"#111827",marginBottom:8,letterSpacing:"-0.5px"},J5={color:"#6b7280",fontSize:14.5},Z5={display:"flex",flexDirection:"column",gap:20,marginTop:24},Lv={display:"flex",flexDirection:"column",gap:8},Vv={fontSize:13,fontWeight:700,color:"#374151"},Mv={padding:"12px 16px",borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14.5,outline:"none",transition:"border-color 0.2s"},eN={fontSize:12.5,color:"#16a34a",fontWeight:700,textDecoration:"none"},tN={padding:"13px",borderRadius:12,border:"none",background:"#16a34a",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",transition:"opacity 0.2s"},nN={position:"relative",textAlign:"center",margin:"24px 0"},rN={background:"#fff",padding:"0 12px",fontSize:12,color:"#9ca3af",position:"relative",zIndex:1},iN={display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:"12px",borderRadius:12,border:"1.5px solid #e5e7eb",background:"#fff",color:"#374151",fontWeight:700,fontSize:14.5,cursor:"pointer"},sN={textAlign:"center",marginTop:24,fontSize:14,color:"#6b7280"},oN={color:"#16a34a",fontWeight:700,textDecoration:"none"};function aN(){const[t,e]=C.useState({firstName:"",lastName:"",email:"",password:""}),[n,r]=C.useState(!1),i=sa(),s=c=>{e({...t,[c.target.name]:c.target.value})},o=async c=>{c.preventDefault(),r(!0);try{const{user:u}=await kk(nn,t.email,t.password);await Ck(u,{displayName:`${t.firstName} ${t.lastName}`}),await S1(Fr(Oe,"users",u.uid),{firstName:t.firstName,lastName:t.lastName,email:t.email,role:"customer",status:"active",joinedAt:Zo(),lastLogin:Zo(),profile:{firstName:t.firstName,lastName:t.lastName,email:t.email,phone:"",photoURL:"",county:"",town:"",address:""},preferences:{emailNotifications:!0,smsNotifications:!0,darkMode:!1}}),oe.success("Account created successfully!"),i("/dashboard")}catch(u){oe.error(u.message||"Registration failed")}r(!1)};return a.jsxs(a.Fragment,{children:[a.jsx($e,{}),a.jsx(wi,{}),a.jsx("div",{style:lN,children:a.jsxs("div",{style:cN,children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[a.jsx("h1",{style:uN,children:"Create Account"}),a.jsx("p",{style:dN,children:"Join the WeberTech ecosystem"})]}),a.jsxs("form",{onSubmit:o,style:hN,children:[a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[a.jsxs("div",{style:cl,children:[a.jsx("label",{style:ul,children:"First Name"}),a.jsx("input",{name:"firstName",required:!0,value:t.firstName,onChange:s,style:dl,placeholder:"John"})]}),a.jsxs("div",{style:cl,children:[a.jsx("label",{style:ul,children:"Last Name"}),a.jsx("input",{name:"lastName",required:!0,value:t.lastName,onChange:s,style:dl,placeholder:"Doe"})]})]}),a.jsxs("div",{style:cl,children:[a.jsx("label",{style:ul,children:"Email Address"}),a.jsx("input",{name:"email",type:"email",required:!0,value:t.email,onChange:s,style:dl,placeholder:"you@example.com"})]}),a.jsxs("div",{style:cl,children:[a.jsx("label",{style:ul,children:"Password"}),a.jsx("input",{name:"password",type:"password",required:!0,value:t.password,onChange:s,style:dl,placeholder:"Min 6 characters",minLength:6})]}),a.jsx("button",{type:"submit",disabled:n,style:fN,children:n?"Creating account...":"Create Account"})]}),a.jsxs("p",{style:pN,children:["Already have an account? ",a.jsx(re,{to:"/auth/login",style:mN,children:"Log in"})]})]})}),a.jsx(He,{})]})}const lN={paddingTop:120,paddingBottom:80,background:"#f9fafb",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},cN={background:"#fff",padding:40,borderRadius:20,boxShadow:"0 10px 25px rgba(0,0,0,0.05)",width:"100%",maxWidth:460},uN={fontWeight:900,fontSize:28,color:"#111827",marginBottom:8,letterSpacing:"-0.5px"},dN={color:"#6b7280",fontSize:14.5},hN={display:"flex",flexDirection:"column",gap:20,marginTop:24},cl={display:"flex",flexDirection:"column",gap:8},ul={fontSize:13,fontWeight:700,color:"#374151"},dl={padding:"12px 16px",borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14.5,outline:"none"},fN={padding:"13px",borderRadius:12,border:"none",background:"#16a34a",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:10},pN={textAlign:"center",marginTop:24,fontSize:14,color:"#6b7280"},mN={color:"#16a34a",fontWeight:700,textDecoration:"none"};function gN(){const[t,e]=C.useState(""),[n,r]=C.useState(!1),[i,s]=C.useState(!1),o=async c=>{c.preventDefault(),r(!0);try{await Ik(nn,t),s(!0),oe.success("Reset email sent!")}catch(u){oe.error(u.message||"Failed to send reset email")}r(!1)};return a.jsxs(a.Fragment,{children:[a.jsx($e,{}),a.jsx(wi,{}),a.jsx("div",{style:yN,children:a.jsxs("div",{style:vN,children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[a.jsx("h1",{style:_N,children:"Reset Password"}),a.jsx("p",{style:xN,children:"We'll send you a link to reset your password"})]}),i?a.jsxs("div",{style:{textAlign:"center",padding:"20px 0"},children:[a.jsx("div",{style:{fontSize:48,marginBottom:16},children:"📧"}),a.jsx("h2",{style:{fontWeight:800,fontSize:20,marginBottom:8},children:"Check your inbox"}),a.jsxs("p",{style:{color:"#6b7280",fontSize:14.5,marginBottom:24},children:["We've sent a password reset link to ",a.jsx("strong",{children:t}),"."]}),a.jsx(re,{to:"/auth/login",style:IN,children:"Back to Login"})]}):a.jsxs("form",{onSubmit:o,style:wN,children:[a.jsxs("div",{style:EN,children:[a.jsx("label",{style:SN,children:"Email Address"}),a.jsx("input",{type:"email",required:!0,value:t,onChange:c=>e(c.target.value),style:bN,placeholder:"you@example.com"})]}),a.jsx("button",{type:"submit",disabled:n,style:TN,children:n?"Sending...":"Send Reset Link"}),a.jsx("div",{style:{textAlign:"center",marginTop:10},children:a.jsx(re,{to:"/auth/login",style:kN,children:"Back to Login"})})]})]})}),a.jsx(He,{})]})}const yN={paddingTop:120,paddingBottom:80,background:"#f9fafb",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},vN={background:"#fff",padding:40,borderRadius:20,boxShadow:"0 10px 25px rgba(0,0,0,0.05)",width:"100%",maxWidth:420},_N={fontWeight:900,fontSize:28,color:"#111827",marginBottom:8,letterSpacing:"-0.5px"},xN={color:"#6b7280",fontSize:14.5},wN={display:"flex",flexDirection:"column",gap:20,marginTop:24},EN={display:"flex",flexDirection:"column",gap:8},SN={fontSize:13,fontWeight:700,color:"#374151"},bN={padding:"12px 16px",borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14.5,outline:"none"},TN={padding:"13px",borderRadius:12,border:"none",background:"#16a34a",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer"},IN={display:"block",padding:"13px",borderRadius:12,background:"#16a34a",color:"#fff",fontWeight:800,fontSize:15,textDecoration:"none",textAlign:"center"},kN={color:"#6b7280",fontWeight:700,textDecoration:"none",fontSize:14};function AN(){return a.jsx(hu,{emoji:"💻",title:"WeberTech Dev",subtitle:"Tell us what you need built.",description:"Custom websites, web apps, mobile apps, e-commerce stores & business systems — built by WeberTech's team at affordable Kenyan rates.",firestoreCollection:"dev_inquiries",fields:["name","email","phone"],buttonLabel:"Request a Quote",accentColor:"#0891b2",accentBg:"#cffafe",gradient:"linear-gradient(135deg,#0f172a,#0c4a6e,#0891b2)",features:["Business websites & portfolios","E-commerce & online stores","Mobile apps (Android & iOS)","Custom management systems","Affordable Kenyan pricing"]})}function RN(){return a.jsx(hu,{emoji:"🔥",title:"WeberTech Hustle",subtitle:"Join Kenya's digital hustle community.",description:"Side hustles, reseller opportunities, affiliate programs & digital income streams — curated by WeberTech to help Kenyans earn online.",firestoreCollection:"hustle_waitlist",fields:["name","email","phone"],buttonLabel:"Join the Hustle",accentColor:"#ea580c",accentBg:"#ffedd5",gradient:"linear-gradient(135deg,#0f172a,#431407,#ea580c)",features:["Bundle reseller program","Affiliate commissions","Digital product sales","Online gig opportunities","Weekly payouts via M-PESA"]})}function CN({user:t}){const[e,n]=C.useState(t||null),[r,i]=C.useState("overview"),[s,o]=C.useState(!0),[c,u]=C.useState([]),[d,f]=C.useState([]),[m,g]=C.useState([]),[b,k]=C.useState([]),[P,j]=C.useState([]),[w,x]=C.useState({});if(C.useEffect(()=>{const D=da(nn,async V=>{if(!V)return n(null);try{const E=await cu(Fr(Oe,"users",V.uid)),v=E.exists()?E.data():{};n({uid:V.uid,email:V.email,...v}),x(v||{})}catch{n({uid:V.uid,email:V.email})}});return()=>D()},[]),C.useEffect(()=>{if(!(e!=null&&e.uid))return;(async()=>{o(!0);try{const[V,E,v,S,I]=await Promise.all([Kt(Ht(It(Oe,"orders"),Gr("customerId","==",e.uid),an("createdAt","desc"))),Kt(Ht(It(Oe,"downloads"),Gr("customerId","==",e.uid),an("createdAt","desc"))),Kt(Ht(It(Oe,"services"),Gr("customerId","==",e.uid),an("createdAt","desc"))),Kt(Ht(It(Oe,"invoices"),Gr("customerId","==",e.uid),an("createdAt","desc"))),Kt(Ht(It(Oe,"supportTickets"),Gr("customerId","==",e.uid),an("createdAt","desc")))]);u(V.docs.map(A=>({id:A.id,...A.data()}))),f(E.docs.map(A=>({id:A.id,...A.data()}))),g(v.docs.map(A=>({id:A.id,...A.data()}))),k(S.docs.map(A=>({id:A.id,...A.data()}))),j(I.docs.map(A=>({id:A.id,...A.data()})))}catch{oe.error("Failed to load dashboard data")}o(!1)})()},[e==null?void 0:e.uid]),!e)return a.jsxs(a.Fragment,{children:[a.jsx($e,{}),a.jsx("div",{style:{paddingTop:120,textAlign:"center",minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center"},children:a.jsxs("div",{children:[a.jsx("h2",{style:{fontWeight:900,fontSize:24,marginBottom:10},children:"Sign in to your account"}),a.jsx("p",{style:{color:"#6b7280",marginBottom:20},children:"Access your orders, downloads, and services."}),a.jsx("a",{href:"/dashboard",style:{display:"inline-block",padding:"12px 24px",background:"#16a34a",color:"#fff",borderRadius:10,fontWeight:700,textDecoration:"none"},children:"Sign In / Sign Up"})]})}),a.jsx(He,{})]});const T=[{icon:"📋",label:"Total Orders",value:c.length,color:"#2563eb",bg:"#dbeafe"},{icon:"⬇️",label:"Downloads",value:d.length,color:"#16a34a",bg:"#dcfce7"},{icon:"⚙️",label:"Active Services",value:m.filter(D=>D.status!=="completed").length,color:"#d97706",bg:"#fef3c7"},{icon:"🎟️",label:"Invoices",value:b.length,color:"#7c3aed",bg:"#ede9fe"}],O=[{id:"overview",icon:"📊",label:"Overview"},{id:"orders",icon:"📋",label:"Orders"},{id:"downloads",icon:"⬇️",label:"Downloads"},{id:"services",icon:"⚙️",label:"Services"},{id:"invoices",icon:"🎟️",label:"Invoices"},{id:"support",icon:"💬",label:"Support"},{id:"settings",icon:"⚙️",label:"Settings"}];return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        @keyframes fadeu { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .dash-tab { display: flex; align-items: center; gap: 8px; padding: 11px 14px; border: none; border-radius: 10px; cursor: pointer; font-size: 13.5px; font-weight: 600; background: none; color: #6b7280; transition: all .15s; text-align: left; margin-bottom: 4px; font-family: inherit; width: 100%; }
        .dash-tab:hover { background: #f9fafb; color: #111827; }
        .dash-tab.on { background: #dcfce7; color: #15803d; }
        .dash-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; animation: fadeu .3s ease both; }
        .dash-stat { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 20px; }
        .dash-row:hover { background: #fafafa; }
        .dash-tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .dash-tbl th { padding: 10px 14px; text-align: left; font-size: 11.5px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .4px; border-bottom: 2px solid #f3f4f6; white-space: nowrap; }
        .dash-tbl td { padding: 12px 14px; border-bottom: 1px solid #f9fafb; vertical-align: middle; }
        .dash-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; }
        .badge-paid { background: #dcfce7; color: #15803d; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .badge-failed { background: #fee2e2; color: #dc2626; }
        .badge-new { background: #dbeafe; color: #1e40af; }
        .badge-completed { background: #dcfce7; color: #15803d; }
        @media (max-width: 768px) { .dash-layout { grid-template-columns: 1fr !important; } }
      `}),a.jsx(wi,{position:"top-center"}),a.jsx($e,{}),a.jsxs("div",{style:{paddingTop:64,background:"#f9fafb",minHeight:"100vh"},children:[a.jsx("div",{style:{background:"linear-gradient(135deg,#0f172a,#1e3a8a,#16a34a)",padding:"32px 20px 28px"},children:a.jsxs("div",{style:{maxWidth:1280,margin:"0 auto"},children:[a.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.15)",borderRadius:99,padding:"4px 14px",fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.85)",marginBottom:10},children:"👤 My Dashboard"}),a.jsxs("h1",{style:{color:"#fff",fontWeight:900,fontSize:"clamp(22px,4vw,32px)",letterSpacing:"-0.5px",marginBottom:6},children:["Welcome back, ",w.firstName||e.email.split("@")[0],"!"]}),a.jsx("p",{style:{color:"rgba(255,255,255,0.65)",fontSize:13.5},children:"Manage your orders, downloads, services, and account settings."})]})}),a.jsxs("div",{className:"dash-layout",style:{display:"grid",gridTemplateColumns:"200px 1fr",gap:24,maxWidth:1280,margin:"0 auto",padding:"24px 20px"},children:[a.jsxs("aside",{style:{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,padding:20,height:"fit-content",position:"sticky",top:80},children:[a.jsx("p",{style:{fontSize:11.5,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:10},children:"Menu"}),O.map(D=>a.jsxs("button",{className:`dash-tab ${r===D.id?"on":""}`,onClick:()=>i(D.id),children:[D.icon," ",D.label]},D.id)),a.jsx("button",{onClick:()=>$x(nn),style:{width:"100%",marginTop:16,padding:"11px 14px",border:"1.5px solid #fee2e2",borderRadius:10,background:"none",color:"#dc2626",fontWeight:700,fontSize:13.5,cursor:"pointer",fontFamily:"inherit"},children:"🚪 Sign Out"})]}),a.jsxs("main",{children:[r==="overview"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:16,marginBottom:24},children:T.map(D=>a.jsxs("div",{className:"dash-stat",children:[a.jsx("div",{style:{fontSize:22,marginBottom:8},children:D.icon}),a.jsx("div",{style:{fontSize:22,fontWeight:800,color:D.color},children:D.value}),a.jsx("div",{style:{fontSize:12,color:"#6b7280",marginTop:3},children:D.label})]},D.label))}),a.jsxs("div",{className:"dash-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:16},children:"Recent Orders"}),s?a.jsx(Ai,{}):c.length===0?a.jsx("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:"No orders yet."}):a.jsx("div",{style:{overflowX:"auto"},children:a.jsxs("table",{className:"dash-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Order ID"}),a.jsx("th",{children:"Product"}),a.jsx("th",{children:"Amount"}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Date"})]})}),a.jsx("tbody",{children:c.slice(0,5).map(D=>{var V,E,v,S,I;return a.jsxs("tr",{className:"dash-row",children:[a.jsx("td",{style:{fontWeight:700,fontFamily:"monospace",fontSize:12},children:D.orderId}),a.jsx("td",{children:D.productTitle}),a.jsxs("td",{style:{fontWeight:700},children:["KES ",(V=D.amount)==null?void 0:V.toLocaleString()]}),a.jsx("td",{children:a.jsx("span",{className:`dash-badge badge-${D.status}`,children:D.status.toUpperCase()})}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((I=(v=(E=D.createdAt)==null?void 0:E.toDate)==null?void 0:(S=v.call(E)).toLocaleDateString)==null?void 0:I.call(S))||"—"})]},D.id)})})]})})]})]}),r==="orders"&&a.jsxs("div",{className:"dash-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:16},children:"All Orders"}),s?a.jsx(Ai,{}):c.length===0?a.jsx("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:"No orders yet."}):a.jsx("div",{style:{overflowX:"auto"},children:a.jsxs("table",{className:"dash-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Order ID"}),a.jsx("th",{children:"Product"}),a.jsx("th",{children:"Type"}),a.jsx("th",{children:"Amount"}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Date"})]})}),a.jsx("tbody",{children:c.map(D=>{var V,E,v,S,I;return a.jsxs("tr",{className:"dash-row",children:[a.jsx("td",{style:{fontWeight:700,fontFamily:"monospace",fontSize:12},children:D.orderId}),a.jsx("td",{children:D.productTitle}),a.jsx("td",{style:{fontSize:12,color:"#6b7280"},children:D.type}),a.jsxs("td",{style:{fontWeight:700},children:["KES ",(V=D.amount)==null?void 0:V.toLocaleString()]}),a.jsx("td",{children:a.jsx("span",{className:`dash-badge badge-${D.status}`,children:D.status.toUpperCase()})}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((I=(v=(E=D.createdAt)==null?void 0:E.toDate)==null?void 0:(S=v.call(E)).toLocaleDateString)==null?void 0:I.call(S))||"—"})]},D.id)})})]})})]}),r==="downloads"&&a.jsxs("div",{className:"dash-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:16},children:"My Downloads"}),s?a.jsx(Ai,{}):d.length===0?a.jsx("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:"No downloads yet. Purchase a document to get started."}):a.jsx("div",{style:{overflowX:"auto"},children:a.jsxs("table",{className:"dash-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Product"}),a.jsx("th",{children:"Downloads"}),a.jsx("th",{children:"Expires"}),a.jsx("th",{children:"Action"})]})}),a.jsx("tbody",{children:d.map(D=>{var V,E,v,S;return a.jsxs("tr",{className:"dash-row",children:[a.jsx("td",{style:{fontWeight:700},children:D.productSlug}),a.jsxs("td",{children:[D.downloadCount," / ∞"]}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((S=(E=(V=D.expiresAt)==null?void 0:V.toDate)==null?void 0:(v=E.call(V)).toLocaleDateString)==null?void 0:S.call(v))||"—"}),a.jsx("td",{children:a.jsx("a",{href:"#",style:{color:"#16a34a",fontWeight:700,textDecoration:"none"},children:"Download →"})})]},D.id)})})]})})]}),r==="services"&&a.jsxs("div",{className:"dash-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:16},children:"My Services"}),s?a.jsx(Ai,{}):m.length===0?a.jsx("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:"No active services. Browse our services to get started."}):a.jsx("div",{style:{overflowX:"auto"},children:a.jsxs("table",{className:"dash-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Service"}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Assigned To"}),a.jsx("th",{children:"Created"})]})}),a.jsx("tbody",{children:m.map(D=>{var V,E,v,S;return a.jsxs("tr",{className:"dash-row",children:[a.jsx("td",{style:{fontWeight:700},children:D.productSlug}),a.jsx("td",{children:a.jsx("span",{className:`dash-badge badge-${D.status}`,children:D.status.toUpperCase()})}),a.jsx("td",{style:{color:"#9ca3af"},children:D.assignedStaff?"✓ Assigned":"—"}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((S=(E=(V=D.createdAt)==null?void 0:V.toDate)==null?void 0:(v=E.call(V)).toLocaleDateString)==null?void 0:S.call(v))||"—"})]},D.id)})})]})})]}),r==="invoices"&&a.jsxs("div",{className:"dash-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:16},children:"Invoices"}),s?a.jsx(Ai,{}):b.length===0?a.jsx("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:"No invoices yet."}):a.jsx("div",{style:{overflowX:"auto"},children:a.jsxs("table",{className:"dash-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Invoice #"}),a.jsx("th",{children:"Amount"}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Issued"}),a.jsx("th",{children:"Action"})]})}),a.jsx("tbody",{children:b.map(D=>{var V,E,v,S,I;return a.jsxs("tr",{className:"dash-row",children:[a.jsx("td",{style:{fontWeight:700},children:D.invoiceNumber}),a.jsxs("td",{style:{fontWeight:700},children:["KES ",(V=D.total)==null?void 0:V.toLocaleString()]}),a.jsx("td",{children:a.jsx("span",{className:`dash-badge badge-${D.status}`,children:D.status.toUpperCase()})}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((I=(v=(E=D.issuedAt)==null?void 0:E.toDate)==null?void 0:(S=v.call(E)).toLocaleDateString)==null?void 0:I.call(S))||"—"}),a.jsx("td",{children:a.jsx("a",{href:"#",style:{color:"#16a34a",fontWeight:700,textDecoration:"none"},children:"View →"})})]},D.id)})})]})})]}),r==="support"&&a.jsxs("div",{className:"dash-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:16},children:"Support Tickets"}),s?a.jsx(Ai,{}):P.length===0?a.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:["No support tickets yet. Need help? ",a.jsx("a",{href:"#",style:{color:"#16a34a",fontWeight:700},children:"Create a ticket"}),"."]}):a.jsx("div",{style:{overflowX:"auto"},children:a.jsxs("table",{className:"dash-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Subject"}),a.jsx("th",{children:"Category"}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Created"})]})}),a.jsx("tbody",{children:P.map(D=>{var V,E,v,S;return a.jsxs("tr",{className:"dash-row",children:[a.jsx("td",{style:{fontWeight:700},children:D.subject}),a.jsx("td",{style:{fontSize:12,color:"#6b7280"},children:D.category}),a.jsx("td",{children:a.jsx("span",{className:`dash-badge badge-${D.status}`,children:D.status.toUpperCase()})}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((S=(E=(V=D.createdAt)==null?void 0:V.toDate)==null?void 0:(v=E.call(V)).toLocaleDateString)==null?void 0:S.call(v))||"—"})]},D.id)})})]})})]}),r==="settings"&&a.jsxs("div",{className:"dash-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:20},children:"Account Settings"}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:20},children:[a.jsxs("div",{children:[a.jsx("label",{style:{fontSize:12.5,fontWeight:700,color:"#6b7280",display:"block",marginBottom:6},children:"First Name"}),a.jsx("input",{type:"text",value:w.firstName||"",disabled:!0,style:{width:"100%",padding:"11px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",background:"#f9fafb"}})]}),a.jsxs("div",{children:[a.jsx("label",{style:{fontSize:12.5,fontWeight:700,color:"#6b7280",display:"block",marginBottom:6},children:"Last Name"}),a.jsx("input",{type:"text",value:w.lastName||"",disabled:!0,style:{width:"100%",padding:"11px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",background:"#f9fafb"}})]}),a.jsxs("div",{children:[a.jsx("label",{style:{fontSize:12.5,fontWeight:700,color:"#6b7280",display:"block",marginBottom:6},children:"Email"}),a.jsx("input",{type:"email",value:e.email||"",disabled:!0,style:{width:"100%",padding:"11px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",background:"#f9fafb"}})]}),a.jsxs("div",{children:[a.jsx("label",{style:{fontSize:12.5,fontWeight:700,color:"#6b7280",display:"block",marginBottom:6},children:"Phone"}),a.jsx("input",{type:"tel",value:w.phone||"",disabled:!0,style:{width:"100%",padding:"11px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",background:"#f9fafb"}})]})]}),a.jsx("p",{style:{fontSize:12.5,color:"#9ca3af",marginTop:16},children:"To update your profile, please contact support or use the edit feature (coming soon)."})]})]})]})]}),a.jsx(He,{})]})}function Ai(){return a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px"},children:[a.jsx("div",{style:{width:36,height:36,border:"3px solid #e5e7eb",borderTopColor:"#16a34a",borderRadius:"50%",animation:"spin .8s linear infinite"}}),a.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]})}function PN(){var R;const[t,e]=C.useState("overview"),[n,r]=C.useState(!0),[i,s]=C.useState([]),[o,c]=C.useState([]),[u,d]=C.useState([]),[f,m]=C.useState([]),[g,b]=C.useState([]),[k,P]=C.useState(""),[j,w]=C.useState("All");C.useEffect(()=>{(async()=>{r(!0);try{const[q,Y,pe,de,z]=await Promise.all([Kt(Ht(It(Oe,"orders"),an("createdAt","desc"))),Kt(Ht(It(Oe,"payments"),an("createdAt","desc"))),Kt(Ht(It(Oe,"users"),an("createdAt","desc"))),Kt(Ht(It(Oe,"products"),an("createdAt","desc"))),Kt(Ht(It(Oe,"transactions"),an("createdAt","desc")))]);s(q.docs.map(W=>({id:W.id,...W.data()}))),c(Y.docs.map(W=>({id:W.id,...W.data()}))),d(pe.docs.map(W=>({id:W.id,...W.data()}))),m(de.docs.map(W=>({id:W.id,...W.data()}))),b(z.docs.map(W=>({id:W.id,...W.data()})))}catch{oe.error("Failed to load admin data")}r(!1)})()},[]);const x=i.filter(y=>y.status==="paid"),T=x.reduce((y,q)=>y+(q.amount||0),0),O=x.length>0?(T/x.length).toFixed(0):0,D=i.filter(y=>y.status==="pending").length,V=i.filter(y=>y.status==="failed").length,E=i.filter(y=>j==="All"||y.status===j).filter(y=>{var q,Y;return!k||((q=y.productTitle)==null?void 0:q.toLowerCase().includes(k.toLowerCase()))||((Y=y.orderId)==null?void 0:Y.includes(k))}),v=u.filter(y=>{var q,Y;return!k||((q=y.email)==null?void 0:q.toLowerCase().includes(k.toLowerCase()))||((Y=y.firstName)==null?void 0:Y.toLowerCase().includes(k.toLowerCase()))}),S=f.filter(y=>{var q,Y;return!k||((q=y.title)==null?void 0:q.toLowerCase().includes(k.toLowerCase()))||((Y=y.slug)==null?void 0:Y.includes(k))}),I=()=>{const q=[["Order ID","Product","Amount","Status","Payment Method","Date"],...i.map(z=>{var W,Q,me,te;return[z.orderId,z.productTitle,z.amount,z.status,z.paymentMethod,((te=(Q=(W=z.createdAt)==null?void 0:W.toDate)==null?void 0:(me=Q.call(W)).toLocaleDateString)==null?void 0:te.call(me))||""]})].map(z=>z.join(",")).join(`
`),Y=new Blob([q],{type:"text/csv"}),pe=URL.createObjectURL(Y),de=document.createElement("a");de.href=pe,de.download=`webertech-orders-${new Date().toISOString().split("T")[0]}.csv`,de.click()},A={paid:a.jsx("span",{className:"badge-paid",children:"✅ Paid"}),pending:a.jsx("span",{className:"badge-pending",children:"⏳ Pending"}),failed:a.jsx("span",{className:"badge-failed",children:"❌ Failed"}),active:a.jsx("span",{className:"badge-completed",children:"✓ Active"}),inactive:a.jsx("span",{className:"badge-failed",children:"✗ Inactive"})};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        @keyframes fadeu { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .adm-tab { display: flex; align-items: center; gap: 8px; padding: 11px 14px; border: none; border-radius: 10px; cursor: pointer; font-size: 13.5px; font-weight: 600; background: none; color: #6b7280; transition: all .15s; text-align: left; margin-bottom: 4px; font-family: inherit; width: 100%; }
        .adm-tab:hover { background: #f9fafb; color: #111827; }
        .adm-tab.on { background: #fef3c7; color: #92400e; }
        .adm-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; animation: fadeu .3s ease both; }
        .adm-stat { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 20px; }
        .adm-row:hover { background: #fafafa; }
        .adm-tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .adm-tbl th { padding: 10px 14px; text-align: left; font-size: 11.5px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .4px; border-bottom: 2px solid #f3f4f6; white-space: nowrap; }
        .adm-tbl td { padding: 12px 14px; border-bottom: 1px solid #f9fafb; vertical-align: middle; }
        .badge-paid { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #dcfce7; color: #15803d; }
        .badge-pending { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #fef3c7; color: #92400e; }
        .badge-failed { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #fee2e2; color: #dc2626; }
        .badge-completed { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #dcfce7; color: #15803d; }
        .btn-primary { background: #16a34a; color: #fff; border: none; border-radius: 10px; padding: 9px 16px; font-weight: 700; cursor: pointer; font-size: 13.5px; font-family: inherit; display: inline-flex; align-items: center; gap: 6px; }
        .btn-primary:hover { background: #15803d; }
        @media (max-width: 768px) { .adm-layout { grid-template-columns: 1fr !important; } }
      `}),a.jsx(wi,{position:"top-center"}),a.jsx($e,{}),a.jsxs("div",{style:{paddingTop:64,background:"#f9fafb",minHeight:"100vh"},children:[a.jsx("div",{style:{background:"linear-gradient(135deg,#0f172a,#92400e,#d97706)",padding:"32px 20px 28px"},children:a.jsxs("div",{style:{maxWidth:1280,margin:"0 auto"},children:[a.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.15)",borderRadius:99,padding:"4px 14px",fontSize:12,fontWeight:700,color:"#fef3c7",marginBottom:10},children:"⚙ Admin Panel"}),a.jsx("h1",{style:{color:"#fff",fontWeight:900,fontSize:"clamp(22px,4vw,32px)",letterSpacing:"-0.5px"},children:"WeberTech Admin — Phase 1"}),a.jsx("p",{style:{color:"rgba(255,255,255,0.65)",fontSize:13.5,marginTop:4},children:"Orders, payments, customers, products & analytics"})]})}),a.jsxs("div",{className:"adm-layout",style:{display:"grid",gridTemplateColumns:"220px 1fr",gap:24,maxWidth:1280,margin:"0 auto",padding:"24px 20px"},children:[a.jsxs("aside",{style:{background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:16,padding:20,height:"fit-content",position:"sticky",top:80},children:[a.jsx("p",{style:{fontSize:11.5,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:10},children:"Menu"}),[{id:"overview",icon:"📊",label:"Overview"},{id:"orders",icon:"📋",label:"Orders"},{id:"payments",icon:"💰",label:"Payments"},{id:"customers",icon:"👥",label:"Customers"},{id:"products",icon:"📦",label:"Products"},{id:"analytics",icon:"📈",label:"Analytics"},{id:"settings",icon:"⚙️",label:"Settings"}].map(y=>a.jsxs("button",{className:`adm-tab ${t===y.id?"on":""}`,onClick:()=>e(y.id),children:[y.icon," ",y.label]},y.id))]}),a.jsxs("main",{children:[t==="overview"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:16,marginBottom:24},children:[{icon:"💰",label:"Total Revenue",value:`KES ${T.toLocaleString()}`,color:"#16a34a",bg:"#dcfce7"},{icon:"📋",label:"Total Orders",value:i.length,color:"#2563eb",bg:"#dbeafe"},{icon:"✅",label:"Paid Orders",value:x.length,color:"#16a34a",bg:"#dcfce7"},{icon:"⏳",label:"Pending",value:D,color:"#d97706",bg:"#fef3c7"},{icon:"❌",label:"Failed",value:V,color:"#dc2626",bg:"#fee2e2"},{icon:"👥",label:"Customers",value:u.length,color:"#7c3aed",bg:"#ede9fe"}].map(y=>a.jsxs("div",{className:"adm-stat",children:[a.jsx("div",{style:{fontSize:22,marginBottom:8},children:y.icon}),a.jsx("div",{style:{fontSize:22,fontWeight:800,color:y.color},children:y.value}),a.jsx("div",{style:{fontSize:12,color:"#6b7280",marginTop:3},children:y.label})]},y.label))}),a.jsxs("div",{className:"adm-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:16},children:"Recent Orders"}),n?a.jsx(Xs,{}):a.jsx("div",{style:{overflowX:"auto"},children:a.jsxs("table",{className:"adm-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Order ID"}),a.jsx("th",{children:"Product"}),a.jsx("th",{children:"Amount"}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Method"}),a.jsx("th",{children:"Date"})]})}),a.jsx("tbody",{children:i.slice(0,5).map(y=>{var q,Y,pe,de,z;return a.jsxs("tr",{className:"adm-row",children:[a.jsx("td",{style:{fontWeight:700,fontFamily:"monospace",fontSize:12},children:y.orderId}),a.jsx("td",{children:y.productTitle}),a.jsxs("td",{style:{fontWeight:700},children:["KES ",(q=y.amount)==null?void 0:q.toLocaleString()]}),a.jsx("td",{children:A[y.status]||A.pending}),a.jsx("td",{style:{fontSize:12,color:"#6b7280"},children:y.paymentMethod}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((z=(pe=(Y=y.createdAt)==null?void 0:Y.toDate)==null?void 0:(de=pe.call(Y)).toLocaleDateString)==null?void 0:z.call(de))||"—"})]},y.id)})})]})})]})]}),t==="orders"&&a.jsxs("div",{className:"adm-card",children:[a.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:20},children:[a.jsxs("h3",{style:{fontWeight:700,fontSize:16},children:["All Orders (",i.length,")"]}),a.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"},children:[a.jsx("input",{style:{padding:"9px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",width:210},placeholder:"Search order, product…",value:k,onChange:y=>P(y.target.value)}),["All","paid","pending","failed"].map(y=>a.jsx("button",{onClick:()=>w(y),style:{padding:"7px 14px",borderRadius:8,border:`2px solid ${j===y?"#d97706":"#e5e7eb"}`,background:j===y?"#fef3c7":"#fff",color:j===y?"#92400e":"#6b7280",fontWeight:700,fontSize:12.5,cursor:"pointer",fontFamily:"inherit"},children:y},y)),a.jsx("button",{className:"btn-primary",onClick:I,children:"⬇ CSV"})]})]}),n?a.jsx(Xs,{}):a.jsxs("div",{style:{overflowX:"auto"},children:[a.jsxs("table",{className:"adm-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Order ID"}),a.jsx("th",{children:"Product"}),a.jsx("th",{children:"Amount"}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Method"}),a.jsx("th",{children:"Customer"}),a.jsx("th",{children:"Date"})]})}),a.jsx("tbody",{children:E.map(y=>{var q,Y,pe,de,z;return a.jsxs("tr",{className:"adm-row",children:[a.jsx("td",{style:{fontWeight:700,fontFamily:"monospace",fontSize:12},children:y.orderId}),a.jsx("td",{children:y.productTitle}),a.jsxs("td",{style:{fontWeight:700},children:["KES ",(q=y.amount)==null?void 0:q.toLocaleString()]}),a.jsx("td",{children:A[y.status]||A.pending}),a.jsx("td",{style:{fontSize:12,color:"#6b7280"},children:y.paymentMethod}),a.jsx("td",{style:{fontSize:12,color:"#6b7280"},children:y.customerName||y.customerEmail}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((z=(pe=(Y=y.createdAt)==null?void 0:Y.toDate)==null?void 0:(de=pe.call(Y)).toLocaleDateString)==null?void 0:z.call(de))||"—"})]},y.id)})})]}),E.length===0&&a.jsx("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:"No orders found."})]})]}),t==="payments"&&a.jsxs("div",{className:"adm-card",children:[a.jsxs("h3",{style:{fontWeight:700,fontSize:16,marginBottom:16},children:["All Payments (",o.length,")"]}),n?a.jsx(Xs,{}):a.jsxs("div",{style:{overflowX:"auto"},children:[a.jsxs("table",{className:"adm-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Order ID"}),a.jsx("th",{children:"Amount"}),a.jsx("th",{children:"Method"}),a.jsx("th",{children:"Phone"}),a.jsx("th",{children:"M-PESA Ref"}),a.jsx("th",{children:"Date"})]})}),a.jsx("tbody",{children:o.map(y=>{var q,Y,pe,de,z;return a.jsxs("tr",{className:"adm-row",children:[a.jsx("td",{style:{fontWeight:700,fontFamily:"monospace",fontSize:12},children:y.orderId}),a.jsxs("td",{style:{fontWeight:700},children:["KES ",(q=y.amount)==null?void 0:q.toLocaleString()]}),a.jsx("td",{style:{fontSize:12,color:"#6b7280"},children:y.method}),a.jsx("td",{style:{fontFamily:"monospace",fontSize:12},children:y.phone}),a.jsx("td",{style:{fontFamily:"monospace",fontSize:12},children:y.mpesaRef||"—"}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((z=(pe=(Y=y.createdAt)==null?void 0:Y.toDate)==null?void 0:(de=pe.call(Y)).toLocaleDateString)==null?void 0:z.call(de))||"—"})]},y.id)})})]}),o.length===0&&a.jsx("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:"No payments yet."})]})]}),t==="customers"&&a.jsxs("div",{className:"adm-card",children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:20,flexWrap:"wrap"},children:[a.jsxs("h3",{style:{fontWeight:700,fontSize:16},children:["All Customers (",u.length,")"]}),a.jsx("input",{style:{padding:"9px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",width:240},placeholder:"Search name, email…",value:k,onChange:y=>P(y.target.value)})]}),n?a.jsx(Xs,{}):a.jsxs("div",{style:{overflowX:"auto"},children:[a.jsxs("table",{className:"adm-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Name"}),a.jsx("th",{children:"Email"}),a.jsx("th",{children:"Phone"}),a.jsx("th",{children:"Role"}),a.jsx("th",{children:"Joined"})]})}),a.jsx("tbody",{children:v.map(y=>{var q,Y,pe,de;return a.jsxs("tr",{className:"adm-row",children:[a.jsxs("td",{style:{fontWeight:700},children:[y.firstName," ",y.lastName]}),a.jsx("td",{style:{fontSize:13},children:y.email}),a.jsx("td",{style:{fontSize:12,color:"#6b7280"},children:y.phone||"—"}),a.jsx("td",{children:a.jsx("span",{style:{fontSize:11.5,fontWeight:700,background:y.isAdmin?"#fef3c7":"#f3f4f6",color:y.isAdmin?"#92400e":"#6b7280",padding:"3px 10px",borderRadius:99},children:y.isAdmin?"Admin":"Customer"})}),a.jsx("td",{style:{color:"#9ca3af",fontSize:12.5},children:((de=(Y=(q=y.createdAt)==null?void 0:q.toDate)==null?void 0:(pe=Y.call(q)).toLocaleDateString)==null?void 0:de.call(pe))||"—"})]},y.id)})})]}),v.length===0&&a.jsx("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:"No customers found."})]})]}),t==="products"&&a.jsxs("div",{className:"adm-card",children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:20,flexWrap:"wrap"},children:[a.jsxs("h3",{style:{fontWeight:700,fontSize:16},children:["All Products (",f.length,")"]}),a.jsx("input",{style:{padding:"9px 14px",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",width:240},placeholder:"Search title, slug…",value:k,onChange:y=>P(y.target.value)})]}),n?a.jsx(Xs,{}):a.jsxs("div",{style:{overflowX:"auto"},children:[a.jsxs("table",{className:"adm-tbl",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Title"}),a.jsx("th",{children:"Category"}),a.jsx("th",{children:"Price"}),a.jsx("th",{children:"Type"}),a.jsx("th",{children:"Status"})]})}),a.jsx("tbody",{children:S.map(y=>{var q;return a.jsxs("tr",{className:"adm-row",children:[a.jsx("td",{style:{fontWeight:700},children:y.title}),a.jsx("td",{style:{fontSize:12,color:"#6b7280"},children:y.category}),a.jsxs("td",{style:{fontWeight:700},children:["KES ",(q=y.price)==null?void 0:q.toLocaleString()]}),a.jsx("td",{style:{fontSize:12,color:"#6b7280"},children:y.type}),a.jsx("td",{children:A[y.status]||A.inactive})]},y.id)})})]}),S.length===0&&a.jsx("p",{style:{textAlign:"center",color:"#9ca3af",padding:"28px 0"},children:"No products found."})]})]}),t==="analytics"&&a.jsxs("div",{className:"adm-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:20},children:"Analytics & Insights"}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16},children:[a.jsxs("div",{style:{background:"#f9fafb",padding:16,borderRadius:12},children:[a.jsx("div",{style:{fontSize:12,color:"#6b7280",marginBottom:8},children:"Average Order Value"}),a.jsxs("div",{style:{fontSize:24,fontWeight:800,color:"#16a34a"},children:["KES ",O.toLocaleString()]})]}),a.jsxs("div",{style:{background:"#f9fafb",padding:16,borderRadius:12},children:[a.jsx("div",{style:{fontSize:12,color:"#6b7280",marginBottom:8},children:"Conversion Rate"}),a.jsxs("div",{style:{fontSize:24,fontWeight:800,color:"#2563eb"},children:[i.length>0?(x.length/i.length*100).toFixed(1):0,"%"]})]}),a.jsxs("div",{style:{background:"#f9fafb",padding:16,borderRadius:12},children:[a.jsx("div",{style:{fontSize:12,color:"#6b7280",marginBottom:8},children:"Top Payment Method"}),a.jsx("div",{style:{fontSize:18,fontWeight:800,color:"#7c3aed"},children:o.length>0&&((R=Object.entries(o.reduce((y,q)=>({...y,[q.method]:(y[q.method]||0)+1}),{})).sort((y,q)=>q[1]-y[1])[0])==null?void 0:R[0])||"—"})]})]})]}),t==="settings"&&a.jsxs("div",{className:"adm-card",children:[a.jsx("h3",{style:{fontWeight:700,fontSize:16,marginBottom:20},children:"Admin Settings"}),a.jsxs("div",{style:{background:"#f9fafb",padding:16,borderRadius:12,marginBottom:16},children:[a.jsxs("p",{style:{fontSize:14,color:"#6b7280",marginBottom:10},children:[a.jsx("strong",{children:"Firestore Collections:"})," orders, payments, downloads, services, products, invoices, refunds, subscriptions, coupons, notifications, supportTickets"]}),a.jsxs("p",{style:{fontSize:14,color:"#6b7280",marginBottom:10},children:[a.jsx("strong",{children:"Payment Methods:"})," NestLink (M-PESA), IntaSend (M-PESA/Card), Safaricom (Coming Soon)"]}),a.jsxs("p",{style:{fontSize:14,color:"#6b7280"},children:[a.jsx("strong",{children:"Next Steps:"})," Upload product files to Firebase Storage, configure webhook URLs, enable Firestore backups."]})]})]})]})]})]}),a.jsx(He,{})]})}function Xs(){return a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px"},children:[a.jsx("div",{style:{width:36,height:36,border:"3px solid #e5e7eb",borderTopColor:"#16a34a",borderRadius:"50%",animation:"spin .8s linear infinite"}}),a.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]})}function jN(){return a.jsxs(a.Fragment,{children:[a.jsx($e,{}),a.jsx("div",{style:{paddingTop:64,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f9fafb",padding:"80px 20px",fontFamily:"'Segoe UI',system-ui,sans-serif"},children:a.jsxs("div",{style:{textAlign:"center",maxWidth:480},children:[a.jsx("div",{style:{fontSize:72,marginBottom:14},children:"🔍"}),a.jsx("h1",{style:{fontSize:"clamp(48px,8vw,72px)",fontWeight:900,color:"#111827",letterSpacing:"-2px",marginBottom:8},children:"404"}),a.jsx("h2",{style:{fontSize:22,fontWeight:700,marginBottom:12,color:"#374151"},children:"Page Not Found"}),a.jsx("p",{style:{color:"#6b7280",fontSize:15.5,lineHeight:1.7,marginBottom:36},children:"This page doesn't exist. You might have mistyped the URL, or it may have moved."}),a.jsxs("div",{style:{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"},children:[a.jsx(re,{to:"/",style:{display:"inline-flex",alignItems:"center",gap:7,padding:"13px 24px",background:"linear-gradient(135deg,#15803d,#16a34a)",borderRadius:11,color:"#fff",fontWeight:700,fontSize:15,textDecoration:"none"},children:"🏠 Go Home"}),a.jsx("a",{href:"https://bundles.webertech.co.ke",target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:7,padding:"13px 22px",border:"2px solid #e5e7eb",borderRadius:11,color:"#374151",fontWeight:700,fontSize:15,textDecoration:"none",background:"#fff"},children:"⚡ Buy Bundles"})]})]})}),a.jsx(He,{})]})}const NN={en:["What services does WeberTech offer?","How do I buy bundles?","Generate a professional CV for me","How do I register a business?","Tell me about the Academy"],sw:["WeberTech inatoa huduma gani?","Ninunue bundle vipi?","Nifanyie CV ya kisasa","Nasajili vipi biashara?","Niambie kuhusu Academy"]},DN={en:`👋 Jambo! I'm WeberAI, your personal WeberTech assistant.
I can help you with Bundles, Cyber services, Academy, Electronics, and even generate documents for you. How can I help today?`,sw:`👋 Jambo! Mimi ni WeberAI, msaidizi wako wa WeberTech.
Naweza kukusaidia na Bundles, huduma za Cyber, Academy, Electronics, na hata kukutengenezea stakabadhi. Nikusaidie nini leo?`};function ON(){let t=sessionStorage.getItem("wt_chat_session");return t||(t="sess_"+Date.now()+"_"+Math.random().toString(36).slice(2,8),sessionStorage.setItem("wt_chat_session",t)),t}const LN=`
  .wt-tab { position: fixed; top: 50%; right: 0; transform: translateY(-50%); z-index: 9000; background: linear-gradient(180deg,#15803d,#16a34a); color: #fff; border: none; border-radius: 10px 0 0 10px; padding: 16px 10px; cursor: pointer; writing-mode: vertical-rl; font-size: 13px; font-weight: 700; letter-spacing: 1px; box-shadow: -3px 0 18px rgba(22,163,74,0.4); transition: padding .2s; font-family: inherit; display: flex; align-items: center; gap: 8px; }
  .wt-tab:hover { padding: 16px 14px; }
  .wt-tab-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; display: inline-block; animation: wtblink 1.5s ease-in-out infinite; }
  @keyframes wtblink { 0%,100%{opacity:1} 50%{opacity:.25} }
  .wt-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 9001; animation: wtfade .2s ease both; }
  @keyframes wtfade { from{opacity:0} to{opacity:1} }
  .wt-sidebar { position: fixed; top: 0; right: 0; bottom: 0; width: 400px; background: #fff; z-index: 9002; display: flex; flex-direction: column; box-shadow: -6px 0 32px rgba(0,0,0,0.16); font-family: inherit; }
  .wt-open  { animation: wtslide .28s cubic-bezier(.175,.885,.32,1.1) both; }
  .wt-close { animation: wtslideout .22s ease both; }
  @keyframes wtslide    { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes wtslideout { from{transform:translateX(0)} to{transform:translateX(100%)} }
  .wt-head { background: linear-gradient(135deg,#15803d,#16a34a); padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
  .wt-msgs { flex: 1; overflow-y: auto; padding: 14px 13px; display: flex; flex-direction: column; gap: 10px; background: #f9fafb; }
  .wt-msgs::-webkit-scrollbar { width: 4px; }
  .wt-msgs::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
  .wt-bub { max-width: 86%; padding: 10px 13px; border-radius: 15px; font-size: 13.5px; line-height: 1.55; word-break: break-word; animation: wtmsgin .2s ease both; }
  @keyframes wtmsgin { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .wt-ai   { background:#fff; border:1.5px solid #e5e7eb; align-self:flex-start; border-bottom-left-radius:3px; }
  .wt-user { background:#16a34a; color:#fff; align-self:flex-end; border-bottom-right-radius:3px; }
  .wt-err  { background:#fef2f2; border:1.5px solid #fca5a5; align-self:flex-start; }
  .wt-typing { display: flex; gap: 4px; padding: 10px 13px; background: #fff; border: 1.5px solid #e5e7eb; border-radius: 15px; border-bottom-left-radius: 3px; align-self: flex-start; align-items: center; }
  .wt-typing span { width: 6px; height: 6px; border-radius: 50%; background: #9ca3af; animation: wtbounce .9s ease-in-out infinite; }
  .wt-typing span:nth-child(2){animation-delay:.18s}
  .wt-typing span:nth-child(3){animation-delay:.36s}
  @keyframes wtbounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
  .wt-pdf-btn { display: flex; align-items: center; gap: 8px; background: #f0fdf4; border: 1.5px solid #16a34a; color: #16a34a; border-radius: 10px; padding: 10px 14px; font-size: 13px; font-weight: 700; cursor: pointer; margin-top: 10px; transition: all .15s; }
  .wt-pdf-btn:hover { background: #16a34a; color: #fff; }
  .wt-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 13px; background: #fff; border-top: 1px solid #f3f4f6; flex-shrink: 0; }
  .wt-chip { background: #f0fdf4; border: 1.5px solid #86efac; color: #15803d; border-radius: 99px; padding: 5px 11px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .13s; white-space: nowrap; font-family: inherit; }
  .wt-chip:hover { background: #16a34a; color: #fff; border-color: #16a34a; }
  .wt-input-row { display: flex; gap: 8px; padding: 11px 13px; border-top: 1px solid #e5e7eb; background: #fff; flex-shrink: 0; }
  .wt-input { flex: 1; padding: 9px 13px; border: 1.5px solid #e5e7eb; border-radius: 10px; font-size: 14px; outline: none; font-family: inherit; resize: none; max-height: 80px; line-height: 1.5; transition: border-color .15s; }
  .wt-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,.1); }
  .wt-send { width: 38px; height: 38px; border-radius: 10px; background: #16a34a; border: none; cursor: pointer; color: #fff; font-size: 17px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: background .13s; }
  .wt-send:hover:not(:disabled) { background: #15803d; }
  .wt-send:disabled { background: #9ca3af; cursor: not-allowed; }
  @media (max-width: 440px) { .wt-sidebar { width: 100vw; } }
  @keyframes wtspin { to{transform:rotate(360deg)} }
  .wt-spin { display: inline-block; animation: wtspin .8s linear infinite; }
`;function hl(){return new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}function VN(){const[t,e]=C.useState(!1),[n,r]=C.useState(!1),[i,s]=C.useState("en"),[o,c]=C.useState([]),[u,d]=C.useState(""),[f,m]=C.useState(!1),[g,b]=C.useState(!0),[k,P]=C.useState(null),[j,w]=C.useState(null),x=C.useRef(null),T=C.useRef(null),O=C.useRef(!1);C.useEffect(()=>{if(O.current)return;O.current=!0;const R=document.createElement("style");R.textContent=LN,document.head.appendChild(R)},[]),C.useEffect(()=>{const R=da(nn,y=>w(y));return()=>R()},[]),C.useEffect(()=>{const R=ON();P(R);const y={role:"ai",text:DN[i],time:hl(),id:"greeting"};c([y])},[]),C.useEffect(()=>{var R;(R=x.current)==null||R.scrollIntoView({behavior:"smooth"})},[o]),C.useEffect(()=>{t&&(b(!1),setTimeout(()=>{var R;return(R=T.current)==null?void 0:R.focus()},300))},[t]);const D=()=>{e(!0),r(!1)},V=()=>{r(!0),setTimeout(()=>{e(!1),r(!1)},220)},E=async(R,y,q={})=>{if(k)try{await S1(Fr(Oe,"chats",k),{sessionId:k,userId:(j==null?void 0:j.uid)||null,userEmail:(j==null?void 0:j.email)||null,lang:i,updatedAt:Zo(),status:"active"},{merge:!0}),await b1(It(Oe,"chats",k,"messages"),{role:R,text:y,metadata:q,createdAt:Zo()})}catch(Y){console.error("Firestore save error:",Y)}},v=async R=>{const{type:y,content:q}=R;m(!0);try{const pe=await(await fetch("/api/generate-pdf",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:y,content:q})})).json();if(pe.success){const de=await(await fetch(`data:application/pdf;base64,${pe.pdfBase64}`)).blob(),z=URL.createObjectURL(de),W=document.createElement("a");W.href=z,W.download=pe.fileName,W.click()}}catch(Y){console.error("PDF generation failed:",Y)}m(!1)},S=async R=>{const y=(R||u).trim();if(!y||f)return;d("");const q={role:"user",text:y,time:hl(),id:"u_"+Date.now()};c(Y=>[...Y,q]),await E("user",y),m(!0);try{const Y=[...o,q].filter(te=>te.role==="user"||te.role==="ai").slice(-10).map(te=>({role:te.role,text:te.text}));let z=(await(await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:Y,lang:i})})).json()).answer,W=null;const Q=z.match(/\[GENERATE_PDF:\s*(.*?)\s*\|\s*(.*?)\s*\]/s);Q&&(W={type:Q[1],content:Q[2]},z=z.replace(Q[0],"").trim());const me={role:"ai",text:z,time:hl(),id:"ai_"+Date.now(),pdfData:W};c(te=>[...te,me]),await E("ai",z,{pdfData:W})}catch{c(pe=>[...pe,{role:"ai",text:"Sorry, I'm having trouble connecting. Please try again.",time:hl(),id:"err_"+Date.now(),isErr:!0}])}m(!1)},I=R=>{R.key==="Enter"&&!R.shiftKey&&(R.preventDefault(),S())},A=o.length<=1&&!f;return a.jsxs(a.Fragment,{children:[(t||n)&&a.jsx("div",{className:"wt-overlay",onClick:V}),(t||n)&&a.jsxs("div",{className:`wt-sidebar ${n?"wt-close":"wt-open"}`,children:[a.jsxs("div",{className:"wt-head",children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[a.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18},children:"🤖"}),a.jsxs("div",{children:[a.jsx("div",{style:{color:"#fff",fontWeight:800,fontSize:14},children:"WeberAI"}),a.jsxs("div",{style:{color:"rgba(255,255,255,0.75)",fontSize:11,display:"flex",alignItems:"center",gap:5,marginTop:2},children:[a.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#4ade80",display:"inline-block"}}),"Online & Ready"]})]})]}),a.jsx("button",{onClick:V,style:{background:"rgba(255,255,255,0.18)",border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",color:"#fff"},children:"✕"})]}),a.jsxs("div",{className:"wt-msgs",children:[o.map(R=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:R.role==="user"?"flex-end":"flex-start"},children:[a.jsxs("div",{className:`wt-bub ${R.role==="user"?"wt-user":"wt-ai"}`,children:[R.text.split(`
`).map((y,q)=>a.jsx("p",{style:{margin:q>0?"4px 0 0":0},children:y},q)),R.pdfData&&a.jsxs("button",{className:"wt-pdf-btn",onClick:()=>v(R.pdfData),children:["📄 Download ",R.pdfData.type," PDF"]})]}),a.jsx("div",{className:"wt-time",style:{textAlign:R.role==="user"?"right":"left"},children:R.time})]},R.id)),f&&a.jsxs("div",{className:"wt-typing",children:[a.jsx("span",{}),a.jsx("span",{}),a.jsx("span",{})]}),a.jsx("div",{ref:x})]}),A&&a.jsx("div",{className:"wt-chips",children:NN[i].map(R=>a.jsx("button",{className:"wt-chip",onClick:()=>S(R),children:R},R))}),a.jsxs("div",{className:"wt-input-row",children:[a.jsx("textarea",{ref:T,className:"wt-input",rows:1,placeholder:"Ask WeberAI anything...",value:u,onChange:R=>d(R.target.value),onKeyDown:I,disabled:f}),a.jsx("button",{className:"wt-send",onClick:()=>S(),disabled:f||!u.trim(),children:f?a.jsx("span",{className:"wt-spin",children:"⟳"}):"➤"})]})]}),!t&&!n&&a.jsxs("button",{className:"wt-tab",onClick:D,children:[a.jsx("span",{className:"wt-tab-dot"}),g?"Chat with WeberAI":"AI Support"]})]})}function MN(){return a.jsxs("div",{style:FN.container,children:[a.jsx("h1",{children:"About WeberTech Solutions KE"}),a.jsx("p",{children:"WeberTech Solutions KE is a Kenyan technology company focused on providing affordable digital solutions, connectivity services, electronics, software development, and digital skills training."}),a.jsx("p",{children:"Our mission is to empower individuals, businesses, and organizations through innovative technology solutions that improve productivity, connectivity, and business growth."}),a.jsx("h2",{children:"Our Services"}),a.jsxs("ul",{children:[a.jsx("li",{children:"Safaricom Bundles & Digital Services"}),a.jsx("li",{children:"Website & Software Development"}),a.jsx("li",{children:"Cyber Services"}),a.jsx("li",{children:"Electronics & Accessories"}),a.jsx("li",{children:"Digital Skills Training & Academy"}),a.jsx("li",{children:"Business Automation Solutions"})]}),a.jsx("h2",{children:"Contact Us"}),a.jsxs("p",{children:[a.jsx("strong",{children:"Phone:"})," +254 722 508 904"]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Email:"})," webertechdevs@gmail.com"]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Website:"})," https://webertech.co.ke"]}),a.jsx("p",{children:"We are committed to delivering reliable, secure, and customer-focused technology services across Kenya and beyond."})]})}const FN={container:{maxWidth:"900px",margin:"0 auto",padding:"40px 20px",lineHeight:"1.8"}};function zN(){return a.jsxs("div",{style:UN.container,children:[a.jsx("h1",{children:"Privacy Policy"}),a.jsx("p",{children:"Last Updated: June 2026"}),a.jsx("p",{children:"WeberTech Solutions KE respects your privacy and is committed to protecting your personal information."}),a.jsx("h2",{children:"Information We Collect"}),a.jsxs("ul",{children:[a.jsx("li",{children:"Name and contact information."}),a.jsx("li",{children:"Email address."}),a.jsx("li",{children:"Phone number."}),a.jsx("li",{children:"Usage information and analytics."}),a.jsx("li",{children:"Transaction information where applicable."})]}),a.jsx("h2",{children:"How We Use Information"}),a.jsxs("ul",{children:[a.jsx("li",{children:"Provide requested services."}),a.jsx("li",{children:"Improve website performance."}),a.jsx("li",{children:"Respond to customer inquiries."}),a.jsx("li",{children:"Process transactions and orders."}),a.jsx("li",{children:"Enhance security and prevent fraud."})]}),a.jsx("h2",{children:"Cookies"}),a.jsx("p",{children:"Our website may use cookies and similar technologies to improve user experience and analyze website performance."}),a.jsx("h2",{children:"Third-Party Services"}),a.jsx("p",{children:"We may use trusted third-party services including Google Analytics, Google AdSense, Firebase, and payment providers to deliver our services."}),a.jsx("h2",{children:"Data Security"}),a.jsx("p",{children:"We take reasonable measures to protect your personal information against unauthorized access, disclosure, or misuse."}),a.jsx("h2",{children:"Contact"}),a.jsx("p",{children:"If you have questions regarding this Privacy Policy, contact us at:"}),a.jsx("p",{children:"Email: webertechdevs@gmail.com"}),a.jsx("p",{children:"Phone: +254 722 508 904"})]})}const UN={container:{maxWidth:"900px",margin:"0 auto",padding:"40px 20px",lineHeight:"1.8"}};function BN(){return a.jsxs("div",{style:WN.container,children:[a.jsx("h1",{children:"Terms and Conditions"}),a.jsx("p",{children:"Last Updated: June 2026"}),a.jsx("p",{children:"By accessing and using WeberTech Solutions KE services, you agree to be bound by these Terms and Conditions."}),a.jsx("h2",{children:"Use of Services"}),a.jsx("p",{children:"Users agree to use our services lawfully and responsibly. Any misuse of our platforms, systems, or services is prohibited."}),a.jsx("h2",{children:"Products and Services"}),a.jsx("p",{children:"WeberTech provides digital services, software solutions, training, electronics, internet-related services, and other technology products."}),a.jsx("h2",{children:"Payments"}),a.jsx("p",{children:"Payments for products and services must be completed according to the provided payment instructions before delivery where applicable."}),a.jsx("h2",{children:"Intellectual Property"}),a.jsx("p",{children:"All content, logos, branding, graphics, software, and materials on this website remain the property of WeberTech Solutions KE unless otherwise stated."}),a.jsx("h2",{children:"Limitation of Liability"}),a.jsx("p",{children:"WeberTech shall not be liable for indirect, incidental, or consequential damages arising from the use of our services."}),a.jsx("h2",{children:"Changes to Terms"}),a.jsx("p",{children:"We reserve the right to update these Terms and Conditions at any time. Continued use of our services constitutes acceptance of updated terms."}),a.jsx("h2",{children:"Contact Information"}),a.jsx("p",{children:"Email: webertechdevs@gmail.com"}),a.jsx("p",{children:"Phone: +254 722 508 904"}),a.jsx("p",{children:"Website: https://webertech.co.ke"})]})}const WN={container:{maxWidth:"900px",margin:"0 auto",padding:"40px 20px",lineHeight:"1.8"}};function $N({user:t,loading:e,children:n}){return e?a.jsx(F1,{}):t?n:a.jsx(lx,{to:"/",replace:!0})}function HN({user:t,isAdmin:e,loading:n,children:r}){return n?a.jsx(F1,{}):!t||!e?a.jsx(lx,{to:"/",replace:!0}):r}function F1(){return a.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f9fafb"},children:a.jsxs("div",{style:{textAlign:"center"},children:[a.jsx("div",{style:{width:34,height:34,border:"3px solid #e5e7eb",borderTopColor:"#16a34a",borderRadius:"50%",margin:"0 auto 12px",animation:"spin .7s linear infinite"}}),a.jsx("p",{style:{color:"#9ca3af",fontSize:14},children:"Loading…"}),a.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]})})}function KN(){const[t,e]=C.useState(null),[n,r]=C.useState(!1),[i,s]=C.useState(!0);return C.useEffect(()=>{const o=da(nn,async c=>{if(c)try{const u=await cu(Fr(Oe,"users",c.uid)),d=u.exists()?u.data():{};e({uid:c.uid,email:c.email,...d}),r(d.isAdmin===!0)}catch{e({uid:c.uid,email:c.email}),r(!1)}else e(null),r(!1);s(!1)});return()=>o()},[]),a.jsxs(KT,{children:[a.jsxs(MT,{children:[a.jsx(Ae,{path:"/",element:a.jsx(Aj,{})}),a.jsx(Ae,{path:"/academy",element:a.jsx(y5,{})}),a.jsx(Ae,{path:"/electronics",element:a.jsx(v5,{})}),a.jsx(Ae,{path:"/cyber",element:a.jsx(I5,{})}),a.jsx(Ae,{path:"/cyber/legal-documents",element:a.jsx(k5,{})}),a.jsx(Ae,{path:"/cyber/legal-documents/:slug",element:a.jsx(F5,{})}),a.jsx(Ae,{path:"/cyber/government",element:a.jsx(U5,{})}),a.jsx(Ae,{path:"/cyber/business",element:a.jsx(W5,{})}),a.jsx(Ae,{path:"/cyber/printing",element:a.jsx(H5,{})}),a.jsx(Ae,{path:"/cyber/writing",element:a.jsx(q5,{})}),a.jsx(Ae,{path:"/auth/login",element:a.jsx(G5,{})}),a.jsx(Ae,{path:"/auth/register",element:a.jsx(aN,{})}),a.jsx(Ae,{path:"/auth/forgot-password",element:a.jsx(gN,{})}),a.jsx(Ae,{path:"/dev",element:a.jsx(AN,{})}),a.jsx(Ae,{path:"/hustle",element:a.jsx(RN,{})}),a.jsx(Ae,{path:"/about",element:a.jsx(MN,{})}),a.jsx(Ae,{path:"/privacy",element:a.jsx(zN,{})}),a.jsx(Ae,{path:"/terms",element:a.jsx(BN,{})}),a.jsx(Ae,{path:"/dashboard",element:a.jsx($N,{user:t,loading:i,children:a.jsx(CN,{user:t})})}),a.jsx(Ae,{path:"/admin",element:a.jsx(HN,{user:t,isAdmin:n,loading:i,children:a.jsx(PN,{})})}),a.jsx(Ae,{path:"*",element:a.jsx(jN,{})})]}),a.jsx(VN,{})]})}Sd.createRoot(document.getElementById("root")).render(a.jsx(Qv.StrictMode,{children:a.jsx(KN,{})}));
