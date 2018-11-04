const User = require('../src/user');
const assert = require('assert');

describe('Updating user records ', () => {
    let joe;
   beforeEach((done) => {
       joe = new User({name: 'joe', postCount: 0});
       joe.save()
           .then(() => done());
   });

   function assertName(operation , done){
   operation
       .then(() => User.find({}))
           .then((users) => {
               assert(users.length === 1);
               assert(users[0].name === 'Alex');
               done();
           });
    }

    it('should update instance type using set and save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('should update a model instance', (done) => {
        assertName(joe.updateOne({name: 'Alex'}), done);
    });

    it('should update a model class', (done) => {
        assertName(User.updateOne({name: 'joe'},{name: 'Alex'})
            , done);

    });

    it('should update a model class one record', (done) => {
        assertName(User.findOneAndUpdate({name: 'joe'}, {name: 'Alex'})
            , done);
    });

    it('should find a record with an id and update a model class', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'})
            , done);
    });

    it('should find the user and update the postCount number using mongo operators', (done) => {
        User.updateOne({name: 'joe'}, {$inc: {postCount: 1}})
            .then(() => {
                User.findOne({name: 'joe'})
                    .then((user) => {
                        assert(user.postCount === 1);
                        done();
                    })
            });
    });
});