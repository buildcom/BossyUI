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
        'bossy.form'
    ]
);

angular.module('bossy.data', [])
    .factory('$data', function () {

        function _getData (data) {
            if (angular.isString(data)) {
                return _getRemoteData(data);
            }
            else if (angular.isObject(data)) {
                return data;
            }
            else {
                //TODO: replace error message with online doc link like ng errors
                console.error('directive.bossyForm: no data url or object given');
            }
        }

        function _getRemoteData($q) {
            var deferred = $q.defer();

            $http.get( data )
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
        }
    })
;

angular.module('bossy.form', [])
    .directive('bossyForm', function ($compile, $http, $schema, $data) {
        var _schema,
            _data,
            _itemTemplate = {
                number: function () {
                    return '<input type="number" />'
                },
                text: function () {
                    return '<input type="text" />'
                },
                textArea: function () {
                    return '<textarea></textarea>'
                }
            };

        function setData(data) {
            _data = $data.getData(data);
        }

        function setSchema(schema) {
            _schema = $schema.getSchema(schema);
        }

        function buildTemplate(schemaPart, parentKey) {
            var template = '',
                fullKey = '';

            angular.forEach(schemaPart, function(value, key) {
                if (value.type) {
                    switch (value.type) {
                        case 'object':
                            console.log(fullKey + ' is object');
                            template += buildTemplate(value.properties, fullKey);
                            break;
                        case 'array':
                            console.log(fullKey + ' is array');
                            template += buildTemplate(value.items.properties, fullKey);
                            break;
                        case 'number' || 'integer':
                            console.log(fullKey + ' is number or integer');
                            template += _itemTemplate['number']();
                            break;
                        case 'string':
                            console.log(fullKey + ' is string');
                            template += _itemTemplate['text']();
                            break;
                    }
                }
            });

            return template;
        }

        return {
            restrict: 'E',
            replace: true,
            template: '',
            link: function (scope, element, attributes) {

                setData(scope.options.data);
                setSchema(scope.options.schema);

                element.html(buildTemplate(_schema));
                $compile(element.contents())(scope);
            }
        };

    })
;
angular.module('bossy.schema', [])
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
                        deferred.resolve(data);;
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
        }
    })
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuZGF0YS5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5zY2hlbWEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJvc3N5LmFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogYm9zc3kuanNcbiAqL1xuXG4vKiFcbiAqIGh0dHA6Ly9Cb3NzeVVJLmNvbS9cbiAqXG4gKiBCb3NzeVVJIC0gQ3JlYXRlZCB3aXRoIExPVkUgYnkgQnVpbGQuY29tIE9wZW4gU291cmNlIENvbnNvcnRpdW1cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuIFBsZWFzZSBzZWUgTElDRU5TRSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKi9cblxuLy9UT0RPOiBuZWVkIGxheW91dCwgbGFiZWxzXG52YXIgYm9zc3kgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3knLCBbXG4gICAgICAgICdib3NzeS5kYXRhJyxcbiAgICAgICAgJ2Jvc3N5LnNjaGVtYScsXG4gICAgICAgICdib3NzeS5mb3JtJ1xuICAgIF1cbik7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZGF0YScsIFtdKVxuICAgIC5mYWN0b3J5KCckZGF0YScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBmdW5jdGlvbiBfZ2V0RGF0YSAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZURhdGEoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IG5vIGRhdGEgdXJsIG9yIG9iamVjdCBnaXZlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldFJlbW90ZURhdGEoJHEpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCggZGF0YSApXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2UgZGF0YSBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihyZXNwb25zZV9kYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgZGF0YSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldERhdGE6IF9nZXREYXRhXG4gICAgICAgIH1cbiAgICB9KVxuO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmZvcm0nLCBbXSlcbiAgICAuZGlyZWN0aXZlKCdib3NzeUZvcm0nLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSkge1xuICAgICAgICB2YXIgX3NjaGVtYSxcbiAgICAgICAgICAgIF9kYXRhLFxuICAgICAgICAgICAgX2l0ZW1UZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBudW1iZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aW5wdXQgdHlwZT1cIm51bWJlclwiIC8+J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxpbnB1dCB0eXBlPVwidGV4dFwiIC8+J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGV4dEFyZWE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8dGV4dGFyZWE+PC90ZXh0YXJlYT4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcbiAgICAgICAgICAgIF9kYXRhID0gJGRhdGEuZ2V0RGF0YShkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldFNjaGVtYShzY2hlbWEpIHtcbiAgICAgICAgICAgIF9zY2hlbWEgPSAkc2NoZW1hLmdldFNjaGVtYShzY2hlbWEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZShzY2hlbWFQYXJ0LCBwYXJlbnRLZXkpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9ICcnLFxuICAgICAgICAgICAgICAgIGZ1bGxLZXkgPSAnJztcblxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjaGVtYVBhcnQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnVsbEtleSArICcgaXMgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gYnVpbGRUZW1wbGF0ZSh2YWx1ZS5wcm9wZXJ0aWVzLCBmdWxsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmdWxsS2V5ICsgJyBpcyBhcnJheScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IGJ1aWxkVGVtcGxhdGUodmFsdWUuaXRlbXMucHJvcGVydGllcywgZnVsbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInIHx8ICdpbnRlZ2VyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmdWxsS2V5ICsgJyBpcyBudW1iZXIgb3IgaW50ZWdlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGVbJ251bWJlciddKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZ1bGxLZXkgKyAnIGlzIHN0cmluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGVbJ3RleHQnXSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnJyxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xuXG4gICAgICAgICAgICAgICAgc2V0RGF0YShzY29wZS5vcHRpb25zLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldFNjaGVtYShzY29wZS5vcHRpb25zLnNjaGVtYSk7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSk7XG4gICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9KVxuOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5zY2hlbWEnLCBbXSlcbiAgICAuZmFjdG9yeSgnJHNjaGVtYScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2NoZW1hIChzY2hlbWEpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChzY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gc2NoZW1hIHVybCBvciBvYmplY3QgZ2l2ZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVTY2hlbWEoKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoIHNjaGVtYSApXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIHNjaGVtYSBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgc2NoZW1hICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0U2NoZW1hOiBfZ2V0U2NoZW1hXG4gICAgICAgIH1cbiAgICB9KVxuO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9