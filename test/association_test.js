const  mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('testing model schema associations', () =>{
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({name: 'joe'});
        blogPost = new BlogPost({title: 'JS is great', content: 'yep it really is'});
        comment = new Comment({content: 'great post out here'});

        //Has many relation
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);

        //Has one relationship
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });
    it('should save a relation between a user and blogPost  ', (done) => {
        User.findOne({name: 'joe'})
            .then((user) => {
                console.log(user);
                done();
            });
    });
});
