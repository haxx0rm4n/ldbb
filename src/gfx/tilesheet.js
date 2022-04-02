(function() {
  "use strict";

  if (!LDBB.GFX) LDBB.GFX = {};

  LDBB.GFX.TileSheet = (function() {
    function TileSheet(filename, tileWidth, tileHeight, onLoad) {
      this.Sprite = new LDBB.GFX.Sprite(
          filename,
          this._handleLoad.bind(this));
      this.Loaded = false;
      this.TileWidth = tileWidth;
      this.TileHeight = tileHeight;
      this.OnLoad = onLoad;
    }

    TileSheet.prototype._handleLoad = function() {
      this.Loaded = true;
      this.Columns = Math.floor(this.Sprite.Width / this.TileWidth);
      this.Rows = Math.floor(this.Sprite.Height / this.TileHeight);
      this.TileCount = this.Columns * this.Rows;

      if (this.OnLoad) this.OnLoad(this);
    };

    TileSheet.prototype.GetTileCoordinates = function(id) {
      var column = id % this.Columns;
      var row = Math.floor(id / this.Columns);

      return new LDBB.Math.Vector2(
        column * this.TileWidth,
        row * this.TileHeight
      );
    };

    return TileSheet;
  }());
}());
