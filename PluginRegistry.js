'use strict';

import Registry from './Registry';
import ViewportDetection from './ViewportDetection';

export default class PluginRegistry {


    /**
     * Constructor
     */
    constructor() {
        this._viewport = ViewportDetection.getCurrentViewport();
        this._registered = new Registry();
        this._initialized = [];

        window.addEventListener('resize', this._debounce(this._onResize.bind(this), 250, false), {
            capture: true,
            passive: true
        });
    }


    /**
     * Register the plugin for a list of given viewports
     * only if the viewport is valid (defined by this._registered)
     * @param {Object} plugin
     * @param {string[]} viewports
     * @returns {PluginRegistry}
     */
    addPlugin(plugin, viewports) {
        [].forEach.call(viewports, this._registerPluginToViewport.bind(this, plugin));
        return this;
    }

    /**
     * Register a plugin to a specific viewport
     * @param {Object} plugin
     * @param {string} viewport
     * @private
     */
    _registerPluginToViewport(plugin, viewport) {
        // check if the given viewport is valid
        if (typeof this._registered[viewport] !== 'object') {
            return;
        }

        // register the plugin first
        this._registered[viewport].push(plugin);

        // initialize the plugin if it's designated to the current viewport
        if (ViewportDetection.getCurrentViewport() === viewport) {
            this._initPlugins([plugin]);
        }
    }

    /**
     * On window resize check if the viewport has changed significantly so that
     * it's necessary to destroy all plugins and reinit those designated
     * to the current viewport
     * @private
     */
    _onResize() {

        // do nothing if the current viewport hasn't changed
        if (ViewportDetection.viewportHasChanged(this._viewport) === false) {
            return;
        }

        // update the current viewport
        this._setCurrentViewport();

        // destroy all plugins that are not needed in the new current viewport
        this._destroyPlugins();

        // initialize all plugins for current viewport
        this._initPlugins(this._registered[this._viewport]);
    }

    /**
     * Initialize plugins
     * @param {Object[]} plugins
     * @private
     */
    _initPlugins(plugins) {
        [].forEach.call(plugins, this._initPlugin.bind(this));
    }

    /**
     * Initialize a plugin only if it has not already been initialized
     * @param {Function} plugin
     * @private
     */
    _initPlugin(plugin) {
        if (this._pluginIsInitialized(plugin)) {
            return;
        }
        this._initialized.push(new plugin());
    }

    /**
     * Destroy all plugins that are not needed in the new current viewport
     * @private
     */
    _destroyPlugins() {
        [].forEach.call(this._initialized, this._destroyPlugin.bind(this));
    }

    /**
     * Call destroy() of plugin and remove the plugin from this._initialized
     * @param {Object} plugin
     * @private
     */
    _destroyPlugin(plugin) {
        // only destroy plugins that are not necessary in the current viewport
        if (this._registered.pluginExists(plugin, this._viewport)) {
            return;
        }

        // call plugin's destroy method
        plugin.destroy();

        // clean the initialized plugins to remove the currently destroyed plugin
        this._initialized = this._initialized.filter(function(item) {
            return item !== plugin
        });
    }

    /**
     * Update the current viewport
     * @private
     */
    _setCurrentViewport() {
        this._viewport = ViewportDetection.getCurrentViewport();
    }

    /**
     * Debounce the resize event
     * @param {Function} func
     * @param {int} wait
     * @param {boolean} immediate
     * @returns {Function}
     * @private
     */
    _debounce(func, wait, immediate) {
        let timeout;

        return function() {
            let context = this, args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    /**
     * Determine if the plugin is already initialized
     * @param {Function} plugin
     * @returns {boolean}
     */
    _pluginIsInitialized(plugin) {
        let found = false;

        [].forEach.call(this._initialized, function(item) {
            if (item.constructor === plugin) {
                found = true;
            }
        });

        return found;
    }
}
