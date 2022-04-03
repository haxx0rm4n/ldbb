(function() {
    "use strict";

    if (!LDBB.Core) LDBB.Core = {};

    LDBB.Core.Game = (function() {
        function Game() {
            this._log = new LDBB.Core.Logger("LDBB.Core.Game");
            this._config = {
                rate: [20, 60],
                size: [400, 300],
                scale: 2,
                asyncLoad: true,
                mainState: 'main'
            };
            this.IsRunning = false;
            this.IsInitialized = false;
            this.BasePath = null;

            this.Queue = new LDBB.Queue.EventQueue();
            this.Queue.AddChannel('ldbb.widget');

            this.Assets = new LDBB.GFX.AssetHandler();

            this.Input = new LDBB.Input.InputHandler();
            this.Input.Use("kbd", new LDBB.Input.KeyboardInputWatcher());
            this.Input.Use("mse", new LDBB.Input.MouseInputWatcher());
            this.Input.Assign('mouse-left', ['mse:btn-1']);
            this.Input.Assign('mouse-middle', ['mse:btn-2']);
            this.Input.Assign('mouse-right', ['mse:btn-3']);

            this.States = new LDBB.State.StateHandler();

            this.Context = new LDBB.Core.Context();
            this.Context.Set("core.queue", this.Queue);
            this.Context.Set("core.assets", this.Assets);
            this.Context.Set("core.input", this.Input);
            this.Context.Set("core.states", this.States);
        }

        Game.prototype.ShouldLoadAsync = function(asyncLoad) {
            this._config.asyncLoad = asyncLoad;
            return this;
        };

        Game.prototype.SetMainState = function(name) {
            this._config.mainState = name;
            return this;
        };

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

        Game.prototype.Init = function(basePath) {
            this.BasePath = basePath;

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
            this.Loop.OnFPS = this._onFPS.bind(this);

            // -- Attach input handlers
            this.Input.Attach(this.Canvas);

            // -- Queue engine assets
            this.Assets.Queue("ldbb.core.img.logo", "sprite", "/gfx/logo.png");
            this.Assets.Queue("ldbb.core.wav.loading-tone", "sound", "/audio/loading-tone.wav");

            // -- Create splash state
            this.States.Add("ldbb.splash-state", new LDBB.State.SplashState(this._config.mainState));
            this.States.Select("ldbb.splash-state");

            // -- Allow chaining
            this.IsInitialized = true;
            return this;
        };

        Game.prototype.Start = function() {
            if (!this.IsInitialized) {
                this._log.Error('Attempt to start game before initalizsaton!');
                return;
            }
            this.Assets.LoadAll(this.BasePath, function () {
                this.Loop.Start();
                this.IsRunning = true;
            }.bind(this), this._config.asyncLoad);
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

        Game.prototype._onFPS = function(fps, tps) {
            this.Context.Set('core.tps', tps);
            this.Context.Set('core.fps', fps);
        };

        return Game;
    }());
}());