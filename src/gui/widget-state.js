(function() {
    'use strict';

    if (!LDBB.GUI) LDBB.GUI = {};

    LDBB.GUI.WidgetState = (function() {
        function WidgetState() {
            LDBB.State.State.apply(this, arguments);

            this.Priority = 1000;
            this.RootWidgets = [];

            this._x = 0;
            this._y = 0;
        }

        WidgetState.prototype = Object.create(LDBB.State.State.prototype);
        WidgetState.prototype.constructor = WidgetState;

        WidgetState.prototype.Tick = function(context) {
            var mouse = context.Get('core.input').Values['mse'];
            var mouseBox = new LDBB.Math.Box(mouse.X, mouse.Y, 1, 1);

            // TODO: This only works properly if nested widgets are contained within the parent.

            for (var i = 0; i < this.RootWidgets.length; ++i) {
                var widget = this.RootWidgets[i];
                if (widget.Box.CollidesWith(mouseBox)) {
                }
            }
        };

        WidgetState.prototype.Draw = function(context, canvas) {
            for (var i = 0; i < this.RootWidgets.length; ++i) {
                this.RootWidgets[i].Draw(context, canvas);
            }

            canvas.Plot(this._x, this._y, 'red');
        };

        WidgetState.prototype.FireEvent = function(event) {
            this._fireEvent(event, this.RootWidgets);
        };

        WidgetState._fireEvent = function(event, widgets) {
            for (var i = 0; i < widgets.length; ++i) {
                var status = widgets[i].HandleEvent(event);
                if (status === false) {
                    return;
                }

                for (var j = 0; j < widgets[i].Children.length; ++j) {
                    this._fireEvent(event, widgets[i].Children[j]);
                }
            }
        };

        return WidgetState;
    }());
}());