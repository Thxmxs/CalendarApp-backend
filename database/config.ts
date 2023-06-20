const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {
        let env = await
        await mongoose.connect(process.env.DBCONNECTION)
        console.log("Base de datos online")
    } catch (error) {
        console.log(error)
        throw new Error('Error en la base de datos')
    }
}

module.exports={dbConnection};