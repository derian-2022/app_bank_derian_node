const express = require('express');

//Importaciones
const usersRouter = require('./routes/users.routes');
const transferRouter = require('./routes/transfers.routers');



const app = express();
app.use(express.json());

//rutas
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/transfers', transferRouter);



module.exports = app;

