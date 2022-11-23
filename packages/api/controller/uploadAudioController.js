

async function saveAudio(req, res) {

    try {
        const mp3File = req.file;   // retrieves file buffer and metadata set by multer
        
        // checks if file is available
        if (!mp3File) {
            return res.status(400).send({
                success: false,
                message: "file property can't be empty"
            });
        }
        
        return res.status(200).json({
            reuestBody: req.file.location,
        })


    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}

module.exports = saveAudio