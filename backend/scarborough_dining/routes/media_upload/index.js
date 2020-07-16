const express = require('express');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const router = express.Router();

/**
 * Configuration for Cloudinary storage service
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Server-side post request to upload image data to database.
 * Requires an image passed in the request.
 * @return the data associated with the uploaded image in the database
 */
router.route('/image').post((req, res) => {
    if (req.files == null) {
        res.json({ "result" : {} });
        return;
    }

    const { file } = req.files;

    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ "error" : err });
        }

        res.json({ "result" :  result });

        res.on('finish', () => {
            fs.unlinkSync(file.tempFilePath);
        });
    });
});

/**
 * Server-side post request to upload video data to database.
 * Requires a video passed in the request.
 * @return the data associated with the uploaded video in the database
 */
router.route('/video').post((req, res) => {
    if (req.files == null) {
        res.json({ "result" : {} });
        return;
    }

    const { file } = req.files;

    cloudinary.uploader.upload(file.tempFilePath,
        {
            resource_type: "video"
        },
        (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ "error" : err });
        }

        res.json({ "result" :  result });

        res.on('finish', () => {
            fs.unlinkSync(file.tempFilePath);
        });
    });
});

module.exports = router;