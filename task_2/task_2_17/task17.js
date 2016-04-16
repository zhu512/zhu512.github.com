/* 数据格式演示     遗留问题，初始化打开页面时没有直接对应的页面图标显示。
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
//跨浏览器绑定事件
function addEventHandler(element,event,handler){
  if(element.addEventListener){
    element.addEventListener(event,handler,false);
  }else if(element.attachEvent){
    element.attachEvent("on"+event,handler);
  }else{
    element["on"+event] = handler;
  }
}
var $ = function(id){
  return "string" == typeof id?document.getElementById(id):id;
};
var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  //把chartDate里面的数据读出来呈现在页面中
  //不用传传递chartData参数因为它是一个全局变量，函数直接可以读到它的数据
  var color = '' ,text='';
    for(var time in chartData){
        color = '#'+Math.floor(Math.random()*0xFFFFFF).toString(16);
        text +='<div title="'+time+":"+chartData[time]+'" style ="height:'+chartData[time]+'px;background-color:'+color+'"></div>'
    }
    aqiChartWrap.innerHTML=text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
  // 确定是否选项发生了变化 
  // 不用传参理由同上；
  if(pageState.nowGraTime == value){
    return;
  }else{
    pageState.nowGraTime = value;
  }
  // 设置对应数据
    initAqiChartData();

  // 调用图表渲染函数
    renderChart(); 
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  pageState.nowSelectCity = this.value;
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
  
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 * var radio = document.getElementsByName("gra-time");
  for(var i = 0;i<radio.length;i++){
 */
function initGraTimeForm() {

    addEventHandler($("form-gra-time"),"click", function(e){
    graTimeChange(e.target.value);
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityList ='';
  for (var city in aqiSourceData){
      cityList += "<option>"+ city +"</option>"; 
  }
  $("city-select").innerHTML = cityList;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEventHandler($("city-select"),"change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  //根据pageState中的nowSelectCity和nowGraTime从aqiSourceData获取原始数据保存到chartData
  var tempDate = aqiSourceData[pageState.nowSelectCity];
  switch(pageState.nowGraTime){
    case "day":
       chartData = tempDate;
       break;
    case "week":
      chartData = {};
      var daySum =0,countSum = 0 ;week=0;
      for(var time in tempDate){   
        daySum++;
        countSum += tempDate[time];
        if((new Date(time)).getDay() == 6){
          week++;
          chartData["第"+week+"周"] = Math.floor(countSum/daySum);
          daySum = 0;
          countSum = 0;
        }
      }
        if(daySum != 0){//最后一周不满7天单独计算平均值
          week++;
          chartData["第"+week+"周"] = Math.floor(countSum/daySum);
      }
    break;
    case "month":
      chartData = {};
      var daySum =0,countSum = 0 ;month = 0;
      for(var time in tempDate){
        daySum++;
        countSum += tempDate[time];
        if((new Date(time)).getMonth() == month){
          month++;
          chartData["第"+month+"月"] = Math.floor(countSum/daySum);
          daySum = 0;
          countSum = 0;
        }
      }
    break;    
  }
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData(); 
}

init();
