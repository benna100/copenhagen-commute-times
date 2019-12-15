import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";

export default function() {
    const pointsMap = window.L.map("points-map").setView([55.7, 12.5], 9);
    pointsMap.scrollWheelZoom.disable();

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
        "SELECT * FROM random_points_driving_copenhagen_diff"
    );

    const aarhusSource = new window.carto.source.SQL(
        "SELECT * FROM random_points_driving_copenhagen_diff"
    );

    const hexagonSizes = 15;
    const houseSalesSource = new window.carto.source.SQL(`
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
          FROM hgrid, (SELECT * FROM house_sales_with_combined_scoring) i
          WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell) AND priceAndCommuteScoring != 0
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

    const mapToggleLabel = document.querySelector(".map-active label");
    const mapToggleInput = document.querySelector(".map-active input");
    const scrollPageSpan = document.querySelector(
        ".map-active span.scroll-page"
    );

    function setCheckbox(setChecked) {
        mapToggleInput.checked = setChecked;
    }

    pointsMap.on("zoom", () => {
        setMapActiveOrNot(true);
    });

    function setMapActiveOrNot(activeOrNot) {
        if (activeOrNot) {
            scrollMapSpan.classList.add("active");
            pointsMapElement.style.pointerEvents = "auto";
            setCheckbox(true);
        } else {
            scrollPageSpan.classList.add("active");
            pointsMapElement.style.pointerEvents = "none";
            setCheckbox(false);
        }
    }

    const scrollMapSpan = document.querySelector(".map-active span.scroll-map");
    const pointsMapElement = document.querySelector("#points-map");
    document
        .querySelector(".points-map-container")
        .addEventListener("touchmove", handleMove, false);
    function handleMove(evt) {
        var touches = evt.changedTouches;
        if (touches.length > 1) {
            setMapActiveOrNot(true);
        }
    }
    pointsMapElement.style.pointerEvents = "none";
    mapToggleInput.addEventListener("change", () => {
        scrollPageSpan.classList.remove("active");
        scrollMapSpan.classList.remove("active");
        const scrollMap = mapToggleInput.checked;

        setMapActiveOrNot(scrollMap);
    });

    const slider = document.querySelector(".points-map .slider");

    noUiSlider.create(slider, {
        start: 3300,
        connect: [true, false],
        range: {
            min: 0,
            max: 8000
        }
    });

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
    const aarhusStyle = new window.carto.style.CartoCSS(`
    #layer {
      marker-width: 7;
      marker-fill-opacity: 0.5;
      marker-allow-overlap: true;
      marker-line-width: 0;
      marker-fill: rgb(51, 128, 158);
    }
    
    #layer {
      [durationinseconds > 0] {
        marker-fill: #d0d1e6;
      }
      [durationinseconds > 1200] {
        marker-fill: #a6bddb;
      }
      [durationinseconds > 2400] {
        marker-fill: #74a9cf;
      }
      [durationinseconds > 3600] {
        marker-fill: #2b8cbe;
      }
      [durationinseconds > 4800] {
        marker-fill: #045a8d;
      }
    }
  `);
    const aarhusLayer = new window.carto.layer.Layer(aarhusSource, aarhusStyle);
    aarhusLayer.hide();

    toggleButtons([...selectCityButtons], key => {
        if (key === "copenhagen") {
            pointsMap.flyTo([55.672554, 12.566271]);
            aarhusLayer.hide();
            layer.show();
        }
        if (key === "aarhus") {
            pointsMap.flyTo([56.150705, 10.204396]);
            aarhusLayer.show();
            layer.hide();
        }
    });

    let selectedSeconds;
    slider.noUiSlider.on("update", function([selectedSecondsSlider]) {
        selectedSeconds = selectedSecondsSlider;
        commuteTimeSpan.innerHTML = secondsToHms(selectedSeconds);

        const columnToFilter = transportationButtons[0].className.includes(
            "active"
        )
            ? "durationinseconds"
            : "commute_driving";

        source.setQuery(`
          SELECT *
            FROM random_points_driving_copenhagen_diff
            WHERE ${columnToFilter} <= ${selectedSeconds}
        `);
    });

    function toggleButtons(buttonElements, onButtonClick) {
        buttonElements.forEach(buttonElement => {
            buttonElement.addEventListener("click", buttonElementEvent => {
                resetActiveButtons(buttonElements);

                const target = buttonElementEvent.target;
                target.classList.add("active");

                const key = target.getAttribute("data-key");
                onButtonClick(key);
            });
        });
    }

    function resetActiveButtons(buttonElements) {
        buttonElements.forEach(buttonElement => {
            buttonElement.classList.remove("active");
        });
    }

    toggleButtons([...transportationButtons], key => {
        if (key === "driving") {
            source.setQuery(`
                      SELECT *
                        FROM random_points_driving_copenhagen_diff
                        WHERE commute_driving <= ${selectedSeconds}
                    `);

            style.setContent(`
      #layer {
        marker-width: 7;
        marker-fill-opacity: 0.5;
        marker-allow-overlap: true;
        marker-line-width: 0;
        marker-fill: rgb(51, 128, 158);
      }
      
      #layer {
        [commute_driving = null] {
          marker-width: 0;
        }
        [commute_driving > 0] {
          marker-fill: #d0d1e6;
        }
        [commute_driving > 1200] {
          marker-fill: #a6bddb;
        }
        [commute_driving > 2400] {
          marker-fill: #74a9cf;
        }
        [commute_driving > 3600] {
          marker-fill: #2b8cbe;
        }
        [commute_driving > 4800] {
          marker-fill: #045a8d;
        }
      }
    `);
        }

        if (key === "public") {
            source.setQuery(`
          SELECT *
            FROM random_points_driving_copenhagen_diff
            WHERE durationinseconds <= ${selectedSeconds}
        `);

            style.setContent(`
                    #layer {
                      marker-width: 7;
                      marker-fill-opacity: 0.5;
                      marker-allow-overlap: true;
                      marker-line-width: 0;
                      marker-fill: rgb(51, 128, 158);
                    }
                    
                    #layer {
                      [durationinseconds > 0] {
                        marker-fill: #d0d1e6;
                      }
                      [durationinseconds > 1200] {
                        marker-fill: #a6bddb;
                      }
                      [durationinseconds > 2400] {
                        marker-fill: #74a9cf;
                      }
                      [durationinseconds > 3600] {
                        marker-fill: #2b8cbe;
                      }
                      [durationinseconds > 4800] {
                        marker-fill: #045a8d;
                      }
                    }
                  `);
        }
    });

    const style = new window.carto.style.CartoCSS(`
      #layer {
        marker-width: 7;
        marker-fill-opacity: 0.5;
        marker-allow-overlap: true;
        marker-line-width: 0;
        marker-fill: rgb(51, 128, 158);
      }
      
      #layer {
        [durationinseconds > 0] {
          marker-fill: #d0d1e6;
        }
        [durationinseconds > 1200] {
          marker-fill: #a6bddb;
        }
        [durationinseconds > 2400] {
          marker-fill: #74a9cf;
        }
        [durationinseconds > 3600] {
          marker-fill: #2b8cbe;
        }
        [durationinseconds > 4800] {
          marker-fill: #045a8d;
        }
      }
    `);

    const layer = new window.carto.layer.Layer(source, style);
    const houseSalesLayer = new window.carto.layer.Layer(
        houseSalesSource,
        houseSalesStyle
    );

    houseSalesLayer.hide();

    toggleButtons([...houseSalesToggleButtons], key => {
        if (key === "off") {
            houseSalesLayer.hide();
        }

        if (key === "on") {
            houseSalesLayer.show();
        }
    });

    client.addLayers([houseSalesLayer, layer, aarhusLayer]);
    client.getLeafletLayer().addTo(pointsMap);
}
