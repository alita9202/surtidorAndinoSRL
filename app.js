const express = require('express');
const app = express();
const engine = require('ejs-mate');
const path = require('path');
const surtidorRutas = require('./routes/surtidorRoutes');

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use('/', surtidorRutas);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});
