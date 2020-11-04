import express from 'express';

import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressStaticGzip from 'express-static-gzip';

import session from './middleware/session';
import csrf from './middleware/csrf';

import route from './router/index';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session);
app.use(csrf);

app.use('/', route);

app.use('/', expressStaticGzip('dist', {
  enableBrotli: true,
  customCompressions: [{
    encodingName: 'deflate',
    fileExtension: 'zz'
  }],
  orderPreference: ['br']
}));


export default app;
