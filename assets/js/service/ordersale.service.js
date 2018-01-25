angular.module('app', [])
.factory("ordersearchService", function($http){
	var ordertype = [
		{value : 100,text : "订单池",},
		{value : 200,text : "财务已审核",},
		{value : 210,text : "已审核",},
		{value : 300,text : "已生成发货单",},
		{value : 310,text : "已下发仓库",},
		{value : 400,text : "已打单",},
		{value : 700,text : "已拣货",},
		{value : 800,text : "已复核",},
		{value : 900,text : "已发货",},
		{value : 910,text : "申请退货",},
		{value : 920,text : "已生成退货单",},
		{value : 930,text : "已退货入库",},
		{value : 940,text : "已退款",},
		{value : 110,text : "已分配库存",},
		{value : 120,text : "已匹配快递",},
		{value : 130,text : "已生成运单",},
		{value : 250,text : "海关申报",},
		{value : 950,text : "已取消",},
		{value : 140,text : "申报中",},
		{value : 90,text : "待支付",},
		{value : 92,text : "已支付完成",},
	],
	outordertype = [
		{value : 100,text : "订单池",},
		{value : 200,text : "财务已审核",},
		{value : 210,text : "已审核",},
		{value : 300,text : "已生成发货单",},
		{value : 310,text : "已下发仓库",},
	];
	
	return {
		ordertype : ordertype,
		outordertype : outordertype,
		getordertype : function(){
			var arr = new Object();
			for(var i in ordertype){
				arr[ordertype[i].value] = ordertype[i].text ;
			};
			return arr;
		},
   };
})
//获取订单列表
.factory('getorderlist',function($http,$q){
	return function(page){
		var defer = $q.defer();
		$http.get('assets/js/data/order.json').success(function(data){
			var msg = {
				bigTotalItems : data.total,
				bigCurrentPage : data.currentPage,
				pagesize : data.numPerPage,
				result : data.rows,
			};
			defer.resolve(msg);
		});
		return defer.promise
	}
})



