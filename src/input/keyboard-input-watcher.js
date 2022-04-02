(function() {
  'use strict';

  if (!LDBB.Input) LDBB.Input = {};

  LDBB.Input.KeyboardInputWatcher = (function() {
    function KeyboardInputWatcher() {
      LDBB.Input.InputWatcher.apply(this, arguments);
      this._log = new LDBB.Core.Logger('LDBB.Input.KeyboardInputWatcher');
    }

    KeyboardInputWatcher.prototype = Object.create(LDBB.Input.InputWatcher.prototype);
    KeyboardInputWatcher.prototype.constructor = KeyboardInputWatcher;

    KeyboardInputWatcher.prototype.Attach = function(canvas) {
      canvas.Root.addEventListener('keydown', function (evt) {
        this.InputHandler.Trigger('kbd:' + evt.code);
      }.bind(this));

      canvas.Root.addEventListener('keyup', function (evt) {
        this.InputHandler.UnTrigger('kbd:' + evt.code);
      }.bind(this));
    };

    return KeyboardInputWatcher;
  }());
}());
