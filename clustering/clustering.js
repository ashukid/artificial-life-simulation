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

function findGoal(a){

    let mink=[]
    for(let i=0;i<max_agent;i++){
        if(A[i].id != a.id){
            let d = distance(A[i].q,a.q)
            mink.push([d,A[i].q])
        }
    }


    for(let i=0;i<mink.length;i++){
        for(j=i;j<mink.length;j++){
            if(mink[j][0]<mink[i][0]){
                temp=mink[i]
                mink[i]=mink[j]
                mink[j]=temp
            }
        }
    }

    topk=[mink[0][1],mink[1][1],mink[2][1]]

    let sumx=0
    let sumy=0
    for(k=0;k<3;k++){
        sumx+=topk[k][0]
        sumy+=topk[k][1]
    }
    return [sumx/3,sumy/3]
}


class Agent{

    constructor(id,src){
        this.id=id
        this.src=src
        this.des=[0,0]
        this.v=[10,10]
        this.dt=0.1
        this.eps=10
        this.q=src.slice()
    }

    step(){
        let goal=findGoal(this)
        this.des=goal
        let d=distance(this.q,this.des)
        this.q[0] = this.q[0] + this.v[0] * this.dt * ((this.des[0]-this.q[0])/d)
        this.q[1] = this.q[1] + this.v[1] * this.dt * ((this.des[1]-this.q[1])/d)
    }

}

var max_agent=Math.floor(Math.random()*6)+5
var A = []
for(i=0;i<max_agent;i++){
    let tempx=Math.floor(Math.random()*c.width)
    let tempy=Math.floor(Math.random()*c.height)
    let temp=new Agent(i,[tempx,tempy])
    A.push(temp)
}

function draw(){
    
    ctx.clearRect(0, 0, c.width, c.height);
    for(i=0;i<max_agent;i++){
        drawCircle(A[i].q)
        A[i].step()
    } 
    window.requestAnimationFrame(draw)
    // window.cancelAnimationFrame(draw)
}

window.requestAnimationFrame(draw)

