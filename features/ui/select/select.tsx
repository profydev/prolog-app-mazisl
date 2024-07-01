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

const RESET_VALUE = "SELECT_RESET_OPTION_VALUE" as const;

export function Select({
  label,
  placeholder,
  options,
  state = SelectState.empty,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    string | typeof RESET_VALUE
  >(RESET_VALUE);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    if (state !== SelectState.disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (value: string | typeof RESET_VALUE) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) onChange(value === RESET_VALUE ? "" : value);
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
          { [styles.filled]: selectedValue !== RESET_VALUE },
        )}
        tabIndex={0}
        onClick={handleSelectClick}
      >
        <span className={styles.selectedValue}>
          {/* {options.find((option) => option.value === selectedValue)?.label ||
            placeholder} */}
          {selectedValue === RESET_VALUE
            ? placeholder
            : options.find((option) => option.value === selectedValue)?.label}
        </span>
        <span className={classNames(styles.arrow, { [styles.up]: isOpen })} />
      </div>

      {isOpen && (
        <ul className={styles.options}>
          <li
            className={classNames(styles.option, styles.resetOption)}
            onClick={() => handleOptionClick(RESET_VALUE)}
          >
            All
          </li>
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
