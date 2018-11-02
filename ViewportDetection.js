'use strict';

const XS_MAX = 575;
const SM_MIN = 576;
const SM_MAX = 767;
const MD_MIN = 768;
const MD_MAX = 991;
const LG_MIN = 992;
const LG_MAX = 1199;
const XL_MIN = 1200;

export default class ViewportDetection {

    /**
     * Determines if the viewport has changed
     * @param viewport
     * @returns {boolean}
     */
    static viewportHasChanged(viewport) {
        return (viewport !== ViewportDetection.getCurrentViewport());
    }

    /**
     * Get the current viewport
     * @returns {string}
     */
    static getCurrentViewport() {
        if (ViewportDetection._isXS()) {
            return 'xs';
        } else if (ViewportDetection._isSM()) {
            return 'sm';
        } else if (ViewportDetection._isMD()) {
            return 'md';
        } else if (ViewportDetection._isLG()) {
            return 'lg';
        } else if (ViewportDetection._isXL()) {
            return 'xl';
        }
    }

    /**
     * Determine if the current viewport is XS
     * @returns {boolean}
     * @private
     */
    static _isXS() {
        return window.matchMedia(`(min-width: 0px) and (max-width: ${XS_MAX}px)`).matches;
    }

    /**
     * Determine if the current viewport is SM
     * @returns {boolean}
     * @private
     */
    static _isSM() {
        return window.matchMedia(`(min-width: ${SM_MIN}px) and (max-width: ${SM_MAX}px)`).matches;
    }

    /**
     * Determine if the current viewport is MD
     * @returns {boolean}
     * @private
     */
    static _isMD() {
        return window.matchMedia(`(min-width: ${MD_MIN}px) and (max-width: ${MD_MAX}px)`).matches;
    }

    /**
     * Determine if the current viewport is LG
     * @returns {boolean}
     * @private
     */
    static _isLG() {
        return window.matchMedia(`(min-width: ${LG_MIN}px) and (max-width: ${LG_MAX}px)`).matches;
    }

    /**
     * Determine if the current viewport is XL
     * @returns {boolean}
     * @private
     */
    static _isXL() {
        return window.matchMedia(`(min-width: ${XL_MIN}px)`).matches;
    }
}
