"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CourtTypeFormCard,
  type CourtTypeFormValues,
} from "@/components/admin/court-type-form-card";
import { useFormValidation } from "@/hooks/use-form-validation";
import { type FormErrors } from "@/lib/form-validation";

type FormField = "name" | "sport";

const FIELD_ORDER: FormField[] = ["name", "sport"];

function validateForm({
  name,
  sport,
}: CourtTypeFormValues): FormErrors<FormField> {
  const errors: FormErrors<FormField> = {};

  if (!name.trim()) {
    errors.name = "Name is required";
  }

  if (!sport) {
    errors.sport = "Sport is required";
  }

  return errors;
}

export default function NewCourtTypePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [sport, setSport] = useState<CourtTypeFormValues["sport"]>("");

  const { errors, clearError, validate } = useFormValidation(
    FIELD_ORDER,
    "court-type",
    validateForm,
  );

  const handleSave = () => {
    if (!validate({ name, sport })) return;
    router.push("/admin/court-types");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const values: CourtTypeFormValues = { name, sport };

  const actionButtons = (
    <>
      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href="/admin/court-types" />}
        className="h-14 px-8 cursor-pointer rounded-[12px] border-border bg-white text-primary font-semibold hover:bg-light"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="h-14 px-8 cursor-pointer rounded-[12px] bg-primary text-white font-semibold hover:bg-primary/90"
      >
        Save
      </Button>
    </>
  );

  return (
    <CourtTypeFormCard
      title="New Court Type"
      mode="create"
      values={values}
      onChange={{ name: setName, sport: setSport }}
      onSubmit={handleSubmit}
      actionButtons={actionButtons}
      errors={errors}
      clearError={clearError}
    />
  );
}
