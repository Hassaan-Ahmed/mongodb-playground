const User = require('../src/user');
const assert = require('assert');

describe('Validating records ', () => {
    it('should require a user name', () => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert( message === 'Name is required.');
    });

    it('should require a user\'s name longer than 2 characters', () => {
        const user = new User({name: 'Al'});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer that two characters.');
    });

    it('should disallow invalid records from being saved', (done) => {
        const user = new User({name: 'Al'});
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be longer that two characters.');
                done();
            });
    });
});