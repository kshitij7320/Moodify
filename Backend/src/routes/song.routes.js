const express = require("express")
const upload = require("../middlewares/upload.middleware")

const router = express.Router()

router.post("/", upload.single("song"), )

module.exports = router