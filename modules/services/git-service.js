(function () {
	'use strict'
	angular
		.module('myApp')
		.service('GitService', GitService);

	function GitService($http, $q) {

		$http.defaults.cache = true;

		var service = {
			getDataByUrl: getDataByUrl,
		}

		return service;

		function getCallConfig(params,contentType) {
			var headers = {
				'Content-Type': contentType
			}
			return {
				headers: headers,
				params: params
			}
		}

		function getDataByUrl(url) {
			var config = getCallConfig(null, 'application/json');
			var promise = $http.get(url,null,config)
				.then(function (response) {
					 return response;
				})
				.catch(function (error) {
				 	 $q.reject(error);
				})
				return promise;		
		}
	}

})();
