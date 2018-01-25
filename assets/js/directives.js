//按钮点击延迟

tempApp.directive('delaybtn', function(){  
	return {
		restrict: 'A',
		link : function($scope,elem,attr){
			elem.live("click",function(e){
				console.log(elem);
				console.log($scope);
				// if(elem.hasClass("disabled")){
					// console.log("禁止点击");
					// e.preventDefault();
					// e.stopPropagation();
				// }else{
					// elem.addClass("disabled");
					// setTimeout(function(){elem.removeClass("disabled");},'2000');
				// };
				
			});
		},
	}  
});
