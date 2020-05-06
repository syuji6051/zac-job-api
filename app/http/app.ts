import express from 'express';
import users from './controllers/users';
import works from './controllers/works';
import errorHandler from './middleware/error-handler';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', port);

app.use(users);
app.use(works);

// catch 404 and forward to error handler
app.use(errorHandler);

app.listen(port, () => console.log(`app listening on port ${port}!`));
