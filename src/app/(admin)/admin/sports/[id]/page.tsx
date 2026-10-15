"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SportFormCard,
  type SportFormValues,
} from "@/components/admin/sport-form-card";
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

  const headerAction = (
    <div className="flex items-center gap-2">
      <Button
        nativeButton={false}
        render={<Link href={`/admin/sports/${sport.id}/edit`} />}
        className="h-10 px-4 cursor-pointer rounded-[12px] bg-warning text-white! text-small hover:bg-warning/90 gap-2"
      >
        <SquarePen /> Edit
      </Button>
      <Button
        type="button"
        onClick={() => setIsDeleteModalOpen(true)}
        className="h-10 px-4 cursor-pointer rounded-[12px] bg-red text-white! text-small hover:bg-red/90 gap-2"
      >
        <Trash2 /> Delete
      </Button>
    </div>
  );

  const values: SportFormValues = {
    name: sport.name,
    colorHex: sport.colorHex,
    iconSvg: sport.iconSvg || "",
  };

  const actionButtons = (
    <Button
      nativeButton={false}
      variant="outline"
      render={<Link href="/admin/sports" />}
      className="h-14 px-8 cursor-pointer rounded-[12px] border-border bg-white text-primary font-semibold hover:bg-light"
    >
      Close
    </Button>
  );

  return (
    <section className="flex flex-col">
      <SportFormCard
        title="Sport Details"
        mode="detail"
        values={values}
        headerAction={headerAction}
        actionButtons={actionButtons}
        onSubmit={() => {}}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        entityType="sport"
      />
    </section>
  );
}
