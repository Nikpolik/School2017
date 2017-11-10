import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';

import config from './config';

const app = express();

mongoose.connect(config.database);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.set("port", process.env.PORT || 3000);

app.set('mySecret', config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({"secret" : "cats"}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')  
  res.setHeader('Content-Type', 'application/json');
  res.send({hello: 'Hi i am josh'})
});

app.post('/login', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')  
  res.setHeader('Content-Type', 'application/json');
  setTimeout(() => res.send({hello: 'Hi i am josh'}), 20000);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

export default app;