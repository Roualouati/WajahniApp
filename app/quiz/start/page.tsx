'use client';

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; 
import { toast } from "sonner"; 
import { startTest } from "@/lib/personalityTestAction";
import { getSession } from "@/lib/session";

export default  function StartTestPage() {

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initTest = async () => {
        const session = await getSession();
        let attempts = 0;
        const maxAttempts = 3;
        let delay = 1000; // start with 1 second
      
        try {
          if (!session?.user?.id) {
            toast.error("User not authenticated");
            setLoading(false);
            return;
          }
      
          const userId = session.user.id;
          let data = null;
      
          // Retry mechanism
          while (attempts < maxAttempts) {
            data = await startTest(userId);
      
            if (
              data &&
              data.currentCritique &&
              data.firstQuestion &&
              data.testId
            ) {
              break;
            }
      
            attempts++;
            console.warn(`Retrying startTest... attempt ${attempts}`);
            await new Promise((res) => setTimeout(res, delay));
            delay *= 2; // exponential backoff
          }
      
          if (!data || !data.currentCritique || !data.firstQuestion) {
            throw new Error("Test data incomplete after retries");
          }
      
          toast.success("Your test is ready 🎉");
      
          const totalUnansweredQuestions = data.totalUnanswered || 0;
      
          router.replace(
            `/quiz/psychologie-test/section/${data.currentCritique.id}/question/${data.firstQuestion.id}?testId=${data.testId}&totalQuestions=${data.totalQuestions}&critiqueName=${data.currentCritique.name}&isLastCritique=${data.isLastCritique}&userId=${userId}&currentCritiqueDescription=${data.currentCritique.description}&Question=${data.firstQuestion.text}&selectedAnswer=${data.firstQuestion.selectedAnswer}&questionIndex=${data.firstQuestion.position}&totalUnansweredQuestions=${totalUnansweredQuestions}`
          );
        } catch (err) {
          console.error("Failed to initialize test after retries:", err);
          toast.error("Failed to initialize test. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      

    initTest();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-white text-center p-6">
      {loading ? (
        <>
          <Loader2 className="w-12 h-12 animate-spin text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Preparing your Ai generated test...</h2>
          <p className="text-gray-500 mt-2">Hang tight, just a few seconds 🐢✨</p>
        </>
      ) : (
        <p className="text-gray-500">Redirecting...</p>
      )}
    </div>
  );
}
