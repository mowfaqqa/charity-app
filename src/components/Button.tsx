import clsx from "clsx";
import React from "react";

export interface ButtonProps {
  variant?: keyof typeof ButtonVariantClass;
  prefix?: import("react").ReactNode;
  suffix?: import("react").ReactNode;
  [x: string]: any;
}

export const Button4 = React.forwardRef(function Button4(
  props: ButtonProps,
  ref: any
) {
  const { className, variant, prefix, suffix, children, ...rest } = props;

  return (
    <button
      ref={ref}
      className={clsx("button", ButtonVariantClass[variant!], className)}
      {...rest}
    >
      {prefix}
      {children}
      {suffix}
    </button>
  );
});

export default Button4;

const ButtonVariantClass: any = {
    danger: "button-danger",
    primary: "button-primary",
    tertiary: "button-tertiary",
    secondary: "button-secondary",
    "danger-tertiary": "button-danger-tertiary",
  };