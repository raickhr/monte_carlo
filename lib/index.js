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

var iterations = 100

module.exports ={X0,pointList};
