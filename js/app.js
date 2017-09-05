///////// General variables /////////



var initialScore = 5; // initial score
var scoreToWin = 10; // score to win the game
var positions = [100, 200, 300]; // enemies start positions
var speed = 300;




////////////////////////////////////////////
////////////////// Enemy //////////////////
////////////////////////////////////////////



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -50;
    this.y = 100;
    this.speed = Math.floor((Math.random() * speed) + speed);
    this.sprite = 'images/kitty.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // reset enemy if out of canvas
    if (this.x > 500) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = positions[Math.floor(Math.random() * 4)];
};


////////////////////////////////////////////
////////////////// Player //////////////////
////////////////////////////////////////////

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/doge.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.update = function() {
    this.collide();
};

Player.prototype.collide = function() {
    var inter = this;
    allEnemies.forEach(function(enemy) {
        if (enemy.y == inter.y) {
            if (enemy.x >= inter.x - 30 && enemy.x <= inter.x + 30) {
                inter.hit();
                inter.reset();
            }
        }
    });
};



Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};


///////// Player moves /////////



Player.prototype.handleInput = function(event) {
    this.userInput = event;
    if (this.userInput === 'left') {
        this.x = this.x - 100;
    } else if (this.userInput === 'right') {
        this.x = this.x + 100;
    } else if (this.userInput === 'up') {
        this.y = this.y - 100;
    } else if (this.userInput === 'down') {
        this.y = this.y + 100;
    }
    if (this.y > 400 || this.x < 0  || this.x > 400) {
        this.reset();
    }
    if (this.y <= -50) {
        this.score();
        this.reset();
    }
};


///////// Score, Hit, Win, Lose /////////


Player.prototype.score = function() {
  initialScore++;
  var scoresLeft = scoreToWin - initialScore;
  var scoreText = 'Ave Doge! Your total score is: ' + initialScore + '. Score ' + scoresLeft + ' more to win!';
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = 'green';
  ctx.textAlign = 'center';
  ctx.font = '13pt arial';
  ctx.fillText(scoreText, 250, 35);
  this.reset();

  if (initialScore >= scoreToWin) {
      console.log('win!');
      alert('Such wow! Much Proud! So Talent! You Win!');
      location.reload();
  }

};

Player.prototype.hit = function() {
  initialScore--;
  var scoreText = 'You lost 1 point. ' + initialScore + ' left. Poor Doge!';
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = 'red';
  ctx.textAlign = 'center';
  ctx.font = '13pt arial';
  ctx.fillText(scoreText, 250, 35);
  if (initialScore === 0) {
      console.log('Lost!');
      alert('Such bad! Much Dislike! Wow! You Lost!');
      location.reload();
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var cat1 = new Enemy();
var cat2 = new Enemy();
var cat3 = new Enemy();
var cat4 = new Enemy();
var cat5 = new Enemy();

var allEnemies = [cat1, cat2, cat3, cat4, cat5];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
