import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold shadow-sm",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
    "disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-700",
        destructive:
          "bg-rose-700 text-white hover:bg-rose-800 active:bg-rose-900",
        outline:
          "border border-zinc-700 bg-transparent text-white hover:bg-zinc-900/90",
        secondary:
          "bg-zinc-700 text-white hover:bg-zinc-600 active:bg-zinc-500",
        ghost:
          "bg-transparent text-white hover:bg-zinc-800/70",
        link:
          "text-blue-400 p-0 bg-transparent underline underline-offset-4 hover:text-blue-300",
      },
      size: {
        default: "h-10 px-5 py-2 text-base",
        sm: "h-8 px-3 text-sm rounded-md",
        lg: "h-12 px-8 text-lg rounded-xl",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };