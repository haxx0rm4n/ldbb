(function () {
    "use strict";

    if (!LDBB.GFX) LDBB.GFX = {};

    LDBB.GFX.AssetHandler = (function () {
        function AssetHandler() {
            this._log = new LDBB.Core.Logger("LDBB.GFX.AssetHandler");
            this._queue = {};
            this.IsLoading = false;
            this.IsLoaded = false;
        }

        AssetHandler.prototype.Queue = function (name, type, filename) {
            if (this._queue.hasOwnProperty(name)) {
                this._log.Info("Attempt to queue asset with duplicate name: " + name);
                return;
            }
            this._queue[name] = [type, filename];
        };

        AssetHandler.prototype.LoadAll = function (callback) {
            this.IsLoading = true;

            this._log.Info("Beginning load");
            var startTime = Date.now();

            var index = 0;
            var names = Object.keys(this._queue);
            var current = function() {
                if (index >= 0 && index < this._queue.length) {
                    this._log.Info("name: " + names[index]);
                    return this._queue[names[index]];
                }
                return null;
            };

            var next = function(callback) {
                var _current = current.bind(this)();
                if (_current === null) {
                    if (typeof callback === "function") {
                        var tookTime = Date.now() - startTime;
                        this._log.Info("Load complete (took " + tookTime + " ms)");
                        callback();
                    } else {
                        this._log.Warn("Callback was not a function");
                    }
                    return;
                }

                switch (_current[0]) {
                    case 'sprite': {
                        this._log.Info("Loading sprite: " + names[index]);
                        break;
                    }
                    case 'audio': {
                        this._log.Info("Loading audio: " + names[index]);
                        break;
                    }
                }

                ++index;
                next.bind(this)(callback);
            };

            next.bind(this)(function() {
                this.IsLoading = false;
                this.IsLoaded = true;
                callback();
            }.bind(this));
        };

        return AssetHandler;
    }());
}());