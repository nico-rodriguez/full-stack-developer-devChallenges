const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
