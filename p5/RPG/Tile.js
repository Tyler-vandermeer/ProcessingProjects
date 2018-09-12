var Tile = function(x, y, w, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.r = w / 2;
  this.display = false;
  this.c = this.SetColour(c);
  this.type = c;
}

Tile.prototype.SetColour = function(c){
  switch (c) {
    case 0:
      return color(255);//white
    case 1:
      return color(0, 255, 0);//green
    case 2:
      return color(0, 0, 255);//blue
    case 3:
      return color(168,168,168);//grey
    case 4:
      return color(14,143,25);//darkGreen
    default:
      return color(0);//black
  }
}

Tile.prototype.draw = function() {
    fill(this.c);
    noStroke();
    rect(this.x, this.y, this.w, this.w);
}

Tile.prototype.update = function(player) {
  var xBound = width * 0.2;
  var yBound = height * 0.2;
  var playerX = player.x;
  var playerY = player.y;
  if (playerX > width - xBound && (keyIsDown(RIGHT_ARROW) || keyIsDown(68))) {
    this.x-= player.xVel;
  } else if (playerX < xBound && (keyIsDown(LEFT_ARROW) || keyIsDown(65))) {
    this.x += player.xVel;
  }
  
  if (playerY > height - yBound && (keyIsDown(DOWN_ARROW) || keyIsDown(83))) {
    this.y-=player.yVel;
  } else if (playerY < yBound && (keyIsDown(UP_ARROW) || keyIsDown(87))) {
    this.y+=player.xVel;
  }
  
  if (this.x < 0 || this.x > width) {
    this.display = false;
  }
}
