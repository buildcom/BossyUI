var arr = { "nodes": [
	{"node": { 
		"value": "usr",
		"icons": [
	    {"exp": "e"},
			{"col": "c"}
		],
		"nodes": [
			{"node":{ 
				"value": "bin",
				"icons": [
					{"exp": "e"},
					{"col": "c"}
				],
				"nodes": [
					{ "item": { "value": "filename1.txt"}},
					{ "item": { "value": "filename2.txt"}}
				]
		  }},
		  {"node":{ 
				"value": "lib",
				"icons": [
				  {"exp": "e"},
				  {"col": "c"}
				],
				"nodes": []
			}},
			{"item": { "value": "filename3.txt"}},
			{"item": { "value": "filename4.txt"}}
		]}},
		{"node":{ 
				"value": "lib",
				"icons": [
				  {"exp": "e"},
				  {"col": "c"}
				],
				"nodes": []
			}},
	]};
	console.log(arr);
						    
angular.module('bossy.treeview',[])
.controller('DataController', ['$scope', function($scope){
	$scope.treeInput = arr;
}]);
