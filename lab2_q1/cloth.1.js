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
    return Math.sqrt(Math.pow((des.x-src.x),2)+Math.pow((des.y-src.y),2))
}

var Points= [],
    Sticks =[]
var gravity=2,
    friction=1,
    bounce=1

Points.push({
    x:100,
    y:100,
    oldx:95,
    oldy:95
})
Points.push({
    x:200,
    y:100,
    oldx:195,
    oldy:95
})

Sticks.push({
    p0:Points[0],
    p1:Points[1],
    l:distance(Points[1],Points[0])
})

function constrainPoints(){
    for(let i=0; i<Points.length;i++){
        p=Points[i]
        vx=(p.x-p.oldx)*friction
        vy=(p.y-p.oldy)*friction

        if(p.x>c.width){
            p.x=c.width
            p.oldx=p.x+vx*bounce
        }
        if(p.x<0){
            p.x=0
            p.oldx=p.x+vx*bounce
        }
        if(p.y>c.height){
            p.y=c.height
            p.oldy=p.y+vy*bounce
        }
        if(p.y<0){
            p.y=0
            p.oldy=p.y+vy*bounce
        }
    } 
}

function updatePoints(){
    for(let i=0; i<Points.length;i++){
        p=Points[i]
        vx=(p.x-p.oldx)*friction
        vy=(p.y-p.oldy)*friction

        p.oldx=p.x
        p.oldy=p.y

        p.x += vx
        p.y += vy
        p.y += gravity
    }
}

function updateSticks(){

    for(let i=0;i<Sticks.length;i++){
        s=Sticks[i]
        dx=s.p1.x-s.p0.x
        dy=s.p1.y-s.p0.y

        d=Math.sqrt(dx*dx + dy*dy)
        diff=s.l-d
        diffper=diff/d/2
        offsetx=dx*diffper
        offsety=dy*diffper

        s.p0.x -= offsetx
        s.p0.y -= offsety
        s.p1.x += offsetx
        s.p1.y += offsety
    }
}

function draw(){
    ctx.clearRect(0,0,c.width,c.height)

    for(let i=0; i<Points.length;i++){
        p=Points[i]
        drawCircle([p.x,p.y])
    } 

    for(let i=0;i<Sticks.length;i++){
        s=Sticks[i]
        drawLine([s.p0.x,s.p0.y],[s.p1.x,s.p1.y])
    }

    updatePoints()
    constrainPoints()
    updateSticks()

    window.requestAnimationFrame(draw)
}
draw()
