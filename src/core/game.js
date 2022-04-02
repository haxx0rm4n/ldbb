(function() {
    "use strict";

    if (!LDBB.Core) LDBB.Core = {};

    LDBB.Core.Game = (function() {
        function Game() {
            this._log = new LDBB.Core.Logger("LDBB.Core.Game");
            this._config = {
                rate: [20, 60],
                size: [400, 300],
                scale: 2
            };

            this.Input = new LDBB.Input.InputHandler();
            this.Input.Use("kbd", new LDBB.Input.KeyboardInputWatcher());
            this.Input.Use("mse", new LDBB.Input.MouseInputWatcher());

            this.States = new LDBB.State.StateHandler();

            this.Context = new LDBB.Core.Context();
            this.Context.Set("core.input", this.Input);
            this.Context.Set("core.states", this.States);
        }

        Game.prototype.SetRate = function(tps, fps) {
            this._config.rate = [tps, fps];
            return this;
        };

        Game.prototype.SetSize = function(width, height) {
            this._config.size = [width, height];
            return this;
        };

        Game.prototype.SetScale = function(scale) {
            this._config.scale = scale;
            return this;
        }

        Game.prototype.Init = function() {
            // -- Configure: Context
            this.Context.Set("canvas.width", this._config.size[0]);
            this.Context.Set("canvas.height", this._config.size[1]);
            this.Context.Set("canvas.scale", this._config.scale);

            // -- Create: Canvas
            this.Canvas = new LDBB.GFX.Canvas(
                this._config.size[0],
                this._config.size[1],
                this._config.scale
            );

            // -- Create: Loop
            this.Loop = new LDBB.Core.Loop(
                this._config.rate[0],
                this._config.rate[1]
            );
            this.Loop.OnInit = this._onInit.bind(this);
            this.Loop.OnTick = this._onTick.bind(this);
            this.Loop.OnDraw = this._onDraw.bind(this);

            // -- Attach input handlers
            this.Input.Attach(this.Canvas);

            // -- Allow chaining
            return this;
        };

        Game.prototype.Start = function() {
            this.Loop.Start();
            return this;
        };

        Game.prototype._onInit = function() {
            this.States.InitAll(this.Context);
        };

        Game.prototype._onTick = function(dt, ticks) {
            this.Context.Set("core.ticks", ticks);
            this.Context.ClearSession();
            this.Context.SSet("dt", dt);

            this.States.Tick(this.Context);
        };

        Game.prototype._onDraw = function(dt) {
            this.Context.ClearSession();
            this.Context.SSet("dt", dt);

            this.States.Draw(this.Context, this.Canvas);
        };

        return Game;
    }());
}());