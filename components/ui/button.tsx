import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2",
  {
    variants: {
      variant: {
        default: "bg-sky-500 text-white border-sky-500",
        secondary:
          "bg-white text-black border-black",
      },
      width: {
        default: "w-fit",
        full: "w-full",
      },
      size: {
        default: "text-md px-4 py-2",
        large: "text-xl px-5 py-3",
      },
      border: {
        default: "",
        outline:"bg-transparent border-white text-white"
      }
    },
    defaultVariants: {
      variant: "default",
      width: "default",
      size: "default",
      border: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, width, size, border, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, width, size, border, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
