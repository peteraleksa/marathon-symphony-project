/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Symphony Schema
 */
var SymphonySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    composer: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    year: {
        type: String
    },
    runnerRange: {
        type: [String]
    },
    timingLocations: {
        locations: {
            type: [String],
            instrument: {
                type: String,
                default: 'Piano'
            }
        }
    },
    melody: {
        melodyType: {
            type: String,
        },
        notes: {
            type: [String],
            default: 'C'
        }
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    favorites: {
        num: {
            type: Number,
            default: 0
        },
        users: [{
            type: Schema.ObjectId,
            ref: 'User'
        }]
    },
    shares: {
        type: Number,
        default: 0
    },
    speed: Number,
    midi: {}
});

/**
 * Validations
 */
SymphonySchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
SymphonySchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username')
          .populate('favorites.users', 'name')
          .exec(cb);
    }
};

mongoose.model('Symphony', SymphonySchema);

/**
 * Years Schema
 */
var YearSchema = new Schema({
    year: {
        type: Number
    }
});

/**
 * Statics
 */
YearSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Years', YearSchema);
