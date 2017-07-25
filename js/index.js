var image = null;

var fileinput = document.getElementById("finput");
var grayBtn = document.getElementById("grayBtn");
var bigBtn = document.getElementById("bigBtn");
var smallBtn = document.getElementById("smallBtn");
var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d")
fileinput.addEventListener("change", upload);

grayBtn.addEventListener("click", makeGray);
bigBtn.addEventListener("click", makeBigger);
smallBtn.addEventListener("click", makeSmaller);

function upload(e) {
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
  }
  img.src = URL.createObjectURL(e.target.files[0]);
  
}

function makeGray(e) {
  //change all pixels of image to gray
  e.preventDefault();
  let imageData = ctx.getImageData(0,0,canvas.width, canvas.height)
  for(var i = 0; i < imageData.data.length; i+=4){
    var red = imageData.data[i];
    var green = imageData.data[i+1];
    var blue = imageData.data[i+2];
    var avg = (red+green+blue)/3;    
    imageData.data[i] = avg;
    imageData.data[i+1] = avg;
    imageData.data[i+2] = avg;

  }
  console.log(imageData);
  ctx.putImageData(imageData,0,0);
  
}

function changeCanvasSize(size){
  var width = parseInt(canvas.style.width.replace("px",""));
  var height = parseInt(canvas.style.height.replace("px",""));
  console.log(width,height);
  width += size;
  height += size/(width/height);
  width = Math.max(width,0);
  height = Math.max(height,0);
  if(width  == 0 || height == 0)
    return;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

function makeBigger(e) {
  //resize the image
  e.preventDefault();
  changeCanvasSize(100);
}
function makeSmaller(e) {
  e.preventDefault();
  changeCanvasSize(-100);
}