import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Card primitive — context/ui-tokens.md's Cards component tokens and
 * context/ui-rules.md's Cards table (5 variants: Standard, Interactive,
 * Featured, Informational, Status). Featured's border-glow is reserved for
 * the 1st-place prize card (see context/ui-registry.md); Status uses a
 * `status` prop to pick the matching semantic `-light`/base token pair.
 */
const cardVariants = cva("rounded-lg", {
  variants: {
    variant: {
      standard: "border border-border bg-surface-secondary p-6",
      interactive:
        "border border-border bg-surface-secondary p-6 transition-colors hover:border-border-light",
      featured: "border border-primary bg-surface-secondary p-6 shadow-glow-primary",
      informational: "border border-border bg-surface-secondary p-4",
      status: "border p-4",
    },
    status: {
      success: "border-success bg-success-light",
      warning: "border-warning bg-warning-light",
      error: "border-error bg-error-light",
      info: "border-info bg-info-light",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
})

export interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, status, ...props }: CardProps) {
  const resolvedStatus = variant === "status" ? (status ?? "info") : undefined

  return (
    <div
      data-slot="card"
      data-variant={variant ?? "standard"}
      className={cn(cardVariants({ variant, status: resolvedStatus }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-display text-base font-semibold text-text-primary", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-text-secondary", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("mt-4", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("mt-4 flex items-center border-t border-border pt-4", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
