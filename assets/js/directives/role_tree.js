angular.module('app', [])
//获取角色下的人
.factory('getrolepeople',function($http,$q){
    return function(node,page){
        var defer = $q.defer();
        $http.get('assets/js/data/rolepeople.json').success(function(data){
			//这里应该根据当前角色节点node中的id和当前页数作为参数来获取这个角色下的人
			//我这里模拟数据 根据页数获取数据
			var msg = {
				bigTotalItems : data.count,
				pagesize : data.pagesize,
				result : data.list[page],
			};
            defer.resolve(msg);
        });
        return defer.promise
    }
})
//角色树
.directive('roletree', ['$http','getrolepeople',function($http,getrolepeople) {
  return { 
    restrict: 'A', 
    link: function ($scope,element, attrs) { 
		$scope.treeId = "roletree";
		$scope.checked_nodeids = [];
		$scope.setPage = function (pageNo) {
			$scope.bigCurrentPage = pageNo;
		};
		$scope.pageChanged = function(page){
			getrolepeople($scope.currentnode,page).then(function(data){
				$scope.rolepeoplelist = data.result;
				$scope.bigTotalItems = data.bigTotalItems;
				$scope.pagesize = data.pagesize;
			});
		};
		var setting = { 
			data: { 
				key:{
					name : "text",
				}
			}, 
			callback: { 
				onClick: function (event, treeId, treeNode, clickFlag) { 
					$scope.checked_nodeids = [];
					$scope.currentnode = treeNode;   //当前角色节点 编辑删除时使用
					$scope.curretnrole = treeNode.text;
					$scope.setPage(1);
					$scope.pageChanged(1);
					$scope.$broadcast("bigCurrentPageFromParrent", $scope.bigCurrentPage);
					//每次点击时重置菜单权限
					var menutreeObj = $.fn.zTree.getZTreeObj("menutree");
					menutreeObj.checkAllNodes(false);
				},
			},
		}; 
		$http.get('assets/js/data/role.json').success(function (data) {
			$.fn.zTree.init(element, setting, data); 
			var treeObj = $.fn.zTree.getZTreeObj($scope.treeId);
			var node1 =  treeObj.getNodeByTId($scope.treeId+"_1");   //获取第一个节点
			$scope.currentnode = node1;   //当前角色节点
			treeObj.expandNode(node1, true, false, false);    //默认展开第一个节点
			treeObj.selectNode(node1);              //默认选中第一个节点
			$scope.curretnrole = node1.text;
			$scope.bigCurrentPage = 1;	 //默认当前第一页
			getrolepeople(node1,1).then(function(data){
				// console.log(data);
				//模拟数据默认获取第一页
				$scope.rolepeoplelist = data.result;
				$scope.bigTotalItems = data.bigTotalItems;
				$scope.pagesize = data.pagesize;
				$scope.maxSize = 3;          //分页中间块最大显示3个页数
			});
			
		});
		
	} 
  }; 
}])
//菜单权限
.directive('menutree', ['$http',function($http) {
  return { 
    restrict: 'A', 
    link: function ($scope,element, attrs) { 
		$scope.menutreeId = "menutree";
		var setting = { 
			check : {
				enable:true,
				chkStyle: "checkbox",
				autoCheckTrigger: true,
				chkboxType: { "Y": "s", "N": "ps" }
			},
			data: { 
				simpleData: { 
					idKey: "modId",
					pIdKey: "_parentid",
					enable: true
				},
				key: {
					name: "modName"
				},
			}, 
			callback: { 
				onCheck: function (event, treeId, treeNode) { 
					$scope.treeObj.expandNode(treeNode, true, false, true);
				},
			},
		};
		$http.get('assets/js/data/sourcedata.json').success(function (data) {
			$scope.zNodes = data.rows;
			$.fn.zTree.init($("#menutree"), setting, $scope.zNodes); 
			$scope.treeObj = $.fn.zTree.getZTreeObj($scope.menutreeId);
			//下面的展开是写死的因为这个数据多了写其他数据，我就默认把通用管理系统给展开了
			var node = $scope.treeObj.getNodeByParam("modId", '65', null);
			$scope.treeObj.expandNode(node, true, false, true);
		}); 
	} 
  }; 
}]); 