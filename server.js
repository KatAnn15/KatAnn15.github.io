const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const compression = require('compression');

app.use(compression());
app.use(express.static(__dirname + '/dist'));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist/index.html"));
    console.log("server running 2!")
})

app.listen(port);
