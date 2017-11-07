const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const multControl = document.getElementById('multiplier');
const pointControl = document.getElementById('points');
console.log(context);
document.getElementById("m-value").innerHTML = multControl.value;
document.getElementById("p-value").innerHTML = pointControl.value;
const d = new Diagram(canvas.width/2, canvas.height/2);

context.lineWidth = 0.5;
context.strokeStyle = '#f3a314'

function Diagram(posx, posy){
	this.pos = {x: posx, y: posy};
	this.points = 20;
	this.multiplier = multControl.value;
	this.radius = 0.9*Math.min(canvas.width, canvas.height)/2;
}

Diagram.prototype.drawCircle = function(){
	context.beginPath();
	context.ellipse(this.pos.x, this.pos.y, this.radius, this.radius, 0, 0, 2*Math.PI);
	context.closePath();
	context.stroke();
}

Diagram.prototype.drawNumbers = function(){
	let a = 2*Math.PI/this.points;
	for(let i = 0; i < this.points; i++){
		let x = this.radius * Math.cos(a*i - Math.PI/2);
		let y = this.radius * Math.sin(a*i - Math.PI/2);
		context.strokeText(""+i, this.pos.x + x, this.pos.y + y);
	}
}

Diagram.prototype.drawLines = function(){
	let a = 2*Math.PI/this.points;
	for(let i = 0; i < this.points; i++){
		let lastDigits = (i*this.multiplier) % this.points;
		let x1 = this.pos.x + this.radius * Math.cos(a*i - Math.PI/2);
		let y1 = this.pos.y + this.radius * Math.sin(a*i - Math.PI/2);
		let x2 = this.pos.x + this.radius * Math.cos(a*lastDigits - Math.PI/2);
		let y2 = this.pos.y + this.radius * Math.sin(a*lastDigits - Math.PI/2);

		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.closePath();
		context.stroke();
	}
}

Diagram.prototype.draw = function(){
	context.fillRect(0, 0, canvas.width, canvas.height);
	this.drawCircle();
	this.drawNumbers();
	this.drawLines();
}

multControl.oninput = function(){
	document.getElementById("m-value").innerHTML = this.value;
	d.multiplier = this.value;
	d.draw();
}

pointControl.oninput = function(){
	document.getElementById("p-value").innerHTML = this.value;
	d.points = this.value;
	d.draw();
}

d.draw();