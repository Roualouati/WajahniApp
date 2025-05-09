import BacTypeDialog from "@/app/components/BacTypeAlertDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBacType } from "@/lib/action";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const hasBac = await fetchBacType(session.user.id);
  console.log('Bac check result:', hasBac); // Add this to see what you're getting  

  return (
    <div className="bg-[#ffffff] min-h-screen">
      <div className="fixed top-0 left-0 w-1xl md:w-75 z-50">
        <img src="/logo.png" alt="Logo" className="w-50 h-30" />
      </div>

      <div className="relative flex flex-col items-center">
        <p className="text-4xl font-bold CustomFontAcme sm:text-5xl md:text-6xl mt-20">
          Welcome {session.user.firstName} {session.user.lastName} to{" "}
          <span className="text-[#95208D] letter slideInText">W</span>
          <span className="text-[#95208D] letter slideInText">a</span>
          <span className="text-[#95208D] letter slideInText">j</span>
          <span className="text-[#95208D] letter slideInText">a</span>
          <span className="text-[#95208D] letter slideInText">h</span>
          <span className="text-[#95208D] letter slideInText">n</span>
          <span className="text-[#95208D] letter slideInText">i</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-9 px-4 sm:px-10 lg:px-80 gap-y-6 sm:gap-y-0 sm:space-x-10">
        {/* Psychological Test Card */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <img src="/psyTest.jpg" alt="Psychologic Test" className="w-full h-auto items-center" />
              <CardTitle>Psychologic Test</CardTitle>
              <CardDescription>
                This is a little test to know your personality better. Get started now!
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasBac ? (
                <a href="/guidance">
                  <Button variant="default" className="w-full max-w-[400px]">Start test</Button>
                </a>
              ) : (
                <BacTypeDialog
                userId={session.user.id}
                  trigger={
                    <Button variant="default" className="w-full max-w-[400px]">Start test</Button>
                  }
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Competence Test Card */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <img src="/compTest.jpg" alt="Competence Test" className="w-full h-auto items-center mt-7" />
              <CardTitle>Competence Test</CardTitle>
              <CardDescription>
                This is a little test to know your Competence better. Get started now!
              </CardDescription>
            </CardHeader>
            <CardContent>
             
                <a href="/competence-test">
                  <Button variant="default" className="w-full max-w-[400px]">Start test</Button>
                </a>
              
                
              
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
