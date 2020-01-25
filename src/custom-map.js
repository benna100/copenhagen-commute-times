import helper from "./helper";
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";
import mapHelper from "./map-helper";

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

export default function() {
    console.log(window.commuterPositionsJsonFile);
    const url =
        window.commuterPositionsJsonFile.substr(0, 5) === "city-"
            ? `./../commuter-positions/${window.commuterPositionsJsonFile}.json`
            : `./commuter-positions/${window.commuterPositionsJsonFile}.json`;

    fetch(url)
        .then(response => response.json())
        .then(commuterPositionsData => startEverything(commuterPositionsData));
}

function startEverything(commuterPositionsData) {
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

    if (window.commuterPositionsJsonFile === "city-copenhagen") {
        window.currentIntervals = [1500000, 3000000, 4500000, 6000000];
    } else {
        window.currentIntervals = [500000, 1000000, 1500000, 2000000];
    }

    const originPosition = {
        latitude: commuterPositionsData.originPosition.latitude,
        longitude: commuterPositionsData.originPosition.longitude
    };
    const houseSalesStyle = new window.carto.style.CartoCSS(
        mapHelper.getHouseSalesStyling(0.74, window.currentIntervals)
    );

    if (document.querySelector(".car-public-difference-map")) {
        showDifferenceDrivingPublicMap(commuterPositionsData, houseSalesStyle);
    }

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
            commuterPositionsData,
            getColorHyf,
            myRenderer,
            originPosition
        );
    });

    // commuteTimeSpan.innerHTML = helper.secondsToHms(startSelectedSeconds);
    // setTimeout(
    //     () =>
    //         updateCommutePositions(
    //             activeTransportation,
    //             startSelectedSeconds,
    //             map,
    //             markers,
    //             commuterPositionsData,
    //             getColorHyf,
    //             myRenderer,
    //             originPosition
    //         ),
    //     0
    // );

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
                commuterPositionsData,
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
                commuterPositionsData,
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

    const marker = L.marker([
        commuterPositionsData.originPosition.latitude,
        commuterPositionsData.originPosition.longitude
    ]).addTo(map);
    marker.bindPopup("Pendlerkort udgangspunkt");

    updateCommutePositions(
        "commute-public",
        selectedSeconds,
        map,
        markers,
        commuterPositionsData,
        getColorHyf,
        myRenderer,
        originPosition
    );
}

function showDifferenceDrivingPublicMap(
    commuterPositionsData,
    houseSalesStyle
) {
    const markers = [];
    const minMaxObject = {
        min: 1000,
        max: -1000
    };
    const commutePoints = commuterPositionsData.commuterPositions.map(
        commuteNovo => {
            const objectToReturn = commuteNovo;

            if (commuteNovo["commute-public"] === null) {
                objectToReturn["driving-public-difference"] = null;

                return objectToReturn;
            }

            const difference =
                commuteNovo["commute-driving"] - commuteNovo["commute-public"];
            const aggregate =
                commuteNovo["commute-driving"] + commuteNovo["commute-public"];

            // https://www.mathsisfun.com/percentage-difference.html
            const percentageDifference = (difference / (aggregate / 2)) * 100;
            objectToReturn["driving-public-difference"] = percentageDifference;
            if (percentageDifference < minMaxObject.min) {
                minMaxObject.min = percentageDifference;
            }

            if (percentageDifference > minMaxObject.max) {
                minMaxObject.max = percentageDifference;
            }
            return objectToReturn;
        }
    );

    const range = minMaxObject.max - minMaxObject.min;
    const numberOfColorIntervals = 6;
    const rangePerInterval = range / numberOfColorIntervals;
    const intervals = [];
    for (let i = 0; i < numberOfColorIntervals; i++) {
        intervals.push((i + 1) * rangePerInterval + minMaxObject.min);
    }

    const myRenderer = L.canvas({ padding: 0.5 });

    const originPosition = {
        latitude: commuterPositionsData.originPosition.latitude,
        longitude: commuterPositionsData.originPosition.longitude
    };
    const map = mapHelper.initialiseAllMapFunctionality({
        originPosition,
        mapContainer: document.querySelector(".car-public-difference-map"),
        houseSalesStyle
    });

    function getColorDifference(duration, intervals) {
        // console.log(duration);
        if (duration > intervals[4]) return "#045a8d";
        if (duration > intervals[3]) return "#2b8cbe";
        if (duration > intervals[2]) return "#74a9cf";
        if (duration > intervals[1]) return "#a6bddb";
        if (duration > intervals[0]) return "#d0d1e6";
    }

    updateCommutePositions(
        "driving-public-difference",
        10000000,
        map,
        markers,
        commuterPositionsData,
        getColorDifference,
        myRenderer,
        originPosition,
        intervals
    );
}
