"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersController = exports.updateUsersController = exports.deleteUsersController = exports.getUsersByIdController = exports.getAllUsersController = void 0;
const userModel_1 = require("../models/userModel");
const validationUserId_1 = require("../utils/validationUserId");
const errorHandler_1 = require("../utils/errorHandler");
const getAllUsersController = (0, errorHandler_1.errorHandler)((req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userModel_1.getAllUsers)();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'success', results: users.length, data: users }));
}));
exports.getAllUsersController = getAllUsersController;
const getUsersByIdController = (0, errorHandler_1.errorHandler)((req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validationUserId_1.isValidUuid)(id, res))
        return;
    const user = yield (0, userModel_1.getUserById)(id);
    if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', data: user }));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'fail', message: 'User not found' }));
    }
}));
exports.getUsersByIdController = getUsersByIdController;
const updateUsersController = (0, errorHandler_1.errorHandler)((req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validationUserId_1.isValidUuid)(id, res))
        return;
    const userExsist = (0, userModel_1.getUserById)(id);
    if (!userExsist) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'fail', message: 'User not found' }));
        return;
    }
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies } = JSON.parse(body);
            if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'fail',
                    message: 'Invalid or missing user data',
                }));
                return;
            }
            const updatedUser = (0, userModel_1.updateUser)(id, { username, age, hobbies });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'success', data: updatedUser }));
        }
        catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'fail', message: 'Invalid JSON format' }));
        }
    });
}));
exports.updateUsersController = updateUsersController;
const createUsersController = (0, errorHandler_1.errorHandler)((req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies } = JSON.parse(body);
            if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'fail',
                    message: 'Invalid or missing user data',
                }));
                return;
            }
            const newUser = (0, userModel_1.createUser)({ username, age, hobbies });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'success', data: newUser }));
        }
        catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'fail', message: 'Invalid JSON format' }));
        }
    });
}));
exports.createUsersController = createUsersController;
const deleteUsersController = (0, errorHandler_1.errorHandler)((req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validationUserId_1.isValidUuid)(id, res))
        return;
    const result = (0, userModel_1.deleteUser)(id);
    if (result) {
        res.writeHead(204);
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'fail', message: 'User not found' }));
    }
}));
exports.deleteUsersController = deleteUsersController;
