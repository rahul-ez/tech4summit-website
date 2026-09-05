import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input primitive — context/ui-tokens.md's Inputs component tokens.
 * Error state is driven by `aria-invalid`, matching context/ui-rules.md's
 * Forms section (border switches to `error`, helper text follows suit at
 * the Form Field level).
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "focus-ring flex h-10 w-full min-w-0 rounded-md border border-border bg-surface px-4 py-3 font-body text-sm text-text-primary transition-colors placeholder:text-text-muted disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted disabled:text-text-muted aria-invalid:border-error",
        className
      )}
      {...props}
    />
  )
}

export { Input }
