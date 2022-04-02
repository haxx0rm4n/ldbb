(function() {
  "use strict";

  if (!LDBB.Math) LDBB.Math = {};

  LDBB.Math.Vector2 = (function() {
    function Vector2(x, y) {
      this.X = x;
      this.Y = y;
    }

    Vector2.fromArray = function(a) {
      return new Vector2(a[0], a[1]);
    }

    Vector2.fromObject = function(o) {
      if (o.hasOwnProperty("X") && o.hasOwnProperty("Y")) {
        return new Vector2(a.X, a.Y);
      } else if (o.hasOwnProperty("x") && o.hasOwnProperty("y")) {
        return new Vector2(a.x, a.y);
      }

      return null;
    }

    Vector2.prototype.Add = function(x_or_v2, y) {
      if (x_or_v2 instanceof Vector2) {
        this.X += x_or_v2.X;
        this.Y += x_or_v2.Y;
      } else {
        this.X += x_or_v2;
        this.Y += y;
      }

      return this;
    }

    Vector2.prototype.Subtract = function(x_or_v2, y) {
      if (x_or_v2 instanceof Vector2) {
        this.X -= x_or_v2.X;
        this.Y -= x_or_v2.Y;
      } else {
        this.X -= x_or_v2;
        this.Y -= y;
      }

      return this;
    }

    Vector2.prototype.Multiply = function(v) {
      this.x *= v;
      this.y *= v;

      return this;
    }

    Vector2.prototype.Length = function() {
      return Math.sqrt(this.X * this.X + this.Y * this.Y);
    };

    Vector2.prototype.Copy = function() {
      return Vector2.fromObject(this);
    };

    Vector2.prototype.Normalize = function() {
      var length = this.Length();
      this.X /= length;
      this.Y /= length;

      return this;
    };

    return Vector2;
  }());
}());
