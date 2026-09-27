"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  entityType?: string;
  itemName?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  entityType = "court",
  itemName,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}: DeleteConfirmModalProps) {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = requestAnimationFrame(() => {
        setMounted(true);
        setAnimate(true);
      });
      return () => cancelAnimationFrame(timer);
    } else {
      const animTimer = requestAnimationFrame(() => {
        setAnimate(false);
      });
      const unmountTimer = setTimeout(() => {
        setMounted(false);
      }, 100);
      return () => {
        cancelAnimationFrame(animTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted && !isOpen) return null;

  const confirmText =
    title ??
    (itemName
      ? `Are you sure to delete ${itemName}?`
      : `Are you sure to delete this ${entityType}?`);

  return (
    <div
      // z-20 keeps the overlay below AdminShell sticky header (z-30) and sidebar (z-10)
      className={cn(
        "absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-4 transition-opacity duration-100 ease-in-out",
        animate && isOpen ? "opacity-100" : "opacity-0",
      )}
      onClick={onClose}
    >
      <Card
        className={cn(
          "w-full max-w-100 border border-border bg-white p-6 rounded-[16px] transition-all duration-100 ease-in-out",
          animate && isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="text-h3 font-medium text-text-primary">
              {confirmText}
            </h3>
            {description && (
              <p className="text-body text-text-secondary">{description}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="h-10 px-4 cursor-pointer rounded-[12px] border border-border bg-light text-text-primary text-small hover:bg-muted/50"
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="h-10 px-4 cursor-pointer rounded-[12px] bg-red text-white! text-small hover:bg-red/90"
            >
              {confirmLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
