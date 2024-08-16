import { useState, useEffect } from 'react';
import { useCategories } from '@/hooks';
import { Button } from './ui';
import { ProductCategoryType } from '@/types';
import { cn } from '@/utils';

type CategoriesProps = {
  onSelectedCategoriesChange: (categories: number[]) => void;
};

const Categories = ({ onSelectedCategoriesChange }: CategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
  const { error, data } = useCategories();

  const toggleSelectedCategory = (category: ProductCategoryType) => {
    const updatedCategories = selectedCategory.includes(category.id)
      ? selectedCategory.filter((selected) => selected !== category.id)
      : [...selectedCategory, category.id];

    setSelectedCategory(updatedCategories);
  };

  useEffect(() => {
    onSelectedCategoriesChange(selectedCategory);
  }, [selectedCategory, onSelectedCategoriesChange]);

  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
      {error && null}

      {data &&
        data.data.map((category) => (
          <Button
            key={category.id}
            variant="secondary"
            size="button-sm"
            label="Category"
            shape="pill"
            onClick={() => toggleSelectedCategory(category)}
            className={`relative pl-8 ${selectedCategory.includes(category.id) ? '' : ''}`}
          >
            <span
              className={cn(
                'absolute left-3 top-1/2 size-3 -translate-y-1/2 rounded-full transition-colors duration-200',
                selectedCategory.includes(category.id) ? 'bg-primary-400' : 'bg-gray-200'
              )}
            />
            {category.name}
          </Button>
        ))}
    </div>
  );
};

export default Categories;
