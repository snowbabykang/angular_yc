(function() {
  'use strict';
	angular.module('app',[])
	.controller('showexampleimgCtl', showexampleimgCtl)
	.controller('registerCtrl', registerCtrl);
	showexampleimgCtl.$inject = ['$scope', '$uibModalInstance', 'item'];
    function showexampleimgCtl($scope, $uibModalInstance,item) {
		$scope.exampleimg = item;
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	};
	
	registerCtrl.$inject = ['$scope','$state','$http','$uibModal','modaltemp.service','fileUpload',];
    function registerCtrl($scope,$state,$http,$uibModal,$modaltemp,fileUpload) {
		//第一步
		$scope.registerToStep2 = function(code){
			console.log(code);
			if(!code){
				return false;
			}
			//下一步请求
			
			
			$state.go('register.step2');
		};
		
		//展示样例图片，在网上随意找了一张图
		$scope.showExampleImg = function(img){
			$uibModal.open({
				templateUrl: 'register/exampleimg.html',
				controller: 'showexampleimgCtl',
				resolve: {
					item: function () {
						return img;
					}
				}
			})
		}
		
		//上传的结果图
		/* $scope.license_image = "";
		$scope.lawManId_image = "";
		$scope.taxyRgNo_image = "";
		$scope.copGgCode_image = "";
		$scope.accoBank_image = ""; */
		
		//请求导入订单列表操作
		/* var file1 = $scope.license_image;
		var file2 = $scope.lawManId_image;
		console.log('license_image is ' );
		console.dir(file1);
		console.log('lawManId_image is ' );
		console.dir(file2);
		var uploadUrl = "/fileUpload";
		fileUpload.uploadFileToUrl(file1, uploadUrl);
		fileUpload.uploadFileToUrl(file2, uploadUrl); */
		
		
		//第三步
		$scope.registerToStep3 = function(item){
			/* if(!item.regCo || !item.enFullCo || !item.copGgCode || !item.addrCo || !item.enAddrCo || !item.licenseId || !item.accoBank
			  || !item.accoNo || !item.mailCo || !item.rgDate || !item.chkDate || !item.contacCo || !item.telCo || !item.lawMan
			  || !item.lawManTel || !item.rgFund || !item.currCode || !item.taxyRgNo || !item.brokerType || !item.copRange || !item.managerName
			  || !item.managerTitle || !item.managerNation || !item.managerIdType || !item.managerId || !item.managerBirthday || !item.managerGender 
			  || !item.managerAddress || !item.managerTelphone || !item.managerDegree || !item.item.loginName || !item.password || !item.item.passwordAgain 
			){
				return false;
			} */
			//示例先判断一个，条件太多，看情况是每一项都具体判断，还是模糊判断有值就可以
			if(!item.regCo){
				return false;
			};
			//下一步请求提交后端验证
			
			
			
			
			$state.go('register.step3');
		};
		
		$scope.currCode_arr = [
			{value :"AUD",text:"[AUD]澳大利亚元"},
			{value :"CNY",text:"[CNY]人民币"},
			{value :"EUR",text:"[EUR]欧元"},
			{value :"GBP",text:"[GBP]英镑"},
			{value :"HKD",text:"[HKD]港币"},
			{value :"JPY",text:"[JPY]日元"},
			{value :"SGD",text:"[SGD]新加坡元"},
			{value :"USD",text:"[USD]美元"},
		];
		$scope.brokerType_arr = [
			{value :"0",text:"无报关权"},
			{value :"1",text:"专业报关"},
			{value :"2",text:"代理报关"},
			{value :"3",text:"自理报关"},
		];
		$scope.busiType_arr = [
			{value :"1",text:"化工"},
			{value :"2",text:"机械"},
			{value :"3",text:"电子"},
			{value :"4",text:"纺织"},
			{value :"5",text:"食品"},
			{value :"6",text:"轻工"},
			{value :"7",text:"水产"},
			{value :"8",text:"医药"},
			{value :"9",text:"房地产"},
			{value :"10",text:"咨询"},
			{value :"11",text:"餐饮娱乐"},
			{value :"12",text:"旅游宾馆"},
			{value :"13",text:"其它"},
		];
		$scope.managerNation_arr = [		
			{value :"133",text:"韩国"},
			{value :"601",text:"澳大利亚"},
			{value :"304",text:"德国"},
			{value :"312",text:"西班牙"},
			{value :"305",text:"法国"},
			{value :"303",text:"英国"},
			{value :"307",text:"意大利"},
			{value :"116",text:"日本"},
			{value :"609",text:"新西兰"},
			{value :"132",text:"新加坡"},
			{value :"110",text:"中国香港"},
			{value :"502",text:"美国"},
			{value :"142",text:"中国"},
			{value :"112",text:"印度尼西亚"},
			{value :"121",text:"澳门"},
			{value :"143",text:"中国台湾"},
			{value :"501",text:"加拿大"},
			{value :"434",text:"秘鲁"},
			{value :"309",text:"荷兰"},
			{value :"136",text:"泰国"},
			{value :"336",text:"立陶宛"},
			{value :"122",text:"马来西亚"},
			{value :"301",text:"比利时"},
			{value :"331",text:"瑞士"},
			{value :"330",text:"瑞典"},
			{value :"302",text:"丹麦"},
			{value :"326",text:"挪威"},
			{value :"318",text:"芬兰"},
			{value :"306",text:"爱尔兰"},
			{value :"410",text:"巴西"},
			{value :"412",text:"智利"},
			{value :"402",text:"阿根廷"},
			{value :"429",text:"墨西哥"},
			{value :"244",text:"南非"},
			{value :"311",text:"葡萄牙"},
			{value :"137",text:"土耳其"},
			{value :"310",text:"希腊"},
			{value :"129",text:"菲律宾"},
			{value :"202",text:"安哥拉"},
			{value :"103",text:"孟加拉国"},
			{value :"603",text:"斐济"},
			{value :"127",text:"巴基斯坦"},
			{value :"350",text:"斯洛文尼亚"},
			{value :"315",text:"奥地利"},
			{value :"355",text:"波黑"},
			{value :"419",text:"厄瓜多尔"},
			{value :"215",text:"埃及"},
			{value :"351",text:"克罗地亚"},
			{value :"111",text:"印度"},
			{value :"413",text:"哥伦比亚"},
			{value :"416",text:"古巴"},
			{value :"337",text:"格鲁吉亚"},
			{value :"220",text:"加纳"},
			{value :"113",text:"伊朗"},
			{value :"427",text:"牙买加"},
			{value :"117",text:"约旦"},
			{value :"145",text:"哈萨克斯坦"},
			{value :"107",text:"柬埔寨"},
			{value :"119",text:"老挝"},
			{value :"134",text:"斯里兰卡"},
			{value :"308",text:"卢森堡"},
			{value :"232",text:"摩洛哥"},
			{value :"325",text:"摩纳哥"},
			{value :"106",text:"缅甸"},
			{value :"328",text:"罗马尼亚"},
			{value :"344",text:"俄罗斯联邦"},
			{value :"353",text:"斯洛伐克"},
			{value :"249",text:"突尼斯"},
			{value :"347",text:"乌克兰"},
			{value :"444",text:"乌拉圭"},
			{value :"149",text:"乌兹别克斯坦"},
			{value :"141",text:"越南"},
			{value :"343",text:"摩尔多瓦"},
			{value :"322",text:"冰岛"},
			{value :"138",text:"阿联酋"},
			{value :"316",text:"保加利亚"},
			{value :"321",text:"匈牙利"},
			{value :"327",text:"波兰"},
			{value :"253",text:"赞比亚"},
			{value :"135",text:"叙利亚"},
			{value :"108",text:"塞浦路斯"},
			{value :"358",text:"塞尔维亚"},
			{value :"352",text:"捷克"},
			{value :"435",text:"波多黎各"},
		];
		$scope.managerIdType_arr = [							
			{value :"10",text:"身份证"},
			{value :"20",text:"护照"},
		];
		$scope.managerGender_arr = [
			{value :"0",text:"男"},
			{value :"1",text:"女"},
		];
	};
})();


