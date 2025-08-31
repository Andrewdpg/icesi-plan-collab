import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5555ea] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-[#5555ea] text-white hover:bg-[#4a4ad9] shadow-sm",
        destructive:
          "bg-[#e9683b] text-white hover:bg-[#d85a2e] shadow-sm",
        outline:
          "border border-[#e3e4ec] bg-white text-[#3f4159] hover:bg-[#e4e9ff] hover:border-[#5555ea] shadow-sm",
        secondary:
          "bg-[#f7f8fe] text-[#3f4159] hover:bg-[#e4e9ff] shadow-sm",
        ghost: "hover:bg-[#e4e9ff] hover:text-[#5555ea] text-[#3f4159]",
        link: "text-[#5555ea] underline-offset-4 hover:underline",
        success: "bg-[#4fb37b] text-white hover:bg-[#45a06f] shadow-sm",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
