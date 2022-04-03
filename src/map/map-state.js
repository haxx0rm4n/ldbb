(function () {
    'use strict';

    if (!LDBB.Map) LDBB.Map = {};

    LDBB.Map.MapState = (function () {
        function MapState(map) {
            LDBB.State.State.apply(this, arguments);

            this.Map = map;
        }

        MapState.prototype = Object.create(LDBB.State.State.prototype);
        MapState.prototype.constructor = MapState;

        MapState.prototype.Tick = function (context) {

        };

        MapState.prototype.Draw = function (context, canvas) {

        };

        return MapState;
    }());
})