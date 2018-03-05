var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
var button = document.createElement('button');
button.innerText = "Say Hello";
button.onclick = function () {
    alert(greeter.greet());
};
document.body.appendChild(button);
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Snake.prototype.move = function () {
        alert("Slithering...");
        _this = _super.call(this, 5) || this;
    };
    return Snake;
}(Animal));
var Horse = (function (_super) {
    __extends(Horse, _super);
    function Horse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Horse.prototype.move = function () {
        alert("Galloping...");
        _super.prototype.move.call(this, 45);
    };
    return Horse;
}(Animal));
var Sayings;
(function (Sayings) {
    var Greeter = (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Hello, " + this.greeting;
        };
        return Greeter;
    }());
    Sayings.Greeter = Greeter;
})(Sayings || (Sayings = {}));
var Mankala;
(function (Mankala) {
    var Features = (function () {
        function Features() {
            this.turnContinues = false;
            this.seedStoredCount = 0;
            this.capturedCount = 0;
            this.spaceCaptured = NoSpace;
        }
        Features.prototype.clear = function () {
            this.turnContinues = false;
            this.seedStoredCount = 0;
            this.capturedCount = 0;
            this.spaceCaptured = NoSpace;
        };
        Features.prototype.toString = function () {
            var stringBuilder = "";
            if (this.turnContinues) {
                stringBuilder += " turn continues,";
            }
            stringBuilder += " stores " + this.seedStoredCount;
            if (this.capturedCount > 0) {
                stringBuilder += " captures " + this.capturedCount + " from space " + this.spaceCaptured;
            }
            return stringBuilder;
        };
        return Features;
    }());
    Mankala.Features = Features;
})(Mankala || (Mankala = {}));
//# sourceMappingURL=typescript.js.map