function Vk() {

    this.login = function () {
        //11 == Music + friends + basic rights
        VK.Auth.login(function (response) {
            console.log(response);
        }, 11);
    }

    this.findTrack = function (track, func) {
       var key = "94ab18aba4dca3befe83dd4b239d5b5f829c53d033c4a2785a66141216ea4f465b9c69ea292b53fe03701";
       var url = "https://api.vk.com/method/audio.search?q=" + encodeURI(track.artist.name) + "-" + encodeURI(track.name) + "&access_token=" + key + "&callback=?";
       $.getJSON(url, function (r) {
            if (r.response) {

                var track_found = false;

                for (var i = 1; i < r.response.length; i++) {
                    if (r.response[i].title.toLowerCase() == track.name.toLowerCase()) {

                        func({
                            error: 0,
                            title: r.response[i].title,
                            artist: r.response[i].artist,
                            duration: r.response[i].duration,
                            url: r.response[i].url
                        });

                        track_found = true;
                        break;
                    }
                }


                if (track_found === false) {
                    func({
                        error: "vk track not found"
                    })

                    console.log(r.response);
                }

            } else {
                func({
                    error: "custom",
                    message: r
                });
            }
        });
    }

}