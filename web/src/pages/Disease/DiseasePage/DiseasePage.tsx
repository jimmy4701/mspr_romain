import DiseaseCell from 'src/components/Disease/DiseaseCell'

type DiseasePageProps = {
  id: number
}

const DiseasePage = ({ id }: DiseasePageProps) => {
  return <DiseaseCell id={id} />
}

export default DiseasePage
