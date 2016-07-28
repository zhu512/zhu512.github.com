

var btn = document.getElementsByTagName('input'),
	preBtn = btn[0],
	inBtn = btn[1],
	postBtn = btn[2],
	arrnodes = [],
	timer,
	root = document.querySelector('.one');

preBtn.onclick = function(){
	reset();
	preOrder(root);
	callback();
};
inBtn.onclick = function(){
	reset();
	inOrder(root);
	callback();
};
postBtn.onclick = function(){
	reset();
	postOrder(root);
	callback();
};
//前序遍历
function preOrder(node){
	if(node){
		arrnodes.push(node);		
		preOrder(node.firstElementChild);		
		preOrder(node.lastElementChild);		
	}
}
//中序遍历
function inOrder(node){
	if(node !== null){
		inOrder(node.firstElementChild);
		arrnodes.push(node);
		inOrder(node.lastElementChild);
	}
}
//后序遍历
function postOrder(node){

	if(node !== null){
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		arrnodes.push(node);
	}
}

function callback(){

	var i = 0,
		len = arrnodes.length;
	arrnodes[i].style.backgroundColor = 'red';
    timer = setInterval(function(){
    	i++;
		if(i < len){
			arrnodes[i-1].style.backgroundColor = 'white';
			arrnodes[i].style.backgroundColor = 'red';
		} else {
			clearInterval(timer);
			arrnodes[len-1].style.backgroundColor = "white";
		}
	},500);
}
function reset(){
	arrnodes = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0,len = divs.length; i < len; i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}


