(function() {
    'use strict';

    if (!LDBB.ECS) LDBB.ECS = {};

    LDBB.ECS.Entity = (function() {
        function Entity(type, components = []) {
            this.Type = type;
            this.Components = components;
        }

        Entity.prototype.HasComponents = function(types) {
            var matchCount = 0;
            for (var i = 0; i < this.Components.length; ++i) {
                var match = false;
                for (var j = 0; j < types.length; ++j) {
                    if (this.Components[i].Type === types[j]) {
                        match = true;
                        break;
                    }
                }
                matchCount += match ? 1 : 0;
            }
            return matchCount === types.length;
        };

        return Entity;
    }());
}());