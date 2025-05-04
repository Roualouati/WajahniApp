import { createSession } from "@/lib/session";
import { Role } from "@/lib/type";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    const role = searchParams.get("role");

  if (
    !accessToken ||
    !refreshToken ||
    !userId ||
    !firstName ||
    !lastName 
    || !role
  )
    throw new Error("Google Ouath Failed!");

  await createSession({
    user: {
      id: Number(userId),
      firstName: firstName,
      lastName: lastName,

      role: role as Role,
      image: "",
      email: ""
    },
    accessToken,
    refreshToken,
  });

  redirect("/welcome");
}