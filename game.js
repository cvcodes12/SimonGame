var buttonColours = ["red","blue","green","yellow"]
var gamePattern = []
var userClickedPattern = []
var started = false;
var level = 0;
$('.btn').click(function(){
    var userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern)
    playSound(userChosenColour)
    $('#'+userChosenColour).addClass("pressed")
    setTimeout(function () {
        $('#'+userChosenColour).removeClass("pressed");

    },100)
    checkAnswer(userClickedPattern.length-1)
    
});
function nextSequence(){
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
//nextSequence()

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();

}

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
   
});

function checkAnswer (currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
     else {
      console.log("wrong");
      playSound("wrong");
      $('body').addClass("game-over")
    setTimeout(function () {
        $('body').removeClass("game-over");
    },100);
    $("#level-title").text("Game Over, Press any key to restart");
    startOver()
    }

}

function startOver(){
    level = 0;
    gamePattern = []
    started = false
}