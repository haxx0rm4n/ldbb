(function () {
    'use strict';

    const MASK_FLIP_V = 1 << 31;
    const MASK_FLIP_H = 1 << 30;
    const MASK_FLIP_D = 1 << 29;
    const MASK_ALL = MASK_FLIP_V | MASK_FLIP_H | MASK_FLIP_D;

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
            var _ = new LDBB.Map.MapLayer();
            _.Map = map;

            if (typeof layer['id'] === 'number')
                _.Id = layer['id'];
            if (typeof layer['name'] === 'string')
                _.Name = layer['name'];
            if (layer['data'] instanceof Array)
                _.Data = layer['data'];
            if (layer['objects'] instanceof Array) {
                for (var i = 0; i < layer['objects'].length; ++i) {
                    _.Objects.push(LDBB.Map.MapObject.FromTMJ(layer['objects'][i]));
                }
            }
            if (typeof layer['width'] === 'number')
                _.Width = layer['width'];
            if (typeof layer['height'] === 'number')
                _.Height = layer['height'];
            if (typeof layer['x'] === 'number')
                _.Position.X = layer['x'];
            if (typeof layer['y'] === 'number')
                _.Position.Y = layer['y'];

            return _;
        };

        MapLayer.prototype.TileAt = function (x, y) {
            if (x < 0 || x >= this.Width || y < 0 || y >= this.Height) {
                return null;
            }

            var rawIndex = this.Data[x + y * this.Width];
            return {
                Index: rawIndex & ~MASK_ALL,
                FlipH: rawIndex & MASK_FLIP_H === MASK_FLIP_H,
                FlipV: rawIndex & MASK_FLIP_V === MASK_FLIP_V,
                FlipD: rawIndex & MASK_FLIP_D === MASK_FLIP_D
            };
        };

        MapLayer.prototype.GetObjects = function (by, value) {
            if (['name', 'id', 'type'].indexOf(by) === -1) {
                return [];
            }

            var found = [];
            for (var i = 0; i < this.Objects.length; ++i) {
                if (by === 'name' && this.Objects[i].Name === value) {
                    found.push(this.Objects[i]);
                }
                if (by === 'id' && this.Objects[i].Id === value) {
                    found.push(this.Objects[i]);
                }
                if (by === 'type' && this.Objects[i].Type.startsWith(value)) {
                    found.push(this.Objects[i]);
                }
            }
            return found;
        };

        return MapLayer;
    }());
}());