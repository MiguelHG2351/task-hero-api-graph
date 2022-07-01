"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
const graphql_1 = require("graphql");
exports.DateTime = new graphql_1.GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime custom scalar type',
    parseValue(value) {
        return new Date(value); // value from the client, Convert outgoing Date to ISOString for JSON
    },
    serialize(value) {
        return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return new Date(ast.value); // ast value is always in string format
        }
        return null;
    },
});
//# sourceMappingURL=scalars.js.map