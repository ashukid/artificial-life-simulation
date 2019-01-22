var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function drawLine(src,des){
    ctx.beginPath();
    ctx.moveTo(src[0],src[1]);
    ctx.lineTo(des[0],des[1]);
    ctx.stroke();
}

function drawCircle(c,i){
    ctx.beginPath();
    ctx.arc(c[0], c[1], 10, 0, 2 * Math.PI);
    if(i==1){
        ctx.fillStyle = "red";
    }
    else if(i==2){
        ctx.fillStyle = "blue";
    }
    ctx.fill();
    ctx.stroke();
}

function distance(src,des){
    return Math.sqrt(Math.pow((des[0]-src[0]),2)+Math.pow((des[1]-src[1]),2))
}

function changeAcc(a){

    accx=0
    accy=0
    for(let i=0;i<max_agent;i++){
        let d=distance(a.q,A[i].q)
        if(A[i].type == a.type){
            accx = accx + (A[i].q[0]-a.q[0])*0.1
            accy = accy + (A[i].q[1]-a.q[1])*0.1
        }
        else{
            accx = accx - ((A[i].q[0]-a.q[0])/Math.pow(d,2))*10
            accy = accy - ((A[i].q[1]-a.q[1])/Math.pow(d,2))*10 
        }
    }
    a.acc=[accx,accy]
}

function changeVelocity(a){
    a.v[0]=a.acc[0]*dt
    a.v[1]=a.acc[1]*dt
}

function changeGoal(a){
    a.q[0]=a.v[0]*dt
    a.q[1]=a.v[1].dt
}

var dt
var ep=0.5

class Agent{
    constructor(type,id,src){
        this.type=type
        this.id=id
        this.src=src
        this.v=[2,2]
        this.acc=0
        this.q=src.slice()
        this.goal=1
    }

    step(){
        changeAcc(this)
        changeVelocity(this)
        changeGoal(this)
        let d=distance(this.q,this.goal)
        this.q[0] = this.q[0] + this.v[0] * dt * ((this.goal[0]-this.q[0])/d)
        this.q[1] = this.q[1] + this.v[1] * dt * ((this.goal[1]-this.q[1])/d)
    }
}



function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    let temp=0
    for(let i=0;i<max_agent;i++){
        drawCircle(A[i].q,A[i].type)
        let d=distance(A[i].q,A[i].goal)
        if(d>ep){
            A[i].step()
        }
    }
    window.requestAnimationFrame(draw)
}

var max_agent=Math.floor(Math.random()*6)+5
var A = []
var T = 2
for(i=0;i<max_agent;i++){
    let tempx=Math.floor(Math.random()*c.width)
    let tempy=Math.floor(Math.random()*c.height)
    let tempt=Math.floor(Math.random()*(T+1))
    let temp=new Agent(tempt,i,[tempx,tempy])
    A.push(temp)
}
window.requestAnimationFrame(draw)

