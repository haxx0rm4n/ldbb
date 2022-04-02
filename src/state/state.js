(function() {
    "use strict";

    if (!LDBB.State) LDBB.State = {};

    LDBB.State.State = (function() {
        function State() {
            this._log = new LDBB.Core.Logger("LDBB.State.State");
            this._initalized = false;
            this.Priority = -1;
            this.Paused = [];
        }

        State.prototype.Init = function(context) {};

        State.prototype.Tick = function(context) {
            this._log.Warn("Default tick method");
        };

        State.prototype.Draw = function(context, canvas) {
            this._log.Warn("Default draw method");
        };

        return State;
    }());
}());