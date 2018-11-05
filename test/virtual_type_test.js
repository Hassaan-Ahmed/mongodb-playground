const User = require('../src/user');
const assert = require('assert');

describe('Virtual type test', () => {
    xit('should return number of posts', (done) =>  {
        const joe = new User({name: 'joe', posts: [{title: 'newer post'}]});
        joe.save()
            .then(() => User.findOne({name: 'joe'}))
            .then((user) => {
                 assert(joe.postCount === 1);
                done();
            })
    });
});
