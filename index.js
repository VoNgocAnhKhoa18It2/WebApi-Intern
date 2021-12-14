const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose');


const ApiRouter = require('./routers/api.router')

const app = express()
var http = require('http').createServer(app);
require('dotenv').config();
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"))
app.use("/assets", express.static(__dirname + "/public"));

app.use("/api/v4", ApiRouter);

http.listen(port, () => console.log(`App listening at http://localhost:${port}`));

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connect DB Success"))
.catch((err) => console.error(err));