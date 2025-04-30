import type { EditLocationById, UpdateLocationInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormLocation = NonNullable<EditLocationById['location']>

interface LocationFormProps {
  location?: EditLocationById['location']
  onSave: (data: UpdateLocationInput, id?: FormLocation['id']) => void
  error: RWGqlError
  loading: boolean
}

const LocationForm = (props: LocationFormProps) => {
  const onSubmit = (data: FormLocation) => {
    props.onSave(data, props?.location?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormLocation> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="country_name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Country name
        </Label>

        <TextField
          name="country_name"
          defaultValue={props.location?.country_name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="country_name" className="rw-field-error" />

        <Label
          name="province_state"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Province state
        </Label>

        <TextField
          name="province_state"
          defaultValue={props.location?.province_state}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="province_state" className="rw-field-error" />

        <Label
          name="iso_code"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Iso code
        </Label>

        <TextField
          name="iso_code"
          defaultValue={props.location?.iso_code}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="iso_code" className="rw-field-error" />

        <Label
          name="latitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Latitude
        </Label>

        <TextField
          name="latitude"
          defaultValue={props.location?.latitude}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="latitude" className="rw-field-error" />

        <Label
          name="longitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Longitude
        </Label>

        <TextField
          name="longitude"
          defaultValue={props.location?.longitude}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="longitude" className="rw-field-error" />

        <Label
          name="who_region"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Who region
        </Label>

        <TextField
          name="who_region"
          defaultValue={props.location?.who_region}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="who_region" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default LocationForm
