"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querys = void 0;
exports.querys = {
    async getTeams(root, args, context) {
        const teams = await context.orm.team.findMany({
            include: {
                TeamAndUser: {
                    include: {
                        user: true
                    }
                },
                vaulTeam: {
                    include: {
                        secrets: true
                    }
                }
            }
        });
        return teams;
    },
    async getTeam(root, args, context) {
        return await context.orm.team.findUnique({
            where: {
                id: args.id,
            },
            include: {
                TeamAndUser: {
                    include: {
                        user: true
                    }
                },
                vaulTeam: {
                    include: {
                        secrets: true
                    }
                }
            }
        });
    },
    async getProjects(root, args, context) {
        return await context.orm.project.findMany({
            where: {
                teamId: args.id,
            }
        });
    },
    async getProject(root, args, context) {
        return await context.orm.project.findUnique({
            where: {
                id: args.id,
            }
        });
    },
    async getTables(root, args, context) {
        return await context.orm.table.findMany({
            where: {
                projectId: args.id,
            }
        });
    },
    async getTable(root, args, context) {
        return await context.orm.table.findUnique({
            where: {
                id: args.id,
            }
        });
    }
};
//# sourceMappingURL=querys.js.map