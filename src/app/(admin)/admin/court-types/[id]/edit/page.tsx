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
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourtTypeEditPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const courtType = COURT_TYPES.find((ct) => ct.id === id);

  if (!courtType) {
    notFound();
  }

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    router.push("/admin/court-types");
  };

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
    name: courtType.name,
    sport: courtType.sport,
  };

  const handleSave = () => {
    // In a real app, we would update the court type in the database
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
        headerAction={headerAction}
        actionButtons={actionButtons}
        onSubmit={handleSubmit}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        entityType="court type"
        itemName={courtType.name}
      />
    </section>
  );
}
