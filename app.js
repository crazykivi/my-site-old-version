const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const recordsRoutes = require("./routes/recordsRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: ["https://nikitaredko.ru", "https://www.nikitaredko.ru"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api/records", recordsRoutes);

app.use(errorHandler);

module.exports = app;
