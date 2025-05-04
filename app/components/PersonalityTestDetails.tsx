// app/tests/components/PersonalityTestDetails.tsx
import { getSession } from "@/lib/session";
import { authFetch } from "@/lib/authFetsh";
import { BACKEND_URL } from "@/lib/constants";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, ChevronRight, Star, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Critique {
  id: string;
  name: string;
  score: number;
  description?: string;
}

export async function PersonalityTestDetails() {
  const session = await getSession();
  if (!session?.user) return null;

  const response = await authFetch(`${BACKEND_URL}/user/has-test/${session.user.id}`);
  const data = await response.json();
  const testData = data.hasTest;

  return (
    <div className="p-6 overflow-y-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-[#21397D] dark:text-blue-400" />
          Personality Assessment
        </h2>
        {testData?.isCompleted && (
          <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
            Completed
          </Badge>
        )}
      </div>

      {testData ? (
        <div className="space-y-6">
          {/* Personality Type Summary */}
          {testData.personalityType && (
            <Card className="border-[#21397D]/20 dark:border-[#21397D]/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Your Personality Type</h3>
                  <Badge className="bg-[#21397D] text-white dark:bg-blue-900 dark:text-blue-100">
                    {testData.personalityType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {testData.personalityTypeDescription || "No description available."}
                </p>
              </CardContent>
              <CardFooter className="text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>Based on your responses to the personality assessment</span>
                </div>
              </CardFooter>
            </Card>
          )}

          {/* Test Completion Status */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold">Assessment Details</h3>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Completion Status</span>
                <span className="font-medium">
                  {testData.isCompleted ? "Fully Completed" : "Partially Completed"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Started On</span>
                <span className="font-medium">
                  {new Date(testData.startedAt).toLocaleDateString()}
                </span>
              </div>
              {testData.completedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Completed On</span>
                  <span className="font-medium">
                    {new Date(testData.completedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Critiques Section */}
          {testData.critiques?.length > 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Personality Dimensions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Breakdown of your personality traits
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {testData.critiques.map((critiques: Critique) => (
                  <div key={critiques.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{critiques.name}</h4>
                      <span className="text-sm font-medium">
                        {critiques.score}/100
                      </span>
                    </div>
                    <Progress 
                      value={critiques.score || 0} 
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                      style={{ '--progress-indicator-color': '#21397D', '--progress-indicator-dark-color': 'blue-400' } as React.CSSProperties}
                    />
                    {critiques.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {critiques.description}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}


          {/* Recommendations Section */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Suggested Next Steps</h3>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-[#21397D]/20">
                <ChevronRight className="w-5 h-5 mt-0.5 text-[#21397D] dark:text-blue-300" />
                <div>
                  <h4 className="font-medium">Explore Career Paths</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Discover careers that align with your {testData.personalityType} personality type
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-[#21397D]/20">
                <ChevronRight className="w-5 h-5 mt-0.5 text-[#21397D] dark:text-blue-300" />
                <div>
<Link 
  href={{
    pathname: '/user/personality-analysis',
    query: {
      type: testData.personalityType,
      description: testData.personalityTypeDescription
    }
  }}
  className="block"
>
    <div>
      <h4 className="font-medium">View Detailed Analysis</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Get a comprehensive breakdown of your personality assessment
      </p>
    
  </div>
</Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Test Data Found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              You haven't completed the personality assessment yet. Start now to discover your personality type and get personalized recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}