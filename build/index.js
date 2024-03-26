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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const mongo_1 = require("./database/mongo");
const routers_1 = __importDefault(require("./routers"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, dotenv_1.config)();
    const port = process.env.PORT || 8020;
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: '*',
        },
    });
    app.set('io', io);
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    yield mongo_1.MongoClient.connect();
    app.use('/api', routers_1.default);
    io.on('connection', (socket) => {
        console.log('Conectado');
    });
    app.use((req, res) => {
        res.send();
    });
    server.listen(port, () => console.log(`App running on port ${port}`));
});
main();
