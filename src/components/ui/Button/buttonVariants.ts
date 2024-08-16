import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 transition-all duration-300 ',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-400 font-bold uppercase tracking-wider text-white hover:bg-primary-500 disabled:bg-primary-300',
        outline:
          'font-bold uppercase tracking-wider text-primary-400 outline outline-2 -outline-offset-2 outline-primary-400 hover:bg-primary-400 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:outline-gray-200',
        secondary:
          'bg-white text-primary-400 shadow hover:shadow-lg disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-sm disabled:hover:shadow-sm',
      },
      size: {
        'button-sm': 'min-h-8 gap-1 px-4 py-1.5 text-sm tracking-wide',
        'button-md': 'min-h-10 px-6 py-2',
        'button-lg': 'min-h-12 px-6 py-2.5 text-lg',
        'icon-sm': 'size-8 p-1 text-sm tracking-wide',
        'icon-md': 'size-10 p-1.5',
        'icon-lg': 'size-12 p-2 text-lg',
      },
      shape: {
        rounded: 'rounded',
        roundedStart: 'rounded-r',
        roundedEnd: 'rounded-l',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'button-sm',
      shape: 'rounded',
    },
  }
);

export default buttonVariants;
