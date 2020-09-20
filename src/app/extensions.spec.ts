import { toControlDefinitions } from './extensions';

describe('a control definitions generator function', () => {
    it('should resolve a simple object', () => {
        const obj = { a: 5 };
        const result = toControlDefinitions(obj);
        expect(result.length).toBe(1);

        const cd = result[0];
        expect(cd.id).toBe('a');
        expect(cd.type).toBe('number');
        expect(cd.value).toBe(5);
    });

    it('should resolve a nested object', () => {
        const obj = {
            a: 5,
            b: {
                c: true,
            },
        };

        const result = toControlDefinitions(obj);
        expect(result.length).toBe(2);

        expect(result[0].id).toBe('a');
        expect(result[0].type).toBe('number');
        expect(result[0].value).toBe(5);

        expect(result[1].id).toBe('c');
        expect(result[1].type).toBe('boolean');
        expect(result[1].value).toBeTrue();
    });

    it('should resolve an empty object', () => {
        const obj = {};
        const result = toControlDefinitions(obj);
        expect(result.length).toBe(0);
    });

    it('should resolve a nested empty object', () => {
        const obj = {
            a: {
                b: {},
            },
        };
        const result = toControlDefinitions(obj);
        expect(result.length).toBe(0);
    });
});
