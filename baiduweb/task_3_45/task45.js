var dataInt = {
    	            "data":[
    	            {"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},
    	            {"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},
    	            {"src":'10.jpg'},{"src":'11.jpg'}
    	            ]
    	        }
var Gallery = function(container,maxHeight){
	this.maxHeight = maxHeight || 300;
	this.container = document.getElementById(container);
	var width = this.container.offsetWidth;
	this.minRatio = width/this.maxHeight;
	this.photos = [];
    this.display();
}
Gallery.prototype.getRatio =function(data){//这个参数是传递的图片；
	var img = new Image();
    img.src = "../image/"+data.src;
    var width = img.width,height = img.height;
    var picRatio = width/height;
    return picRatio;
}
Gallery.prototype.getRows = function(){
	var photos = dataInt.data;
	var relRatio = 0,rowBox= [], pics = [];
	for(var i=0,len = photos.length;i<len;i++){
		var pic = photos[i];
		pics.push(pic); 
		var ratio = this.getRatio(pic);
		relRatio += ratio;
		if(relRatio > this.minRatio){
			rowBox.push({
				relRatio:relRatio,
				imgs:pics
			});
			relRatio = 0;
			pics = [];
		}
	} 
	if(pics){
			rowBox.push({
				relRatio:this.minRatio,
				imgs:pics
			})
		} 
	return rowBox;
}
Gallery.prototype.display = function(){
	var container = this.container
        width = container.offsetWidth;
    this.getRows().forEach(function(row){
        var frag = document.createDocumentFragment(),
    	    oRow = document.createElement('div'),
    	    oHeight = parseInt(width/row.relRatio)+'px';
    	oRow.className = "rowBox";
    	oRow.style.height = oHeight;
        for(var i =0,len = row.imgs.length;i<len;i++){
        	var oBox = document.createElement('div'),
        	    oImg = document.createElement('img');
             
        	oBox.className = "box";
        	oImg.src = "../image/"+row.imgs[i].src;
        	oImg.style.cssText = 'width:auto;height:'+oHeight+';';
        	oBox.appendChild(oImg);
        	oRow.appendChild(oBox);
        }
        frag.appendChild(oRow); 
        container.appendChild(frag);
    })
}
/*Gallery.prototype.scroll = function(){
	var that = this;
	window.onscroll = function(){
		var scrolltop = document.body.scrollTop ||document.documentElement.scrollTop,
		    clientheight = document.body.clientHeight||document.documentElement.clientHeight,
		    height = document.getElementById("main").offsetHeight;
		if( height < scrolltop+clientheight){
	       that.display();
		}
    };
}
*/