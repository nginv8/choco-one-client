import { FC, InputHTMLAttributes } from 'react';

type Props = {
  name: string;
  id: string;
  checked: boolean;
  onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
  children: React.ReactNode;
  key?: string;
};

const RadioButton: FC<Props> = ({ name, id, checked, onChange, children, key }) => {
  const setName = name.replace(' ', '-');
  const optionName = id.replace(' ', '-');
  return (
    <div key={key}>
      <input
        className="peer sr-only"
        type="radio"
        name={setName}
        id={optionName}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={optionName}
        className="flex h-10 min-w-16 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-primary-400"
      >
        {children}
      </label>
    </div>
  );
};

export default RadioButton;
