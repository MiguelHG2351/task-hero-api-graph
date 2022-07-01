"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const scalars = tslib_1.__importStar(require("./scalars"));
const querys_1 = require("./querys");
const mutations_1 = require("./mutations");
// import { resolver } from './avocado.model'
exports.default = {
    ...scalars,
    Query: {
        getTeams: querys_1.querys.getTeams,
        getTeam: querys_1.querys.getTeam,
        getProjects: querys_1.querys.getProjects,
        getProject: querys_1.querys.getProject,
        getTables: querys_1.querys.getTables,
        getTable: querys_1.querys.getTable,
    },
    Mutation: {
        createProject: mutations_1.mutations.createProject,
        createTeam: mutations_1.mutations.createTeam,
        createTable: mutations_1.mutations.createTable,
    },
    // Project: resolver
};
//# sourceMappingURL=index.js.map