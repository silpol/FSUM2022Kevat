const express = require("express");

let app = express();

app.use(express.json());

// DATABASE

const database = [];
let id = 100;

// HELPERS

const port = process.env.port || 3001;


app.listen(port);

console.log("Running on port ", port);