const { Password } = require('./models/Password');
const CreateError = require('http-errors');

class passwordsController {
  async addPassword(req, res) {
    try {
      const newPassword = { ...req.body, owner: req.user._id };
      const result = await Password.create(newPassword);
      res.status(201).json({
        status: 'success',
        code: 201,
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed' });
    }
  }
  async getPasswords(req, res) {
    const { _id } = req.user;
    try {
      const result = await Password.find({ owner: _id });
      res.json({
        status: 'success',
        code: 200,
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed' });
    }
  }
  async deletePassword(req, res) {
    try {
      const { id } = req.params;
      const result = await Password.findByIdAndDelete(id);
      if (!result) {
        throw new CreateError(404, `Password with id=${id} not found`);
      }
      res.json({
        status: 'success',
        code: 200,
        message: 'Success delete',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed' });
    }
  }
  async updatePassword(req, res) {
    const { id } = req.params;
    const result = await Password.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      throw new CreateError(404, `Password with id=${id} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      result,
    });
  }
  async getCurrent(req, res, next) {
    const { user } = req;
    console.log(user);
    res.status(200).json({
      username: user.username,
    });
  }
}

module.exports = new passwordsController();
