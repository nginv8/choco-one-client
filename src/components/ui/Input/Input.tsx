import { FC, useState } from 'react';
import { VariantProps } from 'class-variance-authority';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import inputVariants from './inputVariants';
import { cn, randomString } from '@/utils';

type Props = VariantProps<typeof inputVariants> & {
  type: 'text' | 'email' | 'password' | 'number';
  IconComponent?: FC<{ className?: string }>;
  error?: boolean | string;
  label?: string;
  id?: string;
  name?: string;
  children?: React.ReactNode;
  value: string;
  placeholder?: string;
  autocomplete?: string;
  className?: string;
  iconPosition?: 'start' | 'end';
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({
  type,
  value,
  error,
  id,
  name,
  label,
  placeholder,
  autocomplete,
  state,
  disabled,
  children,

  className,
  variant,
  shape,
  iconPosition,
  IconComponent,
  onChange,
  onBlur,
}) => {
  const inputId = id || `input-${randomString()}`;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 inline-block">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={inputType}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autocomplete}
          disabled={disabled}
          className={cn(
            inputVariants({
              variant,
              shape,
              iconPosition,
              state: error ? 'invalid' : state,
            }),
            type === 'password' ? 'pr-12' : '',
            className
          )}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={cn(
              'absolute right-0 z-10 h-full px-4 text-xl text-slate-400 peer-focus:text-blue-400',
              error ? 'text-pink-500 peer-focus:text-pink-500' : ''
            )}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}

        {IconComponent && (
          <IconComponent
            className={cn(
              'pointer-events-none absolute z-10 mx-4 size-6 text-2xl text-slate-400 peer-focus:text-blue-400',
              iconPosition === 'end' ? 'right-0' : '',
              error ? 'text-pink-500 peer-focus:text-pink-500' : ''
            )}
          />
        )}

        {children}
      </div>

      {error && <p className="mt-1 text-sm text-pink-500">{error}</p>}
    </div>
  );
};

export default Input;
