import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import styles from "./select.module.scss";

export enum SelectState {
  empty = "empty",
  filled = "filled",
  focused = "focused",
  open = "open",
  disabled = "disabled",
}

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  placeholder: string;
  options: Option[];
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

  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
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
          {options.find((option) => option.value === selectedValue)?.label ||
            placeholder}
        </span>
        <span className={classNames(styles.arrow, { [styles.up]: isOpen })} />
      </div>

      {isOpen && (
        <ul className={styles.options}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.option}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
