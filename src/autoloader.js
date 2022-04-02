(function() {
  "use strict";

  window.LDBB = {};

  /**
   * Auto-magic library file loader.
   */
  LDBB.Loader = (function() {
    function Loader() {
      this.toLoad = [];
      this.loading = [];
    }

    Loader.prototype.Queue = function(file) {
      this.toLoad.push(file);
    };

    Loader.prototype.Load = function(basePath, callback) {
      console.warn("[LDBB.Loader#Load] Beginning load");
      this._loadStart = Date.now();

      for (var i = 0; i < this.toLoad.length; ++i) {
        var file = this.toLoad[i];
        if (!file.endsWith(".js")) {
          file += ".js";
        }
        file = basePath + "/" + file;

        this.loading.push(file);
        var script = document.createElement("script");
        script.src = file;
        (function(_loader, _script, _file, _callback) {
          _script.onload = function() {
            _loader.loading.splice(_loader.loading.indexOf(_file), 1);
            if (_loader.loading.length === 0) {
              let took = Date.now() - _loader._loadStart;
              console.warn("[LDBB.Loader#Load] Load complete (took " + took + " ms)");
              _callback();
            }
          }
        }(this, script, file, callback));
        document.body.appendChild(script);

        console.warn("[LDBB.Loader#Load] Loading file: '" + file + "'");
      }
    };

    return Loader;
  }());

  LDBB.DefaultLoader = new LDBB.Loader();
  LDBB.DefaultLoader.Queue("core/logger");
  LDBB.DefaultLoader.Queue("core/context");
  LDBB.DefaultLoader.Queue("core/loop");
  LDBB.DefaultLoader.Queue("state/state");
  LDBB.DefaultLoader.Queue("state/state-handler");
  LDBB.DefaultLoader.Queue("gfx/canvas");
  LDBB.DefaultLoader.Queue("gfx/sprite");
  LDBB.DefaultLoader.Queue("gfx/tilesheet");
  LDBB.DefaultLoader.Queue("gfx/animated-sprite");
  LDBB.DefaultLoader.Queue("input/input-handler");
  LDBB.DefaultLoader.Queue("input/input-watcher");
  LDBB.DefaultLoader.Queue("input/keyboard-input-watcher");
  LDBB.DefaultLoader.Queue("input/mouse-input-watcher");
  LDBB.DefaultLoader.Queue("math/vector2");
  LDBB.DefaultLoader.Queue("core/game");
}());
