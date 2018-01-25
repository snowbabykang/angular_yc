(function() {
  'use strict';
	angular.module('app', [])
	.controller('editorderController', editorderController)
	
	.controller('orderpaymainCtrl', orderpaymainCtrl)
	.controller('addOrderPayCtl', addOrderPayCtl)
	
	.controller('orderbillmainCtrl', orderbillmainCtrl)
	.controller('addOrderBillCtl', addOrderBillCtl);
	
	/*************** 订单信息 *********************/
	editorderController.$inject = ['$scope','$state','$stateParams','$uibModal','$http','modaltemp.service'];
    function editorderController($scope,$state,$stateParams,$uibModal,$http,$modaltemp) {
		$scope.typetitle = $state.current.data.title;
		$scope.currentordertype = $state.current.data.type;
		
		//获取各种下拉数据
		$scope.getserachdata = function(url,arr){
			$http.get(url).success(function(data){
				$scope[arr] = data;
			});
		}
		$scope.getserachdata('assets/js/data/orderstoredata.json','store_arr');
		$scope.getserachdata('assets/js/data/ordershopdata.json','seller_arr');
		$scope.getserachdata('assets/js/data/orderbusinessdata.json','business_arr');
		$scope.getserachdata('assets/js/data/orderexpressdata.json','express_arr');
		$scope.getserachdata('assets/js/data/ordertypedata.json','ordertype_arr');
		$scope.someGroupFn = function (item){
			return "<span class='ordershopname'>店铺名称</span><span class='ordershoptypename'>店铺类型</span>";
		};
		
		//保存订单基本信息
		$scope.save_editborderinfo = function(arr,seller){
			if(!arr.warehouseId || !arr.expressId || !arr.dealDate){return false;}
			if(!seller){
				alert("请选择店铺");
				return false;
			};
			console.log(seller);
			arr.shopId = seller.id;
			console.log(arr);
			//请求保存，编辑状态提供$scope.orderid
			if($state.current.data.type == 'edit'){
				
			}else{
				
			};
		};
		
		//编辑的订单id
		if($scope.currentordertype == 'edit'){
			$scope.orderid = $stateParams.id;
			//根据订单id获取订单的信息并填充
			$scope.orderinfolist = [];
		}else{
			$scope.orderinfolist = [];
		};
		
		//点击tab将订单的各个信息获取填充
		$scope.showeditorderinfo = function(tabtype){
			switch(tabtype){
				case 'info':
					// 初始进来就获取值，后面就不需要了
				break;
				case 'prd':
					//有值的话就不重新请求
					if($scope.currentordertype == 'add' || !$scope.orderprdlist){
						$scope.orderprdlist = [];
					}else if($scope.currentordertype == 'edit' && !$scope.orderprdlist){
						//后端请求获取列表
						$scope.orderprdlist = [];
					};
				break;
				case 'pay':
					//有值的话就不重新请求
					if($scope.currentordertype == 'add' || !$scope.orderpaylist){
						$scope.orderpaylist = [];
					}else if($scope.currentordertype == 'edit' && !$scope.orderpaylist){
						//后端请求获取列表
						$scope.orderpaylist = [];
					};
				break;
				case 'bill':
					//有值的话就不重新请求
					if($scope.currentordertype == 'add' && !$scope.orderbilllist){
						$scope.orderbilllist = [];
					}else if($scope.currentordertype == 'edit' && !$scope.orderbilllist){
						//后端请求获取列表
						$scope.orderbilllist = [];
					};
				break;
				case 'addr':
					//有值的话就不重新请求
					if($scope.currentordertype == 'add' && !$scope.orderaddrlist){
						$scope.orderaddrlist = [];
					}else if($scope.currentordertype == 'edit' && !$scope.orderaddrlist){
						//后端请求获取值
						$scope.orderaddrlist = [];
					};
					//选择地址三级联动
					if(!$scope.addrlist){
						$http.get('assets/js/data/selectaddr.json').success(function(data){
							$scope.addrlist = data;
						});
					};
				break;
			}
		};
		
		//保存订单收货信息
		$scope.save_editborderinfo = function(orderaddr){
			if(!orderaddr.receiverName || !orderaddr.receiverAddress || !orderaddr.vipRealName){return false;}
			console.log(orderaddr);
			//请求保存订单收货信息
			
		};
    };
	
	/*************** 订单支付明细 *********************/
	//订单支付明细的controller
	orderpaymainCtrl.$inject = ['$scope','$uibModal','$http','modaltemp.service'];
    function orderpaymainCtrl($scope,$uibModal,$http,$modaltemp) {
		if($scope.currentordertype == 'edit'){
			//根据订单id  $scope.orderid获取订单的支付明细
			//模拟两条数据
			$scope.orderpaylist = [{
				"Id" :1,
				"type" : 10010349,
				"price" :"111",
				"time" : "2016-8-2 12:00:00"
			},{
				"Id" :2,
				"type" : 10010350,
				"price" :"222",
				"time" : "2016-7-29 8:00:00"
			}];
		};
		//订单明细checkbox
		$scope.checkorderpay = function($event,item){
			$event.preventDefault();
			$event.stopPropagation();
			item.orderpaycheck = !item.orderpaycheck;
		};
		//点击表格tr选中checkbox
		$scope.checked_payids = [];
		$scope.selectorderpay = function($event,item){
			item.orderpaycheck = !item.orderpaycheck;
			if(item.orderpaycheck == true){
				$scope.checked_payids.push(item.Id);
			}else{
				for(var i=0;i<$scope.checked_payids.length;i++){
					if($scope.checked_payids[i] == item.Id){
						$scope.checked_payids.splice(i,1);
					}
				}
			};
			// console.log($scope.checked_payids);
		};
		//全选
		$scope.checkallorderpay = function(checkallpay){
			$scope.checked_payids = [];
			for(var i = 0; i < $scope.orderpaylist.length ; i++){
				if(checkallpay){
					$scope.orderpaylist[i].orderpaycheck = true;
					$scope.checked_payids.push($scope.orderpaylist[i].Id);
				}else{
					$scope.orderpaylist[i].orderpaycheck = false;
				};
			}
		};
		
		//请求订单类型
		$scope.pay_arr = new Object();
		$http.get('assets/js/data/orderpaytype.json').success(function(data){
			$scope.paytype_arr = data;
			for(var i in data){
				$scope.pay_arr[data[i].id] = data[i].name ;
			}
		});
		//新增订单支付明细
		$scope.add_orderpay = function(){
			$scope.item = {"type" : "add","paytype_arr" : $scope.paytype_arr};
			$uibModal.open({
				templateUrl: 'order/order1/editorder/orderpay_add.html',
				controller: 'addOrderPayCtl',
				resolve: {
					item: function () {
						return $scope.item;
					}
				}
			}).result.then(function (data) {
				data.Id = 1;
				$scope.orderpaylist.push(data);
				$modaltemp.alertinfo("添加成功");
			});
		};
		//编辑订单支付明细
		$scope.edit_orderpay = function(){
			if($scope.checked_payids && $scope.checked_payids.length == 1){
				$scope.item = {"type" : "edit", "orderpayid" : $scope.checked_payids[0],"paytype_arr" : $scope.paytype_arr};
				$uibModal.open({
					templateUrl: 'order/order1/editorder/orderpay_add.html',
					controller: 'addOrderPayCtl',
					resolve: {
						item: function () {
							return $scope.item;
						}
					}
				}).result.then(function (data) {
					$modaltemp.alertinfo("编辑成功");
				});
			}else{
				$modaltemp.alertinfo("请选择一个订单支付项");
				return false;
			};
		};
		//删除订单支付明细
		$scope.delete_orderpay = function(){
			if($scope.checked_payids && $scope.checked_payids.length > 0){
				$scope.item = {"type" : "delete", "orderpayid" : $scope.checked_payids};
				$uibModal.open({
					templateUrl: 'order/order1/editorder/orderpay_delete.html',
					controller: 'addOrderPayCtl',
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
				$modaltemp.alertinfo("请选择要删除的订单支付项");
				return false;
			};
		};
    };
	
	//新增编辑订单支付明细的controller
	addOrderPayCtl.$inject = ['$scope', '$uibModalInstance', 'item','$http'];
    function addOrderPayCtl($scope, $uibModalInstance,item,$http) {
		$scope.orderpaytype = item.type;
		$scope.paytype_arr = item.paytype_arr;
		if($scope.orderpaytype == "edit"){
			var id = item.orderpayid;
			//需要根据id获取信息赋值到orderpaydata
			
			
		}else if($scope.orderpaytype == "delete"){
			$scope.delpayids = item.orderpayid;
			//要删除的订单明细id数组$scope.delpayids
			
			
		};
		
		//新增编辑保存订单支付明细
		$scope.saveOrderPaydata = function(data,type){
			// console.log(type);
			// console.log(data);
			if(!data.type || !data.price || !data.time || !data.payid || !data.userid){return false;}
			//请求保存订单支付明细
			$uibModalInstance.close(data);
			
		};
		//删除订单支付明细
		$scope.savedeleteorderpay = function(){
			//请求删除订单明细操作
			
			$uibModalInstance.close();
			
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	};
	
	/*************** 订单发票信息 *********************/
	//订单发票信息的controller
	orderbillmainCtrl.$inject = ['$scope','$uibModal','$http','modaltemp.service'];
    function orderbillmainCtrl($scope,$uibModal,$http,$modaltemp) {
		//订单发票信息checkbox
		$scope.checkorderbill = function($event,item){
			$event.preventDefault();
			$event.stopPropagation();
			item.orderbillcheck = !item.orderbillcheck;
		};
		//点击表格tr选中checkbox
		$scope.checked_billids = [];
		$scope.selectorderbill = function($event,item){
			item.orderbillcheck = !item.orderbillcheck;
			if(item.orderbillcheck == true){
				$scope.checked_billids.push(item.Id);
			}else{
				for(var i=0;i<$scope.checked_billids.length;i++){
					if($scope.checked_billids[i] == item.Id){
						$scope.checked_billids.splice(i,1);
					}
				}
			};
			// console.log($scope.checked_billids);
		};
		//订单发票信息全选
		$scope.checkallorderbill = function(checkallbill){
			$scope.checked_billids = [];
			for(var i = 0; i < $scope.orderbilllist.length ; i++){
				if(checkallbill){
					$scope.orderbilllist[i].orderbillcheck = true;
					$scope.checked_billids.push($scope.orderbilllist[i].Id);
				}else{
					$scope.orderbilllist[i].orderbillcheck = false;
				};
			}
		};
		
		//请求订单类型
		$scope.bill_arr = new Object();
		$http.get('assets/js/data/orderbilltype.json').success(function(data){
			$scope.billtype_arr = data;
			for(var i in data){
				$scope.bill_arr[data[i].id] = data[i].name ;
			}
		});
		//新增订单发票信息
		$scope.add_orderbill = function(){
			$scope.item = {"type" : "add","billtype_arr" : $scope.billtype_arr};
			$uibModal.open({
				templateUrl: 'order/order1/editorder/orderbill_add.html',
				controller: 'addOrderBillCtl',
				resolve: {
					item: function () {
						return $scope.item;
					}
				}
			}).result.then(function (data) {
				data.Id = 1;
				$scope.orderbilllist.push(data);
				$modaltemp.alertinfo("添加成功");
			});
		};
		//编辑订单发票信息
		$scope.edit_orderbill = function(){
			if($scope.checked_billids && $scope.checked_billids.length == 1){
				$scope.item = {"type" : "edit", "orderbillid" : $scope.checked_billids[0],"billtype_arr" : $scope.billtype_arr};
				$uibModal.open({
					templateUrl: 'order/order1/editorder/orderbill_add.html',
					controller: 'addOrderBillCtl',
					resolve: {
						item: function () {
							return $scope.item;
						}
					}
				}).result.then(function (data) {
					$modaltemp.alertinfo("编辑成功");
				});
			}else{
				$modaltemp.alertinfo("请选择一个订单发票信息");
				return false;
			};
		};
		//删除订单发票信息
		$scope.delete_orderbill = function(){
			if($scope.checked_billids && $scope.checked_billids.length > 0){
				$scope.item = {"type" : "delete", "orderbillid" : $scope.checked_billids};
				$uibModal.open({
					templateUrl: 'order/order1/editorder/orderbill_delete.html',
					controller: 'addOrderBillCtl',
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
				$modaltemp.alertinfo("请选择要删除的发票信息");
				return false;
			};
		};
    };
	
	//新增编辑订单发票信息的controller
	addOrderBillCtl.$inject = ['$scope', '$uibModalInstance', 'item','$http'];
    function addOrderBillCtl($scope, $uibModalInstance,item,$http) {
		$scope.orderbilltype = item.type;
		$scope.billtype_arr = item.billtype_arr;
		if($scope.orderbilltype == "edit"){
			var id = item.orderbillid;
			//需要根据id获取信息赋值到orderbilldata
			/* $scope.orderbilldata = {
				type : {
					"id": "10010353",
					"code": "002",
					"name": "增值税",
					"del": false,
					"note": ""
				},
				title : "1",
			}; */
			
		}else if($scope.orderbilltype == "delete"){
			$scope.delbillids = item.orderbillid;
			//要删除的订单发票信息id数组$scope.delbillids
			
			
		};
		
		//新增编辑保存订单发票信息
		$scope.saveOrderbilldata = function(data,type){
			// console.log(type);
			console.log(data);
			if(!data.type){return false;}
			//请求保存订单发票信息
			$uibModalInstance.close(data);
			
		};
		//删除订单发票信息
		$scope.savedeleteorderbill = function(){
			//请求删除发票信息操作
			
			$uibModalInstance.close();
			
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	};
	
})();


