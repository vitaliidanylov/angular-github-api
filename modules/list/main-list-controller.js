(function () {
	'use strict'
	angular
		.module('myApp')
		.controller('ListController', ListController);

	ListController.$inject = ['$scope', '$state','$stateParams','$location','GitService','GitInfo'];

	function ListController($scope,$state,$stateParams,$location,GitService, GitInfo) {
		$scope.contributors = [];
		$scope.uniqueLogins = [];
		$scope.users = [];
		$scope.sortType = "login";
		$scope.sortReverse = false;

		// Client Info
		// var client_id = "960e1a082bc3d3d29ab0";
		// var client_secret = "08599eb62c8945bbb1dea709c5cf9851e10a444b";
	 
		var params = "?client_id="+ GitInfo.client_id + "&client_secret=" + GitInfo.client_secret;

		var reposUrl = 'https://api.github.com/orgs/volojs/repos' + params;
// ?client_id960e1a082bc3d3d29ab0&client_secret08599eb62c8945bbb1dea709c5cf9851e10a444b
		GitService.getDataByUrl(reposUrl)
			.then(function(response) {
				if (response === undefined) {
					return new Error("Error retriving data!");
				};
				var contributors = response.data.map(function(repo) {
					return GitService.getDataByUrl('https://api.github.com/repos/volojs/'+repo.name+'/contributors'+params)
				})
				return Promise.all(contributors);
			})
			.then(function(contributors) {
				var allContributors = [];
				allContributors = contributors.map(function(argument) {
					return argument.data;
				});

				$scope.contributors = _.flatten(allContributors);
			})
			.then(function() {
				var allLogins = [];
				for (var i = 0; i < $scope.contributors.length; i++) {
					allLogins.push($scope.contributors[i].login);
				}
				$scope.uniqueLogins = _.uniq(allLogins);
			})
			.then(function() {
				var users = $scope.uniqueLogins.map(function(login) {
					return GitService.getDataByUrl('https://api.github.com/users/' + login + params);
				})
				return Promise.all(users)
					.then(function(response) {
						$scope.$apply(function() {
								response.forEach(function(obj){
									var counter = 0,
										login = obj.data.login;

									for (var i = 0; i < $scope.contributors.length; i++) {

										if (login === $scope.contributors[i].login) {
											counter += $scope.contributors[i].contributions;
											// console.log(counter);
										}
									}

									obj.data.contributions = counter;
									$scope.users.push(obj.data);
								})
						})
					})
					.catch(function(error) {
						console.log(error);
					});
			})
	}

})();
