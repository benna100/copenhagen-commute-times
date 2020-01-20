import "./main.scss";

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
