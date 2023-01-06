const c = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
const idScore = document.getElementById('score')
const idMaxScore = document.getElementById('max-score')
const idCoins = document.getElementById('coins')
const idShopCoins = document.getElementById('shopCoins')



let score = 0;
let maxScore = 0;
let coins = 0;

let skinEnable1 = false;
let skinEnable2 = false;
let skinEnable3 = false;

//===========================================================

function scoreOut() {
   idScore.innerText = `Счет: ${score}`
   idCoins.innerText = `Монеты: ${coins}`
   idShopCoins.innerText = `Монеты: ${coins}`

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

//===========================================================

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

//===========================================================

c.addEventListener('mousemove', function (event) {
   rect.x = event.offsetX - 64;
})

//===========================================================

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


   //===========================================================





   skin1 = new Image();
   skin1.src = 'img/skin1.jpg';

   skin2 = new Image();
   skin2.src = 'img/skin2.jpg';

   skin3 = new Image();
   skin3.src = 'img/skin3.jpg';




   if (skinEnable1) {
      ctx.drawImage(skin1, 0, -50, 1000, 600);
   }
   if (skinEnable2) {
      ctx.drawImage(skin2, 0, 0, 1000, 600);
   }
   if (skinEnable3) {
      ctx.drawImage(skin3, 0, 0, 1000, 600);
   }

   //===========================================================

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
   scoreOut()
})

idCloseShopBtn.addEventListener('click', () => {
   window.scrollTo(0, 0);
})


// =========================================
// Покупка скинов фона
const idShopPrice1 = document.getElementById('listPrice1')
const idlistViewPanel1 = document.getElementById('listViewPanel1')
const idShopPrice2 = document.getElementById('listPrice2')
const idlistViewPanel2 = document.getElementById('listViewPanel2')
const idShopPrice3 = document.getElementById('listPrice3')
const idlistViewPanel3 = document.getElementById('listViewPanel3')

let itemSkin1 = false;
let itemSkin2 = false;
let itemSkin3 = false;


idShopBtn1.addEventListener('click', () => {
   if (coins >= 1000) {
      if (itemSkin1) {
         if (!skinEnable1) {
            skinEnable2 = false;
            skinEnable3 = false;
            skinEnable1 = true;
         }
         return;
      }

      coins -= 1000;
      itemSkin1 = true;

      idShopBtn1.innerText = 'Применить';
      idShopPrice1.innerText = 'Приобретено';
      idlistViewPanel1.classList.add('opacity')
      scoreOut()

   } else {

      if (itemSkin1) { return; }

      idShopPrice1.innerText = 'Недостаточно монет :(';
      idShopBtn1.innerText = 'Ошибка';

      setTimeout(() => {
         idShopPrice1.innerText = 'Цена: 1000';
         idShopBtn1.innerText = 'Купить';
      }, 800);

   }
})

idShopBtn2.addEventListener('click', () => {
   if (coins >= 500) {
      if (itemSkin2) {
         if (!skinEnable2) {
            skinEnable1 = false;
            skinEnable3 = false;
            skinEnable2 = true;
         }
         return;
      }

      coins -= 500;
      itemSkin2 = true;

      idShopBtn2.innerText = 'Применить';
      idShopPrice2.innerText = 'Приобретено';
      idlistViewPanel2.classList.add('opacity')
      scoreOut()

   } else {
      if (itemSkin2) { return; }

      idShopPrice2.innerText = 'Недостаточно монет :(';
      idShopBtn2.innerText = 'Ошибка';

      setTimeout(() => {
         idShopPrice2.innerText = 'Цена: 500';
         idShopBtn2.innerText = 'Купить';
      }, 800);

   }
})

idShopBtn3.addEventListener('click', () => {
   if (coins >= 700) {
      if (itemSkin3) {
         if (!skinEnable3) {
            skinEnable2 = false;
            skinEnable1 = false;
            skinEnable3 = true;
         }
         return;
      }
      coins -= 700;
      itemSkin3 = true;

      idShopBtn3.innerText = 'Применить';
      idShopPrice3.innerText = 'Приобретено';
      idlistViewPanel3.classList.add('opacity')
      scoreOut()

   } else {
      if (itemSkin3) { return; }

      idShopPrice3.innerText = 'Недостаточно монет :(';
      idShopBtn3.innerText = 'Ошибка';

      setTimeout(() => {
         idShopPrice3.innerText = 'Цена: 700';
         idShopBtn3.innerText = 'Купить';
      }, 800);

   }
})
















// =========================================










