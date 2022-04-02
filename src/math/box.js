(function () {
    'use strict';

    if (!LDBB.Math) LDBB.Math = {};

    LDBB.Math.Box = (function() {
        function Box(x, y, width, height) {
            this.Position = new LDBB.Math.Vector2(x, y);
            this.Size = [width, height];
        }

        Box.fromArrays = function(p1, p2) {
            return new Box(p1[0], p1[1], p2[0] - p1[0], p2[1] - p1[1]);
        };

        Box.fromObjects = function(p1, p2) {
            return new Box(p1.X, p1.Y, p2.X - p1.X, p2.Y - p1.Y);
        };

        Box.prototype.CollidesWith = function(box) {
            return (
                this.Position.X < box.Position.X + box.Size[0] &&
                this.Position.X + this.Size[0] > box.Position.X &&
                this.Position.Y < box.Position.Y + box.Size[1] &&
                this.Position.Y + this.Size[1] > box.Position.Y
            );
        };

        return Box;
    }());
}());