"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuccessButtonProps
  extends React.ComponentProps<typeof Button> {
  icon?: React.ReactNode;
  overlayClassName?: string;
}

export function SuccessButton({
  children,
  icon,
  className,
  overlayClassName,
  ...props
}: SuccessButtonProps) {
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAnimate(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Button
      {...props}
      className={cn(
        `
        relative
        overflow-hidden
        bg-card
        text-card-foreground
        transition-all
        duration-300
        hover:scale-105
        hover:cursor-not-allowed
        disabled:hover:scale-100
        disabled:hover:cursor-not-allowed
        `,
        className
      )}
    >
      {/* Circular Expansion */}
      <div
        className={cn(
          `
          absolute
          left-4
          top-1/2
          h-10
          w-10
          -translate-y-1/2
          rounded-full
          bg-primary/50
         disabled
          pointer-events-none
          z-0
          `,
          animate && "animate-success-circle",
          overlayClassName
        )}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 text-card">
        {icon}
        {children}
      </span>
    </Button>
  );
}