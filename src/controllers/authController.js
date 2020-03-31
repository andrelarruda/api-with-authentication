const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

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


module.exports = (app) => app.use('/auth', router);