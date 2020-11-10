// Click On Start /Reset
// If playing => Reset game
// else => Start Game
var play = false;
var score;
var action;
var timer;
var ans;

document.getElementById('start').onclick = function(){
  if(play==true){
    location.reload();
  }
  else{
    play = true; // changing mode to play mode
    score=0;
    document.getElementById('value').innerHTML = score;
    show("timer");
    timer = 10;
    document.getElementById('count').innerHTML = timer;
    hide('gameover');
    document.getElementById('start').innerHTML = "Reset Game";
    countdown();
    //Q&A timing
    generate();
  }
}

//Checking the answers
for(i=1;i<5;i++){
  document.getElementById('c'+i).onclick = function(){
    //check game is going on or not
    if(play==true){
      if(this.innerHTML == ans){
        score ++;
        document.getElementById('value').innerHTML = score;
        hide("wrong");
        show("correct")
        setTimeout(function(){
          hide("correct")
        },1000);

        //Generate new questions
        generate();
        timer = 10;
      }//nested if
      else{
        hide("correct");
        show("wrong")
        setTimeout(function(){
          hide("wrong")
        },1000)
        timer=1;
      }
    }//first if
  }

}



//-------------------- FUnctions---------------------
//Counter
function countdown(){
  action = setInterval(function(){
    timer -=1;
    document.getElementById('count').innerHTML = timer;
    if(timer==0){
      //GAME OVER
      stop();
      show('gameover');
      document.getElementById('gameover').innerHTML="<p>game over!</p><p> your score is " + score +".</p>";
      hide("timer");
      hide("correct");
      hide("wrong");
      play=false;
      document.getElementById('start').innerHTML = "Play Again";
    }
  },1000);
}

function stop(){
  clearInterval(action);
}

//hide elements
function hide(id){
  document.getElementById(id).style.display="none";
}

//show elements
function show(id){
  document.getElementById(id).style.display="block";
}

//Generating the questions
function generate(){
   var x= 1+ Math.round(19*Math.random());
   var y= 1+ Math.round(19*Math.random());
   ans = x*y;
   document.getElementById('questions').innerHTML=x+"x"+y;
   var pos = 1+ Math.round(3*Math.random());
   document.getElementById('c'+pos).innerHTML=ans;
   //creating array of answers
   var answer = [ans];
   // filling other box with wrong answer
   for(i=1; i<5; i++){
     if(i!=pos){
       var wans;
       do{
         var a= 1+ Math.round(19*Math.random());
         var b= 1+ Math.round(19*Math.random());
         wans= a*b;
       }while(answer.indexOf(wans)!=-1)

       //adding the wrong answer in array
       answer.push(wans);
       document.getElementById('c'+i).innerHTML=wans;
     }
   }
}
