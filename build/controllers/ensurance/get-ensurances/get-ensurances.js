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
exports.GetInsurancesController = void 0;
class GetInsurancesController {
    constructor(getInsurancesRepository) {
        this.getInsurancesRepository = getInsurancesRepository;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insurances = yield this.getInsurancesRepository.getInsurances();
                return {
                    body: {
                        message: 'Seguradoras carregadas com sucesso',
                        status: true,
                        data: insurances,
                    },
                    statusCode: 200,
                };
            }
            catch (error) {
                return {
                    body: {
                        message: 'Ocorreu um erro',
                        status: false,
                    },
                    statusCode: 500,
                };
            }
        });
    }
}
exports.GetInsurancesController = GetInsurancesController;
