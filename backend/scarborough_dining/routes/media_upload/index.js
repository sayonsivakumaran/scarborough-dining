const express = require('express');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.route('/').post((req, res) => {
    const { file } = req.files;

    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) {
            res.status(500).json({ "error" : err });
        }

        res.json({ "result" :  result });

        res.on('finish', () => {
            fs.unlinkSync(file.tempFilePath);
        });
    });
});

module.exports = router;