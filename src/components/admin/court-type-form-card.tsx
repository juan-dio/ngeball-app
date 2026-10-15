"use client";

import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type FormErrors } from "@/lib/form-validation";
import { SPORTS } from "@/data/sports";
import { type SportKey } from "@/data/sports";

const LABEL_CLASS = "text-body font-normal text-text-primary leading-tight";
const ERROR_CLASS = "text-small text-danger";

export interface CourtTypeFormValues {
  name: string;
  sport: SportKey | "";
}

export interface CourtTypeFormCardProps {
  title: string;
  mode: "create" | "detail" | "edit";
  values: CourtTypeFormValues;
  onChange?: {
    name?: (value: string) => void;
    sport?: (value: SportKey) => void;
  };
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  headerAction?: React.ReactNode;
  actionButtons?: React.ReactNode;
  errors?: FormErrors<"name" | "sport">;
  clearError?: (field: "name" | "sport") => void;
}

export function CourtTypeFormCard({
  title,
  mode,
  values,
  onChange,
  errors = {},
  clearError,
  onSubmit,
  headerAction,
  actionButtons,
}: CourtTypeFormCardProps) {
  const isReadOnly = mode === "detail";

  const content = (
    <div className="flex flex-col gap-6">
      {/* Header & Optional Header Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-h2 text-text-primary">{title}</h1>
        {headerAction}
      </div>

      {/* Name & Sport */}
      <div className="grid gap-4 md:grid-cols-2">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel className={LABEL_CLASS} htmlFor="court-type-name">
            Name
          </FieldLabel>
          <Input
            id="court-type-name"
            readOnly={isReadOnly}
            value={values.name}
            onChange={(e) => {
              onChange?.name?.(e.target.value);
              clearError?.("name");
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "court-type-name-error" : undefined}
            className={`h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body text-text-primary ${
              isReadOnly
                ? "focus-visible:ring-0"
                : "placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            }`}
            placeholder={isReadOnly ? undefined : "eg. Synthetic Grass Court"}
          />
          {!isReadOnly && (
            <FieldError id="court-type-name-error" className={ERROR_CLASS}>
              {errors.name}
            </FieldError>
          )}
        </Field>

        <Field data-invalid={Boolean(errors.sport)}>
          <FieldLabel className={LABEL_CLASS} htmlFor="court-type-sport">
            Sport
          </FieldLabel>
          {isReadOnly ? (
            <div
              id="court-type-sport"
              className="flex h-10 w-full items-center rounded-[6px] border border-border bg-white px-3 text-body text-text-primary"
            >
              {values.sport || "-"}
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                id="court-type-sport"
                aria-invalid={Boolean(errors.sport)}
                aria-describedby={
                  errors.sport ? "court-type-sport-error" : undefined
                }
                className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left"
              >
                <span className="text-body font-normal text-text-primary truncate">
                  {values.sport
                    ? SPORTS.find((s) => s.sport === values.sport)?.name
                    : "Select sport"}
                </span>
                <ChevronDown className="size-4 shrink-0 text-text-secondary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                {SPORTS.map((sport) => (
                  <DropdownMenuItem
                    key={sport.sport}
                    onClick={() => {
                      onChange?.sport?.(sport.sport);
                      clearError?.("sport");
                    }}
                    className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                  >
                    {sport.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!isReadOnly && (
            <FieldError id="court-type-sport-error" className={ERROR_CLASS}>
              {errors.sport}
            </FieldError>
          )}
        </Field>
      </div>

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
