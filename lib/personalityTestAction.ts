import { authFetch } from "./authFetsh";
import { BACKEND_URL } from "./constants";
import { AnswerResponse } from "./type";

export async function startTest(userId: number) {
  try {
    const response = await authFetch(`${BACKEND_URL}/personality-test/${userId}/start`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to start test');
    }
    
    const data = await response.json();
    
    // Validate required fields
    if (!data.testId || !data.firstQuestion || !data.currentCritique) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid test data received from server');
    }
    
    return data;
  } catch (error) {
    console.error('Error in startTest:', error);
    throw error;
  }
}

export async function answerTest(questionId: number, answer: string, testId: number) : Promise<AnswerResponse>{
  console.log('Sending answer:', { questionId, answer, testId }); // Add this line
  
  const response = await authFetch(`${BACKEND_URL}/personality-test/question/${questionId}/answer`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      answer,
      testId
    }),
  });

  if (!response.ok) {
    console.error('Failed response:', await response.text()); // Add this line
    throw new Error('Failed to save answer');
  }
  return await response.json();
}