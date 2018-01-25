tempApp.controller('AppCtrl', ['$scope','$rootScope','$http','$sessionStorage','$translate',
	function($scope,$rootScope,$http,$sessionStorage,$translate) {
    $http.get('assets/js/data/mainmenu.json').then(function (resp) {
		$rootScope.mainmenu = resp.data.mainmenu;
	});
	$rootScope.sequence = "Sequence";
	$scope.$storage = $sessionStorage;
	$scope.$storage.foldsidebar = $scope.$storage.foldsidebar || '1';
	// 收缩左侧栏
	$scope.showslidebar = function(){
		$scope.$storage.foldsidebar = $scope.$storage.foldsidebar == '1' ? '0' : '1';
	};
	// angular translate
	$scope.langs = {zh_CN:'Chinese',en:'English', ja_JP : 'Japanese',ko_KR:'Korean'};
	$scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "Chinese";
	$scope.setLang = function(langKey, $event) {
		// set the current lang
		$scope.selectLang = $scope.langs[langKey];
		// You can change the language during runtime
		$translate.use(langKey);
	  };
}]);

/*头部加载*/
tempApp.controller('topController', ['$scope',function($scope) {
	/*过滤排序菜单*/
	$scope.myFilter = function (item) {
		 return !item.ParentCode;
	};
	
}]);
/*左侧菜单加载*/
tempApp.controller('sidebarController', ['$scope','$state',function($scope,$state) {
	/*过滤排序菜单*/
	$scope.mymainFilter = function (item) {
		if($state.includes("app.home") || $state.current.name == "app.updatepsd"){
			return !item.ParentCode;
		}else{
			return $state.includes('app.'+item.FunctionCode);
		}
	};
	// 判断当前状态是否折叠
	$scope.isfoldsidebar = function(item){
		var current = 'app.'+item.ParentCode+'.'+item.FunctionCode;
		if($state.includes(current)){
			return true;
		}else{
			return false;
		}
	};
}]).filter('menufilter', function () {
	return function (input, param1) {
		var output = [];
		for(var i = 0 ;i < input.length;i++){
			if(input[i].ParentCode == param1){
				output.push(input[i]);
			}
		}
		return output;
	};
});
