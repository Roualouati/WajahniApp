import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/action";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider"

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const session = await getSession(); 
  if (!session?.user) {
    redirect("/login");
  }

  const userData = await getCurrentUser(session.user.id); 
  const user = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    image: userData.image || "https://ui-avatars.com/api/?name=CN&background=random",
  };
  return (
    
     <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <SidebarProvider>
        <AppSidebar user={user} variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
     
    
  );
};

export default Layout;
