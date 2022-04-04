(function () {
    'use strict';

    if (!LDBB.Map) LDBB.Map = {};

    LDBB.Map.MapRenderer = (function () {
        function MapRenderer(map) {
            this.Map = map;
        }

        MapRenderer.prototype.Tick = function (context) {

        };

        MapRenderer.prototype.Draw = function (context, canvas) {
            var tilesheet = context.Get('core.assets').Assets[this.Map.TilesetName];
            if (!tilesheet) {
                return;
            }

            // -- Draw tile layer.
            var tiles = this.Map.Layers.Tiles;
            for (var y = 0; y < tiles.Height; ++y) {
                for (var x = 0; x < tiles.Width; ++x) {
                    var tile = tiles.TileAt(x, y);
                    var drawX = x * tilesheet.TileWidth;
                    var drawY = y * tilesheet.TileHeight;

                    canvas.DrawTile(tilesheet, tile.Index - 1, drawX, drawY);
                }
            }

            // -- Draw overlay layer.
            var overlay = this.Map.Layers.Overlay;
            for (var y = 0; y < overlay.Height; ++y) {
                for (var x = 0; x < overlay.Width; ++x) {
                    var tile = overlay.TileAt(x, y);
                    var drawX = x * tilesheet.TileWidth;
                    var drawY = y * tilesheet.TileHeight;

                    canvas.DrawTile(tilesheet, tile.Index - 1, drawX, drawY);
                }
            }
        };

        return MapRenderer;
    }());
}());