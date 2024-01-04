const CANVAS = document.getElementById('cluster')
const CTX = CANVAS.getContext('2d')
const WIDTH = CANVAS.clientWidth
const HEIGHT = CANVAS.clientHeight

function PlotData(data){
    for (var point of data){
        draw.CircleFilled(draw.CorrectPos(point),'red')
    }
}

var draw = {
    pointRadius:5,
    circleRadius:20,
    scale: 20,
    xOffset: 10,
    yOffset: 0
}
draw.CircleFilled = function(p,color){
    CTX.beginPath()
    CTX.arc(p[0],p[1],this.pointRadius, 0, Math.PI * 2)
    CTX.fillStyle = color
    CTX.fill()
    CTX.closePath()
}
draw.CircleEmpty = function(p,color){
    CTX.beginPath()
    CTX.arc(p[0],p[1],this.circleRadius, 0, Math.PI * 2)
    CTX.strokeStyle = color
    CTX.stroke()
}
draw.Line = function(p1,p2,width,color){
    CTX.beginPath()
    CTX.lineWidth       = width
    CTX.strokeStyle     = color
    CTX.moveTo(p1[0],p1[1])
    CTX.lineTo(p2[0],p2[1])
    CTX.stroke()
}
draw.CorrectPos = function(p){
    return [(p[0] - this.xOffset)*this.scale,CANVAS.clientHeight - (p[1] - this.yOffset)*this.scale]
}
draw.GuideLines = function(){
    CTX.clearRect(0,0,WIDTH,HEIGHT)
}


//Helper Functions
function CalibrateCanvas(canvas,ctx){
    let dpr = window.devicePixelRatio
    canvas.width = canvas.clientWidth * dpr
    canvas.height = canvas.clientHeight * dpr
    ctx.scale(dpr,dpr)
}


//Example Data
var p1 = [0.5,0.6]
var p2 = [0.4,0.5]
var p3 = [0.5,0.55]
var p4 = [2.67,2.4]
var p5 = [2.45,2.5]
var p6 = [2.56,2.46]
var p7 = [2.3,2.3]
var data = [p1,p2,p3,p4,p5,p6,p7]


CalibrateCanvas(CANVAS,CTX)
PlotData(data)