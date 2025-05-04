// app/tests/components/BaccalaureateDetails.tsx
import { getSession } from "@/lib/session";
import { authFetch } from "@/lib/authFetsh";
import { BACKEND_URL } from "@/lib/constants";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Award, AlertCircle, ChevronRight } from "lucide-react";

export async function BaccalaureateDetails() {
  const session = await getSession();
  if (!session?.user) return null;

  const response = await authFetch(`${BACKEND_URL}/user/has-baccalaureate/${session.user.id}`);
  const data = await response.json();
  const baccalaureate = data.hasBaccalaureate;

  // Helper function to get baccalaureate type details
  const types = {
    EXPERIMENTAL_SCIENCES: { color: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300", label: "Experimental Sciences" },
    COMPUTER_SCIENCE: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300", label: "Computer Science" },
    LITERATURE: { color: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300", label: "Literature" },
    SPORTS: { color: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300", label: "Sports" },
    ECONOMICS_AND_MANAGEMENT: { color: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300", label: "Economics & Management" },
    TECHNICAL: { color: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300", label: "Technical" },
    MATHEMATICS: { color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300", label: "Mathematics" }
  };

  const getBacTypeDetails = (type: keyof typeof types) => {
    return types[type] || { color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300", label: type };
  };

  return (
    <div className="p-6 overflow-y-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          Baccalaureate Results
        </h2>
        {baccalaureate && (
          <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
            Completed
          </Badge>
        )}
      </div>

      {baccalaureate ? (
        <div className="space-y-6">
          {/* Baccalaureate Summary */}
          <Card className="border-amber-200 dark:border-amber-800/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Academic Summary</h3>
                <Badge className={getBacTypeDetails(baccalaureate.type).color}>
                  {getBacTypeDetails(baccalaureate.type).label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">General Average</p>
                <p className="text-2xl font-bold">{baccalaureate.generalAverage || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
                <p className="text-2xl font-bold">{baccalaureate.Score || "N/A"}</p>
              </div>
            </CardContent>
            {baccalaureate.globalComment && (
              <CardFooter className="text-sm text-gray-600 dark:text-gray-400">
                <p>{baccalaureate.globalComment}</p>
              </CardFooter>
            )}
          </Card>

          {/* Core Subjects */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Core Subjects
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Philosophy", note: baccalaureate.notePhilosophy, comment: baccalaureate.philosophyComment },
                { name: "Arabic", note: baccalaureate.noteArabic, comment: baccalaureate.arabicComment },
                { name: "English", note: baccalaureate.noteEnglish, comment: baccalaureate.englishComment },
                { name: "French", note: baccalaureate.noteFrench, comment: baccalaureate.frenshComment },
                { name: "Mathematics", note: baccalaureate.noteMathematics, comment: baccalaureate.mathematicsComment },
                { name: "Sport", note: baccalaureate.noteSport, comment: baccalaureate.sportComment }
              ].map((subject) => (
                subject.note && (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject.name}</span>
                      <span className="font-bold">{subject.note}/20</span>
                    </div>
                    <Progress 
                      value={(subject.note / 20) * 100} 
                      className="h-2 bg-gray-200 dark:bg-gray-700 bg-amber-500 dark:bg-amber-400"
                    />
                    {subject.comment && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{subject.comment}</p>
                    )}
                  </div>
                )
              ))}
            </CardContent>
          </Card>

          {/* Specialized Subjects */}
          {baccalaureate[baccalaureate.type.toLowerCase()] && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Specialized Subjects
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(baccalaureate[baccalaureate.type.toLowerCase()]).map(([key, value]) => {
                  if (key.endsWith('Note') && value) {
                    const subjectName = key.replace('Note', '').replace(/([A-Z])/g, ' $1').trim();
                    const commentKey = key.replace('Note', 'Comment');
                    const comment = baccalaureate[baccalaureate.type.toLowerCase()][commentKey];
                    
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{subjectName}</span>
                          <span className="font-bold">{String(value)}/20</span>
                        </div>
                        <Progress 
                          value={(Number(value) / 20) * 100} 
                          className="h-2 bg-gray-200 dark:bg-gray-700"
                        />
                        {comment && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{comment}</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Academic Recommendations</h3>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <ChevronRight className="w-5 h-5 mt-0.5 text-amber-600 dark:text-amber-400" />
                <div>
                  <h4 className="font-medium">Explore Study Paths</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Discover university programs that match your academic strengths
                  </p>
                </div>
              </div>
              
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Baccalaureate Data Found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              You haven't submitted your baccalaureate information yet. Add your academic records to get personalized recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}