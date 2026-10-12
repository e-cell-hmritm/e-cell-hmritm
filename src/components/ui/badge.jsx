// import React from "react";
// import { cva } from "class-variance-authority";
// import { cn } from "../../lib/utils";

// const badgeVariants = cva(
//   "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors overflow-hidden",
//   {
//     variants: {
//       variant: {
//         default: "border-transparent bg-primary text-primary-foreground",
//         secondary: "border-transparent bg-secondary text-secondary-foreground",
//         destructive: "border-transparent bg-destructive text-white",
//         outline: "text-foreground",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   },
// );

// const Badge = React.forwardRef(({ className, variant, ...props }, ref) => {
//   return (
//     <span
//       ref={ref}
//       className={cn(badgeVariants({ variant }), className)}
//       {...props}
//     />
//   );
// });
// Badge.displayName = "Badge";

// export { Badge, badgeVariants };



import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 w-fit whitespace-nowrap shrink-0",
    "rounded-[4px] border px-3 py-1",
    "text-[10px] font-semibold tracking-[0.15em] uppercase",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
    "transition-colors duration-200 overflow-hidden select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[#e8ff47] border-transparent text-[#060608]",
        ].join(" "),

        secondary: [
          "bg-white/5 border-white/10 text-white/50",
          "hover:bg-white/8 hover:border-white/18 hover:text-white/70",
        ].join(" "),

        destructive: [
          "bg-red-500/15 border-red-500/30 text-red-400",
        ].join(" "),

        outline: [
          "bg-transparent border-white/15 text-white/60",
          "hover:border-white/30 hover:text-white/80",
        ].join(" "),

        // Extra semantic variants useful for the hero
        lime: [
          "bg-[#e8ff47]/10 border-[#e8ff47]/30 text-[#e8ff47]",
        ].join(" "),

        cyan: [
          "bg-[#00e5ff]/10 border-[#00e5ff]/25 text-[#00e5ff]",
        ].join(" "),

        purple: [
          "bg-[#a259ff]/10 border-[#a259ff]/25 text-[#a259ff]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge, badgeVariants };