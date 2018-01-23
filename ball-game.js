function myBallDraw() {
    var canvas = document.getElementById('tutorial');
    if(canvas.getContext) {
      var ctx = canvas.getContext('2d');
    }
 
    var raf;
    var lives = 50000;
    var success = 0;
    var ballSpeedX = 5;
    var ballSpeedY = 1;
 
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;
 
      if(ball.y + ball.radius + ball.vy > canvas.height || ball.y - ball.radius + ball.vy < 0) {
        ball.vy += 10;
        ball.vy = -ball.vy;
      }
 
      if(ball.x + ball.radius + ball.vx > canvas.width || ball.x - ball.radius + ball.vx < 0) {
        ball.vx = -ball.vx;
      }
      raf = window.requestAnimationFrame(draw);
    }
 
    var ball = {
      x: 100,
      y: 100,
      vx: ballSpeedX,
      vy: ballSpeedY,
      radius: 100,
      color: 'blue',
      is_mouse_over: function(x,y) {
        return ((this.x -radius) < x < (this.x+radius)) && ((this.y-radius) < y < (this.y+radius));
      },
      draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    };
 
    canvas.addEventListener('click', function(e) {
        if((e.x - 10 < ball.x + ball.radius && e.x - 10 > ball.x - ball.radius)
        && (e.y - 10 < ball.y + ball.radius && e.y - 10 > ball.y - ball.radius)) {
            ball.radius *= .8;
            ball.vx += 5;
            ball.vy += 7;
            success++;
        } else {
            lives--;
        }
       
        console.log(success);
        console.log("X: ", ballSpeedX);
        console.log("Y: ", ballSpeedY);
 
        if(success == 3) {
            // ballSpeedX += 4;
            // ballSpeedY += 4;
            ball.color = 'red';
            success = 0;
            ball.radius = 100;
        }
 
        if(lives == 0) {
            location.reload();
            alert("You died");
        }
    });
 
    draw();
}
myBallDraw();
