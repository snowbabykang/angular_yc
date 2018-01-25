;(function() {
  'use strict';

  angular
    .module('app',[])
    .controller('confighomeCtr', confighomeCtr);
	confighomeCtr.$inject = ['$scope'];
	function confighomeCtr($scope){
		$scope.backinfo = function(info){
			console.log(info);
			//alert(info);
		}
	}

})();
