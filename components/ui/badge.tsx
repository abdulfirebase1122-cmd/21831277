import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-all select-none [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-emerald-600 text-white border-transparent shadow-xs",
        secondary: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
        emerald: "bg-emerald-100 text-emerald-800 border-emerald-200 font-medium",
        slate: "bg-slate-100 text-slate-700 border-slate-200 font-medium",
        urgent: "bg-rose-50 text-rose-700 border-rose-200/80 font-semibold",
        warning: "bg-amber-50 text-amber-700 border-amber-200/80 font-semibold",
        blue: "bg-sky-50 text-sky-700 border-sky-200/80 font-medium",
        outline: "border-slate-200 text-slate-600 bg-white",
        ghost: "hover:bg-slate-100 text-slate-600 border-transparent",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
