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

var dt=2
var ep=0.5

class Agent{
    constructor(des){
        this.goalid=1
        this.des=des
        this.v=[2,2]
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
    drawLine(agent.q,agent.goal)
    drawCircle(agent.q)

    let d=distance(agent.q,agent.goal)
    if(d>ep){
        agent.step()
        window.requestAnimationFrame(draw)
    }
    else{
        agent.goalid=(agent.goalid+1)%4
        agent.goal=agent.des[agent.goalid].slice()
        window.requestAnimationFrame(draw)
    }
}

agent=new Agent([[100,100]])
window.requestAnimationFrame(draw)

