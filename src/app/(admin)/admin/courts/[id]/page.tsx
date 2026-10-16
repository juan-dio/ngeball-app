"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CourtFormCard,
  type CourtFormValues,
} from "@/components/admin/court-form-card";
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal";
import { COURTS } from "@/data/courts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourtDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const court = COURTS.find((c) => c.id === id);

  if (!court) {
    notFound();
  }

  const images =
    court.images && court.images.length > 0 ? court.images : [court.image];

  const headerAction = (
    <div className="flex items-center gap-2">
      <Button
        nativeButton={false}
        render={<Link href={`/admin/courts/${court.id}/edit`} />}
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

  const values: CourtFormValues = {
    name: court.name,
    price: court.price.toString(),
    sport: court.sport.sport,
    type: court.courtType.name,
    description: court.description,
  };

  const actionButtons = (
    <Button
      nativeButton={false}
      variant="outline"
      render={<Link href="/admin/courts" />}
      className="h-14 px-8 cursor-pointer rounded-[12px] border-border bg-white text-primary font-semibold hover:bg-light"
    >
      Close
    </Button>
  );

  return (
    <section className="flex flex-col">
      <CourtFormCard
        title="Court Details"
        mode="detail"
        values={values}
        sports={["Futsal", "Basketball", "Tennis", "Padel"] as string[]}
        courtTypes={[
          "Synthetic Grass Futsal Court",
          "Interlock Futsal Court",
          "Indoor Basketball Court",
          "Padel Court",
        ]}
        images={images}
        headerAction={headerAction}
        actionButtons={actionButtons}
        onSubmit={() => {}}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          router.push("/admin/courts");
        }}
        entityType="court"
      />
    </section>
  );
}
