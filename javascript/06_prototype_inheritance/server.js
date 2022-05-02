const express = require("express");

const app = express();

let port = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(port);

<<<<<<< HEAD
console.log("Running on port "+port);

=======
console.log("Running in port "+port);
>>>>>>> 47b64bc14d5fa6b3b2557540a68e287c06530541
