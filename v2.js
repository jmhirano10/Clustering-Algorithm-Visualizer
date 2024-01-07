const v2 = {
    dis:function(v1,v2){
        let x = v1[0] - v2[0]
        let y = v1[1] - v2[1]
        return Math.sqrt(x**2 + y**2)
    },
    add:function(v1,v2){
        return [v1[0]+v2[0],v1[1]+v2[1]]
    },
    div:function(v,s){
        return [v[0]/s,v[1]/s]
    }
}