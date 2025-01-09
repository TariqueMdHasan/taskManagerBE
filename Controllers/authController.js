const User = require('../Model/userModel.js')
const {generateToken} = require('../Utils/tokens.js')
const bcrypt = require('bcrypt');


const registerUser = async(req, res) => {  
    // taking inputs form body 
    const {userName, email, password } = req.body;

    // checkinng if everything is submitted or not
    if(!userName || !email || !password){
        return res.status(400).json({message: 'please enter all data'})
    }

    // chech if user exist then throw message if exist
    const existUser = await User.findOne({email});
    if(existUser){
        return res.status(400).json({message: 'User already exist'})
    }


    try{   
        const user = await User.create({ userName, email, password });
        const token = generateToken(user._id)
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
            },
            token
        }
    )

    }catch(error){
        if (error.code === 11000) {
            const duplicateKey = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `${duplicateKey} already exists` });
        }
        console.error('error during user registration', error);
        res.status(500).json({message: 'server error'})
    }
}

const loginUser = async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: "please entrer all input"})
    }

    try{
        const user = await User.findOne({email})
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        const token = generateToken(user._id);
        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email
            },
            token
        })
    }catch(error){
        res.status(500).json({message: 'server error in authController'})
    }
}



const updateUser = async (req, res) => {
    const { userName, email, password } = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({message: 'Please enter all fields'})
    }

    try{
        const user = await User.findOne(req.user._id);
        if(!user){
            return res.status(400).json({message: 'YOu are not authorized to update this user'})
        }
        if(userName) user.userName = userName;
        if(email) user.email = email;
        if(password) user.password = password;

        const updatedUser = await user.save();
        return res.status(200).json({
            message: 'user updated successfully',
            user: {
                _id: updatedUser._id,
                userName: updatedUser.userName,
                email: updatedUser.email
            },
        })
    }catch(error){
        res.status(500).json({message: 'server error'})
    }
}




const deleteUser = async(req, res) => {
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({message: 'You are not authorized to delete this user'})
        }
        await User.findByIdAndDelete(user);
        return res.status(200).json({message: 'User deleted successfully'})
    }catch(error){
        console.error('Error during user deletion', error)
        res.status(500).json({message: 'error while deleting'})
    }
}

const getUserData = async(req, res) => {
    try{
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            message: 'User data retrieved successfully',
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
            },
        });
    }catch(error){
        console.error('Error finding user data', error)
        res.stutus(500).json({message: 'error while getting user data'})
    }
}

module.exports = { registerUser, loginUser, updateUser, deleteUser, getUserData }