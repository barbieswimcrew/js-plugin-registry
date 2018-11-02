'use strict';

export default class Registry {

    /**
     * Constructor
     */
    constructor() {
        this._xs = [];
        this._sm = [];
        this._md = [];
        this._lg = [];
        this._xl = [];
    }

    /**
     * @returns {Array}
     */
    get xs() {
        return this._xs;
    }

    /**
     * @returns {Array}
     */
    get sm() {
        return this._sm;
    }

    /**
     * @returns {Array}
     */
    get md() {
        return this._md;
    }

    /**
     * @returns {Array}
     */
    get lg() {
        return this._lg;
    }

    /**
     * @returns {Array}
     */
    get xl() {
        return this._xl;
    }

    /**
     * @param {Array} plugins
     */
    set xs(plugins) {
        this._xs = plugins;
    }

    /**
     * @param {Array} plugins
     */
    set sm(plugins) {
        this._sm = plugins;
    }

    /**
     * @param {Array} plugins
     */
    set md(plugins) {
        this._md = plugins;
    }

    /**
     * @param {Array} plugins
     */
    set lg(plugins) {
        this._lg = plugins;
    }

    /**
     * @param {Array} plugins
     */
    set xl(plugins) {
        this._xl = plugins;
    }

    /**
     * Determine if a plugin exists in a viewport array
     * @param plugin
     * @param {string} viewport
     * @returns {boolean}
     */
    pluginExists(plugin, viewport) {
        let found = false;

        [].forEach.call(this[viewport], function(item) {
            if (item === plugin.constructor) {
                found = true;
            }
        });

        return found;
    }
}
