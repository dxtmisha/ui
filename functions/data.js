"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKebabCase = exports.replaceRecursive = exports.isFilled = exports.forEach = void 0;
function forEach(data, callback, filterUndefined) {
    if (data && typeof data === 'object') {
        const returnData = [];
        if (Array.isArray(data)) {
            data.forEach((item, key) => returnData.push(callback(item, key, data)));
        }
        else {
            Object.entries(data).forEach(([key, item]) => returnData.push(callback(item, key, data)));
        }
        if (filterUndefined) {
            return returnData.filter((item) => item !== undefined);
        }
        else {
            return returnData;
        }
    }
    else {
        return [];
    }
}
exports.forEach = forEach;
function isFilled(value) {
    if (value) {
        switch (typeof value) {
            case 'bigint':
            case 'number':
                return value !== 0;
            case 'boolean':
                return value;
            case 'function':
            case 'symbol':
                return true;
            case 'object':
                if (Array.isArray(value)) {
                    return value.length > 0;
                }
                else {
                    return Object.entries(value).length > 0;
                }
            case 'string':
                return value !== '';
            case 'undefined':
                return false;
            default:
                return !!value;
        }
    }
    return false;
}
exports.isFilled = isFilled;
function replaceRecursive(array, replacement, isMerge = true) {
    if (typeof array === 'object' &&
        isFilled(replacement)) {
        forEach(replacement, (item, index) => {
            const data = array?.[index];
            if (data &&
                item &&
                typeof data === 'object' &&
                typeof item === 'object') {
                if (isMerge &&
                    Array.isArray(data) &&
                    Array.isArray(item)) {
                    data.push(...item);
                }
                else if (Array.isArray(data)) {
                    array[index] = replaceRecursive(replaceRecursive({}, data), item);
                }
                else {
                    replaceRecursive(data, item);
                }
            }
            else {
                array[index] = item;
            }
        });
    }
    return array;
}
exports.replaceRecursive = replaceRecursive;
function toKebabCase(value) {
    return value
        .toString()
        .replace(/^[A-Z]./g, all => all.toLowerCase())
        .replace(/[A-Z]./g, all => `-${all.toLowerCase()}`);
}
exports.toKebabCase = toKebabCase;
exports.default = {
    forEach,
    isFilled,
    replaceRecursive,
    toKebabCase
};
//# sourceMappingURL=data.js.map