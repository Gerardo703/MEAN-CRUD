const mongoose = require('mongoose');

//Traer la conexión del archivo .env
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false

        });

        console.log("Base de datos conectadad exitosamente");

    } catch (error) {
        console.log(error);
        process.exit(1) // Detenemos la app...
    }
}

module.exports = conectarDB;