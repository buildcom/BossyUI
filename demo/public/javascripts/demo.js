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

        $scope.config = {
            schema: {
                address: {
                    type: 'object', // json object type (json-schema.org)
                    properties: {
                        street: {
                            type: 'string',
                            title: 'Street',
                            input_type: 'text'
                        },
                        locality: {
                            type: 'string',
                            title: 'Location',
                            input_type: 'text'
                        },
                        region: {
                            type: 'string',
                            title: 'Region',
                            input_type: 'text'
                        },
                        postalCode: {
                            type: 'string',
                            title: 'Zip Code',
                            input_type: 'text'
                        },
                        business: {
                            type: 'boolean',
                            title: 'Business',
                            input_type: 'text'
                        }
                    }
                }
            },
            data: {
                address: {
                    street: '555 First Street',
                    locality: 'Chico',
                    region: 'CA',
                    postalCode: '95926',
                    business: false
                }
            },
            options: {
                button: 'Next'
            }
        };
    })

;