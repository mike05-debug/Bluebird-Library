const dotEnv = require('dotenv');

dotEnv.config();

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')

const port = process.env.PORT || 3000;

// --Routers Import--
const indexRt = require('./routes/index')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// MongoDb Connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/', indexRt);

app.listen(port, () => {
    console.log('Server running on port: ' + port)
});
