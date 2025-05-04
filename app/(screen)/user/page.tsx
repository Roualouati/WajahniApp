import { ModeToggle } from "@/app/components/theme-toggle";
import { Progress } from "@/components/ui/progress";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { ProfileSetupCard } from "@/app/components/ProfileSetupCard";
import { getUserProgress } from "@/lib/getUserProgress";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/authFetsh";
import { BACKEND_URL } from "@/lib/constants";
import Link from "next/link";
import { getCurrentUser } from "@/lib/action";

interface PersonalityTestData {
  id: number;
  userId: number;
  startedAt: string;
  completedAt: string | null;
  isCompleted: boolean;
  personalityType: string | null;
  personalityTypeDescription: string | null;
  critiques?: {
    id: number;
    name: string;
    description: string | null;
    score: number | null;
  }[];
}
export default async function UserHome() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const user = await getCurrentUser(session.user.id);
  const hasProfilePicture = !!user.image;
  
  const progress = await getUserProgress();
  const testResponse = await authFetch(`${BACKEND_URL}/user/has-test/${session.user.id}`, { cache: "no-store" });
  const testData = (await testResponse.json()).hasTest;
  
  return (
    <div className="relative min-h-screen dark:bg-neutral-950">
      {/* Theme toggle in top-right */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ModeToggle />
      </div>
      
      {/* Progress bar - Only show if progress > 0 */}
      {progress > 0 && (
        <div className="fixed top-16 left-52 w-[calc(100%-16rem)] px-4 z-40">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
            <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
              You are <span className="font-bold text-amber-600 dark:text-amber-400">{progress}%</span> there
            </p>
            <Progress 
              value={progress} 
              className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>
      )}

       {/* Account setup card - Only show if progress > 0 AND no profile picture */}
       { !hasProfilePicture && (
        <div className="fixed left-1/2 -translate-x-1/2 sm:left-[330px] sm:translate-x-0 top-32 sm:top-36 z-30 w-full max-w-md px-4 sm:px-0">
          <ProfileSetupCard />
        </div>
      )}

      {/* Conditional rendering based on progress */}
      {progress === 0 ? (
        // Centered message when progress is 0
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center max-w-md p-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-600 dark:text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Setup Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please complete your tests setup to unlock all features and view your progress.
            </p>
          </div>
        </div>
      ) : (
        // Main content cards when progress > 0
        <div className="flex flex-col sm:flex-row justify-around gap-6 pt-72 pb-12 px-4 mx-auto max-w-7xl">
          {/* Baccalaureate Card */}
          <div className="w-full sm:w-1/2 max-w-md flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-neutral-700 hover:shadow-xl transition-shadow duration-300">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-50 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Baccalaureate Completed</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
                You've successfully completed your baccalaureate requirements. View your detailed results .
              </p>
              <Button className="w-full bg-amber-500 hover:bg-amber-400 text-white">
                View Details
              </Button>
            </div>
          </div>

          {/* Psychological Test Card */}
<div className="w-full sm:w-1/2 max-w-md flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-neutral-700 hover:shadow-xl transition-shadow duration-300">
  <div className="p-6 flex-1 flex flex-col">
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-full bg-[#21397D] dark:text-white dark:bg-[#21397D] mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 bg-[#21397D] text-white dark:text-white dark:bg-[#21397D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Personality Test Results</h2>
    </div>
    
    {testData ? (
      <>
        {testData.personalityType ? (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
              You're classified as <strong>{testData.personalityType}</strong>!
            </p>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#21397D] text-white dark:text-white dark:bg-[#21397D]">
                {testData.personalityType} Personality
              </span>
            </div>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
            You didn't finish your test so please complete it and Check back soon!
          </p>
        )}
       
      </>
    ) : (
      <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
        You haven't completed the personality test yet. Start now to discover your personality type.
      </p>
    )}
    
    <Button className="w-full bg-[#21397D] hover:bg-[#435176] text-white" asChild>
  {testData?.isCompleted ? (
 <Link href="/user/tests">View Detailed Report</Link>  ) : (
    <Link href="/guidance">Resume Personality Test</Link>
  )}
</Button>
  </div>
</div>
        </div>
      )}
    </div>
  );
}