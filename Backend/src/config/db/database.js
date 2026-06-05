const mongoose = require("mongoose")

const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DB Connected")
    })
    
}

module.exports = connectdb;