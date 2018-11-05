const assert = require('assert');
const User = require('../src/user');

describe('Subdocument', () => {
    let joe;
    it('should make and save a user with post title', (done) => {
        joe = new User({name: 'joe', posts: [{title: 'post title'}]});
        joe.save()
            .then(() => {
                User.findOne({name: 'joe'})
                .then((user) => {
                    assert(user.name === 'joe');
                    assert(user.posts[0].title === 'post title');
                    done();
                })
            });
    });

    it('should save and update the post type', (done) => {
        const joe = new User({name:'joe', posts:[]});
        joe.save()
            .then(() => User.findOne({name:'joe'}))
                    .then((user) => {
                        user.posts.push({title: 'this is second post title'});
                       return user.save();
                    })
            .then(() => User.findOne({name: 'joe'}))
                    .then((user ) => {
                        assert(user.name === 'joe');
                        assert(user.posts[0].title === 'this is second post title');
                        done();
                    });
    });

    xit('should remove the sub document', (done) => {
        const joe = new User({
            name: 'joe',
            posts: [{title: 'new post'}]
        });
        joe.save()
            .then(() => User.findOne({name: 'joe'}))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({name: 'joe'}))
            .then((user) => {
                console.log('gets here too');
                assert(user.posts.length === 0);
                done();
            });
    });

});
