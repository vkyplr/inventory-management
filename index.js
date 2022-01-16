const express = require("express");
const app = express();

const routes = require("./routes");

app.use(express.static(__dirname + "/static"))

app.use("/", routes);

app.listen(8000, () => console.log("Listning on Port 8000"));