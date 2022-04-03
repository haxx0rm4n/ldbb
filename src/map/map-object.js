(function () {
    'use strict';

    if (!LDBB.Map.MapObject) LDBB.Map.MapObject = {};

    LDBB.Map.MapObject = (function () {
        function MapObject(id = null) {
            this.Id = id;
            this.Name = null;
            this.Type = null;
            this.Properties = {};
            this.Width = 0;
            this.Height = 0;
            this.Position = new LDBB.Math.Vector2(0, 0);
        }

        MapObject._catterpillarize = function(str) {
            var camel = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
            return camel[0].toUpperCase() + camel.substr(1);
        }

        MapObject.FromTMJ = function (obj) {
            var _ = new LDBB.Map.MapObject();

            if (typeof obj['id'] === 'number')
                _.Id = obj['id'];
            if (typeof obj['name'] === 'string')
                _.Name = obj['name'];
            if (typeof obj['type'] === 'string')
                _.Type = obj['type'];
            if (typeof obj['properties'] === 'object') {
                var p = obj['properties'];
                for (var i = 0; i < p.length; ++i) {
                    _.Properties[MapObject._catterpillarize(p[i].name)] = p[i].value;
                }
            }
            if (typeof obj['width'] === 'number')
                _.Width = obj['width'];
            if (typeof obj['height'] === 'height')
                _.Height = obj['height'];
            if (typeof obj['x'] === 'number')
                _.Position.X = obj['x'];
            if (typeof obj['y'] === 'number')
                _.Position.Y = obj['y'];

            return _;
        }

        return MapObject;
    }());
}());