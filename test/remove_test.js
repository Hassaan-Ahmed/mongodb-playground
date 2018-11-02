const User = require('../src/user');
const assert = require('assert');

describe('Remove user from database', ()=>{
    let joe;
    beforeEach((done) => {
        joe = new User({name: 'joe'});
        joe.save()
            .then(() => {
                done();
            });
    });
    it('should remove model instance', (done) => {
       joe.remove()
           .then(() =>
               User.findOne({name: 'joe'})
           )
           .then((user) => {
               assert(user === null);
               done();
           });
    });

    it('should deleteOne user using class method', (done) => {
        User.deleteOne({name: 'joe'})
            .then(() =>
                User.findOne({name: 'joe'})
            )
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('should findOneAndDelete using class method ', (done) => {
        User.findOneAndDelete({name:'joe'})
            .then(() =>
                User.findOne({name: 'joe'})
            )
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('should findByIdAndDelete using class method', (done) => {
        User.findByIdAndDelete(joe.id)
            .then(() =>
                User.findOne({name: 'joe'})
            )
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});