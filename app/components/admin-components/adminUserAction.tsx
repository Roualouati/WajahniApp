"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUser } from "@/lib/action";
import { CheckCircle, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface iAppProps {
  id: string;
  status: string;
}

export function AdminUserActions({ id, status }: iAppProps) {
  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting user...");
    
    try {
      await deleteUser(id);
      toast.success("User deleted successfully", { id: toastId });
      // Optionally refresh data here
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete user",
        { id: toastId }
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="focus:text-green-500 focus:bg-red-50"asChild>
          <Link href={`/admin/edit-user/${id}`} className="flex items-center">
            <Pencil className="size-4 mr-2" /> Edit User
          </Link>
        </DropdownMenuItem>
       
        <DropdownMenuItem 
          onClick={handleDeleteUser}
          className=" focus:text-red-500 focus:bg-red-50"
        >
          <Trash className="size-4 mr-2" /> Delete User
        </DropdownMenuItem>
        
        {status !== "PAID" && (
          <DropdownMenuItem asChild>
            <Link href={`/admin/upgrade-user/${id}`} className="flex items-center">
              <CheckCircle className="size-4 mr-2" /> Mark as Have Subscription
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}