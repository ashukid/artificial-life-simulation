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

var dt=0.5
var ep=1

class Agent{
    constructor(id,src){
        this.id=id
        this.src=src
        this.v=[1,1]
        this.q=src.slice()
        this.goal=0
    }
    

    step(){
        let d=distance(this.q,this.goal)
        this.q[0] = this.q[0] + this.v[0] * dt * ((this.goal[0]-this.q[0])/d)
        this.q[1] = this.q[1] + this.v[1] * dt * ((this.goal[1]-this.q[1])/d)
    }
}


function draw(){
    ctx.clearRect(0, 0, c.width, c.height);

    for(let i=0;i<max_agent;i++){
        A[i].goal=A[(i+1)%4].q
    }

    let temp=0
    for(let i=0;i<max_agent;i++){
        drawCircle(A[i].q)
        let d=distance(A[i].q,A[i].goal)
        console.log(d)
        if(d>ep){
            A[i].step()
        }
        else{
            temp+=1
        }
    }

    if(temp==4){
        window.cancelAnimationFrame(draw)
    }
    else{
        window.requestAnimationFrame(draw) 
    }
}

var max_agent=4
A1=new Agent(1,[100,100])
A2=new Agent(2,[300,100])
A3=new Agent(3,[300,300])
A4=new Agent(4,[100,300])
var A = [A1,A2,A3,A4]

window.requestAnimationFrame(draw)

