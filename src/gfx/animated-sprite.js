(function() {
  "use strict";

  if (!LDBB.GFX) LDBB.GFX = {};

  LDBB.GFX.AnimatedSprite = (function() {
    function AnimatedSprite(tilesheet, startIndex, endIndex) {
      this.Tilesheet = tilesheet;
      this.StartIndex = startIndex;
      this.EndIndex = endIndex;
      this.CurrentIndex = startIndex;
    }

    AnimatedSprite.prototype.NextFrame = function() {
      ++this.CurrentIndex;
      if (this.CurrentIndex === this.EndIndex) {
        this.CurrentIndex = this.StartIndex;
      }
    };

    return AnimatedSprite;
  }());
}());
