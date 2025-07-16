import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseStyles = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-card-hover hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-white text-surface-700 border border-surface-300 hover:bg-surface-50 hover:border-surface-400 hover:scale-[1.02] active:scale-[0.98]",
    ghost: "text-surface-600 hover:bg-surface-200 hover:text-surface-800",
    accent: "bg-gradient-accent text-white hover:shadow-card-hover hover:scale-[1.02] active:scale-[0.98]"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;