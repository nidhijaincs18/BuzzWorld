$("#Designing-quiz").click(function() {
    $("#working-h1").text("Designing");
    $("#working-p").text("The quiz host composes the questions, adds images or videos, and sets the parameters, such as the number of prize winners or the time to submit the answer.");
    $(".working-link-content").css("background-image", "url('images/1_eCMbgfmHhl51ZOjda0AAPA.png')");
    $(".working-links li").removeClass("active");
    $(this).addClass("active");
});
$("#Inviting-Player").click(function() {
    $("#working-h1").text("Inviting players");
    $("#working-p").text("After the quiz is all set, the host receives a unique digital code for their game. They can share this code with their audience on social media, or by any preferred means. A direct link to the game can be also used instead of the code.");
    $(".working-link-content").css("background-image", "url('images/online-learning-vector-illustration-study-home-brunette-teacher-with-dark-skin-teaches-children_255592-64.jpg')");
    $(".working-links li").removeClass("active");
    $(this).addClass("active");
});
$("#Join-quiz").click(function() {
    $("#working-h1").text("Join the Quiz");
    $("#working-p").text("To join the game, participants enter the digital code at the myQuiz website or proceed to the direct link on their mobile devices or PCs");
    $(".working-link-content").css("background-image", "url('images/flat-speech-bubble-with-question-marks_23-2148148274.jpg')");
    $(".working-links li").removeClass("active");
    $(this).addClass("active");
});
$("#Play-game").click(function() {
    $("#working-h1").text("Playing the game");
    $("#working-p").text("The host launches the game. The players see the questions and the answer options on their mobile devices and click on the chosen answer.");
    $(".working-link-content").css("background-image", "url('images/purple-background-with-quiz-word-colorful-people_52683-126.jpg')");
    $(".working-links li").removeClass("active");
    $(this).addClass("active");
});
$("#Leaderboard").click(function() {
    $("#working-h1").text("Leaderboard");
    $("#working-p").text("Players get points for correct answers. The leaderboard is displayed after each question to track top players’ progress.");
    $(".working-link-content").css("background-image", "url('images/leaderboard.jpg')");
    $(".working-links li").removeClass("active");
    $(this).addClass("active");
});
$("#Scoring").click(function() {
    $("#working-h1").text("Rewarding");
    $("#working-p").text("At the end of the game, the leaderboard is displayed so everyone can see the winning players and their score. Each winner gets a keyword to redeem a reward.");
    $(".working-link-content").css("background-image", "url('images/assessment-6078645_1280.png')");
    $(".working-links li").removeClass("active");
    $(this).addClass("active");
});