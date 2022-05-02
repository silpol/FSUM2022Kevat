<<<<<<< HEAD
function changeColor()	{
    let header = document.getElementById("header");
    let color = "#";
    const letters = "0123456789ABCDEF";
    for(let i=0;i<6;i++){
	let temp = Math.floor(Math.random()*16);
	color = color + letters[temp];
    }
    header.style.color = color;
    console.log(color);
}

function toggleBox()	{
    let domButton = document.getElementById("dombutton");
    let anchor = document.getElementById("anchor");
    if  (domButton.value === "Show")	{
	    domButton.value = "Hide";
   	    let box = document.createElement("div");
   	    box.style.height = "200px";
        box.style.width = "200px";
        box.style.backgroundColor = "red";
        box.setAttribute("id","redbox");
        anchor.appendChild(box);
    }   else	{
	    domButton.value = "Show";
	    let redbox = document.getElementById("redbox");
	    if(redbox) {
	        anchor.removeChild(redbox);
	    }
    }
=======
function changeColor() {
	let header = document.getElementById("header");
	let color = "#";
	const letters = "ABCDEF0123456789";
	for(let i=0;i<6;i++){
		let temp = Math.floor(Math.random()*16);
		color = color + letters[temp];
	}
	header.style.color = color;
	console.log(color);
}

function toggleBox() {
	let domButton = document.getElementById("dombutton");
	let anchor = document.getElementById("anchor");
	if(domButton.value === "Show") {
		domButton.value = "Hide";
		let box = document.createElement("div");
		box.style.height = "200px";
		box.style.width = "200px";
		box.style.backgroundColor = "red";
		box.setAttribute("id","redbox");
		anchor.appendChild(box);
	} else {
		domButton.value = "Show";
		let redbox = document.getElementById("redbox");
		if(redbox) {
			anchor.removeChild(redbox);
		}
	}
>>>>>>> 47b64bc14d5fa6b3b2557540a68e287c06530541
}