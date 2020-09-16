const { decode } = require('js-base64');

const { userModel } = require('../models');

const decodeBase64 = (encoded) => {
  const data = decode(encoded).toString().split(':');
  const formatted = {
    username: data[0],
    password: data[1],
  };
  return formatted;
};

const checkCredentials = async (creds) => {
  const user = await userModel.readByQuery({
    username: creds.username,
  });
  if (user[0]) {
    const match = await user[0].comparePassword(creds.password);
    if (match) return user[0];
  }
  return creds;
};

const auth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ');
    if (token.length === 2) {
      if (token[0] === 'Basic') {
        const creds = decodeBase64(token[1]);
        const user = await checkCredentials(creds);

        if (user._id) {
          req.user = user;
          return next();
        }
      } else if (token[0] === 'Bearer') {
        try {
          const user = await userModel.schema.verifyToken(token[1]);
          req.user = user;
          return next();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
  next({
    status: 401,
    message: 'Invalid credentials or token. Please sign in.',
  });
};

module.exports = auth;
