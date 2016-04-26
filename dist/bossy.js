System.register(['./components/calendar'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var calendar_1;
    return {
        setters:[
            function (calendar_1_1) {
                calendar_1 = calendar_1_1;
            }],
        execute: function() {
            exports_1("BossyCalendar", calendar_1.BossyCalendar);
        }
    }
});
//# sourceMappingURL=bossy.js.map