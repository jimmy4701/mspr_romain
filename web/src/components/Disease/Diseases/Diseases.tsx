import type {
  DeleteDiseaseMutation,
  DeleteDiseaseMutationVariables,
  FindDiseases,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Disease/DiseasesCell'
import { truncate } from 'src/lib/formatters'

const DELETE_DISEASE_MUTATION: TypedDocumentNode<
  DeleteDiseaseMutation,
  DeleteDiseaseMutationVariables
> = gql`
  mutation DeleteDiseaseMutation($id: Int!) {
    deleteDisease(id: $id) {
      id
    }
  }
`

const DiseasesList = ({ diseases }: FindDiseases) => {
  const [deleteDisease] = useMutation(DELETE_DISEASE_MUTATION, {
    onCompleted: () => {
      toast.success('Disease deleted')
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

  const onDeleteClick = (id: DeleteDiseaseMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete disease ' + id + '?')) {
      deleteDisease({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {diseases.map((disease) => (
            <tr key={disease.id}>
              <td>{truncate(disease.id)}</td>
              <td>{truncate(disease.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.disease({ id: disease.id })}
                    title={'Show disease ' + disease.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDisease({ id: disease.id })}
                    title={'Edit disease ' + disease.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete disease ' + disease.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(disease.id)}
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

export default DiseasesList
