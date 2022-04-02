(function() {
    'use strict';

    if (!LDBB.Queue) LDBB.Queue = {};

    LDBB.Queue.Event = (function() {
        function Event(type, data = {}) {
            this.Type = type;
            this.Data = data;
        }

        return Event;
    }());

    LDBB.newEvent = function(type, data) {
        return new LDBB.Queue.Event(type, data);
    };
}());