// const grph = require('./makeGraph.js')
// const mcTools = require('./mcTools.js')
// var fs = require('fs')
// var path = require('path')
// var Canvas = require('canvas')
// const plt =require('./graphPlot2.js')
// var canvas = Canvas.createCanvas(1000, 1000)
// var ctx = canvas.getContext('2d')


// var pointList = [[10,12],
//                  [28,12],
//                  [10,28],
//                  [28,28],
//                  [37,19]];

// var adjMat = [[0, 1, 1, 1, 0],
//           [0, 0, 1, 0, 0],
//           [1, 1, 0, 0, 0],
//           [0, 0, 0, 1, 0],
//           [0, 1, 0, 0, 0]];

// var adjMat1 = [[0, 1, 1, 1, 0],
//           [0, 0, 1, 0, 0],
//           [1, 1, 0, 0, 0],
//           [0, 0, 0, 1, 0],
//           [0, 1, 0, 0, 0]];

// var r = 1;
// var T = 30;

// var X0 = new grph.Graph(pointList.length, pointList, adjMat);
// X0.removeDirection();
// X0.setSourceNode(0);



// var iterations = 10
// for (var i = 0; i< iterations; i++){
//     //setTimeout(function(){
//         //console.log('X0 \n',X0.adjMat);
//         var X1 = mcTools.returnNextGraph(X0,T,r);
//         //var X1 = mcTools.returnNextGraphSingle(X0,T,r);
//         console.log(X1.adjMat);
//         //console.log('end')
//         plt.graphPlot(ctx,X0,X1,i);
//         canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, "graph"+i+".png")))
//         for (var j = 0;j<100000;j++){
//             var dum =0;
//         }
//         X0 = X1;
//     //},1000*i)
// }

// module.exports ={X0,pointList};
