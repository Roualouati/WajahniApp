"use server";

import { authFetch } from "./authFetsh";
import { BACKEND_URL } from "./constants";
import { EditProfileSchema, FormState, User } from "./type";
import { z } from "zod";

export const getUsers = async (): Promise<User[]> => {
  const response = await authFetch(`${BACKEND_URL}/admin/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await authFetch(`${BACKEND_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    throw new Error("User not found");
  }
  
  if (response.status === 401) {
    throw new Error("Unauthorized access");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const updateUserProfile = async (
  userId: string,
  userData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
  },
  image?: Blob | string
): Promise<User> => {
  const formData = new FormData();
  
  if (userData.firstName) formData.append('firstName', userData.firstName);
  if (userData.lastName) formData.append('lastName', userData.lastName);
  if (userData.email) formData.append('email', userData.email);
  if (userData.password) formData.append('password', userData.password);

  if (image && typeof image !== 'string') {
    // Convert Blob to File-like object
    const file = new Blob([image], { type: image.type });
    formData.append('image', file, 'profile.jpg');
  } else if (typeof image === 'string') {
    // If it's a string (existing image URL), just pass it through
    formData.append('imageUrl', image);
  }

  const response = await authFetch(`${BACKEND_URL}/user/${userId}/edit`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Failed to update user profile';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      console.error('Failed to parse error response', e);
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const updateProfileAction = async (
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> => {
  try {
    const userId = formData.get("userId") as string;
    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
       
      };
    }

    const rawData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      image: formData.get("image"),
    };

    // Validate with Zod
    const result = EditProfileSchema.safeParse({
      firstName: rawData.firstName,
      lastName: rawData.lastName,
      email: rawData.email,
      password: rawData.password || undefined,
    });

    if (!result.success) {
      return {
        success: false,
        message: "Validation failed",
        error: result.error.flatten().fieldErrors
      };
    }

    // Handle image data
    let imageData: Blob | string | undefined;
    const imageInput = rawData.image;
    
    if (imageInput instanceof Blob) {
      // Client-side Blob object
      if (imageInput.size > 0) {
        if (!imageInput.type.startsWith('image/')) {
          return {
            success: false,
            message: "Only image files are allowed",
           
          };
        }
        if (imageInput.size > 5 * 1024 * 1024) {
          return {
            success: false,
            message: "Image size must be less than 5MB",
            
          };
        }
        imageData = imageInput;
      }
    } else if (typeof imageInput === 'string') {
      // Existing image URL
      imageData = imageInput;
    }

    const updatedUser = await updateUserProfile(
      userId,
      result.data,
      imageData
    );

    return {
      success: true,
      message: "Profile updated successfully",
      user: updatedUser // Not in FormState, but we tell TypeScript: "I know what I’m doing"
    } as FormState & { user?: User };
    
  } catch (error) {
    let errorMessage = "Failed to update profile";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
     
    };
  }
};
// lib/action.ts
export async function getCurrentUser(userId: string): Promise<User> {
  const response = await authFetch(`${BACKEND_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
}
export async function deleteUser(userId:string): Promise<void> {
  const response = await authFetch(`${BACKEND_URL}/admin/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}