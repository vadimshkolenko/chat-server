module.exports = {
  mongodb: {
    uri: 'mongodb://localhost/chat',
  },
  crypto: {
    iterations: (process.env.NODE_ENV === 'test' ? 1 : 12000),
    length: 128,
    digest: 'sha512',
  },
}
