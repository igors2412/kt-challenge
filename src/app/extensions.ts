import { IControlDefinition } from './models';

function flattenObject(o: any): any {
    let flat = {};

    Object.keys(o).forEach((key) => {
        if (typeof o[key] === 'object' && o[key] !== null) {
            flat = { ...flat, ...flattenObject(o[key]) };
        } else {
            flat[key] = o[key];
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
