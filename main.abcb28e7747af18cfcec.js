!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e,r){var n,o,i;/*! nouislider - 14.0.3 - 10/10/2019 */o=[],void 0===(i="function"==typeof(n=function(){"use strict";var t="14.0.3";function e(t){t.parentElement.removeChild(t)}function r(t){return null!=t}function n(t){t.preventDefault()}function o(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function i(t,e,r){r>0&&(u(t,e),setTimeout((function(){c(t,e)}),r))}function a(t){return Math.max(Math.min(t,100),0)}function s(t){return Array.isArray(t)?t:[t]}function l(t){var e=(t=String(t)).split(".");return e.length>1?e[1].length:0}function u(t,e){t.classList?t.classList.add(e):t.className+=" "+e}function c(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}function f(t){var e=void 0!==window.pageXOffset,r="CSS1Compat"===(t.compatMode||"");return{x:e?window.pageXOffset:r?t.documentElement.scrollLeft:t.body.scrollLeft,y:e?window.pageYOffset:r?t.documentElement.scrollTop:t.body.scrollTop}}function p(t,e){return 100/(e-t)}function d(t,e){return 100*e/(t[1]-t[0])}function h(t,e){for(var r=1;t>=e[r];)r+=1;return r}function m(t,e,r){if(r>=t.slice(-1)[0])return 100;var n=h(r,t),o=t[n-1],i=t[n],a=e[n-1],s=e[n];return a+function(t,e){return d(t,t[0]<0?e+Math.abs(t[0]):e-t[0])}([o,i],r)/p(a,s)}function g(t,e,r,n){if(100===n)return n;var o=h(n,t),i=t[o-1],a=t[o];return r?n-i>(a-i)/2?a:i:e[o-1]?t[o-1]+function(t,e){return Math.round(t/e)*e}(n-t[o-1],e[o-1]):n}function v(e,r,n){var i;if("number"==typeof r&&(r=[r]),!Array.isArray(r))throw new Error("noUiSlider ("+t+"): 'range' contains invalid value.");if(!o(i="min"===e?0:"max"===e?100:parseFloat(e))||!o(r[0]))throw new Error("noUiSlider ("+t+"): 'range' value isn't numeric.");n.xPct.push(i),n.xVal.push(r[0]),i?n.xSteps.push(!isNaN(r[1])&&r[1]):isNaN(r[1])||(n.xSteps[0]=r[1]),n.xHighestCompleteStep.push(0)}function b(t,e,r){if(e)if(r.xVal[t]!==r.xVal[t+1]){r.xSteps[t]=d([r.xVal[t],r.xVal[t+1]],e)/p(r.xPct[t],r.xPct[t+1]);var n=(r.xVal[t+1]-r.xVal[t])/r.xNumSteps[t],o=Math.ceil(Number(n.toFixed(3))-1),i=r.xVal[t]+r.xNumSteps[t]*o;r.xHighestCompleteStep[t]=i}else r.xSteps[t]=r.xHighestCompleteStep[t]=r.xVal[t]}function w(t,e,r){var n;this.xPct=[],this.xVal=[],this.xSteps=[r||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=e;var o=[];for(n in t)t.hasOwnProperty(n)&&o.push([t[n],n]);for(o.length&&"object"==typeof o[0][0]?o.sort((function(t,e){return t[0][0]-e[0][0]})):o.sort((function(t,e){return t[0]-e[0]})),n=0;n<o.length;n++)v(o[n][1],o[n][0],this);for(this.xNumSteps=this.xSteps.slice(0),n=0;n<this.xNumSteps.length;n++)b(n,this.xNumSteps[n],this)}w.prototype.getMargin=function(e){var r=this.xNumSteps[0];if(r&&e/r%1!=0)throw new Error("noUiSlider ("+t+"): 'limit', 'margin' and 'padding' must be divisible by step.");return 2===this.xPct.length&&d(this.xVal,e)},w.prototype.toStepping=function(t){return t=m(this.xVal,this.xPct,t)},w.prototype.fromStepping=function(t){return function(t,e,r){if(r>=100)return t.slice(-1)[0];var n=h(r,e),o=t[n-1],i=t[n],a=e[n-1];return function(t,e){return e*(t[1]-t[0])/100+t[0]}([o,i],(r-a)*p(a,e[n]))}(this.xVal,this.xPct,t)},w.prototype.getStep=function(t){return t=g(this.xPct,this.xSteps,this.snap,t)},w.prototype.getDefaultStep=function(t,e,r){var n=h(t,this.xPct);return(100===t||e&&t===this.xPct[n-1])&&(n=Math.max(n-1,1)),(this.xVal[n]-this.xVal[n-1])/r},w.prototype.getNearbySteps=function(t){var e=h(t,this.xPct);return{stepBefore:{startValue:this.xVal[e-2],step:this.xNumSteps[e-2],highestStep:this.xHighestCompleteStep[e-2]},thisStep:{startValue:this.xVal[e-1],step:this.xNumSteps[e-1],highestStep:this.xHighestCompleteStep[e-1]},stepAfter:{startValue:this.xVal[e],step:this.xNumSteps[e],highestStep:this.xHighestCompleteStep[e]}}},w.prototype.countStepDecimals=function(){var t=this.xNumSteps.map(l);return Math.max.apply(null,t)},w.prototype.convert=function(t){return this.getStep(this.toStepping(t))};var y={to:function(t){return void 0!==t&&t.toFixed(2)},from:Number};function S(e){if(function(t){return"object"==typeof t&&"function"==typeof t.to&&"function"==typeof t.from}(e))return!0;throw new Error("noUiSlider ("+t+"): 'format' requires 'to' and 'from' methods.")}function x(e,r){if(!o(r))throw new Error("noUiSlider ("+t+"): 'step' is not numeric.");e.singleStep=r}function E(e,r){if("object"!=typeof r||Array.isArray(r))throw new Error("noUiSlider ("+t+"): 'range' is not an object.");if(void 0===r.min||void 0===r.max)throw new Error("noUiSlider ("+t+"): Missing 'min' or 'max' in 'range'.");if(r.min===r.max)throw new Error("noUiSlider ("+t+"): 'range' 'min' and 'max' cannot be equal.");e.spectrum=new w(r,e.snap,e.singleStep)}function C(e,r){if(r=s(r),!Array.isArray(r)||!r.length)throw new Error("noUiSlider ("+t+"): 'start' option is incorrect.");e.handles=r.length,e.start=r}function N(e,r){if(e.snap=r,"boolean"!=typeof r)throw new Error("noUiSlider ("+t+"): 'snap' option must be a boolean.")}function _(e,r){if(e.animate=r,"boolean"!=typeof r)throw new Error("noUiSlider ("+t+"): 'animate' option must be a boolean.")}function M(e,r){if(e.animationDuration=r,"number"!=typeof r)throw new Error("noUiSlider ("+t+"): 'animationDuration' option must be a number.")}function L(e,r){var n,o=[!1];if("lower"===r?r=[!0,!1]:"upper"===r&&(r=[!1,!0]),!0===r||!1===r){for(n=1;n<e.handles;n++)o.push(r);o.push(!1)}else{if(!Array.isArray(r)||!r.length||r.length!==e.handles+1)throw new Error("noUiSlider ("+t+"): 'connect' option doesn't match handle count.");o=r}e.connect=o}function k(e,r){switch(r){case"horizontal":e.ort=0;break;case"vertical":e.ort=1;break;default:throw new Error("noUiSlider ("+t+"): 'orientation' option is invalid.")}}function P(e,r){if(!o(r))throw new Error("noUiSlider ("+t+"): 'margin' option must be numeric.");if(0!==r&&(e.margin=e.spectrum.getMargin(r),!e.margin))throw new Error("noUiSlider ("+t+"): 'margin' option is only supported on linear sliders.")}function U(e,r){if(!o(r))throw new Error("noUiSlider ("+t+"): 'limit' option must be numeric.");if(e.limit=e.spectrum.getMargin(r),!e.limit||e.handles<2)throw new Error("noUiSlider ("+t+"): 'limit' option is only supported on linear sliders with 2 or more handles.")}function A(e,r){if(!o(r)&&!Array.isArray(r))throw new Error("noUiSlider ("+t+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(r)&&2!==r.length&&!o(r[0])&&!o(r[1]))throw new Error("noUiSlider ("+t+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==r){if(Array.isArray(r)||(r=[r,r]),e.padding=[e.spectrum.getMargin(r[0]),e.spectrum.getMargin(r[1])],!1===e.padding[0]||!1===e.padding[1])throw new Error("noUiSlider ("+t+"): 'padding' option is only supported on linear sliders.");if(e.padding[0]<0||e.padding[1]<0)throw new Error("noUiSlider ("+t+"): 'padding' option must be a positive number(s).");if(e.padding[0]+e.padding[1]>100)throw new Error("noUiSlider ("+t+"): 'padding' option must not exceed 100% of the range.")}}function O(e,r){switch(r){case"ltr":e.dir=0;break;case"rtl":e.dir=1;break;default:throw new Error("noUiSlider ("+t+"): 'direction' option was not recognized.")}}function T(e,r){if("string"!=typeof r)throw new Error("noUiSlider ("+t+"): 'behaviour' must be a string containing options.");var n=r.indexOf("tap")>=0,o=r.indexOf("drag")>=0,i=r.indexOf("fixed")>=0,a=r.indexOf("snap")>=0,s=r.indexOf("hover")>=0,l=r.indexOf("unconstrained")>=0;if(i){if(2!==e.handles)throw new Error("noUiSlider ("+t+"): 'fixed' behaviour must be used with 2 handles");P(e,e.start[1]-e.start[0])}if(l&&(e.margin||e.limit))throw new Error("noUiSlider ("+t+"): 'unconstrained' behaviour cannot be used with margin or limit");e.events={tap:n||a,drag:o,fixed:i,snap:a,hover:s,unconstrained:l}}function V(e,r){if(!1!==r)if(!0===r){e.tooltips=[];for(var n=0;n<e.handles;n++)e.tooltips.push(!0)}else{if(e.tooltips=s(r),e.tooltips.length!==e.handles)throw new Error("noUiSlider ("+t+"): must pass a formatter for all handles.");e.tooltips.forEach((function(e){if("boolean"!=typeof e&&("object"!=typeof e||"function"!=typeof e.to))throw new Error("noUiSlider ("+t+"): 'tooltips' must be passed a formatter or 'false'.")}))}}function j(t,e){t.ariaFormat=e,S(e)}function H(t,e){t.format=e,S(e)}function R(e,r){if(e.keyboardSupport=r,"boolean"!=typeof r)throw new Error("noUiSlider ("+t+"): 'keyboardSupport' option must be a boolean.")}function z(t,e){t.documentElement=e}function D(e,r){if("string"!=typeof r&&!1!==r)throw new Error("noUiSlider ("+t+"): 'cssPrefix' must be a string or `false`.");e.cssPrefix=r}function F(e,r){if("object"!=typeof r)throw new Error("noUiSlider ("+t+"): 'cssClasses' must be an object.");if("string"==typeof e.cssPrefix)for(var n in e.cssClasses={},r)r.hasOwnProperty(n)&&(e.cssClasses[n]=e.cssPrefix+r[n]);else e.cssClasses=r}function B(e){var n={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,ariaFormat:y,format:y},o={step:{r:!1,t:x},start:{r:!0,t:C},connect:{r:!0,t:L},direction:{r:!0,t:O},snap:{r:!1,t:N},animate:{r:!1,t:_},animationDuration:{r:!1,t:M},range:{r:!0,t:E},orientation:{r:!1,t:k},margin:{r:!1,t:P},limit:{r:!1,t:U},padding:{r:!1,t:A},behaviour:{r:!0,t:T},ariaFormat:{r:!1,t:j},format:{r:!1,t:H},tooltips:{r:!1,t:V},keyboardSupport:{r:!0,t:R},documentElement:{r:!1,t:z},cssPrefix:{r:!0,t:D},cssClasses:{r:!0,t:F}},i={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",keyboardSupport:!0,cssPrefix:"noUi-",cssClasses:{target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",touchArea:"touch-area",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"}};e.format&&!e.ariaFormat&&(e.ariaFormat=e.format),Object.keys(o).forEach((function(a){if(!r(e[a])&&void 0===i[a]){if(o[a].r)throw new Error("noUiSlider ("+t+"): '"+a+"' is required.");return!0}o[a].t(n,r(e[a])?e[a]:i[a])})),n.pips=e.pips;var a=document.createElement("div"),s=void 0!==a.style.msTransform,l=void 0!==a.style.transform;return n.transformRule=l?"transform":s?"msTransform":"webkitTransform",n.style=[["left","top"],["right","bottom"]][n.dir][n.ort],n}function Y(r,o,l){var p,d,h,m,g,v,b,w,y=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},S=window.CSS&&CSS.supports&&CSS.supports("touch-action","none")&&function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}(),x=r,E=o.spectrum,C=[],N=[],_=[],M=0,L={},k=r.ownerDocument,P=o.documentElement||k.documentElement,U=k.body,A=-1,O=0,T=1,V=2,j="rtl"===k.dir||1===o.ort?0:100;function H(t,e){var r=k.createElement("div");return e&&u(r,e),t.appendChild(r),r}function R(t,e){var r=H(t,o.cssClasses.origin),n=H(r,o.cssClasses.handle);return H(n,o.cssClasses.touchArea),n.setAttribute("data-handle",e),o.keyboardSupport&&(n.setAttribute("tabindex","0"),n.addEventListener("keydown",(function(t){return function(t,e){if(F()||Y(e))return!1;var r=["Left","Right"],n=["Down","Up"];o.dir&&!o.ort?r.reverse():o.ort&&!o.dir&&n.reverse();var i=t.key.replace("Arrow",""),a=i===n[0]||i===r[0],s=i===n[1]||i===r[1];if(!a&&!s)return!0;t.preventDefault();var l=a?0:1,u=vt(e)[l];return null!==u&&(!1===u&&(u=E.getDefaultStep(N[e],a,10)),u=Math.max(u,1e-7),u*=a?-1:1,pt(e,E.toStepping(C[e]+u),!0,!0),at("slide",e),at("update",e),at("change",e),at("set",e),!1)}(t,e)}))),n.setAttribute("role","slider"),n.setAttribute("aria-orientation",o.ort?"vertical":"horizontal"),0===e?u(n,o.cssClasses.handleLower):e===o.handles-1&&u(n,o.cssClasses.handleUpper),r}function z(t,e){return!!e&&H(t,o.cssClasses.connect)}function D(t,e){return!!o.tooltips[e]&&H(t.firstChild,o.cssClasses.tooltip)}function F(){return x.hasAttribute("disabled")}function Y(t){return d[t].hasAttribute("disabled")}function I(){g&&(it("update.tooltips"),g.forEach((function(t){t&&e(t)})),g=null)}function W(){I(),g=d.map(D),ot("update.tooltips",(function(t,e,r){if(g[e]){var n=t[e];!0!==o.tooltips[e]&&(n=o.tooltips[e].to(r[e])),g[e].innerHTML=n}}))}function Z(t,e,r){var n=k.createElement("div"),i=[];i[O]=o.cssClasses.valueNormal,i[T]=o.cssClasses.valueLarge,i[V]=o.cssClasses.valueSub;var a=[];a[O]=o.cssClasses.markerNormal,a[T]=o.cssClasses.markerLarge,a[V]=o.cssClasses.markerSub;var s=[o.cssClasses.valueHorizontal,o.cssClasses.valueVertical],l=[o.cssClasses.markerHorizontal,o.cssClasses.markerVertical];function c(t,e){var r=e===o.cssClasses.value,n=r?i:a;return e+" "+(r?s:l)[o.ort]+" "+n[t]}return u(n,o.cssClasses.pips),u(n,0===o.ort?o.cssClasses.pipsHorizontal:o.cssClasses.pipsVertical),Object.keys(t).forEach((function(i){!function(t,i,a){if((a=e?e(i,a):a)!==A){var s=H(n,!1);s.className=c(a,o.cssClasses.marker),s.style[o.style]=t+"%",a>O&&((s=H(n,!1)).className=c(a,o.cssClasses.value),s.setAttribute("data-value",i),s.style[o.style]=t+"%",s.innerHTML=r.to(i))}}(i,t[i][0],t[i][1])})),n}function q(){m&&(e(m),m=null)}function X(e){q();var r=e.mode,n=e.density||1,o=e.filter||!1,i=function(e,r,n){if("range"===e||"steps"===e)return E.xVal;if("count"===e){if(r<2)throw new Error("noUiSlider ("+t+"): 'values' (>= 2) required for mode 'count'.");var o=r-1,i=100/o;for(r=[];o--;)r[o]=o*i;r.push(100),e="positions"}return"positions"===e?r.map((function(t){return E.fromStepping(n?E.getStep(t):t)})):"values"===e?n?r.map((function(t){return E.fromStepping(E.getStep(E.toStepping(t)))})):r:void 0}(r,e.values||!1,e.stepped||!1),a=function(t,e,r){var n,o={},i=E.xVal[0],a=E.xVal[E.xVal.length-1],s=!1,l=!1,u=0;return n=r.slice().sort((function(t,e){return t-e})),(r=n.filter((function(t){return!this[t]&&(this[t]=!0)}),{}))[0]!==i&&(r.unshift(i),s=!0),r[r.length-1]!==a&&(r.push(a),l=!0),r.forEach((function(n,i){var a,c,f,p,d,h,m,g,v,b,w=n,y=r[i+1],S="steps"===e;if(S&&(a=E.xNumSteps[i]),a||(a=y-w),!1!==w&&void 0!==y)for(a=Math.max(a,1e-7),c=w;c<=y;c=(c+a).toFixed(7)/1){for(g=(d=(p=E.toStepping(c))-u)/t,b=d/(v=Math.round(g)),f=1;f<=v;f+=1)o[(h=u+f*b).toFixed(5)]=[E.fromStepping(h),0];m=r.indexOf(c)>-1?T:S?V:O,!i&&s&&(m=0),c===y&&l||(o[p.toFixed(5)]=[c,m]),u=p}})),o}(n,r,i),s=e.format||{to:Math.round};return m=x.appendChild(Z(a,o,s))}function Q(){var t=p.getBoundingClientRect(),e="offset"+["Width","Height"][o.ort];return 0===o.ort?t.width||p[e]:t.height||p[e]}function G(t,e,r,n){var i=function(i){return!!(i=function(t,e,r){var n,o,i=0===t.type.indexOf("touch"),a=0===t.type.indexOf("mouse"),s=0===t.type.indexOf("pointer");if(0===t.type.indexOf("MSPointer")&&(s=!0),i){var l=function(t){return t.target===r||r.contains(t.target)};if("touchstart"===t.type){var u=Array.prototype.filter.call(t.touches,l);if(u.length>1)return!1;n=u[0].pageX,o=u[0].pageY}else{var c=Array.prototype.find.call(t.changedTouches,l);if(!c)return!1;n=c.pageX,o=c.pageY}}return e=e||f(k),(a||s)&&(n=t.clientX+e.x,o=t.clientY+e.y),t.pageOffset=e,t.points=[n,o],t.cursor=a||s,t}(i,n.pageOffset,n.target||e))&&!(F()&&!n.doNotReject)&&(a=x,s=o.cssClasses.tap,!((a.classList?a.classList.contains(s):new RegExp("\\b"+s+"\\b").test(a.className))&&!n.doNotReject)&&!(t===y.start&&void 0!==i.buttons&&i.buttons>1)&&(!n.hover||!i.buttons)&&(S||i.preventDefault(),i.calcPoint=i.points[o.ort],void r(i,n)));var a,s},a=[];return t.split(" ").forEach((function(t){e.addEventListener(t,i,!!S&&{passive:!0}),a.push([t,i])})),a}function K(t){var e,r,n,i,s,l,u=100*(t-(e=p,r=o.ort,n=e.getBoundingClientRect(),i=e.ownerDocument,s=i.documentElement,l=f(i),/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(l.x=0),r?n.top+l.y-s.clientTop:n.left+l.x-s.clientLeft))/Q();return u=a(u),o.dir?100-u:u}function $(t,e){"mouseout"===t.type&&"HTML"===t.target.nodeName&&null===t.relatedTarget&&tt(t,e)}function J(t,e){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===t.buttons&&0!==e.buttonsProperty)return tt(t,e);var r=(o.dir?-1:1)*(t.calcPoint-e.startCalcPoint);ut(r>0,100*r/e.baseSize,e.locations,e.handleNumbers)}function tt(t,e){e.handle&&(c(e.handle,o.cssClasses.active),M-=1),e.listeners.forEach((function(t){P.removeEventListener(t[0],t[1])})),0===M&&(c(x,o.cssClasses.drag),ft(),t.cursor&&(U.style.cursor="",U.removeEventListener("selectstart",n))),e.handleNumbers.forEach((function(t){at("change",t),at("set",t),at("end",t)}))}function et(t,e){if(e.handleNumbers.some(Y))return!1;var r;1===e.handleNumbers.length&&(r=d[e.handleNumbers[0]].children[0],M+=1,u(r,o.cssClasses.active)),t.stopPropagation();var i=[],a=G(y.move,P,J,{target:t.target,handle:r,listeners:i,startCalcPoint:t.calcPoint,baseSize:Q(),pageOffset:t.pageOffset,handleNumbers:e.handleNumbers,buttonsProperty:t.buttons,locations:N.slice()}),s=G(y.end,P,tt,{target:t.target,handle:r,listeners:i,doNotReject:!0,handleNumbers:e.handleNumbers}),l=G("mouseout",P,$,{target:t.target,handle:r,listeners:i,doNotReject:!0,handleNumbers:e.handleNumbers});i.push.apply(i,a.concat(s,l)),t.cursor&&(U.style.cursor=getComputedStyle(t.target).cursor,d.length>1&&u(x,o.cssClasses.drag),U.addEventListener("selectstart",n,!1)),e.handleNumbers.forEach((function(t){at("start",t)}))}function rt(t){t.stopPropagation();var e=K(t.calcPoint),r=function(t){var e=100,r=!1;return d.forEach((function(n,o){if(!Y(o)){var i=N[o],a=Math.abs(i-t);(a<e||a<=e&&t>i||100===a&&100===e)&&(r=o,e=a)}})),r}(e);if(!1===r)return!1;o.events.snap||i(x,o.cssClasses.tap,o.animationDuration),pt(r,e,!0,!0),ft(),at("slide",r,!0),at("update",r,!0),at("change",r,!0),at("set",r,!0),o.events.snap&&et(t,{handleNumbers:[r]})}function nt(t){var e=K(t.calcPoint),r=E.getStep(e),n=E.fromStepping(r);Object.keys(L).forEach((function(t){"hover"===t.split(".")[0]&&L[t].forEach((function(t){t.call(v,n)}))}))}function ot(t,e){L[t]=L[t]||[],L[t].push(e),"update"===t.split(".")[0]&&d.forEach((function(t,e){at("update",e)}))}function it(t){var e=t&&t.split(".")[0],r=e&&t.substring(e.length);Object.keys(L).forEach((function(t){var n=t.split(".")[0],o=t.substring(n.length);e&&e!==n||r&&r!==o||delete L[t]}))}function at(t,e,r){Object.keys(L).forEach((function(n){var i=n.split(".")[0];t===i&&L[n].forEach((function(t){t.call(v,C.map(o.format.to),e,C.slice(),r||!1,N.slice())}))}))}function st(t,e,r,n,i,s){return d.length>1&&!o.events.unconstrained&&(n&&e>0&&(r=Math.max(r,t[e-1]+o.margin)),i&&e<d.length-1&&(r=Math.min(r,t[e+1]-o.margin))),d.length>1&&o.limit&&(n&&e>0&&(r=Math.min(r,t[e-1]+o.limit)),i&&e<d.length-1&&(r=Math.max(r,t[e+1]-o.limit))),o.padding&&(0===e&&(r=Math.max(r,o.padding[0])),e===d.length-1&&(r=Math.min(r,100-o.padding[1]))),!((r=a(r=E.getStep(r)))===t[e]&&!s)&&r}function lt(t,e){var r=o.ort;return(r?e:t)+", "+(r?t:e)}function ut(t,e,r,n){var o=r.slice(),i=[!t,t],a=[t,!t];n=n.slice(),t&&n.reverse(),n.length>1?n.forEach((function(t,r){var n=st(o,t,o[t]+e,i[r],a[r],!1);!1===n?e=0:(e=n-o[t],o[t]=n)})):i=a=[!0];var s=!1;n.forEach((function(t,n){s=pt(t,r[t]+e,i[n],a[n])||s})),s&&n.forEach((function(t){at("update",t),at("slide",t)}))}function ct(t,e){return o.dir?100-t-e:t}function ft(){_.forEach((function(t){var e=N[t]>50?-1:1,r=3+(d.length+e*t);d[t].style.zIndex=r}))}function pt(t,e,r,n){return!1!==(e=st(N,t,e,r,n,!1))&&(function(t,e){N[t]=e,C[t]=E.fromStepping(e);var r="translate("+lt(10*(ct(e,0)-j)+"%","0")+")";d[t].style[o.transformRule]=r,dt(t),dt(t+1)}(t,e),!0)}function dt(t){if(h[t]){var e=0,r=100;0!==t&&(e=N[t-1]),t!==h.length-1&&(r=N[t]);var n=r-e,i="translate("+lt(ct(e,n)+"%","0")+")",a="scale("+lt(n/100,"1")+")";h[t].style[o.transformRule]=i+" "+a}}function ht(t,e){return null===t||!1===t||void 0===t?N[e]:("number"==typeof t&&(t=String(t)),t=o.format.from(t),!1===(t=E.toStepping(t))||isNaN(t)?N[e]:t)}function mt(t,e){var r=s(t),n=void 0===N[0];e=void 0===e||!!e,o.animate&&!n&&i(x,o.cssClasses.tap,o.animationDuration),_.forEach((function(t){pt(t,ht(r[t],t),!0,!1)}));for(var a=1===_.length?0:1;a<_.length;++a)_.forEach((function(t){pt(t,N[t],!0,!0)}));ft(),_.forEach((function(t){at("update",t),null!==r[t]&&e&&at("set",t)}))}function gt(){var t=C.map(o.format.to);return 1===t.length?t[0]:t}function vt(t){var e=N[t],r=E.getNearbySteps(e),n=C[t],i=r.thisStep.step,a=null;if(o.snap)return[n-r.stepBefore.startValue||null,r.stepAfter.startValue-n||null];!1!==i&&n+i>r.stepAfter.startValue&&(i=r.stepAfter.startValue-n),a=n>r.thisStep.startValue?r.thisStep.step:!1!==r.stepBefore.step&&n-r.stepBefore.highestStep,100===e?i=null:0===e&&(a=null);var s=E.countStepDecimals();return null!==i&&!1!==i&&(i=Number(i.toFixed(s))),null!==a&&!1!==a&&(a=Number(a.toFixed(s))),[a,i]}return u(b=x,o.cssClasses.target),0===o.dir?u(b,o.cssClasses.ltr):u(b,o.cssClasses.rtl),0===o.ort?u(b,o.cssClasses.horizontal):u(b,o.cssClasses.vertical),p=H(b,o.cssClasses.base),function(t,e){var r=H(e,o.cssClasses.connects);d=[],(h=[]).push(z(r,t[0]));for(var n=0;n<o.handles;n++)d.push(R(e,n)),_[n]=n,h.push(z(r,t[n+1]))}(o.connect,p),(w=o.events).fixed||d.forEach((function(t,e){G(y.start,t.children[0],et,{handleNumbers:[e]})})),w.tap&&G(y.start,p,rt,{}),w.hover&&G(y.move,p,nt,{hover:!0}),w.drag&&h.forEach((function(t,e){if(!1!==t&&0!==e&&e!==h.length-1){var r=d[e-1],n=d[e],i=[t];u(t,o.cssClasses.draggable),w.fixed&&(i.push(r.children[0]),i.push(n.children[0])),i.forEach((function(t){G(y.start,t,et,{handles:[r,n],handleNumbers:[e-1,e]})}))}})),mt(o.start),o.pips&&X(o.pips),o.tooltips&&W(),ot("update",(function(t,e,r,n,i){_.forEach((function(t){var e=d[t],n=st(N,t,0,!0,!0,!0),a=st(N,t,100,!0,!0,!0),s=i[t],l=o.ariaFormat.to(r[t]);n=E.fromStepping(n).toFixed(1),a=E.fromStepping(a).toFixed(1),s=E.fromStepping(s).toFixed(1),e.children[0].setAttribute("aria-valuemin",n),e.children[0].setAttribute("aria-valuemax",a),e.children[0].setAttribute("aria-valuenow",s),e.children[0].setAttribute("aria-valuetext",l)}))})),v={destroy:function(){for(var t in o.cssClasses)o.cssClasses.hasOwnProperty(t)&&c(x,o.cssClasses[t]);for(;x.firstChild;)x.removeChild(x.firstChild);delete x.noUiSlider},steps:function(){return _.map(vt)},on:ot,off:it,get:gt,set:mt,setHandle:function(e,r,n){if(!((e=Number(e))>=0&&e<_.length))throw new Error("noUiSlider ("+t+"): invalid handle number, got: "+e);pt(e,ht(r,e),!0,!0),at("update",e),n&&at("set",e)},reset:function(t){mt(o.start,t)},__moveHandles:function(t,e,r){ut(t,e,N,r)},options:l,updateOptions:function(t,e){var r=gt(),n=["margin","limit","padding","range","animate","snap","step","format","pips","tooltips"];n.forEach((function(e){void 0!==t[e]&&(l[e]=t[e])}));var i=B(l);n.forEach((function(e){void 0!==t[e]&&(o[e]=i[e])})),E=i.spectrum,o.margin=i.margin,o.limit=i.limit,o.padding=i.padding,o.pips?X(o.pips):q(),o.tooltips?W():I(),N=[],mt(t.start||r,e)},target:x,removePips:q,removeTooltips:I,pips:X}}return{__spectrum:w,version:t,create:function(e,r){if(!e||!e.nodeName)throw new Error("noUiSlider ("+t+"): create requires a single element, got: "+e);if(e.noUiSlider)throw new Error("noUiSlider ("+t+"): Slider was already initialized.");var n=Y(e,B(r),r);return e.noUiSlider=n,n}}})?n.apply(e,o):n)||(t.exports=i)},function(t,e,r){"use strict";r(4);var n=i(r(2)),o=i(r(3));function i(t){return t&&t.__esModule?t:{default:t}}(0,n.default)(),(0,o.default)()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{!n&&s.return&&s.return()}finally{if(o)throw i}}return r}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")};e.default=function(){var t=window.L.map("points-map").setView([55.8,12.5],8);t.scrollWheelZoom.disable(),window.L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{maxZoom:18}).addTo(t);var e=new window.carto.Client({apiKey:"okNxK8jzzM39Lpj-7ZHYcw",username:"benna100"}),r=new window.carto.source.SQL("SELECT * FROM distances"),o=document.querySelector(".points-map .slider");a.default.create(o,{start:3300,connect:[!0,!1],range:{min:0,max:8e3}});var i=document.querySelector(".points-map .slider-container p span");o.noUiSlider.on("update",(function(t){var e=n(t,1)[0];i.innerHTML=function(t){t=Number(t);var e=Math.floor(t/3600),r=Math.floor(t%3600/60);return(e>0?e+(1===e?" hour, ":" hours, "):"")+(r>0?r+(1===r?" minute":" minutes"):"")}(e),r.setQuery("\n          SELECT *\n            FROM distances\n            WHERE durationinseconds <= "+e+"\n        ")}));var s=new window.carto.style.CartoCSS("\n      #layer {\n        marker-width: 7;\n        marker-fill-opacity: 0.5;\n        marker-allow-overlap: true;\n        marker-line-width: 0;\n      }\n      \n      #layer {\n        [durationinseconds > 0] {\n          marker-fill: #ecda9a;\n        }\n        [durationinseconds > 1200] {\n          marker-fill: #efc47e;\n        }\n        [durationinseconds > 2400] {\n          marker-fill: #f3ad6a;\n        }\n        [durationinseconds > 3600] {\n          marker-fill: #f7945d;\n        }\n        [durationinseconds > 4800] {\n          marker-fill: #f97b57;\n        }\n        [durationinseconds > 6000] {\n          marker-fill: #f66356;\n        }\n        [durationinseconds > 7200] {\n          marker-fill: #ee4d5a;\n        }\n      }\n    "),l=new window.carto.layer.Layer(r,s);e.addLayer(l),e.getLeafletLayer().addTo(t)};var o,i=r(0),a=(o=i)&&o.__esModule?o:{default:o};r(9)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{!n&&s.return&&s.return()}finally{if(o)throw i}}return r}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")};e.default=function(){var t=window.L.map("house-sales").setView([55.8,12.5],8);t.scrollWheelZoom.disable(),window.L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{maxZoom:18}).addTo(t);var e=new window.carto.Client({apiKey:"okNxK8jzzM39Lpj-7ZHYcw",username:"benna100"}),r=new window.carto.source.SQL('\n          -- Create hexagon grid\n          WITH hgrid AS (\n              SELECT CDB_HexagonGrid(\n                  ST_Expand(!bbox!, CDB_XYZ_Resolution(9) * 15),\n                  CDB_XYZ_Resolution(9) * 15) as cell\n              )\n\n          -- select the data from the "virtual table" hgrid, which has been created\n          -- using the "WITH" statement of PostgreSQL,\n          -- that intesects with the dataset of points "stormevents_locations_2014"\n\n          SELECT  hgrid.cell as the_geom_webmercator,\n                  avg(price) as agg_value,\n                  row_number() over () as cartodb_id\n          FROM hgrid, (SELECT * FROM house_sales_with_combined_scoring) i\n          WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell) AND priceAndCommuteScoring != 0\n          GROUP BY hgrid.cell\n\n        '),o=document.querySelector(".house-sales-map .slider.duration");a.default.create(o,{start:3300,connect:[!0,!1],range:{min:0,max:8e3}});var i=document.querySelector(".house-sales-map .slider-container.duration p span"),s=3300;o.noUiSlider.on("update",(function(t){var e=n(t,1)[0];s=e,i.innerHTML=function(t){t=Number(t);var e=Math.floor(t/3600),r=Math.floor(t%3600/60);return(e>0?e+(1===e?" hour, ":" hours, "):"")+(r>0?r+(1===r?" minute":" minutes"):"")}(s),r.setQuery('\n        -- Create hexagon grid\n        WITH hgrid AS (\n            SELECT CDB_HexagonGrid(\n                ST_Expand(!bbox!, CDB_XYZ_Resolution(9) * 15),\n                CDB_XYZ_Resolution(9) * 15) as cell\n            )\n\n        -- select the data from the "virtual table" hgrid, which has been created\n        -- using the "WITH" statement of PostgreSQL,\n        -- that intesects with the dataset of points "stormevents_locations_2014"\n\n        SELECT  hgrid.cell as the_geom_webmercator,\n                avg(price) as agg_value,\n                row_number() over () as cartodb_id\n        FROM hgrid, (SELECT * FROM house_sales_with_combined_scoring) i\n        WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell) AND duration <= '+s+" AND priceAndCommuteScoring != 0\n        GROUP BY hgrid.cell\n\n        ")}));var l=new window.carto.style.CartoCSS("\n    #layer {\n      polygon-opacity: 0.74;\n\n      [agg_value > 0] {\n        polygon-fill: #fcbba1;\n      }\n      [agg_value > 1500000] {\n        polygon-fill: #fc9272;\n      }\n      [agg_value > 3000000] {\n        polygon-fill: #fb6a4a;\n      }\n      [agg_value > 4500000] {\n        polygon-fill: #de2d26;\n      }\n      [agg_value > 6000000] {\n        polygon-fill: #a50f15;\n      }\n    }\n\n        "),u=new window.carto.layer.Layer(r,l);e.addLayer(u),e.getLeafletLayer().addTo(t)};var o,i=r(0),a=(o=i)&&o.__esModule?o:{default:o};r(9)},function(t,e){},,,,,function(t,e){}]);
//# sourceMappingURL=main.abcb28e7747af18cfcec.js.map