module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Symphony Routes
    var symphonies = require('../app/controllers/symphonies');
    app.get('/symphonies', symphonies.all);
    //app.post('/symphonies', auth.requiresLogin, symphonies.create);
    app.post('/symphonies', symphonies.create);
    app.get('/symphonies/:symphonyId', symphonies.show);
    /*app.put('/symphonies/:symphonyId', auth.requiresLogin, auth.symphony.hasAuthorization, symphonies.update);
    app.del('/symphonies/:symphonyId', auth.requiresLogin, auth.symphony.hasAuthorization, symphonies.destroy);*/

    //Finish with setting up the symphonyId param
    app.param('symphonyId', symphonies.symphony);
 
    //Year Routes
    var years = require('../app/controllers/symphonies');
    app.get('/years', years.getYears);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
