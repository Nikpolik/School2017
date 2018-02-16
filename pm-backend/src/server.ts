import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import mongoose = require('mongoose');
import * as morgan from 'morgan';
import * as cors from 'cors';

import config from './config';

import { userRoutes, organizationRoutes, projectRoutes } from './routes/index';

const app: express.Application = express();
mongoose.Promise = Promise;

mongoose.connect(config.database);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.set("port", process.env.PORT || 9100);

app.set('mySecret', config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({"secret" : "cats"}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

app.use(cors());

app.use('/user', userRoutes);

app.use('/organizations', organizationRoutes);
app.use('/projects', projectRoutes);

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send({hello: 'Hi i am josh'})
});

app.post('/login', function (req, res) {
  console.log('???');
  res.setHeader('Content-Type', 'application/json');
  setTimeout(() => res.send({hello: 'Hi i am josh'}), 2000);
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 9100!')
})


export default app;