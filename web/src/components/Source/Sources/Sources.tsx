import type {
  DeleteSourceMutation,
  DeleteSourceMutationVariables,
  FindSources,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Source/SourcesCell'
import { truncate } from 'src/lib/formatters'

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

const SourcesList = ({ sources }: FindSources) => {
  const [deleteSource] = useMutation(DELETE_SOURCE_MUTATION, {
    onCompleted: () => {
      toast.success('Source deleted')
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

  const onDeleteClick = (id: DeleteSourceMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete source ' + id + '?')) {
      deleteSource({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Url</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.id}>
              <td>{truncate(source.id)}</td>
              <td>{truncate(source.name)}</td>
              <td>{truncate(source.description)}</td>
              <td>{truncate(source.url)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.source({ id: source.id })}
                    title={'Show source ' + source.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSource({ id: source.id })}
                    title={'Edit source ' + source.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete source ' + source.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(source.id)}
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

export default SourcesList
