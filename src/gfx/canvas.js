(function() {
  "use strict";

  if (!LDBB.GFX) LDBB.GFX = {};

  LDBB.GFX.Canvas = (function() {
    function Canvas(width, height, scale) {
      this.Width = width;
      this.Height = height;
      this.Scale = scale;

      this.Root = document.createElement("canvas");
      this.Root.width = width * scale;
      this.Root.height = height * scale;
      this.Root.tabIndex = 1;

      this.Context = this.Root.getContext("2d");
      this.Context.scale(scale, scale);
      this.Context.imageSmoothingEnabled = false;
    }

    Canvas.prototype.Resize = function(width, height, scale) {
      if (scale) {
        this.Context.scale(-this.Scale, -this.Scale);
        this.Scale = scale;
        this.Context.scale(this.Scale, this.Scale);
        this.Context.imageSmoothingEnabled = false;
      }
      this.Width = width * this.Scale;
      this.Height = height * this.Scale;
    }

    Canvas.prototype.Fill = function(color) {
      this.Context.fillStyle = color;
      this.Context.fillRect(0, 0, this.Width, this.Height);
    };

    Canvas.prototype.FillRect = function(x, y, width, height, color) {
      this.Context.fillStyle = color;
      this.Context.fillRect(x, y, width, height);
    };

    Canvas.prototype.Plot = function(x, y, color) {
      this.Context.fillStyle = color;
      this.Context.fillRect(x, y, 1, 1);
    };

    Canvas.prototype.DrawRect = function(x, y, width, height, color) {
      this.Context.strokeStyle = color;
      this.Context.beginPath();
      this.Context.moveTo(x, y);
      this.Context.lineTo(x + width, y);
      this.Context.lineTo(x + width, y + height);
      this.Context.lineTo(x, y + height);
      this.Context.closePath();
      this.Context.stroke();
    };

    Canvas.prototype.DrawLine = function(from, to, color) {
      this.Context.strokeStyle = color;
      this.Context.beginPath();
      this.Context.moveTo(from.X, from.Y);
      this.Context.lineTo(to.X, to.Y);
      this.Context.stroke();
    };

    Canvas.prototype.DrawSprite = function(sprite, x, y) {
      if (sprite.IsLoaded) {
        this.Context.drawImage(sprite.Image, x, y);
      }
    };

    Canvas.prototype.DrawPartialSprite = function(sprite, dx, dy, sx, sy, width, height) {
      if (sprite.IsLoaded) {
        this.Context.drawImage(sprite.Image, sx, sy, width, height, dx, dy, width, height);
      }
    };

    Canvas.prototype.DrawTile = function(tilesheet, id, x, y) {
      var coords = tilesheet.GetTileCoordinates(id);
      this.DrawPartialSprite(
        tilesheet.Sprite,
        x, y,
        coords.X, coords.Y,
        tilesheet.TileWidth, tilesheet.TileHeight
      );
    };

    Canvas.prototype.DrawAnimatedSprite = function(animatedSprite, x, y) {
      this.DrawTile(animatedSprite.Tilesheet, animatedSprite.CurrentIndex, x, y);
    };

    return Canvas;
  }());
}());
