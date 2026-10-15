"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CourtFormCard,
  type CourtFormValues,
} from "@/components/admin/court-form-card";
import { useFormValidation } from "@/hooks/use-form-validation";
import { type FormErrors } from "@/lib/form-validation";
import { COURTS, DEFAULT_IMAGES } from "@/data/courts";

const SPORTS = Array.from(new Set(COURTS.map((c) => c.sport)));
const COURT_TYPES = Array.from(new Set(COURTS.map((c) => c.type)));

type FormField = "name" | "price" | "sport" | "type";

const FIELD_ORDER: FormField[] = ["name", "price", "sport", "type"];

function validateForm({
  name,
  price,
  sport,
  type,
}: CourtFormValues): FormErrors<FormField> {
  const errors: FormErrors<FormField> = {};

  if (!name.trim()) {
    errors.name = "Name is required";
  }

  if (!price.trim()) {
    errors.price = "Price is required";
  } else if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
    errors.price = "Price must be greater than 0";
  }

  if (!sport) {
    errors.sport = "Select a sport";
  }

  if (!type) {
    errors.type = "Select a court type";
  }

  return errors;
}

export default function NewCourtPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sport, setSport] = useState<CourtFormValues["sport"]>("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([...DEFAULT_IMAGES]);

  const { errors, clearError, validate } = useFormValidation(
    FIELD_ORDER,
    "court",
    validateForm,
  );

  const handleSave = () => {
    if (!validate({ name, price, sport, type, description })) return;
    router.push("/admin/courts");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const removeImage = (image: string) => {
    setImages((prev) => prev.filter((img) => img !== image));
  };

  const values: CourtFormValues = { name, price, sport, type, description };

  const actionButtons = (
    <>
      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href="/admin/courts" />}
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
      <CourtFormCard
        title="New Court"
        mode="create"
        values={values}
        onChange={{
          name: setName,
          price: setPrice,
          sport: setSport,
          type: setType,
          description: setDescription,
        }}
        errors={errors}
        clearError={clearError}
        sports={SPORTS}
        courtTypes={COURT_TYPES}
        images={images}
        onImageRemove={(img) => removeImage(img as string)}
        onSubmit={handleSubmit}
        actionButtons={actionButtons}
      />
    </section>
  );
}
