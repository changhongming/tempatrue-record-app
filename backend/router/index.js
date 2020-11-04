import express from 'express';
import register from './register'
import login from './login';

const route = express.Router();


route.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

route.use(register);
route.use(login);

route.use((req, res, next) => {
  const token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  // res.locals.csrfToken = token;

  next();
});

route.get('/test', (req, res) => {
  console.log(req.session);
  console.log("test");
  res.end('test');
});

route.post('/test3', (req, res) => {
  res.end('good');
})

route.get('/test2', (req, res) => {
  req.session.regenerate(function(err) {
    if(err) {
      return res.json({msg: 'failed'});
    }
    req.session.user = 'test';
    res.json({msg: 'success'});
  });
});

route.get('/test3', (req, res) => {
  console.log(req.session);
  res.json(req.session);
});

export default route;
