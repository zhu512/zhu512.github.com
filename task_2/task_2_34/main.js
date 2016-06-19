var table = document.getElementById('table').children[0];
var input =  document.getElementById('input');

var Block = {
	x:1,
	y:1,
	pos:'right'
};
function Active(){
	var val = input.value.trim().toLocaleUpperCase();console.log(val);
	switch(val){
		case 'TRA LEF':		
			run('left');
			break;
		case 'TRA RIG':
			run('right');
			break;
		case 'TRA TOP':		
			run('top');
			break;
		case 'TRA BOT':
			run('bottom');
			break;
		case 'MOV LEF':
			turn('left');
			run('left');
			break;
		case 'MOV TOP':
			turn('top');
			run('top');
			break;
		case 'MOV RIG':
			turn('right');
			run('right');
			break;
		case 'MOV BOT':		
			turn('bottom');
			run('bottom');
			break;
	}
}

function turn(cmd){console.log(cmd);
	var box = document.querySelector('#redbox');
	switch(cmd){
		case 'top':
			rotate(box,-90);
			break;
		case 'bottom':
			rotate(box,-270);
			break;
		case 'left':
			rotate(box,-180);
			break;
		case 'right':
			rotate(box,0);
			break;
	}
	
}
function rotate(obj,deg){console.log('进入了rotate函数'+deg);
	obj.style.transition='-webkit-transform .5s ease-in';
	obj.style.webkitTransform ='rotate('+ deg +'deg)';
}
function run (cmd){
	var box = document.querySelector('#redbox');
	switch(cmd){
		case 'top':
			if(Block.y === 1)
				return;
			Block.y--;
			translate(box);
			break;
		case 'bottom':
			if(Block.y === 10)		
				return;
			Block.y++;
			translate(box);
			break;
		case 'left':console.log(Block.x);	
			if(Block.x === 1)
				return;
			Block.x--;			
			translate(box);
			break;
		case 'right':
			if(Block.x === 10)
				return;
			Block.x++;
			translate(box);
			break;	
	}
}
function translate(obj){
	obj.style.transition='-webkit-transform 1s ease-out';
	obj.style.webkitTransform ='translate('+ (Block.x - 1) *40 +'px,'+(Block.y - 1)*40+'px)';
}
function render(){
	var div = '<div id="redbox"><div id="bluebox"></div></div>';
	var td = table.children[Block.y].children[Block.x];//x是第几行相当于y,y是第几列相当于x轴
	td.innerHTML = div;
	var bluebox = document.getElementById('bluebox');
	bluebox.className = Block.pos;
}
render();