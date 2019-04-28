var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function drawLine(src,des){
    ctx.beginPath();
    ctx.moveTo(src.x,src.y);
    ctx.lineTo(des.x,des.y);
    ctx.stroke();
}

function drawCircle(c){
    ctx.beginPath();
    ctx.arc(c.x, c.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
}

function distance(src,des){
    return Math.sqrt(Math.pow((des.x-src.x),2)+Math.pow((des.y-src.y),2))
}

class Points{
    constructor(x,y,oldx,oldy){
        this.x=x
        this.y=y
        this.oldx=oldx
        this.oldy=oldy
        this.pinned=false
    }
}

class Sticks{
    constructor(p0,p1){
        this.p0=p0
        this.p1=p1
        this.l=30
    }
}

var gravity=2,
    friction=0.1

var P=[],
    S=[]
for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
        P.push(new Points(0,0,0,0))
    }
}

P[0].x=100
P[0].y=100
P[0].pinned=true

// P[50].x=250
// P[50].y=100
// P[50].pinned=true

P[90].x=400
P[90].y=100
P[90].pinned=true

for(let i=0;i<P.length;i++){
    if((i+1)%10 != 0){
        S.push(new Sticks(P[i],P[i+1]))
    }
    if((i+10)<100){
        S.push(new Sticks(P[i],P[i+10]))
    }
}


function constrainPoints(){
    for(let i=0; i<P.length;i++){
        p=P[i]
        vx=(p.x-p.oldx)*friction
        vy=(p.y-p.oldy)*friction

        if(p.x>c.width){
            p.x=c.width
            p.oldx=p.x+vx
        }
        if(p.x<0){
            p.x=0
            p.oldx=p.x+vx
        }
        if(p.y>c.height){
            p.y=c.height
            p.oldy=p.y+vy
        }
        if(p.y<0){
            p.y=0
            p.oldy=p.y+vy
        }
    } 
}

var timeout=0
function updatePoints(){
    for(let i=0; i<P.length;i++){
        p=P[i]
        if(!p.pinned){
            vx=(p.x-p.oldx)*friction
            vy=(p.y-p.oldy)*friction

            p.oldx=p.x
            p.oldy=p.y

            p.x += vx
            p.y += vy
            p.y += gravity
        }
        timeout+=1
        if(timeout > 22000){
            if(i>92 && i<96){
                p.x+=200
            }
            else if(i<6 && i>2){
                p.x-=200
            }
        }
    }
}

function updateSticks(){

    for(let i=0;i<S.length;i++){
        s=S[i]
        dx=s.p1.x-s.p0.x
        dy=s.p1.y-s.p0.y

        d=Math.sqrt(dx*dx + dy*dy)
        diff=s.l-d
        diffper=diff/d/2
        offsetx=dx*diffper
        offsety=dy*diffper

        if(!s.p0.pinned){
            if(timeout>25000){
                if(dx>60){
                    S.splice(i,1)
                }
            }
            s.p0.x -= offsetx
            s.p0.y -= offsety
        }
        if(!s.p1.pinned){
            s.p1.x += offsetx
            s.p1.y += offsety
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    for(let i=0;i<P.length;i++){
        drawCircle(P[i])
    }

    for(let i=0;i<S.length;i++){
        drawLine(S[i].p0,S[i].p1)
    }

    updatePoints()
    for(let i=0;i<3;i++){
        updateSticks()
        constrainPoints()
    }

    window.requestAnimationFrame(draw)
}
draw()
