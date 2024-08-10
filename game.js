var colors = ["green", "red", "yellow", "blue"];

var gamePattern = [];               //green
var userClickedPattern = [];        //green

var start = true;

var level = 0;

$(document).keypress(function() {
    if(start) {
        $("h1").text("level " + level)
        nextSequence();
        start = false;
    }
});

function nextSequence() {
    userClickedPattern = [];

    level++;

    $("h1").text("level " + level)

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNumber];

    $("#" + randomColor).fadeOut(100).fadeIn(100);
    
    /*var audio = new Audio("audio/" + randomColor + ".mp3");
    audio.play();*/

    gamePattern.push(randomColor);

    playSound(randomColor);
}

$(".box").click(function() {
    //var userChosenColor = this.id;                //  1- st way to find out id value in array
    var userChosenColor = $(this).attr("id");       //  2- nd wat to find out id value in array

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    clickedAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(colorName) {
    var audio = new Audio("audio/" + colorName + ".mp3");
    audio.play();
}

function clickedAnimation(pressedColor) {
    $("#" + pressedColor).addClass("userclick");

    setTimeout(function() {
        $("#" + pressedColor).removeClass("userclick");
    }, 100)
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("audio/wrong.mp3");
        audio.play();
        $("body").addClass("wrong");
        setTimeout(function() {
            $("body").removeClass("wrong");
        }, 200);
        $("h1").text("Game Over, Press any key to Restart");
        reStart();
    }
}

function reStart() {
    level = 0;
    gamePattern = [];
    start = true;
}