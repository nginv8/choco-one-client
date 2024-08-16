import { useState, useMemo, useCallback } from 'react';
import { ProductType } from '@/types';
import { toDecimal, decimalToNumber } from '@/utils';

const useProductOptions = (initialOptions: ProductType['optionSets'] | null) => {
  const [selectedOptions, setSelectedOptions] = useState<ProductType['optionSets'] | null>(
    initialOptions
      ? initialOptions.map((set) => ({
          ...set,
          options: set.options.map((option, i) => ({
            ...option,
            selected: set.options.some((opt) => opt.selected) ? option.selected : i === 0,
          })),
        }))
      : null
  );

  const calculatePrice = useCallback((options: ProductType['optionSets'] | null) => {
    if (!options) return 0;
    return options.reduce((total, set) => {
      const selectedOption = set.options.find((option) => option.selected);
      return decimalToNumber(
        toDecimal(total).plus(toDecimal(selectedOption ? selectedOption.price : 0))
      );
    }, 0);
  }, []);

  const optionsPrice = useMemo(
    () => calculatePrice(selectedOptions),
    [selectedOptions, calculatePrice]
  );

  const handleOptionChange = (setIndex: number, optionIndex: number) => {
    if (!selectedOptions) return;
    const updatedOptions = selectedOptions.map((set, i) => ({
      ...set,
      options: set.options.map((option, j) => ({
        ...option,
        selected: i === setIndex ? j === optionIndex : option.selected,
      })),
    }));
    setSelectedOptions(updatedOptions);
  };

  return { selectedOptions, handleOptionChange, optionsPrice };
};

export default useProductOptions;
