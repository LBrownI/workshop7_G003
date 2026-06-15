const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usar el enrutador de la API
app.use('/api', apiRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de desarrollo escuchando en el puerto ${PORT}`);
});

module.exports = app;