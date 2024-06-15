const express = require("express");
const app = express();
const jwtMiddleware = require("./jwt-auth-middleware");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(jwtMiddleware);

app.use("/api/courses", require("./routes/Course/routes"));
app.use("", require("./routes/Student/routes"));

module.exports = app;
