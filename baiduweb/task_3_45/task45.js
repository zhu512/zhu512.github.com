var dataInt = {
    	            "data":[
    	            {"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},
    	            {"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},
    	            {"src":'10.jpg'},{"src":'11.jpg'},{"src":'12.jpg'},{"src":'13.jpg'},{"src":'14.jpg'},
    	            {"src":'15.jpg'},{"src":'16.jpg'},{"src":'17.jpg'},{"src":'18.jpg'},{"src":'19.jpg'}
    	            ]
    	        }
var Gallery = function(container,maxHeight){
	this.maxHeight = maxHeight || 200;
	this.container = document.getElementById(container);
	var width = this.container.offsetWidth;
	this.minRatio = width/this.maxHeight;console.log(this.minRatio);
	this.pictures = [];
    this.display();
}
//得到每张图片的宽高比例
Gallery.prototype.getRatio = function(data){//这个参数是传递的图片；

	var img = new Image();
    img.src = "../image/" + data.src;
    var width = 0, height = 0, picRatio = 0;
	img.onload = function(){
    	width = img.width;
    	height = img.height;
    	picRatio = width/height;
    	return picRatio;
    }
}
Gallery.prototype.getRows = function(){
	var pictures = dataInt.data;
	var relRatio = 0,rowBox= [], pics = [];
	for(var i=0,len = pictures.length;i<len;i++){
		var pic = pictures[i];
		pics.push(pic);
		var ratio = this.getRatio(pic);
		relRatio += ratio;
		if(relRatio > this.minRatio){
			debugger
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
		console.log(rowBox);
	return rowBox;
}
Gallery.prototype.display = function(){
	var container = this.container
        width = container.offsetWidth;console.log(width);
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
        	oImg.src = "../image/" + row.imgs[i].src;
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