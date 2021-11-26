/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { middleware } from '@syuji6051/zac-job-library';

import users from '@/src/controllers/users';
import works from '@/src/controllers/works';
import zac from '@/src/controllers/zac';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3001'],
}));
app.set('port', port);

app.use(users);
app.use(works);
app.use(zac);

// catch 404 and forward to error handler
app.use(middleware.errorHandler());

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`app listening on port ${port}!`));
