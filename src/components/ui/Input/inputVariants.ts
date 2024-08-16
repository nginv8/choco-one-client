import { cva } from 'class-variance-authority';

const inputVariants = cva(
  [
    'peer',
    'h-12',
    'w-full',
    'border',
    'bg-white',
    'outline-none',
    'transition-all',
    'duration-300',
    'ease-in-out',

    'disabled:bg-slate-50',
    'disabled:text-slate-400',

    'focus:ring-blue-500/10',
    'focus:ring-4',
    'focus:border-blue-400',
  ],
  {
    variants: {
      variant: {
        borderless: 'border-white',
        bordered: 'border-slate-200',
      },
      state: {
        valid: '',
        invalid: 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500/50',
      },
      shape: {
        roundedStart: 'rounded-r border-l-0 focus:border-l-0',
        roundedEnd: 'rounded-l border-r-0 focus:border-r-0',
        rounded: 'rounded',
      },
      iconPosition: {
        start: 'pl-14 pr-4',
        end: 'pl-4 pr-14',
        none: 'px-4',
      },
    },
    defaultVariants: {
      variant: 'bordered',
      shape: 'rounded',
      iconPosition: 'none',
      state: 'valid',
    },
  }
);

export default inputVariants;
