(function () {
    'use strict';

    // == [Component] BoxComponent

    window.BoxComponent = (function () {
        function BoxComponent(x = 0, y = 0, width = 8, height = 8) {
            LDBB.ECS.Component.apply(this, ['box']);

            this.Box = new LDBB.Math.Box(x, y, width, height);
        }

        BoxComponent.prototype = Object.create(LDBB.ECS.Component.prototype);
        BoxComponent.prototype.constructor = BoxComponent;

        return BoxComponent;
    }());

    // == [System] RenderSystem

    window.RenderSystem = (function () {
        function RenderSystem() {
            LDBB.ECS.System.apply(this, [['box']]);
        }

        RenderSystem.prototype = Object.create(LDBB.ECS.System.prototype);
        RenderSystem.prototype.constructor = RenderSystem;

        RenderSystem.prototype.DrawEntity = function (entity, context, canvas) {
            var box = entity.Get('box');
            if (box === null) return;
            box = box.Box;

            canvas.FillRect(box.Position.X, box.Position.Y, box.Size[0], box.Size[1], '#F00');
        };

        return RenderSystem;
    }());

    // == [System] MoveSystem

    window.MoveSystem = (function () {
        function MoveSystem() {
            LDBB.ECS.System.apply(this, [['box']]);
        }

        MoveSystem.prototype = Object.create(LDBB.ECS.System.prototype);
        MoveSystem.prototype.constructor = MoveSystem;

        MoveSystem.prototype.TickEntity = function (entity, context) {
            var box = entity.Get('box');
            if (box === null) return;
            box = box.Box;

            var map = context.SGet('map');
            if (map === null) return;

            var input = context.Get('core.input');

            var newBox = box.Copy();

            if (input.Check('L')) --newBox.Position.X;
            if (input.Check('R')) ++newBox.Position.X;
            if (input.Check('U')) --newBox.Position.Y;
            if (input.Check('D')) ++newBox.Position.Y;

            var colliders = map.Layers.CollisionMask.Objects;
            var collided = false;
            for (var i = 0; i < colliders.length; ++i) {
                if (newBox.CollidesWith(colliders[i].Box)) {
                    collided = true;
                    break;
                }
            }

            if (!collided) {
                box.Position.X = newBox.Position.X;
                box.Position.Y = newBox.Position.Y;
                box.Size[0] = newBox.Size[0];
                box.Size[1] = newBox.Size[1];
            }
        };

        return MoveSystem;
    }());

    // == [State] MainState

    window.MainState = (function () {
        function MainState() {
            LDBB.State.State.apply(this, arguments);

            this._map = null;
            this._mapRenderer = null;

            this._ecs = null;
        }

        MainState.prototype = Object.create(LDBB.State.State.prototype);
        MainState.prototype.constructor = MainState;

        MainState.prototype.Init = function (context) {
            this._map = context.Get('core.assets').Assets['map.level-1'];
            this._mapRenderer = new LDBB.Map.MapRenderer(this._map);

            this._ecs = new LDBB.ECS.ECS();

            // -- create placeholder entity representing the player
            var player = new LDBB.ECS.Entity('player', [
                new BoxComponent(56, 32, 8, 8)
            ]);

            this._ecs.AddSystem(new RenderSystem());
            this._ecs.AddSystem(new MoveSystem());
            this._ecs.AddEntity(player);

            this._ecs.UpdateSystemEntityCache();
        };

        MainState.prototype.Tick = function (context) {
            if (this._map !== null) {
                context.SSet('map', this._map);
                this._mapRenderer.Tick(context);
            }
            if (this._ecs !== null)
                this._ecs.Tick(context);
        };

        MainState.prototype.Draw = function (context, canvas) {
            canvas.Fill('#222');


            if (this._map !== null)
                this._mapRenderer.Draw(context, canvas);
            if (this._ecs !== null)
                this._ecs.Draw(context, canvas);
        };

        return MainState;
    }());
}());