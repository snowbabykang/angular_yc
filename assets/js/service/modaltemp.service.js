(function() {
    'use strict';
	
	angular
    .module('app')
    .controller('alertmodalCtl', alertmodalCtl);
    alertmodalCtl.$inject = ['$scope', '$uibModalInstance', 'msgdata'];
	function alertmodalCtl($scope, $uibModalInstance,msgdata) {
		$scope.msgdata = msgdata;
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	};
	var myservice = function($uibModal) {
		return {
			alertinfo : function(data){
				$uibModal.open({
					templateUrl: 'common/modaltemp.html',
					controller: 'alertmodalCtl',
					size : 'sm',
					resolve: {
						msgdata: function () {
							return data;
						}
					}
				});
			}
		}
	};
    myservice.$inject = ['$uibModal'];
    tempApp.service('modaltemp.service', myservice);
}());
