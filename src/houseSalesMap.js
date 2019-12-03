import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";

export default function() {
    const hexagonSizes = 15;
    const houseSalesMap = window.L.map("house-sales").setView([55.8, 12.5], 8);
    houseSalesMap.scrollWheelZoom.disable();

    window.L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        {
            maxZoom: 18
        }
    ).addTo(houseSalesMap);

    function secondsToHms(d) {
        d = Number(d);
        const h = Math.floor(d / 3600);
        const m = Math.floor((d % 3600) / 60);

        const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        const mDisplay = m > 0 ? m + (m === 1 ? " minute" : " minutes") : "";

        return hDisplay + mDisplay;
    }

    const client = new window.carto.Client({
        apiKey: "okNxK8jzzM39Lpj-7ZHYcw",
        username: "benna100"
    });

    const source = new window.carto.source.SQL(`
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

    const sliderDuration = document.querySelector(
        ".house-sales-map .slider.duration"
    );

    noUiSlider.create(sliderDuration, {
        start: 3300,
        connect: [true, false],
        range: {
            min: 0,
            max: 8000
        }
    });

    const commuteTimeSpan = document.querySelector(
        ".house-sales-map .slider-container.duration p span"
    );

    let selectedDuration = 3300;
    sliderDuration.noUiSlider.on("update", function([selectedDurationSlider]) {
        selectedDuration = selectedDurationSlider;
        commuteTimeSpan.innerHTML = secondsToHms(selectedDuration);

        source.setQuery(`
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
        WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell) AND duration <= ${selectedDuration} AND priceAndCommuteScoring != 0
        GROUP BY hgrid.cell

        `);
    });

    const style = new window.carto.style.CartoCSS(`
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

    const layer = new window.carto.layer.Layer(source, style);

    client.addLayer(layer);
    client.getLeafletLayer().addTo(houseSalesMap);
}
