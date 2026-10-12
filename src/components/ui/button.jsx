// import React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cva } from "class-variance-authority";
// import { cn } from "../../lib/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground hover:bg-primary/90",
//         destructive: "bg-destructive text-white hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2",
//         sm: "h-8 rounded-md px-3 text-xs",
//         lg: "h-10 rounded-md px-6",
//         icon: "h-9 w-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   },
// );

// const Button = React.forwardRef(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   },
// );
// Button.displayName = "Button";

// export { Button, buttonVariants };



import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-[#e8ff47]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060608]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[#e8ff47] text-[#060608] font-bold",
          "hover:bg-[#d4eb30] hover:shadow-[0_0_28px_rgba(232,255,71,0.4)]",
          "active:scale-[0.97]",
        ].join(" "),

        destructive: [
          "bg-red-500 text-white",
          "hover:bg-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]",
        ].join(" "),

        outline: [
          "border border-white/10 bg-transparent text-white/60",
          "hover:border-[#e8ff47]/40 hover:text-[#e8ff47] hover:bg-[#e8ff47]/5",
          "active:scale-[0.97]",
        ].join(" "),

        secondary: [
          "bg-white/5 border border-white/8 text-white/70",
          "hover:bg-white/10 hover:text-white",
        ].join(" "),

        ghost: [
          "bg-transparent text-white/50",
          "hover:bg-white/5 hover:text-white",
        ].join(" "),

        link: [
          "text-[#e8ff47] underline-offset-4 hover:underline bg-transparent p-0 h-auto",
        ].join(" "),
      },
      size: {
        default: "h-10 rounded-[4px] px-5 py-2 text-[11px] tracking-[0.1em] uppercase",
        sm:      "h-8  rounded-[4px] px-4 py-1.5 text-[10px] tracking-[0.1em] uppercase",
        lg:      "h-12 rounded-[4px] px-8 py-3 text-[11px] tracking-[0.12em] uppercase",
        icon:    "h-10 w-10 rounded-[4px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
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