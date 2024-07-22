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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const exemptions = [
    {
        code: 'M00',
        description: 'IVA – Regime Simplificado',
    },
    {
        code: 'M02',
        description: 'Transmissão de bens e serviço não sujeita',
    },
    {
        code: 'M04',
        description: 'IVA – Regime de Exclusão',
    },
    {
        code: 'M10',
        description: 'Isento nos termos da alínea a) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M11',
        description: 'Isento nos termos da alínea b) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M12',
        description: 'Isento nos termos da alínea c) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M13',
        description: 'Isento nos termos da alínea d) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M14',
        description: 'Isento nos termos da alínea e) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M15',
        description: 'Isento nos termos da alínea f) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M16',
        description: 'Isento nos termos da alínea g) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M17',
        description: 'Isento nos termos da alínea h) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M18',
        description: 'Isento nos termos da alínea i) do nº1 artigo 12.º do CIVA',
    },
    {
        code: 'M19',
        description: 'Isento nos termos da alínea j) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M20',
        description: 'Isento nos termos da alínea k) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M21',
        description: 'Isento nos termos da alínea l) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M22',
        description: 'Isento nos termos da alínea m) do artigo 12.º do CIVA',
    },
    {
        code: 'M23',
        description: 'Isento nos termos da alínea n) do artigo 12.º do CIVA',
    },
    {
        code: 'M24',
        description: 'Isento nos termos da alínea o) do artigo 12.º do CIVA',
    },
    {
        code: 'M30',
        description: 'Isento nos termos da alínea l) do nº1 do artigo 12.º do CIVA',
    },
    {
        code: 'M31',
        description: 'Isento nos termos da alínea b) do artigo 15.º do CIVA',
    },
    {
        code: 'M32',
        description: 'Isento nos termos da alínea c) do artigo 15.º do CIVA',
    },
    {
        code: 'M33',
        description: 'Isento nos termos da alínea d) do artigo 15.º do CIVA',
    },
    {
        code: 'M34',
        description: 'Isento nos termos da alínea e) do artigo 15.º do CIVA',
    },
    {
        code: 'M35',
        description: 'Isento nos termos da alínea f) do artigo 15.º do CIVA',
    },
    {
        code: 'M36',
        description: 'Isento nos termos da alínea g) do artigo 15.º do CIVA',
    },
    {
        code: 'M37',
        description: 'Isento nos termos da alínea h) do artigo 15.º do CIVA',
    },
    {
        code: 'M38',
        description: 'Isento nos termos da alínea i) do artigo 15.º do CIVA',
    },
    {
        code: 'M80',
        description: 'Isento nos termos da alínea a) do nº1 do artigo 14.º',
    },
    {
        code: 'M81',
        description: 'Isento nos termos da alínea b) do nº1 do artigo 14.º',
    },
    {
        code: 'M82',
        description: 'Isento nos termos da alínea c) do nº1 do artigo 14.º',
    },
    {
        code: 'M83',
        description: 'Isento nos termos da alínea d) do nº1 do artigo 14.º',
    },
    {
        code: 'M84',
        description: 'Isento nos termos da alínea e) do nº1 do artigo 14.º',
    },
    {
        code: 'M85',
        description: 'Isento nos termos da alínea a) do nº2 do artigo 14.º',
    },
    {
        code: 'M86',
        description: 'Isento nos termos da alínea b) do nº2 do artigo 14.º',
    },
    {
        code: 'M90',
        description: 'Isento nos termos da alínea a) do nº1 do artigo 16.º',
    },
    {
        code: 'M91',
        description: 'Isento nos termos da alínea b) do nº1 do artigo 16.º',
    },
    {
        code: 'M92',
        description: 'Isento nos termos da alínea c) do nº1 do artigo 16.º',
    },
    {
        code: 'M93',
        description: 'Isento nos termos da alínea d) do nº1 do artigo 16.º',
    },
    {
        code: 'M94',
        description: 'Isento nos termos da alínea e) do nº1 do artigo 16.º',
    },
    {
        code: 'NOR',
        description: 'Taxa Normal',
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const reports = yield prisma.exemption.createMany({
            data: exemptions,
        });
        console.log(reports);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e.message);
    yield prisma.$disconnect();
    process.exit(1);
}));
