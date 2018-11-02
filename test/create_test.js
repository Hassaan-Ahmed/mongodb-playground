const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) =>{
    //creates a user
    const joe = new User({name: 'Joe'});
    //save in db
    joe.save()
        .then(() => {
           assert(!joe.isNew);
           done();
        });
    //check if saved
    
  });
});
