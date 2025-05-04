"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/authFetsh";

export default function BacTypeDialog({
  trigger,
  userId, 
}: {
  trigger: React.ReactNode;
  userId: number;
}) {
  const [bacType, setBacType] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleContinue = () => {
    if (!bacType) return;
    
    startTransition(async () => {
      try {
        const res = await authFetch(`${BACKEND_URL}/user/${userId}/baccalaureate-type`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ baccalaureateType: bacType }),
        });
  
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("Server error:", {
            status: res.status,
            error: errorData
          });
          throw new Error(errorData.message || "Failed to update bac type");
        }
  
        const data = await res.json();
        console.log("Success:", data);
        router.push("/guidance");
      } catch (error) {
        console.error("Full error:", error);
        if (error instanceof Error) {
          alert(`Failed to save: ${error.message}`);
        } else {
          alert("Failed to save: An unknown error occurred");
        }
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select your Baccalaureate type</AlertDialogTitle>
          <AlertDialogDescription>
            Please choose your Baccalaureate type before continuing to the test.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="bacType">Bac Type</Label>
          <Select onValueChange={setBacType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Bac type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EXPERIMENTAL_SCIENCES">Experimental Science</SelectItem>
              <SelectItem value="LITERATURE">Literature</SelectItem>
              <SelectItem value="TECHNICAL">Technical</SelectItem>
              <SelectItem value="COMPUTER_SCIENCE">Computer Science</SelectItem>
              <SelectItem value="SPORTS">Sports</SelectItem>
              <SelectItem value="ECONOMICS_AND_MANAGEMENT">Economics and Management</SelectItem>
              <SelectItem value="MATHEMATICS">Mathematics</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!bacType || isPending} onClick={handleContinue}>
            {isPending ? "Saving..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
