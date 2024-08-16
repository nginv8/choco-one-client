import { FC, InputHTMLAttributes } from 'react';
import { randomString } from '@/utils';

type Props = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  name?: string;
  error?: string;
};

const Checkbox: FC<Props> = ({
  className,
  children,
  name,
  disabled = false,
  checked = false,
  error,
  onChange,
}) => {
  const checkboxId = `checkbox-${randomString()}`;

  return (
    <div>
      <label htmlFor={checkboxId} className="flex select-none items-center gap-2">
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          className={`size-4 appearance-none rounded border bg-white bg-contain bg-center bg-no-repeat p-1 text-primary-400 checked:bg-primary-400 checked:bg-check focus:border-transparent focus:ring focus:ring-primary-500/50 focus:ring-offset-0 disabled:bg-slate-100 disabled:checked:bg-slate-400 ${className}`}
        />
        {children}
      </label>
      {error && <p className="text-sm text-pink-500">{error}</p>}
    </div>
  );
};

export default Checkbox;
