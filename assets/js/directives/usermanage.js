angular.module('app', [])
.directive('addbtn', ['$compile',function($compile) {
return { 
  restrict: 'A', 
  link: function ($scope,element, attrs) { 
	  $(element).click(function(){
		  var html = '<button class="btn warn btn-sm" ng-click="test1();">directive增加的按钮</button>';
		  var $html = $compile(html)($scope);
		  $(".addbtnbox").append($html);
	  })
	 
	} 
}; 
}]);

//
//angular.module('app',[])
//.directive('myText',function($compile){
//    var template:'<div ng-click="hello()">Hi everyone</div>',
//    return{
//        restrict:'A',
//        link:function(scope,ele,attr){
//             ele.on("click", function() {
//                scope.$apply(function() {
//                    var content = $compile(template)(scope);
//                    element.append(content);
//               })
//            });
//        }
//    }
//})
//1