const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const passwordsRouter = require('./routes/passwordsRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/passwords', passwordsRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://aleksey:UY.rhi942zpVpU.@cluster0.be2rm.mongodb.net/password-manager?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
