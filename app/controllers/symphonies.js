/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Symphony = mongoose.model('Symphony'),
    User = mongoose.model('User'),
    Race = mongoose.model('Race'),
    Years = mongoose.model('Years'),
    _ = require('underscore'),
    Midi = require('jsmidgen'),
    fs = require('fs'),
    btoa = require('btoa');

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
exports.create = function(req, res, next) {
    var symphony = new Symphony(req.body);
    symphony.user = req.user;
    Race.findOne({'year': 2011}).exec(function(err, race) {
        console.log(race);

        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var file = new Midi.File();
            var track = new Midi.Track();
            //var musicalStyles = require('../models/musicalstyles.js');
            var musicalStyle = {
                'name': 'Major',
                'roots': [0, 3, 4, 6],
                0: 'c4',
                1: 'd4',
                2: 'e4',
                3: 'f4',
                4: 'g4',
                5: 'a4',
                6: 'b4',
                7: 'c5',
                8: 'd5',
                9: 'e5'
            }
            var t;
            var bib;
            var note;
            var ts = race.timingStation.toObject();
            console.log(ts);

            file.addTrack(track);

            // for each timing station
            for (j in ts) {
                // for each set of data in the timing station
               for (i in ts[j].data) {
                    console.log(ts[j].data);
                    console.log(ts[j].data[i]);
                    console.log(ts[j].data[i].time);
                    timearray = ts[j].data[i].time.split(':');
                    console.log(timearray[0]);
                    console.log(parseInt(timearray[0]));
                    t = ((parseInt(timearray[0]) * 60 * 60 * 10) + (parseInt(timearray[1]) * 60 * 10) + (parseInt(timearray[2]) * 10))  / 1000;  // the time runner crossed divided by the speed multiplier
                    console.log(t);
                    bib = ts[j].data[i].bib % 10;   // last digit of runners bib #
                    note = musicalStyle[bib];
                    // check to see if the bib # is a root note in the musical style
                    for (k in musicalStyle.roots) {
                        if(bib == musicalStyle.roots[k]) {
                            // randomly set lower octave
                            var octave = 4 - (Math.floor((Math.random()*3)+1));
                            // cut out the note base
                            var base = note.substr(0, note.length - 1);
                            // set note to note base plus new octave
                            note = base + octave; 
                        }
                    }
                    // add the note to the midi track
                    track.addNote(0, note, t);
                }
            }
            // add the midi data to the symphony as a base64 encoded string
            symphony.midi = new String('data:audio/midi;base64,' + btoa(file.toBytes()));
            // save the symphony and display it
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
        }

    });
    
};

/**
 * Update a symphony
 */
exports.update = function(req, res) {
    var symphony = req.symphony;
    var user = req.user;

    symphony = _.extend(symphony, req.body);

    user.favorites.push(symphony._id);

    user.save(function(err) {

    });

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

exports.mine = function(req, res) {
    Symphony.find({user: req.user}).populate('user', 'name username').exec(function(err, symphonies) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
           res.jsonp(symphonies);
        }
    });
};

exports.favs = function(req, res) {
    var user = req.user;

    Symphony.find({'favorites.users': req.user}).populate('user', 'name username').exec(function(err, symphonies) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(symphonies);
        }
    });
};