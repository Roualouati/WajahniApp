import { getCurrentUser } from "@/lib/action";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

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
        <p> hello</p>
        </div>
      </>
    );
  }