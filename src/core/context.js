(function() {
    "use strict";

    if (!LDBB.Core) LDBB.Core = {};

    LDBB.Core.Context = (function() {
        function Context() {
            this._globals = {};
            this._session = {};
        }

        Context.prototype.Get = function(key, defValue = null) {
            if (!this._globals.hasOwnProperty(key)) {
                return defValue;
            }
            return this._globals[key];
        };

        Context.prototype.Set = function(key, value) {
            this._globals[key] = value;
        };

        Context.prototype.SGet = function(key, defValue = null) {
            if (!this._session.hasOwnProperty(key)) {
                return defValue;
            }
            return this._session[key];
        };

        Context.prototype.SSet = function(key, value) {
            this._session[key] = value;
        }

        Context.prototype.ClearSession = function() {
            this._session = {};
        };

        return Context;
    }());
}());