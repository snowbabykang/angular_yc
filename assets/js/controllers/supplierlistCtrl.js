(function() {
  'use strict';
	angular.module('app',[])
    .controller('supplierlistCtrl', supplierlistCtrl)
    .controller('updateSupplierCtrl', updateSupplierCtrl)
	.controller('supplierlistpageCtrl', supplierlistpageCtrl);
	
    supplierlistCtrl.$inject = ['$scope','$state', '$uibModal','modaltemp.service','$http'];
    function supplierlistCtrl($scope,$state, $uibModal,$modaltemp,$http) {
		
		//初始加载第一页
		//翻页
		$scope.pageChanged = function(page,s_supplier){
			$scope.checked_supplierids = []; 
			$http.get('assets/js/data/supplierdata.json').success(function(data){
				$scope.bigTotalItems = data.total;
				$scope.pagesize = data.numPerPage;
				$scope.bigCurrentPage = data.currentPage;
				$scope.supplierlist = data.rows;
			});
		};
		$scope.pageChanged(1);
		
		//搜索供应商
		$scope.search_supplier = function(s_supplier){
			if(!s_supplier){
				$modaltemp.alertinfo("请输入筛选条件");
				return false;
			};
			//请求列表数据
			$scope.pageChanged(1,s_supplier);
		};
		
		//全选
		$scope.checkallsupplier = function(checkall){
			$scope.checked_supplierids = [];
			console.log(checkall);
			for(var i = 0; i < $scope.supplierlist.length ; i++){
				if(checkall){
					$scope.supplierlist[i].suppliercheck = true;
					$scope.checked_supplierids.push($scope.supplierlist[i].id);
				}else{
					$scope.supplierlist[i].suppliercheck = false;
				};
			};
		};
		
		$scope.checksupplier = function($event,item){
			$event.preventDefault();
			$event.stopPropagation();
			item.suppliercheck = !item.suppliercheck;
		};
		
		$scope.showsupplierdetail = function($event,item){
			item.suppliercheck = !item.suppliercheck;
			if(item.suppliercheck == true){
				$scope.checked_supplierids.push(item.id);
			}else{
				for(var i=0;i<$scope.checked_supplierids.length;i++){
					if($scope.checked_supplierids[i] == item.id){
						$scope.checked_supplierids.splice(i,1);
					}
				}
			};
		};
		
		//新增供应商
		$scope.add_supplier = function(){
			$scope.item = {"type" : "add"};
			$uibModal.open({
				templateUrl: 'order/order1/supplier/update_supplier.html',
				controller: 'updateSupplierCtrl',
				resolve: {
					item: function () {
						return $scope.item;
					}
				},
			}).result.then(function (data) {
				$scope.supplierlist.push(data);
				$modaltemp.alertinfo("新增供应商成功");
			});
		};

		//编辑供应商
		$scope.edit_supplier = function(){
			$scope.item = {"type" : "edit", "supplier_ids" : $scope.checked_supplierids[0]};
			if($scope.checked_supplierids && $scope.checked_supplierids.length == 1){
				$uibModal.open({
					templateUrl: 'order/order1/supplier/update_supplier.html',
					controller: 'updateSupplierCtrl',
					resolve: {
						item: function () {
							return $scope.item;
						}
					},
				}).result.then(function () {
					$modaltemp.alertinfo("编辑供应商成功");
				});
			}else{
				$modaltemp.alertinfo("请选择一个供应商");
				return false;
			};
		};
		
		//删除供应商
		$scope.delete_supplier = function(){
			$scope.item = {"type" : "delete", "supplier_ids" : $scope.checked_supplierids};
			if($scope.checked_supplierids && $scope.checked_supplierids.length > 0){
				$uibModal.open({
					templateUrl: 'order/order1/supplier/delete_supplier.html',
					controller: 'updateSupplierCtrl',
					size:"sm",
					resolve: {
						item: function () {
							return $scope.item;
						}
					},
				}).result.then(function (data) {
					$modaltemp.alertinfo("删除成功");
				});
			}else{
				$modaltemp.alertinfo("请选择要删除的供应商");
				return false;
			};
		};
    };
	
	//新增编辑删除供应商的controller
	updateSupplierCtrl.$inject = ['$scope', '$uibModalInstance','item', '$http'];
    function updateSupplierCtrl($scope, $uibModalInstance,item,$http) {
		$scope.suppliertype = item.type;
		if(item.type == "edit" || item.type == "delete"){
			$scope.current_supplierid = item.supplier_ids;  
		};
		//保存新增编辑供应商的方法
		$scope.saveSupplierdata = function(supplier,type){
			//编辑的供应商id   $scope.current_supplierid
			if(!supplier || !supplier.code || !supplier.name || !supplier.color || !supplier.status){
				return false;
			};
			//请求保存数据
			
			$uibModalInstance.close(supplier);
		}
		//保存删除供应商方法
		$scope.savedeletesupplier = function(){
			//请求保存数据
			//删除的供应商id数组   $scope.current_supplierid
			
			
			$uibModalInstance.close();
		}
		
		
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	};
	
	//供应商列表反应
	supplierlistpageCtrl.$inject = ['$scope'];
    function supplierlistpageCtrl($scope) {
		
	};
		
})();


