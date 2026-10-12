"use client";

import { useState } from "react";
import {
  clearFieldError,
  findFirstInvalid,
  type FormErrors,
} from "@/lib/form-validation";

export function useFormValidation<F extends string, V>(
  fieldOrder: readonly F[],
  idPrefix: string,
  validateValues: (values: V) => FormErrors<F>,
) {
  const [errors, setErrors] = useState<FormErrors<F>>({});

  const clearError = (field: F) => {
    setErrors((prev) => clearFieldError(prev, field));
  };

  const validate = (values: V) => {
    const nextErrors = validateValues(values);
    setErrors(nextErrors);

    const firstInvalid = findFirstInvalid(fieldOrder, nextErrors);
    if (firstInvalid) {
      document.getElementById(`${idPrefix}-${firstInvalid}`)?.focus();
      return false;
    }

    return true;
  };

  return { errors, clearError, validate };
}
