import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "cyan";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-soft shadow-soft focus-visible:ring-cyan bg-gradient-to-r from-navy to-navy-soft",
  cyan: "bg-cyan text-navy hover:brightness-105 shadow-glow font-semibold",
  outline: "border border-navy/20 text-navy bg-white/60 hover:bg-navy/5 backdrop-blur",
  ghost: "text-navy hover:bg-navy/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "outline",
  size = "md",
  className,
  href,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  href: string;
  children: ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? (
        <span
          className={cn(
            "inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase",
            invert ? "bg-white/10 text-cyan" : "bg-navy/5 text-navy/70",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-3xl font-extrabold text-balance md:text-5xl",
          invert ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-4 text-base leading-relaxed", invert ? "text-white/70" : "text-muted-foreground")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
