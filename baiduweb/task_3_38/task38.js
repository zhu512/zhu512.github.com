var tal = document.getElementsByTagName("table")[0];
var termArr = [
	{
		name:'name',
		label:'姓名',
		sortable:false
    },
	{
		name:'chinese',
		label:'语文',
		sortable:true
    },
	{
		name:'math',
		label:'数学',
		sortable:true
    },
	{
		name:'english',
		label:'英语',
		sortable:true
    },
	{
		name:'total',
		label:'总分',
		sortable:true
    },
];
var dataArr = [
	{
	name:'小明',
	chinese:80,
	math:90,
	english:70,
    total:240
	},
	{
	name: '小红',
	chinese: 90,
	math: 60,
	english: 90,
	total: 240
    }, {
	name: '小亮',
	chinese: 60,
	math: 100,
	english: 70,
	total: 230
    }
];
function Table(container,term,data){
    this.table = container;
    this.term = term;
    this.data = data;
    this.setTable();
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
	sort:function(key,direction){
		this.data.sort(function(a,b){
			if(direction === 'up'){
				return a[key]-b[key];//按照对应的属性值排序；
			}else if(direction === 'down'){
				return b[key]-a[key];
			}
		});
	   this.setTable();
	}
}

var table = new Table(tal,termArr ,dataArr);
 tal.addEventListener('click', function(e) {
	var thArr=e.target.id.split("-");
	table.sort(thArr[0], thArr[1]);
});


