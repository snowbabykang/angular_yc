(function() {
    'use strict';
    function myFactory($http, $q, $state) {
        var myService = function() {
            this.$http = $http;
            this.$q = $q;
            this.$state = $state;
            this.REDIRECT_STATE = 'config';
            this.SERVICE_URL = {
                GET_URL: 'assets/js/data/getrolepower.php',
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$q', '$state'];
    tempApp.factory('config.rolepower.service', myFactory);
}());
