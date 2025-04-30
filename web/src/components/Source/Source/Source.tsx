import type {
  DeleteSourceMutation,
  DeleteSourceMutationVariables,
  FindSourceById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_SOURCE_MUTATION: TypedDocumentNode<
  DeleteSourceMutation,
  DeleteSourceMutationVariables
> = gql`
  mutation DeleteSourceMutation($id: Int!) {
    deleteSource(id: $id) {
      id
    }
  }
`

interface Props {
  source: NonNullable<FindSourceById['source']>
}

const Source = ({ source }: Props) => {
  const [deleteSource] = useMutation(DELETE_SOURCE_MUTATION, {
    onCompleted: () => {
      toast.success('Source deleted')
      navigate(routes.sources())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteSourceMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete source ' + id + '?')) {
      deleteSource({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Source {source.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{source.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{source.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{source.description}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{source.url}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSource({ id: source.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(source.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Source
