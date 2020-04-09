const express = require("express");
const axios = require("axios").default;
const sgMail = require("../../modules/mailer");

const router = express.Router();

router.get("/sendMail", async (req, res) => {
   try {
      const mailOptions = {
         to: "andrebass27@gmail.com",
         from: "projetos@seedabit.org.br",
         subject: "Nice Sendgrid Test",
         text: "Hey there, it's our first message sent with Sendgrid ;)",
         html:
            "<b>Hey there!</b><br>This is our first message sent with SendGrid",
      };
      const resp = await sgMail.send(mailOptions);

      return res.status(200).send(resp);
   } catch (err) {
      res.status(400).send(err);
   }
});

module.exports = (app) => app.use("/mail", router);
