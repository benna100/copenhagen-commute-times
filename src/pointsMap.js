import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";

import helper from "./helper";
import mapHelper from "./map-helper";
import slugify from "slugify";
// var dawaAutocomplete2 = require("dawa-autocomplete2");
import jump from "jump.js";

let adress;
let originPosition;
let map;
let marker;
let geoJsonAreaLayer;
let getCommuterMapButtonClicked = false;
let selectedSeconds;
const startSelectedSeconds = 3300;
let previousFilter;
window.currentPriceIntervals = [1500000, 3000000, 4500000, 6000000];

const $mapLoadingOverlay = document.querySelector(
    ".points-map .loading-overlay"
);
const $mapLoadingText = document.querySelector(".points-map .loading-text");
const $adress = document.querySelector("section.selector input");
const $updateMapButton = document.querySelector(
    ".slider-container button.update-map"
);
const $filters = document.querySelector(".slider-container");

const $transportation = document.querySelector(".slider-container select");

function showGeoJsonArea(geoJsonArea) {
    $mapLoadingOverlay.classList.remove("shown");
    $mapLoadingText.classList.remove("shown");
    if (geoJsonAreaLayer) {
        geoJsonAreaLayer.clearLayers();
    }
    geoJsonAreaLayer = new L.geoJson(geoJsonArea, {
        style: {
            weight: 1,
            color: "blue",
            opacity: 0.5,
            fillColor: "blue",
            fillOpacity: 0.3
        },
        cursor: "default"
    }).addTo(map);
}

const houseSalesStyle = new window.carto.style.CartoCSS(
    mapHelper.getHouseSalesStyling(0.74, window.currentPriceIntervals)
);
const houseSalesSourceDenmark = mapHelper.getHouseSalesSourceDenmark();
const houseSalesDenmarkLayer = new window.carto.layer.Layer(
    houseSalesSourceDenmark,
    houseSalesStyle
);

const client = mapHelper.getClient();

client.addLayer(houseSalesDenmarkLayer);
houseSalesDenmarkLayer.hide();

const slider = document.querySelector(".points-map .slider");
const commuteTimeSpan = document.querySelector(
    ".points-map .slider-container p span"
);

noUiSlider.create(slider, {
    start: startSelectedSeconds,
    connect: [true, false],
    range: {
        min: 0,
        max: 8000
    },
    padding: [5 * 60, 5 * 60],
    step: 5 * 60
});

slider.noUiSlider.on("update", async function([selectedSecondsSlider]) {
    selectedSeconds = selectedSecondsSlider;
    commuteTimeSpan.innerHTML = helper.secondsToHms(selectedSeconds);
});

async function getGeoJsonArea({ position, transportationMode, commuterTime }) {
    const geoJsonAreaUrl = `https://commuter-area.herokuapp.com/commuter-area?latitude=${position.latitude}&longitude=${position.longitude}&commuterTime=${commuterTime}&mode=${transportationMode}`;
    console.log(geoJsonAreaUrl);

    const geoJsonAreaResponse = await fetch(geoJsonAreaUrl);
    // i also need the lat lng for the map
    return geoJsonAreaResponse.json();
}

const houseSalesToggleButtons = document.querySelectorAll(
    ".house-sales-wrapper button"
);
const houseSalesLegend = document.querySelector(".legend.house-sales");
let housePriceShown = false;
helper.toggleButtons([...houseSalesToggleButtons], key => {
    housePriceShown = key === "on";
});

async function showAndFlyToSelectedArea() {
    if (!originPosition) {
        const getCoordinatesUrl = `https://dawa.aws.dk/autocomplete?q=${$adress.value}&type=adresse&caretpos=25&supplerendebynavn=true&stormodtagerpostnumre=true&multilinje=true`;
        const getCoordinatesResponse = await fetch(getCoordinatesUrl);
        // i also need the lat lng for the map
        const coordinates = await getCoordinatesResponse.json();

        const { x, y } = coordinates[0].data;
        originPosition = {
            latitude: y,
            longitude: x
        };
    }

    houseSalesStyle.setContent(
        mapHelper.getHouseSalesStyling(
            0.74,
            mapHelper.getPriceIntervalFromOrigin(originPosition)
        )
    );

    helper.updateHouseSalesLegendCountUp(
        mapHelper.getPriceIntervalFromOrigin(originPosition),
        mapHelper.getPriceIntervalFromOrigin(originPosition)
    );

    map.flyTo([
        helper.isMobileDevice()
            ? originPosition.latitude * 1.001
            : originPosition.latitude,
        helper.isMobileDevice()
            ? originPosition.longitude
            : originPosition.longitude * 1.02
    ]);

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([
        originPosition.latitude,
        originPosition.longitude
    ]).addTo(map);

    getCommuterMapButtonClicked = true;
    const geoJsonArea = await getGeoJsonArea({
        position: originPosition,
        transportationMode: "TRANSIT,WALK",
        commuterTime: startSelectedSeconds
    });
    showGeoJsonArea(geoJsonArea);

    setTimeout(() => {
        $filters.classList.add("shown");
    }, 1000);
}

export default function() {
    const inputElm = document.getElementById("dawa-autocomplete-input");
    const component = dawaAutocomplete.dawaAutocomplete(inputElm, {
        select: async function(selected) {
            adress = selected.tekst;
            const { x, y } = selected.data;
            originPosition = {
                latitude: y,
                longitude: x
            };
        }
    });

    document
        .querySelector("section.selector button")
        .addEventListener("click", () => {
            $mapLoadingOverlay.classList.add("shown");
            $mapLoadingText.classList.add("shown");
            jump(".points-map", {
                duration: 300,
                offset: -12,
                callback: showAndFlyToSelectedArea
            });
        });

    $updateMapButton.addEventListener("click", async () => {
        if (helper.isMobileDevice()) {
            jump(".points-map", {
                duration: 300,
                offset: -12
            });
        }
        const transportationMode =
            $transportation.options[$transportation.selectedIndex].value;

        if (housePriceShown) {
            houseSalesLegend.classList.remove("hidden");
            houseSalesDenmarkLayer.show();
        } else {
            houseSalesDenmarkLayer.hide();
            houseSalesLegend.classList.add("hidden");
        }

        const currentFilter = [
            transportationMode,
            JSON.stringify(originPosition),
            selectedSeconds
        ];

        const filterHasChanged = !helper.arraysEqual(
            currentFilter,
            previousFilter
        );

        if (filterHasChanged) {
            $mapLoadingOverlay.classList.add("shown");
            $mapLoadingText.classList.add("shown");
            $updateMapButton.innerHTML = "Henter dit pendlerkort...";
            const geoJsonArea = await getGeoJsonArea({
                position: originPosition,
                transportationMode,
                commuterTime: selectedSeconds
            });

            showGeoJsonArea(geoJsonArea);
            $updateMapButton.innerHTML = "Opdater kort";
        }
        previousFilter = currentFilter;
    });
}

//     const priceInterval = mapHelper.getPriceIntervalFromOrigin({
//         latitude: window.activeCommuterPositions.originPosition.latitude,
//         longitude: window.activeCommuterPositions.originPosition.longitude
//     });

//     // we count up but we dont actually need the counting, just to change the code
//     helper.updateHouseSalesLegendCountUp(
//         [500000, 1000000, 1500000, 2000000],
//         priceInterval
//     );

function initializeMap() {
    const myRenderer = L.canvas({ padding: 0.5 });

    map = mapHelper.initialiseAllMapFunctionality({
        originPosition: {
            latitude: 55.683542,
            longitude: 12.571738
        },
        mapContainer: document.querySelector(".points-map"),
        houseSalesStyle
    });

    client.getLeafletLayer().addTo(map);
}

initializeMap();

// function startEverything(originPosition) {
//     // window.activeCommuterPositions = commuterPositions[0];
//     const myRenderer = L.canvas({ padding: 0.5 });

//     const slider = document.querySelector(".points-map .slider");
//     const commuteTimeSpan = document.querySelector(
//         ".points-map .slider-container p span"
//     );
//     const markers = [];
//     const startSelectedSeconds = 3300;
//     noUiSlider.create(slider, {
//         start: startSelectedSeconds,
//         connect: [true, false],
//         range: {
//             min: 0,
//             max: 8000
//         },
//         padding: [450, 450]
//     });

//     const houseSalesStyle = new window.carto.style.CartoCSS(
//         mapHelper.getHouseSalesStyling(0.74, [
//             1500000,
//             3000000,
//             4500000,
//             6000000
//         ])
//     );

//     const map = mapHelper.initialiseAllMapFunctionality({
//         originPosition,
//         mapContainer: document.querySelector(".points-map"),
//         houseSalesStyle
//     });

//     function getColorHyf(duration) {
//         // return "#2b8cbe";
//         if (duration > 4800) return "#045a8d";
//         if (duration > 3600) return "#2b8cbe";
//         if (duration > 2400) return "#74a9cf";
//         if (duration > 1200) return "#a6bddb";
//         if (duration > 0) return "#d0d1e6";
//     }

//     function getColorNovo(duration) {
//         return "#ffff39";
//         if (duration > 4800) return "yellow";
//         if (duration > 3600) return "#ffff39";
//         if (duration > 2400) return "#fafa69";
//         if (duration > 1200) return "#ffffa2";
//         if (duration > 0) return "#fafad0";
//     }

//     let selectedSeconds;
//     let activeTransportation = "commute-public";
//     let geoJsonAreaLayer;
//     slider.noUiSlider.on("change", async function([selectedSecondsSlider]) {
//         selectedSeconds = selectedSecondsSlider;
//         commuteTimeSpan.innerHTML = helper.secondsToHms(selectedSeconds);
//         console.log(activeTransportation);

//         let mode = "";
//         // BICYCLE; CAR; TRANSIT,WALK, TRANSIT, WALK, BUS, RAIL
//         /*
//         h_bikeshare_mode :
//          [
//              ['TRANSIT,WALK', 'Transit'],
//              ['BUSISH,WALK', 'Bus only'],
//              ['TRAINISH,WALK', 'Train only'],
//              ['WALK', 'Walk only'],
//              ['BICYCLE', 'Bicycle only'],
//              ['WALK,BICYCLE', 'Rented Bicycle'],
//              ['TRANSIT,BICYCLE', 'Transit & Bicycle'],
//              ['TRANSIT,WALK,BICYCLE', 'Transit & Rented Bicycle'],
//              ['CAR', 'Car']
//          ],
//         */
//         if (activeTransportation === "commute-public") {
//             mode = "TRANSIT,WALK";
//         } else if (activeTransportation === "commute-driving") {
//             mode = "CAR";
//         }
//         const geojsonAreaUrl = `http://178.62.109.188:8080/otp/routers/default/isochrone?fromPlace=${
//             window.activeCommuterPositions.originPosition.latitude
//         },${
//             window.activeCommuterPositions.originPosition.longitude
//         }&mode=${mode}&date=2019/07/18&time=8:12pm&maxWalkDistance=500&cutoffSec=${parseInt(
//             selectedSeconds
//         )}`;

//         const geojsonAreaResponse = await fetch(geojsonAreaUrl);
//         const geojsonArea = await geojsonAreaResponse.json();
//         if (geoJsonAreaLayer) {
//             geoJsonAreaLayer.clearLayers();
//         }
//         geoJsonAreaLayer = new L.geoJson(geojsonArea, {
//             style: {
//                 weight: 1,
//                 color: "blue",
//                 opacity: 0.5,
//                 fillColor: "blue",
//                 fillOpacity: 0.3
//             }
//         }).addTo(map);

//         // here
//     });

//     const transportationButtons = document.querySelectorAll(
//         ".transportation-wrapper button"
//     );
//     helper.toggleButtons([...transportationButtons], key => {
//         if (key === "driving") {
//             activeTransportation = "commute-driving";
//         }
//         if (key === "public") {
//             activeTransportation = "commute-public";
//         }
//     });
//     const client = mapHelper.getClient();

//     const houseSalesSourceDenmark = mapHelper.getHouseSalesSourceDenmark();

//     const houseSalesDenmarkLayer = new window.carto.layer.Layer(
//         houseSalesSourceDenmark,
//         houseSalesStyle
//     );

//     client.addLayer(houseSalesDenmarkLayer);
//     client.getLeafletLayer().addTo(map);
//     houseSalesDenmarkLayer.hide();

//     const houseSalesToggleButtons = document.querySelectorAll(
//         ".house-sales-wrapper button"
//     );
//     const houseSalesLegend = document.querySelector(".legend.house-sales");
//     helper.toggleButtons([...houseSalesToggleButtons], key => {
//         if (key === "off") {
//             houseSalesDenmarkLayer.hide();
//             houseSalesLegend.classList.add("hidden");
//         }

//         if (key === "on") {
//             houseSalesLegend.classList.remove("hidden");
//             houseSalesDenmarkLayer.show();
//         }
//     });

//     let marker = L.marker([
//         window.activeCommuterPositions.originPosition.latitude,
//         window.activeCommuterPositions.originPosition.longitude
//     ])
//         .bindPopup("Pendlerkort udgangspunkt")
//         .addTo(map);

//     const priceInterval = mapHelper.getPriceIntervalFromOrigin({
//         latitude: window.activeCommuterPositions.originPosition.latitude,
//         longitude: window.activeCommuterPositions.originPosition.longitude
//     });

//     // we count up but we dont actually need the counting, just to change the code
//     helper.updateHouseSalesLegendCountUp(
//         [500000, 1000000, 1500000, 2000000],
//         priceInterval
//     );
//     houseSalesStyle.setContent(
//         mapHelper.getHouseSalesStyling(0.74, priceInterval)
//     );
//     window.currentPriceIntervals = priceInterval;

//     selectActiveCity({
//         map,
//         houseSalesStyle,
//         commuterPositions,
//         functionDone: () => {
//             map.removeLayer(marker);
//             marker = L.marker([
//                 window.activeCommuterPositions.originPosition.latitude,
//                 window.activeCommuterPositions.originPosition.longitude
//             ]).addTo(map);
//         }
//     });
// }

// async function selectActiveCity({
//     map,
//     houseSalesStyle,
//     commuterPositions,
//     functionDone
// }) {
//     const copenhagenIntervals = [1500000, 3000000, 4500000, 6000000];
//     const odenseIntervals = [500000, 1000000, 1500000, 2000000];
//     const aalborgIntervals = odenseIntervals;
//     const aarhusIntervals = [700000, 1400000, 2100000, 2800000];
//     const selectCityButtons = document.querySelectorAll(
//         ".select-city > ul > li > button"
//     );

//     function cityClicked(relevantCommuterPosition) {
//         let interval = [500000, 1000000, 1500000, 2000000];

//         if (relevantCommuterPosition["slugifiedAdress"] === "copenhagen") {
//             interval = [1500000, 3000000, 4500000, 6000000];
//         }

//         if (
//             relevantCommuterPosition["slugifiedAdress"] ===
//             "banegrdspladsen-1-8000-aarhus"
//         ) {
//             interval = [700000, 1400000, 2100000, 2800000];
//         }

//         window.activeCommuterPositions = relevantCommuterPosition;

//         const priceInterval = mapHelper.getPriceIntervalFromOrigin({
//             latitude: relevantCommuterPosition.originPosition.latitude,
//             longitude: relevantCommuterPosition.originPosition.longitude
//         });

//         // we count up but we dont actually need the counting, just to change the code
//         helper.updateHouseSalesLegendCountUp(
//             window.currentPriceIntervals,
//             priceInterval
//         );

//         if (!helper.arraysEqual(currentPriceIntervals, priceInterval)) {
//             // We want to limit the cartodb usage!
//             houseSalesStyle.setContent(
//                 mapHelper.getHouseSalesStyling(0.74, priceInterval)
//             );
//         }

//         window.currentPriceIntervals = priceInterval;
//     }

//     const selectCityElement = document.querySelector(".select-city select");
//     const selectCityButton = document.querySelector(".select-city button");
//     selectCityButton.addEventListener("click", async () => {
//         const selectedOption =
//             selectCityElement.options[selectCityElement.selectedIndex];
//         const selectedCity = selectedOption.value;

//         helper.updateQueryStringParameter({
//             key: "by",
//             value: slugify(selectedOption.innerHTML, { lower: true })
//         });

//         const center = selectCityElement.options[
//             selectCityElement.selectedIndex
//         ]
//             .getAttribute("data-center")
//             .split(",");

//         setTimeout(() => {
//             map.flyTo([
//                 helper.isMobileDevice() ? center[0] * 1.001 : center[0],
//                 helper.isMobileDevice() ? center[1] : center[1] * 1.02
//             ]);
//         }, 0);

//         const relevantCommuterPositionResponse = await fetch(
//             `./commuter-positions/city-${selectedCity}.json`
//         );
//         const relevantCommuterPosition = await relevantCommuterPositionResponse.json();

//         cityClicked(relevantCommuterPosition);

//         functionDone();
//     });

//     // helper.toggleButtons([...selectCityButtons], key => {});
// }
