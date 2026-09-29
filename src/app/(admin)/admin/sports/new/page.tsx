"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const DEFAULT_COLOR = "#285A48";
const HEX_PATTERN = /^#[0-9A-F]{6}$/;

type FormField = "name" | "color" | "icon";
type FormErrors = Partial<Record<FormField, string>>;

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
}): FormErrors {
  const errors: FormErrors = {};

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
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (field: FormField) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSave = () => {
    const nextErrors = validateForm({ name, colorHex, iconSvg });
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(`sport-${firstInvalid}`)?.focus();
      return;
    }

    router.push("/admin/sports");
  };

  const swatchColor = HEX_PATTERN.test(asHex(colorHex))
    ? asHex(colorHex)
    : DEFAULT_COLOR;

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="flex flex-col gap-6 p-0">
          <h1 className="text-h2 text-text-primary">New Sport</h1>

          {/* Name & Color */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                className="text-body text-text-primary leading-tight"
                htmlFor="sport-name"
              >
                Name
              </label>
              <Input
                id="sport-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "sport-name-error" : undefined}
                className="h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="eg. Futsal"
              />
              {errors.name && (
                <p id="sport-name-error" className="text-small text-danger">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-body text-text-primary leading-tight"
                htmlFor="sport-color"
              >
                Color
              </label>
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
              {errors.color && (
                <p id="sport-color-error" className="text-small text-danger">
                  {errors.color}
                </p>
              )}
            </div>
          </div>

          {/* Icon (SVG Code) */}
          <div className="flex flex-col gap-2">
            <label
              className="text-body text-text-primary leading-tight"
              htmlFor="sport-icon"
            >
              Icon (SVG Code)
            </label>
            <Textarea
              id="sport-icon"
              value={iconSvg}
              onChange={(e) => {
                setIconSvg(e.target.value);
                clearError("icon");
              }}
              aria-invalid={Boolean(errors.icon)}
              aria-describedby={errors.icon ? "sport-icon-error" : undefined}
              className="h-36 w-full resize-none rounded-[6px] border border-border bg-white p-3 text-body text-text-primary placeholder:text-text-secondary outline-none transition-colors focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
              placeholder="eg. <svg></svg>"
            />
            {errors.icon && (
              <p id="sport-icon-error" className="text-small text-danger">
                {errors.icon}
              </p>
            )}
          </div>

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
              type="button"
              onClick={handleSave}
              className="h-14 px-8 cursor-pointer rounded-[12px] bg-primary text-white font-semibold hover:bg-primary/90"
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
