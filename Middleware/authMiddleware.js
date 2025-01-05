const jwt = require('jsonwebtoken')
const User = require('../Model/userModel.js')
const {verifyToken} = require('../Utils/tokens.js')

const authMiddleware = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(404).json({ message: 'User not found' }); // Handle invalid user
            }
            next()
        }catch(error){
            console.error('Error in authMiddleware', error);
            return res.status(401).json({message: 'Not aauthorized, token failed'})
        }
    }else{
        return res.status(401).json({ message: 'not authotized, no token'})
    }
}

module.exports = authMiddleware;