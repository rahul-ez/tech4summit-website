import * as React from "react"

import { cn } from "@/lib/utils"

/** Textarea primitive — same visual shell as Input, vertical resize only. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "focus-ring flex min-h-24 w-full resize-y rounded-md border border-border bg-surface px-4 py-3 font-body text-sm text-text-primary transition-colors placeholder:text-text-muted disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted disabled:text-text-muted aria-invalid:border-error",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
