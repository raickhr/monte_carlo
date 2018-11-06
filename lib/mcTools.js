const grph = require('./makeGraph.js');
const arrMath = require('./calc.js');
module.exports = {
    theta: function(Graph,rootVertex,r){
        var first_exp = 0;
            adjMatrix = Graph.adjMat;
            distMatrix = Graph.getDistMat();
            weightMatrix = arrMath.mul(adjMatrix,distMatrix);
            first_exp = r * arrMath.sumAllElem(weightMatrix)/2;
        
        
        var second_exp = 0;
            paths = Graph.getShortestPaths(rootVertex);
            for (var pathCount = 0; pathCount < paths.length; pathCount++){
                for (var k = 1; k < paths[pathCount].length; k++){
                    for(var m = 1; m <= k;m++ ){
                        var indx=paths[pathCount][m];
                        second_exp += distMatrix[rootVertex][indx];
                    }
                }
            }
        return first_exp + second_exp;      
    },

    piJpiI: function(graph0,graph1,T,r){
        var powerVal = -(this.theta(graph1,graph0.sourceNode,r) - 
                        - this.theta(graph0,graph0.sourceNode,r))/T;
        var piRatio = Math.exp(powerVal);

        return piRatio;
    },

    mcHasting: function(graph0,graph1,T,r){
        var piRatio = this.piJpiI(graph0,graph1,T,r);
        var prob = 1;
        if(piRatio < prob){
            prob = piRatio;
        }
        //console.log(prob);
        var u = Math.random();
        //console.log(u);
        //console.log(u <= prob);
        if (u >= prob){
            return true;
        }else{
            return false;
        }
    },

    getRandNode: function(noOfVertics,sourceNode0){
        var len = noOfVertics;
        var AllPossibleDestNodes = [];
        for (var i = 0; i < len;i++){
            destNodes.push(i);
        }
        AllPossibleDestNodes.splice(AllPossibleDestNodes.indexOf(sourceNode0));

        var randomIndex = Math.floor(Math.random()*AllPossibleDestNodes.length);
        var DestNode = AllPossibleDestNodes[randomIndex];
        return DestNode;
    },

    getRandEdgeToRemove: function(graph){
        var edgesAvail = graph.getEdgeList();
        var randIndex = Math.floor(Math.random()*edgesAvail.length);
        return edgesAvail[randIndex];
    },

    getRandEdgeToAdd: function(graph){
        var edgesNotAvail = graph.getPossibleEdges();
        var randIndex = Math.floor(Math.random()*edgesNotAvail.length);
        return edgesNotAvail[randIndex];
    },

    getRandGraph: function(graph){
        
        var newNode = this.getRandNode(graph.noOfVertics,graph.sourceNode); 
        graph.setSourceNode(newNode);

        var edgesCanBeRemoved = graph.getEdgeList();
        var edgesCanBeAdded = graph.getPossibleEdges();

        var noOfEdgeRemove = Math.floor(Math.random() * edgesCanBeRemoved.length);
        var noOfEdgeAdd = Math.floor(Math.random() * edgesCanBeAdded.length);

        //console.log('removing ' + noOfEdgeRemove + ' edges')
        //console.log('adding ' + noOfEdgeAdd + ' edges')

        for (var i = 1; i < noOfEdgeRemove; i++){
            var randEdge = this.getRandEdgeToRemove(graph);
            //console.log('removing edge ', randEdge);
            graph.removeEdge(randEdge);
            if (graph.isConnected() == false){
                graph.addEdge(randEdge);
            }
        }

        for (var i = 1; i < noOfEdgeAdd; i++){
            var randEdge = this.getRandEdgeToAdd(graph);
            //console.log('adding edge ', randEdge);
            graph.addEdge(randEdge);
        }

        return graph;

    },

    returnNextGraph:function(X0){
        var T =1;
        var r =1;
        copyX0 = JSON.parse(JSON.stringify(X0));
        var X1 = this.getRandGraph(X0);
        var dec =  this.mcHasting(X0,X1,T,r);//decMat[i];
        //console.log(dec);
        if (dec == false){
          X1.sourceNode = copyX0.sourceNode;
          X1.adjMat = copyX0.adjMat;
        }
        return X1;       
    }

    
}

 //A = [[1,1,1],[1,1,1]];
 //A.indexOf
// B = [[2,2,2],[2,2,2]];

// C = arrMath.mul(A,B);
// console.log(C);