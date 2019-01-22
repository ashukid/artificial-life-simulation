var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function drawLine(src, des) {
    ctx.beginPath();
    ctx.moveTo(src[0], src[1]);
    ctx.lineTo(des[0], des[1]);
    ctx.stroke();
}

function drawCircle(c) {
    ctx.beginPath();
    ctx.arc(c[0], c[1], 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

function distance(src, des) {
    return Math.sqrt(Math.pow((des[0] - src[0]), 2) + Math.pow((des[1] - src[1]), 2))
}

var dt = 1
var ep = 0.8
var col = 30
var thresh=100

class Agent {
    constructor(id, des, v) {
        this.static=0
        this.id = id
        this.des = des
        this.v = v
        this.q = des[0].slice()
        this.goal = des[1].slice()

    }

    step() {
        let d = distance(this.q, this.goal)
        this.q[0] = this.q[0] + this.v[0] * dt * ((this.goal[0] - this.q[0]) / d)
        this.q[1] = this.q[1] + this.v[1] * dt * ((this.goal[1] - this.q[1]) / d)
    }
    randomStep() {
        let p=Math.round(Math.random()*10)
        let jump=200
        if(p<5){
            this.q[0] = this.q[0] + Math.floor(Math.random()*jump)
            this.q[1] = this.q[1] + Math.floor(Math.random()*jump)
        }
        else{
            this.q[0] = this.q[0] - Math.floor(Math.random()*jump)
            this.q[1] = this.q[1] - Math.floor(Math.random()*jump)
        }

    }

}


function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawLine(A[0].q, A[0].goal)
    drawCircle(A[0].q)

    let d = distance(A[0].q, A[0].goal)
    if (d > ep) {
        A[0].step()
    }
    else {
        goalid = (goalid + 1) % 4
        A[0].goal = A[0].des[goalid].slice()
    }

    for (let i = 1; i < num_agent; i++) {
        drawCircle(A[i].q)
        let flag=1
        for(let j=0;j<num_agent;j++){
            if(i!=j){
                let d = distance(A[i].q, A[j].q)
                if (d < col) {
                    flag=0
                }
            }
        }
        if(flag){
            A[i].step()
        }
        else{
            A[i].static+=1
            if(A[i].static>thresh){
                A[i].randomStep()
                A[i].static=0
            }
        }
        A[i].goal = A[i - 1].q
    }

    window.requestAnimationFrame(draw)
}

var goalid = 1
var num_agent=6
A1 = new Agent(0, [[100, 100], [100, 300], [300, 100], [300, 300]], [1, 1])
var A = [A1]
for (let i = 1; i < num_agent; i++) {

    let tempx = Math.floor(Math.random() * c.width)
    let tempy = Math.floor(Math.random() * c.height)
    let tempvx = Math.floor(Math.random() * 10)
    let tempvy = Math.floor(Math.random() * 10)
    let temp = new Agent(i+1, [[tempx, tempy], [0,0]], [tempvx, tempvy])
    A.push(temp)
}
let max_distance=100000
for(let i=1;i<A.length-1;i++){
    G=A[i-1]
    for(let j=i+1;j<A.length;j++){
        if(distance(A[i].q,G.q)>distance(A[j].q,G.q)){
            temp=A[i]
            A[i]=A[j]
            A[j]=temp
        }
    }
}
window.requestAnimationFrame(draw)

