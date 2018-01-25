(function(){
	'use strict';
	function controller($scope, updateService){
		this.$scope = $scope;
		this.updateService = updateService;
		this.init();
	}
	controller.prototype = baseController;

	controller.$inject = ['$scope', 'config.rolepower.service'];
	tempApp.controller('config.rolepower.mainController', controller);
}());
