!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n(4);var r=i(n(1)),o=i(n(3));function i(t){return t&&t.__esModule?t:{default:t}}(0,r.default)(),(0,o.default)()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){var t=window.L.map("points-map").setView([55.8,12.5],8);t.scrollWheelZoom.disable(),window.L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{maxZoom:18}).addTo(t);var e=new window.carto.Client({apiKey:"1f1dc35961988be9137b98bd163fe8927f1b68bc",username:"benna100"}),n=new window.carto.source.SQL("SELECT * FROM distances"),r=document.querySelector(".slider");i.default.create(r,{start:3300,connect:[!0,!1],range:{min:0,max:8e3}});var o=document.querySelector(".slider-container p span");r.noUiSlider.on("update",(function(t,e){o.innerHTML=function(t){t=Number(t);var e=Math.floor(t/3600),n=Math.floor(t%3600/60);return(e>0?e+(1===e?" hour, ":" hours, "):"")+(n>0?n+(1===n?" minute":" minutes"):"")}(t[e]);var r=t[0];n.setQuery("\n    SELECT *\n      FROM distances\n      WHERE durationinseconds <= "+r+"\n  ")}));var a=new window.carto.style.CartoCSS("\n  #layer {\n    marker-width: 7;\n    marker-fill-opacity: 0.5;\n    marker-allow-overlap: true;\n    marker-line-width: 0;\n  }\n  \n  #layer {\n    [durationinseconds > 0] {\n      marker-fill: #ecda9a;\n    }\n    [durationinseconds > 1200] {\n      marker-fill: #efc47e;\n    }\n    [durationinseconds > 2400] {\n      marker-fill: #f3ad6a;\n    }\n    [durationinseconds > 3600] {\n      marker-fill: #f7945d;\n    }\n    [durationinseconds > 4800] {\n      marker-fill: #f97b57;\n    }\n    [durationinseconds > 6000] {\n      marker-fill: #f66356;\n    }\n    [durationinseconds > 7200] {\n      marker-fill: #ee4d5a;\n    }\n  }\n        "),s=new window.carto.layer.Layer(n,a);e.addLayer(s),e.getLeafletLayer().addTo(t)};var r,o=n(2),i=(r=o)&&r.__esModule?r:{default:r};n(9)},function(t,e,n){var r,o,i;/*! nouislider - 14.0.3 - 10/10/2019 */o=[],void 0===(i="function"==typeof(r=function(){"use strict";var t="14.0.3";function e(t){t.parentElement.removeChild(t)}function n(t){return null!=t}function r(t){t.preventDefault()}function o(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function i(t,e,n){n>0&&(u(t,e),setTimeout((function(){c(t,e)}),n))}function a(t){return Math.max(Math.min(t,100),0)}function s(t){return Array.isArray(t)?t:[t]}function l(t){var e=(t=String(t)).split(".");return e.length>1?e[1].length:0}function u(t,e){t.classList?t.classList.add(e):t.className+=" "+e}function c(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}function f(t){var e=void 0!==window.pageXOffset,n="CSS1Compat"===(t.compatMode||"");return{x:e?window.pageXOffset:n?t.documentElement.scrollLeft:t.body.scrollLeft,y:e?window.pageYOffset:n?t.documentElement.scrollTop:t.body.scrollTop}}function p(t,e){return 100/(e-t)}function d(t,e){return 100*e/(t[1]-t[0])}function h(t,e){for(var n=1;t>=e[n];)n+=1;return n}function m(t,e,n){if(n>=t.slice(-1)[0])return 100;var r=h(n,t),o=t[r-1],i=t[r],a=e[r-1],s=e[r];return a+function(t,e){return d(t,t[0]<0?e+Math.abs(t[0]):e-t[0])}([o,i],n)/p(a,s)}function g(t,e,n,r){if(100===r)return r;var o=h(r,t),i=t[o-1],a=t[o];return n?r-i>(a-i)/2?a:i:e[o-1]?t[o-1]+function(t,e){return Math.round(t/e)*e}(r-t[o-1],e[o-1]):r}function v(e,n,r){var i;if("number"==typeof n&&(n=[n]),!Array.isArray(n))throw new Error("noUiSlider ("+t+"): 'range' contains invalid value.");if(!o(i="min"===e?0:"max"===e?100:parseFloat(e))||!o(n[0]))throw new Error("noUiSlider ("+t+"): 'range' value isn't numeric.");r.xPct.push(i),r.xVal.push(n[0]),i?r.xSteps.push(!isNaN(n[1])&&n[1]):isNaN(n[1])||(r.xSteps[0]=n[1]),r.xHighestCompleteStep.push(0)}function b(t,e,n){if(e)if(n.xVal[t]!==n.xVal[t+1]){n.xSteps[t]=d([n.xVal[t],n.xVal[t+1]],e)/p(n.xPct[t],n.xPct[t+1]);var r=(n.xVal[t+1]-n.xVal[t])/n.xNumSteps[t],o=Math.ceil(Number(r.toFixed(3))-1),i=n.xVal[t]+n.xNumSteps[t]*o;n.xHighestCompleteStep[t]=i}else n.xSteps[t]=n.xHighestCompleteStep[t]=n.xVal[t]}function w(t,e,n){var r;this.xPct=[],this.xVal=[],this.xSteps=[n||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=e;var o=[];for(r in t)t.hasOwnProperty(r)&&o.push([t[r],r]);for(o.length&&"object"==typeof o[0][0]?o.sort((function(t,e){return t[0][0]-e[0][0]})):o.sort((function(t,e){return t[0]-e[0]})),r=0;r<o.length;r++)v(o[r][1],o[r][0],this);for(this.xNumSteps=this.xSteps.slice(0),r=0;r<this.xNumSteps.length;r++)b(r,this.xNumSteps[r],this)}w.prototype.getMargin=function(e){var n=this.xNumSteps[0];if(n&&e/n%1!=0)throw new Error("noUiSlider ("+t+"): 'limit', 'margin' and 'padding' must be divisible by step.");return 2===this.xPct.length&&d(this.xVal,e)},w.prototype.toStepping=function(t){return t=m(this.xVal,this.xPct,t)},w.prototype.fromStepping=function(t){return function(t,e,n){if(n>=100)return t.slice(-1)[0];var r=h(n,e),o=t[r-1],i=t[r],a=e[r-1];return function(t,e){return e*(t[1]-t[0])/100+t[0]}([o,i],(n-a)*p(a,e[r]))}(this.xVal,this.xPct,t)},w.prototype.getStep=function(t){return t=g(this.xPct,this.xSteps,this.snap,t)},w.prototype.getDefaultStep=function(t,e,n){var r=h(t,this.xPct);return(100===t||e&&t===this.xPct[r-1])&&(r=Math.max(r-1,1)),(this.xVal[r]-this.xVal[r-1])/n},w.prototype.getNearbySteps=function(t){var e=h(t,this.xPct);return{stepBefore:{startValue:this.xVal[e-2],step:this.xNumSteps[e-2],highestStep:this.xHighestCompleteStep[e-2]},thisStep:{startValue:this.xVal[e-1],step:this.xNumSteps[e-1],highestStep:this.xHighestCompleteStep[e-1]},stepAfter:{startValue:this.xVal[e],step:this.xNumSteps[e],highestStep:this.xHighestCompleteStep[e]}}},w.prototype.countStepDecimals=function(){var t=this.xNumSteps.map(l);return Math.max.apply(null,t)},w.prototype.convert=function(t){return this.getStep(this.toStepping(t))};var y={to:function(t){return void 0!==t&&t.toFixed(2)},from:Number};function S(e){if(function(t){return"object"==typeof t&&"function"==typeof t.to&&"function"==typeof t.from}(e))return!0;throw new Error("noUiSlider ("+t+"): 'format' requires 'to' and 'from' methods.")}function x(e,n){if(!o(n))throw new Error("noUiSlider ("+t+"): 'step' is not numeric.");e.singleStep=n}function E(e,n){if("object"!=typeof n||Array.isArray(n))throw new Error("noUiSlider ("+t+"): 'range' is not an object.");if(void 0===n.min||void 0===n.max)throw new Error("noUiSlider ("+t+"): Missing 'min' or 'max' in 'range'.");if(n.min===n.max)throw new Error("noUiSlider ("+t+"): 'range' 'min' and 'max' cannot be equal.");e.spectrum=new w(n,e.snap,e.singleStep)}function C(e,n){if(n=s(n),!Array.isArray(n)||!n.length)throw new Error("noUiSlider ("+t+"): 'start' option is incorrect.");e.handles=n.length,e.start=n}function N(e,n){if(e.snap=n,"boolean"!=typeof n)throw new Error("noUiSlider ("+t+"): 'snap' option must be a boolean.")}function k(e,n){if(e.animate=n,"boolean"!=typeof n)throw new Error("noUiSlider ("+t+"): 'animate' option must be a boolean.")}function M(e,n){if(e.animationDuration=n,"number"!=typeof n)throw new Error("noUiSlider ("+t+"): 'animationDuration' option must be a number.")}function L(e,n){var r,o=[!1];if("lower"===n?n=[!0,!1]:"upper"===n&&(n=[!1,!0]),!0===n||!1===n){for(r=1;r<e.handles;r++)o.push(n);o.push(!1)}else{if(!Array.isArray(n)||!n.length||n.length!==e.handles+1)throw new Error("noUiSlider ("+t+"): 'connect' option doesn't match handle count.");o=n}e.connect=o}function P(e,n){switch(n){case"horizontal":e.ort=0;break;case"vertical":e.ort=1;break;default:throw new Error("noUiSlider ("+t+"): 'orientation' option is invalid.")}}function U(e,n){if(!o(n))throw new Error("noUiSlider ("+t+"): 'margin' option must be numeric.");if(0!==n&&(e.margin=e.spectrum.getMargin(n),!e.margin))throw new Error("noUiSlider ("+t+"): 'margin' option is only supported on linear sliders.")}function O(e,n){if(!o(n))throw new Error("noUiSlider ("+t+"): 'limit' option must be numeric.");if(e.limit=e.spectrum.getMargin(n),!e.limit||e.handles<2)throw new Error("noUiSlider ("+t+"): 'limit' option is only supported on linear sliders with 2 or more handles.")}function _(e,n){if(!o(n)&&!Array.isArray(n))throw new Error("noUiSlider ("+t+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(n)&&2!==n.length&&!o(n[0])&&!o(n[1]))throw new Error("noUiSlider ("+t+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==n){if(Array.isArray(n)||(n=[n,n]),e.padding=[e.spectrum.getMargin(n[0]),e.spectrum.getMargin(n[1])],!1===e.padding[0]||!1===e.padding[1])throw new Error("noUiSlider ("+t+"): 'padding' option is only supported on linear sliders.");if(e.padding[0]<0||e.padding[1]<0)throw new Error("noUiSlider ("+t+"): 'padding' option must be a positive number(s).");if(e.padding[0]+e.padding[1]>100)throw new Error("noUiSlider ("+t+"): 'padding' option must not exceed 100% of the range.")}}function V(e,n){switch(n){case"ltr":e.dir=0;break;case"rtl":e.dir=1;break;default:throw new Error("noUiSlider ("+t+"): 'direction' option was not recognized.")}}function A(e,n){if("string"!=typeof n)throw new Error("noUiSlider ("+t+"): 'behaviour' must be a string containing options.");var r=n.indexOf("tap")>=0,o=n.indexOf("drag")>=0,i=n.indexOf("fixed")>=0,a=n.indexOf("snap")>=0,s=n.indexOf("hover")>=0,l=n.indexOf("unconstrained")>=0;if(i){if(2!==e.handles)throw new Error("noUiSlider ("+t+"): 'fixed' behaviour must be used with 2 handles");U(e,e.start[1]-e.start[0])}if(l&&(e.margin||e.limit))throw new Error("noUiSlider ("+t+"): 'unconstrained' behaviour cannot be used with margin or limit");e.events={tap:r||a,drag:o,fixed:i,snap:a,hover:s,unconstrained:l}}function T(e,n){if(!1!==n)if(!0===n){e.tooltips=[];for(var r=0;r<e.handles;r++)e.tooltips.push(!0)}else{if(e.tooltips=s(n),e.tooltips.length!==e.handles)throw new Error("noUiSlider ("+t+"): must pass a formatter for all handles.");e.tooltips.forEach((function(e){if("boolean"!=typeof e&&("object"!=typeof e||"function"!=typeof e.to))throw new Error("noUiSlider ("+t+"): 'tooltips' must be passed a formatter or 'false'.")}))}}function j(t,e){t.ariaFormat=e,S(e)}function H(t,e){t.format=e,S(e)}function z(e,n){if(e.keyboardSupport=n,"boolean"!=typeof n)throw new Error("noUiSlider ("+t+"): 'keyboardSupport' option must be a boolean.")}function F(t,e){t.documentElement=e}function R(e,n){if("string"!=typeof n&&!1!==n)throw new Error("noUiSlider ("+t+"): 'cssPrefix' must be a string or `false`.");e.cssPrefix=n}function D(e,n){if("object"!=typeof n)throw new Error("noUiSlider ("+t+"): 'cssClasses' must be an object.");if("string"==typeof e.cssPrefix)for(var r in e.cssClasses={},n)n.hasOwnProperty(r)&&(e.cssClasses[r]=e.cssPrefix+n[r]);else e.cssClasses=n}function B(e){var r={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,ariaFormat:y,format:y},o={step:{r:!1,t:x},start:{r:!0,t:C},connect:{r:!0,t:L},direction:{r:!0,t:V},snap:{r:!1,t:N},animate:{r:!1,t:k},animationDuration:{r:!1,t:M},range:{r:!0,t:E},orientation:{r:!1,t:P},margin:{r:!1,t:U},limit:{r:!1,t:O},padding:{r:!1,t:_},behaviour:{r:!0,t:A},ariaFormat:{r:!1,t:j},format:{r:!1,t:H},tooltips:{r:!1,t:T},keyboardSupport:{r:!0,t:z},documentElement:{r:!1,t:F},cssPrefix:{r:!0,t:R},cssClasses:{r:!0,t:D}},i={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",keyboardSupport:!0,cssPrefix:"noUi-",cssClasses:{target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",touchArea:"touch-area",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"}};e.format&&!e.ariaFormat&&(e.ariaFormat=e.format),Object.keys(o).forEach((function(a){if(!n(e[a])&&void 0===i[a]){if(o[a].r)throw new Error("noUiSlider ("+t+"): '"+a+"' is required.");return!0}o[a].t(r,n(e[a])?e[a]:i[a])})),r.pips=e.pips;var a=document.createElement("div"),s=void 0!==a.style.msTransform,l=void 0!==a.style.transform;return r.transformRule=l?"transform":s?"msTransform":"webkitTransform",r.style=[["left","top"],["right","bottom"]][r.dir][r.ort],r}function q(n,o,l){var p,d,h,m,g,v,b,w,y=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},S=window.CSS&&CSS.supports&&CSS.supports("touch-action","none")&&function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}(),x=n,E=o.spectrum,C=[],N=[],k=[],M=0,L={},P=n.ownerDocument,U=o.documentElement||P.documentElement,O=P.body,_=-1,V=0,A=1,T=2,j="rtl"===P.dir||1===o.ort?0:100;function H(t,e){var n=P.createElement("div");return e&&u(n,e),t.appendChild(n),n}function z(t,e){var n=H(t,o.cssClasses.origin),r=H(n,o.cssClasses.handle);return H(r,o.cssClasses.touchArea),r.setAttribute("data-handle",e),o.keyboardSupport&&(r.setAttribute("tabindex","0"),r.addEventListener("keydown",(function(t){return function(t,e){if(D()||q(e))return!1;var n=["Left","Right"],r=["Down","Up"];o.dir&&!o.ort?n.reverse():o.ort&&!o.dir&&r.reverse();var i=t.key.replace("Arrow",""),a=i===r[0]||i===n[0],s=i===r[1]||i===n[1];if(!a&&!s)return!0;t.preventDefault();var l=a?0:1,u=vt(e)[l];return null!==u&&(!1===u&&(u=E.getDefaultStep(N[e],a,10)),u=Math.max(u,1e-7),u*=a?-1:1,pt(e,E.toStepping(C[e]+u),!0,!0),at("slide",e),at("update",e),at("change",e),at("set",e),!1)}(t,e)}))),r.setAttribute("role","slider"),r.setAttribute("aria-orientation",o.ort?"vertical":"horizontal"),0===e?u(r,o.cssClasses.handleLower):e===o.handles-1&&u(r,o.cssClasses.handleUpper),n}function F(t,e){return!!e&&H(t,o.cssClasses.connect)}function R(t,e){return!!o.tooltips[e]&&H(t.firstChild,o.cssClasses.tooltip)}function D(){return x.hasAttribute("disabled")}function q(t){return d[t].hasAttribute("disabled")}function W(){g&&(it("update.tooltips"),g.forEach((function(t){t&&e(t)})),g=null)}function X(){W(),g=d.map(R),ot("update.tooltips",(function(t,e,n){if(g[e]){var r=t[e];!0!==o.tooltips[e]&&(r=o.tooltips[e].to(n[e])),g[e].innerHTML=r}}))}function Y(t,e,n){var r=P.createElement("div"),i=[];i[V]=o.cssClasses.valueNormal,i[A]=o.cssClasses.valueLarge,i[T]=o.cssClasses.valueSub;var a=[];a[V]=o.cssClasses.markerNormal,a[A]=o.cssClasses.markerLarge,a[T]=o.cssClasses.markerSub;var s=[o.cssClasses.valueHorizontal,o.cssClasses.valueVertical],l=[o.cssClasses.markerHorizontal,o.cssClasses.markerVertical];function c(t,e){var n=e===o.cssClasses.value,r=n?i:a;return e+" "+(n?s:l)[o.ort]+" "+r[t]}return u(r,o.cssClasses.pips),u(r,0===o.ort?o.cssClasses.pipsHorizontal:o.cssClasses.pipsVertical),Object.keys(t).forEach((function(i){!function(t,i,a){if((a=e?e(i,a):a)!==_){var s=H(r,!1);s.className=c(a,o.cssClasses.marker),s.style[o.style]=t+"%",a>V&&((s=H(r,!1)).className=c(a,o.cssClasses.value),s.setAttribute("data-value",i),s.style[o.style]=t+"%",s.innerHTML=n.to(i))}}(i,t[i][0],t[i][1])})),r}function Z(){m&&(e(m),m=null)}function I(e){Z();var n=e.mode,r=e.density||1,o=e.filter||!1,i=function(e,n,r){if("range"===e||"steps"===e)return E.xVal;if("count"===e){if(n<2)throw new Error("noUiSlider ("+t+"): 'values' (>= 2) required for mode 'count'.");var o=n-1,i=100/o;for(n=[];o--;)n[o]=o*i;n.push(100),e="positions"}return"positions"===e?n.map((function(t){return E.fromStepping(r?E.getStep(t):t)})):"values"===e?r?n.map((function(t){return E.fromStepping(E.getStep(E.toStepping(t)))})):n:void 0}(n,e.values||!1,e.stepped||!1),a=function(t,e,n){var r,o={},i=E.xVal[0],a=E.xVal[E.xVal.length-1],s=!1,l=!1,u=0;return r=n.slice().sort((function(t,e){return t-e})),(n=r.filter((function(t){return!this[t]&&(this[t]=!0)}),{}))[0]!==i&&(n.unshift(i),s=!0),n[n.length-1]!==a&&(n.push(a),l=!0),n.forEach((function(r,i){var a,c,f,p,d,h,m,g,v,b,w=r,y=n[i+1],S="steps"===e;if(S&&(a=E.xNumSteps[i]),a||(a=y-w),!1!==w&&void 0!==y)for(a=Math.max(a,1e-7),c=w;c<=y;c=(c+a).toFixed(7)/1){for(g=(d=(p=E.toStepping(c))-u)/t,b=d/(v=Math.round(g)),f=1;f<=v;f+=1)o[(h=u+f*b).toFixed(5)]=[E.fromStepping(h),0];m=n.indexOf(c)>-1?A:S?T:V,!i&&s&&(m=0),c===y&&l||(o[p.toFixed(5)]=[c,m]),u=p}})),o}(r,n,i),s=e.format||{to:Math.round};return m=x.appendChild(Y(a,o,s))}function Q(){var t=p.getBoundingClientRect(),e="offset"+["Width","Height"][o.ort];return 0===o.ort?t.width||p[e]:t.height||p[e]}function G(t,e,n,r){var i=function(i){return!!(i=function(t,e,n){var r,o,i=0===t.type.indexOf("touch"),a=0===t.type.indexOf("mouse"),s=0===t.type.indexOf("pointer");if(0===t.type.indexOf("MSPointer")&&(s=!0),i){var l=function(t){return t.target===n||n.contains(t.target)};if("touchstart"===t.type){var u=Array.prototype.filter.call(t.touches,l);if(u.length>1)return!1;r=u[0].pageX,o=u[0].pageY}else{var c=Array.prototype.find.call(t.changedTouches,l);if(!c)return!1;r=c.pageX,o=c.pageY}}return e=e||f(P),(a||s)&&(r=t.clientX+e.x,o=t.clientY+e.y),t.pageOffset=e,t.points=[r,o],t.cursor=a||s,t}(i,r.pageOffset,r.target||e))&&!(D()&&!r.doNotReject)&&(a=x,s=o.cssClasses.tap,!((a.classList?a.classList.contains(s):new RegExp("\\b"+s+"\\b").test(a.className))&&!r.doNotReject)&&!(t===y.start&&void 0!==i.buttons&&i.buttons>1)&&(!r.hover||!i.buttons)&&(S||i.preventDefault(),i.calcPoint=i.points[o.ort],void n(i,r)));var a,s},a=[];return t.split(" ").forEach((function(t){e.addEventListener(t,i,!!S&&{passive:!0}),a.push([t,i])})),a}function K(t){var e,n,r,i,s,l,u=100*(t-(e=p,n=o.ort,r=e.getBoundingClientRect(),i=e.ownerDocument,s=i.documentElement,l=f(i),/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(l.x=0),n?r.top+l.y-s.clientTop:r.left+l.x-s.clientLeft))/Q();return u=a(u),o.dir?100-u:u}function $(t,e){"mouseout"===t.type&&"HTML"===t.target.nodeName&&null===t.relatedTarget&&tt(t,e)}function J(t,e){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===t.buttons&&0!==e.buttonsProperty)return tt(t,e);var n=(o.dir?-1:1)*(t.calcPoint-e.startCalcPoint);ut(n>0,100*n/e.baseSize,e.locations,e.handleNumbers)}function tt(t,e){e.handle&&(c(e.handle,o.cssClasses.active),M-=1),e.listeners.forEach((function(t){U.removeEventListener(t[0],t[1])})),0===M&&(c(x,o.cssClasses.drag),ft(),t.cursor&&(O.style.cursor="",O.removeEventListener("selectstart",r))),e.handleNumbers.forEach((function(t){at("change",t),at("set",t),at("end",t)}))}function et(t,e){if(e.handleNumbers.some(q))return!1;var n;1===e.handleNumbers.length&&(n=d[e.handleNumbers[0]].children[0],M+=1,u(n,o.cssClasses.active)),t.stopPropagation();var i=[],a=G(y.move,U,J,{target:t.target,handle:n,listeners:i,startCalcPoint:t.calcPoint,baseSize:Q(),pageOffset:t.pageOffset,handleNumbers:e.handleNumbers,buttonsProperty:t.buttons,locations:N.slice()}),s=G(y.end,U,tt,{target:t.target,handle:n,listeners:i,doNotReject:!0,handleNumbers:e.handleNumbers}),l=G("mouseout",U,$,{target:t.target,handle:n,listeners:i,doNotReject:!0,handleNumbers:e.handleNumbers});i.push.apply(i,a.concat(s,l)),t.cursor&&(O.style.cursor=getComputedStyle(t.target).cursor,d.length>1&&u(x,o.cssClasses.drag),O.addEventListener("selectstart",r,!1)),e.handleNumbers.forEach((function(t){at("start",t)}))}function nt(t){t.stopPropagation();var e=K(t.calcPoint),n=function(t){var e=100,n=!1;return d.forEach((function(r,o){if(!q(o)){var i=N[o],a=Math.abs(i-t);(a<e||a<=e&&t>i||100===a&&100===e)&&(n=o,e=a)}})),n}(e);if(!1===n)return!1;o.events.snap||i(x,o.cssClasses.tap,o.animationDuration),pt(n,e,!0,!0),ft(),at("slide",n,!0),at("update",n,!0),at("change",n,!0),at("set",n,!0),o.events.snap&&et(t,{handleNumbers:[n]})}function rt(t){var e=K(t.calcPoint),n=E.getStep(e),r=E.fromStepping(n);Object.keys(L).forEach((function(t){"hover"===t.split(".")[0]&&L[t].forEach((function(t){t.call(v,r)}))}))}function ot(t,e){L[t]=L[t]||[],L[t].push(e),"update"===t.split(".")[0]&&d.forEach((function(t,e){at("update",e)}))}function it(t){var e=t&&t.split(".")[0],n=e&&t.substring(e.length);Object.keys(L).forEach((function(t){var r=t.split(".")[0],o=t.substring(r.length);e&&e!==r||n&&n!==o||delete L[t]}))}function at(t,e,n){Object.keys(L).forEach((function(r){var i=r.split(".")[0];t===i&&L[r].forEach((function(t){t.call(v,C.map(o.format.to),e,C.slice(),n||!1,N.slice())}))}))}function st(t,e,n,r,i,s){return d.length>1&&!o.events.unconstrained&&(r&&e>0&&(n=Math.max(n,t[e-1]+o.margin)),i&&e<d.length-1&&(n=Math.min(n,t[e+1]-o.margin))),d.length>1&&o.limit&&(r&&e>0&&(n=Math.min(n,t[e-1]+o.limit)),i&&e<d.length-1&&(n=Math.max(n,t[e+1]-o.limit))),o.padding&&(0===e&&(n=Math.max(n,o.padding[0])),e===d.length-1&&(n=Math.min(n,100-o.padding[1]))),!((n=a(n=E.getStep(n)))===t[e]&&!s)&&n}function lt(t,e){var n=o.ort;return(n?e:t)+", "+(n?t:e)}function ut(t,e,n,r){var o=n.slice(),i=[!t,t],a=[t,!t];r=r.slice(),t&&r.reverse(),r.length>1?r.forEach((function(t,n){var r=st(o,t,o[t]+e,i[n],a[n],!1);!1===r?e=0:(e=r-o[t],o[t]=r)})):i=a=[!0];var s=!1;r.forEach((function(t,r){s=pt(t,n[t]+e,i[r],a[r])||s})),s&&r.forEach((function(t){at("update",t),at("slide",t)}))}function ct(t,e){return o.dir?100-t-e:t}function ft(){k.forEach((function(t){var e=N[t]>50?-1:1,n=3+(d.length+e*t);d[t].style.zIndex=n}))}function pt(t,e,n,r){return!1!==(e=st(N,t,e,n,r,!1))&&(function(t,e){N[t]=e,C[t]=E.fromStepping(e);var n="translate("+lt(10*(ct(e,0)-j)+"%","0")+")";d[t].style[o.transformRule]=n,dt(t),dt(t+1)}(t,e),!0)}function dt(t){if(h[t]){var e=0,n=100;0!==t&&(e=N[t-1]),t!==h.length-1&&(n=N[t]);var r=n-e,i="translate("+lt(ct(e,r)+"%","0")+")",a="scale("+lt(r/100,"1")+")";h[t].style[o.transformRule]=i+" "+a}}function ht(t,e){return null===t||!1===t||void 0===t?N[e]:("number"==typeof t&&(t=String(t)),t=o.format.from(t),!1===(t=E.toStepping(t))||isNaN(t)?N[e]:t)}function mt(t,e){var n=s(t),r=void 0===N[0];e=void 0===e||!!e,o.animate&&!r&&i(x,o.cssClasses.tap,o.animationDuration),k.forEach((function(t){pt(t,ht(n[t],t),!0,!1)}));for(var a=1===k.length?0:1;a<k.length;++a)k.forEach((function(t){pt(t,N[t],!0,!0)}));ft(),k.forEach((function(t){at("update",t),null!==n[t]&&e&&at("set",t)}))}function gt(){var t=C.map(o.format.to);return 1===t.length?t[0]:t}function vt(t){var e=N[t],n=E.getNearbySteps(e),r=C[t],i=n.thisStep.step,a=null;if(o.snap)return[r-n.stepBefore.startValue||null,n.stepAfter.startValue-r||null];!1!==i&&r+i>n.stepAfter.startValue&&(i=n.stepAfter.startValue-r),a=r>n.thisStep.startValue?n.thisStep.step:!1!==n.stepBefore.step&&r-n.stepBefore.highestStep,100===e?i=null:0===e&&(a=null);var s=E.countStepDecimals();return null!==i&&!1!==i&&(i=Number(i.toFixed(s))),null!==a&&!1!==a&&(a=Number(a.toFixed(s))),[a,i]}return u(b=x,o.cssClasses.target),0===o.dir?u(b,o.cssClasses.ltr):u(b,o.cssClasses.rtl),0===o.ort?u(b,o.cssClasses.horizontal):u(b,o.cssClasses.vertical),p=H(b,o.cssClasses.base),function(t,e){var n=H(e,o.cssClasses.connects);d=[],(h=[]).push(F(n,t[0]));for(var r=0;r<o.handles;r++)d.push(z(e,r)),k[r]=r,h.push(F(n,t[r+1]))}(o.connect,p),(w=o.events).fixed||d.forEach((function(t,e){G(y.start,t.children[0],et,{handleNumbers:[e]})})),w.tap&&G(y.start,p,nt,{}),w.hover&&G(y.move,p,rt,{hover:!0}),w.drag&&h.forEach((function(t,e){if(!1!==t&&0!==e&&e!==h.length-1){var n=d[e-1],r=d[e],i=[t];u(t,o.cssClasses.draggable),w.fixed&&(i.push(n.children[0]),i.push(r.children[0])),i.forEach((function(t){G(y.start,t,et,{handles:[n,r],handleNumbers:[e-1,e]})}))}})),mt(o.start),o.pips&&I(o.pips),o.tooltips&&X(),ot("update",(function(t,e,n,r,i){k.forEach((function(t){var e=d[t],r=st(N,t,0,!0,!0,!0),a=st(N,t,100,!0,!0,!0),s=i[t],l=o.ariaFormat.to(n[t]);r=E.fromStepping(r).toFixed(1),a=E.fromStepping(a).toFixed(1),s=E.fromStepping(s).toFixed(1),e.children[0].setAttribute("aria-valuemin",r),e.children[0].setAttribute("aria-valuemax",a),e.children[0].setAttribute("aria-valuenow",s),e.children[0].setAttribute("aria-valuetext",l)}))})),v={destroy:function(){for(var t in o.cssClasses)o.cssClasses.hasOwnProperty(t)&&c(x,o.cssClasses[t]);for(;x.firstChild;)x.removeChild(x.firstChild);delete x.noUiSlider},steps:function(){return k.map(vt)},on:ot,off:it,get:gt,set:mt,setHandle:function(e,n,r){if(!((e=Number(e))>=0&&e<k.length))throw new Error("noUiSlider ("+t+"): invalid handle number, got: "+e);pt(e,ht(n,e),!0,!0),at("update",e),r&&at("set",e)},reset:function(t){mt(o.start,t)},__moveHandles:function(t,e,n){ut(t,e,N,n)},options:l,updateOptions:function(t,e){var n=gt(),r=["margin","limit","padding","range","animate","snap","step","format","pips","tooltips"];r.forEach((function(e){void 0!==t[e]&&(l[e]=t[e])}));var i=B(l);r.forEach((function(e){void 0!==t[e]&&(o[e]=i[e])})),E=i.spectrum,o.margin=i.margin,o.limit=i.limit,o.padding=i.padding,o.pips?I(o.pips):Z(),o.tooltips?X():W(),N=[],mt(t.start||n,e)},target:x,removePips:Z,removeTooltips:W,pips:I}}return{__spectrum:w,version:t,create:function(e,n){if(!e||!e.nodeName)throw new Error("noUiSlider ("+t+"): create requires a single element, got: "+e);if(e.noUiSlider)throw new Error("noUiSlider ("+t+"): Slider was already initialized.");var r=q(e,B(n),n);return e.noUiSlider=r,r}}})?r.apply(e,o):r)||(t.exports=i)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){var t=new window.carto.Client({apiKey:"1f1dc35961988be9137b98bd163fe8927f1b68bc",username:"benna100"}),e=window.L.map("hexbin-map").setView([55.8,12.5],8);e.scrollWheelZoom.disable();var n=new window.carto.source.SQL('\n          -- Create hexagon grid\n          WITH hgrid AS (\n              SELECT CDB_HexagonGrid(\n                  ST_Expand(!bbox!, CDB_XYZ_Resolution(9) * 8),\n                  CDB_XYZ_Resolution(9) * 8) as cell\n              )\n\n          -- select the data from the "virtual table" hgrid, which has been created\n          -- using the "WITH" statement of PostgreSQL,\n          -- that intesects with the dataset of points "stormevents_locations_2014"\n\n          SELECT  hgrid.cell as the_geom_webmercator,\n                  avg(durationinseconds) as agg_value,\n                  row_number() over () as cartodb_id\n          FROM hgrid, (SELECT * FROM distances) i\n          WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell)\n          GROUP BY hgrid.cell\n        '),r=new window.carto.style.CartoCSS("\n          #layer {\n            polygon-opacity: 0.74;\n\n            [agg_value > 0] {\n              polygon-fill: #ecda9a;\n            }\n            [agg_value > 1200] {\n              polygon-fill: #efc47e;\n            }\n            [agg_value > 2400] {\n              polygon-fill: #f3ad6a;\n            }\n            [agg_value > 3600] {\n              polygon-fill: #f7945d;\n            }\n            [agg_value > 4800] {\n              polygon-fill: #f97b57;\n            }\n            [agg_value > 6000] {\n              polygon-fill: #f66356;\n            }\n            [agg_value > 7200] {\n              polygon-fill: #ee4d5a;\n            }\n          }\n\n        "),o=new window.carto.layer.Layer(n,r);window.L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{maxZoom:18}).addTo(e),o.on("featureClick",(function(t){console.log(t)})),t.addLayer(o),t.getLeafletLayer().addTo(e)}},function(t,e){},,,,,function(t,e){}]);
//# sourceMappingURL=main.d3333aa91a4c1957cae9.js.map