(function () {
  "use strict";

  if (!LDBB.Input) LDBB.Input = {};

  LDBB.Input.InputHandler = (function () {
    function InputHandler() {
      this._log = new LDBB.Core.Logger("LDBB.Input.InputHandler");

      this.Mapping = {};
      this.States = {};
      this.Watchers = {};
      this.Values = {};
    }

    InputHandler.prototype.Assign = function (key, triggers) {
      if (!(triggers instanceof Array)) {
        this._log.Info("Failed to register key: " + key);
        return;
      }
      this.Mapping[key] = triggers;
      this.States[key] = [];
    };

    InputHandler.prototype.ResolveMapping = function (action) {
      var matched = [];
      var keys = Object.keys(this.Mapping);

      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        mapping_loop:
        for (var j = 0; j < this.Mapping[key].length; ++j) {
          var mapping = this.Mapping[key][j];
          if (mapping == action) {
            matched.push(key);
            break mapping_loop;
          }
        }
      }

      return matched;
    };

    InputHandler.prototype.Check = function (key, config = {}) {
      var requireAll = config.requireAll ? config.requireAll : false;
      var single = config.single ? config.single : false;

      var state;
      if (requireAll) {
        state = this.States[key].length === this.Mapping[key].length;
      } else {
        state = this.States[key].length !== 0;
      }

      if (single) {
        this.States[key] = [];
      }

      return state;
    };

    InputHandler.prototype.Use = function (id, inputWatcher) {
      this.Watchers[id] = inputWatcher;
      this.Values[id] = {};
      inputWatcher.InputHandler = this;
    }

    InputHandler.prototype.Attach = function (canvas) {
      if (!(canvas instanceof LDBB.GFX.Canvas)) {
        this._log.Info("Failed to attach, argument not a canvas");
        return;
      }

      var ids = Object.keys(this.Watchers);
      for (var i = 0; i < ids.length; ++i) {
        this.Watchers[ids[i]].Attach(canvas);
      }
    }

    return InputHandler;
  }());
}());
