const express = require('express');
const axios = require('axios').default;
const transport = require('../../modules/mailer');

const router = express.Router();

router.get('/sendMail', async (req, res) => {
   try{
      const mailOptions = {
         from: '"Development team" <aplicacaobackend@test.com>',
         to: 'andre_bass27@hotmail.com, andre.arruda@seedabit.org.br',
         subject: 'Nice Nodemailer Test',
         text: "Hey there, it's our first message sent with Nodemailer ;)",
         html: "<b>Hey there!</b><br>This is our first message sent with Nodemailer"
      }
      const resp = await transport.sendMail(mailOptions);

      return res.status(200).send(resp);

   } catch(err){
      res.status(400).send(err)
   }
   
});



module.exports = (app) => app.use('/mail', router);
