import express from 'express';
import users from './controllers/users';
import errorHandler from './middleware/error-handler';
// import apigatewayEventGenerator from './utils/apigateway-event-generator';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', port);

app.use(users);

// catch 404 and forward to error handler
app.use(errorHandler);

app.listen(port, () => console.log(`app listening on port ${port}!`));
