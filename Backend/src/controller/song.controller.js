const songModel = require("../models/song.model")
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

async function uploadSong(req,res){
    try {
        const tags = id3.read(req.file.buffer)
        const { mood } = req.body
        const songBuffer = req.file.buffer
        const posterBuffer = tags.image && tags.image.imageBuffer ? tags.image.imageBuffer : null

        const songPromise = storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/Moodify/songs"
        })

        const posterPromise = posterBuffer
            ? storageService.uploadFile({
                  buffer: posterBuffer,
                  filename: tags.title + ".jpeg",
                  folder: "/Moodify/posters"
              })
            : Promise.resolve({ url: null })

        const [songFile, posterFile] = await Promise.all([songPromise, posterPromise])

        const song = await songModel.create({
            title: tags.title,
            url: songFile.url,
            posterUrl: posterFile.url,
            mood
        })

        res.status(201).json({
            message: "song created successfully",
            song
        })
    } catch (err) {
        res.status(500).json({
            message: "upload failed",
            error: err.message
        })
    }
}

async function getSong(req,res){
    const { mood } = req.query

    const song = await songModel.findOne({
        mood
    })
    res.status(200).json({
        message:"song fetched successfully",
        song
    })
}

module.exports = {uploadSong, getSong}