// import { Avocado } from "./base/avocado.model"
import type { Project, Team, TeamAndUser, VaultTeam, Table } from '@prisma/client'
import type { context } from './types'

type TeamData = {
    TeamAndUser: TeamAndUser[],
    vaulTeam: VaultTeam[]
} & Team

export const querys = {
    async getTeams(root: unknown, args: {skip?: number, take?:number}, context: context): Promise<TeamData[]> {
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

        return teams
    },
    async getTeam(root: unknown, args: { id: string }, context: context): Promise<TeamData | null> {
        return  await context.orm.team.findUnique({
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
    async getProjects(root: unknown, args: { id: string }, context: context): Promise<Project[] | null> {
        return  await context.orm.project.findMany({
            where: {
                teamId: args.id,
            }
        });
    },
    async getProject(root: unknown, args: { id: string }, context: context): Promise<Project | null> {
        return  await context.orm.project.findUnique({
            where: {
                id: args.id,
            }
        });
    },
    async getTables(root: unknown, args: { id: string }, context: context): Promise<Table[] | null> {
        return await context.orm.table.findMany({
            where: {
                projectId: args.id,
            }
        });
    },
    async getTable(root: unknown, args: { id: string }, context: context): Promise<Table | null> {
        return  await context.orm.table.findUnique({
            where: {
                id: args.id,
            }
        });
    }
}
