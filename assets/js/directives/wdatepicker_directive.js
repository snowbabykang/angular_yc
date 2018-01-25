angular.module('app', [])
.directive('wdatepicker', function(){  
	return {
		restrict: 'A',
		require: 'ngModel',
		link : function(scope,element,attr, ngModel){
			function onpicking(dp) {
				var date = dp.cal.getNewDateStr();
				scope.$apply(function () {
					ngModel.$setViewValue(date);
				});
			}
			function onpicked(dp){
				ngModel.$setViewValue(dp.cal.getNewDateStr());
			}
			function oncleared(){
				scope.$apply(function () {
					ngModel.$setViewValue("");
				});
			}
			
			element.click(function(){
				WdatePicker({
					dateFmt:attr.datefmt,
					minDate:attr.mindate,
					maxDate:attr.maxdate,
					readOnly:true,
					onpicked : onpicked,
					oncleared : oncleared
				});
			});
		},
	} 
});
