let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = []
let gamePattern = [];
let level = 0;
let started = false;


$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  let userChoosenColour = event.target.id;
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("#level-title").css('fontSize', '2.5rem');
    $("#level-title").fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
    startOver();
  }
}


function nextSequence(){
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  $("#" + randomChoosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
  playSound(randomChoosenColour);
}


function playSound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
