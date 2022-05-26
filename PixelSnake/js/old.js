var rand = function (min, max) {k = Math.floor(Math.random() * (max - min) + min); return (Math.round( k / s) * s);}
var newA = function () {a = [rand(0, innerWidth),rand(0, innerHeight)];},
	newB = function () {sBody = [{x: 0,y: 0}];}
var gP = document.getElementById('canv'), //Достаем canvas
	g = gP.getContext('2d'), //Получаем "контакс" (методы для рисования в canvas) //Сохраняем для удобства
	sBody = null, //Начально тело змейки - два элемента
	d = 1, //Направление змейки 1 - dправо, 2 - вниз 3 - влево, 4 - вверх
	a = null, //Яблоко, массив, 0 элемент - x, 1 элемнт - y
	s = 25; newB(); newA(); //Создаем змейку
gP.width = innerWidth * 0.8; //Сохранем четкость изображения, выставив полную ширину экрана
gP.height = innerHeight * 0.7; //То же самое, но только с высотой
setInterval(function(){
	if (a[0] + s >= gP.width || a[1] + s >= gP.height) newA(); 
	g.clearRect(0,0,gP.width,gP.height); //Очищаем старое
	g.fillStyle = "red";
	g.fillRect(...a, s, s);
	g.fillStyle = "#000";
	sBody.forEach(function(el, i){
		if (el.x == sBody[sBody.length - 1].x && el.y == sBody[sBody.length - 1].y && i < sBody.length - 1) sBody.splice(0,sBody.length-1), sBody = [{x:0,y:0}], d = 1; //Проверка на столкновение
	});
	var m = sBody[0], f = {x: m.x,y: m.y}, l = sBody[sBody.length - 1]; // сохраняем хвост и голову змейки
	if (d == 1)  f.x = l.x + s, f.y = Math.round(l.y / s) * s; //Если направление вправо, то тогда сохраняем Y, но меняем X на + s
	if (d == 2) f.y = l.y + s, f.x = Math.round(l.x / s) * s; // Если направление вниз, то сохраняем X, но меняем Y на + s
	if (d == 3) f.x = l.x - s, f.y = Math.round(l.y / s) * s; //Если направление влево, то сохраняем Y, но меняем X на -s
	if (d == 4) f.y = l.y - s, f.x = Math.round(l.x / s) * s; //Если направление вверх, то сохраняем X, Но меняем Y на -ss
	sBody.push(f); //Добавляем хвост после головы с новыми координатами
	sBody.splice(0,1); //Удаляем хвост
	//Отрисовываем каждый элемент змейки
	sBody.forEach(function(pob, i){
		if (d == 1) if (pob.x > Math.round(gP.width / s) * s) pob.x = 0; //Если мы двигаемся вправо, то если позиция эемента по X больше, чем ширина экрана, то ее надо обнулить
		if (d == 2) if (pob.y > Math.round(gP.height / s) * s) pob.y = 0; //Если мы двигаемся внизу, то если позиция элемента по X больше, чем высота экрана, то ее надо обнулить
		if (d == 3) if (pob.x < 0) pob.x = Math.round(gP.width / s) * s; //Если мы двигаемся влево, и позиция по X меньше нуля, то мы ставим элемент в самый конец экрана (его ширина)
		if (d == 4) if (pob.y < 0) pob.y = Math.round(gP.height / s) * s; //Если мы двигаемся вверх, и позиция по Y меньше нуля, то мы ставим элемент в самый низ экрана (его высоту)
		if (pob.x == a[0] && pob.y == a[1]) newA(), sBody.unshift({x: f.x - s, y:l.y})
		g.fillRect(pob.x, pob.y, s, s);		
		// s - это ширина и высота нашего "квадрата"
	});
}, 1000/25);

onkeydown = function (e) {
	var k = e.key;
	if ([38,39,40,37].indexOf(k) >= 0) 
		//Останавливаем событие, отменяем его действие по умолчанию. На пример, при ажатии на стрелочку вверх мог произойти скролл, но он не произойдет, так как мы его отменили
		e.preventDefault();
	if (k == 'd' && d != 3) d = 1; //Вправо
	if (k == 's' && d != 4) d = 2; //Вниз
	if (k == 'a' && d != 1) d = 3; //Влево
	if (k == 'w' && d != 2) d = 4; //Вверх
};