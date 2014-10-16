/*!
 * bossy.js
 */

/*!
 * http://BossyUI.com/
 *
 * BossyUI - Created with LOVE by Build.com Open Source Consortium
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */

//TODO: need layout, labels
var bossy = angular.module('bossy', [
        'bossy.data',
        'bossy.schema',
        'bossy.form',
        'bossy.input'
    ]
);

angular.module('bossy.data', [])
/**
@ngdoc service
@name $data
@requires $q
@requires $http

*/
    .factory('$data', ['$q','$http',function ($q,$http) {

        function _getData (data) {
            if (angular.isString(data)) {
                return _getRemoteData(data);
            }
            else if (angular.isObject(data)) {
                return data;
            }
            else if (angular.isFunction(data)) {
                return _getData( data.call($scope) );
            }
            else {
                //TODO: replace error message with online doc link like ng errors
                console.error('directive.bossyForm: no data url or object given');
            }
        }

        function _getRemoteData(data) {
            var deferred = $q.defer();

            $http.get( data, { responseType: 'json' } )
                .success( function( data ) {
                    if( angular.isObject( data ) ) {
                        deferred.resolve(data);
                    }
                    else {
                        //TODO: replace error message with online doc link like ng errors
                        deferred.reject('directive.bossyForm: GET request to url did not produce data object');
                    }
                })
                .error( function(response_data, status) {
                    //TODO: replace error message with online doc link like ng errors
                    deferred.reject('directive.bossyForm: GET request to url "' + data + '" failed with status "' + status + '"');
                });

            return deferred.promise;
        }

        return {
            /**
            @ngdoc method
            @name getData
            @methodOf $data
            @param {string,object,function} data If data is a string, it will be treated as a url to retrieve data from. If data is an object it will be immediately returned. If data is a function, the function will be called and processed until an object is produced
            @returns {Object} Either a $q promise, a data object or a string.
            */
            getData: _getData
        };
    }])
;

angular.module('bossy.dropdown', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})
	
	.factory('bossyDropdownFactory', function($http /*$data*/) {
		var promise = $http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json');
		return promise;
	})
	
	.directive('bossyDropdown', function($compile, $http /*$data,*/ /*$schema*/) {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'bossy.dropdown.html',
			controller: function($scope, bossyDropdownFactory) {
				$scope.contents = [];

				bossyDropdownFactory
					.success(function(data){
						$scope.contents = data;
					})
					.error(function(data) {
						console.log("http.get FAILED");
						$scope.contents = data || "Request failed";
					});
			},
			controllerAs: "drops"		
		};
	})
	
	.controller('bossyDropdownCtrl', function($http, bossyDropdownFactory, $scope /*$data,*/ /*$schema*/) {
		$scope.items = [];
		
		bossyDropdownFactory
			.success(function(data){
				$scope.items = data;
			})
			.error(function(data) {
				console.log("http.get FAILED");
				$scope.items = data || "Request failed";
			})
	})
	
	

angular.module('bossy.form', [])
    .run(function($templateCache){
        $templateCache.put('bossy-input.html', 'templates/bossy-input.html');
    })
    .directive('bossyForm',['$compile','$http','$schema','$data', function ($compile, $http, $schema, $data) {
        var _schema,
            _data,
            _options = {
                showLabels: true,
                header: 'This is header',
                footer: 'This is footer',
                theme: 'green',
                button: 'Save'
            },
            _itemTemplate = {
                number: function () {
                    return '<input type="number"/>';
                },
                text: function (obj, key, is_required) {
                    return '<bossy-input title="\''+obj.title+'\'" type="\''+ obj.input_type +'\'" value="\''+_data.address[key]+'\'"' + ( is_required ? ' required' : '' ) + '></bossy-input>';
                },
                textArea: function () {
                    return '<textarea></textarea>';
                },
                checkbox: function(obj){
                    return '<div class="checkbox"><label><input type="checkbox">'+obj.title+'</label></div>';
                }
            };

        function setData(data) {
            var result = $data.getData(data);
            if( angular.isFunction( result.then ) && angular.isFunction( result.catch ) && angular.isFunction( result.finally ) ) {
                return result;
            } else {
                _data = result;
            }

        }

        function setSchema(schema) {
            _schema = $schema.getSchema(schema);
        }

        function buildTemplate(schemaPart, parentKey, required) {
            var template = '',
                fullKey = '';
            angular.forEach(schemaPart, function(value, key) {
                if (value.type) {
                    console.log(fullKey + ' is '+ value.type);
                    switch (value.type) {
                        case 'object':
                            var required_list = typeof( value.required ) !== 'undefined' ? value.required : null;
                            template += buildTemplate(value.properties, fullKey, required_list );
                            break;
                        case 'array':
                            template += buildTemplate(value.items.properties, fullKey);
                            break;
                        case 'number' || 'integer':
                            template += _itemTemplate.number(value);
                            break;
                        case 'string':
                            var is_required = false;
                            if( required && required.indexOf(key) !== -1 ) {
                                is_required = true;
                            }
                            template += _itemTemplate.text(value, key, is_required);
                            break;
                        case 'boolean':
                            template += _itemTemplate.checkbox(value);
                            break;
                    }
                }
            }, this);
            return template;
        }

        return {
            restrict: 'E',
            replace: true,
            template: '',
            scope: {
                config:'=', //Create scope isolation with bi-directional binding,
                title: '='
            },
            link: function (scope, element, attributes) {
                scope.config.options = angular.extend(_options, scope.config.options);

                var promise = setData(scope.config.data);
                setSchema(scope.config.schema);
                if( promise ) {
                    //todo: set directive to loading state
                    promise.then(
                        function(result) {
                            //todo: set directive to loaded state
                            _data = result;
                            element.html(
                                '<form novalidate class="{{config.options.theme}}">'+
                                '<div class="banner page-header"><h3>{{config.options.header}}</h3></div>'+
                                    buildTemplate(_schema) +
                                    '<button ng-if="config.options.button">{{config.options.button}}</button>' +
                                '<div class="page-footer"><h3>{{config.options.footer}}</h3></div>'+
                                '</form>'
                            );
                            $compile(element.contents())(scope);
                        },
                        function(reason) {
                            //todo: set directive to error state
                        });
                    element.html(
                        '<form novalidate class="{{config.options.theme}}">LOADING...</form>'
                    );
                    $compile(element.contents())(scope);
                }
                else {
                    element.html(
                        '<form novalidate class="{{config.options.theme}}">'+
                        '<div class="banner page-header"><h3>{{config.options.header}}</h3></div>'+
                            buildTemplate(_schema) +
                            '<button ng-if="config.options.button">{{config.options.button}}</button>' +
                        '<div class="page-footer"><h3>{{config.options.footer}}</h3></div>'+
                        '</form>'
                    );
                    $compile(element.contents())(scope);
                }


            }
        };

    }])
;
angular.module('bossy.input', [])
    .run(function($templateCache){
        $templateCache.put('bossy-input.html', '<div class="form-group bossy-input"><label for="">{{title}}</label><input type="{{type}}" class="form-control" placeholder="" value="{{value}}"/><span></span></div>');
    })
    .directive('bossyInput',['$compile','$http','$schema','$data','$templateCache', function ($compile, $http, $schema, $data, $templateCache) {
    	return {
			restrict: 'E',
			replace: true,
			scope: {
				title: '=',
				value: '=',
				type: '=',
				required: '='
			},
			template: $templateCache.get('bossy-input.html')
		};
    }]);

angular.module('bossy.dropdown', [])
    .run(function($templateCache) {
        $templateCache.put('jasmineTest.html', 'jasmineTest.html');
    })
    
    /*.factory('bossyDropdownFactory', ['$http', function($http) {
        return {
            _options: {
                title: 'drop title',
                content: 'pop'
            }
        }
        // $http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json').success(function(data){
            // _options.content = data;
        // })
    }])*/
    
    .directive('bossyDropdown', function($compile, $data/*, $schema*/) {
        var _data;
        function setData(data) {
            var result = $data.getData(data);
            if( angular.isFunction( result.then ) && angular.isFunction( result.catch ) && angular.isFunction( result.finally ) ) //{
                return result;
            else
                console.log(result);//return result;
            /*} else {
                _data = result;
            }*/
        }
        
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                src: '@',
                placeholder: '='
            },
            template: '',
            //templateUrl: 'bossy.dropdown.html',
            link: function(scope, element, attrs) {
                console.log(element);
                var json = setData(scope.src);
                element.html(
                    '<select>'
                        + '<option ng-repeat="j in json" value="{{j.code}}">{{j.name}}</option>'
                    + '</select>'
                );
                $compile(element.contents())(scope);
            }
            /*controller:['$scope', 'bossyDropdownFactory', function($scope, bossyDropdownFactory) {
                    this._options = {
                    title: bossyDropdownFactory._options.title,
                    content: bossyDropdownFactory._options.content
                };
            }],
            controllerAs: "drops"*/
        };
    });
angular.module('bossy.schema', [])
    .factory('$schema', ['$q', '$http', function ($q, $http) {

        function _getSchema (schema) {
            if (angular.isString(schema)) {
                return _getRemoteSchema(schema);
            }
            else if (angular.isObject(schema)) {
                return schema;
            }
            else {
                //TODO: replace error message with online doc link like ng errors
                console.error('directive.bossyForm: no schema url or object given');
            }
        }

        function _getRemoteSchema(schema) {
            var deferred = $q.defer();

            $http.get( schema )
                .success( function( data ) {
                    if( angular.isObject( data ) ) {
                        deferred.resolve(data);
                    }
                    else {
                        //TODO: replace error message with online doc link like ng errors
                        deferred.reject('directive.bossyForm: GET request to url did not produce schema object');
                    }
                })
                .error( function(data, status) {
                    //TODO: replace error message with online doc link like ng errors
                    deferred.reject('directive.bossyForm: GET request to url "' + schema + '" failed with status "' + status + '"');
                });

            return deferred.promise;
        }

        return {
            getSchema: _getSchema
        };
    }])
;

angular.module('app.directive.bossy.slider', [])
    .controller('SliderController', ['$scope', function ($scope) {
        $scope.value = 5;
        $scope.max = 9;
        $scope.min = 1;
        $scope.string = "----o----";
        $scope.slider = ['-', '-', '-', '-', 'o', '-', '-', '-', '-'];

        //checks bounds when attempting to increase the value
        $scope.increase = function () {
            if ($scope.value < $scope.max) {
                $scope.slider[$scope.value - 1] = '-';
                $scope.value = $scope.value + 1;
                $scope.slider[$scope.value - 1] = 'o';
            }
            $scope.getstring();
        };

        //This function is to bind the decrease and increase function with the arrow keys
        $scope.keyBind = function (ev) {
            $scope.pressed = ev.which;
            //If arrow key(Left or Down) is pressed then call the decrease() function to decrease the value.
            if ($scope.pressed === 37 || $scope.pressed === 40) {
                $scope.decrease();
            }
            //same as above but for Up or Right to increase the value.
            if ($scope.pressed === 38 || $scope.pressed === 39) {
                $scope.increase();
            }
        };
        //checks bounds when attempting to decrease the value
        $scope.decrease = function () {
            if ($scope.value > $scope.min) {
                $scope.slider[$scope.value - 1] = '-';
                $scope.value = $scope.value - 1;
                $scope.slider[$scope.value - 1] = 'o';
            }
            $scope.getstring();
        };
        $scope.getstring = function () {  //function takes the slider array and creates a string of the contents. 
            $scope.string = "";
            //changed to the angular forEach loop for readability
            angular.forEach($scope.slider, function (item) {
                $scope.string += item;
            })

        };

    }]).directive('bossySlider', function () {
        return {
            restrict: 'AE',
            controller: 'SliderController',
            template: '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button><span>{{string}}</span><button ng-click="increase()" ng-keydown="keyBind($event)">+</button><p>The value is {{value}}!</p>',
            scope: {
            }
        }
    });
 angular.module('bossy.tooltip', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})
	
	.factory('bossyTooltipFactory', function() {
		return {
			_options: {
				title: 'factory title',
				content: 'factory content'
			}
		}
	})
	
	.directive('bossyTooltip', function($compile, $http /*$data,*/ /*$schema*/) {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'bossy.tooltip.html',
			controller:['$scope', 'bossyTooltipFactory', function($scope, bossyTooltipFactory) {
					this._options = {
					title: bossyTooltipFactory._options.title,
					content: bossyTooltipFactory._options.content
				};
			}],
			controllerAs: "tips"		
		};
	})
	
	// Directives onEnter && onExit use jQueryLite dependency
	.directive('onEnter', function() {
		return function(scope, element) {
			element.bind('mouseenter', function() {
				console.log("I'm in you");
			})
		}
	})
	
	.directive('onExit', function() {
		return function(scope, element) {
			element.bind('mouseleave', function() {
				console.log("I'm outta here");
			})
		}
	})
	
/* global expect:true */

var chai = require('chai'),
	expect = chai.expect;

// Karma configuration
// Generated on Sun Sep 14 2014 10:15:49 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

      'https://code.angularjs.org/1.2.25/angular.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js',
      'https://code.angularjs.org/1.2.25/angular-mocks.js',
      './../demo/public/javascripts/*.js',
      './../src/*.js',
      './../src/directives/templates/*.html',
      './../src/directives/*.js',
      './directives/*.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './../src/directives/templates/*.html':['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
        //stripPrefix:'./../'
     moduleName: 'Templates',
   
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

describe('bossyInput', function() {
	var element,
		scope,
		compile,
		val;


	beforeEach(module('Templates'));
	beforeEach(inject(function($compile,$rootScope){
		scope = $rootScope;
		compile = $compile;
		val = true;
		element = angular.element('<bossy-input title = "Sample Bossy Input">Bossy Input</bossy-input>');
		$compile(element)(scope);
		$rootScope.$digest();
	}));

	it('should add bossy input',function(){
		expect(element.text()).toMatch('Bossy Input');
		expect(element.attr('title')).toMatch('Sample Bossy Input');
	});

});
describe('bossySchema test', function(){

	var schemaService,
		rootScope,
		deferred;
	beforeEach(module('Templates'));
	beforeEach(module('bossy.schema'));
	beforeEach(inject(function(_$schema_, _$rootScope_, _$q_) {
		schemaService = _$schema_;
		rootScope = _$rootScope_;

		deferred = _$q_.defer();
		deferred.resolve('data');
		spyOn(schemaService,'getSchema').andReturn(deferred.promise);
	}));

	it('should call getSchema function',function(){
		schemaService.getSchema();
		expect(schemaService.getSchema).toHaveBeenCalledWith();
	});

	it('getSchema should be called with arguments',function(){
		var x =schemaService.getSchema('abc');
		expect(schemaService.getSchema).toHaveBeenCalledWith('abc');
	});
	var input = {
		title: 'Login Form',
		type: 'object',
		properties: {
			title: {
				type: 'string',
				tag: 'bossy-label',
				title: 'Login to enter',
			},
			terms: {
				type: 'boolean',
				tag: 'bossy-radio',
				title: 'Accept terms and conditions'
			},
			username: {
				type: 'string',
				tag: 'bossy-input-text',
				title: 'Username'
			},
			gender: {
				title: 'Gender',
				type: 'string',
				enum: ['female', 'male']
			}
		},
		required: ['terms', 'gender', 'username']
	};

	it('getSchema should return valid data',function(){
		var x = schemaService.getSchema(input);
		rootScope.$apply();
		expect(schemaService.getSchema).toHaveBeenCalledWith(input);
		expect(x).toMatch(input);
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuZGF0YS5qcyIsImJvc3N5LmRyb3Bkb3duLmpzIiwiYm9zc3kuZm9ybS5qcyIsImJvc3N5LmlucHV0LmpzIiwiYm9zc3kucGJkcm9wZG93bi5qcyIsImJvc3N5LnNjaGVtYS5qcyIsImJvc3N5LnNsaWRlci5qcyIsImJvc3N5LnRvb2x0aXAuanMiLCJpbmRleC5qcyIsImthcm1hLmNvbmYuanMiLCJkaXJlY3RpdmVzL2Jvc3N5LmlucHV0LnNwZWMuanMiLCJkaXJlY3RpdmVzL2Jvc3N5LnNjaGVtYS5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJib3NzeS5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGJvc3N5LmpzXG4gKi9cblxuLyohXG4gKiBodHRwOi8vQm9zc3lVSS5jb20vXG4gKlxuICogQm9zc3lVSSAtIENyZWF0ZWQgd2l0aCBMT1ZFIGJ5IEJ1aWxkLmNvbSBPcGVuIFNvdXJjZSBDb25zb3J0aXVtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBQbGVhc2Ugc2VlIExJQ0VOU0UgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICovXG5cbi8vVE9ETzogbmVlZCBsYXlvdXQsIGxhYmVsc1xudmFyIGJvc3N5ID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5JywgW1xuICAgICAgICAnYm9zc3kuZGF0YScsXG4gICAgICAgICdib3NzeS5zY2hlbWEnLFxuICAgICAgICAnYm9zc3kuZm9ybScsXG4gICAgICAgICdib3NzeS5pbnB1dCdcbiAgICBdXG4pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRhdGEnLCBbXSlcbi8qKlxuQG5nZG9jIHNlcnZpY2VcbkBuYW1lICRkYXRhXG5AcmVxdWlyZXMgJHFcbkByZXF1aXJlcyAkaHR0cFxuXG4qL1xuICAgIC5mYWN0b3J5KCckZGF0YScsIFsnJHEnLCckaHR0cCcsZnVuY3Rpb24gKCRxLCRodHRwKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldERhdGEgKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXRSZW1vdGVEYXRhKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXREYXRhKCBkYXRhLmNhbGwoJHNjb3BlKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBubyBkYXRhIHVybCBvciBvYmplY3QgZ2l2ZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVEYXRhKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCggZGF0YSwgeyByZXNwb25zZVR5cGU6ICdqc29uJyB9IClcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIGRpZCBub3QgcHJvZHVjZSBkYXRhIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXJyb3IoIGZ1bmN0aW9uKHJlc3BvbnNlX2RhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBkYXRhICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICBAbmdkb2MgbWV0aG9kXG4gICAgICAgICAgICBAbmFtZSBnZXREYXRhXG4gICAgICAgICAgICBAbWV0aG9kT2YgJGRhdGFcbiAgICAgICAgICAgIEBwYXJhbSB7c3RyaW5nLG9iamVjdCxmdW5jdGlvbn0gZGF0YSBJZiBkYXRhIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHRyZWF0ZWQgYXMgYSB1cmwgdG8gcmV0cmlldmUgZGF0YSBmcm9tLiBJZiBkYXRhIGlzIGFuIG9iamVjdCBpdCB3aWxsIGJlIGltbWVkaWF0ZWx5IHJldHVybmVkLiBJZiBkYXRhIGlzIGEgZnVuY3Rpb24sIHRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhbmQgcHJvY2Vzc2VkIHVudGlsIGFuIG9iamVjdCBpcyBwcm9kdWNlZFxuICAgICAgICAgICAgQHJldHVybnMge09iamVjdH0gRWl0aGVyIGEgJHEgcHJvbWlzZSwgYSBkYXRhIG9iamVjdCBvciBhIHN0cmluZy5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBnZXREYXRhOiBfZ2V0RGF0YVxuICAgICAgICB9O1xuICAgIH1dKVxuO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRyb3Bkb3duJywgW10pXG5cdC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcblx0XHQkdGVtcGxhdGVDYWNoZS5wdXQoJ2phc21pbmVUZXN0Lmh0bWwnLCAnamFzbWluZVRlc3QuaHRtbCcpO1xuXHR9KVxuXHRcblx0LmZhY3RvcnkoJ2Jvc3N5RHJvcGRvd25GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAgLyokZGF0YSovKSB7XG5cdFx0dmFyIHByb21pc2UgPSAkaHR0cC5nZXQoJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vbXNoYWZyaXIvMjY0Njc2My9yYXcvYmZiMzVmMTdiYzVkNWY4NmVjMGYxMGI4MGY3YjgwZTgyM2U5MTk3Zi9zdGF0ZXNfdGl0bGVjYXNlLmpzb24nKTtcblx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fSlcblx0XG5cdC5kaXJlY3RpdmUoJ2Jvc3N5RHJvcGRvd24nLCBmdW5jdGlvbigkY29tcGlsZSwgJGh0dHAgLyokZGF0YSwqLyAvKiRzY2hlbWEqLykge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0VBJyxcblx0XHRcdHJlcGxhY2U6IHRydWUsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2Jvc3N5LmRyb3Bkb3duLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCBib3NzeURyb3Bkb3duRmFjdG9yeSkge1xuXHRcdFx0XHQkc2NvcGUuY29udGVudHMgPSBbXTtcblxuXHRcdFx0XHRib3NzeURyb3Bkb3duRmFjdG9yeVxuXHRcdFx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xuXHRcdFx0XHRcdFx0JHNjb3BlLmNvbnRlbnRzID0gZGF0YTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5lcnJvcihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImh0dHAuZ2V0IEZBSUxFRFwiKTtcblx0XHRcdFx0XHRcdCRzY29wZS5jb250ZW50cyA9IGRhdGEgfHwgXCJSZXF1ZXN0IGZhaWxlZFwiO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXJBczogXCJkcm9wc1wiXHRcdFxuXHRcdH07XG5cdH0pXG5cdFxuXHQuY29udHJvbGxlcignYm9zc3lEcm9wZG93bkN0cmwnLCBmdW5jdGlvbigkaHR0cCwgYm9zc3lEcm9wZG93bkZhY3RvcnksICRzY29wZSAvKiRkYXRhLCovIC8qJHNjaGVtYSovKSB7XG5cdFx0JHNjb3BlLml0ZW1zID0gW107XG5cdFx0XG5cdFx0Ym9zc3lEcm9wZG93bkZhY3Rvcnlcblx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xuXHRcdFx0XHQkc2NvcGUuaXRlbXMgPSBkYXRhO1xuXHRcdFx0fSlcblx0XHRcdC5lcnJvcihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiaHR0cC5nZXQgRkFJTEVEXCIpO1xuXHRcdFx0XHQkc2NvcGUuaXRlbXMgPSBkYXRhIHx8IFwiUmVxdWVzdCBmYWlsZWRcIjtcblx0XHRcdH0pXG5cdH0pXG5cdFxuXHRcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5mb3JtJywgW10pXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICd0ZW1wbGF0ZXMvYm9zc3ktaW5wdXQuaHRtbCcpO1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lGb3JtJyxbJyRjb21waWxlJywnJGh0dHAnLCckc2NoZW1hJywnJGRhdGEnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSkge1xuICAgICAgICB2YXIgX3NjaGVtYSxcbiAgICAgICAgICAgIF9kYXRhLFxuICAgICAgICAgICAgX29wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgc2hvd0xhYmVsczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdUaGlzIGlzIGhlYWRlcicsXG4gICAgICAgICAgICAgICAgZm9vdGVyOiAnVGhpcyBpcyBmb290ZXInLFxuICAgICAgICAgICAgICAgIHRoZW1lOiAnZ3JlZW4nLFxuICAgICAgICAgICAgICAgIGJ1dHRvbjogJ1NhdmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2l0ZW1UZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBudW1iZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aW5wdXQgdHlwZT1cIm51bWJlclwiLz4nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKG9iaiwga2V5LCBpc19yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxib3NzeS1pbnB1dCB0aXRsZT1cIlxcJycrb2JqLnRpdGxlKydcXCdcIiB0eXBlPVwiXFwnJysgb2JqLmlucHV0X3R5cGUgKydcXCdcIiB2YWx1ZT1cIlxcJycrX2RhdGEuYWRkcmVzc1trZXldKydcXCdcIicgKyAoIGlzX3JlcXVpcmVkID8gJyByZXF1aXJlZCcgOiAnJyApICsgJz48L2Jvc3N5LWlucHV0Pic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzx0ZXh0YXJlYT48L3RleHRhcmVhPic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGVja2JveDogZnVuY3Rpb24ob2JqKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiPicrb2JqLnRpdGxlKyc8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGF0YS5nZXREYXRhKGRhdGEpO1xuICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LnRoZW4gKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5jYXRjaCApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmZpbmFsbHkgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0U2NoZW1hKHNjaGVtYSkge1xuICAgICAgICAgICAgX3NjaGVtYSA9ICRzY2hlbWEuZ2V0U2NoZW1hKHNjaGVtYSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBidWlsZFRlbXBsYXRlKHNjaGVtYVBhcnQsIHBhcmVudEtleSwgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9ICcnLFxuICAgICAgICAgICAgICAgIGZ1bGxLZXkgPSAnJztcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY2hlbWFQYXJ0LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnVsbEtleSArICcgaXMgJysgdmFsdWUudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWlyZWRfbGlzdCA9IHR5cGVvZiggdmFsdWUucmVxdWlyZWQgKSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZS5yZXF1aXJlZCA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gYnVpbGRUZW1wbGF0ZSh2YWx1ZS5wcm9wZXJ0aWVzLCBmdWxsS2V5LCByZXF1aXJlZF9saXN0ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gYnVpbGRUZW1wbGF0ZSh2YWx1ZS5pdGVtcy5wcm9wZXJ0aWVzLCBmdWxsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcicgfHwgJ2ludGVnZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUubnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzX3JlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHJlcXVpcmVkICYmIHJlcXVpcmVkLmluZGV4T2Yoa2V5KSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzX3JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS50ZXh0KHZhbHVlLCBrZXksIGlzX3JlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUuY2hlY2tib3godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJycsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGNvbmZpZzonPScsIC8vQ3JlYXRlIHNjb3BlIGlzb2xhdGlvbiB3aXRoIGJpLWRpcmVjdGlvbmFsIGJpbmRpbmcsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoX29wdGlvbnMsIHNjb3BlLmNvbmZpZy5vcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gc2V0RGF0YShzY29wZS5jb25maWcuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2V0U2NoZW1hKHNjb3BlLmNvbmZpZy5zY2hlbWEpO1xuICAgICAgICAgICAgICAgIGlmKCBwcm9taXNlICkge1xuICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGluZyBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmFubmVyIHBhZ2UtaGVhZGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuaGVhZGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFRlbXBsYXRlKF9zY2hlbWEpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhZ2UtZm9vdGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuZm9vdGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Zvcm0+J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGVycm9yIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj5MT0FESU5HLi4uPC9mb3JtPidcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhbm5lciBwYWdlLWhlYWRlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmhlYWRlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmZvb3Rlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9XSlcbjsiLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuaW5wdXQnLCBbXSlcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvc3N5LWlucHV0XCI+PGxhYmVsIGZvcj1cIlwiPnt7dGl0bGV9fTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cInt7dmFsdWV9fVwiLz48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XG4gICAgfSlcbiAgICAuZGlyZWN0aXZlKCdib3NzeUlucHV0JyxbJyRjb21waWxlJywnJGh0dHAnLCckc2NoZW1hJywnJGRhdGEnLCckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhLCAkdGVtcGxhdGVDYWNoZSkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRyZXBsYWNlOiB0cnVlLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0dGl0bGU6ICc9Jyxcblx0XHRcdFx0dmFsdWU6ICc9Jyxcblx0XHRcdFx0dHlwZTogJz0nLFxuXHRcdFx0XHRyZXF1aXJlZDogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6ICR0ZW1wbGF0ZUNhY2hlLmdldCgnYm9zc3ktaW5wdXQuaHRtbCcpXG5cdFx0fTtcbiAgICB9XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZHJvcGRvd24nLCBbXSlcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnamFzbWluZVRlc3QuaHRtbCcsICdqYXNtaW5lVGVzdC5odG1sJyk7XG4gICAgfSlcbiAgICBcbiAgICAvKi5mYWN0b3J5KCdib3NzeURyb3Bkb3duRmFjdG9yeScsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX29wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ2Ryb3AgdGl0bGUnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdwb3AnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gJGh0dHAuZ2V0KCdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21zaGFmcmlyLzI2NDY3NjMvcmF3L2JmYjM1ZjE3YmM1ZDVmODZlYzBmMTBiODBmN2I4MGU4MjNlOTE5N2Yvc3RhdGVzX3RpdGxlY2FzZS5qc29uJykuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIC8vIF9vcHRpb25zLmNvbnRlbnQgPSBkYXRhO1xuICAgICAgICAvLyB9KVxuICAgIH1dKSovXG4gICAgXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lEcm9wZG93bicsIGZ1bmN0aW9uKCRjb21waWxlLCAkZGF0YS8qLCAkc2NoZW1hKi8pIHtcbiAgICAgICAgdmFyIF9kYXRhO1xuICAgICAgICBmdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGF0YS5nZXREYXRhKGRhdGEpO1xuICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LnRoZW4gKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5jYXRjaCApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmZpbmFsbHkgKSApIC8ve1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsvL3JldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAvKn0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgc3JjOiAnQCcsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnJyxcbiAgICAgICAgICAgIC8vdGVtcGxhdGVVcmw6ICdib3NzeS5kcm9wZG93bi5odG1sJyxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gc2V0RGF0YShzY29wZS5zcmMpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgJzxzZWxlY3Q+J1xuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPG9wdGlvbiBuZy1yZXBlYXQ9XCJqIGluIGpzb25cIiB2YWx1ZT1cInt7ai5jb2RlfX1cIj57e2oubmFtZX19PC9vcHRpb24+J1xuICAgICAgICAgICAgICAgICAgICArICc8L3NlbGVjdD4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qY29udHJvbGxlcjpbJyRzY29wZScsICdib3NzeURyb3Bkb3duRmFjdG9yeScsIGZ1bmN0aW9uKCRzY29wZSwgYm9zc3lEcm9wZG93bkZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGJvc3N5RHJvcGRvd25GYWN0b3J5Ll9vcHRpb25zLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBib3NzeURyb3Bkb3duRmFjdG9yeS5fb3B0aW9ucy5jb250ZW50XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiBcImRyb3BzXCIqL1xuICAgICAgICB9O1xuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5zY2hlbWEnLCBbXSlcbiAgICAuZmFjdG9yeSgnJHNjaGVtYScsIFsnJHEnLCAnJGh0dHAnLCBmdW5jdGlvbiAoJHEsICRodHRwKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldFNjaGVtYSAoc2NoZW1hKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhzY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXRSZW1vdGVTY2hlbWEoc2NoZW1hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IG5vIHNjaGVtYSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlU2NoZW1hKHNjaGVtYSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCBzY2hlbWEgKVxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNPYmplY3QoIGRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIHNjaGVtYSBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgc2NoZW1hICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0U2NoZW1hOiBfZ2V0U2NoZW1hXG4gICAgICAgIH07XG4gICAgfV0pXG47XG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZS5ib3NzeS5zbGlkZXInLCBbXSlcbiAgICAuY29udHJvbGxlcignU2xpZGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUudmFsdWUgPSA1O1xuICAgICAgICAkc2NvcGUubWF4ID0gOTtcbiAgICAgICAgJHNjb3BlLm1pbiA9IDE7XG4gICAgICAgICRzY29wZS5zdHJpbmcgPSBcIi0tLS1vLS0tLVwiO1xuICAgICAgICAkc2NvcGUuc2xpZGVyID0gWyctJywgJy0nLCAnLScsICctJywgJ28nLCAnLScsICctJywgJy0nLCAnLSddO1xuXG4gICAgICAgIC8vY2hlY2tzIGJvdW5kcyB3aGVuIGF0dGVtcHRpbmcgdG8gaW5jcmVhc2UgdGhlIHZhbHVlXG4gICAgICAgICRzY29wZS5pbmNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUudmFsdWUgPCAkc2NvcGUubWF4KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNsaWRlclskc2NvcGUudmFsdWUgLSAxXSA9ICctJztcbiAgICAgICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmFsdWUgKyAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5zbGlkZXJbJHNjb3BlLnZhbHVlIC0gMV0gPSAnbyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuZ2V0c3RyaW5nKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy9UaGlzIGZ1bmN0aW9uIGlzIHRvIGJpbmQgdGhlIGRlY3JlYXNlIGFuZCBpbmNyZWFzZSBmdW5jdGlvbiB3aXRoIHRoZSBhcnJvdyBrZXlzXG4gICAgICAgICRzY29wZS5rZXlCaW5kID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAkc2NvcGUucHJlc3NlZCA9IGV2LndoaWNoO1xuICAgICAgICAgICAgLy9JZiBhcnJvdyBrZXkoTGVmdCBvciBEb3duKSBpcyBwcmVzc2VkIHRoZW4gY2FsbCB0aGUgZGVjcmVhc2UoKSBmdW5jdGlvbiB0byBkZWNyZWFzZSB0aGUgdmFsdWUuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnByZXNzZWQgPT09IDM3IHx8ICRzY29wZS5wcmVzc2VkID09PSA0MCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kZWNyZWFzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9zYW1lIGFzIGFib3ZlIGJ1dCBmb3IgVXAgb3IgUmlnaHQgdG8gaW5jcmVhc2UgdGhlIHZhbHVlLlxuICAgICAgICAgICAgaWYgKCRzY29wZS5wcmVzc2VkID09PSAzOCB8fCAkc2NvcGUucHJlc3NlZCA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy9jaGVja3MgYm91bmRzIHdoZW4gYXR0ZW1wdGluZyB0byBkZWNyZWFzZSB0aGUgdmFsdWVcbiAgICAgICAgJHNjb3BlLmRlY3JlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS52YWx1ZSA+ICRzY29wZS5taW4pIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2xpZGVyWyRzY29wZS52YWx1ZSAtIDFdID0gJy0nO1xuICAgICAgICAgICAgICAgICRzY29wZS52YWx1ZSA9ICRzY29wZS52YWx1ZSAtIDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNsaWRlclskc2NvcGUudmFsdWUgLSAxXSA9ICdvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5nZXRzdHJpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldHN0cmluZyA9IGZ1bmN0aW9uICgpIHsgIC8vZnVuY3Rpb24gdGFrZXMgdGhlIHNsaWRlciBhcnJheSBhbmQgY3JlYXRlcyBhIHN0cmluZyBvZiB0aGUgY29udGVudHMuIFxuICAgICAgICAgICAgJHNjb3BlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICAvL2NoYW5nZWQgdG8gdGhlIGFuZ3VsYXIgZm9yRWFjaCBsb29wIGZvciByZWFkYWJpbGl0eVxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5zbGlkZXIsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0cmluZyArPSBpdGVtO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9O1xuXG4gICAgfV0pLmRpcmVjdGl2ZSgnYm9zc3lTbGlkZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTbGlkZXJDb250cm9sbGVyJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGJ1dHRvbiBuZy1jbGljaz1cImRlY3JlYXNlKClcIiBuZy1rZXlkb3duPVwia2V5QmluZCgkZXZlbnQpXCI+LTwvYnV0dG9uPjxzcGFuPnt7c3RyaW5nfX08L3NwYW4+PGJ1dHRvbiBuZy1jbGljaz1cImluY3JlYXNlKClcIiBuZy1rZXlkb3duPVwia2V5QmluZCgkZXZlbnQpXCI+KzwvYnV0dG9uPjxwPlRoZSB2YWx1ZSBpcyB7e3ZhbHVlfX0hPC9wPicsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7IiwiIGFuZ3VsYXIubW9kdWxlKCdib3NzeS50b29sdGlwJywgW10pXG5cdC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcblx0XHQkdGVtcGxhdGVDYWNoZS5wdXQoJ2phc21pbmVUZXN0Lmh0bWwnLCAnamFzbWluZVRlc3QuaHRtbCcpO1xuXHR9KVxuXHRcblx0LmZhY3RvcnkoJ2Jvc3N5VG9vbHRpcEZhY3RvcnknLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0X29wdGlvbnM6IHtcblx0XHRcdFx0dGl0bGU6ICdmYWN0b3J5IHRpdGxlJyxcblx0XHRcdFx0Y29udGVudDogJ2ZhY3RvcnkgY29udGVudCdcblx0XHRcdH1cblx0XHR9XG5cdH0pXG5cdFxuXHQuZGlyZWN0aXZlKCdib3NzeVRvb2x0aXAnLCBmdW5jdGlvbigkY29tcGlsZSwgJGh0dHAgLyokZGF0YSwqLyAvKiRzY2hlbWEqLykge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0VBJyxcblx0XHRcdHJlcGxhY2U6IHRydWUsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2Jvc3N5LnRvb2x0aXAuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOlsnJHNjb3BlJywgJ2Jvc3N5VG9vbHRpcEZhY3RvcnknLCBmdW5jdGlvbigkc2NvcGUsIGJvc3N5VG9vbHRpcEZhY3RvcnkpIHtcblx0XHRcdFx0XHR0aGlzLl9vcHRpb25zID0ge1xuXHRcdFx0XHRcdHRpdGxlOiBib3NzeVRvb2x0aXBGYWN0b3J5Ll9vcHRpb25zLnRpdGxlLFxuXHRcdFx0XHRcdGNvbnRlbnQ6IGJvc3N5VG9vbHRpcEZhY3RvcnkuX29wdGlvbnMuY29udGVudFxuXHRcdFx0XHR9O1xuXHRcdFx0fV0sXG5cdFx0XHRjb250cm9sbGVyQXM6IFwidGlwc1wiXHRcdFxuXHRcdH07XG5cdH0pXG5cdFxuXHQvLyBEaXJlY3RpdmVzIG9uRW50ZXIgJiYgb25FeGl0IHVzZSBqUXVlcnlMaXRlIGRlcGVuZGVuY3lcblx0LmRpcmVjdGl2ZSgnb25FbnRlcicsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuXHRcdFx0ZWxlbWVudC5iaW5kKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiSSdtIGluIHlvdVwiKTtcblx0XHRcdH0pXG5cdFx0fVxuXHR9KVxuXHRcblx0LmRpcmVjdGl2ZSgnb25FeGl0JywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG5cdFx0XHRlbGVtZW50LmJpbmQoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJJJ20gb3V0dGEgaGVyZVwiKTtcblx0XHRcdH0pXG5cdFx0fVxuXHR9KVxuXHQiLCIvKiBnbG9iYWwgZXhwZWN0OnRydWUgKi9cblxudmFyIGNoYWkgPSByZXF1aXJlKCdjaGFpJyksXG5cdGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xuIiwiLy8gS2FybWEgY29uZmlndXJhdGlvblxuLy8gR2VuZXJhdGVkIG9uIFN1biBTZXAgMTQgMjAxNCAxMDoxNTo0OSBHTVQtMDcwMCAoUERUKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICBjb25maWcuc2V0KHtcblxuICAgIC8vIGJhc2UgcGF0aCB0aGF0IHdpbGwgYmUgdXNlZCB0byByZXNvbHZlIGFsbCBwYXR0ZXJucyAoZWcuIGZpbGVzLCBleGNsdWRlKVxuICAgIGJhc2VQYXRoOiAnJyxcblxuXG4gICAgLy8gZnJhbWV3b3JrcyB0byB1c2VcbiAgICAvLyBhdmFpbGFibGUgZnJhbWV3b3JrczogaHR0cHM6Ly9ucG1qcy5vcmcvYnJvd3NlL2tleXdvcmQva2FybWEtYWRhcHRlclxuICAgIGZyYW1ld29ya3M6IFsnamFzbWluZSddLFxuXG5cbiAgICAvLyBsaXN0IG9mIGZpbGVzIC8gcGF0dGVybnMgdG8gbG9hZCBpbiB0aGUgYnJvd3NlclxuICAgIGZpbGVzOiBbXG5cbiAgICAgICdodHRwczovL2NvZGUuYW5ndWxhcmpzLm9yZy8xLjIuMjUvYW5ndWxhci5qcycsXG4gICAgICAnaHR0cHM6Ly9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy9hbmd1bGFyanMvMS4yLjI1L2FuZ3VsYXIubWluLmpzJyxcbiAgICAgICdodHRwczovL2NvZGUuYW5ndWxhcmpzLm9yZy8xLjIuMjUvYW5ndWxhci1tb2Nrcy5qcycsXG4gICAgICAnLi8uLi9kZW1vL3B1YmxpYy9qYXZhc2NyaXB0cy8qLmpzJyxcbiAgICAgICcuLy4uL3NyYy8qLmpzJyxcbiAgICAgICcuLy4uL3NyYy9kaXJlY3RpdmVzL3RlbXBsYXRlcy8qLmh0bWwnLFxuICAgICAgJy4vLi4vc3JjL2RpcmVjdGl2ZXMvKi5qcycsXG4gICAgICAnLi9kaXJlY3RpdmVzLyouanMnXG5cbiAgICBdLFxuXG5cbiAgICAvLyBsaXN0IG9mIGZpbGVzIHRvIGV4Y2x1ZGVcbiAgICBleGNsdWRlOiBbXG4gICAgXSxcblxuXG4gICAgLy8gcHJlcHJvY2VzcyBtYXRjaGluZyBmaWxlcyBiZWZvcmUgc2VydmluZyB0aGVtIHRvIHRoZSBicm93c2VyXG4gICAgLy8gYXZhaWxhYmxlIHByZXByb2Nlc3NvcnM6IGh0dHBzOi8vbnBtanMub3JnL2Jyb3dzZS9rZXl3b3JkL2thcm1hLXByZXByb2Nlc3NvclxuICAgIHByZXByb2Nlc3NvcnM6IHtcbiAgICAgICAgJy4vLi4vc3JjL2RpcmVjdGl2ZXMvdGVtcGxhdGVzLyouaHRtbCc6WyduZy1odG1sMmpzJ11cbiAgICB9LFxuXG4gICAgbmdIdG1sMkpzUHJlcHJvY2Vzc29yOiB7XG4gICAgICAgIC8vc3RyaXBQcmVmaXg6Jy4vLi4vJ1xuICAgICBtb2R1bGVOYW1lOiAnVGVtcGxhdGVzJyxcbiAgIFxuICAgIH0sXG5cbiAgICAvLyB0ZXN0IHJlc3VsdHMgcmVwb3J0ZXIgdG8gdXNlXG4gICAgLy8gcG9zc2libGUgdmFsdWVzOiAnZG90cycsICdwcm9ncmVzcydcbiAgICAvLyBhdmFpbGFibGUgcmVwb3J0ZXJzOiBodHRwczovL25wbWpzLm9yZy9icm93c2Uva2V5d29yZC9rYXJtYS1yZXBvcnRlclxuICAgIHJlcG9ydGVyczogWydwcm9ncmVzcyddLFxuXG5cbiAgICAvLyB3ZWIgc2VydmVyIHBvcnRcbiAgICBwb3J0OiA5ODc2LFxuXG5cbiAgICAvLyBlbmFibGUgLyBkaXNhYmxlIGNvbG9ycyBpbiB0aGUgb3V0cHV0IChyZXBvcnRlcnMgYW5kIGxvZ3MpXG4gICAgY29sb3JzOiB0cnVlLFxuXG5cbiAgICAvLyBsZXZlbCBvZiBsb2dnaW5nXG4gICAgLy8gcG9zc2libGUgdmFsdWVzOiBjb25maWcuTE9HX0RJU0FCTEUgfHwgY29uZmlnLkxPR19FUlJPUiB8fCBjb25maWcuTE9HX1dBUk4gfHwgY29uZmlnLkxPR19JTkZPIHx8IGNvbmZpZy5MT0dfREVCVUdcbiAgICBsb2dMZXZlbDogY29uZmlnLkxPR19JTkZPLFxuXG5cbiAgICAvLyBlbmFibGUgLyBkaXNhYmxlIHdhdGNoaW5nIGZpbGUgYW5kIGV4ZWN1dGluZyB0ZXN0cyB3aGVuZXZlciBhbnkgZmlsZSBjaGFuZ2VzXG4gICAgYXV0b1dhdGNoOiB0cnVlLFxuXG5cbiAgICAvLyBzdGFydCB0aGVzZSBicm93c2Vyc1xuICAgIC8vIGF2YWlsYWJsZSBicm93c2VyIGxhdW5jaGVyczogaHR0cHM6Ly9ucG1qcy5vcmcvYnJvd3NlL2tleXdvcmQva2FybWEtbGF1bmNoZXJcbiAgICBicm93c2VyczogWydDaHJvbWUnXSxcblxuXG4gICAgLy8gQ29udGludW91cyBJbnRlZ3JhdGlvbiBtb2RlXG4gICAgLy8gaWYgdHJ1ZSwgS2FybWEgY2FwdHVyZXMgYnJvd3NlcnMsIHJ1bnMgdGhlIHRlc3RzIGFuZCBleGl0c1xuICAgIHNpbmdsZVJ1bjogZmFsc2VcbiAgfSk7XG59O1xuIiwiZGVzY3JpYmUoJ2Jvc3N5SW5wdXQnLCBmdW5jdGlvbigpIHtcblx0dmFyIGVsZW1lbnQsXG5cdFx0c2NvcGUsXG5cdFx0Y29tcGlsZSxcblx0XHR2YWw7XG5cblxuXHRiZWZvcmVFYWNoKG1vZHVsZSgnVGVtcGxhdGVzJykpO1xuXHRiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkY29tcGlsZSwkcm9vdFNjb3BlKXtcblx0XHRzY29wZSA9ICRyb290U2NvcGU7XG5cdFx0Y29tcGlsZSA9ICRjb21waWxlO1xuXHRcdHZhbCA9IHRydWU7XG5cdFx0ZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgnPGJvc3N5LWlucHV0IHRpdGxlID0gXCJTYW1wbGUgQm9zc3kgSW5wdXRcIj5Cb3NzeSBJbnB1dDwvYm9zc3ktaW5wdXQ+Jyk7XG5cdFx0JGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuXHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xuXHR9KSk7XG5cblx0aXQoJ3Nob3VsZCBhZGQgYm9zc3kgaW5wdXQnLGZ1bmN0aW9uKCl7XG5cdFx0ZXhwZWN0KGVsZW1lbnQudGV4dCgpKS50b01hdGNoKCdCb3NzeSBJbnB1dCcpO1xuXHRcdGV4cGVjdChlbGVtZW50LmF0dHIoJ3RpdGxlJykpLnRvTWF0Y2goJ1NhbXBsZSBCb3NzeSBJbnB1dCcpO1xuXHR9KTtcblxufSk7IiwiZGVzY3JpYmUoJ2Jvc3N5U2NoZW1hIHRlc3QnLCBmdW5jdGlvbigpe1xuXG5cdHZhciBzY2hlbWFTZXJ2aWNlLFxuXHRcdHJvb3RTY29wZSxcblx0XHRkZWZlcnJlZDtcblx0YmVmb3JlRWFjaChtb2R1bGUoJ1RlbXBsYXRlcycpKTtcblx0YmVmb3JlRWFjaChtb2R1bGUoJ2Jvc3N5LnNjaGVtYScpKTtcblx0YmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRzY2hlbWFfLCBfJHJvb3RTY29wZV8sIF8kcV8pIHtcblx0XHRzY2hlbWFTZXJ2aWNlID0gXyRzY2hlbWFfO1xuXHRcdHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcblxuXHRcdGRlZmVycmVkID0gXyRxXy5kZWZlcigpO1xuXHRcdGRlZmVycmVkLnJlc29sdmUoJ2RhdGEnKTtcblx0XHRzcHlPbihzY2hlbWFTZXJ2aWNlLCdnZXRTY2hlbWEnKS5hbmRSZXR1cm4oZGVmZXJyZWQucHJvbWlzZSk7XG5cdH0pKTtcblxuXHRpdCgnc2hvdWxkIGNhbGwgZ2V0U2NoZW1hIGZ1bmN0aW9uJyxmdW5jdGlvbigpe1xuXHRcdHNjaGVtYVNlcnZpY2UuZ2V0U2NoZW1hKCk7XG5cdFx0ZXhwZWN0KHNjaGVtYVNlcnZpY2UuZ2V0U2NoZW1hKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgpO1xuXHR9KTtcblxuXHRpdCgnZ2V0U2NoZW1hIHNob3VsZCBiZSBjYWxsZWQgd2l0aCBhcmd1bWVudHMnLGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHggPXNjaGVtYVNlcnZpY2UuZ2V0U2NoZW1hKCdhYmMnKTtcblx0XHRleHBlY3Qoc2NoZW1hU2VydmljZS5nZXRTY2hlbWEpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdhYmMnKTtcblx0fSk7XG5cdHZhciBpbnB1dCA9IHtcblx0XHR0aXRsZTogJ0xvZ2luIEZvcm0nLFxuXHRcdHR5cGU6ICdvYmplY3QnLFxuXHRcdHByb3BlcnRpZXM6IHtcblx0XHRcdHRpdGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHR0YWc6ICdib3NzeS1sYWJlbCcsXG5cdFx0XHRcdHRpdGxlOiAnTG9naW4gdG8gZW50ZXInLFxuXHRcdFx0fSxcblx0XHRcdHRlcm1zOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0dGFnOiAnYm9zc3ktcmFkaW8nLFxuXHRcdFx0XHR0aXRsZTogJ0FjY2VwdCB0ZXJtcyBhbmQgY29uZGl0aW9ucydcblx0XHRcdH0sXG5cdFx0XHR1c2VybmFtZToge1xuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0dGFnOiAnYm9zc3ktaW5wdXQtdGV4dCcsXG5cdFx0XHRcdHRpdGxlOiAnVXNlcm5hbWUnXG5cdFx0XHR9LFxuXHRcdFx0Z2VuZGVyOiB7XG5cdFx0XHRcdHRpdGxlOiAnR2VuZGVyJyxcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGVudW06IFsnZmVtYWxlJywgJ21hbGUnXVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVxdWlyZWQ6IFsndGVybXMnLCAnZ2VuZGVyJywgJ3VzZXJuYW1lJ11cblx0fTtcblxuXHRpdCgnZ2V0U2NoZW1hIHNob3VsZCByZXR1cm4gdmFsaWQgZGF0YScsZnVuY3Rpb24oKXtcblx0XHR2YXIgeCA9IHNjaGVtYVNlcnZpY2UuZ2V0U2NoZW1hKGlucHV0KTtcblx0XHRyb290U2NvcGUuJGFwcGx5KCk7XG5cdFx0ZXhwZWN0KHNjaGVtYVNlcnZpY2UuZ2V0U2NoZW1hKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpbnB1dCk7XG5cdFx0ZXhwZWN0KHgpLnRvTWF0Y2goaW5wdXQpO1xuXHR9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==