const express = require('express');
const app = express();
//middlewares
app.use(require('./login'));
app.use(require('./usuario'));


module.exports=app;