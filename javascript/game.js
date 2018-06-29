// var start;
// var time = [1, 5, 0];
var Game = {
  start: true,
  hours: 1,
  minutes: 5,
  seconds: 0,
  score: 0,
  lives: 0,
  lettersUsed: "",
  words: ["Apple", "Orange", "Banana"],
  currentWord: "",
  currentDisplay: "_ ",

  chooseRandomWord: function () {
    this.currentWord = this.words[Math.floor(Math.random() * 3)];
    console.log("Chosen Word: " + this.currentWord);
    for (var i = 0; i < this.currentWord.length-1; i++) {
      this.currentDisplay = this.currentDisplay + "_ ";
    }
    document.getElementById("Display").textContent = this.currentDisplay;
  }
};



//document.getElementById("Body").style.backgroundSize = "60px 120px";
window.onload = function(){
  Game.chooseRandomWord();

  //Volume Adjustments
  document.getElementById("Jigsaw").volume = 0.4;
  document.getElementById("AudioEasy").volume = 0.4;
  document.getElementById("AudioMedium").volume = 0.4;
  document.getElementById("AudioHard").volume = 0.4;
  document.getElementById("Tick").volume = 1.0;
  document.getElementById("Beep").volume = 0.1;

  document.getElementById("Jigsaw").onmouseup = function () {
    setTimeout(function() {
      Game.start = false;
    }, 23000)
  };

  document.getElementById("Easy").onmouseup = function() {
    if (Game.start === false) {
      Game.start = true;
      document.getElementById("AudioEasy").play();
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

  document.onkeyup = function(event) {
    if (Game.start === true && event.keyCode >= 65 && event.keyCode <= 90 && Game.lettersUsed.includes(event.key) === false) {
      Game.lettersUsed = Game.lettersUsed + event.key + ", ";
      document.getElementById("Letters").textContent = Game.lettersUsed;
    }
  };

  function changeTime() {
    document.getElementById("Tick").play();
    document.getElementById("Hours").textContent = "00";
    document.getElementById("Minutes").textContent = "0" + 5;
  };

  function startFunction() {
    setInterval(function () { timerSeconds(time[2]) }, 1000);
    document.getElementById("DIFFICULTY").style.display = "none";
    document.getElementById("Jigsaw").style.display = "none";
    document.getElementById("Time").style.margin = "25% -100% 0px 0px";
    Game.start = true;
  };

  function timerSeconds(i) {
      if (i !== 0) {
        i--;
      } else {
        i = 59;
        time[1]--;
        formatTime("Minutes", time[1]);
      }
      time[2] = i;
      document.getElementById("Beep").play();
      formatTime("Seconds", i);
  };

  function formatTime(element, time) {
    if (time < 10) {
      document.getElementById(element).textContent = "0" + time;
    } else {
      document.getElementById(element).textContent = time;
    }
  };

};
