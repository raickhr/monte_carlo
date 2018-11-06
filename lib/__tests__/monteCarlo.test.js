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
    assert.equal(mockPoint.index, testVar.index);
    assert.equal(mockPoint.x, testVar.x);
    assert.equal(mockPoint.y, testVar.y);
  });
});

describe('testing', function() {
  it('shoud tests Graph constructor in makeGraph module', function() {
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
    assert.equal(testVar.noOfVertices, mockGraph.noOfVertices);
    for (var i =0; i < mockGraph.noOfVertices;i++){
      assert.equal(testVar.vertices[i].index,mockGraph.vertices[i].index)
      assert.equal(testVar.vertices[i][0],mockGraph.vertices[i][0])
      assert.equal(testVar.vertices[i][1],mockGraph.vertices[i][1])
    }

    for (var i =0; i < mockGraph.adjMat.length;i++){
      for (var j=0; j < mockGraph.adjMat.length;j++){
        assert.equal(testVar.adjMat[i][j], mockGraph.adjMat[i][j]);  
      }
    }

    assert.equal(testVar.sourceNode,testVar.sourceNode);

    // Now teting the methods in the Graph class
    testVar.setSourceNode(2);
    assert.equal(testVar.sourceNode,2);

  });
});


