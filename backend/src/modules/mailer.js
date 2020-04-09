const sdMail = require("@sendgrid/mail");

sdMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sdMail;

// Para enviar com nodemailer (para o MailTrap):
// necessário instalar (npm install --save nodemailer)

// const nodemailer = require("nodemailer");

// const { host, port, user, pass } = require("../config/mail.json");

// const transport = nodemailer.createTransport({
//    host,
//    port,
//    auth: {
//       user,
//       pass,
//    },
// });

// module.exports = transport;

// transport.use('compile', hbs({
//    // viewEngine: 'handlebars',
//    // viewPath: './src/resources/mail',
//    // extName: '.html'
//    viewEngine: {
//       extName: '.html',
//       partialsDir: path.resolve('./src/resources/mail'),
//       layoutsDir: path.resolve('./src/resources/mail'),
//       defaultLayout: 'auth/forgot_password.html'
//    },
//    viewPath: path.resolve('.src/resources/mail'),
//    extName: '.html'
// }));

// original de node_modules/express-handlebars/lib/express-handlebars.js:
// handlebars     : Handlebars,
//         extname        : '.handlebars',
//         layoutsDir     : undefined, // Default layouts directory is relative to `express settings.view` + `layouts/`
//         partialsDir    : undefined, // Default partials directory is relative to `express settings.view` + `partials/`
//         defaultLayout  : 'main',
//         helpers        : undefined,
//         compilerOptions: undefined,
