import MuiTextField from '@material-ui/core/TextField';
import { useController, useFormContext } from 'react-hook-form';
import { formatValidations } from './helpers';

export default function TextField({
  name,
  id,
  helperText,
  setValueAs,
  rules,
  shouldUnregister = true,
  defaultValue,
  variant,
  ...props
}) {
  const { setValue } = useFormContext();
  const {
    field: { ref, onChange, onBlur, value, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: formatValidations(rules),
    shouldUnregister,
    defaultValue,
  });

  const defaultId = `${name}Id`;
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

  const shouldDisplayHelperText = invalid || helperText;
  const dynamicHelperText = error?.message || helperText;

  return (
    <MuiTextField
      {...inputProps}
      id={id || defaultId}
      inputRef={ref}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      error={invalid}
      helperText={shouldDisplayHelperText && dynamicHelperText}
      defaultValue={defaultValue}
      variant={variant || 'outlined'}
      {...props}
    />
  );
}
