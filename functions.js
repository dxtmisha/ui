"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImage = exports.getSRC = exports.getFileResult = exports.createImage = exports.toKebabCase = exports.replaceRecursive = exports.isFilled = exports.forEach = exports.executeFunction = 0;
const data_1 = __importDefault(require("./functions/data"));
const image_1 = __importDefault(require("./functions/image"));
exports.executeFunction = data_1.default.executeFunction, exports.forEach = data_1.default.forEach, exports.isFilled = data_1.default.isFilled, exports.replaceRecursive = data_1.default.replaceRecursive, exports.toKebabCase = data_1.default.toKebabCase;
exports.createImage = image_1.default.createImage, exports.getFileResult = image_1.default.getFileResult, exports.getSRC = image_1.default.getSRC, exports.isImage = image_1.default.isImage;
//# sourceMappingURL=functions.js.map
