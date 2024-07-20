"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middlewares = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Middlewares {
    verifyToken(req, res, next) {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (token == null)
            return res
                .status(401)
                .send({ message: 'Token expirado ou sem autorização' });
        jsonwebtoken_1.default.verify(token, 'alfavida_app_management_clinic', (err, user) => {
            if (err)
                return res
                    .status(401)
                    .send({ message: 'Token expirado ou sem autorização' });
            req.user = user;
            next();
        });
    }
}
exports.Middlewares = Middlewares;
