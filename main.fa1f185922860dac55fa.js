!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n(4);var r,o=n(1);(0,((r=o)&&r.__esModule?r:{default:r}).default)()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")};e.default=function(){document.querySelector(".map-active label");var t=document.querySelector(".map-active input"),e=document.querySelector(".map-active span.scroll-page"),n=document.querySelector(".map-active"),a=document.querySelector(".map-active span.scroll-map"),l=document.querySelector("#points-map"),u=document.querySelector(".points-map .slider"),c=document.querySelector(".points-map .slider-container p span"),p=document.querySelectorAll(".transportation-wrapper button"),d=document.querySelector(".legend.house-sales"),f=document.querySelectorAll(".house-sales-wrapper button"),m=document.querySelectorAll(".select-city > ul > li > button"),h=window.L.map(l).setView([55.7,12.5],9);h.scrollWheelZoom.disable();var g="copenhagen",v="public";window.L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{maxZoom:18}).addTo(h);var b=new window.carto.Client({apiKey:"okNxK8jzzM39Lpj-7ZHYcw",username:"benna100"}),y=new window.carto.source.SQL("SELECT * FROM "+g+"_commute_times WHERE commute_public > 0"),w=new window.carto.source.SQL('\n          -- Create hexagon grid\n          WITH hgrid AS (\n              SELECT CDB_HexagonGrid(\n                  ST_Expand(!bbox!, CDB_XYZ_Resolution(9) * 15),\n                  CDB_XYZ_Resolution(9) * 15) as cell\n              )\n\n          -- select the data from the "virtual table" hgrid, which has been created\n          -- using the "WITH" statement of PostgreSQL,\n          -- that intesects with the dataset of points "stormevents_locations_2014"\n\n          SELECT  hgrid.cell as the_geom_webmercator,\n                  avg(price) as agg_value,\n                  row_number() over () as cartodb_id\n          FROM hgrid, (SELECT * FROM house_sales_denmark) i\n          WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell) AND price != 0\n          GROUP BY hgrid.cell\n\n        '),S=new window.carto.style.CartoCSS(i.default.getHouseSalesStyling(.74));function x(e){t.checked=e}if(i.default.isTouchEnabled()){var E=function(t){t?(a.classList.add("active"),h.dragging.enable(),x(!0)):(e.classList.add("active"),h.dragging.disable(),x(!1))};n.classList.remove("hidden"),[].concat(s(document.querySelectorAll(".leaflet-control-zoom a"))).forEach((function(t){return t.addEventListener("click",(function(){return E(!0)}))})),l.addEventListener("touchstart",i.default.tapHandler),document.querySelector(".points-map-container").addEventListener("touchmove",(function(t){t.changedTouches.length>1&&E(!0)}),!1),h.dragging.disable(),t.addEventListener("change",(function(){e.classList.remove("active"),a.classList.remove("active");var n=t.checked;E(n)}))}var C=!1;h.on("zoom",(function(t){var e=t.target._zoom>10;C!==e&&(e?S.setContent(i.default.getHouseSalesStyling(.3)):S.setContent(i.default.getHouseSalesStyling(.74))),C=e})),o.default.create(u,{start:3300,connect:[!0,!1],range:{min:0,max:8e3}});var k=new window.carto.style.CartoCSS(i.default.getPointsStyling("commute_public")),N=void 0;function L(t){var e=p[0].className.includes("active")?"commute_public":"commute_driving";y.setQuery("\n          SELECT *\n            FROM "+g+"_commute_times\n            WHERE "+e+" <= "+t+" and "+e+" > 0\n        ")}i.default.toggleButtons([].concat(s(m)),(function(t){"copenhagen"===t&&(h.flyTo([55.672554,12.566271]),g="copenhagen"),"aarhus"===t&&(h.flyTo([56.150705,10.204396]),g="aarhus"),"aalborg"===t&&(h.flyTo([57.042931,9.917307]),g="aalborg"),"odense"===t&&(h.flyTo([55.401411,10.386118]),g="odense"),L(N)})),u.noUiSlider.on("update",(function(t){var e=r(t,1)[0];N=e,c.innerHTML=function(t){t=Number(t);var e=Math.floor(t/3600),n=Math.floor(t%3600/60);return(e>0?e+(1===e?" time, ":" timer, "):"")+(n>0?n+(1===n?" minut":" minutter"):"")}(N),L(N)})),i.default.toggleButtons([].concat(s(p)),(function(t){"driving"===t&&(v="driving",k.setContent(i.default.getPointsStyling("commute_driving"))),"public"===t&&(v="public",k.setContent(i.default.getPointsStyling("commute_public"))),y.setQuery("\n            SELECT *\n              FROM "+g+"_commute_times\n              WHERE commute_"+v+" <= "+N+"\n          ")}));var _=new window.carto.layer.Layer(y,k),M=new window.carto.layer.Layer(w,S);M.hide(),i.default.toggleButtons([].concat(s(f)),(function(t){"off"===t&&(M.hide(),d.classList.add("hidden")),"on"===t&&(d.classList.remove("hidden"),M.show())})),b.addLayers([M,_]),b.getLeafletLayer().addTo(h)};var o=a(n(2));n(9);var i=a(n(3));function a(t){return t&&t.__esModule?t:{default:t}}function s(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}},function(t,e,n){var r,o,i;/*! nouislider - 14.0.3 - 10/10/2019 */o=[],void 0===(i="function"==typeof(r=function(){"use strict";var t="14.0.3";function e(t){t.parentElement.removeChild(t)}function n(t){return null!=t}function r(t){t.preventDefault()}function o(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function i(t,e,n){n>0&&(u(t,e),setTimeout((function(){c(t,e)}),n))}function a(t){return Math.max(Math.min(t,100),0)}function s(t){return Array.isArray(t)?t:[t]}function l(t){var e=(t=String(t)).split(".");return e.length>1?e[1].length:0}function u(t,e){t.classList?t.classList.add(e):t.className+=" "+e}function c(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}function p(t){var e=void 0!==window.pageXOffset,n="CSS1Compat"===(t.compatMode||"");return{x:e?window.pageXOffset:n?t.documentElement.scrollLeft:t.body.scrollLeft,y:e?window.pageYOffset:n?t.documentElement.scrollTop:t.body.scrollTop}}function d(t,e){return 100/(e-t)}function f(t,e){return 100*e/(t[1]-t[0])}function m(t,e){for(var n=1;t>=e[n];)n+=1;return n}function h(t,e,n){if(n>=t.slice(-1)[0])return 100;var r=m(n,t),o=t[r-1],i=t[r],a=e[r-1],s=e[r];return a+function(t,e){return f(t,t[0]<0?e+Math.abs(t[0]):e-t[0])}([o,i],n)/d(a,s)}function g(t,e,n,r){if(100===r)return r;var o=m(r,t),i=t[o-1],a=t[o];return n?r-i>(a-i)/2?a:i:e[o-1]?t[o-1]+function(t,e){return Math.round(t/e)*e}(r-t[o-1],e[o-1]):r}function v(e,n,r){var i;if("number"==typeof n&&(n=[n]),!Array.isArray(n))throw new Error("noUiSlider ("+t+"): 'range' contains invalid value.");if(!o(i="min"===e?0:"max"===e?100:parseFloat(e))||!o(n[0]))throw new Error("noUiSlider ("+t+"): 'range' value isn't numeric.");r.xPct.push(i),r.xVal.push(n[0]),i?r.xSteps.push(!isNaN(n[1])&&n[1]):isNaN(n[1])||(r.xSteps[0]=n[1]),r.xHighestCompleteStep.push(0)}function b(t,e,n){if(e)if(n.xVal[t]!==n.xVal[t+1]){n.xSteps[t]=f([n.xVal[t],n.xVal[t+1]],e)/d(n.xPct[t],n.xPct[t+1]);var r=(n.xVal[t+1]-n.xVal[t])/n.xNumSteps[t],o=Math.ceil(Number(r.toFixed(3))-1),i=n.xVal[t]+n.xNumSteps[t]*o;n.xHighestCompleteStep[t]=i}else n.xSteps[t]=n.xHighestCompleteStep[t]=n.xVal[t]}function y(t,e,n){var r;this.xPct=[],this.xVal=[],this.xSteps=[n||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=e;var o=[];for(r in t)t.hasOwnProperty(r)&&o.push([t[r],r]);for(o.length&&"object"==typeof o[0][0]?o.sort((function(t,e){return t[0][0]-e[0][0]})):o.sort((function(t,e){return t[0]-e[0]})),r=0;r<o.length;r++)v(o[r][1],o[r][0],this);for(this.xNumSteps=this.xSteps.slice(0),r=0;r<this.xNumSteps.length;r++)b(r,this.xNumSteps[r],this)}y.prototype.getMargin=function(e){var n=this.xNumSteps[0];if(n&&e/n%1!=0)throw new Error("noUiSlider ("+t+"): 'limit', 'margin' and 'padding' must be divisible by step.");return 2===this.xPct.length&&f(this.xVal,e)},y.prototype.toStepping=function(t){return t=h(this.xVal,this.xPct,t)},y.prototype.fromStepping=function(t){return function(t,e,n){if(n>=100)return t.slice(-1)[0];var r=m(n,e),o=t[r-1],i=t[r],a=e[r-1];return function(t,e){return e*(t[1]-t[0])/100+t[0]}([o,i],(n-a)*d(a,e[r]))}(this.xVal,this.xPct,t)},y.prototype.getStep=function(t){return t=g(this.xPct,this.xSteps,this.snap,t)},y.prototype.getDefaultStep=function(t,e,n){var r=m(t,this.xPct);return(100===t||e&&t===this.xPct[r-1])&&(r=Math.max(r-1,1)),(this.xVal[r]-this.xVal[r-1])/n},y.prototype.getNearbySteps=function(t){var e=m(t,this.xPct);return{stepBefore:{startValue:this.xVal[e-2],step:this.xNumSteps[e-2],highestStep:this.xHighestCompleteStep[e-2]},thisStep:{startValue:this.xVal[e-1],step:this.xNumSteps[e-1],highestStep:this.xHighestCompleteStep[e-1]},stepAfter:{startValue:this.xVal[e],step:this.xNumSteps[e],highestStep:this.xHighestCompleteStep[e]}}},y.prototype.countStepDecimals=function(){var t=this.xNumSteps.map(l);return Math.max.apply(null,t)},y.prototype.convert=function(t){return this.getStep(this.toStepping(t))};var w={to:function(t){return void 0!==t&&t.toFixed(2)},from:Number};function S(e){if(function(t){return"object"==typeof t&&"function"==typeof t.to&&"function"==typeof t.from}(e))return!0;throw new Error("noUiSlider ("+t+"): 'format' requires 'to' and 'from' methods.")}function x(e,n){if(!o(n))throw new Error("noUiSlider ("+t+"): 'step' is not numeric.");e.singleStep=n}function E(e,n){if("object"!=typeof n||Array.isArray(n))throw new Error("noUiSlider ("+t+"): 'range' is not an object.");if(void 0===n.min||void 0===n.max)throw new Error("noUiSlider ("+t+"): Missing 'min' or 'max' in 'range'.");if(n.min===n.max)throw new Error("noUiSlider ("+t+"): 'range' 'min' and 'max' cannot be equal.");e.spectrum=new y(n,e.snap,e.singleStep)}function C(e,n){if(n=s(n),!Array.isArray(n)||!n.length)throw new Error("noUiSlider ("+t+"): 'start' option is incorrect.");e.handles=n.length,e.start=n}function k(e,n){if(e.snap=n,"boolean"!=typeof n)throw new Error("noUiSlider ("+t+"): 'snap' option must be a boolean.")}function N(e,n){if(e.animate=n,"boolean"!=typeof n)throw new Error("noUiSlider ("+t+"): 'animate' option must be a boolean.")}function L(e,n){if(e.animationDuration=n,"number"!=typeof n)throw new Error("noUiSlider ("+t+"): 'animationDuration' option must be a number.")}function _(e,n){var r,o=[!1];if("lower"===n?n=[!0,!1]:"upper"===n&&(n=[!1,!0]),!0===n||!1===n){for(r=1;r<e.handles;r++)o.push(n);o.push(!1)}else{if(!Array.isArray(n)||!n.length||n.length!==e.handles+1)throw new Error("noUiSlider ("+t+"): 'connect' option doesn't match handle count.");o=n}e.connect=o}function M(e,n){switch(n){case"horizontal":e.ort=0;break;case"vertical":e.ort=1;break;default:throw new Error("noUiSlider ("+t+"): 'orientation' option is invalid.")}}function P(e,n){if(!o(n))throw new Error("noUiSlider ("+t+"): 'margin' option must be numeric.");if(0!==n&&(e.margin=e.spectrum.getMargin(n),!e.margin))throw new Error("noUiSlider ("+t+"): 'margin' option is only supported on linear sliders.")}function A(e,n){if(!o(n))throw new Error("noUiSlider ("+t+"): 'limit' option must be numeric.");if(e.limit=e.spectrum.getMargin(n),!e.limit||e.handles<2)throw new Error("noUiSlider ("+t+"): 'limit' option is only supported on linear sliders with 2 or more handles.")}function U(e,n){if(!o(n)&&!Array.isArray(n))throw new Error("noUiSlider ("+t+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(n)&&2!==n.length&&!o(n[0])&&!o(n[1]))throw new Error("noUiSlider ("+t+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==n){if(Array.isArray(n)||(n=[n,n]),e.padding=[e.spectrum.getMargin(n[0]),e.spectrum.getMargin(n[1])],!1===e.padding[0]||!1===e.padding[1])throw new Error("noUiSlider ("+t+"): 'padding' option is only supported on linear sliders.");if(e.padding[0]<0||e.padding[1]<0)throw new Error("noUiSlider ("+t+"): 'padding' option must be a positive number(s).");if(e.padding[0]+e.padding[1]>100)throw new Error("noUiSlider ("+t+"): 'padding' option must not exceed 100% of the range.")}}function O(e,n){switch(n){case"ltr":e.dir=0;break;case"rtl":e.dir=1;break;default:throw new Error("noUiSlider ("+t+"): 'direction' option was not recognized.")}}function T(e,n){if("string"!=typeof n)throw new Error("noUiSlider ("+t+"): 'behaviour' must be a string containing options.");var r=n.indexOf("tap")>=0,o=n.indexOf("drag")>=0,i=n.indexOf("fixed")>=0,a=n.indexOf("snap")>=0,s=n.indexOf("hover")>=0,l=n.indexOf("unconstrained")>=0;if(i){if(2!==e.handles)throw new Error("noUiSlider ("+t+"): 'fixed' behaviour must be used with 2 handles");P(e,e.start[1]-e.start[0])}if(l&&(e.margin||e.limit))throw new Error("noUiSlider ("+t+"): 'unconstrained' behaviour cannot be used with margin or limit");e.events={tap:r||a,drag:o,fixed:i,snap:a,hover:s,unconstrained:l}}function V(e,n){if(!1!==n)if(!0===n){e.tooltips=[];for(var r=0;r<e.handles;r++)e.tooltips.push(!0)}else{if(e.tooltips=s(n),e.tooltips.length!==e.handles)throw new Error("noUiSlider ("+t+"): must pass a formatter for all handles.");e.tooltips.forEach((function(e){if("boolean"!=typeof e&&("object"!=typeof e||"function"!=typeof e.to))throw new Error("noUiSlider ("+t+"): 'tooltips' must be passed a formatter or 'false'.")}))}}function z(t,e){t.ariaFormat=e,S(e)}function j(t,e){t.format=e,S(e)}function H(e,n){if(e.keyboardSupport=n,"boolean"!=typeof n)throw new Error("noUiSlider ("+t+"): 'keyboardSupport' option must be a boolean.")}function q(t,e){t.documentElement=e}function R(e,n){if("string"!=typeof n&&!1!==n)throw new Error("noUiSlider ("+t+"): 'cssPrefix' must be a string or `false`.");e.cssPrefix=n}function F(e,n){if("object"!=typeof n)throw new Error("noUiSlider ("+t+"): 'cssClasses' must be an object.");if("string"==typeof e.cssPrefix)for(var r in e.cssClasses={},n)n.hasOwnProperty(r)&&(e.cssClasses[r]=e.cssPrefix+n[r]);else e.cssClasses=n}function D(e){var r={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,ariaFormat:w,format:w},o={step:{r:!1,t:x},start:{r:!0,t:C},connect:{r:!0,t:_},direction:{r:!0,t:O},snap:{r:!1,t:k},animate:{r:!1,t:N},animationDuration:{r:!1,t:L},range:{r:!0,t:E},orientation:{r:!1,t:M},margin:{r:!1,t:P},limit:{r:!1,t:A},padding:{r:!1,t:U},behaviour:{r:!0,t:T},ariaFormat:{r:!1,t:z},format:{r:!1,t:j},tooltips:{r:!1,t:V},keyboardSupport:{r:!0,t:H},documentElement:{r:!1,t:q},cssPrefix:{r:!0,t:R},cssClasses:{r:!0,t:F}},i={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",keyboardSupport:!0,cssPrefix:"noUi-",cssClasses:{target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",touchArea:"touch-area",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"}};e.format&&!e.ariaFormat&&(e.ariaFormat=e.format),Object.keys(o).forEach((function(a){if(!n(e[a])&&void 0===i[a]){if(o[a].r)throw new Error("noUiSlider ("+t+"): '"+a+"' is required.");return!0}o[a].t(r,n(e[a])?e[a]:i[a])})),r.pips=e.pips;var a=document.createElement("div"),s=void 0!==a.style.msTransform,l=void 0!==a.style.transform;return r.transformRule=l?"transform":s?"msTransform":"webkitTransform",r.style=[["left","top"],["right","bottom"]][r.dir][r.ort],r}function B(n,o,l){var d,f,m,h,g,v,b,y,w=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},S=window.CSS&&CSS.supports&&CSS.supports("touch-action","none")&&function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}(),x=n,E=o.spectrum,C=[],k=[],N=[],L=0,_={},M=n.ownerDocument,P=o.documentElement||M.documentElement,A=M.body,U=-1,O=0,T=1,V=2,z="rtl"===M.dir||1===o.ort?0:100;function j(t,e){var n=M.createElement("div");return e&&u(n,e),t.appendChild(n),n}function H(t,e){var n=j(t,o.cssClasses.origin),r=j(n,o.cssClasses.handle);return j(r,o.cssClasses.touchArea),r.setAttribute("data-handle",e),o.keyboardSupport&&(r.setAttribute("tabindex","0"),r.addEventListener("keydown",(function(t){return function(t,e){if(F()||B(e))return!1;var n=["Left","Right"],r=["Down","Up"];o.dir&&!o.ort?n.reverse():o.ort&&!o.dir&&r.reverse();var i=t.key.replace("Arrow",""),a=i===r[0]||i===n[0],s=i===r[1]||i===n[1];if(!a&&!s)return!0;t.preventDefault();var l=a?0:1,u=vt(e)[l];return null!==u&&(!1===u&&(u=E.getDefaultStep(k[e],a,10)),u=Math.max(u,1e-7),u*=a?-1:1,dt(e,E.toStepping(C[e]+u),!0,!0),at("slide",e),at("update",e),at("change",e),at("set",e),!1)}(t,e)}))),r.setAttribute("role","slider"),r.setAttribute("aria-orientation",o.ort?"vertical":"horizontal"),0===e?u(r,o.cssClasses.handleLower):e===o.handles-1&&u(r,o.cssClasses.handleUpper),n}function q(t,e){return!!e&&j(t,o.cssClasses.connect)}function R(t,e){return!!o.tooltips[e]&&j(t.firstChild,o.cssClasses.tooltip)}function F(){return x.hasAttribute("disabled")}function B(t){return f[t].hasAttribute("disabled")}function W(){g&&(it("update.tooltips"),g.forEach((function(t){t&&e(t)})),g=null)}function Y(){W(),g=f.map(R),ot("update.tooltips",(function(t,e,n){if(g[e]){var r=t[e];!0!==o.tooltips[e]&&(r=o.tooltips[e].to(n[e])),g[e].innerHTML=r}}))}function X(t,e,n){var r=M.createElement("div"),i=[];i[O]=o.cssClasses.valueNormal,i[T]=o.cssClasses.valueLarge,i[V]=o.cssClasses.valueSub;var a=[];a[O]=o.cssClasses.markerNormal,a[T]=o.cssClasses.markerLarge,a[V]=o.cssClasses.markerSub;var s=[o.cssClasses.valueHorizontal,o.cssClasses.valueVertical],l=[o.cssClasses.markerHorizontal,o.cssClasses.markerVertical];function c(t,e){var n=e===o.cssClasses.value,r=n?i:a;return e+" "+(n?s:l)[o.ort]+" "+r[t]}return u(r,o.cssClasses.pips),u(r,0===o.ort?o.cssClasses.pipsHorizontal:o.cssClasses.pipsVertical),Object.keys(t).forEach((function(i){!function(t,i,a){if((a=e?e(i,a):a)!==U){var s=j(r,!1);s.className=c(a,o.cssClasses.marker),s.style[o.style]=t+"%",a>O&&((s=j(r,!1)).className=c(a,o.cssClasses.value),s.setAttribute("data-value",i),s.style[o.style]=t+"%",s.innerHTML=n.to(i))}}(i,t[i][0],t[i][1])})),r}function I(){h&&(e(h),h=null)}function Q(e){I();var n=e.mode,r=e.density||1,o=e.filter||!1,i=function(e,n,r){if("range"===e||"steps"===e)return E.xVal;if("count"===e){if(n<2)throw new Error("noUiSlider ("+t+"): 'values' (>= 2) required for mode 'count'.");var o=n-1,i=100/o;for(n=[];o--;)n[o]=o*i;n.push(100),e="positions"}return"positions"===e?n.map((function(t){return E.fromStepping(r?E.getStep(t):t)})):"values"===e?r?n.map((function(t){return E.fromStepping(E.getStep(E.toStepping(t)))})):n:void 0}(n,e.values||!1,e.stepped||!1),a=function(t,e,n){var r,o={},i=E.xVal[0],a=E.xVal[E.xVal.length-1],s=!1,l=!1,u=0;return r=n.slice().sort((function(t,e){return t-e})),(n=r.filter((function(t){return!this[t]&&(this[t]=!0)}),{}))[0]!==i&&(n.unshift(i),s=!0),n[n.length-1]!==a&&(n.push(a),l=!0),n.forEach((function(r,i){var a,c,p,d,f,m,h,g,v,b,y=r,w=n[i+1],S="steps"===e;if(S&&(a=E.xNumSteps[i]),a||(a=w-y),!1!==y&&void 0!==w)for(a=Math.max(a,1e-7),c=y;c<=w;c=(c+a).toFixed(7)/1){for(g=(f=(d=E.toStepping(c))-u)/t,b=f/(v=Math.round(g)),p=1;p<=v;p+=1)o[(m=u+p*b).toFixed(5)]=[E.fromStepping(m),0];h=n.indexOf(c)>-1?T:S?V:O,!i&&s&&(h=0),c===w&&l||(o[d.toFixed(5)]=[c,h]),u=d}})),o}(r,n,i),s=e.format||{to:Math.round};return h=x.appendChild(X(a,o,s))}function Z(){var t=d.getBoundingClientRect(),e="offset"+["Width","Height"][o.ort];return 0===o.ort?t.width||d[e]:t.height||d[e]}function G(t,e,n,r){var i=function(i){return!!(i=function(t,e,n){var r,o,i=0===t.type.indexOf("touch"),a=0===t.type.indexOf("mouse"),s=0===t.type.indexOf("pointer");if(0===t.type.indexOf("MSPointer")&&(s=!0),i){var l=function(t){return t.target===n||n.contains(t.target)};if("touchstart"===t.type){var u=Array.prototype.filter.call(t.touches,l);if(u.length>1)return!1;r=u[0].pageX,o=u[0].pageY}else{var c=Array.prototype.find.call(t.changedTouches,l);if(!c)return!1;r=c.pageX,o=c.pageY}}return e=e||p(M),(a||s)&&(r=t.clientX+e.x,o=t.clientY+e.y),t.pageOffset=e,t.points=[r,o],t.cursor=a||s,t}(i,r.pageOffset,r.target||e))&&!(F()&&!r.doNotReject)&&(a=x,s=o.cssClasses.tap,!((a.classList?a.classList.contains(s):new RegExp("\\b"+s+"\\b").test(a.className))&&!r.doNotReject)&&!(t===w.start&&void 0!==i.buttons&&i.buttons>1)&&(!r.hover||!i.buttons)&&(S||i.preventDefault(),i.calcPoint=i.points[o.ort],void n(i,r)));var a,s},a=[];return t.split(" ").forEach((function(t){e.addEventListener(t,i,!!S&&{passive:!0}),a.push([t,i])})),a}function K(t){var e,n,r,i,s,l,u=100*(t-(e=d,n=o.ort,r=e.getBoundingClientRect(),i=e.ownerDocument,s=i.documentElement,l=p(i),/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(l.x=0),n?r.top+l.y-s.clientTop:r.left+l.x-s.clientLeft))/Z();return u=a(u),o.dir?100-u:u}function $(t,e){"mouseout"===t.type&&"HTML"===t.target.nodeName&&null===t.relatedTarget&&tt(t,e)}function J(t,e){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===t.buttons&&0!==e.buttonsProperty)return tt(t,e);var n=(o.dir?-1:1)*(t.calcPoint-e.startCalcPoint);ut(n>0,100*n/e.baseSize,e.locations,e.handleNumbers)}function tt(t,e){e.handle&&(c(e.handle,o.cssClasses.active),L-=1),e.listeners.forEach((function(t){P.removeEventListener(t[0],t[1])})),0===L&&(c(x,o.cssClasses.drag),pt(),t.cursor&&(A.style.cursor="",A.removeEventListener("selectstart",r))),e.handleNumbers.forEach((function(t){at("change",t),at("set",t),at("end",t)}))}function et(t,e){if(e.handleNumbers.some(B))return!1;var n;1===e.handleNumbers.length&&(n=f[e.handleNumbers[0]].children[0],L+=1,u(n,o.cssClasses.active)),t.stopPropagation();var i=[],a=G(w.move,P,J,{target:t.target,handle:n,listeners:i,startCalcPoint:t.calcPoint,baseSize:Z(),pageOffset:t.pageOffset,handleNumbers:e.handleNumbers,buttonsProperty:t.buttons,locations:k.slice()}),s=G(w.end,P,tt,{target:t.target,handle:n,listeners:i,doNotReject:!0,handleNumbers:e.handleNumbers}),l=G("mouseout",P,$,{target:t.target,handle:n,listeners:i,doNotReject:!0,handleNumbers:e.handleNumbers});i.push.apply(i,a.concat(s,l)),t.cursor&&(A.style.cursor=getComputedStyle(t.target).cursor,f.length>1&&u(x,o.cssClasses.drag),A.addEventListener("selectstart",r,!1)),e.handleNumbers.forEach((function(t){at("start",t)}))}function nt(t){t.stopPropagation();var e=K(t.calcPoint),n=function(t){var e=100,n=!1;return f.forEach((function(r,o){if(!B(o)){var i=k[o],a=Math.abs(i-t);(a<e||a<=e&&t>i||100===a&&100===e)&&(n=o,e=a)}})),n}(e);if(!1===n)return!1;o.events.snap||i(x,o.cssClasses.tap,o.animationDuration),dt(n,e,!0,!0),pt(),at("slide",n,!0),at("update",n,!0),at("change",n,!0),at("set",n,!0),o.events.snap&&et(t,{handleNumbers:[n]})}function rt(t){var e=K(t.calcPoint),n=E.getStep(e),r=E.fromStepping(n);Object.keys(_).forEach((function(t){"hover"===t.split(".")[0]&&_[t].forEach((function(t){t.call(v,r)}))}))}function ot(t,e){_[t]=_[t]||[],_[t].push(e),"update"===t.split(".")[0]&&f.forEach((function(t,e){at("update",e)}))}function it(t){var e=t&&t.split(".")[0],n=e&&t.substring(e.length);Object.keys(_).forEach((function(t){var r=t.split(".")[0],o=t.substring(r.length);e&&e!==r||n&&n!==o||delete _[t]}))}function at(t,e,n){Object.keys(_).forEach((function(r){var i=r.split(".")[0];t===i&&_[r].forEach((function(t){t.call(v,C.map(o.format.to),e,C.slice(),n||!1,k.slice())}))}))}function st(t,e,n,r,i,s){return f.length>1&&!o.events.unconstrained&&(r&&e>0&&(n=Math.max(n,t[e-1]+o.margin)),i&&e<f.length-1&&(n=Math.min(n,t[e+1]-o.margin))),f.length>1&&o.limit&&(r&&e>0&&(n=Math.min(n,t[e-1]+o.limit)),i&&e<f.length-1&&(n=Math.max(n,t[e+1]-o.limit))),o.padding&&(0===e&&(n=Math.max(n,o.padding[0])),e===f.length-1&&(n=Math.min(n,100-o.padding[1]))),!((n=a(n=E.getStep(n)))===t[e]&&!s)&&n}function lt(t,e){var n=o.ort;return(n?e:t)+", "+(n?t:e)}function ut(t,e,n,r){var o=n.slice(),i=[!t,t],a=[t,!t];r=r.slice(),t&&r.reverse(),r.length>1?r.forEach((function(t,n){var r=st(o,t,o[t]+e,i[n],a[n],!1);!1===r?e=0:(e=r-o[t],o[t]=r)})):i=a=[!0];var s=!1;r.forEach((function(t,r){s=dt(t,n[t]+e,i[r],a[r])||s})),s&&r.forEach((function(t){at("update",t),at("slide",t)}))}function ct(t,e){return o.dir?100-t-e:t}function pt(){N.forEach((function(t){var e=k[t]>50?-1:1,n=3+(f.length+e*t);f[t].style.zIndex=n}))}function dt(t,e,n,r){return!1!==(e=st(k,t,e,n,r,!1))&&(function(t,e){k[t]=e,C[t]=E.fromStepping(e);var n="translate("+lt(10*(ct(e,0)-z)+"%","0")+")";f[t].style[o.transformRule]=n,ft(t),ft(t+1)}(t,e),!0)}function ft(t){if(m[t]){var e=0,n=100;0!==t&&(e=k[t-1]),t!==m.length-1&&(n=k[t]);var r=n-e,i="translate("+lt(ct(e,r)+"%","0")+")",a="scale("+lt(r/100,"1")+")";m[t].style[o.transformRule]=i+" "+a}}function mt(t,e){return null===t||!1===t||void 0===t?k[e]:("number"==typeof t&&(t=String(t)),t=o.format.from(t),!1===(t=E.toStepping(t))||isNaN(t)?k[e]:t)}function ht(t,e){var n=s(t),r=void 0===k[0];e=void 0===e||!!e,o.animate&&!r&&i(x,o.cssClasses.tap,o.animationDuration),N.forEach((function(t){dt(t,mt(n[t],t),!0,!1)}));for(var a=1===N.length?0:1;a<N.length;++a)N.forEach((function(t){dt(t,k[t],!0,!0)}));pt(),N.forEach((function(t){at("update",t),null!==n[t]&&e&&at("set",t)}))}function gt(){var t=C.map(o.format.to);return 1===t.length?t[0]:t}function vt(t){var e=k[t],n=E.getNearbySteps(e),r=C[t],i=n.thisStep.step,a=null;if(o.snap)return[r-n.stepBefore.startValue||null,n.stepAfter.startValue-r||null];!1!==i&&r+i>n.stepAfter.startValue&&(i=n.stepAfter.startValue-r),a=r>n.thisStep.startValue?n.thisStep.step:!1!==n.stepBefore.step&&r-n.stepBefore.highestStep,100===e?i=null:0===e&&(a=null);var s=E.countStepDecimals();return null!==i&&!1!==i&&(i=Number(i.toFixed(s))),null!==a&&!1!==a&&(a=Number(a.toFixed(s))),[a,i]}return u(b=x,o.cssClasses.target),0===o.dir?u(b,o.cssClasses.ltr):u(b,o.cssClasses.rtl),0===o.ort?u(b,o.cssClasses.horizontal):u(b,o.cssClasses.vertical),d=j(b,o.cssClasses.base),function(t,e){var n=j(e,o.cssClasses.connects);f=[],(m=[]).push(q(n,t[0]));for(var r=0;r<o.handles;r++)f.push(H(e,r)),N[r]=r,m.push(q(n,t[r+1]))}(o.connect,d),(y=o.events).fixed||f.forEach((function(t,e){G(w.start,t.children[0],et,{handleNumbers:[e]})})),y.tap&&G(w.start,d,nt,{}),y.hover&&G(w.move,d,rt,{hover:!0}),y.drag&&m.forEach((function(t,e){if(!1!==t&&0!==e&&e!==m.length-1){var n=f[e-1],r=f[e],i=[t];u(t,o.cssClasses.draggable),y.fixed&&(i.push(n.children[0]),i.push(r.children[0])),i.forEach((function(t){G(w.start,t,et,{handles:[n,r],handleNumbers:[e-1,e]})}))}})),ht(o.start),o.pips&&Q(o.pips),o.tooltips&&Y(),ot("update",(function(t,e,n,r,i){N.forEach((function(t){var e=f[t],r=st(k,t,0,!0,!0,!0),a=st(k,t,100,!0,!0,!0),s=i[t],l=o.ariaFormat.to(n[t]);r=E.fromStepping(r).toFixed(1),a=E.fromStepping(a).toFixed(1),s=E.fromStepping(s).toFixed(1),e.children[0].setAttribute("aria-valuemin",r),e.children[0].setAttribute("aria-valuemax",a),e.children[0].setAttribute("aria-valuenow",s),e.children[0].setAttribute("aria-valuetext",l)}))})),v={destroy:function(){for(var t in o.cssClasses)o.cssClasses.hasOwnProperty(t)&&c(x,o.cssClasses[t]);for(;x.firstChild;)x.removeChild(x.firstChild);delete x.noUiSlider},steps:function(){return N.map(vt)},on:ot,off:it,get:gt,set:ht,setHandle:function(e,n,r){if(!((e=Number(e))>=0&&e<N.length))throw new Error("noUiSlider ("+t+"): invalid handle number, got: "+e);dt(e,mt(n,e),!0,!0),at("update",e),r&&at("set",e)},reset:function(t){ht(o.start,t)},__moveHandles:function(t,e,n){ut(t,e,k,n)},options:l,updateOptions:function(t,e){var n=gt(),r=["margin","limit","padding","range","animate","snap","step","format","pips","tooltips"];r.forEach((function(e){void 0!==t[e]&&(l[e]=t[e])}));var i=D(l);r.forEach((function(e){void 0!==t[e]&&(o[e]=i[e])})),E=i.spectrum,o.margin=i.margin,o.limit=i.limit,o.padding=i.padding,o.pips?Q(o.pips):I(),o.tooltips?Y():W(),k=[],ht(t.start||n,e)},target:x,removePips:I,removeTooltips:W,pips:Q}}return{__spectrum:y,version:t,create:function(e,n){if(!e||!e.nodeName)throw new Error("noUiSlider ("+t+"): create requires a single element, got: "+e);if(e.noUiSlider)throw new Error("noUiSlider ("+t+"): Slider was already initialized.");var r=B(e,D(n),n);return e.noUiSlider=r,r}}})?r.apply(e,o):r)||(t.exports=i)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=!1;e.default={isMobileDevice:function(){var t,e=!1;return t=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0),e},isTouchEnabled:function(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0},toggleButtons:function(t,e){t.forEach((function(n){n.addEventListener("click",(function(n){!function(t){t.forEach((function(t){t.classList.remove("active")}))}(t);var r=n.target;r.classList.add("active");var o=r.getAttribute("data-key");e(o)}))}))},tapHandler:function(t){if(!r)return r=!0,setTimeout((function(){r=!1}),300),!1;setMapActiveOrNot(!0)},getHouseSalesStyling:function(t){return"\n    #layer {\n      polygon-opacity: "+t+";\n\n      [agg_value > 0] {\n        polygon-fill: #fcbba1;\n      }\n      [agg_value > 1500000] {\n        polygon-fill: #fc9272;\n      }\n      [agg_value > 3000000] {\n        polygon-fill: #fb6a4a;\n      }\n      [agg_value > 4500000] {\n        polygon-fill: #de2d26;\n      }\n      [agg_value > 6000000] {\n        polygon-fill: #a50f15;\n      }\n    }\n        "},getPointsStyling:function(t){return"\n    #layer {\n      marker-width: 7;\n      marker-fill-opacity: 0.5;\n      marker-allow-overlap: true;\n      marker-line-width: 0;\n      marker-fill: rgb(51, 128, 158);\n    }\n    \n    #layer {\n      ["+t+" > 0] {\n        marker-fill: #d0d1e6;\n      }\n      ["+t+" > 1200] {\n        marker-fill: #a6bddb;\n      }\n      ["+t+" > 2400] {\n        marker-fill: #74a9cf;\n      }\n      ["+t+" > 3600] {\n        marker-fill: #2b8cbe;\n      }\n      ["+t+" > 4800] {\n        marker-fill: #045a8d;\n      }\n    }\n  "}}},function(t,e){},,,,,function(t,e){}]);
//# sourceMappingURL=main.fa1f185922860dac55fa.js.map