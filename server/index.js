const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const logger = require('morgan');

const PORT = process.env.PORT || 3000;
const distPath = path.resolve(__dirname, '../dist');
const app = express();

app.use(bodyParser.json());
app.set('views', distPath);
app.engine('html', ejs.renderFile);
app.use(express.static(distPath));
app.use(logger('dev'));

app.get('*', (req, res) => res.render('index.html'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));