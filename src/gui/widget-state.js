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

        WidgetState.prototype.Init = function(context) {
            for (var i = 0; i < this.RootWidgets.length; ++i) {
                this.RootWidgets[i].Init(context);
            }
        };

        WidgetState.prototype.Tick = function(context) {
            var queue = context.Get('core.queue');
            var input = context.Get('core.input');
            var mouse = input.Values['mse'];
            var mouseBox = new LDBB.Math.Box(mouse.X, mouse.Y, 1, 1);

            // TODO: This only works properly if nested widgets are contained within the parent.

            for (var i = 0; i < this.RootWidgets.length; ++i) {
                var widget = this.RootWidgets[i];
                var currentState = widget.State.MouseDown;
                var fireEventIfChanged = function() {
                    if (currentState !== widget.State.MouseDown) {
                        if (currentState - widget.State.MouseDown < 0) {
                            queue.Dispatch('ldbb.widget', LDBB.newEvent('mouse-down', { Id: widget.Id }));
                        } else {
                            queue.Dispatch('ldbb.widget', LDBB.newEvent('mouse-up', { Id: widget.Id }));
                        }
                    }
                }.bind(this);

                if (widget.Box.CollidesWith(mouseBox)) {
                    if (input.Check('mouse-left')) {
                        widget.State.MouseDown = true;
                    } else {
                        widget.State.MouseDown = false;
                    }
                    fireEventIfChanged();

                    if (widget.State.MouseOver) {
                        continue;
                    }

                    widget.State.MouseOver = true;
                    queue.Dispatch('ldbb.widget', LDBB.newEvent('mouse-in', { Id: widget.Id }));
                } else {
                    if (!widget.State.MouseOver) {
                        continue;
                    }

                    widget.State.MouseOver = false;
                    widget.State.MouseDown = false;
                    queue.Dispatch('ldbb.widget', LDBB.newEvent('mouse-out', { Id: widget.Id }));
                }

            }
        };

        WidgetState.prototype.Draw = function(context, canvas) {
            for (var i = 0; i < this.RootWidgets.length; ++i) {
                this.RootWidgets[i].Draw(context, canvas);
            }

            canvas.Plot(this._x, this._y, 'red');
        };

        return WidgetState;
    }());
}());