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
    Race.findOne({'year': symphony.year}).exec(function(err, race) {
        console.log(race);

        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log(symphony.melody.melodyType);
            var file = new Midi.File();
            var track = new Midi.Track();
            //var musicalStyles = require('../models/musicalstyles.js');  // couldnt get this to pull from external file
            // these are the available musical styles
            var musicalStyles = [];
            musicalStyles['Minor'] = {
                'name': 'Minor',
                'roots': [0, 4, 5, 8],
                0: 'c4',
                1: 'd4',
                2: 'd#4',
                3: 'f4',
                4: 'g4',
                5: 'g#4',
                6: 'a#4',
                7: 'c5',
                8: 'a#5',
                9: 'g5'
            };
            musicalStyles['Major'] = {
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
                8: 'f5',
                9: 'g5'
            };
            musicalStyles['Chromatic'] = { 
                'name': 'Chromatic',
                'roots': [0,1,2,3,4,5,6,7,8,9],
                0: 'c4',
                1: 'c#4',
                2: 'd4',
                3: 'd#4',
                4: 'f4',
                5: 'f#4',
                6: 'g#4',
                7: 'a4',
                8: 'a#4',
                9: 'b4'
            };
            // set the musicalStyle to the users choice
            var musicalStyle = musicalStyles[symphony.melody.melodyType];
            var t;  // for holding the note delay time (aka the time runner crosses in midi ticks)
            var bib; // this is the runners bib number, the last digit of which determines the note
            var note;  // this is the note to be played
            var ts = race.timingStation.toObject();  // this is the timingstation from the doc converted to an object
                                                    // which i had to do to be able to loop through it as an array
            var onlyone = false; // this is if only one timing station is selected
            //console.log(ts);
            console.log(symphony.speed);

            file.addTrack(track);   // add a track to the midi file
            //track.setTempo(120);    // set the track tempo to 120bpm (pop standard)

            // if there is only one timing station being used, this will be used to eliminate the long silence until the first runner arrives
            if (ts.length == 1) {
                onlyone = true;
                timearray = ts[0].data[0].time.split(':');
                var firstnote = ((parseInt(timearray[0]) * 60 * 60) + (parseInt(timearray[1]) * 60) + (parseInt(timearray[2]))) * 128;
                console.log('first note val: ' + firstnote);
            }

            // for each timing station
            for (j in ts) {
                // delay of previous note
                var prev = 0;
                // for each set of data in the timing station
               for (i in ts[j].data) {
                    //console.log(ts[j].data[i].time);
                    timearray = ts[j].data[i].time.split(':');
                    //console.log(timearray[0]);
                    //console.log(parseInt(timearray[0]));
                    
                    // set to to the time the runner crossed in seconds times 128 ticks per beat
                    t = (((parseInt(timearray[0]) * 60 * 60) + (parseInt(timearray[1]) * 60) + (parseInt(timearray[2])))) * 128;
                    if (onlyone) {
                        console.log('only one timing station')
                        t = t - firstnote;
                    }  
                    t = t * 2; // times 2 beats per second
                    t = t / symphony.speed; // the time runner crossed divided by the speed multiplier
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
                    // add the note to the midi track on channel zero, the note variable, hold for a quarter note, delay t ticks minus the previous delay
                    track.addNote(0, note, 128, t - prev);
                    // set previous to current delay
                    prev = t;
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