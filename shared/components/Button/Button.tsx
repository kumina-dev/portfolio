import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

type ButtonProps =
  | (CommonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
      })
  | (CommonProps &
      AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      });

export function Button(props: ButtonProps) {
  const className = [
    styles.button,
    props.variant === "secondary" ? styles.secondary : styles.primary,
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { children, variant: _variant, className: _className, ...rest } = props;
    return (
      <a {...rest} className={className}>
        {children}
      </a>
    );
  }

  const { children, variant: _variant, className: _className, ...rest } = props;
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}