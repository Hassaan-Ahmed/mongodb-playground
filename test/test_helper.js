const mongoose = require('mongoose');

before((done) => {
    mongoose.connect("mongodb://localhost:27017/user_test", { useNewUrlParser: true });
    mongoose.connection
        .once('open',() => { done(); })
        .on('error', (error) => {
            console.warn('WARNING: ', error);
        });
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // ready to run next test
    done();
  });
});
