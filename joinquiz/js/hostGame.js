var socket = io();

var params = jQuery.deparam(window.location.search); //Gets the id from url

var timer;

var time = 10;
var quesnum = 1;
var total = 0;
var temp = false;
var temp1 = false;
//When host connects to server
socket.on('connect', function() {

    //Tell server that it is host connection from game view
    socket.emit('host-join-game', params);
});

socket.on('noGameFound', function() {
    window.location.href = '../../'; //Redirect user to 'join game' page
});

socket.on('gameQuestions', function(data) {
    document.getElementById('question').innerHTML = data.q1;
    document.getElementById('answer1').innerHTML = data.a1;
    document.getElementById('answer2').innerHTML = data.a2;
    document.getElementById('answer3').innerHTML = data.a3;
    document.getElementById('answer4').innerHTML = data.a4;
    var correctAnswer = data.correct;
    document.getElementById("name").innerHTML = data.name;

    document.getElementById('playersAnswered').innerHTML = "0 / " + data.playersInGame;
    if (!temp1) {
        quesnum = document.getElementById('questionnum').innerHTML = data.questionnum;
        temp1 = true;
    }
    if (!temp) {
        total = document.getElementById('totalquesnum').innerHTML = data.totalquesnum;
        temp = true;
    }

    updateTimer();
});


socket.on('updatePlayersAnswered', function(data) {
    document.getElementById('playersAnswered').innerHTML = data.playersAnswered + " / " + data.playersInGame;
});

socket.on('questionOver', function(playerData, correct) {
    clearInterval(timer);

    document.getElementById('nextQButton').style.display = "block";
    console.log(correct);
    for (var i = 1; i <= 4; i++) {
        if (i == parseInt(correct)) {

            document.getElementById('icon' + parseInt(correct)).innerHTML = '<i class="far fa-check-circle"></i>';
        } else {

            document.getElementById('icon' + i).innerHTML = '<i class="far fa-times-circle"></i>';
        }
    }

});

function nextQuestion() {
    document.getElementById('num').innerHTML = " 10";
    socket.emit('nextQuestion'); //Tell server to start new question
    for (var i = 1; i <= 4; i++) {
        document.getElementById('icon' + i).innerHTML = '';

    }
    document.getElementById('nextQButton').style.display = "none";

    if (temp1) {
        document.getElementById('questionnum').innerHTML = ++quesnum;
    }
    if (quesnum == total) {
        document.getElementById('nextQButton').innerHTML = "Finish Quiz";
    }
}

function updateTimer() {
    time = 10;
    timer = setInterval(function() {
        time -= 1;
        document.getElementById('num').textContent = " " + time;
        if (time == 0) {
            socket.emit('timeUp');
        }
    }, 1000);
}
socket.on('GameOver', function(data) {
    document.getElementById('timerText').innerHTML = "";
    document.getElementById('quizBox').style.display = "none";
    document.getElementById('question').innerHTML = "GAME OVER";
    document.getElementById('playersAnswer').innerHTML = "";
    document.getElementById('winners').style.display = "block";

    document.getElementById('winner1').innerHTML = "1. " + data.num1;
    document.getElementById('winner2').innerHTML = "2. " + data.num2;
    document.getElementById('winner3').innerHTML = "3. " + data.num3;
    document.getElementById('winner4').innerHTML = "4. " + data.num4;
    document.getElementById('winner5').innerHTML = "5. " + data.num5;
});



socket.on('getTime', function(player) {
    socket.emit('time', {
        player: player,
        time: time
    });
});