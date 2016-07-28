var arrnodes = [],
	index = 0,
	timer;	
(function(){
	var root = document.querySelector('#root'),
		btns = document.querySelectorAll('.btn'),
		dfsBtn = btns[0],
		bfsBtn = btns[1],	
		dfseachBtn = btns[2],
		bfseachBtn = btns[3];

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

function callback(){
	var i = 0,
		mark = false,
		len = arrnodes.length,
		valueIn = document.getElementById('textIn').value;

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


