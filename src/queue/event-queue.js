(function() {
    'use strict';

    if (!LDBB.Queue) LDBB.Queue = {};

    LDBB.Queue.EventQueue = (function() {
        function EventQueue() {
            this._log = new LDBB.Core.Logger('LDBB.Queue.EventQueue');

            this.Listeners = {};
            this.Channels = [];
        }

        EventQueue.prototype.AddChannel = function(name) {
            if (this.Channels.indexOf(name) !== -1) {
                this._log.Warn('Attempt to add duplicate channel: ' + name);
                return;
            }
            this.Channels.push(name);
            this.Listeners[name] = [];
        };

        EventQueue.prototype.On = function(channel, callback) {
            if (this.Channels.indexOf(channel) === -1) {
                this._log.Warn('Attempt to subscribe to unknown channel: ' + channel);
                return;
            }
            this.Listeners[channel].push(callback);
        };

        EventQueue.prototype.Dispatch = function(channel, event) {
            if (this.Channels.indexOf(channel) === -1) {
                this._log.Warn('Attempt to dispatch a message to unknown channel: ' + channel);
            }

            var listeners = this.Listeners[channel];
            for (var i = 0; i < listeners.length; ++i) {
                listeners[i](event);
            }
        };

        return EventQueue;
    }());
}());