(function() {
    "use strict";

    if (!LDBB.State) LDBB.State = {};

    LDBB.State.SplashState = (function() {
        function SplashState(nextState) {
            LDBB.State.State.apply(this, arguments);
            this.Priority = 1000;

            this._showForTicks = 60;
            this._nextState = nextState;
            this._counter = 0;
        }

        SplashState.prototype = Object.create(LDBB.State.State.prototype);
        SplashState.prototype.constructor = SplashState;

        SplashState.prototype.Tick = function(context) {
            if (this._counter % 60 === 0) {
                context.Get("core.assets").Assets["ldbb.core.wav.loading-tone"].Play();
            }
            if (this._counter++ >= this._showForTicks) {
                context.Get("core.states").Unselect("ldbb.core.splash");
                context.Get("core.states").Select(this._nextState);
            }
        };

        SplashState.prototype.Draw = function(context, canvas) {
            canvas.Fill("black");

            var logo = context.Get("core.assets").Assets["ldbb.core.img.logo"];
            var scale = 4;

            canvas.DrawScaledSprite(logo, (canvas.Width - (logo.Width * scale)) / 2, (canvas.Height - (logo.Height * scale)) / 2, scale);
        };

        return SplashState;
    }());
}());