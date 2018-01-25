(function() {
  'use strict';
  angular
    .module('app')
    .controller('roleModalInstanceCtl', roleModalInstanceCtl)
    .controller('roleuserModalInstanceCtl', roleuserModalInstanceCtl)
    .controller('rolepeoplepageCtrl', rolepeoplepageCtrl)
    .controller('roleModalCtl', roleModalCtl);
	
    roleModalInstanceCtl.$inject = ['$scope', '$uibModalInstance', 'item'];
    function roleModalInstanceCtl($scope, $uibModalInstance,item) {
		$scope.modaltype = item.type;
		var treeObj = $.fn.zTree.getZTreeObj(item.tree);
		//图标数组(只列出部分)
		$scope.iconarr = ["icon-department","icon-edit","icon-folder","icon-resource","icon-group",
	"icon-role-permission","icon-chart_pie","icon-chart_curve",];
		//上级角色数组（树）
		var nodes = treeObj.transformToArray(treeObj.getNodes());
		$scope.parent_role = nodes;
		
		//修改数据角色
		if($scope.modaltype == "update"){
			//编辑时为弹层赋值
			$scope.currentnode = item.data;
			var pid = item.data.parentId;
			var pnode = treeObj.getNodesByParam("id", pid, null);
			$scope.parent_role.obj = pnode[0];
		};
		
		//保存增加数据角色
		//保存修改数据角色
		$scope.saveupdaterole = function(data,type,parentarr){
			//后端请求保存数据data
			if(!data.text || !parentarr){return false;}
			data.text = data.text ? data.text : "";
			data.parentId = parentarr.id;   //选择的上级角色的id
			if(type == "add"){
				//增加数据角色
				var node = treeObj.getNodeByParam("id", parentarr.id, null);
				data.id = "999";   //模拟数据，额外需要什么其他数据需自行添加
				//增加树节点
				treeObj.addNodes(node, data);
				//增加角色请求数据
				
			}else if(type == "update"){
				treeObj.updateNode(data);   //修改树节点
				//修改角色请求数据
				
				console.log(data);
			};
			$uibModalInstance.close();
		};
		
		//删除数据角色
		if($scope.modaltype == "delete"){
			$scope.currentnode = item.data;
		};
		$scope.savedeleterole = function(data,type){
			//删除树节点
			var nodes = treeObj.getSelectedNodes();
			treeObj.removeNode(nodes[0]);
			//后端请求删除data数据
			
			$uibModalInstance.close();
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
    };
	//保存用户的操作
	roleuserModalInstanceCtl.$inject = ['$scope', '$uibModalInstance', 'item'];
    function roleuserModalInstanceCtl($scope, $uibModalInstance,item) {
		$scope.modaltype = item.type;
		//保存增加角色用户
		$scope.saveadduser = function(data,type){
			//后端请求保存数据data
			if(!data.name || !data.loginname || !data.use_state){return false;}
			var currentnode = item.node;    //当前要增加的员工所属的角色数组
			//后端请求增加角色用户
				
			$uibModalInstance.close();
		};
		
		$scope.savedeleteuser = function(){
			//后端请求删除data数据
			var delids = item.data;
			console.log(delids);
			
			$uibModalInstance.close();
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
    };
	
    roleModalCtl.$inject = ['$scope', '$uibModal', '$log','modaltemp.service'];
    function roleModalCtl($scope, $uibModal, $log , $modaltemp) {
		// 新增角色
		$scope.open = function (id) {
			$scope.item = {"type" : "add", "tree" : $scope.treeId};
			var roleadd = $uibModal.open({
				templateUrl: 'config/powermanage/updaterole.html',
				controller: 'roleModalInstanceCtl',
				resolve: {
					item: function () {
						return $scope.item;
					}
				}
			});
			roleadd.result.then(function () {
				$modaltemp.alertinfo("添加成功");
			});
		};
		//修改角色
		$scope.update = function (){
			if($scope.currentnode){
				$scope.item = { "data" : $scope.currentnode , "type" : "update", "tree" : $scope.treeId};
				var modalInstance = $uibModal.open({
					templateUrl: 'config/powermanage/updaterole.html',
					controller: 'roleModalInstanceCtl',
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
				$modaltemp.alertinfo("请在左侧点击要修改的角色");
				return false;
			};
		};
		//删除角色
		$scope.delete = function (){
			if($scope.currentnode){
				$scope.item = { "data" : $scope.currentnode , "type" : "delete", "tree" : $scope.treeId};
				var modalInstance = $uibModal.open({
					templateUrl: 'config/powermanage/deleterole.html',
					controller: 'roleModalInstanceCtl',
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
				$modaltemp.alertinfo("请在左侧点击要删除的角色");
				return false;
			};
		};
		//保存角色权限
		$scope.saverolepower = function(){
			var treeObj = $.fn.zTree.getZTreeObj("menutree");
			var nodes = treeObj.getCheckedNodes(true);
			console.log(nodes);
			if(nodes.length > 0){
				//保存菜单资源的请求
				
				$modaltemp.alertinfo("保存成功");
			}else{
				$modaltemp.alertinfo("请选择菜单资源再保存");
				return false;
			}
		};
		// 新增用户
		$scope.openuser = function (id) {
			$scope.item = {"type" : "add" , "node" : $scope.currentnode};
			var roleadd = $uibModal.open({
				templateUrl: 'config/powermanage/adduser.html',
				controller: 'roleuserModalInstanceCtl',
				resolve: {
					item: function () {
						return $scope.item;
					}
				}
			});
			roleadd.result.then(function () {
				$modaltemp.alertinfo("添加用户成功");
			});
		};
		$scope.usercheck = false;
		//检查所选元素
		$scope.checkNode = function(usercheck,id){
			if(usercheck == true){
				$scope.checked_nodeids.push(id);
			}else{
				for(var i=0;i<$scope.checked_nodeids.length;i++){
					if($scope.checked_nodeids[i] == id){
						$scope.checked_nodeids.splice(i,1);
					}
				}
			};
		};
		//删除用户
		$scope.deleteuser = function (){
			if($scope.checked_nodeids.length > 0){
				$scope.item = { "data" : $scope.checked_nodeids , "type" : "delete"};
				var modalInstance = $uibModal.open({
					templateUrl: 'config/powermanage/deleteuser.html',
					controller: 'roleuserModalInstanceCtl',
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
				$modaltemp.alertinfo("请在下方点击要删除的用户");
				return false;
			};
		};
    };
	//每次切换角色节点时，页面总是无法重置，最终在分页上直接加controller，将当前页bigCurrentPage传进来
	rolepeoplepageCtrl.$inject = ['$scope'];
    function rolepeoplepageCtrl($scope) {
		$scope.$on("bigCurrentPageFromParrent",function(event,msg){
			$scope.bigCurrentPage = msg;
		});
    };

})();


