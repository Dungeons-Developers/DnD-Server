'use strict';

const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const start = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(console.log('Connected to DB!'));
};

const stop = () => {
  mongoose.disconnect();
};

module.exports = { start, stop };
