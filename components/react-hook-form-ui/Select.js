import FormHelperText from '@material-ui/core/FormHelperText';
import { formatValidations } from './helpers';
import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { useController } from 'react-hook-form';

export default function TextField({
  name,
  id,
  helperText,
  rules,
  label,
  options,
  shouldUnregister = true,
  defaultValue,
  variant,
  ...props
}) {
  const {
    field: { ref, onChange, onBlur, value, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: formatValidations(rules),
    shouldUnregister,
    defaultValue: defaultValue || '',
  });
  const defaultId = `${name}Id`;
  const labelId = `${id || defaultId}-label`;
  const shouldDisplayHelperText = invalid || helperText;
  return (
    <FormControl
      variant={variant || 'outlined'}
      error={invalid}
      style={{ minWidth: `${label.length * 0.8}rem` }}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        {...inputProps}
        inputRef={ref}
        labelId={labelId}
        id={id || defaultId}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        {...props}
      >
        <MenuItem value="" disabled />
        {options.map(({ value, label }, idx) => (
          <MenuItem value={value} key={`${name}-option-${idx}`}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>

      {shouldDisplayHelperText && (
        <FormHelperText>{error?.message || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
