(function() {
  'use strict';
  angular
    .module('app')
    .controller('ModalInstanceCtl', ModalInstanceCtl)
    .controller('ModalCtl', ModalCtl)
    .controller('departpageCtrl', departpageCtrl);
	
    ModalInstanceCtl.$inject = ['$scope', '$uibModalInstance', 'item'];
    function ModalInstanceCtl($scope, $uibModalInstance,item) {
		var type = item.type,id = item.id,treeid = item.tree;
		//获取当前节点的信息
		var treeObj = $.fn.zTree.getZTreeObj(treeid);
		if(type == "add" || type == "update"){
			var node = treeObj.getNodeByParam("id", id, null);
		}
		//保存增加节点
		$scope.saveAddNode = function(name,iphone,city,title){
			if(!name || !iphone || !city){return false;}
			title = title ? title : "";
			var mydate = new Date(),currentid = 0;
			//var nodes = treeObj.getNodes();
			var newNode = {
				"id": currentid,  //后端自增
				"pId": id,
				"name": name,
				"title": title,
				"ptitle": node.name,
				"creattime" : mydate.toLocaleString(),  //后端计算
				"iphone" : iphone,
				"city" : city
			}
			//增加节点
			treeObj.addNodes(node, newNode);
			$uibModalInstance.close();
			//$uibModalInstance.dismiss('cancel');
		};
		//给要修改节点附上原本的值
		if(type == "update"){
			$scope.updatename = node.name;
			$scope.updatephone = node.iphone;
			$scope.updatecity = node.city;
			$scope.updatetitle = node.title;
		};
		//确认修改节点
		$scope.saveupdateNode = function(name,iphone,city,title){
			if(!name || !iphone || !city){return false;}
			title = title ? title : "";
			node.name = name;
			node.iphone = iphone;
			node.city = city;
			node.title = title;
			//修改节点
			treeObj.editName(node);
			//返回方法重新加载列表
			$uibModalInstance.close();
		};
		
		//给删除节点弹层赋一些值
		if(type == "delete"){
			$scope.alertinfo = item.info;
		};
		//确认删除节点
		$scope.savedeleteNode = function(){
			for(var i=0;i < id.length;i++){
				var node = treeObj.getNodeByParam("id", id[i], null);
				if(id[i] == 0){
					alert(node.name+"不能删除");
					return false;
				}else{
					treeObj.removeNode(node,true);
				}
			};
			//传值重新加载列表
			$uibModalInstance.close();
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
    }
	departpageCtrl.$inject = ['$scope'];
    function departpageCtrl($scope) {
		$scope.$on("Ctr1NameChangeFromParrent",function (event, page) {
			$scope.bigCurrentPage = page;
		});
	};
    ModalCtl.$inject = ['$scope', '$uibModal', '$log','modaltemp.service','gettreeData'];
    function ModalCtl($scope, $uibModal, $log , $modaltemp,gettreeData) {
		//$scope.info = "";
		//操作完成后重新加载列表
		$scope.refreshinfo = function(){
			var pid = $scope.id;
			var cnode = $scope.treeObj.getNodesByParam("pId",pid, null);
			var pnode = $scope.treeObj.getNodeByParam("id", pid, null);
			return gettreeData.getnodearr(pnode,cnode,pid);
		};
		$scope.setpage = function(page){
			$scope.$broadcast("Ctr1NameChangeFromParrent", page);
		}
		
		$scope.treecheck = false;
		// 新增节点
		$scope.open = function (id) {
			$scope.item = {"id" : $scope.id, "type" : "add", "tree" : $scope.treeId};
			var modaladd = $uibModal.open({
				templateUrl: 'config/setmanage/addNodes.html',
				controller: 'ModalInstanceCtl',
				resolve: {
					item: function () {
						return $scope.item;
					}
				}
			});
			modaladd.result.then(function () {
				//$scope.info = $scope.refreshinfo();
				$modaltemp.alertinfo("添加成功");
			});
		};
		//检查所选元素
		$scope.checked_nodeids = [];
		$scope.checkNode = function(treecheck,id){
			if(treecheck == true){
				$scope.checked_nodeids.push(id);
			}else{
				for(var i=0;i<$scope.checked_nodeids.length;i++){
					if($scope.checked_nodeids[i] == id){
						$scope.checked_nodeids.splice(i,1);
					}
				}
			};
		};
		
	    // 修改节点
	    $scope.update = function (){
			if($scope.checked_nodeids.length !== 1){
				alert("请选择一个修改元素");
				return false;
			}else{
				$scope.optstatus = "update";
				$scope.item = {"id" : $scope.checked_nodeids[0], "type" : "update", "tree" : $scope.treeId};
				var modalInstance = $uibModal.open({
					templateUrl: 'config/setmanage/updateNodes.html',
					controller: 'ModalInstanceCtl',
					resolve: {
						item: function () {
							return $scope.item;
						}
					}
				});
				modalInstance.result.then(function () {
					//$scope.info = $scope.refreshinfo();
					$scope.checked_nodeids = [];
					$modaltemp.alertinfo("修改成功");
				});
			}
		};
		
		// 删除节点
	    $scope.delete = function (){
			if($scope.checked_nodeids.length < 1){
				alert("请选择元素删除");
				return false;
			}else{
				var ispnode = false;   //判断删除的是否有父节点
				for(var i=0;i<$scope.checked_nodeids.length;i++){
					var id = $scope.checked_nodeids[i];
					if($scope.id == id){
						ispnode = true ;
					}
				};
				if(ispnode){
					var info = "你要删除的包括"+$scope.title+",删除后其下所属均会被删除";
					var pnode = $scope.treeObj.getNodeByParam("id", $scope.id, null);
					var loadid = pnode.pId;              //要加载节点
				}else{
					var info = "";
					var loadid = $scope.id;
				}
				$scope.item = {"id" : $scope.checked_nodeids, "type" : "delete", "tree" : $scope.treeId , "info" : info};
				var modalDelete = $uibModal.open({
					templateUrl: 'config/setmanage/deleteNodes.html',
					controller: 'ModalInstanceCtl',
					size : 'sm',
					resolve: {
						item: function () {
							return $scope.item;
						}
					}
				});
				modalDelete.result.then(function () {
					//完成后树的操作，列表重新赋值
					/* var cnode = $scope.treeObj.getNodesByParam("pId",loadid, null);
					var pnode = $scope.treeObj.getNodeByParam("id", loadid, null);
					$scope.treeObj.selectNode(pnode);
					$scope.info = $scope.getnodearr(pnode,cnode,loadid);
					$scope.id = loadid;     
					$scope.title = pnode.name;     */
					$scope.checked_nodeids = [];
					$modaltemp.alertinfo("删除成功");
				});
			}
		};
		//查询
		$scope.search = function(){
			$scope.optstatus = "search";
			var id = $scope.id;
			var cnode = $scope.treeObj.getNodesByParam("pId",id, null);
			var pnode = $scope.treeObj.getNodeByParam("id", id, null);
			var info = gettreeData.getnodearr(pnode,cnode,id);
			$scope.setinfo(info);
		}
		
		//刷新列表
		$scope.refresh = function(){
			var id = $scope.id;
			var cnode = $scope.treeObj.getNodesByParam("pId",id, null);
			var pnode = $scope.treeObj.getNodeByParam("id", id, null);
			$scope.treeObj.selectNode(pnode);
			$scope.info = gettreeData.getnodearr(pnode,cnode,id);
		};
    }

})();


