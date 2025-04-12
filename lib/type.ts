import { z } from "zod";

export type FormState ={
    error?:{
        firstName?:string[];
        lastName?:string[];

        email?:string[];
        password?:string[];
    };
    message?:string;
    success?: boolean;  // Add success flag
  } | undefined;
   

export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters long." })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." })
    .trim(),
});
export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim(),
    password: z
    .string()
    .min(1,{ message: "Password field must not be empty." })
})
export enum Role{
    ADMIN='ADMIN',
    USER='USER' 
}
export const EditProfileSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name is required" })
    .regex(/^[A-Za-z]+$/, { message: "First name should contain only letters" })
    .optional(),
  lastName: z.string()
    .min(2, { message: "Last name is required" })
    .regex(/^[A-Za-z]+$/, { message: "Last name should contain only letters" })
    .optional(),
  email: z.string()
    .email({ message: "Please enter a valid email" })
    .optional(),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .optional(),
  imageFile: z.any().optional()
});

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  role?: Role;
  password: string;
}