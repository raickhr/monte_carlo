var fs = require('fs')
var path = require('path')
var Canvas = require('canvas')
const mcTools = require('./mcTools.js')
//const arrMath = require('./calc.js');
const grph = require('./makeGraph.js')

var canvas = Canvas.createCanvas(500, 500)
var ctx = canvas.getContext('2d')

var pointList = [[10,12],
                 [28,12],
                 [10,28],
                 [28,28],
                 [37,19]];

var adjMat = [[0, 1, 1, 1, 0],
          [0, 0, 1, 0, 0],
          [1, 1, 0, 0, 0],
          [0, 0, 0, 1, 0],
          [0, 1, 0, 0, 0]];

var r = 1;
var T = 1;

var X0 = new grph.Graph(pointList.length, pointList, adjMat);
X0.removeDirection();
X0.setSourceNode(0);
////console.log(X0.adjMat);

decMat = [true,false,true,true,false,true,false,true,true,false];
var edgelist = X0.getEdgeList();
var sourceNode = X0.sourceNode;

function graph(ctx,nodeList,edgeList){
  var  noOfNodes = nodeList.length
  var noOfEdges = edgeList.length
  ctx.clearRect(0, 0, 500, 500)

  ctx.save()
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


var iterations = 10;
var interval = 1000*5;
var exprtVal ='';

for (var i = 0;i< iterations; i++){
    setTimeout(function(i){
        copyX0 = JSON.parse(JSON.stringify(X0));
        var X1 = mcTools.getRandGraph(X0);
        var dec =  mcTools.mcHasting(X0,X1,T,r);//decMat[i];
        console.log(dec);
        if (dec == true){
            var copyX1 = JSON.parse(JSON.stringify(X1));
            X0.sourceNode = copyX1.sourceNode;
            X0.adjMat = copyX1.adjMat;
        }else{
            X1.sourceNode = copyX0.sourceNode;
            X1.adjMat = copyX0.adjMat;
        }
        //console.log(X1.sourceNode);
        edgelist = X1.getEdgeList();
        sourceNode = X1.sourceNode;
        graph(ctx,pointList,edgelist)
        exprtVal = '<img src=" '+ canvas.toDataURL()+ ' "/>';
        //canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'graph'+i+'.png')))
        //,sourceNode,pointList,edgelist};
        //console.log(exprtVal);
    },interval*i,i);
    
}



module.exports ={exprtVal}




//////console.log(thetaVal);
// ////console.log(edgelist);
// ////console.log(X0.isConnected());
// ////console.log(X0.getPossibleEdges());
////console.log(X0.getShortestPaths(0));
