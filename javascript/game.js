// var time = [1, 5, 0];
var start;
var Game = {
  start: null,
  hours: 1,
  minutes: 5,
  seconds: 0,
  score: 0,
  lives: 3,
  round: 0,
  lettersUsed: "",
  hints: ["An ____ a Day will keep the Doctor Away.", "\"_____ is the new Black\"", "Category: Fruit"],
  words: [["fruits", "apple", "orange", "banana"],["animals", "dog", "cat", "mouse"],["colors", "red" ,"yellow", "blue"]],
  currentWord: "",
  currentDisplay: "_ ",

  chooseRandomWord: function () {
    var temp = Math.floor(Math.random() * 3);
    this.currentWord = this.words[temp][Math.floor(Math.random() * 3) + 1];
    console.log("Chosen Word: " + this.currentWord);
    for (var i = 0; i < this.currentWord.length-1; i++) {
      this.currentDisplay = this.currentDisplay + "_ ";
    }
    document.getElementById("Display").textContent = this.currentDisplay;
    document.getElementById("Category").textContent = "Category: " + this.words[temp][0];
  }
};

window.onload = function(){

  document.getElementById("Restart").style.display = "none";
  //Volume Adjustments
  document.getElementById("Jigsaw").volume = 0.4;
  document.getElementById("AudioEasy").volume = 0.4;
  document.getElementById("AudioMedium").volume = 0.4;
  document.getElementById("AudioHard").volume = 0.4;
  document.getElementById("Tick").volume = 1.0;
  document.getElementById("Beep").volume = 0.1;

  document.getElementById("Jigsaw").onended = function() {
    Game.start = false;
  }

  document.getElementById("Easy").onmouseup = function() {
    if (Game.start === false) {
      Game.start = true;
      document.getElementById("AudioEasy").play();
      Game.lives = 1;
      document.getElementById("Guesses").textContent = Game.lives;
      setTimeout(changeTime, 6000);
      setTimeout(startFunction, 11000);
    }
  };

  document.getElementById("Medium").onmouseup = function() {
    if (Game.start === false) {
      Game.start = true;
      document.getElementById("AudioMedium").play();
      setTimeout(changeTime, 9500);
      setTimeout(startFunction, 14000);
    }
  };

  document.getElementById("Hard").onmouseup = function() {
    if (Game.start === false) {
      Game.start = true;
      document.getElementById("AudioHard").play();
      setTimeout(changeTime, 12000);
      setTimeout(startFunction, 16000);
    }
  };

  //Restart Function
  document.getElementById("Restart").onmouseup = function() {
    Game.start = true;
    Game.currentWord = "";
    Game.currentDisplay = "_ ";
    Game.lives = 3;
    document.getElementById("Guesses").textContent = Game.lives;
    Game.lettersUsed = "";
    document.getElementById("Letters").textContent = Game.lettersUsed;
    Game.score = 0;
    document.getElementById("Words").textContent = Game.score;
    document.getElementById("Restart").style.display = "none";
    Game.minutes = 5;
    Game.seconds = 0;
    document.getElementById("Minutes").textContent = "0" + Game.minutes;
    document.getElementById("Seconds").textContent = "0" + Game.seconds;
    Game.chooseRandomWord();
    start = setInterval(function () { timerSeconds(Game.seconds); }, 1000);
  };

  document.onkeyup = function(event) {
    if (Game.start === true && event.keyCode >= 65 && event.keyCode <= 90 && Game.lettersUsed.includes(event.key) === false) {
      Game.lettersUsed = Game.lettersUsed + event.key + ", ";
      document.getElementById("Letters").textContent = Game.lettersUsed;
      if (Game.currentWord.includes(event.key) === true && document.getElementById("Display").textContent.includes("_") === true) {
        var newWord = "";
        for (var i = 0; i < Game.currentWord.length; i++) {
         if (event.key === Game.currentWord[i]) {
           newWord += (event.key + " ");
         } else if (Game.lettersUsed.includes(Game.currentWord[i]) === true) {
           newWord += Game.currentWord[i] + " ";
         } else {
           newWord += "_ "
         }
        }
        document.getElementById("Display").textContent = newWord;
        if (document.getElementById("Display").textContent.includes("_") === false)
        {
          Game.score++;
          document.getElementById("Words").textContent = Game.score;
          Game.lettersUsed = "";
          document.getElementById("Letters").textContent = Game.lettersUsed;
          Game.currentWord = "";
          Game.currentDisplay = "_ ";
          Game.chooseRandomWord();
        }
      } else {
        Game.lives--;
        document.getElementById("Guesses").textContent = Game.lives;
        if (Game.lives === 0) {
          document.getElementById("Display").textContent = "G A M E  O V E R";
          document.getElementById("Minutes").textContent = "00";
          document.getElementById("Seconds").textContent = "00";
          document.getElementById("Restart").style.display = "";
          clearTimeout(start);
          Game.start = null;
        }
      }
    }
  };

  function changeTime() {
    document.getElementById("Tick").play();
    document.getElementById("Hours").textContent = "00";
    Game.hours = 0;
    document.getElementById("Minutes").textContent = "0" + 5;
  };

  function startFunction() {
    start = setInterval(function () { timerSeconds(Game.seconds); }, 1000);
    document.getElementById("DIFFICULTY").style.display = "none";
    document.getElementById("Jigsaw").style.display = "none";
    document.getElementById("Time").style.margin = "25% -100% 0px 0px";
    Game.chooseRandomWord();
  };

  function timerSeconds(i) {
      if (i !== 0) {
        i--;
      } else {
        i = 59;
        Game.minutes--;
        formatTime("Minutes", Game.minutes);
      }
      Game.seconds = i;
      document.getElementById("Beep").play();
      formatTime("Seconds", i);
      if(Game.minutes === 0 && Game.seconds === 0) {
        clearTimeout(start);
        console.log("GAME OVER");
      }
  };

  function formatTime(element, time) {
    if (time < 10) {
      document.getElementById(element).textContent = "0" + time;
    } else {
      document.getElementById(element).textContent = time;
    }
  };

};
