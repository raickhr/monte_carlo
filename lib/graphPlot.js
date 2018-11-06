var fs = require('fs')
var path = require('path')
var Canvas = require('canvas')

var data = require('./index.js')
const mcTools = require('./mcTools.js')


//console.log(edgeList);
var X0 = data.X0;

function graph(ctx){
  var X1 = mcTools.returnNextGraph(X0);
  console.log(X1.adjMat);
  var sourceNode = X1.sourceNode
  var nodeList = data.pointList
  var noOfNodes = nodeList.length

  var edgeList = X1.getEdgeList();
  var noOfEdges = edgeList.length;

  ctx.clearRect(0, 0, 500, 500)

  //ctx.save()
  // begin plotting the nodesl
  for (var i=0; i < noOfNodes; i++){
    var x = nodeList[i][0]*10;
    var y = nodeList[i][1]*10;
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#325FA2'
    if (i == sourceNode){
      ctx.fillStyle = '#FF0000'
    }else{
      ctx.fillStyle = '#eeeeee'
    }
    ctx.arc(x, y, 20, 0, Math.PI * 2, true)
    ctx.stroke()
    ctx.fill()
  }

  for (var i=0; i < noOfEdges; i++){
    var edge = edgeList[i];
    var node1 = edge[0];
    var node2 = edge[1];
    var x1 = nodeList[node1][0]*10;
    var y1 = nodeList[node1][1]*10;
    var x2 = nodeList[node2][0]*10;
    var y2 = nodeList[node2][1]*10;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
  }
}

module.exports = graph

if (require.main === module) {
  var canvas = Canvas.createCanvas(500, 500)
  var ctx = canvas.getContext('2d')

  graph(ctx)

  canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'graph.png')))
}