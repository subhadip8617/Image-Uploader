const userModel = require('../models/userModels');
const photoModel = require('../models/photoModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        console.log(req.body)
        const existingUser = await userModel.findOne({email: req.body.email});
        if(existingUser){
            return res.status(200).send({msg: 'User already exists', success: false});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        req.body.password = hashedPass;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(200).send({msg: 'Registered Successfully', success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, msg: error})
    }
}

const loginController = async (req, res) => {
    try {
        console.log(req.body)
        const user = await userModel.findOne({email: req.body.email});
        if(!user){
            return res.status(200).send({msg: 'User Not Found', success: false});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({msg: 'Invalid Password', success: false});
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).send({msg: 'Successfuly logged in', success: true, token});
    } catch (error) {
        res.status(500).send({success: false, msg: error})
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        if(!user){
            return res.status(200).send({
                msg: 'User Not Found',
                success: false
            })
        }
        else{
            const uploadedPhotos = await photoModel.find({uploader : user.email})
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email,
                    uploadedPhotos
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: error,
            success: false
        });
    }
}

module.exports = {
    loginController,
    registerController,
    authController
}