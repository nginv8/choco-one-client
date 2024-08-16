import { useState } from 'react';

type UseCountInputType = (
  initialValue: number,
  min?: number | null,
  max?: number | null
) => {
  value: number;
  setNewValue: (newValue: number) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const useCountInput: UseCountInputType = (initialValue, min = null, max = null) => {
  const [value, setValue] = useState<number>(initialValue);

  const setNewValue = (newValue: number) => {
    if (min && newValue < min) setValue(min);
    else if (max && newValue > max) setValue(max);
    else setValue(newValue);
  };

  const handleIncrement = () => {
    if (max && value >= max) return;
    setValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (min && value <= min) return;
    setValue((prev) => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = +e.target.value;
    if (max && newCount > max) setValue(max);
    else if (min && newCount <= min) setValue(min);
    else setValue(newCount);
  };

  return {
    value,
    setNewValue,
    handleIncrement,
    handleDecrement,
    handleChange,
  };
};

export default useCountInput;
