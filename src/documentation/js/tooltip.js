function TooltipCtrl ($scope) {
	$scope.exp1Config = {
		text: "This is default text in the tooltip"
	};

	$scope.exp2ConfigLeft = {
		text: "This is default text in the tooltip",
		align: "left"
	};

	$scope.exp2ConfigRight = {
		text: "This is default text in the tooltip",
		align: "right"
	};

	// Set color to green
	$scope.exp3ConfigGreen = {
		text: "This is default text in the tooltip",
		color: "green"
	};
// Set color to orange
	$scope.exp3ConfigOrange = {
		text: "This is default text in the tooltip",
		color: "orange"
	};
// Set color to red
	$scope.exp3ConfigRed = {
		text: "This is default text in the tooltip",
		color: "red"
	};
// Set color to blue
	$scope.exp3ConfigBlue = {
		text: "This is default text in the tooltip",
		color: "blue"
	};

	// Set position to top(default)
	$scope.exp4ConfigTop = {
		text: "This is default text in the tooltip",
		position: "top"
	};
// Set position to left
	$scope.exp4ConfigLeft = {
		text: "This is default text in the tooltip",
		position: "left"
	};
// Set position to right
	$scope.exp4ConfigRight = {
		text: "This is default text in the tooltip",
		position: "right"
	};
// Set position to bottom
	$scope.exp4ConfigBottom = {
		text: "This is default text in the tooltip",
		position: "bottom"
	};

	$scope.exp5Config = {
		text: "<b>Download File</b>",
		type: "download",
		color: "green",
		icon: "ion-ios-download-outline",
		persist: true
	};
}

angular.module('tooltip', [])
	.controller('TooltipCtrl', TooltipCtrl)
;
