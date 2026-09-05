"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * RadioGroup primitive — context/ui-tokens.md's Checkboxes/Radios tokens.
 * Radix's RadioGroup.Root renders the ARIA radiogroup pattern context/
 * ui-registry.md requires; wrap with a real <fieldset>/<legend> at the Form
 * Field call site for the fully labeled group.
 */
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "focus-ring aspect-square size-4 shrink-0 rounded-full border border-border bg-surface transition-colors disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-error data-checked:border-primary data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex h-full items-center justify-center">
        <span className="size-1.5 rounded-full bg-primary-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
