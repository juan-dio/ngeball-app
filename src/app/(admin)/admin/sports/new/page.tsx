"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/hooks/use-form-validation";
import { type FormErrors } from "@/lib/form-validation";

const DEFAULT_COLOR = "#285A48";
const HEX_PATTERN = /^#[0-9A-F]{6}$/;

type FormField = "name" | "color" | "icon";

const FIELD_ORDER: FormField[] = ["name", "color", "icon"];

const LABEL_CLASS = "text-body font-normal text-text-primary leading-tight";
const ERROR_CLASS = "text-small text-danger";

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

export default function NewSportPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [colorHex, setColorHex] = useState("");
  const [iconSvg, setIconSvg] = useState("");

  const { errors, clearError, validate } = useFormValidation(
    FIELD_ORDER,
    "sport",
    validateForm,
  );

  const handleSave = () => {
    if (!validate({ name, colorHex, iconSvg })) return;

    router.push("/admin/sports");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const swatchColor = HEX_PATTERN.test(asHex(colorHex))
    ? asHex(colorHex)
    : DEFAULT_COLOR;

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="flex flex-col gap-6 p-0">
          <h1 className="text-h2 text-text-primary">New Sport</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name & Color */}
            <div className="grid gap-4 md:grid-cols-2">
              <Field data-invalid={Boolean(errors.name)}>
                <FieldLabel className={LABEL_CLASS} htmlFor="sport-name">
                  Name
                </FieldLabel>
                <Input
                  id="sport-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "sport-name-error" : undefined
                  }
                  className="h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                  placeholder="eg. Futsal"
                />
                <FieldError id="sport-name-error" className={ERROR_CLASS}>
                  {errors.name}
                </FieldError>
              </Field>
              <Field data-invalid={Boolean(errors.color)}>
                <FieldLabel className={LABEL_CLASS} htmlFor="sport-color">
                  Color
                </FieldLabel>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1.5"
                  >
                    <span
                      className="block size-6 rounded-[6px] border border-border"
                      style={{ backgroundColor: swatchColor }}
                    />
                  </span>
                  <Input
                    id="sport-color"
                    value={colorHex}
                    onChange={(e) => {
                      setColorHex(e.target.value);
                      clearError("color");
                    }}
                    onBlur={() => {
                      const hex = asHex(colorHex);
                      if (HEX_PATTERN.test(hex)) {
                        setColorHex(hex);
                      }
                    }}
                    aria-invalid={Boolean(errors.color)}
                    aria-describedby={
                      errors.color ? "sport-color-error" : undefined
                    }
                    className="h-10 w-full rounded-[6px] border-border bg-white pl-10 text-body md:text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                    placeholder="eg. 285A48"
                  />
                </div>
                <FieldError id="sport-color-error" className={ERROR_CLASS}>
                  {errors.color}
                </FieldError>
              </Field>
            </div>

            {/* Icon (SVG Code) */}
            <Field data-invalid={Boolean(errors.icon)}>
              <FieldLabel className={LABEL_CLASS} htmlFor="sport-icon">
                Icon (SVG Code)
              </FieldLabel>
              <Textarea
                id="sport-icon"
                value={iconSvg}
                onChange={(e) => {
                  setIconSvg(e.target.value);
                  clearError("icon");
                }}
                aria-invalid={Boolean(errors.icon)}
                aria-describedby={errors.icon ? "sport-icon-error" : undefined}
                className="h-36 w-full resize-none rounded-[6px] border border-border bg-white p-3 text-body md:text-body text-text-primary placeholder:text-text-secondary outline-none transition-colors focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="eg. <svg></svg>"
              />
              <FieldError id="sport-icon-error" className={ERROR_CLASS}>
                {errors.icon}
              </FieldError>
            </Field>

            {/* Action buttons */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
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
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
