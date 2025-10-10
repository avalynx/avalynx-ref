/**
 * AvalynxRef Jest Tests
 * Comprehensive test suite for all important functionality
 */

const AvalynxRef = require('../src/js/avalynx-ref.js');

describe('AvalynxRef', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        document.body.innerHTML = '';
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        // Mock requestAnimationFrame
        global.requestAnimationFrame = jest.fn((callback) => {
            callback();
            return 1;
        });
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    describe('Constructor and initialization', () => {
        test('initializes with default selector when no selector provided', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            expect(ref.elements.length).toBe(1);
            expect(ref.elements[0]).toBe(div);
        });

        test('initializes with class selector', () => {
            const div1 = document.createElement('div');
            div1.className = 'my-ref';
            const div2 = document.createElement('div');
            div2.className = 'my-ref';
            document.body.appendChild(div1);
            document.body.appendChild(div2);

            const ref = new AvalynxRef('.my-ref');
            expect(ref.elements.length).toBe(2);
        });

        test('initializes with ID selector', () => {
            const div = document.createElement('div');
            div.id = 'test-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef('#test-ref');
            expect(ref.elements.length).toBe(1);
            expect(ref.elements[0]).toBe(div);
        });

        test('adds dot prefix when selector does not start with . or #', () => {
            const div = document.createElement('div');
            div.className = 'auto-prefix';
            document.body.appendChild(div);

            const ref = new AvalynxRef('auto-prefix');
            expect(ref.elements.length).toBe(1);
            expect(ref.elements[0]).toBe(div);
        });

        test('logs error when no elements found', () => {
            const ref = new AvalynxRef('.non-existent');
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "AvalynxRef: Ref(s) with selector '.non-existent' not found"
            );
            expect(ref.elements.length).toBe(0);
        });

        test('initializes with default options', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            expect(ref.options.isHtml).toBe(false);
        });

        test('merges custom options with defaults', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef('.avalynx-ref', { isHtml: true });
            expect(ref.options.isHtml).toBe(true);
        });

        test('handles null options gracefully', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef('.avalynx-ref', null);
            expect(ref.options).toBeDefined();
            expect(ref.options.isHtml).toBe(false);
        });

        test('handles non-object options gracefully', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef('.avalynx-ref', 'invalid');
            expect(ref.options).toBeDefined();
            expect(ref.options.isHtml).toBe(false);
        });

        test('initializes internal state correctly', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            expect(ref._value).toBeNull();
            expect(ref.frameRequested).toBe(false);
        });
    });

    describe('Value getter and setter', () => {
        test('getter returns the current value', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            expect(ref.value).toBeNull();
        });

        test('setter updates internal value', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = 'test value';
            expect(ref._value).toBe('test value');
            expect(ref.value).toBe('test value');
        });

        test('setter triggers requestUpdate', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            const spy = jest.spyOn(ref, 'requestUpdate');
            ref.value = 'new value';
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('can set string values', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = 'string value';
            expect(ref.value).toBe('string value');
        });

        test('can set numeric values', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = 42;
            expect(ref.value).toBe(42);
        });

        test('can set null value', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = 'some value';
            ref.value = null;
            expect(ref.value).toBeNull();
        });

        test('can set empty string', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = '';
            expect(ref.value).toBe('');
        });
    });

    describe('requestUpdate method', () => {
        test('requests animation frame on first call', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.requestUpdate();
            expect(global.requestAnimationFrame).toHaveBeenCalledTimes(1);
        });

        test('sets frameRequested flag', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.frameRequested = false;
            ref.requestUpdate();
            expect(ref.frameRequested).toBe(false); // Reset after callback
        });

        test('does not request multiple frames when called multiple times', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            global.requestAnimationFrame = jest.fn((callback) => {
                // Don't execute callback immediately
                return 1;
            });

            const ref = new AvalynxRef();
            ref.requestUpdate();
            ref.requestUpdate();
            ref.requestUpdate();
            expect(global.requestAnimationFrame).toHaveBeenCalledTimes(1);
        });

        test('calls updateElements inside animation frame', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            const spy = jest.spyOn(ref, 'updateElements');
            ref.requestUpdate();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('resets frameRequested flag after update', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.requestUpdate();
            expect(ref.frameRequested).toBe(false);
        });
    });

    describe('updateElements method', () => {
        test('updates single element with textContent by default', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = 'test content';
            ref.updateElements();
            expect(div.textContent).toBe('test content');
        });

        test('updates multiple elements with textContent', () => {
            const div1 = document.createElement('div');
            div1.className = 'multi-ref';
            const div2 = document.createElement('div');
            div2.className = 'multi-ref';
            document.body.appendChild(div1);
            document.body.appendChild(div2);

            const ref = new AvalynxRef('.multi-ref');
            ref.value = 'shared value';
            ref.updateElements();
            expect(div1.textContent).toBe('shared value');
            expect(div2.textContent).toBe('shared value');
        });

        test('updates element with innerHTML when isHtml is true', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef('.avalynx-ref', { isHtml: true });
            ref.value = '<strong>Bold text</strong>';
            ref.updateElements();
            expect(div.innerHTML).toBe('<strong>Bold text</strong>');
        });

        test('treats HTML as text when isHtml is false', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef('.avalynx-ref', { isHtml: false });
            ref.value = '<script>alert("XSS")</script>';
            ref.updateElements();
            expect(div.textContent).toBe('<script>alert("XSS")</script>');
            expect(div.innerHTML).not.toContain('<script>');
        });

        test('handles null value', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = null;
            ref.updateElements();
            expect(div.textContent).toBe('');
        });

        test('handles undefined value', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = undefined;
            ref.updateElements();
            expect(div.textContent).toBe('');
        });

        test('handles numeric values', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = 123;
            ref.updateElements();
            expect(div.textContent).toBe('123');
        });

        test('handles empty string', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = '';
            ref.updateElements();
            expect(div.textContent).toBe('');
        });

        test('handles special characters', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = '< > & " \'';
            ref.updateElements();
            expect(div.textContent).toBe('< > & " \'');
        });

        test('updates elements only if they exist', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = 'test';
            ref.elements = [div, null, undefined];
            expect(() => ref.updateElements()).not.toThrow();
            expect(div.textContent).toBe('test');
        });
    });

    describe('Integration scenarios', () => {
        test('full workflow: create, set value, update elements', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            expect(ref.value).toBeNull();

            ref.value = 'initial value';
            expect(div.textContent).toBe('initial value');

            ref.value = 'updated value';
            expect(div.textContent).toBe('updated value');
        });

        test('multiple refs with different selectors', () => {
            const div1 = document.createElement('div');
            div1.className = 'ref-1';
            const div2 = document.createElement('div');
            div2.className = 'ref-2';
            document.body.appendChild(div1);
            document.body.appendChild(div2);

            const ref1 = new AvalynxRef('.ref-1');
            const ref2 = new AvalynxRef('.ref-2');

            ref1.value = 'value 1';
            ref2.value = 'value 2';

            expect(div1.textContent).toBe('value 1');
            expect(div2.textContent).toBe('value 2');
        });

        test('multiple values update correctly', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();

            ref.value = 'first';
            expect(div.textContent).toBe('first');

            ref.value = 'second';
            expect(div.textContent).toBe('second');

            ref.value = 'third';
            expect(div.textContent).toBe('third');
        });

        test('HTML mode workflow', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef('.avalynx-ref', { isHtml: true });

            ref.value = '<p>Paragraph</p>';
            expect(div.innerHTML).toBe('<p>Paragraph</p>');

            ref.value = '<div><span>Nested</span></div>';
            expect(div.innerHTML).toBe('<div><span>Nested</span></div>');
        });

        test('updating many elements simultaneously', () => {
            const divs = [];
            for (let i = 0; i < 10; i++) {
                const div = document.createElement('div');
                div.className = 'many-refs';
                document.body.appendChild(div);
                divs.push(div);
            }

            const ref = new AvalynxRef('.many-refs');
            ref.value = 'shared value';

            divs.forEach(div => {
                expect(div.textContent).toBe('shared value');
            });
        });
    });

    describe('Edge cases and error handling', () => {
        test('handles rapid value changes', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();

            ref.value = 'value1';
            ref.value = 'value2';
            ref.value = 'value3';
            ref.value = 'final';

            expect(div.textContent).toBe('final');
        });

        test('handles complex HTML structures', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef('.avalynx-ref', { isHtml: true });
            const complexHtml = '<div class="container"><ul><li>Item 1</li><li>Item 2</li></ul></div>';

            ref.value = complexHtml;
            expect(div.innerHTML).toBe(complexHtml);
        });

        test('XSS protection in text mode', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef('.avalynx-ref', { isHtml: false });
            ref.value = '<script>alert("XSS")</script>';

            // Script should be treated as text, not executed
            expect(div.textContent).toContain('<script>');
            expect(div.querySelector('script')).toBeNull();
        });

        test('handles very long strings', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            const longString = 'a'.repeat(10000);
            ref.value = longString;
            expect(div.textContent).toBe(longString);
            expect(div.textContent.length).toBe(10000);
        });

        test('handles unicode characters', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = '🚀 Unicode: 你好 Мир';
            expect(div.textContent).toBe('🚀 Unicode: 你好 Мир');
        });

        test('handles boolean values', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = true;
            expect(div.textContent).toBe('true');

            ref.value = false;
            expect(div.textContent).toBe('false');
        });

        test('handles object values', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = { key: 'value' };
            expect(div.textContent).toBe('[object Object]');
        });

        test('handles array values', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = [1, 2, 3];
            expect(div.textContent).toBe('1,2,3');
        });

        test('continues working after error in element update', () => {
            const div1 = document.createElement('div');
            div1.className = 'error-ref';
            const div2 = document.createElement('div');
            div2.className = 'error-ref';
            document.body.appendChild(div1);
            document.body.appendChild(div2);

            const ref = new AvalynxRef('.error-ref');

            // Remove one element from DOM
            div1.remove();

            ref.value = 'test value';
            expect(div2.textContent).toBe('test value');
        });

        test('empty selector list handling', () => {
            const ref = new AvalynxRef('.non-existent');
            expect(() => {
                ref.value = 'test';
            }).not.toThrow();
        });
    });

    describe('Performance considerations', () => {
        test('uses requestAnimationFrame for optimization', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            global.requestAnimationFrame = jest.fn((callback) => {
                callback();
                return 1;
            });

            const ref = new AvalynxRef();
            ref.value = 'test';

            expect(global.requestAnimationFrame).toHaveBeenCalled();
        });

        test('batches multiple updates into single animation frame', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            let frameCallback = null;
            global.requestAnimationFrame = jest.fn((callback) => {
                frameCallback = callback;
                return 1;
            });

            const ref = new AvalynxRef();
            const updateSpy = jest.spyOn(ref, 'updateElements');

            ref.value = 'value1';
            ref.value = 'value2';
            ref.value = 'value3';

            // Only one animation frame should be requested
            expect(global.requestAnimationFrame).toHaveBeenCalledTimes(1);

            // Execute the batched update
            if (frameCallback) frameCallback();

            // updateElements should be called once with the final value
            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(div.textContent).toBe('value3');
        });
    });

    describe('Different element types', () => {
        test('works with div elements', () => {
            const div = document.createElement('div');
            div.className = 'avalynx-ref';
            document.body.appendChild(div);

            const ref = new AvalynxRef();
            ref.value = 'div content';
            expect(div.textContent).toBe('div content');
        });

        test('works with span elements', () => {
            const span = document.createElement('span');
            span.className = 'avalynx-ref';
            document.body.appendChild(span);

            const ref = new AvalynxRef();
            ref.value = 'span content';
            expect(span.textContent).toBe('span content');
        });

        test('works with paragraph elements', () => {
            const p = document.createElement('p');
            p.className = 'avalynx-ref';
            document.body.appendChild(p);

            const ref = new AvalynxRef();
            ref.value = 'paragraph content';
            expect(p.textContent).toBe('paragraph content');
        });

        test('works with heading elements', () => {
            const h1 = document.createElement('h1');
            h1.className = 'avalynx-ref';
            document.body.appendChild(h1);

            const ref = new AvalynxRef();
            ref.value = 'heading content';
            expect(h1.textContent).toBe('heading content');
        });

        test('works with mixed element types', () => {
            const div = document.createElement('div');
            div.className = 'mixed-ref';
            const span = document.createElement('span');
            span.className = 'mixed-ref';
            const p = document.createElement('p');
            p.className = 'mixed-ref';

            document.body.appendChild(div);
            document.body.appendChild(span);
            document.body.appendChild(p);

            const ref = new AvalynxRef('.mixed-ref');
            ref.value = 'mixed content';

            expect(div.textContent).toBe('mixed content');
            expect(span.textContent).toBe('mixed content');
            expect(p.textContent).toBe('mixed content');
        });
    });
});
