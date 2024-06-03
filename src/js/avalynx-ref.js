/**
 * AvalynxRef
 *
 * AvalynxRef is an implementation of a reference (Ref) system, similar to Refs in React or Vue, designed for updating DOM elements with a specified value. This facilitates a reactive linkage between JavaScript data and the user interface.
 *
 * @version 0.0.3
 * @license MIT
 * @author https://github.com/avalynx/avalynx-ref/graphs/contributors
 * @website https://github.com/avalynx/
 * @repository https://github.com/avalynx/avalynx-ref.git
 * @bugs https://github.com/avalynx/avalynx-ref/issues
 *
 * @param {string} selector - The selector to use for targeting tables within the DOM (default: '.avalynx-ref').
 * @param {object} options - An object containing the following keys:
 * @param {boolean} options.isHtml - Treat the value as HTML (default: false).
 *
 */

class AvalynxRef {
    constructor(selector, options = {}) {
        if (!selector) {
            selector = '.avalynx-ref';
        }
        if (!selector.startsWith('.') && !selector.startsWith('#')) {
            selector = '.' + selector;
        }
        this.elements = document.querySelectorAll(selector);
        if (this.elements.length === 0) {
            console.error("AvalynxRef: Ref(s) with selector '" + selector + "' not found");
            return;
        }
        this.options = {
            isHtml: false,
            ...options
        };
        this._value = null;
        this.frameRequested = false;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        this._value = newValue;
        this.requestUpdate();
    }

    requestUpdate() {
        if (!this.frameRequested) {
            this.frameRequested = true;
            window.requestAnimationFrame(() => {
                this.updateElements();
                this.frameRequested = false;
            });
        }
    }

    updateElements() {
        this.elements.forEach(element => {
            if (element) {
                if (this.options.isHtml) {
                    element.innerHTML = this.value;
                } else {
                    element.textContent = this.value;
                }
            }
        });
    }
}
