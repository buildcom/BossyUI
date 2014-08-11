angular.module('bossy.form', [])
    .directive('bossyForm', function ($compile, $http, $schema, $data) {
        var _schema,
            _data,
            _itemTemplate = {
                number: function () {
                    return '<input type="number" />';
                },
                text: function () {
                    return '<input type="text" />';
                },
                textArea: function () {
                    return '<textarea></textarea>';
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
                            template += _itemTemplate.number();
                            break;
                        case 'string':
                            console.log(fullKey + ' is string');
                            template += _itemTemplate.text();
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