// 全局变量
var startBtn = document.getElementById('startBtn');
var startDiv = document.getElementById('startDiv');
var mainDiv = document.getElementById('mainDiv');
var tid;//定时器


// 飞机整体是对象 图片属于飞机的一个属性
// 定义飞机的基类 

function Plane(x, y, width, height, src) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.src = src;
	this.imgNode = null;
	// 图片节点初始化
	this.init = function () {
		this.imgNode = document.createElement('img');
		this.imgNode.src = this.src;
		// 设置图片的位置
		this.imgNode.style.top = this.y + 'px';
		this.imgNode.style.left = this.x + 'px';
		mainDiv.appendChild(this.imgNode);

	}

	this.init();
}

// 我方飞机构造函数
function OurPlane(x, y) {
	Plane.call(this, x, y, 66, 80, 'image/我的飞机.gif');
}

// 创建我方飞机
var selfPlane = new OurPlane(127, 450);
selfPlane.imgNode.setAttribute('id', 'selfPlane');

// 我方飞机跟随光标移动
listenEvent(mainDiv, 'mousemove',function (e) {

	var e = e || window.event;
	selfPlane.imgNode.style.left = e.clientX-300 - 33 +'px';
	selfPlane.imgNode.style.top = e.clientY - 40 +'px';
});

// 地方飞机构造函数
function Enemy(x, y, width, height, src, sudu) {
	Plane.call(this, x, y, width, height, src);
	this.sudu = sudu;
	this.planeMove = function () {
		// 100px
		var topDis = this.imgNode.offsetTop;
		topDis+= this.sudu;
		this.imgNode.style.top = topDis + 'px';
	}
}

function Bullet(x, y) {
	Plane.call(this, x, y, 6, 14, 'image/bullet1.png');
	this.bulletMove = function () {	
		var topDis = this.imgNode.offsetTop;
		topDis -= 7;
		this.imgNode.style.top = topDis + 'px';
	}
}


// 背景图片位置初识值
var backgroundPositionY = 0;
// 标志
var mark1 = 0;
var mark2 = 0;
var mark3 = 0;

// 飞机数组
var enemys = [];
var bullets = [];
function caculatorCircle() {

	mark1++;
	mark2++;
	mark3++;
	// 1.背景图片移动
	backgroundPositionY++;
	mainDiv.style.backgroundPositionY = backgroundPositionY+'px';

	// 2.创建敌方飞机
	// 400ms 创建一个小的
	// 1000ms  创建一个中型的
	// 3000ms 创建一个大型的

	if (mark1 % 20 == 0) {
		var tinyEnemy = new Enemy( randomValue(0, 320-34), -24, 34, 24, 'image/enemy1_fly_1.png', randomValue(2, 4));
		enemys.push(tinyEnemy);
	}

	if (mark2 % 50 ==0) {
		var midEnemy = new Enemy( randomValue(0, 320-46), -60, 46, 60, 'image/enemy3_fly_1.png', randomValue(2, 3));
		enemys.push(midEnemy);
	}

	if (mark3 % 150== 0) {
		var bigEnemy = new Enemy(randomValue(0, 320-110), -164, 110, 164, 'image/enemy2_fly_1.png', 2);
		enemys.push(bigEnemy);
	} 

	// 3.创建子弹
	// 100ms创建一个子弹
	if (mark1 % 4 == 0 ) {
		var bullet = new Bullet(selfPlane.imgNode.offsetLeft + 33, selfPlane.imgNode.offsetTop);
		bullets.push(bullet);
	}

	// 飞机移动&边界判断
	var enenysLength = enemys.length;
	for(var i = 0; i < enenysLength; i ++){

		// 敌方飞机移动
		enemys[i].planeMove();

		// 判断飞机是否飞出边界
		if (enemys[i].imgNode.offsetTop >= 568) {
			// 1>页面上消失
			mainDiv.removeChild(enemys[i].imgNode);
			// 2>从数组中移除
			enemys.splice(i, 1);
			// 3>数组长度-1
			enenysLength--;
		}
	}


	// 让子弹飞
	var bulletsLength = bullets.length;
	for(var j = 0; j < bulletsLength; j ++) {
		bullets[j].bulletMove();

		// 判断子弹是否飞出边界
		if (bullets[j].imgNode.offsetTop + 14 <= 0) {
			// 1>页面上消失
			mainDiv.removeChild(bullets[j].imgNode);
			// 2>从数组中移除
			bullets.splice(j, 1);
			// 3>数组长度-1
			bulletsLength--;
		}
	}
}

// 页面初始化
function init() {
	
	// 开启定时器
	// 1s=1000ms
	tid = setInterval(caculatorCircle,20);

}

// 点击开始按钮:切换页面
startBtn.onclick = function () {
	startDiv.style.display = 'none';
	mainDiv.style.display = 'block';

	// 页面初始化
	init();
}

// 二级事件兼容的封装函数
function listenEvent(domEle, type, callback) {
	if (document.addEventListener) {
		domEle.addEventListener(type, callback);
	}else {
		domEle.attachEvent('on'+type, callback);
	}
}

function randomValue(min, max) {
	return Math.random()*(max - min) + min;
}

