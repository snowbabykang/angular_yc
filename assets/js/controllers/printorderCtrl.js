(function() {
  'use strict';
	angular.module('app',[])
	.controller('printorderCtrl', printorderCtrl);
	
	printorderCtrl.$inject = ['$scope','$stateParams','$http','modaltemp.service'];
    function printorderCtrl($scope,$stateParams,$http,$modaltemp) {
		$scope.orderid = $stateParams.id;
		//console.log($scope.orderid);
		//请求订单内容进行赋值
		
	};
})();


