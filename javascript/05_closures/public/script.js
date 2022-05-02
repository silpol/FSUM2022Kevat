window.onload = function() {
<<<<<<< HEAD
    let fontSizer = changeFont();
    let bigbutton = document.getElementById("bigger");
    bigbutton.onclick = fontSizer.bigger;
    let smallbutton = document.getElementById("smaller");
    smallbutton.onclick = fontSizer.smaller;
}

let changeFont = function() {
    let fontSize = 16;
    document.body.style.fontSize = fontSize + "px";

    function changeFontSize(val) {
    fontSize += val;
    document.body.style.fontSize = fontSize + "px";
    }
    return{
        bigger:function() {
            console.log("bigger font");
            changeFontSize(2);
        },
        smaller:function() {
            console.log("smaller font");
            changeFontSize(-2);
        }
    }
}

let makeCounter = function() {
    let privateCounter = 0;

    function changeByVal(val) {
        privateCounter += val;
    }

    return {
        increment:function() {
            changeByVal(1);
        },
        decrement:function() {
            changeByVal(-1);
        },
        value:function() {
            return privateCounter;
        }
    }
}

function start() {
    let counter1 = makeCounter();
    let counter2 = makeCounter();

    counter1.increment();
    counter1.increment();
    console.log("Counter 1", counter1.value());

    counter1.decrement();
    console.log("Counter 1", counter1.value());
    console.log("Counter 2", counter2.value());
=======
	let fontSizer = changeFont();
	let bigbutton = document.getElementById("bigger");
	bigbutton.onclick = fontSizer.bigger;
	let smallbutton = document.getElementById("smaller");
	smallbutton.onclick = fontSizer.smaller;
}

let changeFont = function() {
	let fontSize = 16;
	document.body.style.fontSize = fontSize + "px";
	
	function changeFontSize(val) {
		fontSize += val;
		document.body.style.fontSize = fontSize + "px";
	}
	return {
		bigger:function() {
			console.log("bigger font");
			changeFontSize(2);
		},
		smaller:function() {
			console.log("smaller font");
			changeFontSize(-2);
		}
	}
}

let makeCounter = function() {
	let privateCounter = 0;
	
	function changeByVal(val) {
		privateCounter += val;
	}
	return {
		increment:function(){
			changeByVal(1);
		},
		decrement:function() {
			changeByVal(-1);
		},
		value:function() {
			return privateCounter;
		}
	}
}

function start() {
	let counter1 = makeCounter();
	let counter2 = makeCounter();
	
	counter1.increment();
	counter1.increment();
	console.log("Counter 1",counter1.value());
	
	counter1.decrement();
	console.log("Counter 1",counter1.value());
	console.log("Counter 2",counter2.value());
>>>>>>> 47b64bc14d5fa6b3b2557540a68e287c06530541
}