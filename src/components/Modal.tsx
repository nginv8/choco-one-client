import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLargeLine } from 'react-icons/ri';
import { preventAppScroll } from '@/utils';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
  contentLabel: string;
  labelledby?: string;
  describedby?: string;
  testId?: string;
  ariaHideApp?: boolean;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
  preventScroll?: boolean;
  afterOpen?: () => void;
  onRequestClose?: () => void;
  afterClose?: () => void;
};

const Modal: FC<Props> = ({
  isOpen,
  children,
  title,
  contentLabel,
  labelledby = 'modal',
  describedby = 'modal',
  testId,
  ariaHideApp = false,
  shouldCloseOnOverlayClick = false,
  shouldCloseOnEsc = false,
  preventScroll = false,
  afterOpen,
  onRequestClose,
  afterClose,
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const closeHandler = () => {
    if (onRequestClose) onRequestClose();
  };

  const overlayClick = (event: React.MouseEvent) => {
    if (shouldCloseOnOverlayClick && event.target === event.currentTarget) closeHandler();
  };

  useEffect(() => {
    const modalRoot = document.getElementById('modal-portal');
    setContainer(modalRoot);
  }, []);

  useEffect(() => {
    if (isOpen && afterOpen) afterOpen();
  }, [isOpen, afterOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shouldCloseOnEsc && event.key === 'Escape') closeHandler();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, shouldCloseOnEsc, closeHandler]);

  useEffect(() => {
    const rootElement = document.getElementById('root');

    if (ariaHideApp && rootElement) {
      rootElement.setAttribute('aria-hidden', isOpen.toString());
    }
    return () => {
      if (ariaHideApp && rootElement) {
        rootElement.removeAttribute('aria-hidden');
      }
    };
  }, [isOpen, ariaHideApp]);

  useEffect(() => {
    if (isOpen && preventScroll) preventAppScroll(true);
  }, [isOpen, preventScroll]);

  if (!container) {
    return null;
  }

  return createPortal(
    <AnimatePresence
      onExitComplete={() => {
        preventAppScroll(false);
        afterClose?.();
      }}
    >
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center bg-gray-900/75"
          role="dialog"
          onClick={overlayClick}
          data-testid={testId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-h-screen w-full overflow-y-auto md:py-16">
            <motion.div
              className="mx-auto max-h-full w-full max-w-lg rounded-lg bg-white p-6"
              role="dialog"
              aria-modal="true"
              aria-label={contentLabel}
              aria-labelledby={labelledby}
              aria-describedby={describedby}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex items-start justify-between">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button type="button" onClick={onRequestClose} aria-label="Close modal">
                  <RiCloseLargeLine className="size-6" />
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    container
  );
};

export default Modal;
