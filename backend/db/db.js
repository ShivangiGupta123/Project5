const mongoose = require('mongoose')
const db = async()=>{
    try{

        const url = process.env.DB_URL
        mongoose.set('strictQuery', false)
        const mongooseConnection = await mongoose.connect(url)
        console.log("database is connected successfully")
    }
    catch(error){
        console.log("database is not connected")
    }
}
module.exports = db