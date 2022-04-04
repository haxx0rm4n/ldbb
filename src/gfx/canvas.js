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

    Canvas.prototype.DrawText = function(text, x = 8, y = 8, color = '#000', font = 'normal 8px Arial') {
      this.Context.fillStyle = color;
      this.Context.font = font;
      this.Context.fillText(text, x, y);
    };

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
      this.Context.fillStyle = color;
      this.Context.fillRect(x, y, width, 1);
      this.Context.fillRect(x, y + height - 1, width, 1);
      this.Context.fillRect(x, y, 1, height);
      this.Context.fillRect(x + width - 1, y, 1, height);
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

    Canvas.prototype.DrawScaledSprite = function(sprite, x, y, scale = 1) {
      if (sprite.IsLoaded) {
        this.Context.save();
        this.Context.translate(x, y);
        this.Context.scale(scale, scale);
        this.Context.drawImage(sprite.Image, -sprite.Width / 2, -sprite.Height / 2);
        this.Context.restore();
      }
    };

    Canvas.prototype.DrawRotatedSprite = function(sprite, x, y, angle = 0) {
      if (sprite.IsLoaded) {
        this.Context.save();
        this.Context.translate(x, y);
        this.Context.rotate(angle * Math.PI / 180);
        this.Context.drawImage(sprite.Image, -sprite.Width / 2, -sprite.Height / 2);
        this.Context.restore();
      }
    };

    Canvas.prototype.DrawRotatedScaledSprite = function(sprite, x, y, angle = 0, scale = 1) {
      if (sprite.IsLoaded) {
        this.Context.save();
        this.Context.translate(x, y);
        this.Context.rotate(angle * Math.PI / 180);
        this.Context.scale(scale, scale);
        this.Context.drawImage(sprite.Image, -sprite.Width / 2, -sprite.Height / 2);
        this.Context.restore();
      }
    };

    Canvas.prototype.DrawPartialSprite = function(sprite, dx, dy, sx, sy, width, height) {
      if (sprite.IsLoaded) {
        this.Context.drawImage(sprite.Image, sx, sy, width, height, dx, dy, width, height);
      }
    };

    Canvas.prototype.DrawScaledPartialSprite = function(sprite, dx, dy, sx, sy, width, height, scale = [1, 1]) {
      if (sprite.IsLoaded) {
        this.Context.save();
        this.Context.translate(dx, dy);
        this.Context.scale(scale[0], scale[1]);
        this.Context.drawImage(sprite.Image, sx, sy, width, height, -width / 2, -height / 2, width, height);
        this.Context.restore();
      }
    };

    Canvas.prototype.DrawRotatedScaledPartialSprite = function(sprite, dx, dy, sx, sy, width, height, angle = 0, scale = 1, pivot = null) {
      if (sprite.IsLoaded) {

        if (pivot === null)
          pivot = [-width / 2, -height / 2];

        this.Context.save();
        this.Context.translate(dx, dy);
        this.Context.rotate(angle * Math.PI / 180);
        this.Context.scale(scale, scale);
        this.Context.drawImage(sprite.Image, sx, sy, width, height, pivot[0], pivot[1], width, height);
        this.Context.restore();
      }
    };

    Canvas.prototype.DrawTile = function(tilesheet, id, x, y) {
      if (!tilesheet.Sprite.IsLoaded) return;

      var coords = tilesheet.GetTileCoordinates(id);
      this.DrawPartialSprite(tilesheet.Sprite, x, y, coords.X, coords.Y, tilesheet.TileWidth, tilesheet.TileHeight);
    };

    Canvas.prototype.DrawAnimatedSprite = function(animatedSprite, x, y) {
      this.DrawTile(animatedSprite.Tilesheet, animatedSprite.CurrentIndex, x, y);
    };

    return Canvas;
  }());
}());
