(function () {
  "use strict";

  if (!LDBB.GFX) LDBB.GFX = {};

  LDBB.GFX.Tilesheet = (function () {
    function Tilesheet(filename, tileWidth, tileHeight, onLoad) {
      this.Sprite = new LDBB.GFX.Sprite(
        filename,
        function (sprite) {
          this._handleLoad();
        }.bind(this)
      );
      this.IsLoaded = false;
      this.TileWidth = tileWidth;
      this.TileHeight = tileHeight;
      this.OnLoad = onLoad;
    }

    Tilesheet._log = new LDBB.Core.Logger('LDBB.GFX.Tilesheet');

    Tilesheet.prototype._handleLoad = function () {
      this.IsLoaded = true;
      this.Columns = Math.floor(this.Sprite.Width / this.TileWidth);
      this.Rows = Math.floor(this.Sprite.Height / this.TileHeight);
      this.TileCount = this.Columns * this.Rows;

      if (this.OnLoad instanceof Function)
        this.OnLoad(this);
    };

    Tilesheet.prototype.GetTileCoordinates = function (id) {
      var column = id % this.Columns;
      var row = Math.floor(id / this.Columns);

      return new LDBB.Math.Vector2(
        column * this.TileWidth,
        row * this.TileHeight
      );
    };

    return Tilesheet;
  }());
}());
