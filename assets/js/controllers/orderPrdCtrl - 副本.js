(function() {
  'use strict';
	angular.module('app', [])
	.controller('orderprdmainCtrl', orderprdmainCtrl)
	.controller('selectOrderPrdCtl', selectOrderPrdCtl)
	.controller('operateOrderPrdCtl', operateOrderPrdCtl)
	.controller('selectprdpageCtrl', selectprdpageCtrl);
	
	/*************** 订单商品信息 *********************/
	//订单商品信息的controller
	orderprdmainCtrl.$inject = ['$scope','$uibModal','$http','modaltemp.service'];
    function orderprdmainCtrl($scope,$uibModal,$http,$modaltemp) {
		//订单商品信息checkbox
		$scope.checkorderprd = function($event,item){
			$event.preventDefault();
			$event.stopPropagation();
			item.orderprdcheck = !item.orderprdcheck;
		};
		//点击表格tr选中checkbox
		$scope.checked_prdids = [];
		$scope.selectorderprd = function($event,item){
			item.orderprdcheck = !item.orderprdcheck;
			if(item.orderprdcheck == true){
				$scope.checked_prdids.push(item.id);
			}else{
				for(var i=0;i<$scope.checked_prdids.length;i++){
					if($scope.checked_prdids[i] == item.id){
						$scope.checked_prdids.splice(i,1);
					}
				}
			};
		};
		//订单商品信息全选
		$scope.checkallorderprd = function(checkallprd){
			$scope.checked_prdids = [];
			for(var i = 0; i < $scope.orderprdlist.length ; i++){
				if(checkallprd){
					$scope.orderprdlist[i].orderprdcheck = true;
					$scope.checked_prdids.push($scope.orderprdlist[i].id);
				}else{
					$scope.orderprdlist[i].orderprdcheck = false;
				};
			}
		};

		//新增订单商品信息
		$scope.add_orderprd = function(){
			$scope.item = {"type" : "add"};
			$uibModal.open({
				templateUrl: 'order/order1/editorder/orderprd_add.html',
				controller: 'selectOrderPrdCtl',
				size : "lg",
				resolve: {
					item: function () {
						return $scope.item;
					}
				}
			}).result.then(function (data) {
				$scope.orderprdlist = $scope.orderprdlist.concat(data);
				$modaltemp.alertinfo("添加成功");
			});
		};
		//接收继续添加商品信息
		$scope.$on("addprds",function (event, data) {
			console.log(data);
			$scope.orderprdlist = $scope.orderprdlist.concat(data);
		});
		
		//编辑订单商品信息
		$scope.edit_orderprd = function(data){
			$scope.item = {"type" : "edit", "orderprddata" : data};
			$uibModal.open({
				templateUrl: 'order/order1/editorder/orderprd_add.html',
				controller: 'selectOrderPrdCtl',
				size : "lg",
				resolve: {
					item: function () {
						return $scope.item;
					}
				}
			}).result.then(function (data) {
				$modaltemp.alertinfo("编辑成功");
			});
	
		};
		//删除订单商品信息
		$scope.delete_orderprd = function(id){
			if(($scope.checked_prdids && $scope.checked_prdids.length > 0) || id){
				var delid = id ? id : $scope.checked_prdids;
				$scope.item = {"type" : "delete", "orderprdid" : delid};
				$uibModal.open({
					templateUrl: 'order/order1/editorder/orderprd_delete.html',
					controller: 'operateOrderPrdCtl',
					size:"sm",
					resolve: {
						item: function () {
							return $scope.item;
						}
					},
				}).result.then(function () {
					$modaltemp.alertinfo("删除成功");
				});
			}else{
				$modaltemp.alertinfo("请选择要删除的商品");
				return false;
			};
		};
		
		//导入商品
		$scope.import_orderprd = function(){
			$scope.item = {"type" : "import"};
			$uibModal.open({
				templateUrl: 'order/order1/editorder/orderprd_import.html',
				controller: 'operateOrderPrdCtl',
				resolve: {
					item: function () {
						return $scope.item;
					}
				},
			}).result.then(function () {
				$modaltemp.alertinfo("导入成功");
			});
			
		};
    };
	
	//选择商品的controller
	selectOrderPrdCtl.$inject = ['$scope', '$uibModalInstance', 'item','$http','modaltemp.service'];
    function selectOrderPrdCtl($scope, $uibModalInstance,item,$http,$modaltemp) {
		$scope.orderprdtype = item.type;
		$scope.attrIndexOf = function(target, list, attr) {
			var i = 0, l = list.length;
			for (i = 0; i < l; i += 1) {
				if (list[i][attr] == target) {
					return i;
				}
			};
			return -1;
		};
		$scope.removeItem = function(ObjArr,id,ele) {
			var pos = $scope.attrIndexOf(id, ObjArr,ele);
			if (pos !== -1) {
				ObjArr.splice(pos, 1);
			};
		};
		//点击checkbox
		$scope.selectprdToOrder = function($event,item){
			$event.preventDefault();
			$event.stopPropagation();
			item.selectprd = !item.selectprd;
		};
		$scope.selectprdarr = [];
		//获取商品的存储信息，并选择商品
		$scope.showprdstore = function(item){
			var id = item.id;
			item.selectprd = !item.selectprd;
			if(item.selectprd == true){
				$scope.selectprdarr.push(item);
			}else{
				$scope.removeItem($scope.selectprdarr,id, 'id');
			};
			$http.get('assets/js/data/prdstorelist.json').success(function (data) {
				// console.log(data);
				$scope.prdQtylist = data;
			});
		};
		
		//全选
		$scope.selectallprds = function(selectallprd){
			$scope.selectprdarr = [];
			for(var i = 0; i < $scope.selectprdlist.length ; i++){
				if(selectallprd){
					$scope.selectprdlist[i].selectprd = true;
					$scope.selectprdarr.push($scope.selectprdlist[i]);
				}else{
					$scope.selectprdlist[i].selectprd = false;
				};
			}
		};
		
		if($scope.orderprdtype == "edit"){
			$scope.orderprddata = item.orderprddata;
			
			
		};
		
		//选择商品信息
		$scope.confirmAddPrdData = function(type){
			var flag = 1;
			for(var i = 0; i < $scope.selectprdarr.length ; i++){
				var quantity = $scope.selectprdarr[i].quantity;
				var reg = /^[1-9][\d]*$/;
				if(!quantity || !reg.test(quantity)) flag = 0;
			}
			if(flag){
				if(type == 1){  //1：添加   2：继续添加
					$uibModalInstance.close($scope.selectprdarr);  
				}else{
					console.log($scope.selectprdarr);
					$scope.$emit("addprds", $scope.selectprdarr);
					//$scope.orderprdlist.push($scope.selectprdarr);
				}
			}else{
				$modaltemp.alertinfo("请填写正确的商品数量");
				return false;
			};
		};
		//填写商品数量时不选中当前项
		$scope.editprdQty = function($event){
			$event.preventDefault();
			$event.stopPropagation();
		};
		//搜索商品
		$scope.search_orderprd = function(){
			//根据搜索条件和当前分类id请求商品列表
			if(!$scope.classfiyid){
				$modaltemp.alertinfo("请点击左侧分类获取商品");
				return false;
			};
			if(!$scope.prdsearch){
				$modaltemp.alertinfo("请输入搜索条件");
				return false;
			};
			$scope.prdpageChanged(1,$scope.classfiyid,$scope.prdsearch);
		};
		//重置搜索条件
		$scope.reset_orderprd = function(){
			$scope.prdsearch.likeCode = "";
			$scope.prdsearch.name = "";
			$scope.prdsearch.skuCode = "";
			$scope.prdsearch.sName = "";
			//重置搜索条件是否要重新获取列表？
			$scope.prdpageChanged(1,$scope.classfiyid);
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
    };
	
	//订单商品信息的controller
	operateOrderPrdCtl.$inject = ['$scope', '$uibModalInstance', 'item','$http','modaltemp.service'];
    function operateOrderPrdCtl($scope, $uibModalInstance,item,$http,$modaltemp) {
		$scope.orderprdtype = item.type;
		
		if($scope.orderprdtype == "delete"){
			$scope.delprdids = item.orderprdid;
			//要删除的订单商品id数组$scope.delprdids
			
		};
		
		//删除订单商品信息
		$scope.savedeleteorderprd = function(){
			//请求删除商品信息操作
			
			$uibModalInstance.close();
		};
		//导入商品
		$scope.confirm_importprd = function(){
			//请求导入商品列表操作
			
			$uibModalInstance.close();
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
    };
	
	//商品列表分页
	selectprdpageCtrl.$inject = ['$scope'];
    function selectprdpageCtrl($scope) {
		
	};
})();


