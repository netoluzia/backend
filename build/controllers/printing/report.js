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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const pdfmake_1 = __importDefault(require("pdfmake"));
class ReportController {
    handle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const fonts = {
                    Courier: {
                        normal: 'Courier',
                        bold: 'Courier-Bold',
                        italics: 'Courier-Oblique',
                        bolditalics: 'Courier-BoldOblique',
                    },
                    Helvetica: {
                        normal: 'Helvetica',
                        bold: 'Helvetica-Bold',
                        italics: 'Helvetica-Oblique',
                        bolditalics: 'Helvetica-BoldOblique',
                    },
                    Times: {
                        normal: 'Times-Roman',
                        bold: 'Times-Bold',
                        italics: 'Times-Italic',
                        bolditalics: 'Times-BoldItalic',
                    },
                    Symbol: {
                        normal: 'Symbol',
                    },
                    ZapfDingbats: {
                        normal: 'ZapfDingbats',
                    },
                };
                const printer = new pdfmake_1.default(fonts);
                let docDefinition = {
                    content: ['First paragraph', 'Honorio de Sousa', id],
                    defaultStyle: {
                        font: 'Helvetica',
                    },
                };
                const pdfDoc = printer.createPdfKitDocument(docDefinition);
                const chunks = [];
                pdfDoc.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                pdfDoc.end();
                pdfDoc.on('end', () => {
                    const result = Buffer.concat(chunks);
                    resolve(result);
                });
                pdfDoc.on('error', (error) => {
                    reject(error);
                });
            });
        });
    }
}
exports.ReportController = ReportController;
