import MaterialUiTextField from '@material-ui/core/TextField';
import { useController, useFormContext } from 'react-hook-form';

export default function TextField({
  name,
  id,
  helperText,
  setValueAs,
  rules, //replaces validation
  rulesErrorMessages,
  defaultValue,
  ...props
}) {
  const { setValue } = useFormContext();
  const {
    field: { ref, onChange, onBlur, value, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: formatValidations(rules),
    shouldUnregister: true,
    defaultValue,
  });

  const defaultId = `${name}Id`;
  const invalidMsg = error?.message || helperText;
  const onChangeHandler = (e) => {
    let value = e?.target?.value;
    if (setValueAs?.onChange) value = setValueAs.onChange(value);
    onChange(value);
  };
  const onBlurHandler = (e) => {
    let value = e?.target?.value;
    if (setValueAs?.onBlur) value = setValueAs.onBlur(value);
    setValue(name, value);
  };

  return (
    <MaterialUiTextField
      {...inputProps}
      id={defaultId || id}
      inputRef={ref}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      error={invalid}
      helperText={invalid ? invalidMsg : helperText}
      defaultValue={defaultValue}
      {...props}
    />
  );
}
const formatValidations = (validations) => {
  if (validations?.validate) {
    for (const property in validations.validate) {
      const validation = validations.validate[property];
      if (validation?.message && validation?.validator) {
        validations.validate[property] = (inputValue) =>
          validation.validator(inputValue) || validation.message;
      }
    }
  }
  return validations;
};
