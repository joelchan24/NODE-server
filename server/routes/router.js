const express = require('express');
const app = express();
//middlewares
app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./upload'));
app.use(require('./categories'));
app.use(require('./product'));
app.use(require('./images'));
module.exports=app;