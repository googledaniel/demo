# Prime Minister Game by Daniel Cloudt
  
  Demo page: https://googledaniel.github.io/demo/
  
  Inspired by The Crown, this game has historic British monarchs who went up against ambitious prime ministers trying to become the head of state.

  MVP
* Two player game. The human is the PM and the computer is a monarch.

* The win/lose state can be reached in four ways. If either player hits 100 points in popularity, that player becomes dictator or absolute monarch. BUT - if either hits 0 points, they are removed/deposed depending if they're the PM or monarch.

* The PM gets to choose a monarch to go up against. Different monarchs secretly have tactics to randomly use. A few monarchs even have unique tactics different from the others.

* Each tactic the PM and monarch can use has different levels of popularity. Each tactic can backfire and reduce popularity too.

* One of the PMs tactics can backfire so badly that it causes a lose state of the game no matter how good their popularity was.

Code Notes
* I used classes with methods for most of my functions. It was to change functions when they were methods because it contained any buggy functions. That made it really easy to bug check.

* Updates for scoreboard data and the DOM are contained into several small methods for each player object (created in the class).

* The playGame() method uses a recursive design. It runs through the whole round with different methods before calling itself and moving to the next player as part of the if/else block. 

Future Fixes
* A small bug during game over state needs to be fixed. It continues to show the next player's choices.

* CSS design will be improved. 

* Monarch gifs will be added for different choices monarchs make.

* I'm going to move away from if/else statements and try to make each an object.

* The JQuery .css('display', 'none') updates will be grouped into a method on the player class. 

