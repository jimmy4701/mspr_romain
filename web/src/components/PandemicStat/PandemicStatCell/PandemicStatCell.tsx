import type {
  FindPandemicStatById,
  FindPandemicStatByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import PandemicStat from 'src/components/PandemicStat/PandemicStat'

export const QUERY: TypedDocumentNode<
  FindPandemicStatById,
  FindPandemicStatByIdVariables
> = gql`
  query FindPandemicStatById($id: Int!) {
    pandemicStat: pandemicStat(id: $id) {
      id
      cumulative_cases
      daily_new_cases
      active_cases
      cumulative_deaths
      daily_new_deaths
      date
      location_id
      source_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PandemicStat not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPandemicStatByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  pandemicStat,
}: CellSuccessProps<FindPandemicStatById, FindPandemicStatByIdVariables>) => {
  return <PandemicStat pandemicStat={pandemicStat} />
}
