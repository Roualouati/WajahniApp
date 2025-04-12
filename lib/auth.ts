"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import {
  FormState,
  LoginFormSchema,
  Role,
  SignupFormSchema,
} from "./type";
import { createSession, updateTokens } from "./session";

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
   
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `${BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationFields.data),
    }
  );
  if (response.ok) {
    redirect("/login");
  } else
    return {
      message:
        response.status === 409
          ? "The user is already existed!"
          : response.statusText,
    };
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `${BACKEND_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    }
  );

  if (response.ok) {
    const result = await response.json();

    await createSession({
      user: {
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        role: result.role,
        image: result.image || "", // Added fallback for image
        email: result.email || "" // Added fallback for email
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });

    // Determine redirect path based on role
    const redirectPath = result.role === Role.ADMIN ? '/admin' : '/welcome';
    console.log(`Redirecting to ${redirectPath}...`);
    redirect(redirectPath);
  } else {
    return {
      message:
        response.status === 401
          ? "Invalid Credentials!"
          : response.statusText,
    };
  }
}

export const refreshToken = async (
  oldRefreshToken: string
) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: oldRefreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to refresh token" + response.statusText
      );
    }

    const { accessToken, refreshToken } =
      await response.json();
    // update session with new tokens
    const updateRes = await fetch(
      "http://localhost:3000/api/auth/update",
      {
        method: "POST",
        body: JSON.stringify({
          accessToken,
          refreshToken,
        }),
      }
    );
    if (!updateRes.ok)
      throw new Error("Failed to update the tokens");

    return accessToken;
  } catch (err) {
    console.error("Refresh Token failed:", err);
    return null;
  }
};