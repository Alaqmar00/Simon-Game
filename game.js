var buttonColor = ["red","yellow","green","blue"];
var gamePattern = [];
var userClickedPattern = [];
$(".btn").on("click",function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatepress(userChosenColor);
  checkAnswer(userClickedPattern.length-1)//red blue red yellow
});
var started = false;
var level = 0;
$(document).on("keypress",function(event){
  if(!started){
    $("#level-title").text("level" + " " + level);
    nextSequence();
    started = true
  }
});
//---------------------------------------------
function nextSequence()
{
  userClickedPattern =[];
  level++;
    $("#level-title").text("level" + " " +level);

  var randomNumber = Math.floor(Math.random()* 4);

var randomChosenColor = buttonColor[randomNumber];

gamePattern.push(randomChosenColor);
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);

}

//-----------------------------------
function playSound(name){
var audio1 = new Audio ("sounds/" + name + ".mp3");
audio1.play();
}
//--------------------------------

function animatepress(currentColor){
$("."+currentColor).addClass("pressed");
setTimeout(function(){
  $("."+currentColor).removeClass("pressed");
},100);
}
//-------------------
function checkAnswer(currentLevel1){


    if(gamePattern[currentLevel1]=== userClickedPattern[currentLevel1]){

      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else{
      var audio2 = new Audio("sounds/wrong.mp3");
      audio2.play();
      console.log("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game over , Press Any Key to Restart");
      setTimeout(function(){
          $("body").removeClass("game-over");
      },200);
      startOver();    }
  }
  //----------------
  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }
