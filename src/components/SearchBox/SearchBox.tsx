import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchQuery?: string;          
  onChange: (value: string) => void;
}

export default function SearchBox({ searchQuery, onChange }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search posts"
      // value={searchPost}               //  контрольований
      defaultValue={searchQuery} //  неконтрольований
      onChange={handleChange}
    />
  );
}