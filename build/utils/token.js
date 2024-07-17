"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(user) {
    return jsonwebtoken_1.default.sign({ email: user.email }, 'your_secret_key', {
        expiresIn: '8h',
    });
}
exports.generateToken = generateToken;
