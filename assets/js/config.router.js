tempApp.config(config);
config.$inject =  ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];
function config( $stateProvider,   $urlRouterProvider,   MODULE_CONFIG ) {
	$urlRouterProvider
	.when('/map','/app/home')
	.when('/japan','/app/home')
	.when('/mexico','/app/home')
	.when('/sweden','/app/home')
	.when('/italy','/app/home')
	.when('/morocco','/app/home')
	.when('/china','/app/home')
	.when('/USA','/app/home')
	.when('/kenya','/app/home')
	.when('/france','/app/home')
	.when('/india','/app/home')
    .otherwise('/app/home');
    $stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'login.html',
			resolve: load(['assets/js/controllers/loginCtrl.js'])
        })
		.state('register', {
			abstract: true,
			url: '/register',
			templateUrl: 'register/index.html',
			controller : 'registerCtrl',
			resolve: load(['ui.bootstrap','My97DatePicker','assets/js/controllers/registerCtrl.js',
			//'assets/js/service/uploadfile.service.js',
			'uploadfile',
			])
        })
		.state('register.step1', {
			url: '/step1',
			templateUrl: 'register/step1.html',
        })
		.state('register.step2', {
			url: '/step2',
			templateUrl: 'register/step2.html',
        })
		.state('register.step3', {
			url: '/step3',
			templateUrl: 'register/step3.html',
        })
		.state('app', {
			abstract: true,
			url: '/app',
			templateUrl: 'menu.html'
        })
        .state("app.home", {
			url:"/home",
			templateUrl: 'home.html',
			controller: 'myhomeController',
			controllerAs: 'vm',
			resolve: load(['fullPage.js','assets/js/controllers/homeCtrl.js'])
        })
	    .state("app.updatepsd", {
			url:"/updatepsd",
			templateUrl: 'updatepsd.html',
			resolve: load(['ui.bootstrap','assets/js/controllers/updatepsdCtrl.js'])
        })
	   .state("app.config", {                 //控制中心
			abstract: true,
			url:"/config",
			template: '<div ui-view class="fade-in-up"></div>',
       })
       .state("app.config.powermanage", {                 //控制中心
			abstract: true,
			url:"/powermanage",
			templateUrl: 'config/index.html',
       })
	   .state("app.config.powermanage.index", {                 //控制中心
			url:"/index",
			templateUrl: 'config/confighome.html',
			resolve: load(['assets/js/controllers/confighomeCtrl.js'])
       })
       .state("app.config.powermanage.userpower", {           //控制中心/权限管理/用户权限
			url:"/userpower",
    	    templateUrl: 'config/powermanage/userpower.html',
			controller: "UiGridCtrl",
			resolve: load(['ngStorage','ui.grid', 'assets/js/controllers/uigrid.js'])
       })
       .state("app.config.powermanage.rolepower", {           //控制中心/权限管理/角色权限
			url:"/rolepower",
			templateUrl: 'config/powermanage/rolepower.html',
			resolve: load(['tree','ui.select','assets/js/directives/role_tree.js',
			'ui.bootstrap','assets/js/controllers/rolepowerCtrl.js'])
       })
       .state("app.config.powermanage.datapower", {           //控制中心/权限管理/数据权限
			url:"/datapower",
			templateUrl: 'config/powermanage/datapower.html',
       })
	   .state("app.config.basicmanage", {                 //控制中心
    	   abstract: true,
    	   url:"/basicmanage",
    	   templateUrl: 'config/index.html',
       })
	   .state("app.config.basicmanage.structure", {           
			url:"/structure",
			templateUrl: 'config/basicmanage/structure.html'
       })
       .state("app.config.basicmanage.usermanage", {           
			url:"/usermanage",
			templateUrl: 'config/basicmanage/usermanage.html',
			resolve: load(['assets/js/directives/usermanage.js','assets/js/controllers/usermanageCtrl.js'])
       })
       .state("app.config.basicmanage.datasources", {           
    	    url:"/datasources",
    	    templateUrl: 'config/basicmanage/datasources.html',
			resolve: load(['tree','ui.select','assets/js/directives/datasource_tree.js',
			'ui.bootstrap','assets/js/controllers/datasourceCtrl.js'])
       })
	   .state("app.config.setmanage", {                 //控制中心
    	    abstract: true,
    	    url:"/setmanage",
    	    templateUrl: 'config/index.html',
       })
	   .state("app.config.setmanage.departmanage", {
			url:"/departmanage/:page",
			templateUrl: 'config/setmanage/departmanage.html',
			resolve: load(['tree','assets/js/directives/depart_tree.js',
			'ui.bootstrap','assets/js/controllers/departmanageCtrl.js'])
       })
       .state("app.config.setmanage.staffmanage", {           
			url:"/staffmanage",
			templateUrl: 'config/setmanage/staffmanage.html',
			resolve: load(['tree','assets/js/directives/staff_tree.js',
			'ui.bootstrap','assets/js/controllers/staffmanageCtrl.js'])
       })
	   .state("app.order", {
		   abstract: true,
           url:"/order",
           templateUrl: 'order/index.html',
       })
	   .state("app.order.order1", {                 //订单处理
    	   abstract: true,
    	   url:"/order1",
    	   templateUrl: 'order/index.html',
       })
	   .state("app.order.order1.order11", {                 
    	   url:"/order11",
    	   templateUrl: 'order/order1/order11.html',
		   resolve: load(['ui.grid', 
						'assets/js/service/ordersale.service.js',
						'ui.bootstrap','My97DatePicker','ui.select',
						'assets/js/controllers/ordersaleCtrl.js',
						'assets/js/service/uploadfile.service.js',])
       })
	   .state("app.order.order1.addorder", {       //新增订单              
    	   url:"/order11/addorder",
    	   templateUrl: 'order/order1/editorder/editorder.html',
		   data : {
			   type : "add",
			   title : "新建订单"
		   },
		   controller: 'editorderController',
		   resolve: load(['ui.bootstrap','My97DatePicker','ui.select','tree','uploadfile',
						'assets/js/controllers/orderoprationCtrl.js',
						'assets/js/directives/prdclassfiy_tree.js',
						'assets/js/controllers/orderPrdCtrl.js',
						'assets/js/service/uploadfile.service.js',])
       })
	   .state("app.order.order1.editorder", {      //编辑订单             
    	   url:"/order11/editorder/{id}",
    	   templateUrl: 'order/order1/editorder/editorder.html',
		   data : {
			   type : "edit",
			   title : "编辑订单"
		   },
		   controller: 'editorderController',
		   resolve: load(['ui.bootstrap','My97DatePicker','ui.select','tree','uploadfile',
						'assets/js/controllers/orderoprationCtrl.js',
						'assets/js/directives/prdclassfiy_tree.js',
						'assets/js/controllers/orderPrdCtrl.js',
						'assets/js/service/uploadfile.service.js',])
       })
	   .state("app.order.order1.printorder", {      //打印订单             
    	   url:"/order11/printorder/{id}",
    	   templateUrl: 'order/order1/printorder.html',
		   controller: 'printorderCtrl',
		   resolve: load(['ui.bootstrap','AngularPrint','assets/js/controllers/printorderCtrl.js'])
       })
	   .state("app.order.order1.order12", {                 
    	   url:"/supplierlist",
    	   templateUrl: 'order/order1/supplierlist.html',
			resolve: load(['ui.bootstrap','colorpicker.module',
						'assets/js/controllers/supplierlistCtrl.js',])
       })
	   .state("app.order.order1.order13", {                 
    	   url:"/order13",
    	   templateUrl: 'order/order1/order13.html',
       })
	   .state("app.order.order2", {                 //订单处理
    	   abstract: true,
    	   url:"/order2",
    	   templateUrl: 'order/index.html',
       })
	   .state("app.order.order2.order21", {                 
    	   url:"/order21",
    	   template: '<h1>订单处理21页面</h1>',
       })
	   .state("app.order.order2.order22", {                 
    	   url:"/order22",
    	   template: '<h1>订单处理22页面</h1>',
	   })
	   .state("app.order.order2.order23", {                 
    	   url:"/order23",
    	   template: '<h1>订单处理23页面</h1>',
       })
       .state("app.express", {         //快递处理
		   abstract: true,
    	   url:"/express",
		   templateUrl: 'express/index.html',
       })
	   .state("app.express.express1", {                 
    	   url:"/express1",
    	   templateUrl: 'express/express1.html',
       })
	   .state("app.express.express2", {                 
    	   url:"/express1",
    	   templateUrl: 'express/express2.html',
       })
	   .state("app.express.express3", {                 
    	   url:"/express1",
    	   templateUrl: 'express/express3.html',
       })
       .state("app.goods", {
		   abstract: true,
    	   url:"/goods",
		   templateUrl: 'goods/index.html',
       })
	   .state("app.goods.savesource", {
    	   url:"/savesource",
    	   templateUrl: 'goods/savesource.html',
		   resolve: load(['ui.bootstrap','assets/js/controllers/savesourceCtrl.js'])
       })
	   .state("app.payinfo", {
    	   url:"/payinfo",
    	   template: '<div ui-view  class="fade-in-up"></div>',
       })
	   .state("app.report", {
    	   url:"/report",
    	   template: '<div ui-view  class="fade-in-up"></div>',
       })
	   .state("app.eport", {
    	   url:"/eport",
    	   template: '<div ui-view  class="fade-in-up"></div>',
       })
	   
	function load(srcs, callback) {
	  return {
		  deps: ['$ocLazyLoad', '$q',
			function( $ocLazyLoad, $q ){
			  var deferred = $q.defer();
			  var promise  = false;
			  srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
			  if(!promise){
				promise = deferred.promise;
			  }
			  angular.forEach(srcs, function(src) {
				promise = promise.then( function(){
				  angular.forEach(MODULE_CONFIG, function(module) {
					if( module.name == src){
					  src = module.module ? module.name : module.files;
					}
				  });
				  return $ocLazyLoad.load(src);
				} );
			  });
			  deferred.resolve();
			  return callback ? promise.then(function(){ return callback(); }) : promise;
		  }]
	  }
	}
};