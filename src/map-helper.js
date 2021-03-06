import helper from "./helper.js";

function toggleMobileFunctionality({
    activateMapElement,
    mapElement,
    scrollMapSpan,
    scrollPageSpan,
    map,
    mapToggleInput
}) {
    function setCheckbox(setChecked) {
        mapToggleInput.checked = setChecked;
    }

    if (helper.isTouchEnabled()) {
        activateMapElement.classList.remove("hidden");

        [
            ...document.querySelectorAll(".leaflet-control-zoom a")
        ].forEach(zoomButton =>
            zoomButton.addEventListener("click", () => setMapActiveOrNot(true))
        );

        let tapedTwice = false;
        function tapHandler(event) {
            if (!tapedTwice) {
                tapedTwice = true;
                setTimeout(function() {
                    tapedTwice = false;
                }, 300);
                return false;
            }

            //action on double tap goes below
            setMapActiveOrNot(true);
        }
        mapElement.addEventListener("touchstart", tapHandler);

        function setMapActiveOrNot(activeOrNot) {
            if (activeOrNot) {
                scrollMapSpan.classList.add("active");
                map.dragging.enable();
                setCheckbox(true);
            } else {
                scrollPageSpan.classList.add("active");
                map.dragging.disable();
                setCheckbox(false);
            }
        }

        document
            .querySelector(".map-container")
            .addEventListener("touchmove", handleMove, false);
        function handleMove(evt) {
            var touches = evt.changedTouches;
            if (touches.length > 1) {
                setMapActiveOrNot(true);
            }
        }
        map.dragging.disable();
        mapToggleInput.addEventListener("change", () => {
            scrollPageSpan.classList.remove("active");
            scrollMapSpan.classList.remove("active");
            const scrollMap = mapToggleInput.checked;

            setMapActiveOrNot(scrollMap);
        });
    }
}

function getHouseSalesStyling(opacity, intervals) {
    return `
    #layer {
      polygon-opacity: ${opacity};

      [agg_value > 0] {
        polygon-fill: #fcbba1;
      }
      [agg_value > ${intervals[0]}] {
        polygon-fill: #fc9272;
      }
      [agg_value > ${intervals[1]}] {
        polygon-fill: #fb6a4a;
      }
      [agg_value > ${intervals[2]}] {
        polygon-fill: #de2d26;
      }
      [agg_value > ${intervals[3]}] {
        polygon-fill: #a50f15;
      }
    }
        `;
}

function getClient() {
    return new window.carto.Client({
        apiKey: "okNxK8jzzM39Lpj-7ZHYcw",
        username: "benna100"
    });
}

function getHouseSalesSourceDenmark() {
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

    return houseSalesSourceDenmark;
}

function initialiseAllMapFunctionality({
    originPosition,
    mapContainer,
    houseSalesStyle
}) {
    const mapElement = mapContainer.querySelector("#map");

    const map = window.L.map(mapElement).setView(
        [originPosition.latitude, originPosition.longitude],
        9
    );
    map.scrollWheelZoom.disable();

    let cartoLayer = window.L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        {
            maxZoom: 18,
            zIndex: -1
        }
    );

    let detailedLayer = window.L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            zIndex: -1
        }
    );

    detailedLayer.addTo(map);
    cartoLayer.addTo(map);

    let isZoomLevelAboveThresholdPrev = false;

    map.on("zoom", a => {
        const newZoom = a.target._zoom;
        const isZoomLevelAboveThresholdCurrent = newZoom > 10;
        if (
            isZoomLevelAboveThresholdPrev !== isZoomLevelAboveThresholdCurrent
        ) {
            if (isZoomLevelAboveThresholdCurrent) {
                houseSalesStyle.setContent(
                    getHouseSalesStyling(0.3, window.currentPriceIntervals)
                );

                map.removeLayer(cartoLayer);
                map.addLayer(detailedLayer);
            } else {
                map.removeLayer(detailedLayer);
                map.addLayer(cartoLayer);

                houseSalesStyle.setContent(
                    getHouseSalesStyling(0.74, window.currentPriceIntervals)
                );
            }
        }

        isZoomLevelAboveThresholdPrev = isZoomLevelAboveThresholdCurrent;
    });

    const activateMapElement = mapContainer.querySelector(".map-activate");
    const scrollMapSpan = mapContainer.querySelector(
        ".map-activate span.scroll-map"
    );
    const scrollPageSpan = mapContainer.querySelector(
        ".map-activate span.scroll-page"
    );
    const mapToggleInput = mapContainer.querySelector(".map-activate input");

    toggleMobileFunctionality({
        activateMapElement,
        mapElement,
        scrollMapSpan,
        scrollPageSpan,
        map,
        mapToggleInput
    });

    return map;
}

function getDistanceFromLatLonInKm(positionFrom, positionTo) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(positionTo.latitude - positionFrom.latitude); // deg2rad below
    var dLon = deg2rad(positionTo.longitude - positionFrom.longitude);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(positionFrom.latitude)) *
            Math.cos(deg2rad(positionTo.latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function getPriceIntervalFromOrigin(origin) {
    let priceInterval = [500000, 1000000, 1500000, 2000000];

    const copenhagenPriceIntervals = [1500000, 3000000, 4500000, 6000000];
    const aarhusPriceIntervals = [700000, 1400000, 2100000, 2800000];

    const copenhagenCenter = {
        latitude: 55.683332,
        longitude: 12.57166
    };

    const aarhusCenter = {
        latitude: 56.150669,
        longitude: 10.20451
    };

    const distToCopenhagen = getDistanceFromLatLonInKm(
        {
            latitude: origin.latitude,
            longitude: origin.longitude
        },
        copenhagenCenter
    );

    const distToAarhus = getDistanceFromLatLonInKm(
        {
            latitude: origin.latitude,
            longitude: origin.longitude
        },
        aarhusCenter
    );

    if (distToCopenhagen < 40) {
        priceInterval = copenhagenPriceIntervals;
    }

    if (distToAarhus < 20) {
        priceInterval = aarhusPriceIntervals;
    }

    return priceInterval;
}

function setPriceIntervals(commuterPositionsData) {
    window.currentPriceIntervals = getPriceIntervalFromOrigin({
        latitude: commuterPositionsData.originPosition.latitude,
        longitude: commuterPositionsData.originPosition.longitude
    });
    helper.updateHouseSalesLegendCountUp(
        [500000, 1000000, 1500000, 2000000],
        window.currentPriceIntervals
    );
}

export default {
    getHouseSalesStyling,
    initialiseAllMapFunctionality,
    getClient,
    getHouseSalesSourceDenmark,
    getDistanceFromLatLonInKm,
    setPriceIntervals,
    getPriceIntervalFromOrigin
};
