(function () {
    'use strict';

    if (!LDBB.Map.MapObject) LDBB.Map.MapObject = {};

    LDBB.Map.MapObject = (function () {
        function MapObject(id = null) {
            this.Id = id;
            this.Name = null;
            this.Type = null;
            this.Properties = {};
            this.Box = new LDBB.Math.Box(0, 0, 0, 0);
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
                _.Box.Size[0] = obj['width'];
            if (typeof obj['height'] === 'number')
                _.Box.Size[1] = obj['height'];
            if (typeof obj['x'] === 'number')
                _.Box.Position.X = obj['x'];
            if (typeof obj['y'] === 'number')
                _.Box.Position.Y = obj['y'];

            return _;
        }

        return MapObject;
    }());
}());