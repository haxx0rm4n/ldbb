(function () {
  "use strict";

  if (!LDBB.Core) LDBB.Core = {};

  LDBB.Core.Logger = (function () {
    function Logger(tag) {
      this.tag = tag;
    }

    Logger.prototype.Log = function (value) {
      console.log("[" + this.tag + "] " + value.toString());
    };

    Logger.prototype.Warn = function (value) {
      console.warn("[" + this.tag + "] " + value.toString());
    };

    return Logger;
  }());
}());
