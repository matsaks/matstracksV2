import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form'

type customErrorType = {
  type: string
  message: string
}

type InputProps = {
  type: string
  fieldName: string
  label: string
  placeholder: string
  options?: RegisterOptions<FieldValues, string>
  customError?: customErrorType[]
}

const Input = ({
  type,
  fieldName,
  placeholder,
  options,
  customError,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorObjects = customError?.map((error) => {
    return (
      errors[fieldName] &&
      errors[fieldName]?.type === error.type && (
        <p className="text-red-500 text-md" key={error.type}>
          {error.message}
        </p>
      )
    )
  })

  return (
    <div className="w-full flex flex-col gap-1">
      <input
        type={type}
        {...register(fieldName, options)}
        placeholder={placeholder}
        className="p-2 rounded-lg w-full bg-slate-800"
        required
      />
      {errorObjects}
    </div>
  )
}

export default Input
