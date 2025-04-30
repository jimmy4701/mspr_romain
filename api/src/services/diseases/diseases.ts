import type {
  QueryResolvers,
  MutationResolvers,
  DiseaseRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const diseases: QueryResolvers['diseases'] = () => {
  return db.disease.findMany()
}

export const disease: QueryResolvers['disease'] = ({ id }) => {
  return db.disease.findUnique({
    where: { id },
  })
}

export const createDisease: MutationResolvers['createDisease'] = ({
  input,
}) => {
  return db.disease.create({
    data: input,
  })
}

export const updateDisease: MutationResolvers['updateDisease'] = ({
  id,
  input,
}) => {
  return db.disease.update({
    data: input,
    where: { id },
  })
}

export const deleteDisease: MutationResolvers['deleteDisease'] = ({ id }) => {
  return db.disease.delete({
    where: { id },
  })
}

export const Disease: DiseaseRelationResolvers = {
  pandemic_stats: (_obj, { root }) => {
    return db.disease.findUnique({ where: { id: root?.id } }).pandemic_stats()
  },
}
