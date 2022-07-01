import type { Project } from '@prisma/client'
import type { context } from './types'

export const mutations = {
    async createProject(
        parent: unknown,
        {
          data
        }: { data: Project},
        context: context,
      ): Promise<Project> {
          console.log(data.description)
        return await context.orm.project.create({
            data: {
                name: data.name,
                description: data.description,
                teamId: data.teamId,
            }
        })
      }
}