import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "./search-input.module.scss";

interface SearchInputProps {
  label: string;
  searchValue: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchInput = ({
  label,
  searchValue,
  handleSearchChange,
  placeholder,
  disabled,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const searchIconWidth = 16;

  const inputClass = classNames(styles.input, {
    [styles.focused]: isFocused,
    [styles.filled]: searchValue.length > 0,
    [styles.disabled]: disabled,
  });

  return (
    <div className={styles.searchInput}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type="text"
        className={inputClass}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />

      <Image
        className={styles.icon}
        src="/icons/search-icon.svg"
        alt="search icon"
        width={searchIconWidth}
        height={searchIconWidth}
      />
    </div>
  );
};
