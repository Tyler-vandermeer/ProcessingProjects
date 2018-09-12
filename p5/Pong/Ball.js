var Ball = function() {
  this.x = width / 2;
  this.y = height / 2;
  this.r = 5;
  this.velx = 1;
  this.vely = 1;
  this.goal = 0;
}

Ball.prototype.draw = function() {
  fill(180);
  strokeWeight(1);
  ellipse(this.x, this.y, this.r * 2);
}

Ball.prototype.update = function() {
  if (this.y >= height - 5) {
    this.vely *= -1;
  } else if (this.y <= 5) {
    this.vely *= -1;
  }
  
  if (this.x >= width - 5) {
    this.goal = 1;
  } else if (this.x <= 5) {
    this.goal = -1;
  }
  
  this.x += this.velx;
  this.y += this.vely;
}

Ball.prototype.bounce = function() {
  this.velx *= -1;
}
