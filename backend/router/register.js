import express from 'express';
import { hash } from '../utils/crypto';

import User from '../models/User';

const route = express.Router();

route.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const hashPassword = await hash(password);
  if(!hashPassword) {
    res.status(500);
    res.json({result: 'hash failed!'});
    return;
  }
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    const result = await newUser.save();
    res.json(result);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

export default route;
