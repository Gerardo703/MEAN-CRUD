const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Crear el Servidor
const app = express();

// Conectamos a la base de datos
conectarDB();

app.use(cors());
app.use(express.json()); // Poder enviar json a la app

app.use('/api/productos', require('./routes/producto'));

app.listen(4000, () => {
    console.log("El servidor está corriendo correctamente...");
});