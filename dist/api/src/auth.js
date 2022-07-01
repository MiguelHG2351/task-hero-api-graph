"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const util_1 = require("util");
const jose_1 = require("jose");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secret';
const orm = new client_1.PrismaClient();
const login = async (req, res) => {
    const userBody = req.body;
    try {
        const user = await orm.adminAPI.findFirst({
            where: {
                name: userBody.name
            }
        });
        console.log(user);
        console.log(userBody);
        console.log(userBody.password);
        if (!user) {
            throw new Error();
        }
        const isValid = await (0, bcrypt_1.compare)(userBody.password, user.password);
        if (!isValid) {
            throw new Error();
        }
        const token = await new jose_1.SignJWT({ id: user.id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('10d')
            .sign(new util_1.TextEncoder().encode(JWT_SECRET_KEY));
        res.json({
            token,
            name: user.name,
            id: user.id,
        });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
};
exports.login = login;
const verifyToken = async (req) => {
    const { authorization } = req.headers;
    const token = (authorization || '').replace('Bearer ', '');
    try {
        const verified = await (0, jose_1.jwtVerify)(token, new util_1.TextEncoder().encode(JWT_SECRET_KEY));
        return verified.payload;
    }
    catch (e) {
        throw new Error('Invalid token');
    }
};
const authMiddleware = async (req, res, next) => {
    try {
        const payload = await verifyToken(req);
        req.user = { id: payload.id };
    }
    catch (e) {
        // ignore
    }
    finally {
        next();
    }
};
exports.default = authMiddleware;
const currentUser = async (req, res) => {
    try {
        const userDetails = await orm.adminAPI.findUnique({
            where: { id: req.user?.id },
        });
        if (!userDetails) {
            throw new Error();
        }
        res.json({
            id: userDetails.id,
            username: userDetails.name,
        });
    }
    catch (e) {
        res.sendStatus(401);
    }
};
exports.currentUser = currentUser;
//# sourceMappingURL=auth.js.map