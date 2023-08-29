// alert("welcome");
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function nextSequence(){
  userClickedPattern = [];
  
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// press any key to start the game
$(document).keydown(function(event){
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
});

// this is the user clicked pattern function
$(".btn").click(function(event){
  
       userChosenColour = $(event.target).attr("id");
       userClickedPattern.push(userChosenColour);
       playSound(userChosenColour);
       animatePress(userChosenColour);
       checkAnswer(userClickedPattern.length-1);
});



// play the sound
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// add an animation
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
// check the user answer in comparision with the computer answer

function checkAnswer(currentLevel){
 
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length == userClickedPattern.length){
             setTimeout(function(event){
                nextSequence();
             },1000);
        }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    
    // when the game over we run this function to start the game from start
    startOver();

    $("h1").html("Game Over, press any key to restart");
    
    setTimeout(function(event){
      $("body").removeClass("game-over")
    },200);
    
  }
}

function startOver(){
     level= 0;
     started = false;
     gamePattern = [];
}



