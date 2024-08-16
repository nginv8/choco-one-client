import { FC, SVGProps } from 'react';
import { cn } from '@/utils';

type Props = {
  IconComponent: FC<SVGProps<SVGSVGElement>>;
  text: string;
  isActive?: boolean;
  onClick: () => void;
};

const TabItem: FC<Props> = ({ IconComponent, text, onClick, isActive = false }) => (
  <li className="border-b border-gray-200 last:border-none">
    <button
      className={cn(
        'size-full flex cursor-pointer items-center gap-2 p-2 text-lg transition-colors duration-300 hover:text-primary-400',
        isActive ? 'text-primary-400 font-semibold' : ''
      )}
      onClick={onClick}
    >
      <IconComponent className="pointer-events-none size-5 text-primary-400" />
      <span>{text}</span>
    </button>
  </li>
);

export default TabItem;
