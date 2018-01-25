angular.module('app', [])
.factory('getStaff',function($http,$q){
    return function(id){
        var defer = $q.defer();
        $http.get('assets/js/data/staff.json').success(function(data){
			var treeObj = $.fn.zTree.getZTreeObj("stafftree");
			var node = treeObj.getNodeByParam("id", id, null);
			var msg = {
				obj : {
					"depart": node,
					"staff": data[id]
				},
				count : 125,  //数据总数，模拟数据定死的
			}
			
            defer.resolve(msg);
        });
        return defer.promise
    }
})
.directive('stafftree', ['$http','getStaff',function($http,getStaff) {
  return { 
    restrict: 'A', 
    link: function ($scope,element, attrs) { 
		$scope.treeId = "stafftree";
		$scope.checked_nodeids = [];
		var setting = { 
			data: { 
				simpleData: { 
					enable: true
				} 
			}, 
			callback: { 
				onClick: function (event, treeId, treeNode, clickFlag) { 
					$scope.checked_nodeids = [];
					var id = treeNode.id;       //当前id
					$scope.id = treeNode.id;
					$scope.title = treeNode.name;
					$scope.treeObj.expandNode(treeNode, true, false, true);
					$scope.stafflist = [];
					//我这里是循环获取每个部门下的员工，你们应该是可以直接获取的，获取后给分页配置上
					console.log(id);
					if(id !== 0){
						getStaff(id).then(function(data){
							$scope.stafflist.push(data.obj);   //插入当前点击信息
						});
					};
					//获得其下所有节点 并插入子节点信息
					var nodes = $scope.treeObj.getNodesByParam("pId", id, null);
					for(var i = 0; i < nodes.length;i++){     //我这因为是json数据，没有参数，只能循环输出拼的数组，正常情况应该没有for循环的，请求玩数据后给分页赋值
						var nodeid = nodes[i].id;
						getStaff(nodeid).then(function(data){
							$scope.stafflist.push(data.obj);
						});
					};
				},
			},
		}; 
		$http.get('assets/js/data/depart.json').success(function (data) {
			var zNodes = data.tree;
			$.fn.zTree.init(element, setting, zNodes); 
			$scope.stafflist = [];
			$scope.treeObj = $.fn.zTree.getZTreeObj($scope.treeId);
			var treeNode = $scope.treeObj.getNodeByParam("id", 0, null);
			$scope.treeObj.selectNode(treeNode);
			var nodes = $scope.treeObj.getNodesByParam("pId", 0, null);
			for(var i = 0; i < nodes.length;i++){
				var nodeid = nodes[i].id;
				getStaff(nodeid).then(function(data){
					$scope.stafflist.push(data.obj);
					console.log($scope.stafflist);
				});
			};
		});
		
		
	} 
  }; 
}]); 