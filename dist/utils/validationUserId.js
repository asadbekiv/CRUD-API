"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUuid = void 0;
const uuid_1 = require("uuid");
const isValidUuid = (id, res) => {
    if (!(0, uuid_1.validate)(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'fail', message: 'Invalid user ID format' }));
        return false;
    }
    return true;
};
exports.isValidUuid = isValidUuid;
