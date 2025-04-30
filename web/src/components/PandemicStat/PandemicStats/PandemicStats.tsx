import type {
  DeletePandemicStatMutation,
  DeletePandemicStatMutationVariables,
  FindPandemicStats,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/PandemicStat/PandemicStatsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_PANDEMIC_STAT_MUTATION: TypedDocumentNode<
  DeletePandemicStatMutation,
  DeletePandemicStatMutationVariables
> = gql`
  mutation DeletePandemicStatMutation($id: Int!) {
    deletePandemicStat(id: $id) {
      id
    }
  }
`

const PandemicStatsList = ({ pandemicStats }: FindPandemicStats) => {
  const [deletePandemicStat] = useMutation(DELETE_PANDEMIC_STAT_MUTATION, {
    onCompleted: () => {
      toast.success('PandemicStat deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePandemicStatMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pandemicStat ' + id + '?')) {
      deletePandemicStat({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Cumulative cases</th>
            <th>Daily new cases</th>
            <th>Active cases</th>
            <th>Cumulative deaths</th>
            <th>Daily new deaths</th>
            <th>Date</th>
            <th>Location id</th>
            <th>Source id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {pandemicStats.map((pandemicStat) => (
            <tr key={pandemicStat.id}>
              <td>{truncate(pandemicStat.id)}</td>
              <td>{truncate(pandemicStat.cumulative_cases)}</td>
              <td>{truncate(pandemicStat.daily_new_cases)}</td>
              <td>{truncate(pandemicStat.active_cases)}</td>
              <td>{truncate(pandemicStat.cumulative_deaths)}</td>
              <td>{truncate(pandemicStat.daily_new_deaths)}</td>
              <td>{timeTag(pandemicStat.date)}</td>
              <td>{truncate(pandemicStat.location_id)}</td>
              <td>{truncate(pandemicStat.source_id)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.pandemicStat({ id: pandemicStat.id })}
                    title={'Show pandemicStat ' + pandemicStat.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPandemicStat({ id: pandemicStat.id })}
                    title={'Edit pandemicStat ' + pandemicStat.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete pandemicStat ' + pandemicStat.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(pandemicStat.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PandemicStatsList
