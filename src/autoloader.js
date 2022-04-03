(function() {
  'use strict';

  window.LDBB = {};

  LDBB.Load = function (basePath, callback, mainPath = null) {
    // -- Manually load the AssetHandler and Logger
    var scriptA = document.createElement('script');
    var scriptL = document.createElement('script');

    scriptA.onloadstart = function () {
      console.log('LDBB Starting.js');
      console.log('... AutoLoader');
    };
    scriptL.onloadstart = function () {
      console.log('... Loader');
    };

    scriptL.onload = function () {
      scriptA.onload = function () {
        var scriptLoader = new LDBB.GFX.AssetHandler();
        scriptLoader._log.Tag = 'LDBB.Load';

        scriptLoader.Queue('ldbb.src.core.context', 'source', '/core/context.js');
        scriptLoader.Queue('ldbb.src.core.loop', 'source', '/core/loop.js');
        scriptLoader.Queue('ldbb.src.state.state', 'source', '/state/state.js');
        scriptLoader.Queue('ldbb.src.state.state-handler', 'source', '/state/state-handler.js');
        scriptLoader.Queue('ldbb.src.state.splash-state', 'source', '/state/splash-state.js');
        scriptLoader.Queue('ldbb.src.gfx.canvas', 'source', '/gfx/canvas.js');
        scriptLoader.Queue('ldbb.src.gfx.sprite', 'source', '/gfx/sprite.js');
        scriptLoader.Queue('ldbb.src.gfx.tilesheet', 'source', '/gfx/tilesheet.js');
        scriptLoader.Queue('ldbb.src.gfx.animated-sprite', 'source', '/gfx/animated-sprite.js');
        scriptLoader.Queue('ldbb.src.gui.widget', 'source', '/gui/widget.js');
        scriptLoader.Queue('ldbb.src.gui.widget-state', 'source', '/gui/widget-state.js');
        scriptLoader.Queue('ldbb.src.gui.button-widget', 'source', '/gui/button-widget.js');
        scriptLoader.Queue('ldbb.src.audio.sound', 'source', '/audio/sound.js');
        scriptLoader.Queue('ldbb.src.input.input-handler', 'source', '/input/input-handler.js');
        scriptLoader.Queue('ldbb.src.input.input-watcher', 'source', '/input/input-watcher.js');
        scriptLoader.Queue('ldbb.src.input.keyboard-input-watcher', 'source', '/input/keyboard-input-watcher.js');
        scriptLoader.Queue('ldbb.src.input.mouse-input-watcher', 'source', '/input/mouse-input-watcher.js');
        scriptLoader.Queue('ldbb.src.math.vector2', 'source', '/math/vector2.js');
        scriptLoader.Queue('ldbb.src.math.box', 'source', '/math/box.js');
        scriptLoader.Queue('ldbb.src.queue.event', 'source', '/queue/event.js');
        scriptLoader.Queue('ldbb.src.queue.event-queue', 'source', '/queue/event-queue.js');
        scriptLoader.Queue('ldbb.src.ecs.entity', 'source', '/ecs/entity.js');
        scriptLoader.Queue('ldbb.src.ecs.component', 'source', '/ecs/component.js');
        scriptLoader.Queue('ldbb.src.ecs.system', 'source', '/ecs/system.js');
        scriptLoader.Queue('ldbb.src.ecs.ecs', 'source', '/ecs/ecs.js');
        scriptLoader.Queue('ldbb.src.core.game', 'source', '/core/game.js');

        if (mainPath !== null)
          scriptLoader.Queue('ldbb.src.main', 'source', mainPath, true);

        scriptLoader.LoadAll(basePath, function () {
          callback();
        }, true);
      };

      scriptA.async = false;
      scriptA.src = basePath + '/gfx/asset-handler.js';
      document.head.appendChild(scriptA);
    };

    scriptL.async = false;
    scriptL.src = basePath + '/core/logger.js';
    document.head.appendChild(scriptL);
  };
}());
