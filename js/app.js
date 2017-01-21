// Problem: No user interaction causes no change to application
// Solution: When user interact cause changes appropriately

var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d"); // [0] selects first element in canvas array
var lastEvent; 


// WHEN CLICKING ON CONTROL LIST ITEMS
$(".controls").on("click", "li", function() {
  // DESELECT SIBLING ELEMENTS
  $(this).siblings().removeClass("selected");
  // SELECT CLICKED ELEMENT
  $(this).addClass("selected");
  // CACHE CURRENT COLOR HERE
  color = $(this).css("background-color");
});

// WHEN "NEW COLOR" IS PRESSED
$("#revealColorSelect").click(function() {
  // SHOW COLOR SELECT OR HIDE SELECT
  changeColor();
  $("#colorSelect").toggle();
});  
  
  // UPDATE THE NEW COLOR SPAN
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  
  $("#newColor").css("background-color", "rgb(" + r + ", " + g + ", " + b + ")");
}

// WHEN COLOR SLIDERS CHANGE
$("input[type=range]").change(changeColor);
                                     
// WHEN "ADD COLOR" IS PRESSED
$("#addNewColor").click(function() {
  // APPEND THE COLOR TO THE CONTROLS ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color",  $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  // SELECT NEW COLOR
  $newColor.click();
});

// ON MOUSE EVENTS ON THE CANVAS
$canvas.mousedown(function(e) {
  lastEvent = e;
  mousedown = true;
}).mousemove(function(e) {
    // DRAW LINES
    if(mousedown) {
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
}).mouseup(function(){
  mousedown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});
  





