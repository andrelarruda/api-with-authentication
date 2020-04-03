// Para enviar email em ambientes de produção: sendGrid (Free até 100/day), mandrill (pago), Spark post, mailchimp

// Recuperação de senha: https://www.youtube.com/watch?v=Zwdv9RllPqU&list=PL85ITvJ7FLoiXVwHXeOsOuVppGbBzo2dp&index=3 (código começa em 6:06)
//ENVIO DE EMAIL PARA O MAILTRAP

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./database');

const PORT = 3333;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers')(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
