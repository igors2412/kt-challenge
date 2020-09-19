import { IControlDefinition } from './models';

function flattenObject(o: any): any {
    let flat = {};

    Object.keys(o).forEach((key) => {
        const current = o[key];

        if (typeof current === 'object' && current !== null) {
            flat = { ...flat, ...flattenObject(current) };
        } else {
            flat[key] = current;
        }
    });

    return flat;
}

export function toControlDefinitions(obj: any): IControlDefinition[] {
    const flat = flattenObject(obj);
    return Object.keys(flat).map((key) => {
        return {
            id: key,
            value: flat[key],
            type: typeof flat[key],
        };
    });
}
