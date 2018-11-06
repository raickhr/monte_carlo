const grph = require('./makeGraph.js')
const mcTools = require('./mcTools.js')
const arrMath = require('./calc.js');

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

var adjMat1 = [[0, 1, 1, 1, 0],
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
//module.exports ={sourceNode,pointList,edgelist}

var iterations = 10;
var interval = 1000;
// for (var i = 0;i < iterations; i++){
//     setTimeout(function(i){
//         X1 = mcTools.returnNextGraph(X0);
//         edgelist = X1.getEdgeList();
//         sourceNode = X1.sourceNode;
//         console.log(X1.adjMat);
//     },interval*i,i);
// } 
// }

X1 = mcTools.returnNextGraph(X0);
edgelist = X1.getEdgeList();
sourceNode = X1.sourceNode;
console.log(X1.adjMat);

//console.log(X0);
module.exports ={X0,pointList};




//////console.log(thetaVal);
// ////console.log(edgelist);
// ////console.log(X0.isConnected());
// ////console.log(X0.getPossibleEdges());
////console.log(X0.getShortestPaths(0));