angular.module('bossy.dropdown', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})
	
	.factory('bossyDropdownFactory', ['$http', function($http) {
		var dataArray = [];
		$http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json')
		.success(function(data){
			dataArray = data;
			console.log(dataArray[0].name);

		})
		.error(function(data) {
			console.log("http.get FAILED");
			$scope.data = data || "Request failed";
		 })
		//TEST ARRAY 
		 // var dataArray =  [
        // {id: 0, name:'AlenMania'},
        // {id: 1, name:'Albania'},
        // {id: 2, name:'Algeria'},
        // {id: 3, name:'Andorra'},
        // {id: 4, name:'Angola'},
        // {id: 5, name:'Antigua & Deps'}
		// ];
		return {
			_options: {
				titles: 'drop title',
				contents: dataArray
			}
		}
	}])
	
	.directive('bossyDropdown', function($compile, $http /*$data,*/ /*$schema*/) {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'bossy.dropdown.html',
			controller:['$scope', 'bossyDropdownFactory', function($scope, bossyDropdownFactory) {
					this._options = {
					titles: bossyDropdownFactory._options.titles,
					contents: bossyDropdownFactory._options.contents
				};
					$scope.myVal = this._options.contents;
			}],
			controllerAs: "drops"		
		};
	})
	
	.controller('bossyDropdownCtrl', function($compile, $http, bossyDropdownFactory, $scope /*$data,*/ /*$schema*/) {
		this._options = {
			titles: bossyDropdownFactory._options.titles,
			contents: bossyDropdownFactory._options.contents
		};
	})
	
	
