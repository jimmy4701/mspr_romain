import type {
  DeleteDiseaseMutation,
  DeleteDiseaseMutationVariables,
  FindDiseaseById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

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

interface Props {
  disease: NonNullable<FindDiseaseById['disease']>
}

const Disease = ({ disease }: Props) => {
  const [deleteDisease] = useMutation(DELETE_DISEASE_MUTATION, {
    onCompleted: () => {
      toast.success('Disease deleted')
      navigate(routes.diseases())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteDiseaseMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete disease ' + id + '?')) {
      deleteDisease({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Disease {disease.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{disease.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{disease.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDisease({ id: disease.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(disease.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Disease
