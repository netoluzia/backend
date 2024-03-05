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
exports.CreateInsuranceController = void 0;
class CreateInsuranceController {
    constructor(createServiceRepository) {
        this.createServiceRepository = createServiceRepository;
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!params) {
                    return {
                        statusCode: 400,
                        body: {
                            message: 'Bad request',
                            status: false,
                        },
                    };
                }
                const service = yield this.createServiceRepository.createInsurance(params);
                return {
                    statusCode: 200,
                    body: {
                        data: service,
                        message: 'Seguradora criada com sucesso',
                        status: true,
                    },
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    body: {
                        message: 'Something went wrong',
                        status: false,
                    },
                };
            }
        });
    }
}
exports.CreateInsuranceController = CreateInsuranceController;
