import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";
import { CountUp } from "countup.js";

import helper from "./helper";
import mapHelper from "./map-helper";

export default function() {
    // select all elements
    const slider = document.querySelector(".points-map .slider");
    const commuteTimeSpan = document.querySelector(
        ".points-map .slider-container p span"
    );
    const transportationButtons = document.querySelectorAll(
        ".transportation-wrapper button"
    );
    const houseSalesLegend = document.querySelector(".legend.house-sales");
    const houseSalesToggleButtons = document.querySelectorAll(
        ".house-sales-wrapper button"
    );
    const selectCityButtons = document.querySelectorAll(
        ".select-city > ul > li > button"
    );

    const originPosition = {
        latitude: 55.7,
        longitude: 12.5
    };
    const mapContainer = document.querySelector(".points-map");
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
        mapContainer,
        houseSalesStyle
    });

    let activeCity = "copenhagen";
    let activeTransportation = "public";

    const client = new window.carto.Client({
        apiKey: "okNxK8jzzM39Lpj-7ZHYcw",
        username: "benna100"
    });

    const source = new window.carto.source.SQL(
        `SELECT * FROM ${activeCity}_commute_times WHERE commute_public > 0`
    );

    noUiSlider.create(slider, {
        start: 3300,
        connect: [true, false],
        range: {
            min: 0,
            max: 8000
        }
    });

    const style = new window.carto.style.CartoCSS(
        helper.getPointsStyling("commute_public")
    );

    let selectedSeconds;
    const copenhagenIntervals = [1500000, 3000000, 4500000, 6000000];
    const odenseIntervals = [500000, 1000000, 1500000, 2000000];
    const aalborgIntervals = odenseIntervals;
    const aarhusIntervals = [700000, 1400000, 2100000, 2800000];

    // Yes i know its bad
    window.currentIntervals = copenhagenIntervals;
    helper.toggleButtons([...selectCityButtons], key => {
        if (key === "copenhagen") {
            map.flyTo([55.683332, 12.57166]);
            activeCity = "copenhagen";
            houseSalesStyle.setContent(
                mapHelper.getHouseSalesStyling(0.74, copenhagenIntervals)
            );

            updateHouseSalesLegendCountUp(
                currentIntervals,
                copenhagenIntervals
            );
            window.currentIntervals = copenhagenIntervals;
        }
        if (key === "aarhus") {
            map.flyTo([56.150705, 10.204396]);
            activeCity = "aarhus";
            houseSalesStyle.setContent(
                mapHelper.getHouseSalesStyling(0.74, aarhusIntervals)
            );

            updateHouseSalesLegendCountUp(currentIntervals, aarhusIntervals);
            window.currentIntervals = aarhusIntervals;
        }
        if (key === "aalborg") {
            map.flyTo([57.042931, 9.917307]);
            activeCity = "aalborg";
            houseSalesStyle.setContent(
                mapHelper.getHouseSalesStyling(0.74, [
                    500000,
                    1000000,
                    1500000,
                    2000000
                ])
            );

            updateHouseSalesLegendCountUp(currentIntervals, aalborgIntervals);
            window.currentIntervals = aalborgIntervals;
        }
        if (key === "odense") {
            map.flyTo([55.401411, 10.386118]);
            activeCity = "odense";
            houseSalesStyle.setContent(
                mapHelper.getHouseSalesStyling(0.74, [
                    500000,
                    1000000,
                    1500000,
                    2000000
                ])
            );

            updateHouseSalesLegendCountUp(currentIntervals, odenseIntervals);
            window.currentIntervals = odenseIntervals;
        }
        updateCommuteTimesQuery(selectedSeconds);
    });

    function updateHouseSalesLegendCountUp(currentIntervals, nextIntervals) {
        countUpFromTo(
            currentIntervals[0] / 1000000,
            nextIntervals[0] / 1000000,
            document.querySelector(
                ".map-container ul li:nth-child(1) span:nth-child(2)"
            )
        );

        for (let i = 1; i < 3; i++) {
            countUpFromTo(
                currentIntervals[i - 1] / 1000000,
                nextIntervals[i - 1] / 1000000,
                document.querySelector(
                    `.map-container ul li:nth-child(${i + 1}) span:nth-child(1)`
                )
            );

            countUpFromTo(
                currentIntervals[i] / 1000000,
                nextIntervals[i] / 1000000,
                document.querySelector(
                    `.map-container ul li:nth-child(${i + 1}) span:nth-child(2)`
                )
            );
        }

        // todo this got a little messy, clean up only defining the intervals array as a interval increment, fx 700.000

        countUpFromTo(
            currentIntervals[2] / 1000000,
            nextIntervals[2] / 1000000,
            document.querySelector(
                `.map-container ul li:nth-child(4) span:nth-child(1)`
            )
        );
        countUpFromTo(
            currentIntervals[2] / 1000000 + currentIntervals[0] / 1000000,
            nextIntervals[2] / 1000000 + nextIntervals[0] / 1000000,
            document.querySelector(
                `.map-container ul li:nth-child(4) span:nth-child(2)`
            )
        );

        countUpFromTo(
            currentIntervals[2] / 1000000 + currentIntervals[0] / 1000000,
            nextIntervals[2] / 1000000 + nextIntervals[0] / 1000000,
            document.querySelector(
                `.map-container ul li:nth-child(5) span:nth-child(1)`
            )
        );
    }

    function countUpFromTo(from, to, element) {
        const options = {
            startVal: from,
            duration: 1.5,
            separator: ".",
            decimal: ",",
            decimalPlaces: 1
        };
        let demo = new CountUp(element, to, options);
        if (!demo.error) {
            demo.start();
        } else {
            console.error(demo.error);
        }
    }

    L.marker([55.683332, 12.57166])
        .addTo(map)
        .bindPopup("København udgangspunkt");

    L.marker([55.401411, 10.386118])
        .addTo(map)
        .bindPopup("Odense udgangspunkt");

    L.marker([56.150705, 10.204396])
        .addTo(map)
        .bindPopup("Århus udgangspunkt");

    L.marker([57.042931, 9.917307])
        .addTo(map)
        .bindPopup("Aalborg udgangspunkt");

    slider.noUiSlider.on("update", function([selectedSecondsSlider]) {
        selectedSeconds = selectedSecondsSlider;
        commuteTimeSpan.innerHTML = helper.secondsToHms(selectedSeconds);

        updateCommuteTimesQuery(selectedSeconds);
    });

    function updateCommuteTimesQuery(selectedSeconds) {
        const columnToFilter = transportationButtons[0].className.includes(
            "active"
        )
            ? "commute_public"
            : "commute_driving";

        source.setQuery(`
          SELECT *
            FROM ${activeCity}_commute_times
            WHERE ${columnToFilter} <= ${selectedSeconds} and ${columnToFilter} > 0
        `);
    }

    helper.toggleButtons([...transportationButtons], key => {
        if (key === "driving") {
            activeTransportation = "driving";

            style.setContent(helper.getPointsStyling("commute_driving"));
        }
        if (key === "public") {
            activeTransportation = "public";

            style.setContent(helper.getPointsStyling("commute_public"));
        }

        source.setQuery(`
            SELECT *
              FROM ${activeCity}_commute_times
              WHERE commute_${activeTransportation} <= ${selectedSeconds}
          `);
    });

    const layer = new window.carto.layer.Layer(source, style);

    const houseSalesSourceDenmark = mapHelper.getHouseSalesSourceDenmark();

    const houseSalesDenmarkLayer = new window.carto.layer.Layer(
        houseSalesSourceDenmark,
        houseSalesStyle
    );
    houseSalesDenmarkLayer.hide();

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

    client.addLayers([houseSalesDenmarkLayer, layer]);
    client.getLeafletLayer().addTo(map);
}
