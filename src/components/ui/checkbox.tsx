import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 flex items-center justify-center rounded border border-gray-300 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
      " p-0 dark:bg-black bg-white", // Background color when checked
      "data-[state=checked]:border-transparent", // Optional: remove border when checked
      "disabled:cursor-not-allowed disabled:opacity-50", // Disabled styling
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
      <Check className="h-4 w-4 text-black dark:text-white" /> {/* White check icon for visibility */}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
