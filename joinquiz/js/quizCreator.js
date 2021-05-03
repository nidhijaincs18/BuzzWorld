var socket = io();
$.getJSON("AvattoNetworkingQuestions2.json", function(data) {
    var doc = '';
    var count = 1;
    $.each(data, function(key, value) {

        doc += '<div class="question"> <div class="header">';

        doc += '<div><p>Q' + count + ".  <span class='ques'>" +
            value.question + '</span></p></div><button class="addbtn"><i class="fas fa-plus "></i> Add</button></div>';
        doc += ' <div class="body">';
        doc += '<div class="answers option1"><p> A. ' +
            value.option1 + '</p></div>';

        doc += '<div class="answers option2"><p> B. ' +
            value.option2 + '</p></div>';

        doc += '<div class="answers option3"><p> C. ' +
            value.option3 + '</p></div>';

        doc += '<div class="answers option4"><p> D. ' +
            value.option4 + '</p></div></div>';
        doc += '<div class="footer"><div class="crrctanswer">'
        doc += '<p>' +
            value.answer + '</p></div></div>';

        doc += '</div>';


        $('#predefined').append(doc);
        doc = '';
        count++;
    });
});
var quesarr = new Array();

$("#add-question").click(function() {
    var question = $('#question').val();
    var option1 = $('#option1').val();
    var option2 = $('#option2').val();
    var option3 = $('#option3').val();
    var option4 = $('#option4').val();
    var answer = $('input[name="answer"]:checked').val();
    let valid = true;
    $('[required]').each(function() {
        if ($(this).is(':invalid') || !$(this).val()) valid = false;
    })
    if (!valid) {
        alert("Please Fill all the Fields!");
        $("#add-question").removeAttr('data-dismiss');
    } else {
        $("#add-question").attr('data-dismiss', 'modal');
    };
    if (answer == "Option: A") {
        ans = "1";
    } else if (answer == "Option: B") {
        ans = "2";
    } else if (answer == "Option: C") {
        ans = "3";
    } else {
        ans = "4";
    }


    var doc = '';
    if (question != '' && answer != '' && option1 != '' && option2 != '' && option3 != '' && option4 != '') {
        var temp = false;
        $(quesarr).each(function(key, value) {
            if (value.question == question) {
                temp = true;
                return false;
            }
        });
        // Add new data to localStorage Array
        if (!temp) {


            quesarr.push({ "question": question, "answers": [option1, option2, option3, option4], "correct": ans });
            $('#question').val("");
            $('#option1').val("");
            $('#option2').val("");
            $('#option3').val("");
            $('#option4').val("");
            $('input[name="answer"]').each(function() { this.checked = false; });

            doc += '<div class="question"> <div class="header">';

            doc += '<div><p>Q' + quesarr.length + ".  " +
                question + '</p></div><button class="deletebutton"><i class="fas fa-trash"></i> Delete</button></div>';
            doc += ' <div class="body">';
            doc += '<div class="answers"><p> A. ' +
                option1 + '</p></div>';

            doc += '<div class="answers"><p> B. ' +
                option2 + '</p></div>';

            doc += '<div class="answers"><p> C. ' +
                option3 + '</p></div>';

            doc += '<div class="answers"><p> D. ' +
                option4 + '</p></div></div>';
            doc += '<div class="footer"><div class="crrctanswer">'
            doc += '<p>' +
                answer + '</p></div></div>';

            doc += '</div>';
            $('#selected-ques').append(doc);

            doc = '';
        }

    }
    if (quesarr.length >= 5) {
        $("#submitbtn").css("display", "flex");
    } else {
        $("#submitbtn").css("display", "none");
    }

});

$('body').on('click', '.addbtn', function() {

    var question = $(this).closest('.question').find('.ques').text();
    var option1 = $(this).closest('.question').find('.option1').text().substring(3);
    var option2 = $(this).closest('.question').find('.option2').text().substring(3);
    var option3 = $(this).closest('.question').find('.option3').text().substring(3);
    var option4 = $(this).closest('.question').find('.option4').text().substring(3);
    var answer = $(this).closest('.question').find('.crrctanswer').text();
    if (answer == "Option: A") {
        ans = "1";
    } else if (answer == "Option: B") {
        ans = "2";
    } else if (answer == "Option: C") {
        ans = "3";
    } else {
        ans = "4";
    }


    var temp = false;
    $(quesarr).each(function(key, value) {
        if (value.question == question) {
            temp = true;
            return false;
        }
    });
    // Add new data to localStorage Array
    if (!temp) {
        var doc = '';
        doc += '<div class="question"> <div class="header">';

        doc += '<div><p>Q' + (quesarr.length + 1) + ".  " +
            question + '</p></div><button class="deletebutton"><i class="fas fa-trash"></i> Delete</button></div>';
        doc += ' <div class="body">';
        doc += '<div class="answers"><p> A. ' +
            option1 + '</p></div>';

        doc += '<div class="answers"><p> B. ' +
            option2 + '</p></div>';

        doc += '<div class="answers"><p> C. ' +
            option3 + '</p></div>';

        doc += '<div class="answers"><p> D. ' +
            option4 + '</p></div></div>';
        doc += '<div class="footer"><div class="crrctanswer">'
        doc += '<p>' +
            answer + '</p></div></div>';

        doc += '</div>';
        $('#selected-ques').append(doc);

        doc = '';
        quesarr.push({ "question": question, "answers": [option1, option2, option3, option4], "correct": ans });
        console.log(quesarr);
    }
    if (quesarr.length >= 5) {
        $("#submitbtn").css("display", "flex");
    } else {
        $("#submitbtn").css("display", "none");
    }

});

$('body').on('click', '.deletebutton', function() {
    var parentChildernCount = $(this).parent().parent().parent().find('.question').length;
    console.log(parentChildernCount);
    var elementIndex = $(this).closest('.question').index();
    console.log(elementIndex);
    $(this).closest('.question').remove();
    quesarr.splice(elementIndex, 1);
    console.log(quesarr);
    if (quesarr.length >= 5) {
        $("#submitbtn").css("display", "flex");
    } else {
        $("#submitbtn").css("display", "none");
    }
});

function updateDatabase() {
    localStorage.setItem("questions", JSON.stringify(quesarr));
    var name = $('#title').val();
    var quiz = { id: 0, "name": name, "questions": quesarr };
    console.log(quiz);
    socket.emit('newQuiz', quiz);
}
//Called when user wants to exit quiz creator
function cancelQuiz() {
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        window.location.href = "../";

    }
}

socket.on('startGameFromCreator', function(data) {
    window.location.href = "../../host/?id=" + data;
});