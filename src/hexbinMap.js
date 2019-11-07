export default function() {
    const client = new window.carto.Client({
        apiKey: "okNxK8jzzM39Lpj-7ZHYcw",
        username: "benna100"
    });

    const map = window.L.map("hexbin-map").setView([55.8, 12.5], 8);
    map.scrollWheelZoom.disable();

    const source = new window.carto.source.SQL(`
          -- Create hexagon grid
          WITH hgrid AS (
              SELECT CDB_HexagonGrid(
                  ST_Expand(!bbox!, CDB_XYZ_Resolution(9) * 8),
                  CDB_XYZ_Resolution(9) * 8) as cell
              )

          -- select the data from the "virtual table" hgrid, which has been created
          -- using the "WITH" statement of PostgreSQL,
          -- that intesects with the dataset of points "stormevents_locations_2014"

          SELECT  hgrid.cell as the_geom_webmercator,
                  avg(durationinseconds) as agg_value,
                  row_number() over () as cartodb_id
          FROM hgrid, (SELECT * FROM distances) i
          WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell)
          GROUP BY hgrid.cell
        `);

    // define styles of layer. We will style the color of the geometry based on the value
    // of the column "agg_value" of the SQL query.
    const style = new window.carto.style.CartoCSS(`
          #layer {
            polygon-opacity: 0.74;

            [agg_value > 0] {
              polygon-fill: #ecda9a;
            }
            [agg_value > 1200] {
              polygon-fill: #efc47e;
            }
            [agg_value > 2400] {
              polygon-fill: #f3ad6a;
            }
            [agg_value > 3600] {
              polygon-fill: #f7945d;
            }
            [agg_value > 4800] {
              polygon-fill: #f97b57;
            }
            [agg_value > 6000] {
              polygon-fill: #f66356;
            }
            [agg_value > 7200] {
              polygon-fill: #ee4d5a;
            }
          }

        `);

    const layer = new window.carto.layer.Layer(source, style);
    window.L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        {
            maxZoom: 18
        }
    ).addTo(map);
    layer.on("featureClick", featureEvent => {
        console.log(featureEvent);
    });

    client.addLayer(layer);
    client.getLeafletLayer().addTo(map);
}
