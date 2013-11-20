/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Symphony = mongoose.model('Symphony');

//Globals
var user;
var symphony;

//The tests
describe('<Unit Test>', function() {
    describe('Model Symphony:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                symphony = new Article({
                    title: 'Symphony Title',
                    composer: 'Symphony Composer',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return symphony.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                article.title = '';

                return symphony.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Symphony.remove({});
            User.remove({});
            done();
        });
        after(function(done){
            Symphony.remove().exec();
            User.remove().exec();
            done();
        });
    });
});
