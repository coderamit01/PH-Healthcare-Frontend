import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type AppSubmitProps = {
  isPending: boolean;
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  disabled?: boolean;
};

export const AppSubmit = ({
  isPending,
  children,
  pendingLabel = "Submiting...",
  className,
  disabled = false,
}: AppSubmitProps) => {
  const isDisabled = disabled || isPending;
  return (
    <div>
      <Button
        type="submit"
        disabled={isDisabled}
        className={cn("w-100", className)}
      >
        {children ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true">
              {pendingLabel ? pendingLabel : children}
            </Loader2>
          </>
        ) : (
          children
        )}
      </Button>
    </div>
  );
};
