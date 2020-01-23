import helper from "./helper";
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";

// const commutePoints = commutesNovo.map(commuteNovo => {
//     const difference =
//         commuteNovo["commute-driving"] - commuteNovo["commute-public"];
//     const aggregate =
//         commuteNovo["commute-driving"] + commuteNovo["commute-public"];
//     // https://www.mathsisfun.com/percentage-difference.html
//     const percentageDifference = (difference / (aggregate / 2)) * 100;
//     const objectToReturn = commuteNovo;
//     objectToReturn["driving-public-difference"] = percentageDifference;
//     return objectToReturn;
// });

export default function() {
    const url = `./commuter-positions/${window.commuterPositionsJsonFile}.json`;

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

    noUiSlider.create(slider, {
        start: 3300,
        connect: [true, false],
        range: {
            min: 0,
            max: 8000
        }
    });

    let pointsMap = L.map("points-map", {
        preferCanvas: true
    }).setView(
        [
            commuterPositionsData.originPosition.latitude,
            commuterPositionsData.originPosition.longitude
        ],
        9
    );

    let selectedSeconds;
    let activeTransportation = "commute-public";
    slider.noUiSlider.on("update", function([selectedSecondsSlider]) {
        selectedSeconds = selectedSecondsSlider;
        commuteTimeSpan.innerHTML = helper.secondsToHms(selectedSeconds);

        updateCommutePositions(activeTransportation, selectedSeconds);
    });

    const transportationButtons = document.querySelectorAll(
        ".transportation-wrapper button"
    );
    helper.toggleButtons([...transportationButtons], key => {
        if (key === "driving") {
            updateCommutePositions("commute-driving", selectedSeconds);
            activeTransportation = "commute-driving";
        }
        if (key === "public") {
            updateCommutePositions("commute-public", selectedSeconds);
            activeTransportation = "commute-public";
        }
    });

    function updateCommutePositions(key, selectedSeconds) {
        markers.forEach(marker => {
            pointsMap.removeLayer(marker);
        });

        const filteresCommuterPositions = commuterPositionsData.commuterPositions.filter(
            commute => commute[key] < selectedSeconds && commute[key] > 0
        );
        filteresCommuterPositions.forEach(commute => {
            const marker = L.circleMarker(
                [commute.latitude, commute.longitude],
                {
                    // color: getColorDifference(
                    //     commute["driving-public-difference"]
                    // ),
                    color: getColorHyf(commute[key]),
                    stroke: false,
                    radius: 3,
                    opacity: 1,
                    renderer: myRenderer,
                    fillOpacity: 1
                }
            ).addTo(pointsMap);

            markers.push(marker);
        });
    }

    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        {
            maxZoom: 18
        }
    ).addTo(pointsMap);

    const client = new window.carto.Client({
        apiKey: "okNxK8jzzM39Lpj-7ZHYcw",
        username: "benna100"
    });

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

    const houseSalesStyle = new window.carto.style.CartoCSS(`
        #layer {
          polygon-opacity: 0.74;
    
          [agg_value > 0] {
            polygon-fill: #fcbba1;
          }
          [agg_value > 1500000] {
            polygon-fill: #fc9272;
          }
          [agg_value > 3000000] {
            polygon-fill: #fb6a4a;
          }
          [agg_value > 4500000] {
            polygon-fill: #de2d26;
          }
          [agg_value > 6000000] {
            polygon-fill: #a50f15;
          }
        }
            `);

    const houseSalesDenmarkLayer = new window.carto.layer.Layer(
        houseSalesSourceDenmark,
        houseSalesStyle
    );

    client.addLayer(houseSalesDenmarkLayer);
    client.getLeafletLayer().addTo(pointsMap);
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

    function getColorHyf(duration) {
        // return "#2b8cbe";
        if (duration > 4800) return "#045a8d";
        if (duration > 3600) return "#2b8cbe";
        if (duration > 2400) return "#74a9cf";
        if (duration > 1200) return "#a6bddb";
        if (duration > 0) return "#d0d1e6";
    }

    function getColorDifference(duration) {
        // console.log(duration);
        if (duration > -25) return "#045a8d";
        if (duration > -50) return "#2b8cbe";
        if (duration > -75) return "#74a9cf";
        if (duration > -100) return "#a6bddb";
        if (duration > -120) return "#d0d1e6";
    }

    function getColorNovo(duration) {
        return "#ffff39";
        if (duration > 4800) return "yellow";
        if (duration > 3600) return "#ffff39";
        if (duration > 2400) return "#fafa69";
        if (duration > 1200) return "#ffffa2";
        if (duration > 0) return "#fafad0";
    }

    const marker = L.marker([
        commuterPositionsData.originPosition.latitude,
        commuterPositionsData.originPosition.longitude
    ]).addTo(pointsMap);
    marker.bindPopup("Pendlerkort udgangspunkt");

    updateCommutePositions("commute-public", selectedSeconds);

    const mapToggleLabel = document.querySelector(".map-active label");
    const mapToggleInput = document.querySelector(".map-active input");
    const scrollPageSpan = document.querySelector(
        ".map-active span.scroll-page"
    );
    const activeMapElement = document.querySelector(".map-active");
    const scrollMapSpan = document.querySelector(".map-active span.scroll-map");
    const pointsMapElement = document.querySelector("#points-map");

    helper.toggleMobileFunctionality({
        activeMapElement,
        pointsMapElement,
        scrollMapSpan,
        scrollPageSpan,
        pointsMap,
        mapToggleInput
    });

    const copenhagenIntervals = [1500000, 3000000, 4500000, 6000000];
    let isZoomLevelAboveThresholdPrev = false;
    pointsMap.on("zoom", a => {
        const newZoom = a.target._zoom;
        const isZoomLevelAboveThresholdCurrent = newZoom > 10;

        if (
            isZoomLevelAboveThresholdPrev !== isZoomLevelAboveThresholdCurrent
        ) {
            if (isZoomLevelAboveThresholdCurrent) {
                houseSalesStyle.setContent(
                    helper.getHouseSalesStyling(0.3, copenhagenIntervals)
                );
            } else {
                houseSalesStyle.setContent(
                    helper.getHouseSalesStyling(0.74, copenhagenIntervals)
                );
            }
        }

        isZoomLevelAboveThresholdPrev = isZoomLevelAboveThresholdCurrent;
    });
}
