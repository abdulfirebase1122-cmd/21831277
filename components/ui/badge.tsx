import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 px-2.5 py-0.5 whitespace-nowrap rounded-full text-xs font-medium ring-offset-background transition-colors select-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "text-white bg-emerald-500 border border-green-600 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
        secondary:
          "bg-zinc-100 text-zinc-900 border border-zinc-200/75 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.9)]",
        success:
          "text-white bg-emerald-500 border border-green-600 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
        emerald:
          "text-white bg-emerald-500 border border-green-600 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
        slate:
          "bg-zinc-100 text-zinc-900 border border-zinc-200/75 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.9)]",
        urgent:
          "text-white bg-rose-500 border border-rose-600 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
        warning:
          "text-white bg-amber-500 border border-amber-600 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
        blue:
          "text-white bg-sky-500 border border-sky-600 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
        destructive:
          "text-white bg-rose-500 border border-rose-600 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
        outline:
          "text-[#353535] border-[1.5px] border-[#555555] bg-transparent",
        ghost:
          "hover:bg-zinc-100 text-zinc-800 border border-transparent",
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

