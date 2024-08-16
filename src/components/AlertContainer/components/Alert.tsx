import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VariantProps, cva } from 'class-variance-authority';
import { HiXMark } from 'react-icons/hi2';
import { cn } from '@/utils';
import useBoundStore from '@/store/useBoundStore';

type Props = VariantProps<typeof alertVariants> & {
  id: number;
  title?: string;
  message?: string;
  shouldClose?: boolean;
  timeToClose?: number;
  IconComponent?: FC<{ className?: string }>;
  variant?: 'success' | 'error' | 'info' | 'warning';
};

const alertVariants = cva(
  'pointer-events-auto flex w-full items-start rounded-lg px-6 py-4 shadow-lg shadow-black/15',
  {
    variants: {
      variant: {
        success: ' bg-green-100 text-green-600',
        error: 'bg-pink-100 text-pink-600',
        info: 'bg-blue-100 text-blue-600',
        warning: 'bg-yellow-100 text-yellow-600',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const Alert: FC<Props> = ({
  id,
  title,
  message,
  IconComponent,
  variant,
  shouldClose = false,
  timeToClose = 0,
}) => {
  const removeAlert = useBoundStore((state) => state.removeAlert);
  const [isVisible, setIsVisible] = useState(true);
  const animationDuration = 300;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => removeAlert(id), animationDuration);
  };

  useEffect(() => {
    if (shouldClose && timeToClose && timeToClose > 0) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => removeAlert(id), animationDuration);
      }, timeToClose);

      return () => clearTimeout(timeout);
    }
  }, [shouldClose, timeToClose, id, removeAlert]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(alertVariants({ variant }))}
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ ease: 'easeOut', duration: animationDuration / 1000 }}
          layout
        >
          {IconComponent && <IconComponent className="-ms-1.5 mr-2 mt-0.5 size-6 min-w-6" />}
          <span className="sr-only">{variant}</span>
          <p className="text-lg">
            <span className="font-medium">{title}</span> {message}
          </p>
          {shouldClose && (
            <button type="button" className="ml-auto" onClick={handleClose} aria-label="Close">
              <HiXMark className="size-7" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
