var tempApp = 
angular.module('app')
.config(["$provide","$compileProvider","$controllerProvider","$filterProvider",
function($provide,$compileProvider,$controllerProvider,$filterProvider){
   tempApp.controller = $controllerProvider.register;
   tempApp.directive = $compileProvider.register;
   tempApp.filter = $filterProvider.register;
   tempApp.factory = $provide.factory;
   tempApp.service  =$provide.service;
   tempApp.constant = $provide.constant;
}])

 .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/i18n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('zh_CN');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }])
.run(
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$host = "http://127.0.0.1";
    $rootScope.$stateParams = $stateParams;
    }
  ]
);