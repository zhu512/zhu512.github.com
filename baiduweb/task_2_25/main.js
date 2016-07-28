// 查找元素
var $ = function(ele) {
    return document.querySelector(ele);
}
// 兼容的事件方法
function addEvent(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
}

var nodelist = [], 
	selNode,
	timer;	
(function(){
	var root = $('#root');
	addEvent($('.btn'),'click',function(){
			reset();
			DFS(root);
			callback();
		});
		selectNode();
		nodeShow();
})();
//深度优先遍历
function DFS(node){
	if(node){
	    if(node.nodeName === 'A') nodelist.push(node);
		var childs = node.children;
		for(var i = 0,len = childs.length;i<len;i++){
			DFS(childs[i]);
		}
	}
}
//点击隐藏事件---判断点击的target的同辈元素有没有ul如果有，则让它的父节点隐藏子节点
function selectNode(){
	addEvent($('#tree'),'mousedown',function(e){
		var tip = $('#tip');
		if(tip.style.display === 'block') tip.style.display = 'none';
		if(e.button === 2){
			e.preventDefault();
			var target = e.target;
			switch (target.nodeName){
				case 'I':
					selNode = target.parentNode;
					break;
				case 'A':selNode = target;
					break;
			}						
			tip.style.cssText= 'display:block;left:'+e.pageX+'px;top:'+e.pageY+'px;';
			selectTip();			
		} 		
	});
}
//双击打开或关闭文件夹
function nodeShow(){
	addEvent($('#tree'),'dblclick',function(e){
		var selParent;
		if(e.target.nodeName === 'A'|| e.target.nodeName === 'I'){
			selParent = e.target.parentNode;								
			if(selParent.nodeName === 'A'){
				selParent = selParent.parentNode;
			}
			var icon = selParent.querySelector('i');
			var tempchilds = '',tempchch = '';
			tempchilds = selParent.children;
			var len = tempchilds.length 
			if(len > 1){
				for(i = 1; i < len; i++){
					iconChange(icon);
					tempchch = tempchilds[i].children; 
					for(var j = 0, size = tempchch.length;j < size; j++){
						if(tempchch[j].style.display === 'none') tempchch[j].style.display = 'inline-block';
				 		else tempchch[j].style.display = 'none';
				    }
				}
			}
	    }
	});
}
function iconChange(icon){
	if(icon.className === 'icon-folder-open'){
		icon.className = 'icon-folder';
	} else {
		icon.className = 'icon-folder-open'
	}
}
function selectTip(){
	addEvent($('#tip'),'click',function(e){	
		var tip = $('#tip');
		if(tip.style.display === 'block') tip.style.display = 'none';	
		switch(e.target.id){
			case 'folder':  addNode(folder);		   
				break;
			case 'file': addFile(file);
				break;
			case 'dele': delNode();
				break;		
		}
	
	});
}
//增加节点  selNode存放的是选中的a节点，新建文件夹放在与a同级的ul里面
function addNode(node){
	var icon = selNode.querySelector('i');
	if(icon.className !== 'icon-folder-open'){
		alert("don't create folder!");
	}else{
		var name = prompt("新建文件夹名：","XXX");
		var temp = ''; 
		if(name!=null && name!=""){
			switch(node){
				case folder:temp = '<li><a href="#"><i class="icon-folder"></i>' + name + '</a><ul></ul></li>';
					break;
				case file:temp = '<li><a href="#"><i class="icon-file-empty"></i>' + name + '</a></li>';
					break;
			}		
			selNode.nextElementSibling.innerHTML += temp;
		}	
	}	
}

function delNode(){
	var seli = selNode.parentNode;
		if(seli) {
			seli.parentNode.removeChild(seli);
		} else {
			alert('选择你要删除的节点');
		}
}
function callback(){
	var i = 0,
		mark = false,
		len = nodelist.length,
	 	valueIn = $('#searchIn').value.trim();
	if(!valueIn){
		alert('输入不能为空！！');
	} else {
		nodelist[0].className = 'active';
		timer = setInterval(function(){
			var nodeText = nodelist[i].innerText.trim();
			if(nodeText === valueIn){
	    		nodelist[i].className = 'flag' ;
	    		mark = true;    		
	    	}
	    	i++;
	    	if(i < len){
				if(nodelist[i-1].className !== 'flag')  nodelist[i-1].className = '';
				nodelist[i].className = 'active';
			} else {
				clearInterval(timer);			
				if(nodelist[i-1].className !== 'flag')	nodelist[len-1].className = '';
				if(!mark) alert('not found');
			}		
		},100);	  
    } 
}
function reset(){
	nodelist = [];
	clearInterval(timer);
	var lis = document.getElementsByTagName('li');
	for (var i = 0,len = lis.length; i < len; i++) {
		lis[i].className = 'default';
	}
}


