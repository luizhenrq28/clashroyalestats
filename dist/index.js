"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: 'qidjxiajdawdjawidwaakxnakxk',
    resave: false,
    saveUninitialized: true
}));
app.use(index_1.default);
app.listen(3500, () => console.log('rodando!'));
