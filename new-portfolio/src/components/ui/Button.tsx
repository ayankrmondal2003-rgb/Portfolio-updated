import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";

type StyleProps = { variant?: "primary" | "secondary" };
export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button
      className={cn("button", `button--${variant}`, className)}
      {...props}
    />
  );
}
export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"a"> & StyleProps) {
  return (
    <a className={cn("button", `button--${variant}`, className)} {...props} />
  );
}
