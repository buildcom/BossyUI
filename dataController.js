var arr = { "nodes": [
							{ "node": { 
								"value": "usr",
								"icons": [
									{"expand": "expand-class-name"},
									{"collapse": "collapse-class-name"}
								],
								"nodes": [
									{ "node": { 
										"value": "bin",
										"icons": [
											{"expand": "expand-class-name"},
											{"collapse": "collapse-class-name"}
										],
										"nodes": [
											{ "item": { "value": "filename1.txt"}},
											{ "item": { "value": "filename2.txt"}}
										]
									}},
									{ "node": { 
										"value": "lib",
										"icons": [
											{"expand": "expand-class-name"},
											{"collapse": "collapse-class-name"}
										],
										"nodes": []
									}},
									 {"item": { "value": "filename3.txt"}},
									 {"item": { "value": "filename4.txt"}}
								]}
							}]};
							    console.log(arr);
						    
angular.module('bossy.treeview',[])
.controller('DataController', ['$scope', function($scope){
	$scope.treeInput = arr;
}]);
