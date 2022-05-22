const { Router } = require('express');

const User = require('../../models/User.js');

const router = Router();

router.post('/', async function (req, res) {
  const { username, password } = req.body;
  User.register(new User({ username }), password);
  res.sendStatus(200);
});

module.exports = router;
