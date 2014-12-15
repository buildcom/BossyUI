describe('bossyDropdown',function() {
    var createCtrl,element;


    beforeEach(module('Templates'));
    beforeEach(inject(function($controller,$http,$compile,$rootScope){

         $rootScope.myConfig={
            src: 'https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json',
            title: 'abbreviation',
            select: {},
            // items: true,
            // template: '<div>shit</div>'
            template: 'temp2.html'

        };
        $rootScope.selectItem = "abc";

        element = angular.element('<div  bossy-dropdown config={{myConfig}} select="{{selectItem}}"></div>');
        $compile(element)($rootScope);
        $rootScope.$digest();


    }));

    it('should not be null',function(){

        expect(element).not.toBe(null);
    })

    it('should correctly pass the config Object',function(){

       var myConfig={
            src: 'https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json',
            title: 'abbreviation',
            select: {},
            template: 'temp2.html'

        };

        expect(element.attr("config")).toMatch(myConfig);


    })

    it('should have correct selected item',function(){

        expect(element.attr("select")).toMatch('abc');
    });


});
