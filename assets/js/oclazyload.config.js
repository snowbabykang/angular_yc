tempApp
.constant('MODULE_CONFIG', [
	{
		name: 'dataTable',
		module: false,
		files: [
			'assets/js/angular/datatable/jquery.dataTables.js',
			'assets/js/angular/datatable/dataTables.bootstrap.js',
			'assets/js/angular/datatable/dataTables.bootstrap.css'
		]
    },
	{
		name: 'tree',
		module: true,
		files: [
			'assets/js/lib/jquery.ztree.all.min.js',
			'assets/css/zTreeStyle/zTreeStyle.css',
		]
    },
	{
		name: 'ngStrap',
		module: true,
		serie: true,
		files: [
			'assets/js/angular/angular-strap/angular-motion.min.css',
			'assets/js/angular/angular-strap/bootstrap-additions.min.css',
			'assets/js/angular/angular-strap/angular-strap.js',
			'assets/js/angular/angular-strap/angular-strap.tpl.js'
		]
    },
	{
		name: 'ui.bootstrap',
		module: true,
		serie: true,
		files: [
			'assets/js/angular/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'assets/js/angular/angular-bootstrap/ui-bootstrap-tpls.js',
			'assets/js/angular/angular-bootstrap/angular-locale_zh-cn.js',
			'assets/js/service/modaltemp.service.js'      //自写的信息弹层注入service
		]
	},
	{
		name: 'ui.select',
		module: true,
		files: [
			'assets/js/angular/angular-ui-select/dist/select.min.js',
			'assets/js/angular/angular-ui-select/dist/select.min.css?v=1'
		]
    },
	{
		name: 'xeditable',
		module: true,
		files: [
			'assets/js/angular/angular-xeditable/dist/js/xeditable.min.js',
			'assets/js/angular/angular-xeditable/dist/css/xeditable.css'
		]
	},
	{
		name: 'ui.bootstrap.datetimepicker',
		module: true,
		serie: true,
		files: [
			'assets/js/angular/angular-bootstrap-datetimepicker/datetimepicker.css',
			'assets/js/angular/angular-bootstrap-datetimepicker/moment.min.js',
			'assets/js/angular/angular-bootstrap-datetimepicker/locale/zh-cn.js',
			'assets/js/angular/angular-bootstrap-datetimepicker/datetimepicker.js',
			'assets/js/angular/angular-bootstrap-datetimepicker/datetimepicker.templates.js',
		]
	},
	{
		name: 'My97DatePicker',
		module: true,
		files: [
			'assets/js/lib/My97DatePicker/WdatePicker.js',
			'assets/js/directives/wdatepicker_directive.js',
		]
	},
	{
		name: 'uploadfile',
		module: true,
		serie: true,
		files: [
			'assets/js/angular/angular-file-upload/angular-file-upload.js',
			'assets/js/directives/uploadimg_directive.js',   //上传图片展示用
		]
	},
	{
		name: 'colorpicker.module',
		module: true,
		serie: true,
		files: [
			'assets/js/angular/angular-bootstrap-colorpicker/colorpicker.min.css',
			'assets/js/angular/angular-bootstrap-colorpicker/bootstrap-colorpicker-module.min.js',
		]
	},
	{
		name: 'AngularPrint',
		module: true,
		serie: true,
		files: [
			'assets/js/angular/angularprint/angularPrint.css',
			'assets/js/angular/angularprint/angularPrint.js',
		]
	},
	{
		name: 'fullPage.js',
		module: true,
		serie: true,
		files: [
			'assets/js/angular/fullpagejs/jquery.fullPage.css',
			'assets/js/angular/fullpagejs/styles.css',
			'assets/js/angular/fullpagejs/jquery.slimscroll.min.js',
			'assets/js/angular/fullpagejs/jquery.fullPage.min.js',
			'assets/js/angular/fullpagejs/angular-fullPage.js',
		]
	},
	{
		name: 'ui.grid',
		module: true,
		files: [
			'assets/js/angular/angular-ui-grid/ui-grid.min.js',
			'assets/js/angular/angular-ui-grid/ui-grid.min.css',
			'assets/js/angular/angular-ui-grid/ui-grid.bootstrap.css'
		]
	},
])
.config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
	$ocLazyLoadProvider.config({
		debug: false,
		events: false,
		modules: MODULE_CONFIG
	});
}]);

