import express from 'express';

import User from '../models/User';

import { verify } from '../utils/crypto'

const route = express.Router();

route.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userObj = await User.findOne({ username }).exec();
  if (!userObj) {
    res.status(403);
    res.end('User name not exist');
    return;
  }
  const hashPassword = userObj.password;
  const verifyPassword = password;

  if(await verify(hashPassword, verifyPassword)) {
    const { username, email } = userObj;
    req.session.username = username;
    req.session.email = email;
    req.session.save();
    res.end('login success');
    return;
  }
  res.status(403);
  res.end('password Wrong');
});

export default route;
