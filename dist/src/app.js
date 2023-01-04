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
exports.init = void 0;
require("./setup");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const infosRouter_1 = __importDefault(require("./routers/infosRouter"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    app.use((0, cors_1.default)());
    next();
});
app.use(express_1.default.json());
app.use('/user', userRouter_1.default);
app.use('/infos', infosRouter_1.default);
app.get('/health', (request, res) => res.send('Ok!'));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
    });
}
exports.init = init;
exports.default = app;
