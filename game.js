//main game logic

//set global variables
var Word = require('./words.js');
var prompt = require('prompt');

//welcome messages
console.log("Colorful Hangman!");
console.log("Try to guess which random color I have chosen, one letter at a time!")

//begin game
prompt.start();

game = {
	wordList: ['red', 'orange', 'yellow', 'green', 'pink', 'blue', 'purple', 'black', 'white'],
	score: 0
	guessesRemaining: 10,
	currentWord: null,

	gameStart: function (loadWord) {
		this.resetGuesses();
		this.currentWord = new Word(this.wordList[Math.floor(Math.random()* this.wordList.length)]);
		this.currentWord.getLetter();
		this.promptUser();
	},

	resetGuesses: function(){
		this.guessesRemaining = 10;
	},

	promptUser: function(){
		var self = this;
		prompt.get(['guessLetter'], function(err, result){
			console.log("You entered the letter: " + result.guessLetter);
			var numGuessed = self.currentWord.checkLetter(result.guessLetter);

			if (numGuessed == 0) {
				console.log("Nope!");
				self.guessesRemaining--
			} else {
				console.log("That is correct!");
				if (self.currentWord.findWord()) {
					console.log("Yay, you won!");
					return;
				};
			};

			console.log("You have " + self.guessesRemaining + "guesses remaining!");
			if ((self.guessesRemaining > 0) && (self.currentWord.found == false)) {
				self.promptUser();
			} else if (self.guessesRemaining == 0) {
				console.log("Game over! The correct word is " + self.currentWord.target);

			} else {
				console.log(self.currentWord.wordRender);
			};

		});
	};
};



