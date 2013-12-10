/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Symphony Schema
 */
var RaceSchema = new Schema({
	year: Number,
	timingStation: [{
		location: String,
		data: [{
			time: Number,
			bib: Number
		}]
	}]
});

mongoose.model('Race', RaceSchema);
