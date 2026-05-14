"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

type ConfirmDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  onConfirm: () => void;
};

export const ConfirmDeleteDialog = ({
  open,
  onOpenChange,
  title = "Confirm delete",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  isLoading = false,
  isSuccess = false,
  onConfirm,
}: ConfirmDeleteDialogProps) => {
  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {confirmText} {isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
