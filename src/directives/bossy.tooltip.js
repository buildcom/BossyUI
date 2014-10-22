angular.module('bossy.tooltip', [])
    .directive('bossyTooltip', function() {
        return {
            restrict: 'A',
            scope: {},
			replace: true,
            link: function(scope, element, attrs) {
                if(typeof attrs.title !== "string" && typeof attrs.body !== "string")
                    console.error("Error: No title or body information provided.");
                
                // Create tip element
                var $tip = document.createElement('div');
                $tip.innerHTML = '<div>'+ attrs.title +'</div><div>'+ attrs.body +'</div>';
                $tip.className = 'bossyTooltip';
                
                // Mouse events
                element.on('mouseenter', function() {
                    console.log('here');
                })
                .on('mouseleave', function() {
                    console.log('there');
                });
                
                // Append to DOM
                element[0].appendChild($tip);
            }
        };
    });