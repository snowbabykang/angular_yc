(function() {
  'use strict';
  angular
    .module('app')
    .controller('staffModalCtl', staffModalCtl)
    .controller('staffMainCtl', staffMainCtl);
	
    staffModalCtl.$inject = ['$scope', '$uibModalInstance', 'item'];
    function staffModalCtl($scope, $uibModalInstance,item) {
		var type = item.type,id = item.id,treeid = item.tree;
		$scope.modaltype = type;
		
		//选择时间
		$scope.opendate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = true;
		 };
		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : '1916/1/1';
			$scope.maxDate = $scope.maxDate ? null : new Date();
		};
		$scope.toggleMin();
		
		//修改员工信息，默认一些值
		if($scope.modaltype == "update"){
			console.log(id);
			//根据id获取当前编辑的员工的信息
			//$scope.staffopt = data;
		};
		//保存增加员工   保存修改员工信息
		$scope.saveupdatestaff = function(staffopt,type){
			if(!staffopt.name || !staffopt.phone || !staffopt.sex){return false;}
			staffopt.birth = staffopt.birth ? staffopt.birth : "";
			if(type == "add"){
			//增加员工请求操作
			
			}else if(type == "update"){
			//修改员工请求操作
				
			};
			$uibModalInstance.close();
		};
		//确认删除节点
		$scope.savedeleteNode = function(){
			//删除操作请求
			
			//传值重新加载列表
			$uibModalInstance.close();
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
    }
    staffMainCtl.$inject = ['$scope', '$uibModal', '$log','modaltemp.service'];
    function staffMainCtl($scope, $uibModal, $log , $modaltemp) {
		// 新增员工
		$scope.open = function (id) {
			$scope.item = {"id" : $scope.id, "type" : "add", "tree" : $scope.treeId};
			var modaladd = $uibModal.open({
				templateUrl: 'config/setmanage/addstaff.html',
				controller: 'staffModalCtl',
				resolve: {
					item: function () {
						return $scope.item;
					}
				}
			});
			modaladd.result.then(function () {
				//添加成功后操作
				$modaltemp.alertinfo("添加成功");
			});
		};
		$scope.staffcheck = false;
		//检查所选元素
		$scope.checkNode = function(staffcheck,id){
			if(staffcheck == true){
				$scope.checked_nodeids.push(id);
			}else{
				for(var i=0;i<$scope.checked_nodeids.length;i++){
					if($scope.checked_nodeids[i] == id){
						$scope.checked_nodeids.splice(i,1);
					}
				}
			};
		};
		// 修改员工
	    $scope.update = function (){
			if($scope.checked_nodeids.length !== 1){
				$modaltemp.alertinfo("请选择一个修改元素!");
				return false;
			}else{
				$scope.item = {"id" : $scope.checked_nodeids[0], "type" : "update", "tree" : $scope.treeId};
				var modalInstance = $uibModal.open({
					templateUrl: 'config/setmanage/addstaff.html',
					controller: 'staffModalCtl',
					resolve: {
						item: function () {
							return $scope.item;
						}
					}
				});
				modalInstance.result.then(function () {
					//修改成功后操作
					
					$scope.checked_nodeids = [];
					$modaltemp.alertinfo("修改成功");
				});
			}
		};
		// 删除节点
	    $scope.delete = function (){
			if($scope.checked_nodeids.length < 1){
				$modaltemp.alertinfo("请选择元素删除");
				return false;
			}else{
				$scope.item = {"id" : $scope.checked_nodeids, "type" : "delete", "tree" : $scope.treeId};
				var modalDelete = $uibModal.open({
					templateUrl: 'config/setmanage/deleteNodes.html',
					controller: 'staffModalCtl',
					size : 'sm',
					resolve: {
						item: function () {
							return $scope.item;
						}
					}
				});
				modalDelete.result.then(function () {
					//删除后操作
					
					$modaltemp.alertinfo("删除成功");
				});
			}
		};
    };


})();


