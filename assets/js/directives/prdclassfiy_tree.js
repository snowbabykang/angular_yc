angular.module('app', [])
.directive('prdclassfiytree', ['$http',function($http) {
  return { 
    restrict: 'A', 
    link: function ($scope,element, attrs) { 
		$scope.treeId = "prdclassfiytree";
		$scope.prdpageChanged = function(page,classfiyid,prdsearch){
			// $scope.classfiyid  
			//根据页数和分类id请求商品数据
			$http.get('assets/js/data/prdlist.json').success(function (data) {
				console.log(data);
				$scope.selectprdlist = data.rows;
				$scope.prdpagetotal = data.total;
				$scope.prdpageCurPage = 1;
				$scope.prdpagesize = 10;
			});
		};
		var setting = { 
			data: { 
				simpleData: { 
					idKey: "id",
					pIdKey: "pid",
					enable: true
				},
			}, 
			callback: { 
				onClick: function (event, treeId, treeNode, clickFlag) { 
					$scope.classfiyid = treeNode.id;
					$scope.prdpageChanged(1,$scope.classfiyid);
				},
			},
		}; 
		$http.get('assets/js/data/prdclassfiy.json').success(function (data) {
			$.fn.zTree.init(element, setting, data); 
		});
	} 
  }; 
}]); 