var calendar = function(selector){
    return new calendar.prototype.init(selector);
}
calendar.prototype = {
	init:function(selector){
		this.table = selector;
		this.year = new Date().getFullYear();
		this.month = new Date().getMonth()+1;
		this.day = new Date().getDate();
		this.draw();
		var self = this;
		this.table.onclick = function(e){
            if($(e.target).is('#prev')){console.log(e.target);
                self.prevMonth();
                $('.cal').show();                    
            }else if($(e.target).is('#next')){
            	self.nextMonth();
            	$('.cal').show();  
            }else if($(e.target).is('tbody a')){
            	self.day = e.target.text;
            	var time = $('span').html()+"/"+self.day;
            	$('input').val(time);
                $('.cal').hide();  
            }
		};
		return this;
	}, 
	onChange:function(){
		var cur = this.year+"&#47;"+this.month;
        $("span").html(cur);
	},
	onToday:function(o){
       o.className = "today";
	},
	prevMonth:function(){
        this.preDraw(new Date(this.year,this.month-2,1));
        this.onChange();
	},
	nextMonth:function(){
		this.preDraw(new Date(this.year,this.month,1));
		this.onChange();
	},
	preDraw:function(date){
        this.year = date.getFullYear();this.month = date.getMonth()+1;
        this.draw();
	},
	draw:function(){
		var arr =[];
		for(var i = 1,firstDay = new Date(this.year,this.month-1,1).getDay();i < firstDay;i++){
			//var n = new Date(this.year,this.month-2,0).getDate()-firstDay+i+1;
			arr.push(0);console.log(firstDay);
		}
	    for(var i = 1,monthDay = new Date(this.year,this.month-1,0).getDate();i<=monthDay;i++){
	    	arr.push(i);
	    }
	    //for(var i = 1;i<=42-(firstDay+monthDay);i++){
	    //	arr.push(i);
	    //}
	    var frag = document.createDocumentFragment(),
	        table = document.createElement("table"),
	        caption = document.createElement("caption"),
	        thead = document.createElement("tr"),
	        tbody = document.createElement("table");
	        table.className = "cal"; 
	        $(caption).append('<a href="#" id="prev">&lt;&lt;</a><span>2016/05</span><a href="#" id="next">&gt;&gt;</a>');
            $(thead).append('<th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th>');       
	        $(table).append(caption);
	        $(table).append(thead);
	    while(arr.length){
	    	var row = document.createElement('tr');
	    	for(var i=0;i<7;i++){
	    		var cell = document.createElement('td'),
	    		    a = document.createElement('a');
                //$(cell).html('&nbsp');
	    		if(arr.length){
	    			var d = arr.shift();
	    			if(d){
	    				$(a).html(d).attr('href','#'); 
	    				$(cell).append(a);
                        var today = new Date(this.year,this.month-1,d);
                        this.isSame(today,new Date()) && this.onToday(cell);
	    			}
	    		}
	    		$(row).append(cell);
	    	}
	    	$(tbody).append(row);
	    	$(table).append(row);
	    }
	    $(frag).append(table);
	    while(this.table.hasChildNodes()){
	    	this.table.removeChild(this.table.firstChild);
	    }
	    this.table.appendChild(frag);
        
	},
	isSame: function(d1, d2) {
    return (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
  } 

}
calendar.prototype.init.prototype = calendar.prototype;
var selector = document.getElementById('calendar');
calendar(selector);
$('input').click(function(){
   $('.cal').show();
});