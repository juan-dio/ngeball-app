export type FormErrors<F extends string> = Partial<Record<F, string>>;

export function findFirstInvalid<F extends string>(
  fieldOrder: readonly F[],
  errors: FormErrors<F>,
): F | undefined {
  return fieldOrder.find((field) => errors[field]);
}

export function clearFieldError<F extends string>(
  errors: FormErrors<F>,
  field: F,
): FormErrors<F> {
  return errors[field] ? { ...errors, [field]: undefined } : errors;
}
