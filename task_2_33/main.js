var table = document.getElementById('table').children[0];
var input =  document.getElementById('input');

var Block = {
	x:5,
	y:5,
	pos:'top'
};
function Active(){
	var val = input.value.trim().toLocaleUpperCase();console.log(val);
	switch(val){
		case 'TUN LEF':
			position('lef');
			turn();
			break;
		case 'TUN RIG':
			position('rig');
			turn();
			break;
		case 'TUN BAC':
			position('bac');
			turn();
			break;
		case 'GO':
			run();
			break;
	}
}
function position(cmd){
var posArr ={
				'lef':{
					'top':'left',
					'left':'bottom',
					'bottom':'right',
					'right':'top'
				},
				'rig':{
					'top':'right',
					'right':'bottom',
					'bottom':'left',
					'left':'top'
				},
				'bac':{
					'top':'bottom',
					'bottom':'top',
					'left':'right',
					'right':'left'
				}
			}
	Block.pos = posArr[cmd][Block.pos];
}
function turn(){
	var box = document.getElementById('box');
		box.className = Block.pos;
}
function run (){
	var pos = Block.pos;
	switch(pos){
		case 'top':
			if(Block.y === 1)
				return;
			Block.y--;
			render();
			break;
		case 'bottom':
			if(Block.y === 10)
				return;
			Block.y++;
			render();
			break;
		case 'left':
			if(Block.x === 1)
				return;
			Block.x--;
			render();
			break;
		case 'right':
			if(Block.x === 10)
				return;
			Block.x++;
			render();
			break;	
	}
}
function render(){
	var curtd = document.querySelector('.curbox');
	if(curtd){
		curtd.removeChild(curtd.firstChild);
		curtd.className = null;
	}
	var div = '<div id="box"></div>';
	var td = table.children[Block.y].children[Block.x];//x是第几行相当于y,y是第几列相当于x轴
	td.className = 'curbox';
	td.innerHTML = div;
	var curbox = document.getElementById('box');
	curbox.className = Block.pos;
}
render();