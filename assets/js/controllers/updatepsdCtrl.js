(function() {
  'use strict';
	angular.module('app',[])
	.controller('updatepsdCtrl', updatepsdCtrl);
	
	updatepsdCtrl.$inject = ['$scope','$http','modaltemp.service'];
    function updatepsdCtrl($scope,$http,$modaltemp) {
		$scope.updatepassword = function(password,newpassword1,newpassword2){
			//console.log(password+"===="+newpassword1+"===="+newpassword2);
			if(!password || !newpassword1 || !newpassword2 || newpassword1 !== newpassword2){
				return false;
			};
			
			$modaltemp.alertinfo("修改成功");
		};
	};
})();


