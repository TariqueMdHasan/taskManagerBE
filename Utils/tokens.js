const jwt = require('jsonwebtoken')

const generateToken = (id) =>{
    try{
        if(!process.env.JWT_SECRET){
            throw new Error('JWT_SECRET is not defined in the environment varialbles')
        }
        return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '7d'})
    }catch(error){
        console.error('Error diring token generation');
        throw new Error('Error during token generation')
    }
}



const verifyToken = (token)=> {
    try{
        if(!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variable')
        }
        return jwt.verify(token, process.env.JWT_SECRET)
    }catch(error){
        console.error('Error during token verification', error)
        throw new Error('NOt authorized to eccess this route')
    }
}

module.exports = { generateToken, verifyToken }