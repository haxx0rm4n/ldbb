(function() {
    "use strict";

    if (!LDBB.State) LDBB.State = {};

    LDBB.State.StateHandler = (function() {
        function StateHandler() {
            this._log = new LDBB.Core.Logger("LDBB.State.StateHandler");
            this._states = {};
            this._selected = [];
        }

        StateHandler.prototype.Add = function(name, state) {
            if (this._states.hasOwnProperty(name)) {
                this._log.Info("Attempt to add State with duplicate name: " + name);
                return;
            }
            this._states[name] = state;
        };

        StateHandler.prototype.Select = function(name, replace = false) {
            if (replace) {
                this._selected = [name];
            } else {
                var index = this._selected.indexOf(name);
                if (index === -1) {
                    this._selected.push(name);
                }
            }

            this._selected = this._selected.sort((nameA, nameB) => {
                var stateA = this._states[nameA];
                var stateB = this._states[nameB];

                return stateA.Priority - stateB.Priority;
            });
        };

        StateHandler.prototype.IsSelected = function(name) {
            return this._selected.indexOf(name) !== -1;
        };

        StateHandler.prototype.Toggle = function(name) {
            if (this.IsSelected(name)) {
                this.Unselect(name);
            } else {
                this.Select(name);
            }
        }

        StateHandler.prototype.Unselect = function(name) {
            var index = this._selected.indexOf(name);
            if (index !== -1) {
                this._selected.splice(index, 1);
            }
        };

        StateHandler.prototype.InitAll = function(context) {
            var names = Object.keys(this._states);
            for (var i = 0; i < names.length; ++i) {
                var state = this._states[names[i]];
                if (!state._initalized) {
                    try {
                        state.Init(context);
                    } catch (ex) {
                        this._log.Error("Exception initializing state: " + names[i]);
                        console.error(ex);
                        context.Get('core.stop-game')();
                    }
                    state._initalized = true;
                }
            }
        };

        StateHandler.prototype.Tick = function(context) {
            for (var i = 0; i < this._selected.length; ++i) {
                try {
                    var state = this._states[this._selected[i]];
                    if (state.Paused.indexOf('tick') === -1) {
                        state.Tick(context);
                    }
                } catch (ex) {
                    this._log.Error("Exception ticking state: " + this._selected[i]);
                        console.error(ex);
                        context.Get('core.stop-game')();
                }
            }
        };

        StateHandler.prototype.Draw = function(context, canvas) {
            for (var i = 0; i < this._selected.length; ++i) {
                try {
                    var state = this._states[this._selected[i]];
                    if (state.Paused.indexOf('draw') === -1) {
                        state.Draw(context, canvas);
                    }
                } catch (ex) {
                    this._log.Info("Exception drawing state: " + this._selected[i]);
                        console.error(ex);
                        context.Get('core.stop-game')();
                }
            }
        };

        return StateHandler;
    }());
}());