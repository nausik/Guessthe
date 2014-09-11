function Lastfm() {
    this.cache = new LastFMCache();
    this.connection = new LastFM({
        apiKey: '4519cf1957867d0ef1c8fafb92732a21',
        apiSecret: '622288f92bdbe7b2cedddbdeeef832ea',
        cache: this.cache
    });


    this.getByArtist = function (artist_name, func) {
        this.connection.artist.getTopTracks({
            artist: artist_name,
            autocorrect: 1,
            page: 0
        }, {
            success: function (data) {
                var tracks_number = data.toptracks.track.length;
                var track_names = [];
                var return_object = {
                    error: 0,
                    tracks: null
                };

                //We have 4 different answers, so 4 tracks minimum

                if (tracks_number > 4) {
                    var unique_track_numbers = [];
                    for (var i = 0; i < tracks_number; i++) {
                        unique_track_numbers[i] = i;
                    }

                    //Shuffle the array, so we we'll have 4 random tracks in the beggining of array
                    unique_track_numbers = unique_track_numbers.shuffle();

                    for (var i = 0; i < unique_track_numbers.length; i++) {
                        if (track_names.indexOf(data.toptracks.track[unique_track_numbers[i]]) === -1) {
                            track_names.push(data.toptracks.track[unique_track_numbers[i]]);
                        }

                        if (track_names.length === 4) {
                            break;
                        }
                    }
                    if (track_names.length == 4) {
                        return_object.error = 0;
                        return_object.tracks = track_names.slice(0);
                        //Couldn't find 50 unique tracks
                    } else {
                        return_object.error = "few unique";
                    }
                } else {
                    //Couldn't find 4 tracks
                    return_object.error = "few tracks";
                }

                func(return_object);
            },
            error: function (code, message) {
                func({
                    error: "no artist"
                });
            }
        });
    }

    this.getUserArtists = function (username, func) {
        this.connection.user.getTopArtists({
            user: username,
            limit: 100,
            page: 0
        }, {
            success: function (data) {
                func(data);
            },
            error: function (code, message) {
                func({
                    error: "no user"
                });
            }
        });
    }

    this.getUserArtistTracks = function (username, artist_name, func) {
        this.connection.user.getArtistTracks({
            user: username,
            artist: artist_name,
            autocorrect: 1,
            page: 0
        }, {
            success: function (data) {
                console.log(data);
                var tracks_number = data.artisttracks.track.length;
                var track_names = [];
                var return_object = {
                    error: 0,
                    tracks: null
                };

                //We have 4 different answers, so 4 tracks minimum

                if (tracks_number > 4) {
                    var unique_track_numbers = [];
                    for (var i = 0; i < tracks_number; i++) {
                        unique_track_numbers[i] = i;
                    }

                    //Shuffle the array, so we we'll have 4 random tracks in the beggining of array
                    unique_track_numbers = unique_track_numbers.shuffle();

                    for (var i = 0; i < unique_track_numbers.length; i++) {
                        if (track_names.indexOf(data.artisttracks.track[unique_track_numbers[i]]) === -1) {
                            track_names.push(data.artisttracks.track[unique_track_numbers[i]]);
                        }

                        if (track_names.length === 4) {
                            break;
                        }
                    }
                    if (track_names.length == 4) {
                        return_object.error = 0;
                        return_object.tracks = track_names.slice(0);
                        //Couldn't find 50 unique tracks
                    } else {
                        return_object.error = "few unique";
                    }
                } else {
                    //Couldn't find 4 tracks
                    return_object.error = "few tracks";
                }

                func(return_object);
            },
            error: function (code, message) {
                console.log(code);
                //6 === user not found
                if (code === 6){
                    func({
                        error: "no artist"
                    });

                } else {
                    func({
                        error: "no user"
                    });
                }
                
            }
        });
    }

    this.getUserInfo = function(username, func){

        this.connection.user.getInfo({
            user: username
        }, {
            success: function (data) {
                func(data);
            },
            error: function (code, message) {
                func({error: "no user"});
            }
        });
    }

}