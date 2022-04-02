(function () {
    'use strict';

    if (!LDBB.ECS) LDBB.ECS = {};

    LDBB.ECS.System = (function() {
        function System(filter) {
            this.Filter = filter;
            this.Entities = [];
        }

        System.prototype.TickEntity = function(entity, context) {};
        System.prototype.DrawEntity = function(entity, context, canvas) {};

        return System;
    }());
}());