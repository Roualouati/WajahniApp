 'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { answerTest } from "@/lib/personalityTestAction";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Link from "next/link";

interface Props {
  testId: number;
  sectionId: number;
  questionId: number;
  totalQuestions: number;
  critiqueName: string;
  isLastCritique: boolean;
  questionText: string;
  SelectedAnswer: string;
  currentCritiqueDescription: string;
  questionIndex: number;
  userId: number;
  totalUnansweredQuestions: number;
}

export default function QuizInterface({
  testId,
  sectionId,
  questionId,
  totalQuestions,
  critiqueName,
  isLastCritique,
  questionText,
  SelectedAnswer,
  currentCritiqueDescription,
  questionIndex,
  totalUnansweredQuestions,
  userId
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState({ submitting: false });
  const [unansweredCount, setUnansweredCount] = useState(totalUnansweredQuestions);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const localStorageKey = `personality-test-${testId}-answers`;

  // Load answer from localStorage
  useEffect(() => {

    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      const prevAnswer = parsed?.[questionId];
      if (prevAnswer) setSelectedAnswer(prevAnswer);
    }
  }, [questionId]);

  const saveAnswerToStorage = (answer: string) => {
    const stored = localStorage.getItem(localStorageKey);
    const parsed = stored ? JSON.parse(stored) : {};
    parsed[questionId] = answer;
    localStorage.setItem(localStorageKey, JSON.stringify(parsed));
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    saveAnswerToStorage(answer);
  };
  const handleNext = async () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer before proceeding");
      return;
    }
  
    try {
      setLoading({ submitting: true });
  
      const response = await answerTest(
        questionId,
        selectedAnswer as 'Agree' | 'Neutral' | 'Disagree',
        testId
      );
  
      setUnansweredCount(prev => Math.max(0, prev - 1));
  
      if (response.completed) {
        // Clear localStorage when test is done
        localStorage.removeItem(localStorageKey);
        toast.success("Test completed 🎉");
        router.push(`/test-complete`);
        return;
      }
      if (response.nextQuestion && !response.critiqueCompleted) {
        router.push(
          `/quiz/psychologie-test/section/${sectionId}/question/${response.nextQuestion.id}?testId=${testId}` +
          `&totalQuestions=${totalQuestions}` +
          `&critiqueName=${encodeURIComponent(critiqueName)}` +
          `&isLastCritique=${isLastCritique}` +
          `&userId=${userId}` +
          `&currentCritiqueDescription=${encodeURIComponent(currentCritiqueDescription)}` +
          `&Question=${encodeURIComponent(response.nextQuestion.text)}` +
          `&selectedAnswer=${response.nextQuestion.selectedOption || ''}` +
          `&questionIndex=${questionIndex + 1}` +
          `&totalUnansweredQuestions=${unansweredCount - 1}`
        );
        return;
      }

      if (response.critiqueCompleted && response.nextCritique && !response.completed) {
        const nextCritique = response.nextCritique;
        const firstQuestion = nextCritique.questions[0];

        router.push(
          `/quiz/psychologie-test/section/${nextCritique.id}/question/${firstQuestion.id}` +
          `?testId=${testId}` +
          `&totalQuestions=${totalQuestions}` +
          `&critiqueName=${encodeURIComponent(nextCritique.name)}` +
          `&isLastCritique=${response.isLastCritique}` +
          `&userId=${userId}` +
          `&currentCritiqueDescription=${encodeURIComponent(nextCritique.description || '')}` +
          `&Question=${encodeURIComponent(firstQuestion.text)}` +
          `&selectedAnswer=${firstQuestion.selectedOption || ''}` +
          `&questionIndex=1` +
          `&totalUnansweredQuestions=${unansweredCount - 1}`
        );
        return;
      }

      throw new Error("Unexpected response from server");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Error submitting answer");
    } finally {
      setLoading({ submitting: false });
    }
  };

  const handlePrevious = () => {
    const prevIndex = questionIndex - 1;

    if (prevIndex < 1) {
      toast.info("This is the first question.");
      return;
    }

    const previousQuestionId = parseInt(searchParams?.get("prevQuestionId") || "0");

    router.back(); // this uses the browser history stack to go to previous question
  };

  const answeredCount = totalQuestions - unansweredCount;
  const percentDone = Math.min(100, Math.round((answeredCount / totalQuestions) * 100));
  const questionsPerCritique = 20 / 4; // Example: 5 questions per critique
  const currentQuestionInCritique = (questionIndex - 1) % questionsPerCritique + 1;

  return (

    <div className="h-screen flex">
      
      <div className="fixed top-4 right-4 z-50">
      <Link href="/user"><Image
        src="/exit.png" 
        alt="Top Right Image"
        width={40} 
        height={30}
      />
      </Link>
    </div>
      <div className="w-1/2 bg-amber-300 p-8 flex flex-col">
        <div className="flex-grow flex flex-col justify-center">
          <p className="text-lg font-semibold mb-2">Category: {critiqueName}</p>
          <p className="text-md italic mb-4 text-gray-800">{currentCritiqueDescription}</p>
          <p className="text-lg font-semibold mb-2">
            Question {currentQuestionInCritique} of {questionsPerCritique}
          </p>
          <h2 className="text-3xl font-bold">{questionText}</h2>
        </div>

        <div>
          <Progress value={percentDone} className="w-full h-2 bg-white" />
          <div className="flex justify-between text-sm text-black mt-1">
            <span>{percentDone}% complete</span>
            <div className="text-right">
              <span className="block text-xs text-gray-600">Section: {critiqueName}</span>
            </div>
          </div>
        </div>
      </div>

<div className="w-1/2 bg-white flex flex-col justify-between p-8">
  <div className="flex flex-col items-center justify-center flex-grow">
    <div className="flex flex-col gap-6 w-full max-w-xs">
      {["Disagree", "Neutral", "Agree"].map((option) => (
        <div key={option} className="flex items-center gap-4">
          <button
            onClick={() => handleAnswer(option)}
            disabled={loading.submitting}
            className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-3xl transition-all
              ${option === "Disagree" ? "bg-red-500 hover:bg-red-600"
                : option === "Neutral" ? "bg-orange-400 hover:bg-orange-500"
                  : "bg-green-500 hover:bg-green-600"}
              text-white ${selectedAnswer === option ? "ring-4 ring-black scale-110" : ""} 
              ${loading.submitting ? "opacity-50" : ""}`}
          >
            {option === "Disagree" ? "🙁" : option === "Neutral" ? "😐" : "🙂"}
          </button>
          <span className="text-lg font-medium text-gray-800"> {option}</span>
        </div>
      ))}
    </div>
  </div>

  <div className="flex justify-between items-center mt-6">
    <button
      onClick={handlePrevious}
      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-400 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-md transition-all duration-200 disabled:opacity-50"
      disabled={questionIndex === 1 || loading.submitting}
    >
      {'<<'} Previous
    </button>

    <button
      onClick={handleNext}
      className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 disabled:opacity-50"
      disabled={!selectedAnswer || loading.submitting}
    >
      {loading.submitting ? "Submitting..." : <>Next {'>>'}</>}
    </button>
  </div>
</div>

    </div>
  );
}
