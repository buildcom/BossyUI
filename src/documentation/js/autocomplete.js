angular.module('autocomplete', [])

	.controller('AutocompleteCtrl', [
		'$scope',
		function($scope) {
			var fiftyStates = [
				'Alabama',
				'Alaska',
				'Arizona',
				'Arkansas',
				'California',
				'Colorado',
				'Connecticut',
				'Delaware',
				'Florida',
				'Georgia',
				'Hawaii',
				'Idaho',
				'Illinois',
				'Indiana',
				'Iowa',
				'Kansas',
				'Kentucky',
				'Louisiana',
				'Maine',
				'Maryland',
				'Massachusetts',
				'Michigan',
				'Minnesota',
				'Mississippi',
				'Missouri',
				'Montana',
				'Nebraska',
				'Nevada',
				'New Hampshire',
				'New Jersey',
				'New Mexico',
				'New York',
				'North Carolina',
				'North Dakota',
				'Ohio',
				'Oklahoma',
				'Oregon',
				'Pennsylvania',
				'Rhode Island',
				'South Carolina',
				'South Dakota',
				'Tennessee',
				'Texas',
				'Utah',
				'Vermont',
				'Virginia',
				'Washington',
				'West Virginia',
				'Wisconsin',
				'Wyoming'
			];

			$scope.ex1Config = {
				dict: fiftyStates
			};

			$scope.ex2Config = {
				dict: fiftyStates,
				maxCorrections: 3,
				maxSuggestions: 8
			}
		}
	])
;



