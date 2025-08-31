import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#5555ea] focus:ring-offset-2 rounded-lg",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#5555ea] text-white hover:bg-[#4a4ad9]",
        secondary:
          "border-transparent bg-[#f7f8fe] text-[#3f4159] hover:bg-[#e4e9ff]",
        destructive:
          "border-transparent bg-[#e9683b] text-white hover:bg-[#d85a2e]",
        outline: "text-[#3f4159] border-[#e3e4ec] bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
