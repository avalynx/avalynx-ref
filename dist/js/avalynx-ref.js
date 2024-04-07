/**
 * AvalynxRef
 *
 * A Ref implementation for updating elements with a value like React's Ref or Vue's Ref.
 *
 * @version 0.0.1
 * @license MIT
 * @author https://github.com/avalynx/avalynx-ref/graphs/contributors
 * @website https://github.com/avalynx/
 * @repository https://github.com/avalynx/avalynx-ref.git
 * @bugs https://github.com/avalynx/avalynx-ref/issues
 *
 * @param {string} selector - The selector for the element(s) to update.
 * @param {object} options - Options for the ref.
 */

class AvalynxRef {
	constructor(selector, options = {}) {
		this.isHtml = options.isHtml || false;

		if (selector.startsWith('#')) {
			this.elements = [document.querySelector(selector)];
		} else {
			this.elements = document.querySelectorAll(selector);
		}
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
				if (this.isHtml) {
					element.innerHTML = this.value;
				} else {
					element.textContent = this.value;
				}
			}
		});
	}
}