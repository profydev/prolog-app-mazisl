import { useState } from "react";
import classNames from "classnames";
import styles from "./select.module.scss";

export enum SelectState {
  empty = "empty",
  filled = "filled",
  focused = "focused",
  open = "open",
  disabled = "disabled",
}

type SelectProps = {
  label?: string;
  placeholder: string;
  options: string[];
  state?: SelectState;
  onChange?: (value: string) => void;
};

export function Select({
  label,
  placeholder,
  options,
  state = SelectState.empty,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectClick = () => {
    if (state !== SelectState.disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className={styles.selectWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={classNames(
          styles.select,
          styles[state],
          { [styles.open]: isOpen },
          { [styles.filled]: selectedValue },
        )}
        tabIndex={0}
        onClick={handleSelectClick}
      >
        <span className={styles.selectedValue}>
          {selectedValue || placeholder}
        </span>
        <span className={classNames(styles.arrow, { [styles.up]: isOpen })} />
      </div>

      {isOpen && (
        <ul className={styles.options}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
