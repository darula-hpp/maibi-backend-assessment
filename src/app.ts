//app
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let listenPort  = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Minorities");
});

app.listen(listenPort, () => {
  console.log(`App currently running at port ${listenPort}`);
});