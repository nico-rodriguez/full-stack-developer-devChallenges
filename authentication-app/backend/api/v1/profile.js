const { Router } = require('express');

const router = Router();

router.get('/', function (req, res) {
  const { user } = req;

  if (user) {
    res.json(user);
  }
});

module.exports = router;
