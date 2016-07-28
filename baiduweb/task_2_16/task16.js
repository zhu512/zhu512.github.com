/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var $ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = $("aqi-city-input").value.trim();
    var value = $("aqi-value-input").value.trim();
    var re_c = /^[A-Za-z\u4E00-\u9FA5]+$/;
    var re_v = /^\d+$/;
    if(!re_c.test(city)){
      alert("你输入的城市名必须为汉字，请重新输入！");
      return;
    }
    if(!re_v.test(value)){
      alert("空气质量必须为整数，请重新输入！");
      return; 
    }  

    aqiData[city]= value;   
    return aqiData;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    
    var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
    items +="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button id='"+city+"'>删除</button></td></tr>";
    }
    $("aqi-table").innerHTML = city? items:"";//这一步很巧妙的说；
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  $("add-btn").addEventListener("click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数。。。事件委托
  $("aqi-table").addEventListener("click",function(e){
      delBtnHandle(e.target.id);//e.target事件发生者就是那个删除按钮，把它的id传给delBtnHandle函数会对应删除数组中的数据，因为我把对应按钮的id设置成了city值
  });
}

init();