(function() {
  'use strict';
	angular.module('app',[])
	.directive('logindrag',logindragdirective)
	.controller('loginCtrl', loginCtrl);
	
	loginCtrl.$inject = ['$scope','$rootScope','$state','$cookieStore','$http'];
    function loginCtrl($scope,$rootScope,$state,$cookieStore,$http) {
		$scope.submitlogin = function(login){
			$cookieStore.put("creatUser","管理员");
			if(!login || !login.account || !login.psd){
				return false;
			}
			if(!login.remember) login.remember = 0;
			//登陆请求
			console.log(Pace);
			Pace.restart();
			$http.get('assets/js/data/rolepeople.json').success(function(data){
				$state.go('app.home');
				
			});
			
		};
		
	};
    function logindragdirective() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link : function($scope,element,attr,ngModel){
				var x, drag = element, isMove = false,flag = true;
				
				//添加背景，文字，滑块
				var html = '<div class="drag_bg"></div>'+
							'<div class="drag_text" onselectstart="return false;" unselectable="on">拖动滑块验证</div>'+
							'<div class="handler handler_bg"></div>';
				element.append(html);
				
				var handler = drag.find('.handler');
				var drag_bg = drag.find('.drag_bg');
				var text = drag.find('.drag_text');
				var maxWidth = drag.width() - handler.width();  //能滑动的最大间距
				//鼠标按下时候的x轴的位置
				handler.mousedown(function(e){
					//增加判断，没有填写信息不能验证
					if(!$scope.login || !$scope.login.account || !$scope.login.psd){
						return false;
					}
					if(!flag) return false;
					isMove = true;
					x = e.pageX - parseInt(handler.css('left'), 10);
				});
				
				//鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
				drag.mousemove(function(e){
					if(!flag) return false;
					var _x = e.pageX - x;
					if(isMove){
						//console.log("maxWidth"+maxWidth);
						//console.log("移动距离"+_x);
						if(_x > 0 && _x <= maxWidth){
							handler.css({'left': _x});
							drag_bg.css({'width': _x});
						}else if(_x > maxWidth){  //鼠标指针移动距离达到最大时清空事件
							//请求验证方法
							
							//验证通过
							ngModel.$setViewValue('1');
							handler.css({'left': maxWidth});
							drag_bg.css({'width': maxWidth});
							handler.removeClass('handler_bg').addClass('handler_ok_bg');
							text.text('验证通过');
							
							//验证失败
							/* ngModel.$setViewValue('0');
							handler.css({'left': 0});
							drag_bg.css({'width': 0});
							handler.removeClass('handler_bg').addClass('handler_fail_bg');
							text.text('验证失败'); */
							
							drag.css({'color': '#fff'});
							flag = false;
//							handler.unbind('mousedown');
//							drag.unbind('mousemove');
//							drag.unbind('mouseup');
						}
					}
				}).mouseup(function(e){
					if(!flag) return false;
					isMove = false;
					var _x = e.pageX - x;
					if(_x < maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
						handler.css({'left': 0});
						drag_bg.css({'width': 0});
					}
				});
				$scope.changeuser = function(login){
		    		var account = login.account;
		    		if(!account){
		    			ngModel.$setViewValue('0');
		    			handler.css({'left': 0});
						drag_bg.css({'width': 0});
						handler.removeClass('handler_ok_bg handler_fail_bg').addClass("handler_bg");
						text.text('拖动滑块验证');
						drag.css({'color': '#2c3a46'});
						flag = true;
						isMove = false;
		    		}
		    	};
				
			},
		} 
	};
})();
