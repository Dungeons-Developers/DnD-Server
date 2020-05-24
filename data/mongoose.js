const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

mongoose.connection.once('open', function callback() {
  console.log('Connected to DB!');
});

module.exports = mongoose;
