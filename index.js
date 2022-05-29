const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require("dotenv").config();

//mongoose.Promise = global.promise

const { PORT, MONGO_URI }= process.env;

console.log(process.env.MONGO_URI);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(require("./api/user-api"));
app.use(require("./api/schedule-api"));
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});

