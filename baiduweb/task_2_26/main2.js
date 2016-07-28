 (function(){
 	var speed = 2;//飞船的飞行角速度
 	var size = 40;//飞船大小
 	var count = 4;//飞船数量
 	var charge_rate = 0.3;//充电速率
 	var discharge_rate = 0.2;//耗电速率

 	var powerbar_step = 5;//能量提示增减步长
 	var powerbar_good = '#70ed3f';
 	var powerbar_mid = '#fccd1f';
 	var powerbar_bad = '#fb0000';
 	var powerbar_width = 5;

 	var screen_width = 800;
 	var screen_height = 800;
 	var screen_x = screen_width/2;
 	var screen_y = screen_height/2;

 	var radius = 50;
 	var orbit_count = 4;
 	var failure_count = 0.3;

 	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();

	var Spaceship = function(id){
		this.id = id;
		this.power = 100;
		this.currstate = 'stop';
		this.mediator = null;
		this.orbit = 100 + 50*id - size/2;
		this.deg = 0;
		this.timer = null;
	};

	//动力系统，控制飞船的飞行以及停止
	Spaceship.prototype.eneryManager = function(){
		var self = this;
		var fly = function(){
			self.timer = setInterval(function(){
				self.deg += speed;
				if(self.deg >= 360) self.deg = 0;
			},16.7);
			consoleUtil.show('飞船' + self.id+'号起飞');
		};

		var stop = function(){
			clearInterval(self.timer);
			consoleUtil.show('飞船' + self.id+'号停止飞行');
		};

		return{
			fly:fly,
			stop:stop
		}
	};

	//能源系统 控制飞船能源
	Spaceship.prototype.powerManger = function(){
		var self = this;
		var charge = function(){
			var chargeRate = charge_rate;
			var timer = setInterval(function(){//飞船在飞行或者被销毁不充电
				if(self.currstate === 'fly' || self.currstate ==='destory'){
					clearInterval(timer);
					return false;
				}
				if(self.power >=100){
					clearInterval(timer);
					self.power = 100;
					return false;
				}
				self.power += chargeRate;
			},16.7);
			consoleUtil.show('飞船' + self.id+'号正在充电');
		};
		var discharge = function(){
			var dischargeRate = discharge_rate;
			var timer = setInterval(function(){
				if(self.currstate === 'stop' || self.currstate === 'destory'){
					clearInterval(timer);
					return false;
				}
				if(self.power <= 0){
					clearInterval(timer);
					self.power = 0;
                    self.stateManager().changeState('stop');
					return false;
				}
				self.power -= dischargeRate;
			},16.7);
			consoleUtil.show('飞船' + self.id+'号能量消耗中');
		};

		return {
			charge:charge,
			discharge:discharge
		};
	};
	//stateManager  状态系统采用状态模式设计
	Spaceship.prototype.stateManager = function(){
		var self = this;
		var states = {
			fly:function(state){
				self.currstate = 'fly';
				self.eneryManager().fly();
				self.powerManger().discharge();
			},
			stop:function(state){
				self.currstate = 'stop';
				self.eneryManager().stop();
				self.powerManger().charge();
			},
			destroy:function(state){
				self.currstate = 'destroy';
				self.mediator.remove(self);//告诉中间者移除飞船
			}
		};

		var changeState = function(state){
			states[state] && states[state]();
			consoleUtil.show('飞船' + self.id+'正在'+state);
		};

		return{
			changeState:changeState
		};
	};

	 //信号系统 飞船接收指令模块
	 Spaceship.prototype.signalManager = function(){
	 	var self = this;
	 	return{
	 		receive:function(msg){console.log(msg.cmd+'   single页面  '+ msg.id);
	 			if(self.currstate != msg.cmd && self.id == msg.id ){//如果消息是传给自己的并且状态需要发生变化
	 				self.stateManager().changeState(msg.cmd);
	 			}
	 		}
	 	}
	 };

	 //[Commander 指挥官，负责单向指令发送，不接收外界消息]
	var Commander = function() {
        this.id = "Don";
        this.cmds = [];
        this.mediator = null;
    };
    Commander.prototype.send = function(msg) {
        this.mediator.send(msg);
        this.cmds.push(msg);
    };

    /**
     * [register:所有对象需要在Mediator里面注册，否则无法通讯]
     * @param {[type]} [obj] [注册对象]
     * @return { [type]} [注册成功返回true，失败返回false]
     */
   
    var Mediator = function(){
    	var spaceships =[];
    	var commander = null;
    	return {
    		register:function(obj){
    			if(obj instanceof Commander){
    				commander = obj;
    				obj.mediator = this;console.log('一开始就注册个指挥官');
    				consoleUtil.show('mediator 注册指挥官' + obj.id);
    				return true;
    			}else if(obj instanceof Spaceship){
    				spaceships[obj.id] = obj;console.log('注册飞船');
    				obj.mediator = this;
    				consoleUtil.show('mediator 注册飞船' + obj.id);
    				return true;
    			}
    			consoleUtil.show('Mediator注册失败');
    		},
    		/**
    		 * [send 发送消息，当发送超过失败率后，对方可以收到数据；有单播和广播两种发送方式]
    		 * @param {[type]} [from] [发送方]
    		 * @param {[type]} [to] [接受放]
    		 * @param {[type]} [msg] [消息]
    		 * @return {[type]} [发送成功返回true，失败返回false]
    		 */
    		send:function(msg){
    			var self = this;  
    			setTimeout(function(){
    				var success = Math.random() > failure_count? true:false;
    				if(success){
						if(msg.cmd == 'launch'){
							self.create(msg);
						}
						for(var key in spaceships){						
							spaceships[key].signalManager().receive(msg);							
						}
    					
    					consoleUtil.show('发送成功');
    					return true;
    				}else {
    					consoleUtil.show('发送失败');
    					return false;
    				}
    			},1000);
    		},
    		 /**
             * [remove 移除通讯对象]
             * @param  {[type]} obj [移除对象]
             * @return {[type]}     [description]
             */
            remove:function(obj){
            	if(obj instanceof Spaceship){
            		consoleUtil.show('销毁飞船' + obj.id);
            		delete spaceships[obj.id];
            		return true;
            	}
            	consoleUtil.show('销毁飞船失败！！');
            	return false;
            },

			/**
             * [create 创建通讯对象]
             * @param  {[type]} msg [信息]
             * @return {[type]}     [创建失败返回false， 成功返回true]
             */
            create:function(msg){
            	if(spaceships[msg.id] !== undefined){
            		consoleUtil.show('飞船已经存在');
            		return false;
            	}
            	var spaceship = new Spaceship(msg.id);
            	this.register(spaceship);
            	return true;
            },
           /**
             * [getSpaceships 获取飞船队列，由于飞船队列spaceships已经封装起来，因此外界只能通过该方法获取飞船队列]
             * @return {[type]} [返回飞船队列]
             */
            getSpaceships: function() {
                return spaceships;
            }
    	};
    };

    /**
     * [Message 消息载体]
     * @param {[type]} target  [消息目标]
     * @param {[type]} command [指令]
     */

    var Message = function(target,command){
    	this.id = target;
    	this.cmd = null;
    	switch(command){
    		case 'launch':
    		case 'stop':
    		case 'fly':
    		case 'destroy':
        		this.cmd = command;
        		break;
        	default:
        		alert('invalid command');
    	}
    };

    /**
     * [butttonHandler 按钮句柄]
     * @param  {[type]} commander [点击按钮后，指挥官commander进行相应操作]
     * @return {[type]}           [指令正确返回true，指令错误返回false]
     */
    var buttonHandler = function(commander){
    	var id = null;
    	var cmd = null;
    	$('.btn').on('click',function(){
    		var cmdName = $(this).attr('name');
    		 switch (cmdName) {
                case "launch":
                case "fly":
                case "stop":
                case "destroy":
                    id = $(this).parent().index() - 1;
                    cmd = cmdName; 
                    break;
                default:
                    alert("invalid command!");
                    return false;
            }
            var message = new Message(id, cmd);
            commander.send(message); 
            return true;
    	});
    }

    /**
     * [动画工具 该动画采用双缓存刷新以及requestAnimationFrame致力消除动画闪屏现象]
     */
    var animUtil = (function(){
    	var canvas = $('#screen')[0];
    	canvas.width = screen_width;
    	canvas.height = screen_height;
    	var screencxt= canvas.getContext('2d');

    	var cacheCanvas = document.createElement("canvas");
            cacheCanvas.width = screen_width;
            cacheCanvas.height = screen_height;
    	var cacheContext = cacheCanvas.getContext('2d');

    	var timer = null;
    	var mediator = null;//控制动画刷新的mediator
        /**
         * [drawPlanet]
         * @param {[type]} [context] [目标画布]
         * @return {[type]} [description]
         */
         var drawPlanet = function(context){
         	var x = screen_x - radius;
         	var y = screen_y - radius;
         	var planet = new Image();
         	planet.src = "earth.png";
         	planet.onload = function(){
         		context.drawImage(planet,x,y,radius*2,radius*2);
         	};
         };

         /**
         * [drawOrbit 画飞船轨道]
         * @param  {[type]} context [目标画布]
         * @return {[type]}      [description]
         */
        var drawOrbit = function(context){
        	for(var i =0;i<orbit_count; i++){
        		context.strokeStyle = ' #999';
        		context.beginPath();
        		context.arc(screen_x,screen_y,100+50*i,0,2*Math.PI);
        		context.closePath();
        		context.stroke();
        	}
        };
          /**
         * [动画更新时背景不用刷新，因此仅仅在初始化时绘制一次在background画布上的背景，减少计算量。background画布位于screen画布下面，通过css中z-index属性进行叠加]
         * @return {[type]} [description]
         */
        (function(){
        	$('#bg').attr({
        		width:screen_width,
        		height:screen_height
        	});
        	var context = $('#bg')[0].getContext('2d');
        	context.clearRect(0,0,screen_width,screen_height);
        	drawPlanet(context);
        	drawOrbit(context);
        })();
          /**
         * [drawSpaceship 画飞船]
         * @param  {[type]} context      [目标画布,这里的画布是缓存画布]
         * @param  {[type]} spaceship [飞船]
         * @return {[type]}           [绘画成功返回true，失败返回false]
         * 
         */
        var drawSpaceship = function(context, spaceship){
        	var spaceshipImg = new Image();
        	spaceshipImg.src = 'rocket-red2.png';
        	spaceshipImg.onload = function(){
                //screencxt.drawImage(spaceshipImg, 0, 0,screen_width,screen_height);
        		try{ 
        			context.save();  
        			context.translate(screen_x,screen_y);//更改画布坐标系，将画布坐标原点移到画布中心
        			context.rotate(-spaceship.deg * Math.PI / 180);//根据飞船飞行角度进行画布选择
                  
        			context.beginPath();
        			if(spaceship.power > 60){
        			 	context.strokeStyle = powerbar_good;
        			}else if(spaceship.power <=60 && spaceship.power >= 20){
        			 	context.strokeStyle = powerbar_mid;
        			}else {
        			 	context.strokeStyle = powerbar_bad;
        			}   
        			context.lineWidth = powerbar_width;
        			context.moveTo(spaceship.orbit, -powerbar_step);
        			context.lineTo(spaceship.orbit + size *(spaceship.power / 100), -powerbar_step);
        			context.stroke();
                  
        			context.drawImage(spaceshipImg, spaceship.orbit, 0 , size, size); 
        			context.restore();//恢复原坐标
        			screencxt.clearRect(0, 0, screen_width, screen_height); 
        			screencxt.drawImage(cacheCanvas, 0, 0,screen_width, screen_height);//这里有个巨大的坑，我之前传的是cachecContext，应该传canvas对象
        			return true;
        		} catch(error){
        			return false;
        		}
        	};
        };
         /**
         * [onDraw 绘制屏幕画布]
         * @param  {[type]} spaceships [飞船队列]
         * @return {[type]}            [description]
         */
        var onDraw = function(spaceships){
        	if(!(spaceships === undefined || spaceships.every(function(item,index,array){
        		return item === undefined;
        	}))){
        		cacheContext.clearRect(0, 0, screen_width, screen_height);
        		for(var i = 0; i < spaceships.length; i++){
        			if(spaceships[i] !== undefined){
        				drawSpaceship(cacheContext, spaceships[i]);
        			} 			
        		}
        	} else{
	        	screencxt.clearRect(0,0,screen_width, screen_height);	
	        }
        } ;
         /**
         * [animLoop 动画循环]
         * @return {[type]} [description]
         */ 
        var animLoop = function(){          
            requestAnimationFrame(animLoop);     	
        	onDraw(mediator.getSpaceships());;
        };
         /**
         * [setMediator  为AnimUtil设置Mediator，通过mediator保存的状态控制动画更新]
         * @param {[type]} _mediator [description]
         */
        var setMediator = function(_mediator){
        	mediator = _mediator;
        };
        return{
        	setMediator:setMediator,
        	animLoop: animLoop
        }

    })();

     /**
     * [控制台工具 负责显示运行信息]
     */
    var consoleUtil =(function(){
    	var $consoleMsg = $('#msg');
    	var show = function(msg){
    		var $msg = $('<p></p>').text(msg).prependTo($consoleMsg);
    	};
    	return{
    		show: show
    	}
    })();

    window.onload = function(){
    	var commander = new Commander();
    	var mediator = new Mediator();
    	mediator.register(commander);
    	buttonHandler(commander);
    	animUtil.setMediator(mediator);
    	animUtil.animLoop();
    };
 })();