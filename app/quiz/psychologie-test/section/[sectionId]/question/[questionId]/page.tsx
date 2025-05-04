'use client';
import QuizInterface from "@/app/components/QuizInterface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PageParams {
  sectionId: string;
  questionId: string;
}

export default function QuestionPage({ params }: { params: Promise<PageParams> }) {
  const [unwrappedParams, setUnwrappedParams] = useState<PageParams | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    params.then(p => setUnwrappedParams(p));
  }, [params]);

  if (!unwrappedParams) {
    return <div>Loading...</div>;
  }

  const testId = Number(searchParams.get("testId"));
  const totalQuestions = Number(searchParams.get("totalQuestions"));
  const critiqueName = searchParams.get("critiqueName");
  const isLastCritique = searchParams.get("isLastCritique") === "true";
  const currentCritiqueDescription = searchParams.get("currentCritiqueDescription");
  const question = searchParams.get("Question");
  const selectedAnswer = searchParams.get("selectedAnswer");
  const questionIndex = Number(searchParams.get("questionIndex"));
  const userId = Number(searchParams.get("userId"));
  const totalUnansweredQuestions = Number(searchParams.get("totalUnansweredQuestions"));
  console.log("totalUnansweredQuestions", totalUnansweredQuestions);

  return (
    <QuizInterface
      questionText={question || ""}
      currentCritiqueDescription={currentCritiqueDescription || ""}
      testId={testId}
      sectionId={Number(unwrappedParams.sectionId)}
      questionId={Number(unwrappedParams.questionId)}
      totalQuestions={totalQuestions}
      critiqueName={critiqueName || ""}
      isLastCritique={isLastCritique}
      SelectedAnswer={selectedAnswer || ""}
      questionIndex={questionIndex}
        totalUnansweredQuestions={totalUnansweredQuestions}
      userId={userId}
    />
  );
}