(function () {
    'use strict';

    if (!LDBB.Map.MapObject) LDBB.Map.MapObject = {};

    LDBB.Map.MapObject = (function () {
        function MapObject(id = null) {
            this.Id = id;
            this.Name = null;
            this.Properties = {};
            this.Width = 0;
            this.Height = 0;
            this.Position = new LDBB.Math.Vector2(0, 0);
        }

        MapObject.FromTMJ = function(obj) {
            var _ = new LDBB.Map.MapObject();

            if (obj['id'] instanceof Number)
                _.Id = obj['id'];
            if (obj['name'] instanceof String)
                _.Name = obj['name'];
            if (obj['properties'] instanceof Object)
                _.Properties = obj['properties'];
            if (obj['width'] instanceof Object)
                _.Width = obj['width'];
            if (obj['height'] instanceof Object)
                _.Height = obj['height'];
            if (obj['x'] instanceof Number)
                _.Position.X = obj['x'];
            if (obj['y'] instanceof Number)
                _.Position.Y = obj['y'];

            return _;
        }

        return MapObject;
    }());
}());