const express = require("express");
const app = express();
const cors = require('cors');

const routes = require("./routes");

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
};

app.use(express.json());
app.use(cors(corsOpts));
app.use(express.static(__dirname + "/static"))

app.use("/", routes);

app.listen(8000, () => console.log("Listning on Port 8000"));