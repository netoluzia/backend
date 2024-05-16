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
exports.CreateCompanyControler = void 0;
class CreateCompanyControler {
    constructor(create, update) {
        this.create = create;
        this.update = update;
    }
    handle(payload, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let company;
                if (id) {
                    company = yield this.update.updateCompany(payload, id);
                }
                else {
                    company = yield this.create.createCompany(payload);
                }
                return {
                    body: {
                        message: 'Operação realizada com sucesso',
                        status: true,
                        data: company,
                    },
                    statusCode: 201,
                };
            }
            catch (error) {
                return {
                    body: {
                        message: error.message,
                        status: false,
                    },
                    statusCode: 500,
                };
            }
        });
    }
}
exports.CreateCompanyControler = CreateCompanyControler;
