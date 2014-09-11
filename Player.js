function Player(element) {
    this.element = element;
    this.status = false;
    this.boundaries = {
        start: 0,
        end: 0
    };
    this.duration;

    this.changeTrack = function (url, duration) {
        this.pauseTrack();
        element.src = url;
        element.load();
        this.duration = duration;
    }

    this.playTrack = function () {
        this.status = true;
        element.play();
    }

    this.pauseTrack = function () {
        this.status = false;
        element.pause();


        //Reset currenttime
        if (this.element.readyState !== 0) {
            this.element.currentTime = this.boundaries.start;
        }

    }

    this.getRandomBoundaries = function (length) {
        var segment_start = getRandomArbitrary(0, this.duration - length);
        var segment_end = segment_start + length;
        return {
            start: segment_start,
            end: segment_end
        };
    }

    this.setNewBoundaries = function (new_boundaries) {
        //Probably worst method ever
        var player = this;

        player.boundaries.start = new_boundaries.start;
        player.boundaries.end = new_boundaries.end;

        //We can't set curretTime when readystate === 0 and it's equal to 0 only when the track loaded. So if it's equals to zero
        //We'll have to set currentTime through eventListener
        if (player.element.readyState === 0) {
            player.element.addEventListener('canplay', function () {
                player.element.currentTime = player.boundaries.start;
            }, false);
        } else {
            player.element.currentTime = player.boundaries.start;
        }

        //Set end boundary
        player.element.addEventListener('timeupdate', function () {
            if (player.element.currentTime >= player.boundaries.end) {
                player.pauseTrack();
            }
        }, false);
    }
}