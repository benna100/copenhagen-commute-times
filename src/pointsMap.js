import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";

export default function() {
    const pointsMap = window.L.map("points-map").setView([55.8, 12.5], 8);
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

        const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        const mDisplay = m > 0 ? m + (m === 1 ? " minute" : " minutes") : "";

        return hDisplay + mDisplay;
    }

    const client = new window.carto.Client({
        apiKey: "1f1dc35961988be9137b98bd163fe8927f1b68bc",
        username: "benna100"
    });

    const source = new window.carto.source.SQL("SELECT * FROM distances");

    const slider = document.querySelector(".slider");

    noUiSlider.create(slider, {
        start: 3300,
        connect: [true, false],
        range: {
            min: 0,
            max: 8000
        }
    });

    const commuteTimeSpan = document.querySelector(".slider-container p span");

    slider.noUiSlider.on("update", function(values, handle) {
        commuteTimeSpan.innerHTML = secondsToHms(values[handle]);
        const selectedValue = values[0];

        source.setQuery(`
    SELECT *
      FROM distances
      WHERE durationinseconds <= ${selectedValue}
  `);
    });

    const style = new window.carto.style.CartoCSS(`
  #layer {
    marker-width: 7;
    marker-fill-opacity: 0.5;
    marker-allow-overlap: true;
    marker-line-width: 0;
  }
  
  #layer {
    [durationinseconds > 0] {
      marker-fill: #ecda9a;
    }
    [durationinseconds > 1200] {
      marker-fill: #efc47e;
    }
    [durationinseconds > 2400] {
      marker-fill: #f3ad6a;
    }
    [durationinseconds > 3600] {
      marker-fill: #f7945d;
    }
    [durationinseconds > 4800] {
      marker-fill: #f97b57;
    }
    [durationinseconds > 6000] {
      marker-fill: #f66356;
    }
    [durationinseconds > 7200] {
      marker-fill: #ee4d5a;
    }
  }
        `);

    const layer = new window.carto.layer.Layer(source, style);

    client.addLayer(layer);
    client.getLeafletLayer().addTo(pointsMap);
}
