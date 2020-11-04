import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import cnf from '../config/app';

const MongoStore = connectMongo(session);

mongoose.connect(cnf.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
export default session({
  secret: cnf.secret,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 5 }
});
