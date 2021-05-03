// getting all required elements
const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = document.querySelector(".buttons .exit");
const continue_btn = document.querySelector(".buttons .continue");
const quiz_box = document.querySelector(".quiz-box");
const next_btn = document.querySelector(".next-btn")
const option_list = document.querySelector(".option-list");
const timeCount = quiz_box.querySelector(".timer .timer-sec");
const timeLine = quiz_box.querySelector(".time-line");
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".restart");
const quit_quiz = result_box.querySelector(".quit");

//If start quiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
    //show the info box
}


//If exit  button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide the info box
}


//If continue  button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); // show the quiz box
    showQuestions(0);
    startTimer(timeValue);
    startTimerLine(widthValue);
    shuffleArray(window.questions);
}


window.score = 0;
let counter;
let counterLine;
let que_count = 0;
let timeValue = 20;
let widthValue = 100;
let tickIcon = '<div class="icon tick"><i class="far fa-check-circle"></i></div>';
let crossIcon = '<div class="icon tick"><i class="far fa-times-circle"></i></div>';


function getParams() {
    var idx = document.URL.indexOf('?');
    var params = new Array();
    if (idx != -1) {
        var pairs = document.URL.substring(idx + 1, document.URL.length).split('&');
        for (var i = 0; i < pairs.length; i++) {
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = nameVal[1];
        }
    }
    return params;
}
var params = getParams();
var name = unescape(params["name"]);
var topic = unescape(params["topic"]);
document.querySelector(".quiz-title").innerHTML = topic;


$.getJSON("webScrappedFiles/" + window.name + ".json", function(data) {
    window.questions = data;
});

quit_quiz.onclick = () => {
    window.location.href = "../";
}

restart_quiz.onclick = () => {
    shuffleArray(window.questions);
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    window.score = 0;
    counter;
    counterLine;
    que_count = 0;
    timeValue = 20;
    widthValue = 100;
    showQuestions(0);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    for (let j = 0; j < 4; j++) {
        option_list.children[j].classList.remove("disabled");
        option_list.children[j].classList.remove("correct");
        option_list.children[j].classList.remove("incorrect");
    }
}

function showQuestions(index) {

    document.querySelector("#questionnum").innerHTML = que_count + 1;
    document.querySelector("#totalquesnum").innerHTML = questions.length;
    // getting questions and options from array
    if (que_count == questions.length - 1) {
        next_btn.innerHTML = "Finish Quiz";
    }
    document.querySelector(".que-text").innerHTML = '<span>' + window.questions[index].question + '</span>';
    document.querySelector(".option1").innerHTML = '<span>' + window.questions[index].option1 + '</span>';
    document.querySelector(".option2").innerHTML = '<span>' + window.questions[index].option2 + '</span>';
    document.querySelector(".option3").innerHTML = '<span>' + window.questions[index].option3 + '</span>';
    document.querySelector(".option4").innerHTML = '<span>' + window.questions[index].option4 + '</span>';


    const option = document.querySelectorAll(".option");
    for (var i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }


}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    var userans = answer.textContent.trim();
    var crrctans = window.questions[que_count].answer;

    if (userans == crrctans) {
        answer.classList.add("correct");
        window.score++;
        answer.insertAdjacentHTML("beforeend", tickIcon);

    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        for (let j = 0; j < 4; j++) {
            if (option_list.children[j].textContent.trim() == crrctans) {
                option_list.children[j].classList.add("correct");
                option_list.children[j].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    //disable all other options after user selects the answer
    for (let j = 0; j < 4; j++) {
        option_list.children[j].classList.add("disabled");
    }
    next_btn.style.display = "block";
    console.log(window.score);
}
next_btn.onclick = () => {
    if (que_count < window.questions.length - 1) {
        que_count++;
        for (let j = 0; j < 4; j++) {
            option_list.children[j].classList.remove("disabled");
            option_list.children[j].classList.remove("correct");
            option_list.children[j].classList.remove("incorrect");
        }
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
    } else {
        showResultBox();
        console.log("Questions completed");
    }

}


function showResultBox() {
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box
    result_box.classList.add("activeResult"); // show the result box
    if (window.score == window.questions.length) {
        document.querySelector("#greet").innerHTML = "Congrats!! ";
        document.querySelector("#greet").style.color = "#016666";
    } else if (window.score <= parseInt(window.questions.length / 2)) {
        document.querySelector("#greet").innerHTML = "and sorry, ";
    } else {
        document.querySelector("#greet").innerHTML = "and nice, ";
    }

    document.querySelector("#score").innerHTML = window.score;
    document.querySelector(".totalquesnum").innerHTML = window.questions.length;


}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            for (let j = 0; j < 4; j++) {
                option_list.children[j].classList.add("disabled");
            }
        }

    }
    timeCount.textContent = 20;
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 53);

    function timer() {
        time -= .25;
        timeLine.style.width = time + "%";
        if (time < 0) {
            clearInterval(counterLine);
            for (let j = 0; j < 4; j++) {
                option_list.children[j].classList.add("disabled");
            }
        }
        if (time < 30) {
            timeLine.style.backgroundColor = "red";
        }
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {


        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}