const  mongoose = require('mongoose');
const  assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('testing model schema associations', () =>{
    let joe, blog, comment;
    beforeEach((done) => {
        joe = new User({name: 'joe'});
        blog = new BlogPost({title: 'JS is great', content: 'yep it really is'});
        comment = new Comment({content: 'great post out here'});

        //Has many relation
        joe.blogPosts.push(blog);
        blog.comments.push(comment);

        //Has one relationship
        comment.user = joe;

        Promise.all([joe.save(), blog.save(), comment.save()])
            .then(() => done());
    });
    it('should save a relation between a user and blogPost', (done) => {
        User.findOne({name: 'joe'})
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is great');
                done();
            });
    });

    it('should save a full relation graph', (done) => {
        User.findOne({name: 'joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) =>{
                assert(user.name === 'joe');
                assert(user.blogPosts[0].title === 'JS is great');
                assert(user.blogPosts[0].comments[0].content === 'great post out here');
                assert(user.blogPosts[0].comments[0].user.name === 'joe');
                done();
            })
    });
});
