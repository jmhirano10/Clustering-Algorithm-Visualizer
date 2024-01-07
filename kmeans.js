const KMEANS = {
    K:              2,
    ITERATIONS:     10,
    CLUSTERS:       [[1,3],[2,3]],
    CLUSTER_AVG:    [[0,0],[0,0]],
    CLUSTER_CNT:    [0,0],
    POINT_LABEL:    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
}

KMEANS.PointIteration = function(data){
    for (let j = 0; j<data.length; j++){
        let minDis = v2.dis(data[j],this.CLUSTERS[0])
        let minClu = 0
        for (let i = 1; i<this.CLUSTERS.length; i++){
            let dis = v2.dis(data[j],this.CLUSTERS[i])
            if (dis < minDis){
                minDis = dis
                minClu = i
            }
        }
        this.POINT_LABEL[j] = minClu
        this.CLUSTER_AVG[minClu] = v2.add(this.CLUSTER_AVG[minClu],data[j])
        this.CLUSTER_CNT[minClu] += 1
    }
    for (let i = 0; i<this.CLUSTERS.length; i++){
        if (this.CLUSTER_CNT[i] != 0){
            this.CLUSTERS[i] = v2.div(this.CLUSTER_AVG[i],this.CLUSTER_CNT[i])
        }
    }
    this.CLUSTER_AVG = [[0,0],[0,0]]
    this.CLUSTER_CNT = [0,0]
}
KMEANS.PlotData = function(data){
    for (let i = 0; i<data.length; i++){
        if (this.POINT_LABEL[i] >= 0){
            CircleFilled(data[i],COLORS.CLUSTERS[this.POINT_LABEL[i]])
        }
        else {
            CircleFilled(data[i],COLORS.POINT)
        }
    }
    for (let i=0; i<this.CLUSTERS.length; i++){
        CircleEmpty(this.CLUSTERS[i],1,COLORS.POINT)
        CircleEmpty(this.CLUSTERS[i],50,COLORS.OUTLINE)
        CircleEmpty(this.CLUSTERS[i],100,COLORS.OUTLINE)
        CircleEmpty(this.CLUSTERS[i],150,COLORS.OUTLINE)
    }
}
