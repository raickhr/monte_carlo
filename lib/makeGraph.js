'use strict';
class point {
    // make a node with index that has x and y values
    // this is used to store the points in a graph
    constructor(indx,x,y)
    {
        this.index = indx;
        this.x = x;
        this.y = y;
    }
}
class Graph { 
    // This is Graph class
    constructor(noOfVertices, pointList, adjMat) 
    { 
        //constructer function 
        this.noOfVertices = noOfVertices;
        this.vertices = [];
        for (var i = 0; i < noOfVertices; i++){
            //setting the vertex co-ordinates
            this.vertices[i] = new point(i, pointList[i][0],pointList[i][1]);
        }
        this.sourceNode = 0; //set default sourceNode to zero
        this.adjMat = adjMat; // this is the adjoint matrix of the graph
        this.path = []; // this is the list of paths from the source to the every points
    }

    setSourceNode(node){
        //this method allows to set a source node
        this.sourceNode = node;
    }

    getTotalPossibleEdges(){
        //this method give total number of possible edges from the number of nodes
        var n = this.noOfVertices;
        return (n/2 *( n-1));
    }

    getConnectedNodes(root){
        //this method allow to see the nunber of the nodes connected to the vertex passed
        var adjAtRoot = this.adjMat[root];
        var connectedNodes = [];
        var indx = adjAtRoot.indexOf(1);
        while(indx != -1){
            connectedNodes.push(indx);
            indx = adjAtRoot.indexOf(1, indx + 1);
        }
        return connectedNodes;
    }

    removeDirection(){
        //A directed grph has assymetric adjoint matrix of directed graph to symmetric to remove direction
        var A = this.adjMat;
        //console.log(A);
        var len = A.length;
        for (var i =0;i < len; i++){
            for (var j = 0; j< i; j++){
                var a = A[i][j];
                var b = A[j][i];
                if(a != b){
                    //removing direction in either way
                    if(this.adjMat[i][j] == 1){    
                        this.adjMat[j][i] = 1;
                    }else if(this.adjMat[j][i] == 1){
                        this.adjMat[i][j] = 1;
                    }
                }
            }
        }
    }

    calcDistance(v1,v2){
        // Calculates the distance between the vertices v1 and v2 
        var vert1 = this.vertices[v1];
        var vert2 = this.vertices[v2];
        var dist = Math.sqrt(Math.pow((vert1.x - vert2.x),2) + Math.pow((vert1.y - vert2.y),2))
        return dist;
    }
    getDistMat()
    {
        // Returns a matrix of distance between the vertices
        var len = this.noOfVertices;
        var DistMat = new Array(1);
        for (var i=0; i < len; i++){
            DistMat[i] = new Array(0)
            for (var j=0; j <= i; j++){
                var dist = this.calcDistance(i,j);
                DistMat[i][j] = dist;
                DistMat[j][i] = dist;
            }
        }
        return DistMat;

    }

    addEdge(edge){
        //Adds edge symmetrically to the adjMatrix
        var v1 = edge[0];
        var v2 = edge[1];
        this.adjMat[v1][v2] = 1;
        this.adjMat[v2][v1] = 1;
    }

    removeEdge(edge){
        //removes edge symmetrically from the adj Matrix
        //console.log('inside removeedge',edge)
        var v1 = edge[0];
        var v2 = edge[1];
        this.adjMat[v1][v2] = 0;
        this.adjMat[v2][v1] = 0;
    }

    getEdgeList()
    {
        //This method gives an array of edges in the non directed graph
        //This is not fit for giving edges of directed graph
        var edgeList = [];
        for (var i =0;i< this.noOfVertices; i++){
            for (var j =0;j< i; j++){
                var current = this.adjMat[i][j]
                if (current == 1){
                    edgeList.push([i,j]);
                }
            }
        }
        return edgeList;
    }

    getAddableEdges(){
        //This method gives the list of edges which are not there in the graph which can be added
        var edgeList = [];
        for (var i =0;i< this.noOfVertices; i++){
            for (var j =0;j< i; j++){
                var current = this.adjMat[i][j]
                if (current != 1){
                    edgeList.push([i,j]);
                }
            }
        }
        return edgeList;
    }

    getRemoveAbleEdges()
    {
        //This method give the edges that are not bridges
        var edgelist = [];
        var availEdges = this.getEdgeList();
        //console.log('edges available',availEdges);
        for (var i= 0;i < availEdges.length ; i++){
            this.removeEdge(availEdges[i]);
            //console.log('removing edge',availEdges[i])
            if (this.isConnected()){
                edgelist.push(availEdges[i]);
                //console.log('yes its bridge \n');
            }
            this.addEdge(availEdges[i]);
        }

        return edgelist;
    }

    getShortestPaths(root){
        // Implements breadth first search algorithm to find 
        // shortest path of all vertices from the input vertex
        // The result is a list of paths to all vertices. The fist is start and last is end vertex index.
        
        var graph = this.adjMat
        var stepsToNode = []; //number of steps to each vertex stored in this variable
        var pathToVert = new Array(1); //vertex in the shortest path stored in this variable
    
        for(var i = 0; i < graph.length; i++){
            stepsToNode[i] = Infinity; // initialize the number of steps to each vertex as infinity
            pathToVert[i] = new Array(1); 
            pathToVert[i][0] = root; // initizlie firt vertex in every path is sourcenode
        }
        stepsToNode[root] = 0; // number of steps to itself is zero
        
        var queue = [root]; // starting a queue to parse
        var current; 
    
        while (queue.length != 0){
            //get a current node 
            current = queue.shift(); //also pop out the element in the queue
            
            //get list of all nodes connected to current node
            var neighborIdx = this.getConnectedNodes(current); 
    
            for (var j = 0 ; j < neighborIdx.length; j ++){
                if (stepsToNode[neighborIdx[j]] == Infinity){
                    //stepsToNode[current] is number of steps come so for for current vertex
                    //stepsToNode[neighborIdx[j]] visited so increase the step
                    stepsToNode[neighborIdx[j]] = stepsToNode[current] +1 ;
                    //see if the current vertex is in path and if not add to the path
                    var len = pathToVert[neighborIdx[j]].length - 1;
                    if (pathToVert[neighborIdx[j]][len] != current){
                        pathToVert[neighborIdx[j]].push(current);
                    }
                    //path now goes from every connected neighbor
                    queue.push(neighborIdx[j]); //hence add to list 
                }
                // see if the dest vertex is in the path if not add to the path
                len = pathToVert[neighborIdx[j]].length - 1;
                if (pathToVert[neighborIdx[j]][len] != neighborIdx[j]){
                    pathToVert[neighborIdx[j]].push(neighborIdx[j]);
                }
            }
        }
        //return stepsToNode
        return pathToVert; //returns array of paths
    }
    
    isConnected(){
        //This method returns true if the graph is connected
        var nodeSteps = this.getShortestPaths(0);
        //console.log(nodeSteps);
        var len = nodeSteps.length;
        
        var con = true;
        for(var cc = 1; cc < len; cc++){
            if (nodeSteps[cc].length == 1){
                con = false;
            }
        }
        return con;
    }


}

module.exports = { Graph, point };
