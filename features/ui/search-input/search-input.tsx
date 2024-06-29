import { useState } from "react";
import classNames from "classnames";
import styles from "./search-input.module.scss";

interface SearchInputProps {
  placeholder?: string;
  disabled?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  disabled = false,
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const inputClass = classNames(styles.input, {
    [styles.focused]: isFocused,
    [styles.filled]: value.length > 0,
    [styles.disabled]: disabled,
  });

  return (
    <div className={styles.searchInput}>
      <input
        type="text"
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <span className={styles.icon}>🔍</span>
    </div>
  );
};
