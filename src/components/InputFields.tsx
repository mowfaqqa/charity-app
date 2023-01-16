interface InputProps {
    type?: string;
    rows?: number;
    placeholder?: string;
    id?: string;
    label?: string;
    required?: boolean;
    inputProps?: any;
    error?: boolean;
    className?: any;
    helperText?: string | boolean;
    [key: string]: any;
  }
  export const InputField = (props: InputProps): JSX.Element => {
    const {
      type,
      id,
      label,
      error,
      required,
      inputProps,
      className,
      helperText,
      placeholder,
    } = props;
  
    return (
      <div className={className}>
        <label htmlFor={id} className="block text-base font-medium text-green-400">
          {label}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type={type}
            {...inputProps}
            required={required}
            placeholder={placeholder}
            className="border border-gray-200 border-solid rounded-md py-3 px-4 w-full bg-white"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  };
  interface ISelectFieldProps {
    id: string;
    label: any;
    inputProps?: any;
    error?: boolean;
    className?: any;
    helperText?: string | boolean;
    [key: string]: any;
    name?: string;
  }
  
  export const SelectField = (props: ISelectFieldProps) => {
    const {
      inputProps,
      label,
      id,
      className,
      error,
      helperText,
      children,
      name,
      disabled,
    } = props;
  
    return (
      <div className={className}>
        <label htmlFor={id} className="block text-sm font-medium text-green-400">
          {label}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <select
            {...inputProps}
            disabled={disabled}
            className="form-select appearance-none
        block
        w-full
        py-3
        px-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            name={name}
          >
            {children}
          </select>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {helperText}
          </p>
        )}
      </div>
    );
  };
  
  export function TextareaField(props: InputProps) {
    return (
      <div className={props.className}>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-green-400"
        >
          {props.label}
        </label>
        <div className="mt-1">
          <textarea
            id={props.id}
            rows={props.rows}
            {...props.inputProps}
            required={props.required}
            placeholder={props.placeholder}
            className="shadow-sm p-4 focus:ring-gray-200 focus:border-gray-200 block w-full sm:text-sm  border border-solid border-gray-200 rounded-md"
          />
          {props.error && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {props.helperText}
            </p>
          )}
        </div>
      </div>
    );
  }

  