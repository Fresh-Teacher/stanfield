var fwsBannerDate = new Date();
var fwsBannerId = g_fws_sk + "-" + fwsBannerDate.getFullYear() + "-" + (fwsBannerDate.getMonth() + 1) + "-" + fwsBannerDate.getDate();
console.log(fwsBannerId);

if (document.readyState != 'loading') {
    checkFwsBanner();
} else {
    document.addEventListener('DOMContentLoaded', checkFwsBanner);
}

function checkFwsBanner() {
    if (localStorage.fwsPowerBarId != fwsBannerId) {
        fwsShowBanner();
    } else {
        var fwsBannerIdDate = fwsBannerId.split("-");
        if (fwsBannerDate.getFullYear() != fwsBannerIdDate[1] || (fwsBannerDate.getMonth() + 1) != fwsBannerIdDate[2] || fwsBannerDate.getDate() != fwsBannerIdDate[3]) {
            fwsShowBanner();
        }
    }
}

function fwsShowBanner() {
    /*var fwsBannerColorArray = ["blue", "bluegradient", "bluepinkgradient", "pink", "pinkgradient"];
    var fwsBannerColorSelected = fwsBannerColorArray[Math.floor(Math.random()*fwsBannerColorArray.length)];*/
    var fwsBannerColorSelected = "pink";
    document.getElementById("fws-info-bar-container").setAttribute("data-color", fwsBannerColorSelected);
    document.getElementById("fws-info-button").setAttribute("data-color", fwsBannerColorSelected);
    document.getElementById("fws-info-bar-container").classList.remove("fws-info-bar-hidden");
    document.getElementById("fws-info-button").classList.remove("fws-info-button-hidden");
}

function fwsHideButton() {
    document.getElementById("fws-info-button").classList.add("fws-info-button-hidden");
    localStorage.fwsPowerBarId = fwsBannerId;
}

function fwsInfoOverlayToggle() {
    document.getElementById("fws-info-bar-overlay").classList.remove("fws-info-bar-overlay-active");
    document.getElementById("fws-info-button").classList.remove("fws-info-button-active");
    document.getElementById("fws-info-bar-container").classList.remove("fws-info-bar-active");
    document.getElementById("fws-info-bar1-inner-item-readmore").classList.remove("fws-info-bar1-inner-item-readmore-active");
}

function fwsInfoToggle() {
    document.getElementById("fws-info-bar-overlay").classList.toggle("fws-info-bar-overlay-active");
    document.getElementById("fws-info-button").classList.toggle("fws-info-button-active");
    document.getElementById("fws-info-bar-container").classList.toggle("fws-info-bar-active");
    document.getElementById("fws-info-bar1-inner-item-readmore").classList.toggle("fws-info-bar1-inner-item-readmore-active");
}

function fwsHideBanner() {
    document.getElementById("fws-info-button").classList.add("fws-info-button-hidden");
    document.getElementById("fws-info-bar-container").classList.add("fws-info-bar-hidden");
    document.getElementById("fws-info-bar-overlay").classList.remove("fws-info-bar-overlay-active");
    localStorage.fwsPowerBarId = fwsBannerId;
}