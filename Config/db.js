const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=>console.log('server successfully conected to database'))
        .catch((error)=> console.log('not connected to database', error))
    }catch(error){
        console.log('something went wrong in db.js', error)

    }
}

module.exports = connectDB;