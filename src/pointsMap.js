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
const startSelectedSeconds = 2400;
let previousFilter;
window.currentPriceIntervals = [1500000, 3000000, 4500000, 6000000];

const $mapLoadingOverlay = document.querySelector(
    ".points-map .loading-overlay"
);
const $mapLoadingText = document.querySelector(".points-map .loading-text");
const $adress = document.querySelector(".selector input");
const $updateMapButton = document.querySelector(
    ".slider-container button.update-map"
);
const $filters = document.querySelector(".slider-container");
const $transportationSelect = document.querySelector(
    ".slider-container select"
);
const $houseSalesLegend = document.querySelector(".legend.house-sales");
const $housePricesSelect = document.querySelector("#house-prices");

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
        max: 6000
    },
    padding: [5 * 60, 5 * 60],
    step: 5 * 60
});

slider.noUiSlider.on("update", async function([selectedSecondsSlider]) {
    selectedSeconds = selectedSecondsSlider;
    commuteTimeSpan.innerHTML = helper.secondsToHms(selectedSeconds);
});

async function getGeoJsonArea({ position, transportationMode, commuterTime }) {
    // this adress breaks everything: Tærø 1, 4772 Langebæk
    // const geoJsonAreaUrl = `http://localhost:3000/commuter-area?latitude=${position.latitude}&longitude=${position.longitude}&commuterTime=${commuterTime}&mode=${transportationMode}`;
    const geoJsonAreaUrl = `https://commuter-area.herokuapp.com/commuter-area?latitude=${position.latitude}&longitude=${position.longitude}&commuterTime=${commuterTime}&mode=${transportationMode}`;

    try {
        const geoJsonAreaResponse = await fetch(geoJsonAreaUrl);

        // i also need the lat lng for the map
        return geoJsonAreaResponse.json();
    } catch (error) {
        alert("Vi kunne desværre ikke lave pendlerkort for denne adresse");
        return;
    }
}

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

    window.currentPriceIntervals = mapHelper.getPriceIntervalFromOrigin(
        originPosition
    );

    houseSalesStyle.setContent(
        mapHelper.getHouseSalesStyling(0.74, window.currentPriceIntervals)
    );

    helper.updateHouseSalesLegendCountUp(
        window.currentPriceIntervals,
        window.currentPriceIntervals
    );

    map.flyTo(
        [
            helper.isMobileDevice()
                ? originPosition.latitude * 1.001
                : originPosition.latitude,
            helper.isMobileDevice()
                ? originPosition.longitude
                : originPosition.longitude * 1.02
        ],
        9.5,
        { duration: 1 }
    );

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

    if (geoJsonArea.error) {
        alert("Vi kunne desværre ikke lave pendlerkort for denne adresse");
    } else {
        showGeoJsonArea(geoJsonArea);

        setTimeout(() => {
            $filters.classList.add("shown");
        }, 1200);
    }
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

    document.querySelector(".selector button").addEventListener("click", () => {
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
            $transportationSelect.options[$transportationSelect.selectedIndex]
                .value;

        const MAX_MINUTES_FOR_CAR = 50;
        if (
            transportationMode === "CAR" &&
            selectedSeconds > 60 * MAX_MINUTES_FOR_CAR
        ) {
            alert(
                `Vælg pendlertid kortere end ${MAX_MINUTES_FOR_CAR} min for bil`
            );
            return;
        }
        const housePricesVisibilityStatus =
            $housePricesSelect.options[$housePricesSelect.selectedIndex].value;

        if (housePricesVisibilityStatus === "shown") {
            $houseSalesLegend.classList.remove("hidden");
            houseSalesDenmarkLayer.show();
        } else {
            houseSalesDenmarkLayer.hide();
            $houseSalesLegend.classList.add("hidden");
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
