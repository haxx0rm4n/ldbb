(function () {
    'use strict';

    if (!LDBB.GUI) LDBB.GUI = {};

    LDBB.GUI.ButtonWidget = (function () {
        function ButtonWidget(id, label, width, height = 16) {
            LDBB.GUI.Widget.apply(this, [id]);

            this.Label = label;
            this.Box.Size = [width, height];
            this.RisingEdge = true;
        }

        ButtonWidget.prototype = Object.create(LDBB.GUI.Widget.prototype);
        ButtonWidget.prototype.constructor = ButtonWidget;

        ButtonWidget.prototype.HandleEvent = function (event) {
            if (event.Data.Id !== this.Id) {
                return;
            }
            if (this.RisingEdge && event.Type === 'mouse-up' && this.OnClick) {
                this.OnClick();
            }
            if (!this.RisingEdge && event.Type === 'mouse-down' && this.OnClick) {
                this.OnClick();
            }
        };

        ButtonWidget.prototype.DrawWidget = function (context, canvas) {
            var colorBg =
                this.State.MouseDown
                    ? 'rgba(0,0,0,.8)'
                    : this.State.MouseOver
                        ? 'rgba(0,0,0,.7)'
                        : 'rgba(0,0,0,.6)';
            var colorBd =
                this.State.MouseDown
                    ? 'rgba(0,0,0,.5)'
                    : this.State.MouseOver
                        ? 'rgba(0,0,0,.4)'
                        : 'rgba(0,0,0,.3)';
            var colorCr =
                this.State.MouseDown
                    ? 'rgba(0,0,0,.3)'
                    : this.State.MouseOver
                        ? 'rgba(0,0,0,.2)'
                        : 'rgba(0,0,0,.1)';

            canvas.FillRect(
                this.Box.Position.X + 1, this.Box.Position.Y + 1,
                this.Box.Size[0] - 2, this.Box.Size[1] - 2,
                colorBg
            );

            canvas.FillRect(
                this.Box.Position.X + 1, this.Box.Position.Y,
                this.Box.Size[0] - 2, 1,
                colorBd
            );
            canvas.FillRect(
                this.Box.Position.X + 1, this.Box.Position.Y + this.Box.Size[1] - 1,
                this.Box.Size[0] - 2, 1,
                colorBd
            );
            canvas.FillRect(
                this.Box.Position.X, this.Box.Position.Y + 1,
                1, this.Box.Size[1] - 2,
                colorBd
            );
            canvas.FillRect(
                this.Box.Position.X + this.Box.Size[0] - 1, this.Box.Position.Y + 1,
                1, this.Box.Size[1] - 2,
                colorBd
            );

            canvas.Plot(
                this.Box.Position.X,
                this.Box.Position.Y,
                colorCr
            );
            canvas.Plot(
                this.Box.Position.X + this.Box.Size[0] - 1,
                this.Box.Position.Y,
                colorCr
            );
            canvas.Plot(
                this.Box.Position.X,
                this.Box.Position.Y + this.Box.Size[1] - 1,
                colorCr
            );
            canvas.Plot(
                this.Box.Position.X + this.Box.Size[0] - 1,
                this.Box.Position.Y + this.Box.Size[1] - 1,
                colorCr
            );

            canvas.DrawText(this.Label, this.Box.Position.X + 5, this.Box.Position.Y + 11, '#FFF');
        };

        return ButtonWidget;
    }());
}());