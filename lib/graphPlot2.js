var fs = require('fs')
var path = require('path')
var Canvas = require('canvas')

var data = require('./index.js')
const mcTools = require('./mcTools.js')

module.exports = {
  graphPlot:function(ctx,X0,X1,iteration){
      var sourceNode = X0.sourceNode
      var nodeList = X0.vertices
      var noOfNodes = nodeList.length
      var edgeList = X0.getEdgeList();
      var noOfEdges = edgeList.length;
      ctx.clearRect(0, 0, 1000, 1000)
      ctx.rect(0, 0, 1000, 1000);
      ctx.fillStyle = "white";
      ctx.fill();
    
      //ctx.save()
      // begin plotting the nodesl
    
      for (var i=0; i < noOfEdges; i++){
        var edge = edgeList[i];
        var node1Indx = edge[0];
        var node2Indx = edge[1];
        var x1 = nodeList[node1Indx].x*10;
        var y1 = nodeList[node1Indx].y*10;
        var x2 = nodeList[node2Indx].x*10;
        var y2 = nodeList[node2Indx].y*10;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
      }
      for (var i=0; i < noOfNodes; i++){
        var x = nodeList[i].x*10;
        var y = nodeList[i].y*10;
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
        ctx.textAlign="center";
        ctx.font = "25px Arial"
        if (i == sourceNode){
          ctx.fillStyle = '#00FF00'
        }else{
          ctx.fillStyle = '#000000'
        }
        ctx.fillText(i,x,y+8);
      }
      
        sourceNode = X1.sourceNode
        nodeList = X1.vertices
        noOfNodes = nodeList.length
        edgeList = X1.getEdgeList();
        noOfEdges = edgeList.length;

        //ctx.save()
        // begin plotting the nodesl
      
        for (var i=0; i < noOfEdges; i++){
          var edge = edgeList[i];
          var node1Indx = edge[0];
          var node2Indx = edge[1];
          var x1 = nodeList[node1Indx].x*10 + 400;
          var y1 = nodeList[node1Indx].y*10;
          var x2 = nodeList[node2Indx].x*10 + 400;
          var y2 = nodeList[node2Indx].y*10;
          ctx.beginPath();
          ctx.moveTo(x1,y1);
          ctx.lineTo(x2,y2);
          ctx.stroke();
        }
        for (var i=0; i < noOfNodes; i++){
          var x = nodeList[i].x*10 + 400;
          var y = nodeList[i].y*10;
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
          ctx.textAlign="center";
          ctx.font = "25px Arial"
          if (i == sourceNode){
            ctx.fillStyle = '#00FF00'
          }else{
            ctx.fillStyle = '#000000'
          }
          ctx.fillText(i,x,y+8);
      
          //write ajacency matrix
          ctx.textAlign="center";
          ctx.font = "25px Arial"
          ctx.fillStyle = '#000000'
          ctx.fillText('Iteration number '+ iteration, 200,500);
          ctx.fillText('X0',150,550);
          ctx.fillText('X1',525,550);
          var AdjointMat0 = X0.adjMat
          for (var m = 0;m<AdjointMat0.length;m++){
            for (var n = 0;n < AdjointMat0.length; n++){
              x = 100 + m * 25;
              y = 600 + n * 25;
              ctx.fillText(AdjointMat0[m][n],x,y+8);
            }
          }   
          var AdjointMat1 = X1.adjMat
          for (var m = 0;m<AdjointMat1.length;m++){
            for (var n = 0;n < AdjointMat1.length; n++){
              x = 500 + m * 25;
              y = 600 + n * 25;
              ctx.fillText(AdjointMat1[m][n],x,y+8);
            }
          } 
        } 
    },
    plotReport: function(ctx,X0,repetetions){
      var sourceNode = X0.sourceNode
      var nodeList = X0.vertices
      var noOfNodes = nodeList.length
      var edgeList = X0.getEdgeList();
      var noOfEdges = edgeList.length;
      ctx.clearRect(0, 0, 1000, 450)
      ctx.rect(0, 0, 1000,450);
      ctx.fillStyle = "white";
      ctx.fill();
    
      //ctx.save()
      // begin plotting the nodesl
    
      for (var i=0; i < noOfEdges; i++){
        var edge = edgeList[i];
        var node1Indx = edge[0];
        var node2Indx = edge[1];
        var x1 = nodeList[node1Indx].x*10;
        var y1 = nodeList[node1Indx].y*10;
        var x2 = nodeList[node2Indx].x*10;
        var y2 = nodeList[node2Indx].y*10;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
      }
      for (var i=0; i < noOfNodes; i++){
        var x = nodeList[i].x*10;
        var y = nodeList[i].y*10;
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
        ctx.textAlign="center";
        ctx.font = "25px Arial"
        if (i == sourceNode){
          ctx.fillStyle = '#00FF00'
        }else{
          ctx.fillStyle = '#000000'
        }
        ctx.fillText(i,x,y+8);
      }
      ctx.textAlign="center";
      ctx.font = "25px Arial"
      ctx.fillStyle = '#000000'
      ctx.fillText('Repetetions '+ repetetions, 200,405);

      return ctx;
          
    }
  
}





// if (require.main === module) {
//   var canvas = Canvas.createCanvas(500, 500)
//   var ctx = canvas.getContext('2d')
//   graph(ctx)
//   canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'graph.png')))
// }