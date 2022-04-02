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
        var key = 'kbd:' + evt.code;
        var mappings = this.InputHandler.ResolveMapping(key);

        for (var i = 0; i < mappings.length; ++i) {
          if (this.InputHandler.States[mappings[i]].indexOf(key) === -1) {
            this.InputHandler.States[mappings[i]].push(key);
          }
        }
      }.bind(this));

      canvas.Root.addEventListener('keyup', function (evt) {
        var key = 'kbd:' + evt.code;
        var mappings = this.InputHandler.ResolveMapping(key);

        for (var i = 0; i < mappings.length; ++i) {
          var index = this.InputHandler.States[mappings[i]].indexOf(key);
          if (index !== -1) {
            this.InputHandler.States[mappings[i]].splice(index, 1);
          }
        }
      }.bind(this));
    };

    return KeyboardInputWatcher;
  }());
}());
