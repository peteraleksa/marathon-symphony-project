/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
	Schema = mongoose.Schema;

/**
 * Composition Schema
 */
 var CompositionSchema = new Schema({
	symphony: {
		type: Schema.ObjectId,
		ref: 'Symphony'
	},
	speed: Number,
	midi: String
 });

 mongoose.model('Composition', CompositionSchema);