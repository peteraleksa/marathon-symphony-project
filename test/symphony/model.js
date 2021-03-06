/**
* Attempted to make some tests, but they are incomplete
*/

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
                symphony = new Symphony({
                    title: 'Symphony Title',
                    composer: 'Composer',
                    year: '2013',
                    runnerRange: ['Pro Men', 'Pro Women'],
                    timingLocations: {
                        locations: ['Start', 'Mile 1', 'Mile 2']
                    },
                    melody: {
                        melodyType: 'Harmonic'
                    },
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

            it('should be able to show an error when trying to save without title', function(done) {
                symphony.title = '';

                return symphony.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when trying to save without composer', function(done) {
                symphony.composer = '';

                return symphony.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

/* 
 * hmmm, is this even necessary??
 *
        describe('Method Statics Load', function() {
            it('should be able to load without problems', function(done) {
                return Symphony.statics.load(symphony._id, function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });
*/

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