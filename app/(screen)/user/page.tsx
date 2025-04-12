// src/app/user/page.tsx
import { getSession } from "@/lib/session";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { redirect } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { getCurrentUser } from "@/lib/action";

export default async function UserHome() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch the latest user data from backend
  const user = await getCurrentUser(session.user.id);

  return (
    <>
      {/* User avatar fixed at top right */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center bg-[#B4AFFD] rounded-full px-2 py-2 space-x-3">
          <span className="text-sm font-semibold CustomFontAcme text-gray-800">
            {user.firstName} {user.lastName}
          </span>
          <a href="/api/auth/signout" className="w-10">
            <Avatar className="w-10 h-10 rounded-full border-0 overflow-hidden">
              <AvatarImage
                src={
                  user.image 
                    ? `${BACKEND_URL}/${user.image}`
                    : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
                }
                alt="User Avatar"
                className="rounded-full w-full h-full object-cover"
              />
            </Avatar>
          </a>
        </div>
      </div>
    </>
  );
}