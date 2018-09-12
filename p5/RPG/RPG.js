var tiles = [];
var player;
var visibility = 150;
var tileWidth = 25;
var tileCount = 150;
var tileOffset = -(tileWidth * tileCount) / 2;
var wall = false;

function setup() {
  createCanvas(480, 300);
  rectMode(CENTER);
  player = new Player(width/2,height/2,10,10);
  InitializeArray();
}

function InitializeArray() {
  var yoff = 0;
  for (var i = 0; i < tileCount; i++) {
    var temp = [];
    var xoff = 0;
    for (var j = 0; j < tileCount; j++) {
      var rand = GetTileType(noise(xoff, yoff));
      temp.push(new Tile(tileOffset + (j * tileWidth), tileWidth + (i * tileWidth), tileWidth, rand));
      xoff += 0.01;
    }
    yoff+=0.01;
    tiles.push(temp);
  }
}

function GetTileType(r) {
  if (r > 0.70) {
    return 3;//mountain
  } else if (r > 0.55) {
    return 4;//forest
  } else if (r > 0.30) {
    return 1;//grass
  } else {
    return 2;//water
  }
}

function drawBackground() {
  if (tiles.length > 0) {
    tiles.forEach(function(row) {
      row.forEach(function(tile){
        tile.update(player);
        if (tile.display) {
          tile.draw();
        } else {
          if (OnScreen(tile)) {
            tile.draw();
            tile.display = true;
          }
        }
      });
    });
  }
}

function OnScreen(obj) {
  return obj.x - obj.r >= -tileWidth &&
         obj.x + obj.r <= width+tileWidth &&
         obj.y - obj.r >= -tileWidth &&
         obj.y + obj.r <= height+tileWidth;
}

function Collision(obj1, obj2) {
  return obj1.x - obj1.r >= obj2.x - obj2.r &&
         obj1.x + obj1.r <= obj2.x + obj2.r &&
         obj1.y - obj1.r >= obj2.y - obj2.y &&
         obj1.y + obj1.r <= obj2.y + obj2.r;
}

function TileInRange(x, y) {
  return CalculateDistance(x, player.x, y, player.y) <= visibility;
}

function CalculateDistance(x1, x2, y1, y2) {
  return sqrt(sq(x2 - x1) + sq(y2-y1));
}

function draw() {
  //Drawing
  clear();
  drawBackground();
  player.draw();
  
  if (!wall) {
    player.update();  
  } else {
    console.log('here');
  }
}
