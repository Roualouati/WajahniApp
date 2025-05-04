"use server";

import { getSession } from "@/lib/session";
import { BACKEND_URL } from "./constants";
import { authFetch } from "./authFetsh";

export async function getUserProgress() {
  const session = await getSession();
  if (!session?.user) return 0; // no user, 0% progress

  const userId = session.user.id;

  try {
    // Call the two endpoints
    const [testResponse, bacResponse] = await Promise.all([
      authFetch(`${BACKEND_URL}/user/has-test/${userId}`, { cache: "no-store" }),
      authFetch(`${BACKEND_URL}/user/has-baccalaureate/${userId}`, { cache: "no-store" }),
    ]);

    const testData = await testResponse.json();
    const bacData = await bacResponse.json();

    let progress = 0;

    // Check if tests exist and are completed
    if (testData.hasTest && testData.hasTest.isCompleted) progress += 40;
    if (bacData.hasBaccalaureate) progress += 40;

    return progress;
  } catch (error) {
    console.error("Error fetching progress:", error);
    return 0;
  }
}