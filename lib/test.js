var http = require('http')
var Canvas = require('canvas')
var fs = require('fs')
var path = require('path')

var dcanvas = Canvas.createCanvas(500,500);
var dtx = dcanvas.getContext('2d');

dtx.clearRect(0, 0, 500, 500)
dtx.rect(0, 0, 500, 500);
dtx.fillStyle = "white";
dtx.fill();

dcanvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, "test.png")))
