"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").onsubmit = e => e.preventDefault();

  const eIn = document.getElementById("in");
  const eOut = document.getElementById("out");

  eIn.addEventListener("keyup", standText);
  document.getElementById("copy").addEventListener("click", function(){
    eOut.select();
    eOut.setSelectionRange(0, eOut.value.length);
    document.execCommand("copy");
  });

  function standText(){
    const textIn = eIn.value;
    const textOut = [];
    for (let i = 0; i < textIn.length; i++){
      let n = textIn.charCodeAt(i);
      if (n >= 0x61 && n <= 0x7A){
        // lower case ascii
        textOut.push(0xFEC0 + n);
      } else if (n >= 0x21 && n <= 0x7F){
        // remainder of ascii
        textOut.push(0xFEE0 + n);
      } else {
        // not ascii, copy as-is
        textOut.push(n);
      }
    }
    // japanese quotation marks
    textOut.unshift(0xFF62);
    textOut.push(0xFF63);
    eOut.value = String.fromCharCode.apply(null, textOut);
  }

  const suggestions = [
    "Star Platinum",
    "Hermit Purple",
    "The World",
    "Crazy Diamond",
    "The Hand",
    "Killer Queen",
    "Gold Experience",
    "Sticky Fingers",
    "King Crimson",
    "Stone Free",
    "Made In Heaven",
    "Tusk",
    "Dirty Deeds Done Dirt Cheap",
    "Soft & Wet"
  ];
  eIn.value = suggestions[Math.floor(Math.random() * suggestions.length)];
  standText();

  eIn.select();
  eIn.setSelectionRange(0, eOut.value.length);
});
