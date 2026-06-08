const songModel = require("../models/song.model")
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

async function uploadSong(req,res){
    const tags = id3.read(req.file.buffer)
    const songFile = await storageService.uploadFile({
        buffer:songBuffer,
        filename: tags.title,
        folder: "/Moodify/songs"
    })

    const posterFile = await storageService.uploadFile({
        buffer:tags.image.imageBuffer,
        
    })

}

module.exports = {uploadSong}