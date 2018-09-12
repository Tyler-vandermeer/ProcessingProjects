var inc = 0.01;
var initialNoiseX = 10000;
var initialNoiseY = 10000;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  GenerateTerrain();
  MoveTerrain();
}

function GenerateTerrain() {
  var yoff = initialNoiseY;
  loadPixels();
  for (var y = 0; y < height; y++) {
    var xoff = initialNoiseX;
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff);
      var c = GetTerrainType(r);
      pixels[index + 0] = c[0];
      pixels[index + 1] = c[1];
      pixels[index + 2] = c[2];
      pixels[index + 3] = 255;
      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
}

function MoveTerrain() {
  var i = 0.051;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    initialNoiseY -= i;
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    initialNoiseY += i;
  }
  
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    initialNoiseX -= i;
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    initialNoiseX += i;
  }
}

function GetTerrainType(value) {
  if (value >= 0.7) {
    return [180,180,180];
  } else if (value >= 0.3) {
    return [0,255,0];
  } else {
    return [0,0,255];
  }
}
