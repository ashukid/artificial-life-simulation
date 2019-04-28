var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function drawLine(src,des){
    ctx.beginPath();
    ctx.moveTo(src[0],src[1]);
    ctx.lineTo(des[0],des[1]);
    ctx.stroke();
}

function drawCircle(c,type){
    ctx.beginPath();
    ctx.arc(c[0], c[1], 10, 0, 2 * Math.PI);
    if(type==0){
        ctx.fillStyle = "red";
    }
    if(type==1){
        ctx.fillStyle = "blue";
    }
    ctx.fill();
    ctx.stroke();
}

function distance(src,des){
    return Math.sqrt(Math.pow((des[0]-src[0]),2)+Math.pow((des[1]-src[1]),2))
}

function findForce(a){

    let fxrep=0
    let fyrep=0
    let fxatt=0
    let fyatt=0

    // agent forces
    for(let i=0;i<A.length;i++){
        ca=A[i]
        let d=Math.max(0.1,distance(a.q,ca.q)-20)
        if(ca.type==a.type){
            if(ca.id==a.id){
                continue
            }
            fxatt+=1*(ca.q[0]-a.q[0])
            fyatt+=1*(ca.q[1]-a.q[1])

            fxrep+=400*((-ca.q[0]+a.q[0])/(d*d))
            fyrep+=400*((-ca.q[1]+a.q[1])/(d*d))
        }
        else{
            fxatt+=0.01*(ca.q[0]-a.q[0])
            fyatt+=0.01*(ca.q[1]-a.q[1])

            fxrep+=800*((-ca.q[0]+a.q[0])/(d*d))
            fyrep+=800*((-ca.q[1]+a.q[1])/(d*d))
        }
    }

    // leftward tendency
    if(a.type==0){
        let d = distance(a.q,[a.q[0],100])
        fyatt += 10*(100-a.q[1])
        fyrep += 1*((a.q[1]-100)/(d*d))
    }else{
        let d = distance(a.q,[a.q[0],400])
        fyatt += 10*(400-a.q[1])
        fyrep += 1*((a.q[1]-400)/(d*d)) 
    }

    // towards goal
    let d=distance(a.q,a.g)
    fxatt += 10*(a.g[0]-a.q[0])
    fxrep += 1*((a.q[0]-a.g[0])/(d*d))


    let fxtotal=fxatt+fxrep
    let fytotal=fyatt+fyrep
    return [fxtotal,fytotal]
}

class Agent{

    constructor(id,type,q){
        this.id=id
        this.type=type
        this.q=q
        this.dt=0.001
        this.g=[]
    }

    step(){
        let acc = findForce(this)
        this.q[0] = this.q[0] + acc[0]*this.dt
        this.q[1] = this.q[1] + acc[1]*this.dt
    }

}

var A = []
for(let k=0;k<2;k++){
    var max_agent=Math.floor(Math.random()*2)+4
    for(let i=0;i<max_agent;i++){
        let tempx=Math.floor(Math.random()*100)+k*300+50
        let tempy=Math.floor(Math.random()*300)+100
        let temp=new Agent(i,k,[tempx,tempy])
        A.push(temp)
    }
}

for(let i=0;i<A.length;i++){
    if(A[i].type==0){
        A[i].g=[350,250]
    }
    else{
        A[i].g=[150,250]
    }
}

function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    for(i=0;i<A.length;i++){
        drawCircle(A[i].q,A[i].type)
        A[i].step()
    } 
    drawLine([250,0],[250,50])
    drawLine([250,500],[250,450])
    window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)

