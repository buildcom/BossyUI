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
                            type: 'string',
                            title: 'Street'
                        },
                        locality: {
                            type: 'string',
                            title: 'Location'
                        },
                        region: {
                            type: 'string',
                            title: 'Region'
                        },
                        postalCode: {
                            type: 'string',
                            title: 'Zip Code'
                        },
                        business: {
                            type: 'boolean',
                            title: 'Business'
                        },
                        submit: {
                            title: 'Submit'
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