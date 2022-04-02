(function() {
  "use strict";

  if (!LDBB.Core) LDBB.Core = {};

  LDBB.Core.Loop = (function() {
    function Loop(tps, fps) {
      this._log = new LDBB.Core.Logger("LDBB.Core.Loop");

      this.FPS = 0;
      this.TPS = 0;
      this.TickRate = 1000 / tps;
      this.DrawRate = 1000 / fps;
      this.OnInit = null;
      this.OnTick = null;
      this.OnDraw = null;
      this.OnFPS = null;
      this.Ticks = 0;
    }

    Loop.prototype.Start = function() {
      var rate = Math.max(this.TickRate, this.DrawRate);

      function handler(_loop) {
        var currentTime = Date.now();
        var tookTime = currentTime - _loop._lastLoop;
        _loop._lastLoop = currentTime;

        _loop._unprocessed.T += tookTime;
        if (_loop._unprocessed.T > 1000) {
          _loop._unprocessed.T = 1000;
        }

        _loop._unprocessed.D += tookTime;
        if (_loop._unprocessed.D > 1000) {
          _loop._unprocessed.D = 1000;
        }

        while (_loop._unprocessed.T > _loop.TickRate) {
          _loop._unprocessed.T -= _loop.TickRate;
          ++_loop._count.T;
          ++_loop.Ticks;

          if (_loop.OnTick) {
            try {
              _loop.OnTick(currentTime - _loop._lastTick, _loop.Ticks);
            } catch (ex) {
              _loop._log.Warn("(OnTick) Caught exception: " + ex);
            }
          }

          _loop._lastTick = currentTime;
        }

        while (_loop._unprocessed.D > _loop.DrawRate) {
          _loop._unprocessed.D -= _loop.DrawRate;
          ++_loop._count.D;

          if (_loop.OnDraw) {
            try {
              _loop.OnDraw(currentTime - _loop._lastDraw);
            } catch (ex) {
              _loop._log.Warn("(OnDraw) Caught exception: " + ex);
            }
          }

          _loop._lastDraw = currentTime;
        }

        if (_loop._lastCount + 1000 < currentTime) {
          _loop._lastCount = currentTime;

          _loop.FPS = _loop._count.D;
          _loop.TPS = _loop._count.T;
          _loop._count.D = 0;
          _loop._count.T = 0;

          if (_loop.OnFPS) {
            try {
              _loop.OnFPS(_loop.FPS, _loop.TPS);
            } catch (ex) {
              _loop._log.Warn("(OnFPS) Caught exception: " + ex);
            }
          }
        }

        requestAnimationFrame(() => handler(_loop));
      }

      if (this.OnInit) {
        try {
          this.OnInit();
        } catch (ex) {
          this._log.Info("(OnInit) Caught exception: " + ex);
        }
      }

      this._lastTick = 0;
      this._lastDraw = 0;
      this._lastCount = 0;
      this._lastLoop = Date.now();
      this._unprocessed = { D: Date.now(), T: Date.now() };
      this._count = { D: 0, T: 0 };

      handler(this);
    };

    return Loop;
  }());
}());
