const cloudinary = require('cloudinary').v2;
const photoModel = require('../models/photoModels');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadPhotoController = async(req, res) => {
    try {
        const {photo, uploader} = req.body;
        // console.log(photo.length)
        // const photoUrl = await cloudinary.uploader.upload(photo);
        // console.log(photoUrl)
        const photoUrl = photo;
        const newPhoto = new photoModel({
            photoUrl, uploader
        })
        await newPhoto.save();
        return res.status(200).send({msg: 'Photo Uploaded Successfully', success: true});
    } catch (error) {
        return res.status(500).send({success: false, msg: error})
    }
}

module.exports = {
    uploadPhotoController
}