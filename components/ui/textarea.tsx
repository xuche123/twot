import * as React from "react"

import { cn } from "@/lib/utils"
// 

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-32 w-full rounded-md border-2 border-neutral-800 outline-none bg-transparent p-4 text-lg disabled:cursor-not-allowed disabled:opacity-50 text-white focus:border-sky-500 focus:border-2 transition",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
