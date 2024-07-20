"use strict";
// const sumDiscount = (
//   items: {
//     id:
//       | {
//           $oid: string
//         }
//       | string
//     total: any
//     quantity: any
//     unit_price: any
//     item: any
//     description: any
//     discount: any
//   }[]
// ) => {
//   let res = 0
//   items.forEach((item) => {
//     res += Number(item.discount)
//   })
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
//   return res
// }
// function separateFirstTwoChars(input: string): string {
//   if (input.length < 2) {
//     throw new Error('A string deve ter pelo menos 2 caracteres.')
//   }
//   const firstTwoChars = input.substring(0, 2)
//   const restOfString = input.substring(2)
//   return `${firstTwoChars} ${restOfString}`
// }
// for await (const invoice of invoices) {
//   await prisma.invoice.create({
//     data: {
//       hash4: invoice.hash4.length < 4 ? generateHashes(4) : invoice.hash4,
//       hash64:
//         invoice.hash64.length < 64 ? generateHashes(64) : invoice.hash64,
//       reference: separateFirstTwoChars(invoice.reference),
//       serie: String(invoice.serie),
//       status: invoice.paid ? 'PAGO' : 'POR_PAGAR',
//       type: invoice.document as InvoiceType,
//       userId: invoice.attendant.$oid,
//       amount_received: invoice.amount_received,
//       change: invoice.change,
//       createdAt: invoice.createdAt.$date,
//       customerId: invoice.client.$oid,
//       deletedAt: null,
//       discount: sumDiscount(invoice.items),
//       emission_date: invoice.emission_date.$date,
//       expiry_date: invoice.expiryDate?.$date,
//       id: invoice._id.$oid,
//       invoiceId: null,
//       paymentId: invoice.payment?.$oid,
//       reasonInssuance: null,
//       total: invoice.total,
//       updatedAt: invoice.createdAt.$date,
//       invoiceItems: {
//         createMany: {
//           data: invoice.items.map((item) => ({
//             discount: item.discount,
//             price: Number(item.unit_price),
//             total: item.total,
//             quantity: Number(item.quantity),
//             serviceId: typeof item.id == 'object' ? item.id.$oid : item.id,
//           })),
//         },
//       },
//     },
//   })
// }
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const services = [
    {
        _id: {
            $oid: '65e9d8455905c96022924211',
        },
        title: '01020001',
        description: 'CONSULTA URGÊNCIA/SAP-NÃO ESPECIALISTA-1ªCONSULTA',
        net_price: 16002,
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-03-07T15:07:49.153Z',
        },
        updatedAt: {
            $date: '2024-07-19T15:20:57.111Z',
        },
        discount: '',
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '65f1af0269317125aff0e3aa',
        },
        title: 'CONSULTA',
        description: 'Normal',
        net_price: 5000,
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-03-13T13:49:54.754Z',
        },
        updatedAt: {
            $date: '2024-06-30T10:42:53.605Z',
        },
        discount: '',
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '6605865b6bf45d2e58ade975',
        },
        title: 'VIDAL',
        description: 'Exame de laboratório',
        net_price: '7900',
        category: {
            label: 'Laboratório',
            value: 'LAB',
        },
        type: 'service',
        createdAt: {
            $date: '2024-03-28T15:01:47.987Z',
        },
    },
    {
        _id: {
            $oid: '6638dda456a132c3da4c7004',
        },
        title: 'Ecografia',
        description: 'Obstetrícia ',
        net_price: '5000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-06T13:39:48.522Z',
        },
        updatedAt: {
            $date: '2024-05-19T15:38:51.515Z',
        },
        discount: '',
    },
    {
        _id: {
            $oid: '663a36630bd04d8c351f70d4',
        },
        title: 'Cardiologia',
        description: null,
        net_price: '50000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-07T14:10:43.746Z',
        },
    },
    {
        _id: {
            $oid: '663e26deeca3d36c2241206e',
        },
        title: 'Ecografia',
        description: 'Pélvica',
        net_price: '10000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-10T13:53:34.360Z',
        },
        updatedAt: {
            $date: '2024-05-14T13:13:48.627Z',
        },
    },
    {
        _id: {
            $oid: '663e274eeca3d36c22412070',
        },
        title: '75040085',
        description: 'REAÇÃO DE WIDAL OU VIDAL(4 ANTIGÉNIOS)',
        net_price: 3498.6,
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-10T13:55:26.342Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-07-19T15:21:12.539Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '663e2767eca3d36c22412071',
        },
        title: 'EXAME',
        description: 'PP',
        net_price: '1000',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-10T13:55:51.018Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-06-29T12:47:17.608Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '663e27a6eca3d36c22412072',
        },
        title: 'ATENDIMENTO',
        description: 'TRATAMENTO PARTICULAR',
        net_price: '7000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-10T13:56:54.183Z',
        },
        updatedAt: {
            $date: '2024-05-21T11:28:03.167Z',
        },
    },
    {
        _id: {
            $oid: '663e27dceca3d36c22412073',
        },
        title: 'PARACETAMOL',
        description: 'XAROPE',
        net_price: 1000,
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-10T13:57:48.502Z',
        },
        ivaTax: 0,
        updatedAt: {
            $date: '2024-06-30T10:43:22.429Z',
        },
    },
    {
        _id: {
            $oid: '663e27fdeca3d36c22412074',
        },
        title: 'VIT. COMPLEXO B',
        description: 'XAROPE',
        net_price: 1000,
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-10T13:58:21.938Z',
        },
        ivaTax: 0,
        updatedAt: {
            $date: '2024-06-30T10:44:12.766Z',
        },
    },
    {
        _id: {
            $oid: '663e2826eca3d36c22412075',
        },
        title: 'AMOXACILINA',
        description: 'XAROPE',
        net_price: '1000',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-10T13:59:02.860Z',
        },
        updatedAt: {
            $date: '2024-06-30T10:51:24.263Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '66422d9deca3d36c2241207a',
        },
        title: 'Consulta',
        description: 'Urgência',
        net_price: '16002.0',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:11:25.187Z',
        },
        updatedAt: {
            $date: '2024-05-27T09:58:06.056Z',
        },
    },
    {
        _id: {
            $oid: '66422dceeca3d36c2241207b',
        },
        title: 'Consulta',
        description: 'Controlo',
        net_price: '1',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:12:14.517Z',
        },
    },
    {
        _id: {
            $oid: '66422e00eca3d36c2241207c',
        },
        title: 'Consulta',
        description: 'Urgência',
        net_price: '5000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:13:04.281Z',
        },
        updatedAt: {
            $date: '2024-05-15T07:38:17.891Z',
        },
    },
    {
        _id: {
            $oid: '66422e35eca3d36c2241207d',
        },
        title: 'Consulta',
        description: 'Odontopediatria',
        net_price: '5000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:13:57.521Z',
        },
    },
    {
        _id: {
            $oid: '66422e67eca3d36c2241207e',
        },
        title: 'Consulta',
        description: 'Pediatria',
        net_price: '5000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:14:47.096Z',
        },
        discount: '2000',
        updatedAt: {
            $date: '2024-05-21T13:36:57.456Z',
        },
    },
    {
        _id: {
            $oid: '66422e87eca3d36c2241207f',
        },
        title: 'Consulta',
        description: 'Genecologia',
        net_price: '6000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:15:19.157Z',
        },
    },
    {
        _id: {
            $oid: '66422eadeca3d36c22412080',
        },
        title: 'Consulta',
        description: 'Planeamento Familiar',
        net_price: '12000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:15:57.399Z',
        },
    },
    {
        _id: {
            $oid: '66422ecaeca3d36c22412081',
        },
        title: 'Consulta',
        description: 'Ortopedia',
        net_price: '15000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:16:26.103Z',
        },
    },
    {
        _id: {
            $oid: '66422ef3eca3d36c22412082',
        },
        title: 'Consulta',
        description: 'Psicologia',
        net_price: '15000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:17:07.310Z',
        },
    },
    {
        _id: {
            $oid: '66422f16eca3d36c22412083',
        },
        title: 'Consulta',
        description: 'Cardiologia',
        net_price: '15000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:17:42.576Z',
        },
    },
    {
        _id: {
            $oid: '66422f30eca3d36c22412084',
        },
        title: 'Consulta',
        description: 'Infertilidade',
        net_price: '15000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:18:08.986Z',
        },
    },
    {
        _id: {
            $oid: '66422f4eeca3d36c22412085',
        },
        title: 'Consulta',
        description: 'Dematologia',
        net_price: '15000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:18:38.898Z',
        },
    },
    {
        _id: {
            $oid: '66422f69eca3d36c22412086',
        },
        title: 'Consulta',
        description: 'Urologia',
        net_price: '15000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:19:05.437Z',
        },
    },
    {
        _id: {
            $oid: '66423785eca3d36c22412087',
        },
        title: 'Ecografia',
        description: 'Mamaria',
        net_price: '20000',
        category: 'ESP',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:53:41.447Z',
        },
    },
    {
        _id: {
            $oid: '664237b0eca3d36c22412088',
        },
        title: 'Ecografia',
        description: 'Testicular',
        net_price: '12000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:54:24.018Z',
        },
    },
    {
        _id: {
            $oid: '664237ebeca3d36c22412089',
        },
        title: 'Ecografia',
        description: 'Testicular(2x)',
        net_price: '25000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-13T15:55:23.949Z',
        },
    },
    {
        _id: {
            $oid: '66435747eca3d36c2241208a',
        },
        title: 'Ecografia',
        description: 'Partes Moles',
        net_price: '15000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:21:27.976Z',
        },
    },
    {
        _id: {
            $oid: '66435769eca3d36c2241208b',
        },
        title: 'Ecografia',
        description: 'Abdominal',
        net_price: '15000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:22:01.774Z',
        },
    },
    {
        _id: {
            $oid: '66435784eca3d36c2241208c',
        },
        title: 'Ecografia',
        description: 'Renal',
        net_price: '15000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:22:28.025Z',
        },
    },
    {
        _id: {
            $oid: '664357adeca3d36c2241208d',
        },
        title: 'Ecografia',
        description: 'Morfológica ',
        net_price: '30000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:23:09.861Z',
        },
    },
    {
        _id: {
            $oid: '664357d4eca3d36c2241208e',
        },
        title: 'Ecografia',
        description: 'Transvaginal',
        net_price: '12000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:23:48.776Z',
        },
    },
    {
        _id: {
            $oid: '66435805eca3d36c2241208f',
        },
        title: 'Ecografia',
        description: 'Edovaginal',
        net_price: '16000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:24:37.376Z',
        },
    },
    {
        _id: {
            $oid: '6643582eeca3d36c22412090',
        },
        title: 'Ecografia',
        description: 'Prostática ',
        net_price: '15000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:25:18.965Z',
        },
    },
    {
        _id: {
            $oid: '66435850eca3d36c22412091',
        },
        title: 'Ecografia',
        description: 'Ecocadiograma',
        net_price: '25000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:25:52.080Z',
        },
    },
    {
        _id: {
            $oid: '6643587ceca3d36c22412092',
        },
        title: 'Raio X',
        description: 'Torax AP',
        net_price: '10000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:26:36.746Z',
        },
    },
    {
        _id: {
            $oid: '664358a1eca3d36c22412093',
        },
        title: 'Raio X',
        description: 'Torax AP+ Perfil',
        net_price: '12000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:27:13.927Z',
        },
    },
    {
        _id: {
            $oid: '664358d4eca3d36c22412094',
        },
        title: 'Raio X',
        description: 'Abdômen ',
        net_price: '12000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:28:04.476Z',
        },
    },
    {
        _id: {
            $oid: '6643590beca3d36c22412095',
        },
        title: 'Raio X',
        description: 'Abdômen + Perfil',
        net_price: '14000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:28:59.947Z',
        },
    },
    {
        _id: {
            $oid: '6643592feca3d36c22412096',
        },
        title: 'Raio X',
        description: 'Crânio + Perfil',
        net_price: '20000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:29:35.225Z',
        },
        discount: '2000',
        updatedAt: {
            $date: '2024-05-21T11:48:13.824Z',
        },
    },
    {
        _id: {
            $oid: '66435961eca3d36c22412097',
        },
        title: 'Raio X',
        description: 'Braço',
        net_price: '12000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:30:25.397Z',
        },
    },
    {
        _id: {
            $oid: '66435989eca3d36c22412098',
        },
        title: 'Raio X',
        description: 'Braço Axial',
        net_price: '15000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:31:05.903Z',
        },
    },
    {
        _id: {
            $oid: '664359b9eca3d36c22412099',
        },
        title: 'Raio X',
        description: 'Antebraço AP + Perfil',
        net_price: '15000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:31:53.984Z',
        },
    },
    {
        _id: {
            $oid: '664359e4eca3d36c2241209a',
        },
        title: 'Raio X',
        description: 'Punho AP + Perfil',
        net_price: '15000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:32:36.885Z',
        },
    },
    {
        _id: {
            $oid: '66435a11eca3d36c2241209b',
        },
        title: 'Raio X',
        description: 'Mão AP + Perfil',
        net_price: '14000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:33:21.114Z',
        },
    },
    {
        _id: {
            $oid: '66435a3ceca3d36c2241209c',
        },
        title: 'Raio X',
        description: 'Bacia( Pélvica)',
        net_price: '14000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:34:04.273Z',
        },
    },
    {
        _id: {
            $oid: '66435a7beca3d36c2241209d',
        },
        title: 'Raio X',
        description: 'Coluna Cervical',
        net_price: '16000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:35:07.511Z',
        },
    },
    {
        _id: {
            $oid: '66435aa5eca3d36c2241209e',
        },
        title: 'Raio X',
        description: 'Coluna Dorcal( Torácica)',
        net_price: '17000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:35:49.430Z',
        },
    },
    {
        _id: {
            $oid: '66435ac7eca3d36c2241209f',
        },
        title: 'Raio X',
        description: 'Coluna Lombar',
        net_price: '18000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:36:23.180Z',
        },
        updatedAt: {
            $date: '2024-05-27T15:03:32.113Z',
        },
        discount: '2000',
    },
    {
        _id: {
            $oid: '66435ae5eca3d36c224120a0',
        },
        title: 'Raio X',
        description: 'Coluna Total',
        net_price: '30000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:36:53.504Z',
        },
    },
    {
        _id: {
            $oid: '66435b0deca3d36c224120a1',
        },
        title: 'Raio X',
        description: 'Fémur AP + Perfil',
        net_price: '17000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:37:33.850Z',
        },
    },
    {
        _id: {
            $oid: '66435b2eeca3d36c224120a2',
        },
        title: 'Raio X',
        description: 'Joelho AP + Perfil',
        net_price: '17000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:38:06.692Z',
        },
        discount: '2000',
        updatedAt: {
            $date: '2024-05-17T09:36:16.081Z',
        },
    },
    {
        _id: {
            $oid: '66435b54eca3d36c224120a3',
        },
        title: 'Raio X',
        description: 'Joelho Comparativo',
        net_price: '17000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:38:44.840Z',
        },
        updatedAt: {
            $date: '2024-05-14T12:40:17.603Z',
        },
    },
    {
        _id: {
            $oid: '66435bdbeca3d36c224120a4',
        },
        title: 'Raio X',
        description: 'Tornozelo AP + Perfil',
        net_price: '17000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:40:59.827Z',
        },
    },
    {
        _id: {
            $oid: '66435bfceca3d36c224120a5',
        },
        title: 'Raio X',
        description: 'Perna AP+ Perfil',
        net_price: '17000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:41:32.195Z',
        },
    },
    {
        _id: {
            $oid: '66435c1feca3d36c224120a6',
        },
        title: 'Raio X',
        description: 'Pé AP+ perfil',
        net_price: '17000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:42:07.877Z',
        },
    },
    {
        _id: {
            $oid: '66435c3aeca3d36c224120a7',
        },
        title: 'Raio X',
        description: 'Ombro',
        net_price: '12000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:42:34.839Z',
        },
    },
    {
        _id: {
            $oid: '66435c88eca3d36c224120a8',
        },
        title: 'Raio X',
        description: 'Seios Perínasais',
        net_price: '20000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:43:52.391Z',
        },
    },
    {
        _id: {
            $oid: '66435caaeca3d36c224120a9',
        },
        title: 'Raio X',
        description: 'Técnica de Cavu',
        net_price: '20000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:44:26.664Z',
        },
    },
    {
        _id: {
            $oid: '66435cc7eca3d36c224120aa',
        },
        title: 'Raio X',
        description: 'Rotula',
        net_price: '20000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:44:55.458Z',
        },
    },
    {
        _id: {
            $oid: '66435cf7eca3d36c224120ab',
        },
        title: 'Raio X',
        description: 'Técnica de Joelho em Carga',
        net_price: '20000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:45:43.701Z',
        },
    },
    {
        _id: {
            $oid: '66435d23eca3d36c224120ac',
        },
        title: 'Raio X',
        description: 'Técnica de Râ',
        net_price: '20000',
        category: 'RX',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:46:27.278Z',
        },
    },
    {
        _id: {
            $oid: '66435d48eca3d36c224120ad',
        },
        title: 'Exame',
        description: 'VDRL',
        net_price: '2500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:47:04.724Z',
        },
        updatedAt: {
            $date: '2024-05-21T09:01:01.947Z',
        },
    },
    {
        _id: {
            $oid: '66435d65eca3d36c224120ae',
        },
        title: 'Exame',
        description: 'HIV',
        net_price: '2500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:47:33.630Z',
        },
        updatedAt: {
            $date: '2024-05-21T09:00:27.236Z',
        },
    },
    {
        _id: {
            $oid: '66435d9aeca3d36c224120af',
        },
        title: 'Exame',
        description: 'VDRL',
        net_price: '2500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:48:26.046Z',
        },
        ivaTax: 0,
        updatedAt: {
            $date: '2024-06-29T13:06:16.982Z',
        },
    },
    {
        _id: {
            $oid: '66435dcfeca3d36c224120b0',
        },
        title: 'Exame',
        description: 'CHICUNGUNHA',
        net_price: '2500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:49:19.896Z',
        },
    },
    {
        _id: {
            $oid: '66435df4eca3d36c224120b1',
        },
        title: 'Exame',
        description: 'Taso',
        net_price: '2500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:49:56.104Z',
        },
    },
    {
        _id: {
            $oid: '66435e36eca3d36c224120b2',
        },
        title: 'Exame',
        description: 'Reumatoide',
        net_price: '3998.40',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:51:02.207Z',
        },
        updatedAt: {
            $date: '2024-06-22T21:13:46.873Z',
        },
    },
    {
        _id: {
            $oid: '66435e53eca3d36c224120b3',
        },
        title: 'Exame',
        description: 'PCR',
        net_price: '2500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:51:31.309Z',
        },
        discount: '500',
        updatedAt: {
            $date: '2024-05-19T11:28:07.334Z',
        },
    },
    {
        _id: {
            $oid: '66435e7feca3d36c224120b4',
        },
        title: 'Exame',
        description: 'HCG',
        net_price: '2500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:52:15.571Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-05-19T17:27:46.965Z',
        },
    },
    {
        _id: {
            $oid: '66435ea8eca3d36c224120b5',
        },
        title: 'Exame',
        description: 'HBS',
        net_price: '2500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:52:56.727Z',
        },
    },
    {
        _id: {
            $oid: '66435ed6eca3d36c224120b6',
        },
        title: 'Hemograma',
        description: 'VHS',
        net_price: '3000',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:53:42.487Z',
        },
        updatedAt: {
            $date: '2024-05-21T09:16:57.317Z',
        },
    },
    {
        _id: {
            $oid: '66435efeeca3d36c224120b7',
        },
        title: 'Hemograma',
        description: 'Grupo Sanguíneo',
        net_price: 2500,
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:54:22.468Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-06-29T13:04:23.453Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '66435f23eca3d36c224120b8',
        },
        title: 'Hemograma',
        description: 'Falciformação',
        net_price: '3000',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:54:59.744Z',
        },
        updatedAt: {
            $date: '2024-05-27T14:23:37.983Z',
        },
    },
    {
        _id: {
            $oid: '66435f47eca3d36c224120b9',
        },
        title: '70100010',
        description: 'Hemograma( ERITROGRAMA+LEUCÓCITOS+FÓRMULA LEUCOCITÁRIA)',
        net_price: 4998,
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:55:35.100Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-07-19T15:21:42.073Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '66435f6feca3d36c224120ba',
        },
        title: '72100019',
        description: 'URINAII( ANÁLISE SUMÁRIA DA URINA)',
        net_price: 3998.4,
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:56:15.220Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-07-19T15:22:09.763Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '66435f9deca3d36c224120bb',
        },
        title: 'Parasitologia',
        description: 'Fezes',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:57:01.463Z',
        },
    },
    {
        _id: {
            $oid: '66435fcbeca3d36c224120bc',
        },
        title: '97160024',
        description: 'GOTA ESPESSA(PATOLOGIA CLINICA)',
        net_price: 2041.2,
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:57:47.260Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-07-17T14:34:24.407Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '66435ffbeca3d36c224120bd',
        },
        title: 'Parasitologia',
        description: 'Espermograma',
        net_price: '5000',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:58:35.390Z',
        },
    },
    {
        _id: {
            $oid: '66436040eca3d36c224120be',
        },
        title: 'Parasitologia',
        description: 'Exundado Vaginal',
        net_price: 2500,
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T12:59:44.743Z',
        },
        updatedAt: {
            $date: '2024-06-29T13:03:06.977Z',
        },
        discount: '',
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '6643607aeca3d36c224120bf',
        },
        title: 'Bioquímica ',
        description: 'Creatinina',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:00:42.822Z',
        },
        updatedAt: {
            $date: '2024-05-21T08:52:29.778Z',
        },
    },
    {
        _id: {
            $oid: '6643609ceca3d36c224120c0',
        },
        title: 'Bioquímica',
        description: 'Colesterol ',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:01:16.074Z',
        },
    },
    {
        _id: {
            $oid: '664360c0eca3d36c224120c1',
        },
        title: 'Bioquímica',
        description: 'Bilirrubina Total',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:01:52.363Z',
        },
        updatedAt: {
            $date: '2024-05-21T10:33:17.736Z',
        },
    },
    {
        _id: {
            $oid: '664360e7eca3d36c224120c2',
        },
        title: 'Bioquímica',
        description: 'Bilirrubina Direita',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:02:31.683Z',
        },
    },
    {
        _id: {
            $oid: '66436103eca3d36c224120c3',
        },
        title: 'Bioquímica',
        description: 'Ureia',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:02:59.522Z',
        },
    },
    {
        _id: {
            $oid: '66436124eca3d36c224120c4',
        },
        title: 'Bioquímica',
        description: 'VLDL',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:03:32.702Z',
        },
    },
    {
        _id: {
            $oid: '66436146eca3d36c224120c5',
        },
        title: 'Bioquímica',
        description: 'Ácido Úrico',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:04:06.507Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-05-21T10:34:43.261Z',
        },
    },
    {
        _id: {
            $oid: '66436163eca3d36c224120c6',
        },
        title: 'Bioquímica',
        description: 'HDL',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:04:35.692Z',
        },
    },
    {
        _id: {
            $oid: '66436181eca3d36c224120c7',
        },
        title: 'Bioquímico',
        description: 'LDL',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:05:05.621Z',
        },
    },
    {
        _id: {
            $oid: '664361a2eca3d36c224120c8',
        },
        title: 'Bioquímico',
        description: 'Glucose',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:05:38.886Z',
        },
        updatedAt: {
            $date: '2024-05-27T14:24:35.639Z',
        },
    },
    {
        _id: {
            $oid: '664361c9eca3d36c224120c9',
        },
        title: 'Bioquímico',
        description: 'TGO',
        net_price: '3500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:06:17.531Z',
        },
    },
    {
        _id: {
            $oid: '664361f4eca3d36c224120ca',
        },
        title: 'Bioquímico',
        description: 'TGP',
        net_price: '4000',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:07:00.985Z',
        },
    },
    {
        _id: {
            $oid: '66436225eca3d36c224120cb',
        },
        title: 'Bioquímico',
        description: 'Triglicerídeos',
        net_price: '4500',
        category: 'LAB',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:07:49.774Z',
        },
    },
    {
        _id: {
            $oid: '66436329eca3d36c224120cc',
        },
        title: 'Ecografia',
        description: 'Mamaria',
        net_price: '20000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:12:09.958Z',
        },
    },
    {
        _id: {
            $oid: '66436347eca3d36c224120cd',
        },
        title: 'Eletrocardiograma',
        description: null,
        net_price: '8000',
        category: 'ECO',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:12:39.361Z',
        },
    },
    {
        _id: {
            $oid: '66436429eca3d36c224120ce',
        },
        title: 'ATENDIMENTO',
        description: 'ADMINISTRAÇÃO DE FÁRMACOS',
        net_price: 3000,
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:16:25.067Z',
        },
        updatedAt: {
            $date: '2024-06-30T11:03:35.590Z',
        },
        discount: '',
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '66436461eca3d36c224120cf',
        },
        title: 'ATENDIMENTO',
        description: 'ADMINISTRAÇÃO DE FÁRMACOS( NOSSO MATERIAL)',
        net_price: '5000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:17:21.695Z',
        },
        updatedAt: {
            $date: '2024-05-19T13:48:47.566Z',
        },
    },
    {
        _id: {
            $oid: '664364b3eca3d36c224120d0',
        },
        title: 'NEBULIZAÇÃO',
        description: null,
        net_price: '5000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:18:43.864Z',
        },
    },
    {
        _id: {
            $oid: '66436553eca3d36c224120d1',
        },
        title: 'PEQUENA CIRURGIAS',
        description: 'ALFA',
        net_price: '5000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:21:23.978Z',
        },
    },
    {
        _id: {
            $oid: '66436570eca3d36c224120d2',
        },
        title: 'PEQUENA CIRURGIAS ',
        description: 'BETA',
        net_price: '10000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:21:52.279Z',
        },
    },
    {
        _id: {
            $oid: '66436591eca3d36c224120d3',
        },
        title: 'PEQUENAS CIRURGIAS',
        description: 'GAMA',
        net_price: '15000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:22:25.508Z',
        },
    },
    {
        _id: {
            $oid: '664365a8eca3d36c224120d4',
        },
        title: 'CURATIVO',
        description: null,
        net_price: '5000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:22:48.973Z',
        },
        discount: '2000',
        updatedAt: {
            $date: '2024-05-17T09:38:32.851Z',
        },
    },
    {
        _id: {
            $oid: '664365c9eca3d36c224120d5',
        },
        title: 'SUTURA',
        description: '5000',
        net_price: '5000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:23:21.881Z',
        },
    },
    {
        _id: {
            $oid: '6643661beca3d36c224120d6',
        },
        title: 'INTERNAMENTO',
        description: '24H',
        net_price: '50000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-14T13:24:43.587Z',
        },
    },
    {
        _id: {
            $oid: '66446683eca3d36c224120dc',
        },
        title: 'Consulta',
        description: 'Normal',
        net_price: '3000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:38:43.281Z',
        },
        updatedAt: {
            $date: '2024-05-27T14:58:47.744Z',
        },
    },
    {
        _id: {
            $oid: '6644669beca3d36c224120dd',
        },
        title: 'Consulta',
        description: 'Marcada',
        net_price: '4000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:39:07.463Z',
        },
    },
    {
        _id: {
            $oid: '664466beeca3d36c224120de',
        },
        title: 'Profilaxia',
        description: 'Normal',
        net_price: '10000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:39:42.033Z',
        },
        discount: '2000',
        updatedAt: {
            $date: '2024-05-21T11:08:43.224Z',
        },
    },
    {
        _id: {
            $oid: '664466dbeca3d36c224120df',
        },
        title: 'Profilaxia',
        description: 'Completa',
        net_price: '15000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:40:11.058Z',
        },
        updatedAt: {
            $date: '2024-05-21T09:41:54.672Z',
        },
    },
    {
        _id: {
            $oid: '6644671feca3d36c224120e0',
        },
        title: 'Dentística',
        description: 'Clareamento Dental',
        net_price: '70000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:41:19.351Z',
        },
    },
    {
        _id: {
            $oid: '66446751eca3d36c224120e1',
        },
        title: 'Dentística',
        description: 'Aplicação de selantes de Fissuras',
        net_price: '10000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:42:09.210Z',
        },
    },
    {
        _id: {
            $oid: '6644677eeca3d36c224120e2',
        },
        title: 'Dentística',
        description: 'Restauração de Dentes Posteriores',
        net_price: '16000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:42:54.590Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-06-30T12:35:24.382Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '664467beeca3d36c224120e3',
        },
        title: 'Dentística',
        description: 'Restauração de Dentes Anteriores/Estética',
        net_price: '20000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:43:58.811Z',
        },
    },
    {
        _id: {
            $oid: '664467e8eca3d36c224120e4',
        },
        title: 'Dentística',
        description: 'Restauração Provisória',
        net_price: '10000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:44:40.960Z',
        },
    },
    {
        _id: {
            $oid: '6644681deca3d36c224120e5',
        },
        title: 'Endodontia',
        description: 'Tratamento de Canal de Incisivo e canino',
        net_price: '30000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:45:33.613Z',
        },
    },
    {
        _id: {
            $oid: '6644684eeca3d36c224120e6',
        },
        title: 'Endodontia',
        description: 'Tratamento de canal em pré Molares',
        net_price: '30000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:46:22.963Z',
        },
    },
    {
        _id: {
            $oid: '6644687deca3d36c224120e7',
        },
        title: 'Endodontia',
        description: 'Tratamento de canal em Molares',
        net_price: '30000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:47:09.963Z',
        },
    },
    {
        _id: {
            $oid: '664468a4eca3d36c224120e8',
        },
        title: 'Cirurgia',
        description: 'Extração Raiz Residual',
        net_price: '10000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:47:48.798Z',
        },
    },
    {
        _id: {
            $oid: '664468cdeca3d36c224120e9',
        },
        title: 'Cirurgia',
        description: 'Extração de Dentes Anteriores',
        net_price: '15000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:48:29.273Z',
        },
    },
    {
        _id: {
            $oid: '664468faeca3d36c224120ea',
        },
        title: 'Cirurgia',
        description: 'Extração de Pré- Molares',
        net_price: '20000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:49:14.272Z',
        },
    },
    {
        _id: {
            $oid: '66446920eca3d36c224120eb',
        },
        title: 'Cirurgia',
        description: 'Extração de Molares',
        net_price: '20000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:49:52.040Z',
        },
        discount: '2000',
        updatedAt: {
            $date: '2024-05-19T17:22:47.998Z',
        },
    },
    {
        _id: {
            $oid: '6644694aeca3d36c224120ec',
        },
        title: 'Cirurgia',
        description: 'Extração de Dentes Inclusos',
        net_price: '25000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:50:34.879Z',
        },
    },
    {
        _id: {
            $oid: '66446976eca3d36c224120ed',
        },
        title: 'Cirurgia',
        description: 'Curetagem Cirurgica',
        net_price: '8000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:51:18.688Z',
        },
    },
    {
        _id: {
            $oid: '6644699beca3d36c224120ee',
        },
        title: 'Cirurgia',
        description: 'Remoção de sutura',
        net_price: '3000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:51:55.802Z',
        },
    },
    {
        _id: {
            $oid: '664469c0eca3d36c224120ef',
        },
        title: 'Cirurgia',
        description: 'Cirurgia de Retalho',
        net_price: '15000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:52:32.933Z',
        },
    },
    {
        _id: {
            $oid: '664469f0eca3d36c224120f0',
        },
        title: 'Odontopediatria',
        description: 'Profilaxia Completa',
        net_price: '10000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:53:20.970Z',
        },
    },
    {
        _id: {
            $oid: '66446a19eca3d36c224120f1',
        },
        title: 'Odontopediatria',
        description: 'Aplicação de Selante',
        net_price: '5000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:54:01.741Z',
        },
    },
    {
        _id: {
            $oid: '66446a42eca3d36c224120f2',
        },
        title: 'Odontopediatria',
        description: 'Restauração Dentária',
        net_price: '10000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:54:42.332Z',
        },
    },
    {
        _id: {
            $oid: '66446a6beca3d36c224120f3',
        },
        title: 'Odontopediatria',
        description: 'Extração Dentária',
        net_price: '10000',
        category: 'EST',
        type: 'service',
        createdAt: {
            $date: '2024-05-15T07:55:23.119Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-05-21T09:48:46.237Z',
        },
    },
    {
        _id: {
            $oid: '6645b12ceca3d36c22412185',
        },
        title: 'Bromexina- Adulto',
        description: 'Xarope',
        net_price: '2000',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:09:32.323Z',
        },
    },
    {
        _id: {
            $oid: '6645b152eca3d36c22412186',
        },
        title: 'Levofloxacina',
        description: 'Comprimido',
        net_price: '1000',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:10:10.355Z',
        },
    },
    {
        _id: {
            $oid: '6645b173eca3d36c22412187',
        },
        title: 'Clavamox',
        description: 'Xarope',
        net_price: '7000',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:10:43.903Z',
        },
        updatedAt: {
            $date: '2024-05-21T11:22:37.119Z',
        },
        discount: '',
    },
    {
        _id: {
            $oid: '6645b1a7eca3d36c22412188',
        },
        title: 'Clavamox(625mg)',
        description: 'Comprimido',
        net_price: '3000',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:11:35.123Z',
        },
        updatedAt: {
            $date: '2024-06-14T12:43:31.949Z',
        },
    },
    {
        _id: {
            $oid: '6645b1d9eca3d36c22412189',
        },
        title: 'Nolotil( 575mg)',
        description: 'Comprimido',
        net_price: '2000',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:12:25.094Z',
        },
        updatedAt: {
            $date: '2024-05-21T15:02:14.059Z',
        },
    },
    {
        _id: {
            $oid: '6645b22ceca3d36c2241218a',
        },
        title: 'Multivitamina',
        description: 'Comprimido',
        net_price: '500',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:13:48.344Z',
        },
    },
    {
        _id: {
            $oid: '6645b28beca3d36c2241218b',
        },
        title: 'Coartem',
        description: 'Comprimido',
        net_price: 1500,
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:15:23.302Z',
        },
        updatedAt: {
            $date: '2024-06-29T12:35:40.327Z',
        },
        discount: '',
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '6645b2b4eca3d36c2241218c',
        },
        title: 'Amoxalicina',
        description: 'Comprimido',
        net_price: '500',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:16:04.684Z',
        },
    },
    {
        _id: {
            $oid: '6645b2cfeca3d36c2241218d',
        },
        title: 'Paracetamol',
        description: 'Comprimido',
        net_price: 500,
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:16:31.809Z',
        },
        updatedAt: {
            $date: '2024-06-29T12:51:30.175Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '6645b353eca3d36c2241218e',
        },
        title: 'Ciprofloxacina',
        description: 'Comprimido',
        net_price: 500,
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:18:43.506Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-06-29T12:36:14.284Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '6645b386eca3d36c2241218f',
        },
        title: 'Anaflam',
        description: 'Xarope',
        net_price: '1500',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:19:34.278Z',
        },
    },
    {
        _id: {
            $oid: '6645b3b7eca3d36c22412190',
        },
        title: 'Buscompam',
        description: 'Comprimido',
        net_price: '500',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:20:23.910Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-05-21T09:36:49.864Z',
        },
    },
    {
        _id: {
            $oid: '6645b41feca3d36c22412191',
        },
        title: 'Anaflam',
        description: 'Comprimido',
        net_price: '500',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:22:07.299Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-05-19T16:17:27.016Z',
        },
    },
    {
        _id: {
            $oid: '6645b441eca3d36c22412192',
        },
        title: 'Albendazol',
        description: 'Xarope',
        net_price: 1000,
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:22:41.021Z',
        },
        discount: '',
        updatedAt: {
            $date: '2024-07-15T15:57:23.831Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '6645b4d0eca3d36c22412193',
        },
        title: 'Metrronidazol',
        description: 'Xarope',
        net_price: 1000,
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:25:04.614Z',
        },
        updatedAt: {
            $date: '2024-06-30T10:44:55.656Z',
        },
        ivaTax: 0,
    },
    {
        _id: {
            $oid: '6645b4edeca3d36c22412194',
        },
        title: 'Multivitamina',
        description: 'Xarope',
        net_price: '1500',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:25:33.294Z',
        },
        updatedAt: {
            $date: '2024-05-21T09:21:46.076Z',
        },
    },
    {
        _id: {
            $oid: '6645b519eca3d36c22412195',
        },
        title: 'Metronidazol',
        description: 'Comprimido',
        net_price: '250',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:26:17.215Z',
        },
        updatedAt: {
            $date: '2024-05-21T09:22:18.823Z',
        },
    },
    {
        _id: {
            $oid: '6645bb62eca3d36c22412196',
        },
        title: 'CURATIVO',
        description: 'Campanha',
        net_price: '3000',
        category: 'ENF',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:53:06.946Z',
        },
        updatedAt: {
            $date: '2024-05-19T17:01:04.124Z',
        },
        discount: '1000',
    },
    {
        _id: {
            $oid: '6645bc71eca3d36c22412198',
        },
        title: 'Clavamox',
        description: 'Xarope',
        net_price: '6000',
        category: 'FAR',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T07:57:37.386Z',
        },
    },
    {
        _id: {
            $oid: '6645e931deaeb5ab19d67c47',
        },
        title: 'Teste VIH',
        description: 'Description',
        net_price: '1000',
        category: 'LAB',
        discount: '300',
        type: 'service',
        createdAt: {
            $date: '2024-05-16T11:08:33.957Z',
        },
    },
    {
        _id: {
            $oid: '6647168ea00c693b606fbf73',
        },
        title: 'Exame',
        description: 'Glicemia',
        net_price: '3500',
        category: 'LAB',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-17T08:34:22.259Z',
        },
        updatedAt: {
            $date: '2024-05-21T08:59:04.359Z',
        },
    },
    {
        _id: {
            $oid: '664717a0a00c693b606fbf75',
        },
        title: 'Dentística',
        description: 'Lavagem',
        net_price: '10000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-17T08:38:56.491Z',
        },
    },
    {
        _id: {
            $oid: '66471c5ba00c693b606fbf7b',
        },
        title: 'Dentística',
        description: 'Restauração Estética',
        net_price: '25000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-17T08:59:07.715Z',
        },
    },
    {
        _id: {
            $oid: '66471dd5a00c693b606fbf7e',
        },
        title: 'Atendimento',
        description: 'Carão de gestante',
        net_price: '2000',
        category: 'ENF',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-17T09:05:25.918Z',
        },
        updatedAt: {
            $date: '2024-05-19T09:33:51.625Z',
        },
    },
    {
        _id: {
            $oid: '66471f37a00c693b606fbf80',
        },
        title: 'Bioquímico',
        description: 'HBS',
        net_price: '2500',
        category: 'LAB',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-17T09:11:19.993Z',
        },
    },
    {
        _id: {
            $oid: '66471f59a00c693b606fbf81',
        },
        title: 'Bioquímico',
        description: 'HIV',
        net_price: '2500',
        category: 'LAB',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-17T09:11:53.892Z',
        },
        updatedAt: {
            $date: '2024-05-17T09:24:10.315Z',
        },
    },
    {
        _id: {
            $oid: '664720daa00c693b606fbf82',
        },
        title: 'Bioquímico ',
        description: 'HBS',
        net_price: '2500',
        category: 'LAB',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-17T09:18:18.704Z',
        },
        updatedAt: {
            $date: '2024-05-17T09:23:23.714Z',
        },
    },
    {
        _id: {
            $oid: '6649d6745de9a270867c136a',
        },
        title: 'bioquímico',
        description: 'VS',
        net_price: '2700.55',
        category: 'LAB',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T10:37:40.017Z',
        },
        updatedAt: {
            $date: '2024-05-23T08:54:42.169Z',
        },
    },
    {
        _id: {
            $oid: '6649ee1a5de9a270867c137e',
        },
        title: 'Dentística',
        description: 'Exodontia de incisivo lateral',
        net_price: '10000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T12:18:34.776Z',
        },
    },
    {
        _id: {
            $oid: '6649f08f5de9a270867c1382',
        },
        title: 'Bioquímico',
        description: 'Hepatite',
        net_price: '2500',
        category: 'LAB',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T12:29:03.166Z',
        },
        updatedAt: {
            $date: '2024-05-21T09:00:10.397Z',
        },
    },
    {
        _id: {
            $oid: '6649ff795de9a270867c1389',
        },
        title: 'Dentistica',
        description: 'Incisão',
        net_price: '15000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T13:32:41.026Z',
        },
    },
    {
        _id: {
            $oid: '664a05c35de9a270867c1391',
        },
        title: 'Dentística',
        description: 'Limpeza profunda',
        net_price: '20000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T13:59:31.478Z',
        },
    },
    {
        _id: {
            $oid: '664a05e75de9a270867c1392',
        },
        title: 'Dentística',
        description: 'Limpeza Normal',
        net_price: '15000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T14:00:07.313Z',
        },
    },
    {
        _id: {
            $oid: '664a09495de9a270867c1395',
        },
        title: 'TRATAMENTO',
        description: 'TRATAMENTO CONTÍNUO BETA',
        net_price: '12000',
        category: 'ENF',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T14:14:33.813Z',
        },
        updatedAt: {
            $date: '2024-06-14T12:42:59.650Z',
        },
    },
    {
        _id: {
            $oid: '664a09765de9a270867c1396',
        },
        title: 'VIT. Complexo B',
        description: 'Comprimido',
        net_price: 500,
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T14:15:18.604Z',
        },
        ivaTax: 0,
        updatedAt: {
            $date: '2024-06-30T10:47:25.821Z',
        },
    },
    {
        _id: {
            $oid: '664a0cca5de9a270867c139b',
        },
        title: 'Dentística',
        description: 'Restauração de Molar',
        net_price: '10000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T14:29:30.541Z',
        },
    },
    {
        _id: {
            $oid: '664a15485de9a270867c13a6',
        },
        title: 'Dentística',
        description: 'Destartarização',
        net_price: '5000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T15:05:44.523Z',
        },
    },
    {
        _id: {
            $oid: '664a15745de9a270867c13a7',
        },
        title: 'Dentística',
        description: 'Restauração da II fase',
        net_price: '17000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T15:06:28.424Z',
        },
        updatedAt: {
            $date: '2024-05-21T09:44:12.929Z',
        },
    },
    {
        _id: {
            $oid: '664a2c375de9a270867c13b5',
        },
        title: 'Consulta',
        description: 'Pré-Natal',
        net_price: '5000',
        category: 'ESP',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T16:43:35.881Z',
        },
        updatedAt: {
            $date: '2024-05-27T14:22:10.953Z',
        },
    },
    {
        _id: {
            $oid: '664a31545de9a270867c13b9',
        },
        title: 'VACINA',
        description: 'HEPATITE',
        net_price: '5000',
        category: 'ENF',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T17:05:24.074Z',
        },
    },
    {
        _id: {
            $oid: '664a3ee95de9a270867c13c6',
        },
        title: 'Exame',
        description: 'TH+TC',
        net_price: '2500',
        category: 'LAB',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-19T18:03:21.596Z',
        },
    },
    {
        _id: {
            $oid: '664c70965de9a270867c13d9',
        },
        title: 'Hidrocortisona',
        description: 'pomada',
        net_price: '1000',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T09:59:50.590Z',
        },
    },
    {
        _id: {
            $oid: '664c72ae5de9a270867c13db',
        },
        title: 'Nolotil',
        description: 'Comprimido',
        net_price: '2000',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T10:08:46.766Z',
        },
    },
    {
        _id: {
            $oid: '664c80115de9a270867c13e3',
        },
        title: 'Dentística',
        description: 'Exodontia Demolar',
        net_price: '20000',
        category: 'EST',
        discount: '2000',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T11:05:53.897Z',
        },
        updatedAt: {
            $date: '2024-05-27T14:05:38.493Z',
        },
    },
    {
        _id: {
            $oid: '664c80e85de9a270867c13e5',
        },
        title: 'Dentística',
        description: 'Aplicação de Fluor',
        net_price: '5000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T11:09:28.986Z',
        },
    },
    {
        _id: {
            $oid: '664c84295de9a270867c13eb',
        },
        title: 'Vitamina C',
        description: 'Comprimido',
        net_price: '500',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T11:23:21.866Z',
        },
    },
    {
        _id: {
            $oid: '664c863f5de9a270867c13ef',
        },
        title: 'Observação',
        description: 'Alfa',
        net_price: '10000',
        category: 'ENF',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T11:32:15.367Z',
        },
    },
    {
        _id: {
            $oid: '664c88f45de9a270867c13f4',
        },
        title: 'Raio X',
        description: 'Da Pelve',
        net_price: '14000',
        category: 'RX',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T11:43:48.683Z',
        },
    },
    {
        _id: {
            $oid: '664c89125de9a270867c13f5',
        },
        title: 'Raio X',
        description: 'Da Coxa',
        net_price: '17000',
        category: 'RX',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T11:44:18.840Z',
        },
    },
    {
        _id: {
            $oid: '664c8ad65de9a270867c13f9',
        },
        title: 'Ácido Fólico',
        description: 'comprimido',
        net_price: '500',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T11:51:50.022Z',
        },
    },
    {
        _id: {
            $oid: '664ca9195de9a270867c1400',
        },
        title: 'Vitamina C',
        description: 'Xarope',
        net_price: '1500',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T14:00:57.354Z',
        },
    },
    {
        _id: {
            $oid: '664ca9435de9a270867c1401',
        },
        title: 'Uniclave',
        description: null,
        net_price: '3500',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T14:01:39.962Z',
        },
    },
    {
        _id: {
            $oid: '664ca96c5de9a270867c1402',
        },
        title: 'Falifer',
        description: 'Xarope',
        net_price: '1500',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T14:02:20.169Z',
        },
    },
    {
        _id: {
            $oid: '664cb6145de9a270867c1404',
        },
        title: 'Vitamina B6',
        description: 'Comprimido',
        net_price: '500',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-21T14:56:20.054Z',
        },
    },
    {
        _id: {
            $oid: '664da3545de9a270867c1406',
        },
        title: 'Atendimento',
        description: 'Observação 1h',
        net_price: '8001',
        category: 'ENF',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-22T07:48:36.496Z',
        },
    },
    {
        _id: {
            $oid: '664da4715de9a270867c1407',
        },
        title: 'Plasmódio',
        description: 'Teste Imunológico da malária',
        net_price: '2499',
        category: 'LAB',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-22T07:53:21.606Z',
        },
        updatedAt: {
            $date: '2024-05-27T09:54:25.829Z',
        },
    },
    {
        _id: {
            $oid: '664dc4625de9a270867c1408',
        },
        title: 'Observação',
        description: '1h',
        net_price: '10000',
        category: 'ENF',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-22T10:09:38.612Z',
        },
        updatedAt: {
            $date: '2024-05-27T13:36:31.526Z',
        },
    },
    {
        _id: {
            $oid: '664efe6c791169f7e634c547',
        },
        title: 'Injeções de Intramuscular',
        description: 'Administração de Medicação',
        net_price: '1499.37',
        category: 'ENF',
        discount: 0,
        type: 'service',
        createdAt: {
            $date: '2024-05-23T08:29:32.056Z',
        },
    },
    {
        _id: {
            $oid: '66548c36bfe1ab80ef1ed269',
        },
        title: 'Diperona',
        description: 'Comprimido',
        net_price: '500',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-27T13:35:50.681Z',
        },
    },
    {
        _id: {
            $oid: '66549136bfe1ab80ef1ed270',
        },
        title: 'Ibuprofeno',
        description: 'Comprimido',
        net_price: '500',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-27T13:57:10.154Z',
        },
    },
    {
        _id: {
            $oid: '66549158bfe1ab80ef1ed271',
        },
        title: 'Dentística',
        description: 'Destartarização',
        net_price: '5000',
        category: 'EST',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-27T13:57:44.894Z',
        },
    },
    {
        _id: {
            $oid: '6654939ebfe1ab80ef1ed276',
        },
        title: 'Neurobion',
        description: 'Comprimido',
        net_price: '500',
        category: 'FAR',
        discount: '',
        type: 'service',
        createdAt: {
            $date: '2024-05-27T14:07:26.621Z',
        },
    },
    {
        _id: {
            $oid: '666c3b42dcf11cc6bbdc0e78',
        },
        title: 'CAPTOPRIL',
        description: 'COMPRIMIDO',
        net_price: '500',
        category: 'FAR',
        discount: 0,
        type: 'service',
        createdAt: {
            $date: '2024-06-14T12:44:50.005Z',
        },
    },
    {
        _id: {
            $oid: '666c3b84dcf11cc6bbdc0e79',
        },
        title: 'Cefalexina',
        description: 'COMPRIMIDO',
        net_price: '700',
        category: 'FAR',
        discount: 0,
        type: 'service',
        createdAt: {
            $date: '2024-06-14T12:45:56.585Z',
        },
    },
    {
        _id: {
            $oid: '66773b7a7b2fdd1ab4a8e6b9',
        },
        title: 'Consulta Urgência ',
        description: 'Não especialista',
        net_price: '16002.00',
        category: 'ENF',
        discount: 0,
        type: 'service',
        createdAt: {
            $date: '2024-06-22T21:00:42.511Z',
        },
        updatedAt: {
            $date: '2024-06-22T21:10:40.893Z',
        },
    },
    {
        _id: {
            $oid: '667fbff6a20b81fcd61e29b5',
        },
        title: '75040091',
        description: 'TESTE CONFIRMATIVO DA HC( HEPATITE C)',
        net_price: 5502,
        category: 'LAB',
        discount: 550.2,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T08:04:06.679Z',
        },
        updatedAt: {
            $date: '2024-07-17T14:46:16.209Z',
        },
    },
    {
        _id: {
            $oid: '667fccf2c8cb0812de18fd73',
        },
        title: '75020048',
        description: 'FACTOR REUMATOIDE, DOSEAMENTO COM DETERMINAÇÃO DO TIPO DE CADEIA PESDA( A,G E M)',
        net_price: 3998.4,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T08:59:30.774Z',
        },
    },
    {
        _id: {
            $oid: '667fd89f5006e2365e3ebb4a',
        },
        title: '74030007',
        description: 'Plasmódio(PESQUISA DE PASMÓDIUM) E IDENTIFICAÇÃO- TESTE IMUNOLOGICO DA MALÁRIA',
        net_price: 2499,
        category: 'LAB',
        discount: '',
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T09:49:19.389Z',
        },
        updatedAt: {
            $date: '2024-07-19T15:23:14.149Z',
        },
    },
    {
        _id: {
            $oid: '667fe0713e3ca50243c597dd',
        },
        title: '70100001',
        description: 'CÉLULAS FALCIFORMES(PROVA DA FORMAÇÃO)',
        net_price: 2998.74,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T10:22:41.540Z',
        },
        updatedAt: {
            $date: '2024-07-17T14:22:55.163Z',
        },
    },
    {
        _id: {
            $oid: '667fe09f3e3ca50243c597de',
        },
        title: '91000003',
        description: 'SALA DE OBSERVAÇÃO-3HORAS',
        net_price: 19000.42,
        category: 'ENF',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T10:23:27.499Z',
        },
        updatedAt: {
            $date: '2024-07-17T14:21:47.732Z',
        },
    },
    {
        _id: {
            $oid: '667fe1093e3ca50243c597df',
        },
        title: '70130002',
        description: 'VELOCIDADE DE SEDIMENTAÇÃO ERITROCITÁRIA=VS',
        net_price: 2700.6,
        category: 'LAB',
        discount: '',
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T10:25:13.791Z',
        },
        updatedAt: {
            $date: '2024-07-19T15:22:45.122Z',
        },
    },
    {
        _id: {
            $oid: '667fe4141b1aff7072b0e29a',
        },
        title: '72020032',
        description: 'CREATININA',
        net_price: 3498.6,
        category: 'LAB',
        discount: 349.86,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T10:38:12.681Z',
        },
        updatedAt: {
            $date: '2024-07-17T14:47:04.479Z',
        },
    },
    {
        _id: {
            $oid: '667fe43b1b1aff7072b0e29b',
        },
        title: '72020054',
        description: 'UREIA',
        net_price: 3901.8,
        category: 'LAB',
        discount: 390.18,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T10:38:51.768Z',
        },
        updatedAt: {
            $date: '2024-06-29T10:41:30.066Z',
        },
    },
    {
        _id: {
            $oid: '667fff4bfbaafd7a41577195',
        },
        title: 'Parasitologia',
        description: 'Reação Widal ou Vidal',
        net_price: 2500,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T12:34:19.708Z',
        },
    },
    {
        _id: {
            $oid: '667fff62fbaafd7a41577196',
        },
        title: 'Parasitologia',
        description: 'Gota Espessa',
        net_price: 1000,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T12:34:42.978Z',
        },
    },
    {
        _id: {
            $oid: '667fff76fbaafd7a41577197',
        },
        title: 'Parasitologia',
        description: 'Urina',
        net_price: 3000,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T12:35:02.217Z',
        },
        updatedAt: {
            $date: '2024-06-29T13:12:55.462Z',
        },
    },
    {
        _id: {
            $oid: '6680000dfbaafd7a41577198',
        },
        title: 'Anaflan',
        description: 'Comprimido',
        net_price: 500,
        category: 'FAR',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T12:37:33.049Z',
        },
    },
    {
        _id: {
            $oid: '66800308fbaafd7a4157719b',
        },
        title: 'Buscopam',
        description: 'Comprimido',
        net_price: 300,
        category: 'FAR',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T12:50:16.527Z',
        },
    },
    {
        _id: {
            $oid: '668006fafbaafd7a4157719e',
        },
        title: 'Bioquímicos ',
        description: 'Velocidade de Sedimentação',
        net_price: 3500,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-29T13:07:06.807Z',
        },
    },
    {
        _id: {
            $oid: '66813a5d929d330acbc50a7e',
        },
        title: 'Hemograma',
        description: 'Hemograma',
        net_price: 5000,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-06-30T10:58:37.765Z',
        },
        updatedAt: {
            $date: '2024-06-30T11:00:01.714Z',
        },
    },
    {
        _id: {
            $oid: '66978a585904a7d2fa61a684',
        },
        title: 'Mexagripe',
        description: 'Comprimido',
        net_price: 500,
        category: 'FAR',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T09:09:44.508Z',
        },
    },
    {
        _id: {
            $oid: '6697a98e6d34bd151cb9ab35',
        },
        title: '99000040',
        description: 'INJECÇÕES INTRAMUSCULAR( ADMINISTRAÇÃO DE MEDICAÇÃO IM), SD ( ADMINISTRAÇÃO DE MEDICAÇÃO SUBCUTÂNEA)',
        net_price: 1499.37,
        category: 'ENF',
        discount: '',
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T11:22:54.219Z',
        },
        updatedAt: {
            $date: '2024-07-19T15:05:28.707Z',
        },
    },
    {
        _id: {
            $oid: '6697af9f6d34bd151cb9ab45',
        },
        title: '7010044',
        description: 'PCR PARA PESQUISA E IDENTIFICAÇÃO DE BACTERIA',
        net_price: 4199.92,
        category: 'LAB',
        discount: 420,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T11:48:47.584Z',
        },
        updatedAt: {
            $date: '2024-07-17T15:42:07.285Z',
        },
    },
    {
        _id: {
            $oid: '6697b15f6d34bd151cb9ab49',
        },
        title: '60010001',
        description: 'RAIO X (RX) TORAX, PULMOES E CORAÇÃO 1 INCIDENCIA',
        net_price: 20999.58,
        category: 'RX',
        discount: 2100,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T11:56:15.545Z',
        },
        updatedAt: {
            $date: '2024-07-17T15:22:38.045Z',
        },
    },
    {
        _id: {
            $oid: '6697bfc3817a623f6d37c27c',
        },
        title: '72090005',
        description: 'BILIRRUBINA TOTAL+DIRECTA E INDIRECTA',
        net_price: 9002.94,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T12:57:39.474Z',
        },
    },
    {
        _id: {
            $oid: '6697c0bc817a623f6d37c27e',
        },
        title: '72100010',
        description: 'TESTE DE GRAVIDEZ SANGUE',
        net_price: 2901.5,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T13:01:48.827Z',
        },
    },
    {
        _id: {
            $oid: '6697c2df817a623f6d37c283',
        },
        title: '720200035',
        description: 'ACIDO URICO(URICÉMIA)',
        net_price: 3498.38,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T13:10:55.888Z',
        },
        updatedAt: {
            $date: '2024-07-17T13:11:45.276Z',
        },
    },
    {
        _id: {
            $oid: '6697c346817a623f6d37c284',
        },
        title: '91000001',
        description: 'SALA DE OBSERVAÇÃO-1HORAS',
        net_price: 8001,
        category: 'ENF',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T13:12:38.536Z',
        },
        updatedAt: {
            $date: '2024-07-19T15:19:15.667Z',
        },
    },
    {
        _id: {
            $oid: '6697c3d6817a623f6d37c285',
        },
        title: '72020054',
        description: 'UREIA',
        net_price: 3896.3,
        category: 'LAB',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T13:15:02.002Z',
        },
    },
    {
        _id: {
            $oid: '6697c74f817a623f6d37c287',
        },
        title: '60000024',
        description: 'RAIO X (RX) PESCOÇO',
        net_price: 8000.84,
        category: 'RX',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T13:29:51.494Z',
        },
    },
    {
        _id: {
            $oid: '6697c7af817a623f6d37c288',
        },
        title: '91000007',
        description: 'SALA DE OBSERVAÇÃO-SUPERIOR A 6HORAS',
        net_price: 16003.32,
        category: 'ENF',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T13:31:27.157Z',
        },
        updatedAt: {
            $date: '2024-07-19T15:15:14.646Z',
        },
    },
    {
        _id: {
            $oid: '6697ccfd817a623f6d37c294',
        },
        title: '60030040',
        description: 'RAIO X (RX) PÉ',
        net_price: 10000,
        category: 'RX',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T13:54:05.030Z',
        },
    },
    {
        _id: {
            $oid: '6697ce08817a623f6d37c297',
        },
        title: '60030016',
        description: 'RAIO X(RX) COLUNA',
        net_price: 14502.49,
        category: 'RX',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T13:58:32.928Z',
        },
    },
    {
        _id: {
            $oid: '6697d62d817a623f6d37c29f',
        },
        title: '75040087',
        description: 'VDRL',
        net_price: 3498.53,
        category: 'LAB',
        discount: 349.86,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T14:33:17.950Z',
        },
        updatedAt: {
            $date: '2024-07-17T15:31:11.435Z',
        },
    },
    {
        _id: {
            $oid: '6697d897817a623f6d37c2a1',
        },
        title: '01000003',
        description: 'CONSULTA PROGRAMADA',
        net_price: 14498.4,
        category: 'ENF',
        discount: 0,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T14:43:35.379Z',
        },
    },
    {
        _id: {
            $oid: '6697dbc9817a623f6d37c2a4',
        },
        title: '76010008',
        description: 'EXSUDADO VAGINAIS E URETERAIS',
        net_price: 6001.8,
        category: 'LAB',
        discount: 600.18,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T14:57:13.079Z',
        },
    },
    {
        _id: {
            $oid: '6697e87f817a623f6d37c2af',
        },
        title: '60030031',
        description: 'RAIO X (X) JOELHO',
        net_price: 12006.63,
        category: 'RX',
        discount: 600.06,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-17T15:51:27.537Z',
        },
    },
    {
        _id: {
            $oid: '669a578f94420d6f6f0abd1a',
        },
        title: '97160148',
        description: 'FEZES- EX PARASITOLÓGICO',
        net_price: 2503.58,
        category: 'LAB',
        discount: 250.358,
        type: 'service',
        hasIva: false,
        ivaTax: 0,
        createdAt: {
            $date: '2024-07-19T12:09:51.379Z',
        },
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.service.createMany({
            data: services.map((item) => {
                var _a;
                return ({
                    category: typeof item.category == 'object'
                        ? item.category.value
                        : item.category,
                    id: item._id.$oid,
                    name: item.title,
                    description: item.description,
                    createdAt: item.createdAt.$date,
                    updatedAt: (_a = item.updatedAt) === null || _a === void 0 ? void 0 : _a.$date,
                    discount: Number(item.discount),
                    deletedAt: null,
                    exemptionCode: '',
                    account_code: '',
                    unit_price: Number(item.net_price),
                    sale_price: Number(item.net_price),
                    tax: 0,
                    hasIva: false,
                });
            }),
        });
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit();
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
