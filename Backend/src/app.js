const express = require("express");
const cookieParser = require("cookie-parser");
const connectdb = require("./config/db/database")
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")
const cors = require("cors")

connectdb();





const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)




module.exports = app;
