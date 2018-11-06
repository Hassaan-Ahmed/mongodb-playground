const mongoose = require('mongoose');
const assert = require('assert');
const BlogPost = require('../src/blogPost');
const User = require('../src/user');

describe('Middleware testing section',() => {
        let joe, blogPost;
        beforeEach((done) => {
            joe = new User({name: 'joe'});
            blogPost = new BlogPost({title: 'this is title', content: 'some content'});

            joe.blogPosts.push(blogPost);
            Promise.all([joe.save(), blogPost.save()])
                .then(() => done());
        });

        it('should clean up dangling blog posts on remove', (done) => {
            joe.remove()
                .then(() => BlogPost.count())
                .then((count) => {
                    assert(count === 0);
                    done();
                });
        });
});