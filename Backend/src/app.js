const express = require("express");
const cookieParser = require("cookie-parser");
const connectdb = require("./config/db/database")

connectdb();



const app = express();
app.use(express.json());
app.use(cookieParser())






module.exports = app;
