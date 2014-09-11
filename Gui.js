function displayAnswers(tracks){
        var track_numbers = [];
        for (var i = 0; i < 4; i++) {
            track_numbers[i] = i;
        }

        track_numbers = track_numbers.shuffle();

        for (var i = 0; i < 4; i++) {
            $('#track_' + i + '_name')
                .text(tracks[track_numbers[i]].name.trimToLength(25))
        }
}

function updateHintsCount(hints_number){
          $('#hints_left').text(hints_number);
          if(hints_number === 0){
            hideAllHints();
          }
        }

function hideAnswers(){
    $('#answer_buttons').hide('fast');
}

function showAnswers(){
    $('#answer_buttons').show('fast');
}

function updateScore(current_score){
    $('#current_score').text(current_score);
}

function newSongShowHints(){
    $('#hints_buttons').show('fast');
}

function rightSongHintsHide(){
    $('#hints_buttons').hide('fast');
}

function hideAllHints(){
    $('#hints_menu').hide('fast');
}

function showAllHints(){
    $('#hints_menu').show('fast');
}

function resetSongUI(hints_number){
    $('#wrong_answer_message').hide('fast');
    $('#right_answer_message').hide('fast');
    if(hints_number === 0){
        hideAllhintes();
    } else {
        showAllHints();
    }
}

function updateTries(tries_number){
    $('#tries_left').text(tries_number);
}