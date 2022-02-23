const Router = require('express');
const router = new Router();
const controller = require('../authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
router.post(
  '/register',
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must have min 4 max 10 latters').isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.register
);
router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;
