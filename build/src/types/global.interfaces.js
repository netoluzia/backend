"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
var Message;
(function (Message) {
    Message["OK"] = "Opera\u00E7\u00E3o realizada com sucesso";
    Message["WRONG_PWD"] = "Palavra-passe errada";
    Message["LOGIN_SUCCEED"] = "Login feito com sucesso";
    Message["INTERNAL_ERROR"] = "Erro de servidor";
    Message["UNKNOWN_USER"] = "Usuario desconhecido";
})(Message || (exports.Message = Message = {}));
