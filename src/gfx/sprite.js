(function() {
  "use strict";

  if (!LDBB.GFX) LDBB.GFX = {};

  LDBB.GFX.Sprite = (function() {
    function Sprite(filename, onLoad) {
      this.Filename = filename;
      this.IsLoaded = false;
      this.Image = new Image();
      this.Image.src = filename;
      this.Image.onload = this._handleLoad.bind(this);
      this.OnLoad = onLoad;
    }

    Sprite.prototype._handleLoad = function() {
      this.IsLoaded = true;
      this.Width = this.Image.width;
      this.Height = this.Image.height;
      if (this.OnLoad) {
        this.OnLoad(this);
      }
    };

    return Sprite;
  }());
}());
