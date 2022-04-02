(function() {
    'use strict';

    if (!LDBB.ECS) LDBB.ECS = {};

    LDBB.ECS.Component = (function() {
        function Component(type) {
            this.Type = type;
        }

        return Component;
    }());
}());