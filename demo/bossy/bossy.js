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

var bossy = angular.module('bossy', []);

bossy.directive('bossyForm', function ($compile,$http) {
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
        if (angular.isString(data)) {

            $http.get( data )
                .success( function( data ) {
                    if( angular.isObject( data ) ) {
                        _data = data;
                    }
                    else {
                        //TODO: replace error message with online doc link like ng errors
                        console.error('directive.bossyForm: GET request to url did not produce data object');
                    }
                })
                .error( function(response_data, status) {
                    //TODO: replace error message with online doc link like ng errors
                    console.error('directive.bossyForm: GET request to url "' + data + '" failed with status "' + status + '"');
                });
            
            console.log('is string');
        }
        else if (angular.isObject(data)) {
            _data = data;
        }
        else {
            //TODO: replace error message with online doc link like ng errors
            console.error('directive.bossyForm: no data url or object given');
        }
    }

    function setSchema(schema) {
        if (angular.isString(schema)) {
            
            $http.get( schema )
                .success( function( data ) {
                    if( angular.isObject( data ) ) {
                        _schema = schema;
                    }
                    else {
                        //TODO: replace error message with online doc link like ng errors
                        console.error('directive.bossyForm: GET request to url did not produce schema object');
                    }
                })
                .error( function(data, status) {
                    //TODO: replace error message with online doc link like ng errors
                    console.error('directive.bossyForm: GET request to url "' + schema + '" failed with status "' + status + '"');
                });
            console.log('is string');
        }
        else if (angular.isObject(schema)) {
            _schema = schema;
        }
        else {
            //TODO: replace error message with online doc link like ng errors
            console.error('directive.bossyForm: no schema url or object given');
        }
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

});