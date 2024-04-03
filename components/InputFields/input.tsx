import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import Label from "./label";

type customErrorType = {
  type: string;
  message: string;
};

type InputProps = {
  type: string;
  fieldName: string;
  label: string;
  placeholder: string;
  options?: RegisterOptions<FieldValues, string>;
  customError?: customErrorType[];
};

const Input = ({
  type,
  fieldName,
  label,
  placeholder,
  options,
  customError,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorObjects = customError?.map((error) => {
    return (
      errors[fieldName] &&
      errors[fieldName]?.type === error.type && (
        <p className="text-red-500 text-md" key={error.type}>
          {error.message}
        </p>
      )
    );
  });

  return (
    <div className="w-full flex flex-col gap-1">
      <input
        type={type}
        {...register(fieldName, options)}
        placeholder={placeholder}
        className="p-2 rounded-lg w-full bg-slate-600"
        required
      />
      {errorObjects}
    </div>
  );
};

export default Input;
