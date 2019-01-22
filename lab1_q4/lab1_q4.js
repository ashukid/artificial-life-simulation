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
    if(i==0){
        ctx.fillStyle = "red";
    }
    else if(i==1){
        ctx.fillStyle = "blue";
    }
    else{
        ctx.fillStyle = "green"; 
    }
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
    constructor(des,v,type){
        this.type=type
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
    drawCircle(A[0].q,A[0].type)
    drawCircle(B[0].q,B[0].type)

    let d=distance(A[0].q,A[0].goal)
    if(d>ep){
        A[0].step()
    }
    else{
        goalid1=(goalid1+1)%4
        A[0].goal=A[0].des[goalid1].slice()
    }

    d=distance(B[0].q,B[0].goal)
    if(d>ep){
        B[0].step()
    }
    else{
        goalid2=(goalid2+1)%4
        B[0].goal=B[0].des[goalid2].slice()
    }


    for(let i=1;i<n1;i++){
        drawCircle(A[i].q,A[i].type)
        let d=distance(A[i].q,A[i-1].q)
        if(d>col){
            A[i].step()
        }
        A[i].goal=A[i-1].q
    }

    for(let i=1;i<n2;i++){
        drawCircle(B[i].q,B[i].type)
        let d=distance(B[i].q,B[i-1].q)
        if(d>col){
            B[i].step()
        }
        B[i].goal=B[i-1].q
    }

    for(let i=0;i<n3;i++){
        drawCircle(C[i].q,C[i].type)

        let p=Math.round(Math.random()*10)
        if(p<5){
            let index=Math.floor(Math.random()*n1)
            C[i].goal = A[index].q
        }
        else{
            let index=Math.floor(Math.random()*n2)
            C[i].goal = B[index].q
        }
        let d=distance(C[i].q,C[i].goal) 
        if(d>col){
            C[i].step()
        }
    }

    window.requestAnimationFrame(draw)
}

var goalid1=1
var goalid2=1
var n1=4
var n2=4
A1=new Agent([[100,100],[100,300],[300,100],[300,300]],[1,1],0)
var A=[A1]
for(let i=1;i<n1;i++){

    let tempx=Math.floor(Math.random()*c.width)
    let tempy=Math.floor(Math.random()*c.height)
    let tempvx=Math.floor(Math.random()*10)
    let tempvy=Math.floor(Math.random()*10)
    let temp=new Agent([[tempx,tempy],A[i-1].q],[tempvx,tempvy],0)
    A.push(temp)
}
B1=new Agent([[300,300],[100,100],[100,300],[300,100]],[1,1],1)
let B=[B1]
for(let i=1;i<n2;i++){

    let tempx=Math.floor(Math.random()*c.width)
    let tempy=Math.floor(Math.random()*c.height)
    let tempvx=Math.floor(Math.random()*10)
    let tempvy=Math.floor(Math.random()*10)
    let temp=new Agent([[tempx,tempy],B[i-1].q],[tempvx,tempvy],1)
    B.push(temp)
}

var n3=4
let C=[]
for(let i=0;i<n3;i++){

    let tempx=Math.floor(Math.random()*c.width)
    let tempy=Math.floor(Math.random()*c.height)
    let tempvx=Math.floor(Math.random()*5)
    let tempvy=Math.floor(Math.random()*5)
    let temp=new Agent([[tempx,tempy],[0,0]],[tempvx,tempvy],2)
    C.push(temp)
}

window.requestAnimationFrame(draw)

