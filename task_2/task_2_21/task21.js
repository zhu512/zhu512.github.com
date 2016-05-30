//获取元素id
var $ = function(id){
    return "string" == typeof id?document.getElementById(id):id;
} 
//事件绑定函数，兼容浏览器差异
function addEventHandler(oTarget, sEventType, fnHandler) {
	if(oTarget.addEventListener){
	  oTarget.addEventListener(sEventType, fnHandler, false);
	}else if(oTarget.attachEvent) {
	  oTarget.attachEvent("on" + sEventType, fnHandler);
	}else{
	  oTarget["on" + sEventType] = fnHandler;
	}
};