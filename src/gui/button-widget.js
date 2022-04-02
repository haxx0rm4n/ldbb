(function () {
    'use strict';

    if (!LDBB.GUI) LDBB.GUI = {};

    LDBB.GUI.ButtonWidget = (function () {
        function ButtonWidget(id, label, width, height = 16) {
            LDBB.GUI.Widget.apply(this, arguments);

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
            canvas.FillRect(
                this.Box.Position.X, this.Box.Position.Y,
                this.Box.Size[0], this.Box.Size[1],
                this.State.MouseDown ? '#576' : (this.State.MouseOver ? '#506058' : '#555')
            );
            canvas.DrawText(this.Label, this.Box.Position.X + 5, this.Box.Position.Y + 11, '#FFF');
        };

        return ButtonWidget;
    }());
}());