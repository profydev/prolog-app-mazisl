import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./button-new.module.scss";

export enum ButtonSize {
  small = "small",
  medium = "medium",
  large = "large",
  xlarge = "xlarge",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
  emptyError = "emptyError",
}

export enum ButtonState {
  default = "default",
  hover = "hover",
  focused = "focused",
  disabled = "disabled",
}

type ButtonProps = {
  children: ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  state?: ButtonState;
  icon?: ReactNode;
  iconPosition?: "leading" | "trailing" | "only";
  onClick?: () => void;
};

export function ButtonNew({
  children,
  size = ButtonSize.medium,
  color = ButtonColor.primary,
  state = ButtonState.default,
  icon,
  iconPosition = "leading",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[size],
        styles[color],
        styles[state],
        {
          [styles.iconLeading]: iconPosition === "leading",
          [styles.iconTrailing]: iconPosition === "trailing",
          [styles.iconOnly]: iconPosition === "only",
        },
      )}
      onClick={onClick}
      disabled={state === ButtonState.disabled}
    >
      {icon && (iconPosition === "leading" || iconPosition === "only") && (
        <span className={styles.icon}>{icon}</span>
      )}
      {iconPosition !== "only" && (
        <span className={styles.text}>{children}</span>
      )}
      {icon && iconPosition === "trailing" && (
        <span className={styles.icon}>{icon}</span>
      )}
    </button>
  );
}
