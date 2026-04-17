import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2",
        // Prevent the first paint from looking broken during hydration.
        mounted ? "opacity-100" : "opacity-90"
      )}
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-opacity text-primary",
          mounted && !isDark ? "opacity-100" : "opacity-50"
        )}
        aria-hidden="true"
      />

      <Switch
        aria-label="Motyw"
        className="data-[state=unchecked]:bg-primary/20 data-[state=unchecked]:border-primary/20 data-[state=checked]:border-primary/40"
        checked={mounted ? isDark : false}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />

      <Moon
        className={cn(
          "h-5 w-5 transition-opacity text-foreground",
          mounted && isDark ? "opacity-100" : "opacity-50"
        )}
        aria-hidden="true"
      />
    </div>
  );
};

export default ThemeToggle;

