const express = require("express");

let app = express();

let database = [];
let id = 100;

app.use(express.json());

app.get("/api/contact", function(req,res) {
    return res.status(200).json(database);
})

app.post("/api/contact", function(req, res){
    let contact = {
        id:id,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone
    }
    id++
    database.push(contact);
    return res.status(201).json(contact);
})

app.listen(3000);

console.log("Running in port 3000");