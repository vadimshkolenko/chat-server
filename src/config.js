require('dotenv').config();

module.exports = {
  mongodb: {
    uri: 'mongodb://localhost/chat',
  },
  crypto: {
    iterations: (process.env.NODE_ENV === 'test' ? 1 : 12000),
    length: 128,
    digest: 'sha512',
  },
  mailer: {
    user: process.env.EMAIL,
    password: process.env.EMAIL_PASS,
  },
}
