module.exports = {
    mul:function(A , B){
        if (A.length != B.length){
            console.log("ERROR ARRAY SIZE MISMATCH !!")
            return NaN
        }
        var arrPrd = [];
        arrPrd = new Array(A.length);
        for (var i = 0; i < A.length; i++){
            if (A[i].length != B[i].length){
                console.log("ERROR ARRAY SIZE MISMATCH !!")
                return NaN
            }
            arrPrd[i] = new Array(A[i].length);
            for(var j = 0; j< A[i].length; j++){
                arrPrd[i][j] = A[i][j] * B[i][j];
            }
        }
        return arrPrd;
    },
    
    sumAllElem:function(A){
        var sumVal=0;
        for (var i = 0; i < A.length; i++){
            for (var j = 0; j < A[i].length; j++){
                sumVal += A[i][j];
            }
        }
        return sumVal;
    }
    
}
