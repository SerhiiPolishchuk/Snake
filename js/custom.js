const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;
let score = 0;
let speed = 1;


let food = { 
   x : Math.floor(Math.random() * 17 + 1) * box,
   y : Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
   x : 9 *  box,
   y : 10 *  box
};

let dir;// = "up";

document.addEventListener('keydown', direction);

function direction(event) {
   if(event.keyCode == 37 && dir != "right")
      dir = "left";
   else if(event.keyCode == 38 && dir != "down")
      dir = "up";
   else if(event.keyCode == 39 && dir != "left")
      dir = "right";
   else if(event.keyCode == 40 && dir != "up")
      dir = "down";
}

function eatTaile(arr) {
   if(snake.length > 1) {
      var head = arr[0];
      for(let i = 1; i < arr.length; i++) {
            if(head.x == arr[i].x && head.y == arr[i].y)
               return true;
      }
   }
   
   return false;
}

function drawGame() {
   setTimeout(() => {

      ctx.drawImage(ground, 0, 0);
      ctx.drawImage(foodImg, food.x, food.y);

      for(let i = 0; i < snake.length; i++){
         ctx.fillStyle = i == 0 ? "red" : "#" + (i * 100);
         ctx.fillRect(snake[i].x, snake[i].y, box, box);
      }

      ctx.fillStyle = "white";
      ctx.font = "45px Arial";
      ctx.fillText(score, box * 2.5, box * 1.6);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if(snakeX == food.x && snakeY == food.y) {
         score++;
         food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
         };
      } else {
         snake.pop();
      }

      if(dir == "left") snakeX -= box;
      if(dir == "right") snakeX += box;
      if(dir == "up") snakeY -= box;
      if(dir == "down") snakeY += box;

      let newHead = {
         x : snakeX,
         y : snakeY
      }

      snake.unshift(newHead);

      switch(score) {
         case 5 : speed = 2; break;
         case 10 : speed = 3; break;
         case 15 : speed = 4; break;
         case 20 : speed = 5;
      }

      if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17 || eatTaile(snake)) {
         score = 0;
         speed = 1;
         dir = "";

         snake = [];
         snake[0] = {
            x : 9 *  box,
            y : 10 *  box
         };
      }

      drawGame();
   }, 300 - 50 * (speed - 1));
}

let game = drawGame();



/*// Звуковые файлы
var fly = new Audio(); // Создание аудио объекта
var score_audio = new Audio(); // Создание аудио объекта
var fail = new Audio();
fly.src = "audio/fly.mp3"; // Указание нужной записи
score_audio.src = "audio/score.mp3"; // Аналогично
fail.src = "audio/fail.mp3";

var score = 0;
var gap = 90;
var xPos = 10;
var yPos = 150;
var gravB;
var gravP;
var fps = 60;

var pipe = [];



 {
  yPos -= 35;
  fly.play();
});

/*document.body.addEventListener("mousemove", function () {
   fail.muted = true;
   fail.play();
})*/

//pipeBottom.onload = draw;

/*$('#new-game').click(() => {
   $('#menu').hide();
   draw();
});

pipeBottom.onload = () => {
   ctx.drawImage(bg, 0, 0);
   ctx.drawImage(fg, 0, cvs.height - fg.height );   
};

function draw() {
   setTimeout(function() {
      ctx.drawImage(bg, 0, 0);



      for(var i = 0; i < pipe.length; i++) {
         ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
         ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
     
         if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {

               gravP = 0;
               gravB = 0;   

               //fail.muted = true;
               fail.muted = false;
               fail.play();
               //location.reload()
               sleep(4000).then(() => { document.location.reload(); });
               //setTimeout(function(){}, 4000); // Перезагрузка страницы
               
         } else if(gravP != 0) {
            gravP = 1;
            gravB = 1;
         }

         if(pipe[i].x == 5) {
            score++;
            score_audio.play();
         }

         if(pipe[i].x == 125) {
            pipe.push({
            x : cvs.width,
            y : Math.floor() * (pipeUp.height - 20)) - (pipeUp.height - 20)
            });
         }

         pipe[i].x -= gravP;
      
      }

      ctx.drawImage(fg, 0, cvs.height - fg.height );
      ctx.drawImage(bird, xPos, yPos);

      ctx.fillStyle = "#000";
      ctx.font = "24px Verdana";
      ctx.fillText("Рахунок: " + score, 10, cvs.height - 20);

      yPos += gravB;

     

      requestAnimationFrame(draw);
   }, 1000 / fps);
 }

 function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 } */