angular.module('bossy.tooltip', [])
    .directive('bossyTooltip', function() {
    
        // Private member array containing all known positions
        _pos = ['n','ne','e','se','s','sw','w','nw'];
        
        // Move the tip to a certain position
        function _moveTip($parent, $tip, curPos)
        {
            if(curPos == 'n')
            {
                $tip.style.left = $parent.offsetLeft + ($parent.offsetWidth / 2) - ($tip.offsetWidth / 2) + 'px';
                $tip.style.top = $parent.offsetTop - $tip.offsetHeight + 'px';
            }
            else if(curPos == 'ne')
            {
                $tip.style.left = $parent.offsetLeft + $parent.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop - $tip.offsetHeight + 'px';
            }
            else if(curPos == 'e')
            {
                $tip.style.left = $parent.offsetLeft + $parent.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + ($parent.offsetHeight / 2) - ($tip.offsetHeight / 2) + 'px';
            }
            else if(curPos == 'se')
            {
                $tip.style.left = $parent.offsetLeft + $parent.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + $parent.offsetHeight + 'px';
            }
            else if(curPos == 's')
            {
                $tip.style.left = $parent.offsetLeft + ($parent.offsetWidth / 2) - ($tip.offsetWidth / 2) + 'px';
                $tip.style.top = $parent.offsetTop + $parent.offsetHeight + 'px';
            }
            else if(curPos == 'sw')
            {
                $tip.style.left = $parent.offsetLeft - $tip.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + $parent.offsetHeight + 'px';
            }
            else if(curPos == 'w')
            {
                $tip.style.left = $parent.offsetLeft - $tip.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + ($parent.offsetHeight / 2) - ($tip.offsetHeight / 2) + 'px';
            }
            else
            {
                $tip.style.left = $parent.offsetLeft - $tip.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop - $tip.offsetHeight + 'px';
            }
        }
        
        // Check to see if the tip is within the window
        function _checkPos($tip)
        {
            var rect = $tip.getBoundingClientRect();
            
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        return {
            restrict: 'E',
            scope: {
                config: "="
            },
            replace: true,
            link: function(scope, element, attrs) {
            
                // If the user doesn't provide essential information, error out
                if(!scope.config.title || !scope.config.body)
                {
                    console.error("Error: No title or body information provided.");
                    return 1;
                }
                
                // If the user doesn't provide a position, default 'north'
                if(!scope.config.position || typeof scope.config.position !== 'string' || _pos.indexOf(scope.config.position) < 0)
                {
                    scope.config.position = 'n';
                }
                
                // Create tip element
                var $tip = document.createElement('div');
                
                // Append to DOM
                document.body.appendChild($tip);
                $tip.style.position = 'absolute';
                $tip.innerHTML = '<span>'+ scope.config.title +'</span><div>'+ scope.config.body +'</div>';
                $tip.className = 'bossyTooltip';
                
                // Disable browser's tooltip
                element[0].title = '';
                console.log(element);
                
                var i = 0;
                do
                {
                    locked = true;
                    _moveTip(element[0], $tip, scope.config.position);
                    
                    // Continue to loop if $tip is clipped
                    if(!_checkPos($tip))
                    {
                        locked = false;
                        
                        // Wrap around array if the end is hit
                        if(scope.config.position == 'nw')
                            scope.config.position = 'n';
                        else
                            scope.config.position = _pos[_pos.indexOf(scope.config.position) + 1];
                    }
                    
                    if(i == 8)
                        break;
                    
                    ++i;
                } while(locked == false);
                
                // Hide it until mouse event
                $tip.style.display = 'none';
                
                // Mouse events
                element.on('mouseenter', function() {
                    $tip.style.display = 'block';
                })
                .on('mouseleave', function() {
                    $tip.style.display = 'none';
                });

            }
        };
    });