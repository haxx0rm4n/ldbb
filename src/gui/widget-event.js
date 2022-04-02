(function() {
    'use strict';

    if (!LDBB.GUI) LDBB.GUI = {};

    LDBB.GUI.WidgetEvent = (function() {
        function WidgetEvent(type, data) {
            this.Type = type;
            this.Data = data;
        }

        return WidgetEvent;
    }());
}());