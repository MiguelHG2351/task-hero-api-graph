import * as scalars from './scalars'
import { querys } from './querys'
import { mutations } from './mutations'
// import { resolver } from './avocado.model'
import { Project } from '@prisma/client'

export default {
  ...scalars,
  Query: {
    getProjects: querys.find,
    getProject: querys.findOne,
  },
  // Mutation: {
  //   createAvo: mutations.createAvo,
  // },
  // Project: resolver
}
