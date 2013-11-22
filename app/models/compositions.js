/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
	Schema = mongoose.Schema;

/**
 * Symphony Schema
 */
 var CompositionSchema = new Schema({
	symphony: {
		type: Schema.ObjectId,
		ref: 'Symphony'
	},
	speed: 100
 });

 mongoose.model('Composition', CompositionSchema);