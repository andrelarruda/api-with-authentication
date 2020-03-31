const express = require('express');
const bodyParser = require('body-parser');

require('./database');

const PORT = 3333;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));