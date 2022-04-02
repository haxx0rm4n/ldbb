(function () {
    "use strict";

    if (!LDBB.GFX) LDBB.GFX = {};

    LDBB.GFX.AssetHandler = (function () {
        function AssetHandler() {
            this._log = new LDBB.Core.Logger("LDBB.GFX.AssetHandler");
            this._queue = {};
            this.IsLoading = false;
            this.IsLoaded = false;
            this.Assets = {};
        }

        AssetHandler.prototype.Queue = function (name, type, filename, async = null) {
            if (this._queue.hasOwnProperty(name)) {
                this._log.Info("Attempt to queue asset with duplicate name: " + name);
                return;
            }
            this._queue[name] = [type, filename, async];
        };

        AssetHandler.prototype.LoadAll = function (callback, async = true) {
            this.IsLoading = true;

            this._log.Info("Beginning load");
            var startTime = Date.now();

            var index = -1;
            var names = Object.keys(this._queue);
            var next = function() {
                if (index >= 0 && index < names.length) {
                    return this._queue[names[index]];
                }
                return null;
            }.bind(this);

            var step = function(callback) {
                ++index;

                var _current = next();
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
                        if (async || (_current.length === 3 && _current[2] === true)) {
                            this._log.Info("Loading sprite (async): " + names[index]);
                            this.Assets[names[index]] = new LDBB.GFX.Sprite(_current[1]);
                            step(callback);
                        } else {
                            this._log.Info("Loading sprite: " + names[index]);
                            this.Assets[names[index]] = new LDBB.GFX.Sprite(_current[1], function() {
                                step(callback);
                            });
                        }
                        break;
                    }
                    case 'audio': {
                        this._log.Info("Loading audio: " + names[index]);
                        break;
                    }
                }
            }.bind(this);

            step.bind(this)(function() {
                this.IsLoading = false;
                this.IsLoaded = true;
                callback();
            }.bind(this));
        };

        return AssetHandler;
    }());
}());