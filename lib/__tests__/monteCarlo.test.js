const assert = require('assert');
const monteCarlo = require('../index.js');
const grph = require('../makeGraph.js')

describe('monteCarlo', () => {
  it('has a test', () => {
    assert(true, 'monteCarlo should have a test');
  });
});

describe('testing', function() {
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
    assert.equal(mockPoint.index, testVar.index);
    assert.equal(mockPoint.x, testVar.x);
    assert.equal(mockPoint.y, testVar.y);
  });
});

describe('testing', function() {
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

describe('testing', function() {
  it('shoud tests Graph constructor and methods in Graph Object', function() {
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
    //test by comparing the object elements  ... 
    assert.deepEqual(testVar,mockGraph);
  
    /////////////////////////////////////////
    //
    // TESTTING THE METHODS IN CLASS
    //
    /////////////////////////////////////////

    //method setSourceNode() test
    testVar.setSourceNode(2);
    assert.equal(testVar.sourceNode,2);

    var mockConNodes = [1,2,3];
    var testConNodes = testVar.getConnectedNodes(0);
    
    assert.deepEqual(testConNodes,mockConNodes);
    
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
    
    // Calling the calc distance method to get the distance between the two veritces
    assert.equal(testVar.calcDistance(0,1), 18);

    // Calling getDistMatix to genrate the matrix of distances between the nodes

    mockDistMat = [[0, 18, 16, 24.0832, 27.8926],
                   [18, 0, 24.0832, 16, 11.4018],
                   [16, 24.0832, 0, 18, 28.4605],
                   [24.0832, 16, 18, 0, 12.7279],
                   [27.8926, 11.4018, 28.4605, 12.7279, 0]];
                   
    var DistMat = testVar.getDistMat()
    for (var i=0;i< AssymMat.length; i++){
      for (var j = 0; j < AssymMat.length; j++){
        assert.equal(Math.abs(DistMat[i][j]-mockDistMat[i][j])<0.001,true);
      }
    }
  });
});


