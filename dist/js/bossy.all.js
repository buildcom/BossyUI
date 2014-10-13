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
	beforeEach(module('app.factory.bossy.schema'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuZGF0YS5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5LnNjaGVtYS5qcyIsImluZGV4LmpzIiwia2FybWEuY29uZi5qcyIsImRpcmVjdGl2ZXMvYm9zc3kuaW5wdXQuc3BlYy5qcyIsImRpcmVjdGl2ZXMvYm9zc3kuc2NoZW1hLnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYm9zc3kuYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBib3NzeS5qc1xuICovXG5cbi8qIVxuICogaHR0cDovL0Jvc3N5VUkuY29tL1xuICpcbiAqIEJvc3N5VUkgLSBDcmVhdGVkIHdpdGggTE9WRSBieSBCdWlsZC5jb20gT3BlbiBTb3VyY2UgQ29uc29ydGl1bVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gUGxlYXNlIHNlZSBMSUNFTlNFIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqL1xuXG4vL1RPRE86IG5lZWQgbGF5b3V0LCBsYWJlbHNcbnZhciBib3NzeSA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeScsIFtcbiAgICAgICAgJ2Jvc3N5LmRhdGEnLFxuICAgICAgICAnYm9zc3kuc2NoZW1hJyxcbiAgICAgICAgJ2Jvc3N5LmZvcm0nLFxuICAgICAgICAnYm9zc3kuaW5wdXQnXG4gICAgXVxuKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kYXRhJywgW10pXG4vKipcbkBuZ2RvYyBzZXJ2aWNlXG5AbmFtZSAkZGF0YVxuQHJlcXVpcmVzICRxXG5AcmVxdWlyZXMgJGh0dHBcblxuKi9cbiAgICAuZmFjdG9yeSgnJGRhdGEnLCBbJyRxJywnJGh0dHAnLGZ1bmN0aW9uICgkcSwkaHR0cCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXREYXRhIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlRGF0YShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0RGF0YSggZGF0YS5jYWxsKCRzY29wZSkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gZGF0YSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlRGF0YShkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoIGRhdGEsIHsgcmVzcG9uc2VUeXBlOiAnanNvbicgfSApXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2UgZGF0YSBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihyZXNwb25zZV9kYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgZGF0YSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgQG5nZG9jIG1ldGhvZFxuICAgICAgICAgICAgQG5hbWUgZ2V0RGF0YVxuICAgICAgICAgICAgQG1ldGhvZE9mICRkYXRhXG4gICAgICAgICAgICBAcGFyYW0ge3N0cmluZyxvYmplY3QsZnVuY3Rpb259IGRhdGEgSWYgZGF0YSBpcyBhIHN0cmluZywgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGEgdXJsIHRvIHJldHJpZXZlIGRhdGEgZnJvbS4gSWYgZGF0YSBpcyBhbiBvYmplY3QgaXQgd2lsbCBiZSBpbW1lZGlhdGVseSByZXR1cm5lZC4gSWYgZGF0YSBpcyBhIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYW5kIHByb2Nlc3NlZCB1bnRpbCBhbiBvYmplY3QgaXMgcHJvZHVjZWRcbiAgICAgICAgICAgIEByZXR1cm5zIHtPYmplY3R9IEVpdGhlciBhICRxIHByb21pc2UsIGEgZGF0YSBvYmplY3Qgb3IgYSBzdHJpbmcuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ2V0RGF0YTogX2dldERhdGFcbiAgICAgICAgfTtcbiAgICB9XSlcbjtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5mb3JtJywgW10pXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICd0ZW1wbGF0ZXMvYm9zc3ktaW5wdXQuaHRtbCcpO1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lGb3JtJyxbJyRjb21waWxlJywnJGh0dHAnLCckc2NoZW1hJywnJGRhdGEnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSkge1xuICAgICAgICB2YXIgX3NjaGVtYSxcbiAgICAgICAgICAgIF9kYXRhLFxuICAgICAgICAgICAgX29wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgc2hvd0xhYmVsczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdUaGlzIGlzIGhlYWRlcicsXG4gICAgICAgICAgICAgICAgZm9vdGVyOiAnVGhpcyBpcyBmb290ZXInLFxuICAgICAgICAgICAgICAgIHRoZW1lOiAnZ3JlZW4nLFxuICAgICAgICAgICAgICAgIGJ1dHRvbjogJ1NhdmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2l0ZW1UZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBudW1iZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aW5wdXQgdHlwZT1cIm51bWJlclwiLz4nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKG9iaiwga2V5LCBpc19yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxib3NzeS1pbnB1dCB0aXRsZT1cIlxcJycrb2JqLnRpdGxlKydcXCdcIiB0eXBlPVwiXFwnJysgb2JqLmlucHV0X3R5cGUgKydcXCdcIiB2YWx1ZT1cIlxcJycrX2RhdGEuYWRkcmVzc1trZXldKydcXCdcIicgKyAoIGlzX3JlcXVpcmVkID8gJyByZXF1aXJlZCcgOiAnJyApICsgJz48L2Jvc3N5LWlucHV0Pic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzx0ZXh0YXJlYT48L3RleHRhcmVhPic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGVja2JveDogZnVuY3Rpb24ob2JqKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiPicrb2JqLnRpdGxlKyc8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGF0YS5nZXREYXRhKGRhdGEpO1xuICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LnRoZW4gKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5jYXRjaCApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmZpbmFsbHkgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0U2NoZW1hKHNjaGVtYSkge1xuICAgICAgICAgICAgX3NjaGVtYSA9ICRzY2hlbWEuZ2V0U2NoZW1hKHNjaGVtYSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBidWlsZFRlbXBsYXRlKHNjaGVtYVBhcnQsIHBhcmVudEtleSwgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9ICcnLFxuICAgICAgICAgICAgICAgIGZ1bGxLZXkgPSAnJztcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY2hlbWFQYXJ0LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnVsbEtleSArICcgaXMgJysgdmFsdWUudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWlyZWRfbGlzdCA9IHR5cGVvZiggdmFsdWUucmVxdWlyZWQgKSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZS5yZXF1aXJlZCA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gYnVpbGRUZW1wbGF0ZSh2YWx1ZS5wcm9wZXJ0aWVzLCBmdWxsS2V5LCByZXF1aXJlZF9saXN0ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gYnVpbGRUZW1wbGF0ZSh2YWx1ZS5pdGVtcy5wcm9wZXJ0aWVzLCBmdWxsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcicgfHwgJ2ludGVnZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUubnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzX3JlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHJlcXVpcmVkICYmIHJlcXVpcmVkLmluZGV4T2Yoa2V5KSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzX3JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS50ZXh0KHZhbHVlLCBrZXksIGlzX3JlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUuY2hlY2tib3godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJycsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGNvbmZpZzonPScsIC8vQ3JlYXRlIHNjb3BlIGlzb2xhdGlvbiB3aXRoIGJpLWRpcmVjdGlvbmFsIGJpbmRpbmcsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoX29wdGlvbnMsIHNjb3BlLmNvbmZpZy5vcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gc2V0RGF0YShzY29wZS5jb25maWcuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2V0U2NoZW1hKHNjb3BlLmNvbmZpZy5zY2hlbWEpO1xuICAgICAgICAgICAgICAgIGlmKCBwcm9taXNlICkge1xuICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGluZyBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmFubmVyIHBhZ2UtaGVhZGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuaGVhZGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFRlbXBsYXRlKF9zY2hlbWEpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhZ2UtZm9vdGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuZm9vdGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Zvcm0+J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGVycm9yIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj5MT0FESU5HLi4uPC9mb3JtPidcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhbm5lciBwYWdlLWhlYWRlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmhlYWRlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmZvb3Rlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9XSlcbjsiLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuaW5wdXQnLCBbXSlcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvc3N5LWlucHV0XCI+PGxhYmVsIGZvcj1cIlwiPnt7dGl0bGV9fTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cInt7dmFsdWV9fVwiLz48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XG4gICAgfSlcbiAgICAuZGlyZWN0aXZlKCdib3NzeUlucHV0JyxbJyRjb21waWxlJywnJGh0dHAnLCckc2NoZW1hJywnJGRhdGEnLCckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhLCAkdGVtcGxhdGVDYWNoZSkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRyZXBsYWNlOiB0cnVlLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0dGl0bGU6ICc9Jyxcblx0XHRcdFx0dmFsdWU6ICc9Jyxcblx0XHRcdFx0dHlwZTogJz0nLFxuXHRcdFx0XHRyZXF1aXJlZDogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6ICR0ZW1wbGF0ZUNhY2hlLmdldCgnYm9zc3ktaW5wdXQuaHRtbCcpXG5cdFx0fTtcbiAgICB9XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuc2NoZW1hJywgW10pXG4gICAgLmZhY3RvcnkoJyRzY2hlbWEnLCBbJyRxJywgJyRodHRwJywgZnVuY3Rpb24gKCRxLCAkaHR0cCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRTY2hlbWEgKHNjaGVtYSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlU2NoZW1hKHNjaGVtYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBubyBzY2hlbWEgdXJsIG9yIG9iamVjdCBnaXZlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCggc2NoZW1hIClcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIGRpZCBub3QgcHJvZHVjZSBzY2hlbWEgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lcnJvciggZnVuY3Rpb24oZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIFwiJyArIHNjaGVtYSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldFNjaGVtYTogX2dldFNjaGVtYVxuICAgICAgICB9O1xuICAgIH1dKVxuO1xuIiwiLyogZ2xvYmFsIGV4cGVjdDp0cnVlICovXG5cbnZhciBjaGFpID0gcmVxdWlyZSgnY2hhaScpLFxuXHRleHBlY3QgPSBjaGFpLmV4cGVjdDtcbiIsIi8vIEthcm1hIGNvbmZpZ3VyYXRpb25cbi8vIEdlbmVyYXRlZCBvbiBTdW4gU2VwIDE0IDIwMTQgMTA6MTU6NDkgR01ULTA3MDAgKFBEVClcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgY29uZmlnLnNldCh7XG5cbiAgICAvLyBiYXNlIHBhdGggdGhhdCB3aWxsIGJlIHVzZWQgdG8gcmVzb2x2ZSBhbGwgcGF0dGVybnMgKGVnLiBmaWxlcywgZXhjbHVkZSlcbiAgICBiYXNlUGF0aDogJycsXG5cblxuICAgIC8vIGZyYW1ld29ya3MgdG8gdXNlXG4gICAgLy8gYXZhaWxhYmxlIGZyYW1ld29ya3M6IGh0dHBzOi8vbnBtanMub3JnL2Jyb3dzZS9rZXl3b3JkL2thcm1hLWFkYXB0ZXJcbiAgICBmcmFtZXdvcmtzOiBbJ2phc21pbmUnXSxcblxuXG4gICAgLy8gbGlzdCBvZiBmaWxlcyAvIHBhdHRlcm5zIHRvIGxvYWQgaW4gdGhlIGJyb3dzZXJcbiAgICBmaWxlczogW1xuXG4gICAgICAnaHR0cHM6Ly9jb2RlLmFuZ3VsYXJqcy5vcmcvMS4yLjI1L2FuZ3VsYXIuanMnLFxuICAgICAgJ2h0dHBzOi8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvYW5ndWxhcmpzLzEuMi4yNS9hbmd1bGFyLm1pbi5qcycsXG4gICAgICAnaHR0cHM6Ly9jb2RlLmFuZ3VsYXJqcy5vcmcvMS4yLjI1L2FuZ3VsYXItbW9ja3MuanMnLFxuICAgICAgJy4vLi4vZGVtby9wdWJsaWMvamF2YXNjcmlwdHMvKi5qcycsXG4gICAgICAnLi8uLi9zcmMvKi5qcycsXG4gICAgICAnLi8uLi9zcmMvZGlyZWN0aXZlcy90ZW1wbGF0ZXMvKi5odG1sJyxcbiAgICAgICcuLy4uL3NyYy9kaXJlY3RpdmVzLyouanMnLFxuICAgICAgJy4vZGlyZWN0aXZlcy8qLmpzJ1xuXG4gICAgXSxcblxuXG4gICAgLy8gbGlzdCBvZiBmaWxlcyB0byBleGNsdWRlXG4gICAgZXhjbHVkZTogW1xuICAgIF0sXG5cblxuICAgIC8vIHByZXByb2Nlc3MgbWF0Y2hpbmcgZmlsZXMgYmVmb3JlIHNlcnZpbmcgdGhlbSB0byB0aGUgYnJvd3NlclxuICAgIC8vIGF2YWlsYWJsZSBwcmVwcm9jZXNzb3JzOiBodHRwczovL25wbWpzLm9yZy9icm93c2Uva2V5d29yZC9rYXJtYS1wcmVwcm9jZXNzb3JcbiAgICBwcmVwcm9jZXNzb3JzOiB7XG4gICAgICAgICcuLy4uL3NyYy9kaXJlY3RpdmVzL3RlbXBsYXRlcy8qLmh0bWwnOlsnbmctaHRtbDJqcyddXG4gICAgfSxcblxuICAgIG5nSHRtbDJKc1ByZXByb2Nlc3Nvcjoge1xuICAgICAgICAvL3N0cmlwUHJlZml4OicuLy4uLydcbiAgICAgbW9kdWxlTmFtZTogJ1RlbXBsYXRlcycsXG4gICBcbiAgICB9LFxuXG4gICAgLy8gdGVzdCByZXN1bHRzIHJlcG9ydGVyIHRvIHVzZVxuICAgIC8vIHBvc3NpYmxlIHZhbHVlczogJ2RvdHMnLCAncHJvZ3Jlc3MnXG4gICAgLy8gYXZhaWxhYmxlIHJlcG9ydGVyczogaHR0cHM6Ly9ucG1qcy5vcmcvYnJvd3NlL2tleXdvcmQva2FybWEtcmVwb3J0ZXJcbiAgICByZXBvcnRlcnM6IFsncHJvZ3Jlc3MnXSxcblxuXG4gICAgLy8gd2ViIHNlcnZlciBwb3J0XG4gICAgcG9ydDogOTg3NixcblxuXG4gICAgLy8gZW5hYmxlIC8gZGlzYWJsZSBjb2xvcnMgaW4gdGhlIG91dHB1dCAocmVwb3J0ZXJzIGFuZCBsb2dzKVxuICAgIGNvbG9yczogdHJ1ZSxcblxuXG4gICAgLy8gbGV2ZWwgb2YgbG9nZ2luZ1xuICAgIC8vIHBvc3NpYmxlIHZhbHVlczogY29uZmlnLkxPR19ESVNBQkxFIHx8IGNvbmZpZy5MT0dfRVJST1IgfHwgY29uZmlnLkxPR19XQVJOIHx8IGNvbmZpZy5MT0dfSU5GTyB8fCBjb25maWcuTE9HX0RFQlVHXG4gICAgbG9nTGV2ZWw6IGNvbmZpZy5MT0dfSU5GTyxcblxuXG4gICAgLy8gZW5hYmxlIC8gZGlzYWJsZSB3YXRjaGluZyBmaWxlIGFuZCBleGVjdXRpbmcgdGVzdHMgd2hlbmV2ZXIgYW55IGZpbGUgY2hhbmdlc1xuICAgIGF1dG9XYXRjaDogdHJ1ZSxcblxuXG4gICAgLy8gc3RhcnQgdGhlc2UgYnJvd3NlcnNcbiAgICAvLyBhdmFpbGFibGUgYnJvd3NlciBsYXVuY2hlcnM6IGh0dHBzOi8vbnBtanMub3JnL2Jyb3dzZS9rZXl3b3JkL2thcm1hLWxhdW5jaGVyXG4gICAgYnJvd3NlcnM6IFsnQ2hyb21lJ10sXG5cblxuICAgIC8vIENvbnRpbnVvdXMgSW50ZWdyYXRpb24gbW9kZVxuICAgIC8vIGlmIHRydWUsIEthcm1hIGNhcHR1cmVzIGJyb3dzZXJzLCBydW5zIHRoZSB0ZXN0cyBhbmQgZXhpdHNcbiAgICBzaW5nbGVSdW46IGZhbHNlXG4gIH0pO1xufTtcbiIsImRlc2NyaWJlKCdib3NzeUlucHV0JywgZnVuY3Rpb24oKSB7XG5cdHZhciBlbGVtZW50LFxuXHRcdHNjb3BlLFxuXHRcdGNvbXBpbGUsXG5cdFx0dmFsO1xuXG5cblx0YmVmb3JlRWFjaChtb2R1bGUoJ1RlbXBsYXRlcycpKTtcblx0YmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbXBpbGUsJHJvb3RTY29wZSl7XG5cdFx0c2NvcGUgPSAkcm9vdFNjb3BlO1xuXHRcdGNvbXBpbGUgPSAkY29tcGlsZTtcblx0XHR2YWwgPSB0cnVlO1xuXHRcdGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJzxib3NzeS1pbnB1dCB0aXRsZSA9IFwiU2FtcGxlIEJvc3N5IElucHV0XCI+Qm9zc3kgSW5wdXQ8L2Jvc3N5LWlucHV0PicpO1xuXHRcdCRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcblx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcblx0fSkpO1xuXG5cdGl0KCdzaG91bGQgYWRkIGJvc3N5IGlucHV0JyxmdW5jdGlvbigpe1xuXHRcdGV4cGVjdChlbGVtZW50LnRleHQoKSkudG9NYXRjaCgnQm9zc3kgSW5wdXQnKTtcblx0XHRleHBlY3QoZWxlbWVudC5hdHRyKCd0aXRsZScpKS50b01hdGNoKCdTYW1wbGUgQm9zc3kgSW5wdXQnKTtcblx0fSk7XG5cbn0pOyIsImRlc2NyaWJlKCdib3NzeVNjaGVtYSB0ZXN0JywgZnVuY3Rpb24oKXtcblxuXHR2YXIgc2NoZW1hU2VydmljZSxcblx0XHRyb290U2NvcGUsXG5cdFx0ZGVmZXJyZWQ7XG5cdGJlZm9yZUVhY2gobW9kdWxlKCdUZW1wbGF0ZXMnKSk7XG5cdGJlZm9yZUVhY2gobW9kdWxlKCdhcHAuZmFjdG9yeS5ib3NzeS5zY2hlbWEnKSk7XG5cdGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kc2NoZW1hXywgXyRyb290U2NvcGVfLCBfJHFfKSB7XG5cdFx0c2NoZW1hU2VydmljZSA9IF8kc2NoZW1hXztcblx0XHRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG5cblx0XHRkZWZlcnJlZCA9IF8kcV8uZGVmZXIoKTtcblx0XHRkZWZlcnJlZC5yZXNvbHZlKCdkYXRhJyk7XG5cdFx0c3B5T24oc2NoZW1hU2VydmljZSwnZ2V0U2NoZW1hJykuYW5kUmV0dXJuKGRlZmVycmVkLnByb21pc2UpO1xuXHR9KSk7XG5cblx0aXQoJ3Nob3VsZCBjYWxsIGdldFNjaGVtYSBmdW5jdGlvbicsZnVuY3Rpb24oKXtcblx0XHRzY2hlbWFTZXJ2aWNlLmdldFNjaGVtYSgpO1xuXHRcdGV4cGVjdChzY2hlbWFTZXJ2aWNlLmdldFNjaGVtYSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoKTtcblx0fSk7XG5cblx0aXQoJ2dldFNjaGVtYSBzaG91bGQgYmUgY2FsbGVkIHdpdGggYXJndW1lbnRzJyxmdW5jdGlvbigpe1xuXHRcdHZhciB4ID1zY2hlbWFTZXJ2aWNlLmdldFNjaGVtYSgnYWJjJyk7XG5cdFx0ZXhwZWN0KHNjaGVtYVNlcnZpY2UuZ2V0U2NoZW1hKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnYWJjJyk7XG5cdH0pO1xuXHR2YXIgaW5wdXQgPSB7XG5cdFx0dGl0bGU6ICdMb2dpbiBGb3JtJyxcblx0XHR0eXBlOiAnb2JqZWN0Jyxcblx0XHRwcm9wZXJ0aWVzOiB7XG5cdFx0XHR0aXRsZToge1xuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0dGFnOiAnYm9zc3ktbGFiZWwnLFxuXHRcdFx0XHR0aXRsZTogJ0xvZ2luIHRvIGVudGVyJyxcblx0XHRcdH0sXG5cdFx0XHR0ZXJtczoge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdHRhZzogJ2Jvc3N5LXJhZGlvJyxcblx0XHRcdFx0dGl0bGU6ICdBY2NlcHQgdGVybXMgYW5kIGNvbmRpdGlvbnMnXG5cdFx0XHR9LFxuXHRcdFx0dXNlcm5hbWU6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdHRhZzogJ2Jvc3N5LWlucHV0LXRleHQnLFxuXHRcdFx0XHR0aXRsZTogJ1VzZXJuYW1lJ1xuXHRcdFx0fSxcblx0XHRcdGdlbmRlcjoge1xuXHRcdFx0XHR0aXRsZTogJ0dlbmRlcicsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRlbnVtOiBbJ2ZlbWFsZScsICdtYWxlJ11cblx0XHRcdH1cblx0XHR9LFxuXHRcdHJlcXVpcmVkOiBbJ3Rlcm1zJywgJ2dlbmRlcicsICd1c2VybmFtZSddXG5cdH07XG5cblx0aXQoJ2dldFNjaGVtYSBzaG91bGQgcmV0dXJuIHZhbGlkIGRhdGEnLGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHggPSBzY2hlbWFTZXJ2aWNlLmdldFNjaGVtYShpbnB1dCk7XG5cdFx0cm9vdFNjb3BlLiRhcHBseSgpO1xuXHRcdGV4cGVjdChzY2hlbWFTZXJ2aWNlLmdldFNjaGVtYSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaW5wdXQpO1xuXHRcdGV4cGVjdCh4KS50b01hdGNoKGlucHV0KTtcblx0fSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=