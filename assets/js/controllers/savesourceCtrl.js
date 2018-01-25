(function() {
  'use strict';
  angular
    .module('app')
    .controller('savesourceCtrl', savesourceCtrl)
    savesourceCtrl.$inject = ['$scope', '$http','modaltemp.service'];
    function savesourceCtrl($scope, $http,$modaltemp) {
		
		$scope.searchsorceinfo = function(codeid){
			if(codeid){
				$http.get('assets/js/data/savesource.json').success(function (data) {
					console.log(data.list);
					$scope.sourcelist = data.list;
					
					
				});
			}else{
				$modaltemp.alertinfo("请输入溯源码");
				return false;
			}
		};
    }
})();


