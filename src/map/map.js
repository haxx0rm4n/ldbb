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
                EntitySpawn: null,
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
            req.onreadystatechange = function (event) {
                if (req.readyState === 1) {
                    callback();
                }
            };
            req.send();
        };

        Map.FromTMJ = function (map) {
            var _ = new LDBB.Map.Map();

            if (map['width'] instanceof Number) {
                _.Width = map['width'];
            }
            if (map['height'] instanceof Number) {
                _.Height = map['height'];
            }
            if (map['orientation'] instanceof String) {
                _.Orientation = map['orientation'];
            }

            if (map['tilesets'] instanceof Array) {
                var first = map['tilesets'][0];
                if (first instanceof Object) {
                    if (first['name'] instanceof String) {
                        _.TilesetName = first['name'];
                    }
                }
            }

            if (map['layers'] instanceof Array) {
                for (var i = 0; i < map['layers'].length; ++i) {
                    var layerObj = map['layers'][i];
                    if (layerObj instanceof Object) {
                        switch (layerObj['name']) {
                            case 'tiles':
                                _.Layers.Tiles = LDBB.Map.MapLayer.FromTMJ(layerObj);
                                break;

                            case 'overlay':
                                _.Layers.Overlay = LDBB.Map.MapLayer.FromTMJ(layerObj);
                                break;

                            case 'point_mask':
                                _.Layers.PointMask = LDBB.Map.MapLayer.FromTMJ(layerObj);
                                break;

                            case 'trigger_mask':
                                _.Layers.TriggerMask = LDBB.Map.MapLayer.FromTMJ(layerObj);
                                break;

                            case 'collision_mask':
                                _.Layers.CollisionMask = LDBB.Map.MapLayer.FromTMJ(layerObj);
                                break;

                            default:
                                Map._log.Warn('Attempt to map unknown layer: ' + layerObj['name']);
                        }
                    }
                }
            }
        };

        return Map;
    }());
}());   