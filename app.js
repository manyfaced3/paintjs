const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraseBtn = document.getElementById("jsErase");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

function init(){
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.strokeStyle = INITIAL_COLOR;
  ctx.fillStyle = INITIAL_COLOR;
  ctx.lineWidth = 2.5;
}

init();

let painting = false;
let filling = false;

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}
function canvasClick() {
  if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function changeColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function changeRange(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function changeMode() {
  if (filling) {
    filling = false;
    modeBtn.innerText = "Fill";
  } else {
    filling = true;
    modeBtn.innerText = "Paint";
  }
}

function saveBtnF(){
  const img = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = img;
  link.download = "PaintJS[🎨]";
  link.click();
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", canvasClick);
  canvas.addEventListener("contextmenu",function(e){
    e.preventDefault();
  });
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", changeRange);
}

if (modeBtn) {
  modeBtn.addEventListener("click", changeMode);
}

if(saveBtn){
  saveBtn.addEventListener("click", saveBtnF);
}

if(eraseBtn){
  eraseBtn.addEventListener("click",init);
}