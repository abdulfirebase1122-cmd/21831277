import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-white bg-emerald-500 border border-green-600 hover:border-zinc-900 hover:bg-zinc-900 hover:opacity-90 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/75 border border-zinc-200/75 hover:opacity-80 transition-all ease-in-out duration-150 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.9)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "text-[#353535] border-[1.5px] border-[#555555] hover:bg-[#353535] hover:text-[#fff]",
        ghost: "hover:bg-zinc-100 text-zinc-800",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-2 py-1",
        xs: "px-2 py-0.5 text-xs",
        sm: "px-2 py-1",
        lg: "px-2 p-1",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Falls back to standard HTML button element
    const Comp = "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
