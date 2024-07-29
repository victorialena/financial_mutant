const DEFAULT_OVERLAY_TEXT = "[you should never see this]";

var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      // close all collapsible
      // var col_content = document.getElementsByClassName("content");
      // for (var j = 0; j < col_content.length; j++) {
      //   col_content[j].style.maxHeight = null;
      // }

      // open this one
      content.style.maxHeight =  content.scrollHeight + "100px"; // "100%"
    }
  });
}

export function overlayOn(text_msg) {
  document.getElementById("overlaytext").textContent = text_msg;
  document.getElementById("overlay").style.display = "block";
  document.querySelector("#killPopup").addEventListener("click", overlayOff);
}

export function overlayOff() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("overlaytext").textContent = DEFAULT_OVERLAY_TEXT;
}