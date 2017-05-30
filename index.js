window.onload = function() {
  var canvas = document.getElementById("cvs");
  var ctx = canvas.getContext("2d");
  var canvasX = canvasY = 400;
  var apples = [];
  var snake = [{x: 5, y: 5}];
  var length = 5;
  var mX = 1;
  var mY = 0;
  var hitStop = 0;

  var placeApple = function() {
    var aX = Math.floor(Math.random() * 40);
    var aY = Math.floor(Math.random() * 40);
    apples.push({x: aX, y: aY});
  }

  document.addEventListener("keydown", function(e) {
    var key = e.keyCode;

    if (key == 37 || key == 65) {
      mX = -1;
      mY = 0;
    } else if (key == 38 || key == 87) {
      mX = 0;
      mY = -1;
    } else if (key == 39 || key == 69) {
      mX = 1;
      mY = 0;
    } else if (key == 40 || key == 83) {
      mX = 0;
      mY = 1;
    }
  });

  var drawSquare = function(color, x, y) {
    fill = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fillRect(x * 10, y * 10, 10, 10);
  }

  var blank = function() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasX, canvasY);
  }

  placeApple();

  var aInterval = setInterval(placeApple, 1000 * 6);

  var interval = setInterval(function() {
    stopped = hitStop > 0
    if (stopped) {
      hitStop -= 1;
    } else {
      var tail = snake;
      snake = [{x: snake[0].x + mX, y: snake[0].y + mY}];

      head = snake[0];
      Array.prototype.push.apply(snake, tail.slice(0, length));

      if (head.x == 40) head.x = 0;
      if (head.x == -1) head.x = 39;
      if (head.y == 40) head.y = 0;
      if (head.y == -1) head.y = 39;
    }

    blank();
    for (var i = 0; i < apples.length; i++) {
      if (head.x == apples[i].x && apples[i].y == head.y) {
        length += 1;
        apples.splice(i, 1);
      } else {
        drawSquare("red", apples[i].x, apples[i].y);
      }
    }

    for (var i = 0; i < snake.length; i++) {
      if (!stopped && i > 0 && head.x == snake[i].x && head.y == snake[i].y) {
        length = 5;
        hitStop = 15;
      }
      color = hitStop > 0 ? "yellow" : "lime";
      drawSquare(color, snake[i].x, snake[i].y);
    }
  }, 1000/15);
};
