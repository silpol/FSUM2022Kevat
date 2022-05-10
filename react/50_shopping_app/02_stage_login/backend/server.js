const express = require("express");
const apiroutes = require("./routes/apiroutes");

let app = express();

app.use(express.json());

const port = process.env.port || 3001;

app.use("/api", apiroutes);

app.listen(port);

console.log("Running on port ", port);

