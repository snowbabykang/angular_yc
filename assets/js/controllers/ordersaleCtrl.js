(function() {
  'use strict';
	angular.module('app',[])
    .controller('ordermainCtrl', ordermainCtrl)
    .controller('deleteOrderCtl', deleteOrderCtl)
    .controller('importExcelCtl', importExcelCtl)
	.controller('ordermainpageCtrl', ordermainpageCtrl);
	
    ordermainCtrl.$inject = ['$scope','$state', '$uibModal','modaltemp.service','$http','ordersearchService','getorderlist','$localStorage'];
    function ordermainCtrl($scope,$state, $uibModal,$modaltemp,$http ,ordersearchService,getorderlist,$localStorage) {
		$scope.lang = 'zh-cn';
		// 筛选查询块 ----S------
		$scope.getserachdata = function(url,arr){
			$http.get(url).success(function(data){
				$scope[arr] = data;
			});
		}
		$scope.ordertype = ordersearchService.ordertype;
		$scope.getserachdata('assets/js/data/orderstoredata.json','store_arr');
		$scope.getserachdata('assets/js/data/ordershopdata.json','seller_arr');
		$scope.outordertype = ordersearchService.outordertype;
		$scope.getordertype = ordersearchService.getordertype();
		$scope.someGroupFn = function (item){
				return "<span class='ordershopname'>店铺名称</span><span class='ordershoptypename'>店铺类型</span>";
		};
		$scope.searchorderlist = function(seller){
			//店铺名称使用ui.select下拉，获取为seller
			console.log(seller);
			console.log($scope.ordersearch);
			//请求筛选列表改变 
			//$scope.pageChanged(3);
			
		};
		// 筛选查询块 ----E------
		
		//展示订单列表grid
		var tbtype = "orderlist";
		$scope.$storage = $localStorage;
		$scope.$storage.tablewidtharr = $scope.$storage.tablewidtharr || {};
		$scope.$storage.tablewidtharr.orderlist = $scope.$storage.tablewidtharr.orderlist || { 
			"codeid": 60, 
			"opt": 100, 
			"Id": 80, 
			"TotalValue": 80, 
			"SourceOrderCode": 120, 
			"OrderCode": 120, 
			"PrimaryWayBillCode": 120 ,
			"PayNumber": 120 ,
			"Status": 120 ,
			"CompanyCode": 120 ,
			"ShipToAddress1": 200 ,
			"ErrorCode": 200 ,
			"AisMessage": 200 ,
		};
		// 分页
		$scope.pagenum_arr = [10,20,50];
		$scope.$storage.pagenumArr = $scope.$storage.pagenumArr || {};
		$scope.$storage.pagenumArr.orderlist = $scope.$storage.pagenumArr.orderlist || 10;
		

		$scope.gridOptions1 = {
    columnDefs: [
      { field: 'name' },
      { field: 'gender' },
      { field: 'company', enableSorting: false }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.grid1Api = gridApi;
    }
  };
  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions1.data = data;
    });
    


		$scope.orderoptions = { 
			enableSorting: true,
			enableRowSelection: true,  //可选择
			enableRowHeaderSelection: true,
			//enableFullRowSelection: true,
			enablePaginationControls: false,
			paginationPageSize: $scope.$storage.pagenumArr.orderlist,
			rowTemplate: '<div ng-click="grid.appScope.selectedrow(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" '
			+'ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" '
			+' ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div>',
		};
		$scope.cellTemplate = '<div class="ui-grid-cell-contents optbtn">'
		+'<a class="text-info m-r-sm" title="查看订单详情" ng-click="grid.appScope.showorderdetail(grid,row)"><i class="fa fa-eye"></i></a>'
		+'<a class="text-info m-r-sm" title="编辑订单" ng-click="grid.appScope.editorder(grid.getCellValue(row, col))"><i class="fa fa-edit"></i></a>'
		+'<a class="text-info" title="删除订单" ng-click="grid.appScope.delcurrentorder(grid.getCellValue(row, col))"><i class="fa fa-trash-o"></i></a>'
		+'</div>';

		var headCelltpl = '<div ng-class="{ \'sortable\': sortable }">' +
	      '<div class="ui-grid-vertical-bar">&nbsp;</div>' +
	      '<div class="ui-grid-cell-contents" col-index="renderIndex">' + '编号bianhao' +
	      '<span ui-grid-visible="col.sort.direction" ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }">' +
	      '&nbsp;' +
	      '</span>' +
	      '</div>' +
	      '<div class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" class="ui-grid-column-menu-button" ng-click="toggleMenu($event)">' +
	      '<i class="ui-grid-icon-angle-down">&nbsp;</i>' +
	      '</div>' +
	      '<div ui-grid-filter></div>'
	      '</div>' +
	      '</div>'
		$scope.orderoptions.columnDefs = [
			{ displayName: '编号', name : "index",width: $scope.$storage.tablewidtharr[tbtype]['codeid'],headerCellTemplate:headCelltpl },
			{ displayName: '操作',name : "opt",width: $scope.$storage.tablewidtharr[tbtype]['opt'],
			 cellTemplate:$scope.cellTemplate},
			{ displayName: 'id', name : "Id",width: $scope.$storage.tablewidtharr[tbtype]['Id'],
			cellTemplate:'<div class="ui-grid-cell-contents"><span>{{row.uid}}</span></div>'},
			{ displayName: '来源订单号', name : "SourceOrderCode",width: $scope.$storage.tablewidtharr[tbtype]['SourceOrderCode']},
			{ displayName: '订单总金额', name : "TotalValue",width: $scope.$storage.tablewidtharr[tbtype]['TotalValue'],
			sortingAlgorithm: function(a, b, rowA, rowB, direction) {
			   a = parseFloat(a);
			   b = parseFloat(b);
				if(a > b){
					return 1; 
				}else{
					return -1;
				}
			}},
			{ displayName: '出库单编码', name : "OrderCode",width: $scope.$storage.tablewidtharr[tbtype]['OrderCode']},
			{ displayName: '运单号', name : "PrimaryWayBillCode",width: $scope.$storage.tablewidtharr[tbtype]['PrimaryWayBillCode']},
			{ displayName: '支付流水号', name : "PayNumber",width: $scope.$storage.tablewidtharr[tbtype]['PayNumber']},
			{ displayName: '状态', name : "Status",width: $scope.$storage.tablewidtharr[tbtype]['Status'],
			cellTemplate : '<div class="ui-grid-cell-contents" ng-style="{\'background\': grid.appScope.bgcolor(row)}">{{grid.appScope.getordertype[grid.getCellValue(row, col)]}}</div>'},
			{ displayName: '货主编码',name : "CompanyCode", width: $scope.$storage.tablewidtharr[tbtype]['CompanyCode']},
			{ displayName: '详细地址',name : "ShipToAddress1", width: $scope.$storage.tablewidtharr[tbtype]['ShipToAddress1']},
			{ displayName: '异常原因',name : "ErrorCode", width: $scope.$storage.tablewidtharr[tbtype]['ErrorCode']},
			{ displayName: '错误原因',name : "AisMessage",width: $scope.$storage.tablewidtharr[tbtype]['AisMessage']}
		];
		$scope.orderoptions.onRegisterApi = function(gridApi){
			$scope.gridApi = gridApi;
			gridApi.colResizable.on.columnSizeChanged($scope,function(colDef, deltaChange){
			  var name = colDef.name;
			  colDef.width += deltaChange;
			  if(colDef.width < 0){
				  colDef.width = 40;
			  }
			  $scope.$storage.tablewidtharr[tbtype][name] = colDef.width;
			});
			gridApi.selection.on.rowSelectionChanged($scope,function(row){
			   if(row.isSelected){
				   $scope.current_orderid = row.entity.Id;  //当前订单id
				   $scope.showorderinfo($scope.currenttab);
			   }
			});
			$scope.selectedrow = function(row) {
			   gridApi.selection.toggleRowSelection(row.entity);
			}
		};
		
		$scope.currenttab = 'base';    //默认第一项基础信息
		//展示订单详情
		$scope.showorderdetail = function(grid,row){
			console.log(grid);
			console.log(row); //当前行的内容数组
			console.log(row.entity);
			$scope.current_orderid = row.entity.Id;  //当前订单id
			$scope.showorderinfo($scope.currenttab);
		}
		$scope.bgcolor = function(row){
			return row.entity.color;
		}
		
		//初始加载第一页
		//翻页
		$scope.pageChanged = function(page,pagenum){
			$scope.checked_orderids = []; 
			getorderlist(page).then(function(data){
				$scope.bigTotalItems = data.bigTotalItems;
				//$scope.$storage.pagenumArr.orderlist = data.pagesize;
				$scope.bigCurrentPage = page;
				//$scope.orderlist = data.result;
				var msg = data.result;
				msg.forEach(function (item,i) {
				   item.index = i+1;
				});
				console.log(msg);
				$scope.orderoptions.data = msg;
				// console.log($scope.orderlist);
			});
		};
		$scope.pageChanged(1,$scope.$storage.pagenumArr.orderlist);
		
		//给表格设置高
		$scope.ordertablenum = {"10" : "300","20" : "400","50" : "600"};
		$scope.newHeight = $scope.ordertablenum[$scope.$storage.pagenumArr.orderlist];
		//分页
		$scope.changePageNum = function(){
			$scope.pageChanged(1,$scope.$storage.pagenumArr.orderlist);  
			$scope.newHeight = $scope.ordertablenum[$scope.$storage.pagenumArr.orderlist];
			$scope.orderoptions.paginationPageSize = $scope.$storage.pagenumArr.orderlist;
		};
		
		//收缩搜索模块
		$scope.searchslideicon = 'fa-caret-up';
		$scope.slidesearchbox = function(){
			$scope.searchslide = !$scope.searchslide ? 'slideup' : '';
			$scope.searchslideicon = $scope.searchslideicon == 'fa-caret-up' ? 'fa-caret-down' : 'fa-caret-up';
		}
		//收缩订单明细模块
		$scope.detailslideicon = 'fa-caret-down';
		$scope.slidedetailinfobox = function(){
			if($scope.current_orderid){
				$scope.detailslide = !$scope.detailslide ? 'slideup' : '';
				$scope.detailslideicon = $scope.detailslideicon == 'fa-caret-up' ? 'fa-caret-down' : 'fa-caret-up';
			};
		}
		
		//获取选中的订单id数组$scope.checked_orderids
		$scope.getidsarr = function(){
			var Rows = $scope.gridApi.selection.getSelectedRows();
			if(Rows.length > 0){
				var arr = [];
				for(var i in Rows){
					arr.push(Rows[i].Id);
				}
				return arr;
			}else{
				$modaltemp.alertinfo("请选择订单");
				return false;
			}
		}
		//编辑当前订单
		$scope.editorder = function(id){
			$state.go('app.order.order1.editorder', {id: id});
		}
		//删除当前订单
		$scope.delcurrentorder = function(id){
			$uibModal.open({
				templateUrl: 'order/order1/deleteorder.html',
				controller: 'deleteOrderCtl',
				size:"sm",
				resolve: {
					orderids: function () {
						return id;
					}
				},
			}).result.then(function (data) {
				$modaltemp.alertinfo("删除成功");
			});
		}
		//删除订单
		$scope.deleteorder = function(){
			$scope.checked_orderids = $scope.getidsarr();  //获取选中的订单
			if($scope.checked_orderids){
				$uibModal.open({
					templateUrl: 'order/order1/deleteorder.html',
					controller: 'deleteOrderCtl',
					size:"sm",
					resolve: {
						orderids: function () {
							return $scope.checked_orderids;
						}
					},
				}).result.then(function (data) {
					$modaltemp.alertinfo("删除成功");
				});
			}
		};
		
		//导入excel
		$scope.importexcel = function(){
			$uibModal.open({
				templateUrl: 'order/order1/importexcel.html',
				controller: 'importExcelCtl'
			}).result.then(function (data) {
				$modaltemp.alertinfo("导入成功");
			});
		};
		//打印订单 (如果只打印一个，可以加操作按钮)
		$scope.printorder = function(){
			$scope.checked_orderids = $scope.getidsarr();  //获取选中的订单
			if($scope.checked_orderids && $scope.checked_orderids.length == 1){
				$state.go('app.order.order1.printorder', {id: $scope.checked_orderids[0]});
			}else{
				$modaltemp.alertinfo("请选择一个订单项打印");
				return false;
			}
		}
		
		//展示订单信息
		$scope.showorderinfo = function(type){
			$scope.currenttab = type;
			if(!$scope.current_orderid){
				alert("请点击订单查看");
				return false;
			};
			switch(type){
				case 'base':
					$http.get('assets/js/data/orderbaseinfo.json').success(function(data){
						$scope.orderbasearr = data;
					});
				break;
				case 'user':
					
				break;
				case 'detail':
					$scope.orderdetailpage = function(page){
						$http.get('assets/js/data/orderdetail.json').success(function(data){
							$scope.orderdetailarr = data.rows;
							$scope.orderTotalItems = data.total;
							$scope.orderpagesize = data.numPerPage;
							$scope.currentPage = data.currentPage;
						});
					};
					$scope.orderdetailpage(1);
				break;
			}
			
		};
    };
	
	//删除订单的controller
	deleteOrderCtl.$inject = ['$scope', '$uibModalInstance','orderids', '$http'];
    function deleteOrderCtl($scope, $uibModalInstance,orderids,$http) {
		$scope.savedeleteorder = function(){
			console.log(orderids); 
			//请求删除订单方法，要删除的订单id是orderids
			$uibModalInstance.close();
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	};
	
	//导入订单excel的controller
	importExcelCtl.$inject = ['$scope', '$uibModalInstance', '$http','fileUpload','modaltemp.service'];
    function importExcelCtl($scope, $uibModalInstance,$http,fileUpload,$modaltemp) {
		//这个是直接找的上传文件的方法，前端没法验证，不确定实用性如何
		$scope.confirm_importorder = function(){
			//请求导入订单列表操作
			var file1 = $scope.myorderinfoFile;
			var file2 = $scope.myorderdetailFile;
			console.log('myorderinfoFile is ' );
			console.dir(file1);
			console.log('myorderdetailFile is ' );
			console.dir(file2);
			if(!file1 || !file2){
				$modaltemp.alertinfo("请上传要导入的文件");
				return false;
			}
			var uploadUrl = "/fileUpload";
			fileUpload.uploadFileToUrl(file1, uploadUrl);
			fileUpload.uploadFileToUrl(file2, uploadUrl);
			$uibModalInstance.close();
		};
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	};
	
	ordermainpageCtrl.$inject = ['$scope'];
    function ordermainpageCtrl($scope) {
		
	};
		
})();


