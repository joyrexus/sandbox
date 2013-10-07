//
//  AnecdoteNonlinear.js
//  KillMath
//
//  Created by Bret Victor on 4/15/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//

(function(){

var AnecdoteNonlinear = this.AnecdoteNonlinear = new Class({

  initialize: function (canvas) {
    this.canvas = this.element = canvas;
    
    this.width = parseInt(canvas.get("width"));
    this.height = parseInt(canvas.get("height"));
    this.ctx = this.canvas.getContext("2d");
    
    this.plotScale = 60;
    this.plotOffsetX = this.width/2;
    this.plotOffsetY = this.height/2;

    this.timeStep = 10e-3;
    this.hasReset = false;

    this.backgroundImage = new Image();
    this.backgroundImage.src = "background.png"
    
    this.animationInterval = this.updateAnimation.periodical(20, this);
  },
  
  updateAnimation: function () {
    var now = Date.now();
    var dt = 0.001 * (now - (this.lastTimestamp || now));
    this.lastTimestamp = now;
    if (dt === 0) { return; }
    
    if (!this.backgroundImage.complete) { return; }
    if (!this.hasReset) { this.reset(); }
    
    this.currentTime += dt;
    this.currentTimeModStep += dt;
    
    while (this.currentTimeModStep > this.timeStep) {
      this.currentTimeModStep -= this.timeStep;
      this.tick(this.timeStep);
    }
    
    this.drawInContext(this.ctx);
    
    if (this.currentTime > 18) {
      this.reset();
    }
  },
  
  reset: function () {
    this.hasReset = true;
    
    this.currentTime = 0;
    this.currentTimeModStep = 0;
    this.x = -1;
    this.y = 0;
    
    this.ctx.drawImage(this.backgroundImage, 0, 0);

    this.ctx.closePath();

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "#2392d9";
    this.ctx.beginPath();
    this.ctx.moveTo(this.x * this.plotScale + this.plotOffsetX, -this.y * this.plotScale + this.plotOffsetY);
  },
  
  tick: function (dt) {
    var dx = dt * this.y;
    var dy = dt * (-0.5 * this.y - 5 * Math.sin(this.x));
    this.x += dx;
    this.y += dy;

    this.ctx.lineTo(this.x * this.plotScale + this.plotOffsetX, -this.y * this.plotScale + this.plotOffsetY);
  },
  
  drawInContext: function (ctx) {
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.moveTo(this.x * this.plotScale + this.plotOffsetX, -this.y * this.plotScale + this.plotOffsetY);
  }

});


})();
