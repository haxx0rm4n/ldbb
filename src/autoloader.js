(function () {
    'use strict';

    window.LDBB = {};

    LDBB._ready = false;
    LDBB._onReady = function () {
        if (LDBB._readyCallback instanceof Function)
            LDBB._readyCallback();
    };
    LDBB._readyCallback = null;
    LDBB._basePath = null;
    LDBB._mainPath = null;

    LDBB.OnReady = null;

    // -- Manually load the AssetHandler and Logger
    var scriptA = document.createElement('script');
    var scriptL = document.createElement('script');

    LDBB.GetReady = function (basePath, mainPath = null) {
        LDBB._basePath = basePath;
        LDBB._mainPath = mainPath;

        scriptL.onload = function () {
            scriptA.onload = function () {
                LDBB.CoreLoader = new LDBB.GFX.AssetHandler();
                LDBB.CoreLoader._log.Tag = 'LDBB.Load';

                LDBB._ready = true;
                if (LDBB.OnReady instanceof Function) {
                    LDBB.OnReady();
                }
            };

            scriptA.async = false;
            scriptA.src = basePath + '/gfx/asset-handler.js';
            document.head.appendChild(scriptA);
        };

        scriptL.async = false;
        scriptL.src = basePath + '/core/logger.js';
        document.head.appendChild(scriptL);
    };

    LDBB.Load = function (callback) {
        if (!LDBB._ready)
            return false;

        LDBB._readyCallback = callback;

        scriptA.onloadstart = function () {
            console.log('LDBB Starting.js');
            console.log('... AutoLoader');
        };
        scriptL.onloadstart = function () {
            console.log('... Loader');
        };

        LDBB.CoreLoader.Queue('ldbb.src.core.context', 'source', '/core/context.js');
        LDBB.CoreLoader.Queue('ldbb.src.core.loop', 'source', '/core/loop.js');
        LDBB.CoreLoader.Queue('ldbb.src.state.state', 'source', '/state/state.js');
        LDBB.CoreLoader.Queue('ldbb.src.state.state-handler', 'source', '/state/state-handler.js');
        LDBB.CoreLoader.Queue('ldbb.src.state.splash-state', 'source', '/state/splash-state.js');
        LDBB.CoreLoader.Queue('ldbb.src.gfx.canvas', 'source', '/gfx/canvas.js');
        LDBB.CoreLoader.Queue('ldbb.src.gfx.sprite', 'source', '/gfx/sprite.js');
        LDBB.CoreLoader.Queue('ldbb.src.gfx.tilesheet', 'source', '/gfx/tilesheet.js');
        LDBB.CoreLoader.Queue('ldbb.src.gfx.animated-sprite', 'source', '/gfx/animated-sprite.js');
        LDBB.CoreLoader.Queue('ldbb.src.gui.widget', 'source', '/gui/widget.js');
        LDBB.CoreLoader.Queue('ldbb.src.gui.gui-state', 'source', '/gui/gui-state.js');
        LDBB.CoreLoader.Queue('ldbb.src.gui.button-widget', 'source', '/gui/button-widget.js');
        LDBB.CoreLoader.Queue('ldbb.src.audio.sound', 'source', '/audio/sound.js');
        LDBB.CoreLoader.Queue('ldbb.src.input.input-handler', 'source', '/input/input-handler.js');
        LDBB.CoreLoader.Queue('ldbb.src.input.input-watcher', 'source', '/input/input-watcher.js');
        LDBB.CoreLoader.Queue('ldbb.src.input.keyboard-input-watcher', 'source', '/input/keyboard-input-watcher.js');
        LDBB.CoreLoader.Queue('ldbb.src.input.mouse-input-watcher', 'source', '/input/mouse-input-watcher.js');
        LDBB.CoreLoader.Queue('ldbb.src.math.vector2', 'source', '/math/vector2.js');
        LDBB.CoreLoader.Queue('ldbb.src.math.box', 'source', '/math/box.js');
        LDBB.CoreLoader.Queue('ldbb.src.queue.event', 'source', '/queue/event.js');
        LDBB.CoreLoader.Queue('ldbb.src.queue.event-queue', 'source', '/queue/event-queue.js');
        LDBB.CoreLoader.Queue('ldbb.src.ecs.entity', 'source', '/ecs/entity.js');
        LDBB.CoreLoader.Queue('ldbb.src.ecs.component', 'source', '/ecs/component.js');
        LDBB.CoreLoader.Queue('ldbb.src.ecs.system', 'source', '/ecs/system.js');
        LDBB.CoreLoader.Queue('ldbb.src.ecs.ecs', 'source', '/ecs/ecs.js');
        LDBB.CoreLoader.Queue('ldbb.src.map.map', 'source', '/map/map.js');
        LDBB.CoreLoader.Queue('ldbb.src.map.map-object', 'source', '/map/map-object.js');
        LDBB.CoreLoader.Queue('ldbb.src.map.map-layer', 'source', '/map/map-layer.js');
        LDBB.CoreLoader.Queue('ldbb.src.map.map-renderer', 'source', '/map/map-renderer.js');
        LDBB.CoreLoader.Queue('ldbb.src.core.game', 'source', '/core/game.js');

        if (LDBB._mainPath !== null)
            LDBB.CoreLoader.Queue('ldbb.src.main', 'source', LDBB._mainPath, { Abs: true });

        LDBB.CoreLoader.LoadAll(LDBB._basePath, function () {
            LDBB._onReady();
        }, true);
    };
}());
