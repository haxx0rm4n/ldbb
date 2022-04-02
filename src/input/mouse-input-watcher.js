(function() {
  "use strict";

  if (!LDBB.Input) LDBB.Input = {};

  LDBB.Input.MouseInputWatcher = (function() {
    function MouseInputWatcher() {
      LDBB.Input.InputWatcher.apply(this, arguments);
    }

    MouseInputWatcher.prototype = Object.create(LDBB.Input.InputWatcher.prototype);
    MouseInputWatcher.prototype.constructor = MouseInputWatcher;

    MouseInputWatcher.prototype.Attach = function(canvas) {
      this.InputHandler.Values["mse"].X = 0;
      this.InputHandler.Values["mse"].Y = 0;

      canvas.Root.addEventListener("mousemove", function (evt) {
        var box = canvas.Root.getBoundingClientRect();
        this.InputHandler.Values["mse"].X = (evt.clientX - box.left) / canvas.Scale;
        this.InputHandler.Values["mse"].Y = (evt.clientY - box.top) / canvas.Scale;
      }.bind(this));
    };

    return MouseInputWatcher;
  }());
}());
