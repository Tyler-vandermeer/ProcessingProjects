var tiles = [];
var player;
var tileWidth = 5;
var tileCount = 100;
var tileOffset = -(tileWidth * tileCount) / 2;
var wall = false;
var initialNoiseX = 10000;
var initialNoiseY = 10000;

function setup() {
  createCanvas(tileWidth * tileCount, tileWidth * tileCount);
  rectMode(CENTER);
  player = new Player(width/2,height/2,10,10);
  InitializeArray();
}

function InitializeArray() {
  for (var i = 0; i < tileCount; i++) {
    var temp = [];
    for (var j = 0; j < tileCount; j++) {
      temp.push(new Tile(j * tileWidth, tileWidth + (i * tileWidth), tileWidth, 1));
    }
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
    var yOff = initialNoiseY;
    tiles.forEach(function(row) {
      var xOff = initialNoiseX;
      row.forEach(function(tile){
        var n = noise(xOff, yOff);
        tile.UpdateColour(GetTileType(n));
        tile.draw();
        xOff += 0.01
      });
      yOff += 0.01;
    });
  }
}

function Collision(obj1, obj2) {
  return obj1.x - obj1.r >= obj2.x - obj2.r &&
         obj1.x + obj1.r <= obj2.x + obj2.r &&
         obj1.y - obj1.r >= obj2.y - obj2.y &&
         obj1.y + obj1.r <= obj2.y + obj2.r;
}

function CalculateDistance(x1, x2, y1, y2) {
  return sqrt(sq(x2 - x1) + sq(y2-y1));
}

function draw() {
  //Drawing
  clear();
  drawBackground();
  player.draw();
  
  player.update();
  if (player.x == width * 0.18 && (keyIsDown(LEFT_ARROW) || keyIsDown(65))) {
    initialNoiseX -= 0.01;
  } else if (player.x == width - (width * 0.18) && (keyIsDown(RIGHT_ARROW) || keyIsDown(68))) {
    initialNoiseX += 0.01;
  }
  if (player.y == height * 0.18 && (keyIsDown(UP_ARROW) || keyIsDown(87))) {
    initialNoiseY -= 0.01;
  } else if (player.y == height - (height * 0.18) && ((keyIsDown(DOWN_ARROW) || keyIsDown(83)))) {
    initialNoiseY += 0.01;
  }
}
