"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prompt_1 = tslib_1.__importDefault(require("prompt"));
const orm = new client_1.PrismaClient();
// miguelhernandez
// aprendeConPlatzi
prompt_1.default.start();
prompt_1.default.get([
    {
        name: 'name',
        pattern: /^[a-zA-Z\s\-]+$/,
        message: 'Name must be only letters, spaces, or dashes',
        required: true,
    },
    {
        name: 'password',
        // @ts-ignore outdated types
        hidden: true,
        replace: '*',
        required: true,
    },
], async function (err, result) {
    if (err) {
        console.warn('Huh. Something went wrong.');
        return;
    }
    const name = result.name;
    const hashedPassword = await (0, bcrypt_1.hash)(result.password, 10);
    const user = await orm.adminAPI.create({
        data: {
            name: name,
            password: hashedPassword,
        }
    });
    console.log(`User ${user.name} created with id ${user.id}\n`);
});
//# sourceMappingURL=createAdmin.js.map