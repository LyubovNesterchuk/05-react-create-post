import css from "./SearchBox.module.css";

interface SearchBoxProps {
  // value?: string;                 // контрольований режим (опціонально)
  defaultValue?: string;          // неконтрольований режим
  onChange: (value: string) => void;
}

export default function SearchBox({ defaultValue, onChange }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search posts"
      // value={value}               //  контрольований
      defaultValue={defaultValue} //  неконтрольований
      onChange={handleChange}
    />
  );
}