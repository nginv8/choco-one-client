import { FC } from 'react';
import { cn, randomString } from '@/utils';

type TextareaProps = {
  error?: boolean | string;
  label?: string;
  id?: string;
  name?: string;
  value: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const Textarea: FC<TextareaProps> = ({
  value,
  error,
  id,
  name,
  label,
  placeholder,
  disabled,
  className,
  onChange,
  onBlur,
}) => {
  const textareaId = id || `textarea-${randomString()}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="mb-1 block">
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          id={textareaId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'peer w-full border p-4 rounded bg-white outline-none transition-all duration-300 ease-in-out resize-none',
            'disabled:bg-slate-50 disabled:text-slate-400',
            'focus:ring-primary-500/10 focus:ring-4 focus:border-primary-400',
            error
              ? 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500/50'
              : 'border-slate-200',
            className
          )}
          rows={5}
        />
      </div>

      {error && <p className="mt-1 text-sm text-pink-500">{error}</p>}
    </div>
  );
};

export default Textarea;
