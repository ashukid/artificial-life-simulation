var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function drawLine(src,des){
    ctx.beginPath();
    ctx.moveTo(src[0],src[1]);
    ctx.lineTo(des[0],des[1]);
    ctx.stroke();
}

function drawCircle(c){
    ctx.beginPath();
    ctx.arc(c[0], c[1], 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

function distance(src,des){
    return Math.sqrt(Math.pow((des[0]-src[0]),2)+Math.pow((des[1]-src[1]),2))
}

var dt=1
var ep=0.8
var col=30

class Agent{
    constructor(des,v,){
        this.des=des
        this.v=v
        this.q=des[0].slice()
        this.goal=des[1].slice()

    }

    step(){
        let d=distance(this.q,this.goal)
        this.q[0] = this.q[0] + this.v[0] * dt * ((this.goal[0]-this.q[0])/d)
        this.q[1] = this.q[1] + this.v[1] * dt * ((this.goal[1]-this.q[1])/d)
    }
}


function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    drawLine(A[0].q,A[0].goal)
    drawCircle(A[0].q)

    let d=distance(A[0].q,A[0].goal)
    if(d>ep){
        A[0].step()
    }
    else{
        goalid=(goalid+1)%4
        A[0].goal=A[0].des[goalid].slice()
    }

    for(let i=1;i<=3;i++){
        drawCircle(A[i].q)
        let d=distance(A[i].q,A[i-1].q)
        if(d>col){
            A[i].step()
        }
        A[i].goal=A[i-1].q
        
    }

    window.requestAnimationFrame(draw)
}

var goalid=1
A1=new Agent([[100,100],[100,300],[300,100],[300,300]],[1,1])
var A=[A1]
for(let i=1;i<=3;i++){

    let tempx=Math.floor(Math.random()*c.width)
    let tempy=Math.floor(Math.random()*c.height)
    let tempvx=Math.floor(Math.random()*10)
    let tempvy=Math.floor(Math.random()*10)
    let temp=new Agent([[tempx,tempy],A[i-1].q],[tempvx,tempvy])
    A.push(temp)
}

window.requestAnimationFrame(draw)

