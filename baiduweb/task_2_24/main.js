var arrnodes = [],
	index = 0,
	selNode,
	timer;	
(function(){
	var root = document.querySelector('#root'),
		btns = document.querySelectorAll('.btn'),
		dfsBtn = btns[0],
		bfsBtn = btns[1],	
		dfseachBtn = btns[2],
		bfseachBtn = btns[3];
		delBtn = btns[4],
		addBtn = btns[5];

		dfsBtn.onclick = function(){
			reset();
			DFS(root);
			callback();
		};
		bfsBtn.onclick = function(){
			reset();
			BFS(root);
			callback();
		};
		dfseachBtn.onclick = function(){
			reset();
			DFS(root);
			callback();
		};
		bfseachBtn.onclick = function(){
			reset();
			BFS(root);
			callback();
		};
		selectNode();
		delBtn.onclick = function(){
			if(selNode){
				selNode.parentNode.removeChild(selNode);
			} else {
				alert('选择你要删除的节点');
			} 
		};
		addBtn.onclick = function(){
			addNode();
		};
})();
//深度优先遍历
function DFS(node){
	if(node){
		arrnodes.push(node);
		var childs = node.children;
		for(var i = 0,len = childs.length;i<len;i++){
			DFS(childs[i]);
		}
	}
}
//广度优先遍历
function BFS(node){
	if(node){
		arrnodes.push(node);
		BFS(node.nextElementSibling);
		node = arrnodes[index++];
	    BFS(node.firstElementChild);	
	}
}
//点击div事件
function selectNode(){
	var section = document.getElementsByTagName('section')[0];
	section.onclick = function(e){
		reset();
		e.target.className = 'select';
		e.stopPropagation();//阻止事件冒泡
		selNode = e.target;
	};
}
//增加节点
function addNode(){
	var textIn = document.getElementById('textIn').value.trim();
	var temp = '';
	if(textIn && selNode){
		temp = '<div class="default">' + textIn + '</div>';
		selNode.innerHTML += temp;
	} else {
		alert('请选择要插入的节点或填写要插入的内容');
	}
}
function callback(){
	var i = 0,
		mark = false,
		len = arrnodes.length,
		valueIn = document.getElementById('searchIn').value;
	arrnodes[0].className = 'active';
	if(!valueIn){
		 timer = setInterval(function(){
    		i++;
			if(i < len){
				arrnodes[i-1].className = '';
				arrnodes[i].className = 'active';
			} else {
				clearInterval(timer);
				arrnodes[len-1].className = '';
			}
		},500);
	} else {	
		 timer = setInterval(function(){
	    	if(arrnodes[i].firstChild.nodeValue.trim() === valueIn){
	    		arrnodes[i].className = 'flag' ;
	    		mark = true;
	    	}
	    	i++;
			if(i < len){
				if(arrnodes[i-1].className !== 'flag')  arrnodes[i-1].className = '';
				arrnodes[i].className = 'active';
			} else {console.log(timer);
				clearInterval(timer);			
				if(arrnodes[i-1].className !== 'flag')	arrnodes[len-1].className = '';
				if(!mark) alert('not found');
			}		
		},500);
	}	  
}
function reset(){
	arrnodes = [];
	index = 0;
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0,len = divs.length; i < len; i++) {
		divs[i].className = 'default';
	}
}


