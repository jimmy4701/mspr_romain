import type {
  QueryResolvers,
  MutationResolvers,
  SourceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const sources: QueryResolvers['sources'] = () => {
  return db.source.findMany()
}

export const source: QueryResolvers['source'] = ({ id }) => {
  return db.source.findUnique({
    where: { id },
  })
}

export const createSource: MutationResolvers['createSource'] = ({ input }) => {
  return db.source.create({
    data: input,
  })
}

export const updateSource: MutationResolvers['updateSource'] = ({
  id,
  input,
}) => {
  return db.source.update({
    data: input,
    where: { id },
  })
}

export const deleteSource: MutationResolvers['deleteSource'] = ({ id }) => {
  return db.source.delete({
    where: { id },
  })
}

export const Source: SourceRelationResolvers = {
  pandemic_stats: (_obj, { root }) => {
    return db.source.findUnique({ where: { id: root?.id } }).pandemic_stats()
  },
}
