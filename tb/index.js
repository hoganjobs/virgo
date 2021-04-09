const express = require("express");
const app = express();

const path = require("path");


app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

app.listen(3000)
