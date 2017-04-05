// Random speed generator
var ranSpeed = function(range) {
    var x;
    x = Math.floor(Math.random() * range) + 100;
    return x;
}

// Score variable
var score = 0;


// Enemies
var Enemy = function(x) {

    // Uses a helper to load sprite images
    this.sprite = 'images/enemy-bug.png';

    // y coordinates of possible starting lanes
    this.enemyY = [62, 145, 228];
    
    // Initial enemy location
    this.x = x;
    this.y = this.startY();

    // Enemy speed
    this.speed = ranSpeed(200);

}

// Randomly determine which lane to start in
Enemy.prototype.startY = function() {
    var y = this.enemyY[Math.round(Math.random()*2)];
    return y;
}

// Update the enemy's position
Enemy.prototype.update = function(dt) {

    // Move enemy to the right until it hits the edge
    if (this.x <= 550) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -100;
        this.speed = ranSpeed(200);
        this.y = this.startY();
    }
    
    // Collisions
    if (player.x >= this.x - 50 && player.x <= this.x + 50 && player.y >= this.y - 30 && player.y <= this.y + 30) {
        score = 0;
        document.getElementById('score').innerHTML = "Score: " + score;
        resetPositions();
    }
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 392;
}

// Render player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Update player's position
Player.prototype.update = function() {
    if (this.key === 'up' && this.y > 0) {
        this.y -= 83;
    }
    else if (this.key === 'down' && this.y < 380) {
        this.y +=83; 
    }
    else if (this.key === 'left' && this.x > 0) {
        this.x -= 101;
    }
    else if (this.key === 'right' && this.x < 400) {
        this.x += 101;
    }
    this.key = null;

    if (this.y < 20) {
        this.reset();
        star.reset();
    }
}

Player.prototype.handleInput = function(e) {
    this.key = e;
}

// Reset player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 392;
}


// Star class
var Star = function() {
    this.sprite = 'images/Star.png';
    this.starX = [-2, 99, 200, 301, 402];
    this.starY = [70, 153, 236];
    this.x = this.startX();
    this.y = this.startY();
}

// Render star
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Randomly determine column to be in
Star.prototype.startX = function() {
    var x = this.starX[Math.round(Math.random()*4)];
    return x;
}

// Randomly determine row to be in
Star.prototype.startY = function() {
    var y = this.starY[Math.round(Math.random()*2)];
    return y;
}

// Update star on collision with player
Star.prototype.update = function() {
    if (player.x >= this.x - 10 && player.x <= this.x + 10 && player.y >= this.y - 10 && player.y <= this.y + 10) {
        this.x = -200;
        score++;
        document.getElementById('score').innerHTML = "Score: " + score;
    }
}

// Reset star position
Star.prototype.reset = function() {
    this.x = this.startX();
    this.y = this.startY();
}


// Instantiate player and enemy objects.
var player = new Player();

var allEnemies = [
    new Enemy(-100),
    new Enemy(-300),
    new Enemy(-500),
    new Enemy(-700)
];

var star = new Star();

var keysEnabled = true

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    if (keysEnabled) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    }
});

// Disables arrow keys from scrolling window in game
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Reset positions of player and Enemies
function resetPositions() {
    player.reset();
    star.reset();
    for (var i in allEnemies) {
        allEnemies[i].x = -100 - i * 200;
        allEnemies[i].y = allEnemies[i].startY();
    }
}