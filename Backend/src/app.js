const express = require("express");
const cookieParser = require("cookie-parser");
const connectdb = require("./config/db/database")
const authRoutes = require("./routes/auth.routes")

connectdb();



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)






module.exports = app;
