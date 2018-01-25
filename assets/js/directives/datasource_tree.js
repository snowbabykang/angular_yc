angular.module('app', [])
.factory("setTreeService", function(){
	//排序数组
	var orderarr = [1,2,3,4,5,6,7];
	//资源类型数组
	var menutype_arr = [
		{value : 0,text : "菜单",},
		{value : 1,text : "操作",},
	];
	//图标数组(只列出部分)
	var iconarr = ["icon-department","icon-edit","icon-folder","icon-resource","icon-group",
	"icon-role-permission","icon-chart_pie","icon-chart_curve",];
	var getLocalTime = function(nS) { 
		var tt = new Date(nS).toLocaleString();
		return tt;      
	};   
	var set_treetable = function(nodeObj){
		nodeObj.marginLeft = 20 * nodeObj.level;  
		var classname = "";
		if(nodeObj.isParent){
			classname = "center_open";
		}else{
			classname = "center_docu";
		};
		var createTime = nodeObj.createTime ? getLocalTime(nodeObj.createTime) : "";
		var html = '<table class="data">'
				+'<tr data-modeid="'+nodeObj.modOrder+'">'
				+'<td class="td1"><span style="margin-left:'+nodeObj.marginLeft+'px;" class="'+classname+'">'+nodeObj.modName+'</span></td>'  
				+'<td class="td2 tdlink cline break">'+nodeObj.modUrl+'</td>  '
				+'<td class="td3 cline break">'+nodeObj.code+'</td>  '
				+'<td class="td4 cline break">'+nodeObj.createUser+'</td>  '
				+'<td class="td5 tdtime cline break">'+createTime+'</td> ' 
				+'</tr></table>'; 
		$("#" + nodeObj.tId+"_a").html(html);  
	}; 
   return {
		set_treetable : set_treetable,
		orderarr : orderarr,
		menutype_arr : menutype_arr,
		iconarr : iconarr,
   }
})
.directive('sourcetree', ['$http','$rootScope','setTreeService',
function($http,$rootScope,setTreeService) {
  return { 
    restrict: 'A', 
    link: function ($scope,element, attrs) { 
		$scope.treeId = "sourcetree";
		var setting = { 
			data: { 
				simpleData: { 
					idKey: "modId",
					pIdKey: "_parentid",
					enable: true
				},
				key: {
					name: "modName"
				}
			},
			view:{  
                addDiyDom: function(rootId,nodeObj) { 
                    setTreeService.set_treetable(nodeObj);
                },  
                showIcon:0,
                showTitle:0,  
                showLine:0,  
                selectedMulti:0,  
                txtSelectedEnable:0  
            }, 
			callback: { 
				onClick: function (event, treeId, treeNode, clickFlag) { 
					$scope.updatedata = treeNode;
				},
			},
		}; 
		$scope.getSortFun = function(order, sortBy) {
			if(sortBy!== 1){
			  var ordAlpah = (order == 'asc') ? '>' : '<';
			  var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
			  return sortFun;
				
			}
		};
		$http.get('assets/js/data/sourcedata.json').success(function (data) {
			var arr = data.rows;
			arr.sort($scope.getSortFun('desc', 'modOrder'));
			$scope.zNodes = arr;
			$.fn.zTree.init($("#sourcetree"), setting, $scope.zNodes); 
			$scope.treeObj = $.fn.zTree.getZTreeObj($scope.treeId);
			$scope.treeObj.expandAll(true);
		});
	} 
  }; 
}]); 