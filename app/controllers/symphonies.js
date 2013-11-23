/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Symphony = mongoose.model('Symphony'),
    Years = mongoose.model('Years'),
    _ = require('underscore');

/**
 * Get available years
*/

exports.years = function(req, res, next, id) {
    Years.load(id, function(err, years) {
        if (err) return next(err);
        if (!years) return next(new Error('Failed to load years ' + id));
        req.years = years;
        next();
    });
};

 exports.getYears = function(req, res) {
    Years.find().sort('year').populate('year', 'year').exec(function(err, years) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(years);
        }
    });
 };


/**
 * Find symphony by id
 */
exports.symphony = function(req, res, next, id) {
    Symphony.load(id, function(err, symphony) {
        if (err) return next(err);
        if (!symphony) return next(new Error('Failed to load symphony ' + id));
        req.symphony = symphony;
        next();
    });
};

/**
 * Create a symphony
 */
exports.create = function(req, res) {
    var symphony = new Symphony(req.body);
    symphony.user = req.user;

    symphony.save(function(err) {
        if (err) {
            console.log("exports create called - error");
            return res.send('users/signup', {
                errors: err.errors,
                symphony: symphony
            });
        } else {
            console.log("exports create called - ok");
            res.jsonp(symphony);
        }
    });
    
};

/**
 * Update a symphony
 */
exports.update = function(req, res) {
    var symphony = req.symphony;

    symphony = _.extend(symphony, req.body);

    symphony.save(function(err) {
        res.jsonp(symphony);
    });
};

/**
 * Delete a symphony
 */
exports.destroy = function(req, res) {
    var symphony = req.symphony;

    symphony.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(symphony);
        }
    });
};

/**
 * Show a symphony
 */
exports.show = function(req, res) {
    res.jsonp(req.symphony);
};

/**
 * List of Symphonies
 */
exports.all = function(req, res) {
    Symphony.find().populate('user', 'name username').exec(function(err, symphonies) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(symphonies);
        }
    });
};

/**
 * Favorite a symphony
 */
exports.fav = function(req, res) {
    console.log("fav function");
    /*
    var symphony = req.symphony;

    symphony.save(function(err) {
        res.jsonp(symphony);
    });
    */
};

