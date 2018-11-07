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
        var v1 = edge[0];
        var v2 = edge[1];
        this.adjMat[v1][v2] = 0;
        this.adjMat[v2][v1] = 0;
    }

    getEdgeList()
    {
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

    getPossibleEdges()
    {
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

    extndPaths(path){
        var newPaths = []
        var oldPath = path;
        var endIndx = oldPath.length -1;
        var extNode = oldPath[endIndx];
        var conNodes = this.getConnectedNodes(extNode);
        var dummy =[];
        var count = 0;
        for (var i = 0; i < conNodes.length; i++){ 
            if(oldPath.indexOf(conNodes[i]) == -1){
                dummy = oldPath.slice(0);
                dummy.push(conNodes[i]);
                newPaths[count] = dummy;
                count++;
            }
        }
        if (count > 0){
            return newPaths
        }
        else {
            return [oldPath]
        }
        
    }
    addPath(path){
        var noOfPaths = this.path.length;
        this.path[noOfPaths] = path;
    }

    getAllPaths(root)
    {
        this.addPath([root]);
        var pathQueue = [[root]];
        var currentPathIndx = 0;
            
        while(pathQueue.length != 0){
            var isAddPath = false;
            var currentNoOfPaths = this.path.length;
            var currentPath = pathQueue.shift();
            var dummy = this.extndPaths(currentPath);
            for (var i=0;i<dummy.length; i++){
                if (dummy[i].length != currentPath.length){
                    var isAddPath =true;
                }
            }
            if (isAddPath){
                this.path.splice(currentPathIndx,1);
                for (var i=0;i<dummy.length; i++){
                    this.addPath(dummy[i]);
                    pathQueue.push(dummy[i]);
                }
            }else{
                currentPathIndx++;
            }
        }
        return this.path

    }

    getShortestPaths(root){
        var graph = this.adjMat
        var nodeslen = [];
        var pathToVert = new Array(1);
    
        for(var i = 0; i < graph.length; i++){
            nodeslen[i] = Infinity;
            pathToVert[i] = new Array(1);
            pathToVert[i][0] = root;
        }
        nodeslen[root] = 0;
        
        
        var queue = [root];
        var current;
    
        while (queue.length != 0){
            current = queue.shift();
            //console.log(current);
            var curConnected = graph[current];
            var neighborIdx = [];
            var idx = curConnected.indexOf(1);
            while (idx != -1){
                neighborIdx.push(idx);
                idx = curConnected.indexOf(1,idx +1);
            }
    
            for (var j = 0 ; j < neighborIdx.length; j ++){
                if (nodeslen[neighborIdx[j]] == Infinity){
                    //var setps = nodeslen[current];
                    nodeslen[neighborIdx[j]] = nodeslen[current] +1 ;
                    var len = pathToVert[neighborIdx[j]].length - 1;
                    if (pathToVert[neighborIdx[j]][len] != current){
                        pathToVert[neighborIdx[j]].push(current);
                    }
                    queue.push(neighborIdx[j]);
                }
                len = pathToVert[neighborIdx[j]].length - 1;
                if (pathToVert[neighborIdx[j]][len] != neighborIdx[j]){
                    pathToVert[neighborIdx[j]].push(neighborIdx[j]);
                }
            }
        }
        //return nodeslen
        return pathToVert;
    }

    isConnected()
    {
        var nodeSteps = this.getShortestPaths(0);
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
