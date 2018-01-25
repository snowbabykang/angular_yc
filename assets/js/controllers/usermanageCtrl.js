;(function() {
  'use strict';

  angular
    .module('app',[])
    .controller('usermanageController', usermanageController);

  usermanageController.$inject = ['$scope','$compile'];

  function usermanageController($scope,$compile){
	  $scope.test = function(){alert('test');}
	  $scope.test1 = function(){alert('test1');}
	  // TODO 动态生成html中 ng-click无效 解决方法 $compile 是传进来的
	  $scope.addbtn = function() {
		  var html = '<button class="btn info btn-sm" ng-click="test();">新增按钮</button>';
		  var $html = $compile(html)($scope);
		  $(".addbtnbox").append($html);
    };
  };

})();
 