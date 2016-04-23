
function Table(container,term,data){
    this.table = container;
    this.term = term;
    this.data = data;
    this.setTable();
    this.sortEvent();
    this.frozenEvent();
}
Table.prototype = {//这里的this.大都是构造函数中的属性值；
	setTable: function(){
        var frag = document.createDocumentFragment();
        var thead = document.createElement("tr");
       // var sort = this.sort;
        this.term.forEach(function(item){
        	var cell = document.createElement('th');
        	cell.innerHTML = item.label;
        	if(item.sortable){
        		cell.innerHTML += '<i class="up" id="'+item.name+'-up">&#9650</i>';
        		cell.innerHTML +='<i class="down" id="'+item.name+'-down">&#9660</i>';
        	}
            thead.appendChild(cell);
        });
        frag.appendChild(thead);  
        //rendertbody 
        var term = this.term; //这里我们需要把this.term先赋给其他变量否则在使用时显示为定义这里的this是window
        this.data.forEach(function(item){
        	var row = document.createElement("tr");
        	term.forEach(function(x){
        		var cell = document.createElement("td");
        		cell.innerHTML = item[x.name];
        		row.appendChild(cell);
        	}); 
        	frag.appendChild(row);      	
        });   
        while(this.table.hasChildNodes()){
        	this.table.removeChild(this.table.firstChild);        	
        }
        this.table.appendChild(frag);
	}, 
	
	sortEvent:function(){
		var that = this;
		that.table.onclick= function(e) {
	        var thArr=e.target.id.split("-");
	        sort(thArr[0], thArr[1]);
        };
        function sort(key,direction){
			that.data.sort(function(a,b){
				if(direction === 'up'){
					return a[key]-b[key];//按照对应的属性值排序；
				}else if(direction === 'down'){
					return b[key]-a[key];
				}
			});
		   that.setTable();
		}
	},
	frozenEvent:function(){	//把table的offsetTop与scrolltop做差，后者是滚轮把文档区滚出去了多少；
		var that = this;
		window.onscroll=function(){ //为什么一定要把三个变量放在里面才可以呢 
			var table= that.table;
			var thead = table.firstChild;
			var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;     
			if(table.offsetTop-scrolltop<=0){
	            thead.style.position="fixed";
	            thead.style.top="0";
	            if(table.offsetTop+table.offsetHeight-scrolltop<=0){
	            	thead.style.position="relative";
	            }
			}else{
				thead.style.position="relative";
			}
		};
	}
}


