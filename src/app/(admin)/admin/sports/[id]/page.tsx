"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SPORTS } from "@/data/sports";
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SportDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const sport = SPORTS.find((s) => s.id === id);

  if (!sport) {
    notFound();
  }

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    router.push("/admin/sports");
  };

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="flex flex-col gap-6 p-0">
          {/* Header Card & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-h2 text-text-primary">Sport Details</h1>
            <div className="flex items-center gap-2">
              <Button
                nativeButton={false}
                render={<Link href={`/admin/sports/${sport.id}/edit`} />}
                className="h-10 px-4 cursor-pointer rounded-[12px] bg-warning text-white! text-small hover:bg-warning/90 gap-2"
              >
                <SquarePen />
                Edit
              </Button>
              <Button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="h-10 px-4 cursor-pointer rounded-[12px] bg-red text-white! text-small hover:bg-red/90 gap-2"
              >
                <Trash2 />
                Delete
              </Button>
            </div>
          </div>

          {/* Name & Color */}
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel className="text-body font-normal text-text-primary leading-tight" htmlFor="sport-name">
                Name
              </FieldLabel>
              <Input
                id="sport-name"
                readOnly
                value={sport.name}
                className="h-10 w-full rounded-[6px] border-border bg-white px-3 text-body md:text-body text-text-primary focus-visible:ring-0"
              />
            </Field>
            <Field>
              <FieldLabel className="text-body font-normal text-text-primary leading-tight" htmlFor="sport-color">
                Color
              </FieldLabel>
              <div
                id="sport-color"
                className="flex h-10 w-full items-center gap-2 rounded-[6px] border border-border bg-white px-3 text-body text-text-primary"
              >
                <span
                  aria-hidden="true"
                  className="block size-6 shrink-0 rounded-[8px] border border-border"
                  style={{ backgroundColor: sport.colorHex }}
                />
                {sport.colorHex.replace("#", "")}
              </div>
            </Field>
          </div>

          {/* Icon (SVG Code) */}
          <Field>
            <FieldLabel className="text-body font-normal text-text-primary leading-tight" htmlFor="sport-icon">
              Icon (SVG Code)
            </FieldLabel>
            <div
              id="sport-icon"
              className="h-36 w-full overflow-y-auto rounded-[6px] border border-border bg-white p-3 text-body text-text-primary break-all whitespace-pre-wrap"
            >
              {sport.iconSvg}
            </div>
          </Field>
        </CardContent>
      </Card>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        entityType="sport"
      />
    </section>
  );
}