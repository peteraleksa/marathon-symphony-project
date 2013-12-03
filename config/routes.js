module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    var symphonies = require('../app/controllers/symphonies');
    var compositions = require('../app/controllers/compose');


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
    
    app.get('/symphonies', symphonies.all);
    // authenticated users only can create
    //app.post('/symphonies', auth.requiresLogin, symphonies.create);
    // update to include composition creation
    app.post('/symphonies', symphonies.create);
    app.get('/symphonies/:symphonyId', symphonies.show);
    //app.post('/symphonies/favorite/:symphonyId', symphonies.fav);
    app.put('/symphonies/:symphonyId', symphonies.update);
    //app.put('/fav/:symphonyId/:userId', symphonies.fav);
    //app.del('/symphonies/:symphonyId', auth.requiresLogin, auth.symphony.hasAuthorization, symphonies.destroy);*/

    // get users own symphonies
    app.get('/users/:userId/symphonies', symphonies.mine);

    //Finish with setting up the symphonyId param
    app.param('symphonyId', symphonies.symphony);

    //Compose routes
    
    app.get('/compositions', compositions.all);
    app.post('/compose', compositions.create);
    app.get('/compositions/:compositionId', compositions.show);

    //compositionId param
    app.param('compositionId', compositions.composition);
/*
    //Year Routes
    var years = require('../app/controllers/symphonies');
    app.get('/years', years.getYears);
*/
    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
