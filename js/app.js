// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = this.getRandomY();
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Function to get a random y position 
Enemy.prototype.getRandomY = function() {
    var possiblePositions = [60, 145, 230];
    var index = this.getRandomInt(0, possiblePositions.length);
    return possiblePositions[index];
};

// Function to create a random integer 
Enemy.prototype.getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
        this.y = this.getRandomY();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(player) {
    this.sprite = player;
    this.x = 200;
    this.y = 403;
    this.numberOfVictories = 0;
};

// Function to render the number of victories of the player
Player.prototype.renderVictories = function() {
    ctx.clearRect(0,0, 450, 50);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.numberOfVictories,420,40);
    ctx.drawImage(Resources.get('images/littlestar.png'), 450, 0);
}

// Function to check if the player won the game
Player.prototype.checkVictory = function() {
    if (this.y === -12) {
        ctx.clearRect(420,40, 50, 5);
        this.numberOfVictories += 1;      
        setTimeout(function(){ 
            player.resetPosition(); 
        }, 100);
        
    }
}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.renderVictories();
};

// Function to handle keyboard input and move player
Player.prototype.handleInput = function(key) {
    if (key === "up") {
        if (this.y > -12) {
            this.y -= 83;
        }
    } else if (key === "down") {
        if (this.y < 403) {
            this.y += 83;
        }
    } else if (key === "left") {
        if (this.x > 0) {
            this.x -= 100;
        }
    } else if (key === "right") {
        if (this.x < 400) {
            this.x += 100;
        }
    }

    this.checkVictory();
};

// Function to update player
Player.prototype.update = function() {
    this.renderVictories();
};

// Function to restore the position of the player
Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 403;
}

// Our player selector
var PlayerSelector = function() {

    this.x = 0;
    this.y = 125;    
    this.sprite = 'images/Selector.png';
    this.selectedPlayer = undefined;
    this.players = {
        0 : 'images/char-boy.png',
        100 : 'images/char-cat-girl.png',
        200 : 'images/char-horn-girl.png',
        300 : 'images/char-pink-girl.png',
        400 : 'images/char-princess-girl.png'
    }
}

// Draw the player selector on screen
PlayerSelector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Handle keyboard input 
PlayerSelector.prototype.handleInput = function(key) {
    if (key === "left") {
        if (this.x > 0) {
            this.x -= 100;
        }
    } else if (key === "right") {
        if (this.x < 400) {
            this.x += 100;
        }
    } else if (key === "enter") {
        this.pickPlayer(this.x);
    }
}

// Select player
PlayerSelector.prototype.pickPlayer = function(x) {
    this.selectedPlayer = this.players[x];
    player.sprite = this.selectedPlayer;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Function to create enemies
var createEnemies = function(quantity) {
    for (var i = 0; i < quantity; i++) {
        var speed = Math.floor(Math.random() * (300 - 100)) + 100;
        allEnemies.push(new Enemy(speed));
    }
}

createEnemies(3);

// Place the player object in a variable called player
var allPlayers = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
    ]

var playerSelector = new PlayerSelector();
var player = new Player('images/char-boy.png');



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (typeof playerSelector.selectedPlayer !== "undefined") {
        player.handleInput(allowedKeys[e.keyCode]);
    } else {
        playerSelector.handleInput(allowedKeys[e.keyCode]);
    }
});
