"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom"
import { signUp } from "@/lib/auth"
import { error } from "console";
import { BACKEND_URL } from "@/lib/constants";
import { SubmitButton } from "./SubmitBotton";
export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state,action]=useFormState(signUp,undefined)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden h-full">
        <CardContent className="grid p-0 md:grid-cols-2 h-full">
         
         
          <form className="p-6 md:p-6" action={action}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <p className="text-balance text-muted-foreground">
                  Register to <span className="text-[#f9ad08] font-bold">Wajahni</span> App Now
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label >First Name</Label>
                 
                </div>
                <input id="firstName" name="firstName" type="text" placeholder="your first name" required className="bg-[#F7F7C5] rounded-lg border border-[#d0d089] h-8 px-4" />
                </div>
                {state?.error?.firstName && (<p className="text-sm text-red-500">{state.error.firstName}</p>)}
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label>Last Name</Label>
                 
                </div>
                <input id="lastName" name="lastName" type="text" placeholder="your last name" required className="bg-[#F7F7C5] rounded-lg border border-[#d0d089] h-8 px-4" />
                </div>
                {state?.error?.lastName && ( <p className="text-sm text-red-500">{state.error.lastName}</p>)}

              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Name@example.com"
                  required
                  className="bg-[#F7F7C5] rounded-lg border border-[#d0d089] h-8 px-4"/>
              </div>
              {state?.error?.email && ( <p className="text-sm text-red-500">{state.error.email}</p>)}

              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <input id="password" name="password" type="password" placeholder="your password" required className="bg-[#F7F7C5] rounded-lg border border-[#d0d089] h-8 px-4" />
                </div>
                {state?.error?.password && (
                  <div className="text-sm text-red-500">
                     <p className="text-sm text-red-500">Password must:</p>
                     <ul >
                     {state.error.password.map((error)=>(
                      <li key={error}>{error}</li>
                     ))}
                     </ul>
                  </div>
                )}

                {/*<div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <input id="confirm-password" type="password" placeholder="Confirm Password" required
                className="bg-[#F7F7C5] rounded-lg border border-[#d0d089] h-8 px-4" />
                </div>*/}
<SubmitButton text="Register" variant="default" />             <div className="flex flex-col gap-2">{state?.message && <p className="text-sm text-red-500">{state.message}</p>}</div>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-1">
              
              <Button variant="outline" className="w-full max-w-[400px]">

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                 <a href={`${BACKEND_URL}/auth/google/login`}> <span >Login with Google</span></a>
                </Button>
              
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href={`/login`} className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block h-full">
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/register.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
