let topList = [];
document.querySelectorAll("div.sticky").forEach(function (dom) {
    let aTitle = dom.querySelectorAll("h2.post-title.entry-title");
    if (aTitle.length !== 0) {
        let topSpan = document.createElement("span");
        topSpan.innerText = "TOP";
        topSpan.style.color = "red";
        topSpan.style.userSelect = "none";
        topList.push(topSpan);
        aTitle[0].insertBefore(topSpan, aTitle[0].firstChild);
    }
});
if (topList.length !== 0) {
    setInterval(function () {
        if (topList[0].style.opacity !== "0") {
            for (let i = 0; i < topList.length; i++) {
                topList[i].style.opacity = "0";
            }
        } else {
            for (let i = 0; i < topList.length; i++) {
                topList[i].style.opacity = "1";
            }
        }
    }, 250);
}