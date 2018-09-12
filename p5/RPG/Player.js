var Player = function(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.xVel = 5;
  this.yVel = 5;
  this.w = w;
  this.r = w / 2;
  this.h = h;
}

Player.prototype.draw = function() {
  fill(0);
  strokeWeight(1);
  rect(this.x, this.y, this.w, this.h);
}

Player.prototype.update = function() {
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    this.y-= this.yVel;
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    this.y+= this.yVel;
  }
  
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    this.x-=this.yVel;
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    this.x+=this.xVel;
  }
  this.x = constrain(this.x, width * 0.18, width - (width * 0.18));
  this.y = constrain(this.y, height * 0.18, height - (height * 0.18));
}
