(function(){
	'use strict'
	angular
		.module('myApp')
		.controller('RepoController', RepoController);

	RepoController.$inject = ['$scope','$state','$stateParams','$location','GitService','GitInfo'];

	function RepoController($scope, $state, $stateParams, $location, GitService, GitInfo) {
		$scope.contributors;
		// Client Info
		// var client_id = "960e1a082bc3d3d29ab0";
		// var client_secret = "08599eb62c8945bbb1dea709c5cf9851e10a444b";
		var params = "?client_id="+ GitInfo.client_id + "&client_secret=" + GitInfo.client_secret;

		console.log($stateParams.userlogin);

		GitService.getDataByUrl('https://api.github.com/repos/'+$stateParams.userlogin+'/'+$stateParams.reponame+'/contributors'+params)
			.then(function function_name(response) {
				// console.log(response.data);
				return $scope.contributors = response.data;
			});
		}
})();
