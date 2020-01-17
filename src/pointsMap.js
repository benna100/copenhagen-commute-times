import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";
import { CountUp } from "countup.js";

import helper from "./helper";

export default function() {
    // select all elements
    const mapToggleLabel = document.querySelector(".map-active label");
    const mapToggleInput = document.querySelector(".map-active input");
    const scrollPageSpan = document.querySelector(
        ".map-active span.scroll-page"
    );
    const activeMapElement = document.querySelector(".map-active");
    const scrollMapSpan = document.querySelector(".map-active span.scroll-map");
    const pointsMapElement = document.querySelector("#points-map");
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

    const pointsMap = window.L.map(pointsMapElement).setView([55.7, 12.5], 9);
    pointsMap.scrollWheelZoom.disable();

    let activeCity = "copenhagen";
    let activeTransportation = "public";

    window.L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        {
            maxZoom: 18
        }
    ).addTo(pointsMap);

    function secondsToHms(d) {
        d = Number(d);
        const h = Math.floor(d / 3600);
        const m = Math.floor((d % 3600) / 60);

        const hDisplay = h > 0 ? h + (h === 1 ? " time, " : " timer, ") : "";
        const mDisplay = m > 0 ? m + (m === 1 ? " minut" : " minutter") : "";

        return hDisplay + mDisplay;
    }

    const client = new window.carto.Client({
        apiKey: "okNxK8jzzM39Lpj-7ZHYcw",
        username: "benna100"
    });

    const source = new window.carto.source.SQL(
        `SELECT * FROM ${activeCity}_commute_times WHERE commute_public > 0`
    );

    const hexagonSizes = 15;

    const houseSalesSourceDenmark = new window.carto.source.SQL(`
          -- Create hexagon grid
          WITH hgrid AS (
              SELECT CDB_HexagonGrid(
                  ST_Expand(!bbox!, CDB_XYZ_Resolution(9) * ${hexagonSizes}),
                  CDB_XYZ_Resolution(9) * ${hexagonSizes}) as cell
              )

          -- select the data from the "virtual table" hgrid, which has been created
          -- using the "WITH" statement of PostgreSQL,
          -- that intesects with the dataset of points "stormevents_locations_2014"

          SELECT  hgrid.cell as the_geom_webmercator,
                  avg(price) as agg_value,
                  row_number() over () as cartodb_id
          FROM hgrid, (SELECT * FROM house_sales_denmark) i
          WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell) AND price != 0
          GROUP BY hgrid.cell

        `);

    const houseSalesStyle = new window.carto.style.CartoCSS(
        helper.getHouseSalesStyling(0.74, [1500000, 3000000, 4500000, 6000000])
    );

    function setCheckbox(setChecked) {
        mapToggleInput.checked = setChecked;
    }

    const shouldActiveMapToggle = helper.isTouchEnabled();
    if (shouldActiveMapToggle) {
        activeMapElement.classList.remove("hidden");

        [
            ...document.querySelectorAll(".leaflet-control-zoom a")
        ].forEach(zoomButton =>
            zoomButton.addEventListener("click", () => setMapActiveOrNot(true))
        );

        pointsMapElement.addEventListener("touchstart", helper.tapHandler);

        function setMapActiveOrNot(activeOrNot) {
            if (activeOrNot) {
                scrollMapSpan.classList.add("active");
                pointsMap.dragging.enable();
                setCheckbox(true);
            } else {
                scrollPageSpan.classList.add("active");
                pointsMap.dragging.disable();
                setCheckbox(false);
            }
        }

        document
            .querySelector(".points-map-container")
            .addEventListener("touchmove", handleMove, false);
        function handleMove(evt) {
            var touches = evt.changedTouches;
            if (touches.length > 1) {
                setMapActiveOrNot(true);
            }
        }
        pointsMap.dragging.disable();
        mapToggleInput.addEventListener("change", () => {
            scrollPageSpan.classList.remove("active");
            scrollMapSpan.classList.remove("active");
            const scrollMap = mapToggleInput.checked;

            setMapActiveOrNot(scrollMap);
        });
    }

    let isZoomLevelAboveThresholdPrev = false;
    pointsMap.on("zoom", a => {
        const newZoom = a.target._zoom;
        const isZoomLevelAboveThresholdCurrent = newZoom > 10;

        if (
            isZoomLevelAboveThresholdPrev !== isZoomLevelAboveThresholdCurrent
        ) {
            if (isZoomLevelAboveThresholdCurrent) {
                houseSalesStyle.setContent(helper.getHouseSalesStyling(0.3));
            } else {
                houseSalesStyle.setContent(helper.getHouseSalesStyling(0.74));
            }
        }

        isZoomLevelAboveThresholdPrev = isZoomLevelAboveThresholdCurrent;
    });

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

    let currentIntervals = copenhagenIntervals;
    helper.toggleButtons([...selectCityButtons], key => {
        if (key === "copenhagen") {
            pointsMap.flyTo([55.672554, 12.566271]);
            activeCity = "copenhagen";
            houseSalesStyle.setContent(
                helper.getHouseSalesStyling(0.74, copenhagenIntervals)
            );

            updateHouseSalesLegendCountUp(
                currentIntervals,
                copenhagenIntervals
            );
            currentIntervals = copenhagenIntervals;
        }
        if (key === "aarhus") {
            pointsMap.flyTo([56.150705, 10.204396]);
            activeCity = "aarhus";
            houseSalesStyle.setContent(
                helper.getHouseSalesStyling(0.74, aarhusIntervals)
            );

            updateHouseSalesLegendCountUp(currentIntervals, aarhusIntervals);
            currentIntervals = aarhusIntervals;
        }
        if (key === "aalborg") {
            pointsMap.flyTo([57.042931, 9.917307]);
            activeCity = "aalborg";
            houseSalesStyle.setContent(
                helper.getHouseSalesStyling(0.74, [
                    500000,
                    1000000,
                    1500000,
                    2000000
                ])
            );

            updateHouseSalesLegendCountUp(currentIntervals, aalborgIntervals);
            currentIntervals = aalborgIntervals;
        }
        if (key === "odense") {
            pointsMap.flyTo([55.401411, 10.386118]);
            activeCity = "odense";
            houseSalesStyle.setContent(
                helper.getHouseSalesStyling(0.74, [
                    500000,
                    1000000,
                    1500000,
                    2000000
                ])
            );

            updateHouseSalesLegendCountUp(currentIntervals, odenseIntervals);
            currentIntervals = odenseIntervals;
        }
        updateCommuteTimesQuery(selectedSeconds);
    });

    function updateHouseSalesLegendCountUp(currentIntervals, nextIntervals) {
        countUpFromTo(
            currentIntervals[0] / 1000000,
            nextIntervals[0] / 1000000,
            document.querySelector(
                ".points-map-container ul li:nth-child(1) span:nth-child(2)"
            )
        );

        for (let i = 1; i < 3; i++) {
            countUpFromTo(
                currentIntervals[i - 1] / 1000000,
                nextIntervals[i - 1] / 1000000,
                document.querySelector(
                    `.points-map-container ul li:nth-child(${i +
                        1}) span:nth-child(1)`
                )
            );

            countUpFromTo(
                currentIntervals[i] / 1000000,
                nextIntervals[i] / 1000000,
                document.querySelector(
                    `.points-map-container ul li:nth-child(${i +
                        1}) span:nth-child(2)`
                )
            );
        }

        // todo this got a little messy, clean up only defining the intervals array as a interval increment, fx 700.000

        countUpFromTo(
            currentIntervals[2] / 1000000,
            nextIntervals[2] / 1000000,
            document.querySelector(
                `.points-map-container ul li:nth-child(4) span:nth-child(1)`
            )
        );
        countUpFromTo(
            currentIntervals[2] / 1000000 + currentIntervals[0] / 1000000,
            nextIntervals[2] / 1000000 + nextIntervals[0] / 1000000,
            document.querySelector(
                `.points-map-container ul li:nth-child(4) span:nth-child(2)`
            )
        );

        countUpFromTo(
            currentIntervals[2] / 1000000 + currentIntervals[0] / 1000000,
            nextIntervals[2] / 1000000 + nextIntervals[0] / 1000000,
            document.querySelector(
                `.points-map-container ul li:nth-child(5) span:nth-child(1)`
            )
        );
    }

    function countUpFromTo(from, to, element) {
        const options = {
            startVal: from,
            duration: 1,
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

    slider.noUiSlider.on("update", function([selectedSecondsSlider]) {
        selectedSeconds = selectedSecondsSlider;
        commuteTimeSpan.innerHTML = secondsToHms(selectedSeconds);

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
    client.getLeafletLayer().addTo(pointsMap);
}
