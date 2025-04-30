import EditDiseaseCell from 'src/components/Disease/EditDiseaseCell'

type DiseasePageProps = {
  id: number
}

const EditDiseasePage = ({ id }: DiseasePageProps) => {
  return <EditDiseaseCell id={id} />
}

export default EditDiseasePage
