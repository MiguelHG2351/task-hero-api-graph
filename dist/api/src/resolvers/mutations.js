"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const client_1 = require("@prisma/client");
exports.mutations = {
    async createProject(parent, { data }, context) {
        return await context.orm.project.create({
            data: {
                name: data.name,
                description: data.description,
                teamId: data.teamId,
            },
        });
    },
    async createTeam(parent, { data }, context) {
        console.log(data.userId);
        const team = await context.orm.team.create({
            data: {
                full_name: data.full_name,
                vaultId: data.vaultId,
            },
        });
        await context.orm.teamAndUser.create({
            data: {
                userId: data.userId,
                teamId: team.id,
                role: client_1.Role.ADMIN,
            }
        });
        await context.orm.vaultTeam.create({
            data: {
                teamId: team.id,
                secrets: {
                    create: [{
                            teamId: team.id,
                            name: 'default',
                            value: 'default',
                        }]
                }
            }
        });
        return team;
    },
    async createTable(parent, { data }, context) {
        const table = await context.orm.table.create({
            data: {
                projectId: data.projectId,
                name: data.name,
                category: data.category,
            }
        });
        return table;
    }
};
//# sourceMappingURL=mutations.js.map