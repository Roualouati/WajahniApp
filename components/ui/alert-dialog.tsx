"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sparkles, X } from "lucide-react"

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "transition-all duration-500 ease-in-out",
      className
    )}
    {...props}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "bg-background border border-[#F0A90B]/20 dark:border-[#F0A90B]/30 rounded-2xl shadow-2xl",
        "p-6 duration-300",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "ring-1 ring-[#F0A90B]/10 dark:ring-[#F0A90B]/20",
        "transform-gpu", // For smoother animations
        className
      )}
      {...props}
    >
      {children}
      <AlertDialogPrimitive.Cancel
        className={cn(
          "absolute right-4 top-4 rounded-full p-1 opacity-70 ring-offset-background transition-all",
          "hover:opacity-100 hover:bg-[#F0A90B]/10 focus:outline-none focus:ring-2 focus:ring-[#F0A90B] focus:ring-offset-2",
          "disabled:pointer-events-none text-[#F0A90B] hover:text-[#F0A90B]/90",
          "duration-200 ease-in-out"
        )}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </AlertDialogPrimitive.Cancel>
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      "pb-4",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3",
      "mt-6 pt-4",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-2xl font-bold text-foreground",
      "flex items-center gap-3",
      "bg-gradient-to-r from-[#F0A90B] to-[#FFD700] bg-clip-text text-transparent", // Gradient text
      className
    )}
    {...props}
    > <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
    {props.children}
    
  </AlertDialogPrimitive.Title>
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-base text-muted-foreground",
      "mt-3 leading-relaxed",
      "max-w-prose", // Better text width for readability
      className
    )}
    {...props}
  />
))
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      buttonVariants({ variant: "default" }),
      "bg-gradient-to-r from-[#F0A90B] to-[#FFD700] text-white",
      "hover:shadow-lg hover:from-[#F0A90B]/90 hover:to-[#FFD700]/90",
      "focus:ring-2 focus:ring-[#F0A90B] focus:ring-offset-2",
      "transition-all duration-300 ease-in-out transform hover:-translate-y-0.5",
      "shadow-md hover:shadow-[#F0A90B]/30",
      "px-6 py-3 rounded-xl font-semibold",
      className
    )}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      "border-[#F0A90B]/40 text-[#F0A90B] hover:bg-[#F0A90B]/10",
      "focus:ring-2 focus:ring-[#F0A90B] focus:ring-offset-2",
      "transition-all duration-300 ease-in-out",
      "px-6 py-3 rounded-xl font-medium",
      "hover:border-[#F0A90B]/60",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}