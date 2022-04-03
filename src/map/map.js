(function () {
    'use strict';

    if (!LDBB.Map) LDBB.Map = {};

    LDBB.Map.MapType = {
        Orthogonal: 1,
        Isometric: 2,
        Hexagonal: 4
    };

    LDBB.Map.Map = (function () {
        function Map() {

            this.Width = 0;
            this.Height = 0;
            this.Orientation = LDBB.Map.MapType.Orthogonal;
            this.TilesetName = null;

            this.Layers = {
                Tiles: null,
                Overlay: null,
                Points: null,
                TriggerMask: null,
                CollisionMask: null
            };
        }

        Map._log = new LDBB.Core.Logger('LDBB.Map.Map');

        Map.FromFile = function (filename, callback, async = true) {
            if (!window.XMLHttpRequest) {
                Map._log.Warn('Unable to load file; XMLHttpRequest was not found');
                return;
            }

            var req = new XMLHttpRequest();
            req.open('GET', filename, async);
            req.onreadystatechange = function () {
                if (req.readyState === 4)
                    if (callback instanceof Function)
                        callback(Map.FromTMJ(JSON.parse(req.response)));
            };
            req.send();
        };

        Map.FromTMJ = function (map) {
            var _ = new LDBB.Map.Map();

            _.Width = map['width'];
            _.Height = map['height'];

            switch (map['orientation']) {
                case 'orthogonal':
                    _.Orientation = LDBB.Map.MapType.Orthogonal;
                    break;
                case 'isometric':
                    _.Orientation = LDBB.Map.MapType.Isometric;
                    break;
                case 'hexagonal':
                    _.Orientation = LDBB.Map.MapType.Hexagonal;
                    break;
            }

            if (map['tilesets'] instanceof Array) {
                var first = map['tilesets'][0];
                if (first instanceof Object)
                    if (typeof first['name'] === 'string')
                        _.TilesetName = first['name'];
            }

            if (map['layers'] instanceof Array) {
                for (var i = 0; i < map['layers'].length; ++i) {
                    var layerObj = map['layers'][i];
                    if (layerObj instanceof Object) {
                        switch (layerObj['name']) {
                            case 'tiles':
                                _.Layers.Tiles = LDBB.Map.MapLayer.FromTMJ(this, layerObj);
                                break;

                            case 'overlay':
                                _.Layers.Overlay = LDBB.Map.MapLayer.FromTMJ(this, layerObj);
                                break;

                            case 'points':
                                _.Layers.Points = LDBB.Map.MapLayer.FromTMJ(this, layerObj);
                                break;

                            case 'trigger_mask':
                                _.Layers.TriggerMask = LDBB.Map.MapLayer.FromTMJ(this, layerObj);
                                break;

                            case 'collision_mask':
                                _.Layers.CollisionMask = LDBB.Map.MapLayer.FromTMJ(this, layerObj);
                                break;

                            default:
                                Map._log.Warn('Attempt to map unknown layer: ' + layerObj['name']);
                        }
                    }
                }

                return _;
            };
        }

        Map.prototype.GetObjects = function (by, value, layers = ['points', 'trigger_mask', 'collision_mask']) {
            var found = [];
            for (var i = 0; i < layers.length; ++i) {
                var _found;
                switch (layers[i]) {
                    case 'tiles': {
                        _found = this.Layers.Tiles.GetObjects(by, value);
                        break;
                    }
                    case 'overlay': {
                        _found = this.Layers.Overlay.GetObjects(by, value);
                        break;
                    }
                    case 'points': {
                        _found = this.Layers.Points.GetObjects(by, value);
                        break;
                    }
                    case 'trigger_mask': {
                        _found = this.Layers.TriggerMask.GetObjects(by, value);
                        break;
                    }
                    case 'collision_mask': {
                        _found = this.Layers.CollisionMask.GetObjects(by, value);
                        break;
                    }
                }
                for (var j = 0; j < _found.length; ++j) found.push(_found[j]);
            }
            return found;
        };

        return Map;
    }());
}());   