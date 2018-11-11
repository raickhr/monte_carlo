var http = require('http')        // for output in browser
var Canvas = require('canvas')   // for graphical output
var fs = require('fs')           // for reading files. config file is to be read
var path = require('path')       // figuring out the current directory

const plt =require('./graphPlot.js')     // where the plot functions are writen
const grph = require('./makeGraph.js')    // where the graph object and modules are
const mcTools = require('./mcTools.js')   // where the Metropolis hasting functions are
//console.log(mcmc.exprtVal)

var canvas = Canvas.createCanvas(1000, 1000)   // initialize the canvas to draw
//canvas.backgroundColor = "white";
var ctx = canvas.getContext('2d')   // draw in 2d

configFile = path.join(__dirname, 'config.txt');    // get the config file
var contents = fs.readFileSync(configFile, 'utf8');  

// Parsing the confog file begins here
readArray = contents.split('\n\n');   // each part in the config file is seperated by a blank line

readPoints = readArray[0];     // the first part is the list of point co-ordinates.
readAdjMatStr = readArray[1].trim().split('\n'); // the second part of the config file is adjacency matrix
read_r = readArray[2]; // the third part in config file parameter is the r 
read_T = readArray[3]; // the fourth part in config file is parameter T
read_iti = readArray[4]; // the fifth part in the config file is the maximum number of iterations

var r = parseFloat(read_r);  // change the datatype from string to float
var T = parseFloat(read_T);  // change the datatype
var maxIteration = parseInt(read_iti); // change the datatype

if(r !== r){             // checking for NaN
  console.log('Check r value');
  process.exit(-1);
}
if(T !== T){             // checking for NaN 
  console.log('Check T value');
  process.exit(-1);
}
if(maxIteration !== maxIteration){  // checkin for NaN
  console.log('Check Max Iteraion');
  process.exit(-1);
}

readPoints = readPoints.split('\n');  // A point in a line is the format for giving the point input in the config file
noOfNodes = readPoints.length;
readPointsList = []

for (var i =0; i< noOfNodes; i++ ){
  current = readPoints[i];
  current = current.slice(current.indexOf('(')+1,current.length); // remove ( form the string array
  current = current.slice(0,current.indexOf(')')); // remove ) from the string array
  current = current.split(',');  // split the x and y co-ordinates 
  var x = parseFloat(current[0]) // change the data type 
  var y = parseFloat(current[1])  // change the data type
  if (x < 10 || x > 40 || y < 10 || y > 40){  // the range that we can enter for the co-ordintes is only 10 to 40
    console.log('Enter the co-ordinates in range of (10,10) and (40,40)')
    process.exit(-1);
  }
  readPointsList.push([x,y]);
}
// parsing the adjacency matrix begins here
readAdjMat = [];

if (readAdjMatStr.length !== readPointsList.length){  // nodelist and the adjacency matrix dimension should match
  console.log('Nodes and Adjacency Matrix mismatch');
  process.exit(-1);
}
for (var i =0; i< readAdjMatStr.length; i++){
  current = readAdjMatStr[i].split(' '); // each element of the adjacency matrix is seperated by a space 
  readAdjMat[i]=[];
  for (var j = 0; j< current.length; j++){
    current2 = current[j].trim();  // remove the leading and trailing whitespaces
    current2 = parseInt(current2); // change the datatype
    if (current2 !== current2){  // check for NaN values
      continue
    }else{
      if ((current2 === 0) || (current2 === 1)){   // check for 0 and 1
        readAdjMat[i].push(current2);
      }else{
        console.log('The Adjacency matrix element should either be 1 or 0')
        process.exit(-1)
      }
    }
  }
  if (readAdjMat[i].length != readAdjMatStr.length){  // the adjacency matrxi should be a square matrix
    console.log('Adjacency matrix dimension mismatch');
    process.exit(-1);
  }
}

var X0 = new grph.Graph(readPointsList.length, readPointsList, readAdjMat); // if directed matrix is given change to undirected graph
X0.removeDirection();
X0.setSourceNode(0); // initially the source node is the 0th node

var recordGraph =[]; // this is for recording the graph types
recordGraph[0] = []; 
recordGraph[0][0]=X0; // first element is the graph 
recordGraph[0][1]=1; // second element is number of times the graph is repeated

// this is for calculating the average number of nodes connected to vertex zero
var numberOfNodesConVert0 = X0.getConnectedNodes(0).length;

// this is for calculating the average number of edges in the graphs
var numberOfEdges = X0.getEdgeList().length;

// this is for claculating the average of longest path connected to vertex zero
var ShortestPathList = X0.getShortestPaths(0);
var lengthShortestPath =1;
for (var i =0; i < X0.noOfVertices; i++){
  if (ShortestPathList[i].length > lengthShortestPath){
    lengthShortestPath = ShortestPathList[i].length;
  }
}

var longestShortestPathLength = lengthShortestPath;

var isAddGraph = true // if the next graph has not appeared in the past record as new graph
  
var iteration = 0; 

var imgData = []; // this is for creating a report 

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
  var X1 = mcTools.returnNextGraphSingle(X0,T,r);
  //var X1 = mcTools.returnNextGraph(X0,T,r);
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



