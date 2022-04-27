window.onload = function() {
	createForm();
	getContactList();
}

var mode = 0;

createForm = () => {
	let anchor = document.getElementById("anchor");
	let form = document.createElement("form");
	form.setAttribute("id","form");
	
	//first name input
	let firstnameinput = document.createElement("input");
	firstnameinput.setAttribute("type","text");
	firstnameinput.setAttribute("name","firstnameinput");
	firstnameinput.setAttribute("id","firstnameinput");
	let firstnamelabel = document.createElement("label");
	firstnamelabel.setAttribute("id","firstnamelabel");
	firstnamelabel.setAttribute("for","firstnameinput");
	let firstnametext = document.createTextNode("First name");
	firstnamelabel.appendChild(firstnametext);
	
	//last name input
	let lastnameinput = document.createElement("input");
	lastnameinput.setAttribute("type","text");
	lastnameinput.setAttribute("name","lastnameinput");
	lastnameinput.setAttribute("id","lastnameinput");
	let lastnamelabel = document.createElement("label");
	lastnamelabel.setAttribute("id","lastnamelabel");
	lastnamelabel.setAttribute("for","lastnameinput");
	let lastnametext = document.createTextNode("Last name");
	lastnamelabel.appendChild(lastnametext);

	//email input
	let emailinput = document.createElement("input");
	emailinput.setAttribute("type","email");
	emailinput.setAttribute("name","emailinput");
	emailinput.setAttribute("id","emailinput");
	let emaillabel = document.createElement("label");
	emaillabel.setAttribute("id","emaillabel");
	emaillabel.setAttribute("for","emailinput");
	let emailtext = document.createTextNode("Email");
	emaillabel.appendChild(emailtext);
	
	//phone input
	let phoneinput = document.createElement("input");
	phoneinput.setAttribute("type","tel");
	phoneinput.setAttribute("name","phoneinput");
	phoneinput.setAttribute("id","phoneinput");
	let phonelabel = document.createElement("label");
	phonelabel.setAttribute("id","phonelabel");
	phonelabel.setAttribute("for","phoneinput");
	let phonetext = document.createTextNode("Phone");
	phonelabel.appendChild(phonetext);
	
	//submit Button
	let submitbutton = document.createElement("input");
	submitbutton.setAttribute("type","submit");
	submitbutton.setAttribute("value","Add");
	submitbutton.setAttribute("id","submitbutton");
	
	//Append to form
	let br = document.createElement("br");
	form.appendChild(firstnamelabel);
	form.appendChild(firstnameinput);
	form.appendChild(br);
	form.appendChild(lastnamelabel);
	form.appendChild(lastnameinput);
	form.appendChild(br.cloneNode());
	form.appendChild(emaillabel);
	form.appendChild(emailinput);
	form.appendChild(br.cloneNode());
	form.appendChild(phonelabel);
	form.appendChild(phoneinput);
	form.appendChild(br.cloneNode());
	form.appendChild(submitbutton);
	form.addEventListener("submit",function(event) {
		event.preventDefault();
		addToList();
	})
	anchor.appendChild(form);
}

addToList = async () => {
	let firstname = document.getElementById("firstnameinput");
	let lastname = document.getElementById("lastnameinput");
	let email = document.getElementById("emailinput");
	let phone = document.getElementById("phoneinput");
	let contact = {
		"firstname":firstname.value,
		"lastname":lastname.value,
		"email":email.value,
		"phone":phone.value
	}
	let method = "POST";
	let url = "/api/contact";
	if(mode) {
		method = "PUT";
		url = "/api/contact/"+mode
	}
	let request = {
		method:method,
		mode:"cors",
		headers:{"Content-type":"application/json"},
		body:JSON.stringify(contact)
	}
	let response = await fetch(url,request);
	if(response.ok) {
		firstname.value = "";
		lastname.value = "";
		email.value = "";
		phone.value = "";
		if(mode) {
			mode = 0;
			let submitbutton = document.getElementById("submitbutton");
			submitbutton.value = "Add";
		}
		getContactList();
	} else {
		console.log("Server responded with a status:",response.status);
	}
}

getContactList = async () => {
	let request = {
		method:"GET",
		mode:"cors",
		headers:{"Content-type":"application/json"}
	}
	let response = await fetch("/api/contact",request);
	if(response.ok) {
		let data = await response.json();
		populateTable(data);
	} else {
		console.log("Failed to load contacts. Server responded with a status:",response.status);
	}
}

removeFromList = async (id) => {
	let request = {
		method:"DELETE",
		mode:"cors",
		headers:{"Content-type":"application/json"}
	}
	let response = await fetch("/api/contact/"+id,request);
	if(response.ok) {
		getContactList();
	} else {
		console.log("Failed to remove id "+id+". Server responded with a status:",response.status);
	}
}

changeToEditMode = (contact) => {
	mode = contact.id;
	let firstname = document.getElementById("firstnameinput");
	let lastname = document.getElementById("lastnameinput");
	let email = document.getElementById("emailinput");
	let phone = document.getElementById("phoneinput");
	let submitbutton = document.getElementById("submitbutton");
	firstname.value = contact.firstname;
	lastname.value = contact.lastname;
	email.value = contact.email;
	phone.value = contact.phone;
	submitbutton.value = "Save";
}
populateTable = (data) => {
	let anchor = document.getElementById("anchor");
	let oldTable = document.getElementById("table");
	if(oldTable) {
		anchor.removeChild(oldTable);
	}
	let table = document.createElement("table");
	
	//Table header
	let header =  document.createElement("thead");
	let headerRow = document.createElement("tr");
	
	let firstnameheader = document.createElement("th");
	let firstnametext = document.createTextNode("First Name");
	firstnameheader.appendChild(firstnametext);
	
	let lastnameheader = document.createElement("th");
	let lastnametext = document.createTextNode("Last Name");
	lastnameheader.appendChild(lastnametext);

	let emailheader = document.createElement("th");
	let emailtext = document.createTextNode("Email");
	emailheader.appendChild(emailtext);

	let phoneheader = document.createElement("th");
	let phonetext = document.createTextNode("Phone");
	phoneheader.appendChild(phonetext);
	
	let removeheader = document.createElement("th");
	let removetext = document.createTextNode("Remove");
	removeheader.appendChild(removetext);	

	let editheader = document.createElement("th");
	let edittext = document.createTextNode("Edit");
	editheader.appendChild(edittext);

	headerRow.appendChild(firstnameheader);
	headerRow.appendChild(lastnameheader);
	headerRow.appendChild(emailheader);
	headerRow.appendChild(phoneheader);
	headerRow.appendChild(removeheader);
	headerRow.appendChild(editheader);
	header.appendChild(headerRow);
	table.appendChild(header);
	
	//table body
	
	let tablebody = document.createElement("tbody");
	for(let i=0;i<data.length;i++) {
		let tableRow = document.createElement("tr");
		for (x in data[i]) {
			if(x === "id") {
				continue;
			}
			let column = document.createElement("td");
			let info = document.createTextNode(data[i][x]);
			column.appendChild(info);
			tableRow.appendChild(column);
		}
		let removeColumn = document.createElement("td");
		let removeButton = document.createElement("input");
		removeButton.setAttribute("type","button");
		removeButton.setAttribute("value","Remove");
		removeButton.setAttribute("name",data[i].id);
		removeButton.addEventListener("click",function(event) {
			removeFromList(event.target.name);
		})
		removeColumn.appendChild(removeButton);
		
		let editColumn = document.createElement("td");
		let editButton = document.createElement("input");
		editButton.setAttribute("type","button");
		editButton.setAttribute("value","Edit");
		editButton.addEventListener("click",function(event) {
			changeToEditMode(data[i]);
		})
		editColumn.appendChild(editButton);
		tableRow.appendChild(removeColumn);
		tableRow.appendChild(editColumn);
		tablebody.appendChild(tableRow)
	}
	table.appendChild(tablebody);
	table.setAttribute("id","table");
	anchor.appendChild(table);
}