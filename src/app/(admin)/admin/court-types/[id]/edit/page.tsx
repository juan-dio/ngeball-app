"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CourtTypeFormCard,
  type CourtTypeFormValues,
} from "@/components/admin/court-type-form-card";
import { COURT_TYPES } from "@/data/court-types";
import { type SportKey } from "@/data/sports";
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourtTypeEditPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const courtType = COURT_TYPES.find((ct) => ct.id === id);

  if (!courtType) {
    notFound();
  }

  const [name, setName] = useState(courtType.name);
  const [sport, setSport] = useState<CourtTypeFormValues["sport"]>(
    courtType.sport,
  );

  const { errors, clearError, validate } = useFormValidation(
    FIELD_ORDER,
    "court-type",
    validateForm,
  );

  const headerAction = (
    <div className="flex items-center gap-2">
      <Button
        nativeButton={false}
        render={<Link href={`/admin/court-types/${courtType.id}`} />}
        className="h-10 px-4 cursor-pointer rounded-[12px] bg-primary text-white text-small hover:bg-primary/90 gap-2"
      >
        Back
      </Button>
    </div>
  );

  const values: CourtTypeFormValues = {
    name,
    sport,
  };

  const handleSave = () => {
    if (!validate({ name, sport })) return;

    const index = COURT_TYPES.findIndex((ct) => ct.id === id);
    if (index !== -1) {
      COURT_TYPES[index] = {
        ...COURT_TYPES[index],
        name,
        sport: sport as SportKey,
      };
    }

    router.push("/admin/court-types");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const actionButtons = (
    <>
      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href={`/admin/court-types/${courtType.id}`} />}
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
    <section className="flex flex-col">
      <CourtTypeFormCard
        title="Edit Court Type"
        mode="edit"
        values={values}
        onChange={{ name: setName, sport: setSport }}
        errors={errors}
        clearError={clearError}
        onSubmit={handleSubmit}
        headerAction={headerAction}
        actionButtons={actionButtons}
      />
    </section>
  );
}
