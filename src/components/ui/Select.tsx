import { FC } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { cn, randomString } from '@/utils';

type SelectProps = {
  error?: boolean | string;
  label?: string;
  id?: string;
  name?: string;
  children: React.ReactNode;
  value: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
};

const Select: FC<SelectProps> = ({
  value,
  error,
  id,
  name,
  label,
  placeholder,
  disabled,
  children,
  className,
  onChange,
  onBlur,
}) => {
  const selectId = id || `select-${randomString()}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1 block">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            'peer h-12 w-full pl-4 pr-10 appearance-none rounded border bg-white outline-none transition-all duration-300 ease-in-out',
            'disabled:bg-slate-50 disabled:text-slate-400',
            'focus:ring-primary-500/10 focus:ring-4 focus:border-primary-400',
            error
              ? 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500/50'
              : 'border-slate-200',
            className
          )}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <HiChevronDown className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-500" />
      </div>

      {error && <p className="mt-1 text-sm text-pink-500">{error}</p>}
    </div>
  );
};

export default Select;
