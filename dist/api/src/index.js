"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = tslib_1.__importDefault(require("http"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const resolvers_1 = tslib_1.__importDefault(require("./resolvers"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const typeDefs = (0, fs_1.readFileSync)(path_1.default.join(__dirname, 'models', 'schema.graphql'), {
    encoding: 'utf-8'
});
const port = process.env.PORT ?? 4000;
async function app() {
    const { app } = await Promise.resolve().then(() => tslib_1.__importStar(require('./server')));
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers: resolvers_1.default,
        context: ({ req }) => {
            console.log('req user: ', req.user);
            return {
                orm: prisma,
                user: req.user
            };
        },
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })
        ]
    });
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql'
    });
    await new Promise(resolve => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}
exports.default = app;
//# sourceMappingURL=index.js.map