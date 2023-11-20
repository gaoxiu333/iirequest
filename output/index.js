'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
function default_1(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
exports.default = default_1;
