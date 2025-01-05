const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // Optional: Increase timeout to 30 seconds
        })
        .then(()=>console.log('server successfully conected to database'))
        .catch((error)=> console.log('not connected to database', error))
    }catch(error){
        console.log('something went wrong in db.js', error)

    }
}

module.exports = connectDB;