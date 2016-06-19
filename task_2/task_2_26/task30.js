var $ = function(id){
	return document.getElementById(id);
};
function getLength(str){
    // \x00-xff代表单字节字符。
    return str.replace(/[^\x00-xff]/g,"xx").length;
    }	
 (function(){
 var aInput = document.getElementsByTagName("input");
 var name = aInput[0];
 var pwd1 = aInput[1];
 var pwd2 = aInput[2];
 var email = aInput[3];
 var tel = aInput[4];
 var aP=document.getElementsByTagName("p");
 var name_msg = aP[0];
 var pwd1_msg=aP[1];
 var pwd2_msg = aP[2];
 var email_msg = aP[3];
 var tel_msg = aP[4];
 var flag = [false,false,false,false,false];
name.onfocus = function(){
	name_msg.innerHTML = '必填，长度为4~16个字符';
};
name.onblur = function(){
	var re = /[^\w\u4e00-\u9fa5]/g;
	if(!name.value){
		name_msg.innerHTML = '名称不能为空';
		name.style.border = 'solid 1px red';
	}else if(getLength(name.value)<4 || getLength(name.value)>16 ){
        name_msg.innerHTML = '名称格式不正确';
		name.style.border = 'solid 1px red';
    }else if(re.test(name.value)){
    	name_msg.innerHTML = '名称格式不正确';
		name.style.border = 'solid 1px red';
    }
    else{
    	name_msg.innerHTML = '名称格式正确';
		name.style.border = 'solid 1px green';
		flag[0] = true;
	}
};
pwd1.onfocus = function(){
	pwd1_msg.innerHTML = '必填';
};
pwd1.onblur = function(){
	var re =/[^\w]/g;
	if(!pwd1.value){
		pwd1_msg.innerHTML = '密码不能为空';
		pwd1.style.border = 'solid 1px red';
	}else if(pwd1.value.length <4 || pwd1.value.length>16 ){
		pwd1_msg.innerHTML = '密码不可用';
		pwd1.style.border = 'solid 1px red';
	}else if(re.test(pwd1.value)){
		pwd1_msg.innerHTML = '密码包含非法字符';
		pwd1.style.border = 'solid 1px red';
	}else{
		pwd1_msg.innerHTML = '密码可用';
		pwd1.style.border = 'solid 1px green';
		flag[1] = true;
	}
};
pwd2.onblur = function(){
	 if(pwd2.value && pwd1.value == pwd2.value ){
		pwd2_msg.innerHTML = '密码相同';
		pwd2.style.border = 'solid 1px green';
		flag[2] = true;
	}else{
		pwd2_msg.innerHTML = '密码正确';
		pwd2.style.border = 'solid 1px red';	
	}
};

email.onfocus = function(){
	email_msg.innerHTML = '填写正确的邮箱格式';
};
email.onblur = function(){
	var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/;
	if(!email.value){
		email_msg.innerHTML = '邮箱格式不能为空';
		email.style.border = 'solid 1px red';
	}else if(re.test(name.value)){
		email_msg.innerHTML = '邮箱格式错误';
		email.style.border = 'solid 1px red';
	}else{
		email_msg.innerHTML = '邮箱格式正确';
		email.style.border = 'solid 1px green';
		flag[3] = true;
	}
};

tel.onfocus = function(){
	name_msg.innerHTML = '填写正确的电话';
};
tel.onblur = function(){
	var re = /^[1][0-9]{10}$/;
	if(!tel.value){
		tel_msg.innerHTML = '电话不能为空';
		tel.style.border = 'solid 1px red';
	}else if(re.test(tel.value)){
		tel_msg.innerHTML = '电话格式不正确';
		tel.style.border = 'solid 1px red';
	}else{
		tel_msg.innerHTML = '电话正确';
		tel.style.border = 'solid 1px green';
		flag[4] = true;
	}
};

$('submit').onclick = function(){console.log(flag);
    if(flag.every(function(x){return x ;})){
    	alert('提交成功！');
    }else{
    	alert('提交失败！');
    }
};
})();