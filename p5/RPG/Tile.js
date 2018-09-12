var Tile = function(x, y, w, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.r = w / 2;
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

Tile.prototype.UpdateColour = function(r) {
  this.c = this.SetColour(r);
}

Tile.prototype.draw = function() {
    fill(this.c);
    noStroke();
    rect(this.x, this.y, this.w, this.w);
}
