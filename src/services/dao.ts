/*
 *
 *
 */

import mongoose from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);  // eslint-disable-line
mongoose.Promise = global.Promise;

let mongoUrl = process.env.MONGODB_URL!
if (process.env.NODE_ENV === 'test') {
  mongoUrl = process.env.MONGODB_URL_TEST!
}

mongoose.connect(mongoUrl);

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
  if (process.env.MONGOOSE_DISCONNECT === 'true') {
    process.exit(2);
  }
});

export { mongoose, AutoIncrement };
