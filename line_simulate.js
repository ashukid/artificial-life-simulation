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

    
class Agent{
    constructor(src,des){
        this.src=src
        this.des=des
        this.v=10
        this.dt=0.1
        this.eps=10
        this.q=src.slice()
    }
}

agent=new Agent([100,100],[300,300])


function draw(){
    ctx.clearRect(0, 0, c.width, c.height); 
    drawLine(agent.src,agent.q)
    drawCircle(agent.q)
    console.log(agent.src)

    d=distance(agent.q,agent.des)
    console.log(d)

    if(d>agent.eps){
        agent.q[0] = agent.q[0] + agent.v * agent.dt * ((agent.des[0]-agent.q[0])/d)
        agent.q[1] = agent.q[1] + agent.v * agent.dt * ((agent.des[1]-agent.q[1])/d)
        window.requestAnimationFrame(draw)
    }
    else{
        window.cancelAnimationFrame(draw)
    }
}

window.requestAnimationFrame(draw)

