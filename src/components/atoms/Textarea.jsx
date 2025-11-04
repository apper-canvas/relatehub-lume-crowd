import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className,
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-2 text-base border rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-vertical min-h-[100px]";
  const errorStyles = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300";
  
  return (
    <textarea
      ref={ref}
      className={cn(baseStyles, errorStyles, className)}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;