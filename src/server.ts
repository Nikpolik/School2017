import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

const app = express();

mongoose.connect("mongodb://localhost/expenses");

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({"secret" : "cats"}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());