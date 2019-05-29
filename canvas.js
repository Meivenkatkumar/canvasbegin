var i=0,vel=0,savevel=2;
var canvas=document.querySelector('canvas');
var highscore=0;
if (localStorage.hasOwnProperty("highsco")) {
    highscore=parseInt(localStorage.getItem("highsco"));
}
else
    localStorage.setItem("highsco",highscore);
canvas.width=800;
canvas.height=1500;
var c = canvas.getContext('2d');
class duo{
constructor(){
	this.x=canvas.width/2;
	this.r=180;
	this.y=(canvas.height-this.r )-20;
	this.vy=10;
	this.angle=0;
	this.dangle=Math.PI*0.04;
	this.p=0;
	this.q=0;
	this.s=0;
	this.t=0;
	this.score=0;
	this.lvl=1;
    }
    build(){
    this.p=this.x + (this.r * Math.cos(this.angle));
    this.q=this.y + (this.r * Math.sin(this.angle));
    this.s=this.x - (this.r * Math.cos(this.angle));
    this.t=this.y - (this.r * Math.sin(this.angle));
    c.beginPath();
    c.lineWidth=5;
    c.strokeStyle='rgb(0,255,0)';
    c.arc(this.x,this.y,this.r,0,2*Math.PI,true);
    c.stroke();
    c.beginPath();
    c.strokeStyle='rgb(255,0,0)';
    c.lineWidth=20;
    c.arc(this.p,this.q,10,0,2*Math.PI,true);
    c.stroke();
    c.beginPath();
    c.strokeStyle='rgb(0,0,255)';
    c.lineWidth=20;
    c.arc(this.s,this.t,10,0,2*Math.PI,true);	
    c.stroke();
    }
    cwrotate(){
    this.angle=this.angle+this.dangle;
    }
    awrotate(){
    this.angle=this.angle-this.dangle;
    }

}
function rotate(event){
	if(event.keyCode==37)
		duo1.awrotate();
	else if(event.keyCode==39)	     
        duo1.cwrotate();
    else if(event.keyCode==32)
        { 

          if(duo1.dangle>0)
          {
            duo1.dangle=0;
          }
          else if(duo1.dangle==0)
          {
             duo1.dangle=Math.PI*0.04;
          }
          if(vel>0)
          {
            savevel=vel;
            vel=0;
          }
          else if(vel==0)
          {
             vel=savevel;
          }
        }
}
class obstacle{
	constructor(){
		this.vy=0;
		this.wid= (duo1.r*2)-25;
		this.x=(Math.random() * canvas.width)-this.wid;
		if(this.x<0)
			this.x=-this.x;
		if(this.x>duo1.x-duo1.r && this.x<duo1.x)
			this.wid=this.wid*0.6;
		this.y=-10;
		this.disx1;
		this.disx2;
		this.disy1;
		this.disy2;
		this.rad1;
		this.rad2;
	}
	initialise(){
		this.x=(Math.random() * canvas.width)-this.wid;
		if(this.x<0)
			this.x=-this.x;
		if(this.x>duo1.x-duo1.r && this.x<duo1.x)
            this.wid=this.wid*0.6;
		this.y=0;
		this.vy=0;
		this.wid=(duo1.r*2)-25;
	}
	build(){
         c.fillRect(this.x,this.y,this.wid,10);
         c.fillStyle='rgb(255,0,0)';
	}
	falldown(){
        this.y=this.y+this.vy;  
        this.build();                                                                                                                                                                                                                             
	}
	coldet(){
        if(duo1.p<this.x)
        	{
        	this.disx1=this.x-duo1.p;
        	}
        else if(duo1.p>this.x+this.wid)
        	{
        	this.disx1=duo1.p-this.wid-this.x;
        	}
        else
            {
            this.disx1=0;
            }
        if (duo1.q<this.y)
            {
         	this.disy1=this.y-duo1.q;
            }
        else if(duo1.q>this.y+10)
            {
            this.disy1=duo1.q-this.y-10;   
            }
        else 
            {
             this.disy1=0;
            }
        if(duo1.s<this.x)
        	{
        	this.disx2=this.x-duo1.s;
        	}
        else if(duo1.s>this.x+this.wid)
        	{
        	this.disx2=duo1.s-this.wid-this.x;
        	}
        else
            {
            this.disx2=0;	
            }
        if (duo1.t<this.y)
            {
         	this.disy2=this.y-duo1.t;
            }
        else if(duo1.t>this.y+10)
            {
            this.disy2=duo1.t-this.y-10;   
            }
        else
        	{
        	this.disy2=0;
        	}
        this.rad1=Math.sqrt((this.disx1*this.disx1)+(this.disy1*this.disy1));
        this.rad2=Math.sqrt((this.disx2*this.disx2)+(this.disy2*this.disy2));
        if(this.rad1<=17)
        {
        	alert("collision");
        }
        if (this.rad2<=17)
        {
        	alert("collision");
        }

    }
}

var obss = [];
var duo1 = new duo();
for(i=0;i<3;++i)
{
    obss.push(new obstacle());
}
obss[0].vy=2;
function animate()
{
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);         
 	   for(i=0;i<3;i++)
	   {
		obss[i].falldown();
		obss[i].coldet();
	    if(obss[i].y>=canvas.height)
	      {
		      obss[i].initialise();
		      duo1.score+=10;
		      duo1.lvl=duo1.lvl+Math.floor(duo1.score/300);
              vel=2+duo1.lvl;
              if(duo1.score>highscore)
              {
                highscore=duo1.score;
                localStorage.setItem('highsco',highscore);
              }
		  }
		if((obss[0].y >= i*0.33*canvas.height)&&(duo1.score==0))
		  {
		 		obss[i].vy=2;
		  }
        if(duo1.score==10)
            vel=2;
		if(duo1.score>=10)
          {
		 	obss[i].vy=vel;
          }
	    } 
	window.addEventListener("keydown",rotate,true);
	duo1.build();
}
animate();
