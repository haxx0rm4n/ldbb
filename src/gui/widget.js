(function () {
    'use strict';

    if (!LDBB.GUI) LDBB.GUI = {};

    LDBB.GUI.Widget = (function () {
        function Widget(id) {
            this.Id = id;
            this.Box = new LDBB.Math.Box(0, 0, 32, 32);
            this.Parent = null;
            this.Children = [];
            this.State = {
                MouseOver: false,
                MouseDown: false
            };

            this._color = '#F0F';
        }

        Widget.prototype.HandleEvent = function (event) { };

        Widget.prototype.Init = function (context) {
            context.Get('core.queue').On('ldbb.widget', function (event) {
                this.HandleEvent(event);
            }.bind(this));
        };

        Widget.prototype.Draw = function (context, canvas) {
            this.DrawWidget(context, canvas);

            context.SSet('widget.x', context.SGet('widget.x', 0) + this.Box.Position.X);
            context.SSet('widget.y', context.SGet('widget.y', 0) + this.Box.Position.Y);

            this.DrawChildren(context, canvas);
        };

        Widget.prototype.DrawWidget = function (context, canvas) {
            var offX = context.SGet('widget.x', 0);
            var offY = context.SGet('widget.y', 0);

            var color = this.State.MouseDown ? 'blue' : this._color;

            canvas.FillRect(
                offX + this.Box.Position.X, offY + this.Box.Position.Y,
                this.Box.Size[0], this.Box.Size[1],
                color
            );
        };

        Widget.prototype.DrawChildren = function (context, canvas) {
            for (var i = 0; i < this.Children.length; ++i) {
                this.Children[i].Draw(context, canvas);
            }
        };

        return Widget;
    }());
}());