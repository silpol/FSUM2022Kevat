var canvas;
var ctx;
var running = 0;
var interval;

window.onload = function() {
<<<<<<< HEAD
    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");
}

function startCanvas() {
    let startbutton = document.getElementById("startbutton");
    if(running) {
        running = 0;
        startbutton.innerHTML = "Start";
        clearInterval(interval);
    } else {
        running = 1;
        startbutton.innerHTML = "Stop";
        interval = setInterval(createRect,200);
    }
}

function createRect() {
    let x = 0;
    let y = 0;
    let side = 0;
    let color = "#";
    const colorpicker = "0123456789ABCDEF";
    x = Math.floor(Math.random()*400);
    y = Math.floor(Math.random()*400);
    side = Math.floor(Math.random()*80)+20;
    for(let i=0;i<6;i++) {
        let temp = Math.floor(Math.random()*16);
        color = color + colorpicker[temp];
    }
    ctx.fillStyle = color;
    ctx.fillRect(x,y,side,side);
=======
	canvas = document.getElementById("mycanvas");
	ctx = canvas.getContext("2d");
}

function startCanvas() {
	let startbutton = document.getElementById("startbutton")
	if(running) {
		running = 0;
		startbutton.innerHTML = "Start";
		clearInterval(interval);
	} else {
		running = 1;
		startbutton.innerHTML = "Stop";
		interval = setInterval(createRect,200);
	}
}

function createRect() {
	let x = 0;
	let y = 0;
	let side = 0;
	let color = "#";
	const colorpicker = "0123456789ABCDEF";
	x = Math.floor(Math.random()*400);
	y = Math.floor(Math.random()*400);
	side = Math.floor(Math.random()*80)+20;
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + colorpicker[temp];
	}
	ctx.fillStyle = color;
	ctx.fillRect(x,y,side,side);
}

function clearCanvas() {
	ctx.clearRect(0,0,500,500);
>>>>>>> 47b64bc14d5fa6b3b2557540a68e287c06530541
}