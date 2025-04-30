import type {
  QueryResolvers,
  MutationResolvers,
  PandemicStatRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const pandemicStats: QueryResolvers['pandemicStats'] = () => {
  return db.pandemicStat.findMany()
}

export const pandemicStat: QueryResolvers['pandemicStat'] = ({ id }) => {
  return db.pandemicStat.findUnique({
    where: { id },
  })
}

export const createPandemicStat: MutationResolvers['createPandemicStat'] = ({
  input,
}) => {
  return db.pandemicStat.create({
    data: input,
  })
}

export const updatePandemicStat: MutationResolvers['updatePandemicStat'] = ({
  id,
  input,
}) => {
  return db.pandemicStat.update({
    data: input,
    where: { id },
  })
}

export const deletePandemicStat: MutationResolvers['deletePandemicStat'] = ({
  id,
}) => {
  return db.pandemicStat.delete({
    where: { id },
  })
}

export const PandemicStat: PandemicStatRelationResolvers = {
  location: (_obj, { root }) => {
    return db.pandemicStat.findUnique({ where: { id: root?.id } }).location()
  },
  diseases: (_obj, { root }) => {
    return db.pandemicStat.findUnique({ where: { id: root?.id } }).diseases()
  },
  source: (_obj, { root }) => {
    return db.pandemicStat.findUnique({ where: { id: root?.id } }).source()
  },
}
