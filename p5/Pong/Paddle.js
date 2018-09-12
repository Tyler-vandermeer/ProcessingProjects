var Paddle = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

Paddle.prototype.draw = function() {
  fill(180);
  strokeWeight(1);
  rect(this.x, this.y, this.w, this.h);
}

Paddle.prototype.update = function(direction) {
  this.y = constrain(this.y + 1 * direction, 1, height - (this.h + 1));
}
