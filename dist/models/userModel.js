"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const uuid_1 = require("uuid");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let users = [];
const usersFilePath = path.join(process.cwd(), 'src/data/users.json');
const saveUsersToFile = () => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};
const loadUsersFromFile = () => {
    if (fs.existsSync(usersFilePath)) {
        const fileData = fs.readFileSync(usersFilePath, 'utf-8');
        users = JSON.parse(fileData);
    }
};
loadUsersFromFile();
const getAllUsers = () => {
    return users;
};
exports.getAllUsers = getAllUsers;
const getUserById = (id) => {
    const user = users.find((e) => {
        return e.id === id;
    });
    return user;
};
exports.getUserById = getUserById;
const createUser = (userData) => {
    const newUser = Object.assign({ id: (0, uuid_1.v4)() }, userData);
    users.push(newUser);
    saveUsersToFile();
    return newUser;
};
exports.createUser = createUser;
const updateUser = (id, userData) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users[index] = Object.assign({ id }, userData);
        saveUsersToFile();
        return users[index];
    }
    return null;
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        saveUsersToFile();
        return true;
    }
    return false;
};
exports.deleteUser = deleteUser;
