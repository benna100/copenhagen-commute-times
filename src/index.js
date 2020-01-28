import "./main.scss";

// const carto = require("carto.js");
// window.carto = carto;
import initializePointsMap from "./pointsMap.js";
// import initializeHouseSalesMap from "./houseSalesMap.js";
// import initializeHexbinMap from "./hexbinMap.js";
import customMap from "./custom-map";

const body = document.querySelector("body");
if (body.hasAttribute("data-is-custom-map")) {
    customMap();
} else {
    initializePointsMap();
}
// initializeHouseSalesMap();
// initializeHexbinMap();
