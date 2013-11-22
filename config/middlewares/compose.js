/**
 * Module dependencies.

var mongoose = require('mongoose'),
    Symphony = mongoose.model('Symphony'),
    Years = mongoose.model('Composition'),
    _ = require('underscore');

// A composition
exports.composition = function(req, res, next) {
	var symphony = new Symphony(req.body);
	var composition = new Composition({
		symphony: this.symphony,
		speed: 100,
	});
	res.jsonp(composition);
    next();
};