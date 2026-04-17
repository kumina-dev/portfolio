import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

type ButtonElementProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorElementProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonElementProps | AnchorElementProps;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const className = [
    styles.button,
    variant === "secondary" ? styles.secondary : styles.primary,
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const {
      children,
      variant: _variant,
      className: _className,
      href,
      ...rest
    } = props as AnchorElementProps;
    void _variant;
    void _className;
    return (
      <a {...rest} href={href} className={className}>
        {children}
      </a>
    );
  }

  const {
    children,
    variant: _variant,
    className: _className,
    type = "button",
    ...rest
  } = props as ButtonElementProps;
  void _variant;
  void _className;
  return (
    <button {...rest} type={type} className={className}>
      {children}
    </button>
  );
}
