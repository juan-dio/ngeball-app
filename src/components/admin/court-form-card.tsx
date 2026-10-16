"use client";

import { ChevronDown, ImagePlus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type FormErrors } from "@/lib/form-validation";

const LABEL_CLASS = "text-body font-normal text-text-primary leading-tight";
const ERROR_CLASS = "text-small text-danger";

export interface CourtFormValues {
  name: string;
  price: string;
  sport: string;
  type: string;
  description?: string;
}

export interface CourtFormCardProps {
  title: string;
  mode: "create" | "detail" | "edit";
  values: CourtFormValues;
  onChange?: {
    name?: (value: string) => void;
    price?: (value: string) => void;
    sport?: (sport: string) => void;
    type?: (type: string) => void;
    description?: (desc: string) => void;
  };
  errors?: FormErrors<"name" | "price" | "sport" | "type">;
  clearError?: (field: "name" | "price" | "sport" | "type") => void;
  sports: readonly string[] | string[];
  courtTypes: readonly string[] | string[];
  images: string[];
  onImageRemove?: (indexOrImage: number | string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  headerAction?: React.ReactNode;
  actionButtons?: React.ReactNode;
}

export function CourtFormCard({
  title,
  mode,
  values,
  onChange,
  errors = {},
  clearError,
  sports,
  courtTypes,
  images,
  onImageRemove,
  onSubmit,
  headerAction,
  actionButtons,
}: CourtFormCardProps) {
  const isReadOnly = mode === "detail";

  const content = (
    <div className="flex flex-col gap-6">
      {/* Header & Optional Header Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-h2 text-text-primary">{title}</h1>
        {headerAction}
      </div>

      {/* Picture Gallery */}
      <Field>
        <FieldLabel className={LABEL_CLASS}>Picture</FieldLabel>
        <div className="w-full flex gap-4 overflow-x-auto pb-2">
          {!isReadOnly && (
            <label className="flex size-60 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] border border-dashed border-border bg-light">
              <ImagePlus className="size-6 text-text-secondary" />
              <span className="text-[12px] font-light text-text-secondary text-center">
                Upload Court Picture
              </span>
              <Input type="file" accept="image/*" className="hidden" />
            </label>
          )}
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
              {!isReadOnly && onImageRemove && (
                <button
                  type="button"
                  onClick={() =>
                    onImageRemove(mode === "create" ? image : index)
                  }
                  aria-label="Remove image"
                  className="absolute right-2 top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </Field>

      {/* Name & Price */}
      <div className="grid gap-4 md:grid-cols-2">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel className={LABEL_CLASS} htmlFor="court-name">
            Name
          </FieldLabel>
          <Input
            id="court-name"
            readOnly={isReadOnly}
            value={values.name}
            onChange={(e) => {
              onChange?.name?.(e.target.value);
              clearError?.("name");
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "court-name-error" : undefined}
            className={`h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body text-text-primary ${
              isReadOnly
                ? "focus-visible:ring-0"
                : "placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            }`}
            placeholder={isReadOnly ? undefined : "eg. Futsal Court X"}
          />
          {!isReadOnly && (
            <FieldError id="court-name-error" className={ERROR_CLASS}>
              {errors.name}
            </FieldError>
          )}
        </Field>
        <Field data-invalid={Boolean(errors.price)}>
          <FieldLabel className={LABEL_CLASS} htmlFor="court-price">
            Price /hour
          </FieldLabel>
          <Input
            id="court-price"
            type="number"
            readOnly={isReadOnly}
            value={values.price}
            onChange={(e) => {
              onChange?.price?.(e.target.value);
              clearError?.("price");
            }}
            aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? "court-price-error" : undefined}
            className={`h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body text-text-primary ${
              isReadOnly
                ? "focus-visible:ring-0"
                : "placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            }`}
            placeholder={isReadOnly ? undefined : "eg. 100000"}
          />
          {!isReadOnly && (
            <FieldError id="court-price-error" className={ERROR_CLASS}>
              {errors.price}
            </FieldError>
          )}
        </Field>
      </div>

      {/* Sport & Court type */}
      <div className="grid gap-4 md:grid-cols-2">
        <Field data-invalid={Boolean(errors.sport)}>
          <FieldLabel className={LABEL_CLASS} htmlFor="court-sport">
            Sport
          </FieldLabel>
          {isReadOnly ? (
            <div
              id="court-sport"
              className="flex h-10 w-full items-center rounded-[6px] border border-border bg-white px-3 text-body text-text-primary truncate"
            >
              {values.sport || "-"}
            </div>
          ) : (
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
                  {values.sport || "Select sport"}
                </span>
                <ChevronDown className="size-4 shrink-0 text-text-secondary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                {sports.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => {
                      onChange?.sport?.(option);
                      clearError?.("sport");
                    }}
                    className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!isReadOnly && (
            <FieldError id="court-sport-error" className={ERROR_CLASS}>
              {errors.sport}
            </FieldError>
          )}
        </Field>

        <Field data-invalid={Boolean(errors.type)}>
          <FieldLabel className={LABEL_CLASS} htmlFor="court-type">
            Court type
          </FieldLabel>
          {isReadOnly ? (
            <div
              id="court-type"
              className="flex h-10 w-full items-center rounded-[6px] border border-border bg-white px-3 text-body text-text-primary truncate"
            >
              {values.type || "-"}
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                id="court-type"
                aria-invalid={Boolean(errors.type)}
                aria-describedby={errors.type ? "court-type-error" : undefined}
                className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left"
              >
                <span className="text-body font-normal text-text-primary truncate">
                  {values.type || "Select type"}
                </span>
                <ChevronDown className="size-4 shrink-0 text-text-secondary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                {courtTypes.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => {
                      onChange?.type?.(option);
                      clearError?.("type");
                    }}
                    className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!isReadOnly && (
            <FieldError id="court-type-error" className={ERROR_CLASS}>
              {errors.type}
            </FieldError>
          )}
        </Field>
      </div>

      {/* Description */}
      <Field>
        <FieldLabel className={LABEL_CLASS} htmlFor="court-description">
          Description
        </FieldLabel>
        {isReadOnly ? (
          <div
            id="court-description"
            className="h-36 w-full rounded-[6px] border border-border bg-white p-3 text-body text-text-primary overflow-y-auto"
          >
            {values.description}
          </div>
        ) : (
          <Textarea
            id="court-description"
            value={values.description}
            onChange={(e) => onChange?.description?.(e.target.value)}
            className="h-36 w-full resize-none rounded-[6px] border border-border bg-white p-3 text-body md:text-body text-text-primary placeholder:text-text-secondary outline-none transition-colors focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            placeholder="eg. Court description"
          />
        )}
      </Field>

      {/* Action Buttons */}
      {actionButtons && (
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          {actionButtons}
        </div>
      )}
    </div>
  );

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="p-0">
          {onSubmit && !isReadOnly ? (
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              {content}
            </form>
          ) : (
            content
          )}
        </CardContent>
      </Card>
    </section>
  );
}
