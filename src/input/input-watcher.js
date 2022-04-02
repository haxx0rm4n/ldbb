(function() {
  "use strict";

  if (!LDBB.Input) LDBB.Input = {};

  LDBB.Input.InputWatcher = (function() {
    function InputWatcher() {
      this._log = new LDBB.Core.Logger("LDBB.Input.InputWatcher");
      this.InputHandler = null;  
    }

    InputWatcher.prototype.Attach = function(canvas) {
      this._log.Warn("Default attach method called; no canvas has been attached!");
    };

    return InputWatcher;
  }());
}());
