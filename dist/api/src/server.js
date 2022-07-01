"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const cors_1 = tslib_1.__importDefault(require("cors"));
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path_1.default.join(__dirname, '../.env') });
}
const auth_1 = tslib_1.__importStar(require("./auth"));
exports.app = (0, express_1.default)();
// Middlewares
exports.app.use((0, cors_1.default)());
exports.app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../public')));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(auth_1.default);
// Auth Routes
exports.app.post('/api/login', auth_1.login);
exports.app.get('/api/user/current', auth_1.currentUser);
exports.default = exports.app;
//# sourceMappingURL=server.js.map