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
        'app.factory.bossy.data',
        'app.factory.bossy.schema',
        'app.directive.bossy.form',
        'app.directive.bossy.input'
    ]
);

angular.module('app.factory.bossy.data', [])
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
            getData: _getData
        };
    }])
;

angular.module('app.directive.bossy.form', [])
    .run(function($templateCache){
        $templateCache.put('bossy-input.html', 'templates/bossy-input.html');
    })
    .directive('bossyForm', function ($compile, $http, $schema, $data) {
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

    })
;
angular.module('app.directive.bossy.input', [])
    .run(function($templateCache){
        $templateCache.put('bossy-input.html', '<div class="form-group bossy-input"><label for="">{{title}}</label><input type="{{type}}" class="form-control" placeholder="" value="{{value}}"/><span></span></div>');
    })
    .directive('bossyInput', function ($compile, $http, $schema, $data, $templateCache) {
    	return {
			restrict: "E",
			replace: true,
			scope: {
				title: "=",
				value: "=",
				type: "=",
				required: "="
			},
			template: $templateCache.get('bossy-input.html')
		};
    });
angular.module('app.factory.bossy.schema', [])
    .factory('$schema', function () {

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

        function _getRemoteSchema() {
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
    })
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuZGF0YS5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5LnNjaGVtYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYm9zc3kuYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcbiAqIGJvc3N5LmpzXHJcbiAqL1xyXG5cclxuLyohXHJcbiAqIGh0dHA6Ly9Cb3NzeVVJLmNvbS9cclxuICpcclxuICogQm9zc3lVSSAtIENyZWF0ZWQgd2l0aCBMT1ZFIGJ5IEJ1aWxkLmNvbSBPcGVuIFNvdXJjZSBDb25zb3J0aXVtXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gUGxlYXNlIHNlZSBMSUNFTlNFIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKi9cclxuXHJcbi8vVE9ETzogbmVlZCBsYXlvdXQsIGxhYmVsc1xyXG52YXIgYm9zc3kgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3knLCBbXHJcbiAgICAgICAgJ2FwcC5mYWN0b3J5LmJvc3N5LmRhdGEnLFxyXG4gICAgICAgICdhcHAuZmFjdG9yeS5ib3NzeS5zY2hlbWEnLFxyXG4gICAgICAgICdhcHAuZGlyZWN0aXZlLmJvc3N5LmZvcm0nLFxyXG4gICAgICAgICdhcHAuZGlyZWN0aXZlLmJvc3N5LmlucHV0J1xyXG4gICAgXVxyXG4pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmZhY3RvcnkuYm9zc3kuZGF0YScsIFtdKVxyXG4gICAgLmZhY3RvcnkoJyRkYXRhJywgWyckcScsJyRodHRwJyxmdW5jdGlvbiAoJHEsJGh0dHApIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldERhdGEgKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlRGF0YShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0RGF0YSggZGF0YS5jYWxsKCRzY29wZSkgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBubyBkYXRhIHVybCBvciBvYmplY3QgZ2l2ZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFJlbW90ZURhdGEoZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCBkYXRhLCB7IHJlc3BvbnNlVHlwZTogJ2pzb24nIH0gKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2UgZGF0YSBvYmplY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihyZXNwb25zZV9kYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIFwiJyArIGRhdGEgKyAnXCIgZmFpbGVkIHdpdGggc3RhdHVzIFwiJyArIHN0YXR1cyArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldERhdGE6IF9nZXREYXRhXHJcbiAgICAgICAgfTtcclxuICAgIH1dKVxyXG47XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlLmJvc3N5LmZvcm0nLCBbXSlcclxuICAgIC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xyXG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICd0ZW1wbGF0ZXMvYm9zc3ktaW5wdXQuaHRtbCcpO1xyXG4gICAgfSlcclxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5Rm9ybScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhKSB7XHJcbiAgICAgICAgdmFyIF9zY2hlbWEsXHJcbiAgICAgICAgICAgIF9kYXRhLFxyXG4gICAgICAgICAgICBfb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHNob3dMYWJlbHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdUaGlzIGlzIGhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICBmb290ZXI6ICdUaGlzIGlzIGZvb3RlcicsXHJcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2dyZWVuJyxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbjogJ1NhdmUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9pdGVtVGVtcGxhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIvPic7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKG9iaiwga2V5LCBpc19yZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGJvc3N5LWlucHV0IHRpdGxlPVwiXFwnJytvYmoudGl0bGUrJ1xcJ1wiIHR5cGU9XCJcXCcnKyBvYmouaW5wdXRfdHlwZSArJ1xcJ1wiIHZhbHVlPVwiXFwnJytfZGF0YS5hZGRyZXNzW2tleV0rJ1xcJ1wiJyArICggaXNfcmVxdWlyZWQgPyAnIHJlcXVpcmVkJyA6ICcnICkgKyAnPjwvYm9zc3ktaW5wdXQ+JztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPHRleHRhcmVhPjwvdGV4dGFyZWE+JztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveDogZnVuY3Rpb24ob2JqKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+JytvYmoudGl0bGUrJzwvbGFiZWw+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGF0YS5nZXREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiggYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQudGhlbiApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmNhdGNoICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuZmluYWxseSApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U2NoZW1hKHNjaGVtYSkge1xyXG4gICAgICAgICAgICBfc2NoZW1hID0gJHNjaGVtYS5nZXRTY2hlbWEoc2NoZW1hKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGUoc2NoZW1hUGFydCwgcGFyZW50S2V5LCByZXF1aXJlZCkge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSAnJyxcclxuICAgICAgICAgICAgICAgIGZ1bGxLZXkgPSAnJztcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjaGVtYVBhcnQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnVsbEtleSArICcgaXMgJysgdmFsdWUudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWlyZWRfbGlzdCA9IHR5cGVvZiggdmFsdWUucmVxdWlyZWQgKSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZS5yZXF1aXJlZCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLnByb3BlcnRpZXMsIGZ1bGxLZXksIHJlcXVpcmVkX2xpc3QgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLml0ZW1zLnByb3BlcnRpZXMsIGZ1bGxLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcicgfHwgJ2ludGVnZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS5udW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNfcmVxdWlyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCByZXF1aXJlZCAmJiByZXF1aXJlZC5pbmRleE9mKGtleSkgIT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzX3JlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUudGV4dCh2YWx1ZSwga2V5LCBpc19yZXF1aXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLmNoZWNrYm94KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZzonPScsIC8vQ3JlYXRlIHNjb3BlIGlzb2xhdGlvbiB3aXRoIGJpLWRpcmVjdGlvbmFsIGJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZChfb3B0aW9ucywgc2NvcGUuY29uZmlnLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gc2V0RGF0YShzY29wZS5jb25maWcuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBzZXRTY2hlbWEoc2NvcGUuY29uZmlnLnNjaGVtYSk7XHJcbiAgICAgICAgICAgICAgICBpZiggcHJvbWlzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGluZyBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGVkIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gZXJyb3Igc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPkxPQURJTkcuLi48L2Zvcm0+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctaWY9XCJjb25maWcub3B0aW9ucy5idXR0b25cIj57e2NvbmZpZy5vcHRpb25zLmJ1dHRvbn19PC9idXR0b24+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0pXHJcbjsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZS5ib3NzeS5pbnB1dCcsIFtdKVxyXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XHJcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvc3N5LWlucHV0XCI+PGxhYmVsIGZvcj1cIlwiPnt7dGl0bGV9fTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cInt7dmFsdWV9fVwiLz48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XHJcbiAgICB9KVxyXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lJbnB1dCcsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhLCAkdGVtcGxhdGVDYWNoZSkge1xyXG4gICAgXHRyZXR1cm4ge1xyXG5cdFx0XHRyZXN0cmljdDogXCJFXCIsXHJcblx0XHRcdHJlcGxhY2U6IHRydWUsXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0dGl0bGU6IFwiPVwiLFxyXG5cdFx0XHRcdHZhbHVlOiBcIj1cIixcclxuXHRcdFx0XHR0eXBlOiBcIj1cIixcclxuXHRcdFx0XHRyZXF1aXJlZDogXCI9XCJcclxuXHRcdFx0fSxcclxuXHRcdFx0dGVtcGxhdGU6ICR0ZW1wbGF0ZUNhY2hlLmdldCgnYm9zc3ktaW5wdXQuaHRtbCcpXHJcblx0XHR9O1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5mYWN0b3J5LmJvc3N5LnNjaGVtYScsIFtdKVxyXG4gICAgLmZhY3RvcnkoJyRzY2hlbWEnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRTY2hlbWEgKHNjaGVtYSkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhzY2hlbWEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qoc2NoZW1hKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBubyBzY2hlbWEgdXJsIG9yIG9iamVjdCBnaXZlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlU2NoZW1hKCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCBzY2hlbWEgKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2Ugc2NoZW1hIG9iamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZXJyb3IoIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgc2NoZW1hICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXRTY2hlbWE6IF9nZXRTY2hlbWFcclxuICAgICAgICB9O1xyXG4gICAgfSlcclxuO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=