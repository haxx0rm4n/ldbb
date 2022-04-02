(function() {
    "use strict";

    if (!LDBB.Audio) LDBB.Audio = {};

    LDBB.Audio.Sound = (function() {
        function Sound(filename, onLoad) {
            this.Filename = filename;
            this.IsLoaded = false;
            this.OnLoad = onLoad;

            this.Audio = new Audio(filename);
            this.Audio.addEventListener('canplaythrough', this._handleLoad.bind(this));
            this.Audio.preload = true;
            this.Audio.load();
        }

        Sound.prototype._handleLoad = function() {
            if (this.IsLoaded) {
                return;
            }
            this.IsLoaded = true;
            if (typeof this.OnLoad === "function") {
                this.OnLoad(this);
            }
        };

        Sound.prototype.Play = function() {
            if (this.IsLoaded) {
                this.Audio.play();
            }
        };

        Sound.prototype.SetLooping = function(loop = true) {
            if (this.IsLoaded) {
                this.Audio.loop = loop;
            }
        };

        Sound.prototype.IsLooping = function() {
            if (this.IsLoaded) {
                return this.Audio.loop;
            }
            return false;
        };

        Sound.prototype.ToggleLooping = function() {
            if (!this.IsLoaded) {
                return false;
            }
            this.Audio.loop = !this.IsLooping();
        };

        return Sound;
    }());
}());