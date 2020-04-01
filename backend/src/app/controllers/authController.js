const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}){
   return jwt.sign( params, authConfig.secret, {
      expiresIn: "86400",
   });
}

router.post('/register', async (req, res) => {

   const { name, email, password } = req.body;

   try {
      if (await User.findOne({ email })){
         return res.status(400).send({ error: 'This email is already registered.' })
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create( { name, email, password: hashedPassword } );
      user.password = undefined;

      return res.status(201).send({ 
         user,
         // token gerado no registro para que o usuário não precise ir para tela de login. Neste caso, o usuário já loga automaticamente ao efetuar o registro.
         token: generateToken( { id: user.id }),
      });

   } catch (err) {
      return res.status(400).send({ error: 'Registration failed.'});
   }
});

router.post('/authenticate', async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email }).select('+password');

   if(!user){
      return res.status(400).send({ error: "User not found"});
   }

   if(!await bcrypt.compare(password, user.password)){
      return res.status(400).send({ error: "Password doesn't match" });
   }

   user.password = undefined;
   return res.send({ 
      message: "Login Successful.", 
      user, 
      token: generateToken( { id: user.id }),
   });
});

router.post('/forgot_password', async (req, res) => {
   const { email } = req.body;
   
   try {
      // verifica se email é de usuário cadastrado.
      const user = await User.findOne({ email });

      if (!user){
         return res.status(400).send({ error: "User not found." });
      }

      // gera um token de 20 caracteres e transforma em hexadecimal
      const token = crypto.randomBytes(20).toString('hex')

      // define a data de expiração
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.findByIdAndUpdate(user.id, {
         '$set': {
            passwordResetToken: token,
            passwordResetExpires: now,
         }
      });

      //enviar para o usuário um email com a rota de reset do password
      const response = await mailer.sendMail({
         to: email,
         from: "andrebass27@gmail.com",
         // template: 'auth/forgot_password',
         // context: manda as variáveis pro arquivo html.
         // context: { token }
         subject: "It seems like you've requested a password reset",
         text: `If you've made this request, please copy out following token: ${token}.\n If you didn't, ignore it out.`,
      });
      return res.send();

   } catch(err) {
      console.log(err)
      res.status(400).send({ error: "Error on forgot password, try again."})
   }

});

router.post('/reset_password', async (req, res) => {
   const { email, token, password } = req.body;

   try {
      const user = await User.findOne({ email })
         .select('+passwordResetToken passwordResetExpires');

      if (!user){
         return res.status(400).send({ error: "User not found." });
      }

      if (token !== user.passwordResetToken){
         return res.status(400).send({ error: "Invalid token."})
      }

      const now = new Date();

      if (now > user.passwordResetExpires){
         return res.status(400).send({ error: "Expired token, generate a new one"})
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.findByIdAndUpdate(user.id, {
         '$set': {
            password: hashedPassword,
         }
      });

      user.password = password;

      res.send();
   } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Cannot reset password, try again." });
   }
});


module.exports = (app) => app.use('/auth', router);