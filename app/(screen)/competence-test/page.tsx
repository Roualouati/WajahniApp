"use client";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { fetchBacDetails, fetchBacType, getCurrentUser } from "@/lib/action";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import SubjectList from "@/app/components/SubjectList";
import { authFetch } from "@/lib/authFetsh";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import ScoreResult from "@/app/components/scoreResult";

export default function CompetencyType() {
    const [session, setSession] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [hasBac, setHasBac] = useState<boolean | null>(null);
    const [bacType, setBacType] = useState<string | null>(null);
    const [selectedBac, setSelectedBac] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [comments, setComments] = useState<Record<string, string>>({});
    const [selectedOption, setSelectedOption] = useState("");
    const [globalComment, setGlobalComment] = useState("");
    const [generalAverage, setGeneralAverage] = useState<number | null>(null);
    const [allFieldsComplete, setAllFieldsComplete] = useState(false);
// Add these states
const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
const [scoreData, setScoreData] = useState<any>(null);
const [isLoadingScore, setIsLoadingScore] = useState(false);
    useEffect(() => {
      const loadData = async () => {
        const userSession = await getSession();
        if (!userSession?.user) {
          redirect("/login");
        }
        setSession(userSession);
        
        const [userData, bacData] = await Promise.all([
          getCurrentUser(userSession.user.id),
          fetchBacDetails(userSession.user.id)
        ]);
        
        setUser(userData);
        setHasBac(bacData.exists);
        setBacType(bacData.type);
      };
      loadData();
    }, []);

    const handleSubmit = async () => {
      if (!selectedBac || !session?.user?.id) return;
      
      setIsSubmitting(true);
      try {
        const response = await authFetch(`${BACKEND_URL}/user/${session.user.id}/baccalaureate-type`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({ baccalaureateType: selectedBac }),
        });

        if (response.ok) {
          const { exists, type } = await fetchBacDetails(session.user.id);
          setHasBac(exists);
          setBacType(type);
        }
      } catch (error) {
        console.error("Error submitting BAC type:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleDataChange = (
      newScores: Record<string, number>, 
      newComments: Record<string, string>, 
      option: string,
      newGeneralAverage?: number,
      allComplete?: boolean
    ) => {
      setScores(newScores);
      setComments(newComments);
      setSelectedOption(option);
      setGeneralAverage(newGeneralAverage || null);
      setAllFieldsComplete(allComplete || false);
    };

    const handleSaveData = async () => {
      if (!session?.user?.id || !bacType) return;
      
      setIsSubmitting(true);
      try {
        const payload = {
          bacType: bacType,
          globalComment: globalComment,
          notes: scores,
          comments: comments,
          option: selectedOption || undefined,
          generalAverage: generalAverage || undefined
        };
  
        const response = await authFetch(`${BACKEND_URL}/baccalaureate/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          toast.success("Your baccalaureate data has been saved successfully.");
          await fetchScore(); // Fetch the score first
          setIsScoreDialogOpen(true); // Then open the dialog
        } else {
          throw new Error("Failed to save baccalaureate data");
        }
      } catch (error) {
        console.error("Error saving BAC data:", error);
        toast.error("There was a problem saving your data. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };
  
    // Add this function to fetch the score
    const fetchScore = async () => {
      if (!session?.user?.id) return;
      
      setIsLoadingScore(true);
      try {
        const response = await authFetch(`${BACKEND_URL}/baccalaureate/score`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setScoreData(data);
        } else {
          throw new Error("Failed to fetch score");
        }
      } catch (error) {
        console.error("Error fetching score:", error);
        toast.error("There was a problem fetching your score. Please try again.");
      } finally {
        setIsLoadingScore(false);
      }
    };
  
    
    if (!session || !user || hasBac === null) {
      return (
        <div className="min-h-screen bg-[#e0a932] flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      );
    }

    return (
      <>
        <div className="fixed top-4 right-4 z-50">
          <Link href="/user">
            <Image
              src="/exit.png" 
              alt="Top Right Image"
              width={40} 
              height={30}
            />
          </Link>
        </div>
        <div className="min-h-screen bg-[#e0a932] p-4 flex justify-center items-center">
          <Card className="w-full max-w-5xl min-h-[600px] p-8 bg-white rounded-xl shadow-lg flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <Avatar className="w-10 h-10 rounded-full border-0 overflow-hidden">
                    <AvatarImage
                      src={`${BACKEND_URL}/${user.image}`}
                      alt="User Avatar"
                      className="rounded-full w-full h-full object-cover"
                    />
                    <AvatarFallback className="w-full h-full flex items-center justify-center text-sm font-medium leading-none bg-muted">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {hasBac ? `${user.firstName} ${user.lastName}` : "Almost There!"}
                </h1>
              </div>
              {hasBac && bacType && (
                <p className="text-sm text-gray-700">
                  Baccalaureate type: {bacType
                    .toLowerCase()
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, char => char.toUpperCase())}
                </p>
              )}
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col items-center justify-center gap-6 p-4">
              {hasBac ? (
                <div className="w-full flex flex-col items-center space-y-4">
                  <div className="text-center space-y-1">
                    <p className="text-green-600 font-semibold">✓ Let's start your test!</p>
                    <p className="text-gray-600">We tailor your results based on your Baccalaureate achievements, just for you!</p>
                  </div>
                  
                  <div className="w-full flex justify-center">
                    <SubjectList bacType={bacType!} onDataChange={handleDataChange} />
                  </div>
                  
                  <div className="w-full flex justify-end">
                    <div className="flex flex-col items-end gap-4 w-[350px] h-[120px]">
                      <Textarea
                        placeholder="You can add a comment here about your interests or your future plans"
                        className="rounded-none w-full"
                        value={globalComment}
                        onChange={(e) => setGlobalComment(e.target.value)}
                      />
                      <Button 
                        className={`w-[100px] ${allFieldsComplete ? 'bg-[#e0a932] hover:bg-[#d39b2a]' : 'bg-gray-300 cursor-not-allowed'}`}
                        onClick={handleSaveData}
                        disabled={isSubmitting || !allFieldsComplete}
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : "Submit"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-md space-y-6 text-center">
                  <p className="text-gray-700">
                    Select your baccalaureate type to begin your competency test.
                  </p>
                  
                  <Select onValueChange={setSelectedBac}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EXPERIMENTAL_SCIENCES">Experimental Science</SelectItem>
                      <SelectItem value="LITERATURE">Literature</SelectItem>
                      <SelectItem value="TECHNICAL">Technical</SelectItem>
                      <SelectItem value="COMPUTER_SCIENCE">Computer Science</SelectItem>
                      <SelectItem value="SPORTS">Sports</SelectItem>
                      <SelectItem value="ECONOMICS_AND_MANAGEMENT">Economics & Management</SelectItem>
                      <SelectItem value="MATHEMATICS">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={handleSubmit}
                    disabled={!selectedBac || isSubmitting}
                    className="w-full bg-[#e0a932] hover:bg-[#d39b2a]"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : "Start My Test"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <ScoreResult 
        open={isScoreDialogOpen}
        onOpenChange={setIsScoreDialogOpen}
        scoreData={scoreData}
        isLoading={isLoadingScore}
      />
      </>
    );
}