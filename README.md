## Short example of a complete (back-end + front-end) application

With this project I could improve my ReactJS and NodeJS skills.

## The project consists of:

- NodeJS API that performs registration, authentication, authorization, hashing passwords and password recovery through sending email.
- ReactJS application to test the created API.

## Technical skills

- Database with [MongoDB](https://www.mongodb.com/);
- Object modeling using [mongoose](https://mongoosejs.com/);
- Hashing password with [bcrypt](https://www.npmjs.com/package/bcrypt);
- Authentication with [JWT](https://jwt.io/)
- Email sending with:

  1. [nodemailer](https://nodemailer.com/about/). This library was used just for test purposes. Every email is delivered to a testing server called [mailtrap](https://mailtrap.io/).
  2. In production I used [SendGrid](https://sendgrid.com/) that sends emails to real email accounts.
