var baseService = {
    parentId:'',  
    init:function(){
		console.log('init');
        this.model = {
            dataList:[],
            isDataLoaded:false
        }
    },
    get: function() {
        var self = this, setting, httpCall, defer;
        defer = this.$q.defer();    //通过$q服务注册一个延迟对象 deferred
		if (!self.model.isDataLoaded) {         
			setting = {
				method: 'GET',
				url: this.SERVICE_URL.GET_URL
			};
			httpCall = this.$http(setting);
			httpCall.success(function(data) {
				self.model.isDataLoaded = true;
				self.model.dataList = data;	                
				defer.resolve();      //任务被成功执行
			});
		}else{
			defer.resolve();
		}
        return defer.promise;   //通过deferred延迟对象，可以得到一个承诺promise，而promise会返回当前任务的完成结果
    }, 
};
var baseController = {
    init: function() {
        this.loadData();  //加载数据
        this.defineScope();    //赋值 
    },
    loadData: function() {
        var defer, self = this;
		defer = this.updateService.get();  
    },
    defineScope: function() {
        var self = this;
		// 往controller中赋值
        this.$scope.model = this.updateService.model;
    },
}