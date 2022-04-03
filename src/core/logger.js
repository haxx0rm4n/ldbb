(function () {
  "use strict";

  if (!LDBB.Core) LDBB.Core = {};

  LDBB.Core.Logger = (function () {
    function Logger(tag) {
      this.Tag = tag;
      this.Disabled = [];
    }

    Logger.prototype.Log = function (value) {
      if (this.Disabled.indexOf('log') !== -1) return;
      console.log("[" + this.Tag + "] " + value.toString());
    };

    Logger.prototype.Warn = function (value) {
      if (this.Disabled.indexOf('warn') !== -1) return;
      console.warn("[" + this.Tag + "] " + value.toString());
    };

    Logger.prototype.Error = function (value) {
      if (this.Disabled.indexOf('error') !== -1) return;
      console.error("[" + this.Tag + "] " + value.toString());
    };

    Logger.prototype.Info = function (value) {
      if (this.Disabled.indexOf('info') !== -1) return;
      console.info("[" + this.Tag + "] " + value.toString());
    };

    return Logger;
  }());
}());
