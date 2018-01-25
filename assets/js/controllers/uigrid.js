(function() {
    'use strict';
    angular
        .module('app')
        .controller('UiGridCtrl', UiGridCtrl);
        UiGridCtrl.$inject = ['$scope', 'uiGridConstants','$localStorage'];
        function UiGridCtrl($scope, uiGridConstants,$localStorage) {
			var tbtype = "userpower";
			$scope.$storage = $localStorage;
			$scope.$storage.tablewidtharr = $scope.$storage.tablewidtharr || {};
			$scope.$storage.tablewidtharr.userpower = $scope.$storage.tablewidtharr.userpower || { 
				"name": 200, "gender": 250, "company": 300
			};
			$scope.gridOpts = {
			  columnDefs : [
				{ name : "name",displayName:'名字', width: $scope.$storage.tablewidtharr[tbtype]['name']},
				{ name:'gender', width:$scope.$storage.tablewidtharr[tbtype]['gender']},
				{ name:'company', width:$scope.$storage.tablewidtharr[tbtype]['company']},
			  ],
			 data: [
			   { "name": "Ethel Price", "gender": "female", "company": "Enersol" },
			   { "name": "Claudine Neal", "gender": "female", "company": "Sealoud" },
			   { "name": "Beryl Rice", "gender": "female", "company": "Velity" },
			   { "name": "Wilder Gonzales", "gender": "male", "company": "Geekko" },
			   { "name": "Ethel Price", "gender": "female", "company": "Enersol" },
			   { "name": "Claudine Neal", "gender": "female", "company": "Sealoud" },
			   { "name": "Beryl Rice", "gender": "female", "company": "Velity" },
			   { "name": "Wilder Gonzales", "gender": "male", "company": "Geekko" },
			   { "name": "Ethel Price", "gender": "female", "company": "Enersol" },
			   { "name": "Claudine Neal", "gender": "female", "company": "Sealoud" },
			   { "name": "Beryl Rice", "gender": "female", "company": "Velity" },
			   { "name": "Wilder Gonzales", "gender": "male", "company": "Geekko" },
			   { "name": "Ethel Price", "gender": "female", "company": "Enersol" },
			   { "name": "Claudine Neal", "gender": "female", "company": "Sealoud" },
			   { "name": "Beryl Rice", "gender": "female", "company": "Velity" },
			   { "name": "Wilder Gonzales", "gender": "male", "company": "Geekko" },
			   { "name": "Ethel Price", "gender": "female", "company": "Enersol" },
			   { "name": "Claudine Neal", "gender": "female", "company": "Sealoud" },
			   { "name": "Beryl Rice", "gender": "female", "company": "Velity" },
			   { "name": "Wilder Gonzales", "gender": "male", "company": "Geekko" },
			   
			 ]
		   };
		   //event事件写法
		   $scope.gridOpts.onRegisterApi = function(gridApi){
				$scope.gridApi = gridApi;
				gridApi.colResizable.on.columnSizeChanged($scope,function(colDef, deltaChange){
				  var name = colDef.name;
				  console.log(colDef);
				  colDef.width += deltaChange;
				  $scope.$storage.tablewidtharr[tbtype][name] = colDef.width;
				})
			};

        }
})();
