const express = require("express");

let app = express();

app.use(express.json());

// DATABASE

const database = [];
let id = 100;

// HELPERS

const port = process.env.port || 3001;

// REST API

app.get("/api/shopping", function(req,res) {

    return res.status(200).json(database);
});

app.post("/api/shopping", function(req,res) {
    if(!req.body) {
        return res.status(400).json({message:"Bad request"});
    }
    if(!req.body.type) {
        return res.status(400).json({message:"Bad request"});
    }
    let item = {
        type:req.body.type,
        count:req.body.count,
        price:req.body.price,
        id:id
    }
    id++;
    database.push(item);
    return res.status(201).json(item);
})

app.listen(port);

console.log("Running on port ", port);