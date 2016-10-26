 	(function(){
	'use strict'
	angular
		.module('myApp')
		.controller('UserController', UserController);

	UserController.$inject = ['$scope','$state','$stateParams','$location','GitService', 'GitInfo'];

	function UserController($scope, $state, $stateParams, $location, GitService, GitInfo) {
		$scope.user;
		$scope.repos = [];
		// Client Info
		// var client_id = "960e1a082bc3d3d29ab0";
		// var client_secret = "08599eb62c8945bbb1dea709c5cf9851e10a444b";
		var params = "?client_id="+ GitInfo.client_id + "&client_secret=" + GitInfo.client_secret;

		// console.log($stateParams.userlogin);

		GitService.getDataByUrl('https://api.github.com/users/'+$stateParams.userlogin+params)
			.then(function(response) {
				$scope.user = response.data;
				// console.log($scope.user);
			})
			.then(function(){
				var public_events = GitService.getDataByUrl('https://api.github.com/users/'+$stateParams.userlogin+'/events'+params);
				return public_events;
			})
			.then(function(public_events) {
				public_events.data.forEach(function(obj) {
					if(obj.type === "PushEvent" || obj.type === "CreateEvent" || obj.type === "IssuesEvent"){
						obj.repo.name.split('/');
					 	$scope.repos.push(obj.repo.name);
					}
				});
				$scope.repos = _.uniq($scope.repos);
				$scope.repos = $scope.repos.map(function(name) {
					var arr = name.split('/');
					return {'owner': arr[0],
							'reponame': arr[1]
							}
				});

				// console.log($scope.repos);
			})
			.catch(function(error) {
				console.log(error);
			});
		}
})();
