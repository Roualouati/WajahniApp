import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  import { Loader2 } from "lucide-react";
import Link from "next/link";
  
  interface ScoreResultProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    scoreData: any;
    isLoading: boolean;
  }
  
  export default function ScoreResult({ 
    open, 
    onOpenChange, 
    scoreData, 
    isLoading 
  }: ScoreResultProps) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your Competency Score</AlertDialogTitle>
            <AlertDialogDescription>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : scoreData ? (
                <div className="py-4">
                  <p className="text-lg font-semibold">
                    Your score: {scoreData.score || 'Not available'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on your baccalaureate results and input.
                  </p>
                </div>
              ) : (
                <p>No score data available</p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction className="bg-[#e0a932] hover:bg-[#d39b2a]">
            <Link href="/user" > View Details</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }