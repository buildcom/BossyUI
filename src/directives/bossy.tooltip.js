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
                $tip.style.display = 'none';
                $tip.innerHTML = '<span>'+ attrs.title +'</span><div>'+ attrs.body +'</div>';
                $tip.className = 'bossyTooltip';
                
                // Mouse events
                element.on('mouseenter', function() {
                    $tip.style.left = (-$tip.parentNode.offsetWidth / 2) + 'px';
                    $tip.style.top = (-$tip.parentNode.offsetHeight / 2) + 'px';
                    $tip.style.display = 'block';
                })
                .on('mouseleave', function() {
                    $tip.style.display = 'none';
                });
                
                // Append to DOM
                element[0].appendChild($tip);
            }
        };
    });