(function() {
  'use strict';
  angular
    .module('app')
	.factory( 'myData', function() {   //分页获取数据
	  var data = [];
	  
	  // push some dummy data
	  for(var i = 0; i < 30; i++) {
		data.push( { name: "item"+i } );
	  }
	  
	  return {
		get: function(offset, limit) {
		  return data.slice( offset, offset+limit );
		},
		count: function() {
		  return data.length;
		}
	  };
	})
    .controller('ModalSourceCtl', ModalSourceCtl)
    .controller('pageCtl', pageCtl)
    .controller('datasourceModalCtl', datasourceModalCtl);
	
    ModalSourceCtl.$inject = ['$scope', '$uibModalInstance', 'item','setTreeService'];
    function ModalSourceCtl($scope, $uibModalInstance,item,setTreeService) {
		$scope.modaltype = item.type;
		var treeObj = $.fn.zTree.getZTreeObj(item.tree);
		//排序数组
		$scope.orderarr = setTreeService.orderarr;
		//资源类型数组
		$scope.menutype_arr = setTreeService.menutype_arr;
		//图标数组(只列出部分)
		$scope.iconarr = setTreeService.iconarr;
		//上级资源数组（树）
		var nodes = treeObj.transformToArray(treeObj.getNodes());
		$scope.parent_tree = nodes;
		console.log(nodes);
		//修改数据资源
		if($scope.modaltype == "update"){
			//编辑时为弹层赋值
			$scope.updatedata = item.data;
			var pid = item.data._parentid;
			var pnode = treeObj.getNodesByParam("modId", pid, null);
			$scope.parent_tree.obj = pnode[0];
		};
		$scope.blurselect = function(){
			console.log("11111111");
		}
		$scope.someFunction = function(){
			console.log("222222222");
		}
		//保存增加数据资源
		//保存修改数据资源
		$scope.saveupdatesource = function(data,type,parentarr){
			//后端请求保存数据data
			if(type == "add"){
				//增加数据资源
				data._parentId = parentarr.modId;   //选择的上级资源的id
				console.log(data);
			}else if(type == "update"){
				var nodeObj = treeObj.getNodeByTId(data.tId);
				setTreeService.set_treetable(nodeObj);
			};
			$uibModalInstance.close();
		};
		
		//删除数据资源
		if($scope.modaltype == "delete"){
			$scope.updatedata = item.data;
		};
		$scope.savedeletesource = function(data,type){
			//后端请求删除data数据
			console.log(data.modId);
			var nodeobj = treeObj.getNodeByParam("modId", data.modId, null);
			treeObj.removeNode(nodeobj);
			$uibModalInstance.close();
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
    }
    datasourceModalCtl.$inject = ['$scope', '$uibModal', '$log','modaltemp.service','myData'];
    function datasourceModalCtl($scope, $uibModal, $log , $modaltemp,myData) {
		
		//模拟分页
		$scope.bigTotalItems = myData.count();
		$scope.pagesize = 5;	 //每页5条
		$scope.maxSize = 3;          //中间块最大显示3个页数
		$scope.bigCurrentPage = 1;	 //默认当前第一页
		//$scope.noOfPages = Math.ceil(myData.count() / $scope.pagesize);
	  
		$scope.setPage = function () {
			$scope.data = myData.get( ($scope.bigCurrentPage - 1) * $scope.pagesize, $scope.pagesize );
		};
	  
		$scope.$watch( 'bigCurrentPage', $scope.setPage );
		
		// 新增资源
		$scope.open = function (id) {
			$scope.item = {"type" : "add", "tree" : $scope.treeId};
			var modaladd = $uibModal.open({
				templateUrl: 'config/basicmanage/updatesource.html',
				controller: 'ModalSourceCtl',
				resolve: {
					item: function () {
						return $scope.item;
					}
				}
			});
			modaladd.result.then(function () {
				$modaltemp.alertinfo("添加成功");
			});
		};
		//修改资源
		$scope.update = function (){
			if($scope.updatedata){
				$scope.item = { "data" : $scope.updatedata , "type" : "update", "tree" : $scope.treeId};
				var modalInstance = $uibModal.open({
					templateUrl: 'config/basicmanage/updatesource.html',
					controller: 'ModalSourceCtl',
					resolve: {
						item: function () {
							return $scope.item;
						},
					}
				});
				modalInstance.result.then(function () {
					$modaltemp.alertinfo("修改成功");
				}); 
			}else{
				$modaltemp.alertinfo("请在下列列表中点击要修改的元素");
				return false;
			};
		};
		//删除资源
		$scope.delete = function (){
			if($scope.updatedata){
				$scope.item = { "data" : $scope.updatedata , "type" : "delete", "tree" : $scope.treeId};
				var modalInstance = $uibModal.open({
					templateUrl: 'config/basicmanage/deletesource.html',
					controller: 'ModalSourceCtl',
					size : 'sm',
					resolve: {
						item: function () {
							return $scope.item;
						},
					}
				});
				modalInstance.result.then(function () {
					$modaltemp.alertinfo("删除成功");
				}); 
			}else{
				$modaltemp.alertinfo("请在下列列表中点击要删除的资源数据");
				return false;
			};
		}
		
    }
	pageCtl.$inject = ['$scope','myData'];
    function pageCtl($scope,myData) {
		$scope.bigTotalItems = myData.count();
		$scope.pagesize = 5;	 //每页5条
		$scope.maxSize = 3;          //中间块最大显示3个页数
		$scope.bigCurrentPage = 1;	 //默认当前第一页
		$scope.setPage = function () {
			//分页数据传输到页面
			$scope.data = myData.get( ($scope.bigCurrentPage - 1) * $scope.pagesize, $scope.pagesize );
		};
		$scope.$watch( 'bigCurrentPage', $scope.setPage );
	};	
		
})();


