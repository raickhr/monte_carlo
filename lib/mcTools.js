const grph = require('./makeGraph.js');
const arrMath = require('./calc.js');
module.exports = {
    theta: function(Graph,rootVertex,r){
        //this function calculates the theta value from a graph
        var first_exp = 0;
        adjMatrix = Graph.adjMat;
        distMatrix = Graph.getDistMat(); // distance matrix for weights
        weightMatrix = arrMath.mul(adjMatrix,distMatrix); // sum of weights of all edges
        first_exp = r * arrMath.sumAllElem(weightMatrix)/2; // since symmetric summed twice
        
        //console.log('first_exp in theta',first_exp);
       
        var second_exp = 0;
        
        paths = Graph.getShortestPaths(rootVertex);
        for (var pathCount = 0; pathCount < paths.length; pathCount++){ //for every path
            //console.log('for path', paths[pathCount])
            for (var k = 1; k < paths[pathCount].length; k++){ // for every edge
                //for(var m = 1; m <= k;m++ ){
                    var indx1=paths[pathCount][k-1];
                    var indx2=paths[pathCount][k];
                    second_exp += distMatrix[indx1][indx2];
                    //console.log('distance between',indx1,indx2, 'dist = ',distMatrix[indx1][indx2]);
                    
                //}
            }
        }
        // console.log(second_exp);
        //console.log('second_exp in theta',second_exp)
        // console.log('Make the value of parameter r near ', second_exp/first_exp);
        return first_exp + second_exp;      
    },

    piJpiI: function(graph0,graph1,T,r){
        // this is the stationay distribution
        // piJ/piI
        var thetaDiff = this.theta(graph1,graph0.sourceNode,r)
                        -this.theta(graph0,graph0.sourceNode,r)
        //console.log('make parameter T near ',thetaDiff)
        var powerVal = -( thetaDiff )/T;
        var piRatio = Math.exp(powerVal);

        //console.log('piRatio from inside',piRatio)

        return piRatio;
    },

    mcHastingSingleAddDel: function(graph0, graph1, T,r){
        // This fucnction takes two graphs and two tuning parameter as input and then give the 
        // decision if the future step is to be accepted or not.
        // This method is for only the case when one edge is added or deleted at a time.
        var edgeList0 =graph0.getEdgeList();
        var noOfEdges0 = edgeList0.length;
        var removeableEdges0=graph0.getRemoveAbleEdges();
        var noOfBridges0 = noOfEdges0 - removeableEdges0.length;

        var edgeList1 = graph1.getEdgeList();
        var noOfEdges1 = edgeList1.length;
        var removeableEdges1=graph1.getRemoveAbleEdges();
        var noOfBridges1 = noOfEdges1 - removeableEdges1.length;

        var n = graph0.noOfVertices;

        noOfAllPossibleEdges = n/2 *(n-1);

        if (noOfEdges0 > noOfEdges1){
            q_ij = 1/(noOfEdges0-noOfBridges0); //probability of deleting one edge from graph0
            q_ji = 1/(noOfAllPossibleEdges - noOfEdges1); //probability of adding one edge to graph1
        }else{
            q_ij = 1/(noOfAllPossibleEdges - noOfEdges0); //probability of adding one edge to graph0
            q_ji = 1/(noOfEdges1-noOfBridges1); //probability of deleting one edge from graph1     
        }

        var piRatio = this.piJpiI(graph0,graph1,T,r);
        var prob = piRatio * q_ij/q_ji;
        
        if(prob > 1){
            prob = 1;
        }
        var u = Math.random();
        if (u <= prob){
            return true;
        }else{
            return false;
        }
    },

    mcHasting: function(graph0, graph1, T,r){
        // Metropolis Hasting algorithm for symmetric proposal distribution.
        var piRatio = this.piJpiI(graph0,graph1,T,r);
        var prob = 1;
        if(piRatio < prob){
            prob = piRatio;
        }
        //console.log('PiRatio',piRatio);
        var u = Math.random();
        //console.log('random Uniform u in [0,1]',u);
        //console.log(u <= prob);
        if (u <= prob){
            return true;
        }else{
            return false;
        }
    },

    getRandNode: function(noOfVertics,sourceNode){
        //retruns randomly an index of a vertice
        var randomIndex = Math.floor(Math.random()*noOfVertics);
        return randomIndex;
    },

    getRandEdgeToRemove: function(graph){
        // retuns a random edge from available edges
        var edgeList = graph.getRemoveAbleEdges();
        var randIndex = Math.floor(Math.random()*edgeList.length);
        return edgeList[randIndex];
    },

    getRandEdgeToAdd: function(graph){
        //returns a random edge that can be added
        var edgesNotAvail = graph.getAddableEdges()
        var randIndex = Math.floor(Math.random()*edgesNotAvail.length);
        return edgesNotAvail[randIndex];
    },

    getRandGraph: function(graph){

        //returns a random connected graph which by adding and deleting multiple edges at same time
        //This is to be used only with symmetric proposal distribution 
        // and hence not require proposal distribution because assuming uniform dist q_ij = q_ji
        var newNode = this.getRandNode(graph.noOfVertices,graph.sourceNode);
        //console.log('newNode', newNode); 
        graph.setSourceNode(newNode);

        var edgesCanBeRemoved = graph.getEdgeList();
        var edgesCanBeAdded = graph.getAddableEdges();

        var noOfEdgeRemove = Math.floor(Math.random() * edgesCanBeRemoved.length);
        var noOfEdgeAdd = Math.floor(Math.random() * edgesCanBeAdded.length);

        //console.log('removing ' + noOfEdgeRemove + ' edges')
        //console.log('adding ' + noOfEdgeAdd + ' edges')

        for (var i = 1; i < noOfEdgeAdd; i++){
            let randomIndex = Math.floor(Math.random() * edgesCanBeAdded.length);
            var randEdge = edgesCanBeAdded[randomIndex];
            edgesCanBeAdded.splice(randomIndex,1);
            //console.log('adding edge ', randEdge);
            graph.addEdge(randEdge);
        }

        for (var i = 1; i < noOfEdgeRemove; i++){
            let randomIndex = Math.floor(Math.random() * edgesCanBeRemoved.length);
            var randEdge = edgesCanBeRemoved[randomIndex];
            edgesCanBeRemoved.splice(randomIndex,1);
            //console.log('removing edge ', randEdge);
            graph.removeEdge(randEdge);
            if (graph.isConnected() == false){
                graph.addEdge(randEdge);
                edgesCanBeRemoved.push(randEdge);
            }
        }

        
        return graph;

    },

    getRandGraph_SingleAddDel(graph){
        //returns a random connected graph which by adding OR deleting one edges
        var newNode = this.getRandNode(graph.noOfVertices,graph.sourceNode);
        //console.log('newNode', newNode); 
        graph.setSourceNode(newNode);

        var toss = Math.random();
        var noOfRemoveableEdges = graph.getRemoveAbleEdges().length;
        var noOfAddableEdges = graph.getAddableEdges().length;
        if(noOfRemoveableEdges < 1){ // If there are no removeable edge the option is only to add
            //console.log('noOfRemoveableEdges', noOfRemoveableEdges)
            graph.addEdge(this.getRandEdgeToAdd(graph));
        }else if(noOfAddableEdges < 1){ // If there are no addable edge the option is only to remove
            graph.removeEdge(this.getRandEdgeToRemove(graph));
        }else{
            if (toss > 0.5 ){
                graph.addEdge(this.getRandEdgeToAdd(graph));
            }else{
                graph.removeEdge(this.getRandEdgeToRemove(graph));
            }
        }
        //console.log('inside get random graph singel',graph.adjMat);
        return graph;

    },

    returnNextGraph:function(X0,T,r){
        var pointList = [];
        for (var i = 0;i<X0.noOfVertices;i++){
            pointList[i] = [X0.vertices[i].x,X0.vertices[i].y]
        }
        var adjMat = JSON.parse(JSON.stringify(X0.adjMat)); 
        copyX0 = new grph.Graph(pointList.length,pointList,adjMat);
        
        var X1 = this.getRandGraph(copyX0);
        var dec =  this.mcHasting(X0,X1,T,r);//decMat[i];
        console.log('MCHasting Decision',dec);
        //dec == false
        if (dec == false){
            return X0;
        }else{
            return X1;
        }       
    },

    returnNextGraphSingle:function(X0,T,r){
        var pointList = [];
        for (var i = 0;i<X0.noOfVertices;i++){
            pointList[i] = [X0.vertices[i].x,X0.vertices[i].y]
        }
        var adjMat = JSON.parse(JSON.stringify(X0.adjMat)); 
        copyX0 = new grph.Graph(pointList.length, pointList, adjMat);

        var X1 = this.getRandGraph_SingleAddDel(copyX0);
        //console.log('aftergettingRandomGraph\n',X1.adjMat);
        
        var dec =  this.mcHastingSingleAddDel(X0,X1,T,r);//decMat[i];
        console.log('MCHasting Decision',dec);
        //dec == false
        if (dec == false){
            return X0;
        }else{
            return X1;
        }       
    }

}

 //A = [[1,1,1],[1,1,1]];
 //A.indexOf
// B = [[2,2,2],[2,2,2]];

// C = arrMath.mul(A,B);
// console.log(C);