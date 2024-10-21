"use strict";
//
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
exports.handleRequest = void 0;
const node_url_1 = require("node:url");
const userController_1 = require("../controllers/userController");
const errorHandler_1 = require("../utils/errorHandler");
exports.handleRequest = (0, errorHandler_1.errorHandler)((req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    const parseUrl = (0, node_url_1.parse)(req.url || '', true);
    const pathname = parseUrl.pathname || '';
    const method = req.method || '';
    const idMatch = pathname.match(/^\/api\/users\/([0-9a-fA-F-]+)$/);
    const userId = idMatch ? idMatch[1] : null;
    if (pathname === '/api/users' && method === 'GET') {
        (0, userController_1.getAllUsersController)(req, res);
    }
    else if (userId &&
        pathname === `/api/users/${userId}` &&
        method === 'GET') {
        (0, userController_1.getUsersByIdController)(req, res, userId);
    }
    else if (pathname === '/api/users' && method === 'POST') {
        (0, userController_1.createUsersController)(req, res);
    }
    else if (userId &&
        pathname === `/api/users/${userId}` &&
        method === 'PUT') {
        (0, userController_1.updateUsersController)(req, res, userId);
    }
    else if (userId &&
        pathname === `/api/users/${userId}` &&
        method === 'DELETE') {
        (0, userController_1.deleteUsersController)(req, res, userId);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'fail', message: 'API endpoint not found' }));
    }
}));
