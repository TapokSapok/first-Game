const c = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
const idScore = document.getElementById('score')
const idMaxScore = document.getElementById('max-score')
const idCoins = document.getElementById('coins')




let score = 0;
let maxScore = 0;
let coins = 0;

function scoreOut() {
   idScore.innerText = `Счет: ${score}`
   idCoins.innerText = `Монеты: ${coins}`
   if (maxScore < score) {
      maxScore = score
      idMaxScore.innerText = `Максимальный счет: ${maxScore}`
   }
}

function drawRect(rect) {
   ctx.beginPath();
   ctx.rect(rect.x, rect.y, rect.width, rect.height)
   ctx.fillStyle = rect.color
   ctx.fill();
}

function drawCircle(circle) {
   ctx.beginPath();
   ctx.ellipse(circle.x, circle.y, circle.radius, circle.radius, Math.PI / 4, 0, 2 * Math.PI);
   ctx.fillStyle = circle.color
   ctx.fill();
}

function checkCircleRectCollision(circle, rect) {
   let distX = Math.abs(circle.x - rect.x - rect.width / 2);
   let distY = Math.abs(circle.y - rect.y - rect.height / 2);

   if (distX > (rect.width / 2 + circle.radius)) { return false; }
   if (distY > (rect.height / 2 + circle.radius)) { return false; }

   if (distX <= (rect.width / 2)) { return true; }
   if (distY <= (rect.height / 2)) { return true; }

   let dx = distX - rect.width / 2;
   let dy = distY - rect.height / 2;
   return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}

function getRandom(min, max) {
   return Math.random() * (max - min) + min;
}

let rect = {
   x: 0,
   y: 400,
   width: 140,
   height: 30,
   color: 'black'
}

let ball = {
   x: 100,
   y: 100,
   dx: 6,
   dy: 12,
   radius: 20,
   color: 'blue'
}


c.addEventListener('mousemove', function (event) {
   rect.x = event.offsetX - 64;
})

function render() {
   ctx.clearRect(0, 0, c.width, c.height)

   // Движение
   ball.x = ball.x + ball.dx;
   ball.y = ball.y + ball.dy;

   // Условия

   if (ball.y + ball.radius >= c.height) {

      rect.color = 'red'
      setTimeout(() => {
         rect.color = 'black'
      }, 300);

      ball.x = getRandom(100, 1000);
      ball.y = 100;
      ball.dx = getRandom(6, 12);
      ball.dx = getRandom(6, 12);

      score = 0;
      scoreOut();
   }

   if (ball.y - ball.radius <= 0) {
      score++;
      coins++
      scoreOut();

      ball.color = 'orange'
      setTimeout(() => {
         ball.color = 'blue'
      }, 300);
   }

   if ((ball.y + ball.radius >= c.height) || (ball.y - ball.radius <= 0) || (checkCircleRectCollision(ball, rect))) {
      ball.dy = ball.dy * (-1)
      ball.y = ball.y + ball.dy
   }

   if ((ball.x + ball.radius >= c.width) || (ball.x - ball.radius <= 0) || (checkCircleRectCollision(ball, rect))) {
      ball.dx = ball.dx * (-1)
      ball.x = ball.x + ball.dx
   }

   if (rect.x + rect.width >= c.width) {
      rect.x = c.width - rect.width
   }

   if (rect.x <= 0) {
      rect.x = 0
   }




   // skin1 = new Image();
   // skin1.src = 'img/skin1.jpg';

   skin2 = new Image();
   skin2.src = 'img/skin2.jpg';

   skin3 = new Image();
   skin3.src = 'img/skin3.jpg';


















   ctx.drawImage(skin2, 0, 0, 1000, 600);
   // ctx.drawImage(skin3, 0, 0, 1000, 600);

   // ==============================================

   // ==============================================



   idShopBtn3.addEventListener('click', () => {

   })

   idShopBtn2.addEventListener('click', () => {
      if (coins >= 0) {
         coins -= 0;

         idShopBtn2.innerText = 'Применить';

         const idShopPrice2 = document.getElementById('listPrice2')
         idShopPrice2.innerText = 'Приобретено';

         const idlistViewPanel2 = document.getElementById('listViewPanel2')




      }
   })






   // ==============================================

   // ==============================================
   drawCircle(ball)
   drawRect(rect)

   window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)

// =========================================
const idOpenShopBtn = document.getElementById('shop-btn')
const idCloseShopBtn = document.getElementById('shopExitBtn')
const idShopBtn1 = document.getElementById('shopBtn-1')
const idShopBtn2 = document.getElementById('shopBtn-2')
const idShopBtn3 = document.getElementById('shopBtn-3')

idOpenShopBtn.addEventListener('click', () => {
   window.scrollTo(0, 1000);
})

idCloseShopBtn.addEventListener('click', () => {
   window.scrollTo(0, 0);
})
























// =========================================










