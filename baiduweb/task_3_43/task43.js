var dataInt = {
	            "data":[
	            {"src":'http://placehold.it/1200x1000/E59649/000'},{"src":'http://placehold.it/1200x1000/D23064/000'},
	            {"src":'http://placehold.it/1200x1000/9FDBC7/000'},{"src":'http://placehold.it/700x1000/449F9D/000'},
	            {"src":'http://placehold.it/500x500/75A0CC/000'},{"src":'http://placehold.it/550x600/A33E4A/000'}
	            ]
	        }
var Gallery = function(num){
	this.num = num;
    this.init();
}
Gallery.prototype.init = function(){
	var n = this.num,
	    frag = document.createDocumentFragment(),
	    oGallery = document.createElement('div');
	oGallery.className = 'gallery gallery-'+n;
    for(var i=0;i<n;i++){
       var oBox =  document.createElement('div'),
           oImg = document.createElement('img');
       oBox.className = "box";
       oImg.src = dataInt.data[i].src;
       oBox.appendChild(oImg);
       oGallery.appendChild(oBox);
    }
    frag.appendChild(oGallery);
    document.body.appendChild(frag);
}