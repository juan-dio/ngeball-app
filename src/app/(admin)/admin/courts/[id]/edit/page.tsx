"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CourtFormCard,
  type CourtFormValues,
} from "@/components/admin/court-form-card";
import { useFormValidation } from "@/hooks/use-form-validation";
import { type FormErrors } from "@/lib/form-validation";
import { COURTS } from "@/data/courts";
import { type SportKey } from "@/data/sports";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditCourtPage({ params }: PageProps) {
  const { id } = use(params);
  const court = COURTS.find((c) => c.id === id);

  if (!court) {
    notFound();
  }

  const router = useRouter();

  const initialImages =
    court.images && court.images.length > 0 ? court.images : [court.image];
  const initialPrice = court.price.replace(/[^0-9]/g, "");

  const [name, setName] = useState(court.name);
  const [price, setPrice] = useState(initialPrice);
  const [sport, setSport] = useState<SportKey | "">(court.sport);
  const [type, setType] = useState(court.type);
  const [description, setDescription] = useState(court.description);
  const [images, setImages] = useState<string[]>(initialImages);

  const { errors, clearError, validate } = useFormValidation(
    FIELD_ORDER,
    "court",
    validateForm,
  );

  const handleSave = () => {
    if (!validate({ name, price, sport, type })) return;
    router.push("/admin/courts");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const handleReset = () => {
    setName(court.name);
    setPrice(initialPrice);
    setSport(court.sport);
    setType(court.type);
    setDescription(court.description);
    setImages(initialImages);
    FIELD_ORDER.forEach(clearError);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const values: CourtFormValues = {
    name,
    price,
    sport,
    type,
    description,
  };

  const actionButtons = (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={handleReset}
        className="h-14 px-8 cursor-pointer rounded-[12px] border-border bg-white text-primary font-semibold hover:bg-light"
      >
        Reset
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
        title="Edit Court"
        mode="edit"
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
        onImageRemove={(index) => removeImage(index as number)}
        onSubmit={handleSubmit}
        actionButtons={actionButtons}
      />
    </section>
  );
}
