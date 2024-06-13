const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/courses", require("./routes/Course/routes"));

module.exports = app;
