var http = require('http')
var Canvas = require('canvas')

var graph = require('./graphPlot')
//var mcmc = require('./test.js')
//console.log(mcmc.exprtVal)

var canvas = Canvas.createCanvas(1000, 1000)
var ctx = canvas.getContext('2d')

http.createServer(function (req, res) {
  var T = 30; //for singe edge adding
  var r = 1;
  graph(ctx,T,r)
  //mcmc.MCMC()

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(
    '<meta http-equiv="refresh" content="1;" />' +
    '<img src="' + canvas.toDataURL() + '" />'
  )
}).listen(3000, function () {
  console.log('Server started on port 3000')
})
