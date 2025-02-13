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
exports.UpdateAttendingController = void 0;
class UpdateAttendingController {
    constructor(updateAttendingRepository, io) {
        this.updateAttendingRepository = updateAttendingRepository;
        this.io = io;
    }
    handle(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = params;
                const attending = yield this.updateAttendingRepository.updateAttending(id, params);
                if (status == 'to-doctor-1') {
                    this.io.emit('attending:from-trial');
                }
                else if (status == 'to-attendant') {
                    this.io.emit('attending:from-doctor-1');
                }
                else if (status == 'to-lab') {
                    this.io.emit('attending:from-doctor-1-attendant');
                }
                return {
                    body: {
                        message: 'Operação concluída com sucesso',
                        status: true,
                        data: attending,
                    },
                    statusCode: 201,
                };
            }
            catch (error) {
                return {
                    body: {
                        message: error.message,
                        status: true,
                    },
                    statusCode: 500,
                };
            }
        });
    }
}
exports.UpdateAttendingController = UpdateAttendingController;
