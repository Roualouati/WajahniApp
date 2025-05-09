"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom"
import { signIn } from "@/lib/auth"
import { BACKEND_URL } from "@/lib/constants";
import Link from "next/link";
import { SubmitButton } from "./SubmitBotton";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state,action]=useFormState(signIn,undefined)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden h-full">
        <CardContent className="grid p-0 md:grid-cols-2 h-full">
         
          <div className="relative hidden bg-muted md:block h-full">
            <img
               src="/signin.jpg" 

              alt="Image"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <form className="p-6 md:p-8" action={action}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your <span className="text-[#f9ad08] font-bold">Wajahni</span> account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  type="email"
                  placeholder="Name@example.com"
                  required
                  name="email"
                  className="bg-[#F7F7C5] rounded-lg border border-[#d0d089] h-12 px-4"/>
              </div>
              {state?.error?.email && ( <p className="text-sm text-red-500">{state.error.email}</p>)}

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                 
                </div>
                <input id="password" type="password" name="password" placeholder="your password" required className="bg-[#F7F7C5] rounded-lg border border-[#d0d089] h-12 px-4" />
                <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>

                </div>
                {state?.error?.password && ( <p className="text-sm text-red-500">{state.error.password}</p>)}

                
                <SubmitButton text="Sign in" variant="default" />              <div className="flex flex-col gap-2">{state?.message && <p className="text-sm text-red-500">{state.message}</p>}</div>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-1">
              <Link href={`${BACKEND_URL}/auth/google/login`}>
              <Button variant="outline" className="w-full max-w-[400px]">

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                 <span >Login with Google</span>
                </Button>
                </Link>
              </div>
              <div className="text-center text-sm">
               Don't have an account?{" "}
                <a href={`/register`} className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
