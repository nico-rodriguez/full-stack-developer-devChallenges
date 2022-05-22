const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  }),
  function (req, res) {
    res.sendStatus(200);
  }
);

module.exports = router;
