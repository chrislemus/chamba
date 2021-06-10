import MuiCheckbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useController } from 'react-hook-form';

export default function Checkbox({
  name,
  id,
  defaultValue,
  label,
  rules,
  helperText,
  shouldUnregister,
  ...props
}) {
  //{ ref, onChange, onBlur, value, ...inputProps }
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: formatValidations(rules),
    shouldUnregister: shouldUnregister || true,
    defaultValue: defaultValue || false,
  });
  const defaultId = `${name}Id`;
  const invalidMsg = error?.message || helperText;

  return (
    <FormControl required error={invalid}>
      <FormControlLabel
        control={
          <MuiCheckbox
            {...field}
            id={defaultId || id}
            checked={field.value}
            {...props}
          />
        }
        label={label || ''}
      />
      <FormHelperText>{invalidMsg}</FormHelperText>
    </FormControl>
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
