(function(){
    function getHashValue(key) {
      return location.hash.match(new RegExp(key+'=([^&]*)'))[1];
    }  
    var loadDirective = getHashValue('dir');
    var editorApp = angular.module('editorApp', ['ui.router', 'ui.ace', 'bossy'])
        
    editorApp.controller('EditorCtrl', ['$scope', '$document', '$window', '$compile', function($scope, $document, $window, $compile) {
        $scope.iFrame = document.getElementById('editor-result');
        var module =  angular.module('bossy');
        var iFdocument = $scope.iFrame.contentWindow.document,
            bodyTag = iFdocument.getElementsByTagName("body")[0],
            headTag = iFdocument.getElementsByTagName("head")[0],
            htmlTag = iFdocument.getElementsByTagName("html")[0],            
            script = iFdocument.createElement("script"),
            style = iFdocument.createElement('style');

    if (typeof console  != "undefined") 
        if (typeof console.log != 'undefined')
            console.olog = console.log;
        else
            console.olog = function() {};

    console.log = function(message) {
        console.olog(message);
        document.getElementById('debugDiv').innerHTML = document.getElementById('debugDiv').innerHTML + ('<p>' + message + '</p>');
    };
    
    $scope.iFrame.contentWindow.onerror = window.onerror = function(message, url, linenumber) {
        console.log("JavaScript error: " + message + " on line " + 
                linenumber + " for " + url);
    };

    $scope.iFrame.contentWindow.console.error = $scope.iFrame.contentWindow.console.debug = $scope.iFrame.contentWindow.console.info = $scope.iFrame.contentWindow.console.log = console.error = console.debug = console.info =  console.log;

        var script = iFdocument.createElement("script"),
            style = iFdocument.createElement('style');
            headTag.appendChild(style),
            styleTag = iFdocument.getElementsByTagName("style")[0];

        $scope.loadScript = function(url, callback){
            script = iFdocument.createElement("script");
            script.type = "text/javascript";

            if (script.readyState){  //IE
                script.onreadystatechange = function(){
                    if (script.readyState == "loaded" ||
                            script.readyState == "complete"){
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {  //Others
                script.onload = function(){
                    callback();
                };
            }
            script.src = url;
            headTag.appendChild(script);
        };

        $scope.aceHTMLLoaded = function(_editor) {
            $scope.htmlEditor = _editor;
            if(loadDirective && loadDirective != ''){
                var template = "<bossy-"+loadDirective+" config=\""+loadDirective+"config\"></bossy-"+loadDirective+">";
                $scope.htmlEditor.setValue(template);
            }
        };

        $scope.aceHTMLChanged = function(e) {
            bodyTag.innerHTML = '';
            angular.forEach($compile($scope.htmlEditor.getValue())($scope), function(elem) {
                bodyTag.appendChild(elem);
            });
        };

        $scope.aceCSSLoaded = function(_editor) {
            $scope.cssEditor = _editor; 
        };

        $scope.aceCSSChanged = function(e) {
            styleTag.innerHTML = $scope.cssEditor.getValue();
        };


        $scope.aceJSLoaded = function(_editor) {
            $scope.jsEditor = _editor;
            $scope.loadScript("http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.9/angular.min.js", function(){
                console.log("Done loading angular script");
                $scope.loadScript("http://localhost:3000/js/bossy.all.js", function(){
                    console.log("Done loading bossy script");

                });
            });      
        };

        $scope.aceJSChanged = function(e) {
            var currentScript = iFdocument.getElementById("custom-scripts");
                if(currentScript) 
                    currentScript.remove();
                var script = iFdocument.createElement('script');
                script.id = "custom-scripts";
                script.innerHTML = $scope.jsEditor.getValue();
                htmlTag.appendChild(script); 
        };

        $scope.toggleDebugger = function($this){
            var debuggerElement = document.getElementById("debugcontainer");
            if(debuggerElement.clientWidth === 298){
                debuggerElement.style.width = 0;
                $this.innerHTML = "<";
            } else {
                debuggerElement.style.width = "300px";
                $this.innerHTML = ">";
            }
        }    
    }]);
})();