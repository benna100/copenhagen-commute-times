import { CountUp } from "countup.js";

function isMobileDevice() {
    let check = false;
    (function(a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function isTouchEnabled() {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}

function _resetActiveButtons(buttonElements) {
    buttonElements.forEach(buttonElement => {
        buttonElement.classList.remove("active");
    });
}

function toggleButtons(buttonElements, onButtonClick) {
    buttonElements.forEach(buttonElement => {
        buttonElement.addEventListener("click", buttonElementEvent => {
            _resetActiveButtons(buttonElements);

            const target = buttonElementEvent.target;
            target.classList.add("active");

            const key = target.getAttribute("data-key");
            onButtonClick(key);
        });
    });
}

function getPointsStyling(columnName) {
    return `
    #layer {
      marker-width: 7;
      marker-fill-opacity: 0.5;
      marker-allow-overlap: true;
      marker-line-width: 0;
      marker-fill: rgb(51, 128, 158);
    }
    
    #layer {
      [${columnName} > 0] {
        marker-fill: #d0d1e6;
      }
      [${columnName} > 1200] {
        marker-fill: #a6bddb;
      }
      [${columnName} > 2400] {
        marker-fill: #74a9cf;
      }
      [${columnName} > 3600] {
        marker-fill: #2b8cbe;
      }
      [${columnName} > 4800] {
        marker-fill: #045a8d;
      }
    }
  `;
}

function secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);

    const hDisplay = h > 0 ? h + (h === 1 ? " time, " : " timer, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minut" : " minutter") : "";

    return hDisplay + mDisplay;
}

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

export default {
    isMobileDevice,
    isTouchEnabled,
    toggleButtons,
    getPointsStyling,
    secondsToHms,
    updateHouseSalesLegendCountUp
};
