// function callback(node){
// 	var curnode = node,
// 		leftnode = curnode.firstElementChild,
// 		rightnode = curnode.lastElementChild;
// 	curnode.style.backgroundColor = 'red';
// 	if(leftnode && rightnode){		
// 		curnode.firstElementChild.style.backgroundColor = 'white';
// 		curnode.lastElementChild.style.backgroundColor = 'white';
// 	}
// 	setTimeout(function(){
// 		curnode.style.backgroundColor = 'white';
		
// 	},500);
	
// }

var btn = document.getElementsByTagName('input'),
	preBtn = btn[0],
	inBtn = btn[1],
	postBtn = btn[2],
	root = document.querySelector('.one');

preBtn.onclick = function(){
	//reset();
	preOrder(root);
	var star = 0;
	var i = 0;
	var end = nodes.length;
	var pre;
	setInterval(function(){
		if(i>=end) i=star;
		if(nodes[pre])	nodes[pre].style.backgroundColor = "";
		nodes[i].style.backgroundColor = "red";
		pre = i;
		i+=1;
	},500);
};
inBtn.onclick = function(){
	//reset();
	inOrder(root,callback);
};
postBtn.onclick = function(){
	//reset();
	postOrder(root,callback);
};
//前序遍历
var nodes = new Array();
function preOrder(node){
	nodes.push(node);
	if(node.firstElementChild)	preOrder(node.firstElementChild);		
	if(node.lastElementChild)	preOrder(node.lastElementChild);
}



//中序遍历
function inOrder(node,callback){
	if(node !== null){
		inOrder(node.firstElementChild,callback);
		callback(node);
		inOrder(node.lastElementChild,callback);
	}
}
//后序遍历
function postOrder(node,callback){

	if(node !== null){
		postOrder(node.firstElementChild,callback);
		postOrder(node.lastElementChild,callback);
		callback(node);
	}
}

