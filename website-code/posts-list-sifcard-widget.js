let mask = document.getElementById("col-mask");
let imgBox = document.createElement("div");
imgBox.style = imgBox.style + ";width:50%;position:fixed;bottom:-18px;z-index:-100;right:-150px;";
mask.appendChild(imgBox);
let imgDom = document.createElement("img");
imgBox.appendChild(imgDom);
imgDom.src = "http://qiniu.xiakai.online/动漫图片/LoveLive!/立绘/"+ (Math.floor(Math.random()*3125) + 1) +".png";
imgDom.style.width = "100%";