// It makes it easier to pass a error message
// along with custom form validations
// Example custom validation with message:
// { validate: {
//    validationName: {
//      validator: func() - returns boolean,
//      errorMessage: 'pattern mismatch',
//    }
// }}
// Validation after format:
// { validate: {
//    validationName: (fieldValue) => {
//      return validator(fieldValue) || errorMessage
//    }
//  }}
export const formatValidations = (validations) => {
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
