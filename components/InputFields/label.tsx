type LabelProps = {
  fieldName: string
  label: string
}
const Label = ({ fieldName, label }: LabelProps) => {
  return (
    <label
      htmlFor={fieldName}
      className="text-[#DDD] px-1 font-semibold text-xl"
    >
      {label}
    </label>
  )
}

export default Label
