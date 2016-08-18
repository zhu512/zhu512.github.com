var board = [];
var score = 0; 
var hasCon = [];//来记录每一个小格子是否已经发生过了碰撞

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){
	if(documentWidth > 500){
		containerWidth = 500;
		cellSpace = 20;
		cellLength = 100;
	}
	$('#container').css('width',containerWidth - 2*cellSpace);
	$('#container').css('height',containerWidth - 2*cellSpace);
	$('#container').css('padding',cellSpace);
	$('#container').css('border-radius',0.02*containerWidth);

	$('.cell').css('width',cellLength);
	$('.cell').css('height',cellLength);
	$('.cell').css('border-radius',0.02*cellLength);
}
function newgame(){
	//初始化棋牌格；
	init();
	//生成随机数字
	generateNum();
	generateNum();	
}

function init(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var cell = $('#cell-'+ i + '-'+ j);
			cell.css('top',getPosTop(i, j));
			cell.css('left', getPosLeft(i, j));
		}
	}
	for(var i = 0; i < 4; i++){
		board[i] =[];
		hasCon[i] = [];
		for(var j = 0; j < 4; j++){
			board[i][j] = 0;
			hasCon[i][j] = false;
		}
	}

	updateBoardView();

	score = 0;
}

function updateBoardView(){
	$('.num-cell').remove();//如果当前元素中有num-cell，则先清除
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			$('#container').append('<div class="num-cell" id="num-cell-'+i+'-'+j+'"></div>');
			var numCell = $('#num-cell-' + i +'-' +j);

			if(board[i][j] === 0){
				numCell.css('width','0px');
				numCell.css('height','0px');
				numCell.css('top',getPosTop(i,j) + cellLength/2);
				numCell.css('left',getPosLeft(i,j) + cellLength/2);

			} else{
				numCell.css('width',cellLength);
				numCell.css('height',cellLength);
				numCell.css('top',getPosTop(i,j) );
				numCell.css('left',getPosLeft(i,j) );
				numCell.css('background-color',getNumbg(board[i][j]) );
				numCell.css('color',getNumcolor(board[i][j]) );
				numCell.text(board[i][j]);

			}
			hasCon[i][j] = false;
		}
	}
	$('.num-cell').css('line-height',cellLength+'px');
	$('.num-cell').css('font-size',0.6*cellLength+'px');
}

function generateNum(){
	if(nospace(board))
		return false;
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4));//floor得到的仍然是一个浮点类型所以要转换成整形
	var randy = parseInt(Math.floor(Math.random() * 4));
/*
	var times = 0;
	while( times < 50){
		if(board[randx][randy] == 0){
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));

		times++;
	}
	if(times == 50){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(board[i][j] == 0){
					randx = i;
					randy = j;
				}
			}
		}
	}*/
	//spaceArr记录棋盘中空闲的位置
	var count = 0;
	var spaceArr = [];
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0){
				spaceArr[count] = i*4+j;
				count++;
			}
		}
	}console.log(count);
	//在空闲的位置中随机挑选一个位置
	var pos = parseInt(Math.floor(Math.random()* (count-1)));console.log(pos);
	randx = parseInt(Math.floor(spaceArr[pos]/4));
	randy = parseInt(Math.floor(spaceArr[pos]%4));


	//随机一个数字
	var randNum = Math.random() < 0.5 ? 2:4;

	//随机位置显示随机数字	
	board[randx][randy] = randNum;
	showNum(randx,randy,randNum);

	return true;
}

$(document).keydown(function(event){

	switch (event.keyCode){
		case 37://left
			event.preventDefault();
			if(moveLeft()){//注意isGameover函数因为在一个作用域下所以不能用双引号，但generator属于上级作用域使用字符串的形式
				setTimeout("generateNum()",210);
				setTimeout("isGameover()",300);
			}
			break;
		case 38://up
			event.preventDefault();
			if(moveUp()){
				setTimeout("generateNum()",210);
				setTimeout("isGameover()",300);
			}
			break;
		case 39://right
			event.preventDefault();
			if(moveRight()){
				setTimeout("generateNum()",210);
				setTimeout("isGameover()",300);
			}
			break;
		case 40://down
			event.preventDefault();
			if(moveDown()){
				setTimeout("generateNum()" ,210);
				setTimeout("isGameover()",300);
			}
			break;
		default:
			break;
	}
});

document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
	event.preventDefault();
});
document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;
	//判断是否是原地点击
	if(Math.abs( deltax ) < 0.3*documentWidth && Math.abs(deltay) < 0.3*documentWidth){
		return;
	}
	//x
	if(Math.abs( deltax ) >= Math.abs(deltay)){
		if(deltax > 0){
			//move right
			if(moveRight()){
				setTimeout("generateNum()",210);
				setTimeout("isGameover()",300);
			}
		} else {
			//move left
			if(moveLeft()){
				setTimeout("generateNum()" ,210);
				setTimeout("isGameover()",300);
			}
		}
	} 
	//y
	else{
		if(deltay > 0){
			//move down
			if(moveDown()){
				setTimeout("generateNum()" ,210);
				setTimeout("isGameover()",300);
			}
		} else {
			//move up
			if(moveUp()){
				setTimeout("generateNum()",210);
				setTimeout("isGameover()",300);
			}
		}
	}
});

function isGameover(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}

function gameover(){
	alert('gameover!');
}

function moveLeft(){
	//这里相当于做的优化
	if(!canMoveLeft( board ))
		return false;

	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j] != 0){
				for(var k = 0; k < j;k++){
					if(board[i][k] == 0 && noBlockHor(i, k ,j ,board)){
						//move
						showMove(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[i][k] == board[i][j] && noBlockHor(i, k ,j ,board) && !hasCon[i][k] ){
						//move
						showMove(i,j,i,k);
						//add
						
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add scroe
						score += board[i][k];
						updateScore(score);

						hasCon[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}


function moveUp(){
	if(!canMoveUp(board))
		return false;
	for(var j = 0; j < 4; j++){
		for(var i = 1; i < 4; i++){
		
			if(board[i][j] != 0){
				for(var k = 0; k < i;k++){
					if(board[k][j] == 0 && noBlockVer(j, k ,i ,board)){
						//move
						showMove(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[k][j] == board[i][j] && noBlockVer(j, k ,i ,board) && !hasCon[k][j]){
						//move
						showMove(i,j,k,j);
						//add
						
						board[k][j]  += board[i][j];
						board[i][j] = 0;
						//add scroe
						score += board[k][j];
						updateScore(score);

						hasCon[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board))
		return false;

	for(var i = 0; i < 4; i++){
		for(var j = 2; j >=0; j--){
			if(board[i][j] != 0){
				for(var k = 3; k > j;k--){
					if(board[i][k] == 0 && noBlockHor(i, j ,k ,board)){
						//move
						showMove(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[i][k] == board[i][j] && noBlockHor(i, j ,k ,board) && !hasCon[i][k]){
						//move
						showMove(i,j,i,k);
						//add
						
						board[i][k]  += board[i][j];
						board[i][j] = 0;
						//add scroe
						score += board[i][k];
						updateScore(score);

						hasCon[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board))
		return false;
	for(var j = 0; j < 4; j++){
		for(var i = 2; i >= 0; i--){			
			if(board[i][j] != 0){
				for(var k = 3; k > i;k--){
					if(board[k][j] == 0 && noBlockVer(j, i, k ,board)){
						//move
						showMove(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[k][j] == board[i][j] && noBlockVer(j, i, k,board) && !hasCon[k][j]){
						//move
						showMove(i,j,k,j);
						//add
						
						board[k][j]  += board[i][j];
						board[i][j] = 0;
						//add scroe
						score += board[k][j];
						updateScore(score);

						hasCon[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}
