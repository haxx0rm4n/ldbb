(function () {
    'use strict';

    if (!LDBB.ECS) LDBB.ECS = {};

    LDBB.ECS.ECS = (function () {
        function ECS() {
            this.Systems = [];
            this.Entities = [];
        }

        ECS.prototype.AddSystem = function(system) {
            this.Systems.push(system);
        };

        ECS.prototype.AddEntity = function(entity) {
            this.Entities.push(entity);
        };

        ECS.prototype.FindEntitiesWithComponents = function(types) {
            var entities = [];
            for (var i = 0; i < this.Entities.length; ++i) {
                if (this.Entities[i].HasComponents(types)) {
                    entities.push(this.Entities[i]);
                }
            }
            return entities;
        };

        ECS.prototype.UpdateSystemEntityCache = function() {
            for (var i = 0; i < this.Systems.length; ++i) {
                this.Systems[i].Entities = this.FindEntitiesWithComponents(this.Systems[i].Filter);
            }
        };

        ECS.prototype.Tick = function(context) {
            for (var i = 0; i < this.Systems.length; ++i) {
                var system = this.Systems[i];
                for (var j = 0; j < system.Entities.length; ++j) {
                    system.TickEntity(system.Entities[j], context);
                }
            }
        };

        ECS.prototype.Draw = function(context, canvas) {
            for (var i = 0; i < this.Systems.length; ++i) {
                var system = this.Systems[i];
                for (var j = 0; j < system.Entities.length; ++j) {
                    system.DrawEntity(system.Entities[j], context, canvas);
                }
            }
        };

        return ECS;
    }());
}());