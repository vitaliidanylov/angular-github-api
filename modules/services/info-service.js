(function() { 
	'use strict'; 

	angular 
		.module('myApp') 
		.service('GitInfo', GitInfo);

function GitInfo() {
		var service = {
			client_id: '960e1a082bc3d3d29ab0', 
			client_secret: '08599eb62c8945bbb1dea709c5cf9851e10a444b' 
	}

		return service;
}

})();