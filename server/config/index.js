const config = {
  port: 8080,
  mongo: {
    uri: 'mongodb://localhost/test',
    options: {
      useNewUrlParser: true
    }
  },
  secrets : {
    session: 'test-app'
  }
};

module.exports = config;