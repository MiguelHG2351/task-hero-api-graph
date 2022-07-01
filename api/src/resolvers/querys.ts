// import { Avocado } from "./base/avocado.model"
import type { Project } from '@prisma/client'
import type { context } from './types'

export const querys = {
    async find(root: unknown, args: {skip?: number, take?:number}, context: context): Promise<Project[]> {
        return await context.orm.project.findMany({
            include: {
                tables: true,
                team: true,
            },
            skip: args.skip,
            take: args.take,
        });
    },
    async findOne(root: unknown, args: { id: string }, context: context): Promise<Project | null> {
        return  await context.orm.project.findUnique({
            where: {
                id: args.id,
            },
            include: {
                tables: true,
                team: true,
            }
        });   
    }
}
