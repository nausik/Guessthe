function Game(game_params){
	this.current_track = "";
	this.current_artist= "";
	this.current_user = "";
	this.artist = true;
	this.tries_left = 3;
	this.hints_left = 3;
	this.right_answers = 0;
	//Game modes: 0 - no user
	//            1 - has user, set artist
	//            2 - has user, random artist
	//            3 - has user, loved tracks
	this.game_mode = 0;
	this.current_answer = false;

    if(game_params.hasOwnProperty('artist')){
        this.artist = game_params.artist;
    }

    if (game_params.hasOwnProperty('game_mode')){
    	this.game_mode = game_params.game_mode;
    }

    //check if we're playing from the artist
    this.isArtist = function(){
       return this.artist;
    }

    this.getCurrentArtist = function(){
    	return this.current_artist;
    }

    this.getCurrentTrack = function(){
    	return this.current_track;
    }

	this.setNewTrack = function(new_track, answer_is_right){
				this.current_track = new_track;
		        this.tries_left = 3;
	}

	this.canSetNewTrack = function(answer_is_right){
		var return_result = {error: 0, result: false};
		if(!answer_is_right){
			return_result = this.useHint();
		} else {
			return {error: 0, result: true};
		}

		return return_result;
	}

    this.setUser = function(user){
    	this.current_user = user;
    }

    this.getUser = function(){
    	return this.current_user;
    }

    this.setArtist = function(artist_or_user){
    	this.current_artist = artist_or_user;
    }

    this.toggleArtist = function(){
    	this.artist = !this.artist;
    }
    
	this.useHint = function(){
		var result = {error: 0, result: false}

	    if(this.hints_left > 0){
		   this.hints_left-=1;
		   result.result = true;
	    }
	    else{
		   result.error = 'no hints';
	    }

	    return result;
	}

	this.hintsNumber = function(){
        return this.hints_left;
	}

	this.currentAnswer = function(){
		return this.current_answer;
	}

	this.checkAnswer = function(answer, endGame){
		var result = {error: 0, answer: 'wrong answer'};

		if(this.tries_left > 0){
		    if(answer === this.current_track){
		    	this.right_answers+=1;
		    	result.answer = 'right answer';
		    } else { 
		        result.answer = 'wrong answer';
	        }

	        this.tries_left-=1;

	        if(this.tries_left === 0){
	        	this.endGame();
	        }
	    }
	    else{
	    	result.error = "no tries";
	    }

	    return result
    }

    this.triesLeft = function(){
    	return this.tries_left;
    }

    this.currentScore = function(){
    	return this.right_answers;
    }

    this.setCurrentAnswer = function(answer){
    	this.current_answer = answer;
    }
}