/**
 * AvalynxRef
 *
 * A Ref implementation for updating elements with a value like React's Ref or Vue's Ref.
 *
 * @version 0.0.2
 * @license MIT
 * @author https://github.com/avalynx/avalynx-ref/graphs/contributors
 * @website https://github.com/avalynx/
 * @repository https://github.com/avalynx/avalynx-ref.git
 * @bugs https://github.com/avalynx/avalynx-ref/issues
 *
 * @param {string} selector - The selector for the element(s) to update.
 * @param {object} options - Options for the ref.
 * @param {boolean} options.isHtml - If the value is HTML.
 */

export class AvalynxRef {
    constructor(selector, options = {}) {
        if (!selector) {
            selector = '.avalynx-ref';
        }
        if (!selector.startsWith('.') && !selector.startsWith('#')) {
            selector = '.' + selector;
        }
        this.elements = document.querySelectorAll(selector);
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
