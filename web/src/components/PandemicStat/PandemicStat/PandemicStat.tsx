import type {
  DeletePandemicStatMutation,
  DeletePandemicStatMutationVariables,
  FindPandemicStatById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

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

interface Props {
  pandemicStat: NonNullable<FindPandemicStatById['pandemicStat']>
}

const PandemicStat = ({ pandemicStat }: Props) => {
  const [deletePandemicStat] = useMutation(DELETE_PANDEMIC_STAT_MUTATION, {
    onCompleted: () => {
      toast.success('PandemicStat deleted')
      navigate(routes.pandemicStats())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePandemicStatMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pandemicStat ' + id + '?')) {
      deletePandemicStat({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PandemicStat {pandemicStat.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{pandemicStat.id}</td>
            </tr>
            <tr>
              <th>Cumulative cases</th>
              <td>{pandemicStat.cumulative_cases}</td>
            </tr>
            <tr>
              <th>Daily new cases</th>
              <td>{pandemicStat.daily_new_cases}</td>
            </tr>
            <tr>
              <th>Active cases</th>
              <td>{pandemicStat.active_cases}</td>
            </tr>
            <tr>
              <th>Cumulative deaths</th>
              <td>{pandemicStat.cumulative_deaths}</td>
            </tr>
            <tr>
              <th>Daily new deaths</th>
              <td>{pandemicStat.daily_new_deaths}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(pandemicStat.date)}</td>
            </tr>
            <tr>
              <th>Location id</th>
              <td>{pandemicStat.location_id}</td>
            </tr>
            <tr>
              <th>Source id</th>
              <td>{pandemicStat.source_id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPandemicStat({ id: pandemicStat.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(pandemicStat.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PandemicStat
