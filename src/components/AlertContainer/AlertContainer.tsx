import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useBoundStore from '@/store/useBoundStore';
import Alert from './components/Alert';

const AlertContainer: FC = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const alerts = useBoundStore((state) => state.alerts);

  useEffect(() => {
    const modalRoot = document.getElementById('alert-portal');
    setContainer(modalRoot);
  }, []);

  return container
    ? createPortal(
        <div className="pointer-events-none fixed inset-0 z-50 mx-auto flex max-w-2xl flex-col items-center space-y-4 p-4 pt-12">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              id={alert.id}
              title={alert.title}
              message={alert.message}
              IconComponent={alert.IconComponent}
              variant={alert.variant}
              shouldClose={alert.shouldClose}
              timeToClose={alert.timeToClose}
            />
          ))}
        </div>,
        container
      )
    : null;
};

export default AlertContainer;
