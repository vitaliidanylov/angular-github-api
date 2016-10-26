(function () {
	'use strict'

	angular
		.module('myApp')
		.config(configure);

	function configure($stateProvider,$urlRouterProvider){
		$stateProvider.state('list',{
			url: '/list',
			views: {
				'': {
					templateUrl: 'modules/list/main-list.html',
					controller: 'ListController as listCtrl'
				}
			}
		})
		.state('user',{
			url: '/:userlogin',
			views: {
				'': {
					templateUrl: 'modules/user/user-info.html',
					controller: 'UserController as userCtrl'
				}
			}
		})
		.state('repo',{
			url: '/:userlogin/:reponame',
			views: {
				'': {
					templateUrl: 'modules/repo/repo-list.html',
					controller: 'RepoController as repoCtrl'
				}
			}
		})

		$urlRouterProvider.otherwise('list');
	}

})();