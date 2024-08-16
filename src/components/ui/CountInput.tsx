import { FC } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { randomString } from '@/utils';

type Props = {
  value: number;
  onClickUp: React.MouseEventHandler<HTMLButtonElement>;
  onClickDown: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  error?: string;
};

const CountInput: FC<Props> = ({ value, onClickUp, onClickDown, onChange, label, error }) => {
  const inputId = `count-input-${randomString()}`;
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
      )}

      <div className="inline-flex h-12 rounded bg-white shadow">
        <input
          className="w-12 appearance-none  border-none bg-transparent p-1 text-center text-lg text-gray-400 focus:border-none focus:outline-none focus:ring-0"
          id={inputId}
          type="number"
          inputMode="numeric"
          value={value}
          onChange={onChange}
        />

        <div className="flex w-5 flex-col justify-between">
          <button
            className="text-primary-400 hover:text-primary-500"
            type="button"
            onClick={onClickUp}
            aria-label="Increce"
          >
            <HiChevronUp className="size-5" />
          </button>
          <button
            className="text-primary-400 hover:text-primary-500"
            type="button"
            onClick={onClickDown}
            aria-label="Increce"
          >
            <HiChevronDown className="size-5" />
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-pink-500">{error}</p>}
    </div>
  );
};

export default CountInput;
