"use client";
import { useState } from "react";
import { AlertModal } from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Edit, MoreHorizontal, Power, Trash } from "lucide-react";
import { WatchedRepo } from "@/components/tables/repository-table/watch-repo-table";
import { updateRepositoryStatus, deleteRepository } from "@/lib/db/repo";

interface CellActionProps {
  data: WatchedRepo;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<
    "activate" | "deactivate" | "delete" | null
  >(null);

  const onConfirm = async () => {
    setOpen(true);

    try {
      setLoading(true);

      if (actionType === "activate" || actionType === "deactivate") {
        const newStatus = actionType === "activate" ? "active" : "deactivate";
        const result = await updateRepositoryStatus(data.$id, newStatus);

        toast({
          title: "Success",
          description: result?.message,
        });
      } else if (actionType === "delete") {
        const result = await deleteRepository(data.$id);

        toast({
          title: "Success",
          description: result?.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setLoading(false);
      setOpen(false);
      setActionType(null);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setActionType(
                data.status === "active" ? "deactivate" : "activate"
              );
              setOpen(true);
            }}
          >
            <Power className="mr-2 h-4 w-4" />
            {data?.status === "active" ? (
              <span>Deactivate</span>
            ) : (
              <span>Activate</span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setActionType("delete");
              setOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
