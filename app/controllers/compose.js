/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Symphony = mongoose.model('Symphony'),
    Composition = mongoose.model('Composition'),
    _ = require('underscore');

// A composition
exports.composition = function(req, res, next, id) {
	Composition.load(id, function(err, composition) {
		if (err) return next(err);
		if (!composition) return next(new Error('Failed to load composition ' + id));
		req.composition = composition;
		next();
	});
};

exports.create = function(req, res) {
	var composition = new Composition();
	res.jsonp(composition);
};

exports.all = function(req, res) {
	res.send("worked");
};

exports.show = function(req, res) {
	res.jsonp(req.composition);
};