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
    if(type==2){
        ctx.fillStyle = "green";
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

    let katts=1
    let kreps=400
    let katto=0.000001
    let krepo=400
    let d=0


    for(let i=0;i<A.length;i++){
        ca=A[i]
        d=Math.max(0.1,distance(a.q,ca.q)-20)
        if(ca.type==a.type){
            if(ca.id==a.id){
                continue
            }
            fxatt+=katts*(ca.q[0]-a.q[0])
            fyatt+=katts*(ca.q[1]-a.q[1])

            fxrep+=kreps*((-ca.q[0]+a.q[0])/(d*d))
            fyrep+=kreps*((-ca.q[1]+a.q[1])/(d*d))
        }
        else{
            fxatt+=katto*(ca.q[0]-a.q[0])
            fyatt+=katto*(ca.q[1]-a.q[1])

            fxrep+=krepo*((-ca.q[0]+a.q[0])/(d*d))
            fyrep+=krepo*((-ca.q[1]+a.q[1])/(d*d))
        }
    }

    if(d+20 >2){
        console.log(fxatt+fyatt,fxrep+fyrep)
    }

    let fxtotal=fxatt+fxrep
    let fytotal=fyatt+fyrep
    return [fxtotal,fytotal]
}

class Agent{

    constructor(id,type,q){
        this.id=id
        this.type=type
        this.q=q
        this.dt=0.004
    }

    step(){
        let acc = findForce(this)
        console.log(acc)
        this.q[0] = this.q[0] + Math.min(acc[0]*this.dt,0.1) 
        this.q[1] = this.q[1] + Math.min(acc[1]*this.dt,0.1) 
    }

}

var A = []
for(let k=0;k<3;k++){
    var max_agent=Math.floor(Math.random()*4)+2
    for(let i=0;i<max_agent;i++){
        let tempx=Math.floor(Math.random()*c.width)
        let tempy=Math.floor(Math.random()*c.height)
        let temp=new Agent(i,k,[tempx,tempy])
        A.push(temp)
    }
}

function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    for(i=0;i<A.length;i++){
        drawCircle(A[i].q,A[i].type)
        A[i].step()
    } 
    window.requestAnimationFrame(draw)
    // window.cancelAnimationFrame(draw)
}
window.requestAnimationFrame(draw)

