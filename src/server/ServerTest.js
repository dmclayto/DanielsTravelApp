
const express = require("express");
const app = express();
let projectData= {};
app.get("/", (req, res) => {
    res.send(projectData);
});

module.exports = app;

