const assert = require('assert');
const User = require('../src/user');

describe('Reading user from database with the name joe',() => {
    let joe;
    beforeEach((done)=>{
       joe = new User({name: 'joe'});
       joe.save()
           .then(() => done());
    });

    it('find user with the name of joe', (done) => {
        User.find({name: 'joe'})
            .then((users)=>{
               assert(users[0]._id.toString() === joe._id.toString());
               done();
            });
    });

    it('should find the user with the same id', (done) => {
        User.findOne({_id: joe._id})
            .then((user) => {
                assert(user.name === 'joe');
                done();
            })

    });
});