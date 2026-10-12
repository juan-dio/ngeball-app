"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { ChevronDown, ImagePlus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFormValidation } from "@/hooks/use-form-validation";
import { type FormErrors } from "@/lib/form-validation";
import { COURTS } from "@/data/courts";
import { type SportKey } from "@/data/sports";

const SPORTS = Array.from(new Set(COURTS.map((c) => c.sport)));
const COURT_TYPES = Array.from(new Set(COURTS.map((c) => c.type)));

type FormField = "name" | "price" | "sport" | "type";

const FIELD_ORDER: FormField[] = ["name", "price", "sport", "type"];

const LABEL_CLASS = "text-body font-normal text-text-primary leading-tight";
const ERROR_CLASS = "text-small text-danger";

type CourtFormValues = {
  name: string;
  price: string;
  sport: SportKey | "";
  type: string;
};

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

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="flex flex-col gap-6 p-0">
          <h1 className="text-h2 text-text-primary">Edit Court</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name & Price */}
            <div className="grid gap-4 md:grid-cols-2">
              <Field data-invalid={Boolean(errors.name)}>
                <FieldLabel className={LABEL_CLASS} htmlFor="court-name">
                  Name
                </FieldLabel>
                <Input
                  id="court-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "court-name-error" : undefined
                  }
                  className="h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                  placeholder="eg. Futsal Court X"
                />
                <FieldError id="court-name-error" className={ERROR_CLASS}>
                  {errors.name}
                </FieldError>
              </Field>
              <Field data-invalid={Boolean(errors.price)}>
                <FieldLabel className={LABEL_CLASS} htmlFor="court-price">
                  Price /hour
                </FieldLabel>
                <Input
                  id="court-price"
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    clearError("price");
                  }}
                  aria-invalid={Boolean(errors.price)}
                  aria-describedby={
                    errors.price ? "court-price-error" : undefined
                  }
                  className="h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                  placeholder="eg. 100000"
                />
                <FieldError id="court-price-error" className={ERROR_CLASS}>
                  {errors.price}
                </FieldError>
              </Field>
            </div>

            {/* Sport & Court type */}
            <div className="grid gap-4 md:grid-cols-2">
              <Field data-invalid={Boolean(errors.sport)}>
                <FieldLabel className={LABEL_CLASS} htmlFor="court-sport">
                  Sport
                </FieldLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    id="court-sport"
                    aria-invalid={Boolean(errors.sport)}
                    aria-describedby={
                      errors.sport ? "court-sport-error" : undefined
                    }
                    className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left"
                  >
                    <span className="text-body font-normal text-text-primary truncate">
                      {sport || "Select sport"}
                    </span>
                    <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                    {SPORTS.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => {
                          setSport(option);
                          clearError("sport");
                        }}
                        className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FieldError id="court-sport-error" className={ERROR_CLASS}>
                  {errors.sport}
                </FieldError>
              </Field>
              <Field data-invalid={Boolean(errors.type)}>
                <FieldLabel className={LABEL_CLASS} htmlFor="court-type">
                  Court type
                </FieldLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    id="court-type"
                    aria-invalid={Boolean(errors.type)}
                    aria-describedby={
                      errors.type ? "court-type-error" : undefined
                    }
                    className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left"
                  >
                    <span className="text-body font-normal text-text-primary truncate">
                      {type || "Select type"}
                    </span>
                    <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                    {COURT_TYPES.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => {
                          setType(option);
                          clearError("type");
                        }}
                        className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FieldError id="court-type-error" className={ERROR_CLASS}>
                  {errors.type}
                </FieldError>
              </Field>
            </div>

            {/* Description */}
            <Field>
              <FieldLabel className={LABEL_CLASS} htmlFor="court-description">
                Description
              </FieldLabel>
              <Textarea
                id="court-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-36 w-full resize-none rounded-[6px] border border-border bg-white p-3 text-body md:text-body text-text-primary placeholder:text-text-secondary outline-none transition-colors focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="eg. Court description"
              />
            </Field>

            {/* Picture gallery */}
            <Field>
              <FieldLabel className={LABEL_CLASS}>Picture</FieldLabel>
              <div className="w-full flex gap-4 overflow-x-auto pb-2">
                <label className="flex size-60 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] border border-dashed border-border bg-light">
                  <ImagePlus className="size-6 text-text-secondary" />
                  <span className="text-[12px] font-light text-text-secondary text-center">
                    Upload Court Picture
                  </span>
                  <Input type="file" accept="image/*" className="hidden" />
                </label>
                {images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative h-60 aspect-3/2 shrink-0 overflow-hidden rounded-[8px] border border-border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={`Court image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      aria-label="Remove image"
                      className="absolute right-2 top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Field>

            {/* Action buttons */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
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
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
