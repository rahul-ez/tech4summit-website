import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge primitive — context/ui-tokens.md's Badges table exactly (Default/
 * Success/Warning/Error/Informational/Live-Event). Per context/ui-rules.md,
 * a badge is never the sole means of conveying status — pair it with text
 * or an icon at the call site.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-body text-xs font-semibold tracking-wide uppercase whitespace-nowrap [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-surface-tertiary text-text-secondary",
        success: "bg-success-light text-success",
        warning: "bg-warning-light text-warning",
        error: "bg-error-light text-error",
        info: "bg-info-light text-info",
        live: "bg-primary-muted text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant ?? "default"}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
