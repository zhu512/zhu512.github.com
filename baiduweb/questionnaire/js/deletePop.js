define(['newpage'],function(N){
	var center=function(obj){
		//获取当前浏览器的宽高
	var screenWidth=$(window).width(),
		screenHeight=$(window).height();

		//获取当前窗口距离页面顶部高度
	var scrollTop=$(document).scrollTop();


	var objLeft=(screenWidth-obj.width())/2;
	var objTop=(screenHeight-obj.height())/2+scrollTop;
	obj.css({
		left:objLeft+'px',
		top:objTop+'px',
		display:'block'
	});
	//浏览器改变窗口大小时
	$(window).resize(function(){
		screenWidth=$(window).width();
		screenHeight=$(window).height();
		scrollTop=$(document).scrollTop();
		
		objLeft=(screenWidth-obj.width())/2;
		objTop=(screenHeight-obj.height())/2+scrollTop;

		obj.css({
			left:objLeft+'px',
			top:objTop+'px',
			'display':'block'
		});
	});
		//浏览器有滚动条时
	$(window).scroll(function(){
		screenWidth = $(window).width();
	    screenHeight = $(window).height();
	    scrolltop = $(document).scrollTop();
		if(obj.css('display')!=='none')
		{  
	        objLeft = (screenWidth - obj.width())/2 ;
	        objTop = (screenHeight - obj.height())/2 + scrolltop;
	           
	        obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
		}
		if($('#mask').css('display')!=='none')
		{
			maskTop =  scrolltop;
			 $('#mask').css({
        	width:screenWidth +'px',
        	height: screenHeight+'px',
        	top:maskTop+'px'
        });
		}
       
	});
	//$('.close').alert();
	$('.close').click(function(event){    //启用警告框关闭功能,但是调用BootStrap中的方法时不对
				close($('.notice'),$('#mask'));
		});
	};
	var close=function(obj1,obj2){
		obj1.remove();
		obj2.remove();
	};
	var check=function(obj,obj1,obj2,selected){
		obj1.click(function(event){
			close($('.notice'),$('#mask'));//删除屏蔽罩和弹出框
			var trs=$('tbody tr');
			var selectOpt;
			var key,objSelect;
			var qnobj;
			for(var i=0,len=selected.length;i<len;i++)    //遍历每个选项，若被选中则删除
			{	
			  	selectOpt=selected[i];
			  	objSelect= trs[selectOpt];
			  	$(objSelect).remove();
				//寻找选中元素所在的行，然后在 localStorage中删除元素
         		key=localStorage.key((selectOpt-i));  //每次删除元素后，localStorage中元素的位置会变动
         		//qnobj =JSON.parse(localStorage.getItem(key));
          		localStorage.removeItem(key);  
			}
			if(localStorage.length===0)
			{
			  	window.location.hash = '#newpage';
			  	N.createPageOne();
			}
			  event.stopPropagation();
		});//执行确定操作
		obj2.click(function(){
			close($('.notice'),$('#mask')); //删除屏蔽罩和弹出框
		});
	};
	return{
		center:center,
		check:check
	};
});