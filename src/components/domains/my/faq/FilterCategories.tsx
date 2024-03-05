import { Dropdown } from '@/components/molecules';

type FilterCategoriesProps = {
  categories?: string[];
  filter: string;
  handleChange?: (value: string) => void;
};

export default function FilterCategories({ categories, filter, handleChange }: FilterCategoriesProps) {
  return (
    <Dropdown value={filter} onChange={handleChange} variant="outlined" size="big">
      {categories?.map((item) => (
        <Dropdown.Option key={item} value={item}>
          {item}
        </Dropdown.Option>
      ))}
    </Dropdown>
  );
}
