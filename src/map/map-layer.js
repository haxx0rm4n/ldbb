(function () {
    'use strict';

    const MASK_FLIP_V = 1 << 31;
    const MASK_FLIP_H = 1 << 30;
    const MASK_FLIP_AXIS = 1 << 29;
    const MASK_DOUBLE = 1 << 28;
    const MASK_ALL = MASK_FLIP_V | MASK_FLIP_H | MASK_FLIP_AXIS | MASK_DOUBLE;

    if (!LDBB.Map) LDBB.Map = {};

    LDBB.Map.MapLayer = (function () {
        function MapLayer(id = null) {
            this.Id = id;
            this.Map = null;
            this.Type = null;
            this.Name = null;
            this.Data = [];
            this.Objects = [];
            this.Width = 0;
            this.Height = 0;
            this.Position = new LDBB.Math.Vector2(0, 0);
            this.Visible = true;
        }

        MapLayer.FromTMJ = function (map, layer) {
            var _ = new LDBB.Map.Layer();

            if (layer['id'] instanceof Number)
                _.Id = layer['id'];
            if (map instanceof LDBB.Map.Map)
                _.Map = map;
            if (layer['name'] instanceof String)
                _.Name = layer['name'];
            if (layer['data'] instanceof Array)
                this.Data = Object.create(layer['data']);
            if (layer['objects'] instanceof Array) {
                for (var i = 0; i < layer['objects'].length; ++i) {
                    this.Objects.push(LDBB.Map.MapObject.FromTMJ(layer['objects'][i]));
                }
            }
                this.Objects = Object.create(layer['objects']);
            if (layer['width'] instanceof Number)
                this.Width = layer['width'];
            if (layer['height'] instanceof Number)
                this.Height = layer['height'];
            if (layer['x'] instanceof Number)
                this.Position.X = layer['x'];
            if (layer['y'] instanceof Number)
                this.Position.Y = layer['y'];

            return layer;
        };

        MapLayer.prototype.TileAt = function (x, y) {
            if (x < 0 || x >= this.Width || y < 0 || y >= this.Height) {
                return null;
            }

            var rawIndex = this.Data[x + y * this.Width];
            return {
                Index: rawIndex & ~MASK_ALL,
                FlipV: rawIndex & MASK_FLIP_V === MASK_FLIP_V,
                FlipH: rawIndex & MASK_FLIP_H === MASK_FLIP_H,
                FlipAxis: rawIndex & MASK_FLIP_AXIS === MASK_FLIP_AXIS,
                Double: rawIndex & MASK_DOUBLE === MASK_DOUBLE
            };
        };

        MapLayer.prototype.GetObject = function (name) {
            for (var i = 0; i < this.Objects.length; ++i) {
                if (this.Objects[i].Name === name) {
                    return this.Objects[i];
                }
                return null;
            }
        };

        return MapLayer;
    }());
}());