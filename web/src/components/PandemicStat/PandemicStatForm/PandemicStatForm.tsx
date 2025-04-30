import type {
  EditPandemicStatById,
  UpdatePandemicStatInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormPandemicStat = NonNullable<EditPandemicStatById['pandemicStat']>

interface PandemicStatFormProps {
  pandemicStat?: EditPandemicStatById['pandemicStat']
  onSave: (data: UpdatePandemicStatInput, id?: FormPandemicStat['id']) => void
  error: RWGqlError
  loading: boolean
}

const PandemicStatForm = (props: PandemicStatFormProps) => {
  const onSubmit = (data: FormPandemicStat) => {
    props.onSave(data, props?.pandemicStat?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPandemicStat> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="cumulative_cases"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cumulative cases
        </Label>

        <NumberField
          name="cumulative_cases"
          defaultValue={props.pandemicStat?.cumulative_cases}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="cumulative_cases" className="rw-field-error" />

        <Label
          name="daily_new_cases"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Daily new cases
        </Label>

        <NumberField
          name="daily_new_cases"
          defaultValue={props.pandemicStat?.daily_new_cases}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="daily_new_cases" className="rw-field-error" />

        <Label
          name="active_cases"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active cases
        </Label>

        <NumberField
          name="active_cases"
          defaultValue={props.pandemicStat?.active_cases}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="active_cases" className="rw-field-error" />

        <Label
          name="cumulative_deaths"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cumulative deaths
        </Label>

        <NumberField
          name="cumulative_deaths"
          defaultValue={props.pandemicStat?.cumulative_deaths}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="cumulative_deaths" className="rw-field-error" />

        <Label
          name="daily_new_deaths"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Daily new deaths
        </Label>

        <NumberField
          name="daily_new_deaths"
          defaultValue={props.pandemicStat?.daily_new_deaths}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="daily_new_deaths" className="rw-field-error" />

        <Label
          name="location_id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location id
        </Label>

        <NumberField
          name="location_id"
          defaultValue={props.pandemicStat?.location_id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="location_id" className="rw-field-error" />

        <Label
          name="source_id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Source id
        </Label>

        <NumberField
          name="source_id"
          defaultValue={props.pandemicStat?.source_id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="source_id" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PandemicStatForm
