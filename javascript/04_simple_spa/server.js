const express = require("express");

let app = express();

let database = [];
let id = 100;

app.use(express.static("public"));

app.use(express.json());

app.get("/api/contact",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/contact",function(req,res) {
	let contact = {
		id:id,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		email:req.body.email,
		phone:req.body.phone
	}
	id++;
	database.push(contact);
	return res.status(201).json(contact);
})

app.delete("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let tempDatabase = database.filter(contact => contact.id !== tempId)
	database = tempDatabase;
	return res.status(200).json({message:"success!"});
})

app.put("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			let contact = {
				id:tempId,
				firstname:req.body.firstname,
				lastname:req.body.lastname,
				email:req.body.email,
				phone:req.body.phone
			}
			database.splice(i,1,contact);
			return res.status(200).json({message:"success!"});
		}
	}
	return res.status(404).json({message:"not found!"});
})

app.listen(3000);

console.log("Running in port 3000");