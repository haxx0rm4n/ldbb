(function () {
    'use strict';

    if (!LDBB.GFX) LDBB.GFX = {};

    LDBB.GFX.AssetHandler = (function () {
        function AssetHandler() {
            this._log = new LDBB.Core.Logger('LDBB.GFX.AssetHandler');
            this._queue = {};
            this.IsLoading = false;
            this.IsLoaded = false;
            this.Assets = {};
            this.OnLoad = [];
        }

        AssetHandler.prototype.Queue = function (name, type, filename, options = {}) {
            if (this._queue.hasOwnProperty(name)) {
                this._log.Info('Attempt to queue asset with duplicate name: ' + name);
                return;
            }

            var _options = {
                Abs: options.Abs !== undefined ? options.Abs : false,
                Async: options.Abs !== undefined ? options.Abs : false,
                TileWidth: options.TileWidth !== undefined ? options.TileWidth : null,
                TileHeight: options.TileWidth !== undefined ? options.TileHeight : null 
            };

            this._queue[name] = [type, filename, _options];
        };

        AssetHandler.prototype._fireCallbacks = function () {
            console.log('_fireCallbacks');
            for (var i = 0; i < this.OnLoad.length; ++i) {
                var callback = this.OnLoad[i];
                if (callback instanceof Function) {
                    callback()
                }
            }
        };

        AssetHandler.prototype.LoadAll = function (basePath, callback, async = true) {
            this.IsLoading = true;

            this._log.Info('Beginning load...');
            var startTime = Date.now();

            var index = -1;
            var names = Object.keys(this._queue);
            var next = function() {
                if (index >= 0 && index < names.length) {
                    return this._queue[names[index]];
                }
                return null;
            }.bind(this);

            var step = function(_callback) {
                ++index;

                var _current = next();
                if (_current === null) {
                    if (_callback instanceof Function) {
                        var tookTime = Date.now() - startTime;
                        this._log.Info('Load complete (took ' + tookTime + ' ms)');
                        _callback();
                    }
                    return;
                }

                var _async = async || _current[2].Async;
                var _path = _current[2].Abs ? _current[1] : basePath + _current[1];

                switch (_current[0]) {
                    case 'sprite': {
                        if (_async) {
                            this._log.Info('Loading sprite (async): ' + names[index]);
                            this.Assets[names[index]] = new LDBB.GFX.Sprite(_path);
                            step(callback);
                        } else {
                            this._log.Info('Loading sprite: ' + names[index]);
                            this.Assets[names[index]] = new LDBB.GFX.Sprite(_path, function() {
                                step(callback);
                            });
                        }
                        break;
                    }
                    case 'tiles': {
                        if (_async) {
                            this._log.Info('Loading tiles (async): ' + names[index]);
                            var tw = _current[2].TileWidth;
                            var th = _current[2].TileWidth;
                            this.Assets[names[index]] = new LDBB.GFX.Tilesheet(_path, tw, th);
                            step(callback);
                        } else {
                            this._log.Info('Loading tiles: ' + names[index]);
                            var tw = _current[2].TileWidth;
                            var th = _current[2].TileWidth;
                            this.Assets[names[index]] = new LDBB.GFX.Tilesheet(_path, tw, th, function () {
                                step(callback);
                            });
                        }
                        break;
                    }
                    case 'sound': {
                        if (_async) {
                            this._log.Info('Loading sound (async): ' + names[index]);
                            this.Assets[names[index]] = new LDBB.Audio.Sound(_path);
                            step(callback);
                        } else {
                            this._log.Info('Loading sound: ' + names[index]);
                            this.Assets[names[index]] = new LDBB.Audio.Sound(_path, function() {
                                step(callback);
                            });
                        }
                        break;
                    }
                    case 'map': {
                        (function (_names, _index) {
                            LDBB.Map.Map.FromFile(_path, function (map) {
                                this.Assets[_names[_index]] = map;
                                step(callback);
                            }.bind(this), _async);
                        }.bind(this)(names, index));
                        this._log.Info('Loading map' + (_async ? ' (async)' : '') + ': ' + names[index]);
                        break;
                    }
                    case 'source': {
                        var script = document.createElement('script');
                        script.async = _async;
                        if (_async) {
                            script.onload = function () {
                                step.bind(this)(callback);
                            }.bind(this);
                        } else {
                            step.bind(this)(callback);
                        }
                        script.src = _path;
                        document.head.appendChild(script);
                        this.Assets[names[index]] = script;
                        this._log.Info('Loading source' + (script.async ? ' (async)' : '') + ': ' + names[index]);
                    }
                }
            }.bind(this);

            step.bind(this)(function() {
                console.log(2);
                this.IsLoading = false;
                this.IsLoaded = true;
                _fireCallbacks.bind(this)();
            }.bind(this));
        };

        return AssetHandler;
    }());
}());