var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function drawLine(src,des){
    ctx.beginPath();
    ctx.moveTo(src[0],src[1]);
    ctx.lineTo(des[0],des[1]);
    ctx.stroke();
}

function drawArc(c,r,s,e){
    ctx.beginPath();
    ctx.arc(c[0], c[1], r, s, e);
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
class Agent{
    constructor(q){
        this.w=0.8
        this.q=q
    }

    step(){
        angle += this.w*dt
        if(angle>2*Math.PI){
            angle=0
        }
        this.q[0] = centre[0] + r * Math.cos(angle)
        this.q[1] = centre[1] + r * Math.sin(angle)
    }
}


function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    drawCircle(agent.q)
    agent.step()
    drawArc(centre,r,start,angle)
    window.requestAnimationFrame(draw)
}

var angle=Math.PI/2
var start=angle
var centre=[250,200]
var r=100
agent=new Agent([centre[0] + r*Math.cos(angle),centre[1] + r*Math.sin(angle)])
window.requestAnimationFrame(draw)
