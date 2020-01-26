import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";

import helper from "./helper";
import mapHelper from "./map-helper";
import slugify from "slugify";

function updateCommutePositions(
    key,
    selectedSeconds,
    map,
    markers,
    commuterPositionsData,
    colorScheme,
    renderer,
    originPosition,
    intervals
) {
    markers.forEach(marker => {
        map.removeLayer(marker);
    });

    const filteresCommuterPositions = commuterPositionsData.commuterPositions.filter(
        commute => {
            if (key === "driving-public-difference") {
                return commute[key] !== null;
            } else {
                return commute[key] < selectedSeconds && commute[key] > 0;
            }
        }
    );

    filteresCommuterPositions.forEach(commute => {
        // const distanceToCenter = mapHelper.getDistanceFromLatLonInKm(
        //     {
        //         latitude: commute.latitude,
        //         longitude: commute.longitude
        //     },
        //     originPosition
        // );

        // let radius = 3;
        // if (distanceToCenter >= 80) {
        //     radius = 10;
        // }
        // if (distanceToCenter >= 50 && distanceToCenter < 80) {
        //     radius = 7;
        // }
        // if (distanceToCenter < 50) {
        //     radius = 3;
        // }

        const marker = L.circleMarker([commute.latitude, commute.longitude], {
            color: colorScheme(commute[key], intervals),
            stroke: false,
            radius: 3,
            opacity: 1,
            renderer: renderer,
            fillOpacity: 1,
            interactive: false
        }).addTo(map);

        markers.push(marker);
    });
}

export default async function() {
    const cityQueryParameter = helper.getUrlParameter("by");

    let commuterPositionFilename = "copenhagen";
    const selectCityOptions = document.querySelectorAll(
        ".select-city select > option"
    );

    const queryParameterCityOptionsIndex = [...selectCityOptions]
        .map(citiesList => slugify(citiesList.innerHTML, { lower: true }))
        .indexOf(cityQueryParameter);

    const isCityInQueryParameter = queryParameterCityOptionsIndex !== -1;
    if (isCityInQueryParameter) {
        commuterPositionFilename =
            selectCityOptions[queryParameterCityOptionsIndex].value;
        selectCityOptions[queryParameterCityOptionsIndex].selected = true;
    }

    const commuterPositionFilenames = [commuterPositionFilename];
    const commuterPositionUrls = commuterPositionFilenames.map(
        commuterPositionFilename =>
            `./commuter-positions/city-${commuterPositionFilename}.json`
    );

    const commuterPositionFetchPromises = commuterPositionUrls.map(
        commuterPositionUrl => fetch(commuterPositionUrl)
    );
    const commuterPositionResponses = await Promise.all(
        commuterPositionFetchPromises
    );
    const commuterPositionResponsesJson = commuterPositionResponses.map(
        commuterPositionResponse => commuterPositionResponse.json()
    );
    const commuterPositions = await Promise.all(commuterPositionResponsesJson);

    startEverything(commuterPositions);
}

function startEverything(commuterPositions) {
    window.activeCommuterPositions = commuterPositions[0];
    const myRenderer = L.canvas({ padding: 0.5 });

    const slider = document.querySelector(".points-map .slider");
    const commuteTimeSpan = document.querySelector(
        ".points-map .slider-container p span"
    );
    const markers = [];
    const startSelectedSeconds = 3300;
    noUiSlider.create(slider, {
        start: startSelectedSeconds,
        connect: [true, false],
        range: {
            min: 0,
            max: 8000
        }
    });

    const originPosition = {
        latitude: window.activeCommuterPositions.originPosition.latitude,
        longitude: window.activeCommuterPositions.originPosition.longitude
    };
    const houseSalesStyle = new window.carto.style.CartoCSS(
        mapHelper.getHouseSalesStyling(0.74, [
            1500000,
            3000000,
            4500000,
            6000000
        ])
    );

    const map = mapHelper.initialiseAllMapFunctionality({
        originPosition,
        mapContainer: document.querySelector(".points-map"),
        houseSalesStyle
    });

    function getColorHyf(duration) {
        // return "#2b8cbe";
        if (duration > 4800) return "#045a8d";
        if (duration > 3600) return "#2b8cbe";
        if (duration > 2400) return "#74a9cf";
        if (duration > 1200) return "#a6bddb";
        if (duration > 0) return "#d0d1e6";
    }

    function getColorNovo(duration) {
        return "#ffff39";
        if (duration > 4800) return "yellow";
        if (duration > 3600) return "#ffff39";
        if (duration > 2400) return "#fafa69";
        if (duration > 1200) return "#ffffa2";
        if (duration > 0) return "#fafad0";
    }

    let selectedSeconds;
    let activeTransportation = "commute-public";
    slider.noUiSlider.on("update", function([selectedSecondsSlider]) {
        selectedSeconds = selectedSecondsSlider;
        commuteTimeSpan.innerHTML = helper.secondsToHms(selectedSeconds);

        updateCommutePositions(
            activeTransportation,
            selectedSeconds,
            map,
            markers,
            window.activeCommuterPositions,
            getColorHyf,
            myRenderer,
            originPosition
        );
    });

    const transportationButtons = document.querySelectorAll(
        ".transportation-wrapper button"
    );
    helper.toggleButtons([...transportationButtons], key => {
        if (key === "driving") {
            updateCommutePositions(
                "commute-driving",
                selectedSeconds,
                map,
                markers,
                window.activeCommuterPositions,
                getColorHyf,
                myRenderer,
                originPosition
            );
            activeTransportation = "commute-driving";
        }
        if (key === "public") {
            updateCommutePositions(
                "commute-public",
                selectedSeconds,
                map,
                markers,
                window.activeCommuterPositions,
                getColorHyf,
                myRenderer,
                originPosition
            );
            activeTransportation = "commute-public";
        }
    });
    const client = mapHelper.getClient();

    const houseSalesSourceDenmark = mapHelper.getHouseSalesSourceDenmark();

    const houseSalesDenmarkLayer = new window.carto.layer.Layer(
        houseSalesSourceDenmark,
        houseSalesStyle
    );

    client.addLayer(houseSalesDenmarkLayer);
    client.getLeafletLayer().addTo(map);
    houseSalesDenmarkLayer.hide();

    const houseSalesToggleButtons = document.querySelectorAll(
        ".house-sales-wrapper button"
    );
    const houseSalesLegend = document.querySelector(".legend.house-sales");
    helper.toggleButtons([...houseSalesToggleButtons], key => {
        if (key === "off") {
            houseSalesDenmarkLayer.hide();
            houseSalesLegend.classList.add("hidden");
        }

        if (key === "on") {
            houseSalesLegend.classList.remove("hidden");
            houseSalesDenmarkLayer.show();
        }
    });

    let marker = L.marker([
        window.activeCommuterPositions.originPosition.latitude,
        window.activeCommuterPositions.originPosition.longitude
    ])
        .bindPopup("Pendlerkort udgangspunkt")
        .addTo(map);

    updateCommutePositions(
        "commute-public",
        selectedSeconds,
        map,
        markers,
        window.activeCommuterPositions,
        getColorHyf,
        myRenderer,
        originPosition
    );

    const priceInterval = mapHelper.getPriceIntervalFromOrigin({
        latitude: window.activeCommuterPositions.originPosition.latitude,
        longitude: window.activeCommuterPositions.originPosition.longitude
    });

    // we count up but we dont actually need the counting, just to change the code
    helper.updateHouseSalesLegendCountUp(
        [500000, 1000000, 1500000, 2000000],
        priceInterval
    );
    window.currentPriceIntervals = priceInterval;

    selectActiveCity({
        map,
        houseSalesStyle,
        commuterPositions,
        functionDone: () => {
            setTimeout(() => {
                updateCommutePositions(
                    "commute-public",
                    selectedSeconds,
                    map,
                    markers,
                    window.activeCommuterPositions,
                    getColorHyf,
                    myRenderer,
                    originPosition
                );
            }, 500);
            map.removeLayer(marker);
            marker = L.marker([
                window.activeCommuterPositions.originPosition.latitude,
                window.activeCommuterPositions.originPosition.longitude
            ]).addTo(map);
        }
    });
}

async function selectActiveCity({
    map,
    houseSalesStyle,
    commuterPositions,
    functionDone
}) {
    const copenhagenIntervals = [1500000, 3000000, 4500000, 6000000];
    const odenseIntervals = [500000, 1000000, 1500000, 2000000];
    const aalborgIntervals = odenseIntervals;
    const aarhusIntervals = [700000, 1400000, 2100000, 2800000];
    const selectCityButtons = document.querySelectorAll(
        ".select-city > ul > li > button"
    );

    function cityClicked(relevantCommuterPosition) {
        let interval = [500000, 1000000, 1500000, 2000000];

        if (relevantCommuterPosition["slugifiedAdress"] === "copenhagen") {
            interval = [1500000, 3000000, 4500000, 6000000];
        }

        if (
            relevantCommuterPosition["slugifiedAdress"] ===
            "banegrdspladsen-1-8000-aarhus"
        ) {
            interval = [700000, 1400000, 2100000, 2800000];
        }

        window.activeCommuterPositions = relevantCommuterPosition;

        const priceInterval = mapHelper.getPriceIntervalFromOrigin({
            latitude: window.activeCommuterPositions.originPosition.latitude,
            longitude: window.activeCommuterPositions.originPosition.longitude
        });

        // we count up but we dont actually need the counting, just to change the code
        helper.updateHouseSalesLegendCountUp(
            window.currentPriceIntervals,
            priceInterval
        );
        window.currentPriceIntervals = priceInterval;

        if (!helper.arraysEqual(currentPriceIntervals, interval)) {
            // We want to limit the cartodb usage!
            houseSalesStyle.setContent(
                mapHelper.getHouseSalesStyling(0.74, currentPriceIntervals)
            );
        }
    }

    const selectCityElement = document.querySelector(".select-city select");
    const selectCityButton = document.querySelector(".select-city button");
    selectCityButton.addEventListener("click", async () => {
        const selectedOption =
            selectCityElement.options[selectCityElement.selectedIndex];
        const selectedCity = selectedOption.value;

        helper.updateQueryStringParameter({
            key: "by",
            value: slugify(selectedOption.innerHTML, { lower: true })
        });

        const center = selectCityElement.options[
            selectCityElement.selectedIndex
        ]
            .getAttribute("data-center")
            .split(",");

        setTimeout(() => {
            map.flyTo([
                helper.isMobileDevice() ? center[0] * 1.001 : center[0],
                helper.isMobileDevice() ? center[1] : center[1] * 1.02
            ]);
        }, 0);

        const relevantCommuterPositionResponse = await fetch(
            `./commuter-positions/city-${selectedCity}.json`
        );
        const relevantCommuterPosition = await relevantCommuterPositionResponse.json();

        cityClicked(relevantCommuterPosition);

        functionDone();
    });

    // helper.toggleButtons([...selectCityButtons], key => {});
}
