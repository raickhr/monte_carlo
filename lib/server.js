var http = require('http')
var Canvas = require('canvas')

var graph = require('./graphPlot')
//var mcmc = require('./test.js')
//console.log(mcmc.exprtVal)

var canvas = Canvas.createCanvas(500, 500)
var ctx = canvas.getContext('2d')

http.createServer(function (req, res) {
  graph(ctx)
  //mcmc.MCMC()

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(
    '<meta http-equiv="refresh" content="1;" />' +
    '<img src="' + canvas.toDataURL() + '" />'
  )
}).listen(3000, function () {
  console.log('Server started on port 3000')
})
