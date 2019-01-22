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

var dt=0.1
var ep=10

class Agent{
    constructor(src,des){
        this.src=src
        this.des=des
        this.v=[10,10]
        this.q=src.slice()
        this.d=distance(this.q,this.des)

    }

    step(){
        this.q[0] = this.q[0] + this.v[0] * dt * ((this.des[0]-this.q[0])/this.d)
        this.q[1] = this.q[1] + this.v[1] * dt * ((this.des[1]-this.q[1])/this.d)
    }
}

agent=new Agent([100,100],[300,300])

function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    drawLine(agent.src,agent.q)
    drawCircle(agent.q)
    agent.step()

    agent.d=distance(agent.q,agent.des)
    if(agent.d>ep){
        window.requestAnimationFrame(draw)
    }
    else{
        window.cancelAnimationFrame(draw)
    }
}


window.requestAnimationFrame(draw)

