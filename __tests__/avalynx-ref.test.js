import { AvalynxRef } from '../src/js/avalynx-ref.esm.js';

describe('AvalynxRef', () => {
    let avalynxRef;
    let div;

    beforeEach(() => {
        div = document.createElement('div');
        div.id = 'test';
        document.body.appendChild(div);
        avalynxRef = new AvalynxRef('#test');
    });

    afterEach(() => {
        document.body.removeChild(div);
    });

    test('value getter and setter', () => {
        avalynxRef.value = 'Test value';
        expect(avalynxRef.value).toBe('Test value');
    });

    test('updateElements method', () => {
        avalynxRef.value = 'Test value';
        avalynxRef.updateElements();
        expect(div.textContent).toBe('Test value');
    });
});
