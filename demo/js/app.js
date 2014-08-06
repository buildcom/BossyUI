/*!
 * http://BossyUI.com/
 *
 * BossyUI Demos
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */

angular.module('demoApp', ['bossy'])

    .controller('DemoBossyFormCtrl', function ($scope) {

        $scope.options = {
            schema: {
                address: {
                    type: 'object', // json object type (json-schema.org)
                    properties: {
                        street: {
                            type: 'string'
                        },
                        locality: {
                            type: 'string'
                        },
                        region: {
                            type: 'string'
                        },
                        postalCode: {
                            type: 'string'
                        }
                    }
                }
            },
            data: {
                address: {
                    street: '555 First Street',
                    locality: 'Chico',
                    region: 'CA',
                    postalCode: '95926'
                }
            },
            showLabels: true

        };
    })

;