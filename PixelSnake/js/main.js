// переменные и объекты игры
var gP = document.getElementById('canv'); //Достаем canvas
gP.width = innerWidth * 0.8;
gP.height = innerHeight * 0.7;
var s = 25; // длина поля
var g = gP.getContext('2d'); // Получаем "контекст" рисования
var sBody = [{x: 0,y: 0}]; // Начально тело змейки - два элемента
var d = 1; // Направление змейки 1 - dправо, 2 - вниз 3 - влево, 4 - вверх
var apple = create_apple(); // (a) яблоко apple
var FPS = 20;

// функции
function rand(min, max) {
	let k = Math.floor(Math.random() * (max - min) + min);
	return (Math.round( k / s) * s);
}

function create_apple() {
	return [rand(0, gP.width),rand(0, gP.height)];
}

function meeting(elem, index) {
	if (elem.x == sBody[sBody.length - 1].x && 
		elem.y == sBody[sBody.length - 1].y && 
		index < sBody.length - 1) {
		sBody.splice(0,sBody.length-1);
		sBody = [{x:0,y:0}];
		d = 1; //Проверка на столкновение
	}
}

// функция обновления
setInterval(function(){
	// удаление яблока за пределами холста
	if (apple[0] + s >= gP.width || apple[1] + s >= gP.height)
		apple = create_apple();
	
	// отрисовка
	g.clearRect(0,0,gP.width,gP.height); //Очищаем старое
	g.fillStyle = "red";
	g.fillRect(...apple, s, s);
	g.fillStyle = "#000";
	sBody.forEach(meeting);

	// считаем координаты
	var m = sBody[0], f = {x: m.x,y: m.y}, l = sBody[sBody.length - 1]; // сохраняем хвост и голову змейки
	if (d == 1) //Если направление вправо, то тогда сохраняем Y, но меняем X на + s
		f.x = l.x + s, f.y = Math.round(l.y / s) * s;
	if (d == 2)  // Если направление вниз, то сохраняем X, но меняем Y на + s
		f.y = l.y + s, f.x = Math.round(l.x / s) * s;
	if (d == 3)  //Если направление влево, то сохраняем Y, но меняем X на -s
		f.x = l.x - s, f.y = Math.round(l.y / s) * s;
	if (d == 4)  //Если направление вверх, то сохраняем X, Но меняем Y на -ss
		f.y = l.y - s, f.x = Math.round(l.x / s) * s;

	sBody.push(f); //Добавляем хвост после головы с новыми координатами
	sBody.splice(0,1); //Удаляем хвост

	//Отрисовываем каждый элемент змейки
	sBody.forEach(function (pob, i) {
		//Если мы двигаемся вправо, то если позиция эемента по X больше, чем ширина экрана, то ее надо обнулить
		if (d == 1) if (pob.x > Math.round(gP.width / s) * s) pob.x = 0; 
		//Если мы двигаемся внизу, то если позиция элемента по X больше, чем высота экрана, то ее надо обнулить
		if (d == 2) if (pob.y > Math.round(gP.height / s) * s) pob.y = 0;
		//Если мы двигаемся влево, и позиция по X меньше нуля, то мы ставим элемент в самый конец экрана (его ширина) 
		if (d == 3) if (pob.x < 0) pob.x = Math.round(gP.width / s) * s; 
		//Если мы двигаемся вверх, и позиция по Y меньше нуля, то мы ставим элемент в самый низ экрана (его высоту)
		if (d == 4) if (pob.y < 0) pob.y = Math.round(gP.height / s) * s; 
		if (pob.x == apple[0] && pob.y == apple[1]) {
			apple = create_apple(); 
			sBody.unshift({x: f.x - s, y:l.y});
		}
		g.fillRect(pob.x, pob.y, s, s);		
		// s - это ширина и высота нашего "квадрата"
	});

}, 1000 / FPS);

onkeydown = function (e) {
	var k = e.key;
	if (['d', 's', 'a', 'w'].indexOf(k) >= 0) 
		//Останавливаем событие, отменяем его действие по умолчанию. На пример, при ажатии на стрелочку вверх мог произойти скролл, но он не произойдет, так как мы его отменили
		e.preventDefault();
	if (k == 'd' && d != 3) d = 1; //Вправо
	if (k == 's' && d != 4) d = 2; //Вниз
	if (k == 'a' && d != 1) d = 3; //Влево
	if (k == 'w' && d != 2) d = 4; //Вверх
};