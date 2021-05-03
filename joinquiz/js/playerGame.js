var socket = io();
var playerAnswered = false;
var correct = false;
var name;
var score = 0;

var params = jQuery.deparam(window.location.search); //Gets the id from url

socket.on('connect', function() {
    //Tell server that it is host connection from game view
    socket.emit('player-join-game', params);
    document.getElementById('quizBox').style.visibility = "visible";
    document.getElementById('message').style.visibility = "hidden";
});


socket.on('noGameFound', function() {
    window.location.href = '../../joinquiz/'; //Redirect user to 'join game' page 
});

socket.on('gameQuestions', function(data) {
    document.getElementById('question').innerHTML = data.q1;
    document.getElementById('answer1').innerHTML = data.a1;
    document.getElementById('answer2').innerHTML = data.a2;
    document.getElementById('answer3').innerHTML = data.a3;
    document.getElementById('answer4').innerHTML = data.a4;

    document.getElementById('questionnum').innerHTML = data.questionnum;
    document.getElementById('totalquesnum').innerHTML = data.totalquesnum;

});

function answerSubmitted(num) {
    if (playerAnswered == false) {
        playerAnswered = true;

        socket.emit('playerAnswer', num); //Sends player answer to server

        //Hiding buttons from user
        for (var i = 1; i <= 4; i++) {
            if (i == num) {

                document.getElementById('icon' + num).innerHTML = '<i class="far fa-check-circle"></i>';
            } else {

                document.getElementById('icon' + i).innerHTML = '<i class="far fa-times-circle"></i>';
            }
        }

        document.getElementById('quizBox').style.visibility = "hidden";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Answer Submitted! Waiting on other players...";

    }
}

//Get results on last question
socket.on('answerResult', function(data) {
    if (data == true) {
        correct = true;
    }
});

socket.on('questionOver', function(data) {
    if (correct == true) {
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Correct!";
    } else {
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Incorrect!";
    }
    for (var i = 1; i <= 4; i++) {
        document.getElementById('icon' + i).innerHTML = '';

    }
    document.getElementById('quizBox').style.visibility = "hidden";
    socket.emit('getScore');
});

socket.on('newScore', function(data) {
    document.getElementById('scoreText').innerHTML = "Score: " + data;
});

socket.on('nextQuestionPlayer', function() {
    correct = false;
    playerAnswered = false;


    socket.on('gameQuestions', function(data) {
        document.getElementById('question').innerHTML = data.q1;
        document.getElementById('answer1').innerHTML = data.a1;
        document.getElementById('answer2').innerHTML = data.a2;
        document.getElementById('answer3').innerHTML = data.a3;
        document.getElementById('answer4').innerHTML = data.a4;

        document.getElementById('questionnum').innerHTML = data.questionnum;
        document.getElementById('totalquesnum').innerHTML = data.totalquesnum;

    });

    document.getElementById('quizBox').style.visibility = "visible";
    document.getElementById('message').style.display = "none";

});

socket.on('hostDisconnect', function() {
    window.location.href = "../../joinquiz/";
});

socket.on('playerGameData', function(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].playerId == socket.id) {
            document.getElementById('nameText').innerHTML = "Name: " + data[i].name;
            document.getElementById('scoreText').innerHTML = "Score: " + data[i].gameData.score;
        }
    }
});

socket.on('GameOver', function() {
    document.getElementById('quizBox').style.visibility = "hidden";
    document.getElementById('message').style.display = "block";
    document.getElementById('message').innerHTML = "GAME OVER";
});