angular.module('app', [])
.factory('gettreeData', function() {   //分页获取数据
	return {
		getnodearr : function(treeNode,node,id){
		console.log("请求树的数据");
		var arr = [
			{
				"id": treeNode.id,
				"pId": treeNode.pId,
				"name": treeNode.name,
				"title": treeNode.title,
				"ptitle": treeNode.ptitle,
				"creattime" : treeNode.creattime,
				"iphone" : treeNode.iphone,
				"city" : treeNode.city
			}
		],
		obj = "";
		for(item in node){
			obj = {
				"id": node[item].id,
				"pId": id,
				"name": node[item].name,
				"title": node[item].title,
				"ptitle": treeNode.name,
				"creattime" : node[item].creattime,
				"iphone" : node[item].iphone,
				"city" : node[item].city
			};
			arr.push(obj);
		}
		return arr;
		},
   };
})

.directive('tree', ['$http','gettreeData',function($http,gettreeData) {
  return { 
    restrict: 'A', 
    link: function ($scope,element, attrs) { 
		$scope.treeId = "tree";
		$scope.setinfo = function(info){
			$scope.info = info;
		}

		var setting = { 
			data: { 
				simpleData: { 
					enable: true
				} 
			}, 
			callback: { 
				onClick: function (event, treeId, treeNode, clickFlag) { 
					$scope.$apply(function () {
						var id = treeNode.id;       //当前id
						var nodes = $scope.treeObj.getNodesByParam("pId", id, null);
						$scope.treeObj.expandNode(treeNode, true, false, true);
						$scope.info = gettreeData.getnodearr(treeNode,nodes,id);
						$scope.id = treeNode.id;
						$scope.title = treeNode.name;
						//$scope.bigCurrentPage = 2;
						$scope.setpage(2);
					}); 
				},
				onNodeCreated:function(event, treeId, treeNode) {
						var pid = treeNode.pId;
						$scope.treeObj = $.fn.zTree.getZTreeObj($scope.treeId);
						if($scope.id == pid){
							//新增
							var node = $scope.treeObj.getNodesByParam("pId", pid, null);
							var pnode = $scope.treeObj.getNodesByParam("id", pid, null);
							$scope.info = gettreeData.getnodearr(pnode,node,pid);
							//console.log("$scope.info");
							$scope.bigTotalItems = $scope.info.length;
						}
				},	
				onRename:function(event, treeId, treeNode) {
					console.log(treeNode);
					if($scope.optstatus = "search"){
						$scope.treeObj.cancelEditName();
						console.log("搜搜");
					}else{
						console.log("修改");
					}
					var node = $scope.treeObj.getNodesByParam("pId", treeId, null);
					$scope.info = gettreeData.getnodearr(treeNode,node,treeId);
				},
				onRemove:function(event, treeId, treeNode) {
					var pid = treeNode.pId;
					$scope.treeObj = $.fn.zTree.getZTreeObj($scope.treeId);
					var node = $scope.treeObj.getNodesByParam("pId", pid, null);
					var pnode = $scope.treeObj.getNodesByParam("id", pid, null);
					$scope.info = gettreeData.getnodearr(pnode,node,pid);
				},				
			},
		}; 
		$http.get('assets/js/data/depart.json').success(function (data) {
			var zNodes = data.tree;
			$.fn.zTree.init(element, setting, zNodes); 
			// $scope.treeObj = $.fn.zTree.getZTreeObj($scope.treeId);
			var node = $scope.treeObj.getNodesByParam("pId", 0, null);
			var treeNode = $scope.treeObj.getNodeByParam("id", 0, null);
			$scope.treeObj.selectNode(treeNode);
			$scope.info = gettreeData.getnodearr(treeNode,node,0);
			$scope.id = 0;
			$scope.title = "根节点";
			//console.log("$scope.info");
			//console.log($scope.info);
			$scope.bigTotalItems = 10;
			$scope.pagesize = 2;
			$scope.setpage(1);
		});
		
	} 
  }; 
}]); 