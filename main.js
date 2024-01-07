//Graphics
const CANVAS        = document.getElementById('cluster')
const CTX           = CANVAS.getContext('2d')
const WIDTH         = CANVAS.clientWidth
const HEIGHT        = CANVAS.clientHeight

//Buttons
const START         = document.getElementById('start')

const COLORS = {
    MD_GRID:        '#757575',
    SM_GRID:        '#292929',
    POINT:          '#cfcfcf',
    OUTLINE:          '#787878',
    BACKGROUND:     '#1a1a1a',
    CLUSTERS:       ['#32a852','#e07919','#22bde0','#c22de0','#deb935']
}

const GRAPH = {
    X_OFFSET:       -1,
    Y_OFFSET:       -1,
    SCALE:          100,
    SM_GRID_FREQ:   1,
    POINT_RAD:      5,
    ANI_ID:         0
}

const INPUT = {
    X_O:            0,
    Y_O:            0,
    X_OFFSET_O:     0,
    Y_OFFSET_O:     0,
    MOUSE_1:        false,
    MOUSE_2:        false
}


//Draw to Canvas Functions
function CircleFilled(p,color){
    p = CorrectPos(p)
    CTX.beginPath()
    CTX.arc(p[0],p[1],GRAPH.POINT_RAD, 0, Math.PI * 2)
    CTX.fillStyle = color
    CTX.fill()
    CTX.closePath()
}
function CircleEmpty(p,radius,color){
    p = CorrectPos(p)
    CTX.beginPath()
    CTX.arc(p[0],p[1],radius, 0, Math.PI * 2)
    CTX.strokeStyle = color
    CTX.stroke()
}
function Line(p1,p2,width,color){
    p1 = CorrectPos(p1)
    p2 = CorrectPos(p2)
    CTX.beginPath()
    CTX.lineWidth       = width
    CTX.strokeStyle     = color
    CTX.moveTo(p1[0],p1[1])
    CTX.lineTo(p2[0],p2[1])
    CTX.stroke()
}
function GuideLines(){
    CTX.fillStyle = COLORS.BACKGROUND
    CTX.fillRect(0,0,WIDTH,HEIGHT)
    let x1 = Math.ceil(GRAPH.X_OFFSET/GRAPH.SM_GRID_FREQ)
    let x2 = Math.floor((WIDTH/GRAPH.SCALE + GRAPH.X_OFFSET)/GRAPH.SM_GRID_FREQ)
    let y1 = Math.ceil(GRAPH.Y_OFFSET/GRAPH.SM_GRID_FREQ)
    let y2 = Math.floor((HEIGHT/GRAPH.SCALE + GRAPH.Y_OFFSET)/GRAPH.SM_GRID_FREQ)
    for (let x = x1; x<=x2; x++){
        if (x == 0){
            Line([x,y1-GRAPH.SM_GRID_FREQ],[x,y2+GRAPH.SM_GRID_FREQ],1,COLORS.MD_GRID)
        }
        else {
            Line([x,y1-GRAPH.SM_GRID_FREQ],[x,y2+GRAPH.SM_GRID_FREQ],0.5,COLORS.SM_GRID)
        }
        
    }
    for (let y = y1; y<=y2; y++){
        if (y == 0){
            Line([x1-GRAPH.SM_GRID_FREQ,y],[x2+GRAPH.SM_GRID_FREQ,y],1,COLORS.MD_GRID)
        }
        else {
            Line([x1-GRAPH.SM_GRID_FREQ,y],[x2+GRAPH.SM_GRID_FREQ,y],0.5,COLORS.SM_GRID)
        }
    }
}


//Event Functions
function onDownHandler(e){
    INPUT.X_O = e.clientX
    INPUT.Y_O = e.clientY
    if (e.button == 2){
        INPUT.MOUSE_2 = true
        INPUT.X_OFFSET_O = GRAPH.X_OFFSET
        INPUT.Y_OFFSET_O = GRAPH.Y_OFFSET
    }
}
function onMoveHandler(e){
    if (INPUT.MOUSE_2){
        let xDif = e.clientX - INPUT.X_O
        let yDif = e.clientY - INPUT.Y_O
        GRAPH.X_OFFSET = INPUT.X_OFFSET_O - xDif/GRAPH.SCALE
        GRAPH.Y_OFFSET = INPUT.Y_OFFSET_O + yDif/GRAPH.SCALE
        GuideLines()
        PlotData(data)
    }
}
function onUpHandler(e){
    if (e.button == 2){
        INPUT.MOUSE_2 = false
    }
}
function onLeaveHandler(e){
    INPUT.MOUSE_1 = false
    INPUT.MOUSE_2 = false   
}
function contextmenu(e){
    e.preventDefault()
}


//Helper Functions
function CalibrateCanvas(canvas,ctx){
    let dpr = window.devicePixelRatio
    canvas.width = canvas.clientWidth * dpr
    canvas.height = canvas.clientHeight * dpr
    ctx.scale(dpr,dpr)
}
function CorrectPos(p){
    return [(p[0] - GRAPH.X_OFFSET)*GRAPH.SCALE,CANVAS.clientHeight - (p[1] - GRAPH.Y_OFFSET)*GRAPH.SCALE]
}
function PlotData(data){
    for (var point of data){
        CircleFilled(point,COLORS.POINT)
    }
}
function update(){
    KMEANS.PointIteration(data)
    GuideLines()
    KMEANS.PlotData(data)
    GRAPH.ANI_ID = requestAnimationFrame(update)
}

//Initialize Events
CANVAS.addEventListener('mousedown',onDownHandler,false)
CANVAS.addEventListener('mousemove',onMoveHandler,false)
CANVAS.addEventListener('mouseup',onUpHandler,false)
CANVAS.addEventListener('mouseleave',onLeaveHandler,false)
CANVAS.addEventListener('contextmenu',contextmenu,false)
START.addEventListener('click',update,false)


//Example Data
var p1 = [0.5,0.6]
var p2 = [0.7,0.5]
var p3 = [0.5,0.9]
var p4 = [2.67,2.4]
var p5 = [2.1,2.5]
var p6 = [2.56,2.8]
var p7 = [1.8,2.3]
var p8 = [2.3,1.4]
var p9 = [1.4,3.4]
var p10 = [0.5,1.3]
var data = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10]


CalibrateCanvas(CANVAS,CTX)
GuideLines()
PlotData(data)
