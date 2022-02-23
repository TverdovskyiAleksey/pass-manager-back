const { User } = require('./models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const generateAccessToken = id => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Register error' });
      }
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'User already registered' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      await User.create({ username, password: hashPassword });

      return res.status(201).json({
        status: 'success',
        code: 201,
        message: 'Register success',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Register error' });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
      const token = generateAccessToken(user._id);

      return res.status(200).json({
        status: 'success',
        code: 200,
        token,
        user: {
          username,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Login error' });
    }
  }
  async logout(req, res) {
    try {
      const { _id } = req.body;
      await User.findByIdAndUpdate(_id, { token: null });
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ message: 'LogOut error' });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {}
  }
}

module.exports = new authController();
