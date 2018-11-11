const assert = require('assert');
const mcTools = require('../mcTools.js');
const grph = require('../makeGraph.js')

describe('monteCarlo', () => {
  it('has a test', () => {
    assert(true, 'monteCarlo should have a test');
  });
});

describe('Test Point object', function() {
  it('shoud tests Point constructor in makeGraph module', function() {
    //create a mock object 
    var mockPoint = {
      index :1,
      x:2, 
      y:3
    }
    //create an object from the constructor
    var testVar = new grph.point(1,2,3);

    //test by compare...
    assert.deepEqual(testVar,mockPoint);
  });
});

//create a mock object 
var mockGraph = {
  noOfVertices: 5,
  vertices:[  {index: 0, x: 10, y: 12 },
              {index: 1, x: 28, y: 12 },
              {index: 2, x: 10, y: 28 },
              {index: 3, x: 28, y: 28 },
              {index: 4, x: 37, y: 19 } ],
  sourceNode: 0,
  adjMat: [ [ 0, 1, 1, 1, 0 ],
            [ 1, 0, 1, 0, 1 ],
            [ 1, 1, 0, 0, 0 ],
            [ 1, 0, 0, 1, 0 ],
            [ 0, 1, 0, 0, 0 ] ],
  path: [] 
}

var pointList = [[10,12],
             [28,12],
             [10,28],
             [28,28],
             [37,19]];

var adjMat = [ [ 0, 1, 1, 1, 0 ],
               [ 1, 0, 1, 0, 1 ],
               [ 1, 1, 0, 0, 0 ],
               [ 1, 0, 0, 1, 0 ],
               [ 0, 1, 0, 0, 0 ] ];

//create an object from the constructor
var testVar = new grph.Graph(pointList.length, pointList, adjMat);

describe('Test Graph Object', function() {
  it('shoud tests Graph constructor and methods in Graph Object', function() {
    //test by comparing the object elements  ... 
    var testVar2 = new grph.Graph(pointList.length, pointList, adjMat);
    assert.deepEqual(testVar2,mockGraph);

  });
});

  
    /////////////////////////////////////////
    //
    // TESTTING THE METHODS IN CLASS
    //
    /////////////////////////////////////////
describe('Test setSourceNode', function() {
  it('shoud tests method setSourceNode() ', function() {
    
    //method setSourceNode() test
    testVar.setSourceNode(2);
    assert.equal(testVar.sourceNode,2);

  });
});


describe('Test getTotalPossibleEdges', function() {
  it('shoud tests getTotalPossibleEdges', function() {
      
    //method getTotalPossibleEdges
    assert.equal(testVar.getTotalPossibleEdges(),10)

  });
});


describe('method getConnectedNodes', function() {
  it('shoud tests method getConnectedNodes', function() {
    
    //method getConnectedNodes
    var mockConNodes = [1,2,3];
    var testConNodes = testVar.getConnectedNodes(0);
    
    assert.deepEqual(testConNodes,mockConNodes);

  });
});


describe('Test method removeDirection', function() {
  it('shoud tests method removeDirection', function() {
        
    // method removeDirection()
    // remove Direction changes the Assymetic adjoint matrix to symmetric adjoint matrix
    var AssymMat = [[0, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0],
                    [1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 1, 0, 0, 0]];
    var testVar2 = new grph.Graph(pointList.length,pointList,AssymMat);
    testVar2.removeDirection();
    assert.deepEqual(testVar.adjMat,mockGraph.adjMat);

  });
});

describe('Test method calcDistance', function() {
  it('shoud tests method calcDistance', function() {
         
    // Calling the calc distance method to get the distance between the two veritces
    assert.equal(testVar.calcDistance(0,1), 18);

  });
});


describe('Test method getDistMat', function() {
  it('shoud tests method getDistMat', function() {
        

    // Calling getDistMatix to genrate the matrix of distances between the nodes
    mockDistMat = [[0, 18, 16, 24.0832, 27.8926],
                   [18, 0, 24.0832, 16, 11.4018],
                   [16, 24.0832, 0, 18, 28.4605],
                   [24.0832, 16, 18, 0, 12.7279],
                   [27.8926, 11.4018, 28.4605, 12.7279, 0]];
    var DistMat = testVar.getDistMat()
    for (var i=0;i< mockDistMat.length; i++){
      for (var j = 0; j < mockDistMat.length; j++){
        assert.equal(Math.abs(DistMat[i][j]-mockDistMat[i][j])<0.001,true);
      }
    }
  });
});

describe('Test AddEdge method', function() {
  it('shoud tests AddEdge method', function() {
    // testing AddEdge method
    //console.log(testVar.adjMat);
    assert.equal(testVar.adjMat[0][4],0); // The edge is first zero
    testVar.addEdge([0,4]);
    assert.equal(testVar.adjMat[0][4],1); // The edge is now added
    assert.equal(testVar.adjMat[4][0],1); // Symmetric 
    testVar.adjMat[4][0]=0;
    testVar.adjMat[0][4]=0;
  });
});


describe('Test method removeEdge', function() {
  it('shoud tests method removeEdge', function() {
    /// testing RemoveEdge method
    testVar.removeEdge([1,0]);
    assert.equal(testVar.adjMat[1][0],0) // The added edge is now removed
    assert.equal(testVar.adjMat[0][1],0) // Symmetric Check
    testVar.adjMat[1][0] = 1;
    testVar.adjMat[0][1] = 1;
  });
});


describe('Test method getEdgeList', function() {
  it('shoud tests method getEdgeList', function() {
        
    // testing getEdgeList method
    var mockEdgeList = [ [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 0 ], [ 4, 1 ] ];
    assert.deepEqual(testVar.getEdgeList(),mockEdgeList);
  });
});


describe('Test method getAddableEdges', function() {
  it('shoud tests method getAddableEdges', function() {
        
    // testing getPossibleEdges method
    var mockPossibleEdges = [ [ 3, 1 ], [ 3, 2 ], [ 4, 0 ], [ 4, 2 ], [ 4, 3 ] ];
    assert.deepEqual(testVar.getAddableEdges(), mockPossibleEdges);
  });
}); 

describe('Test method getRemoveable Edges', function() {
  it('shoud tests method getRemoveable Edges', function() {
        
    // testing getPossibleEdges method
    //console.log(testVar.getRemoveAbleEdges());
    var mockPossibleEdges = [ [ 1,0 ], [ 2,0 ], [ 2,1 ] ];
    assert.deepEqual(testVar.getRemoveAbleEdges(), mockPossibleEdges);
  });
}); 

    
describe('Test method getShortestPath', function() {
  it('shoud tests method getShortestPath', function() {
        
    // testing getShortestPath method
    // first element is the start and end element is the end of the path
    var mockShortestPaths =  [ [ 1, 0 ], [ 1 ], [ 1, 2 ], [ 1, 0, 3 ], [ 1, 4 ] ];
    assert.deepEqual(testVar.getShortestPaths(1),mockShortestPaths);
  });
});

describe('Test method isConnected', function() {
  it('shoud tests connectivity of the graph', function() {  
    // testing if the graph is connected
    var AssymMat = [[0, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0],
                    [1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 1, 0, 0, 0]];
    var testVar2 = new grph.Graph(pointList.length,pointList,AssymMat);
    assert.equal(testVar2.isConnected(),false);
    // testing 
  });
});

var pointList = [[10,12],
                 [28,12],
                 [10,28],
                 [28,28],
                 [37,19]];

    var adjMat1 =[ [ 0, 1, 1, 1, 0 ],
                   [ 1, 0, 1, 0, 1 ],
                   [ 1, 1, 0, 0, 0 ],
                   [ 1, 0, 0, 0, 0 ],
                   [ 0, 1, 0, 0, 0 ] ];

    var adjMat2 =[ [ 0, 1, 1, 1, 0 ],
                   [ 1, 0, 1, 1, 1 ],
                   [ 1, 1, 0, 0, 0 ],
                   [ 1, 1, 0, 0, 1 ],
                   [ 0, 1, 0, 1, 0 ] ];

    var adjMat3 = [ [ 0, 1, 1, 1, 0 ],
                   [ 1, 0, 1, 1, 1 ],
                   [ 1, 1, 0, 0, 0 ],
                   [ 1, 1, 0, 0, 0 ],
                   [ 0, 1, 0, 0, 0 ] ];

    //create an object from the constructor
    var X0 = new grph.Graph(pointList.length, pointList, adjMat1);
    X0.setSourceNode(0);

    var X1 = new grph.Graph(pointList.length, pointList, adjMat2);
    X1.setSourceNode(1);

    var X2 = new grph.Graph(pointList.length, pointList, adjMat3);
    X2.setSourceNode(1);

describe('Test Theta', function() {
  it('shoud function theta from mcTools.js', function() {
    var theta = mcTools.theta(X0,0,1);
    //console.log();
    assert.equal(Math.abs(theta - 181.0532)<0.001,true);
  });
});

describe('Test Stationary Function', function() {
  it('shoud function piJpiI from mcTools.js', function() {
    var T =28.7279;
    var r =1;
    var piJpiI= mcTools.piJpiI(X0,X1,T,r);
    assert.equal(Math.abs(piJpiI - 0.3678)<0.001,true);
  });
});

describe('Test MCHasting Function', function() {
  it('shoud function mcHasting from mcTools.js', function() {
    var T =28.7279;
    var r =1;
    var trueCount = 0;
    var falseCount = 0;
    for (var i = 0;i < 1000; i++){
      if(mcTools.mcHasting(X0,X1,T,r)){
        trueCount++;
      }else{
        falseCount++;
      }
    }
    estimateTrueProb = 0.3678  // This is obtained from the pi ration for symmetric proposal distribution.
    TrubProb = trueCount/1000;
    //assert.equal(TrubProb,estimateTrueProb);
    assert.equal(Math.abs(TrubProb-estimateTrueProb)<0.1,true);
  });
});

describe('Test MCHastingSingleAddDel Function', function() {
  it('shoud function mcHastingSingleAddDel from mcTools.js', function() {
    var T =30;
    var r =1;
    var trueCount = 0;
    var falseCount = 0;
    for (var i = 0;i < 1000; i++){
      if(mcTools.mcHastingSingleAddDel(X0,X2,T,r)){
        trueCount++;
      }else{
        falseCount++;
      }
    }
    estimateTrueProb = 0.5866  // This is obtained from the pi ratio time proposal distribution
    TrubProb = trueCount/1000;
    //assert.equal(true,true);
    //assert.equal(TrubProb,estimateTrueProb);
    assert.equal(Math.abs(TrubProb-estimateTrueProb)<0.1,true);
  });
});

describe('Test getRandNode', function() {
  it('should test getRandNode from mcTools.js', function() {
    var count = 0;
    for (var i =0; i< 1000; i++){
      var val = mcTools.getRandNode(5,0)
      if((val) = 0){
        count++;
      }
    }
    count /= 1000;
    assert.equal(((Math.abs(count)-0.20)*100 < 5),true); ///probability is 20% from 5 vertices
  });
});

describe('Test getRandEdgeToRemove', function() {
  it('should test getRandEdgeToRemove from mcTools.js', function() {
    var count = 0;
    for (var i =0; i< 1000; i++){
      var val = mcTools.getRandEdgeToRemove(X0);
      if(JSON.stringify(val) === JSON.stringify([1,0]) ){
        count++;
      }
    }
    count /= 1000;
    assert.equal(((Math.abs(count)-0.33) < 0.05),true); // probabilty if 33% with 3 total edges
  });
});

describe('Test getRandEdgeToAdd', function() {
  it('should test getRandEdgeToAdd from mcTools.js', function() {
    var count = 0;
    for (var i =0; i< 1000; i++){
      var val = mcTools.getRandEdgeToAdd(X0);
      if(JSON.stringify(val) === JSON.stringify([1,0]) ){
        count++;
      }
    }
    count /= 1000;
    assert.equal(((Math.abs(count)-0.20)*100 < 1),true); // probabilty if 20% with 5 total edges
  });
});

describe('Test getRandGraph_SingleAddDel', function() {
  it('should test getRandGraph_SingleAddDel from mcTools.js', function() {
    // this fuction generates a random graph by either adding or deleting a single edge
    // Hence the probability of getting a graph with one edge more is 50%
    var count = 0;
    for (var i =0; i< 1000; i++){
      var nextX = mcTools.getRandGraph_SingleAddDel(X0);
      if(nextX.getEdgeList().length > X0.getEdgeList().length){
        count++;
      }
    }
    count /= 1000;
    assert.equal(((Math.abs(count)-0.5)*100 < 1),true); // probabilty if 20% with 5 total edges
  });
});

describe('returnNextGraphSingle', function() {
  it('should test returnNextGraphSingle from mcTools.js', function() {
    // this fuction gives the next graph from metropolis hasting algorithm
    // Probability of getting same graph is less than 50%
    var count = 0;
    for (var i =0; i< 1000; i++){
      var nextX = mcTools.returnNextGraphSingle(X0,1,1);
      if( JSON.stringify(nextX) !== JSON.stringify(X0)){
        count++;
      }
    }
    count /= 1000;
    assert.equal(((Math.abs(count)-0.5)*100 > 1),true); // probabilty if 20% with 5 total edges
  });
});