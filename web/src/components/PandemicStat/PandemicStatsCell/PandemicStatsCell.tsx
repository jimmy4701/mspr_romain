import type {
  FindPandemicStats,
  FindPandemicStatsVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import PandemicStats from 'src/components/PandemicStat/PandemicStats'

export const QUERY: TypedDocumentNode<
  FindPandemicStats,
  FindPandemicStatsVariables
> = gql`
  query FindPandemicStats {
    pandemicStats {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No pandemicStats yet.{' '}
      <Link to={routes.newPandemicStat()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindPandemicStats>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  pandemicStats,
}: CellSuccessProps<FindPandemicStats, FindPandemicStatsVariables>) => {
  return <PandemicStats pandemicStats={pandemicStats} />
}
