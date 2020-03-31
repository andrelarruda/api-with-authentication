const express = require('express');
const User = require('../models/User');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
   const user = await User.findById( req.userId );
   res.send({ ok: true, user });
});

// Para usar o middleware apenas em rotas específicas:
// router.get('/', authMiddleware, (req, res) => {
//    res.send({ ok: true });
// });

module.exports = app => app.use('/projects', router);