"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SportFormCard,
  type SportFormCardValues,
} from "@/components/admin/sport-form-card";
import { useFormValidation } from "@/hooks/use-form-validation";
import { type FormErrors } from "@/lib/form-validation";
import { SPORTS } from "@/data/sports";

const HEX_PATTERN = /^#[0-9A-F]{6}$/;

type FormField = "name" | "color" | "icon";

const FIELD_ORDER: FormField[] = ["name", "color", "icon"];

function asHex(value: string) {
  const trimmed = value.trim().toUpperCase();
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

function validateForm({
  name,
  colorHex,
  iconSvg,
}: {
  name: string;
  colorHex: string;
  iconSvg: string;
}): FormErrors<FormField> {
  const errors: FormErrors<FormField> = {};

  if (!name.trim()) {
    errors.name = "Name is required";
  }

  if (!HEX_PATTERN.test(asHex(colorHex))) {
    errors.color = "Use a 6-digit hex color, eg. 285A48";
  }

  if (!iconSvg.trim()) {
    errors.icon = "Icon (SVG Code) is required";
  }

  return errors;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditSportPage({ params }: PageProps) {
  const { id } = use(params);
  const sport = SPORTS.find((s) => s.id === id);

  if (!sport) {
    notFound();
  }

  const router = useRouter();

  const [name, setName] = useState(sport.name);
  const [colorHex, setColorHex] = useState(sport.colorHex);
  const [iconSvg, setIconSvg] = useState(sport.iconSvg || "");

  const { errors, clearError, validate } = useFormValidation(
    FIELD_ORDER,
    "sport",
    validateForm,
  );

  const handleSave = () => {
    if (!validate({ name, colorHex, iconSvg })) return;

    const index = SPORTS.findIndex((s) => s.id === id);
    if (index !== -1) {
      SPORTS[index] = {
        ...SPORTS[index],
        name,
        colorHex: asHex(colorHex),
        iconSvg,
      };
    }

    router.push("/admin/sports");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const handleColorBlur = () => {
    const hex = asHex(colorHex);
    if (HEX_PATTERN.test(hex)) {
      setColorHex(hex);
    }
  };

  const values: SportFormCardValues = { name, colorHex, iconSvg };

  const actionButtons = (
    <>
      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href="/admin/sports" />}
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
    <SportFormCard
      title="Edit Sport"
      mode="edit"
      values={values}
      onChange={{ name: setName, colorHex: setColorHex, iconSvg: setIconSvg }}
      onColorBlur={handleColorBlur}
      errors={errors}
      clearError={clearError}
      onSubmit={handleSubmit}
      actionButtons={actionButtons}
    />
  );
}
