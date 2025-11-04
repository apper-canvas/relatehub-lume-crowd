import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-2 text-base border rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary";
  const errorStyles = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300";
  
  return (
    <input
      ref={ref}
      type={type}
      className={cn(baseStyles, errorStyles, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;