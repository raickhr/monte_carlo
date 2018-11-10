var http = require('http')
var Canvas = require('canvas')
var fs = require('fs')
var path = require('path')

const plt =require('./graphPlot2.js')
const grph = require('./makeGraph.js')
const mcTools = require('./mcTools.js')
//console.log(mcmc.exprtVal)

var canvas = Canvas.createCanvas(1000, 1000)
//canvas.backgroundColor = "white";
var ctx = canvas.getContext('2d')

configFile = path.join(__dirname, 'config.txt');
var contents = fs.readFileSync(configFile, 'utf8');

readArray = contents.split('\n\n');

readPoints = readArray[0];
readAdjMatStr = readArray[1].trim().split('\n');
read_r = readArray[2];
read_T = readArray[3];
read_iti = readArray[4];

var r = parseFloat(read_r);
var T = parseFloat(read_T);
var maxIteration = parseInt(read_iti);

if(r !== r){
  console.log('Check r value');
  process.exit(-1);
}
if(T !== T){
  console.log('Check T value');
  process.exit(-1);
}
if(maxIteration !== maxIteration){
  console.log('Check Max Iteraion');
  process.exit(-1);
}

readPoints = readPoints.split('\n');
noOfNodes = readPoints.length;
readPointsList = []

for (var i =0; i< noOfNodes; i++ ){
  current = readPoints[i];
  current = current.slice(current.indexOf('(')+1,current.length);
  current = current.slice(0,current.indexOf(')'));
  current = current.split(',');
  var x = parseFloat(current[0])
  var y = parseFloat(current[1])
  if (x < 10 || x > 40 || y < 10 || y > 40){
    console.log('Enter the co-ordinates in range of (10,10) and (40,40)')
    process.exit(-1);
  }
  readPointsList.push([x,y]);
}

readAdjMat = [];

if (readAdjMatStr.length !== readPointsList.length){
  console.log('Nodes and Adjacency Matrix mismatch');
  process.exit(-1);
}
for (var i =0; i< readAdjMatStr.length; i++){
  current = readAdjMatStr[i].split(' ');
  readAdjMat[i]=[];
  for (var j = 0; j< current.length; j++){
    current2 = current[j].trim();
    current2 = parseInt(current2);
    if (current2 !== current2){
      continue
    }else{
      if ((current2 === 0) || (current2 === 1)){
        readAdjMat[i].push(current2);
      }else{
        console.log('The Adjacency matrix element should either be 1 or 0')
        process.exit(-1)
      }
    }
  }
  if (readAdjMat[i].length != readAdjMatStr.length){
    console.log('Adjacency matrix dimension mismatch');
    process.exit(-1);
  }
}
var X0 = new grph.Graph(readPointsList.length, readPointsList, readAdjMat);
X0.removeDirection();
X0.setSourceNode(0);

var recordGraph =[];
recordGraph[0] = [];
recordGraph[0][0]=X0;
recordGraph[0][1]=1;

var numberOfNodesConVert0 = X0.getConnectedNodes(0).length;

var numberOfEdges = X0.getEdgeList().length;

var ShortestPathList = X0.getShortestPaths(0);
var lengthShortestPath =1;
for (var i =0; i < X0.noOfVertices; i++){
  if (ShortestPathList[i].length > lengthShortestPath){
    lengthShortestPath = ShortestPathList[i].length;
  }
}

var longestShortestPathLength = lengthShortestPath;

var isAddGraph = true
  
var iteration = 0;

var imgData = [];

http.createServer(function (req, res) {
  iteration++;
  if (iteration > maxIteration){
    var avgNumberOfNodesConVert0 = numberOfNodesConVert0/ (iteration);
    var avgNumberOfEdges = numberOfEdges/(iteration);
    var avgLongestShortestPathLength = longestShortestPathLength/ (iteration);
    var dcanvas = Canvas.createCanvas(500, 500)
    var dtx = dcanvas.getContext('2d')
    for ( var i =0; i < recordGraph.length; i++){
      //i = 0;
      plt.plotReport(dtx,recordGraph[i][0],recordGraph[i][1]);
      //canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, "test.png")))   
      imgData.push('<img src = "'+dcanvas.toDataURL()+'" >');
    }
      
    //console.log(canvas.toDataURL());
    //process.exit(-1);
  }
  // var X1 = mcTools.returnNextGraphSingle(X0,T,r);
  var X1 = mcTools.returnNextGraph(X0,T,r);
  isAddGraph = true
  for (var i = 0; i< recordGraph.length; i++){
    if(JSON.stringify(recordGraph[i][0]) === JSON.stringify(X1) ){
      recordGraph[i][1]++;
      console.log("added",recordGraph[i][1]);
      isAddGraph = false;
    }
  }
  if (isAddGraph){
    var len = recordGraph.length;
    recordGraph[len]=[]
    recordGraph[len][0] = X1;
    recordGraph[len][1] = 1;
  }
  numberOfNodesConVert0 += X1.getConnectedNodes(0).length;
  numberOfEdges += X1.getEdgeList().length;

  ShortestPathList = JSON.parse(JSON.stringify(X1.getShortestPaths(0)));
  lengthShortestPath =1;
  for (var i =0; i < X1.noOfVertices; i++){
    if (ShortestPathList[i].length - 2 > lengthShortestPath){
      lengthShortestPath = ShortestPathList[i].length-2;
    }
  }
  longestShortestPathLength += lengthShortestPath;

  console.log("iteration = ",iteration)
  console.log(X1.adjMat);
  plt.graphPlot(ctx,X0,X1,iteration);
  X0 = X1;
  //canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, "graph"+iteration+".png")))
  res.writeHead(200, { 'Content-Type': 'text/html' })
  if (iteration > maxIteration){
    var TotalImg ='';
    for (var i=0;i < imgData.length;i++){
      TotalImg += imgData[i];
    }
    res.end(
      '<H3>The average number of edges connected to vertex 0 is ' + avgNumberOfNodesConVert0 + '</H3>'+
      '<H3>The average number of edges in the graph is ' + avgNumberOfEdges+'</H3>'+
      '<H3>The average length of longest path from node 0 is ' +avgLongestShortestPathLength + ' steps</H3>'+  
      TotalImg 
    )
    process.exit(-1);
  }
  res.end(
      '<meta http-equiv="refresh" content="1;" />' +
      '<img src="' + canvas.toDataURL() + '" />'
  )
  
}).listen(3000, function () {
  console.log('Server started on port 3000')
})



